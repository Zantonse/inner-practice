'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';
import StatCard from '@/components/StatCard';

// ── Accent tokens (chakras / rainbow + amethyst) ────────────────
const AMETHYST_DEEP = '#4E2D78';
const AMETHYST_MID = '#B39DDB';
const AMETHYST_PALE = '#EDE3F7';

const CHAKRA = {
  root:        { deep: '#C62828', mid: '#EF5350', pale: '#FFEBEE', name: 'Root', sanskrit: 'Muladhara', element: 'Earth', mantra: 'LAM', location: 'Base of spine', gland: 'Adrenals', plexus: 'Coccygeal/Sacral' },
  sacral:      { deep: '#E65100', mid: '#FF7043', pale: '#FBE9E7', name: 'Sacral', sanskrit: 'Svadhisthana', element: 'Water', mantra: 'VAM', location: 'Lower abdomen', gland: 'Gonads', plexus: 'Sacral (S1-S4)' },
  solarPlexus: { deep: '#F9A825', mid: '#FFCA28', pale: '#FFFDE7', name: 'Solar Plexus', sanskrit: 'Manipura', element: 'Fire', mantra: 'RAM', location: 'Solar plexus', gland: 'Pancreas', plexus: 'Celiac (Solar)' },
  heart:       { deep: '#2E7D32', mid: '#66BB6A', pale: '#E8F5E9', name: 'Heart', sanskrit: 'Anahata', element: 'Air', mantra: 'YAM', location: 'Center of chest', gland: 'Thymus', plexus: 'Cardiac' },
  throat:      { deep: '#1565C0', mid: '#42A5F5', pale: '#E3F2FD', name: 'Throat', sanskrit: 'Vishuddha', element: 'Ether', mantra: 'HAM', location: 'Throat', gland: 'Thyroid', plexus: 'Pharyngeal' },
  thirdEye:    { deep: '#4527A0', mid: '#7E57C2', pale: '#EDE7F6', name: 'Third Eye', sanskrit: 'Ajna', element: 'Light', mantra: 'OM', location: 'Between brows', gland: 'Pituitary', plexus: 'Cavernous' },
  crown:       { deep: '#6A1B9A', mid: '#AB47BC', pale: '#F3E5F5', name: 'Crown', sanskrit: 'Sahasrara', element: 'Consciousness', mantra: 'Silence', location: 'Crown of head', gland: 'Pineal', plexus: 'Cerebral cortex' },
};
const CHAKRA_LIST = Object.values(CHAKRA);


// ── Video tab data ─────────────────────────────────────────────
type VideoTab = 'chakra-meditation' | 'kundalini-yoga' | 'bija-mantra';

const videoData: Record<VideoTab, Array<{ videoId: string; title: string; description: string }>> = {
  'chakra-meditation': [
    {
      videoId: 'fuC9aB6wmpE',
      title: 'Seven Chakra Guided Meditation',
      description: 'A guided meditation moving through all seven chakras from root to crown. Each center receives breath, attention, and the associated bija mantra. Suitable for daily practice.',
    },
  ],
  'kundalini-yoga': [
    {
      videoId: '-DO_GgchYPA',
      title: 'Easy Kundalini Yoga Practice for Beginners',
      description: 'A complete Kundalini yoga set (kriya) designed to activate and move prana through the chakra column. Includes breathwork, movement, and meditation components.',
    },
  ],
  'bija-mantra': [
    {
      videoId: 'NmAHY_tg9Es',
      title: 'Quick 7 Chakra Cleansing Seed Mantras',
      description: 'Guided chanting of the seven seed syllables (LAM, VAM, RAM, YAM, HAM, OM, Silence) with sustained tones. The vibrational resonance of each mantra targets the associated plexus.',
    },
  ],
};

