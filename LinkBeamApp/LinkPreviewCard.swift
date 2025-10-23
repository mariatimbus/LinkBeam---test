import SwiftUI
#if canImport(UIKit)
import UIKit
#endif

struct LinkPreviewCard: View {
    let profile: ContactProfile

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            VStack(alignment: .leading, spacing: 4) {
                Text(profile.name)
                    .font(.title3)
                    .bold()
                Text(profile.headline)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }

            VStack(alignment: .leading, spacing: 8) {
                LinkRow(icon: "link", title: "Website", url: profile.primaryLink.url)
                LinkRow(icon: "briefcase", title: "LinkedIn", url: profile.secondaryLink.url)
                LinkRow(icon: "chevron.left.forwardslash.chevron.right", title: "GitHub", url: profile.github.url)
            }

            Divider()

            HStack {
                Image(systemName: "envelope")
                Text(profile.contact.email)
                Spacer()
#if canImport(UIKit)
                Button("Copy") {
                    UIPasteboard.general.string = profile.contact.email
                }
                .buttonStyle(.bordered)
#endif
            }
            .font(.subheadline)
        }
        .padding()
        .background(Color(uiColor: .secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
    }
}

private struct LinkRow: View {
    let icon: String
    let title: String
    let url: URL

    var body: some View {
        HStack {
            Image(systemName: icon)
            VStack(alignment: .leading) {
                Text(title)
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                Text(url.absoluteString)
                    .font(.subheadline)
            }
            Spacer()
            Link("Open", destination: url)
        }
    }
}

#Preview {
    LinkPreviewCard(profile: .preview)
}
