'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';
import StatCard from '@/components/StatCard';

// ── Teal accent tokens ─────────────────────────────────────────
const TEAL_DEEP    = '#2E7070';
const TEAL_MID     = '#2E7575';
const TEAL_LIGHT   = '#A8DADA';
const TEAL_PALE    = '#E0F4F4';

// ── Technique Accordion Item ──────────────────────────────────
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
  if (level === 'Beginner')     return { bg: `color-mix(in srgb, ${TEAL_LIGHT} 30%, var(--color-cream))`, text: TEAL_DEEP };
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
        border: `1px solid ${isOpen ? TEAL_MID : 'var(--color-border)'}`,
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
              color: isOpen ? TEAL_DEEP : 'var(--color-text)',
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
              color: TEAL_DEEP,
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

// ── Category Block ─────────────────────────────────────────────
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
            color: TEAL_MID,
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

// ── Techniques Data ────────────────────────────────────────────
const quickResets: TechniqueData[] = [
  {
    id: 'physio-sigh',
    name: 'Physiological Sigh',
    tradition: 'Stanford Neuroscience',
    duration: '1–3 breaths',
    level: 'Beginner',
    description: 'The fastest science-backed way to reduce stress in real time. A double nasal inhale fully inflates the lungs\' alveoli (tiny air sacs that collapse slightly with normal breathing), then a long slow mouth exhale maximally activates the parasympathetic nervous system. A 2023 Stanford RCT found five minutes of cyclic sighing outperformed mindfulness meditation for reducing daily stress and improving mood.',
    steps: [
      'Inhale deeply through your nose until your lungs are about 80% full.',
      'Without exhaling, take a second short sniff through the nose to top off your lungs completely.',
      'Open your mouth and exhale slowly and completely — as long as you can (aim for 6–8 seconds).',
      'Allow the next inhale to come naturally.',
      'Repeat 3–5 times for acute stress relief, or continuously for 5 minutes for deeper benefit.',
    ],
  },
  {
    id: 'box-breathing',
    name: 'Box Breathing (4-4-4-4)',
    tradition: 'Navy SEAL / Military',
    duration: '4–10 minutes',
    level: 'Beginner',
    description: 'Used by US Navy SEALs to regulate the nervous system under extreme stress. The equal-phase structure of inhale, hold, exhale, hold creates a predictable rhythm that anchors attention and suppresses the fight-or-flight response. Research suggests it significantly improves cognitive performance under high-pressure conditions by reducing sympathetic arousal and improving working memory.',
    steps: [
      'Sit upright with your back straight. Exhale completely to begin.',
      'Inhale through your nose for exactly 4 counts.',
      'Hold your breath (lungs full) for 4 counts. Keep the throat soft — no straining.',
      'Exhale slowly through your nose or mouth for 4 counts.',
      'Hold empty (lungs empty) for 4 counts.',
      'That completes one box. Repeat for 4–8 cycles minimum.',
      'Advanced: gradually extend each phase to 5-5-5-5 or 6-6-6-6 over weeks.',
    ],
  },
  {
    id: '4-7-8',
    name: '4-7-8 Breathing',
    tradition: 'Dr. Andrew Weil',
    duration: '2–5 minutes',
    level: 'Beginner',
    description: 'Dr. Andrew Weil calls this the "natural tranquilizer for the nervous system." The extended exhale (8 counts) and long retention (7 counts) maximally activate the parasympathetic nervous system and appear to produce a sedative effect that accumulates with regular practice. Weil recommends practicing twice daily and reports practitioners find it becomes a reliable sleep aid within a few weeks.',
    steps: [
      'Place the tip of your tongue on the ridge just behind your upper front teeth.',
      'Exhale completely through your mouth with a whoosh sound.',
      'Close your mouth. Inhale quietly through your nose for 4 counts.',
      'Hold your breath for 7 counts.',
      'Exhale completely through your mouth with a whoosh sound for 8 counts.',
      'That is one breath cycle. Begin the next inhale immediately.',
      'Complete 4 cycles for sleep; up to 8 cycles for daytime use.',
    ],
  },
];

