'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ── Rose accent tokens (Nervous System) ────────────────────────
const ROSE_DEEP  = '#8B3A62';
const ROSE_MID   = '#C27BA0';
const ROSE_LIGHT = '#E8B4CF';

type PathKey = 'meditate' | 'yoga' | 'fascia' | 'breathe' | 'nervous-system' | 'manifest' | 'practice';

const paths: {
  key: PathKey;
  href: string;
  eyebrow: string;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  gradFrom: string;
  gradTo: string;
  overlayColor: string;
  accentColor: string;
}[] = [
  {
    key: 'meditate',
    href: '/meditate',
    eyebrow: 'The path of stillness',
    title: 'Meditate',
    tagline: 'Quiet the mind. Find your center.',
    image: '/images/hero-meditation.png',
    imageAlt: 'Abstract watercolor meditation illustration',
    gradFrom: 'oklch(75% 0.12 295)',
    gradTo: 'oklch(93% 0.03 60)',
    overlayColor: 'rgba(89,46,107,0.6)',
    accentColor: 'var(--color-amber-light)',
  },
  {
    key: 'yoga',
    href: '/yoga',
    eyebrow: 'The path of energy',
    title: 'Yoga',
    tagline: 'Every style. Every path.',
    image: '/images/hero-yoga.png',
    imageAlt: 'Abstract watercolor yoga illustration',
    gradFrom: 'oklch(55% 0.16 310)',
    gradTo: 'oklch(72% 0.1 290)',
    overlayColor: 'rgba(28,29,55,0.65)',
    accentColor: 'var(--color-amber-light)',
  },
  {
    key: 'fascia',
    href: '/fascia',
    eyebrow: 'The path of release',
    title: 'Fascia',
    tagline: 'Release the body. Free the tissue.',
    image: '/images/hero-fascia.png',
    imageAlt: 'Abstract watercolor fascia web illustration',
    gradFrom: 'oklch(62% 0.09 30)',
    gradTo: 'oklch(80% 0.07 50)',
    overlayColor: 'rgba(110,55,20,0.6)',
    accentColor: 'var(--color-amber-light)',
  },
  {
    key: 'breathe',
    href: '/breathe',
    eyebrow: 'The path of breath',
    title: 'Breathe',
    tagline: 'Command your nervous system.',
    image: '/images/hero-breathwork.png',
    imageAlt: 'Abstract watercolor breathwork illustration',
    gradFrom: 'oklch(60% 0.10 196)',
    gradTo: 'oklch(80% 0.07 185)',
    overlayColor: 'rgba(18,80,80,0.62)',
    accentColor: '#A8DADA',
  },
  {
    key: 'nervous-system',
    href: '/nervous-system',
    eyebrow: 'The meta-layer',
    title: 'Nervous System',
    tagline: 'The root of every practice.',
    image: '/images/hero-nervous-system.png',
    imageAlt: 'Abstract watercolor nervous system illustration',
    gradFrom: 'oklch(55% 0.14 340)',
    gradTo: 'oklch(78% 0.09 350)',
    overlayColor: 'rgba(139,58,98,0.62)',
    accentColor: ROSE_LIGHT,
  },
  {
    key: 'manifest',
    href: '/manifest',
    eyebrow: 'The path of intention',
    title: 'Manifest',
    tagline: 'The science of turning intention into reality.',
    image: '/images/hero-manifest.png',
    imageAlt: 'Abstract watercolor manifestation illustration with golden light',
    gradFrom: 'oklch(65% 0.12 75)',
    gradTo: 'oklch(82% 0.08 60)',
    overlayColor: 'rgba(154,114,48,0.6)',
    accentColor: '#F0D68A',
  },
  {
    key: 'practice',
    href: '/practice',
    eyebrow: 'The path of discipline',
    title: 'Practice',
    tagline: 'Guided timers for breath, body, and mind.',
    image: '/images/hero-meditation.png',
    imageAlt: 'Abstract watercolor practice timer illustration',
    gradFrom: 'oklch(60% 0.10 290)',
    gradTo: 'oklch(80% 0.06 280)',
    overlayColor: 'rgba(89,46,107,0.55)',
    accentColor: '#D7C2EE',
  },
];

const topRow = paths.slice(0, 4);
const bottomRow = paths.slice(4);

