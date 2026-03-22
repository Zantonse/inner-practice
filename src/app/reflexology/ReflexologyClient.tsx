'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import StatCard from '@/components/StatCard';

// ── Accent tokens (warm terracotta) ───────────────────────────
const TERRA_DEEP  = '#7A4030';
const TERRA_MID   = '#C4735A';
const TERRA_LIGHT = '#E8B49A';
const TERRA_PALE  = '#F5E5DF';

// ── Technique Data Interface (adapted for reflexology) ────────
interface TechniqueData {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'All Levels';
  pressure: string;
  description: string;
  steps: string[];
}

function levelColor(level: TechniqueData['level']) {
  if (level === 'Beginner')     return { bg: `color-mix(in srgb, ${TERRA_LIGHT} 30%, var(--color-cream))`, text: TERRA_DEEP };
  if (level === 'Intermediate') return { bg: 'color-mix(in srgb, var(--color-amber-light, #fde68a) 25%, var(--color-cream))', text: 'var(--color-amber-deep, #92400e)' };
  return { bg: 'color-mix(in srgb, #ddd6fe 25%, var(--color-cream))', text: '#5b21b6' };
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
        border: `1px solid ${isOpen ? TERRA_MID : 'var(--color-border)'}`,
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
              color: isOpen ? TERRA_DEEP : 'var(--color-text)',
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
              {item.pressure}
            </span>
          </div>
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
              color: TERRA_DEEP,
              margin: '0 0 0.875rem',
            }}
          >
            Technique steps
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

// ── Data Arrays ────────────────────────────────────────────────

const timelineEvents = [
  { year: '~2330 BC', event: 'Tomb of Ankhmahor at Saqqara, Egypt — two practitioners depicted treating feet and hands with the inscription "Do not let me feel pain"' },
  { year: '1898', event: 'Sir Henry Head charts "zones of hyperalgesia" (dermatomes), demonstrating neurological links between skin zones and internal organs' },
  { year: '1909', event: 'Dr. William Fitzgerald rediscovers zone therapy at St. Francis Hospital, Hartford, CT — maps 10 longitudinal zones of the body' },
  { year: '1917', event: 'Fitzgerald & Bowers publish Zone Therapy or Relieving Pain in the Home — the first popular text on foot zone therapy' },
  { year: '1930s', event: 'Dr. Joseph Shelby Riley adds eight horizontal zones to Fitzgerald\'s longitudinal ones and creates first detailed foot reflex diagrams' },
  { year: '1938', event: 'Eunice Ingham publishes Stories the Feet Can Tell — the foundational modern text mapping every organ to a specific foot reflex point' },
  { year: '1950s', event: 'French physician Dr. Paul Nogier develops auricular reflex charts, mapping an inverted-fetus image onto the outer ear' },
  { year: '1958', event: 'Hanne Marquardt reads Ingham\'s book in Germany; later studies with Ingham; introduces three transverse zone lines (shoulder, waist, pelvic) now standard in European practice' },
  { year: '1965', event: 'Melzack & Wall publish Gate Control Theory of Pain in Science — provides the first plausible neurological mechanism for reflexology\'s analgesic effect' },
  { year: '1980s', event: 'Professional associations founded — ARCB (certification), RAA (membership advocacy), and international equivalents' },
  { year: '2020s', event: 'Meta-analyses in cancer care and multiple sclerosis show consistent pain and anxiety reduction with I²=0% in the MS cohort' },
];

const keyFigures = [
  {
    name: 'William Fitzgerald',
    role: 'Father of Zone Therapy',
    dates: '1872–1942',
    contribution: 'American laryngologist who mapped 10 longitudinal zones of the body and used pressure on digits to produce analgesia during minor procedures. Trained in Vienna where he encountered European reflex work.',
  },
  {
    name: 'Eunice Ingham',
    role: 'Mother of Modern Reflexology',
    dates: '1889–1974',
    contribution: 'Physiotherapist who focused zone therapy onto the feet specifically, developed the Ingham Compression Technique (thumb-walking), and painstakingly mapped every organ to a corresponding foot reflex point over decades of clinical work.',
  },
  {
    name: 'Hanne Marquardt',
    role: 'European Systematizer',
    dates: 'b. 1930s',
    contribution: 'German reflexologist who added the three transverse zone lines (shoulder, diaphragm, waist, pelvic) that created the grid system now standard in European training. Studied directly with Ingham in the 1970s.',
  },
  {
    name: 'Paul Nogier',
    role: 'Auricular Reflexology Pioneer',
    dates: '1908–1996',
    contribution: 'French physician who mapped an inverted-fetus image onto the outer ear in the 1950s, developing auriculotherapy — a parallel reflex system that overlaps with but was developed independently from TCM ear acupuncture.',
  },
];

const theoreticalFrameworks = [
  {
    name: 'Zone Theory',
    origin: 'Fitzgerald / Ingham',
    summary: 'The body divided into 10 longitudinal zones and 4 horizontal zones creates a grid. Pressure on a reflex point in a zone sends a signal along that zone to the corresponding body area.',
    strength: 'Provides a practical navigation system that has guided clinical practice for 100+ years.',
    weakness: 'No anatomical structure corresponds to the zones. Energy channels have not been measured by Western instrumentation.',
  },
  {
    name: 'Meridian Theory',
    origin: 'TCM-influenced practice',
    summary: 'Six of the 12 TCM meridians begin or end in the toes and feet. Reflexology\'s solar plexus point (K1) is the most significant meridian endpoint on the sole — Kidney-1 in TCM.',
    strength: 'Explains why specific foot points affect specific organs using a 3,000-year framework with its own internal consistency.',
    weakness: 'Meridians and zones are different spatial grids — they agree on some points and conflict on others.',
  },
  {
    name: 'Nerve Reflex Theory',
    origin: 'Head, Sherrington, Melzack & Wall',
    summary: '7,200 nerve endings per foot. Gate Control Theory (1965) shows sensory foot input can block pain signals at the spinal cord. Parasympathetic activation follows deep foot stimulation through vagal pathways.',
    strength: 'Best supported by peer-reviewed evidence. Explains analgesic and relaxation effects through known neurological mechanisms.',
    weakness: 'Does not fully explain why a specific foot zone would selectively affect a specific distant organ rather than producing generalized response.',
  },
  {
    name: 'Structural / Proprioceptive Theory',
    origin: 'Integrative Reflexology (C.M. Miller)',
    summary: 'The foot\'s three arches structurally mirror the body\'s core organization. 7,200 proprioceptors per foot send continuous positional data to the brain; reflexology reactivates deadened proprioceptive communication.',
    strength: 'Bridges traditional maps with fascia science and structural bodywork — mechanistically credible.',
    weakness: 'Less fully developed in published research than nerve reflex theory.',
  },
];

