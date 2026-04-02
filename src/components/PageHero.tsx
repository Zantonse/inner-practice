import Image from 'next/image';

interface AnchorLink {
  label: string;
  href: string;
}

interface PageHeroProps {
  imageSrc: string;
  backgroundGradient: string;
  eyebrow: string;
  headline: string;
  subtitle?: string;
  anchorLinks?: AnchorLink[];
  accentColor?: string;
  children?: React.ReactNode;
  minHeight?: string;
}

export default function PageHero({
  imageSrc,
  backgroundGradient,
  eyebrow,
  headline,
  subtitle,
  anchorLinks,
  accentColor = 'var(--color-violet-mid)',
  children,
  minHeight = '85dvh',
}: PageHeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(3rem, 8vw, 6rem) max(1.5rem, 8vw) clamp(4rem, 8vw, 7rem)',
        background: backgroundGradient,
        overflow: 'hidden',
      }}
    >
      {/* Hero image */}
      <Image
        src={imageSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', opacity: 0.35 }}
      />
      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(28,29,55,0.72) 0%, transparent 100%)',
        }}
      />

      <div style={{ maxWidth: '680px', position: 'relative', zIndex: 2 }}>
        <p
          className="hero-eyebrow"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(245,234,225,0.7)',
            margin: '0 0 1.25rem',
          }}
        >
          {eyebrow}
        </p>
        <h1
          className="hero-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-hero)',
            fontWeight: 700,
            color: '#F5EAE1',
            lineHeight: 1.05,
            margin: '0 0 1.5rem',
            maxWidth: '14ch',
          }}
        >
          {headline}
        </h1>
        {subtitle && (
          <p
            className="hero-subtitle"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
              color: 'rgba(245,234,225,0.85)',
              margin: '0 0 2.5rem',
              maxWidth: '52ch',
              lineHeight: 1.85,
            }}
          >
            {subtitle}
          </p>
        )}
        {anchorLinks && anchorLinks.length > 0 && (
          <div className="hero-links" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {anchorLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: accentColor,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${accentColor}`,
                  paddingBottom: '0.25rem',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
