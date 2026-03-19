export default function StatCard({
  source,
  stat,
  detail,
  url,
  accentColor,
  accentTextColor,
}: {
  source: string;
  stat: string;
  detail: string;
  url?: string;
  accentColor: string;
  accentTextColor: string;
}) {
  return (
    <div
      className="stat-card"
      style={{
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: '2px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: accentTextColor,
          margin: '0 0 0.75rem',
        }}
      >
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            {source}
          </a>
        ) : (
          source
        )}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: '0 0 0.5rem',
          lineHeight: 1.3,
        }}
      >
        {stat}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {detail}
      </p>
    </div>
  );
}
