'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';
import StatCard from '@/components/StatCard';

// ── Rose accent tokens (Nervous System) ────────────────────────
const ROSE_DEEP  = '#8B3A62';
const ROSE_MID   = '#985575';
const ROSE_LIGHT = '#E8B4CF';
const ROSE_PALE  = '#F5E0EC';

// ── Technique Accordion ────────────────────────────────────────
interface TechniqueData {
  id: string;
  name: string;
  tradition: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  steps: string[];
}

function levelColor(level: TechniqueData['level']) {
  if (level === 'Beginner') return { bg: `color-mix(in srgb, ${ROSE_LIGHT} 30%, var(--color-cream))`, text: ROSE_DEEP };
  if (level === 'Intermediate') return { bg: 'color-mix(in srgb, var(--color-amber-light) 25%, var(--color-cream))', text: 'var(--color-amber-deep)' };
  return { bg: 'color-mix(in srgb, var(--color-violet-mid) 25%, var(--color-cream))', text: 'var(--color-violet-deep)' };
}

function TechniqueItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: TechniqueData;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const lc = levelColor(item.level);
  return (
    <div
      id={item.id}
      style={{
        background: 'var(--color-surface-raised)',
        border: `1px solid ${isOpen ? ROSE_MID : 'var(--color-border)'}`,
        borderRadius: '2px',
        overflow: 'hidden',
        transition: 'border-color 300ms ease',
        marginBottom: '0.875rem',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              minWidth: '1.5rem',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: isOpen ? ROSE_DEEP : 'var(--color-text)',
              margin: 0,
              fontStyle: 'normal',
              transition: 'color 300ms ease',
            }}
          >
            {item.name}
          </h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                background: lc.bg,
                fontFamily: 'var(--font-ui)',
                fontSize: '0.625rem',
                fontWeight: 500,
                color: lc.text,
                letterSpacing: '0.05em',
              }}
            >
              {item.level}
            </span>
            <span
              style={{
                display: 'inline-block',
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                background: 'var(--color-linen)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.625rem',
                fontWeight: 500,
                color: 'var(--color-text-muted)',
              }}
            >
              {item.duration}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              fontStyle: 'italic',
              color: 'var(--color-text-muted)',
            }}
          >
            {item.tradition}
          </span>
        </div>
        <div
          style={{
            flexShrink: 0,
            color: 'var(--color-text-muted)',
            transition: 'transform 300ms ease',
            transform: isOpen ? 'rotate(180deg)' : 'none',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div
          style={{
            padding: '0 1.5rem 1.5rem',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'var(--color-text)',
              margin: '1.25rem 0 1.5rem',
              lineHeight: 1.8,
            }}
          >
            {item.description}
          </p>

          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: ROSE_DEEP,
              margin: '0 0 0.875rem',
            }}
          >
            How to practice
          </p>
          <ol
            style={{
              margin: 0,
              padding: '0 0 0 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {item.steps.map((step, i) => (
              <li
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                }}
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function CategoryBlock({
  label,
  subtitle,
  techniques,
  openTechnique,
  onToggle,
  baseIndex,
}: {
  label: string;
  subtitle: string;
  techniques: TechniqueData[];
  openTechnique: string | null;
  onToggle: (id: string) => void;
  baseIndex: number;
}) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: ROSE_MID,
            margin: '0 0 0.25rem',
          }}
        >
          {subtitle}
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.625rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: 0,
            fontStyle: 'normal',
          }}
        >
          {label}
        </h3>
      </div>
      {techniques.map((t, i) => (
        <TechniqueItem
          key={t.id}
          item={t}
          isOpen={openTechnique === t.id}
          onToggle={() => onToggle(t.id)}
          index={baseIndex + i}
        />
      ))}
    </div>
  );
}