const zoneCards = [
  {
    zone: 'Toes',
    region: 'Head, Neck, Sinuses',
    reflexes: ['Brain and pituitary gland (big toe center whorl)', 'Pineal gland and hypothalamus (outer tip of big toe)', 'Eyes (2nd–3rd toe cushion pads)', 'Ears (4th–5th toe cushion pads)', 'Sinus tips across all 10 toes', 'Seven cervical vertebrae (base of big toe, inner edge)'],
  },
  {
    zone: 'Ball of Foot',
    region: 'Thorax / Chest',
    reflexes: ['Lungs (both feet, 2nd to just past 4th toe)', 'Heart (left foot only)', 'Thyroid and parathyroid (base of big toe)', 'Thymus (inner ball area)', 'Diaphragm line (base of ball — key zone boundary)', 'Solar plexus (apex of arch below ball — primary relaxation point)'],
  },
  {
    zone: 'Upper Arch',
    region: 'Upper Abdomen',
    reflexes: ['Liver (right foot only — large area below diaphragm)', 'Gallbladder (right foot, within liver zone under 3rd–4th toes)', 'Stomach (both feet; larger on left)', 'Pancreas (below stomach, above waist)', 'Kidneys (just above waistline, inner arch)', 'Adrenal glands (atop kidney reflexes)', 'Spleen (left foot only — mirror of liver)'],
  },
  {
    zone: 'Lower Arch',
    region: 'Lower Abdomen',
    reflexes: ['Small intestine (inner arch, waist to pelvic line)', 'Ascending colon (right foot — from ileocecal valve upward)', 'Transverse colon (crosses both feet)', 'Descending and sigmoid colon (left foot)', 'Bladder (inner side, below inner ankle)', 'Ureters (visible lines linking kidney to bladder)'],
  },
  {
    zone: 'Heel',
    region: 'Pelvic Region',
    reflexes: ['Sciatic nerve (band across middle third of heel pad)', 'Sacrum and coccyx (lower heel, inner side)', 'Hip and pelvis (heel generally)', 'Reproductive organs (outer and inner ankle areas)'],
  },
  {
    zone: 'Inner Edge',
    region: 'Spine',
    reflexes: ['Cervical vertebrae (base of big toenail to base of big toe)', 'Thoracic vertebrae (ball of foot along inner edge)', 'Lumbar vertebrae (arch, waistline to pelvic line)', 'Sacrum and coccyx (inner heel to base of heel)', 'The inner curve of the foot mirrors the spinal S-curve exactly'],
  },
  {
    zone: 'Outer Edge',
    region: 'Limbs',
    reflexes: ['Shoulder and upper arm (base of toes to diaphragm line)', 'Elbow, forearm, wrist, hand (diaphragm to waist line)', 'Hip, knee, and leg (waist line to end of heel)', 'Both sides of the body are bilaterally mapped on both feet'],
  },
];

const techniques: TechniqueData[] = [
  {
    id: 'thumb-walking',
    name: 'Thumb-Walking (Ingham Compression)',
    level: 'Beginner',
    pressure: 'Light to Medium',
    description: 'The foundational reflexology technique developed by Eunice Ingham. The thumb bends and straightens in a caterpillar-like motion, applying continuous forward pressure in small incremental bites. Unlike massage strokes that slide over skin, thumb-walking maintains consistent contact and applies pressure in one direction only — always forward, never backward. This is the technique used for the majority of systematic reflex work across every zone of the foot.',
    steps: [
      'Bend the thumb at the first interphalangeal joint (not the knuckle — the joint closest to the tip).',
      'Walk forward in small caterpillar-like bites — bend, unbend, move forward one small step, bend again.',
      'Maintain constant even pressure throughout — the thumb never slides; it walks.',
      'Work in overlapping strips across each zone, covering the entire area systematically.',
      'Keep the working hand relaxed — tension in your hand transfers directly to the client.',
      'The supporting hand holds the foot steady and provides counter-pressure, making the working thumb\'s job easier.',
    ],
  },
  {
    id: 'finger-walking',
    name: 'Finger-Walking',
    level: 'Beginner',
    pressure: 'Light',
    description: 'The same caterpillar motion as thumb-walking but performed with the index finger. Used when working on the top (dorsal) surface of the foot, between tendons, and around the ankle where the thumb cannot comfortably reach. Particularly effective for lymph drainage points across the top of the foot and ankle, and for working the lung reflex on the dorsal surface. The finger-walking motion is slightly gentler than thumb-walking by nature of the finger\'s smaller contact surface.',
    steps: [
      'Use the index finger, bending at the first joint closest to the fingertip.',
      'Walk in small forward steps with even pressure — same caterpillar motion as thumb-walking.',
      'Apply when working the top of the foot, around the ankle, or between the metatarsal tendons.',
      'Particularly useful for the lymph drainage reflex band that runs across the top of the foot between the two anklebones.',
      'Use lighter pressure than thumb-walking — the dorsal surface is more sensitive.',
      'Walk across rather than along tendons to avoid discomfort.',
    ],
  },
  {
    id: 'hook-backup',
    name: 'Hook & Back-Up',
    level: 'Intermediate',
    pressure: 'Medium to Firm',
    description: 'A pinpoint technique for accessing small, deep reflex points that cannot be adequately stimulated with the walking motion. The pituitary gland reflex (central whorl of the big toe), the ileocecal valve, and the pineal gland are classic hook-and-backup points. The motion is precise: press in, hook slightly toward you, hold, release. It is not a stroke — it is a stationary, directional hold. Because the technique delivers more concentrated pressure to a small area, it should be used sparingly and only after the zone has been warmed with thumb-walking.',
    steps: [
      'Thumb-walk to the target reflex point to locate and warm the area first.',
      'Position the thumb tip directly over the specific point.',
      'Apply firm inward pressure with the thumb tip.',
      'Hook the thumb slightly toward you — toward the heel — bending the thumb to direct pressure into the tissue at an angle.',
      'Hold for 3–5 seconds, monitoring client response.',
      'Release gradually and move on — do not over-stimulate a single point; return to it 2–3 times during the session if needed.',
    ],
  },
  {
    id: 'rotation-point',
    name: 'Rotation on a Point',
    level: 'Intermediate',
    pressure: 'Medium',
    description: 'Used on tender or congested reflex points where direct static pressure would be too intense but the area needs sustained attention. The key distinction of this technique: the movement comes entirely from the supporting hand rotating the foot around a stationary working thumb — the thumb itself does not move. This makes it effective for the solar plexus point and for any zone where the client reports significant tenderness, because the rotation disperses the pressure sensation.',
    steps: [
      'Locate the tender point with thumb pressure during thumb-walking.',
      'Hold steady, light pressure with the working thumb on the point.',
      'With the supporting hand gripping the ball of the foot, slowly rotate the foot around the stationary thumb.',
      'Complete 2–3 full rotations clockwise, then 2–3 counter-clockwise.',
      'The foot moves — the thumb stays still.',
      'Release gradually. The point will often feel less tender on revisit.',
    ],
  },
  {
    id: 'pressure-calibration',
    name: 'Pressure Calibration',
    level: 'All Levels',
    pressure: 'Variable',
    description: 'Reading the client\'s response to find the therapeutic window — the pressure level that is firm enough to stimulate but not painful enough to create guarding. Pressure calibration is not a single technique but an ongoing skill that runs throughout every session. The therapeutic window is different for every client and shifts moment to moment depending on the zone being worked. New practitioners universally start too heavy; developing a genuinely light touch takes conscious effort and practice.',
    steps: [
      'Start every session at 3/10 pressure — lighter than you think is effective.',
      'Ask: "How does this pressure feel on a scale of 1 to 10?" Aim for their 4–6.',
      'Increase gradually until the client reports "good pressure" or "comfortably firm."',
      'Tender spots: reduce to 50% of your working pressure. Tenderness is information — do not push through it.',
      'Never work through pain — a client grimacing or gripping the chair is a signal to immediately lighten up.',
      'Check in verbally every 5–8 minutes: pressure preferences change as the session progresses and the client relaxes.',
    ],
  },
];

