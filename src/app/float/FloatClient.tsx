'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import StatCard from '@/components/StatCard';
import StickyNav from '@/components/StickyNav';
import PageHero from '@/components/PageHero';
import SectionIntro from '@/components/SectionIntro';
import InfoCard from '@/components/InfoCard';

// ── History Timeline Data ──────────────────────────────────────
const historyTimeline = [
  { year: '1954', event: 'First isolation tank built at NIMH by John C. Lilly — upright, fully submerged, breathing through mask.' },
  { year: '1968', event: 'Lilly publishes "Programming and Metaprogramming in the Human Biocomputer," fusing tank research with consciousness theory.' },
  { year: '1972', event: 'Glenn and Lee Perry found Samadhi Tank Co., commercializing the first horizontal float tank design.' },
  { year: '1979', event: 'First commercial float center opens in Beverly Hills, California.' },
  { year: '1980', event: 'Suedfeld coins the term "REST" (Restricted Environmental Stimulation Therapy). Altered States film released, accelerating public interest.' },
  { year: '1982', event: 'IRIS (International REST Investigators Society) founded, establishing academic infrastructure.' },
  { year: 'Late 1980s', event: 'AIDS epidemic fears collapse the commercial float industry. Most centers close as cross-contamination concerns spread.' },
  { year: '1990s–2000s', event: 'European research survives the collapse. Kjellgren and colleagues at Karlstad University, Sweden continue systematic study.' },
  { year: '~2013', event: 'Justin Feinstein establishes the Float Clinic and Research Center at Laureate Institute for Brain Research (LIBR), Oklahoma.' },
  { year: '2014', event: 'Joe Rogan JRE episode #517 with Float Lab founders reaches millions, triggering a commercial float renaissance.' },
  { year: '2018', event: 'Feinstein landmark anxiety study published (n=50, d > 2.0) — the largest and most rigorous clinical study to that point.' },
  { year: '2021', event: 'First fMRI study of floating conducted — Terhune et al. find DMN decoupling, a mechanism distinct from meditation.' },
  { year: '2024', event: 'Garland feasibility RCT published (n=75, zero serious adverse events), establishing trial infrastructure for larger efficacy studies.' },
  { year: '2025', event: 'Lashgari systematic review published (63 studies, 1,838 participants) — first PRISMA-compliant comprehensive review of flotation-REST.' },
];

// ── Sensory Channels Data ──────────────────────────────────────
const sensoryChannels = [
  { channel: 'Visual', eliminated: 'Total darkness — lightproof pod or room eliminates all photons' },
  { channel: 'Auditory', eliminated: 'Near-silence — sound-dampened pod; ear plugs for additional attenuation' },
  { channel: 'Tactile (thermal)', eliminated: '34°C water matches skin temperature exactly, removing the thermal gradient' },
  { channel: 'Vestibular', eliminated: '1.25+ specific gravity — Epsom salt buoyancy eliminates gravitational loading' },
  { channel: 'Proprioceptive', eliminated: 'Zero muscle effort required — no joint loading, no postural work' },
  { channel: 'Olfactory', eliminated: 'Enclosed neutral air space reduces olfactory input to near baseline' },
];

// ── Evidence Table Data ────────────────────────────────────────
const evidenceRows = [
  { condition: 'Anxiety / Stress', rating: 'Moderate', ratingType: 'moderate', source: 'Feinstein 2018 (n=50, d > 2.0)', notes: 'No blinded efficacy RCT completed yet' },
  { condition: 'Chronic Pain (acute)', rating: 'Moderate', ratingType: 'moderate', source: 'Bood 2001\u20132009 series', notes: 'Loose 2021 null at follow-up; acute relief real' },
  { condition: 'Athletic Recovery', rating: 'Emerging', ratingType: 'emerging', source: 'Driller 2016; Clark 2022', notes: 'Small samples, elite athletes only' },
  { condition: 'Creativity', rating: 'Emerging', ratingType: 'emerging', source: 'Suedfeld 1987; Norlander 1998', notes: 'All n < 40; no replication since 2011' },
  { condition: 'Blood Pressure', rating: 'Emerging', ratingType: 'emerging', source: 'Turner 1983\u20131991; Flux 2022', notes: 'Cortisol signal inconsistent across studies' },
  { condition: 'Depression', rating: 'Emerging', ratingType: 'emerging', source: 'Feinstein 2018 (secondary)', notes: 'Never primary RCT outcome' },
  { condition: 'Sleep', rating: 'Insufficient', ratingType: 'insufficient', source: 'Norell-Clarke 2022', notes: 'Only 2 studies in the literature' },
  { condition: 'PTSD', rating: 'Insufficient', ratingType: 'insufficient', source: 'Kjellgren 2013 (case series)', notes: 'No completed RCT' },
  { condition: 'Athletic Performance', rating: 'Null', ratingType: 'null', source: '1990s studies', notes: 'Only works when combined with guided imagery' },
];

// ── Integration Table Data ─────────────────────────────────────
const integrationRows = [
  { practice: 'Meditation', synergy: 'Floating induces theta within 40 min; meditators report faster access to depth state than years of solo practice', evidence: 'Evidence-Based' },
  { practice: 'Breathwork', synergy: 'Slow coherent breathing (5.5 bpm) pre-float deepens parasympathetic onset; box breathing cancels residual mental chatter', evidence: 'Mechanistically Grounded' },
  { practice: 'Nervous System (polyvagal)', synergy: 'A uniquely effective ventral vagal safety environment — zero threat cues, thermal neutrality, gravity removed', evidence: 'Mechanistically Grounded' },
  { practice: 'Massage', synergy: 'Float-then-massage strips protective holding patterns for deeper tissue access; massage-then-float extends integration window', evidence: 'Mechanistically Grounded' },
  { practice: 'Fascia', synergy: 'One of the most effective environments for axial spinal decompression \u2014 near-zero gravity allows the spine to decompress naturally; thixotropic conditions optimized for 60\u201390 min', evidence: 'Mechanistically Grounded' },
  { practice: 'Yoga / Somatic', synergy: "Post-float body awareness heightens proprioceptive feedback; floating mirrors yoga nidra's body dissolution state", evidence: 'Experiential/Theoretical' },
  { practice: 'Psychedelics', synergy: 'Lilly combined LSD and ketamine with tanks from the 1960s; both suppress DMN through different routes; post-session floating used for integration', evidence: 'Mechanistically Grounded' },
  { practice: 'Temperature (sauna/cold)', synergy: 'Sauna \u2192 float \u2192 cold plunge: three-modality contrast stack; post-sauna vasodilation meets complete parasympathetic signaling', evidence: 'Mechanistically Grounded' },
  { practice: 'Sound Healing', synergy: 'Theta brain state heightens sensitivity to sound; binaural beats or singing bowls introduced during final phase amplify theta entrainment', evidence: 'Experiential/Theoretical' },
  { practice: 'Sleep', synergy: 'Post-float melatonin rise documented; float at 4\u20136 pm followed by early sleep produces enhanced slow-wave sleep architecture', evidence: 'Emerging' },
  { practice: 'Qigong / Tai Chi', synergy: 'Floating produces interoceptive clarity that makes subtle qi/energy sensations more accessible to practitioners', evidence: 'Experiential/Theoretical' },
  { practice: 'Trauma / Somatics', synergy: 'Floating with lid open provides graduated exposure to stillness; SE practitioners use float for somatic completion work', evidence: 'Experiential/Theoretical' },
  { practice: 'Reiki', synergy: 'Zero-gravity state removes proprioceptive interference; practitioners report clearer subtle body perception in the tank', evidence: 'Experiential/Theoretical' },
  { practice: 'Nutrition / Fasting', synergy: 'Fasted 12\u201316 hrs before floating deepens ketotic theta state; light alkaline meal 90 min before avoids digestive interference', evidence: 'Experiential/Theoretical' },
  { practice: 'Nature', synergy: 'The tank simulates sensory reduction achieved in deep wilderness isolation \u2014 both produce similar default mode quieting', evidence: 'Mechanistically Grounded' },
];