// ── Eye Exercise Card ──────────────────────────────────────────
function EyeExerciseCard({
  title,
  description,
  isOpen,
  onToggle,
}: {
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        background: 'var(--color-surface-raised)',
        border: `1px solid ${isOpen ? ROSE_MID : 'var(--color-border)'}`,
        borderRadius: '2px',
        overflow: 'hidden',
        transition: 'border-color 300ms ease',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.125rem',
            fontWeight: 600,
            color: isOpen ? ROSE_DEEP : 'var(--color-text)',
            margin: 0,
            fontStyle: 'normal',
            transition: 'color 300ms ease',
          }}
        >
          {title}
        </h3>
        <div
          style={{
            flexShrink: 0,
            color: 'var(--color-text-muted)',
            transition: 'transform 300ms ease',
            transform: isOpen ? 'rotate(180deg)' : 'none',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'var(--color-text)',
              margin: '1.25rem 0 0',
              lineHeight: 1.8,
            }}
          >
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Polyvagal State Card ───────────────────────────────────────
function StateCard({
  title,
  subtitle,
  description,
  indicators,
  accentColor,
  bgColor,
}: {
  title: string;
  subtitle: string;
  description: string;
  indicators: string[];
  accentColor: string;
  bgColor: string;
}) {
  return (
    <div
      style={{
        background: bgColor,
        borderTop: `3px solid ${accentColor}`,
        borderRadius: '2px',
        padding: '2rem 1.75rem',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: accentColor,
          margin: '0 0 0.5rem',
        }}
      >
        {subtitle}
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.375rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: '0 0 0.875rem',
          fontStyle: 'normal',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
          color: 'var(--color-text-muted)',
          margin: '0 0 1.25rem',
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {indicators.map((ind, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              padding: '0.2rem 0.65rem',
              borderRadius: '9999px',
              background: `color-mix(in srgb, ${accentColor} 15%, var(--color-cream))`,
              fontFamily: 'var(--font-ui)',
              fontSize: '0.625rem',
              fontWeight: 500,
              color: accentColor,
              letterSpacing: '0.03em',
            }}
          >
            {ind}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Technique Data ─────────────────────────────────────────────
const respiratoryTechniques: TechniqueData[] = [
  {
    id: 'diaphragmatic',
    name: 'Slow Diaphragmatic Breathing',
    tradition: 'Pranayama / Clinical',
    duration: '5–10 min',
    level: 'Beginner',
    description: 'Breathing at 5–6 breaths per minute maximizes respiratory sinus arrhythmia (RSA) — the natural rhythm where heart rate rises on inhale and drops on exhale. This is the single most accessible way to increase vagal tone.',
    steps: [
      'Find a comfortable seated or reclined position.',
      'Inhale slowly through the nose for 4 counts, expanding the belly.',
      'Exhale slowly through the nose for 6 counts, letting the belly fall.',
      'Maintain a rhythm of 5–6 breaths per minute.',
      'Practice for 5–10 minutes daily, ideally upon waking.',
    ],
  },
  {
    id: 'om-chanting',
    name: 'OM Chanting',
    tradition: 'Vedic Tradition',
    duration: '5–15 min',
    level: 'Beginner',
    description: 'A landmark 2011 fMRI study (Kalyani et al.) showed that OM chanting produces significant limbic deactivation similar in pattern to effects observed in vagus nerve stimulation studies — though the Kalyani study compared OM to a silent control, not directly to VNS — driven by auricular and pharyngeal vibration.',
    steps: [
      'Sit upright with eyes closed.',
      'Inhale deeply through the nose.',
      'Exhale slowly producing "OM" — spend 75% of the exhale on the "M" humming.',
      'Feel the vibration in your chest, throat, and skull.',
      'Repeat for 7–21 rounds.',
    ],
  },
  {
    id: 'humming',
    name: 'Humming (Bhramari Pranayama)',
    tradition: 'Yogic Pranayama',
    duration: '3–5 min',
    level: 'Beginner',
    description: 'The "bee breath" increases nasal nitric oxide production by 15-fold and sends vibrations directly through the vagus nerve. One of the simplest and most immediately calming techniques.',
    steps: [
      'Close your eyes and plug your ears gently with your thumbs.',
      'Inhale deeply through the nose.',
      'Exhale with a steady, resonant humming sound.',
      'Feel the vibration filling your skull and sinuses.',
      'Repeat for 5–10 rounds.',
    ],
  },
  {
    id: 'singing',
    name: 'Singing or Group Chanting',
    tradition: 'Universal',
    duration: 'Any',
    level: 'Beginner',
    description: 'Singing activates the pharyngeal plexus — the vagal nerve network in the throat — and when done in groups, adds the powerful vagal boost of social co-regulation. This is why choirs and kirtan feel so good.',
    steps: [
      'Choose a song, hymn, or mantra you enjoy.',
      'Sing from the diaphragm, not the throat.',
      'Focus on sustained vowel sounds for maximum vagal vibration.',
      'Practice with others when possible for co-regulation.',
    ],
  },
  {
    id: 'gargling',
    name: 'Gargling',
    tradition: 'Clinical',
    duration: '1–2 min',
    level: 'Beginner',
    description: 'Vigorous gargling directly stimulates the pharyngeal branch of the vagus nerve. It sounds unglamorous, but this is one of the fastest ways to "wake up" a dormant vagus.',
    steps: [
      'Take a large sip of water.',
      'Tilt your head back.',
      'Gargle vigorously for 30 seconds — it should feel effortful.',
      'Repeat 3–4 times.',
      'Practice morning and evening.',
    ],
  },
  {
    id: 'valsalva',
    name: 'Valsalva Maneuver',
    tradition: 'Clinical Cardiology',
    duration: '30 sec',
    level: 'Intermediate',
    description: 'By bearing down with a closed airway, you modulate intrathoracic pressure to trigger reflex bradycardia — a vagally-mediated slowing of the heart. Used clinically to terminate arrhythmias.',
    steps: [
      'Take a deep breath in.',
      'Close your mouth and pinch your nose.',
      'Bear down as if straining (like blowing up a balloon).',
      'Hold for 10–15 seconds.',
      'Release and breathe normally — notice the heart rate shift.',
    ],
  },
  {
    id: 'laughter',
    name: 'Laughter',
    tradition: 'Universal',
    duration: 'Any',
    level: 'Beginner',
    description: 'Genuine laughter engages the diaphragm, larynx, and the ventral vagal social engagement circuits simultaneously. It produces measurable shifts in cortisol, endorphins, and vagal tone.',
    steps: [
      'Watch something genuinely funny.',
      'Try laughter yoga — start with forced laughter.',
      'Let it become authentic (the body doesn\'t distinguish).',
      'Notice the deep belly engagement.',
      'Allow the social connection to deepen the effect.',
    ],
  },
];

const thermalTechniques: TechniqueData[] = [
  {
    id: 'cold-face',
    name: 'Cold Face Immersion',
    tradition: 'Mammalian Dive Reflex',
    duration: '30–60 sec',
    level: 'Intermediate',
    description: 'Triggers the mammalian dive reflex via the trigeminal nerve, causing immediate vagally-mediated bradycardia. Heart rate drops within seconds. The most dramatic acute vagal response available.',
    steps: [
      'Fill a bowl with cold water and ice.',
      'Submerge your forehead, cheeks, and temples (not mouth/nose).',
      'Hold for 30–60 seconds.',
      'Feel your heart rate drop within seconds.',
      'Pat dry and rest — notice the calm.',
    ],
  },
  {
    id: 'cold-showers',
    name: 'Cold Showers & Plunges',
    tradition: 'Wim Hof / Nordic',
    duration: '1–3 min',
    level: 'Intermediate',
    description: 'Systemic cold exposure activates Brown Adipose Tissue (BAT) and the vagally-mediated dive reflex. Over time, it builds profound autonomic resilience — the ability to stay calm under physiological stress.',
    steps: [
      'End your regular shower with 30 seconds of cold water.',
      'Build to 1–3 minutes over weeks.',
      'Focus on slow exhales during the cold.',
      'Let the shiver response happen — don\'t fight it.',
      'Track your tolerance progression over time.',
    ],
  },
  {
    id: 'yoga-inversions',
    name: 'Yoga Inversions',
    tradition: 'Hatha / Kundalini Yoga',
    duration: '5–15 min',
    level: 'Intermediate',
    description: 'Inversions alter baroreceptor pressure in the carotid arteries and aortic arch, triggering reflexive vagal outflow. They also decompress the vagus nerve as it passes through the cervical spine.',
    steps: [
      'Start with legs-up-the-wall pose (viparita karani).',
      'Progress to supported shoulder stand when comfortable.',
      'Hold for 5–15 breaths minimum.',
      'Come down slowly — never rush out of inversions.',
      'Rest in savasana for integration.',
    ],
  },
  {
    id: 'fascial-bodywork',
    name: 'Fascial Bodywork',
    tradition: 'Myofascial Release',
    duration: '10–20 min',
    level: 'Beginner',
    description: 'Fascia contains millions of nerve endings — making it one of the body\'s richest sensory organs. Releasing cervical and diaphragmatic fascia mechanically frees vagal signaling pathways that have become restricted through chronic tension and trauma.',
    steps: [
      'Focus on neck and jaw fascia first (where the vagus passes).',
      'Use slow, sustained pressure — hold for 90+ seconds per spot.',
      'Target the diaphragm and psoas next.',
      'Combine with deep breathing for amplified effect.',
      'Notice emotional releases as normal — fascia stores tension.',
    ],
  },
  {
    id: 'auricular-massage',
    name: 'Auricular Massage',
    tradition: 'Traditional Chinese Medicine',
    duration: '2–5 min',
    level: 'Beginner',
    description: 'The cymba conchae of the ear is the only place the vagus nerve surfaces directly on the skin. Massaging this area provides direct, non-invasive vagal stimulation.',
    steps: [
      'Gently massage the outer ear rim.',
      'Focus on the inner bowl of the ear (conchae).',
      'Use small circular pressure for 30 seconds per area.',
      'Massage both ears simultaneously.',
      'Practice during stress for immediate relief.',
    ],
  },
  {
    id: 'auricular-acupuncture',
    name: 'Auricular Acupuncture',
    tradition: 'Traditional Chinese Medicine',
    duration: 'Varies',
    level: 'Advanced',
    description: 'Clinical auricular acupuncture targets the Shen Men and conchae points to stimulate the auricular branch of the vagus nerve. Research shows significant effects on HRV and inflammatory markers.',
    steps: [
      'Seek a trained acupuncturist experienced in auricular therapy.',
      'Primary target: the Shen Men (Spirit Gate) point.',
      'Secondary target: the cymba conchae.',
      'Sessions are typically 20–30 minutes.',
      'Ear seeds can provide sustained stimulation between sessions.',
    ],
  },
  {
    id: 'carotid-massage',
    name: 'Carotid Sinus Massage',
    tradition: 'Clinical Cardiology',
    duration: '30 sec',
    level: 'Intermediate',
    description: 'Gentle pressure on the carotid sinus triggers baroreceptor-mediated vagal outflow, reflexively slowing the heart. Used clinically to manage certain heart rhythm disorders.',
    steps: [
      'Locate the carotid pulse just below the jawline.',
      'Apply very gentle circular pressure — never forceful.',
      'Massage one side at a time only (never both simultaneously).',
      'Continue for 10–15 seconds.',
      'Stop immediately if you feel dizzy or lightheaded.',
    ],
  },
];

const cognitiveTechniques: TechniqueData[] = [
  {
    id: 'meditation',
    name: 'Meditation & Mindfulness',
    tradition: 'Buddhist / Secular',
    duration: '10–20 min',
    level: 'Beginner',
    description: 'Meditation works top-down: the prefrontal cortex sends inhibitory signals to the amygdala via the vagus nerve. Regular practice measurably increases baseline vagal tone and HRV over 8 weeks.',
    steps: [
      'Sit comfortably with eyes closed or softly focused.',
      'Bring attention to your breath or body sensations.',
      'When thoughts arise, notice them without following.',
      'Return attention gently — this IS the practice.',
      'Start with 10 minutes and build from there.',
    ],
  },
  {
    id: 'prayer',
    name: 'Prayer & Devotional Practice',
    tradition: 'Multi-Faith',
    duration: '5–20 min',
    level: 'Beginner',
    description: 'Rhythmic recitation of prayers spontaneously slows breathing to approximately 0.1 Hz (6 breaths per minute) — the exact resonance frequency for maximum vagal efficiency. The rosary and Buddhist chanting both hit this rate.',
    steps: [
      'Choose a prayer, mantra, or devotional text.',
      'Recite slowly and rhythmically.',
      'Notice how the breath naturally slows.',
      'Allow the contemplative state to deepen.',
      'Practice at consistent times daily for the strongest effect.',
    ],
  },
  {
    id: 'awe-nature',
    name: 'Awe & Nature Exposure',
    tradition: 'Ecopsychology',
    duration: '15–30 min',
    level: 'Beginner',
    description: 'Experiences of awe activate the anterior insula and anterior cingulate cortex, producing measurable increases in vagal tone. Nature immersion adds grounding via bare-foot electron transfer.',
    steps: [
      'Spend time in natural settings — forest, ocean, mountains.',
      'Look up at trees, stars, or open sky.',
      'Allow a sense of wonder and smallness.',
      'Walk slowly without destination or agenda.',
      'Leave your phone behind or on silent.',
    ],
  },
  {
    id: 'social-connection',
    name: 'Social Connection & Eye Contact',
    tradition: 'Social Neuroscience',
    duration: 'Varies',
    level: 'Beginner',
    description: 'The ventral vagal system IS the social engagement system. Genuine eye contact, physical touch, and shared laughter trigger oxytocin release, which directly increases vagal tone — creating a positive feedback loop.',
    steps: [
      'Make genuine eye contact during conversations.',
      'Practice co-regulation with trusted people.',
      'Engage in physical touch — hugging, hand-holding.',
      'Share meals and laughter with others.',
      'Prioritize in-person connection over digital.',
    ],
  },
  {
    id: 'probiotics',
    name: 'Probiotics & Gut Health',
    tradition: 'Microbiome Science',
    duration: 'Ongoing',
    level: 'Beginner',
    description: 'Approximately 95% of the body\'s serotonin is produced in the gut, though gut-derived serotonin does not directly cross the blood-brain barrier. Microbiome signals travel to the brain via vagal afferents. The gut-brain axis is not a metaphor — it is a physical vagal nerve highway.',
    steps: [
      'Include fermented foods daily — yogurt, kimchi, sauerkraut, kefir.',
      'Consider targeted probiotic strains (Lactobacillus rhamnosus shown to affect GABA).',
      'Reduce processed food and refined sugar.',
      'Eat diverse plant fibers to feed beneficial bacteria.',
      'Monitor digestive patterns as feedback on vagal health.',
    ],
  },
];

// ── Eye Movement Data ──────────────────────────────────────────
const eyeExercises = [
  {
    id: 'emdr',
    title: 'EMDR Bilateral Eye Movements',
    description: 'Eye Movement Desensitization and Reprocessing uses horizontal saccades to mimic the forward-motion optic flow that signals safety to the brain. This triggers memory reconsolidation and measurable amygdala de-potentiation — reducing the emotional charge of traumatic memories without re-living them.',
  },
  {
    id: 'panoramic',
    title: 'Panoramic Vision Toggle (Huberman)',
    description: 'Dr. Andrew Huberman\'s research shows that tunnel vision (vergence) activates sympathetic arousal, while deliberately softening the gaze to a wide, panoramic field instantly engages the parasympathetic system. Practice by looking straight ahead, then expanding awareness to your peripheral vision without moving your eyes.',
  },
  {
    id: 'optic-flow',
    title: 'Optic Flow Walking',
    description: 'When you walk forward, the visual field streams laterally past you — this "optic flow" generates signals that suppress the amygdala. Studies show 5 minutes of outdoor walking with attention on this lateral flow produces measurable reductions in anxiety markers, likely through combined effects of bilateral movement, visual processing load, and autonomic regulation.',
  },
  {
    id: 'lateral',
    title: 'Lateral Eye Movements',
    description: 'Slow, deliberate side-to-side eye scanning (without moving the head) stretches the extraocular muscles and signals safety to the brainstem. This is the mechanism underlying EMDR and is used in somatic experiencing therapy to discharge stored survival energy.',
  },
  {
    id: 'trataka',
    title: 'Trataka (Candle Gazing)',
    description: 'An ancient yogic practice of steady gazing at a single point (traditionally a candle flame). Trataka quiets the default mode network — the brain\'s rumination engine — and improves cognitive flexibility. Gaze without blinking until eyes water, then close eyes and visualize the afterimage.',
  },
  {
    id: 'vor',
    title: 'VOR (Vestibular-Ocular Reflex) Exercises',
    description: 'The vestibular-ocular reflex stabilizes your gaze during head movement. Training this reflex integrates the vestibular-vagal pathways. Practice by fixing your gaze on a target while slowly turning your head side to side, then up and down. This is used in vestibular rehabilitation and concussion recovery.',
  },
  {
    id: 'salamander',
    title: 'The Full Salamander',
    description: 'Developed from Stanley Rosenberg\'s work on the ventral vagal system: lie on your back, interlace fingers behind your head, and slowly look as far right as possible (eyes only, head still). Hold until you spontaneously sigh, yawn, or swallow — these are autonomic release signals. Repeat to the left. Then slowly turn the head to follow the eyes on each side. This releases vagal tension stored in the cervical spine.',
  },
];

// ════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ════════════════════════════════════════════════════════════════
export default function NervousSystemClient() {
  const [openTechnique, setOpenTechnique] = useState<string | null>(null);
  const [openExercise, setOpenExercise] = useState<string | null>(null);

  const toggleTechnique = (id: string) =>
    setOpenTechnique(prev => (prev === id ? null : id));
  const toggleExercise = (id: string) =>
    setOpenExercise(prev => (prev === id ? null : id));

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '85dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(3rem, 8vw, 6rem) max(1.5rem, 8vw) clamp(4rem, 8vw, 7rem)',
          background: 'linear-gradient(160deg, oklch(55% 0.14 340), oklch(82% 0.08 350))',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/hero-nervous-system.webp"
            alt="Abstract watercolor illustration of the nervous system"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.35 }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(139,58,98,0.7) 0%, rgba(139,58,98,0.15) 50%, transparent 100%)',
            zIndex: 1,
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px' }}>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: ROSE_LIGHT,
              margin: '0 0 1rem',
            }}
          >
            The meta-layer
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
              fontWeight: 700,
              color: '#F5EAE1',
              lineHeight: 1.05,
              margin: '0 0 1.5rem',
            }}
          >
            The Nervous System
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.75rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(245,234,225,0.85)',
              margin: '0 0 2rem',
              lineHeight: 1.45,
              maxWidth: '58ch',
            }}
          >
            The Root of Every Practice
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1.3vw, 1.0625rem)',
              color: 'rgba(245,234,225,0.75)',
              margin: 0,
              lineHeight: 1.75,
              maxWidth: '60ch',
            }}
          >
            While meditation, yoga, breathwork, and fascia release may look like different disciplines, they all share a single biological target: the autonomic nervous system. The master regulator of this system is the vagus nerve — and understanding it changes everything.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SCIENCE STATS
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw)',
          background: 'var(--color-cream)',
        }}
      >
        <ScrollReveal group>
          <div
            style={{
              maxWidth: '1100px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            <StatCard
              source="Vagus Nerve Anatomy"
              stat="80% of vagal fibers are afferent"
              detail="The vagus is primarily a listening system — body-to-brain signals explain why somatic practices alter mental states."
              url="https://pmc.ncbi.nlm.nih.gov/articles/PMC9131189/"
              accentColor={ROSE_MID}
              accentTextColor={ROSE_DEEP}
            />
            <StatCard
              source="Kalyani et al., 2011 (fMRI)"
              stat="OM chanting — limbic deactivation pattern similar to VNS studies"
              detail="Limbic deactivation from chanting was similar in pattern to effects observed in vagus nerve stimulation studies — though the Kalyani study compared OM to a silent control, not directly to VNS — driven by auricular vibration."
              url="https://pubmed.ncbi.nlm.nih.gov/21146224/"
              accentColor={ROSE_MID}
              accentTextColor={ROSE_DEEP}
            />
            <StatCard
              source="Dr. Kevin Tracey — Cholinergic Pathway"
              stat="Vagal tone plays a significant role in regulating inflammation"
              detail="Low vagal tone correlates with chronic inflammation (Tracey, 2002), though the relationship in humans remains an active area of research. Building tone supports anti-inflammatory signaling pathways."
              url="https://pubmed.ncbi.nlm.nih.gov/15922555/"
              accentColor={ROSE_MID}
              accentTextColor={ROSE_DEEP}
            />
            <StatCard
              source="Kox et al., 2014 (PNAS)"
              stat="Wim Hof subjects suppressed TNF-α by ~50%"
              detail="Through breathing alone, trained subjects voluntarily controlled their immune response to endotoxin injection."
              url="https://pubmed.ncbi.nlm.nih.gov/24799686/"
              accentColor={ROSE_MID}
              accentTextColor={ROSE_DEEP}
            />
          </div>
        </ScrollReveal>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          01 — VAGUS NERVE ANATOMY
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div className="section-label" style={{ marginBottom: '2.5rem', color: ROSE_DEEP }}>
          01 — The Wandering Nerve
        </div>

        <ScrollReveal>
          <div style={{ maxWidth: '780px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <Image
                src="/images/icon-vagus.webp"
                alt="Sumi-e illustration of the vagus nerve"
                width={80}
                height={80}
                style={{ borderRadius: '4px', flexShrink: 0 }}
              />
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 1.25rem',
                    fontStyle: 'normal',
                  }}
                >
                  Vagus Nerve Anatomy
                </h2>
              </div>
            </div>

            <p style={{ margin: '0 0 1.5rem' }}>
              The vagus nerve (Cranial Nerve X) is the longest cranial nerve in the body. It originates in the brainstem&apos;s medulla oblongata and &ldquo;wanders&rdquo; through the throat, chest, and abdomen — the Latin <em>vagus</em> means &ldquo;wandering.&rdquo; It touches nearly every major organ.
            </p>

            <div style={{ margin: '2.5rem 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <img
                src="/images/illustrations/nervous-system-vagus-nerve.jpg"
                alt="The vagus nerve pathway from brainstem through throat, heart, lungs, diaphragm, and gut"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.375rem',
                fontWeight: 600,
                color: ROSE_DEEP,
                margin: '0 0 1rem',
                fontStyle: 'normal',
              }}
            >
              The 80% Afferent Reality
            </h3>
            <p style={{ margin: '0 0 1.5rem' }}>
              Here is the single most important fact about the vagus: <strong>80% of its fibers are afferent</strong> — meaning they carry signals <em>from the body to the brain</em>, not the other way around. The vagus is primarily a listening system. This is why bottom-up somatic practices (breath, movement, fascia work) can fundamentally alter top-down brain states like anxiety, depression, and rumination.
            </p>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.375rem',
                fontWeight: 600,
                color: ROSE_DEEP,
                margin: '0 0 1rem',
                fontStyle: 'normal',
              }}
            >
              Two Branches
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  background: `color-mix(in srgb, ${ROSE_PALE} 50%, var(--color-cream))`,
                  borderLeft: `3px solid ${ROSE_MID}`,
                  borderRadius: '2px',
                  padding: '1.5rem',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 0.75rem',
                    fontStyle: 'normal',
                  }}
                >
                  Ventral Vagus
                </h4>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>
                  Myelinated, mammalian, and fast. Governs the <strong>social engagement system</strong> — facial expressions, vocal prosody, calm connection. This is the &ldquo;safety&rdquo; branch.
                </p>
              </div>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  borderLeft: '3px solid var(--color-border)',
                  borderRadius: '2px',
                  padding: '1.5rem',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 0.75rem',
                    fontStyle: 'normal',
                  }}
                >
                  Dorsal Vagus
                </h4>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>
                  Unmyelinated, ancient, and slower. Governs visceral digestion in safe states, but triggers <strong>freeze/shutdown/collapse</strong> under extreme threat. The &ldquo;playing dead&rdquo; response.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          02 — POLYVAGAL THEORY
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: `linear-gradient(180deg, var(--color-cream) 0%, color-mix(in srgb, ${ROSE_PALE} 20%, var(--color-cream)) 100%)`,
        }}
      >
        <div className="section-label" style={{ marginBottom: '2.5rem', color: ROSE_DEEP }}>
          02 — Polyvagal Theory
        </div>

        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
                fontStyle: 'normal',
              }}
            >
              Three States of the Nervous System
            </h2>
            <p style={{ margin: '0 0 0.5rem' }}>
              Developed by Dr. Stephen Porges, Polyvagal Theory maps the autonomic nervous system into three hierarchical states. Your nervous system cycles through these states constantly — and understanding them is the key to regulation.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal group>
          <div
            style={{
              maxWidth: '1100px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem',
            }}
          >
            <StateCard
              title="Ventral Vagal"
              subtitle="Safe & Social"
              description="The optimal state. You feel calm, connected, curious, and engaged. The social engagement system is online — facial expressions are animated, voice has natural prosody, eye contact feels easy. This is the window of tolerance."
              indicators={['Calm', 'Connected', 'Curious', 'Creative', 'Compassionate']}
              accentColor="#2D7A4A"
              bgColor="color-mix(in srgb, #2D7A4A 8%, var(--color-surface-raised))"
            />
            <StateCard
              title="Sympathetic"
              subtitle="Fight or Flight"
              description="Mobilized for danger. Heart rate increases, breathing quickens, muscles tense. Useful for genuine threats, but chronic activation leads to anxiety, irritability, insomnia, and burnout."
              indicators={['Anxiety', 'Anger', 'Restlessness', 'Hypervigilance', 'Panic']}
              accentColor="var(--color-amber-deep)"
              bgColor="color-mix(in srgb, var(--color-amber-light) 10%, var(--color-surface-raised))"
            />
            <StateCard
              title="Dorsal Vagal"
              subtitle="Freeze & Shutdown"
              description="The oldest survival response. When fight/flight fails, the system collapses into immobilization. Dissociation, numbness, depression, chronic fatigue, and the feeling of &lsquo;checking out&rsquo; all live here."
              indicators={['Numbness', 'Dissociation', 'Fatigue', 'Depression', 'Collapse']}
              accentColor="#7A7A8A"
              bgColor="var(--color-surface-raised)"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{ margin: '2.5rem 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <img
              src="/images/illustrations/nervous-system-polyvagal-ladder.jpg"
              alt="The polyvagal ladder — ventral vagal safe state, sympathetic fight-or-flight, and dorsal vagal shutdown"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{ maxWidth: '780px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.375rem',
                fontWeight: 600,
                color: ROSE_DEEP,
                margin: '0 0 1rem',
                fontStyle: 'normal',
              }}
            >
              Neuroception
            </h3>
            <p style={{ margin: '0 0 1.5rem' }}>
              Porges coined this term for the nervous system&apos;s subconscious, pre-cortical scanning of the environment for safety or threat. <strong>Neuroception shifts your physiological state before your conscious brain is even aware.</strong> This is why you can feel unsafe in a perfectly safe room, or why a trusted voice can calm you before you understand the words.
            </p>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.375rem',
                fontWeight: 600,
                color: ROSE_DEEP,
                margin: '0 0 1rem',
                fontStyle: 'normal',
              }}
            >
              The Window of Tolerance
            </h3>
            <p style={{ margin: 0 }}>
              The window of tolerance is the optimal zone of arousal where you can function effectively, process information, and respond flexibly. Every technique on this page works to <strong>expand this window</strong> — preventing the system from tipping into hyperarousal (panic) or hypoarousal (freeze). A wider window means greater resilience.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          03 — 19 STIMULATION TECHNIQUES
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div className="section-label" style={{ marginBottom: '2.5rem', color: ROSE_DEEP }}>
          03 — The Toolkit
        </div>

        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
                fontStyle: 'normal',
              }}
            >
              19 Natural Vagus Nerve Stimulation Techniques
            </h2>
            <p style={{ margin: 0 }}>
              Organized by physiological pathway, these 19 techniques form the complete toolkit for nervous system regulation. Each one stimulates the vagus nerve through a different mechanism — respiratory, thermal, somatic, cognitive, or enteric. Start with what feels accessible and build from there.
            </p>
          </div>
        </ScrollReveal>

        <div style={{ maxWidth: '780px' }}>
          <CategoryBlock
            label="Respiratory & Vocal"
            subtitle="Laryngeal / Pharyngeal Branches"
            techniques={respiratoryTechniques}
            openTechnique={openTechnique}
            onToggle={toggleTechnique}
            baseIndex={0}
          />
          <CategoryBlock
            label="Thermal & Somatic"
            subtitle="Trigeminal & Fascial Pathways"
            techniques={thermalTechniques}
            openTechnique={openTechnique}
            onToggle={toggleTechnique}
            baseIndex={7}
          />
          <CategoryBlock
            label="Cognitive, Visual & Gut"
            subtitle="Top-Down & Enteric Pathways"
            techniques={cognitiveTechniques}
            openTechnique={openTechnique}
            onToggle={toggleTechnique}
            baseIndex={14}
          />
        </div>
      </section>

      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          04 — EYE MOVEMENT EXERCISES
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: `linear-gradient(180deg, var(--color-cream) 0%, color-mix(in srgb, ${ROSE_PALE} 15%, var(--color-cream)) 100%)`,
        }}
      >
        <div className="section-label" style={{ marginBottom: '2.5rem', color: ROSE_DEEP }}>
          04 — Eyes as Brain Portals
        </div>

        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <Image
                src="/images/icon-eye.webp"
                alt="Sumi-e illustration of an eye"
                width={80}
                height={80}
                style={{ borderRadius: '4px', flexShrink: 0 }}
              />
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 1.25rem',
                    fontStyle: 'normal',
                  }}
                >
                  Eye Movement Exercises
                </h2>
              </div>
            </div>
            <p style={{ margin: 0 }}>
              Your eyes are not just sense organs — they are extruded brain tissue. The retina is literally part of the central nervous system. Moving your eyes directly alters your autonomic state, which is why EMDR, optic flow, and trataka all produce measurable shifts in nervous system regulation.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div
            style={{
              maxWidth: '780px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.875rem',
            }}
          >
            {eyeExercises.map((ex) => (
              <EyeExerciseCard
                key={ex.id}
                title={ex.title}
                description={ex.description}
                isOpen={openExercise === ex.id}
                onToggle={() => toggleExercise(ex.id)}
              />
            ))}
          </div>
        </ScrollReveal>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          05 — THE WIM HOF METHOD
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div className="section-label" style={{ marginBottom: '2.5rem', color: ROSE_DEEP }}>
          05 — The Wim Hof Method
        </div>

        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
                fontStyle: 'normal',
              }}
            >
              Cold, Breath & Commitment
            </h2>
            <p style={{ margin: '0 0 1.5rem' }}>
              The Wim Hof Method (WHM) combines three pillars to build extreme autonomic resilience. It is arguably the most potent vagus nerve training protocol available — backed by peer-reviewed research from Radboud University.
            </p>
          </div>
        </ScrollReveal>

        {/* Three Pillars */}
        <ScrollReveal group>
          <div
            style={{
              maxWidth: '1100px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem',
            }}
          >
            <div
              className="card"
              style={{
                padding: '2rem 1.75rem',
                borderRadius: '2px',
                borderTop: `3px solid ${ROSE_MID}`,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: ROSE_DEEP,
                  margin: '0 0 0.75rem',
                }}
              >
                Pillar 01
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.375rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 0.875rem',
                  fontStyle: 'normal',
                }}
              >
                Breathing Protocol
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>
                30–40 power breaths (deep inhale, passive exhale) followed by an empty-lung retention. This causes respiratory alkalosis and a massive adrenaline spike — approximately 2- to 3-fold above baseline (Kox et al., 2014) — which paradoxically trains the system to stay calm under biochemical stress.
              </p>
            </div>
            <div
              className="card"
              style={{
                padding: '2rem 1.75rem',
                borderRadius: '2px',
                borderTop: `3px solid ${ROSE_MID}`,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: ROSE_DEEP,
                  margin: '0 0 0.75rem',
                }}
              >
                Pillar 02
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.375rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 0.875rem',
                  fontStyle: 'normal',
                }}
              >
                Cold Exposure
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>
                Progressive cold immersion activates Brown Adipose Tissue (BAT) and triggers the vagally-mediated mammalian dive reflex. Over time, the autonomic nervous system learns to maintain composure in the face of extreme physiological challenge.
              </p>
            </div>
            <div
              className="card"
              style={{
                padding: '2rem 1.75rem',
                borderRadius: '2px',
                borderTop: `3px solid ${ROSE_MID}`,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: ROSE_DEEP,
                  margin: '0 0 0.75rem',
                }}
              >
                Pillar 03
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.375rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 0.875rem',
                  fontStyle: 'normal',
                }}
              >
                Mindset & Commitment
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>
                Top-down cortical control — the conscious decision to stay present during discomfort. This third pillar transforms a breathing exercise into a practice of will, building what Hof calls &ldquo;inner fire&rdquo; and what neuroscience calls prefrontal resilience.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Kox Study */}
        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
            <div
              style={{
                borderLeft: `3px solid ${ROSE_MID}`,
                padding: '1.5rem 1.75rem',
                background: 'var(--color-surface-raised)',
                borderRadius: '2px',
                marginBottom: '2rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: ROSE_DEEP,
                  margin: '0 0 0.75rem',
                }}
              >
                Landmark Study — Kox et al., 2014 (PNAS)
              </p>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text)', margin: '0 0 0.75rem', lineHeight: 1.7 }}>
                Researchers at Radboud University injected WHM-trained subjects with bacterial endotoxin — a substance that normally triggers violent flu-like symptoms. Through the breathing protocol, subjects voluntarily spiked their epinephrine, which <strong>suppressed the pro-inflammatory immune response</strong>: TNF-α dropped by ~50%, while anti-inflammatory IL-10 rose by 200%.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>
                This was the first scientific demonstration that humans can voluntarily influence their innate immune response through a mind-body technique.
              </p>
            </div>

            {/* Safety Disclaimer */}
            <div
              style={{
                background: 'color-mix(in srgb, var(--color-amber-light) 15%, var(--color-cream))',
                border: '1px solid var(--color-amber-light)',
                borderRadius: '2px',
                padding: '1.25rem 1.5rem',
                marginBottom: '2.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-amber-deep)',
                  margin: '0 0 0.5rem',
                }}
              >
                Safety Warning
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', margin: 0, lineHeight: 1.7 }}>
                <strong>Never practice WHM breathing in or near water.</strong> The breath retentions can cause shallow water blackout. Always practice on dry land, seated or lying down. If you have cardiovascular conditions, epilepsy, or are pregnant, consult a physician before attempting cold exposure or power breathing.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Guided Videos */}
        <ScrollReveal>
          <div style={{ maxWidth: '780px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.375rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.5rem',
                fontStyle: 'normal',
              }}
            >
              Guided Practice
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.25rem',
              }}
            >
              <div>
                <VideoFacade videoId="tybOi4hjZFQ" title="Wim Hof Guided Breathing Session" />
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0.75rem 0 0' }}>
                  Wim Hof Guided Breathing — 3 rounds
                </p>
              </div>
              <div>
                <VideoFacade videoId="0BNejY1e9ik" title="Wim Hof Cold Exposure Explained" />
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0.75rem 0 0' }}>
                  Cold Exposure — Why It Works
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          06 — HRV / MEASURING PROGRESS
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: `linear-gradient(180deg, var(--color-cream) 0%, color-mix(in srgb, ${ROSE_PALE} 20%, var(--color-cream)) 100%)`,
        }}
      >
        <div className="section-label" style={{ marginBottom: '2.5rem', color: ROSE_DEEP }}>
          06 — Measure Your Tone
        </div>

        <ScrollReveal>
          <div style={{ maxWidth: '780px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
                fontStyle: 'normal',
              }}
            >
              Heart Rate Variability
            </h2>
            <p style={{ margin: '0 0 1.5rem' }}>
              You cannot manage what you cannot measure. Vagal tone is quantified through <strong>Heart Rate Variability (HRV)</strong> — the millisecond variations between consecutive heartbeats. A healthy heart does not beat like a metronome; it fluctuates constantly, orchestrated by the vagus nerve.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2rem',
              }}
            >
              <div
                style={{
                  background: `color-mix(in srgb, #2D7A4A 8%, var(--color-surface-raised))`,
                  borderTop: '3px solid #2D7A4A',
                  borderRadius: '2px',
                  padding: '1.5rem',
                }}
              >
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
                  High HRV
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>
                  Indicates a flexible, resilient nervous system with strong vagal tone. Associated with better emotional regulation, faster recovery, and lower inflammation.
                </p>
              </div>
              <div
                style={{
                  background: 'color-mix(in srgb, var(--color-amber-light) 10%, var(--color-surface-raised))',
                  borderTop: '3px solid var(--color-amber-deep)',
                  borderRadius: '2px',
                  padding: '1.5rem',
                }}
              >
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
                  Low HRV
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>
                  Indicates sympathetic dominance and chronic stress. Correlated with anxiety, cardiovascular risk, and reduced capacity for emotional regulation.
                </p>
              </div>
            </div>

            <div style={{ margin: '2.5rem 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <img
                src="/images/illustrations/nervous-system-hrv.jpg"
                alt="Heart rate variability comparison — high HRV healthy and responsive versus low HRV stressed and rigid"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.375rem',
                fontWeight: 600,
                color: ROSE_DEEP,
                margin: '0 0 1rem',
                fontStyle: 'normal',
              }}
            >
              Tools for Tracking
            </h3>
            <p style={{ margin: '0 0 1.5rem' }}>
              Modern wearables — <strong>Oura Ring</strong>, <strong>Whoop</strong>, and <strong>Apple Watch</strong> — all track RMSSD, the gold-standard time-domain measure of HRV. For deeper training, dedicated HRV biofeedback apps like <strong>HeartMath</strong> guide you to breathe at your exact resonant frequency (~0.1 Hz, or about 6 breaths per minute) to maximize vagal efficiency.
            </p>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.375rem',
                fontWeight: 600,
                color: ROSE_DEEP,
                margin: '0 0 1rem',
                fontStyle: 'normal',
              }}
            >
              Resonance Frequency Breathing
            </h3>
            <p style={{ margin: 0 }}>
              Every person has an individual resonance frequency — typically falls between approximately 4.5 and 7 breaths per minute, though individual variation exists — where HRV is maximized. At this rate, respiratory sinus arrhythmia, heart rate oscillations, and blood pressure waves all synchronize. Breathing at your resonance frequency is the single most efficient way to train vagal tone, and it is the mechanism underlying the rosary, Sanskrit chanting, and the physiological sigh.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          07 — THE META-LAYER
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div className="section-label" style={{ marginBottom: '2.5rem', color: ROSE_DEEP }}>
          07 — The Meta-Layer
        </div>

        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
                fontStyle: 'normal',
              }}
            >
              Why Every Practice Leads Here
            </h2>
            <p style={{ margin: '0 0 2rem' }}>
              This is the unifying insight: regardless of tradition, lineage, or language, every practice on this site is ultimately a vagus nerve exercise. The nervous system is the common substrate beneath meditation, yoga, fascia, and breathwork. Understanding this transforms your practice from ritual into science.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal group>
          <div
            style={{
              maxWidth: '1100px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {/* Meditation connection */}
            <Link
              href="/meditate"
              style={{
                textDecoration: 'none',
                background: 'var(--color-surface-raised)',
                borderTop: '3px solid var(--color-violet-deep)',
                borderRadius: '2px',
                padding: '2rem 1.75rem',
                display: 'block',
                transition: 'border-color 300ms ease, background-color 300ms ease',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-violet-deep)',
                  margin: '0 0 0.5rem',
                }}
              >
                Meditation
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 0.75rem',
                  fontStyle: 'normal',
                }}
              >
                Top-Down Vagal Activation
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 1.25rem', lineHeight: 1.7 }}>
                The prefrontal cortex sends inhibitory signals to the amygdala via the vagus nerve. 8 weeks of meditation measurably increases baseline HRV and vagal tone.
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-violet-deep)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                Explore Meditation
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* Yoga connection */}
            <Link
              href="/yoga"
              style={{
                textDecoration: 'none',
                background: 'var(--color-surface-raised)',
                borderTop: '3px solid var(--color-amber-deep)',
                borderRadius: '2px',
                padding: '2rem 1.75rem',
                display: 'block',
                transition: 'border-color 300ms ease, background-color 300ms ease',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-amber-deep)',
                  margin: '0 0 0.5rem',
                }}
              >
                Yoga
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 0.75rem',
                  fontStyle: 'normal',
                }}
              >
                Baroreceptor & Breath Synergy
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 1.25rem', lineHeight: 1.7 }}>
                Inversions alter baroreceptor pressure, triggering reflexive vagal outflow. Kundalini breathwork adds respiratory vagal stimulation. The combination is more potent than either alone.
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-amber-deep)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                Explore Yoga
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* Fascia connection */}
            <Link
              href="/fascia"
              style={{
                textDecoration: 'none',
                background: 'var(--color-surface-raised)',
                borderTop: '3px solid var(--color-amber-light)',
                borderRadius: '2px',
                padding: '2rem 1.75rem',
                display: 'block',
                transition: 'border-color 300ms ease, background-color 300ms ease',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-amber-deep)',
                  margin: '0 0 0.5rem',
                }}
              >
                Fascia
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 0.75rem',
                  fontStyle: 'normal',
                }}
              >
                250 Million Nerve Endings
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 1.25rem', lineHeight: 1.7 }}>
                Fascia is the body&apos;s largest sensory organ. Releasing cervical and diaphragmatic fascia mechanically frees vagal signaling pathways compressed by chronic tension and trauma.
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-amber-deep)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                Explore Fascia
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* Breathwork connection */}
            <Link
              href="/breathe"
              style={{
                textDecoration: 'none',
                background: 'var(--color-surface-raised)',
                borderTop: '3px solid #5BA4A4',
                borderRadius: '2px',
                padding: '2rem 1.75rem',
                display: 'block',
                transition: 'border-color 300ms ease, background-color 300ms ease',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#2E7070',
                  margin: '0 0 0.5rem',
                }}
              >
                Breathwork
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 0.75rem',
                  fontStyle: 'normal',
                }}
              >
                The Voluntary Gateway
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 1.25rem', lineHeight: 1.7 }}>
                Breathing is the only autonomic function you can consciously override. Every exhale is a direct vagal brake application. Every breath pattern is a conversation with your nervous system.
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#2E7070',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                Explore Breathwork
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          CLOSING QUOTE
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)',
          background: `linear-gradient(160deg, oklch(55% 0.14 340 / 0.18), var(--color-cream))`,
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          <ScrollReveal>
            <blockquote style={{ margin: 0, padding: 0 }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: 'var(--color-text)',
                  margin: '0 0 1.5rem',
                  maxWidth: '52ch',
                }}
              >
                &ldquo;The body keeps the score. But the vagus nerve keeps the peace. Every practice you do — every breath, every stretch, every moment of stillness — is a conversation with this single wandering nerve.&rdquo;
              </p>
              <footer
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  marginBottom: '3rem',
                }}
              >
                — Inner Practice
              </footer>
            </blockquote>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                href="/meditate"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Meditate
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link
                href="/yoga"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Yoga
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link
                href="/fascia"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Fascia
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link
                href="/breathe"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Breathe
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/reiki" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Reiki &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/manifest" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Manifest &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/practice" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Practice Timer &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/sound-healing" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Sound Healing &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/somatics" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Somatics &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/sleep" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Sleep &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/qigong" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Qigong &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/chakras" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Chakras &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/trauma" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Trauma &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/nutrition" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Nutrition &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/temperature" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Temperature &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/nature" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Nature &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/taichi" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Tai Chi &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/fasting" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Fasting &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link href="/psychedelics" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Psychedelics &rarr;
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
