'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';
import StatCard from '@/components/StatCard';

// ── Accent tokens (fasting / warm gold) ────────────────────────
const GOLD_DEEP = '#7A6B3C';
const GOLD_MID  = '#B8A874';
const GOLD_PALE = '#F0EBDB';

// ── Fasting Type Card ──────────────────────────────────────────
function FastingTypeCard({
  name,
  window,
  difficulty,
  mechanism,
}: {
  name: string;
  window: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  mechanism: string;
}) {
  const diffColor =
    difficulty === 'Easy'
      ? { bg: 'rgba(45,106,79,0.10)', text: '#2D6A4F' }
      : difficulty === 'Moderate'
      ? { bg: GOLD_PALE, text: GOLD_DEEP }
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
            background: GOLD_PALE,
            color: GOLD_DEEP,
            border: `1px solid ${GOLD_MID}`,
          }}
        >
          {window}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            background: diffColor.bg,
            color: diffColor.text,
            border: '1px solid var(--color-border)',
          }}
        >
          {difficulty}
        </span>
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
        {mechanism}
      </p>
    </div>
  );
}

// ── Tradition Card ─────────────────────────────────────────────
function TraditionCard({
  tradition,
  practice,
  detail,
}: {
  tradition: string;
  practice: string;
  detail: string;
}) {
  return (
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
          color: GOLD_DEEP,
          margin: '0 0 0.25rem',
        }}
      >
        {tradition}
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
        {practice}
      </p>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
        {detail}
      </p>
    </div>
  );
}

// ── Video tab data ──────────────────────────────────────────────
type VideoTab = 'science' | 'circadian' | 'protocols';

const videoData: Record<VideoTab, Array<{ videoId: string; title: string; description: string }>> = {
  science: [
    {
      videoId: '1xCN5o0glHg',
      title: 'The Misunderstood Science of Intermittent Fasting',
      description: 'The Nobel Prize lecture from Yoshinori Ohsumi explaining the discovery of autophagy, how cells self-digest damaged components, and why fasting is its most potent trigger. The foundational science behind every fasting protocol.',
    },
    {
      videoId: 'AKzfb3d3Ztg',
      title: 'Autophagy & Intermittent Fasting | cellular Recycling',
      description: 'Mark Mattson\'s research on the metabolic switch from glucose to ketone metabolism during fasting, BDNF elevation, and why brief fasting periods may protect against neurodegenerative disease.',
    },
  ],
  circadian: [
    {
      videoId: '12eTMH2PSYI',
      title: 'What is autophagy and what are the fasting & autophagy stages',
      description: 'Satchin Panda presents the science of circadian eating: why when you eat matters as much as what you eat, how an 8–10 hour eating window aligns with circadian clocks, and the landmark mouse and human studies from the Salk Institute.',
    },
  ],
  protocols: [
    {
      videoId: 'NtOpAhDpYbo',
      title: 'Your Body Will Eat Its Own Diseases | Dr. Pradip Jamnadas',
      description: 'A clinical overview of fasting protocols from 12:12 to extended fasting. Covers who should and should not fast, how to structure the first 4 weeks, electrolyte management, and how to break a fast properly.',
    },
    {
      videoId: 'XLj2Qu4SuNQ',
      title: 'Top Autophagy Benefits | Jason Fung',
      description: 'A clinical overview of fasting protocols from 12:12 to extended fasting. Covers who should and should not fast, how to structure the first 4 weeks, electrolyte management, and how to break a fast properly.',
    },
  ],
};

