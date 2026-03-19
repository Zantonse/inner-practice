'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';
import StatCard from '@/components/StatCard';

// ── Accent tokens (psychedelics / deep violet) ──────────────────
const VIOLET_DEEP = '#5C3D7A';
const VIOLET_MID  = '#9B7DBF';
const VIOLET_PALE = '#EDE3F7';

// ── Molecule Card ──────────────────────────────────────────────
function MoleculeCard({
  name,
  mechanism,
  duration,
  clinicalStatus,
  evidenceLevel,
  description,
}: {
  name: string;
  mechanism: string;
  duration: string;
  clinicalStatus: string;
  evidenceLevel: 'Strong' | 'Moderate' | 'Emerging';
  description: string;
}) {
  const evidenceColor =
    evidenceLevel === 'Strong'
      ? { bg: 'rgba(45,106,79,0.10)', text: '#2D6A4F' }
      : evidenceLevel === 'Moderate'
      ? { bg: VIOLET_PALE, text: VIOLET_DEEP }
      : { bg: 'rgba(228,173,117,0.15)', text: '#8B5E2A' };

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
            background: VIOLET_PALE,
            color: VIOLET_DEEP,
            border: `1px solid ${VIOLET_MID}`,
          }}
        >
          {duration}
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
          {evidenceLevel}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            background: 'var(--color-surface-raised)',
            color: 'var(--color-text-muted)',
            border: '1px solid var(--color-border)',
          }}
        >
          {clinicalStatus}
        </span>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: VIOLET_DEEP,
          margin: '0 0 0.625rem',
          fontStyle: 'italic',
        }}
      >
        {mechanism}
      </p>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

// ── Molecule data ───────────────────────────────────────────────
const molecules: Array<{
  name: string;
  mechanism: string;
  duration: string;
  clinicalStatus: string;
  evidenceLevel: 'Strong' | 'Moderate' | 'Emerging';
  description: string;
}> = [
  {
    name: 'Psilocybin',
    mechanism: '5-HT2A agonist — default mode network suppression',
    duration: '4–6 hours',
    clinicalStatus: 'FDA Breakthrough Therapy (depression)',
    evidenceLevel: 'Strong',
    description:
      'The active compound in "magic mushrooms," converted to psilocin in the body. Acts primarily as a 5-HT2A receptor agonist, suppressing the default mode network and triggering a surge of entropic brain activity. Two doses produce remission-level depression relief lasting months. Currently in Phase 3 trials.',
  },
  {
    name: 'MDMA',
    mechanism: 'Serotonin/dopamine/norepinephrine release + oxytocin surge',
    duration: '3–5 hours',
    clinicalStatus: 'FDA Breakthrough Therapy (PTSD)',
    evidenceLevel: 'Strong',
    description:
      'Distinct from classical psychedelics — MDMA does not suppress the DMN but instead floods the brain with serotonin, dopamine, and oxytocin while reducing amygdala reactivity. Creates a state of psychological safety ideal for trauma processing. Phase 3 trials show 67% PTSD remission with 3 assisted sessions.',
  },
  {
    name: 'LSD',
    mechanism: '5-HT2A agonist + dopamine modulation — longest duration',
    duration: '8–12 hours',
    clinicalStatus: 'Phase 2 trials (anxiety, addiction)',
    evidenceLevel: 'Moderate',
    description:
      'Lysergic acid diethylamide shares the 5-HT2A mechanism with psilocybin but has longer duration and more pronounced dopaminergic effects. Early research shows promise for anxiety and addiction. The longer duration creates practical challenges for supervised clinical use. Historical research (Grof, 1970s) showed profound therapeutic potential.',
  },
  {
    name: 'Ketamine',
    mechanism: 'NMDA receptor antagonist — rapid glutamate surge',
    duration: '1–2 hours',
    clinicalStatus: 'FDA-approved (esketamine/Spravato)',
    evidenceLevel: 'Strong',
    description:
      'Unlike classical psychedelics, ketamine is a dissociative anesthetic that blocks NMDA receptors, triggering a rapid glutamate surge and BDNF release. The only legal, FDA-approved psychedelic-adjacent medicine (as intranasal esketamine). Produces antidepressant effects within hours, ideal for acute suicidality. Neuroplasticity mechanism distinct from serotonergic psychedelics.',
  },
  {
    name: 'DMT / Ayahuasca',
    mechanism: '5-HT2A agonist + MAO inhibition (ayahuasca)',
    duration: '15–45 min (DMT) · 4–6 hrs (ayahuasca)',
    clinicalStatus: 'Phase 2 trials',
    evidenceLevel: 'Emerging',
    description:
      'N,N-Dimethyltryptamine is produced endogenously in trace amounts and is the most powerful known psychedelic. Ayahuasca combines DMT-containing plants with MAO inhibitors (harmala alkaloids) for oral activity. Indigenous ceremonial use spans millennia. Brazilian and North American clinical trials show significant antidepressant effects after a single session.',
  },
];

