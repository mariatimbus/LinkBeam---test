# LinkBeam Web NFC Card

LinkBeam is a React single-page app that lets you encode your Linktree URL onto an NFC tag so anyone can open it with a tap. The default destination is [`https://linktr.ee/mariatimbus`](https://linktr.ee/mariatimbus), giving quick access to CV highlights, LinkedIn, GitHub, and contact details.

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
4. Test the tag by tapping it with another NFC-enabled phone—the browser should immediately open `https://linktr.ee/mariatimbus`.

> ℹ️ Web NFC currently works on Android phones in Chrome 89+. iOS browsers do not support Web NFC writing yet. For iPhones, consider writing the tag from an Android device and then sharing it with everyone.

## Install LinkBeam on your devices

### Android phone (Chrome)
1. Open your deployed or local LinkBeam URL in Chrome on Android.
2. Tap the ⋮ menu in the top-right corner and choose **Add to Home screen**.
3. Confirm the name “LinkBeam” (or customize it) and tap **Add** → **Add to Home screen**.
4. Launch LinkBeam from your home screen. Make sure NFC is enabled in **Settings → Connected devices → Connection preferences → NFC** before writing a tag.

### iPhone (Safari)
1. Open the LinkBeam URL in Safari on your iPhone.
2. Tap the share icon and select **Add to Home Screen**.
3. Tap **Add** to install the shortcut.
4. iPhones cannot write NFC tags via Web NFC yet, but you can still copy the Linktree link, scan tags written on Android, and share the page instantly.

### Laptop or desktop
1. Clone or download this repository onto your computer.
2. Run `npm install` followed by `npm run dev` to start the development server locally.
3. Open the printed local URL (for example `http://localhost:5173`) in your browser to use LinkBeam.
4. When you are ready to ship, run `npm run build` and deploy the contents of the generated `dist/` folder to any static hosting provider.

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
