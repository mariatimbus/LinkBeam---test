import SwiftUI

struct WriterSheet: View {
    @EnvironmentObject private var profileStore: ContactProfileStore
    @EnvironmentObject private var nfcWriter: NFCWriter

    @State private var isWriting = false
    @State private var didFinish = false

    var body: some View {
        VStack(spacing: 24) {
            VStack(spacing: 12) {
                Image(systemName: didFinish ? "checkmark.seal.fill" : "wave.3.right")
                    .font(.system(size: 48))
                    .foregroundStyle(didFinish ? .green : .accentColor)
                Text(didFinish ? "Tag Updated" : "Ready to Write")
                    .font(.title2)
                    .bold()
                Text(didFinish ? "You can now share your NFC tag." : "Hold your iPhone near an NFC tag to program it with your profile link.")
                    .font(.body)
                    .multilineTextAlignment(.center)
                    .foregroundStyle(.secondary)
            }
            .padding(.top)

            LinkPreviewCard(profile: profileStore.profile)
                .padding(.horizontal)

            Spacer()

            Button(action: writeTag) {
                Label(didFinish ? "Write Again" : "Start Writing", systemImage: didFinish ? "arrow.clockwise" : "antenna.radiowaves.left.and.right")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .disabled(isWriting)
            .padding([.horizontal, .bottom])
        }
        .presentationDragIndicator(.visible)
        .interactiveDismissDisabled(isWriting)
        .task(id: nfcWriter.sessionState) {
            switch nfcWriter.sessionState {
            case .idle:
                isWriting = false
            case .writing:
                isWriting = true
            case .success:
                isWriting = false
                didFinish = true
            case .failed:
                isWriting = false
                didFinish = false
            }
        }
    }

    private func writeTag() {
        didFinish = false
        nfcWriter.writeProfile(profileStore.profile)
    }
}

#Preview {
    WriterSheet()
        .environmentObject(ContactProfileStore())
        .environmentObject(NFCWriter())
}