// ── Video tab data ─────────────────────────────────────────────
type VideoTab = 'integration' | 'research' | 'microdosing';

const videoData: Record<VideoTab, Array<{ videoId: string; title: string; description: string }>> = {
  integration: [
    {
      videoId: 'NgwtDPDTM3E',
      title: 'Psychedelic Treatment with Psilocybin Relieves Major Depression',
      description: 'A guided meditation specifically designed for the integration window — the 4–6 weeks after a psychedelic experience when neuroplasticity is elevated and new patterns can take root most easily.',
    },
    {
      videoId: 'dBK1cBNr6Ss',
      title: 'Psilocybin for Treatment-Resistant Depression | NEJM',
      description: 'Somatic practice for psychedelic integration. The body holds what the mind processes — this practice works with physical sensations, emotions, and residual states that arise in the weeks after a session.',
    },
  ],
  research: [
    {
      videoId: 'fcxjwA4C4Cw',
      title: 'The Science of Psychedelics for Mental Health | Dr. Robin Carhart-Harris',
      description: "The lead researcher behind the entropic brain hypothesis explains the neuroscience of psilocybin. Covers DMN suppression, increased neural entropy, and why psychedelics create a state of 'unconstrained cognition.'",
    },
    {
      videoId: 'h8Thc-BDvZ0',
      title: 'How Psychedelics Rewire the Brain',
      description: 'Overview of the Phase 3 MDMA-assisted therapy trials for PTSD. Explains the mechanism by which MDMA reduces amygdala hyperreactivity while creating the psychological safety needed for trauma reprocessing.',
    },
  ],
  microdosing: [
    {
      videoId: '1GpJtUIN39I',
      title: 'Microdosing: Fact or Fiction? - UC Davis Psychedelic Summit',
      description: 'An honest review of the evidence for microdosing. Covers the Polito 2019 positive self-report findings, the Szigeti 2021 placebo-controlled study showing no significant difference, and what this means for practice.',
    },
    {
      videoId: '3IfYiMWeBJ8',
      title: 'Doctor Explains the Science behind Microdosing',
      description: 'An honest review of the evidence for microdosing. Covers the Polito 2019 positive self-report findings, the Szigeti 2021 placebo-controlled study showing no significant difference, and what this means for practice.',
    },
  ],
};

