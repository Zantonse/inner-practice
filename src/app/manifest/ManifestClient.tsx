'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';

// ─── Accent tokens ─────────────────────────────────────────────────────────
const GOLD_DEEP  = '#7A5A1E';
const GOLD_MID   = '#D4A74A';
const GOLD_LIGHT = '#F0D68A';

// ─── Interfaces ────────────────────────────────────────────────────────────
interface ManifestPoint { id: string; title: string; body: string; }
interface ManifestStat { source: string; stat: string; detail: string; url?: string; }
interface ManifestVideo { id: string; title: string; description: string; }
interface ManifestSectionData {
  id: string; heading: string; intro: string;
  points: ManifestPoint[]; stats?: ManifestStat[]; videos?: ManifestVideo[];
}
interface ProtocolStep {
  stage: number; name: string; description: string; why: string;
  links: { label: string; href: string; accentColor: string }[];
}

// ─── Section 1: The Science of Intention ───────────────────────────────────
const scienceSection: ManifestSectionData = {
  id: 'science',
  heading: 'The Science of Intention',
  intro: "Modern psychology and neuroscience have validated what contemplative traditions have practiced for millennia — that vivid, structured intention-setting changes the brain and measurably improves outcomes. But not in the way most people think.",
  points: [
    {
      id: 'neural-overlap',
      title: 'Neural Overlap',
      body: "The brain uses largely the same neural machinery for imagining as for perceiving. A 2020 study in Current Biology (Naselaris et al.) found that areas from the visual cortex through higher-order association cortices showed similar activation patterns for both seeing and imagining. A complementary study (Dijkstra et al., 2017) showed that the vividness of mental imagery correlates with the degree of neural overlap — meaning visualization training literally increases how 'real' the brain treats imagination. Research from the American Physiological Society found mental practice of weight lifting produced approximately 13% strength gains without physical movement.",
    },
    {
      id: 'visualization-paradox',
      title: 'The Visualization Paradox',
      body: "Gabriele Oettingen's 30-year research program at NYU revealed a counterintuitive finding: purely positive visualization of desired futures actually reduces motivation. When people indulge in positive fantasies, systolic blood pressure decreases and subjective energy drops — the brain registers the imagined state as partially achieved. In one study, obese women with more positive fantasies lost significantly less weight. College students who fantasized positively sent fewer job applications. The fix is Mental Contrasting — alternating between positive outcome imagery and realistic obstacle imagery — which creates the felt discrepancy that generates motivation.",
    },
    {
      id: 'implementation-intentions',
      title: 'Implementation Intentions',
      body: "Peter Gollwitzer's 'If-Then' planning mechanism transforms vague aspirations into deployable action. A 2006 meta-analysis across 94 independent tests found a medium-to-large effect size of d = 0.65 for implementation intentions on goal achievement. The 'If situation Y, then I will do Z' structure delegates behavior initiation to an anticipated cue, creating automatic stimulus-response links. When combined with Oettingen's WOOP (Wish, Outcome, Obstacle, Plan) into MCII, the effect outperforms either technique alone.",
    },
    {
      id: 'process-over-outcome',
      title: 'Process Over Outcome',
      body: "Sports psychology research consistently shows that imagining doing the work outperforms imagining having the result. Process visualization engages the motor cortex, builds self-efficacy through rehearsal, and prepares automatic responses for obstacles. Outcome visualization alone triggers the same motivational slackening Oettingen documented — a felt sense that the goal is already achieved, reducing drive.",
    },
  ],
  stats: [
    {
      source: 'Gollwitzer & Sheeran 2006',
      stat: 'd = 0.65 effect size across 94 tests',
      detail: "Implementation intentions ('if-then' planning) produce a medium-to-large effect on goal achievement across health, academic, and interpersonal domains.",
      url: 'https://pubmed.ncbi.nlm.nih.gov/16594837/',
    },
    {
      source: 'Oettingen & Wadden 1991',
      stat: 'Positive fantasizers lost less weight',
      detail: 'Obese women who had more positive fantasies about weight loss lost significantly less weight over one year than those with realistic expectations.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/1757670/',
    },
    {
      source: 'American Physiological Society',
      stat: '~13% strength gains from mental practice alone',
      detail: 'Mental rehearsal of weight lifting produced measurable strength gains without any physical movement — the motor cortex activates nearly identically for imagined and performed movement.',
      url: 'https://journals.physiology.org/doi/full/10.1152/jn.00386.2003',
    },
  ],
  videos: [
    {
      id: '7mobxikaYgU',
      title: 'Rethinking Positive Thinking — Gabriele Oettingen',
      description: 'Gabriele Oettingen explains Mental Contrasting and WOOP — the science of why pure positive visualization backfires and what works instead.',
    },
  ],
};

