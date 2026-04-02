'use client';

import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import StatCard from '@/components/StatCard';
import StickyNav from '@/components/StickyNav';
import PageHero from '@/components/PageHero';
import SectionIntro from '@/components/SectionIntro';
import InfoCard from '@/components/InfoCard';

// ── Modalities Data ────────────────────────────────────────────
const modalities = [
  { name: 'Swedish', origin: 'Per Henrik Ling, Sweden, early 19th c.', technique: 'Effleurage, petrissage, friction, tapotement', pressure: 'Light\u2013medium', bestFor: 'Stress relief, first-time clients, general relaxation', evidence: 'Moderate', clothing: 'Off', oil: 'Yes' },
  { name: 'Deep Tissue', origin: 'Therese Pfrimmer, 1940s\u20131950s', technique: 'Slow strokes perpendicular to fiber, thumbs/knuckles/elbows', pressure: 'Firm\u2013deep', bestFor: 'Chronic tension, injury rehabilitation, adhesions', evidence: 'Moderate-Strong', clothing: 'Off', oil: 'Sometimes' },
  { name: 'Thai (Nuad Thai)', origin: 'Jivaka Kumar Bhaccha, ~2,500 years ago', technique: 'Passive stretches, compression along 10 Sen lines, floor mat', pressure: 'Varied', bestFor: 'Back pain, headaches, flexibility', evidence: 'Moderate', clothing: 'On', oil: 'No' },
  { name: 'Shiatsu', origin: 'Tokujiro Namikoshi, Japan, 1940s', technique: 'Rhythmic thumb/palm pressure along TCM meridians', pressure: 'Firm, rhythmic', bestFor: 'Pain, sleep, stress, digestive issues', evidence: 'Low-Moderate', clothing: 'On', oil: 'No' },
  { name: 'Sports', origin: 'Olympic programs, 1970s\u20131980s', technique: 'Deep tissue + effleurage + compression + stretching', pressure: 'Medium\u2013firm', bestFor: 'DOMS reduction, flexibility, recovery', evidence: 'Moderate (DOMS); Null (performance)', clothing: 'Off', oil: 'Sometimes' },
  { name: 'Myofascial Release', origin: 'John F. Barnes, PT, 1960s\u20131970s', technique: 'Sustained 5+ min pressure engaging viscoelastic fascia', pressure: 'Light\u2013sustained', bestFor: 'Chronic pain, fibromyalgia, post-surgical', evidence: 'Low-Moderate', clothing: 'Off', oil: 'No' },
  { name: 'Trigger Point', origin: 'Travell & Simons, 1983', technique: 'Ischemic compression on hyperirritable nodules in taut bands', pressure: 'Deep, focal', bestFor: 'Referred pain, tension headaches, MPS', evidence: 'Moderate', clothing: 'Off', oil: 'No' },
  { name: 'Neuromuscular (NMT)', origin: 'Paul St. John & Stanley Lief, mid-20th c.', technique: 'Firm pressure addressing ischemia, nerve entrapment, postural distortion', pressure: 'Firm, measured', bestFor: 'Sciatica, carpal tunnel, repetitive strain', evidence: 'Low-Moderate', clothing: 'Off/On', oil: 'No' },
  { name: 'Craniosacral (CST)', origin: 'Dr. John Upledger, 1970s\u20131980s', technique: 'Extremely light touch (5g) on skull, sacrum, spine', pressure: 'Feather-light', bestFor: 'Headaches, TMJ, trauma, fatigue', evidence: 'Low-Moderate (contested)', clothing: 'On', oil: 'No' },
  { name: 'Manual Lymphatic Drainage', origin: 'Dr. Emil Vodder, Denmark, 1930s', technique: 'Light rhythmic skin-stretching toward lymph nodes', pressure: 'Feather-light', bestFor: 'Lymphedema, post-surgical edema', evidence: 'Strong (lymphedema); Weak (wellness)', clothing: 'On/Off', oil: 'No' },
  { name: 'Rolfing / Structural Integration', origin: 'Dr. Ida Rolf, 1950s\u20131970s', technique: '10-session protocol releasing fascial layers superficial \u2192 deep', pressure: 'Deep, global', bestFor: 'Postural correction, chronic pain, ROM', evidence: 'Moderate (ROM)', clothing: 'Off', oil: 'No' },
];

