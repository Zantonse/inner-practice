export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60dvh',
        gap: '1.5rem',
        background: 'var(--color-cream)',
      }}
    >
      <div
        className="breathe"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, var(--color-violet-deep) 0%, transparent 70%)',
          opacity: 0.5,
        }}
      />
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.125rem',
          fontWeight: 400,
          color: 'var(--color-text-muted)',
          letterSpacing: '0.04em',
          margin: 0,
        }}
      >
        Loading&hellip;
      </p>
    </div>
  );
}
