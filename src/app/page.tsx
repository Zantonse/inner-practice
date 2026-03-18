'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ── Rose accent tokens (Nervous System) ────────────────────────
const ROSE_DEEP  = '#8B3A62';
const ROSE_MID   = '#985575';
const ROSE_LIGHT = '#E8B4CF';

type PathKey = 'meditate' | 'yoga' | 'fascia' | 'breathe' | 'nervous-system' | 'sound-healing' | 'somatics' | 'reiki' | 'sleep' | 'qigong' | 'chakras' | 'trauma' | 'manifest' | 'practice';

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
    image: '/images/hero-meditation.webp',
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
    image: '/images/hero-yoga.webp',
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
    image: '/images/hero-fascia.webp',
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
    image: '/images/hero-breathwork.webp',
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
    image: '/images/hero-nervous-system.webp',
    imageAlt: 'Abstract watercolor nervous system illustration',
    gradFrom: 'oklch(55% 0.14 340)',
    gradTo: 'oklch(78% 0.09 350)',
    overlayColor: 'rgba(139,58,98,0.62)',
    accentColor: ROSE_LIGHT,
  },
  {
    key: 'sound-healing',
    href: '/sound-healing',
    eyebrow: 'The path of vibration',
    title: 'Sound Healing',
    tagline: 'Vibration as medicine.',
    image: '/images/hero-manifest.webp',
    imageAlt: 'Abstract watercolor sound waves illustration',
    gradFrom: 'oklch(50% 0.08 55)',
    gradTo: 'oklch(75% 0.06 45)',
    overlayColor: 'rgba(139,105,20,0.55)',
    accentColor: '#F0D68A',
  },
  {
    key: 'somatics',
    href: '/somatics',
    eyebrow: 'The path of release',
    title: 'Somatics',
    tagline: 'The body completes what the mind cannot.',
    image: '/images/hero-nervous-system.webp',
    imageAlt: 'Abstract watercolor somatic healing illustration',
    gradFrom: 'oklch(38% 0.08 255)',
    gradTo: 'oklch(60% 0.06 240)',
    overlayColor: 'rgba(45,58,106,0.6)',
    accentColor: '#5BA8A0',
  },
  {
    key: 'reiki',
    href: '/reiki',
    eyebrow: 'The path of presence',
    title: 'Reiki',
    tagline: 'Heal through presence and gentle touch.',
    image: '/images/hero-manifest.webp',
    imageAlt: 'Abstract watercolor golden healing light illustration',
    gradFrom: 'oklch(55% 0.10 65)',
    gradTo: 'oklch(78% 0.08 50)',
    overlayColor: 'rgba(139,105,20,0.6)',
    accentColor: '#F0D68A',
  },
  {
    key: 'sleep',
    href: '/sleep',
    eyebrow: 'The path of restoration',
    title: 'Sleep',
    tagline: 'Where every practice comes to rest.',
    image: '/images/hero-nervous-system.webp',
    imageAlt: 'Abstract watercolor sleep illustration',
    gradFrom: 'oklch(35% 0.08 210)',
    gradTo: 'oklch(52% 0.10 195)',
    overlayColor: 'rgba(27,77,92,0.62)',
    accentColor: '#A3C4CC',
  },
  {
    key: 'qigong',
    href: '/qigong',
    eyebrow: 'The path of flow',
    title: 'Qigong',
    tagline: 'Ancient movement. Modern science.',
    image: '/images/hero-yoga.webp',
    imageAlt: 'Abstract watercolor qigong illustration',
    gradFrom: 'oklch(35% 0.10 160)',
    gradTo: 'oklch(50% 0.12 145)',
    overlayColor: 'rgba(45,107,79,0.62)',
    accentColor: '#A8D5BA',
  },
  {
    key: 'chakras',
    href: '/chakras',
    eyebrow: 'The path of energy',
    title: 'Chakras',
    tagline: 'The body-mind map. Seven centers, one system.',
    image: '/images/hero-meditation.webp',
    imageAlt: 'Abstract watercolor chakra energy illustration',
    gradFrom: 'oklch(30% 0.12 300)',
    gradTo: 'oklch(45% 0.15 280)',
    overlayColor: 'rgba(107,63,160,0.62)',
    accentColor: '#B39DDB',
  },
  {
    key: 'trauma',
    href: '/trauma',
    eyebrow: 'The path of healing',
    title: 'Trauma',
    tagline: 'The inherited nervous system. Heal the pattern.',
    image: '/images/hero-nervous-system.webp',
    imageAlt: 'Abstract watercolor trauma healing illustration',
    gradFrom: 'oklch(35% 0.08 55)',
    gradTo: 'oklch(50% 0.10 40)',
    overlayColor: 'rgba(139,94,60,0.62)',
    accentColor: '#C4956A',
  },
  {
    key: 'manifest',
    href: '/manifest',
    eyebrow: 'The path of intention',
    title: 'Manifest',
    tagline: 'The science of turning intention into reality.',
    image: '/images/hero-manifest.webp',
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
    image: '/images/hero-meditation.webp',
    imageAlt: 'Abstract watercolor practice timer illustration',
    gradFrom: 'oklch(60% 0.10 290)',
    gradTo: 'oklch(80% 0.06 280)',
    overlayColor: 'rgba(89,46,107,0.55)',
    accentColor: '#D7C2EE',
  },
];

