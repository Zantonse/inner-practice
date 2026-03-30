'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';
import StatCard from '@/components/StatCard';

// ── Accent tokens (nature / forest sage) ───────────────────────
const SAGE_DEEP = '#2D5038';
const SAGE_MID  = '#8AAF7E';
const SAGE_PALE = '#E2EDDF';

// ── Video tab data ─────────────────────────────────────────────
type VideoTab = 'forest-bathing' | 'grounding' | 'nature-meditation';

const videoData: Record<VideoTab, Array<{ videoId: string; title: string; description: string }>> = {
  'forest-bathing': [
    {
      videoId: '12CCjoixpkA',
      title: 'The Art and Science of Forest Bathing — Dr. Qing Li',
      description: 'An introduction to Shinrin-yoku — the Japanese practice of forest bathing. Covers phytoncides, NK cell activation, cortisol reduction, and the protocol developed by Dr. Qing Li.',
    },
    {
      videoId: '02CXKnftM-4',
      title: 'Shinrin-Yoku: A Forest Bathing Guide',
      description: 'The science behind why time in forests improves immune function, reduces stress hormones, and shifts the autonomic nervous system toward parasympathetic dominance.',
    },
  ],
  grounding: [
    {
      videoId: '8Rsb7IB21iM',
      title: 'The Science of Earthing and Grounding',
      description: 'The electron transfer hypothesis — how direct skin contact with the earth may reduce inflammation. Covers the research and practical protocols for grounding practice.',
    },
  ],
  'nature-meditation': [
    {
      videoId: 'BR6yH4S1UMU',
      title: 'Guided Nature Meditation',
      description: 'A guided meditation designed for outdoor practice — using natural sounds, sensations, and the visual complexity of fractals in nature to restore directed attention and activate the parasympathetic nervous system.',
    },
    {
      videoId: 'HE9iP3B4Azo',
      title: 'Outdoor Mindfulness Meditation',
      description: 'A seated grounding meditation combining breath awareness with earth connection. Ideal for the sitting portion of a forest bathing session or standalone barefoot practice.',
    },
  ],
};

