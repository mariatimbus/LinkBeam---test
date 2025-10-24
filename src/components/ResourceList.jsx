export default function ResourceList({ link }) {
  return (
    <section
      style={{
        background: 'rgba(15, 23, 42, 0.7)',
        borderRadius: '24px',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        padding: '1.75rem',
        boxShadow: '0 18px 50px rgba(15, 23, 42, 0.25)',
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '2rem' }}>How to share LinkBeam everywhere</h2>
      <ol style={{ lineHeight: 1.7, color: '#cbd5e1', paddingLeft: '1.25rem' }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Install on your phone:</strong> open this page on your device and add it to your home screen (Android Chrome: menu → “Add to Home screen”; iPhone Safari: share → “Add to Home Screen”).
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Check NFC settings:</strong> on Android, enable NFC in Settings → Connected devices. iPhone users can still scan pre-written tags even though iOS cannot write them yet.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Write the tag:</strong> tap <em>Start writing</em> and hold a blank NTAG215/NTAG216 chip or compatible card to the back of your phone until you feel the vibration.
        </li>
        <li>
          <strong>Share the link:</strong> when someone taps their NFC-enabled phone on the tag it will instantly open {link} in their browser. You can also copy the URL and drop it into chats or emails.
        </li>
      </ol>

      <p style={{ marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
        Tip: Print a QR code pointing to the same Linktree URL for laptops or phones that do not support NFC.
      </p>
    </section>
  );
}