const topRow = paths.slice(0, 7);
const bottomRow = paths.slice(7);

export default function HomePage() {
  const [hovered, setHovered] = useState<PathKey | null>(null);

  const getCardFlex = (key: PathKey, row: typeof paths) => {
    const rowHovered = row.find(p => p.key === hovered);
    if (!rowHovered) return 1;
    return hovered === key ? 1.8 : 0.6;
  };

  return (
    <>
      <h1 className="sr-only">Inner Practice — Meditation, Yoga, Breathwork, Fascia, Nervous System, Manifestation &amp; Practice</h1>
      {/* ── Seven-Path Hero (4 + 3 row layout) ──────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
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
            top: 'calc(44dvh / 2)',
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

      {/* ── How It All Fits Together ──────────────────────────── */}
      <section style={{
        padding: 'clamp(5rem, 10vw, 8rem) max(1.5rem, 8vw)',
        background: 'var(--color-cream)',
      }}>
        <div style={{ maxWidth: '960px' }}>

          {/* Section header */}
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-violet-deep)',
            margin: '0 0 1.25rem',
          }}>
            HOW TO USE THIS SITE
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 700,
            color: 'var(--color-text)',
            margin: '0 0 1.5rem',
            lineHeight: 1.15,
          }}>
            Every Practice Connects
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            lineHeight: 1.8,
            color: 'var(--color-text)',
            margin: '0 0 3rem',
            maxWidth: '680px',
          }}>
            Inner Practice isn&apos;t a collection of separate topics — it&apos;s a single system viewed through different lenses. The breath regulates the nervous system. The nervous system determines how fascia holds tension. Fascia hydration changes how you move. Movement changes how you sleep. Sleep is when the nervous system does its deepest repair. Every page here feeds every other page.
          </p>

          {/* The Three Layers */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 2.5vw, 32px)',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: '0 0 2rem',
            fontStyle: 'normal',
          }}>
            Three Layers, One System
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem',
          }}>
            {/* Layer 1: The Foundation */}
            <div style={{
              borderLeft: '3px solid #8B3A62',
              padding: '1.75rem',
              background: 'var(--color-surface-raised)',
              borderRadius: '2px',
            }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B3A62', margin: '0 0 0.75rem' }}>
                LAYER 1 — THE FOUNDATION
              </p>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>
                The Nervous System
              </h4>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>
                Everything starts here. The vagus nerve, polyvagal theory, HRV, and autonomic regulation are the meta-layer beneath every practice. Understand this and everything else makes sense — breathwork works because it stimulates the vagus nerve, yoga works because it regulates the autonomic nervous system, sleep works because the parasympathetic system finally gets to run the show.
              </p>
            </div>

            {/* Layer 2: The Practices */}
            <div style={{
              borderLeft: '3px solid var(--color-violet-deep)',
              padding: '1.75rem',
              background: 'var(--color-surface-raised)',
              borderRadius: '2px',
            }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-violet-deep)', margin: '0 0 0.75rem' }}>
                LAYER 2 — THE PRACTICES
              </p>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>
                Movement, Breath, Stillness
              </h4>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>
                Six core modalities — each a different doorway into the same nervous system. <strong>Meditation</strong> trains attention and awareness. <strong>Breathwork</strong> is the only voluntary control over the autonomic nervous system. <strong>Yoga</strong> combines posture, breath, and intention. <strong>Qigong</strong> adds slow flowing movement that hydrates fascia. <strong>Fascia</strong> work releases the tissue where the body stores tension. <strong>Somatics</strong> completes what the mind cannot.
              </p>
            </div>

            {/* Layer 3: The Integration */}
            <div style={{
              borderLeft: '3px solid #1B4D5C',
              padding: '1.75rem',
              background: 'var(--color-surface-raised)',
              borderRadius: '2px',
            }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1B4D5C', margin: '0 0 0.75rem' }}>
                LAYER 3 — THE INTEGRATION
              </p>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>
                Sleep, Sound, Energy, Intention
              </h4>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>
                <strong>Sleep</strong> is when the nervous system does its deepest regulation — glymphatic clearance, emotional processing, autonomic restoration. <strong>Sound healing</strong> uses vibration to shift brainwave states. <strong>Reiki</strong> works through presence and the relaxation response. <strong>Manifestation</strong> applies neuroscience and goal science to intention-setting. These aren&apos;t separate — they&apos;re the same system expressing through different channels.
              </p>
            </div>
          </div>

          {/* Where to Start */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 2.5vw, 32px)',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: '0 0 2rem',
            fontStyle: 'normal',
          }}>
            Where to Start
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.25rem',
            marginBottom: '3.5rem',
          }}>
            {[
              { goal: 'I want to reduce stress', path: 'Start with Breathwork → then Nervous System → then Meditation', links: [{ text: 'Breathwork', href: '/breathe' }, { text: 'Nervous System', href: '/nervous-system' }] },
              { goal: 'I want to sleep better', path: 'Start with Sleep → then Breathwork → then Yoga Nidra', links: [{ text: 'Sleep', href: '/sleep' }, { text: 'Breathwork', href: '/breathe' }] },
              { goal: 'I want to release tension', path: 'Start with Fascia → then Somatics → then Qigong', links: [{ text: 'Fascia', href: '/fascia' }, { text: 'Somatics', href: '/somatics' }] },
              { goal: 'I want to build a daily practice', path: 'Start with Practice → choose exercises → build routines', links: [{ text: 'Practice', href: '/practice' }, { text: 'Meditation', href: '/meditate' }] },
              { goal: 'I want to understand how it all works', path: 'Start with Nervous System → it explains everything else', links: [{ text: 'Nervous System', href: '/nervous-system' }, { text: 'Sleep', href: '/sleep' }] },
              { goal: 'I want gentle movement', path: 'Start with Qigong → then Yoga → then Fascia', links: [{ text: 'Qigong', href: '/qigong' }, { text: 'Yoga', href: '/yoga' }] },
            ].map((item) => (
              <div key={item.goal} style={{
                padding: '1.5rem',
                background: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
              }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', fontStyle: 'italic' }}>
                  &ldquo;{item.goal}&rdquo;
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 0.75rem', lineHeight: 1.6 }}>
                  {item.path}
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {item.links.map((link) => (
                    <Link key={link.href} href={link.href} style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--color-violet-deep)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--color-violet-mid)',
                      paddingBottom: '1px',
                    }}>
                      {link.text} →
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* The Practice Page */}
          <div style={{
            padding: '2rem 2.25rem',
            background: 'color-mix(in srgb, var(--color-violet-pale) 50%, var(--color-cream))',
            borderRadius: '2px',
            border: '1px solid var(--color-violet-mid)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--color-violet-deep)',
              margin: '0 0 0.75rem',
              fontStyle: 'normal',
            }}>
              Ready to practice?
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text)', margin: '0 0 1.25rem', lineHeight: 1.7 }}>
              The Practice page brings everything together — 48 guided exercises with timers, daily routine templates (morning, midday, evening), and a teacher certification path. Every exercise links back to the science page that explains why it works.
            </p>
            <Link href="/practice" style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-violet-deep)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              Open Practice →
            </Link>
          </div>
        </div>
      </section>

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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7A5A1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
                color: '#7A5A1E',
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
                color: '#7A5A1E',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Begin &rarr;
            </Link>
          </div>

          {/* Sleep card */}
          <div
            className="card"
            style={{
              padding: '2.5rem 2.25rem',
              borderRadius: '2px',
              borderTop: '3px solid #1B4D5C',
            }}
          >
            <div
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '9999px',
                background: '#A3C4CC',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B4D5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                <circle cx="17" cy="5" r="1" fill="#1B4D5C" stroke="none" />
                <circle cx="20" cy="3" r="0.75" fill="#1B4D5C" stroke="none" />
                <circle cx="19" cy="8" r="0.75" fill="#1B4D5C" stroke="none" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                fontWeight: 600,
                color: '#1B4D5C',
                margin: '0 0 0.75rem',
                fontStyle: 'normal',
              }}
            >
              Sleep
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              The science of sleep architecture, circadian timing, overnight HRV, and how every practice on this site either prepares you for sleep or benefits from it. Includes a 24-hour practice timing map.
            </p>
            <Link
              href="/sleep"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#1B4D5C',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Begin &rarr;
            </Link>
          </div>

          {/* Qigong card */}
          <div
            className="card"
            style={{
              padding: '2.5rem 2.25rem',
              borderRadius: '2px',
              borderTop: '3px solid #2D6B4F',
            }}
          >
            <div
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '9999px',
                background: '#A8D5BA',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D6B4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12c0-3.87 3.13-7 7-7s7 3.13 7 7" />
                <path d="M5 12c0 3.87 3.13 7 7 7s7-3.13 7-7" />
                <path d="M12 5c-2 3-2 11 0 14" />
                <path d="M12 5c2 3 2 11 0 14" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                fontWeight: 600,
                color: '#2D6B4F',
                margin: '0 0 0.75rem',
                fontStyle: 'normal',
              }}
            >
              Qigong
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              3,000 years of energy cultivation through slow flowing movement. Hydrates fascia, activates the vagus nerve, and trains interoception — the bridge between every practice on this site.
            </p>
            <Link
              href="/qigong"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#2D6B4F',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Begin &rarr;
            </Link>
          </div>

          {/* Chakras card */}
          <div
            className="card"
            style={{
              padding: '2.5rem 2.25rem',
              borderRadius: '2px',
              borderTop: '3px solid #6B3FA0',
            }}
          >
            <div
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '9999px',
                background: 'color-mix(in srgb, #B39DDB 35%, var(--color-cream))',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B3FA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="4" r="1.5" />
                <circle cx="12" cy="8" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="16" r="1.5" />
                <circle cx="12" cy="20" r="1.5" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                fontWeight: 600,
                color: '#6B3FA0',
                margin: '0 0 0.75rem',
                fontStyle: 'normal',
              }}
            >
              Chakras
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              The body-mind map — seven energy centers mapped to nerve plexuses, endocrine glands, and polyvagal states. See how every practice on this site connects to specific chakras.
            </p>
            <Link
              href="/chakras"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#6B3FA0',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Begin &rarr;
            </Link>
          </div>

          {/* Trauma card */}
          <div
            className="card"
            style={{
              padding: '2.5rem 2.25rem',
              borderRadius: '2px',
              borderTop: '3px solid #8B5E3C',
            }}
          >
            <div
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '9999px',
                background: 'color-mix(in srgb, #C4956A 25%, var(--color-cream))',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M8 12s1.5-2 4-2 4 2 4 2" />
                <path d="M9 9h.01" />
                <path d="M15 9h.01" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                fontWeight: 600,
                color: '#8B5E3C',
                margin: '0 0 0.75rem',
                fontStyle: 'normal',
              }}
            >
              Trauma
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              How trauma passes through generations via epigenetics, autonomic patterns, and fascial storage. The science of inheritance and how every practice on this site addresses a different layer of the inherited pattern.
            </p>
            <Link
              href="/trauma"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#8B5E3C',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Begin &rarr;
            </Link>
          </div>

          {/* Sound Healing card */}
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A5A1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                fontWeight: 600,
                color: '#7A5A1E',
                margin: '0 0 0.75rem',
                fontStyle: 'normal',
              }}
            >
              Sound Healing
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              Vibration as medicine. Explore how singing bowls, binaural beats, and resonance therapy shift brainwave states, entrain the nervous system, and create the conditions for deep repair.
            </p>
            <Link
              href="/sound-healing"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#7A5A1E',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Begin &rarr;
            </Link>
          </div>

          {/* Somatics card */}
          <div
            className="card"
            style={{
              padding: '2.5rem 2.25rem',
              borderRadius: '2px',
              borderTop: '3px solid #2D3A6A',
            }}
          >
            <div
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '9999px',
                background: '#E8EAF6',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D3A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4" />
                <path d="M12 2a4 4 0 0 0-4 4" />
                <path d="M12 22V10" />
                <path d="M8 10c0 0-3 1-3 5" />
                <path d="M16 10c0 0 3 1 3 5" />
                <path d="M9 22l3-4 3 4" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                fontWeight: 600,
                color: '#2D3A6A',
                margin: '0 0 0.75rem',
                fontStyle: 'normal',
              }}
            >
              Somatics
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              The body completes what the mind cannot. Somatic practices use slow, mindful movement to rewire the nervous system&apos;s habitual tension patterns — releasing what talk therapy alone cannot reach.
            </p>
            <Link
              href="/somatics"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#2D3A6A',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Begin &rarr;
            </Link>
          </div>

          {/* Reiki card */}
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A5A1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="M4.93 4.93l2.83 2.83" />
                <path d="M16.24 16.24l2.83 2.83" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="M4.93 19.07l2.83-2.83" />
                <path d="M16.24 7.76l2.83-2.83" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                fontWeight: 600,
                color: '#7A5A1E',
                margin: '0 0 0.75rem',
                fontStyle: 'normal',
              }}
            >
              Reiki
            </h3>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.75rem', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              Heal through presence and gentle touch. Explore how Reiki activates the relaxation response, the science behind biofield therapies, and how to integrate energy work into a complete practice.
            </p>
            <Link
              href="/reiki"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#7A5A1E',
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