export default function NatureClient() {
  const [activeVideoTab, setActiveVideoTab] = useState<VideoTab>('forest-bathing');

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
          background: 'linear-gradient(160deg, oklch(35% 0.10 145), oklch(50% 0.12 130))',
          overflow: 'hidden',
        }}
      >
        {/* Hero image */}
        <Image
          src="/images/hero-nature.webp"
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
            THE ORIGINAL MEDICINE
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
            Nature &amp; Forest Bathing
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
            For 99.9% of human history, we lived in nature. Your nervous system evolved for
            forests, not offices. Trees release airborne chemicals that boost your immune system.
            The ground beneath your feet carries electrons that reduce inflammation. 120 minutes
            per week is all it takes.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { href: '#science', label: 'Science' },
              { href: '#shinrin-yoku', label: 'Shinrin-Yoku' },
              { href: '#grounding', label: 'Grounding' },
              { href: '#light', label: 'Light' },
              { href: '#practice-map', label: 'Practice Map' },
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
                  color: SAGE_MID,
                  textDecoration: 'none',
                  borderBottom: `1px solid rgba(138,175,126,0.5)`,
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
          2. THE SCIENCE OF NATURE
      ══════════════════════════════════════════════════════ */}
      <section
        id="science"
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
                Why Nature Heals
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
                The Science of Nature
              </h2>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                <strong>Attention Restoration Theory</strong> (Kaplan 1995) proposes that natural
                environments restore directed attention by engaging involuntary attention &mdash; the
                soft fascination of moving water, rustling leaves, and fractal patterns. Unlike
                focused work, these stimuli require no cognitive effort, allowing the prefrontal
                cortex to recover.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                <strong>Stress Recovery Theory</strong> (Ulrich 1984) emerged from a landmark hospital
                study showing patients recovering from surgery who had window views of trees needed
                fewer pain medications, had fewer post-surgical complications, and were discharged
                sooner than those whose windows faced a brick wall. The effect was purely visual.
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
                Biophilia &amp; Fractal Patterns
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                E.O. Wilson&rsquo;s <strong>Biophilia Hypothesis</strong> (1984) argues that humans have an
                innate, genetically encoded affinity for living systems and natural environments &mdash;
                a product of two million years of evolutionary co-existence with the natural world.
                We are not adapted to offices; we are adapted to forests.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Richard Taylor&rsquo;s research (2005) demonstrated that the fractal dimension of natural
                patterns &mdash; coastlines, tree branches, fern fronds &mdash; falls in a range of 1.3&ndash;1.5
                that produces measurable <strong>stress reduction</strong> in observers compared to non-fractal urban environments (Taylor, 2006). Our visual cortex appears tuned to these patterns.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${SAGE_MID}`,
                  padding: '1rem 1.25rem',
                  background: SAGE_PALE,
                  borderRadius: '0 2px 2px 0',
                  marginTop: '1rem',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: SAGE_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  Urban environments contain hard edges, right angles, and non-fractal geometry that
                  the nervous system processes as novel, demanding, and potentially threatening &mdash;
                  even when consciously perceived as normal.
                </p>
              </div>
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
                source="Park et al., 2010 (n=280)"
                stat="12.4%"
                detail="Cortisol reduction in forest environments versus urban environments across 280 participants. Forest walks also showed lower pulse rate, blood pressure, and sympathetic nerve activity."
                url="https://pubmed.ncbi.nlm.nih.gov/19568835/"
                accentColor={SAGE_MID}
                accentTextColor={SAGE_DEEP}
              />
              <StatCard
                source="White et al., 2019 — Scientific Reports"
                stat="120 min"
                detail="Minimum weekly nature dose associated with significantly better self-reported health and wellbeing. Effect plateaued above 300 minutes. Below 120 minutes, benefits were inconsistent."
                url="https://pubmed.ncbi.nlm.nih.gov/31197192/"
                accentColor={SAGE_MID}
                accentTextColor={SAGE_DEEP}
              />
              <StatCard
                source="Li et al., 2008"
                stat="50%"
                detail="Increase in Natural Killer (NK) cell activity after a 3-day forest bathing trip, with effects lasting 30 days. NK cells are the immune system's primary defense against viruses and tumor cells."
                url="https://pubmed.ncbi.nlm.nih.gov/18434040/"
                accentColor={SAGE_MID}
                accentTextColor={SAGE_DEEP}
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
          4. SHINRIN-YOKU
      ══════════════════════════════════════════════════════ */}
      <section
        id="shinrin-yoku"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${SAGE_PALE})`,
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
              Forest Bathing
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
              Shinrin-Yoku
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
              Literally &ldquo;forest bathing&rdquo; in Japanese, Shinrin-Yoku was formalized by the
              Japanese Forestry Agency in 1982 and became a cornerstone of preventive medicine.
              Dr. Qing Li at Nippon Medical School has produced the most rigorous research on its
              mechanisms and effects.
            </p>
          </ScrollReveal>

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
                NK Cells &amp; Immune Activation
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Li&rsquo;s landmark 2008 study sent 12 male subjects on 3-day forest bathing trips.
                NK cell activity increased by <strong>50%</strong>, and crucially, the effect lasted
                <strong> 30 days</strong> &mdash; measured as NK cell count, activity, and intracellular
                anti-cancer proteins (perforin, granzyme A/B, granulysin).
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The same protocol was repeated with day trips (Li 2009) and showed NK increases
                persisting 7 days. City walks used as controls showed no NK elevation. The agent
                was identified as <strong>phytoncides</strong> &mdash; volatile organic compounds
                emitted by trees, specifically conifers.
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
                The Phytoncide Mechanism
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Phytoncides are wood essential oils: primarily <strong>alpha-pinene</strong>,
                <strong> beta-pinene</strong>, and <strong>d-limonene</strong>. Trees emit them as
                antimicrobial defense compounds. When inhaled, they act on human immune cells via
                olfactory and pulmonary routes.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Li&rsquo;s 2009 hotel room study is the cleanest proof of mechanism: participants who slept
                in hotel rooms diffused with hinoki cypress oil (phytoncides) showed the same NK
                elevation as those who walked in forests &mdash; proving the chemical agent, not the
                walking, was responsible for immune activation.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Cortisol and adrenaline levels both decrease significantly after forest walks. HRV
                improves in a dose-dependent manner (Lee 2014) &mdash; more time in forest, higher
                parasympathetic tone.
              </p>
            </ScrollReveal>
          </div>

          {/* Phytoncide callout */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${SAGE_MID}`,
                padding: '1.5rem 1.75rem',
                background: SAGE_PALE,
                borderRadius: '0 2px 2px 0',
                marginBottom: '3rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: SAGE_DEEP,
                  margin: '0 0 0.75rem',
                }}
              >
                Highest Phytoncide Sources
              </p>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text)', lineHeight: 1.75, margin: '0 0 0.5rem' }}>
                Coniferous forests (pine, cedar, hinoki cypress, spruce) emit the highest phytoncide
                concentrations. Deciduous forests offer lower but still significant levels. Even urban
                parks with mature trees provide meaningful exposure &mdash; the key variable is canopy
                density, not pristine wilderness.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                Temperature and humidity affect phytoncide concentration: warm, humid summer mornings
                after rainfall produce the highest airborne levels. This is why forest walks
                &ldquo;feel&rdquo; most restorative in those conditions &mdash; not just perception.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          6. GROUNDING / EARTHING
      ══════════════════════════════════════════════════════ */}
      <section
        id="grounding"
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
              Earthing
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
              Grounding &amp; Earthing
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
              Direct skin contact with the earth &mdash; bare feet on soil, grass, sand, or rock &mdash;
              may transfer free electrons from the Earth&rsquo;s surface. The hypothesis is biophysically
              plausible; the evidence is real but limited.
            </p>
          </ScrollReveal>

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
                The Electron Transfer Hypothesis
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The Earth&rsquo;s surface maintains a negative electrical charge from continuous lightning
                strikes and the global atmospheric electrical circuit. James Oschman&rsquo;s 2015 review
                in the Journal of Inflammation Research proposes that free electrons transferred
                through direct skin contact act as antioxidants, neutralizing reactive oxygen species
                (free radicals) involved in inflammation.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Gaetan Chevalier et al. (2012) conducted a controlled study in which participants
                slept either grounded (connected to the earth via conductive mattress pads) or
                ungrounded. Grounded sleepers showed normalized cortisol rhythms, reduced pain,
                reduced stress, and improved sleep quality &mdash; with HRV improvement of approximately
                10%.
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
                What the Evidence Actually Shows
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Grounding research shows real physiological signals: blood viscosity reduction,
                cortisol normalization, pain and inflammation markers, and HRV improvement. The
                effect sizes are small to moderate and the studies are small.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The primary methodological challenge is blinding &mdash; participants usually know
                whether they are grounded. Most studies also use indoor grounding devices (mats,
                sheets) rather than direct earth contact. The mechanism is biologically plausible
                but not proven. Barefoot time outdoors has no downside and multiple upside pathways
                beyond grounding itself (sensory stimulation, proprioception, attention).
              </p>
            </ScrollReveal>
          </div>

          {/* Honest assessment callout */}
          <ScrollReveal>
            <div
              style={{
                border: `1px solid #E4AD75`,
                borderLeft: `3px solid #E4AD75`,
                padding: '1.5rem 1.75rem',
                background: 'rgba(228,173,117,0.08)',
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
                  color: '#8B5E2A',
                  margin: '0 0 0.75rem',
                }}
              >
                Honest Assessment
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
                Grounding/earthing is plausible but the research base is small, mostly unblinded,
                and conducted by a small group of investigators. The electron transfer mechanism
                has not been conclusively proven. Effect sizes are modest.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0, fontSize: '0.9375rem' }}>
                That said: walking barefoot on natural surfaces costs nothing, improves sensory
                awareness and proprioception independent of any electron hypothesis, connects you
                to the phytoncide and restorative environment benefits above, and feels
                profoundly grounding in the experiential sense. The practice is recommended;
                the mechanism remains under investigation.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          8. LIGHT & CIRCADIAN
      ══════════════════════════════════════════════════════ */}
      <section
        id="light"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${SAGE_PALE})`,
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
              Solar Medicine
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
              Light &amp; the Circadian System
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
              Indoor lighting peaks at 200&ndash;500 lux. Outdoor daylight starts at 1,000 lux on
              overcast days and reaches 100,000 lux in direct summer sun. Your circadian clock
              needs at least 1,000 lux to set correctly &mdash; indoor light cannot do this.
            </p>
          </ScrollReveal>

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
                Morning Outdoor Light
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The retinal ganglion cells that set your circadian clock (ipRGCs, intrinsically
                photosensitive cells) require bright-light input of 1,000+ lux within 30&ndash;60 minutes
                of waking to anchor the master clock in the suprachiasmatic nucleus (SCN). Indoor
                lighting &mdash; even bright offices &mdash; cannot reliably provide this.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Even on a cloudy day, stepping outside provides 10&ndash;50x more photons than indoor
                exposure. Five minutes of outdoor morning light resets the circadian phase, anchors
                the Cortisol Awakening Response, and sets the timer for DLMO (melatonin onset)
                14 hours later. This directly connects to the{' '}
                <Link href="/sleep" style={{ color: SAGE_DEEP, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                  sleep page
                </Link>
                &rsquo;s circadian content.
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
                Serotonin &amp; Vitamin D
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Lambert et al. (2002) demonstrated that serotonin production in the dorsal raphe
                nucleus is directly proportional to bright light exposure &mdash; higher outdoor lux,
                higher serotonin synthesis. This is the primary mechanism behind seasonal affective
                disorder (SAD) and explains why outdoor time improves mood independent of exercise.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                UVB light hitting the skin triggers vitamin D3 synthesis in the keratinocytes.
                42% of US adults are vitamin D deficient (Forrest &amp; Stuhldreher, 2011) &mdash; a
                deficiency linked to depression, immune suppression, bone density loss, and increased
                all-cause mortality. Twenty minutes of midday sun on arms and legs produces
                10,000&ndash;20,000 IU depending on skin tone and latitude.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '1.5rem',
              }}
            >
              {[
                {
                  label: 'Morning (within 60 min of waking)',
                  desc: 'Outdoor light exposure. 5–10 minutes minimum. No sunglasses. This single habit has the highest leverage of any circadian intervention.',
                  color: '#E4AD75',
                  textColor: '#8B5E2A',
                },
                {
                  label: 'Midday (10am–2pm)',
                  desc: 'Vitamin D synthesis window. 20 minutes of direct sun on skin. UV index must be above 3 for significant D3 production — check your local UV index.',
                  color: SAGE_MID,
                  textColor: SAGE_DEEP,
                },
                {
                  label: 'Evening (2 hrs before bed)',
                  desc: 'Reduce bright light. The same ipRGCs that set your clock in the morning will delay melatonin onset if stimulated in the evening. Amber glasses block the 480nm peak.',
                  color: '#8B3A62',
                  textColor: '#8B3A62',
                },
              ].map(card => (
                <ScrollReveal key={card.label}>
                  <div
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: `1px solid var(--color-border)`,
                      borderTop: `3px solid ${card.color}`,
                      borderRadius: '2px',
                      padding: '1.5rem',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: card.textColor,
                        margin: '0 0 0.75rem',
                      }}
                    >
                      {card.label}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                      {card.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          10. NATURE & EVERY PRACTICE
      ══════════════════════════════════════════════════════ */}
      <section
        id="practice-map"
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
              Cross-Practice Map
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
              Nature &amp; Every Practice
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
              Nature is not a separate practice &mdash; it is the original context for all of them.
              Every discipline on this site is amplified when performed outdoors.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                href: '/meditate',
                label: 'Meditation',
                connection: 'Nature is the original meditation setting. Fractal visual patterns in trees and water provide involuntary soft fascination — exactly the attentional state that formal meditation cultivates. Outdoor sits reduce the effort required to reach open-awareness states.',
              },
              {
                href: '/breathe',
                label: 'Breathwork',
                connection: 'Forest air contains phytoncides — the same volatile organic compounds that activate NK cells when inhaled. Every breath in a forested environment is pharmacologically active. Morning outdoor breathwork combines circadian light anchoring with phytoncide inhalation.',
              },
              {
                href: '/nervous-system',
                label: 'Nervous System',
                connection: 'Polyvagal theory frames safety as neuroceptive — the nervous system scans for cues below conscious awareness. Natural environments (birdsong, wind, rustling leaves, fractal patterns) are ancestral safety cues that shift autonomic tone without effort.',
              },
              {
                href: '/qigong',
                label: 'Qigong',
                connection: 'Traditional Chinese medicine prescribes qigong practice in natural settings — particularly near trees and moving water — as essential to the practice, not optional. The concept of absorbing qi from the natural environment is consistent with phytoncide and negative ion research.',
              },
              {
                href: '/sleep',
                label: 'Sleep',
                connection: 'Morning outdoor light is a particularly effective circadian intervention for sleep quality. It anchors the master clock, amplifies the cortisol awakening response, and sets the melatonin timer 14 hours later. Nature and sleep are mechanistically inseparable.',
              },
              {
                href: '/fascia',
                label: 'Fascia',
                connection: 'Uneven natural terrain — soil, roots, grass, sand, rocks — provides continuous proprioceptive stimulation that flat artificial surfaces cannot. Walking barefoot on varied ground is fascial training. The mechanoreception of uneven surfaces activates the tensegrity network throughout the body.',
              },
              {
                href: '/trauma',
                label: 'Trauma',
                connection: 'Nature provides predictable rhythmic stimuli (waves, wind, birdsong) that the nervous system processes as safe, non-threatening, and regulating. This is why trauma therapists increasingly incorporate nature-based interventions — the environment itself does co-regulation.',
              },
            ].map(item => (
              <ScrollReveal key={item.href}>
                <Link
                  href={item.href}
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
                        color: SAGE_DEEP,
                        margin: '0 0 0.5rem',
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {item.connection}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          12. FOREST BATHING PROTOCOL
      ══════════════════════════════════════════════════════ */}
      <section
        id="protocol"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${SAGE_PALE})`,
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
              The Qing Li Method
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
              Forest Bathing Protocol
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
              This is not a hike. The goal is immersion, not distance. Slow down until you find
              the pace at which you notice everything &mdash; then halve it again.
            </p>
          </ScrollReveal>

          <div className="timeline" style={{ paddingLeft: '2.5rem', marginBottom: '4rem' }}>
            {[
              {
                step: '1',
                title: 'Choose your forest',
                desc: 'Any area with sufficient tree density will work — a city park with mature trees, a suburban trail, a national forest. Conifers (pine, cedar, fir) produce the highest phytoncide concentrations. The minimum useful threshold is trees close enough to create canopy shade.',
              },
              {
                step: '2',
                title: 'Leave your devices',
                desc: 'Leave your phone in the car, or turn it fully off. The neural state you are trying to reach — open, non-directed awareness — is incompatible with notification availability. This is the single biggest compliance barrier and the most important instruction.',
              },
              {
                step: '3',
                title: 'Walk slowly, engage all senses',
                desc: 'Move at roughly half your normal walking pace. Touch tree bark, notice the texture of soil underfoot, smell the air, listen for birdsong and wind. You are not exercising — you are bathing. Stop whenever something draws your attention.',
              },
              {
                step: '4',
                title: 'Sit for 15–20 minutes',
                desc: 'Find a comfortable spot and sit still. This is when phytoncide absorption and the deepest restoration effects occur. You can meditate, breathe consciously, or simply observe. The sitting phase is not optional — it completes the protocol.',
              },
              {
                step: '5',
                title: 'Minimum dose: 120 minutes per week',
                desc: 'White et al. (2019) identified 120 minutes as the threshold below which benefits become inconsistent. This does not have to be in a single session — two 60-minute sessions or three 40-minute sessions achieve the same outcome.',
              },
              {
                step: '6',
                title: 'Optimal dose: 3–5 hours per week',
                desc: 'Li\'s NK cell research used 3-day immersive trips, but subsequent research shows regular shorter exposures accumulate benefit. Three to five hours weekly maintains elevated NK cell activity and cortisol normalization as a chronic state.',
              },
            ].map(item => (
              <div key={item.step} style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <div
                  className="timeline-node"
                  style={{ background: SAGE_DEEP }}
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

          {/* Grounding protocol alongside */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${SAGE_MID}`,
                padding: '1.5rem 1.75rem',
                background: SAGE_PALE,
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
                  color: SAGE_DEEP,
                  margin: '0 0 0.75rem',
                }}
              >
                Grounding Add-On
              </p>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text)', lineHeight: 1.75, margin: '0 0 0.5rem' }}>
                During the sitting phase of the forest bathing protocol, remove your shoes and socks
                and place bare feet directly on soil, grass, or rock. This integrates the grounding
                protocol with zero additional time cost.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                Wet grass in the morning provides the best electrical conductivity for electron transfer.
                This also happens to be when phytoncide concentrations are highest. The combination of
                cool morning air, bare feet on dew-covered grass, and tree canopy is the maximum-dose
                nature protocol.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          13. "Now, practice." SEPARATOR + VIDEOS
      ══════════════════════════════════════════════════════ */}
      <div
        id="practice"
        style={{
          padding: '2.5rem max(1.5rem, 8vw)',
          background: SAGE_DEEP,
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'rgba(138,175,126,0.3)' }} />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: '#E2EDDF',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Now, practice.
        </p>
        <div style={{ flex: 1, height: '1px', background: 'rgba(138,175,126,0.3)' }} />
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
              Forest bathing guided sessions, earthing and grounding practices, and nature
              meditations for use during or after time outdoors.
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
              { key: 'forest-bathing' as VideoTab, label: 'Forest Bathing' },
              { key: 'grounding' as VideoTab, label: 'Grounding' },
              { key: 'nature-meditation' as VideoTab, label: 'Nature Meditation' },
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
                  border: `1px solid ${activeVideoTab === tab.key ? SAGE_DEEP : 'var(--color-border)'}`,
                  background:
                    activeVideoTab === tab.key ? SAGE_DEEP : 'var(--color-surface-raised)',
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
          14. CROSS-LINKS FOOTER
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)',
          background: `linear-gradient(160deg, oklch(35% 0.10 145 / 0.18), var(--color-cream))`,
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
              Nature Connects to Everything
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              Every practice on this site is amplified by outdoor context. Here is where to go next.
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
                href: '/meditate',
                label: 'Meditation',
                desc: 'Nature as the original meditation environment — fractals, soft fascination, and open awareness.',
              },
              {
                href: '/breathe',
                label: 'Breathwork',
                desc: 'Phytoncide-enriched outdoor air transforms every breath practice into a combined immune intervention.',
              },
              {
                href: '/nervous-system',
                label: 'Nervous System',
                desc: 'Neuroceptive safety signals from natural environments — how birdsong and fractals regulate the autonomic system.',
              },
              {
                href: '/qigong',
                label: 'Qigong',
                desc: 'The traditional outdoor practice context and how it maps onto modern phytoncide and energy research.',
              },
              {
                href: '/sleep',
                label: 'Sleep',
                desc: 'Morning outdoor light is the primary circadian setter — the mechanistic link between nature and sleep quality.',
              },
              {
                href: '/fascia',
                label: 'Fascia',
                desc: 'Uneven natural terrain as fascial training — how barefoot walking on varied surfaces activates the tensegrity network.',
              },
              {
                href: '/trauma',
                label: 'Trauma',
                desc: 'Predictable natural rhythms as co-regulation — why nature-based therapy works through the nervous system.',
              },
              {
                href: '/taichi',
                label: 'Tai Chi',
                desc: 'Traditional tai chi practice is outdoors — morning light, earthing, and natural environment amplify every mechanism.',
              },
              {
                href: '/fasting',
                label: 'Fasting',
                desc: 'Early morning light exposure during the fasted state maximally amplifies the cortisol awakening response and circadian clock resetting.',
              },
              {
                href: '/psychedelics',
                label: 'Psychedelics',
                desc: 'Biophilia is amplified after psychedelic experiences — time outdoors during integration deepens the felt sense of connection to living systems.',
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
                        color: SAGE_DEEP,
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
                borderLeft: `3px solid ${SAGE_MID}`,
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
                &ldquo;Forest bathing is not exercise, or hiking, or jogging. It is simply being in
                nature, connecting with it through our senses of sight, hearing, taste, smell and
                touch.&rdquo;
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
                Dr. Qing Li &mdash; Forest Bathing
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