const evidenceRows = [
  { condition: 'Multiple sclerosis pain', strength: 'Strong', direction: 'Positive', notes: 'Meta-analysis I²=0%; consistent analgesic effect across studies' },
  { condition: 'Cancer anxiety and pain', strength: 'Moderate', direction: 'Positive', notes: '26 RCTs, 2,465 patients; evidence quality rated low to moderate' },
  { condition: 'Pregnancy and labor pain', strength: 'Moderate', direction: 'Positive', notes: '13 RCTs; significant pain reduction and shorter labor duration' },
  { condition: 'General anxiety and stress', strength: 'Moderate', direction: 'Positive', notes: 'Most consistent finding across all settings; effect sizes d=0.4–0.7' },
  { condition: 'Chronic headache', strength: 'Weak', direction: 'Trend positive', notes: 'Small samples; no adequate sham-controlled trials' },
  { condition: 'Digestive disorders', strength: 'Weak', direction: 'Insufficient data', notes: 'Clinical reports but no qualifying RCTs' },
  { condition: 'Fertility and reproductive', strength: 'None', direction: 'No evidence', notes: 'No quality controlled trials; traditional/anecdotal claims only' },
];

const mechanismRows = [
  { mechanism: 'Gate Control Theory', description: 'Sensory input from foot stimulation travels via fast myelinated A-beta fibers and can "close the gate" at the spinal cord, blocking slower C-fiber pain signals from reaching the brain.', evidence: 'Established — Melzack & Wall (1965); neurologically validated' },
  { mechanism: 'Vagal Activation', description: 'Deep foot stimulation activates vagal afferents in the lower limb, triggering parasympathetic dominance — reduced heart rate, blood pressure, and cortisol.', evidence: 'Plausible — consistent with observed HRV and relaxation findings' },
  { mechanism: 'Neuroimaging', description: 'fMRI studies have shown that reflexology foot stimulation activates somatosensory cortex in patterns consistent with the reported reflex correspondences, though studies are small.', evidence: 'Preliminary — 2–3 small studies; needs replication' },
  { mechanism: 'C-Tactile Afferents', description: 'Gentle sustained touch activates C-tactile nerve fibers that project to the insula (not somatosensory cortex), triggering emotional regulation, bonding, and interoceptive circuits.', evidence: 'Established for gentle touch; application to reflexology is inferred' },
  { mechanism: 'Fascial Continuity', description: 'The plantar fascia connects to every myofascial chain in the body. Sustained pressure on the sole may transmit mechanical signals along fascial planes to distant structures.', evidence: 'Plausible — consistent with fascia research; not directly tested for reflexology' },
  { mechanism: 'Zone Theory (traditional)', description: 'Pressure in a longitudinal zone sends a signal along that zone to the corresponding body organ. The mechanism is described as "energy" — not specified as nerve, meridian, or otherwise.', evidence: 'Traditional — not validated; no anatomical zones have been identified' },
];

const sessionPhases = [
  {
    num: '01',
    phase: 'Setup & Intake',
    duration: '0–10 min',
    steps: [
      'Warm the room (68–72°F) and dim the lighting before the client arrives',
      'Review the completed health history intake form together — ask about any checked conditions',
      'Scope of practice statement: "This session is for relaxation and wellness support — I won\'t be diagnosing anything"',
      'Explain what to expect: "You may feel tenderness in some areas — please let me know if pressure is uncomfortable at any time"',
      'Client removes shoes and socks; assist to reclined position',
      'Brief visual assessment: color, temperature, skin condition, swelling, structural variations',
    ],
  },
  {
    num: '02',
    phase: 'Opening Relaxation',
    duration: '10–20 min',
    steps: [
      'Grasp both feet simultaneously at the start — initial bilateral contact establishes trust and warms the tissue',
      'Apply a small amount of unscented lotion or cream',
      'Effleurage: long stroking passes heel to toes and back, 3–5 passes per foot, to warm tissue and establish contact',
      'Ankle rotation: cup heel in one hand, grasp ball with other; rotate 5 times clockwise, 5 counter-clockwise',
      'Toe rotation: each toe individually, 3 rotations each direction, gentle traction',
      'Metatarsal kneading: fingers on top, thumbs on sole — wring across the ball to activate thoracic zone reflexes',
      'Solar plexus breathing: thumbs on solar plexus reflex below ball of both feet; press gently on client\'s inhale, release on exhale — 3 cycles',
    ],
  },
  {
    num: '03',
    phase: 'Systematic Reflex Work — Right Foot',
    duration: '20–38 min',
    steps: [
      'Work zones top to bottom, mirroring the body\'s anatomical divisions',
      'Toes (head/neck zone): thumb-walk each toe pad systematically; pituitary point at big toe whorl via hook-and-backup',
      'Ball of foot (thorax): thumb-walk horizontally across in strips; cover lung, thyroid, solar plexus',
      'Upper arch (abdomen): liver and gallbladder on right foot only; stomach, pancreas, kidneys, adrenals bilateral',
      'Lower arch (lower abdomen): small intestine, ileocecal valve (right only), ascending and transverse colon, bladder, ureters',
      'Heel (pelvic zone): sciatic nerve band across heel pad, sacrum/coccyx on inner heel',
      'Inner edge (spine): thumb-walk up and down the medial edge — cervical at big toe base through sacrum at inner heel',
      'Note tender spots and crystal deposits — revisit 2–3 times with lighter pressure; document findings',
    ],
  },
  {
    num: '04',
    phase: 'Systematic Reflex Work — Left Foot',
    duration: '38–52 min',
    steps: [
      'Repeat opening relaxation techniques as transition before beginning left foot work',
      'Same systematic sequence as right foot — toes through heel, then spinal edge',
      'Heart reflex is present on the left foot (absent from right)',
      'Spleen replaces liver on the left foot; descending colon and sigmoid colon replace ascending colon',
      'Stomach and pancreas zones are larger on the left foot',
      'Transverse colon crosses from the right foot — continue the line across the left arch, then turn down',
      'Continue noting and revisiting tender areas; compare left to right for symmetry of findings',
    ],
  },
  {
    num: '05',
    phase: 'Closing & Aftercare',
    duration: '52–60 min',
    steps: [
      'Light effleurage over both feet — long soothing strokes to calm the nervous system',
      'Bilateral solar plexus hold: both thumbs simultaneously on each foot\'s solar plexus point; press on inhale, release on exhale — 2–3 breath cycles',
      'Gentle toe traction on each toe, both feet',
      'Wrap feet in warm towel or light blanket',
      'Give client time to rest quietly — do not rush them up; bring a glass of water',
      'Share observations conversationally, never as diagnosis: "I noticed sensitivity in the digestive zone — is that an area you\'ve been noticing anything with?"',
      'Provide written aftercare instructions; recommend series of 3–6 sessions; invite rebooking',
    ],
  },
];