export default function ChakrasClient() {
  const [activeVideoTab, setActiveVideoTab] = useState<VideoTab>('chakra-meditation');

  return (
    <div
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-body)',
        lineHeight: 1.8,
        color: 'var(--color-text)',
      }}
    >

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '85dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(3rem, 8vw, 6rem) max(1.5rem, 8vw) clamp(4rem, 8vw, 7rem)',
          background: 'linear-gradient(160deg, oklch(30% 0.12 300), oklch(45% 0.15 280), oklch(35% 0.10 320))',
          overflow: 'hidden',
        }}
      >
        {/* Hero image */}
        <Image
          src="/images/hero-chakras.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.35 }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
          <p
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
            THE ENERGY CENTERS
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              color: '#F5EAE1',
              lineHeight: 1.05,
              margin: '0 0 1.5rem',
              maxWidth: '18ch',
            }}
          >
            The Body-Mind Map
          </h1>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'rgba(245,234,225,0.85)',
              margin: '0 0 2.5rem',
              maxWidth: '52ch',
              lineHeight: 1.75,
            }}
          >
            Seven energy centers, mapped to nerve plexuses, endocrine glands, and polyvagal states.
            The chakra system is the oldest map of where and why every practice on this site works.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { href: '#history', label: 'History' },
              { href: '#the-seven-chakras', label: 'The Seven Chakras' },
              { href: '#science', label: 'Science' },
              { href: '#practice-map', label: 'Practice Map' },
              { href: '#balancing', label: 'Balancing' },
              { href: '#kundalini', label: 'Kundalini' },
              { href: '#protocol', label: 'Protocol' },
              { href: '#practice', label: 'Practice' },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: AMETHYST_MID,
                  textDecoration: 'none',
                  borderBottom: `1px solid rgba(179,157,219,0.5)`,
                  paddingBottom: '0.25rem',
                  transition: 'opacity 200ms ease',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. HISTORY & ORIGINS
      ══════════════════════════════════════════════════════ */}
      <section
        id="history"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>

          {/* Two-column intro */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3.5rem',
            }}
          >
            <ScrollReveal>
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
                3,500 YEARS OF MAPPING THE BODY
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h2)',
                  fontWeight: 400,
                  color: 'var(--color-text)',
                  margin: '0 0 1.5rem',
                }}
              >
                History &amp; Origins
              </h2>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The most influential chakra text in the Western world is the <strong>Sat-Cakra-Nirupana</strong>
                (1577 CE), written by Purnananda Swami. This Sanskrit tantric text systematized the six-center
                model that underlies most modern chakra maps. Its English translation by Arthur Avalon
                (Sir John Woodroffe) in 1919 — <em>The Serpent Power</em> — introduced the system to Western
                esoteric and theosophical circles.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The original intent was not wellness or metaphor. The chakra system was developed as a
                <strong> visualization technology for spiritual transformation</strong> — a map for moving
                awareness through the body during tantric meditation practices. The goal was liberation
                (<em>moksha</em>), not balance.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                The Modern Synthesis
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Scholar Christopher Wallis (Hareesh) notes that multiple chakra systems existed across
                tantric traditions — using 5, 6, 9, 12, or 21 centers — and that no single authoritative
                canon existed. The tidy seven-chakra rainbow model widely used today is largely a 20th-century
                construction.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The rainbow color sequence — red to violet from root to crown — was not in the classical
                texts. It was mapped by <strong>Christopher Hills</strong> in 1977, correlating chakras to
                the visible light spectrum. This innovation became so ubiquitous that most practitioners
                now assume it is ancient.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The modern chakra model is a genuine synthesis: <strong>Tantric anatomy</strong> (the
                plexus-gland correspondences), <strong>Theosophical cosmology</strong> (color spectrum,
                subtle bodies), <strong>Jungian psychology</strong> (archetypes per center), and
                <strong> New Age integration</strong> (personal growth framing). Each layer is real; none is
                the whole truth.
              </p>
            </ScrollReveal>
          </div>

          {/* Stat Cards */}
          <ScrollReveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '1.5rem',
                marginBottom: '3.5rem',
              }}
            >
              <StatCard
                source="Purnananda Swami"
                stat="1577 CE"
                detail="Sat-Cakra-Nirupana systematized the six-center model that underlies most modern chakra maps. Translated by Arthur Avalon (Woodroffe) in 1919 as The Serpent Power."
                accentColor={AMETHYST_MID}
                accentTextColor={AMETHYST_DEEP}
              />
              <StatCard
                source="Christopher Hills"
                stat="1977"
                detail="Mapped the rainbow color sequence now used worldwide, correlating each chakra to a band of the visible light spectrum. This innovation is now widely mistaken for ancient tradition."
                accentColor={AMETHYST_MID}
                accentTextColor={AMETHYST_DEEP}
              />
              <StatCard
                source="The standard model"
                stat="7"
                detail="Though traditions used 5, 6, 9, 12, or 21 centers, the seven-chakra model has become the universal reference point — a modern synthesis, not a single received canon."
                accentColor={AMETHYST_MID}
                accentTextColor={AMETHYST_DEEP}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          4. THE SEVEN CHAKRAS
      ══════════════════════════════════════════════════════ */}
      <section
        id="the-seven-chakras"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${AMETHYST_PALE})`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
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
              THE SEVEN CENTERS
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              The Seven Chakras
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '60ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Each chakra corresponds to a nerve plexus, an endocrine gland, a psychological domain,
              and an elemental quality. The physical correspondences are the bridge between ancient
              mapping and modern anatomy.
            </p>
          </ScrollReveal>

          <div style={{ margin: '2.5rem 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <Image
              src="/images/illustrations/chakras-seven-centers.jpg"
              alt="The seven chakras aligned along the spine — Muladhara through Sahasrara with their traditional colors"
              width={1200}
              height={800}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {CHAKRA_LIST.map((chakra) => {
              const psychMap: Record<string, { domain: string; balance: string[]; imbalance: string[] }> = {
                Root: {
                  domain: 'Survival, safety, and grounding. The Root chakra governs our most fundamental sense of belonging in the body and on the earth — the felt sense of being safe enough to exist.',
                  balance: ['Grounded and stable in daily life', 'Able to meet basic needs without chronic anxiety'],
                  imbalance: ['Chronic anxiety and hypervigilance', 'Hoarding, scarcity mindset', 'Lower back pain and adrenal fatigue'],
                },
                Sacral: {
                  domain: 'Pleasure, creativity, and emotional fluidity. The Sacral chakra governs our capacity to feel, to create, and to move between states — the water-like quality of adaptation.',
                  balance: ['Creative flow and healthy emotional range', 'Healthy relational boundaries'],
                  imbalance: ['Emotional numbness or overwhelm', 'Guilt around pleasure', 'Hip tightness and reproductive issues'],
                },
                'Solar Plexus': {
                  domain: 'Personal power, will, and self-esteem. The Solar Plexus is the center of autonomous action — the capacity to digest experience (literally and metaphorically) and assert one\'s place in the world.',
                  balance: ['Confident, purposeful action', 'Good digestive health and metabolic resilience'],
                  imbalance: ['Control issues and domination or submission patterns', 'Chronic digestive problems, IBS', 'Shame, powerlessness'],
                },
                Heart: {
                  domain: 'Love, compassion, and integration. The Heart bridges the lower three (body/survival) and upper three (spirit/expression) chakras — making it the fulcrum of the whole system.',
                  balance: ['Genuine empathy and capacity for forgiveness', 'Open to intimacy without losing self'],
                  imbalance: ['Codependency or emotional armoring', 'Chest tightness, immune dysregulation', 'Grief held in the body'],
                },
                Throat: {
                  domain: 'Expression, truth, and authenticity. The Throat governs all forms of communication — not just speech, but the courage to express inner truth outwardly in the world.',
                  balance: ['Speaks truth clearly and with integrity', 'Creative voice finds authentic form'],
                  imbalance: ['Thyroid dysfunction, TMJ, chronic throat tension', 'Inability to speak up or assert needs', 'Fear of being heard'],
                },
                'Third Eye': {
                  domain: 'Intuition, insight, and visualization. The Third Eye is the center of perception beyond the ordinary senses — pattern recognition, imagination, and the capacity to see through surface reality.',
                  balance: ['Clear intuition and sound discernment', 'Vivid imagination, lucid dreaming'],
                  imbalance: ['Chronic headaches and migraines', 'Confusion, inability to concentrate', 'Delusion and disconnection from consensus reality'],
                },
                Crown: {
                  domain: 'Transcendence, unity, and existential meaning. The Crown connects individual consciousness to the universal — the dissolution of the isolated self into something larger.',
                  balance: ['Genuine spiritual connection and equanimity', 'Sense of purpose beyond the personal'],
                  imbalance: ['Existential disconnection and depression', 'Chronic insomnia and nervous system dysregulation', 'Spiritual bypass or nihilism'],
                },
              };
              const psych = psychMap[chakra.name] || { domain: '', balance: [], imbalance: [] };

              return (
                <ScrollReveal key={chakra.name}>
                  <div
                    style={{
                      borderLeft: `4px solid ${chakra.deep}`,
                      background: 'var(--color-surface-raised)',
                      borderRadius: '0 2px 2px 0',
                      padding: '1.75rem 2rem',
                    }}
                  >
                    {/* Header row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: '0 0 auto' }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.375rem',
                            fontWeight: 700,
                            color: chakra.deep,
                            margin: '0 0 0.125rem',
                            fontStyle: 'normal',
                          }}
                        >
                          {chakra.name}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '0.75rem',
                            color: 'var(--color-text-muted)',
                            margin: 0,
                            fontStyle: 'italic',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {chakra.sanskrit}
                        </p>
                      </div>
                      {/* Pills */}
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        {[
                          { label: chakra.location },
                          { label: chakra.element },
                          { label: `Mantra: ${chakra.mantra}` },
                        ].map(pill => (
                          <span
                            key={pill.label}
                            style={{
                              fontFamily: 'var(--font-ui)',
                              fontSize: '0.625rem',
                              fontWeight: 600,
                              letterSpacing: '0.06em',
                              padding: '0.25rem 0.625rem',
                              borderRadius: '9999px',
                              background: chakra.pale,
                              color: chakra.deep,
                              border: `1px solid ${chakra.mid}`,
                            }}
                          >
                            {pill.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Physical + Psychological grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                        gap: '1.5rem',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '0.625rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: chakra.deep,
                            margin: '0 0 0.375rem',
                          }}
                        >
                          Physical Correspondences
                        </p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: '0 0 0.25rem' }}>
                          <strong>Gland:</strong> {chakra.gland}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                          <strong>Nerve Plexus:</strong> {chakra.plexus}
                        </p>
                      </div>

                      <div>
                        <p
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '0.625rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: chakra.deep,
                            margin: '0 0 0.375rem',
                          }}
                        >
                          Psychological Domain
                        </p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                          {psych.domain}
                        </p>
                      </div>

                      <div>
                        <p
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '0.625rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#2D6A4F',
                            margin: '0 0 0.375rem',
                          }}
                        >
                          In Balance
                        </p>
                        <ul
                          style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: 1.75,
                            paddingLeft: '1.125rem',
                            margin: 0,
                          }}
                        >
                          {psych.balance.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>

                      <div>
                        <p
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '0.625rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#8B3A62',
                            margin: '0 0 0.375rem',
                          }}
                        >
                          Out of Balance
                        </p>
                        <ul
                          style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: 1.75,
                            paddingLeft: '1.125rem',
                            margin: 0,
                          }}
                        >
                          {psych.imbalance.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          6. THE SCIENCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="science"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
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
              THE BRIDGE
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              The Science
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '60ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Polyvagal theory, neuropeptide biology, and autonomic neuroscience provide a
              physiological substrate for the chakra map. The correspondences are not perfect —
              but they are not arbitrary.
            </p>
          </ScrollReveal>

          {/* Polyvagal overlay */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3.5rem',
            }}
          >
            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                The Polyvagal Overlay
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Stephen Porges&rsquo; Polyvagal Theory maps onto the chakra column with striking
                precision. The <strong>dorsal vagal complex</strong> — governing the oldest
                freeze/immobilization response — corresponds to the <strong>Root and Sacral</strong>{' '}
                chakras: survival, embodiment, basic safety.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The <strong>sympathetic nervous system</strong> — fight/flight, mobilization for
                action — corresponds to the <strong>Solar Plexus</strong>: personal power, will,
                the gut-brain axis and adrenal activation.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The <strong>ventral vagal complex</strong> — the evolved social engagement system
                — corresponds to the <strong>Heart and Throat</strong>: connection, compassion,
                voice, authentic expression. The <strong>Third Eye and Crown</strong> correspond
                to cortical integration — the capacity to hold complexity, witness the self, and
                access states beyond ordinary cognition.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                The Vagus Nerve &amp; Neuropeptides
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The vagus nerve — the anatomical seat of Polyvagal Theory — passes through the
                locations of every major chakra from the brainstem downward. Its branches innervate
                the cardiac plexus (Heart), the celiac plexus (Solar Plexus), and the sacral plexus
                (Root/Sacral). The chakra map may be a pre-scientific description of vagal
                innervation patterns.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Candace Pert&rsquo;s research on <strong>neuropeptides and their receptors</strong>{' '}
                found that the highest concentrations of neuropeptide receptors in the body cluster
                at the major nerve plexuses — which correspond precisely to the classical chakra
                locations. She described these sites as &ldquo;nodes of information exchange&rdquo; —
                exactly the function chakras were described as serving.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${AMETHYST_MID}`,
                  padding: '1rem 1.25rem',
                  background: AMETHYST_PALE,
                  borderRadius: '0 2px 2px 0',
                  marginTop: '1rem',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: AMETHYST_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  The honest framing: the chakra system was not derived from anatomy — but its
                  phenomenological mapping often converges with what modern neuroscience has
                  independently discovered about where and how the body processes information.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div style={{ margin: '2.5rem 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <Image
              src="/images/illustrations/chakras-polyvagal-overlay.jpg"
              alt="Polyvagal theory mapped to the chakra system — dorsal vagal maps to root and sacral, sympathetic to solar plexus, ventral vagal to heart and throat, integration to third eye and crown"
              width={1200}
              height={800}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Evidence table */}
          <ScrollReveal>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
                fontStyle: 'normal',
              }}
            >
              Science Correspondences
            </h3>
          </ScrollReveal>

          <div style={{ margin: '2.5rem 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <Image
              src="/images/illustrations/chakras-nerve-endocrine.jpg"
              alt="Science meets tradition — nerve plexuses on the left and endocrine glands on the right both correspond to the seven chakra locations"
              width={1200}
              height={800}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                chakra: 'Root / Sacral',
                color: '#C62828',
                science: 'Dorsal vagal complex, HPA axis, adrenal-gonadal hormones. Freeze and mobilization states. Peter Levine\'s somatic work targets this level directly.',
              },
              {
                chakra: 'Solar Plexus',
                color: '#F9A825',
                science: 'Enteric nervous system (the gut-brain), celiac plexus, sympathetic mobilization. The gut contains more neurons than the spinal cord. Gut feelings are anatomically real.',
              },
              {
                chakra: 'Heart',
                color: '#2E7D32',
                science: 'Cardiac plexus, ventral vagal complex, HRV. The heart generates its own electromagnetic field and communicates bidirectionally with the brain via the vagus nerve.',
              },
              {
                chakra: 'Throat',
                color: '#1565C0',
                science: 'Pharyngeal plexus, thyroid axis, vocal cord musculature. Authentic expression requires ventral vagal safety — the same state required for social engagement.',
              },
              {
                chakra: 'Third Eye',
                color: '#4527A0',
                science: 'Pituitary-hypothalamic axis, thalamic gating of consciousness, default mode network. The pituitary coordinates the entire endocrine system.',
              },
              {
                chakra: 'Crown',
                color: '#6A1B9A',
                science: 'Pineal gland (melatonin, DMT research), cortical integration, gamma-wave coherence in deep meditation states. The convergence of all sensory processing.',
              },
            ].map(item => (
              <ScrollReveal key={item.chakra}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    padding: '1.5rem',
                    borderTop: `3px solid ${item.color}`,
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.75rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {item.chakra}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {item.science}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          8. PRACTICE CROSS-REFERENCE MAP
      ══════════════════════════════════════════════════════ */}
      <section
        id="practice-map"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${AMETHYST_PALE})`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
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
              EVERY PRACTICE HAS A CHAKRA
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              The Practice Map
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '60ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Each modality on this site works through specific chakras. Understanding which
              center a practice targets helps you choose the right tool for the stuck point
              you are working with.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                modality: 'Breathwork',
                href: '/breathe',
                entries: [
                  { technique: 'Wim Hof / Tummo', chakra: 'Solar Plexus', color: CHAKRA.solarPlexus.deep },
                  { technique: 'Coherence (5.5 bpm)', chakra: 'Heart', color: CHAKRA.heart.deep },
                  { technique: 'Cyclic Sighing', chakra: 'Heart / Throat', color: CHAKRA.throat.deep },
                  { technique: 'Nadi Shodhana', chakra: 'Third Eye', color: CHAKRA.thirdEye.deep },
                ],
              },
              {
                modality: 'Yoga',
                href: '/yoga',
                entries: [
                  { technique: 'Standing poses', chakra: 'Root', color: CHAKRA.root.deep },
                  { technique: 'Hip openers', chakra: 'Sacral', color: CHAKRA.sacral.deep },
                  { technique: 'Twists / core work', chakra: 'Solar Plexus', color: CHAKRA.solarPlexus.deep },
                  { technique: 'Backbends', chakra: 'Heart', color: CHAKRA.heart.deep },
                ],
              },
              {
                modality: 'Qigong',
                href: '/qigong',
                entries: [
                  { technique: 'Lower Dantian work', chakra: 'Root / Sacral', color: CHAKRA.sacral.deep },
                  { technique: 'Middle Dantian', chakra: 'Heart', color: CHAKRA.heart.deep },
                  { technique: 'Upper Dantian', chakra: 'Third Eye', color: CHAKRA.thirdEye.deep },
                  { technique: 'Microcosmic Orbit', chakra: 'All centers', color: AMETHYST_DEEP },
                ],
              },
              {
                modality: 'Reiki',
                href: '/reiki',
                entries: [
                  { technique: 'Level 1 self-healing', chakra: 'Root / Sacral', color: CHAKRA.sacral.deep },
                  { technique: 'Byosen scanning', chakra: 'All centers', color: AMETHYST_DEEP },
                  { technique: 'Cho Ku Rei symbol', chakra: 'Root', color: CHAKRA.root.deep },
                  { technique: 'Hon Sha Ze Sho Nen', chakra: 'Third Eye / Crown', color: CHAKRA.crown.deep },
                ],
              },
              {
                modality: 'Sound Healing',
                href: '/sound-healing',
                entries: [
                  { technique: '174 Hz / 396 Hz', chakra: 'Root', color: CHAKRA.root.deep },
                  { technique: '417 Hz / 528 Hz', chakra: 'Sacral / Solar Plexus', color: CHAKRA.solarPlexus.deep },
                  { technique: '639 Hz / 741 Hz', chakra: 'Heart / Throat', color: CHAKRA.heart.deep },
                  { technique: '852 Hz / 963 Hz', chakra: 'Third Eye / Crown', color: CHAKRA.crown.deep },
                ],
              },
              {
                modality: 'Fascia',
                href: '/fascia',
                entries: [
                  { technique: 'Myofascial release (hips)', chakra: 'Root / Sacral', color: CHAKRA.sacral.deep },
                  { technique: 'Diaphragm release', chakra: 'Solar Plexus / Heart', color: CHAKRA.heart.deep },
                  { technique: 'Thoracic mobilization', chakra: 'Heart / Throat', color: CHAKRA.throat.deep },
                  { technique: 'Cranial work', chakra: 'Third Eye / Crown', color: CHAKRA.crown.deep },
                ],
              },
              {
                modality: 'Meditation',
                href: '/meditate',
                entries: [
                  { technique: 'Body scan', chakra: 'Root through Sacral', color: CHAKRA.sacral.deep },
                  { technique: 'Loving-kindness (metta)', chakra: 'Heart', color: CHAKRA.heart.deep },
                  { technique: 'Open awareness', chakra: 'Third Eye / Crown', color: CHAKRA.crown.deep },
                  { technique: 'Chakra visualization', chakra: 'All centers', color: AMETHYST_DEEP },
                ],
              },
              {
                modality: 'Sleep',
                href: '/sleep',
                entries: [
                  { technique: 'Yoga Nidra', chakra: 'Root → Crown progression', color: AMETHYST_DEEP },
                  { technique: '4-7-8 breathing', chakra: 'Heart / Throat', color: CHAKRA.throat.deep },
                  { technique: 'Body scan pre-sleep', chakra: 'Root / Sacral', color: CHAKRA.root.deep },
                  { technique: 'Dream incubation', chakra: 'Third Eye', color: CHAKRA.thirdEye.deep },
                ],
              },
            ].map(card => (
              <ScrollReveal key={card.modality}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    padding: '1.5rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: AMETHYST_DEEP,
                      margin: '0 0 1rem',
                    }}
                  >
                    {card.modality}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {card.entries.map(entry => (
                      <div
                        key={entry.technique}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}
                      >
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '9999px',
                            background: entry.color,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                          <strong style={{ color: 'var(--color-text)', fontWeight: 600 }}>{entry.technique}</strong>
                          {' '}&rarr;{' '}{entry.chakra}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          10. OPENING & BALANCING
      ══════════════════════════════════════════════════════ */}
      <section
        id="balancing"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
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
              WORKING WITH YOUR CHAKRAS
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              Opening &amp; Balancing
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2rem',
                maxWidth: '60ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              In autonomic terms, an &ldquo;open&rdquo; chakra is one where the associated plexus
              receives adequate neural tone — where blood flow, innervation, and hormonal signaling
              are appropriately regulated. &ldquo;Closing&rdquo; is the protective contraction that
              occurs in response to threat or trauma. The practices below work through this lens.
            </p>
          </ScrollReveal>

          {/* Technique table */}
          <ScrollReveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { chakra: 'Root', color: CHAKRA.root.deep, pale: CHAKRA.root.pale, technique: 'Grounding walk (barefoot), standing poses, drumming, root vegetables', timing: 'Morning, daily' },
                { chakra: 'Sacral', color: CHAKRA.sacral.deep, pale: CHAKRA.sacral.pale, technique: 'Hip circles, dance, water immersion, creative expression, orange color meditation', timing: 'Morning or midday' },
                { chakra: 'Solar Plexus', color: CHAKRA.solarPlexus.deep, pale: CHAKRA.solarPlexus.pale, technique: 'Core strengthening, Kapalabhati breath, sun salutations, exposure to sunlight', timing: 'Morning, peak energy' },
                { chakra: 'Heart', color: CHAKRA.heart.deep, pale: CHAKRA.heart.pale, technique: 'Coherence breathing (5.5 bpm), loving-kindness meditation, chest openers, hugging (20+ sec)', timing: 'Any time, especially difficult days' },
                { chakra: 'Throat', color: CHAKRA.throat.deep, pale: CHAKRA.throat.pale, technique: 'Chanting bija mantras, singing, journaling truth, lion pose (Simhasana), neck stretches', timing: 'Morning, before expression' },
                { chakra: 'Third Eye', color: CHAKRA.thirdEye.deep, pale: CHAKRA.thirdEye.pale, technique: 'Nadi Shodhana, trataka (candle gazing), visualization practices, darkness meditation', timing: 'Dusk, before sleep' },
                { chakra: 'Crown', color: CHAKRA.crown.deep, pale: CHAKRA.crown.pale, technique: 'Silent sitting, open awareness meditation, fasting, nature immersion, gratitude practice', timing: 'Dawn, after deep practice' },
              ].map(row => (
                <div
                  key={row.chakra}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 80px) minmax(0, 1fr)',
                    gap: '0.75rem',
                    alignItems: 'start',
                    borderLeft: `3px solid ${row.color}`,
                    padding: '1rem 1.25rem',
                    background: 'var(--color-surface-raised)',
                    borderRadius: '0 2px 2px 0',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: row.color,
                      margin: 0,
                    }}
                  >
                    {row.chakra}
                  </p>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 0.25rem', lineHeight: 1.6 }}>
                      {row.technique}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.6875rem',
                        color: row.color,
                        fontStyle: 'italic',
                        margin: 0,
                        lineHeight: 1.5,
                        opacity: 0.8,
                      }}
                    >
                      {row.timing}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          12. KUNDALINI & SAFETY
      ══════════════════════════════════════════════════════ */}
      <section
        id="kundalini"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${AMETHYST_PALE})`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
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
              THE SERPENT ENERGY
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              Kundalini &amp; Safety
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '56ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Kundalini is described as a dormant energy coiled at the base of the spine that,
              when awakened, rises through the chakra column toward the crown. Classical texts
              treat this as the central event of spiritual transformation — and a process that
              requires careful preparation.
            </p>
          </ScrollReveal>

          <div style={{ margin: '2.5rem 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <Image
              src="/images/illustrations/chakras-kundalini.jpg"
              alt="Kundalini energy rising — the coiled serpent at the base of the spine awakens and spirals upward through each chakra to the thousand-petaled lotus at the crown"
              width={1200}
              height={800}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3rem',
            }}
          >
            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                The Classical Account
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Described in the Sat-Cakra-Nirupana as <em>kundalini shakti</em> — the primordial
                energy (shakti) of consciousness lying dormant as a coiled serpent at the Muladhara
                (Root) chakra. Through sustained yogic practice — asana, pranayama, bandhas, and
                meditation — this energy is awakened and drawn upward through the sushumna nadi
                (central channel) to the Sahasrara (Crown).
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                <strong>Gopi Krishna</strong> (1903&ndash;1984) wrote the most detailed first-person
                account of spontaneous kundalini awakening in <em>Kundalini: The Evolutionary
                Energy in Man</em> (1967). His account describes years of disorienting experiences —
                sensations of heat, pressure, altered perception, and radical changes in consciousness
                — before stabilization. He argued it was a biological process, not merely metaphorical.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Kundalini Syndrome &amp; Spiritual Emergency
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Psychiatrist <strong>Stanislav Grof</strong> and Christina Grof documented hundreds
                of cases of what they termed &ldquo;spiritual emergency&rdquo; — intense, destabilizing
                episodes triggered by meditation, breathwork, or spontaneous events. Kundalini syndrome
                is one of the most commonly reported types.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Symptoms reported: involuntary body movements (<em>kriyas</em>), heat or electricity
                in the spine, visual phenomena, altered states, radical emotional releases, temporary
                ego dissolution, and — in some cases — extended periods of functional impairment. The
                Spiritual Emergence Network was founded to provide support for practitioners navigating
                these experiences.
              </p>
            </ScrollReveal>
          </div>

          {/* Contraindications callout */}
          <ScrollReveal>
            <div
              style={{
                border: `1px solid #8B3A62`,
                borderLeft: `3px solid #8B3A62`,
                padding: '1.5rem 1.75rem',
                background: 'rgba(139,58,98,0.06)',
                borderRadius: '0 2px 2px 0',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#8B3A62',
                  margin: '0 0 0.75rem',
                }}
              >
                Contraindications &amp; Cautions
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.75,
                  margin: '0 0 0.75rem',
                }}
              >
                Intensive kundalini practices carry genuine risk for certain populations. Do not
                pursue aggressive kundalini activation if:
              </p>
              <ul
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.9,
                  paddingLeft: '1.25rem',
                  margin: 0,
                }}
              >
                <li>You have a personal or family history of psychosis or schizophrenia spectrum disorders</li>
                <li>You are currently in an acute mental health crisis or severe depression</li>
                <li>You have a history of trauma that has not been processed with professional support</li>
                <li>You are taking medications that alter consciousness or seizure threshold</li>
                <li>You lack access to an experienced teacher or support network</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          13. BOTTOM-UP PROTOCOL
      ══════════════════════════════════════════════════════ */}
      <section
        id="protocol"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '860px' }}>
          <ScrollReveal>
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
              BUILD FROM THE GROUND UP
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              Bottom-Up Protocol
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '52ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              The classical and trauma-informed advice converges: begin at the root, establish safety,
              and move upward. Attempting to work with upper chakras before the lower ones are stable
              is the most common error in chakra practice.
            </p>
          </ScrollReveal>

          <div className="timeline" style={{ paddingLeft: '2.5rem' }}>
            {[
              {
                step: '1',
                color: CHAKRA.root.deep,
                title: 'Root & Sacral — Weeks 1–4',
                desc: 'Establish physical grounding before anything else. Daily: 20-minute grounding walk (barefoot when possible), basic hip-opening yoga, diaphragmatic breathing to activate the sacral plexus. The question this phase answers: Is my body safe?',
              },
              {
                step: '2',
                color: CHAKRA.solarPlexus.deep,
                title: 'Solar Plexus & Heart — Weeks 5–8',
                desc: 'Build personal power and begin opening the cardiac field. Add: core strengthening (solar plexus activation), coherence breathing (5.5 bpm, 20 min daily for heart coherence), loving-kindness meditation. The question this phase answers: Am I capable, and can I love?',
              },
              {
                step: '3',
                color: CHAKRA.throat.deep,
                title: 'Throat & Third Eye — Weeks 9–12',
                desc: 'Express and perceive. Add: daily bija mantra chanting (especially HAM for throat), Nadi Shodhana pranayama, regular journaling of inner truth, trataka (candle gazing). The question this phase answers: Can I speak my truth and trust my perception?',
              },
              {
                step: '4',
                color: CHAKRA.crown.deep,
                title: 'Crown — Ongoing',
                desc: 'Integration and transcendence cannot be forced — they are the fruit of the previous three phases. Practice: extended silent sitting, open awareness meditation, time in nature without agenda. The question dissolves: Who is asking?',
              },
            ].map(item => (
              <div key={item.step} style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <div
                  className="timeline-node"
                  style={{ background: item.color }}
                >
                  {item.step}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--color-text)',
                    lineHeight: 1.75,
                    margin: '0 0 0.25rem',
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          14. "Now, practice." SEPARATOR + VIDEOS
      ══════════════════════════════════════════════════════ */}
      {/* Section break — amethyst */}
      <div
        id="practice"
        style={{
          padding: '2.5rem max(1.5rem, 8vw)',
          background: AMETHYST_DEEP,
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'rgba(179,157,219,0.3)' }} />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: AMETHYST_MID,
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Now, practice.
        </p>
        <div style={{ flex: 1, height: '1px', background: 'rgba(179,157,219,0.3)' }} />
      </div>

      {/* Practice / Video section */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(5rem, 9vw, 8rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              Guided Practices
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              Choose based on what you are working with. Chakra meditation for overview and
              integration. Kundalini yoga for activation and energy movement. Bija mantra for
              vibrational targeting of individual centers.
            </p>
          </ScrollReveal>

          {/* Pill tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0.625rem',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
            }}
          >
            {[
              { key: 'chakra-meditation' as VideoTab, label: 'Chakra Meditation' },
              { key: 'kundalini-yoga' as VideoTab, label: 'Kundalini Yoga' },
              { key: 'bija-mantra' as VideoTab, label: 'Bija Mantra' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveVideoTab(tab.key)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 1.125rem',
                  borderRadius: '9999px',
                  border: `1px solid ${activeVideoTab === tab.key ? AMETHYST_DEEP : 'var(--color-border)'}`,
                  background:
                    activeVideoTab === tab.key ? AMETHYST_DEEP : 'var(--color-surface-raised)',
                  color: activeVideoTab === tab.key ? '#ffffff' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Video grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '2rem',
            }}
          >
            {videoData[activeVideoTab].map(video => (
              <ScrollReveal key={video.videoId}>
                <div>
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '16 / 9',
                      marginBottom: '1rem',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    <VideoFacade videoId={video.videoId} title={video.title} />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.5rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {video.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {video.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          15. CROSS-LINKS FOOTER
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)',
          background: `linear-gradient(160deg, oklch(30% 0.12 300 / 0.18), var(--color-cream))`,
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              Chakras Connect Every Practice
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              Each page on this site maps to one or more chakras. Use this as a navigation guide
              for your stuck points.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '1rem',
              marginBottom: '4rem',
            }}
          >
            {[
              {
                href: '/breathe',
                label: 'Breathwork',
                desc: 'Solar Plexus activation through Tummo; Heart coherence through resonance breathing; Third Eye through Nadi Shodhana.',
              },
              {
                href: '/nervous-system',
                label: 'Nervous System',
                desc: 'Polyvagal theory maps directly onto the chakra column — the science substrate for every center.',
              },
              {
                href: '/yoga',
                label: 'Yoga',
                desc: 'Each asana family targets specific chakras. Standing poses root. Hip openers open sacral. Backbends open the heart.',
              },
              {
                href: '/meditate',
                label: 'Meditate',
                desc: 'Body scan grounds the lower chakras. Loving-kindness opens the Heart. Open awareness accesses Crown.',
              },
              {
                href: '/somatics',
                label: 'Somatics',
                desc: 'Somatic practices discharge the stored survival responses held in Root and Sacral — the foundation of the whole system.',
              },
              {
                href: '/qigong',
                label: 'Qigong',
                desc: 'The Three Dantians in Qigong correspond directly to the lower, middle, and upper chakra groupings.',
              },
              {
                href: '/reiki',
                label: 'Reiki',
                desc: 'Reiki hand positions map to chakra locations. Byosen scanning assesses each center\'s energy quality.',
              },
              {
                href: '/sound-healing',
                label: 'Sound Healing',
                desc: 'Solfeggio frequencies and singing bowls are tuned to specific chakras. Vibrational resonance works through the plexus.',
              },
              {
                href: '/fascia',
                label: 'Fascia',
                desc: 'Fascial densification at the hips, diaphragm, and thorax corresponds to Root, Solar Plexus, and Heart restrictions.',
              },
              {
                href: '/sleep',
                label: 'Sleep',
                desc: 'Yoga Nidra moves through the chakra column systematically. Root and Sacral safety is the prerequisite for deep sleep.',
              },
              {
                href: '/practice',
                label: 'Practice',
                desc: 'The full practice library with chakra filters — find the right technique for the center you are working with.',
              },
              {
                href: '/trauma',
                label: 'Trauma',
                desc: 'Stored trauma lodges in the lower chakras — Root, Sacral, Solar Plexus. Healing the pattern clears the foundation of the whole system.',
              },
              {
                href: '/nutrition',
                label: 'Nutrition',
                desc: 'Each chakra has traditional food correspondences — root vegetables for Root, orange foods for Sacral, greens for Heart — reflecting embodied nourishment.',
              },
              {
                href: '/temperature',
                label: 'Temperature',
                desc: 'Heat and cold exposure affect the same energy centers that chakra work targets — Agni (digestive fire) in the Solar Plexus, cooling in the Crown.',
              },
              {
                href: '/nature',
                label: 'Nature',
                desc: 'The Root chakra grounds through direct contact with earth. Nature immersion is a direct practice for the lower chakras and parasympathetic regulation.',
              },
              {
                href: '/taichi',
                label: 'Tai Chi',
                desc: 'The Three Dantians in tai chi correspond directly to the lower, middle, and upper chakra groupings — a parallel energetic map.',
              },
              {
                href: '/fasting',
                label: 'Fasting',
                desc: 'Traditional solar plexus (Manipura) practices are associated with digestive fire — a metaphorical framework for fasting\'s metabolic activation.',
              },
              {
                href: '/psychedelics',
                label: 'Psychedelics',
                desc: 'Somatic energy at chakra points is intensified during psychedelic states and available for integration work in the days after.',
              },
            ].map(link => (
              <ScrollReveal key={link.href}>
                <Link
                  href={link.href}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      padding: '1.5rem',
                      transition: 'border-color 300ms ease',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: AMETHYST_DEEP,
                        margin: '0 0 0.5rem',
                      }}
                    >
                      {link.label}
                    </p>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {link.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Closing blockquote */}
          <ScrollReveal>
            <blockquote
              style={{
                borderLeft: `3px solid ${AMETHYST_MID}`,
                paddingLeft: '1.5rem',
                margin: 0,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-text)',
                  lineHeight: 1.7,
                  margin: '0 0 0.75rem',
                  maxWidth: '48ch',
                }}
              >
                &ldquo;The chakras are organizational centers for the reception, assimilation, and
                transmission of life energies.&rdquo;
              </p>
              <cite
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}
              >
                Anodea Judith &mdash; Wheels of Life
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