const calmingBalancing: TechniqueData[] = [
  {
    id: 'diaphragmatic',
    name: 'Diaphragmatic Breathing',
    tradition: 'Universal Foundation',
    duration: '5–15 minutes',
    level: 'Beginner',
    description: 'The foundation of every other breathwork practice. Most adults breathe primarily in the upper chest — a pattern that activates sympathetic nerve fibers in the upper lungs. Diaphragmatic breathing activates the dense vagal receptors in the lower lungs, switching the nervous system to parasympathetic mode. The diaphragm is also directly connected to the pelvic floor and psoas through the fascia — deep breathing is simultaneously an internal myofascial release.',
    steps: [
      'Lie on your back or sit comfortably. Place one hand on your chest, one on your belly.',
      'Exhale completely, letting your belly fall.',
      'Inhale slowly through your nose, directing the breath down into your belly. Your belly hand should rise; your chest hand should remain still.',
      'Exhale slowly, letting your belly fall naturally.',
      'If your chest rises first, you are chest breathing — consciously push the belly out as you inhale.',
      'Practice for 5 minutes, aiming for 5–6 breaths per minute.',
    ],
  },
  {
    id: 'nadi-shodhana',
    name: 'Nadi Shodhana',
    tradition: 'Hatha Yoga / Pranayama',
    duration: '5–15 minutes',
    level: 'Beginner',
    description: 'Alternate Nostril Breathing — one of the most studied pranayama techniques. Nadi means "energy channel"; Shodhana means "purification." Research shows it reduces cardiovascular reactivity, balances activity between the brain\'s two hemispheres, and increases HRV. Nasal breathing cycles naturally between left and right nostrils approximately every 90 minutes; this practice overrides that cycle, bringing voluntary balance to both sides.',
    steps: [
      'Sit comfortably with your spine upright. Rest your left hand on your left knee.',
      'Bring your right hand to your face: place your index and middle fingers between your eyebrows (or fold them to the palm), and use your thumb and ring finger to alternate closing each nostril.',
      'Close your right nostril with your thumb. Inhale slowly through your left nostril for 4–6 counts.',
      'Close both nostrils. Hold for 4 counts (optional for beginners).',
      'Release your thumb, keeping the right nostril open. Exhale slowly through the right nostril for 4–6 counts.',
      'Inhale through the right nostril for the same count.',
      'Close both. Hold if practicing retention.',
      'Release the ring finger, keeping the left nostril open. Exhale through the left nostril.',
      'That is one complete cycle. Continue for 5–10 minutes.',
    ],
  },
  {
    id: 'ujjayi',
    name: 'Ujjayi',
    tradition: 'Ashtanga / Hatha Yoga',
    duration: '5–20 minutes',
    level: 'Beginner',
    description: 'The "ocean breath" or "victorious breath." A nasal breath with a gentle constriction at the glottis (back of the throat), creating a soft "shhh" or ocean-wave sound on both inhale and exhale. The sound creates a sonic anchor for attention, the throat constriction stimulates vagal receptors, and the resistance slightly slows the breath rate — all three mechanisms together produce a profound centering and calming effect. Used throughout Ashtanga yoga practice.',
    steps: [
      'Begin by breathing through your mouth as if you are fogging a mirror — feel the slight constriction at the back of your throat.',
      'Once you feel that constriction, close your mouth and breathe through your nose while maintaining the same throat position.',
      'You should hear a soft rushing sound on both your inhale and exhale.',
      'Keep the sound consistent — not loud or harsh, but audible to yourself.',
      'Aim for 4–6 breath cycles per minute.',
      'In yoga: maintain Ujjayi throughout your entire asana practice as the auditory anchor.',
    ],
  },
  {
    id: 'coherent',
    name: 'Coherent Breathing (5.5 bpm)',
    tradition: 'Stephen Elliott / Science-based',
    duration: '10–20 minutes',
    level: 'Beginner',
    description: 'The most evidence-backed technique for maximizing Heart Rate Variability (HRV). 5.5 breaths per minute (5.5 seconds in, 5.5 seconds out) synchronizes breathing with the cardiovascular Mayer wave and respiratory sinus arrhythmia. Research on the rosary prayer confirmed this rate (Bernardi et al., 2001, BMJ). Similar patterns have been observed in other traditions — including the Om mantra and the S.A.T. Nam mantra — though the precise rates vary across practitioners. In clinical trials, it significantly reduces blood pressure and anxiety.',
    steps: [
      'Find a comfortable seated or lying position.',
      'Begin to breathe in and out through your nose only.',
      'Inhale for 5.5 seconds.',
      'Exhale for 5.5 seconds. No pause between inhale and exhale — a continuous, flowing rhythm.',
      'Use a timer or a guided audio track to hold the pace precisely.',
      'Practice for a minimum of 10 minutes to experience the cardiac coherence effect.',
      'HRV monitors will show a notably smooth, high-amplitude wave during this practice.',
    ],
  },
];

const energizing: TechniqueData[] = [
  {
    id: 'kapalabhati',
    name: 'Kapalabhati',
    tradition: 'Classical Hatha Yoga',
    duration: '3–10 minutes',
    level: 'Intermediate',
    description: '"Skull-shining breath" — one of the six classical shatkarmas (cleansing practices) of Hatha yoga, and a pranayama. The technique involves passive inhalations and sharp, active abdominal exhalations. Each forced exhale uses the transverse abdominis to rapidly compress the diaphragm upward, expelling CO2 and metabolic waste. This produces a gentle alkalizing hyperventilation, clears the respiratory tract, and energizes the nervous system without the adrenaline spike of more intense techniques.',
    steps: [
      'Sit upright in a comfortable cross-legged or chair position.',
      'Take a normal inhale through your nose.',
      'Exhale sharply through your nose using a quick contraction of your lower abdomen — as if you are pumping a bellows. The inhale is passive and happens automatically.',
      'Begin slowly: one pump per 2 seconds. Focus on the active exhale, not the passive inhale.',
      'Gradually increase to 1–2 pumps per second.',
      'One round: 30–50 pumps, followed by a passive inhale and a long, slow exhale.',
      'Rest for 30 seconds between rounds. Complete 3 rounds.',
    ],
  },
  {
    id: 'breath-of-fire',
    name: 'Breath of Fire',
    tradition: 'Kundalini Yoga (Yogi Bhajan)',
    duration: '3–11 minutes',
    level: 'Intermediate',
    description: 'The signature breathwork of Kundalini yoga. Unlike Kapalabhati (exhale-active), Breath of Fire is fully equal and rhythmic — both the inhale and exhale are rapid, active, and nasal, driven by the navel center at 2–3 cycles per second. This creates a powerful internal pumping action that activates the navel chakra, generates heat, and rapidly shifts the energetic state. It is the activation mechanism for most Kundalini kriyas (exercise sets).',
    steps: [
      'Sit in Easy Pose (cross-legged) with your spine straight.',
      'Begin with a few slow diaphragmatic breaths to center.',
      'Start pumping both the inhale and exhale through the nose with equal force, driven by the movement of the navel point — it pumps in on the exhale, out on the inhale.',
      'Both in and out are active, not passive. The rhythm should feel like a sniffing but continuous.',
      'Begin slowly (1 cycle per second) and build to 2–3 per second.',
      'For your first sessions, practice for 1–3 minutes only. Build gradually to 11 minutes over weeks.',
      'End by taking a deep inhale, holding briefly, then exhaling slowly.',
    ],
  },
  {
    id: 'wim-hof',
    name: 'Wim Hof Method',
    tradition: 'Wim Hof / Modern',
    duration: '15–30 minutes',
    level: 'Intermediate',
    description: 'The technique behind among the first controlled demonstrations that humans can consciously modulate their innate immune system. A 2014 Radboud University study (published in PNAS) found trained Wim Hof practitioners could suppress inflammatory cytokines in response to bacterial endotoxin injection — something previously thought biologically impossible. The mechanism involves rapid oxygen loading, adrenaline spike during retention, and CO2 recalibration. Contraindicated near water, while driving, or standing.',
    steps: [
      'Lie down in a comfortable position. You may feel lightheaded — lying down prevents falls.',
      'Take 30–40 deep, powerful breaths through the nose (or mouth if needed). Inhale fully; let the exhale be passive and unforced.',
      'After the final exhale, let the air out and do NOT inhale. Hold empty (exhale retention) for as long as comfortable — typically 1–3 minutes for beginners.',
      'When you feel a strong urge to breathe, take a full recovery inhale and hold it for 15 seconds.',
      'Exhale. That completes one round.',
      'Complete 3–4 rounds.',
      'After the breathwork, take a cold shower for 30–90 seconds. This is a key component of the full protocol.',
    ],
  },
];