// ── Cross-Link Cards Data ──────────────────────────────────────
const crossLinks = [
  {
    href: '/meditate',
    label: 'Meditation',
    desc: 'Theta in 40 minutes vs. years of practice. The meta-analysis found flotation outperformed meditation for stress reduction. Regular floating gives meditators a neurological reference point to return toward.',
  },
  {
    href: '/nervous-system',
    label: 'Nervous System',
    desc: 'The most complete ventral vagal safety environment that can be artificially created. Zero threat cues, thermal neutrality, gravity removed. Significant HRV increase measured throughout 90-minute sessions.',
  },
  {
    href: '/massage',
    label: 'Massage',
    desc: 'Float-then-massage strips away protective holding patterns for deeper tissue access. Massage-then-float provides an extended integration window at zero gravity. Dual-modality centers recommend massage-first for structural work.',
  },
  {
    href: '/fascia',
    label: 'Fascia',
    desc: 'One of the most effective environments for axial spinal decompression \u2014 near-zero gravity provides conditions difficult to replicate outside specialized equipment. Thixotropic conditions optimized: sustained heat + hydration + zero compressive load for 60\u201390 minutes.',
  },
  {
    href: '/psychedelics',
    label: 'Psychedelics',
    desc: 'Lilly combined LSD and ketamine with tanks from the 1960s. Both floating and psychedelics suppress the DMN through different routes. Post-session floating during the neuroplasticity window is used for integration.',
  },
  {
    href: '/temperature',
    label: 'Temperature',
    desc: 'Sauna \u2192 float \u2192 cold plunge: the three-modality contrast stack. Post-sauna vasodilation meets complete parasympathetic signaling. Cold plunge \u2192 float produces dramatic autonomic contrast.',
  },
];

// ── Protocol Cards Data ────────────────────────────────────────
const protocols = [
  {
    label: 'Morning Stack',
    steps: [
      'Coherent breathwork at 5.5 bpm \u2014 10 minutes',
      'Float session \u2014 60 to 90 minutes',
      'Silent meditation immediately after \u2014 15 minutes',
      'No screens for 30 minutes post-float',
    ],
  },
  {
    label: 'Recovery Stack',
    steps: [
      'Sauna \u2014 15 minutes at high heat',
      'Float \u2014 90 minutes (maximizes post-sauna vasodilation)',
      'Cold plunge \u2014 2 to 3 minutes',
      'Hydrate; light protein within 60 minutes',
    ],
  },
  {
    label: 'Trauma-Sensitive',
    steps: [
      'Grounding exercise: feet on floor, 5 minutes',
      'First session with pod lid open \u2014 full control',
      'Gradual lid closure across 3+ sessions at own pace',
      'Post-float somatic experiencing or gentle movement',
    ],
  },
  {
    label: 'Creative Stack',
    steps: [
      'Fast 12 to 16 hours beforehand',
      'Float 90 minutes \u2014 capture hypnagogic content',
      'Immediate creative work within 30 minutes post-float',
      'Avoid filtering output \u2014 pure expression only',
    ],
  },
];

// ── DIY Options Data ───────────────────────────────────────────
const diyOptions = [
  {
    title: 'Bathtub Conversion',
    cost: '$100\u2013200',
    desc: 'Proof of concept: 100\u2013150 lbs Epsom salt in standard tub. Temperatures are hard to maintain, buoyancy is limited, and darkness is incomplete. Useful for sampling the concept, not replicating it.',
    suitable: 'Concept testing',
  },
  {
    title: 'Plywood Frame Basin',
    cost: '$1,200\u20131,800',
    desc: "Recommended DIY route. 4\u00d78\u2019 marine-grade plywood basin with fiberglass or liner, submersible pump, 10\u03bcm filter, and UV-C sanitizer. Requires carpentry skill and space.",
    suitable: 'Serious DIY',
  },
  {
    title: 'Stock Tank Conversion',
    cost: '$700\u20131,400',
    desc: 'Agricultural galvanized or polyethylene stock trough with enclosure added. Pre-formed shell simplifies structural work. Requires custom insulated enclosure and filtration.',
    suitable: 'Intermediate DIY',
  },
  {
    title: 'Float Room',
    cost: '$5,000\u201315,000+',
    desc: 'Dedicated room conversion: waterproofed floor and walls, walk-in access, full filtration system. Professional-grade but permanent. Requires contractor unless highly skilled.',
    suitable: 'Serious investment',
  },
];

// ── Commercial Tanks Data ──────────────────────────────────────
const commercialTanks = [
  { name: 'Zen Float Tent', price: '~$1,940', notes: 'Entry-level, fabric tent design, portable' },
  { name: 'Dreampod FLEX', price: '~$5,225', notes: 'Mid-range, pod design, home use' },
  { name: 'Samadhi Home', price: '$6,400\u201313,000', notes: 'Original commercial lineage, classic design' },
  { name: 'Dreampod Pro', price: '~$8,075', notes: 'Commercial-grade, wider interior' },
  { name: 'Dreampod Plus', price: '~$10,450', notes: 'Larger interior, advanced filtration' },
  { name: 'Dreampod V2', price: '~$20,425', notes: 'Flagship commercial model' },
  { name: 'i-Sopod', price: '~$25,000', notes: 'Premium European, full commercial spec' },
];

