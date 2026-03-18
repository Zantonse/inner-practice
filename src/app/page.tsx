'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type PillarKey = 'mind' | 'body' | 'breath' | 'energy' | 'healing' | 'practice';

const pillars: {
  key: PillarKey;
  title: string;
  tagline: string;
  pages: { href: string; label: string }[];
  gradFrom: string;
  gradTo: string;
  overlayColor: string;
  accentColor: string;
  image: string;
}[] = [
  {
    key: 'mind',
    title: 'Mind',
    tagline: 'Stillness. Awareness. Intention.',
    pages: [
      { href: '/meditate', label: 'Meditate' },
      { href: '/manifest', label: 'Manifest' },
    ],
    gradFrom: 'oklch(75% 0.12 295)',
    gradTo: 'oklch(93% 0.03 60)',
    overlayColor: 'rgba(89,46,107,0.6)',
    accentColor: 'var(--color-amber-light)',
    image: '/images/hero-meditation.webp',
  },
  {
    key: 'body',
    title: 'Body',
    tagline: 'Move. Release. Restore.',
    pages: [
      { href: '/yoga', label: 'Yoga' },
      { href: '/fascia', label: 'Fascia' },
      { href: '/qigong', label: 'Qigong' },
      { href: '/somatics', label: 'Somatics' },
    ],
    gradFrom: 'oklch(55% 0.16 310)',
    gradTo: 'oklch(72% 0.1 290)',
    overlayColor: 'rgba(28,29,55,0.65)',
    accentColor: 'var(--color-amber-light)',
    image: '/images/hero-yoga.webp',
  },
  {
    key: 'breath',
    title: 'Breath',
    tagline: 'Command your nervous system.',
    pages: [
      { href: '/breathe', label: 'Breathwork' },
    ],
    gradFrom: 'oklch(60% 0.10 196)',
    gradTo: 'oklch(80% 0.07 185)',
    overlayColor: 'rgba(18,80,80,0.62)',
    accentColor: '#A8DADA',
    image: '/images/hero-breathwork.webp',
  },
  {
    key: 'energy',
    title: 'Energy',
    tagline: 'Vibration. Presence. Flow.',
    pages: [
      { href: '/chakras', label: 'Chakras' },
      { href: '/reiki', label: 'Reiki' },
      { href: '/sound-healing', label: 'Sound' },
    ],
    gradFrom: 'oklch(50% 0.08 55)',
    gradTo: 'oklch(75% 0.06 45)',
    overlayColor: 'rgba(139,105,20,0.55)',
    accentColor: '#F0D68A',
    image: '/images/hero-manifest.webp',
  },
  {
    key: 'healing',
    title: 'Healing',
    tagline: 'Regulate. Process. Restore.',
    pages: [
      { href: '/nervous-system', label: 'Nervous System' },
      { href: '/trauma', label: 'Trauma' },
      { href: '/sleep', label: 'Sleep' },
    ],
    gradFrom: 'oklch(55% 0.14 340)',
    gradTo: 'oklch(78% 0.09 350)',
    overlayColor: 'rgba(139,58,98,0.62)',
    accentColor: '#E8B4CF',
    image: '/images/hero-nervous-system.webp',
  },
  {
    key: 'practice',
    title: 'Practice',
    tagline: 'Timers. Routines. Progress.',
    pages: [
      { href: '/practice', label: 'Practice Hub' },
    ],
    gradFrom: 'oklch(60% 0.10 290)',
    gradTo: 'oklch(80% 0.06 280)',
    overlayColor: 'rgba(89,46,107,0.55)',
    accentColor: '#D7C2EE',
    image: '/images/hero-meditation.webp',
  },
];

const topRow = pillars.slice(0, 3);
const bottomRow = pillars.slice(3);

