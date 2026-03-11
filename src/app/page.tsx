'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const [hovered, setHovered] = useState<'meditate' | 'yoga' | null>(null);

  const getPanelFlex = (panel: 'meditate' | 'yoga') => {
    if (hovered === null) return 1;
    return hovered === panel ? 1.8 : 0.6;
  };

  return (
    <>
      {/* ── Split Hero ─────────────────────────────────────── */}
      <div
        className="split-hero"
        style={{
          display: 'flex',
          minHeight: 'calc(100dvh - 60px)',
          position: 'relative',
        }}
      >
        {/* Left Panel: Meditate */}
        <Link
          href="/meditate"
          style={{
            flex: getPanelFlex('meditate'),
            transition: 'flex 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(2rem, 5vw, 4rem)',
            textDecoration: 'none',
            background: 'linear-gradient(160deg, oklch(75% 0.12 295), oklch(93% 0.03 60))',
            minHeight: '50dvh',
          }}
          onMouseEnter={() => setHovered('meditate')}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Background image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="/images/hero-meditation.png"
              alt="Abstract watercolor meditation illustration"
              fill
              priority
              sizes="50vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: 0.4,
                transition: 'opacity 500ms ease',
              }}
            />
          </div>

          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(89,46,107,0.65) 0%, rgba(89,46,107,0.1) 55%, transparent 100%)',
              zIndex: 1,
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(245,234,225,0.65)',
                margin: '0 0 0.75rem',
              }}
            >
              The path of stillness
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.75rem, 6vw, 5.5rem)',
                fontWeight: 700,
                color: '#F5EAE1',
                lineHeight: 1.05,
                margin: '0 0 1rem',
              }}
            >
              Meditate
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.875rem, 1.4vw, 1rem)',
                color: 'rgba(245,234,225,0.82)',
                margin: '0 0 1.75rem',
                maxWidth: '28ch',
                lineHeight: 1.65,
              }}
            >
              Quiet the mind. Find your center.
            </p>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-amber-light)',
              }}
            >
              Begin your practice
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Floating Center Brand */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 30,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              background: 'color-mix(in srgb, var(--color-cream) 90%, transparent)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid color-mix(in srgb, var(--color-violet-mid) 50%, transparent)',
              borderRadius: '2px',
              padding: '1.25rem 2.25rem',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 32px rgba(89,46,107,0.15)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.9rem, 2vw, 1.375rem)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: 'var(--color-violet-deep)',
                margin: 0,
              }}
            >
              Inner Practice
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                color: 'var(--color-text-muted)',
                margin: '0.3rem 0 0',
                textTransform: 'uppercase',
              }}
            >
              A Beginner&apos;s Journey
            </p>
          </div>
        </div>

        {/* Right Panel: Yoga */}
        <Link
          href="/yoga"
          style={{
            flex: getPanelFlex('yoga'),
            transition: 'flex 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(2rem, 5vw, 4rem)',
            textDecoration: 'none',
            background: 'linear-gradient(160deg, oklch(55% 0.16 310), oklch(72% 0.1 290))',
            minHeight: '50dvh',
          }}
          onMouseEnter={() => setHovered('yoga')}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Decorative background texture */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              background: 'radial-gradient(ellipse at 70% 30%, oklch(75% 0.1 60 / 0.3), transparent 60%)',
            }}
          />

          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(28,29,55,0.7) 0%, rgba(28,29,55,0.1) 55%, transparent 100%)',
              zIndex: 1,
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'right' }}>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(245,234,225,0.65)',
                margin: '0 0 0.75rem',
              }}
            >
              The path of energy
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.75rem, 6vw, 5.5rem)',
                fontWeight: 700,
                color: '#F5EAE1',
                lineHeight: 1.05,
                margin: '0 0 1rem',
              }}
            >
              Yoga
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.875rem, 1.4vw, 1rem)',
                color: 'rgba(245,234,225,0.82)',
                margin: '0 0 1.75rem',
                maxWidth: '28ch',
                lineHeight: 1.65,
                marginLeft: 'auto',
              }}
            >
              Awaken your energy through kundalini.
            </p>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-amber-light)',
              }}
            >
              Begin your practice
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      </div>

      {/* ── Quote ──────────────────────────────────────────── */}
      <section
        style={{
          padding: '6rem max(1.5rem, 8vw) 5rem',
          background: 'var(--color-cream)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          <blockquote style={{ margin: 0, padding: 0 }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2.8vw, 1.875rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 1.55,
                color: 'var(--color-text)',
                margin: '0 0 1.5rem',
                maxWidth: '58ch',
              }}
            >
              &ldquo;Meditation is not a way of making your mind quiet. It&apos;s a way of entering into the quiet that&apos;s already there — buried under the 50,000 thoughts the average person thinks every day.&rdquo;
            </p>
            <footer
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              — Deepak Chopra
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── Two Path Cards ─────────────────────────────────── */}
      <section
        style={{
          padding: '5rem max(1.5rem, 8vw) 8rem',
          background: 'color-mix(in srgb, var(--color-cream) 90%, var(--color-violet-mid))',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {/* Meditate card */}
          <div
            className="card"
            style={{ padding: '2.5rem 2.25rem', borderRadius: '2px' }}
          >
            <div
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '9999px',
                background: 'var(--color-violet-mid)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-violet-deep)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                fontWeight: 600,
                color: 'var(--color-violet-deep)',
                margin: '0 0 0.75rem',
                fontStyle: 'normal',
              }}
            >
              Learn to Meditate
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              Explore the science and art of meditation. From basic breath awareness to loving-kindness — discover the technique that resonates with you, then practice with guided videos.
            </p>
            <Link
              href="/meditate"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-violet-deep)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Explore meditation
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Yoga card */}
          <div
            className="card"
            style={{ padding: '2.5rem 2.25rem', borderRadius: '2px' }}
          >
            <div
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '9999px',
                background: 'color-mix(in srgb, var(--color-amber-light) 35%, var(--color-linen))',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber-deep)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 0 1 0 20" />
                <path d="M12 2a10 10 0 0 0 0 20" />
                <path d="M12 6v12" />
                <path d="M6 12h12" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                fontWeight: 600,
                color: 'var(--color-amber-deep)',
                margin: '0 0 0.75rem',
                fontStyle: 'normal',
              }}
            >
              Practice Kundalini
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              A 5-minute daily kundalini practice for beginners. Tune in, breathe, move, and meditate — a structured step-by-step flow that builds real momentum day by day.
            </p>
            <Link
              href="/yoga"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-amber-deep)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Start your practice
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
