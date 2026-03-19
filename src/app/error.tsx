'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60dvh',
        padding: 'clamp(2rem, 5vw, 4rem)',
        background: 'var(--color-cream)',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          margin: '0 0 1rem',
        }}
      >
        Something went wrong
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: '0 0 1rem',
          lineHeight: 1.2,
        }}
      >
        A moment of stillness, interrupted.
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          margin: '0 0 2rem',
          maxWidth: '42ch',
          lineHeight: 1.7,
        }}
      >
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        onClick={reset}
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.8125rem',
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--color-cream)',
          background: 'var(--color-violet-deep)',
          border: 'none',
          borderRadius: '2px',
          padding: '0.875rem 2rem',
          cursor: 'pointer',
          transition: 'opacity 300ms ease',
        }}
      >
        Try again
      </button>
    </div>
  );
}
