import Foundation
import CoreNFC

@MainActor
final class NFCWriter: NSObject, ObservableObject {
    enum SessionState: Equatable, Sendable {
        case idle
        case writing
        case success
        case failed
    }

    @Published private(set) var sessionState: SessionState = .idle
    @Published var errorMessage: IdentifiableErrorMessage?

    private var session: NFCNDEFReaderSession?
    private var pendingURL: URL?

    func writeProfile(_ profile: ContactProfile) {
        guard NFCNDEFReaderSession.readingAvailable else {
            errorMessage = IdentifiableErrorMessage(text: "This device doesn't support NFC tag writing.")
            return
        }

        pendingURL = profile.nfcPayloadURL
        errorMessage = nil
        sessionState = .writing

        session = NFCNDEFReaderSession(delegate: self, queue: nil, invalidateAfterFirstRead: false)
        session?.alertMessage = "Hold your iPhone near the NFC tag to program LinkBeam."
        session?.begin()
    }

    private func payload(for url: URL) -> NFCNDEFPayload? {
        NFCNDEFPayload.wellKnownTypeURIPayload(url: url)
    }
}

extension NFCWriter: NFCNDEFReaderSessionDelegate {
    func readerSession(_ session: NFCNDEFReaderSession, didInvalidateWithError error: Error) {
        DispatchQueue.main.async {
            self.sessionState = .failed
            self.pendingURL = nil
            if (error as NSError).code != NFCReaderError.readerSessionInvalidationErrorFirstNDEFTagRead.rawValue {
                self.errorMessage = IdentifiableErrorMessage(text: error.localizedDescription)
            }
        }
    }

    func readerSessionDidBecomeActive(_ session: NFCNDEFReaderSession) {
        sessionState = .writing
    }

    func readerSession(_ session: NFCNDEFReaderSession, didDetect tags: [NFCNDEFTag]) {
        guard let tag = tags.first, let pendingURL else {
            session.invalidate(errorMessage: "Unable to find NFC tag. Please try again.")
            return
        }

        session.connect(to: tag) { error in
            if let error = error {
                session.invalidate(errorMessage: error.localizedDescription)
                return
            }

            guard let payload = self.payload(for: pendingURL) else {
                session.invalidate(errorMessage: "Invalid profile URL.")
                return
            }

            tag.queryNDEFStatus { status, _, error in
                if let error = error {
                    session.invalidate(errorMessage: error.localizedDescription)
                    return
                }

                switch status {
                case .notSupported:
                    session.invalidate(errorMessage: "This NFC tag doesn't support NDEF writing.")
                case .readOnly:
                    session.invalidate(errorMessage: "This NFC tag is read-only.")
                case .readWrite:
                    let message = NFCNDEFMessage(records: [payload])
                    tag.writeNDEF(message) { error in
                        if let error = error {
                            session.invalidate(errorMessage: error.localizedDescription)
                            return
                        }

                        session.alertMessage = "Success! Your LinkBeam profile is saved."
                        session.invalidate()
                        DispatchQueue.main.async {
                            self.sessionState = .success
                            self.pendingURL = nil
                        }
                    }
                @unknown default:
                    session.invalidate(errorMessage: "Unsupported tag state.")
                }
            }
        }
    }
}

struct IdentifiableErrorMessage: Identifiable {
    let id = UUID()
    let text: String
}
