import Foundation

struct ContactProfile: Equatable, Identifiable {
    struct WebLink: Equatable {
        var rawValue: String {
            didSet { rawValue = rawValue.trimmingCharacters(in: .whitespacesAndNewlines) }
        }

        init(rawValue: String) {
            self.rawValue = rawValue.trimmingCharacters(in: .whitespacesAndNewlines)
        }

        var url: URL {
            URL(string: rawValue)?.normalizedForWeb ?? URL(string: "https://example.com")!
        }

        var label: String {
            url.absoluteString
        }
    }

    struct ContactDetails: Equatable {
        var email: String
        var phone: String

        var label: String {
            if phone.isEmpty {
                return "Email: \(email)"
            }
            return "Email: \(email) | Phone: \(phone)"
        }
    }

    var id = UUID()
    var name: String
    var headline: String
    var primaryLink: WebLink
    var secondaryLink: WebLink
    var github: WebLink
    var contact: ContactDetails

    var nfcPayloadURL: URL {
        primaryLink.url
    }

    var isValid: Bool {
        !name.isEmpty && primaryLink.url.scheme?.hasPrefix("http") == true &&
        secondaryLink.url.scheme?.hasPrefix("http") == true &&
        github.url.scheme?.hasPrefix("http") == true &&
        contact.email.contains("@")
    }
}

extension ContactProfile {
    static var preview: ContactProfile {
        ContactProfile(
            name: "Jordan Smith",
            headline: "iOS Engineer • NFC Enthusiast",
            primaryLink: .init(rawValue: "https://jordansmith.dev/card"),
            secondaryLink: .init(rawValue: "https://www.linkedin.com/in/jordansmith"),
            github: .init(rawValue: "https://github.com/jordansmith"),
            contact: .init(email: "hello@jordansmith.dev", phone: "+1 (555) 123-4567")
        )
    }
}

private extension URL {
    var normalizedForWeb: URL {
        guard var components = URLComponents(url: self, resolvingAgainstBaseURL: false) else { return self }
        if components.scheme == nil {
            components.scheme = "https"
        }
        return components.url ?? self
    }
}