// ─── Section 2: The Practice Lineage ───────────────────────────────────────
const lineageSection: ManifestSectionData = {
  id: 'lineage',
  heading: 'The Practice Lineage',
  intro: "The science is modern, but the practices are ancient. Vedic, Buddhist, and Western contemplative traditions have refined intention-setting technologies for thousands of years. Neuroscience is now explaining why they work.",
  points: [
    {
      id: 'sankalpa',
      title: 'Sankalpa',
      body: "In yogic tradition, Sankalpa combines san (connection to highest truth) and kalpa (vow). It is not a wish but a soul-aligned commitment stated as present-tense reality. The Bhagavad Gita explicitly warns against passive wishing: intention without action is incomplete. Sankalpa is always paired with karma (aligned action) and kriya (practice). This is meaningfully different from passive 'ask and receive' — the Vedic formula Yad Bhāvam Tad Bhavati ('as you believe, so shall it be') demands both inner conviction and outer effort.",
    },
    {
      id: 'yoga-nidra',
      title: 'Yoga Nidra as Manifestation Technology',
      body: "Yoga Nidra induces the hypnagogic state — the liminal zone between waking and sleep. A 2022 EEG study at AIIMS (Datta et al.) found that during Yoga Nidra, delta power increased centrally while prefrontal delta decreased by 2.713 dB. The prefrontal cortex is the seat of the inner critic. When its activity reduces during Yoga Nidra, intentions planted at that moment have reduced evaluative filtering. Sankalpa is planted twice — at the beginning (alpha/early theta) and at Stage 7, the deepest penetration point — making it the highest-penetrance moment for intention encoding.",
    },
    {
      id: 'heart-brain-coherence',
      title: 'Heart-Brain Coherence',
      body: "HeartMath Institute's 30 years of research show that sustained positive emotion — gratitude, appreciation, care — produces a smooth, high-amplitude sine-wave HRV pattern called coherence. In this state, afferent signals from heart to brain shift function: increased cognitive clarity, self-regulatory capacity, and emotional stability. A 2025 RCT found coherence training increased hippocampal brain volume after 4-5 weeks. The traditional instruction to 'feel as if your intention is already real' has a legitimate physiological mechanism through cardiac coherence.",
    },
    {
      id: 'neville-sats',
      title: "Neville Goddard's SATS",
      body: "Neville Goddard (1905-1972) described his 'State Akin To Sleep' technique targeting the same hypnagogic window Yoga Nidra uses: as you drift toward sleep, vividly imagine your desired reality as already accomplished. From a neuroscience standpoint, SATS inserts imagery during reduced prefrontal gating. This is essentially Western Yoga Nidra — the same mechanism described by the Datta 2022 EEG data, arrived at independently through contemplative practice.",
    },
  ],
  stats: [
    {
      source: 'Datta et al. 2022 (AIIMS)',
      stat: 'Prefrontal delta decreased 2.713 dB during Yoga Nidra',
      detail: 'The prefrontal cortex — seat of critical evaluation — showed reduced activity during Yoga Nidra, creating a window for intention-planting with less evaluative resistance.',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9315270/',
    },
    {
      source: 'Elbers & McCraty 2025 (USC RCT)',
      stat: 'Coherence training increased hippocampal volume',
      detail: 'After 4-5 weeks of high-amplitude coherent HRV training, participants showed increased hippocampal brain volume and enhanced cognition-related neuroimaging signals.',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12722655/',
    },
    {
      source: 'Kozhevnikov et al. 2009 (Max Planck)',
      stat: 'Deity visualization enhanced visuospatial processing',
      detail: "Buddhist monks practicing deity meditation showed dramatically improved visualization accuracy — the brain's capacity to hold and manipulate complex internal representations.",
      url: 'https://pubmed.ncbi.nlm.nih.gov/19645384/',
    },
  ],
  videos: [
    {
      id: 'DsGn0QUuRYY',
      title: '20-Minute Yoga Nidra with Sankalpa',
      description: 'A guided Yoga Nidra practice with intention-setting — plant your sankalpa at the beginning and deepest point of practice.',
    },
  ],
};

