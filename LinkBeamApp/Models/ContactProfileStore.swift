import Foundation

@MainActor
final class ContactProfileStore: ObservableObject {
    @Published private(set) var profile: ContactProfile

    init(profile: ContactProfile = .preview) {
        self.profile = profile
    }

    func update(with profile: ContactProfile) {
        self.profile = profile
    }
}