export default function HomePage() {
  const [hovered, setHovered] = useState<PathKey | null>(null);

  const getCardFlex = (key: PathKey, row: typeof paths) => {
    const rowHovered = row.find(p => p.key === hovered);
    if (!rowHovered) return 1;
    return hovered === key ? 1.8 : 0.6;
  };

  return (
    <>
      {/* ── Five-Path Hero (3 + 2 row layout) ──────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100dvh - 60px)',
        }}
      >
        {/* Top row — 3 panels */}
        <div
          className="hero-row"
          style={{
            display: 'flex',
            flex: 3,
            position: 'relative',
          }}
        >
          {topRow.map((path, idx) => (
            <Link
              key={path.key}
              href={path.href}
              style={{
                flex: getCardFlex(path.key, topRow),
                transition: 'flex 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'clamp(1.75rem, 4vw, 3.5rem)',
                textDecoration: 'none',
                background: `linear-gradient(160deg, ${path.gradFrom}, ${path.gradTo})`,
                minHeight: '44dvh',
              }}
              onMouseEnter={() => setHovered(path.key)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Background image */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Image
                  src={path.image}
                  alt={path.imageAlt}
                  fill
                  priority={path.key === 'meditate'}
                  sizes="25vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    opacity: hovered === path.key ? 0.55 : 0.38,
                    transition: 'opacity 550ms ease',
                  }}
                />
              </div>

              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, ${path.overlayColor} 0%, ${path.overlayColor.replace(/[\d.]+\)$/, '0.05)')} 50%, transparent 100%)`,
                  zIndex: 1,
                }}
              />

              {/* Vertical divider line (right side, except last in row) */}
              {idx < topRow.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '10%',
                    bottom: '10%',
                    width: '1px',
                    background: 'rgba(245,234,225,0.18)',
                    zIndex: 3,
                  }}
                />
              )}

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,234,225,0.6)',
                    margin: '0 0 0.625rem',
                  }}
                >
                  {path.eyebrow}
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.25rem, 4.5vw, 4.5rem)',
                    fontWeight: 700,
                    color: '#F5EAE1',
                    lineHeight: 1.05,
                    margin: '0 0 0.875rem',
                  }}
                >
                  {path.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)',
                    color: 'rgba(245,234,225,0.78)',
                    margin: '0 0 1.5rem',
                    maxWidth: '24ch',
                    lineHeight: 1.65,
                  }}
                >
                  {path.tagline}
                </p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: path.accentColor,
                    opacity: hovered === path.key ? 1 : 0.75,
                    transition: 'opacity 400ms ease',
                  }}
                >
                  Begin
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom row — 2 panels centered */}
        <div
          className="hero-row"
          style={{
            display: 'flex',
            flex: 2,
            position: 'relative',
          }}
        >
          {bottomRow.map((path, idx) => (
            <Link
              key={path.key}
              href={path.href}
              style={{
                flex: getCardFlex(path.key, bottomRow),
                transition: 'flex 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'clamp(1.75rem, 4vw, 3.5rem)',
                textDecoration: 'none',
                background: `linear-gradient(160deg, ${path.gradFrom}, ${path.gradTo})`,
                minHeight: '34dvh',
              }}
              onMouseEnter={() => setHovered(path.key)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Background image */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Image
                  src={path.image}
                  alt={path.imageAlt}
                  fill
                  sizes="50vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    opacity: hovered === path.key ? 0.55 : 0.38,
                    transition: 'opacity 550ms ease',
                  }}
                />
              </div>

              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, ${path.overlayColor} 0%, ${path.overlayColor.replace(/[\d.]+\)$/, '0.05)')} 50%, transparent 100%)`,
                  zIndex: 1,
                }}
              />

              {/* Vertical divider between bottom row panels */}
              {idx < bottomRow.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '10%',
                    bottom: '10%',
                    width: '1px',
                    background: 'rgba(245,234,225,0.18)',
                    zIndex: 3,
                  }}
                />
              )}

              {/* Horizontal divider (top of bottom row) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '5%',
                  right: '5%',
                  height: '1px',
                  background: 'rgba(245,234,225,0.15)',
                  zIndex: 3,
                }}
              />

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,234,225,0.6)',
                    margin: '0 0 0.625rem',
                  }}
                >
                  {path.eyebrow}
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.25rem, 4.5vw, 4.5rem)',
                    fontWeight: 700,
                    color: '#F5EAE1',
                    lineHeight: 1.05,
                    margin: '0 0 0.875rem',
                  }}
                >
                  {path.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)',
                    color: 'rgba(245,234,225,0.78)',
                    margin: '0 0 1.5rem',
                    maxWidth: '28ch',
                    lineHeight: 1.65,
                  }}
                >
                  {path.tagline}
                </p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: path.accentColor,
                    opacity: hovered === path.key ? 1 : 0.75,
                    transition: 'opacity 400ms ease',
                  }}
                >
                  Begin
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Floating Center Brand */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 'calc(44dvh / 2 + 30px)',
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
              padding: '1.125rem 2rem',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 32px rgba(89,46,107,0.18)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.875rem, 1.8vw, 1.25rem)',
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
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: 'var(--color-text-muted)',
                margin: '0.3rem 0 0',
                textTransform: 'uppercase',
              }}
            >
              Stillness. Breath. Release. Root.
            </p>
          </div>
        </div>
      </div>

      {/* ── Quote ──────────────────────────────────────────────── */}
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
              &ldquo;The body is the temple. The mind is the priest. The spirit is the god within.
              When all three move together — that is practice.&rdquo;
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
              — Inner Practice
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── Five Path Cards ──────────────────────────────────────── */}
      <section
        style={{
          padding: '5rem max(1.5rem, 8vw) 8rem',
          background: 'color-mix(in srgb, var(--color-cream) 90%, var(--color-violet-mid))',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.75rem',
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
              Meditate
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              Explore the science and art of meditation. From basic breath awareness to loving-kindness — discover the technique that resonates, then practice with guided videos.
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
              Begin &rarr;
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
              Yoga
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              Explore 10 yoga styles from Hatha to Yoga Nidra. Find the practice that fits your body, your nervous system, and your goals — with the science behind each style.
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
              Begin &rarr;
            </Link>
          </div>

          {/* Fascia card */}
          <div
            className="card"
            style={{ padding: '2.5rem 2.25rem', borderRadius: '2px' }}
          >
            <div
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '9999px',
                background: 'color-mix(in srgb, var(--color-linen) 70%, var(--color-taupe))',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber-deep)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12c0-4.97 4.03-9 9-9s9 4.03 9 9" />
                <path d="M12 3c2 4 2 14 0 18" />
                <path d="M3 12c4-2 14-2 18 0" />
                <path d="M5.6 5.6c2.8 2.8 10 10 12.8 12.8" />
                <path d="M18.4 5.6C15.6 8.4 8.4 15.6 5.6 18.4" />
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
              Fascia
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              Explore the body&apos;s living web of connective tissue. Learn gua sha, myofascial release, and how releasing fascia transforms the body, unlocks emotion, and deepens your inner practice.
            </p>
            <Link
              href="/fascia"
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
              Begin &rarr;
            </Link>
          </div>

          {/* Breathe card */}
          <div
            className="card"
            style={{ padding: '2.5rem 2.25rem', borderRadius: '2px' }}
          >
            <div
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '9999px',
                background: 'color-mix(in srgb, #5BA4A4 18%, var(--color-cream))',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D8A8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.59 4.59A2 2 0 1 1 11 8H2" />
                <path d="M12.59 19.41A2 2 0 1 0 14 16H2" />
                <path d="M6.59 11.41A2 2 0 1 0 8 8H2" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                fontWeight: 600,
                color: '#3D8A8A',
                margin: '0 0 0.75rem',
                fontStyle: 'normal',
              }}
            >
              Breathe
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              The only voluntary gateway to your autonomic nervous system. Explore 14 techniques — from the physiological sigh to Wim Hof — and learn how a single breath can shift your entire state.
            </p>
            <Link
              href="/breathe"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#3D8A8A',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Begin &rarr;
            </Link>
          </div>

          {/* Nervous System card */}
          <div
            className="card"
            style={{
              padding: '2.5rem 2.25rem',
              borderRadius: '2px',
              borderTop: `3px solid ${ROSE_MID}`,
            }}
          >
            <div
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '9999px',
                background: `color-mix(in srgb, ${ROSE_LIGHT} 35%, var(--color-cream))`,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Branching nerve SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ROSE_DEEP} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20" />
                <path d="M12 7l-4-3" />
                <path d="M12 7l4-3" />
                <path d="M12 12l-5-2" />
                <path d="M12 12l5-2" />
                <path d="M12 17l-4 3" />
                <path d="M12 17l4 3" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                fontWeight: 600,
                color: ROSE_DEEP,
                margin: '0 0 0.75rem',
                fontStyle: 'normal',
              }}
            >
              Nervous System
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              The meta-layer beneath every practice. Discover the vagus nerve, Polyvagal Theory, 19 stimulation techniques, eye movements, the Wim Hof Method, and how to measure your own vagal tone.
            </p>
            <Link
              href="/nervous-system"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: ROSE_DEEP,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Begin &rarr;
            </Link>
          </div>

          {/* Manifest card */}
          <div
            className="card"
            style={{
              padding: '2.5rem 2.25rem',
              borderRadius: '2px',
              borderTop: '3px solid #D4A74A',
            }}
          >
            <div
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '9999px',
                background: 'color-mix(in srgb, #F0D68A 35%, var(--color-cream))',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9A7230" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                fontWeight: 600,
                color: '#9A7230',
                margin: '0 0 0.75rem',
                fontStyle: 'normal',
              }}
            >
              Manifest
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              The science of turning intention into reality. How neuroscience, goal science, and ancient contemplative traditions converge into a practical framework for intentional creation.
            </p>
            <Link
              href="/manifest"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#9A7230',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Begin &rarr;
            </Link>
          </div>

          {/* Practice card */}
          <div
            className="card"
            style={{
              padding: '2.5rem 2.25rem',
              borderRadius: '2px',
              borderTop: '3px solid var(--color-violet-mid)',
            }}
          >
            <div
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '9999px',
                background: 'color-mix(in srgb, var(--color-violet-mid) 35%, var(--color-cream))',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-violet-deep)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
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
              Practice
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              Guided timers for breath, body, and mind. Open timer, 13 guided presets, and daily routine templates that sequence your practices into morning, midday, and evening blocks.
            </p>
            <Link
              href="/practice"
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
              Begin &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