// ─── Section 4: Honest Boundaries ──────────────────────────────────────────
const boundariesSection: ManifestSectionData = {
  id: 'boundaries',
  heading: 'Honest Boundaries',
  intro: "A practice built on evidence must name its boundaries honestly.",
  points: [
    {
      id: 'not-quantum',
      title: 'Not quantum mechanics',
      body: "Quantum observer effects operate at the subatomic scale. They do not mean 'thoughts create physical reality.' The observer effect in quantum mechanics describes the interaction of measurement apparatus with quantum systems — it has nothing to do with human consciousness choosing outcomes. Invoking quantum physics to explain manifestation is a category error that misrepresents both fields.",
    },
    {
      id: 'not-loa',
      title: 'Not the Law of Attraction',
      body: "'Like attracts like' has no empirical support as a universal law. Oettingen's research proved the opposite: positive fantasy alone reduces goal achievement. What the evidence does support is specific intention combined with obstacle awareness and aligned action. The mechanisms are cognitive (implementation intentions), neurological (neuroplasticity through visualization), and physiological (autonomic regulation) — not metaphysical.",
    },
    {
      id: 'survivor-bias',
      title: 'Survivor bias is real',
      body: "Every manifestation success story has thousands of identical attempts that failed. Correlation between visualization and outcome does not establish causation. The evidence supports manifestation practices improving the probability of goal achievement through better self-regulation, clearer planning, and enhanced cognitive function — not guaranteeing outcomes regardless of circumstances.",
    },
    {
      id: 'trauma-caveat',
      title: 'Trauma-informed caveat',
      body: "'You can't manifest from a dysregulated nervous system' is not victim-blaming — it is neurophysiology. For people carrying unresolved trauma, the body may continuously scan for threat, suppressing the prefrontal cortex's capacity for creative envisioning. Somatic work, therapy, and nervous system regulation may need to come before intention-setting practices. Regulation is the foundation, not a character flaw to overcome.",
    },
  ],
};

// ─── Protocol Steps Data ────────────────────────────────────────────────────
const protocolSteps: ProtocolStep[] = [
  {
    stage: 1,
    name: 'Regulate',
    description: 'Establish nervous system safety.',
    why: "You can't manifest from a dysregulated nervous system. Sympathetic (fight/flight) and dorsal vagal (freeze) states suppress the prefrontal cortex — the seat of planning, envisioning, and creative thought. The prerequisite for intentional creation is not motivation. It is physiological safety.",
    links: [
      { label: 'Breathwork', href: '/breathe', accentColor: '#2E7070' },
      { label: 'Nervous System', href: '/nervous-system', accentColor: '#8B3A62' },
    ],
  },
  {
    stage: 2,
    name: 'Resource',
    description: 'Build reliable ventral vagal access.',
    why: 'The ventral vagal state — calm alertness, social connection, cognitive flexibility — is the only autonomic state from which deliberate, value-aligned action can originate. HeartMath coherence practice, yoga, and vagal toning exercises build the capacity to return to this state reliably.',
    links: [
      { label: 'Nervous System', href: '/nervous-system', accentColor: '#8B3A62' },
      { label: 'Yoga', href: '/yoga', accentColor: '#592E6B' },
    ],
  },
  {
    stage: 3,
    name: 'Intend',
    description: 'Plant intention from a regulated state.',
    why: "From ventral vagal baseline: plant Sankalpa during Yoga Nidra's hypnagogic window (reduced prefrontal gating), or use WOOP to form implementation intentions that deploy automatically. The key insight is that intention-setting must happen while regulated — otherwise you're programming urgency, not clarity.",
    links: [
      { label: 'Meditate', href: '/meditate', accentColor: '#592E6B' },
      { label: 'Yoga (Nidra)', href: '/yoga', accentColor: '#592E6B' },
    ],
  },
  {
    stage: 4,
    name: 'Act',
    description: 'Aligned action from clarity, not urgency.',
    why: "Implementation intentions fire automatically when the situational trigger appears. Process visualization has already built the motor pathways. Action from a regulated state looks different from hustle — it's precise, sustainable, and responsive rather than reactive.",
    links: [
      { label: 'Practice Timer', href: '/practice', accentColor: '#592E6B' },
    ],
  },
  {
    stage: 5,
    name: 'Receive',
    description: 'Tolerate expansion without contraction.',
    why: "The least-discussed obstacle: many people self-sabotage at the point of receiving because the nervous system flags expansion, visibility, or success as dangerous. If the body was conditioned to associate these states with historical threat, the ANS contracts. Somatic work and fascia release help the body learn to tolerate new states without shutting down.",
    links: [
      { label: 'Fascia Release', href: '/fascia', accentColor: '#C07A35' },
      { label: 'Nervous System', href: '/nervous-system', accentColor: '#8B3A62' },
    ],
  },
];

