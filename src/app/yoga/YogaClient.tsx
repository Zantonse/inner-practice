'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';

// ── Practice Steps Data ──────────────────────────────────────
const practiceSteps = [
  {
    number: 1,
    title: 'Tune In',
    duration: '1–2 min',
    tagline: 'Ground your awareness',
    summary: 'Sit cross-legged on the floor or in a chair. Bring both hands to your heart center.',
    details: [
      'Close your eyes and take three deep breaths through the nose.',
      'Bring your palms together at the center of your chest, thumbs pressing gently against the sternum.',
      'On your next exhale, chant "Ong Namo Guru Dev Namo" (I bow to the creative energy; I bow to the divine teacher within) three times.',
      'This is the adi mantra — it signals to your system that the practice has begun, and is said to connect you to the lineage of teachers.',
      'Take a moment in stillness. Notice the quality of silence after the final repetition.',
    ],
    tip: 'If you\'re not comfortable chanting, you can simply sit with hands at heart and set a clear intention for the practice.',
  },
  {
    number: 2,
    title: 'Breathe',
    duration: '3 min',
    tagline: 'Long deep breathing',
    summary: 'Sit tall. Begin Long Deep Breathing through the nose — slowly filling from belly to chest.',
    details: [
      'Long Deep Breathing (LDB) engages all three chambers of the lungs: first the belly expands, then the chest lifts, then the collarbones rise.',
      'Exhale in reverse: collarbones drop, chest falls, belly contracts and pulls in and up.',
      'Aim for 4–8 breaths per minute. This activates the parasympathetic nervous system within minutes.',
      'Keep the breath smooth and continuous — no pausing at the top or bottom.',
      'If the mind wanders, anchor back to the physical sensation of breath moving through the nostrils.',
      'After 3 minutes, pause. Notice the vibratory quality in the body — a buzzing or warmth in the hands is common.',
    ],
    tip: 'Long Deep Breathing alone is a complete practice. If you only have 3 minutes today, this is enough.',
  },
  {
    number: 3,
    title: 'Move',
    duration: '5–10 min',
    tagline: 'Spinal series',
    summary: 'A brief movement sequence to awaken the spine and energize the body.',
    details: [
      'SPINAL FLEX — Sit cross-legged, hands on knees. Inhale as you flex the spine forward (chest open), exhale as you round back. Rhythm: 1 cycle per breath. 26–54 repetitions.',
      'CAT-COW — Come to hands and knees. Inhale: drop the belly, arch the back, look up. Exhale: round the spine, tuck the chin. Move with the breath. 10–15 cycles.',
      'FROG POSE — Squat with heels together and raised, hands on the floor in front. Inhale as you straighten the legs (head down), exhale as you return to squat (head up). 11–26 repetitions.',
      'After the sequence, sit or lie in stillness for 1–2 minutes. Let the body integrate the movement.',
    ],
    tip: 'The spinal flex is considered the most important exercise in kundalini yoga. Even 26 repetitions per day is said to keep the spine flexible and the mind clear.',
  },
  {
    number: 4,
    title: 'Meditate',
    duration: '3 min',
    tagline: 'Sit. Observe. Return.',
    summary: 'Hands resting on knees, palms up. Close the eyes and focus at the brow point.',
    details: [
      'Bring your awareness to the point between the eyebrows (the third eye or ajna chakra).',
      'Begin Breath of Fire, or simply continue Long Deep Breathing if Breath of Fire is new to you.',
      'Breath of Fire: rapid, rhythmic breathing through the nose, equal emphasis on inhale and exhale, driven by the navel point pumping in and out. Aim for 2–3 cycles per second.',
      'If using breath counting: count each exhale from 1 to 10. When you lose count (and you will), return to 1 without judgment.',
      'When the timer ends, inhale deeply, hold for a moment, and exhale completely.',
    ],
    tip: 'Breath of Fire should not be practiced during pregnancy or menstruation. Long Deep Breathing is always a safe alternative.',
  },
  {
    number: 5,
    title: 'Close',
    duration: '1–2 min',
    tagline: 'Seal the practice',
    summary: 'Inhale deeply. Stretch both arms overhead, fingers spread wide.',
    details: [
      'Shake the hands rapidly above your head for 15–30 seconds — this distributes the energy moved during practice.',
      'Bring the hands down to the lap. Take one long, slow breath.',
      'Chant "Sat Nam" (Truth is my identity) once — long Sat, short Nam.',
      'This closes the practice, acknowledges the work done, and roots the energy back into the body.',
      'Sit in silence for one final minute. Notice what has shifted.',
    ],
    tip: '"Sat Nam" is the most fundamental kundalini mantra. It can also be used throughout the day as an instant centering tool.',
  },
];

