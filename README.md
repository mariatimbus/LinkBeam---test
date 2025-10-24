# LinkBeam

One tap. One link. Your professional profile, portfolio, and contacts—delivered instantly.

## Overview

LinkBeam is a SwiftUI iOS application that lets you encode your professional landing page onto any NFC tag. When someone taps their iPhone on your tag, they are taken directly to your curated LinkBeam card featuring your CV, LinkedIn, GitHub, and contact information.

## Features

- ✏️ **Personalized profile** – Edit your name, headline, and professional links directly inside the app.
- 📇 **Shareable contact card** – Preview the landing page experience with quick actions for LinkedIn, GitHub, and email.
- 📶 **NFC writer** – Program compatible NFC tags with a single tap so other devices instantly open your LinkBeam card.
- 🔁 **Rewrite ready** – Update your details at any time and rewrite the same tag with your refreshed profile link.

## Project Structure

```
LinkBeamApp/
├── LinkBeamApp.swift        # Application entry point
├── ContentView.swift        # Main experience with profile summary and NFC writer sheet
├── ProfileSummaryCard.swift # Card-style display of key profile details
├── LinkPreviewCard.swift    # Web card preview with actionable links
├── ProfileEditorView.swift  # Form for editing profile information
├── WriterSheet.swift        # NFC writing workflow
├── Managers/
│   └── NFCWriter.swift      # CoreNFC wrapper that writes the LinkBeam URL to a tag
├── Models/
│   ├── ContactProfile.swift # Data model for profile, links, and contact details
│   └── ContactProfileStore.swift # Observable store for profile state
└── Resources/
    ├── Info.plist           # App configuration and NFC usage strings
    └── LaunchScreen.storyboard
```

## Requirements

- Xcode 15 or newer
- iOS 16+ deployment target
- A compatible iPhone with NFC writing support (iPhone 7 or later)
- Blank NFC tags that support NDEF writing

## Getting Started

1. Open `LinkBeamApp` in Xcode.
2. Ensure the signing & capabilities tab includes the **Near Field Communication Tag Reading** entitlement (Xcode will prompt you).
3. Update the default profile information in the simulator or on device.
4. Tap **Write NFC Link** and hold your iPhone near a blank NFC tag to encode your LinkBeam URL.
5. Test by tapping the programmed tag with another iPhone—Safari will open your LinkBeam landing page automatically.

> **Tip:** Host your CV, LinkedIn, GitHub, and contact details on a single mobile-friendly page (e.g., `https://yourname.com/card`). Enter that URL as your primary link so that every NFC tap directs people to the complete profile.

## Download & Installation

Because LinkBeam is a sample application, distribution happens through the Xcode project rather than the App Store. Choose the option that fits your workflow:

### Option A — Quick simulator build

1. Clone this repository: `git clone https://github.com/yourname/LinkBeam.git`
2. Open `LinkBeamApp/LinkBeamApp.xcodeproj` in Xcode.
3. Select an iOS Simulator target (iPhone 15 or similar) and press **⌘R** to build and run.

### Option B — Install on your iPhone

1. Connect your iPhone via USB or Wi‑Fi and select it as the active run destination in Xcode.
2. Ensure your Apple ID or team provisioning profile is added under **Xcode ▸ Settings ▸ Accounts**.
3. Update the bundle identifier in **Signing & Capabilities** to match your team ID (e.g., `com.yourname.LinkBeam`).
4. Press **⌘R** to build and install the app on your device. The first launch may prompt you to trust the developer profile in **Settings ▸ General ▸ VPN & Device Management**.
5. Once installed, you can tap **Write NFC Link** on a physical NFC tag to program your landing-page URL.
