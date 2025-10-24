import { useCallback, useMemo, useState } from 'react';

const NFC_SUPPORT_MESSAGE =
  'Web NFC is only available on select Android devices when using Chrome 89 or newer. iOS browsers do not currently support Web NFC.';

export default function NFCWriter({ link, onSuccess, onError }) {
  const [isWriting, setIsWriting] = useState(false);
  const [supportChecked, setSupportChecked] = useState(false);

  const isSupported = useMemo(() => 'NDEFReader' in window, []);

  const handleWrite = useCallback(async () => {
    if (!('NDEFReader' in window)) {
      onError?.(NFC_SUPPORT_MESSAGE);
      return;
    }

    try {
      setIsWriting(true);
      const ndef = new NDEFReader();
      await ndef.write({
        records: [
          {
            recordType: 'url',
            data: link,
          },
        ],
      });
      const writtenAt = new Date();
      onSuccess?.(writtenAt);
    } catch (error) {
      console.error('Failed to write NFC tag', error);
      if (error.name === 'NotAllowedError') {
        onError?.('Please grant NFC permissions and ensure the phone is unlocked.');
      } else if (error.name === 'NotSupportedError') {
        onError?.(NFC_SUPPORT_MESSAGE);
      } else if (error.name === 'NetworkError') {
        onError?.('Hold the NFC tag steady against your phone until it finishes writing.');
      } else {
        onError?.('Something went wrong. Remove the tag and try again.');
      }
    } finally {
      setIsWriting(false);
    }
  }, [link, onError, onSuccess]);

  const handleCheckSupport = useCallback(() => {
    setSupportChecked(true);
    if (!('NDEFReader' in window)) {
      onError?.(NFC_SUPPORT_MESSAGE);
    }
  }, [onError]);

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
      <h2 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.75rem' }}>Program an NFC tag</h2>
      <p style={{ marginTop: 0, marginBottom: '1.25rem', color: '#cbd5e1' }}>
        Tap <strong>Start writing</strong> and hold a blank NFC tag behind your phone. The Linktree URL will be encoded automatically.
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <button
          onClick={handleWrite}
          disabled={isWriting}
          style={{
            padding: '0.85rem 1.1rem',
            borderRadius: '12px',
            border: 'none',
            background: isWriting ? 'rgba(148, 163, 184, 0.3)' : 'linear-gradient(135deg, #22d3ee, #818cf8)',
            color: '#f8fafc',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: isWriting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 12px 22px rgba(129, 140, 248, 0.35)',
          }}
        >
          {isWriting ? 'Hold tag near the phone…' : 'Start writing'}
        </button>

        {!supportChecked && (
          <button
            onClick={handleCheckSupport}
            type="button"
            style={{
              padding: '0.7rem 1rem',
              borderRadius: '10px',
              border: '1px solid rgba(148, 163, 184, 0.4)',
              background: 'rgba(30, 41, 59, 0.7)',
              color: '#cbd5e1',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Check if my phone supports Web NFC
          </button>
        )}

        {supportChecked && (
          <p style={{ margin: '0.5rem 0 0', color: '#e2e8f0', fontSize: '0.9rem' }}>
            {isSupported
              ? '✅ Great news! Your browser reports that Web NFC is available.'
              : `⚠️ ${NFC_SUPPORT_MESSAGE}`}
          </p>
        )}
      </div>
    </article>
  );
}
