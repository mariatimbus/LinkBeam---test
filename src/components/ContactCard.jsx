export default function ContactCard({ link, onCopy }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      onCopy?.();
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <article
      style={{
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: '24px',
        padding: '1.75rem',
        boxShadow: '0 18px 50px rgba(15, 23, 42, 0.35)',
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.75rem' }}>Preview the Linktree experience</h2>
      <p style={{ marginTop: 0, marginBottom: '1.25rem', color: '#cbd5e1' }}>
        This preview is what people will see after tapping your NFC tag. Update your Linktree whenever you have new work to share.
      </p>

      <div
        style={{
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.22), rgba(99, 102, 241, 0.22))',
          borderRadius: '18px',
          padding: '1.5rem',
          border: '1px solid rgba(99, 102, 241, 0.35)',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ margin: 0, color: '#e0f2fe', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Destination URL
        </p>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '0.5rem',
            fontSize: '1.15rem',
            fontWeight: 600,
            color: '#f1f5f9',
            wordBreak: 'break-all',
            textDecoration: 'none',
          }}
        >
          {link}
        </a>
      </div>

      <button
        onClick={handleCopy}
        style={{
          width: '100%',
          padding: '0.85rem 1.1rem',
          borderRadius: '12px',
          border: 'none',
          background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
          color: '#f8fafc',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 12px 22px rgba(14, 165, 233, 0.35)',
        }}
      >
        Copy Linktree URL
      </button>
    </article>
  );
}