// ── Chakra Data ──────────────────────────────────────────────
const chakras = [
  { name: 'Root (Muladhara)', location: 'Base of spine', color: '#CC3333', quality: 'Grounding, safety, survival' },
  { name: 'Sacral (Svadhisthana)', location: 'Lower abdomen', color: '#E8750A', quality: 'Creativity, emotion, pleasure' },
  { name: 'Solar Plexus (Manipura)', location: 'Navel center', color: '#E8C10A', quality: 'Power, will, confidence' },
  { name: 'Heart (Anahata)', location: 'Center of chest', color: '#3DA35D', quality: 'Love, compassion, connection' },
  { name: 'Throat (Vishuddha)', location: 'Throat', color: '#3D70A3', quality: 'Truth, expression, clarity' },
  { name: 'Third Eye (Ajna)', location: 'Between eyebrows', color: '#592E6B', quality: 'Intuition, wisdom, perception' },
  { name: 'Crown (Sahasrara)', location: 'Top of head', color: '#9B59B6', quality: 'Consciousness, transcendence' },
];

// ── Step Component ───────────────────────────────────────────
function PracticeStep({ step, isOpen, onToggle }: {
  step: typeof practiceSteps[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
      <div className="timeline-node">{step.number}</div>
      <div
        style={{
          background: 'var(--color-surface-raised)',
          border: `1px solid ${isOpen ? 'var(--color-violet-mid)' : 'var(--color-border)'}`,
          borderRadius: '2px',
          overflow: 'hidden',
          transition: 'border-color 300ms ease',
        }}
      >
        <button
          onClick={onToggle}
          style={{
            width: '100%',
            padding: '1.5rem 1.75rem',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-amber-deep)',
                }}
              >
                {step.duration}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-muted)',
                  fontStyle: 'italic',
                }}
              >
                {step.tagline}
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: isOpen ? 'var(--color-violet-deep)' : 'var(--color-text)',
                margin: '0 0 0.5rem',
                fontStyle: 'normal',
                transition: 'color 300ms ease',
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--color-text-muted)',
                margin: 0,
                lineHeight: 1.65,
              }}
            >
              {step.summary}
            </p>
          </div>
          <div
            style={{
              width: '1.75rem',
              height: '1.75rem',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-muted)',
              transition: 'transform 300ms ease',
              transform: isOpen ? 'rotate(180deg)' : 'none',
              marginTop: '0.25rem',
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
              padding: '0 1.75rem 1.75rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <ul
              style={{
                margin: '1.25rem 0',
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {step.details.map((detail, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '0.875rem',
                    alignItems: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: '1.25rem',
                      height: '1.25rem',
                      marginTop: '0.2rem',
                      borderRadius: '9999px',
                      background: 'var(--color-violet-mid)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.625rem',
                      color: 'var(--color-violet-deep)',
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      color: 'var(--color-text)',
                      margin: 0,
                      lineHeight: 1.75,
                    }}
                  >
                    {detail}
                  </p>
                </li>
              ))}
            </ul>

            <div
              style={{
                padding: '1rem 1.25rem',
                background: 'color-mix(in srgb, var(--color-amber-light) 15%, var(--color-cream))',
                borderLeft: '3px solid var(--color-amber-light)',
                borderRadius: '0 2px 2px 0',
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
                  margin: '0 0 0.375rem',
                }}
              >
                Teacher&apos;s tip
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-text)',
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                {step.tip}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function YogaClient() {
  const [openStep, setOpenStep] = useState<number | null>(1);

  const toggleStep = (n: number) => {
    setOpenStep(prev => prev === n ? null : n);
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(5rem, 10vw, 9rem) max(1.5rem, 8vw) clamp(3rem, 6vw, 5rem)',
          background: 'linear-gradient(160deg, oklch(55% 0.16 310), oklch(72% 0.1 290))',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative breathing orb */}
        <div
          className="breathe"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-5vw',
            bottom: '-5vw',
            width: 'clamp(250px, 40vw, 500px)',
            height: 'clamp(250px, 40vw, 500px)',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, oklch(75% 0.1 60 / 0.25) 0%, transparent 70%)',
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
              color: 'rgba(245,234,225,0.65)',
              margin: '0 0 1.25rem',
            }}
          >
            Kundalini Daily
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              color: '#F5EAE1',
              lineHeight: 1.05,
              margin: '0 0 0.875rem',
              maxWidth: '14ch',
            }}
          >
            Your 5-Minute Beginner&apos;s Practice
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
              color: 'rgba(245,234,225,0.82)',
              margin: '0 0 2.5rem',
              maxWidth: '50ch',
              lineHeight: 1.8,
            }}
          >
            A complete daily kundalini sequence — tune in, breathe, move, meditate, and close.
            Designed for beginners with no prior experience required.
          </p>

          {/* Nav anchor links */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['Practice', 'Techniques', 'Chakras', 'Safety'].map(label => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,234,225,0.75)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(228,173,117,0.5)',
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

      {/* ── What is Kundalini ────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
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
                What is Kundalini?
              </h2>
              <p style={{ marginBottom: '1.25rem', lineHeight: 1.85 }}>
                The word <em>kundalini</em> comes from Sanskrit, meaning &ldquo;coiled.&rdquo; It describes a dormant
                energy said to lie coiled at the base of the spine like a serpent — the fundamental
                life force that animates all biological and conscious activity.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Kundalini yoga is one branch of the eight-limbed path of yoga described in Patanjali&apos;s
                Yoga Sutras. While hatha yoga emphasizes physical postures and alignment, kundalini
                works primarily through pranayama (breathwork), mantra, mudra (hand gestures), and
                meditation to move and direct this energy upward through the chakra system.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <p style={{ lineHeight: 1.85, marginBottom: '1.25rem', marginTop: 'clamp(0rem, 2vw, 2rem)' }}>
                What distinguishes kundalini from other yoga styles is its directness. Rather than
                using physical flexibility as the goal, kundalini uses the body as a vehicle for
                consciousness expansion. The kriyas (action sequences) are specifically designed
                to produce predictable energetic effects — activating the nervous system,
                clearing blockages, and building what practitioners call &ldquo;shuniya&rdquo; — a state of
                zero, of pure receptive awareness.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Brought to the West by Yogi Bhajan in 1969, kundalini yoga was historically kept
                secret — a &ldquo;householder&apos;s yoga&rdquo; taught only to initiates. Today it remains one of the
                most transformative and least-understood branches of the tradition.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Practice Flow ────────────────────────────────── */}
      <section
        id="practice"
        style={{
          padding: 'clamp(4.5rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: 'color-mix(in srgb, var(--color-cream) 92%, var(--color-violet-mid))',
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
              The Sequence
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
              The Daily Practice
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
              Each step expands to reveal full instructions. Work through the sequence in order.
              Tap each step to begin.
            </p>
          </ScrollReveal>

          <div className="timeline" style={{ maxWidth: '760px' }}>
            {practiceSteps.map((step) => (
              <ScrollReveal key={step.number}>
                <PracticeStep
                  step={step}
                  isOpen={openStep === step.number}
                  onToggle={() => toggleStep(step.number)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Techniques Section ───────────────────────────── */}
      <section
        id="techniques"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
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
              Techniques
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 2.5rem',
              }}
            >
              Key Techniques
            </h2>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                name: 'Long Deep Breathing',
                sanskrit: 'Pranayama',
                description: 'The foundational breath practice. Inhale fully from belly to chest to collarbones. Exhale in reverse. Stimulates the vagus nerve and activates the parasympathetic state.',
                duration: '3–11 min',
              },
              {
                name: 'Breath of Fire',
                sanskrit: 'Agni Pranayama',
                description: 'Rapid, equal-emphasis nasal breath driven by the navel point. Purifies the blood, strengthens the nervous system, energizes. Not for pregnancy or menstruation.',
                duration: '1–3 min',
              },
              {
                name: 'Root Lock',
                sanskrit: 'Mulabandha',
                description: 'A subtle contraction of the muscles at the base of the spine — pelvic floor, perineum, and navel. Applied at the end of each exercise to seal and integrate energy.',
                duration: 'Brief hold',
              },
              {
                name: 'Sat Nam Mantra',
                sanskrit: 'Seed Mantra',
                description: '"Truth is my identity." The most fundamental kundalini mantra. Long Sat, short Nam. Can be chanted aloud, whispered, or repeated mentally with the breath.',
                duration: 'Throughout',
              },
            ].map((t) => (
              <ScrollReveal key={t.name}>
                <div
                  className="card"
                  style={{ padding: '1.75rem', borderRadius: '2px' }}
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
                    {t.sanskrit}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.75rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {t.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      margin: '0 0 1.25rem',
                      lineHeight: 1.7,
                    }}
                  >
                    {t.description}
                  </p>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      background: 'color-mix(in srgb, var(--color-amber-light) 25%, var(--color-cream))',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      color: 'var(--color-amber-deep)',
                    }}
                  >
                    Duration: {t.duration}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chakras ──────────────────────────────────────── */}
      <section
        id="chakras"
        style={{
          padding: 'clamp(4.5rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: 'color-mix(in srgb, var(--color-cream) 88%, var(--color-violet-mid))',
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
              Energy Centers
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
                maxWidth: '54ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Kundalini energy rises through seven major energy centers. Each chakra governs specific
              physical, emotional, and spiritual qualities.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.625rem',
              maxWidth: '700px',
            }}
          >
            {chakras.map((chakra, i) => (
              <ScrollReveal key={chakra.name}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '1rem 1.25rem',
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    borderLeft: `4px solid ${chakra.color}`,
                  }}
                >
                  <div
                    style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '9999px',
                      background: chakra.color,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        color: 'var(--color-text)',
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {chakra.name}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        margin: '0.125rem 0 0',
                      }}
                    >
                      {chakra.location} · {chakra.quality}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Kundalini Awakening ──────────────────────────── */}
      <section
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
              Understanding
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 2.5rem',
              }}
            >
              Kundalini Awakening
            </h2>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            <ScrollReveal>
              <div
                className="card"
                style={{ padding: '2rem 1.75rem', borderRadius: '2px' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '9999px',
                      background: 'color-mix(in srgb, var(--color-violet-mid) 40%, var(--color-cream))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-violet-deep)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22v-6M9 8l3-6 3 6M6 8h12M8 12l-2 4h12l-2-4" />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.375rem',
                      fontWeight: 600,
                      color: 'var(--color-violet-deep)',
                      margin: 0,
                      fontStyle: 'normal',
                    }}
                  >
                    Gradual Awakening
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--color-text-muted)',
                    margin: 0,
                    lineHeight: 1.8,
                  }}
                >
                  The most common and sustainable path. Through consistent daily practice over months
                  and years, energy rises gently and the nervous system adapts. Subtle shifts accumulate:
                  greater equanimity, clearer intuition, deepening meditative states. The body has time
                  to integrate each opening. This is the path this practice is designed to support.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div
                className="card"
                style={{ padding: '2rem 1.75rem', borderRadius: '2px' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '9999px',
                      background: 'color-mix(in srgb, var(--color-amber-light) 30%, var(--color-linen))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber-deep)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.375rem',
                      fontWeight: 600,
                      color: 'var(--color-amber-deep)',
                      margin: 0,
                      fontStyle: 'normal',
                    }}
                  >
                    Spontaneous Awakening
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--color-text-muted)',
                    margin: 0,
                    lineHeight: 1.8,
                  }}
                >
                  Less common, and often more disorienting. Can arise from intense practice, trauma, or
                  spontaneously without apparent cause. May involve powerful physical sensations (heat,
                  vibration, involuntary movement), emotional releases, or perceptual shifts. If this
                  occurs, slow down your practice, ground the body with physical activity, and seek
                  guidance from an experienced teacher.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Safety ───────────────────────────────────────── */}
      <section
        id="safety"
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5rem)',
          background: 'color-mix(in srgb, var(--color-cream) 88%, var(--color-linen))',
          borderTop: '1px solid var(--color-border)',
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
              Safety
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
              Practice Safely
            </h2>
            <p style={{ marginBottom: '1.25rem', lineHeight: 1.85, maxWidth: '58ch' }}>
              Kundalini yoga is a powerful technology. These notes are not warnings to discourage
              practice — they are reminders to practice intelligently.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
              marginTop: '1.75rem',
            }}
          >
            {[
              {
                title: 'Breath of Fire',
                note: 'Avoid during pregnancy and the first days of menstruation. Long Deep Breathing is always a safe substitute.',
              },
              {
                title: 'Medical conditions',
                note: 'Consult your physician before beginning any new movement or breathing practice, especially with cardiovascular, spinal, or respiratory conditions.',
              },
              {
                title: 'Intensity',
                note: 'Kundalini kriyas can produce strong physical and emotional responses. If something feels overwhelming, stop and rest in savasana (lying flat).',
              },
              {
                title: 'Progression',
                note: 'Start with shorter times and build gradually. 11 minutes of any kriya is considered a complete practice. Don\'t rush to 31 or 62 minutes.',
              },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <div
                  style={{
                    padding: '1.25rem 1.5rem',
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    borderTop: '3px solid var(--color-violet-mid)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      margin: '0 0 0.5rem',
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      margin: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    {item.note}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Back link ────────────────────────────────────── */}
      <section
        style={{
          padding: '4rem max(1.5rem, 8vw) 5rem',
          background: 'var(--color-cream)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
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
              marginBottom: '2rem',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Also explore meditation
          </Link>

          <blockquote style={{ margin: 0, padding: 0 }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 2.8vw, 1.75rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
                maxWidth: '54ch',
              }}
            >
              &ldquo;The purpose of kundalini yoga is to provide a direct experience of your own soul. In that experience lies all the love, wisdom, and vitality you will ever need.&rdquo;
            </p>
            <footer
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              — Yogi Bhajan
            </footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}