// ── All Site Pages ─────────────────────────────────────────────
// Pages not already featured as descriptive cards in the Integration section
const morePages = [
  { href: '/yoga', label: 'Yoga' },
  { href: '/breathe', label: 'Breathe' },
  { href: '/wim-hof', label: 'Wim Hof' },
  { href: '/reiki', label: 'Reiki' },
  { href: '/chakras', label: 'Chakras' },
  { href: '/sound-healing', label: 'Sound Healing' },
  { href: '/somatics', label: 'Somatics' },
  { href: '/sleep', label: 'Sleep' },
  { href: '/qigong', label: 'Qigong' },
  { href: '/taichi', label: 'Tai Chi' },
  { href: '/reflexology', label: 'Reflexology' },
  { href: '/trauma', label: 'Trauma' },
  { href: '/nutrition', label: 'Nutrition' },
  { href: '/nature', label: 'Nature' },
  { href: '/fasting', label: 'Fasting' },
  { href: '/practice', label: 'Practice' },
  { href: '/manifest', label: 'Manifest' },
];

// ── Rating Badge Helper ────────────────────────────────────────
function RatingBadge({ type, label }: { type: string; label: string }) {
  const styles: Record<string, { background: string; color: string }> = {
    moderate: { background: 'rgba(45,106,79,0.1)', color: '#2D6A4F' },
    emerging: { background: 'rgba(27,46,74,0.08)', color: 'var(--color-float-deep)' },
    insufficient: { background: 'rgba(120,120,120,0.1)', color: '#666' },
    null: { background: 'rgba(120,120,120,0.1)', color: '#666' },
  };
  const s = styles[type] ?? styles.null;
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.6rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-ui)',
        fontWeight: 600,
        letterSpacing: '0.04em',
        background: s.background,
        color: s.color,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

// ── Evidence Level Badge Helper ────────────────────────────────
function EvidenceLevelBadge({ level }: { level: string }) {
  let bg = 'rgba(45,106,79,0.1)';
  let color = '#2D6A4F';
  if (level === 'Mechanistically Grounded') {
    bg = 'rgba(74,127,181,0.12)';
    color = 'var(--color-float-deep)';
  } else if (level === 'Experiential/Theoretical' || level === 'Emerging') {
    bg = 'rgba(120,120,120,0.1)';
    color = '#666';
  }
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.6rem',
        borderRadius: '9999px',
        fontSize: '0.6875rem',
        fontFamily: 'var(--font-ui)',
        fontWeight: 600,
        letterSpacing: '0.04em',
        background: bg,
        color,
        whiteSpace: 'nowrap',
      }}
    >
      {level}
    </span>
  );
}

// ── Shared Styles ──────────────────────────────────────────────
const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: '0.6875rem',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)',
  margin: '0 0 1rem',
};

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-h2)',
  fontWeight: 400,
  color: 'var(--color-text)',
  margin: '0 0 1rem',
};

const h3Style: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.5rem',
  fontWeight: 600,
  color: 'var(--color-text)',
  margin: '0 0 1rem',
  fontStyle: 'normal',
};

const introParaStyle: React.CSSProperties = {
  color: 'var(--color-text-muted)',
  marginBottom: '3rem',
  maxWidth: '58ch',
  fontSize: 'var(--text-body-lg)',
  lineHeight: 1.75,
};

const sectionPadding: React.CSSProperties = {
  padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
};

const thStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: '0.6875rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--color-float-deep)',
  padding: '0.75rem 1rem',
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  color: 'var(--color-text-muted)',
  fontSize: '0.875rem',
};

