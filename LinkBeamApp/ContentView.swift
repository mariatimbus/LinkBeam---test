import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var profileStore: ContactProfileStore
    @EnvironmentObject private var nfcWriter: NFCWriter

    @State private var showingWriterSheet = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    ProfileSummaryCard(profile: profileStore.profile)

                    Button(action: { showingWriterSheet = true }) {
                        Label("Write NFC Link", systemImage: "wave.3.backward.circle.fill")
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.accentColor)
                            .foregroundStyle(.white)
                            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                    }
                    .padding(.horizontal)

                    VStack(alignment: .leading, spacing: 12) {
                        Text("Preview")
                            .font(.title3)
                            .bold()

                        LinkPreviewCard(profile: profileStore.profile)
                    }
                    .padding(.horizontal)

                    VStack(alignment: .leading, spacing: 12) {
                        Text("What happens when someone taps?")
                            .font(.title3)
                            .bold()

                        Label("Your programmed NFC tag opens a mobile web card with your details.", systemImage: "sparkles")
                        Label("They can save your contact to their phone with one tap.", systemImage: "person.crop.circle.badge.plus")
                        Label("Edit your info anytime and rewrite the same tag.", systemImage: "pencil")
                    }
                    .labelStyle(InfoLabelStyle())
                    .padding(.horizontal)
                }
                .padding(.vertical)
            }
            .navigationTitle("LinkBeam")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    NavigationLink(destination: ProfileEditorView()) {
                        Label("Edit", systemImage: "square.and.pencil")
                    }
                }
            }
            .sheet(isPresented: $showingWriterSheet) {
                WriterSheet()
                    .presentationDetents([.medium, .large])
            }
            .alert(item: $nfcWriter.errorMessage) { message in
                Alert(title: Text("NFC Error"), message: Text(message), dismissButton: .default(Text("OK")))
            }
        }
    }
}

private struct InfoLabelStyle: LabelStyle {
    func makeBody(configuration: Configuration) -> some View {
        HStack(alignment: .top, spacing: 8) {
            configuration.icon
                .foregroundStyle(.accent)
            configuration.title
                .font(.subheadline)
        }
    }
}

#Preview {
    ContentView()
        .environmentObject(ContactProfileStore())
        .environmentObject(NFCWriter())
}