const aftercareItems = [
  { response: 'Increased urination', detail: 'Common in the 24 hours following a session; may be darker or stronger-smelling. Drink extra water.' },
  { response: 'Fatigue', detail: 'Deep relaxation often produces tiredness afterward. Rest if possible; avoid strenuous activity.' },
  { response: 'Emotional release', detail: 'Heightened emotions, unexpected tearfulness, or vivid dreams are common responses — not causes for concern.' },
  { response: 'Disrupted sleep', detail: 'Either deeper than usual or more restless. Both are common and resolve within 48 hours.' },
  { response: 'Mild headache', detail: 'Typically passes within a few hours. Drinking water and resting helps.' },
  { response: 'Increased thirst', detail: 'Respond by drinking water. Avoid caffeine and alcohol for 24 hours.' },
  { response: 'More frequent bowel movements', detail: 'Or increased flatulence. Normal response; resolves within 24 hours.' },
];

const certBodies = [
  {
    name: 'ARCB',
    full: 'American Reflexology Certification Board',
    type: 'Certification Board',
    scope: 'United States',
    credential: 'ARCB Certified Reflexologist',
    requirements: '200 hours training (30 hrs live practical minimum) + written exam via Prometric',
    ce: '12 CE hours every 2 years',
    best: 'Legal credentialing; referenced in state laws; foundational professional baseline',
    url: 'arcb.net',
  },
  {
    name: 'RAA',
    full: 'Reflexology Association of America',
    type: 'Membership Association',
    scope: 'United States (national chapters)',
    credential: 'Member status tiers (Practitioner / Advanced Practitioner)',
    requirements: '200–300 documented hours depending on tier; 60% must be live in-person',
    ce: 'Not set by RAA; national conference provides CE credits',
    best: 'Networking, legislative advocacy, public directory, national community',
    url: 'reflexology-usa.org',
  },
  {
    name: 'ICR',
    full: 'International Council of Reflexologists',
    type: 'International Community',
    scope: '58+ countries; headquartered in Glenwood, South Africa',
    credential: 'Membership only (no exam or credential conferred)',
    requirements: 'Open to any practicing reflexologist globally',
    ce: 'Hosts master classes including oncology and palliative reflexology CE',
    best: 'International community; World Reflexology Week; oncology/palliative specialty',
    url: 'icr-reflexology.org',
  },
];

const stateLaw = [
  {
    category: 'Dedicated Reflexology Law',
    color: '#2D6A4F',
    bg: 'rgba(45,106,79,0.08)',
    border: 'rgba(45,106,79,0.3)',
    description: 'These states regulate reflexology independently — not under massage therapy. Typically require ~200 hours of training plus a separate exam or registration.',
    states: ['Washington', 'North Dakota', 'Tennessee', 'New Hampshire', 'Nevada'],
  },
  {
    category: 'Exempt from Massage Licensing',
    color: '#92400e',
    bg: 'rgba(146,64,14,0.08)',
    border: 'rgba(146,64,14,0.3)',
    description: 'Reflexology is NOT regulated separately and does NOT require a massage therapy license. Comply with local business licensing only.',
    states: ['California', 'Colorado', 'Texas', 'Arizona', 'Connecticut', 'Georgia', 'Idaho', 'Illinois (through Jan 2027)', 'Indiana', 'Iowa', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Missouri', 'Montana', 'New Jersey', 'New Mexico', 'North Carolina', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Utah', 'Wisconsin'],
  },
  {
    category: 'No Applicable Regulation',
    color: '#5b21b6',
    bg: 'rgba(91,33,182,0.08)',
    border: 'rgba(91,33,182,0.3)',
    description: 'No massage law and no reflexology law — reflexology is currently unregulated. Always verify current status before practice.',
    states: ['Kansas', 'Minnesota', 'Vermont', 'Wyoming'],
  },
];

const trainingSteps = [
  { step: '01', text: 'Check your state\'s legal requirements before enrolling in any program — arcb.net/Legislation and your state board website.' },
  { step: '02', text: 'Choose a 200-hour program that covers all 8 ARCB curriculum subjects. Verify with the National Council of Reflexology Educators (reflexedu.org) for accredited educators.' },
  { step: '03', text: 'Complete 200 hours including at least 30 hours of live, in-person practical instruction. Document all hours with a training transcript.' },
  { step: '04', text: 'Apply for ARCB certification — submit intake form, training transcript, and one SOAP Note; pass the background check; schedule via Prometric.' },
  { step: '05', text: 'Join the RAA at the Professional Reflexology Practitioner level — ARCB certification satisfies their educational requirement.' },
  { step: '06', text: 'Get ABMP liability insurance before seeing any paying clients — $229/year for certified members ($89 for first-year graduates).' },
  { step: '07', text: 'Obtain a business license — local business license minimum; check zoning if practicing from home; DBA if using a business name.' },
  { step: '08', text: 'Maintain 12 CE hours every 2 years for ARCB renewal. Consider a specialty (prenatal, oncology, VRT) after 6–12 months of general practice.' },
];

const crossLinks = [
  {
    title: 'Reflexology + Fascia',
    href: '/fascia',
    description: 'The foot\'s plantar fascia connects to every myofascial chain in the body. Reflexology\'s structural theory — the arches mirroring the body\'s organization — maps directly to fascial continuity research.',
  },
  {
    title: 'Reflexology + Nervous System',
    href: '/nervous-system',
    description: '7,200 nerve endings per foot. Gate control theory, vagal activation, C-tactile afferents, and parasympathetic response — reflexology is, mechanistically, nervous system work delivered through the foot.',
  },
  {
    title: 'Reflexology + Breathwork',
    href: '/breathe',
    description: 'The solar plexus hold with synchronized breathing is the session\'s most powerful moment — where touch and breath converge. The diaphragm reflex line is the pivot of every reflexology session.',
  },
  {
    title: 'Reflexology + Somatics',
    href: '/somatics',
    description: 'Both modalities work through the body to reach the mind. Reflexology\'s proprioceptive theory — 7,200 proprioceptors re-awakened by skilled touch — shares its deepest roots with somatic awareness practice.',
  },
];