// ── Evidence Table Data ────────────────────────────────────────
const evidenceRows = [
  { condition: 'Chronic LBP (short-term)', rating: 'Moderate', ratingType: 'moderate', source: 'Skelly et al. 2020 (AHRQ)', notes: 'No benefit at 6+ months' },
  { condition: 'Fibromyalgia pain', rating: 'Moderate', ratingType: 'moderate', source: 'Ughreja et al. 2021', notes: 'MFR superior to generic massage' },
  { condition: 'Labor pain (acupressure)', rating: 'Moderate', ratingType: 'moderate', source: 'Smith et al. 2020 (Cochrane)', notes: 'Non-specific massage lower certainty' },
  { condition: 'Myofascial trigger points', rating: 'Moderate', ratingType: 'moderate', source: 'Guzm\u00e1n Pav\u00f3n et al. 2022', notes: 'Network meta-analysis' },
  { condition: 'State anxiety', rating: 'Moderate', ratingType: 'moderate', source: 'Multiple meta-analyses', notes: 'Effect size comparable to psychotherapy' },
  { condition: 'DOMS reduction', rating: 'Moderate', ratingType: 'moderate', source: 'Davis et al. 2020', notes: '~13% reduction vs passive recovery' },
  { condition: 'Flexibility', rating: 'Moderate', ratingType: 'moderate', source: 'Davis et al. 2020', notes: 'Small effect size' },
  { condition: 'Cancer symptom management', rating: 'Low-Moderate', ratingType: 'low-moderate', source: 'Multiple reviews', notes: 'Pain, fatigue, anxiety, nausea' },
  { condition: 'Sleep quality', rating: 'Emerging', ratingType: 'emerging', source: 'Multiple small RCTs', notes: 'Serotonin\u2013melatonin mechanism plausible' },
  { condition: 'Athletic performance', rating: 'Null', ratingType: 'null', source: 'Davis et al. 2020 (n=1,012)', notes: 'No evidence for strength/sprint/jump' },
  { condition: 'Immune function', rating: 'Insufficient', ratingType: 'null', source: 'Field lab', notes: 'Replication at scale needed' },
];

// ── Neural Pathway Table Data ──────────────────────────────────
const neuralRows = [
  { type: 'Swedish effleurage', pathway: 'CT afferents \u2192 insula \u2192 oxytocin', state: 'Ventral vagal', application: 'Anxiety, stress, NS baseline' },
  { type: 'Deep tissue / trigger point', pathway: 'A\u03b2 gate control + descending opioids', state: 'Sympathetic \u2192 parasympathetic rebound', application: 'Chronic pain, hypertonicity' },
  { type: 'Craniosacral', pathway: 'Suboccipital VNS analog', state: 'Dorsal vagal \u2192 ventral vagal', application: 'Hypoarousal, trauma, fatigue' },
  { type: 'MLD', pathway: 'CT afferents at minimal pressure', state: 'Deep parasympathetic', application: 'Post-surgery, inflammation' },
  { type: 'Thai / compression', pathway: 'Proprioceptive + interoceptive reset', state: 'Ventral vagal + grounding', application: 'Dissociation, body reconnection' },
  { type: 'Myofascial release', pathway: 'Slow fascial mechanoreceptors + insula', state: 'Interoceptive reintegration', application: 'Chronic pain, fibromyalgia, trauma' },
];

// ── Tool Comparison Data ───────────────────────────────────────
const tools = [
  { tool: 'Foam roller', cost: '$20\u2013$50', evidence: 'Strong', bestFor: 'Large muscle groups, post-workout', limitation: 'Cannot target small areas' },
  { tool: 'Vibrating roller', cost: '$100\u2013$200', evidence: 'Moderate-Strong', bestFor: 'Improved ROM, pre-workout', limitation: 'Higher cost' },
  { tool: 'Lacrosse ball', cost: '$3\u2013$8', evidence: 'Moderate', bestFor: 'Trigger points, precise release', limitation: 'Requires positioning' },
  { tool: 'Tennis ball', cost: '$2\u2013$5', evidence: 'Moderate', bestFor: 'Sensitive areas, beginners', limitation: 'Less pressure' },
  { tool: 'Peanut tool', cost: '$10\u2013$25', evidence: 'Moderate', bestFor: 'Paraspinals, spine mobility', limitation: 'Back/neck specific' },
  { tool: 'Massage gun (mid-range)', cost: '$100\u2013$230', evidence: 'Moderate-Strong', bestFor: 'DOMS reduction, hard-to-reach (note: null evidence for athletic performance enhancement)', limitation: 'Care near bones; noise' },
  { tool: 'Theracane', cost: '$25\u2013$40', evidence: 'Moderate', bestFor: 'Traps/shoulder blade', limitation: 'Learning curve' },
  { tool: 'Gua sha', cost: '$10\u2013$50', evidence: 'Moderate', bestFor: 'Neck/shoulders, face', limitation: 'Visible redness' },
];

