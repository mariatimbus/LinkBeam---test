import SwiftUI

struct ProfileSummaryCard: View {
    let profile: ContactProfile

    var body: some View {
        VStack(spacing: 16) {
            VStack(spacing: 8) {
                Text(profile.name)
                    .font(.title)
                    .bold()

                Text(profile.headline)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }

            Divider()

            VStack(alignment: .leading, spacing: 12) {
                SummaryRow(icon: "link", title: "Portfolio", detail: profile.primaryLink.label)
                SummaryRow(icon: "person.2", title: "LinkedIn", detail: profile.secondaryLink.label)
                SummaryRow(icon: "chevron.left.forwardslash.chevron.right", title: "GitHub", detail: profile.github.label)
                SummaryRow(icon: "envelope", title: "Contact", detail: profile.contact.label)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding()
        .background(.thinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
        .padding(.horizontal)
    }
}

private struct SummaryRow: View {
    let icon: String
    let title: String
    let detail: String

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Label(title, systemImage: icon)
                .font(.subheadline)
                .foregroundStyle(.secondary)
            Text(detail)
                .font(.footnote)
                .foregroundStyle(.primary)
        }
    }
}

#Preview {
    ProfileSummaryCard(profile: .preview)
}