export default function PsychedelicsClient() {
  const [activeVideoTab, setActiveVideoTab] = useState<VideoTab>('integration');

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
          background: 'linear-gradient(160deg, oklch(25% 0.15 300), oklch(40% 0.12 285))',
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
            background: `radial-gradient(circle, ${VIOLET_PALE}30 0%, transparent 70%)`,
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
            The Catalysts
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
            Psychedelics &amp; Neuroplasticity
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
            Psilocybin produces a 71% depression response rate. MDMA achieves 67% PTSD remission.
            The mechanism: these molecules temporarily suppress the brain&rsquo;s ego network and trigger
            a surge of neuroplasticity that makes every other practice on this site more effective.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { href: '#molecules', label: 'Molecules' },
              { href: '#neuroscience', label: 'Neuroscience' },
              { href: '#evidence', label: 'Evidence' },
              { href: '#connections', label: 'Connections' },
              { href: '#safety', label: 'Safety' },
              { href: '#microdosing', label: 'Microdosing' },
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
                  color: VIOLET_MID,
                  textDecoration: 'none',
                  borderBottom: `1px solid rgba(155,125,191,0.5)`,
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
          2. THE MOLECULES
      ══════════════════════════════════════════════════════ */}
      <section
        id="molecules"
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
              The Pharmacological Landscape
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
              The Molecules
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
              Five compounds dominate current research. Each works through distinct receptor mechanisms
              with different durations, risk profiles, and clinical applications. Understanding the
              differences matters for informed decision-making.
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
            {molecules.map(mol => (
              <ScrollReveal key={mol.name}>
                <MoleculeCard
                  name={mol.name}
                  mechanism={mol.mechanism}
                  duration={mol.duration}
                  clinicalStatus={mol.clinicalStatus}
                  evidenceLevel={mol.evidenceLevel}
                  description={mol.description}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Distinction callout */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${VIOLET_MID}`,
                padding: '1.25rem 1.5rem',
                background: VIOLET_PALE,
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
                  color: VIOLET_DEEP,
                  margin: '0 0 0.5rem',
                }}
              >
                Classical vs Non-Classical
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>
                Psilocybin, LSD, and DMT are &ldquo;classical&rdquo; psychedelics &mdash; they work primarily
                through 5-HT2A agonism and produce similar phenomenological experiences. MDMA and ketamine
                are chemically and mechanistically distinct; their therapeutic applications overlap but their
                subjective profiles differ substantially. Grouping all five as simply &ldquo;psychedelics&rdquo; obscures
                meaningful clinical differences.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          4. NEUROSCIENCE — CENTERPIECE
      ══════════════════════════════════════════════════════ */}
      <section
        id="neuroscience"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${VIOLET_PALE})`,
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
              What Happens in the Brain
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
              Neuroscience of Psychedelics
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
              Four converging discoveries explain why these compounds produce lasting change: DMN suppression,
              a neuroplasticity surge, dendritic spine growth, and a fundamental increase in neural entropy.
              Together they describe the most powerful known catalyst for brain change in a single session.
            </p>
          </ScrollReveal>

          {/* Two-column prose */}
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
                Default Mode Network Suppression
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Robin Carhart-Harris and colleagues (2012) published the first fMRI study of psilocybin,
                revealing a surprising finding: instead of activating the brain, the drug suppressed the
                <strong> Default Mode Network (DMN)</strong> &mdash; the midline cortical hub responsible for
                self-referential thought, rumination, and the construction of the ego or &ldquo;narrative self.&rdquo;
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The DMN is overactive in depression, anxiety, PTSD, and addiction &mdash; conditions
                characterized by rigid, looping negative self-narratives. Suppressing it temporarily
                &ldquo;loosens&rdquo; these fixed patterns and creates a window for new perspectives to
                form. The more complete the DMN suppression, the greater the mystical experience intensity
                and the larger the therapeutic outcome.
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
                Psychoplastogens &amp; Neuroplasticity
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Ly et al. (2018) coined the term <strong>psychoplastogens</strong> to describe psychedelics&rsquo;
                ability to rapidly promote structural and functional neural plasticity. A single dose of
                psilocybin triggers a cascade of BDNF, TrkB signaling, and mTOR activation that produces
                changes comparable to weeks of antidepressant treatment &mdash; but within hours.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                This plasticity window &mdash; lasting approximately 4&ndash;6 weeks post-session &mdash;
                is when the brain is most malleable. This is the mechanism behind integration: practices
                performed in this window (meditation, therapy, somatic work) are more likely to produce
                lasting changes because synaptic remodeling is actively underway.
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
                Dendritic Spine Growth
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Shao et al. (2021, <em>Neuron</em>) demonstrated that a single dose of psilocybin in
                mice increased dendritic spine density by 10% within 24 hours, with structural changes
                persisting for at least one month. Dendritic spines are the physical substrates of synaptic
                connections &mdash; more spines means more synaptic capacity.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${VIOLET_MID}`,
                  padding: '1rem 1.25rem',
                  background: VIOLET_PALE,
                  borderRadius: '0 2px 2px 0',
                  marginTop: '1rem',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: VIOLET_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  The stressed animals &mdash; which had lost synaptic density &mdash; showed the greatest
                  recovery. This is a direct structural mechanism for why psychedelics reverse the synaptic
                  loss seen in chronic stress and depression.
                </p>
              </div>
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
                The Entropic Brain Hypothesis
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Carhart-Harris et al. propose that psychedelics increase neural entropy &mdash; the
                variety, unpredictability, and complexity of brain activity. Normal waking consciousness
                operates at a moderate entropy level. Depression and trauma are characterized by
                <em> low entropy</em>: rigid, repetitive patterns. Psychedelics push entropy temporarily high,
                dissolving habitual networks and creating what Carhart-Harris calls &ldquo;relaxed beliefs
                under psychedelics&rdquo; (REBUS).
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                REBUS posits that psychedelics flatten the brain&rsquo;s hierarchical predictive processing,
                allowing bottom-up sensory and emotional signals to carry more weight than top-down
                beliefs. Repressed memories surface. Fixed meanings dissolve. New frameworks become possible.
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
                source="Carhart-Harris et al., PNAS, 2012"
                stat="DMN"
                detail="Suppressed during psychedelic states. The default mode network — responsible for self-referential thought and the ego — shows decreased blood flow and connectivity under psilocybin. The correlation between DMN suppression and therapeutic outcome is robust across studies."
                url="https://pubmed.ncbi.nlm.nih.gov/22308440/"
                accentColor={VIOLET_MID}
                accentTextColor={VIOLET_DEEP}
              />
              <StatCard
                source="Shao et al., Neuron, 2021"
                stat="24 hrs"
                detail="New dendritic spines form within 24 hours of a single psilocybin dose. A 10% increase in spine density was observed in the prefrontal cortex of mice — the region most affected by stress-induced synaptic loss."
                url="https://pubmed.ncbi.nlm.nih.gov/34228959/"
                accentColor={VIOLET_MID}
                accentTextColor={VIOLET_DEEP}
              />
              <StatCard
                source="Shao et al., Neuron, 2021"
                stat="1+ month"
                detail="Structural changes to dendritic spines persist for at least one month after a single session. This extended plasticity window is the mechanism behind the integration period — the brain remains unusually malleable for weeks post-session."
                url="https://pubmed.ncbi.nlm.nih.gov/34228959/"
                accentColor={VIOLET_MID}
                accentTextColor={VIOLET_DEEP}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          6. CLINICAL EVIDENCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="evidence"
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
              The Research Record
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
              Clinical Evidence
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
              The clinical trial record for psychedelic therapy is now extensive enough to draw clear
              conclusions. The effect sizes are large &mdash; often larger than existing treatments &mdash;
              and durable. The landmark studies below represent the strongest evidence.
            </p>
          </ScrollReveal>

          {/* Depression */}
          <ScrollReveal>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
                fontStyle: 'normal',
              }}
            >
              Depression
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
                source="Davis et al., JAMA Psychiatry, 2021"
                stat="71%"
                detail="Response rate for treatment-resistant depression after two doses of psilocybin-assisted therapy. 54% achieved remission. Effects maintained at 12-month follow-up. This is the largest effect size ever recorded for a depression treatment in a controlled trial."
                url="https://pubmed.ncbi.nlm.nih.gov/33263722/"
                accentColor={VIOLET_MID}
                accentTextColor={VIOLET_DEEP}
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Carhart-Harris et al., NEJM, 2021"
                stat="Psilocybin ≥ Escitalopram"
                detail="Head-to-head RCT comparing psilocybin to the leading SSRI (escitalopram) for major depression. Psilocybin showed faster onset, higher remission rates, and superior patient-reported well-being at 6 weeks. First direct comparison to standard-of-care antidepressant."
                url="https://pubmed.ncbi.nlm.nih.gov/33852780/"
                accentColor={VIOLET_MID}
                accentTextColor={VIOLET_DEEP}
              />
            </ScrollReveal>
            <ScrollReveal>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  border: `1px solid ${VIOLET_MID}`,
                  borderRadius: '2px',
                  padding: '1.75rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: VIOLET_DEEP,
                    margin: '0 0 1rem',
                  }}
                >
                  Why it Lasts
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                  SSRIs require daily dosing and stop working when discontinued. Psilocybin therapy produces
                  remission after 2&ndash;3 sessions because it addresses the underlying cognitive rigidity
                  (DMN overactivity) rather than modulating neurotransmitter availability. The experience
                  itself &mdash; including the mystical quality &mdash; is the treatment mechanism, not
                  the drug chemistry alone.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* PTSD */}
          <ScrollReveal>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
                fontStyle: 'normal',
              }}
            >
              PTSD
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
                source="Mitchell et al., Nature Medicine, 2021"
                stat="67%"
                detail="PTSD remission rate with MDMA-assisted therapy in Phase 3 trial. The placebo group achieved 32% remission. Participants had chronic, treatment-resistant PTSD averaging 14 years duration. 3 MDMA sessions plus ongoing therapy produced these results."
                url="https://pubmed.ncbi.nlm.nih.gov/34650228/"
                accentColor={VIOLET_MID}
                accentTextColor={VIOLET_DEEP}
              />
            </ScrollReveal>
            <ScrollReveal>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  padding: '1.75rem',
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
                  The MDMA Mechanism in PTSD
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                  MDMA reduces amygdala hyperreactivity while increasing oxytocin and serotonin. This
                  creates a brief window (3&ndash;5 hours) when traumatic memories can be accessed without
                  triggering the full fear response. Therapists guide patients through trauma reprocessing
                  during this window. The memory reconsolidation that occurs post-session is the lasting
                  change mechanism.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* End-of-life & Addiction */}
          <ScrollReveal>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
                fontStyle: 'normal',
              }}
            >
              End-of-Life Anxiety &amp; Addiction
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
                source="Griffiths et al., J Psychopharmacology, 2016"
                stat="80%"
                detail="Reduction in depression and anxiety in cancer patients facing end-of-life. 80% of participants rated psilocybin-assisted therapy as the most meaningful experience of their lives. Effects persisted at 6-month follow-up."
                url="https://pubmed.ncbi.nlm.nih.gov/27909165/"
                accentColor={VIOLET_MID}
                accentTextColor={VIOLET_DEEP}
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Johnson et al., J Psychopharmacology, 2014"
                stat="80%"
                detail="Smoking cessation at 6-month follow-up in a pilot study of psilocybin-assisted therapy — compared to 35% for the best existing pharmacological treatments. The mystical experience quality correlated with successful abstinence."
                url="https://pubmed.ncbi.nlm.nih.gov/25213996/"
                accentColor={VIOLET_MID}
                accentTextColor={VIOLET_DEEP}
              />
            </ScrollReveal>
            <ScrollReveal>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  border: `1px solid ${VIOLET_MID}`,
                  borderRadius: '2px',
                  padding: '1.75rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: VIOLET_DEEP,
                    margin: '0 0 0.75rem',
                  }}
                >
                  Addiction Mechanism
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                  Addiction is maintained by rigid cognitive loops &mdash; the same DMN-driven self-narrative
                  that psychedelics disrupt. The mystical experience of interconnection and meaning directly
                  counters the nihilism and identity fusion with the addictive behavior. William James
                  noted this mechanism in 1902; modern neuroscience confirms it.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          8. PSYCHEDELICS & SITE PRACTICES
      ══════════════════════════════════════════════════════ */}
      <section
        id="connections"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${VIOLET_PALE})`,
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
              The Amplifier Effect
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
              Psychedelics &amp; Site Practices
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
              Every other practice on this site is amplified during the post-psychedelic neuroplasticity
              window. The elevated BDNF, increased synaptic density, and reduced ego rigidity create
              optimal conditions for practice to produce lasting change.
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
                practice: 'Meditation',
                connection: 'Same DMN Suppression',
                desc: 'Advanced meditators show DMN suppression similar to low-dose psychedelics. The practices converge on the same neurological mechanism. Post-psychedelic states make it easier to access the meditative no-self because the brain has recently practiced that state. Integration meditation accelerates the consolidation of insights.',
                href: '/meditate',
                color: VIOLET_MID,
              },
              {
                practice: 'Nervous System',
                connection: 'Autonomic Reset',
                desc: 'Psychedelic sessions produce a profound autonomic reset — often the deepest parasympathetic state many people have accessed. Nervous system practices in the weeks following help stabilize this new baseline and prevent regression to chronic sympathetic dominance.',
                href: '/nervous-system',
                color: VIOLET_MID,
              },
              {
                practice: 'Trauma',
                connection: 'MDMA & Ventral Vagal Safety',
                desc: "MDMA creates a state of ventral vagal safety — Polyvagal Theory's optimal social engagement state — that makes it possible to approach traumatic material without triggering the freeze or fight-flight response. This is the neurophysiological mechanism of why MDMA-assisted therapy works where talk therapy often fails.",
                href: '/trauma',
                color: VIOLET_MID,
              },
              {
                practice: 'Chakras',
                connection: 'Somatic Energy at Chakra Points',
                desc: 'Many psychedelic experiences include intense somatic sensations localized to areas corresponding to traditional chakra points — particularly heart, solar plexus, and third eye. Working with these sensations somatically during integration can anchor experiential insights in the body.',
                href: '/chakras',
                color: VIOLET_MID,
              },
              {
                practice: 'Sleep',
                connection: 'Improved Post-Session',
                desc: "Sleep architecture often improves in the weeks following a psychedelic session, particularly slow-wave sleep — the same stage gated by the neuroplasticity processes that psychedelics trigger. Better sleep deepens the consolidation of the session's insights and structural brain changes.",
                href: '/sleep',
                color: VIOLET_MID,
              },
              {
                practice: 'Nature',
                connection: 'Amplified Biophilia',
                desc: 'Psychedelics reliably amplify the felt connection to nature — what E.O. Wilson called biophilia. Post-session, time in natural settings deepens integration and often maintains the expanded sense of connection that emerges during the experience itself.',
                href: '/nature',
                color: VIOLET_MID,
              },
            ].map(item => (
              <ScrollReveal key={item.practice}>
                <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      borderTop: `3px solid ${item.color}`,
                      borderRadius: '2px',
                      padding: '1.5rem',
                      height: '100%',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: VIOLET_DEEP,
                        margin: '0 0 0.25rem',
                      }}
                    >
                      {item.practice}
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
                      {item.connection}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </Link>
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
          10. SAFETY, SET & SETTING
      ══════════════════════════════════════════════════════ */}
      <section
        id="safety"
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
              Risk, Context &amp; Preparation
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
              Safety, Set &amp; Setting
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
              Psychedelics have a strong safety profile in clinical and controlled contexts, but significant
              risks in unsupervised settings. The three-part framework &mdash; set (mindset), setting
              (environment), and integration (follow-through) &mdash; determines a large proportion of outcomes.
            </p>
          </ScrollReveal>

          {/* Medical risks */}
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
                risk: 'Serotonin Syndrome',
                severity: 'Serious',
                detail: 'Classical psychedelics (psilocybin, LSD, DMT) combined with serotonergic medications (SSRIs, SNRIs, MAOIs, tramadol, lithium) can trigger serotonin syndrome — potentially fatal. Never combine without medical supervision. SSRIs also blunt the psychedelic effect.',
                borderColor: '#8B3A62',
                bg: 'rgba(139,58,98,0.06)',
              },
              {
                risk: 'Psychosis Risk',
                severity: 'High Risk for Predisposed',
                detail: 'A personal or family history of schizophrenia, bipolar I, or psychotic spectrum disorders is the primary medical contraindication. Psychedelics can precipitate or accelerate psychosis in those with latent vulnerabilities. Screening is non-negotiable in clinical settings.',
                borderColor: '#8B3A62',
                bg: 'rgba(139,58,98,0.06)',
              },
              {
                risk: 'HPPD',
                severity: 'Rare but Real',
                detail: 'Hallucinogen Persisting Perception Disorder — visual disturbances (trails, halos, geometric patterns) that persist after the drug has cleared — affects a small percentage of users. Risk increases with high doses, frequent use, and pre-existing anxiety. No established treatment.',
                borderColor: '#E4AD75',
                bg: 'rgba(228,173,117,0.08)',
              },
              {
                risk: 'Cardiovascular',
                severity: 'Monitor at High Doses',
                detail: 'Classical psychedelics produce modest increases in heart rate and blood pressure, clinically significant only at high doses or with pre-existing cardiac conditions. MDMA has more pronounced cardiovascular effects; significant contraindication for hypertension and cardiac disease.',
                borderColor: '#E4AD75',
                bg: 'rgba(228,173,117,0.08)',
              },
            ].map(item => (
              <ScrollReveal key={item.risk}>
                <div
                  style={{
                    background: item.bg,
                    border: `1px solid ${item.borderColor}`,
                    borderLeft: `3px solid ${item.borderColor}`,
                    borderRadius: '0 2px 2px 0',
                    padding: '1.5rem',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.25rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {item.risk}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: item.borderColor,
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {item.severity}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {item.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Set & Setting */}
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
              Set &amp; Setting Framework
            </h3>
            <p style={{ lineHeight: 1.85, marginBottom: '1rem', maxWidth: '70ch' }}>
              Timothy Leary and Ram Dass formalized &ldquo;set and setting&rdquo; in the 1960s; modern clinical
              research confirms its empirical validity. Set is the psychological state, expectations, and
              intentions a person brings to the experience. Setting is the physical and social environment.
              Both significantly predict the quality and therapeutic value of the session.
            </p>
          </ScrollReveal>

          {/* Integration timeline */}
          <ScrollReveal>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '2rem 0 1.25rem',
                fontStyle: 'normal',
              }}
            >
              Integration Process
            </h3>
          </ScrollReveal>
          <div className="timeline" style={{ paddingLeft: '2.5rem', marginBottom: '3rem' }}>
            {[
              {
                step: '1',
                title: 'Preparation (weeks before)',
                desc: 'Set clear intentions. Reduce alcohol, cannabis, and stimulants. Increase meditation practice to build present-moment stability. Review contraindications with a physician. Choose guide, therapist, or sitter carefully. The quality of preparation directly predicts session quality.',
              },
              {
                step: '2',
                title: 'Session',
                desc: 'Surrender to the experience rather than direct it. Use an eyeshade and music to support inward focus. Trust the intelligence of the process. A trusted guide or therapist provides safety and can facilitate difficult material. The therapeutic dose requires 4–6 hours of uninterrupted time.',
              },
              {
                step: '3',
                title: 'Integration (weeks after)',
                desc: 'The 4–6 week post-session window is when the structural brain changes are most active. Journaling, somatic practice, therapy, meditation, and time in nature help consolidate insights into lasting behavior change. Without integration, the experience remains a memory rather than a transformation.',
              },
            ].map(item => (
              <div key={item.step} style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <div
                  className="timeline-node"
                  style={{ background: VIOLET_DEEP }}
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

          {/* Rose-border safety callout */}
          <ScrollReveal>
            <div
              style={{
                border: `1px solid #8B3A62`,
                borderLeft: `3px solid #8B3A62`,
                padding: '1.5rem 1.75rem',
                background: 'rgba(139,58,98,0.06)',
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
                  color: '#8B3A62',
                  margin: '0 0 0.75rem',
                }}
              >
                Non-Negotiable Safety Conditions
              </p>
              <ul
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.9,
                  paddingLeft: '1.25rem',
                  margin: 0,
                }}
              >
                <li>Screen for personal or family history of psychosis, bipolar I, or schizophrenia spectrum</li>
                <li>Disclose all medications — especially serotonergic drugs, MAOIs, and lithium</li>
                <li>Never proceed alone for a therapeutic-dose session; always have a trusted sitter or guide</li>
                <li>Do not drive for 12+ hours after a full session</li>
                <li>Have an integration therapist or support system in place before the session, not after</li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Legal status */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${VIOLET_MID}`,
                padding: '1.25rem 1.5rem',
                background: VIOLET_PALE,
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
                  color: VIOLET_DEEP,
                  margin: '0 0 0.5rem',
                }}
              >
                Legal Status Overview (as of 2024)
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: '0 0 0.75rem' }}>
                <strong>Ketamine (esketamine/Spravato):</strong> FDA-approved. Available in licensed ketamine clinics across the US.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: '0 0 0.75rem' }}>
                <strong>Psilocybin:</strong> Legal for supervised therapeutic use in Oregon and Colorado. Schedule I federally; Breakthrough Therapy designation for depression. Australia approved for therapeutic use in 2023.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: '0 0 0.75rem' }}>
                <strong>MDMA:</strong> Schedule I federally (US). FDA Advisory Committee voted against approval in 2024 pending further data; trials continue. Legal in several other countries for supervised use.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>
                <strong>LSD / DMT / Ayahuasca:</strong> Schedule I (US). Ayahuasca religious ceremonies protected under Freedom of Religion in Brazil, Peru, and under some US court precedents.
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
          12. MICRODOSING
      ══════════════════════════════════════════════════════ */}
      <section
        id="microdosing"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${VIOLET_PALE})`,
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
              Sub-Perceptual Dosing
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
              Microdosing: Honest Assessment
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
              Microdosing &mdash; taking sub-perceptual doses (typically 1/10th of a full dose) on a
              regular schedule &mdash; has become widely popular based on compelling self-reports. The
              controlled research tells a more complicated story.
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
                The Positive Evidence
              </h3>
              <div
                style={{
                  borderLeft: `3px solid ${VIOLET_MID}`,
                  padding: '1rem 1.25rem',
                  background: VIOLET_PALE,
                  borderRadius: '0 2px 2px 0',
                  marginBottom: '1rem',
                }}
              >
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, color: VIOLET_DEEP, margin: '0 0 0.375rem' }}>
                  Polito &amp; Stevenson, 2019
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.7, margin: 0 }}>
                  98-participant prospective study. Participants self-reported improvements in focus,
                  mood, creativity, and energy. Negative effects included increased neuroticism and
                  physiological discomfort in some participants. No control group.
                </p>
              </div>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                Anecdotal reports from thousands of practitioners describe improved mood, enhanced
                creativity, reduced anxiety, and &ldquo;emotional smoothing.&rdquo; The self-report data is
                consistent across cultures and substances (psilocybin mushrooms and LSD are most common).
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Functional MRI data suggests sub-perceptual doses produce measurable changes in
                default mode network connectivity — though the magnitude is far smaller than macrodoses
                and the clinical significance remains unclear.
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
                The Problem with the Evidence
              </h3>
              <div
                style={{
                  borderLeft: `3px solid #E4AD75`,
                  padding: '1rem 1.25rem',
                  background: 'rgba(228,173,117,0.08)',
                  borderRadius: '0 2px 2px 0',
                  marginBottom: '1rem',
                }}
              >
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, color: '#8B5E2A', margin: '0 0 0.375rem' }}>
                  Szigeti et al., 2021 (Self-Blinding RCT)
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.7, margin: 0 }}>
                  The first placebo-controlled microdosing study. Participants who took placebo reported
                  the same improvements as those who took active substance. No statistically significant
                  difference between groups on primary outcomes. The expectancy effect is large enough
                  to explain all positive self-report data.
                </p>
              </div>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                The challenge is that microdosing is extremely difficult to blind in self-directed studies
                because even sub-perceptual effects are detectable. The Szigeti 2021 self-blinding design
                was clever precisely because participants assigned themselves to conditions &mdash; but even
                this design cannot fully eliminate expectancy effects.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Subsequent controlled trials have produced mixed results. Until larger RCTs with robust
                blinding exist, the evidence for microdosing as a &ldquo;cognitive enhancer&rdquo; or
                antidepressant remains inconclusive.
              </p>
            </ScrollReveal>
          </div>

          {/* Amber-border honest assessment callout */}
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
                Microdosing may work &mdash; but the evidence is not there yet to confirm it works via
                pharmacological mechanism rather than expectancy. The Polito 2019 positive self-reports
                are real data; the Szigeti 2021 no-placebo-difference finding is also real data. Both
                can be true simultaneously.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0, fontSize: '0.9375rem' }}>
                If you are considering microdosing: the risk profile at sub-perceptual doses is low for
                most healthy adults (exceptions: serotonin syndrome risk if on SSRIs, psychosis
                vulnerability). The benefit remains unproven by controlled evidence. The practice may
                represent a structured placebo &mdash; which is not nothing &mdash; but is not the same
                as an evidence-based intervention.
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
          background: VIOLET_DEEP,
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'rgba(155,125,191,0.3)' }} />
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
        <div style={{ flex: 1, height: '1px', background: 'rgba(155,125,191,0.3)' }} />
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
              Guided Integration Practices
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              These practices are designed for the post-session integration window. Use them in the
              4&ndash;6 weeks after a session when neuroplasticity is elevated. Research content for
              deepening understanding.
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
              { key: 'integration' as VideoTab, label: 'Integration Practice' },
              { key: 'research' as VideoTab, label: 'Research & Neuroscience' },
              { key: 'microdosing' as VideoTab, label: 'Microdosing Evidence' },
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
                  border: `1px solid ${activeVideoTab === tab.key ? VIOLET_DEEP : 'var(--color-border)'}`,
                  background:
                    activeVideoTab === tab.key ? VIOLET_DEEP : 'var(--color-surface-raised)',
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
          background: `linear-gradient(160deg, oklch(25% 0.15 300 / 0.12), oklch(93% 0.03 290))`,
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
              Psychedelics Connect to Everything
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              The neuroplasticity window amplifies every practice. Here is where to continue.
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
                label: 'Meditate',
                desc: 'Meditation and psychedelics converge on DMN suppression. Post-session practice consolidates the expanded states.',
              },
              {
                href: '/nervous-system',
                label: 'Nervous System',
                desc: 'Polyvagal theory explains the MDMA mechanism. Nervous system practices stabilize the autonomic reset.',
              },
              {
                href: '/trauma',
                label: 'Trauma',
                desc: 'MDMA creates the ventral vagal safety window for trauma reprocessing. The most evidence-based trauma treatment in trials.',
              },
              {
                href: '/chakras',
                label: 'Chakras',
                desc: 'Somatic energy at chakra points is intensified during psychedelic states and available for integration work after.',
              },
              {
                href: '/sleep',
                label: 'Sleep',
                desc: 'Slow-wave sleep architecture improves post-session. Sleep consolidates the neuroplastic changes triggered by the experience.',
              },
              {
                href: '/nature',
                label: 'Nature',
                desc: 'Biophilia is amplified. Time outdoors during integration deepens the felt sense of connection to living systems.',
              },
              {
                href: '/breathe',
                label: 'Breathwork',
                desc: 'Holotropic breathwork produces states overlapping with psychedelic phenomenology via CO2 and O2 modulation.',
              },
              {
                href: '/somatics',
                label: 'Somatics',
                desc: 'Somatic practices discharge physical material that surfaces during psychedelic experiences and integration.',
              },
              {
                href: '/taichi',
                label: 'Tai Chi',
                desc: 'Tai chi during integration anchors expanded states into the body through slow, deliberate movement and interoceptive awareness.',
              },
              {
                href: '/fasting',
                label: 'Fasting',
                desc: 'Fasting before a session is a traditional preparation protocol that increases sensitivity, reduces body burden, and deepens the experience.',
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
                        color: VIOLET_DEEP,
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

          {/* Educational disclaimer */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${VIOLET_MID}`,
                paddingLeft: '1.5rem',
                margin: 0,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-text)',
                  lineHeight: 1.7,
                  margin: '0 0 0.75rem',
                  maxWidth: '60ch',
                }}
              >
                This page is for educational purposes. Psychedelic therapy should only occur in legal,
                supervised clinical settings with qualified practitioners.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  margin: 0,
                }}
              >
                Inner Practice &mdash; Psychedelics &amp; Neuroplasticity
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