const deepPractice: TechniqueData[] = [
  {
    id: 'buteyko',
    name: 'Buteyko Method',
    tradition: 'Dr. Konstantin Buteyko',
    duration: '10–30 minutes',
    level: 'Intermediate',
    description: 'A reduced-breathing method developed by Soviet physician Dr. Konstantin Buteyko in the 1950s. His core insight: most people chronically over-breathe, lowering blood CO2 below optimal levels. Low CO2 — via the Bohr Effect — paradoxically prevents oxygen from releasing into tissues, creating a hidden oxygen debt despite normal blood oxygen saturation. Buteyko practice involves nasal breathing with deliberately gentle, reduced volume, building CO2 tolerance (measured by the BOLT score — Body Oxygen Level Test).',
    steps: [
      'Sit upright. Breathe only through your nose for the entire practice.',
      'Breathe very gently and quietly — aim for smaller, lighter breaths than normal. Your breathing should be almost imperceptible.',
      'If you feel a comfortable "air hunger" — a mild desire for more air — you are working correctly. Do not gasp.',
      'After 5–10 minutes of gentle reduced breathing, measure your BOLT score: exhale normally, pinch your nose, and count the seconds until you feel the first definite urge to breathe. 20+ seconds is good; 40+ is excellent.',
      'Practice 2–3 sessions daily, especially the first 20 minutes after waking (when CO2 tolerance is lowest).',
      'In daily life: tape the mouth shut at night to ensure nasal breathing during sleep.',
    ],
  },
  {
    id: 'tummo',
    name: 'Tummo',
    tradition: 'Tibetan Vajrayana Buddhism',
    duration: '20–60 minutes',
    level: 'Advanced',
    description: 'The "inner fire" meditation of Tibetan Buddhism — one of the Six Yogas of Naropa. Tummo combines specific breath retentions (kumbhaka), bandhas (energy locks — primarily mula bandha and uddiyana bandha), and vivid visualization of an inner flame at the navel center to generate intense somatic heat. Studies by Herbert Benson at Harvard measured monks capable of raising peripheral skin temperature (fingers and toes) by up to 17°F through Tummo practice. It is considered the most advanced and transformative of all breathing practices.',
    steps: [
      'Establish a strong Vajra posture (full lotus or cross-legged with spine perfectly erect).',
      'Visualize an AH syllable (a flame) at the navel center — intensely bright, hot, and alive.',
      'Vase breath: inhale deeply, then take a short second inhale. Hold with mula bandha (perineum lock) and uddiyana bandha (abdominal lock engaged). Visualize the inner flame intensifying.',
      'Hold the breath for 5–15 seconds, maintaining the locks and vivid visualization of the flame growing.',
      'Release the bandhas with the exhale.',
      'Complete 7–21 repetitions per session.',
      'This practice should be learned from a qualified Tibetan Buddhist teacher. Self-instruction is not recommended for the advanced stages.',
    ],
  },
  {
    id: 'holotropic',
    name: 'Holotropic Breathwork',
    tradition: 'Dr. Stanislav Grof',
    duration: '2–3 hours',
    level: 'Advanced',
    description: 'Developed by psychiatrist Dr. Stanislav Grof as a non-pharmacological method for accessing non-ordinary states of consciousness. Continuous connected breathing — slightly faster and deeper than normal, with no pause between inhale and exhale — is maintained for 2–3 hours to music. Participants often experience somatic release, emotional catharsis, and states described as transpersonal. Preliminary research and clinical observations suggest significant shifts in brain activity during hyperventilatory states, though controlled neuroimaging studies of Holotropic Breathwork remain limited. Must be practiced with a trained facilitator; self-practice is not recommended.',
    steps: [
      'This practice requires a trained facilitator and a designated "sitter" partner.',
      'Lie down on a mat in a comfortable position. Have an eye mask and blanket available.',
      'Begin continuous connected breathing: slightly deeper and faster than normal, with no pause between exhale and inhale.',
      'Maintain this rhythm as the facilitator plays evocative music through the session.',
      'Allow whatever arises — physical sensations, emotions, imagery — to emerge without resistance.',
      'If intense physical tension arises, the facilitator uses focused bodywork to help release it.',
      'The session ends with a gradual return to normal breathing and a mandala drawing integration exercise.',
    ],
  },
  {
    id: 'cyclic-hyperventilation',
    name: 'Cyclic Hyperventilation',
    tradition: 'Huberman Lab / Performance Science',
    duration: '5–15 minutes',
    level: 'Intermediate',
    description: 'A structured stress inoculation protocol popularized by Andrew Huberman. Unlike Wim Hof which uses a continuous exhale-release, this technique uses controlled cycles of brief hyperventilation followed by empty holds. It deliberately raises physiological arousal (adrenaline, heart rate, blood pressure) and then practices returning to calm — essentially training the nervous system\'s recovery mechanism under controlled conditions. Do not practice near water, while driving, or standing.',
    steps: [
      'Lie down on a comfortable surface.',
      'Take 25 deep, vigorous inhale-exhale cycles. Fully inhale, then let the exhale go passively.',
      'After the 25th exhale, let the air out and hold on empty (no air in lungs) for 15–30 seconds.',
      'Take a full recovery inhale through the nose and hold for 15 seconds.',
      'Exhale slowly. That is one cycle.',
      'Complete 3–5 cycles per session.',
      'Notice the difference in your mental clarity and physical calm after the practice.',
    ],
  },
];

