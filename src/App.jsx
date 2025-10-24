import { useState } from 'react';
import ContactCard from './components/ContactCard.jsx';
import NFCWriter from './components/NFCWriter.jsx';
import ResourceList from './components/ResourceList.jsx';

const LINKTREE_URL = 'https://linktr.ee/qrobotics';

export default function App() {
  const [lastWrite, setLastWrite] = useState(null);
  const [writerError, setWriterError] = useState(null);

  return (
    <main>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
          LinkBeam NFC Card
        </p>
        <h1 style={{ fontSize: '2.75rem', marginBottom: '0.75rem', fontWeight: 700 }}>
          Share your robotics profile in a tap
        </h1>
        <p style={{ maxWidth: '640px', margin: '0 auto', color: '#cbd5f5' }}>
          Program an NFC tag so that anyone who taps their phone on it opens your Linktree profile.
          Works best on Android devices running Chrome 89+ with NFC enabled.
        </p>
      </header>

      <section style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '2.5rem' }}>
        <ContactCard link={LINKTREE_URL} onCopy={() => setLastWrite({ status: 'copied', at: new Date() })} />
        <NFCWriter
          link={LINKTREE_URL}
          onSuccess={(writtenAt) => {
            setWriterError(null);
            setLastWrite({ status: 'written', at: writtenAt });
          }}
          onError={(error) => {
            setWriterError(error);
          }}
        />
      </section>

      {lastWrite && (
        <div
          style={{
            background: 'rgba(45, 212, 191, 0.12)',
            border: '1px solid rgba(45, 212, 191, 0.35)',
            borderRadius: '18px',
            padding: '1rem 1.25rem',
            marginBottom: '2rem',
            color: '#2dd4bf',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>{lastWrite.status === 'written' ? '✨' : '📋'}</span>
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>
              {lastWrite.status === 'written'
                ? 'NFC tag programmed successfully!'
                : 'Link copied to clipboard.'}
            </p>
            <p style={{ margin: 0, color: '#99f6e4', fontSize: '0.9rem' }}>
              {lastWrite.status === 'written'
                ? `Tap a supported phone against the tag to open ${LINKTREE_URL}.`
                : 'Share the URL anywhere you like.'}
            </p>
          </div>
        </div>
      )}

      {writerError && (
        <div
          style={{
            background: 'rgba(248, 113, 113, 0.12)',
            border: '1px solid rgba(248, 113, 113, 0.35)',
            borderRadius: '18px',
            padding: '1rem 1.25rem',
            marginBottom: '2rem',
            color: '#fca5a5',
          }}
        >
          <p style={{ margin: 0, fontWeight: 600 }}>Could not program the NFC tag.</p>
          <p style={{ margin: '0.5rem 0 0', color: '#fecdd3', fontSize: '0.9rem' }}>{writerError}</p>
        </div>
      )}

      <ResourceList link={LINKTREE_URL} />
    </main>
  );
}
