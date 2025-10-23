import SwiftUI

struct ProfileEditorView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject private var profileStore: ContactProfileStore

    @State private var draft: ContactProfile = .preview

    var body: some View {
        Form {
            Section("Identity") {
                TextField("Full Name", text: $draft.name)
                TextField("Headline", text: $draft.headline, axis: .vertical)
            }

            Section("Links") {
                TextField("Portfolio URL", text: $draft.primaryLink.rawValue)
                    .keyboardType(.URL)
                    .autocapitalization(.none)
                TextField("LinkedIn URL", text: $draft.secondaryLink.rawValue)
                    .keyboardType(.URL)
                    .autocapitalization(.none)
                TextField("GitHub URL", text: $draft.github.rawValue)
                    .keyboardType(.URL)
                    .autocapitalization(.none)
            }

            Section("Contact") {
                TextField("Email", text: $draft.contact.email)
                    .keyboardType(.emailAddress)
                    .autocapitalization(.none)
                TextField("Phone", text: $draft.contact.phone)
                    .keyboardType(.phonePad)
            }
        }
        .navigationTitle("Edit Profile")
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                Button("Save") {
                    withAnimation {
                        profileStore.update(with: draft)
                        dismiss()
                    }
                }
                .disabled(!draft.isValid)
            }

            ToolbarItem(placement: .cancellationAction) {
                Button("Cancel") { dismiss() }
            }
        }
        .onAppear {
            draft = profileStore.profile
        }
    }
}

#Preview {
    NavigationStack {
        ProfileEditorView()
            .environmentObject(ContactProfileStore())
    }
}