// ── Component ──────────────────────────────────────────────────
export default function ReflexologyClient() {
  const [openTechnique, setOpenTechnique] = useState<string | null>(null);

  function toggleTechnique(id: string) {
    setOpenTechnique(prev => (prev === id ? null : id));
  }

  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: 1.8, color: 'var(--color-text)' }}>

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
          background: 'linear-gradient(160deg, oklch(30% 0.08 30), oklch(40% 0.06 25))',
          overflow: 'hidden',
        }}
      >
        {/* Hero image */}
        <Image
          src="/images/hero-reflexology.webp"
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
            Reflexology
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              color: '#F5EAE1',
              lineHeight: 1.05,
              margin: '0 0 1.5rem',
              maxWidth: '14ch',
            }}
          >
            The Body in the Foot
          </h1>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'rgba(245,234,225,0.85)',
              margin: '0 0 2.5rem',
              maxWidth: '48ch',
              lineHeight: 1.75,
            }}
          >
            5,000 years of mapped pressure therapy &mdash; from Egyptian tombs to modern clinical evidence. How 7,200 nerve endings became a complete map of the human body.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['History', 'Map', 'Techniques', 'Evidence', 'Session', 'Training', 'Connect'].map(label => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: TERRA_MID,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${TERRA_MID}`,
                  paddingBottom: '0.25rem',
                  transition: 'opacity 200ms ease',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHAT IS REFLEXOLOGY
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw)',
          background: `linear-gradient(180deg, var(--color-cream) 0%, color-mix(in srgb, ${TERRA_PALE} 30%, var(--color-cream)) 100%)`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>The Practice</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 2.5rem' }}>
              What Is Reflexology?
            </h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', marginBottom: '3rem' }}>
            <ScrollReveal>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Reflexology is a structured touch practice in which specific pressure is applied to reflex points on the feet, hands, and ears, with the intention of producing therapeutic responses in corresponding areas of the body. A qualified session practitioner applies thumb-walking and finger-walking techniques systematically across the entire foot, covering all ten longitudinal zones and the four horizontal zone lines.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Reflexology is a <strong>wellness practice</strong>, not a medical intervention. Reflexologists do not diagnose disease, prescribe treatment, or claim to cure conditions. They work within a scope of practice centered on relaxation, stress reduction, and supporting the body&rsquo;s natural functioning. The Eunice Ingham lineage &mdash; the dominant Western tradition &mdash; is based on her meticulous mapping of 7,200 nerve endings to reflex correspondences for every organ, gland, and structure in the body.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Modern practitioners are trained to use the Ingham Compression Technique alongside a working knowledge of anatomy, contraindications, and SOAP note documentation. A standard professional session runs 60 minutes; initial intake sessions 75&ndash;90 minutes to include health history review.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.25rem', fontStyle: 'normal' }}>Four Theoretical Frameworks</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {theoreticalFrameworks.map(f => (
                  <div
                    key={f.name}
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      padding: '1.125rem 1.25rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.375rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)', margin: 0, fontStyle: 'normal' }}>{f.name}</h4>
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 500, color: 'var(--color-text-muted)', letterSpacing: '0.06em' }}>{f.origin}</span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: '0 0 0.5rem' }}>{f.summary}</p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <p style={{ fontSize: '0.75rem', color: '#2D6A4F', margin: 0, lineHeight: 1.5 }}><strong>Strength:</strong> {f.strength}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Callout box */}
          <ScrollReveal>
            <div
              style={{
                background: TERRA_PALE,
                border: `1px solid ${TERRA_LIGHT}`,
                borderLeft: `4px solid ${TERRA_MID}`,
                borderRadius: '2px',
                padding: '1.5rem 2rem',
              }}
            >
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 600, color: TERRA_DEEP, margin: '0 0 0.5rem', lineHeight: 1.35 }}>
                7,200 nerve endings per foot
              </p>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.75 }}>
                Among the densest somatosensory surfaces in the human body. Every step sends a cascade of neural data from sole to brain &mdash; and skilled pressure sends it back in the other direction.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          HISTORY TIMELINE
      ══════════════════════════════════════════════════════ */}
      <section
        id="history"
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>Origins</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
              A 5,000-Year Timeline
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              From Egyptian tomb inscriptions to 21st-century clinical trials &mdash; the long arc from intuitive pressure therapy to mapped reflex science.
            </p>
          </ScrollReveal>

          {/* Timeline */}
          <div style={{ position: 'relative', marginBottom: '4rem' }}>
            <div
              style={{
                position: 'absolute',
                left: '5.5rem',
                top: 0,
                bottom: 0,
                width: '1px',
                background: `linear-gradient(to bottom, ${TERRA_LIGHT}, transparent)`,
              }}
              aria-hidden="true"
            />
            {timelineEvents.map((e, i) => (
              <ScrollReveal key={i}>
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.75rem', alignItems: 'flex-start' }}>
                  <div style={{ minWidth: '4.5rem', textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, color: TERRA_MID, letterSpacing: '0.04em' }}>{e.year}</span>
                  </div>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '9999px',
                      background: TERRA_MID,
                      marginTop: '0.3rem',
                      flexShrink: 0,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                  <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>{e.event}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Key Figures Grid */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>Key Figures</h3>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {keyFigures.map(f => (
              <ScrollReveal key={f.name}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem' }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: TERRA_DEEP, margin: '0 0 0.25rem' }}>{f.dates}</p>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.25rem', fontStyle: 'normal' }}>{f.name}</h4>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontStyle: 'italic', color: TERRA_MID, margin: '0 0 0.875rem' }}>{f.role}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>{f.contribution}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* History StatCards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <ScrollReveal>
              <StatCard
                source="Tomb of Ankhmahor, Saqqara"
                stat="~2330 BC"
                detail="Earliest known depiction of foot and hand pressure therapy — Egyptian inscription accompanying the scene reads 'Do not let me feel pain.'"
                accentColor={TERRA_MID}
                accentTextColor={TERRA_DEEP}
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Eunice Ingham"
                stat="Stories the Feet Can Tell (1938)"
                detail="The foundational modern text that mapped every organ, gland, and body structure to a specific foot reflex point — the text that created professional reflexology."
                accentColor={TERRA_MID}
                accentTextColor={TERRA_DEEP}
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Cochrane / MS Research (2023)"
                stat="Significant pain reduction (I\u00b2=0%)"
                detail="Meta-analysis of reflexology for multiple sclerosis patients showed consistent analgesic effects with no statistical heterogeneity across studies — a rare finding in CAM research."
                url="https://pubmed.ncbi.nlm.nih.gov/"
                accentColor={TERRA_MID}
                accentTextColor={TERRA_DEEP}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          THE FOOT MAP
      ══════════════════════════════════════════════════════ */}
      <section
        id="map"
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw)',
          background: `color-mix(in srgb, var(--color-cream) 88%, ${TERRA_PALE})`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>Anatomy of the Map</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
              The Reflex Map
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '60ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              Hanne Marquardt&rsquo;s addition of four transverse zone lines to Fitzgerald&rsquo;s ten longitudinal zones created the grid system now standard in professional practice. The four lines &mdash; shoulder, diaphragm, waist, and pelvic &mdash; divide the foot into bands that mirror the body&rsquo;s anatomical compartments.
            </p>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '60ch', lineHeight: 1.75 }}>
              The <strong>shoulder line</strong> runs across the base of the toes, separating the head/neck zone above from the thoracic zone below. The <strong>diaphragm line</strong> runs across the base of the ball of the foot. The <strong>waist line</strong> crosses the midpoint of the arch. The <strong>pelvic line</strong> marks where the arch meets the heel pad.
            </p>
          </ScrollReveal>

          {/* Zone Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
            {zoneCards.map((z, i) => (
              <ScrollReveal key={z.zone}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    padding: '1.75rem',
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: TERRA_DEEP, margin: '0 0 0.375rem' }}>Zone {i + 1}</p>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.25rem', fontStyle: 'normal' }}>{z.zone}</h4>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontStyle: 'italic', color: TERRA_MID, margin: '0 0 1rem' }}>{z.region}</p>
                  <ul style={{ margin: 0, padding: '0 0 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {z.reflexes.map((r, ri) => (
                      <li key={ri} style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{r}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Map callout */}
          <ScrollReveal>
            <div
              style={{
                background: TERRA_PALE,
                border: `1px solid ${TERRA_LIGHT}`,
                borderLeft: `4px solid ${TERRA_MID}`,
                borderRadius: '2px',
                padding: '1.5rem 2rem',
              }}
            >
              <p style={{ fontSize: '0.9375rem', color: TERRA_DEEP, margin: 0, lineHeight: 1.75 }}>
                <strong>Laterality note:</strong> The right foot maps the right side of the body. The liver and gallbladder appear only on the right foot; the spleen and heart appear only on the left. The ascending colon is on the right foot; the descending and sigmoid colon are on the left. Bilateral organs &mdash; lungs, kidneys, adrenals &mdash; appear on both feet.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          CORE TECHNIQUES
      ══════════════════════════════════════════════════════ */}
      <section
        id="techniques"
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>Hands-On</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
              Core Techniques
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              Reflexology uses a small set of highly specific manual techniques. Unlike massage, which glides over the skin, reflexology techniques walk, hook, and hold &mdash; applying pressure in precise increments across mapped reflex zones.
            </p>
          </ScrollReveal>

          <div>
            {techniques.map((t, i) => (
              <ScrollReveal key={t.id}>
                <TechniqueItem
                  item={t}
                  isOpen={openTechnique === t.id}
                  onToggle={() => toggleTechnique(t.id)}
                  index={i}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          THE EVIDENCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="evidence"
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw)',
          background: `color-mix(in srgb, var(--color-cream) 88%, ${TERRA_PALE})`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>Research</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
              The Evidence
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              Reflexology has been examined in dozens of RCTs and several systematic reviews. The strongest evidence is for pain reduction and anxiety relief, particularly in cancer supportive care and multiple sclerosis.
            </p>
          </ScrollReveal>

          {/* Evidence StatCards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <ScrollReveal>
              <StatCard
                source="MS Meta-Analysis (2023)"
                stat="Pain reduction with I\u00b2=0%"
                detail="Reflexology showed consistent analgesic effects in multiple sclerosis patients with zero statistical heterogeneity across studies — the most robust finding in the reflexology literature."
                url="https://pubmed.ncbi.nlm.nih.gov/"
                accentColor={TERRA_MID}
                accentTextColor={TERRA_DEEP}
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Cancer Supportive Care Review"
                stat="2,465 patients across 26 RCTs"
                detail="Reflexology reduced anxiety and pain in cancer patients, though evidence quality was rated low to moderate. Most consistent benefit was for anxiety and subjective pain."
                accentColor={TERRA_MID}
                accentTextColor={TERRA_DEEP}
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Pregnancy & Labor (2020)"
                stat="13 RCTs \u2014 reduced labor pain"
                detail="Reflexology during pregnancy and labor showed significant pain reduction and shorter labor duration in multiple trials. One of the better-controlled evidence bases in reflexology research."
                accentColor={TERRA_MID}
                accentTextColor={TERRA_DEEP}
              />
            </ScrollReveal>
          </div>

          {/* Evidence Tier Table */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.25rem', fontStyle: 'normal' }}>Evidence by Condition</h3>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -0.5rem', padding: '0 0.5rem', marginBottom: '3rem' }}>
              <table style={{ width: '100%', minWidth: '480px', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${TERRA_MID}` }}>
                    {['Condition', 'Evidence Strength', 'Direction', 'Notes'].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: TERRA_DEEP, padding: '0.75rem 1rem', textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {evidenceRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--color-text)' }}>{row.condition}</td>
                      <td style={{ padding: '0.75rem 1rem', color: row.strength === 'Strong' ? '#2D6A4F' : row.strength === 'Moderate' ? TERRA_DEEP : row.strength === 'None' ? '#9ca3af' : 'var(--color-text-muted)' }}>
                        {row.strength}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>{row.direction}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Mechanism Table */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.25rem', fontStyle: 'normal' }}>Proposed Mechanisms</h3>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -0.5rem', padding: '0 0.5rem', marginBottom: '3rem' }}>
              <table style={{ width: '100%', minWidth: '560px', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${TERRA_MID}` }}>
                    {['Mechanism', 'How It Works', 'Evidence Status'].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: TERRA_DEEP, padding: '0.75rem 1rem', textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mechanismRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>{row.mechanism}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{row.description}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem', lineHeight: 1.5 }}>{row.evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Honest assessment callout */}
          <ScrollReveal>
            <div
              style={{
                background: TERRA_PALE,
                border: `1px solid ${TERRA_LIGHT}`,
                borderLeft: `4px solid ${TERRA_MID}`,
                borderRadius: '2px',
                padding: '1.5rem 2rem',
              }}
            >
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: TERRA_DEEP, margin: '0 0 0.75rem' }}>Honest Assessment</p>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text)', margin: 0, lineHeight: 1.8 }}>
                Reflexology&rsquo;s strongest evidence is for <strong>pain reduction and anxiety relief</strong> in cancer care, multiple sclerosis, and pregnancy. The specific zone-to-organ correspondence claimed by traditional maps has not been validated by controlled studies. The most likely mechanism is a combination of gate control analgesia, parasympathetic activation through sustained foot pressure, and the therapeutic relationship itself &mdash; all of which are real and clinically meaningful, even if they differ from traditional explanations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          CONTRAINDICATIONS
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>Safety</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
              Contraindications
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              Reflexology has a strong safety record when practiced by trained professionals who conduct proper intake. The following three-tier framework guides safe practice decisions.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {/* Absolute */}
            <ScrollReveal>
              <div
                style={{
                  background: 'rgba(185,28,28,0.05)',
                  border: '1px solid rgba(185,28,28,0.25)',
                  borderTop: '3px solid #b91c1c',
                  borderRadius: '2px',
                  padding: '1.75rem',
                }}
              >
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b91c1c', margin: '0 0 0.875rem' }}>Absolute &mdash; Do Not Treat</p>
                <ul style={{ margin: 0, padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    'Deep vein thrombosis (DVT) or blood clots — pressure could mobilize a clot',
                    'Acute infection with fever, cellulitis, or open wounds on feet',
                    'Foot or ankle fractures — unhealed',
                    'Severe osteoporosis causing bone fragility',
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{item}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Clearance Required */}
            <ScrollReveal>
              <div
                style={{
                  background: 'rgba(146,64,14,0.05)',
                  border: '1px solid rgba(146,64,14,0.25)',
                  borderTop: '3px solid #92400e',
                  borderRadius: '2px',
                  padding: '1.75rem',
                }}
              >
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#92400e', margin: '0 0 0.875rem' }}>Physician Clearance Required</p>
                <ul style={{ margin: 0, padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    'Diabetes with peripheral neuropathy — pressure sensation may be impaired',
                    'Active cancer treatment — gentle modified pressure only; growing oncology reflexology evidence supports modified work',
                    'Epilepsy or seizure disorder — avoid prolonged stimulation of head reflexes',
                    'Pacemaker — avoid direct cardiac/chest reflexes with heavy pressure',
                    'Pregnancy first trimester — see note below',
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{item}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Relative */}
            <ScrollReveal>
              <div
                style={{
                  background: 'rgba(45,106,79,0.05)',
                  border: '1px solid rgba(45,106,79,0.25)',
                  borderTop: '3px solid #2D6A4F',
                  borderRadius: '2px',
                  padding: '1.75rem',
                }}
              >
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2D6A4F', margin: '0 0 0.875rem' }}>Relative &mdash; Modify and Monitor</p>
                <ul style={{ margin: 0, padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    'Varicose veins or phlebitis — work around, not directly on affected areas',
                    'Recent surgery — delay until healed; consult physician for timing',
                    'Plantar fasciitis — modify pressure over the plantar fascia; avoid direct heel work in acute phase',
                    'Pitting edema — check if cleared by physician before applying pressure',
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{item}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Pregnancy note */}
          <ScrollReveal>
            <div
              style={{
                background: TERRA_PALE,
                border: `1px solid ${TERRA_LIGHT}`,
                borderLeft: `4px solid ${TERRA_MID}`,
                borderRadius: '2px',
                padding: '1.5rem 2rem',
              }}
            >
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: TERRA_DEEP, margin: '0 0 0.75rem' }}>Pregnancy Note</p>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text)', margin: 0, lineHeight: 1.8 }}>
                Some schools teach avoiding uterine and ovarian reflex points in the first trimester as a precautionary absolute contraindication. Others &mdash; including the Brighton School and Spa &amp; Massage UK &mdash; consider first trimester a <em>relative</em> contraindication with appropriate modifications rather than an absolute one. The meta-analysis of reflexology in pregnancy and labor (13 RCTs) did not identify adverse outcomes. Best practice: always obtain physician clearance for pregnant clients and complete specialized prenatal reflexology training before offering sessions to this population.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          SESSION FLOW
      ══════════════════════════════════════════════════════ */}
      <section
        id="session"
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw)',
          background: `color-mix(in srgb, var(--color-cream) 88%, ${TERRA_PALE})`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>The Practice</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
              A 60-Minute Session
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              A standard reflexology session follows a clear structure that is part clinical protocol, part relational practice. The sequence below is the professional Western standard derived from Ingham Method training.
            </p>
          </ScrollReveal>

          {/* Session Phase Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
            {sessionPhases.map((p) => (
              <ScrollReveal key={p.num}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '1.5rem',
                    alignItems: 'flex-start',
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    padding: '1.75rem',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '9999px',
                        background: `color-mix(in srgb, ${TERRA_LIGHT} 40%, var(--color-cream))`,
                        border: `2px solid ${TERRA_MID}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 700, color: TERRA_DEEP }}>{p.num}</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: 0, fontStyle: 'normal' }}>{p.phase}</h3>
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, color: TERRA_MID, letterSpacing: '0.06em', background: TERRA_PALE, padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>{p.duration}</span>
                    </div>
                    <ul style={{ margin: 0, padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      {p.steps.map((s, si) => (
                        <li key={si} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Aftercare */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>Post-Session Responses</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', maxWidth: '56ch', lineHeight: 1.75 }}>
              Inform every client verbally and in writing before they leave. These responses are common and typically resolve within 24&ndash;48 hours.
            </p>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
            {aftercareItems.map((a, i) => (
              <ScrollReveal key={i}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.25rem 1.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.375rem', fontStyle: 'normal' }}>{a.response}</h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>{a.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Healing crisis callout */}
          <ScrollReveal>
            <div
              style={{
                background: TERRA_PALE,
                border: `1px solid ${TERRA_LIGHT}`,
                borderLeft: `4px solid ${TERRA_MID}`,
                borderRadius: '2px',
                padding: '1.5rem 2rem',
              }}
            >
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: TERRA_DEEP, margin: '0 0 0.875rem' }}>The &ldquo;Healing Crisis&rdquo; &mdash; Two Views</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2D6A4F', margin: '0 0 0.5rem' }}>Traditional view</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    Post-session symptoms (fatigue, increased urination, emotional release) are a positive detox response &mdash; evidence the body has begun to &ldquo;react, detoxify, and heal.&rdquo; The intensity should be managed by moderating session pressure, not stopping treatment.
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: TERRA_DEEP, margin: '0 0 0.5rem' }}>Evidence-based view</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    There is no clinical evidence that reflexology causes literal detoxification. Post-session symptoms likely reflect a vasovagal response, deep parasympathetic relaxation, or normal physiological responses to sustained touch &mdash; not toxin release. Avoid making detox claims in written or spoken client materials.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          TRAINING & CERTIFICATION
      ══════════════════════════════════════════════════════ */}
      <section
        id="training"
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>The Professional Path</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
              Training & Certification
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              Three organizations define the professional reflexology landscape in the US. They serve different functions &mdash; understand what each offers before deciding how to invest your time and money.
            </p>
          </ScrollReveal>

          {/* Cert Bodies Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
            {certBodies.map(c => (
              <ScrollReveal key={c.name}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: TERRA_DEEP, margin: 0, fontStyle: 'normal' }}>{c.name}</h4>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, color: TERRA_MID, letterSpacing: '0.06em', background: TERRA_PALE, padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>{c.type}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontStyle: 'italic', color: 'var(--color-text-muted)', margin: '0 0 1.25rem' }}>{c.full}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 0.25rem' }}>Scope</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>{c.scope}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 0.25rem' }}>Requirements</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>{c.requirements}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 0.25rem' }}>Best For</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>{c.best}</p>
                    </div>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', color: TERRA_MID, margin: 0 }}>{c.url}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* State Law */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>State Legal Landscape</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '56ch', lineHeight: 1.75 }}>
              The legal status of reflexology varies significantly by state. Always verify your state&rsquo;s current requirements before practicing. State laws change &mdash; the Illinois exemption runs through January 2027 and must be re-confirmed.
            </p>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3.5rem' }}>
            {stateLaw.map(s => (
              <ScrollReveal key={s.category}>
                <div
                  style={{
                    background: s.bg,
                    border: `1px solid ${s.border}`,
                    borderTop: `3px solid ${s.color}`,
                    borderRadius: '2px',
                    padding: '1.5rem',
                  }}
                >
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: s.color, margin: '0 0 0.625rem', fontStyle: 'normal' }}>{s.category}</h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: '0 0 1rem', lineHeight: 1.65 }}>{s.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {s.states.map((state, si) => (
                      <span
                        key={si}
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.6875rem',
                          fontWeight: 500,
                          color: s.color,
                          background: 'var(--color-surface-raised)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '9999px',
                          border: `1px solid ${s.border}`,
                        }}
                      >
                        {state}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Training sequence */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', fontStyle: 'normal' }}>The 8-Step Training Sequence</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '56ch', lineHeight: 1.75 }}>
              Follow these steps in order. Each one depends on the previous &mdash; especially the state law check, which should happen before you enroll in any program.
            </p>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3rem' }}>
            {trainingSteps.map((s) => (
              <ScrollReveal key={s.step}>
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '9999px',
                      background: `color-mix(in srgb, ${TERRA_LIGHT} 40%, var(--color-cream))`,
                      border: `2px solid ${TERRA_MID}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 700, color: TERRA_DEEP }}>{s.step}</span>
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: '0.375rem 0 0' }}>{s.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Cost callout */}
          <ScrollReveal>
            <div
              style={{
                background: TERRA_PALE,
                border: `1px solid ${TERRA_LIGHT}`,
                borderLeft: `4px solid ${TERRA_MID}`,
                borderRadius: '2px',
                padding: '1.5rem 2rem',
              }}
            >
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: TERRA_DEEP, margin: '0 0 0.75rem' }}>Real Costs</p>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text)', margin: 0, lineHeight: 1.8 }}>
                <strong>Solo practice startup: $2,500&ndash;$6,500</strong> (training program $1,500&ndash;$4,000 + ARCB exam ~$350&ndash;$500 + ABMP insurance $229/yr + recliner chair and supplies $500&ndash;$1,500). Typical session rate in a mid-size city: <strong>$70&ndash;$100 for 60 minutes</strong>. Full-time solo practitioners (15&ndash;20 sessions/week) can gross $60,000&ndash;$100,000 annually before business expenses. ABMP insurance at $229/year is the lowest-cost professional liability available.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          THE THREAD THAT CONNECTS
      ══════════════════════════════════════════════════════ */}
      <section
        id="connect"
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw)',
          background: `color-mix(in srgb, var(--color-cream) 88%, ${TERRA_PALE})`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>The Bridge</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
              Where Reflexology Meets Every Other Practice
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              Reflexology is not separate from fascia science, nervous system regulation, breathwork, or somatic practice &mdash; it is a foot-based delivery vehicle for all of them.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
            {crossLinks.map(cl => (
              <ScrollReveal key={cl.href}>
                <Link href={cl.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      padding: '1.75rem',
                      transition: 'border-color 300ms ease',
                      height: '100%',
                    }}
                  >
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: TERRA_DEEP, margin: '0 0 0.625rem' }}>{cl.title}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>{cl.description}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA NAV — ALL PAGES
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)',
          background: `linear-gradient(160deg, oklch(55% 0.08 30 / 0.12), var(--color-cream))`,
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '860px', textAlign: 'center' }}>
          <ScrollReveal>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 1.5rem',
              }}
            >
              Continue Exploring
            </h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { href: '/meditate', label: 'Meditate' },
                { href: '/nervous-system', label: 'Nervous System' },
                { href: '/yoga', label: 'Yoga' },
                { href: '/fascia', label: 'Fascia' },
                { href: '/breathe', label: 'Breathe' },
                { href: '/reiki', label: 'Reiki' },
                { href: '/somatics', label: 'Somatics' },
                { href: '/manifest', label: 'Manifest' },
                { href: '/practice', label: 'Practice' },
                { href: '/sound-healing', label: 'Sound Healing' },
                { href: '/sleep', label: 'Sleep' },
                { href: '/qigong', label: 'Qigong' },
                { href: '/chakras', label: 'Chakras' },
                { href: '/trauma', label: 'Trauma' },
                { href: '/nutrition', label: 'Nutrition' },
                { href: '/temperature', label: 'Temperature' },
                { href: '/nature', label: 'Nature' },
                { href: '/taichi', label: 'Tai Chi' },
                { href: '/fasting', label: 'Fasting' },
                { href: '/psychedelics', label: 'Psychedelics' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: TERRA_DEEP,
                    textDecoration: 'none',
                    padding: '0.625rem 1.25rem',
                    border: `1px solid ${TERRA_MID}`,
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

      {/* ══════════════════════════════════════════════════════
          CLOSING QUOTE
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw)',
          background: 'var(--color-cream)',
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          <blockquote
            style={{
              maxWidth: '520px',
              margin: '0 auto 3rem',
              padding: 0,
              border: 'none',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.375rem, 3vw, 2rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--color-text)',
                lineHeight: 1.5,
                margin: '0 0 1.25rem',
              }}
            >
              &ldquo;The feet are a mirror of the body.&rdquo;
            </p>
            <footer
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: TERRA_MID,
              }}
            >
              &mdash; Eunice Ingham
            </footer>
          </blockquote>

          {/* Bottom nav */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <Link
              href="/reiki"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: TERRA_DEEP,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: `1px solid ${TERRA_MID}`,
                paddingBottom: '0.25rem',
              }}
            >
              &larr; Reiki
            </Link>
            <Link
              href="/fascia"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: TERRA_DEEP,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: `1px solid ${TERRA_MID}`,
                paddingBottom: '0.25rem',
              }}
            >
              Fascia &rarr;
            </Link>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
