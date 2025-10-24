# LinkBeam Web NFC Card

LinkBeam is a React single-page app that lets you encode your robotics Linktree URL onto an NFC tag so anyone can open it with a tap. The default destination is [`https://linktr.ee/qrobotics`](https://linktr.ee/qrobotics), giving quick access to your CV, LinkedIn, GitHub, and contact details.

## Features

- ⚡ **Instant Linktree sharing** – Write the Linktree URL to a blank NFC tag and open it on another device with a tap.
- 📲 **Mobile-friendly interface** – Responsive layout that works on phones, tablets, and desktops.
- 🧭 **Guided NFC workflow** – Step-by-step prompts for checking Web NFC support and programming a tag.
- 📝 **Copy-friendly card** – Copy the Linktree URL to your clipboard for sharing in chats, emails, or QR codes.

## Tech Stack

- [React 18](https://react.dev)
- [Vite](https://vitejs.dev/) development tooling
- Web NFC API (Chrome for Android 89+)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm 9+

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The command prints a local URL (for example `http://localhost:5173`). Open it in your browser to use LinkBeam. Vite automatically reloads the page when you edit the source files.

### Build for production

```bash
npm run build
```

This generates a `dist/` directory with static assets that you can deploy to any static web host (Vercel, Netlify, GitHub Pages, etc.).

## Programming an NFC tag

1. Open the LinkBeam app on a Chrome for Android device that supports Web NFC.
2. Tap **Start writing** and grant NFC permission when prompted.
3. Hold a blank NTAG215/NTAG216 (or other NDEF-compatible) tag to the back of your phone until the vibration confirms the write.
4. Test the tag by tapping it with another NFC-enabled phone—the browser should immediately open `https://linktr.ee/qrobotics`.

> ℹ️ Web NFC currently works on Android phones in Chrome 89+. iOS browsers do not support Web NFC writing yet. For iPhones, consider writing the tag from an Android device and then sharing it with everyone.

## Installing LinkBeam on your phone

You can add the app to your home screen for a native-like experience:

- **Android (Chrome)**
  1. Open the development or deployed LinkBeam URL in Chrome.
  2. Tap the ⋮ menu and choose **Add to Home screen**.
  3. Confirm the name “LinkBeam” and tap **Add**.
  4. Launch LinkBeam from your home screen and program tags whenever you need.

- **iPhone (Safari)**
  1. Open the LinkBeam URL in Safari.
  2. Tap the share icon and select **Add to Home Screen**.
  3. Tap **Add** to install the shortcut.
  4. Although iPhones cannot write tags via Web NFC yet, you can still copy and share the Linktree URL or scan tags written elsewhere.

## Project Structure

```
├── index.html
├── package.json
├── public/
│   └── linkbeam.svg
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── components/
│       ├── ContactCard.jsx
│       ├── NFCWriter.jsx
│       └── ResourceList.jsx
└── vite.config.js
```

## Customizing the destination URL

The app writes the Linktree URL defined in `src/App.jsx` (`LINKTREE_URL`). Replace it with your own link, rebuild, and redeploy to program tags with your personal landing page.
