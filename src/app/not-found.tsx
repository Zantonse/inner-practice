import Link from 'next/link';

export default function NotFound() {
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
        404 &mdash; Page Not Found
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
        This path leads nowhere&mdash;yet.
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          margin: '0 0 2.5rem',
          maxWidth: '42ch',
          lineHeight: 1.7,
        }}
      >
        The page you&rsquo;re looking for doesn&rsquo;t exist. Return to your practice.
      </p>
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-cream)',
            background: 'var(--color-violet-deep)',
            borderRadius: '2px',
            padding: '0.875rem 2rem',
            textDecoration: 'none',
            transition: 'opacity 300ms ease',
          }}
        >
          Home
        </Link>
        <Link
          href="/practice"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-violet-deep)',
            background: 'transparent',
            border: '1px solid var(--color-violet-deep)',
            borderRadius: '2px',
            padding: '0.875rem 2rem',
            textDecoration: 'none',
            transition: 'opacity 300ms ease',
          }}
        >
          Practice
        </Link>
        <Link
          href="/meditate"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-violet-deep)',
            background: 'transparent',
            border: '1px solid var(--color-violet-deep)',
            borderRadius: '2px',
            padding: '0.875rem 2rem',
            textDecoration: 'none',
            transition: 'opacity 300ms ease',
          }}
        >
          Meditate
        </Link>
      </div>
    </div>
  );
}