// ── Fasting types data ─────────────────────────────────────────
const fastingTypes: Array<{
  name: string;
  window: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  mechanism: string;
}> = [
  {
    name: 'Time-Restricted Eating (TRE) — 8–12 hr window',
    window: '12–16 hr fast',
    difficulty: 'Easy',
    mechanism:
      'The most studied form of fasting. Eating within a consistent 8–12 hour window aligned with daylight hours. Satchin Panda\'s research shows that even without caloric restriction, TRE improves metabolic markers, reduces visceral fat, and synchronizes peripheral circadian clocks in liver, gut, and muscle.',
  },
  {
    name: '16:8 Intermittent Fasting',
    window: '16 hr fast · 8 hr eating',
    difficulty: 'Moderate',
    mechanism:
      'The most popular protocol. A 16-hour fast reliably triggers early autophagy in most people, especially in metabolically flexible individuals. Commonly structured as skipping breakfast or an early dinner. Multiple RCTs show equivalent weight-loss outcomes to continuous caloric restriction with better adherence.',
  },
  {
    name: '5:2 Protocol',
    window: '2 days at 500 kcal',
    difficulty: 'Moderate',
    mechanism:
      'Eat normally 5 days, restrict to 500–600 kcal on 2 non-consecutive days. Michael Mosley popularized this; clinical trials show equivalent metabolic benefits to daily restriction. The very low calorie days trigger deep autophagy and mTOR suppression without requiring daily schedule changes.',
  },
  {
    name: 'Alternate Day Fasting (ADF)',
    window: 'Every other day',
    difficulty: 'Advanced',
    mechanism:
      'Complete fast (or <500 kcal) every other day. Most aggressive intermittent protocol. Research by Krista Varady shows significant improvements in insulin sensitivity and cardiovascular markers. High dropout rates in trials suggest this suits a small subset of practitioners.',
  },
  {
    name: 'Extended Fasting (24–72 hrs)',
    window: '24–72 hr fast',
    difficulty: 'Advanced',
    mechanism:
      'Beyond 24 hours, autophagy reaches maximal activation, growth hormone spikes dramatically (up to 5x), and the body fully transitions to fat-derived ketone metabolism. Should be undertaken with medical guidance. Not appropriate for beginners — build to this after 3–6 months of daily TRE.',
  },
];

// ── Traditions data ────────────────────────────────────────────
const traditions = [
  {
    tradition: 'Islam',
    practice: 'Ramadan',
    detail: 'Month-long daily fast from pre-dawn (suhoor) to sunset (iftar). One of the Five Pillars of Islam. Observed by 1.8 billion Muslims annually. Explicitly tied to spiritual purification, increased self-discipline, and solidarity with the poor.',
  },
  {
    tradition: 'Christianity',
    practice: 'Lent & Fasting Days',
    detail: '40-day Lenten fast commemorating Christ\'s 40 days in the desert. Weekly fast days (traditionally Wednesday and Friday) have been practiced since the earliest Christian communities. Eastern Orthodox traditions include up to 180 fasting days per year.',
  },
  {
    tradition: 'Judaism',
    practice: 'Yom Kippur & Minor Fasts',
    detail: 'Yom Kippur, the holiest day of the Jewish year, involves a complete 25-hour fast. Additional minor fast days throughout the year include Tisha B\'Av, Fast of Gedaliah, Fast of Esther, and others — totaling 6 annual fast days.',
  },
  {
    tradition: 'Hinduism',
    practice: 'Ekadashi & Vrata',
    detail: 'Ekadashi fasting occurs twice monthly on the 11th day of each lunar fortnight. Associated with Vishnu and believed to purify the mind and body. Millions of Hindus practice weekly fasts (Monday for Shiva, Tuesday for Hanuman) as a devotional discipline.',
  },
  {
    tradition: 'Buddhism',
    practice: 'The Noon Rule',
    detail: 'The Vinaya (monastic code) requires monks to eat only before noon. This rule — observed for 2,500 years — is functionally a 16–18 hour daily fast. The Buddha taught that eating lightly promoted mental clarity and freedom from the distraction of hunger planning.',
  },
  {
    tradition: 'Indigenous Traditions',
    practice: 'Vision Quests',
    detail: 'Across Native American, African, and indigenous cultures globally, extended fasting of 2–4 days is used as a rite of passage and for accessing altered states of consciousness. The altered perception and heightened clarity during extended fasting may be mediated by ketone metabolism and BDNF elevation.',
  },
];

