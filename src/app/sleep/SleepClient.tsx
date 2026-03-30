'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';
import StatCard from '@/components/StatCard';

// ── Accent tokens (sleep / circadian teal) ─────────────────────
const TEAL_DEEP = '#1B4D5C';
const TEAL_MID  = '#A3C4CC';
const TEAL_PALE = '#E8F2F4';

// ── Timing Card (24-hour practice table) ──────────────────────
function TimingCard({
  window,
  state,
  practices,
}: {
  window: string;
  state: string;
  practices: string;
}) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${TEAL_MID}`,
        padding: '1.25rem 1.5rem',
        background: 'var(--color-surface-raised)',
        borderRadius: '2px',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr) minmax(0,1.6fr)',
        gap: '1rem',
        alignItems: 'start',
      }}
    >
      <div>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: TEAL_DEEP,
            margin: '0 0 0.25rem',
          }}
        >
          Window
        </p>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
          {window}
        </p>
      </div>
      <div>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: TEAL_DEEP,
            margin: '0 0 0.25rem',
          }}
        >
          Biological State
        </p>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
          {state}
        </p>
      </div>
      <div>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: TEAL_DEEP,
            margin: '0 0 0.25rem',
          }}
        >
          Recommended Practices
        </p>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', margin: 0, lineHeight: 1.6 }}>
          {practices}
        </p>
      </div>
    </div>
  );
}

// ── Technique Card (breathwork section) ───────────────────────
function TechniqueCard({
  name,
  ratio,
  timing,
  evidence,
  description,
}: {
  name: string;
  ratio: string;
  timing: string;
  evidence: 'Strong' | 'Moderate' | 'Low';
  description: string;
}) {
  const timingColor =
    timing === 'Morning Only'
      ? { bg: 'rgba(228,173,117,0.15)', text: '#8B5E2A' }
      : timing === 'Evening'
      ? { bg: `${TEAL_PALE}`, text: TEAL_DEEP }
      : { bg: 'var(--color-surface-raised)', text: 'var(--color-text-muted)' };

  const evidenceColor =
    evidence === 'Strong'
      ? { bg: 'rgba(45,106,79,0.10)', text: '#2D6A4F' }
      : evidence === 'Moderate'
      ? { bg: `${TEAL_PALE}`, text: TEAL_DEEP }
      : { bg: 'rgba(139,58,98,0.08)', text: '#8B3A62' };

  return (
    <div
      style={{
        background: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
        borderRadius: '2px',
        padding: '1.75rem',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.125rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: '0 0 0.875rem',
          fontStyle: 'normal',
        }}
      >
        {name}
      </h3>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            background: TEAL_PALE,
            color: TEAL_DEEP,
            border: `1px solid ${TEAL_MID}`,
          }}
        >
          {ratio}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            background: timingColor.bg,
            color: timingColor.text,
            border: '1px solid var(--color-border)',
          }}
        >
          {timing}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            background: evidenceColor.bg,
            color: evidenceColor.text,
            border: '1px solid var(--color-border)',
          }}
        >
          {evidence}
        </span>
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

// ── Timing data ────────────────────────────────────────────────
const timingRows = [
  {
    window: 'Wake + 0–30 min',
    state: 'CAR peak; cortisol surging 50–75% above baseline',
    practices: 'Outdoor morning light (5–10 min); anchor the circadian clock before any screen exposure',
  },
  {
    window: 'Wake + 30–90 min',
    state: 'High cortisol, sympathetic dominant; norepinephrine elevated',
    practices: 'Kapalabhati, Breath of Fire, Wim Hof, cold exposure — lean into the body\'s natural arousal curve',
  },
  {
    window: 'Wake + 2–5 hrs',
    state: 'Cortisol subsiding; alertness building toward morning peak',
    practices: 'Box breathing, focused meditation, vigorous yoga — cognitive performance peaking',
  },
  {
    window: 'Wake + 5–8 hrs',
    state: 'Midday equilibrium; core body temperature approaching peak',
    practices: 'Coherence breathing (5.5 bpm), alternate nostril pranayama, sustained mindfulness sits',
  },
  {
    window: 'Wake + 6–8 hrs',
    state: 'Natural circadian alertness dip; propensity for light sleep rises',
    practices: 'NSDR / Yoga Nidra (10–20 min) — supports midday recovery, consolidates morning learning',
  },
  {
    window: '2–3 hrs before bed',
    state: 'Forbidden Zone alerting signal; melatonin suppressed by light',
    practices: 'Reduce light exposure; avoid all stimulating practices, intense exercise, or caffeine',
  },
  {
    window: '1–2 hrs before bed',
    state: 'DLMO approaching; melatonin rising; core body temp falling',
    practices: '4-7-8, cyclic sighing, body scan, Ujjayi, Yoga Nidra — parasympathetic dominance',
  },
];

// ── Technique data ─────────────────────────────────────────────
const techniques: Array<{
  name: string;
  ratio: string;
  timing: string;
  evidence: 'Strong' | 'Moderate' | 'Low';
  description: string;
}> = [
  {
    name: '4-7-8 Breathing',
    ratio: 'Inhale 4 · Hold 7 · Exhale 8',
    timing: 'Evening',
    evidence: 'Moderate',
    description:
      'Extended exhale activates the baroreceptor reflex, increasing vagal tone and decelerating heart rate. The prolonged breath hold raises CO2 tolerance while the 2:1 exhale-to-inhale ratio shifts the autonomic balance toward parasympathetic. Best used lying down in bed.',
  },
  {
    name: 'Coherence Breathing',
    ratio: '5.5 breaths/min (5.5s in · 5.5s out)',
    timing: 'Evening',
    evidence: 'Strong',
    description:
      'Resonance frequency breathing at exactly 5.5 breaths/min maximizes HRV via baroreflex resonance. Two randomized trials show sustained improvement in overnight HRV with 20 minutes of daily practice. A well-supported-by-evidence breath technique for sleep quality.',
  },
  {
    name: 'Cyclic Sighing',
    ratio: 'Double inhale (nose) · Long exhale (mouth)',
    timing: 'Evening',
    evidence: 'Strong',
    description:
      'A 2023 RCT (Balban et al., Cell Reports Medicine) found cyclic sighing outperformed all other tested breath patterns for reducing anxiety and improving positive affect in real time. The double inhale re-inflates collapsed alveoli; the extended passive exhale maximally offloads CO2.',
  },
  {
    name: 'Left Nostril Breathing',
    ratio: 'Block right nostril; breathe only through left',
    timing: 'Evening',
    evidence: 'Low',
    description:
      'Traditional Ayurvedic and Yogic practice. Preliminary evidence suggests left nostril breathing preferentially activates right hemisphere and parasympathetic circuits. Temperature studies show left nostril breathing correlates with right brain activation and reduced sympathetic tone. Evidence is early; effect is gentle.',
  },
  {
    name: 'Box Breathing (Modified)',
    ratio: 'Inhale 4 · Hold 4 · Exhale 6 · Hold 2',
    timing: 'Evening',
    evidence: 'Moderate',
    description:
      'Standard box breathing (equal sides) is more activating than relaxing. This modified version extends the exhale to bias the ratio toward parasympathetic. Useful for pre-sleep if the mind is busy — the structure provides a cognitive anchor without the alerting quality of a full 4:4:4:4 hold.',
  },
  {
    name: 'Wim Hof / Hyperventilation',
    ratio: '30–40 power breaths · exhale hold · recovery inhale',
    timing: 'Morning Only',
    evidence: 'Moderate',
    description:
      'Raises sympathetic tone, releases epinephrine, alkalizes blood via CO2 washout, and triggers a significant cortisol spike. Excellent for morning when the body is already cortisol-primed. Contraindicated in the evening — it is the opposite of sleep preparation and delays melatonin onset.',
  },
];

// ── Video tab data ─────────────────────────────────────────────
type VideoTab = 'yoga-nidra' | 'breathwork' | 'meditations';

const videoData: Record<VideoTab, Array<{ videoId: string; title: string; description: string }>> = {
  'yoga-nidra': [
    {
      videoId: '0cSGMChJO94',
      title: 'Yoga Nidra for Sleep',
      description: 'A full 45-minute Yoga Nidra session through all 8 stages — from physical relaxation to conscious witnessing. Best used when you have 45 minutes before bed or during the midday NSDR window.',
    },
    {
      videoId: 'pL02HRFk2vo',
      title: 'NSDR Protocol — Huberman',
      description: 'Andrew Huberman\'s Non-Sleep Deep Rest protocol. A 10–20 minute guided body scan designed specifically for the midday circadian dip or post-sleep-debt recovery. Evidence base from Lendner et al. on delta wave induction.',
    },
  ],
  breathwork: [
    {
      videoId: 'tybOi4hjZFQ',
      title: '4-7-8 Breathing for Sleep',
      description: 'Guided 4-7-8 practice for bedtime. The extended exhale phase (8 counts) is the mechanism — it forces slow breathing that activates the baroreflex and elevates vagal tone within minutes.',
    },
  ],
  meditations: [
    {
      videoId: '0cSGMChJO94',
      title: 'Body Scan for Sleep',
      description: 'A systematic body scan meditation moving from feet to crown. CBT-I — a structured program that includes relaxation techniques like the body scan — outperforms sleep medication for chronic insomnia in long-term trials (Mitchell et al., 2012).',
    },
  ],
};

export default function SleepClient() {
  const [activeVideoTab, setActiveVideoTab] = useState<VideoTab>('yoga-nidra');

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
          background: 'linear-gradient(160deg, oklch(35% 0.08 210), oklch(52% 0.10 195))',
          overflow: 'hidden',
        }}
      >
        {/* Hero image */}
        <Image
          src="/images/hero-sleep.webp"
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
            Sleep &amp; Circadian Rhythm
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
            Where Every Practice Comes to Rest
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
            Sleep is when the nervous system does its deepest regulation &mdash; glymphatic clearance,
            emotional memory consolidation, autonomic restoration. Every practice on this site either
            prepares you for sleep or benefits from it.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { href: '#science', label: 'Architecture' },
              { href: '#circadian', label: 'Circadian' },
              { href: '#hrv', label: 'HRV' },
              { href: '#yoga-nidra', label: 'Yoga Nidra' },
              { href: '#breathwork', label: 'Breathwork' },
              { href: '#hygiene', label: 'Hygiene' },
              { href: '#wind-down', label: 'Wind-Down' },
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
                  color: TEAL_MID,
                  textDecoration: 'none',
                  borderBottom: `1px solid rgba(163,196,204,0.5)`,
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
          2. WHAT SLEEP ACTUALLY IS
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
                The Architecture of Rest
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
                What Happens When You Sleep
              </h2>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Sleep is governed by two simultaneous processes. <strong>Process S</strong> (sleep pressure) is
                homeostatic: adenosine accumulates during waking hours and drives the need to sleep. Every hour
                you remain awake, adenosine levels rise; sleep clears them. Caffeine works by blocking adenosine
                receptors &mdash; it doesn&rsquo;t reduce sleep pressure, it masks it.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                <strong>Process C</strong> (circadian drive) is the internal 24-hour clock in the SCN of the
                hypothalamus. It promotes wakefulness during the day and sleep during the night via the
                coordinated release of cortisol (morning) and melatonin (evening). These two processes are
                largely independent &mdash; sleep debt accumulates in Process S while the clock runs in Process C.
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
                Ultradian Architecture
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Sleep cycles through roughly 90-minute ultradian rhythms alternating NREM and REM phases.
                A full night contains 4&ndash;6 cycles. <strong>Slow Wave Sleep (SWS)</strong> dominates early
                in the night (cycles 1&ndash;2), while <strong>REM sleep</strong> lengthens progressively and
                dominates the final 2&ndash;3 hours before natural waking.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Stage percentages in a healthy adult: N1 (5%), N2 (45%), SWS/N3 (25%), REM (25%).
                SWS is when the majority of daily growth hormone is secreted. REM is when emotional memories
                are consolidated and threat responses are recalibrated.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${TEAL_MID}`,
                  padding: '1rem 1.25rem',
                  background: TEAL_PALE,
                  borderRadius: '0 2px 2px 0',
                  marginTop: '1rem',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: TEAL_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  Cutting sleep to 6 hours eliminates the final REM-rich cycle &mdash; a 25% loss of total
                  REM sleep. This is why 6 hours &ldquo;feels fine&rdquo; but impairs emotional regulation and
                  threat perception the same day.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div style={{ margin: '2.5rem 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <Image
                  src="/images/illustrations/sleep-architecture.jpg"
                  alt="Sleep architecture diagram showing four 90-minute cycles with more deep sleep early and more REM late"
                  width={1200}
                  height={800}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
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
                source="Xie et al., Science, 2013"
                stat="60%"
                detail="Brain cells shrink by 60% during sleep, expanding the interstitial space to allow glymphatic clearance of metabolic waste — including beta-amyloid and tau."
                url="https://pubmed.ncbi.nlm.nih.gov/24136970/"
                accentColor={TEAL_MID}
                accentTextColor={TEAL_DEEP}
              />
              <StatCard
                source="Nedergaard Lab, 2013"
                stat="2&times; faster"
                detail="Glymphatic clearance rate during sleep vs waking. The system is essentially inactive while awake — making sleep the only window for deep brain detoxification."
                url="https://pubmed.ncbi.nlm.nih.gov/24136970/"
                accentColor={TEAL_MID}
                accentTextColor={TEAL_DEEP}
              />
              <StatCard
                source="Takahashi et al., 1968"
                stat="Majority"
                detail="The majority of daily growth hormone is secreted during slow-wave sleep (Takahashi et al., 1968). Physical recovery, tissue repair, immune consolidation — all gated behind SWS."
                accentColor={TEAL_MID}
                accentTextColor={TEAL_DEEP}
              />
            </div>
          </ScrollReveal>

          {/* Glymphatic subsection */}
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
              The Glymphatic System
            </h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
            }}
          >
            <ScrollReveal>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Maiken Nedergaard&rsquo;s lab at the University of Rochester discovered the glymphatic system
                in 2012 &mdash; a network of channels surrounding cerebral blood vessels through which
                cerebrospinal fluid flushes the brain. The discovery transformed understanding of sleep
                from passive rest to active maintenance.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The mechanism depends on <strong>Aquaporin-4 (AQP4) water channels</strong> on astrocyte
                end-feet. During sleep, the interstitial space expands by 60%, allowing high-volume
                convective flow of CSF to wash out metabolic byproducts including beta-amyloid and tau
                &mdash; the proteins whose accumulation characterizes Alzheimer&rsquo;s disease.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Clearance rates during sleep are approximately <strong>twice</strong> those during waking.
                The process is not fully replicated by rest, meditation, or relaxation alone &mdash; it
                specifically requires the loss of consciousness and the slow oscillations of NREM sleep.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Sleep position affects clearance: lateral (side) sleeping shows higher glymphatic transport
                than prone or supine in rodent models (Lee et al., 2019). The clinical implication is early
                and speculative, but the biology of why we sleep &mdash; and why chronic sleep loss is the
                strongest modifiable risk factor for Alzheimer&rsquo;s &mdash; is now clearly mechanistic.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div style={{ margin: '2.5rem 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <Image
                src="/images/illustrations/sleep-glymphatic.jpg"
                alt="The glymphatic system — brain cells shrink 60 percent during sleep creating channels for cerebrospinal fluid to flush waste"
                width={1200}
                height={800}
                style={{ width: '100%', height: 'auto', display: 'block' }}
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
          4. THE CIRCADIAN CODE — CENTERPIECE
      ══════════════════════════════════════════════════════ */}
      <section
        id="circadian"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${TEAL_PALE})`,
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
              When You Practice Matters
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
              The Circadian Code
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
              Your suprachiasmatic nucleus (SCN) orchestrates a 24-hour hormonal and physiological
              rhythm. The same practice can be activating or sedating depending on when it is
              performed. Timing is not optional &mdash; it is the mechanism.
            </p>
          </ScrollReveal>

          {/* Circadian prose */}
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
                The Morning Cortisol Awakening Response
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Within 30 minutes of waking, cortisol surges 50&ndash;75% above baseline &mdash; the
                <strong> Cortisol Awakening Response (CAR)</strong>. This is not stress; it is the body&rsquo;s
                immune calibration and motivational priming sequence. Morning light to the eyes amplifies
                the CAR and sets the master clock.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The <strong>Dim Light Melatonin Onset (DLMO)</strong> occurs approximately 14 hours after
                waking, rising 2 hours before habitual sleep time. This is the &ldquo;biological darkness signal&rdquo;
                that initiates the sleep preparatory cascade &mdash; any bright light (especially 480nm blue
                light) suppresses it and delays sleep.
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
                Core Body Temperature &amp; the Forbidden Zone
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Core body temperature (CBT) peaks in late afternoon and must fall by 1&ndash;2&deg;C to
                initiate sleep. Warm baths accelerate this by flushing heat to the periphery.
                Exercise raises CBT acutely; morning exercise allows 6&ndash;8 hours for temperature
                to normalize before sleep.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The <strong>Forbidden Zone</strong> (typically 2&ndash;3 hours before habitual bedtime)
                is a circadian alerting signal where the SCN sends its strongest wake-promoting output
                to counteract rising adenosine pressure. Trying to sleep during the Forbidden Zone is
                biologically opposed &mdash; this is why &ldquo;not tired at bedtime&rdquo; often means
                the schedule is misaligned, not that you don&rsquo;t need sleep.
              </p>
            </ScrollReveal>
          </div>

          {/* 24-Hour Timing Table */}
          <ScrollReveal>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 0.5rem',
                fontStyle: 'normal',
              }}
            >
              24-Hour Practice Timing
            </h3>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '1.5rem',
                maxWidth: '56ch',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
              }}
            >
              Match your practice to your biology. These windows are relative to your natural wake time,
              not a fixed clock.
            </p>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3.5rem' }}>
            {timingRows.map((row, i) => (
              <ScrollReveal key={i}>
                <TimingCard window={row.window} state={row.state} practices={row.practices} />
              </ScrollReveal>
            ))}
          </div>

          {/* Window detail cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            {[
              {
                label: 'Morning Window',
                time: 'Wake + 0–90 min',
                color: '#E4AD75',
                textColor: '#8B5E2A',
                desc: 'The cortisol awakening response primes the system for arousal and challenge. Stimulating breathwork here is rhythmically correct — you are amplifying what the body is already doing, not fighting its state.',
              },
              {
                label: 'Midday Window',
                time: 'Wake + 5–8 hrs',
                color: TEAL_MID,
                textColor: TEAL_DEEP,
                desc: 'The natural alertness dip at the midday is a built-in NSDR window. A 10–20 minute Yoga Nidra or NSDR protocol here supports recovery and may improve cognitive performance for the rest of the afternoon.',
              },
              {
                label: 'Evening Window',
                time: '1–2 hrs before bed',
                color: '#8B3A62',
                textColor: '#8B3A62',
                desc: 'DLMO marks the close of the biological day. Practices here should work with melatonin rise, not against it. Extended exhales, body scans, and Yoga Nidra create the conditions for rapid sleep onset.',
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
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {card.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {card.time}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {card.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Chronotype note */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${TEAL_MID}`,
                padding: '1.25rem 1.5rem',
                background: TEAL_PALE,
                borderRadius: '0 2px 2px 0',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: TEAL_DEEP,
                  margin: '0 0 0.5rem',
                }}
              >
                Chronotype Note
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>
                All windows are relative to <em>your</em> natural wake time, not 6am. A true evening
                chronotype wakes later and has all windows shifted 2&ndash;3 hours later accordingly.
                Forcing an evening chronotype into a morning schedule creates chronic circadian misalignment
                &mdash; with HRV, mood, and metabolic consequences similar to perpetual jet lag.
                Chronotype is substantially genetic (PER3, CLOCK genes) and changes with age.
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
          6. HRV: YOUR OVERNIGHT REPORT CARD
      ══════════════════════════════════════════════════════ */}
      <section
        id="hrv"
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
              Your Autonomic Report Card
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
              HRV During Sleep
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
              Heart Rate Variability during sleep reflects autonomic recovery state in real time.
              Each sleep stage produces a distinct HRV signature &mdash; and your overnight
              pattern is the most honest measure of whether your daytime practices are working.
            </p>
          </ScrollReveal>

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
                Stage-by-Stage HRV
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>N1 (Light NREM):</strong> HRV transitions from waking patterns. The autonomic
                system begins withdrawing sympathetic tone as you drift. Irregular, transitional.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>N2 (Stable NREM):</strong> HRV rises. Sleep spindles and K-complexes appear.
                Parasympathetic dominance increases. This is where the majority of your night is spent,
                and consistent HRV elevation here predicts morning readiness.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>N3 / SWS (Deep NREM):</strong> Highest HRV of the night. Maximum parasympathetic
                dominance. Growth hormone secreted. Glymphatic clearance peaks. This is your body&rsquo;s
                physical maintenance window &mdash; and the stage most degraded by alcohol.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                <strong>REM:</strong> HRV drops sharply. Autonomic variability increases in a chaotic,
                high-frequency pattern reflecting the limbic activation of dreaming. Heart rate and
                respiration become irregular. REM is not restful by HRV metrics &mdash; it is active
                emotional processing.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  border: `1px solid ${TEAL_MID}`,
                  borderRadius: '2px',
                  padding: '1.75rem',
                  marginBottom: '1.5rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: TEAL_DEEP,
                    margin: '0 0 1rem',
                  }}
                >
                  Good vs Concerning Patterns
                </p>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontWeight: 600, color: '#2D6A4F', fontSize: '0.875rem', margin: '0 0 0.375rem' }}>
                    Healthy Recovery Signature
                  </p>
                  <ul
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.75,
                      paddingLeft: '1.25rem',
                      margin: 0,
                    }}
                  >
                    <li>HRV rises in first half of night (N2/N3 dominant)</li>
                    <li>HRV drops in second half (REM dominant)</li>
                    <li>Overall overnight HRV near or above personal baseline</li>
                    <li>No prolonged elevated heart rate mid-sleep</li>
                  </ul>
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: '#8B3A62', fontSize: '0.875rem', margin: '0 0 0.375rem' }}>
                    Concerning Patterns
                  </p>
                  <ul
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.75,
                      paddingLeft: '1.25rem',
                      margin: 0,
                    }}
                  >
                    <li>Suppressed HRV throughout (alcohol, illness, overtraining)</li>
                    <li>Elevated resting HR without HRV rise (sympathetic excess)</li>
                    <li>No clear N3 recovery dip in first 2 hours (poor SWS)</li>
                    <li>Chaotic HRV all night (sleep disordered breathing)</li>
                  </ul>
                </div>
              </div>

              <div
                style={{
                  borderLeft: `3px solid ${TEAL_MID}`,
                  padding: '1rem 1.25rem',
                  background: TEAL_PALE,
                  borderRadius: '0 2px 2px 0',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: TEAL_DEEP,
                    margin: '0 0 0.375rem',
                  }}
                >
                  Wearable Note
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.7, margin: 0 }}>
                  Oura Ring, Whoop, and Apple Watch all capture overnight HRV but use different
                  algorithms and measurement windows. Track trends in <em>your own</em> data rather
                  than comparing absolute numbers across devices or other people.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Meditation / breathwork effects on HRV */}
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
              How Practice Affects Overnight HRV
            </h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                practice: 'Coherence Breathing',
                effect: 'Strongest documented effect. Daily 20-min practice raises resting HRV and improves overnight N2/N3 HRV within 4–8 weeks. Effect persists independently of sleep quality.',
                direction: 'positive',
              },
              {
                practice: 'Mindfulness Meditation',
                effect: '8-week MBSR programs show 10–15% improvement in overnight HRV in several RCTs. Effect correlates with practice dose. Long-term meditators show structurally elevated vagal tone.',
                direction: 'positive',
              },
              {
                practice: 'Yoga Nidra / NSDR',
                effect: 'Preliminary research suggests NSDR may support recovery, though the specific mechanisms in humans are still being studied.',
                direction: 'positive',
              },
              {
                practice: 'Alcohol (any amount)',
                effect: 'Dose-dependent suppression of overnight HRV. Even 1–2 drinks reduce N3 SWS by 20–40% and suppress peak HRV for 24–48 hours post-consumption.',
                direction: 'negative',
              },
            ].map(item => (
              <ScrollReveal key={item.practice}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    padding: '1.5rem',
                    borderTop: `3px solid ${item.direction === 'positive' ? TEAL_MID : '#8B3A62'}`,
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
                    {item.practice}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {item.effect}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. YOGA NIDRA & NSDR
      ══════════════════════════════════════════════════════ */}
      <section
        id="yoga-nidra"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${TEAL_PALE})`,
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
              The Bridge Between Practice and Sleep
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
              Yoga Nidra &amp; Non-Sleep Deep Rest
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
              Yoga Nidra occupies a unique position in the practice landscape: it is the only
              tradition that deliberately cultivates consciousness at the sleep&ndash;wake boundary,
              working with the hypnagogic state as a tool for nervous system restoration.
            </p>
          </ScrollReveal>

          {/* Two-column intro */}
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
                What Yoga Nidra Is
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Yoga Nidra (&ldquo;yogic sleep&rdquo;) is a systematic guided practice that moves through
                8 sequential stages: intention setting (<em>sankalpa</em>), body rotation, breath awareness,
                sensation pairs, visualisation, <em>sankalpa</em> deepening, externalisation, and integration.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The target state is the <strong>hypnagogic threshold</strong> &mdash; the border between
                waking and sleep where alpha waves give way to theta activity. The practitioner remains
                aware while the body and much of the mind enters the physiology of sleep. EEG studies
                confirm theta dominance with preserved conscious tracking.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Modern <strong>Non-Sleep Deep Rest (NSDR)</strong> is a secular, evidence-adjacent
                derivative popularized by Andrew Huberman. It retains the body scan and guided relaxation
                structure while removing traditional context. Functionally identical for the autonomic
                outcomes.
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
                Conscious Delta &mdash; The Evidence
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                EEG research on experienced Yoga Nidra practitioners has documented theta wave
                dominance with occasional delta intrusions &mdash; suggesting states neurologically
                distinct from normal sleep.
              </p>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  border: `1px solid ${TEAL_MID}`,
                  borderRadius: '2px',
                  padding: '1.25rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: TEAL_DEEP,
                    margin: '0 0 0.5rem',
                  }}
                >
                  EEG Pattern During Yoga Nidra
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                  Alpha (8–12 Hz) → Theta (4–7 Hz) → Delta (0.5–4 Hz) while maintaining conscious
                  awareness. The crossover from theta to delta with preserved responsiveness is
                  what distinguishes trained Yoga Nidra from simple relaxation or falling asleep.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Evidence cards */}
          <ScrollReveal>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.5rem',
                fontStyle: 'normal',
              }}
            >
              Research Landmarks
            </h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            <ScrollReveal>
              <StatCard
                source="Lou et al., NeuroReport, 1999"
                stat="65% dopamine release"
                detail="First PET neuroimaging study of Yoga Nidra. Found 65% increase in endogenous dopamine in the ventral striatum during practice — comparable to the dopamine effects of sleep itself."
                url="https://pubmed.ncbi.nlm.nih.gov/10555870/"
                accentColor={TEAL_MID}
                accentTextColor={TEAL_DEEP}
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Kumar et al., 2008"
                stat="Theta dominance confirmed"
                detail="EEG study documenting progressive theta wave dominance during Yoga Nidra stages 3–5. Theta power correlated with depth of relaxation and inversely with sympathetic measures."
                accentColor={TEAL_MID}
                accentTextColor={TEAL_DEEP}
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Miller (iRest) — multiple RCTs"
                stat="PTSD symptom reduction"
                detail="Integrative Restoration (iRest) — a clinical Yoga Nidra adaptation — showed significant reduction in PTSD symptoms, depression, and insomnia in military veteran populations across several trials."
                accentColor={TEAL_MID}
                accentTextColor={TEAL_DEEP}
              />
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
                  color: '#8B5E2A',
                  margin: '0 0 0.75rem',
                }}
              >
                Honest Assessment
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
                The popular claim that &ldquo;1 hour of Yoga Nidra equals 4 hours of sleep&rdquo; is not supported
                by research. Sleep serves biological functions (glymphatic clearance, memory consolidation, growth
                hormone secretion) that Yoga Nidra cannot replicate.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0, fontSize: '0.9375rem' }}>
                The 65% dopamine finding (Lou 1999) is real but comes from a small sample during practice
                &mdash; not from its restorative equivalence to sleep. What Yoga Nidra genuinely offers:
                reliable parasympathetic activation, midday recovery without full sleep, and a validated
                tool for PTSD and insomnia within a CBT-I adjunct context.
              </p>
            </div>
          </ScrollReveal>

          {/* Protocol table */}
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
              Practice Protocols
            </h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                label: 'Quick NSDR',
                time: '10 min',
                timing: 'Midday circadian dip',
                steps: 'Lie down. Body rotation scan (2 min). Breath awareness (3 min). Visualisation or silence (5 min). Return slowly.',
              },
              {
                label: 'Pre-Sleep Yoga Nidra',
                time: '20–30 min',
                timing: '30–60 min before sleep',
                steps: 'Sankalpa setting. Full body rotation (8 min). Breath and sensation pairs (8 min). Visualisation sequence (8 min). Externalise or allow sleep.',
              },
              {
                label: 'Full Yoga Nidra',
                time: '30–45 min',
                timing: 'Rest day or Sunday recovery',
                steps: 'All 8 stages at full length. Use a guided recording. Do not attempt to stay awake — falling asleep is acceptable. The practice works in both states.',
              },
            ].map(protocol => (
              <ScrollReveal key={protocol.label}>
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
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: TEAL_DEEP,
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {protocol.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {protocol.time}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      color: TEAL_DEEP,
                      fontStyle: 'italic',
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {protocol.timing}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                    {protocol.steps}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. SECTION DIVIDER (unconditional)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          9. BREATHWORK FOR SLEEP
      ══════════════════════════════════════════════════════ */}
      <section
        id="breathwork"
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
              Breathing Your Way to Sleep
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
              Breathwork Techniques for Sleep
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
              Breath is the only autonomic function you can consciously control. The techniques
              below leverage specific mechanisms &mdash; baroreflex, CO2 tolerance, exhale-to-inhale
              ratio &mdash; to shift toward the parasympathetic state required for sleep initiation.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            {techniques.map(t => (
              <ScrollReveal key={t.name}>
                <TechniqueCard
                  name={t.name}
                  ratio={t.ratio}
                  timing={t.timing}
                  evidence={t.evidence}
                  description={t.description}
                />
              </ScrollReveal>
            ))}
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
                Avoid Before Bed
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.75,
                  margin: '0 0 0.75rem',
                }}
              >
                The following practices raise cortisol, activate the sympathetic nervous system, and
                will delay sleep onset by 1&ndash;3 hours if done in the evening:
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
                <li><strong>Wim Hof / Tummo</strong> &mdash; massive cortisol and sympathetic activation</li>
                <li><strong>Kapalabhati</strong> (Skull-Shining Breath) &mdash; rapid, forceful exhales drive arousal</li>
                <li><strong>Breath of Fire</strong> &mdash; designed to heat and energize, not cool and relax</li>
                <li><strong>Bhastrika</strong> (Bellows Breath) &mdash; same mechanism as above</li>
                <li>Any breath technique that induces tingling, lightheadedness, or cold sensation (CO2 washout &mdash; activating)</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. SLEEP HYGIENE
      ══════════════════════════════════════════════════════ */}
      <section
        id="hygiene"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${TEAL_PALE})`,
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
              The Environment of Safety
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
              Sleep Hygiene Through the Nervous System
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2rem',
                maxWidth: '56ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Polyvagal theory reframes sleep hygiene: you are not just creating the right
              temperature and darkness &mdash; you are creating the environmental conditions that
              allow the nervous system to neuroceptively register safety. The body will not sleep
              deeply when it perceives threat, vigilance, or unfinished survival tasks.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            {[
              {
                factor: 'Temperature',
                detail: '60–67°F (15.5–19.5°C)',
                mechanism: 'Core body temperature must drop 1–2°C to initiate sleep. A cool room offloads this task from the body. A 20-minute warm bath 1–2 hrs before bed paradoxically accelerates cooling by flushing heat to the periphery.',
              },
              {
                factor: 'Light',
                detail: 'Block 480nm blue light',
                mechanism: 'Intrinsically photosensitive retinal ganglion cells (ipRGCs) send direct signals to the SCN. Light at 480nm (peak melatonin suppression) delays DLMO by up to 3 hours. Amber glasses from 9pm onward are more effective than blue-light screen filters.',
              },
              {
                factor: 'Caffeine',
                detail: 'Half-life: 5–7 hours (CYP1A2)',
                mechanism: 'Caffeine blocks adenosine receptors but does not reduce actual sleep pressure. A 2pm coffee retains 25% of its caffeine at midnight for average metabolizers. Slow CYP1A2 metabolizers have half-lives exceeding 9 hours.',
              },
              {
                factor: 'Alcohol',
                detail: 'REM suppressor',
                mechanism: 'Alcohol increases SWS in the first half of the night but fragments sleep in the second half and massively suppresses REM. Even 1–2 drinks reduce overnight HRV and leave emotional memory consolidation incomplete.',
              },
              {
                factor: 'Exercise Timing',
                detail: 'Morning–afternoon optimal',
                mechanism: 'Morning exercise amplifies the cortisol awakening response and deepens sleep pressure by evening. Evening high-intensity exercise raises core body temperature and cortisol for 4–6 hours. Gentle yoga or walks after 7pm are neutral-to-helpful.',
              },
              {
                factor: 'Meals',
                detail: 'Last meal 2–3 hrs before bed',
                mechanism: 'Digestion raises core body temperature and activates the sympathetic nervous system. Insulin spikes near bedtime disrupt the growth hormone pulse during SWS. Late high-glycemic meals increase overnight awakenings.',
              },
            ].map(item => (
              <ScrollReveal key={item.factor}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    padding: '1.5rem',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.25rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {item.factor}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      color: TEAL_DEEP,
                      fontWeight: 600,
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {item.detail}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {item.mechanism}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CBT-I callout */}
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
                CBT-I: The Gold Standard
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
                Cognitive Behavioral Therapy for Insomnia (CBT-I) is the first-line treatment for chronic
                insomnia &mdash; more effective than sleep medication and without dependence risk. Its core
                components: sleep restriction therapy, stimulus control, sleep hygiene education, relaxation
                training, and cognitive restructuring of catastrophic sleep thoughts.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0, fontSize: '0.9375rem' }}>
                If you have chronic insomnia (difficulty falling or staying asleep 3+ nights/week for 3+
                months), CBT-I with a trained provider or a structured digital program (Sleepio, Somryst)
                is the evidence-based path. Breathwork and Yoga Nidra are excellent CBT-I adjuncts, not
                replacements for the structured protocol.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          12. WIND-DOWN PROTOCOL
      ══════════════════════════════════════════════════════ */}
      <section
        id="wind-down"
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
              Your Evening Sequence
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
              The Wind-Down Protocol
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
              Sleep is not a switch. The transition from waking to sleep is a 60&ndash;90 minute physiological
              cascade &mdash; and your job is to create the conditions for it to unfold without interference.
            </p>
          </ScrollReveal>

          <div className="timeline" style={{ paddingLeft: '2.5rem' }}>
            {[
              {
                step: '1',
                title: 'Dim the lights (90 min before bed)',
                desc: 'Switch to amber or warm lighting below eye level. Ceiling lights and overhead fixtures send sky-light signals to ipRGCs. Candles, salt lamps, and floor lamps are ideal. This single change is a high-impact action in the protocol.',
              },
              {
                step: '2',
                title: '3-2-1 Completion Check (75 min before)',
                desc: 'Write down: 3 things completed today, 2 things carried forward to tomorrow, 1 thing you are grateful for. This closes open cognitive loops and prevents the rehearsal rumination that delays sleep onset.',
              },
              {
                step: '3',
                title: 'Warm shower or bath (60 min before)',
                desc: 'A 10–20 min warm shower triggers vasodilation in the hands and feet, flushing heat to the periphery and rapidly lowering core body temperature after you exit. The temperature drop signals sleep readiness to the SCN.',
              },
              {
                step: '4',
                title: 'Gentle yoga or stretching (45 min before)',
                desc: 'Restorative postures only: supine twists, legs-up-the-wall (Viparita Karani), child\'s pose, reclined butterfly. 10–15 minutes. The goal is fascial release and parasympathetic priming, not performance.',
              },
              {
                step: '5',
                title: 'Breathwork transition (20–30 min before)',
                desc: '5–10 minutes of 4-7-8 or coherence breathing. Begin lying down in bed or on a yoga mat. The extended exhale pattern activates the baroreflex and initiates the vagal brake on heart rate.',
              },
              {
                step: '6',
                title: 'Body scan or Yoga Nidra (in bed)',
                desc: 'Follow a guided body scan or Yoga Nidra recording. Do not try to stay awake. The practice works whether you complete it consciously or drift into sleep. Attempting to "do it right" is the main obstacle.',
              },
            ].map(item => (
              <div key={item.step} style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <div
                  className="timeline-node"
                  style={{ background: TEAL_DEEP }}
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
          13. "Now, practice." SEPARATOR + VIDEOS
      ══════════════════════════════════════════════════════ */}
      {/* Section break — remapped to teal */}
      <div
        id="practice"
        style={{
          padding: '2.5rem max(1.5rem, 8vw)',
          background: TEAL_DEEP,
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'rgba(163,196,204,0.3)' }} />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: TEAL_MID,
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Now, practice.
        </p>
        <div style={{ flex: 1, height: '1px', background: 'rgba(163,196,204,0.3)' }} />
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
              Choose your practice based on where you are in the day. Yoga Nidra and NSDR for
              midday recovery or pre-sleep. Breathwork for the transition window. Sleep meditations
              for in-bed practice.
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
              { key: 'yoga-nidra' as VideoTab, label: 'Yoga Nidra / NSDR' },
              { key: 'breathwork' as VideoTab, label: 'Evening Breathwork' },
              { key: 'meditations' as VideoTab, label: 'Sleep Meditations' },
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
                  border: `1px solid ${activeVideoTab === tab.key ? TEAL_DEEP : 'var(--color-border)'}`,
                  background:
                    activeVideoTab === tab.key ? TEAL_DEEP : 'var(--color-surface-raised)',
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
          background: `linear-gradient(160deg, oklch(35% 0.08 210 / 0.18), var(--color-cream))`,
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
              Sleep Connects to Everything
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              Every practice on this site either prepares the nervous system for sleep or benefits
              from it. Here is where to go next.
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
                desc: 'The complete breath technique library — from morning activation to evening wind-down.',
              },
              {
                href: '/nervous-system',
                label: 'Nervous System',
                desc: 'Polyvagal theory, HRV in depth, vagal tone training, and the science of safety.',
              },
              {
                href: '/yoga',
                label: 'Yoga',
                desc: 'Restorative postures, Yoga Nidra sequencing, and the physiology of savasana.',
              },
              {
                href: '/meditate',
                label: 'Meditate',
                desc: 'Body scan, loving-kindness, focused attention — and how each affects sleep quality.',
              },
              {
                href: '/somatics',
                label: 'Somatics',
                desc: 'Somatic practices that discharge the residual tension preventing deep sleep.',
              },
              {
                href: '/chakras',
                label: 'Chakras',
                desc: 'The subtle energy centers and their relationship to sleep, rest, and nervous system restoration.',
              },
              {
                href: '/trauma',
                label: 'Trauma',
                desc: 'How unresolved trauma disrupts sleep architecture and how somatic, breath, and nervous system practices heal the pattern.',
              },
              {
                href: '/nutrition',
                label: 'Nutrition',
                desc: 'How blood sugar stability, magnesium, and gut-brain signaling set the biochemical foundation for deep sleep.',
              },
              {
                href: '/temperature',
                label: 'Temperature',
                desc: 'Core body temperature must drop 1–2°C to initiate sleep. Cold exposure and evening cooling protocols directly support this mechanism.',
              },
              {
                href: '/nature',
                label: 'Nature',
                desc: 'Natural light entrains the circadian clock, and outdoor time regulates cortisol rhythms that govern the sleep-wake cycle.',
              },
              {
                href: '/taichi',
                label: 'Tai Chi',
                desc: 'Evening tai chi reduces inflammatory markers and cortisol, supporting the biological conditions for deep sleep.',
              },
              {
                href: '/fasting',
                label: 'Fasting',
                desc: 'Time-restricted eating and circadian alignment directly improve sleep quality and overnight HRV by synchronizing peripheral clocks.',
              },
              {
                href: '/psychedelics',
                label: 'Psychedelics',
                desc: 'Slow-wave sleep architecture improves post-session. Sleep consolidates the neuroplastic changes triggered by psychedelic experiences.',
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
                        color: TEAL_DEEP,
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
                borderLeft: `3px solid ${TEAL_MID}`,
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
                &ldquo;Sleep is the single most effective thing we can do to reset our brain and body health
                each day.&rdquo;
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
                Matthew Walker &mdash; Why We Sleep
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