// ── Main Component ─────────────────────────────────────────────
export default function FloatClient() {
  return (
    <div
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-body)',
        lineHeight: 1.8,
        color: 'var(--color-text)',
        '--page-accent': 'var(--color-float-deep)',
      } as React.CSSProperties}
    >

      <StickyNav
        accentColor={'var(--color-float-deep)'}
        sections={[
          { id: 'history', label: 'History' },
          { id: 'science', label: 'Science' },
          { id: 'evidence', label: 'Evidence' },
          { id: 'experience', label: 'Experience' },
          { id: 'build', label: 'Build' },
          { id: 'integration', label: 'Integration' },
          { id: 'connection', label: 'Connection' },
        ]}
      />

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
          background: 'linear-gradient(160deg, oklch(22% 0.06 250), oklch(15% 0.04 260))',
          overflow: 'hidden',
        }}
      >
        {/* Hero image */}
        <Image
          src="/images/hero-float.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.4 }}
        />
        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(12,15,30,0.6) 0%, transparent 100%)',
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
              color: 'rgba(197,217,237,0.75)',
              margin: '0 0 1.25rem',
            }}
          >
            Flotation REST
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              color: '#E8F0F8',
              lineHeight: 1.05,
              margin: '0 0 1.5rem',
              maxWidth: '14ch',
            }}
          >
            Float
          </h1>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'rgba(232,240,248,0.85)',
              margin: '0 0 2.5rem',
              maxWidth: '52ch',
              lineHeight: 1.75,
            }}
          >
            A lightproof, soundproof vessel. 1,000 lbs of Epsom salt. Skin-temperature water.
            Total darkness. Your brain reaches theta in 40 minutes &mdash; a state that takes
            meditators years. The neuroscience is real. The evidence is more honest than you expect.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['History', 'Science', 'Evidence', 'Experience', 'Build', 'Integration', 'Connection'].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-float-mid)',
                  textDecoration: 'none',
                  borderBottom: `1px solid 'var(--color-float-mid)'`,
                  paddingBottom: '0.25rem',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. INTRO QUOTE
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(3.5rem, 7vw, 6rem) max(1.5rem, 8vw)',
          background: `linear-gradient(180deg, var(--color-cream) 0%, color-mix(in srgb, 'var(--color-float-light)' 8%, var(--color-cream)) 100%)`,
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          <p style={eyebrowStyle}>The Core Finding</p>
          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
              fontStyle: 'italic',
              color: 'var(--color-text)',
              margin: '0 auto 1.25rem',
              maxWidth: '64ch',
              lineHeight: 1.65,
            }}
          >
            &ldquo;Taking the body off the mind &mdash; floating does not simply activate the
            brain&rsquo;s default mode network. It decouples body-mapping circuits from the
            self-model. A mechanism distinct from both meditation and psychedelics.&rdquo;
          </blockquote>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
              margin: '0 0 1.75rem',
              letterSpacing: '0.04em',
            }}
          >
            &mdash; Terhune et al., 2021, Human Brain Mapping, fMRI study
          </p>
          <p
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-muted)',
              margin: '0 auto',
              maxWidth: '60ch',
              lineHeight: 1.8,
            }}
          >
            This means floating, meditation, and psychedelics are likely complementary rather than
            interchangeable &mdash; they reduce self-referential processing through three different
            routes: bottom-up sensory reduction, top-down attentional regulation, and pharmacological
            disruption of cortical hierarchies.
          </p>
        </ScrollReveal>

        <SectionDivider />
      </section>

      {/* ══════════════════════════════════════════════════════
          3. HISTORY
      ══════════════════════════════════════════════════════ */}
      <section
        id="history"
        style={{
          ...sectionPadding,
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={eyebrowStyle}>Origins</p>
            <h2 style={h2Style}>From NIMH to the Wellness Mainstream</h2>
            <p style={introParaStyle}>
              The float tank was born inside a government research laboratory in 1954 &mdash; not in
              a wellness spa. Its origin story is inseparable from consciousness research, psychedelic
              science, and one of the most unconventional figures in 20th-century neuroscience.
            </p>
          </ScrollReveal>

          {/* Two-column: Lilly + Psychonaut Turn */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3.5rem',
            }}
          >
            <ScrollReveal>
              <h3 style={h3Style}>John C. Lilly (1954)</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                At the National Institute of Mental Health, neurophysiologist John C. Lilly needed
                to answer a basic question: does the brain fall into sleep or quiet activity when
                deprived of external stimulation, or does it generate its own? His first tank was
                vertical &mdash; subjects fully submerged, breathing through a face mask.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The finding was immediate and surprising: consciousness did not collapse. The brain
                remained active, organized, and generative. Over the following two decades, Lilly
                refined the design &mdash; eliminating the mask, shifting to horizontal float, using
                Epsom salt for buoyancy &mdash; arriving at the modern pod configuration by the 1970s.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Lilly&rsquo;s <em>Programming and Metaprogramming in the Human Biocomputer</em>
                {' '}(1968) proposed the brain as a programmable system whose default parameters
                could be studied and modified. The tank was his primary instrument.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3 style={h3Style}>The Psychonaut Turn</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                In the 1960s, Lilly began combining the tank with LSD &mdash; an approach he
                believed allowed studying the brain&rsquo;s &ldquo;metaprogramming&rdquo; directly.
                His research was extraordinary in scope: dolphin communication (Order of the
                Dolphin, 1961), interspecies cognition, and the neurological substrates of
                language acquisition.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                In the 1970s, ketamine entered his self-experiments in the tank, documented in
                {' '}<em>The Scientist</em> (1978). The association between float tanks and
                psychedelic exploration would persist in the cultural imagination for decades,
                alternately attracting and deterring mainstream interest.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The 1980 film <em>Altered States</em> crystallized both the scientific possibility
                and the countercultural mystique &mdash; reaching a mass audience at precisely the
                moment commercial floating was establishing its first centers.
              </p>
            </ScrollReveal>
          </div>

          {/* Timeline grid */}
          <ScrollReveal>
            <h3 style={{ ...h3Style, marginBottom: '1.5rem' }}>Timeline</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
              }}
            >
              {historyTimeline.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderTop: `3px solid 'var(--color-float-mid)'`,
                    borderRadius: '2px',
                    padding: '1.25rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--color-float-deep)',
                      margin: '0 0 0.5rem',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {item.year}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          4. SCIENCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="science"
        style={{
          ...sectionPadding,
          background: `color-mix(in srgb, var(--color-cream) 92%, 'var(--color-float-light)')`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={eyebrowStyle}>Neuroscience</p>
            <h2 style={h2Style}>How Floating Rewires the Brain</h2>
            <p style={introParaStyle}>
              Flotation REST achieves what no other single intervention can: simultaneous, near-total
              deafferentation across six sensory channels simultaneously. The brain, no longer
              processing external input, turns inward &mdash; and the results are measurable,
              replicable, and neurologically distinct from any other state.
            </p>
          </ScrollReveal>

          {/* Sensory Channels Table */}
          <ScrollReveal>
            <h3 style={{ ...h3Style, marginBottom: '1.25rem' }}>What Gets Eliminated</h3>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -0.5rem', padding: '0 0.5rem', marginBottom: '3.5rem' }}>
              <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid 'var(--color-float-mid)'` }}>
                    <th style={thStyle}>Sensory Channel</th>
                    <th style={thStyle}>What Is Eliminated</th>
                  </tr>
                </thead>
                <tbody>
                  {sensoryChannels.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>
                        {row.channel}
                      </td>
                      <td style={tdStyle}>{row.eliminated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Theta brainwave illustration */}
          <ScrollReveal>
            <div style={{ position: 'relative', width: '100%', maxWidth: '600px', aspectRatio: '1', margin: '0 auto 3rem', borderRadius: '2px', overflow: 'hidden' }}>
              <Image
                src="/images/float-theta.webp"
                alt="Watercolor illustration of theta brainwave patterns flowing through neural networks in indigo and gold on cream paper"
                fill
                sizes="(max-width: 600px) 100vw, 600px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </ScrollReveal>

          {/* Grid 1: Theta + DMN */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3rem',
            }}
          >
            <ScrollReveal>
              <h3 style={h3Style}>Theta Brainwave Induction</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The float session produces a predictable sequence: beta frequencies on entry, rapid
                descent into alpha within 10&ndash;15 minutes, and theta emergence at 15&ndash;20
                minutes in. Theta (4&ndash;8 Hz) is the frequency of deep meditation, REM sleep,
                and hypnagogia &mdash; the liminal state between waking and dreaming.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                First-time floaters reach sustained theta at approximately 40 minutes. Long-term
                meditators recognize the state immediately; for most beginners, it takes years of
                daily practice to access it reliably outside the tank.
              </p>
              <div
                style={{
                  background: 'rgba(74,127,181,0.08)',
                  border: `1px solid 'var(--color-float-light)'`,
                  borderLeft: `3px solid 'var(--color-float-mid)'`,
                  borderRadius: '2px',
                  padding: '1rem',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                }}
              >
                <strong style={{ color: 'var(--color-float-deep)' }}>The Three-Float Rule:</strong> habituation
                to the environment allows progressively faster theta access. What beginners reach
                in 40&ndash;50 minutes, experienced floaters access in 10&ndash;15.
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h3 style={h3Style}>DMN Decoupling</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The 2021 Terhune et al. fMRI study &mdash; the first neuroimaging study of floating
                &mdash; found something unexpected. Floating does not simply activate the default
                mode network (DMN). It <em>decouples</em> the posterior cingulate cortex (PCC)
                from the somatomotor cortex.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The researchers termed this &ldquo;taking the body off the mind&rdquo; &mdash; the
                brain&rsquo;s body-mapping circuits disconnect from the self-model. This is
                mechanistically distinct from both meditation (which suppresses DMN through top-down
                attentional regulation) and psychedelics (which disrupt cortical hierarchies
                pharmacologically).
              </p>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginTop: '0.5rem' }}>
                <table style={{ width: '100%', minWidth: '360px', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid 'var(--color-float-mid)'` }}>
                      <th style={{ ...thStyle, padding: '0.5rem 0.75rem' }}>Modality</th>
                      <th style={{ ...thStyle, padding: '0.5rem 0.75rem' }}>DMN Route</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { m: 'Floating', r: 'Bottom-up sensory deafferentation' },
                      { m: 'Meditation', r: 'Top-down attentional regulation' },
                      { m: 'Psychedelics', r: 'Pharmacological cortical disruption' },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600, color: 'var(--color-text)' }}>{row.m}</td>
                        <td style={{ padding: '0.5rem 0.75rem', color: 'var(--color-text-muted)' }}>{row.r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>

          {/* DMN decoupling illustration */}
          <ScrollReveal>
            <div style={{ position: 'relative', width: '100%', maxWidth: '420px', aspectRatio: '1', margin: '0 auto 3rem', borderRadius: '2px', overflow: 'hidden' }}>
              <Image
                src="/images/float-dmn.webp"
                alt="Watercolor brain in profile showing default mode network pathways dissolving between posterior cingulate and somatomotor regions"
                fill
                sizes="(max-width: 420px) 100vw, 420px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </ScrollReveal>

          {/* Grid 2: Cortisol + Body Schema */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3rem',
            }}
          >
            <ScrollReveal>
              <h3 style={h3Style}>Cortisol &amp; HPA Axis</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Turner (1989) found that 8 float sessions reduced cortisol levels and produced
                lasting decreases in anxiety. Flux (2022) documented blood pressure drops and
                HRV increases throughout 90-minute sessions, measured continuously. The
                parasympathetic signal is robust and consistent.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                <strong>Honest caveat:</strong> Schulz (1994) found no significant cortisol
                effect from a single session. The cortisol signal appears to be cumulative rather
                than acute &mdash; a series of sessions is required to produce the neuroendocrine
                changes Turner documented. Single-float anxiety relief operates through a different,
                faster-acting mechanism.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3 style={h3Style}>Body Schema Dissolution</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The brain maintains a continuously updated model of the body&rsquo;s position,
                boundaries, and structure. In the float tank, every input that normally sustains
                this model is removed. The body schema begins to dissolve within 30&ndash;45 minutes.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Hruby &amp; Schmidt (2024) documented this as dissolution of physical boundaries
                and time distortion. Clinically, this has direct therapeutic implications: chronic
                pain involves distorted body-map representations; PTSD involves threat-loaded
                somatic monitoring; eating disorders involve disrupted body-boundary perception.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The float tank offers a rare environment where the distorted schema can temporarily
                suspend &mdash; not by correcting it, but by removing the input stream that sustains it.
              </p>
            </ScrollReveal>
          </div>

          {/* Grid 3: Interoception + Magnesium */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3.5rem',
            }}
          >
            <ScrollReveal>
              <h3 style={h3Style}>Interoceptive Amplification</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Paradoxically, removing all external sensory noise does not silence internal
                experience &mdash; it amplifies it. Without competing external inputs, the brain
                turns its attention toward internal signals with unusual clarity.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Feinstein (2018) found that anxious participants noticed their heartbeat more
                intensely in the tank &mdash; yet reported <em>less</em> anxiety. This maps onto
                Wolpe&rsquo;s reciprocal inhibition: the deep parasympathetic state creates a
                physiological context in which the same interoceptive signals are processed as
                information rather than threat. The capacity to observe the body without fear is
                itself therapeutic.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3 style={h3Style}>Magnesium Absorption</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                A popular claim is that transdermal magnesium absorption from Epsom salt floats
                corrects widespread deficiency. The evidence is more nuanced. The Waring study
                found a 35% increase in plasma magnesium &mdash; but at water temperatures of
                50&ndash;55&deg;C, not the 34&deg;C used in float tanks.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                <strong>The honest position:</strong> transdermal magnesium absorption at float
                temperatures is biologically plausible given the high Epsom salt concentration
                and 1.5-hour contact time, but has not been directly measured under float
                conditions. The calming effects of floating do not depend on this mechanism
                &mdash; they have robust alternative explanations.
              </p>
            </ScrollReveal>
          </div>

          {/* StatCards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
            }}
          >
            <ScrollReveal>
              <StatCard
                source="Feinstein et al., 2018 — PLOS ONE"
                stat="Anxiety: Cohen's d > 2.0"
                detail="A single 60-minute float produced an unusually large anxiety reduction in 50 clinically anxious adults. The most severely anxious showed the largest gains. Study design: open-label, within-subjects (no blinded control arm); the effect size magnitude should be interpreted with this limitation in mind."
                accentColor={'var(--color-float-mid)'}
                accentTextColor={'var(--color-float-deep)'}
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Terhune et al., 2021 — Human Brain Mapping"
                stat="DMN decoupling, not suppression"
                detail="The first fMRI study found floating reduces connectivity between body-mapping and self-model circuits — a novel mechanism called 'taking the body off the mind.'"
                accentColor={'var(--color-float-mid)'}
                accentTextColor={'var(--color-float-deep)'}
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Lashgari et al., 2025 — BMC Comp Med Ther"
                stat="63 studies, 1,838 participants"
                detail="The first comprehensive PRISMA systematic review of flotation-REST. Pooled meta-analysis not yet feasible due to inconsistent outcome measures across studies."
                accentColor={'var(--color-float-mid)'}
                accentTextColor={'var(--color-float-deep)'}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          5. EVIDENCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="evidence"
        style={{
          ...sectionPadding,
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={eyebrowStyle}>Clinical Evidence</p>
            <h2 style={h2Style}>What the Evidence Actually Shows</h2>
            <p style={introParaStyle}>
              The 2025 Lashgari PRISMA systematic review &mdash; 63 studies, 1,838 participants
              &mdash; could not perform a pooled meta-analysis because outcome measures are too
              inconsistent across studies. This is a structural problem in flotation research,
              not a sign the effects are absent.
            </p>
          </ScrollReveal>

          {/* Two-column: Structural Problem + Loose 2021 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3.5rem',
            }}
          >
            <ScrollReveal>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  padding: '1.75rem',
                }}
              >
                <h3 style={{ ...h3Style, marginBottom: '1.25rem' }}>The Structural Problem</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '1rem' }}>
                  Why quality stays low despite decades of research:
                </p>
                <ol style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {[
                    'Open-label designs: participants always know they are floating',
                    'The placebo is itself therapeutic: a comfortable resting environment activates many of the same mechanisms',
                    'Inconsistent outcome measures across studies prevent pooled analysis',
                    'Short follow-up: most studies measure only acute post-session effects',
                    'Publication bias: negative results rarely surface from an enthusiast-funded field',
                  ].map((point, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{point}</li>
                  ))}
                </ol>
              </div>
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
                <h3 style={{ ...h3Style, marginBottom: '1.25rem' }}>The Loose 2021 Wake-Up Call</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '1rem' }}>
                  The only properly blinded RCT in the literature compared floating to an
                  indistinguishable placebo &mdash; a rest condition that participants could not
                  distinguish from a genuine float. The result: no advantage for floating over
                  placebo at any follow-up point for chronic pain (n=99).
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '1rem' }}>
                  What this means for the field: the acute relief that floaters report is real.
                  But whether that relief is specific to the float environment &mdash; or to any
                  high-quality rest condition &mdash; remains unresolved for chronic pain specifically.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                  The anxiety findings (Feinstein 2018, d &gt; 2.0) used no comparable blinded
                  control. This is the most important gap remaining in flotation research.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Evidence Table */}
          <ScrollReveal>
            <h3 style={{ ...h3Style, marginBottom: '1.5rem' }}>Evidence by Condition</h3>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -0.5rem', padding: '0 0.5rem', marginBottom: '3.5rem' }}>
              <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid 'var(--color-float-mid)'` }}>
                    <th style={thStyle}>Condition</th>
                    <th style={thStyle}>Rating</th>
                    <th style={thStyle}>Key Source</th>
                    <th style={thStyle}>Key Caveat</th>
                  </tr>
                </thead>
                <tbody>
                  {evidenceRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--color-text)' }}>{row.condition}</td>
                      <td style={tdStyle}>
                        <RatingBadge type={row.ratingType} label={row.rating} />
                      </td>
                      <td style={tdStyle}>{row.source}</td>
                      <td style={tdStyle}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* StatCards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
            }}
          >
            <ScrollReveal>
              <StatCard
                source="Loose et al., 2021 — JAMA Network Open"
                stat="n=99: No advantage over placebo"
                detail="The only properly blinded RCT found floating and an indistinguishable placebo produced equivalent chronic pain outcomes at all follow-up points. The acute relief is real; the specific mechanism remains unproven."
                accentColor={'var(--color-float-mid)'}
                accentTextColor={'var(--color-float-deep)'}
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Garland et al., 2024 — PLOS ONE"
                stat="n=75: Zero serious adverse events"
                detail="The safety and feasibility RCT confirmed 85–89% adherence across conditions with no serious adverse events — establishing the infrastructure for the larger efficacy trials the field needs."
                accentColor={'var(--color-float-mid)'}
                accentTextColor={'var(--color-float-deep)'}
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Van Dierendonck & Nijenhuis, 2005"
                stat="Flotation outperforms meditation for stress"
                detail="The meta-analysis found flotation REST produced greater stress reduction than standard meditation, biofeedback, and progressive muscle relaxation in pooled analysis."
                accentColor={'var(--color-float-mid)'}
                accentTextColor={'var(--color-float-deep)'}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          6. EXPERIENCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="experience"
        style={{
          ...sectionPadding,
          background: `color-mix(in srgb, var(--color-cream) 92%, 'var(--color-float-light)')`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={eyebrowStyle}>The Practice</p>
            <h2 style={h2Style}>Inside the Tank</h2>
            <p style={introParaStyle}>
              The float experience is predictable enough to map, and variable enough that no two
              sessions are identical. Understanding the arc removes the anxious uncertainty that
              derails most first floats.
            </p>
          </ScrollReveal>

          {/* Session Arc timeline */}
          <ScrollReveal>
            <h3 style={{ ...h3Style, marginBottom: '1.5rem' }}>The Session Arc</h3>
            <div
              className="timeline"
              style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '3rem', position: 'relative' }}
            >
              {[
                {
                  time: 'Minutes 0\u201315',
                  title: 'Arrival',
                  desc: 'Beta frequencies dominate. Mental chatter runs at normal speed. The body tests positions. Restlessness is universal and expected.',
                  note: 'This phase is the price of entry, not a problem to fix.',
                },
                {
                  time: 'Minutes 15\u201330',
                  title: 'Peak Restlessness',
                  desc: 'The silence becomes noticeable. Skin tingling as proprioceptive signals quiet. The urge to check the time is strongest here.',
                  note: 'The nervous system testing whether stillness is safe.',
                },
                {
                  time: 'Minutes 30\u201345',
                  title: 'The Shift',
                  desc: 'Muscular tension begins releasing involuntarily. The boundary between body and water blurs. Alpha transitions to theta.',
                  note: 'Where the experience becomes qualitatively different.',
                },
                {
                  time: 'Minutes 45\u201390',
                  title: 'The Tank State',
                  desc: "Time perception distorts. Body schema dissolves. Hypnagogic imagery emerges without sleep.",
                  note: "The brain\u2019s self-generated sensory content, filling the input vacuum.",
                },
              ].map((phase, i) => (
                <div
                  key={i}
                  className="timeline-node"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '140px 1fr',
                    gap: '1.5rem',
                    paddingBottom: '2rem',
                    position: 'relative',
                  }}
                >
                  <div style={{ textAlign: 'right', paddingTop: '0.25rem' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        color: 'var(--color-float-mid)',
                        letterSpacing: '0.06em',
                        margin: '0 0 0.25rem',
                        textTransform: 'uppercase',
                      }}
                    >
                      {phase.time}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        margin: 0,
                        fontStyle: 'normal',
                      }}
                    >
                      {phase.title}
                    </p>
                  </div>
                  <div
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      borderLeft: `3px solid 'var(--color-float-mid)'`,
                      borderRadius: '2px',
                      padding: '1.25rem',
                    }}
                  >
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: '0 0 0.75rem' }}>
                      {phase.desc}
                    </p>
                    <p
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--color-float-deep)',
                        fontFamily: 'var(--font-ui)',
                        fontStyle: 'italic',
                        margin: 0,
                      }}
                    >
                      {phase.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Three-Float Rule callout */}
          <ScrollReveal>
            <div
              style={{
                background: 'rgba(74,127,181,0.07)',
                border: `1px solid 'var(--color-float-light)'`,
                borderLeft: `4px solid 'var(--color-float-mid)'`,
                borderRadius: '2px',
                padding: '1.75rem 2rem',
                marginBottom: '3.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-float-mid)',
                  margin: '0 0 0.75rem',
                }}
              >
                The Three-Float Rule
              </p>
              <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>
                <strong>First float: novelty processing.</strong> Second: safety calibration.
                Third onward: real depth. What beginners reach in 40&ndash;50 minutes, experienced
                floaters access in 10&ndash;15. Commit to at least three sessions before evaluating
                whether floating works for you.
              </p>
            </div>
          </ScrollReveal>

          {/* Frequency Protocols */}
          <ScrollReveal>
            <h3 style={{ ...h3Style, marginBottom: '1.25rem' }}>Frequency Protocols</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem',
                marginBottom: '3.5rem',
              }}
            >
              {[
                { label: 'Beginner', freq: 'Weekly', desc: 'Commit to 4 sessions before evaluating. Novelty and anxiety occupy the first 1\u20132 floats.' },
                { label: 'Intermediate', freq: '2\u20133x / week', desc: 'Cumulative cortisol reduction requires repeated sessions. This is where neuroendocrine effects begin to accumulate.' },
                { label: 'Athletic Recovery', freq: '24\u201348 hrs post training', desc: 'Timed to high-intensity sessions. The combination of magnesium, gravity elimination, and parasympathetic activation accelerates recovery.' },
                { label: 'Intensive', freq: 'Daily, 5\u20137 days', desc: 'Used for burnout recovery, creative retreats, or trauma processing intensives under professional supervision.' },
              ].map((p, i) => (
                <div
                  key={i}
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
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-float-deep)',
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {p.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--color-float-mid)',
                      margin: '0 0 0.75rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {p.freq}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Preparation Tips */}
          <ScrollReveal>
            <h3 style={{ ...h3Style, marginBottom: '1.25rem' }}>Preparation &amp; Tips</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
                gap: 'clamp(2rem, 4vw, 3rem)',
                marginBottom: '3rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-float-deep)',
                    margin: '0 0 0.875rem',
                  }}
                >
                  Day-of Protocol
                </p>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    'Do not shave within 12 hours \u2014 micro-cuts sting intensely in salt water',
                    'Avoid caffeine 2\u20134 hours before',
                    'Light meal 90 minutes beforehand; not fasted, not full',
                    'Apply petroleum jelly (Vaseline) to any cuts or abrasions',
                    'Remove contact lenses before entering',
                  ].map((tip, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{tip}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-float-deep)',
                    margin: '0 0 0.875rem',
                  }}
                >
                  Inside the Tank
                </p>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    'Place the float pillow under your head, not your neck \u2014 it supports the occiput',
                    'Keep a spray bottle of fresh water nearby for eyes',
                    'Arms overhead (cactus position) relieves neck tension better than arms at sides',
                    'Leave the pod lid cracked on your first session \u2014 full closure is optional',
                    'When restless, focus on the breath and wait \u2014 the shift happens after, not instead of, restlessness',
                  ].map((tip, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Contraindications */}
          <ScrollReveal>
            <div
              style={{
                background: 'rgba(120,120,120,0.06)',
                border: '1px solid var(--color-border)',
                borderLeft: '4px solid #999',
                borderRadius: '2px',
                padding: '2rem',
              }}
            >
              <h3 style={{ ...h3Style, fontSize: '1.125rem', marginBottom: '1.5rem', color: '#555' }}>
                Contraindications
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                  gap: '2rem',
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#B91C1C',
                      margin: '0 0 0.75rem',
                    }}
                  >
                    Absolute
                  </p>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {[
                      'Open wounds or broken skin',
                      'New tattoos (less than 3\u20134 weeks)',
                      'Uncontrolled epilepsy',
                      'Active psychosis or acute mental health crisis',
                      'Alcohol or substance intoxication',
                      'Recent chemotherapy (salt water + open ports)',
                    ].map((c, i) => (
                      <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#92400E',
                      margin: '0 0 0.75rem',
                    }}
                  >
                    Caution / Consult First
                  </p>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {[
                      'Pregnancy \u2014 consult your doctor; first trimester avoid',
                      'Severe claustrophobia \u2014 start with lid open',
                      'Dissociative disorders \u2014 work with a therapist',
                      'Kidney or liver conditions \u2014 magnesium load',
                      'Active ear infections \u2014 water entry risk',
                    ].map((c, i) => (
                      <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          7. BUILD
      ══════════════════════════════════════════════════════ */}
      <section
        id="build"
        style={{
          ...sectionPadding,
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={eyebrowStyle}>Build Your Own</p>
            <h2 style={h2Style}>Float Tanks at Home</h2>
            <p style={introParaStyle}>
              Home float tanks are genuinely viable for serious practitioners. The barrier is not
              technical complexity &mdash; it is infrastructure: floor load capacity, drainage,
              humidity management, and sustained temperature control. Done correctly, a home tank
              pays for itself within two years at commercial float pricing.
            </p>
          </ScrollReveal>

          {/* Technical Specs Table */}
          <ScrollReveal>
          {/* Float pod photo */}
          <ScrollReveal>
            <div style={{ position: 'relative', width: '100%', maxWidth: '640px', aspectRatio: '1', margin: '0 auto 3rem', borderRadius: '2px', overflow: 'hidden' }}>
              <Image
                src="/images/float-pod.webp"
                alt="Modern float pod in a dimly lit wellness room, lid open revealing glowing turquoise salt water, minimalist wood and concrete interior"
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </ScrollReveal>

            <h3 style={{ ...h3Style, marginBottom: '1.25rem' }}>Technical Specifications</h3>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -0.5rem', padding: '0 0.5rem', marginBottom: '3.5rem' }}>
              <table style={{ width: '100%', minWidth: '480px', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid 'var(--color-float-mid)'` }}>
                    <th style={thStyle}>Parameter</th>
                    <th style={thStyle}>Specification</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Water volume', '80\u2013200 gallons'],
                    ['Epsom salt', '400\u20131,000 lbs'],
                    ['Specific gravity', '1.25\u20131.285'],
                    ['Water temperature', '93.5\u00b0F / 34.1\u00b0C (\u00b10.5\u00b0F)'],
                    ['Minimum dimensions', '4 ft \u00d7 8 ft \u00d7 4 ft'],
                    ['Filtration', 'Pump + 10\u03bcm filter + UV-C'],
                    ['Sanitizer', '35% food-grade H\u2082O\u2082 or ozone'],
                    ['Total loaded weight', '1,500\u20133,000+ lbs'],
                  ].map(([param, spec], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--color-text)' }}>{param}</td>
                      <td style={tdStyle}>{spec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* DIY Options */}
          <ScrollReveal>
            <h3 style={{ ...h3Style, marginBottom: '1.25rem' }}>DIY Options</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem',
                marginBottom: '3.5rem',
              }}
            >
              {diyOptions.map((opt, i) => (
                <div
                  key={i}
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
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-float-deep)',
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {opt.suitable}
                  </p>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.25rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {opt.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--color-float-mid)',
                      margin: '0 0 0.875rem',
                    }}
                  >
                    {opt.cost}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                    {opt.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Commercial Tanks Table */}
          <ScrollReveal>
            <h3 style={{ ...h3Style, marginBottom: '1.25rem' }}>Commercial Tanks (Current Pricing)</h3>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -0.5rem', padding: '0 0.5rem', marginBottom: '3rem' }}>
              <table style={{ width: '100%', minWidth: '480px', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid 'var(--color-float-mid)'` }}>
                    <th style={thStyle}>Model</th>
                    <th style={thStyle}>Price</th>
                    <th style={thStyle}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {commercialTanks.map((tank, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ ...tdStyle, fontWeight: 500, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>{tank.name}</td>
                      <td style={{ ...tdStyle, color: 'var(--color-float-deep)', fontWeight: 600 }}>{tank.price}</td>
                      <td style={tdStyle}>{tank.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
            Disclosure: Inner Practice has no commercial relationship with any float tank manufacturer. Brands are mentioned for reference only.
          </p>

          {/* Safety callout */}
          <ScrollReveal>
            <div
              style={{
                background: 'rgba(74,127,181,0.06)',
                border: `1px solid 'var(--color-float-light)'`,
                borderLeft: `4px solid 'var(--color-float-mid)'`,
                borderRadius: '2px',
                padding: '1.75rem 2rem',
                marginBottom: '1.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-float-mid)',
                  margin: '0 0 0.875rem',
                }}
              >
                Safety Considerations
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                  gap: '1.5rem',
                }}
              >
                {[
                  { label: 'Structural', desc: '1,500\u20133,000+ lbs total loaded weight. Verify floor joist rating before installation. Older homes typically require engineering review.' },
                  { label: 'Electrical', desc: 'GFCI protection is mandatory on all circuits within 6 feet of water. No exceptions \u2014 standard breakers are insufficient.' },
                  { label: 'Drainage', desc: 'High-salinity water cannot go to standard septic systems. Consult local regulations; dilution or municipal sewer connection required.' },
                  { label: 'Humidity', desc: 'A full float enclosure generates significant moisture. Seal walls and ceiling with appropriate vapor barrier before installation.' },
                ].map((s, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--color-float-deep)',
                        margin: '0 0 0.375rem',
                      }}
                    >
                      {s.label}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Break-even note */}
          <ScrollReveal>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
                fontStyle: 'italic',
                lineHeight: 1.7,
                padding: '1rem 1.5rem',
                borderLeft: `2px solid 'var(--color-float-light)'`,
                margin: 0,
              }}
            >
              At $70&ndash;100/session and 2x/week, a $10,000 home pod pays for itself in
              approximately 18 months of regular use.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          8. INTEGRATION
      ══════════════════════════════════════════════════════ */}
      <section
        id="integration"
        style={{
          ...sectionPadding,
          background: `color-mix(in srgb, var(--color-cream) 92%, 'var(--color-float-light)')`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={eyebrowStyle}>The Amplifier</p>
            <h2 style={h2Style}>How Floating Connects to Every Practice</h2>
            <p style={introParaStyle}>
              Float tanks are unusually well-positioned as an amplifier for nearly every other
              modality on this site. The combination of theta state, body schema dissolution, and
              complete parasympathetic dominance creates a receptive context that makes subsequent
              practices more accessible and more potent.
            </p>
          </ScrollReveal>

          {/* Integration Table */}
          <ScrollReveal>
            <h3 style={{ ...h3Style, marginBottom: '1.25rem' }}>Integration by Practice</h3>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -0.5rem', padding: '0 0.5rem', marginBottom: '3.5rem' }}>
              <table style={{ width: '100%', minWidth: '640px', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid 'var(--color-float-mid)'` }}>
                    <th style={thStyle}>Practice</th>
                    <th style={thStyle}>Synergy</th>
                    <th style={thStyle}>Evidence Level</th>
                  </tr>
                </thead>
                <tbody>
                  {integrationRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>{row.practice}</td>
                      <td style={tdStyle}>{row.synergy}</td>
                      <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                        <EvidenceLevelBadge level={row.evidence} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Cross-link cards */}
          <ScrollReveal>
            <h3 style={{ ...h3Style, marginBottom: '1.25rem' }}>Strongest Connections</h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.25rem',
              marginBottom: '3.5rem',
            }}
          >
            {crossLinks.map((c) => (
              <ScrollReveal key={c.href}>
                <Link href={c.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
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
                        color: 'var(--color-float-deep)',
                        margin: '0 0 0.5rem',
                      }}
                    >
                      {c.label}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                      {c.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Protocol Cards */}
          <ScrollReveal>
            <h3 style={{ ...h3Style, marginBottom: '1.25rem' }}>Protocol Stacks</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {protocols.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderTop: `3px solid 'var(--color-float-mid)'`,
                    borderRadius: '2px',
                    padding: '1.5rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-float-deep)',
                      margin: '0 0 0.875rem',
                    }}
                  >
                    {p.label}
                  </p>
                  <ol style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {p.steps.map((step, j) => (
                      <li key={j} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          9. CONNECTION
      ══════════════════════════════════════════════════════ */}
      <section
        id="connection"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)',
          background: 'linear-gradient(160deg, oklch(55% 0.06 250 / 0.18), var(--color-cream))',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '860px' }}>
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
              Continue Exploring
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '54ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Floating is an amplifier &mdash; its effects deepen in combination with the practices
              that share its underlying mechanisms.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>More Practices</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              {morePages.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--color-float-deep)',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    border: `1px solid 'var(--color-float-mid)'`,
                    borderRadius: '2px',
                    transition: 'background 200ms ease',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
