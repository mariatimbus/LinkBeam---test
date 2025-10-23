import SwiftUI

@main
struct LinkBeamApp: App {
    @StateObject private var profileStore = ContactProfileStore()
    @StateObject private var nfcWriter = NFCWriter()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(profileStore)
                .environmentObject(nfcWriter)
        }
    }
}
