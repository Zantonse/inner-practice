'use client';

import { useState } from 'react';

export default function MedicalDisclaimer() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'oklch(25% 0 0 / 0.95)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid oklch(50% 0 0 / 0.3)',
        padding: '0.75rem max(1rem, 4vw)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '0.8125rem',
          lineHeight: 1.5,
          color: 'oklch(80% 0 0)',
          maxWidth: '800px',
          textAlign: 'center',
        }}
      >
        <strong style={{ color: 'oklch(90% 0 0)' }}>Medical Disclaimer:</strong>{' '}
        This site is for educational purposes only and is not a substitute for professional medical
        advice, diagnosis, or treatment. Always consult a qualified healthcare provider before
        beginning any new health practice. Never disregard professional medical advice or delay
        seeking it because of content on this site.
      </p>
      <button
        onClick={() => setDismissed(true)}
        style={{
          background: 'oklch(45% 0 0)',
          color: 'oklch(90% 0 0)',
          border: '1px solid oklch(55% 0 0)',
          borderRadius: '4px',
          padding: '0.375rem 0.75rem',
          fontSize: '0.75rem',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Understood
      </button>
    </div>
  );
}