// ── Protocol Cards Data ────────────────────────────────────────
const protocols = [
  {
    label: 'Morning Activation',
    title: 'Morning Activation',
    duration: '5 min',
    steps: [
      'Thoracic spine over foam roller \u2014 60 sec',
      'Calf/plantar foot rolling \u2014 60 sec per side',
      'Jaw/neck: masseter circles 30 sec per side + suboccipital hold 60 sec',
      'Peanut tool paraspinals \u2014 60 sec',
    ],
  },
  {
    label: 'Pre-Workout',
    title: 'Pre-Workout',
    duration: '10\u201315 min',
    steps: [
      'Light foam rolling \u2014 30 sec per area',
      'Massage gun low setting \u2014 60 sec per muscle group',
      'Focus: calves, quads, hips, T-spine',
      'Avoid deep sustained holds',
    ],
  },
  {
    label: 'Post-Workout',
    title: 'Post-Workout Recovery',
    duration: 'Within 30 min',
    steps: [
      'Moderate foam rolling \u2014 60\u201390 sec per group',
      'Massage gun \u2014 2 min per group',
      'Sequence: calves \u2192 hamstrings \u2192 quads \u2192 glutes \u2192 lats \u2192 upper back',
      'Light stretching after',
    ],
  },
  {
    label: 'Desk Worker',
    title: 'Desk Worker Reset',
    duration: '10 min daily',
    steps: [
      'Peanut tool T-spine paraspinals \u2014 90 sec',
      'Lacrosse ball upper trap at wall \u2014 90 sec per side',
      'Pec minor ball at wall corner \u2014 90 sec per side',
      'Suboccipital release on floor \u2014 2\u20133 min',
      'Forearm rolling on table \u2014 60 sec per arm',
    ],
  },
  {
    label: 'Sleep Preparation',
    title: 'Sleep Preparation',
    duration: '30 min before bed',
    steps: [
      'Light pressure only throughout',
      'Warm oil foot massage \u2014 5 min per foot',
      'Calf effleurage upward \u2014 2 min per leg',
      'Suboccipital ball release \u2014 2 min',
      '4-7-8 breathwork \u2014 4 cycles',
    ],
  },
];

// ── Cross-links Data ───────────────────────────────────────────
const crossLinks = [
  { href: '/breathe', label: 'Breathwork', desc: 'The diaphragm is a fascial structure. Timing deeper pressure to the exhale exploits natural tissue release.' },
  { href: '/fascia', label: 'Fascia', desc: 'MFR, Rolfing, and deep tissue directly reshape the fascial matrix. The proposed CHA axis model bridges both pages.' },
  { href: '/yoga', label: 'Yoga', desc: 'Thai massage is the intersection \u2014 passive yoga delivered by a practitioner. Pre-yoga bodywork increases proprioceptive awareness.' },
  { href: '/meditate', label: 'Meditation', desc: 'Receiving skilled bodywork with full sensory attention is a body-scan meditation with external guidance.' },
  { href: '/nervous-system', label: 'Nervous System', desc: 'Polyvagal theory guides technique selection. Craniosacral and MFR suit nervous system-focused work.' },
  { href: '/somatics', label: 'Somatics', desc: 'Somatic Experiencing uses touch to pendulate between activation and settling.' },
  { href: '/reiki', label: 'Reiki', desc: 'Reiki hand positions map onto the body-scan sequence. Both recruit the insular interoceptive network.' },
  { href: '/chakras', label: 'Chakras', desc: 'Shiatsu meridians, Thai Sen lines, and Tui Na bridge directly to chakra-informed bodywork.' },
  { href: '/sleep', label: 'Sleep', desc: 'Massage increases serotonin \u2014 a melatonin precursor. Swedish and craniosacral are most evidence-aligned for sleep.' },
  { href: '/temperature', label: 'Temperature', desc: 'The contrast therapy stack \u2014 sauna \u2192 massage \u2192 cold immersion \u2014 is well-established in clinical rehabilitation.' },
  { href: '/qigong', label: 'Qigong', desc: 'Dao Yin self-massage from the Mawangdui Silk Texts (168 BCE) is the root tradition of modern qigong.' },
  { href: '/sound-healing', label: 'Sound Healing', desc: 'Calibrated tuning forks deliver vibration into tissue that aerial sound cannot achieve.' },
  { href: '/psychedelics', label: 'Psychedelics', desc: 'The MAPS MDMA-AT manual designates therapeutic touch as an important catalyst to healing.' },
];

// ── Evidence rating badge helper ───────────────────────────────
function RatingBadge({ type, label }: { type: string; label: string }) {
  const styles: Record<string, { background: string; color: string }> = {
    moderate: { background: 'rgba(45,106,79,0.1)', color: '#2D6A4F' },
    'low-moderate': { background: 'rgba(107,80,16,0.1)', color: '#6B5010' },
    emerging: { background: 'rgba(61,90,71,0.08)', color: 'var(--color-sage-deep)' },
    null: { background: 'rgba(120,120,120,0.1)', color: '#666' },
  };
  const s = styles[type] ?? styles.null;
  return (
    <span style={{
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
    }}>
      {label}
    </span>
  );
}