// ─── StatCard ───────────────────────────────────────────────────────────────
function StatCard({ source, stat, detail, url }: ManifestStat) {
  return (
    <div style={{
      borderLeft: `3px solid ${GOLD_DEEP}`,
      padding: '1.5rem 1.75rem',
      background: 'var(--color-surface-raised)',
      borderRadius: '2px',
    }}>
      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '0.6875rem',
        fontWeight: 500,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: GOLD_DEEP,
        margin: '0 0 0.75rem',
      }}>{url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}>{source}</a> : source}</p>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
        fontWeight: 600,
        color: 'var(--color-text)',
        margin: '0 0 0.5rem',
        lineHeight: 1.3,
      }}>{stat}</p>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.875rem',
        color: 'var(--color-text-muted)',
        margin: 0,
        lineHeight: 1.6,
      }}>{detail}</p>
    </div>
  );
}

// ─── ManifestSection ────────────────────────────────────────────────────────
function ManifestSection({ section }: { section: ManifestSectionData }) {
  return (
    <section style={{
      padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw)',
    }}>
      <ScrollReveal>
        <div style={{ maxWidth: '1100px' }}>
          {/* Heading */}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 600,
            color: GOLD_DEEP,
            margin: '0 0 1.5rem',
            lineHeight: 1.2,
          }}>{section.heading}</h2>

          {/* Intro */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.75,
            maxWidth: '780px',
            margin: '0 auto 3rem',
          }}>{section.intro}</p>

          {/* Points */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.25rem',
            maxWidth: '780px',
            marginBottom: section.stats || section.videos ? '3.5rem' : 0,
          }}>
            {section.points.map((point) => (
              <div key={point.id}>
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: GOLD_DEEP,
                  margin: '0 0 0.5rem',
                }}>{point.title}</p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.75,
                  margin: 0,
                }}>{point.body}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          {section.stats && section.stats.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              maxWidth: '1100px',
              marginBottom: section.videos ? '3rem' : 0,
            }}>
              {section.stats.map((s, i) => (
                <StatCard key={i} source={s.source} stat={s.stat} detail={s.detail} />
              ))}
            </div>
          )}

          {/* Videos */}
          {section.videos && section.videos.length > 0 && (
            <div style={{ maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {section.videos.map((v) => (
                <div key={v.id}>
                  <VideoFacade videoId={v.id} title={v.title} />
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    margin: '0.875rem 0 0',
                    lineHeight: 1.6,
                  }}>{v.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}

// ─── ProtocolStepCard ───────────────────────────────────────────────────────
function ProtocolStepCard({ step, isLast }: { step: ProtocolStep; isLast: boolean }) {
  return (
    <div style={{ position: 'relative', display: 'flex', gap: '2rem', paddingBottom: isLast ? 0 : '3rem' }}>
      {/* Stage number circle + connecting line */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '9999px',
          background: `linear-gradient(135deg, ${GOLD_MID}, ${GOLD_DEEP})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.8125rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          flexShrink: 0,
        }}>
          {step.stage}
        </div>
        {/* Connecting line to next step */}
        {!isLast && (
          <div style={{
            position: 'absolute',
            left: '1.25rem',
            top: '100%',
            width: '1px',
            height: '3rem',
            background: `color-mix(in srgb, ${GOLD_MID} 40%, var(--color-border))`,
          }} />
        )}
      </div>

      {/* Step content */}
      <div style={{ flex: 1, paddingTop: '0.25rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: '0 0 0.25rem',
          lineHeight: 1.25,
        }}>{step.name}</h3>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.8125rem',
          fontWeight: 500,
          color: GOLD_MID,
          margin: '0 0 1rem',
          letterSpacing: '0.03em',
        }}>{step.description}</p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.75,
          margin: '0 0 1.25rem',
          maxWidth: '640px',
        }}>{step.why}</p>

        {/* Link pills */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {step.links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: 'var(--color-text)',
                textDecoration: 'none',
                padding: '0.4rem 0.875rem',
                border: '1px solid var(--color-border)',
                borderRadius: '9999px',
                background: 'var(--color-surface-raised)',
              }}
            >
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '9999px',
                background: link.accentColor,
                flexShrink: 0,
              }} />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ────────────────────────────────────────────────────────────
export default function ManifestClient() {
  return (
    <>
      {/* Hero */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(3rem, 6vw, 5rem)',
        background: `linear-gradient(160deg, oklch(65% 0.12 75 / 0.35), oklch(93% 0.04 60))`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative radial orb */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          right: '-6vw',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(220px, 38vw, 440px)',
          height: 'clamp(220px, 38vw, 440px)',
          borderRadius: '9999px',
          background: `radial-gradient(circle, ${GOLD_MID}30 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1100px', position: 'relative' }}>
          {/* Eyebrow */}
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: GOLD_DEEP,
            margin: '0 0 1.25rem',
          }}>The path of intention</p>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: '0 0 1.25rem',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>Manifest</h1>

          {/* Italic subtitle */}
          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.625rem)',
            color: GOLD_MID,
            margin: '0 0 1.5rem',
            lineHeight: 1.4,
          }}>What the science of intention, the wisdom of ancient practice, and your nervous system have in common.</p>
        </div>
      </section>

      <SectionDivider />

      {/* Section 1: The Science of Intention */}
      <ManifestSection section={scienceSection} />

      <SectionDivider flip />

      {/* Section 2: The Practice Lineage */}
      <ManifestSection section={lineageSection} />

      <SectionDivider />

      {/* Section 3: Protocol (bespoke) */}
      <section style={{
        padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw)',
        background: `color-mix(in srgb, ${GOLD_LIGHT} 6%, var(--color-surface))`,
      }}>
        <ScrollReveal>
          <div style={{ maxWidth: '1100px' }}>
            {/* Section heading */}
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: GOLD_DEEP,
              margin: '0 0 0.75rem',
            }}>The Practice</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 600,
              color: GOLD_DEEP,
              margin: '0 0 1rem',
              lineHeight: 1.2,
            }}>The Inner Practice Protocol</h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.75,
              maxWidth: '640px',
              margin: '0 0 3.5rem',
            }}>
              Five sequential stages, each with a specific neurophysiological rationale. Skipping stages produces the instability that makes most manifestation attempts fail.
            </p>

            {/* Protocol steps */}
            <div style={{ maxWidth: '720px' }}>
              {protocolSteps.map((step, i) => (
                <ProtocolStepCard
                  key={step.stage}
                  step={step}
                  isLast={i === protocolSteps.length - 1}
                />
              ))}
            </div>

            {/* Closing insight */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              fontStyle: 'italic',
              color: GOLD_DEEP,
              lineHeight: 1.75,
              maxWidth: '640px',
              margin: '3rem 0 0',
            }}>
              Inner Practice was designed as a manifestation protocol all along.
              Breathwork regulates. Yoga resources. Meditation directs attention.
              Fascia releases stored tension. The nervous system is the substrate.
              This page is the map that shows how they connect.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <SectionDivider flip />

      {/* Section 4: Honest Boundaries */}
      <ManifestSection section={boundariesSection} />

      {/* Cross-links */}
      <section style={{
        padding: 'clamp(3rem, 5vw, 4rem) max(1.5rem, 8vw)',
        background: `color-mix(in srgb, ${GOLD_MID} 10%, var(--color-cream))`,
        borderTop: '1px solid var(--color-border)',
      }}>
        <ScrollReveal>
          <div style={{ maxWidth: '780px' }}>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: GOLD_DEEP,
              margin: '0 0 1rem',
            }}>
              Deepen your practice
            </p>
            <p style={{
              margin: '0 0 2rem',
              fontSize: '0.9375rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
            }}>
              Manifestation is not a standalone practice — it emerges from the convergence of all your practices working together.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/meditate" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Meditate &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/yoga" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Yoga &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/fascia" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Fascia &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/breathe" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Breathe &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/nervous-system" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Nervous System &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/practice" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Practice &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/reiki" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Reiki &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/sound-healing" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Sound Healing &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/somatics" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Somatics &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/sleep" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Sleep &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/qigong" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Qigong &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/chakras" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Chakras &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/trauma" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Trauma &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/nutrition" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Nutrition &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/temperature" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Temperature &rarr;</Link>
              <span style={{ color: 'var(--color-border)' }}>&middot;</span>
              <Link href="/nature" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Nature &rarr;</Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