// ── Wellness Cards Data ────────────────────────────────────────
const wellnessCards = [
  {
    condition: 'Anxiety & Depression',
    icon: '🌊',
    evidence: 'Nature meta-analysis, 2023 — g = −0.32 to −0.40',
    body: 'Slow extended exhales directly downregulate the amygdala via the vagus nerve. A 2023 Nature Scientific Reports meta-analysis found breathwork produces significant reductions in stress (g = −0.35), anxiety (g = −0.32), and depression (g = −0.40).',
    techniques: ['Physiological Sigh', 'Coherent Breathing', 'Nadi Shodhana'],
    accent: TEAL_MID,
  },
  {
    condition: 'Sleep',
    icon: '🌙',
    evidence: 'SKY Breath RCTs; Weil clinical observations',
    body: 'SKY Breath Meditation (Sudarshan Kriya) increases slow-wave sleep and reduces insomnia in randomized trials. The 4-7-8 technique appears to produce a sedative effect that accumulates with practice. Extended exhales raise parasympathetic tone to levels conducive to sleep onset.',
    techniques: ['4-7-8 Breathing', 'Coherent Breathing', 'Diaphragmatic Breathing'],
    accent: 'var(--color-violet-mid)',
  },
  {
    condition: 'Trauma & PTSD',
    icon: '🕊️',
    evidence: 'Polyvagal Theory — Porges; Veterans RCTs',
    body: 'Trauma dysregulates the autonomic nervous system. Slow breathing (5 bpm) bypasses cognitive resistance, directly modulating the vagal brake. RCTs in combat veterans showed SKY Breath significantly reduced PTSD symptoms. Somatic breathing works where talk therapy cannot reach.',
    techniques: ['Coherent Breathing', 'Diaphragmatic Breathing', 'Ujjayi'],
    accent: 'var(--color-amber-light)',
  },
  {
    condition: 'Athletic Performance',
    icon: '⚡',
    evidence: 'CO2 tolerance studies; Box breathing accuracy research',
    body: 'Functional nasal breathing improves tissue oxygenation via the Bohr Effect and nitric oxide vasodilation. Research suggests box breathing significantly improves cognitive performance under high-pressure conditions by reducing sympathetic arousal and improving working memory. CO2 tolerance (measured by BOLT score) is one of the strongest predictors of aerobic performance.',
    techniques: ['Buteyko Method', 'Box Breathing', 'Diaphragmatic Breathing'],
    accent: TEAL_MID,
  },
  {
    condition: 'Immune Function',
    icon: '🛡️',
    evidence: 'Radboud University, PNAS 2014 — Kox et al.',
    body: 'The landmark 2014 Radboud study proved trained Wim Hof practitioners could consciously suppress inflammatory markers (TNF-α, IL-6) when exposed to bacterial endotoxin — previously considered biologically impossible. Cyclic hyperventilation spikes epinephrine, which suppresses systemic inflammation via IL-10.',
    techniques: ['Wim Hof Method', 'Cyclic Hyperventilation'],
    accent: 'var(--color-violet-mid)',
  },
  {
    condition: 'Blood Pressure',
    icon: '❤️',
    evidence: 'Elliott coherence research; Inspiratory muscle training studies',
    body: 'Coherent breathing (5.5 bpm) significantly reduces both systolic and diastolic blood pressure in clinical trials. Inspiratory muscle strength training — five minutes daily — reduces systolic blood pressure by up to 9 mmHg, comparable to first-line hypertension medication.',
    techniques: ['Coherent Breathing', 'Diaphragmatic Breathing', 'Ujjayi'],
    accent: 'var(--color-amber-light)',
  },
];

// ── Video Data ─────────────────────────────────────────────────
type VideoCategory = 'Quick Resets' | 'Morning Activation' | 'Calm & Sleep' | 'Deep Practice';

interface VideoItem {
  id: string;
  title: string;
  duration: string;
  category: VideoCategory;
}