export default function HomePage() {
  const [hovered, setHovered] = useState<PillarKey | null>(null);

  const getCardFlex = (key: PillarKey, row: typeof pillars) => {
    const rowHovered = row.find(p => p.key === hovered);
    if (!rowHovered) return 1;
    return hovered === key ? 1.8 : 0.6;
  };

  return (
    <>
      <h1 className="sr-only">Inner Practice — Meditation, Yoga, Breathwork, Fascia, Nervous System, Manifestation &amp; Practice</h1>
      {/* ── Six-Pillar Hero (3 + 3 row layout) ──────────────────── */}
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
          {topRow.map((pillar, idx) => (
            <div
              key={pillar.key}
              style={{
                flex: getCardFlex(pillar.key, topRow),
                transition: 'flex 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'clamp(1.75rem, 4vw, 3.5rem)',
                background: `linear-gradient(160deg, ${pillar.gradFrom}, ${pillar.gradTo})`,
                minHeight: '44dvh',
              }}
              onMouseEnter={() => setHovered(pillar.key)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Background image */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  priority={pillar.key === 'mind'}
                  sizes="33vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    opacity: hovered === pillar.key ? 0.55 : 0.38,
                    transition: 'opacity 550ms ease',
                  }}
                />
              </div>

              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, ${pillar.overlayColor} 0%, ${pillar.overlayColor.replace(/[\d.]+\)$/, '0.05)')} 50%, transparent 100%)`,
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
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,234,225,0.6)',
                  margin: '0 0 0.625rem',
                }}>
                  {pillar.pages.length === 1 ? pillar.pages[0].label : `${pillar.pages.length} practices`}
                </p>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.25rem, 4.5vw, 4.5rem)',
                  fontWeight: 700,
                  color: '#F5EAE1',
                  lineHeight: 1.05,
                  margin: '0 0 0.875rem',
                }}>
                  {pillar.title}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)',
                  color: 'rgba(245,234,225,0.78)',
                  margin: '0 0 1.25rem',
                  maxWidth: '24ch',
                  lineHeight: 1.65,
                }}>
                  {pillar.tagline}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {pillar.pages.map(pg => (
                    <Link key={pg.href} href={pg.href} style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: pillar.accentColor,
                      textDecoration: 'none',
                      padding: '0.35rem 0.75rem',
                      border: `1px solid ${typeof pillar.accentColor === 'string' && pillar.accentColor.startsWith('#') ? pillar.accentColor + '40' : 'rgba(245,234,225,0.25)'}`,
                      borderRadius: '9999px',
                      transition: 'background 300ms ease',
                    }}>
                      {pg.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row — 3 panels */}
        <div
          className="hero-row"
          style={{
            display: 'flex',
            flex: 2,
            position: 'relative',
          }}
        >
          {bottomRow.map((pillar, idx) => (
            <div
              key={pillar.key}
              style={{
                flex: getCardFlex(pillar.key, bottomRow),
                transition: 'flex 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'clamp(1.75rem, 4vw, 3.5rem)',
                background: `linear-gradient(160deg, ${pillar.gradFrom}, ${pillar.gradTo})`,
                minHeight: '34dvh',
              }}
              onMouseEnter={() => setHovered(pillar.key)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Background image */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  sizes="33vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    opacity: hovered === pillar.key ? 0.55 : 0.38,
                    transition: 'opacity 550ms ease',
                  }}
                />
              </div>

              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, ${pillar.overlayColor} 0%, ${pillar.overlayColor.replace(/[\d.]+\)$/, '0.05)')} 50%, transparent 100%)`,
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
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,234,225,0.6)',
                  margin: '0 0 0.625rem',
                }}>
                  {pillar.pages.length === 1 ? pillar.pages[0].label : `${pillar.pages.length} practices`}
                </p>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.25rem, 4.5vw, 4.5rem)',
                  fontWeight: 700,
                  color: '#F5EAE1',
                  lineHeight: 1.05,
                  margin: '0 0 0.875rem',
                }}>
                  {pillar.title}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)',
                  color: 'rgba(245,234,225,0.78)',
                  margin: '0 0 1.25rem',
                  maxWidth: '24ch',
                  lineHeight: 1.65,
                }}>
                  {pillar.tagline}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {pillar.pages.map(pg => (
                    <Link key={pg.href} href={pg.href} style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: pillar.accentColor,
                      textDecoration: 'none',
                      padding: '0.35rem 0.75rem',
                      border: `1px solid ${typeof pillar.accentColor === 'string' && pillar.accentColor.startsWith('#') ? pillar.accentColor + '40' : 'rgba(245,234,225,0.25)'}`,
                      borderRadius: '9999px',
                      transition: 'background 300ms ease',
                    }}>
                      {pg.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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
    </>
  );
}