export default function FastingClient() {
  const [activeVideoTab, setActiveVideoTab] = useState<VideoTab>('science');

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
          background: 'linear-gradient(160deg, oklch(35% 0.08 75), oklch(50% 0.10 60))',
          overflow: 'hidden',
        }}
      >
        {/* Animated orb */}
        <div
          className="breathe"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-6vw',
            top: '15%',
            width: 'clamp(300px, 45vw, 600px)',
            height: 'clamp(300px, 45vw, 600px)',
            borderRadius: '9999px',
            background: `radial-gradient(circle, ${GOLD_PALE}30 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
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
            THE CELLULAR RESET
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
            Fasting &amp; Autophagy
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
            When you stop eating, your cells start cleaning. Autophagy &mdash; the Nobel Prize-winning
            discovery &mdash; is your body&rsquo;s recycling system, and fasting is its most potent trigger.
            Every contemplative tradition on Earth independently discovered this.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { href: '#types', label: 'Types' },
              { href: '#autophagy', label: 'Autophagy' },
              { href: '#circadian', label: 'Circadian' },
              { href: '#brain', label: 'Brain' },
              { href: '#traditions', label: 'Traditions' },
              { href: '#protocols', label: 'Protocols' },
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
                  color: GOLD_MID,
                  textDecoration: 'none',
                  borderBottom: `1px solid rgba(184,168,116,0.5)`,
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
          2. TYPES OF FASTING
      ══════════════════════════════════════════════════════ */}
      <section
        id="types"
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
              A Spectrum of Approaches
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
              Types of Fasting
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
              Fasting is not one thing. From the gentle 12-hour overnight fast to multi-day extended
              fasts, each protocol creates different metabolic states and activates different biological
              pathways. Start with the easiest and build progressively.
            </p>
          </ScrollReveal>

          {/* Type cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
              marginBottom: '3.5rem',
            }}
          >
            {fastingTypes.map(t => (
              <ScrollReveal key={t.name}>
                <FastingTypeCard
                  name={t.name}
                  window={t.window}
                  difficulty={t.difficulty}
                  mechanism={t.mechanism}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Comparison table */}
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
              Protocol Comparison
            </h3>
          </ScrollReveal>
          <ScrollReveal>
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: `2px solid ${GOLD_MID}` }}>
                    {['Protocol', 'Fast Duration', 'Autophagy', 'Adherence', 'Best For'].map(h => (
                      <th
                        key={h}
                        style={{
                          textAlign: 'left',
                          padding: '0.75rem 1rem',
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: GOLD_DEEP,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['12:12 TRE', '12 hrs', 'Minimal', 'Very High', 'Beginners, metabolic baseline'],
                    ['14:10 TRE', '14 hrs', 'Low–Moderate', 'High', 'Daily maintenance, circadian alignment'],
                    ['16:8', '16 hrs', 'Moderate', 'High', 'Fat adaptation, sustained autophagy'],
                    ['5:2', '20+ hrs (×2/wk)', 'Deep (fast days)', 'Moderate', 'Those who prefer weekly flexibility'],
                    ['ADF', '24 hrs (×3–4/wk)', 'Deep', 'Low', 'Research-validated; high discipline required'],
                    ['Extended (24–72h)', '24–72 hrs', 'Maximal', 'Low', 'Periodic reset; medical supervision'],
                  ].map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: '1px solid var(--color-border)',
                        background: i % 2 === 0 ? 'transparent' : GOLD_PALE,
                      }}
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          style={{
                            padding: '0.75rem 1rem',
                            color: j === 0 ? 'var(--color-text)' : 'var(--color-text-muted)',
                            fontWeight: j === 0 ? 500 : 400,
                            lineHeight: 1.5,
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          4. AUTOPHAGY
      ══════════════════════════════════════════════════════ */}
      <section
        id="autophagy"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${GOLD_PALE})`,
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
              The Nobel Prize-Winning Discovery
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
              Autophagy: Your Cellular Recycling System
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
              In 2016, Yoshinori Ohsumi was awarded the Nobel Prize in Physiology or Medicine for
              elucidating the mechanisms of autophagy &mdash; the process by which cells break down
              and recycle their own damaged components. Fasting is its most potent known trigger.
            </p>
          </ScrollReveal>

          {/* Two-column: mechanism */}
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
                The Mechanism: mTOR and AMPK
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Autophagy is regulated by two opposing master regulators.{' '}
                <strong>mTOR (mechanistic Target of Rapamycin)</strong> is the growth signal: activated by
                amino acids, insulin, and IGF-1, it suppresses autophagy and promotes anabolic processes.
                When you eat &mdash; especially protein and carbohydrates &mdash; mTOR is switched on and
                autophagy is inhibited.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                <strong>AMPK (AMP-activated protein kinase)</strong> is the energy-sensing partner: activated
                when cellular energy (ATP) is low, as occurs during fasting. AMPK directly inhibits mTOR and
                activates the autophagy cascade via ULK1 phosphorylation. This is why the fed/fasted cycle
                is the primary switch for autophagy induction.
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
                What Gets Cleaned
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Autophagy targets several categories of cellular debris:
              </p>
              <ul style={{ lineHeight: 1.9, paddingLeft: '1.25rem', marginBottom: '1rem', color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
                <li><strong style={{ color: 'var(--color-text)' }}>Damaged mitochondria</strong> (mitophagy) — dysfunctional energy factories cleared to prevent oxidative stress</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Misfolded proteins</strong> — aggregates linked to Parkinson&rsquo;s, Alzheimer&rsquo;s, and ALS</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Intracellular pathogens</strong> (xenophagy) — bacteria and viruses sequestered and degraded</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Excess lipid droplets</strong> (lipophagy) — triglyceride stores released for energy</li>
              </ul>
              <div
                style={{
                  borderLeft: `3px solid ${GOLD_MID}`,
                  padding: '1rem 1.25rem',
                  background: GOLD_PALE,
                  borderRadius: '0 2px 2px 0',
                  marginTop: '1rem',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: GOLD_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  Autophagy reaches meaningful induction at 12&ndash;16 hours of fasting in most people.
                  The rate accelerates significantly after 24 hours and peaks during extended multi-day fasts.
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
                source="Nobel Committee, 2016"
                stat="2016 Nobel Prize"
                detail="Yoshinori Ohsumi awarded the Nobel Prize in Physiology or Medicine for discovering the mechanisms of autophagy — the cellular self-eating process that fasting triggers and that is impaired in aging, cancer, and neurodegeneration."
                url="https://www.nobelprize.org/prizes/medicine/2016/ohsumi/facts/"
                accentColor={GOLD_MID}
                accentTextColor={GOLD_DEEP}
              />
              <StatCard
                source="Alirezaei et al., 2010; Hartman et al."
                stat="12–16 hrs"
                detail="Autophagy induction begins at 12–16 hours of fasting in most metabolically healthy individuals. The precise threshold varies with metabolic flexibility — regular fasters may induce autophagy earlier."
                url="https://pubmed.ncbi.nlm.nih.gov/20534972/"
                accentColor={GOLD_MID}
                accentTextColor={GOLD_DEEP}
              />
              <StatCard
                source="Mattson et al., Nat Rev Neurosci, 2018"
                stat="50–400% BDNF increase"
                detail="Brain-derived neurotrophic factor rises 50–400% during fasting, depending on duration and individual. BDNF supports neurogenesis, synaptic plasticity, and is the primary mechanism behind fasting-associated cognitive clarity."
                url="https://pubmed.ncbi.nlm.nih.gov/29321682/"
                accentColor={GOLD_MID}
                accentTextColor={GOLD_DEEP}
              />
            </div>
          </ScrollReveal>

          {/* Ohsumi callout */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${GOLD_MID}`,
                padding: '1.25rem 1.5rem',
                background: GOLD_PALE,
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
                  color: GOLD_DEEP,
                  margin: '0 0 0.5rem',
                }}
              >
                Ohsumi&rsquo;s Core Insight
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>
                Ohsumi used baker&rsquo;s yeast in nitrogen-deficient conditions to visualize autophagy
                for the first time. He identified 15 essential autophagy genes (ATG genes) whose homologs
                exist in every eukaryotic cell — from yeast to humans. The conservation across 2 billion
                years of evolution signals how fundamental this mechanism is to cellular survival.
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
          6. CIRCADIAN EATING
      ══════════════════════════════════════════════════════ */}
      <section
        id="circadian"
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
              Satchin Panda &amp; the Circadian Clock
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
              When You Eat Is When You Are
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
              Satchin Panda&rsquo;s research at the Salk Institute revealed that circadian timing of food
              intake &mdash; not just what you eat &mdash; governs metabolic health. Every organ has its
              own peripheral clock, and when you eat out of phase with your circadian biology, the consequences
              rival the effects of poor diet.
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
                The Mouse Studies: Hatori et al. 2012
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Panda&rsquo;s landmark 2012 study (Hatori et al., <em>Cell Metabolism</em>) fed two groups of mice
                identical high-fat, high-calorie diets. One group ate freely; the other had access restricted to
                an 8-hour window aligned with their active phase. After 18 weeks, the ad libitum group was obese
                and metabolically ill; the time-restricted group was lean and metabolically healthy &mdash; despite
                eating the same calories.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The mechanism: food acts as a <strong>zeitgeber</strong> (time-giver) for peripheral clocks.
                Late eating desynchronizes the liver, gut, and adipose tissue clocks from the master SCN clock,
                creating &ldquo;circadian jet lag&rdquo; at the cellular level &mdash; even without crossing time zones.
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
                Human Studies
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>Wilkinson et al. (2020, Cell Metabolism):</strong> Metabolic syndrome patients on a
                10-hour TRE window for 12 weeks showed significant reductions in body weight, blood pressure,
                atherogenic lipids, and blood glucose &mdash; without caloric restriction. Benefits persisted
                at 1-year follow-up.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>Sutton et al. (2018, Cell Metabolism):</strong> Early TRE (eating between 7am&ndash;3pm)
                in pre-diabetic men improved insulin sensitivity, blood pressure, and oxidative stress
                independently of weight loss &mdash; suggesting circadian alignment itself drives metabolic benefits.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${GOLD_MID}`,
                  padding: '1rem 1.25rem',
                  background: GOLD_PALE,
                  borderRadius: '0 2px 2px 0',
                  marginTop: '0.875rem',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: GOLD_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  Circadian alignment &mdash; matching your eating window to daylight hours &mdash; appears to
                  matter more than the window duration itself. A 10-hour window from 7am&ndash;5pm outperforms
                  a 10-hour window from noon&ndash;10pm metabolically.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Window cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                label: 'Early Window',
                time: '7am – 3pm',
                color: '#E4AD75',
                textColor: '#8B5E2A',
                desc: 'Maximum circadian alignment. Insulin sensitivity peaks in the morning; the pancreas is most efficient before noon. Difficult for social and work schedules, but produces the strongest metabolic effects.',
              },
              {
                label: 'Standard Window',
                time: '8am – 6pm',
                color: GOLD_MID,
                textColor: GOLD_DEEP,
                desc: 'Practical and well-studied. An 8–10 hour window starting with breakfast and ending with an early dinner. Achieves most of the metabolic and circadian benefits without social disruption.',
              },
              {
                label: 'Late Window',
                time: '12pm – 8pm',
                color: '#8B3A62',
                textColor: '#8B3A62',
                desc: 'Common with skip-breakfast protocols. Misaligned with circadian biology — evening eating coincides with rising melatonin, which impairs glucose disposal. Less effective metabolically despite equal fasting duration.',
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
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          8. FASTING & THE BRAIN
      ══════════════════════════════════════════════════════ */}
      <section
        id="brain"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${GOLD_PALE})`,
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
              Neurological Effects
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
              Fasting &amp; the Brain
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
              The cognitive clarity many practitioners report during fasting is not placebo. It reflects
              real neurochemical shifts: a metabolic switch from glucose to ketones, a dramatic rise in
              BDNF, and a calming of the default mode network that practitioners in every contemplative
              tradition have described as &ldquo;mental brightness.&rdquo;
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
                The Metabolic Switch
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                After 12–16 hours of fasting, liver glycogen is depleted and the body begins producing
                ketone bodies &mdash; primarily beta-hydroxybutyrate (BHB), acetoacetate, and acetone &mdash;
                from fatty acids. The brain, which ordinarily runs on glucose, shifts to using these ketones
                as its primary fuel source.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Ketones are not merely an emergency fuel. <strong>Beta-hydroxybutyrate (BHB)</strong> functions
                as a signaling molecule: it inhibits histone deacetylases (HDACs), activating neuroprotective
                gene programs; it blocks the NLRP3 inflammasome, reducing neuroinflammation; and it increases
                GABA/glutamate balance, which may underlie the calm focus associated with metabolic ketosis.
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
                BDNF, HRV &amp; Nervous System Effects
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                Mark Mattson&rsquo;s NIH research documents that fasting raises BDNF (brain-derived
                neurotrophic factor) by 50&ndash;400%, depending on fasting duration. BDNF promotes
                neurogenesis, strengthens synaptic connections, protects dopaminergic neurons, and is
                the primary molecular target of antidepressants and aerobic exercise.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                HRV (heart rate variability) often <em>increases</em> during the fasted state, particularly
                in the morning. This reflects reduced sympathetic tone and improved vagal activity &mdash;
                consistent with the nervous system calming that contemplatives across traditions associate
                with fasting practice.
              </p>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  border: `1px solid ${GOLD_MID}`,
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
                    color: GOLD_DEEP,
                    margin: '0 0 0.5rem',
                  }}
                >
                  The Fasting Clarity Mechanism
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                  Fasting clarity = reduced glucose variability + ketone fuel stability + elevated BDNF +
                  BHB-mediated GABA/glutamate balance + suppressed default mode network activity.
                  Each element compounds the others.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Brain effects cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                practice: 'BDNF Rise',
                effect: '50–400% increase in brain-derived neurotrophic factor during fasting. Supports neurogenesis, synaptic strength, depression resilience, and neuroprotection against Parkinson\'s and Alzheimer\'s.',
                direction: 'positive',
              },
              {
                practice: 'Ketone Metabolism',
                effect: 'Beta-hydroxybutyrate (BHB) provides a more stable and efficient fuel than glucose. Eliminates the glucose rollercoaster that drives afternoon cognitive crashes and brain fog.',
                direction: 'positive',
              },
              {
                practice: 'HRV Increase',
                effect: 'Morning fasted HRV tends to be higher in regular fasters. Reflects improved vagal tone, reduced baseline sympathetic activation, and better autonomic regulation.',
                direction: 'positive',
              },
              {
                practice: 'Neuroinflammation',
                effect: 'BHB blocks the NLRP3 inflammasome, a key driver of neuroinflammation implicated in depression, cognitive decline, and multiple sclerosis. Fasting is anti-inflammatory at the neurological level.',
                direction: 'positive',
              },
            ].map(item => (
              <ScrollReveal key={item.practice}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    padding: '1.5rem',
                    borderTop: `3px solid ${item.direction === 'positive' ? GOLD_MID : '#8B3A62'}`,
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
          9. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          10. CONTEMPLATIVE TRADITIONS
      ══════════════════════════════════════════════════════ */}
      <section
        id="traditions"
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
              Cross-Cultural Convergence
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
              Every Tradition Discovered Fasting
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
              Without communication between them, every major spiritual tradition on Earth independently
              arrived at fasting as a central practice. This convergence is not coincidence &mdash; it reflects
              a consistent human discovery that voluntary food deprivation produces real changes in consciousness,
              perception, and inner life. Modern neuroscience is now mapping the mechanisms beneath those reports.
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
            {traditions.map(t => (
              <ScrollReveal key={t.tradition}>
                <TraditionCard
                  tradition={t.tradition}
                  practice={t.practice}
                  detail={t.detail}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Convergence callout */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${GOLD_MID}`,
                padding: '1.25rem 1.5rem',
                background: GOLD_PALE,
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
                  color: GOLD_DEEP,
                  margin: '0 0 0.5rem',
                }}
              >
                The Convergence Argument
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>
                When Islam, Christianity, Judaism, Hinduism, Buddhism, and indigenous cultures across six
                continents all independently arrive at the same practice &mdash; voluntary food restriction as
                a path to spiritual clarity &mdash; the most parsimonious explanation is that they discovered
                something real in human biology. The metabolic switch to ketones, the BDNF surge, the quieting
                of the default mode network: these are the neuroscientific correlates of what practitioners
                across millennia described as purification, clarity, and presence.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          12. PROTOCOLS
      ══════════════════════════════════════════════════════ */}
      <section
        id="protocols"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${GOLD_PALE})`,
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
              A Progressive On-Ramp
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
              Starting a Fasting Practice
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
              Fasting is a skill, not a willpower test. Metabolic flexibility &mdash; the ability to
              switch between glucose and fat fuel &mdash; is trained gradually. The 3-phase progression
              below builds the physiology before the duration.
            </p>
          </ScrollReveal>

          {/* Timeline */}
          <div className="timeline" style={{ paddingLeft: '2.5rem' }}>
            {[
              {
                step: '1',
                title: 'Phase 1: 12:12 — Weeks 1–2',
                desc: 'Begin with a 12-hour eating window and 12-hour fast. This is the baseline for circadian alignment: no eating after dinner, no eating before a reasonable breakfast. Most people are already close to this without realizing it. The goal here is consistency and timing, not restriction.',
              },
              {
                step: '2',
                title: 'Phase 2: 14:10 — Weeks 3–4',
                desc: 'Extend the overnight fast to 14 hours by either delaying breakfast by 1 hour or moving dinner 1 hour earlier. This window begins to reduce mTOR activity and create the conditions for early autophagy induction. Metabolic flexibility begins to improve here.',
              },
              {
                step: '3',
                title: 'Phase 3: 16:8 — Week 5 onward',
                desc: 'The research-validated intermittent fasting window. At 16 hours, autophagy is meaningfully induced, the metabolic switch to ketones begins in most people, and BDNF elevation becomes measurable. This is the maintenance protocol for most practitioners.',
              },
            ].map(item => (
              <div key={item.step} style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <div
                  className="timeline-node"
                  style={{ background: GOLD_DEEP }}
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

          {/* Safety callout */}
          <ScrollReveal>
            <div
              style={{
                border: `1px solid #8B3A62`,
                borderLeft: `3px solid #8B3A62`,
                padding: '1.5rem 1.75rem',
                background: 'rgba(139,58,98,0.06)',
                borderRadius: '0 2px 2px 0',
                marginTop: '3rem',
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
                Safety &amp; Contraindications
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.75,
                  margin: '0 0 0.75rem',
                }}
              >
                Fasting is not appropriate for everyone. Consult a physician before beginning any fasting
                protocol if you have:
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
                <li>Type 1 diabetes or insulin-dependent Type 2 diabetes</li>
                <li>History of eating disorders (anorexia, bulimia, orthorexia)</li>
                <li>Pregnancy or breastfeeding</li>
                <li>Underweight (BMI &lt;18.5) or active malnutrition</li>
                <li>Adrenal insufficiency or active thyroid conditions</li>
                <li>Current use of medications that require food (especially hypoglycemics)</li>
              </ul>
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
          background: GOLD_DEEP,
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'rgba(184,168,116,0.3)' }} />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: 'white',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Now, practice.
        </p>
        <div style={{ flex: 1, height: '1px', background: 'rgba(184,168,116,0.3)' }} />
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
              Fasting Science &amp; Protocols
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              Foundational lectures and practical guides from the researchers who have done the most
              to understand what fasting does to the human body and brain.
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
              { key: 'science' as VideoTab, label: 'Autophagy Science' },
              { key: 'circadian' as VideoTab, label: 'Circadian Eating' },
              { key: 'protocols' as VideoTab, label: 'Practical Protocols' },
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
                  border: `1px solid ${activeVideoTab === tab.key ? GOLD_DEEP : 'var(--color-border)'}`,
                  background:
                    activeVideoTab === tab.key ? GOLD_DEEP : 'var(--color-surface-raised)',
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
          background: `linear-gradient(160deg, oklch(35% 0.08 75 / 0.18), oklch(93% 0.03 60))`,
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
              Fasting Connects to Everything
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              The physiological changes that fasting triggers ripple through every system in the body.
              Here is where the science connects to your wider practice.
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
                href: '/sleep',
                label: 'Sleep',
                desc: 'Time-restricted eating and circadian alignment directly improve sleep quality and overnight HRV by synchronizing peripheral clocks.',
              },
              {
                href: '/nervous-system',
                label: 'Nervous System',
                desc: 'Fasting increases morning HRV and vagal tone. BHB reduces neuroinflammation, creating a calmer baseline autonomic state.',
              },
              {
                href: '/meditate',
                label: 'Meditate',
                desc: 'Fasting clarity — driven by ketones and BDNF — can deepen meditation practice. Many advanced retreat protocols include fasting.',
              },
              {
                href: '/breathe',
                label: 'Breathwork',
                desc: 'Fasting lowers baseline respiratory rate and CO2 sensitivity, creating favorable conditions for breathwork practices.',
              },
              {
                href: '/yoga',
                label: 'Yoga',
                desc: 'Traditional yoga recommends an empty stomach for practice. Modern research confirms that fasted movement enhances fat oxidation and BDNF.',
              },
              {
                href: '/nutrition',
                label: 'Nutrition',
                desc: 'Fasting and nutrition are inseparable. What you eat in your eating window determines how cleanly you fast and how deeply autophagy is triggered.',
              },
              {
                href: '/cold',
                label: 'Cold Exposure',
                desc: 'Cold water immersion and fasting are synergistic: both activate AMPK, elevate norepinephrine, and increase brown adipose tissue activity.',
              },
              {
                href: '/nature',
                label: 'Nature',
                desc: 'Early morning light exposure during the fasted state maximally amplifies the cortisol awakening response and circadian clock resetting.',
              },
              {
                href: '/trauma',
                label: 'Trauma',
                desc: 'BDNF elevation during fasting may support trauma recovery. However, fasting should be approached carefully by those with trauma-related eating patterns.',
              },
              {
                href: '/chakras',
                label: 'Chakras',
                desc: 'Traditional solar plexus (Manipura) practices are associated with digestive fire and personal transformation — a metaphorical framework for fasting\'s metabolic activation.',
              },
              {
                href: '/taichi',
                label: 'Tai Chi',
                desc: 'Traditional Chinese Medicine and tai chi both emphasize cultivating Jing — fasting conserves and clarifies the foundational essence.',
              },
              {
                href: '/psychedelics',
                label: 'Psychedelics',
                desc: 'Fasting before a psychedelic session is a traditional preparation protocol that increases sensitivity, clarity, and the depth of the experience.',
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
                        color: GOLD_DEEP,
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
                borderLeft: `3px solid ${GOLD_MID}`,
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
                &ldquo;The body heals in the absence of digestion. The mind clarifies in the absence of
                feeding. Every tradition that discovered this was pointing to the same biology.&rdquo;
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
                Mark Mattson &mdash; NIH Laboratory of Neurosciences
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
