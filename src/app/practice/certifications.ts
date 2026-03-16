// src/app/practice/certifications.ts
//
// Real certification programs for each modality.
// Costs shown are approximate ranges as of 2024–2025 and vary by provider/location.
// Always verify current pricing and prerequisites at the listed URL before enrolling.

import { Certification } from './types';

export const CERTIFICATIONS: Certification[] = [

  // ─── YOGA ────────────────────────────────────────────────────────────────────

  {
    modality: 'yoga',
    program: 'RYT-200 Yoga Teacher Training',
    school: 'Yoga Alliance (various registered schools)',
    format: 'hybrid',
    duration: '200 contact hours (typically 3–12 months)',
    cost: '$1,500–$5,000 (tuition varies by school) + $115 YA registration',
    prerequisites: 'Minimum 1 year personal yoga practice; no prior teaching experience required',
    url: 'https://www.yogaalliance.org/credentialing/teachers',
  },
  {
    modality: 'yoga',
    program: 'RYT-500 Advanced Yoga Teacher Training',
    school: 'Yoga Alliance (various registered schools)',
    format: 'hybrid',
    duration: '500 contact hours total (200-hr prerequisite + 300-hr advanced module)',
    cost: '$2,500–$8,000 (300-hr module) + $215 YA registration',
    prerequisites: 'Valid RYT-200 credential; minimum 2 years teaching experience recommended',
    url: 'https://www.yogaalliance.org/credentialing/teachers',
  },
  {
    modality: 'yoga',
    program: 'Yin Yoga Teacher Training (50-hr)',
    school: 'YinYoga.com (Paul Grilley)',
    format: 'in-person',
    duration: '50 hours (long-weekend intensive)',
    cost: '$500–$800',
    prerequisites: 'RYT-200 or equivalent personal practice; open to experienced practitioners',
    url: 'https://www.yinyoga.com/training/',
  },

  // ─── BREATHWORK ──────────────────────────────────────────────────────────────

  {
    modality: 'breathwork',
    program: 'Wim Hof Method Instructor Certification',
    school: 'Innerfire BV / Wim Hof Method',
    format: 'in-person',
    duration: '5-day intensive training + supervised workshop practice period',
    cost: '~€2,200–€2,800 (instructor prices vary by region)',
    prerequisites: 'Completion of WHM online course; personal practice demonstrated; health screening required',
    url: 'https://www.wimhofmethod.com/become-an-instructor',
  },
  {
    modality: 'breathwork',
    program: 'SOMA Breath Instructor Training',
    school: 'SOMA Academy',
    format: 'online',
    duration: '8-week live online program',
    cost: '$997–$1,997 (tiered package)',
    prerequisites: 'Completion of SOMA Breath 21-Day Awakening Journey; no prior teaching experience required',
    url: 'https://soma.training/instructor-training',
  },
  {
    modality: 'breathwork',
    program: 'Oxygen Advantage Advanced Instructor',
    school: 'Oxygen Advantage (Patrick McKeown)',
    format: 'hybrid',
    duration: '3-day in-person workshop + online pre-study modules',
    cost: '~€895–€1,295 depending on location',
    prerequisites: 'Completion of Oxygen Advantage online course recommended; no formal prerequisites for entry-level',
    url: 'https://oxygenadvantage.com/instructor-training',
  },

  // ─── SOMATICS ────────────────────────────────────────────────────────────────

  {
    modality: 'somatics',
    program: 'TRE Certified Provider Training',
    school: 'TRE for All (Trauma/Tension Releasing Exercises)',
    format: 'in-person',
    duration: '3 modules over 6–12 months (approx. 9 training days total)',
    cost: '$1,800–$2,800 (all three modules)',
    prerequisites: 'Personal experience attending a TRE session; no professional background required',
    url: 'https://traumaprevention.com/trainer-certification',
  },
  {
    modality: 'somatics',
    program: 'Somatic Experiencing Practitioner (SEP)',
    school: 'Somatic Experiencing International (SEI)',
    format: 'in-person',
    duration: '3 years (6 modules × 6 days each; ~216 training hours)',
    cost: '$6,000–$9,000 total (varies by region; scholarships available)',
    prerequisites: 'Licensed or certified mental health, healthcare, or bodywork professional strongly preferred',
    url: 'https://www.somaticexperiencing.com/training',
  },

  // ─── REIKI ───────────────────────────────────────────────────────────────────

  {
    modality: 'reiki',
    program: 'Usui Reiki Levels I & II (Shoden & Okuden)',
    school: 'International Center for Reiki Training (ICRT)',
    format: 'in-person',
    duration: 'Level I: 1–2 days; Level II: 1–2 days (can be taken consecutively)',
    cost: '$150–$400 per level depending on instructor',
    prerequisites: 'None for Level I; Level I certification required for Level II',
    url: 'https://www.reiki.org/faq/reikilevels.html',
  },
  {
    modality: 'reiki',
    program: 'Usui/Holy Fire® III Reiki Master Training',
    school: 'International Center for Reiki Training (ICRT)',
    format: 'in-person',
    duration: '3–5 days intensive (ART/Master combined class)',
    cost: '$800–$1,500 (varies by ICRT-licensed instructor)',
    prerequisites: 'Usui Reiki Level II or equivalent; minimum 6 months practice at Level II',
    url: 'https://www.reiki.org/reiki-training/classes',
  },
  {
    modality: 'reiki',
    program: 'Karuna Reiki® Master Certification',
    school: 'International Center for Reiki Training (ICRT)',
    format: 'in-person',
    duration: '2-day class',
    cost: '$500–$900 (varies by ICRT-licensed instructor)',
    prerequisites: 'Usui/Holy Fire® Reiki Master credential from ICRT-licensed teacher',
    url: 'https://www.reiki.org/karuna-reiki',
  },

  // ─── SOUND HEALING ───────────────────────────────────────────────────────────

  {
    modality: 'sound-healing',
    program: 'Sound Healing Practitioner Diploma',
    school: 'Sound Healing Academy (UK)',
    format: 'online',
    duration: '6 months self-paced online study',
    cost: '£795–£1,195 (tiered enrolment options)',
    prerequisites: 'No formal prerequisites; personal interest in sound and music recommended',
    url: 'https://www.soundhealingacademy.com/sound-healing-practitioner-diploma/',
  },
  {
    modality: 'sound-healing',
    program: 'Therapeutic Sound Practitioner Certificate',
    school: 'Globe Institute of Sound and Consciousness',
    format: 'in-person',
    duration: '3 weekends (approx. 72 training hours)',
    cost: '$1,800–$2,400',
    prerequisites: 'Open to all; background in music, healthcare, or wellness helpful but not required',
    url: 'https://www.globesound.org/sound-practitioner-certificate',
  },
  {
    modality: 'sound-healing',
    program: 'Himalayan Singing Bowl Practitioner Certification',
    school: 'Atma Buti Sound & Vibrational School',
    format: 'hybrid',
    duration: '3–5 days in-person plus online follow-up modules',
    cost: '$900–$1,500',
    prerequisites: 'None',
    url: 'https://www.atmabuti.com/singing-bowl-therapy-training/',
  },

  // ─── FASCIA ──────────────────────────────────────────────────────────────────

  {
    modality: 'fascia',
    program: 'Myofascial Release (MFR I & II) Seminars',
    school: 'Myofascial Release Treatment Centers & Seminars (John F. Barnes)',
    format: 'in-person',
    duration: '4 days per seminar; MFR I & II recommended as starting sequence',
    cost: '$550–$650 per seminar',
    prerequisites: 'Licensed healthcare professional (PT, OT, MT, DC, MD, or equivalent)',
    url: 'https://www.myofascialrelease.com/seminars/',
  },
  {
    modality: 'fascia',
    program: 'Functional Range Conditioning (FRC) Mobility Specialist',
    school: 'Functional Range Systems (Dr. Andreo Spina)',
    format: 'in-person',
    duration: '2-day weekend seminar',
    cost: '$700–$900 (USD)',
    prerequisites: 'Fitness or healthcare professional background; knowledge of basic anatomy helpful',
    url: 'https://functionalrangesystems.com/frc-mobility-specialist/',
  },
  {
    modality: 'fascia',
    program: 'Anatomy Trains Structural Integration Practitioner',
    school: 'Anatomy Trains / Tom Myers',
    format: 'hybrid',
    duration: '3-year program (approx. 200–220 classroom hours + supervised practice)',
    cost: '$8,000–$15,000 total (varies by school)',
    prerequisites: 'Licensed massage therapist or equivalent bodywork credential; dissection lab attendance required at some schools',
    url: 'https://www.anatomytrains.com/education/structural-integration/',
  },

  // ─── MEDITATION ──────────────────────────────────────────────────────────────

  {
    modality: 'meditation',
    program: 'MBSR Teacher Practicum (8-week course delivery)',
    school: 'UMass Memorial Health – Center for Mindfulness',
    format: 'hybrid',
    duration: 'Multi-year path: personal MBSR experience → intensive training retreats → supervised teaching practicum',
    cost: '$4,000–$6,000 (professional training intensive); full path varies',
    prerequisites: 'Completion of MBSR as participant; established personal meditation practice; 5-day retreat attendance',
    url: 'https://www.umassmed.edu/cfm/training/teacher-development/overview/',
  },
  {
    modality: 'meditation',
    program: 'Mindfulness Meditation Teacher Certification Program (MMTCP)',
    school: 'Jack Kornfield & Tara Brach / Sounds True',
    format: 'online',
    duration: '2 years (live online sessions + self-paced study + practicum)',
    cost: '$3,500–$4,500 (full program; payment plans available)',
    prerequisites: 'Minimum 1 year personal meditation practice; completion of an introductory mindfulness course recommended',
    url: 'https://www.soundstrue.com/products/mindfulness-meditation-teacher-certification',
  },
  {
    modality: 'meditation',
    program: 'Spirit Rock / IMS Insight Meditation Teacher Training',
    school: 'Spirit Rock Meditation Center & Insight Meditation Society',
    format: 'in-person',
    duration: '4-year program (multiple 5–10 day residential retreats per year)',
    cost: 'Application fee ~$75; residential retreat costs vary ($1,500–$3,000 per retreat); dana-based teaching',
    prerequisites: 'Extensive personal vipassana/insight meditation retreat experience; teacher interview required; invitation-based program',
    url: 'https://www.spiritrock.org/teacher-training',
  },

  // ─── NERVOUS SYSTEM ──────────────────────────────────────────────────────────

  {
    modality: 'nervous-system',
    program: 'Polyvagal Theory Foundational Certificate',
    school: 'Polyvagal Institute',
    format: 'online',
    duration: '24 hours of online coursework (self-paced)',
    cost: '$497',
    prerequisites: 'None; open to clinicians and laypersons; basic biology background helpful',
    url: 'https://www.polyvagalinstitute.org/certificate-programs',
  },
  {
    modality: 'nervous-system',
    program: 'Safe and Sound Protocol (SSP) Provider Training',
    school: 'Integrated Listening Systems (iLs) / Unyte',
    format: 'online',
    duration: 'Self-paced online training (~8 hours); completion required before client access',
    cost: '$599 (training + 1-year platform subscription)',
    prerequisites: 'Licensed or registered professional in a health or education field (psychology, OT, PT, SLP, counseling, etc.)',
    url: 'https://integratedlistening.com/ssp-safe-sound-protocol/',
  },
  {
    modality: 'nervous-system',
    program: 'Somatic Trauma Resolution Training',
    school: 'The Embody Lab',
    format: 'online',
    duration: '6 months live online program (bi-weekly sessions)',
    cost: '$2,500–$3,500',
    prerequisites: 'Mental health professionals, coaches, yoga/movement teachers with client-facing practice; no licensure strictly required',
    url: 'https://www.theembodylab.com/somatic-trauma-resolution-training',
  },
];