const videos: VideoItem[] = [
  { id: 'rBdhqBGqiMc', title: 'Huberman — Physiological Sigh (2 min)', duration: '2 min', category: 'Quick Resets' },
  { id: 'tEmt1Znux58', title: 'Box Breathing — 4 Minutes', duration: '4 min', category: 'Quick Resets' },
  { id: '0BNejY1e9ik', title: 'Wim Hof — Beginner Guided (11 min)', duration: '11 min', category: 'Morning Activation' },
  { id: 'Egr8iGBg8Oc', title: 'Dr. Weil — 4-7-8 Original', duration: '4 min', category: 'Calm & Sleep' },
  { id: '8VwufJrUhic', title: 'Yoga with Adriene — Alternate Nostril', duration: '12 min', category: 'Calm & Sleep' },
  { id: 'zFeTfG1vfGE', title: 'Intro to Deep Conscious Breathwork', duration: '20 min', category: 'Deep Practice' },
  { id: 'qlTC2HBmPeM', title: 'Othership — Nervous System Reset', duration: '22 min', category: 'Deep Practice' },
];

const videoCategories: VideoCategory[] = ['Quick Resets', 'Morning Activation', 'Calm & Sleep', 'Deep Practice'];

// ── Main Component ─────────────────────────────────────────────
export default function BreatheClient() {
  const [openTechnique, setOpenTechnique] = useState<string | null>('physio-sigh');
  const [activeVideoCategory, setActiveVideoCategory] = useState<VideoCategory>('Quick Resets');

  const toggleTechnique = (id: string) => {
    setOpenTechnique(prev => (prev === id ? null : id));
  };

  const filteredVideos = videos.filter(v => v.category === activeVideoCategory);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(3rem, 6vw, 5rem)',
          background: `linear-gradient(160deg, oklch(60% 0.10 196 / 0.35), var(--color-cream))`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative radial orb */}
        <div
          className="breathe"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-6vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(220px, 38vw, 440px)',
            height: 'clamp(220px, 38vw, 440px)',
            borderRadius: '9999px',
            background: `radial-gradient(circle, ${TEAL_MID}30 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1100px', position: 'relative' }}>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: TEAL_DEEP,
              margin: '0 0 1.25rem',
            }}
          >
            Breathwork &amp; Pranayama
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              color: 'var(--color-text)',
              lineHeight: 1.05,
              margin: '0 0 1.25rem',
              maxWidth: '14ch',
            }}
          >
            The Master Switch
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
              fontStyle: 'italic',
              color: TEAL_DEEP,
              margin: '0 0 1rem',
              maxWidth: '52ch',
              lineHeight: 1.6,
            }}
          >
            The most direct voluntary gateway to your nervous system
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
              color: 'var(--color-text-muted)',
              margin: '0 0 2.5rem',
              maxWidth: '50ch',
              lineHeight: 1.85,
            }}
          >
            Every other autonomic function — heart rate, digestion, immunity — operates beyond your reach.
            Breath straddles both worlds. Master it and you hold the manual override.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Science', href: '#science' },
              { label: 'Techniques', href: '#techniques' },
              { label: 'Wellness', href: '#wellness' },
              { label: 'Practice', href: '#practice' },
              { label: 'Connect', href: '#connect' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: TEAL_DEEP,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${TEAL_MID}99`,
                  paddingBottom: '2px',
                  transition: 'color 300ms ease, border-color 300ms ease',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHAT IS BREATHWORK
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(3rem, 5vw, 4.5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'start',
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
                  margin: '0 0 1.25rem',
                }}
              >
                Foundation
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h2)',
                  fontWeight: 400,
                  color: 'var(--color-text)',
                  margin: '0 0 1.75rem',
                  lineHeight: 1.2,
                }}
              >
                What is Breathwork?
              </h2>
              <p style={{ marginBottom: '1.25rem', lineHeight: 1.85 }}>
                Breathing is the <strong>only autonomic function you can consciously override</strong>. Your heart rate,
                digestion, immune response, hormone release — all operate below the threshold of conscious control.
                Breath alone crosses the border.
              </p>
              <p style={{ marginBottom: '1.25rem', lineHeight: 1.85 }}>
                By changing how you breathe, you directly influence: cardiovascular state (heart rate and blood pressure),
                blood chemistry (CO2, pH, oxygen delivery), nervous system tone (sympathetic vs. parasympathetic),
                immune response, and emotional regulation. No pharmaceutical achieves this breadth.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <p style={{ lineHeight: 1.85, marginBottom: '1.25rem', marginTop: 'clamp(0rem, 2vw, 2rem)' }}>
                The mechanism centers on the <strong>vagus nerve</strong> — the primary parasympathetic highway running
                from brainstem to gut. The upper lungs are dense with sympathetic nerve fibers; the lower lungs are rich
                with vagal receptors. When you breathe shallowly into the chest, you activate stress. When you breathe
                deeply into the diaphragm, you activate calm. Every breath is a vote.
              </p>
              <div style={{ margin: '2.5rem 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <img
                  src="/images/illustrations/breathwork-diaphragm.jpg"
                  alt="Diaphragm mechanics — inhale with diaphragm descending and lungs expanding versus exhale with diaphragm rising"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                />
              </div>
              <p style={{ lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Across every major contemplative tradition — Buddhist anapanasati, yogic pranayama, Taoist embryonic
                breathing, Sufi zhikr, Christian hesychasm — the same empirical insight emerges: conscious breath is
                the gateway to inner transformation. Modern neuroscience has now mapped precisely why.
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '1rem 1.25rem',
                  background: `color-mix(in srgb, ${TEAL_LIGHT} 25%, var(--color-cream))`,
                  borderLeft: `3px solid ${TEAL_MID}`,
                  borderRadius: '0 2px 2px 0',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🌬️</span>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.125rem',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: TEAL_DEEP,
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  5.5 breaths per minute — the optimal rate confirmed in the rosary prayer (Bernardi et al., 2001, BMJ) and observed across contemplative traditions, now studied by cardiology research.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          THE SCIENCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="science"
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${TEAL_LIGHT})`,
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
              Research
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 3rem',
              }}
            >
              The Science
            </h2>
          </ScrollReveal>

          <ScrollReveal group>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '4rem',
              }}
            >
              <StatCard
                source="Nestor, Breath (2020) — self-experiment with Dr. Nayak, Stanford"
                stat="4,820% increase in snoring after 10 days mouth breathing"
                detail="An informal journalist self-experiment (not a controlled RCT) plugging nostrils for 10 days produced 4,820% more snoring, 25 sleep apnea events per night, and blood pressure rising to 142 mmHg. Reverting to nasal breathing dropped BP to 124 mmHg and raised HRV by 150% (in the informal self-experiment reported in Nestor's Breath, 2020) within days. Based on an informal journalist self-experiment, not a controlled RCT."
                accentColor={TEAL_MID}
                accentTextColor={TEAL_DEEP}
              />
              <StatCard
                source="Nestor / Elliott — multiple studies"
                stat="5.5 breaths/min — the universal optimal rate"
                detail="This frequency appears in the rosary prayer, Om mantra, the S.A.T. Nam mantra, and qigong. It synchronizes the cardiovascular Mayer wave with breathing, maximizing HRV and cardiac coherence. Not a coincidence — it is the architecture of calm."
                url="https://pmc.ncbi.nlm.nih.gov/articles/PMC5709795/"
                accentColor={TEAL_MID}
                accentTextColor={TEAL_DEEP}
              />
              <StatCard
                source="Stanford RCT — Balban / Huberman, 2023"
                stat="Cyclic sighing outperformed meditation for stress reduction"
                detail="A 2023 randomized controlled trial compared cyclic sighing, box breathing, cyclic hyperventilation, and mindfulness meditation. Cyclic sighing showed the greatest improvements in daily positive affect and the largest reductions in resting respiratory rate."
                url="https://pubmed.ncbi.nlm.nih.gov/36630953/"
                accentColor={TEAL_MID}
                accentTextColor={TEAL_DEEP}
              />
            </div>
          </ScrollReveal>

          {/* Extended science cards */}
          <ScrollReveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {[
                {
                  title: 'The Vagus Nerve',
                  subtitle: 'Primary parasympathetic highway',
                  body: '80% of vagal signals travel body-to-brain (afferent), not brain-to-body. This means the breath is not just controlled by the nervous system — it talks back to it. Inhalation mildly activates the sympathetic system; exhalation activates the parasympathetic. Extended exhales are the most direct route to calm.',
                  accent: TEAL_MID,
                },
                {
                  title: 'The Bohr Effect & CO2',
                  subtitle: 'Why over-breathing creates oxygen debt',
                  body: 'The urge to breathe is driven by rising CO2, not falling O2. Paradoxically, chronic over-breathing lowers CO2, which causes hemoglobin to grip oxygen tightly — preventing it from releasing into tissues. This is the Bohr Effect. Slower breathing actually improves oxygen delivery to cells, not less.',
                  accent: 'var(--color-amber-light)',
                },
                {
                  title: 'Nitric Oxide',
                  subtitle: 'The vasodilator of nasal breathing',
                  body: 'The paranasal sinuses produce nitric oxide — a potent vasodilator and bronchodilator — that is drawn into the lungs only through nasal breathing. Nasal breathing increases oxygen absorption by up to 18% compared to mouth breathing, according to estimates derived from nitric oxide research (Lundberg et al., 1996), and the NO produced provides direct anti-microbial effects in the respiratory tract.',
                  accent: TEAL_MID,
                },
              ].map(item => (
                <div
                  key={item.title}
                  className="card"
                  style={{
                    padding: '2rem 1.75rem',
                    borderRadius: '2px',
                    borderTop: `3px solid ${item.accent}`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      margin: '0 0 0.5rem',
                    }}
                  >
                    {item.subtitle}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 1rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      margin: 0,
                      lineHeight: 1.75,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div style={{ margin: '2.5rem 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <img
                src="/images/illustrations/breathwork-vagal-brake.jpg"
                alt="The vagal brake concept — extended exhale activates the vagus nerve to slow heart rate"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          TECHNIQUES
      ══════════════════════════════════════════════════════ */}
      <section
        id="techniques"
        style={{
          padding: 'clamp(4.5rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
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
              Methods
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
              14 Techniques
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3.5rem',
                maxWidth: '54ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Organized by purpose and depth — from a three-breath emergency reset to two-hour
              altered-state work. Every technique includes tradition, duration, difficulty, and
              step-by-step instructions. Tap to expand.
            </p>
          </ScrollReveal>

          {/* Legend */}
          <ScrollReveal>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '3rem',
              }}
            >
              {[
                { label: 'Beginner', bg: `color-mix(in srgb, ${TEAL_LIGHT} 30%, var(--color-cream))`, color: TEAL_DEEP },
                { label: 'Intermediate', bg: 'color-mix(in srgb, var(--color-amber-light) 25%, var(--color-cream))', color: 'var(--color-amber-deep)' },
                { label: 'Advanced', bg: 'color-mix(in srgb, var(--color-violet-mid) 25%, var(--color-cream))', color: 'var(--color-violet-deep)' },
              ].map(lv => (
                <span
                  key={lv.label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.3rem 0.875rem',
                    borderRadius: '9999px',
                    background: lv.bg,
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: lv.color,
                  }}
                >
                  {lv.label}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <CategoryBlock
            label="Quick Resets"
            subtitle="1–5 minutes"
            techniques={quickResets}
            openTechnique={openTechnique}
            onToggle={toggleTechnique}
            baseIndex={0}
          />
          <CategoryBlock
            label="Calming & Balancing"
            subtitle="5–15 minutes"
            techniques={calmingBalancing}
            openTechnique={openTechnique}
            onToggle={toggleTechnique}
            baseIndex={quickResets.length}
          />
          <CategoryBlock
            label="Energizing"
            subtitle="5–15 minutes"
            techniques={energizing}
            openTechnique={openTechnique}
            onToggle={toggleTechnique}
            baseIndex={quickResets.length + calmingBalancing.length}
          />
          <CategoryBlock
            label="Deep Practice"
            subtitle="15+ minutes"
            techniques={deepPractice}
            openTechnique={openTechnique}
            onToggle={toggleTechnique}
            baseIndex={quickResets.length + calmingBalancing.length + energizing.length}
          />
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          BREATHWORK FOR WELLNESS
      ══════════════════════════════════════════════════════ */}
      <section
        id="wellness"
        style={{
          padding: 'clamp(4.5rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: `color-mix(in srgb, var(--color-cream) 92%, ${TEAL_LIGHT})`,
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
              Applications
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
              Breathwork for Wellness
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
              The research behind specific applications. Find your condition, understand the evidence,
              and choose the technique most aligned with your goal.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {wellnessCards.map(card => (
              <ScrollReveal key={card.condition}>
                <div
                  className="card"
                  style={{
                    padding: '2rem 1.75rem',
                    borderRadius: '2px',
                    borderTop: `3px solid ${card.accent}`,
                    height: '100%',
                  }}
                >
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.875rem' }}>{card.icon}</div>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.625rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      margin: '0 0 0.375rem',
                    }}
                  >
                    {card.evidence}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.875rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {card.condition}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      margin: '0 0 1.25rem',
                      lineHeight: 1.75,
                    }}
                  >
                    {card.body}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {card.techniques.map(t => (
                      <span
                        key={t}
                        style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          background: `color-mix(in srgb, ${TEAL_LIGHT} 20%, var(--color-cream))`,
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.6875rem',
                          fontWeight: 500,
                          color: TEAL_DEEP,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Safety callout */}
          <ScrollReveal>
            <div
              style={{
                marginTop: '3rem',
                padding: '1.5rem 1.75rem',
                background: 'color-mix(in srgb, var(--color-linen) 60%, var(--color-cream))',
                border: '1px solid var(--color-taupe)',
                borderRadius: '2px',
                borderTop: '3px solid var(--color-amber-deep)',
                maxWidth: '700px',
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
                  margin: '0 0 0.75rem',
                }}
              >
                Contraindications — Read Before Intense Practice
              </p>
              <ul
                style={{
                  margin: 0,
                  padding: '0 0 0 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {[
                  'Intense breathwork (Wim Hof, cyclic hyperventilation, holotropic) is contraindicated in epilepsy, cardiovascular disease, pregnancy, and psychosis.',
                  'Never practice high-ventilation techniques near water, while driving, or while standing unsupported — loss of consciousness is possible.',
                  'Gentle slow breathing (coherent breathing, diaphragmatic breathing, 4-7-8) is safe for virtually everyone.',
                  'If you are on psychiatric medication, consult your physician before practicing hyperventilation-based techniques.',
                  'Holotropic Breathwork must only be done with a trained facilitator — never self-guided.',
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.65,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          GUIDED PRACTICE (VIDEO)
      ══════════════════════════════════════════════════════ */}
      <section
        id="practice"
        style={{
          padding: 'clamp(4.5rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: 'var(--color-cream)',
          borderTop: '1px solid var(--color-border)',
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
              Guided Sessions
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
              Guided Practice
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2rem',
                maxWidth: '50ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Curated sessions from leading practitioners and researchers. Choose by your goal and available time.
            </p>
          </ScrollReveal>

          {/* Category tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
            }}
          >
            {videoCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveVideoCategory(cat)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: `1px solid ${activeVideoCategory === cat ? TEAL_MID : 'var(--color-border)'}`,
                  background: activeVideoCategory === cat ? TEAL_MID : 'transparent',
                  color: activeVideoCategory === cat ? '#F5EAE1' : 'var(--color-text-muted)',
                  transition: 'background-color 300ms ease, color 300ms ease, border-color 300ms ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Video grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
              gap: '2rem',
            }}
          >
            {filteredVideos.map(video => (
              <ScrollReveal key={video.id}>
                <div>
                  <VideoFacade videoId={video.id} title={video.title} />
                  <div style={{ marginTop: '0.875rem' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        color: 'var(--color-text)',
                        margin: '0 0 0.25rem',
                        lineHeight: 1.4,
                      }}
                    >
                      {video.title}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        margin: 0,
                      }}
                    >
                      {video.duration} · {video.category}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          THE THREAD THAT CONNECTS
      ══════════════════════════════════════════════════════ */}
      <section
        id="connect"
        style={{
          padding: 'clamp(5rem, 8vw, 8rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6.5rem)',
          background: `linear-gradient(160deg, oklch(60% 0.10 196 / 0.12), var(--color-cream))`,
          borderTop: '1px solid var(--color-border)',
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
              The Integration
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
              The Thread That Connects
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3.5rem',
                maxWidth: '56ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Breathwork is not a fourth practice added to three others. It is the invisible thread
              running through everything — the mechanism by which stillness, movement, and release
              are possible.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '4rem',
            }}
          >
            {[
              {
                title: 'Breath IS Meditation',
                subtitle: 'Anapanasati — The Complete Path',
                body: 'The Anapanasati Sutta is the Buddha\'s foundational discourse on mindfulness — and it is entirely about the breath. Not breath as a technique to calm down before "real" meditation, but breath awareness as the complete 16-step path to liberation. Every tradition of Buddhist meditation traces its lineage to the simple instruction: know that you are breathing.',
                accent: 'var(--color-violet-mid)',
                link: '/meditate',
                linkLabel: 'Explore Meditation',
              },
              {
                title: 'Pranayama: The 4th Limb',
                subtitle: 'The Bridge Between Body and Mind',
                body: 'In Patanjali\'s eight limbs of yoga, Pranayama is placed precisely between Asana (the physical body, 3rd limb) and Dharana (concentration, 6th limb). It is the exact hinge. In Kundalini yoga, the Breath of Fire is not optional preparation — it is the activation mechanism that converts a physical exercise set into a kriya that transforms the nervous system and energy body.',
                accent: 'var(--color-amber-light)',
                link: '/yoga',
                linkLabel: 'Explore Yoga',
              },
              {
                title: 'The Diaphragm–Fascia Connection',
                subtitle: '20,000 fascial compressions daily',
                body: 'The diaphragm contracts approximately 20,000 times per day. Each full breath mobilizes the Deep Front Line — the continuous fascial meridian from the inner arches through the psoas, diaphragm, and throat. Full breathing is the body\'s built-in myofascial release system. The pelvic floor descends on every inhale; the thoracolumbar fascia stretches. Shallow breathing is literally fascial stagnation.',
                accent: TEAL_MID,
                link: '/fascia',
                linkLabel: 'Explore Fascia',
              },
              {
                title: 'The Prana–Nadi–Fascia Triangle',
                subtitle: 'Ancient anatomy, modern tissue',
                body: 'The Ida and Pingala nadis of yogic anatomy — the left and right energy channels — correspond to the alternate nostril breathing cycle and to the opposing lobes of the autonomic nervous system. The central Sushumna nadi corresponds anatomically to the dura mater: the fascial sheath protecting the spinal cord from sacrum to skull. Pranayama does not work on a metaphorical energy body — it works on fascia, fluid dynamics, and vagal tone.',
                accent: TEAL_MID,
                link: '/fascia',
                linkLabel: 'The Fascia Connection',
              },
            ].map(item => (
              <ScrollReveal key={item.title}>
                <div
                  className="card"
                  style={{
                    padding: '2rem 1.75rem',
                    borderRadius: '2px',
                    borderTop: `3px solid ${item.accent}`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      margin: '0 0 0.5rem',
                    }}
                  >
                    {item.subtitle}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 1rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      margin: '0 0 1.25rem',
                      lineHeight: 1.75,
                    }}
                  >
                    {item.body}
                  </p>
                  <Link
                    href={item.link}
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: TEAL_DEEP,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'color 300ms ease',
                    }}
                  >
                    {item.linkLabel}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Cross-link CTA */}
          <ScrollReveal>
            <div
              style={{
                padding: '2rem 2.25rem',
                background: `color-mix(in srgb, ${TEAL_PALE} 60%, var(--color-cream))`,
                border: `1px solid ${TEAL_MID}66`,
                borderRadius: '2px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: TEAL_DEEP,
                    margin: '0 0 0.5rem',
                    fontStyle: 'normal',
                  }}
                >
                  Continue your inner practice
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                    margin: 0,
                    lineHeight: 1.65,
                    maxWidth: '50ch',
                  }}
                >
                  Breath is the thread. Stillness, movement, and release are the fabric.
                  All four practices illuminate the same interior landscape from different angles.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                <Link
                  href="/meditate"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.5rem',
                    background: 'var(--color-violet-deep)',
                    color: '#F5EAE1',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    transition: 'background-color 300ms ease',
                  }}
                >
                  Meditate
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/yoga"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.5rem',
                    background: 'transparent',
                    color: 'var(--color-violet-deep)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    border: '1px solid var(--color-violet-mid)',
                    transition: 'background-color 300ms ease, border-color 300ms ease',
                  }}
                >
                  Yoga
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/fascia"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.5rem',
                    background: 'transparent',
                    color: 'var(--color-amber-deep)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    border: '1px solid var(--color-amber-light)',
                    transition: 'background-color 300ms ease, border-color 300ms ease',
                  }}
                >
                  Fascia
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/manifest"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.5rem',
                    background: 'transparent',
                    color: '#7A5A1E',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    border: '1px solid #D4A74A',
                    transition: 'background-color 300ms ease, border-color 300ms ease',
                  }}
                >
                  Manifest
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CLOSING QUOTE
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)',
          background: `linear-gradient(160deg, oklch(60% 0.10 196 / 0.18), var(--color-cream))`,
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
                &ldquo;Improper breathing is a common cause of ill health. If I had to limit my advice on healthier living to just one tip, it would be simply to learn how to breathe correctly.&rdquo;
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
                — Dr. Andrew Weil
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
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
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
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
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
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/reiki" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Reiki &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/nervous-system" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Nervous System &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/practice" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Practice Timer &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/sound-healing" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Sound Healing &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/somatics" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Somatics &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/sleep" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Sleep &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/qigong" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Qigong &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/chakras" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Chakras &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/trauma" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Trauma &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/nutrition" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Nutrition &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/temperature" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Temperature &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/nature" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Nature &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/taichi" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Tai Chi &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link href="/fasting" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 300ms ease' }}>
                Fasting &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
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