// ── Modality evidence badge colors ────────────────────────────
function EvidenceBadge({ rating }: { rating: string }) {
  let bg = 'rgba(45,106,79,0.1)';
  let color = '#2D6A4F';
  if (rating.startsWith('Low') || rating.includes('Low-Moderate')) {
    bg = 'rgba(107,80,16,0.08)';
    color = '#6B5010';
  } else if (rating.includes('contested') || rating.includes('Null')) {
    bg = 'rgba(120,120,120,0.1)';
    color = '#666';
  } else if (rating.startsWith('Strong')) {
    bg = 'rgba(30,90,60,0.12)';
    color = '#1B5E3B';
  }
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.15rem 0.55rem',
      borderRadius: '9999px',
      fontSize: '0.6875rem',
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      letterSpacing: '0.05em',
      background: bg,
      color,
      marginBottom: '0.75rem',
    }}>
      {rating}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function MassageClient() {
  return (
    <div style={{ '--page-accent': 'var(--color-sage-deep)' } as React.CSSProperties & Record<string, string>}>
      <StickyNav
        accentColor="var(--color-sage-deep)"
        sections={[
          { id: 'science', label: 'Science' },
          { id: 'modalities', label: 'Modalities' },
          { id: 'evidence', label: 'Evidence' },
          { id: 'nervous-system', label: 'Nervous System' },
          { id: 'practice', label: 'Practice' },
          { id: 'connection', label: 'Connection' },
        ]}
      />

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <PageHero
        imageSrc="/images/hero-massage.webp"
        backgroundGradient="linear-gradient(160deg, oklch(38% 0.08 155), oklch(28% 0.06 160))"
        eyebrow="The Science of Therapeutic Touch"
        headline="Massage"
        subtitle="From mechanotransduction to polyvagal co-regulation \u2014 how therapeutic touch reshapes fascia, quiets the nervous system, and why the evidence is more nuanced than wellness marketing suggests."
        accentColor="var(--color-sage-mid)"
        anchorLinks={[
          { label: 'Science', href: '#science' },
          { label: 'Modalities', href: '#modalities' },
          { label: 'Evidence', href: '#evidence' },
          { label: 'Nervous System', href: '#nervous-system' },
          { label: 'Practice', href: '#practice' },
          { label: 'Connection', href: '#connection' },
        ]}
      />

      {/* ══════════════════════════════════════════════════════
          2. INTRO QUOTE SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(3.5rem, 7vw, 6rem) max(1.5rem, 8vw)',
          background: `linear-gradient(180deg, var(--color-cream) 0%, color-mix(in srgb, var(--color-sage-light) 8%, var(--color-cream)) 100%)`,
          textAlign: 'center',
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
              margin: '0 0 0.75rem',
            }}
          >
            The Moderate-Pressure Principle
          </p>
          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
              fontStyle: 'italic',
              color: 'var(--color-text)',
              margin: '0 auto 1.25rem',
              maxWidth: '62ch',
              lineHeight: 1.65,
            }}
          >
            &ldquo;Moderate-pressure massage consistently outperforms light pressure across pain,
            anxiety, cortisol reduction, HRV improvement, and immune outcomes &mdash; and
            light-pressure massage can paradoxically increase sympathetic arousal.&rdquo;
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
            &mdash; Field, Touch Research Institute, multiple studies
          </p>
          <p
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-muted)',
              margin: '0 auto',
              maxWidth: '58ch',
              lineHeight: 1.8,
            }}
          >
            This is one of the most replicated and most underappreciated findings in the field.
            It overturns the intuition that gentler is always better &mdash; technique specificity
            and pressure calibration matter more than duration.
          </p>
        </ScrollReveal>

        <SectionDivider />
      </section>

      {/* ══════════════════════════════════════════════════════
          3. SCIENCE OF TOUCH
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
            <SectionIntro label="Mechanisms" title="The Science of Touch">
              Mechanical pressure on tissue is not merely relaxing &mdash; it triggers a cascade
              of molecular events. Mechanotransduction converts physical force into biochemical
              signal within minutes, altering gene expression, fascial viscosity, and neural
              firing patterns simultaneously.
            </SectionIntro>
          </ScrollReveal>

          {/* Science illustration */}
          <ScrollReveal>
            <div style={{ position: 'relative', width: '100%', maxWidth: '800px', aspectRatio: '1', margin: '0 auto 3rem', borderRadius: '2px', overflow: 'hidden' }}>
              <Image
                src="/images/massage-science.webp"
                alt="Watercolor illustration of fibroblast cells connected by integrin proteins within the fascial collagen matrix, showing calcium signaling cascades"
                fill
                sizes="(max-width: 800px) 100vw, 800px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </ScrollReveal>

          {/* First two-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', marginBottom: '3rem' }}>
            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>Mechanotransduction</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                When pressure is applied to tissue, <strong>fibroblasts</strong> &mdash; the primary cells of
                connective tissue &mdash; detect deformation through <strong>integrin proteins</strong> on their
                surface. These integrins span the cell membrane, linking the extracellular matrix (ECM) to
                the internal cytoskeleton. Within minutes of sustained pressure, integrin signaling cascades
                alter <strong>gene expression</strong>: matrix metalloproteinase (MMP) secretion increases,
                facilitating fascial remodeling, while gap junction signaling propagates the mechanical signal
                centimeters from the original contact point.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                This is not a metaphor. A 2012 study by Crane et al. in <em>Science Translational Medicine</em>{' '}
                used muscle biopsies immediately after massage and found measurable changes in
                NF-&kappa;B (the master inflammatory switch) and mitochondrial biogenesis markers &mdash;
                effects distinct from any hormonal or neural pathway.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>The CHA Axis (Proposed, 2025)</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                A December 2025 paper by <strong>Kirkness &amp; Scarlata</strong> (recently proposed — not yet widely replicated) in the
                <em> International Journal of Molecular Sciences</em> proposed the Ca&#178;&#8314;&ndash;Hyaluronan
                (CHA) axis as fascia&rsquo;s molecular switch. Massage-induced pressure activates
                calcium channels &mdash; <strong>Piezo1, TRPV4, and P2Y2</strong> &mdash; triggering
                calcium influx into fascial cells. This calcium signal upregulates HAS2
                (hyaluronan synthase), controlling whether the cell produces
                <strong> high-molecular-weight HA</strong> (lubricating, stabilizing &mdash; &ldquo;Quiet&rdquo;)
                or <strong>low-molecular-weight HA fragments</strong> (pro-inflammatory, remodeling &mdash; &ldquo;Riot&rdquo;).
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                This reframes skilled massage as <em>precision fascial input</em>, not mere relaxation &mdash;
                the therapist is, in effect, programming the tissue&rsquo;s hyaluronan state through
                pressure calibration and duration.
              </p>
            </ScrollReveal>
          </div>

          {/* Second two-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', marginBottom: '3.5rem' }}>
            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>Fascial Thixotropy</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Fascia is a <strong>thixotropic gel</strong>: it transitions from gel to sol (liquid) under
                sustained mechanical input and returns to gel at rest. Under 90&ndash;120 seconds of
                sustained pressure, hyaluronan-rich ground substance shifts viscosity, reducing friction
                between fascial layers and allowing adjacent planes to glide. <strong>Helene Langevin&rsquo;s</strong>{' '}
                research at Harvard demonstrates that fascial stiffness directly impairs
                proprioceptive signaling &mdash; releasing it restores accurate body-position mapping.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                <strong>Fasciacytes</strong> &mdash; a cell type identified in 2018 &mdash; line the internal
                fascial surfaces and actively regulate HA production. They are the biological substrate
                for the thixotropic effect and a primary target of myofascial release technique.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>Neurological Pathways</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Gate control theory (Melzack &amp; Wall, 1965) explains how large-diameter
                <strong> A&beta; fiber</strong> activation from pressure &ldquo;closes the gate&rdquo; to pain signals
                traveling on smaller C fibers. But the more specific pathway is the
                <strong> C-tactile (CT) afferent</strong>: unmyelinated fibers in hairy skin that respond
                maximally to slow stroking (1&ndash;10 cm/s) at skin temperature (~32&deg;C) and
                project to the <em>insular cortex</em> &mdash; not the somatosensory cortex. The insula
                mediates interoception, emotional regulation, and social bonding.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                <strong>Golgi tendon organ (GTO)</strong> autogenic inhibition also operates: sustained
                pressure of &ge;7 seconds triggers the GTO reflex arc, causing local muscle relaxation
                independent of voluntary release. Descending opioid pathways from the periaqueductal
                gray (PAG) and rostral ventromedial medulla (RVM) provide additional pain inhibition.
              </p>
            </ScrollReveal>
          </div>

          {/* StatCards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
            <ScrollReveal>
              <StatCard
                source="Crane et al., 2012 &mdash; Science Translational Medicine"
                stat="Massage reduces NF-\u03baB + boosts mitochondria"
                detail="Muscle biopsies after exercise showed massage reduced the master inflammatory transcription factor while simultaneously activating mitochondrial biogenesis \u2014 a dual effect distinct from hormonal changes."
                accentColor="var(--color-sage-mid)"
                accentTextColor="var(--color-sage-deep)"
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Kirkness & Scarlata, 2025 (proposed) \u2014 Int J Mol Sci"
                stat="The CHA axis: fascia\u2019s molecular switch"
                detail="The Ca\u00b2\u207a\u2013Hyaluronan axis proposes that massage-induced calcium influx controls whether fascial tissue maintains stability (high-MW HA) or enters active remodeling (low-MW HA fragments)."
                accentColor="var(--color-sage-mid)"
                accentTextColor="var(--color-sage-deep)"
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Ackerley et al., 2014 \u2014 J Neuroscience"
                stat="CT afferents peak at 3\u20136 cm/s"
                detail="Microneurography confirmed unmyelinated C-tactile fibers in hairy skin respond maximally to slow stroking at skin temperature \u2014 the exact speed of Swedish effleurage."
                accentColor="var(--color-sage-mid)"
                accentTextColor="var(--color-sage-deep)"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider accentColor="var(--color-sage-mid)" />

      {/* ══════════════════════════════════════════════════════
          4. MODALITIES GUIDE
      ══════════════════════════════════════════════════════ */}
      <section
        id="modalities"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 92%, var(--color-sage-light))`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <SectionIntro label="Modalities" title="The Complete Modalities Guide">
              Eleven major modalities, each with a distinct mechanism, evidence base, and clinical
              application. Choosing correctly matters &mdash; the wrong modality for a nervous
              system condition can increase sympathetic arousal rather than reduce it.
            </SectionIntro>
          </ScrollReveal>

          {/* Modality cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
            {modalities.map((m) => (
              <ScrollReveal key={m.name}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.5rem', height: '100%' }}>
                  <EvidenceBadge rating={m.evidence} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.25rem', fontStyle: 'normal' }}>{m.name}</h3>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontStyle: 'italic', margin: '0 0 0.875rem', letterSpacing: '0.02em' }}>{m.origin}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.7, margin: '0 0 0.75rem' }}>{m.technique}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}><strong style={{ color: 'var(--color-sage-deep)' }}>Pressure:</strong> {m.pressure}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}><strong style={{ color: 'var(--color-sage-deep)' }}>Best for:</strong> {m.bestFor}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}><strong style={{ color: 'var(--color-sage-deep)' }}>Clothing:</strong> {m.clothing} &nbsp;&bull;&nbsp; <strong style={{ color: 'var(--color-sage-deep)' }}>Oil:</strong> {m.oil}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Comparison table */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>Comparison at a Glance</h3>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -0.5rem', padding: '0 0.5rem' }}>
              <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid var(--color-sage-mid)` }}>
                    {['Modality', 'Pressure', 'Clothing', 'Oil', 'Evidence', 'Best For'].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-sage-deep)', padding: '0.75rem 1rem', textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modalities.map((m, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>{m.name}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>{m.pressure}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>{m.clothing}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>{m.oil}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{m.evidence}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{m.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider accentColor="var(--color-sage-mid)" />

      {/* ══════════════════════════════════════════════════════
          5. EVIDENCE
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
            <SectionIntro label="Clinical Evidence" title="What the Evidence Actually Shows">
              The 2024 JAMA Network Open evidence map by <strong>Mak et al.</strong> synthesized
              129 systematic reviews across 13 conditions and found <strong>zero high-certainty
              conclusions</strong> and only seven moderate-certainty findings. This is a methodology
              problem, not a mechanism problem &mdash; the neuroscience and cell biology are
              mechanistically robust.
            </SectionIntro>
          </ScrollReveal>

          {/* Structural problems grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', marginBottom: '3.5rem' }}>
            <ScrollReveal>
              <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.25rem', fontStyle: 'normal' }}>Why Evidence Quality Stays Low</h3>
                <ol style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {[
                    'Blinding is impossible \u2014 recipients always know they received massage',
                    'Sham massage is itself therapeutic (light touch still activates CT afferents)',
                    'Massage is not a single intervention \u2014 duration, pressure, technique, and context vary enormously',
                    'Short follow-up \u2014 most RCTs measure only immediate post-session effects',
                    'Publication bias favors positive findings, inflating apparent effect sizes',
                  ].map((point, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{point}</li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.25rem', fontStyle: 'normal' }}>What This Means</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '1rem' }}>
                  The methodology problem is structural and not easily solvable. It does not mean
                  massage is ineffective &mdash; it means <em>clinical protocol specificity</em> remains
                  uncertain. We know touch works at the cellular and neural level. We are less certain
                  which protocol, pressure, duration, and sequence produces the largest clinical benefit
                  for a specific condition.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                  The neuroscience of mechanotransduction, CT afferents, HRV modulation, and fascial
                  thixotropy is robust and independently replicated. The question is not whether
                  therapeutic touch works &mdash; it is how to dose it precisely.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Consolidated evidence table */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>Consolidated Evidence Map</h3>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -0.5rem', padding: '0 0.5rem', marginBottom: '3.5rem' }}>
              <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid var(--color-sage-mid)` }}>
                    {['Condition', 'Rating', 'Key Source', 'Notes'].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-sage-deep)', padding: '0.75rem 1rem', textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {evidenceRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--color-text)' }}>{row.condition}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <RatingBadge type={row.ratingType} label={row.rating} />
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{row.source}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* StatCards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
            <ScrollReveal>
              <StatCard
                source="Mak et al., 2024 \u2014 JAMA Network Open"
                stat="0 high-certainty conclusions from 129 reviews"
                detail="The largest evidence map of massage for pain found zero high-certainty and only 7 moderate-certainty conclusions across 13 conditions \u2014 a methodology problem, not a mechanism problem."
                accentColor="var(--color-sage-mid)"
                accentTextColor="var(--color-sage-deep)"
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Davis, Alabed & Chico, 2020 \u2014 BMJ Open"
                stat="n=1,012: No performance enhancement"
                detail="The largest meta-analysis found null effects on strength, sprint, jump, and endurance. Only flexibility and DOMS showed small but significant benefit."
                accentColor="var(--color-sage-mid)"
                accentTextColor="var(--color-sage-deep)"
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Field, 2005 \u2014 Touch Research Institute"
                stat="Cortisol \u221231%, Serotonin +28%"
                detail="The classic biochemical signature \u2014 but a 2011 review of 18 RCTs found cortisol effects very small and nonsignificant. The benefits are real; cortisol may not be the mechanism."
                accentColor="var(--color-sage-mid)"
                accentTextColor="var(--color-sage-deep)"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider accentColor="var(--color-sage-mid)" />

      {/* ══════════════════════════════════════════════════════
          6. NERVOUS SYSTEM
      ══════════════════════════════════════════════════════ */}
      <section
        id="nervous-system"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 92%, var(--color-sage-light))`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <SectionIntro label="Neural Pathways" title="Massage and the Nervous System">
              Massage shifts the autonomic balance toward parasympathetic dominance &mdash; measurably
              increasing vagal tone and heart rate variability (HRV). The polyvagal framework (Porges,
              2011) explains how this happens through hierarchical neural circuits, and why the
              practitioner&rsquo;s own nervous system state is a therapeutic variable.
            </SectionIntro>
          </ScrollReveal>

          {/* Nervous system illustration */}
          <ScrollReveal>
            <div style={{ position: 'relative', width: '100%', maxWidth: '480px', aspectRatio: '1', margin: '0 auto 3rem', borderRadius: '2px', overflow: 'hidden' }}>
              <Image
                src="/images/massage-nervous-system.webp"
                alt="Anatomical watercolor of the human nervous system from behind, showing the vagus nerve branching through the torso with C-tactile afferent fibers highlighted in sage and gold"
                fill
                sizes="(max-width: 480px) 100vw, 480px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </ScrollReveal>

          {/* First two-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', marginBottom: '3rem' }}>
            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>Vagal Tone &amp; HRV</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The 2024 <strong>Cavanagh et al.</strong> crossover study found that HRV continued
                rising <em>after</em> the massage session ended &mdash; a delayed parasympathetic rebound
                suggesting that manual therapy primes the vagal brake rather than directly activating it.
                The parasympathetic shift unfolds over hours, not just during treatment.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Lee, Park &amp; Kim (2011) recorded concrete biochemical shifts: cortisol dropped
                from <strong>9.54 to 6.92 nmol/L</strong> and norepinephrine from
                <strong> 190.5 to 132.8 pg/mL</strong> after a single 60-minute massage. These
                changes track the shift from sympathetic mobilization to ventral vagal regulation
                within Porges&rsquo; polyvagal hierarchy.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>C-Tactile Afferents</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The CT afferent system is a dedicated social-touch circuit &mdash; unmyelinated fibers
                in hairy skin that respond optimally to stroking at 1&ndash;10 cm/s at skin temperature
                (~32&deg;C) and project to the <strong>insular cortex</strong>. Unlike A&beta; fibers
                that signal location and intensity, CT fibers signal <em>affective touch quality</em>,
                triggering oxytocin release and interoceptive awareness.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Critically, Schirmer, Croy &amp; Ackerley (2023) showed that CT firing depends on
                <strong> contextual safety signals</strong> &mdash; the same touch from a trusted person
                activates the circuit more than touch from a stranger. Slow warm effleurage activates
                CT; rapid deep friction activates A&beta; gate control. These are different neural routes,
                both therapeutic, serving different clinical purposes.
              </p>
            </ScrollReveal>
          </div>

          {/* Second two-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', marginBottom: '3.5rem' }}>
            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>The MASSAG Model (Proposed Framework)</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The MASSAG (Massage and Allostatic Stabilization through Sensory Afferent Guidance)
                model proposes that repeated safe, pleasant CT-optimal touch provides ongoing
                &ldquo;the body is safe&rdquo; prediction signals that <strong>down-regulate central
                sensitization</strong> through neuroplastic remodeling. This is particularly relevant
                for chronic pain &mdash; where the nervous system has upregulated pain gain in the
                absence of peripheral damage.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Each session is a recalibration signal. The model also posits that massage activates
                <strong> descending pain inhibition</strong> via the PAG/RVM circuit, partly explaining
                why moderate-pressure massage produces analgesic effects exceeding what can be accounted
                for by local tissue changes alone.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>Trauma-Informed Touch</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Touch is not neutral for trauma survivors. The body stores threat memory in
                procedural form; unexpected touch can trigger neuroception of danger and activate
                defensive responses involuntarily. Seven core principles:
              </p>
              <ol style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {[
                  'Informed consent \u2014 explicit, verbal, before every session and area',
                  'Client-directed pressure \u2014 never assume; ask continuously',
                  'Start distal \u2014 feet or hands before torso or head',
                  'Name before touching \u2014 narrate each transition',
                  'Watch for dissociation \u2014 glassy eyes, stillness, non-response',
                  'Post-session grounding \u2014 orient to room, feel feet on floor',
                  'Draping and boundary clarity \u2014 explicit negotiation, not assumption',
                ].map((p, i) => (
                  <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{p}</li>
                ))}
              </ol>
            </ScrollReveal>
          </div>

          {/* Neural Pathway Table */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>Neural Pathway Reference</h3>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -0.5rem', padding: '0 0.5rem' }}>
              <table style={{ width: '100%', minWidth: '640px', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid var(--color-sage-mid)` }}>
                    {['Massage Type', 'Primary Neural Pathway', 'Polyvagal State', 'Key Application'].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-sage-deep)', padding: '0.75rem 1rem', textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {neuralRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>{row.type}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{row.pathway}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{row.state}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{row.application}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider flip accentColor="var(--color-sage-mid)" />

      {/* ══════════════════════════════════════════════════════
          7. SELF-PRACTICE
      ══════════════════════════════════════════════════════ */}
      <section
        id="practice"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <SectionIntro label="Self-Massage" title="Your Self-Practice Toolkit">
              Self-massage with the right tools can replicate many of the fascial, neural, and
              autonomic effects of professional treatment. Evidence for foam rolling and massage
              guns is now moderate-to-strong for DOMS, flexibility, and pre-workout ROM preparation.
              The key variable &mdash; as with professional massage &mdash; is pressure calibration.
            </SectionIntro>
          </ScrollReveal>

          {/* Tools photo */}
          <ScrollReveal>
            <div style={{ position: 'relative', width: '100%', maxWidth: '640px', aspectRatio: '1', margin: '0 auto 3rem', borderRadius: '2px', overflow: 'hidden' }}>
              <Image
                src="/images/massage-tools.webp"
                alt="Self-massage tools arranged on linen: foam roller, gua sha tool, cork peanut tool, and massage ball with eucalyptus sprigs"
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </ScrollReveal>

          {/* Tool comparison table */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>Tool Comparison</h3>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -0.5rem', padding: '0 0.5rem', marginBottom: '3.5rem' }}>
              <table style={{ width: '100%', minWidth: '620px', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid var(--color-sage-mid)` }}>
                    {['Tool', 'Cost', 'Evidence', 'Best For', 'Key Limitation'].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-sage-deep)', padding: '0.75rem 1rem', textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tools.map((t, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>{t.tool}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>{t.cost}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>{t.evidence}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{t.bestFor}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{t.limitation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Protocol cards */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>Self-Massage Protocols</h3>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
            {protocols.map((p) => (
              <ScrollReveal key={p.label}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.5rem', height: '100%' }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-sage-deep)', margin: '0 0 0.25rem' }}>{p.label}</p>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.25rem', fontStyle: 'normal' }}>{p.title}</h4>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-sage-mid)', margin: '0 0 1rem', fontWeight: 500 }}>{p.duration}</p>
                  <ol style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {p.steps.map((step, i) => (
                      <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{step}</li>
                    ))}
                  </ol>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Safety / Contraindications box */}
          <ScrollReveal>
            <InfoCard accentColor="var(--color-sage-deep)">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-sage-deep)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>Critical Safety Contraindications</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B91C1C', margin: '0 0 0.75rem' }}>Absolute Contraindications</p>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {['Deep vein thrombosis (DVT) or blood clots', 'Open wounds, burns, or active skin infection', 'Acute fractures or unstabilized injuries', 'Fever or acute infectious illness', 'Acute organ failure or severe systemic illness', 'Bleeding disorders or anticoagulant therapy', 'Active cancer at site (without oncology clearance)'].map((c, i) => (
                      <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B5010', margin: '0 0 0.75rem' }}>Local Contraindications</p>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {['Varicose veins \u2014 no direct pressure', 'Anterior neck \u2014 avoid carotid sinus', 'Directly over spinal column', 'Acutely inflamed joints (gout, acute arthritis)', 'Areas of numbness or tingling \u2014 reduced sensation = feedback failure'].map((c, i) => (
                      <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{c}</li>
                    ))}
                  </ul>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage-deep)', fontWeight: 600, margin: '1.25rem 0 0', fontFamily: 'var(--font-ui)' }}>
                    Target intensity: 4&ndash;7/10 discomfort. Pain above 7 is counterproductive.
                  </p>
                </div>
              </div>
            </InfoCard>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider flip accentColor="var(--color-sage-mid)" />

      {/* ══════════════════════════════════════════════════════
          8. CONNECTION
      ══════════════════════════════════════════════════════ */}
      <section
        id="connection"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)',
          background: `linear-gradient(160deg, oklch(55% 0.08 155 / 0.18), var(--color-cream))`,
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
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', maxWidth: '54ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              Massage does not exist in isolation &mdash; it is deeply interwoven with breathwork,
              fascial science, nervous system regulation, movement traditions, and contemplative practice.
            </p>
          </ScrollReveal>

          {/* Cross-link cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem', marginBottom: '3.5rem' }}>
            {crossLinks.map((c) => (
              <ScrollReveal key={c.href}>
                <Link href={c.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.5rem', transition: 'border-color 300ms ease' }}>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-sage-deep)', margin: '0 0 0.5rem' }}>{c.label}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* More practices — only pages not already shown as descriptive cards */}
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>More Practices</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              {[
                { href: '/float', label: 'Float' },
                { href: '/wim-hof', label: 'Wim Hof' },
                { href: '/reflexology', label: 'Reflexology' },
                { href: '/taichi', label: 'Tai Chi' },
                { href: '/trauma', label: 'Trauma' },
                { href: '/nutrition', label: 'Nutrition' },
                { href: '/nature', label: 'Nature' },
                { href: '/fasting', label: 'Fasting' },
                { href: '/practice', label: 'Practice' },
                { href: '/manifest', label: 'Manifest' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--color-sage-deep)',
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    border: `1px solid var(--color-sage-mid)`,
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
