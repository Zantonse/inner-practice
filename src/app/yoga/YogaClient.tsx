'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoAccent from '@/components/VideoAccent';
import VideoFacade from '@/components/VideoFacade';

// ── Accent tokens ──────────────────────────────────────────────
const VIOLET_DEEP = '#592E6B';
const VIOLET_MID  = '#D7C2EE';
const AMBER_DEEP  = '#C07A35';
const AMBER_LIGHT = '#E4AD75';

// ── StatCard ───────────────────────────────────────────────────
function StatCard({ source, stat, detail, url }: { source: string; stat: string; detail: string; url?: string }) {
  return (
    <div style={{ borderLeft: `3px solid ${VIOLET_MID}`, padding: '1.5rem 1.75rem', background: 'var(--color-surface-raised)', borderRadius: '2px' }}>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: VIOLET_DEEP, margin: '0 0 0.75rem' }}>{url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}>{source}</a> : source}</p>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>{stat}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>{detail}</p>
    </div>
  );
}

// ── Style Card (expandable) ────────────────────────────────────
interface YogaStyleData {
  id: string;
  name: string;
  tradition: string;
  intensity: 'Low' | 'Moderate' | 'High' | 'Zero';
  ansBenefit: string;
  description: string;
  keyResearch: string;
  bestFor: string[];
}

function intensityColor(level: YogaStyleData['intensity']) {
  if (level === 'Zero') return { bg: `color-mix(in srgb, ${VIOLET_MID} 30%, var(--color-cream))`, text: VIOLET_DEEP };
  if (level === 'Low') return { bg: `color-mix(in srgb, ${VIOLET_MID} 25%, var(--color-cream))`, text: VIOLET_DEEP };
  if (level === 'Moderate') return { bg: 'color-mix(in srgb, var(--color-amber-light) 25%, var(--color-cream))', text: 'var(--color-amber-deep)' };
  return { bg: 'color-mix(in srgb, #985575 20%, var(--color-cream))', text: '#8B3A62' };
}

function StyleCard({ style, isOpen, onToggle }: { style: YogaStyleData; isOpen: boolean; onToggle: () => void }) {
  const ic = intensityColor(style.intensity);
  return (
    <div style={{ background: 'var(--color-surface-raised)', border: `1px solid ${isOpen ? VIOLET_DEEP : 'var(--color-border)'}`, borderRadius: '2px', overflow: 'hidden', transition: 'border-color 300ms ease', marginBottom: '0.875rem' }}>
      <button onClick={onToggle} style={{ width: '100%', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: isOpen ? VIOLET_DEEP : 'var(--color-text)', margin: 0, fontStyle: 'normal', transition: 'color 300ms ease' }}>{style.name}</h4>
          <span style={{ display: 'inline-block', padding: '0.2rem 0.65rem', borderRadius: '9999px', background: ic.bg, fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 500, color: ic.text, letterSpacing: '0.05em' }}>{style.intensity}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>{style.tradition}</span>
        </div>
        <div style={{ flexShrink: 0, color: 'var(--color-text-muted)', transition: 'transform 300ms ease', transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </button>
      {isOpen && (
        <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--color-text)', margin: '1.25rem 0 1rem', lineHeight: 1.8 }}>{style.description}</p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: VIOLET_DEEP, margin: '0 0 0.5rem' }}>Nervous System</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 1rem', lineHeight: 1.7 }}>{style.ansBenefit}</p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: VIOLET_DEEP, margin: '0 0 0.5rem' }}>Key Research</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 1rem', lineHeight: 1.7 }}>{style.keyResearch}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {style.bestFor.map((b, i) => (
              <span key={i} style={{ display: 'inline-block', padding: '0.2rem 0.65rem', borderRadius: '9999px', background: `color-mix(in srgb, ${VIOLET_MID} 20%, var(--color-cream))`, fontFamily: 'var(--font-ui)', fontSize: '0.5625rem', fontWeight: 500, color: VIOLET_DEEP, letterSpacing: '0.04em' }}>{b}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Nidra Stage ────────────────────────────────────────────────
function NidraStage({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', background: VIOLET_DEEP, color: '#F5EAE1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 }}>{number}</div>
      <div>
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.35rem', fontStyle: 'normal' }}>{title}</h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>{description}</p>
      </div>
    </div>
  );
}

// ── Style Data ─────────────────────────────────────────────────
const activeStyles: YogaStyleData[] = [
  { id: 'hatha', name: 'Hatha Yoga', tradition: '11th–14th c. Nath Tradition', intensity: 'Low', ansBenefit: 'The strongest parasympathetic enhancer among physical yoga styles. Slow diaphragmatic breathing directly stimulates the vagus nerve, producing HRV improvements of 18–25% and systolic BP reductions of 5–10 mmHg.', description: 'The root of all physical yoga. Hatha means "sun-moon" — the union of opposing forces. Codified in the 14th-century Hatha Yoga Pradipika, it combines postures, breath control, and internal locks as a preparatory path for deeper meditative states. Most modern yoga descends from this tradition via Krishnamacharya.', keyResearch: 'Subbulakshmi et al. (2025, systematic review, 42 studies): HRV +18–25%, SBP -5–10 mmHg, resting HR -4–7 bpm. Kumar (2025, IJSR): "pronounced enhancements in parasympathetic activity." Grabara (2025): qualifies as moderate-intensity exercise for older adults at 60% HRmax.', bestFor: ['Beginners', 'Hypertension', 'Stress reduction', 'Seniors'] },
  { id: 'vinyasa', name: 'Vinyasa (Flow)', tradition: '1980s, from Ashtanga', intensity: 'Moderate', ansBenefit: 'Biphasic ANS response: moderate sympathetic activation during flow, pronounced parasympathetic rebound after. Systolic BP drops ~8 mmHg post-practice. Over months, trains greater parasympathetic baseline tone.', description: 'Breath-synchronized movement — each inhale accompanies expansion, each exhale accompanies contraction. Evolved from Ashtanga into creative, teacher-designed flows. The "one breath, one movement" principle creates moving meditation: present-moment absorption through physical action.', keyResearch: 'Thrower et al. (2023, PLOS ONE RCT): HR +10.49 bpm during practice, SBP -8.14 mmHg post. Khajuria et al. (2024, systematic review): chronic yoga enhances parasympathetic activity via multimodal biosignal analysis.', bestFor: ['Cardiovascular health', 'Flow state', 'Moving meditation'] },
  { id: 'ashtanga', name: 'Ashtanga Yoga', tradition: 'K. Pattabhi Jois, 1948', intensity: 'High', ansBenefit: 'Most pronounced biphasic response — high sympathetic during the fixed sequence, strong parasympathetic rebound. Trains autonomic flexibility. Ujjayi breathing maintains vagal engagement throughout.', description: 'A fixed sequence of postures linked without rest, practiced in the same order daily. Six series from Primary (Yoga Chikitsa) to Advanced. The Tristhana method unifies breath (ujjayi), posture, and gaze (drishti) into a single moving meditation. Most physically demanding yoga style.', keyResearch: 'Kothari et al. (2023, Cureus): VO₂ max ~50% higher in yoga group vs. controls. IJMIR (2025): cardiovascular response equivalent to ~46% VO₂max. Kumar (2024, systematic review): significantly reduces perceived stress.', bestFor: ['Athletes', 'Daily discipline', 'Strength + flexibility'] },
  { id: 'power', name: 'Power Yoga', tradition: '1980s — Kest, Baptiste, Birch', intensity: 'High', ansBenefit: 'Similar biphasic pattern to Vinyasa but higher sympathetic peak. Burns 300–600 kcal/hour. Builds muscular and autonomic resilience through repeated challenge-and-recovery cycles.', description: 'Bryan Kest, Baron Baptiste, and Beryl Bender Birch broke from Ashtanga\'s rigid sequences into fitness-focused flows. One of the only yoga styles addressing all five fitness domains: strength, endurance, cardio, flexibility, and balance in a single session.', keyResearch: 'Journal of Physical Activity and Health: 237–597 kcal per 60-min session. Baptiste consulted for the NFL Philadelphia Eagles. Addresses all five fitness domains simultaneously.', bestFor: ['Fitness enthusiasts', 'Cross-training', 'Weight management'] },
  { id: 'kundalini', name: 'Kundalini Yoga', tradition: 'Yogi Bhajan, 1969', intensity: 'Low', ansBenefit: 'Direct vagal stimulation via continuous pranayama and chanting. Breath of Fire produces sympathetic activation then parasympathetic rebound. Mantra chanting stimulates laryngeal and auricular vagal branches, producing limbic deactivation matching electrical VNS.', description: 'The "yoga of awareness." Unlike other styles, movement serves energy, not fitness. Kriyas, pranayama (Breath of Fire), mantra chanting, and meditation with mudras target consciousness transformation. Note: the 3HO organization and Yogi Bhajan face documented abuse allegations (An Olive Branch, 2020).', keyResearch: 'Simon et al. (2021, JAMA Psychiatry, n=226): evidence-based for GAD. Grzenda et al. (2024, Translational Psychiatry): reverses aging gene expression, protects hippocampus. UCLA Kirtan Kriya: 12-min daily prevents gray matter atrophy.', bestFor: ['Anxiety (GAD)', 'Cognitive decline', 'Spiritual seekers'] },
  { id: 'hot', name: 'Hot / Bikram Yoga', tradition: '1970s — Bikram Choudhury', intensity: 'Moderate', ansBenefit: 'Dual stressor: heat + movement creates strongest acute sympathetic activation of any yoga. Pronounced parasympathetic rebound after. Chronic practice upregulates HSP70. Note: Choudhury faces sexual assault allegations; most studios rebranded.', description: 'Originally 26 postures in a 105°F room. Modern "hot yoga" includes flowing sequences and music. Heat warms connective tissue for deeper stretching and creates a controlled hormetic stressor. Safety: risks include dehydration, heat exhaustion, and overstretching.', keyResearch: 'Harvard/MGH RCT (2023, n=80): ~50% depression reduction, 44% full remission — even at 1 session/week. Willmott et al. (2025, Sports Medicine-Open): HSP70 upregulation, improved bone density over 5 years.', bestFor: ['Depression', 'Heat adaptation', 'Bone density'] },
];

const passiveStyles: YogaStyleData[] = [
  { id: 'yin', name: 'Yin Yoga', tradition: '1970s — Zink, Grilley, Powers', intensity: 'Low', ansBenefit: 'Parasympathetic activation with sustained mild stress. Trains the nervous system to remain calm with discomfort. Fascia holds ~250 million nerve endings; sustained loading triggers mechanotransduction and proprioceptive recalibration.', description: 'Targets connective tissue — fascia, ligaments, joint capsules — not muscles. Long passive holds (3–5 min) at mild stretch enable the "creep" response: viscoelastic elongation and collagen remodeling. Paul Grilley mapped poses onto TCM meridians.', keyResearch: 'PMC10973109 (2024 RCT): 10-week Yin significantly reduced state anxiety. Clark & Paoletti (2019): fascia-yoga interaction confirmed. Emotional release during holds is consistently reported.', bestFor: ['Athletes', 'Desk workers', 'Anxiety', 'Joint health'] },
  { id: 'restorative', name: 'Restorative Yoga', tradition: 'Judith Lasater (from Iyengar)', intensity: 'Zero', ansBenefit: 'Deepest parasympathetic activation of any physical yoga. Zero effort — if any stretch sensation is present, more props are added. Cortisol drops during the practice itself, not just after.', description: 'Every pose fully supported with props. 4–6 poses per class, each held 5–20 minutes. The goal is NOT flexibility — it is total comfort as a portal to deep nervous system rest. Fundamentally different from Yin: Restorative dissolves sensation; Yin maintains it.', keyResearch: 'PMC4174464: significant cortisol and chronic stress reduction. Kiecolt-Glaser (2015): improved metabolic markers over 48 weeks. van der Kolk (2014): trauma-informed yoga reduced PTSD in treatment-resistant women.', bestFor: ['Burnout', 'Chronic illness', 'Trauma', 'Insomnia'] },
  { id: 'iyengar', name: 'Iyengar Yoga', tradition: 'B.K.S. Iyengar, 1960s', intensity: 'Low', ansBenefit: 'Long holds activate baroreceptors via vagal afferents. Inversions stretch carotid baroreceptors, triggering parasympathetic responses. Khattab et al. (2008): significantly elevated cardiac vagal modulation — recommended for cardiac rehab.', description: 'The most anatomically precise yoga system. Props — blocks, belts, bolsters, chairs — are tools for intelligent practice. Every posture demands exacting alignment. Specific therapeutic sequences for chronic pain, scoliosis, hypertension, and grief.', keyResearch: 'Nambi et al. (2014 RCT): 72.8% pain reduction in CLBP vs. 42.5% conventional. Goveas et al. (2025, Scientific Reports): medium-large effect sizes for grief (g=0.69–1.28). Khattab (2008): cardiac vagal modulation increase.', bestFor: ['Chronic pain', 'Injury recovery', 'Seniors', 'Cardiac rehab'] },
];

// ════════════════════════════════════════════════════════════════
export default function YogaClient() {
  const [openStyle, setOpenStyle] = useState<string | null>(null);
  const toggleStyle = (id: string) => setOpenStyle(prev => prev === id ? null : id);

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '85dvh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(3rem, 8vw, 6rem) max(1.5rem, 8vw) clamp(4rem, 8vw, 7rem)', background: 'linear-gradient(160deg, oklch(55% 0.16 310), oklch(72% 0.1 290))', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}><Image src="/images/hero-yoga.webp" alt="Abstract watercolor yoga illustration" fill priority sizes="100vw" style={{ objectFit: 'cover', opacity: 0.35 }} /></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,29,55,0.7) 0%, rgba(28,29,55,0.15) 50%, transparent 100%)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px' }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: AMBER_LIGHT, margin: '0 0 1rem' }}>The path of unity</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.75rem, 7vw, 5.5rem)', fontWeight: 700, color: '#F5EAE1', lineHeight: 1.05, margin: '0 0 1.5rem' }}>Yoga</h1>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.125rem, 2.5vw, 1.75rem)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(245,234,225,0.85)', margin: '0 0 2rem', lineHeight: 1.45 }}>Every Style. Every Path. One Nervous System.</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.875rem, 1.3vw, 1.0625rem)', color: 'rgba(245,234,225,0.75)', margin: 0, lineHeight: 1.75, maxWidth: '60ch' }}>Yoga is not a monolithic practice — it is a diverse spectrum of technologies targeting different physiological systems. From the athletic intensity of Ashtanga to the conscious sleep of Yoga Nidra, each style produces specific neurological adaptations. Find your path.</p>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw)', background: 'var(--color-cream)' }}>
        <ScrollReveal group>
          <div style={{ maxWidth: '1100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <StatCard source="UCLA RCTs, 2017–2024" stat="Kirtan Kriya prevents gray matter atrophy" detail="12-min daily Kundalini practice preserves hippocampal connectivity in adults at risk for Alzheimer's." url="https://pubmed.ncbi.nlm.nih.gov/28626952/" />
            <StatCard source="Kjaer et al., 2002 (PET)" stat="Yoga Nidra increases striatal dopamine 65%" detail="The only practice producing delta brainwaves while maintaining conscious awareness." url="https://pubmed.ncbi.nlm.nih.gov/11958969/" />
            <StatCard source="Simon et al., 2021 (JAMA Psychiatry)" stat="Kundalini Yoga is evidence-based for GAD" detail="RCT of 226 adults: clinically meaningful alternative to CBT for generalized anxiety." url="https://pubmed.ncbi.nlm.nih.gov/34319365/" />
            <StatCard source="Harvard/MGH RCT, 2023" stat="Hot Yoga: 44% full depression remission" detail="Heat-stress hormesis produces antidepressant effects via HSP70 — even at 1 session/week." url="https://pubmed.ncbi.nlm.nih.gov/37851399/" />
          </div>
        </ScrollReveal>
      </section>

      <SectionDivider />

      {/* 01 — ACTIVE STYLES */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)', background: 'var(--color-cream)' }}>
        <div className="section-label" style={{ marginBottom: '2.5rem', color: VIOLET_DEEP }}>01 — The Active Styles</div>
        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.25rem', fontStyle: 'normal' }}>Yang Yoga — Movement, Heat & Resilience</h2>
            <p style={{ margin: 0 }}>Active styles temporarily activate the sympathetic nervous system during practice, then facilitate a pronounced parasympathetic rebound. Over months, they train autonomic flexibility: the capacity to mobilize under stress and efficiently downregulate.</p>
          </div>
        </ScrollReveal>
        <div style={{ maxWidth: '780px' }}>
          {activeStyles.map(s => <StyleCard key={s.id} style={s} isOpen={openStyle === s.id} onToggle={() => toggleStyle(s.id)} />)}
        </div>
      </section>

      <SectionDivider flip />

      {/* 02 — PASSIVE STYLES */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)', background: `linear-gradient(180deg, var(--color-cream) 0%, color-mix(in srgb, ${VIOLET_MID} 8%, var(--color-cream)) 100%)` }}>
        <div className="section-label" style={{ marginBottom: '2.5rem', color: VIOLET_DEEP }}>02 — The Passive Styles</div>
        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.25rem', fontStyle: 'normal' }}>Yin Yoga — Stillness, Fascia & Restoration</h2>
            <p style={{ margin: 0 }}>Passive styles directly enhance parasympathetic tone. Slow holds, complete support, and sensory withdrawal lower cortisol, increase HRV, and raise GABA levels during the practice itself.</p>
          </div>
        </ScrollReveal>
        <div style={{ maxWidth: '780px' }}>
          {passiveStyles.map(s => <StyleCard key={s.id} style={s} isOpen={openStyle === s.id} onToggle={() => toggleStyle(s.id)} />)}
        </div>
      </section>

      <VideoAccent
        src="/videos/yoga-loop.mp4"
        poster="/videos/yoga-poster.jpg"
      />

      {/* 03 — YOGA NIDRA */}
      <section id="yoga-nidra" style={{ padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)', background: 'var(--color-cream)' }}>
        <div className="section-label" style={{ marginBottom: '2.5rem', color: VIOLET_DEEP }}>03 — Yoga Nidra: The Deep Dive</div>
        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.25rem', fontStyle: 'normal' }}>The Sleeper Who Wakes</h2>
            <p style={{ margin: '0 0 1.5rem' }}>Yoga Nidra — &ldquo;yogic sleep&rdquo; — is a systematic method of inducing complete relaxation while maintaining conscious awareness. Developed by Swami Satyananda Saraswati in the 1960s from the Tantric practice of <em>nyasa</em>, it has become one of the most scientifically validated contemplative practices of the 21st century.</p>
            <p style={{ margin: '0 0 1.5rem' }}>Unlike meditation (alpha, 8–12 Hz), Yoga Nidra pushes into <strong>theta</strong> (4–8 Hz) and <strong>delta</strong> (0.5–4 Hz) — frequencies normally exclusive to unconscious deep sleep — while practitioners maintain awareness.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 600, color: VIOLET_DEEP, margin: '0 0 1.5rem', fontStyle: 'normal' }}>The 8 Stages</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <NidraStage number={1} title="Preparation" description="Arriving in savasana. Physical adjustments, breath awareness, establishing receptive consciousness." />
              <NidraStage number={2} title="Sankalpa (Intention)" description="A short personal resolve planted when the subconscious first becomes accessible." />
              <NidraStage number={3} title="Rotation of Consciousness" description="Rapid systematic awareness through 31–61 body parts. The core element adapted from Tantric nyasa. Produces pratyahara." />
              <NidraStage number={4} title="Breath Awareness" description="Counting breaths to deepen withdrawal from external stimuli." />
              <NidraStage number={5} title="Pairs of Opposites" description="Alternating heaviness/lightness, warmth/cold. Activates both hemispheres, releases emotional polarity." />
              <NidraStage number={6} title="Visualization" description="Quick-succession archetypal images at 1–2 second intervals. Stimulates the unconscious without cognitive engagement." />
              <NidraStage number={7} title="Sankalpa (Repetition)" description="Intention repeated at maximum receptivity — theta/delta boundary. Bypasses analytical self-editing." />
              <NidraStage number={8} title="Externalization" description="Gradual return to waking consciousness. Reorienting to room, body, senses." />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 600, color: VIOLET_DEEP, margin: '0 0 1rem', fontStyle: 'normal' }}>The Neuroscience</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ borderLeft: `3px solid ${VIOLET_MID}`, padding: '1.5rem', background: 'var(--color-surface-raised)', borderRadius: '2px' }}>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: VIOLET_DEEP, margin: '0 0 0.5rem' }}>Dopamine</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem' }}>65% striatal dopamine increase</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>Kjaer et al. (2002) PET scan. Replenishes baseline reserves — combats burnout. (n=8; needs replication.)</p>
              </div>
              <div style={{ borderLeft: `3px solid ${VIOLET_MID}`, padding: '1.5rem', background: 'var(--color-surface-raised)', borderRadius: '2px' }}>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: VIOLET_DEEP, margin: '0 0 0.5rem' }}>DMN Deactivation</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem' }}>Default Mode Network decoupling</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>Yadav et al. (2024, Nature Scientific Reports) fMRI: silences the brain&apos;s rumination engine.</p>
              </div>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 600, color: VIOLET_DEEP, margin: '0 0 1rem', fontStyle: 'normal' }}>NSDR: Non-Sleep Deep Rest</h3>
            <p style={{ margin: '0 0 1.5rem' }}>Dr. Andrew Huberman coined &ldquo;NSDR&rdquo; in 2022 as a secular rebranding. <strong>All NSDR research is Yoga Nidra research.</strong> Boukhris et al. (2024, n=65) found a single 10-minute session improved reaction time, accuracy, and emotional balance — benefits from session one, where meditation requires 8 weeks.</p>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 600, color: VIOLET_DEEP, margin: '0 0 1rem', fontStyle: 'normal' }}>Trauma Recovery: iRest</h3>
            <p style={{ margin: '0 0 1.5rem' }}>Richard Miller adapted Yoga Nidra into <strong>iRest</strong>. No verbal narrative processing = no retraumatization. Now in <strong>35+ VA centers</strong> and 6 DoD sites. Barber et al. (2025): chronic pain patients dis-identified from pain and reduced opioid use.</p>

            {/* Comparison table */}
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 600, color: VIOLET_DEEP, margin: '0 0 1.25rem', fontStyle: 'normal' }}>Yoga Nidra vs. Meditation</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
                <thead><tr style={{ borderBottom: `2px solid ${VIOLET_MID}` }}>
                  {['Dimension', 'Yoga Nidra', 'Meditation'].map(h => <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: VIOLET_DEEP }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {[['Posture', 'Lying, supported', 'Seated'], ['Guidance', 'Fully guided', 'Self-directed'], ['Effort', 'Effortless', 'Active attention'], ['Brainwaves', 'Theta + Delta', 'Alpha'], ['Time to benefit', '1 session (10 min)', '~8 weeks daily']].map(([d, n, m], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--color-text)' }}>{d}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>{n}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{ maxWidth: '780px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>Guided Practice</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              <div><VideoFacade videoId="waC2GIaDKCc" title="Yoga Nidra — Reset Your Nervous System" /><p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0.75rem 0 0' }}>Yoga Nidra — Reset Your Nervous System — 30 min</p></div>
              <div><VideoFacade videoId="M0u9GST_j3s" title="NSDR Protocol — Andrew Huberman" /><p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0.75rem 0 0' }}>NSDR Protocol — 10 min</p></div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <SectionDivider flip />

      {/* 04 — FIND YOUR PATH */}
      <section id="pose-hold" style={{ padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)', background: `linear-gradient(180deg, var(--color-cream) 0%, color-mix(in srgb, ${VIOLET_MID} 10%, var(--color-cream)) 100%)` }}>
        <div className="section-label" style={{ marginBottom: '2.5rem', color: VIOLET_DEEP }}>04 — Find Your Path</div>
        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.25rem', fontStyle: 'normal' }}>Which Style Is Right for You?</h2>
            <p style={{ margin: 0 }}>Combine 2–3 days active (Yang) + 1–2 days passive (Yin/Restorative) + Yoga Nidra as needed.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div style={{ maxWidth: '780px' }}>
            {[
              { goal: 'Burnout / Insomnia / Trauma', style: 'Yoga Nidra or Restorative', why: 'Zero effort. Maximizes parasympathetic healing.' },
              { goal: 'Depression', style: 'Hot Yoga', why: '44% full remission (Harvard RCT). HSP70 hormesis.' },
              { goal: 'Cognitive Decline', style: 'Kundalini (Kirtan Kriya)', why: '12 min/day prevents gray matter atrophy (UCLA).' },
              { goal: 'Chronic Pain', style: 'Iyengar', why: '72.8% pain reduction vs. 42.5% conventional (RCT).' },
              { goal: 'Fascia / Joint Health', style: 'Yin Yoga', why: 'Only prolonged passive loads remodel connective tissue.' },
              { goal: 'Cardio / Weight', style: 'Ashtanga / Vinyasa / Power', why: '300–600 kcal/hr. Biphasic ANS training.' },
              { goal: 'Anxiety (GAD)', style: 'Kundalini', why: 'JAMA Psychiatry: comparable to CBT short-term.' },
              { goal: 'General Stress', style: 'Hatha', why: 'Strongest parasympathetic. Best for all levels.' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem 0', borderBottom: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
                <div style={{ minWidth: '140px', flex: '0 0 140px' }}><p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 600, color: VIOLET_DEEP, margin: 0 }}>{r.goal}</p></div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.25rem', fontStyle: 'normal' }}>{r.style}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>{r.why}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <SectionDivider />

      {/* 05 — HIP OPENING */}
      <section id="hip-opening" style={{ padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)', background: `linear-gradient(180deg, var(--color-cream) 0%, color-mix(in srgb, ${VIOLET_MID} 8%, var(--color-cream)) 100%)` }}>
        <div className="section-label" style={{ marginBottom: '2.5rem', color: VIOLET_DEEP }}>05 — Hip Opening</div>
        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.25rem', fontStyle: 'normal' }}>Unlock the Body&rsquo;s Keystone</h2>
            <p style={{ margin: '0 0 1rem' }}>The hip complex is wrapped by over 20 muscles and intersected by multiple fascial lines. Restriction here redistributes load to the lumbar spine, knees, and ankles. The <strong>psoas</strong> &mdash; the only muscle connecting the lumbar spine to the femur &mdash; runs alongside the sympathetic chain and shares fascial continuity with the diaphragm. Chronic psoas tension from sitting and stress maintains low-grade fight-or-flight activation and shallows the breath.</p>
            <p style={{ margin: 0 }}>Hip openers are not just flexibility work &mdash; they are nervous system release. Tears and trembling in these poses are the body completing unfinished stress responses.</p>
          </div>
        </ScrollReveal>

        {/* 6 Hip Movements */}
        <ScrollReveal>
          <div style={{ overflowX: 'auto', marginBottom: '2.5rem', maxWidth: '780px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${VIOLET_MID}` }}>
                  {['Movement', 'Key Muscles', 'Fascial Line'].map(h => (
                    <th key={h} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: VIOLET_DEEP, padding: '0.75rem 1rem', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Flexion', 'Psoas, iliacus, rectus femoris', 'Superficial Front'],
                  ['Extension', 'Glute max, hamstrings', 'Superficial Back'],
                  ['Abduction', 'Glute med/min, TFL', 'Lateral'],
                  ['Adduction', 'Adductors, gracilis', 'Deep Front'],
                  ['External Rotation', 'Piriformis, deep six rotators', 'Spiral'],
                  ['Internal Rotation', 'Glute medius (ant.), TFL', 'Lateral/Front'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.625rem 1rem', fontWeight: 500, color: 'var(--color-text)' }}>{row[0]}</td>
                    <td style={{ padding: '0.625rem 1rem', color: 'var(--color-text-muted)' }}>{row[1]}</td>
                    <td style={{ padding: '0.625rem 1rem', color: 'var(--color-text-muted)' }}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Key Poses Grid */}
        <ScrollReveal>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: VIOLET_DEEP, margin: '0 0 1.5rem' }}>The Essential Hip Openers</p>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem', marginBottom: '2.5rem', maxWidth: '1100px' }}>
          {[
            { name: 'Pigeon Pose', sanskrit: 'Eka Pada Rajakapotasana', target: 'Piriformis, hip flexors', cue: 'Flex front foot to protect knee. Blanket under hip if needed.' },
            { name: 'Low Lunge', sanskrit: 'Anjaneyasana', target: 'Psoas, iliacus', cue: 'Critical: tuck the tailbone. Without this, the psoas is bypassed entirely.' },
            { name: 'Lizard Pose', sanskrit: 'Utthan Pristhasana', target: 'Hip flexors, adductors', cue: 'Forearms inside front foot. Drive knee out over pinky toe.' },
            { name: 'Garland Pose', sanskrit: 'Malasana', target: 'Adductors, pelvic floor', cue: 'Elbows press knees wider. Blanket under heels if they rise. Hold 2 min daily.' },
            { name: 'Butterfly', sanskrit: 'Baddha Konasana', target: 'Inner groin, adductors', cue: 'Do not press knees down. Feet closer = more groin; farther = more inner thigh.' },
            { name: 'Reclined Pigeon', sanskrit: 'Supta Kapotasana', target: 'Piriformis, rotators', cue: 'Safest option for knee/SI issues. Flex top foot. 2\u20133 min hold.' },
            { name: 'Happy Baby', sanskrit: 'Ananda Balasana', target: 'Inner groin, sacrum', cue: 'Sacrum stays on floor. Often produces audible SI release.' },
            { name: 'Frog Pose', sanskrit: 'Mandukasana', target: 'Adductors, inner hip', cue: 'Yin only \u2014 3\u20135 min. Walk knees apart to edge of sensation. Lower to forearms.' },
            { name: 'Cow Face', sanskrit: 'Gomukhasana', target: 'Deep external rotators', cue: 'Sharp knee pain = stop. Use Figure 4 until rotation develops.' },
            { name: 'Fire Log', sanskrit: 'Agnistambhasana', target: 'External rotators', cue: 'Stack shins horizontally. Block under top knee if floating.' },
            { name: 'Crescent Twist', sanskrit: 'Parivrtta Anjaneyasana', target: 'Psoas + spiral line', cue: 'Accesses the psoas\u2019s rotational fibers that straight lunges miss.' },
            { name: 'Half Lord of the Fishes', sanskrit: 'Ardha Matsyendrasana', target: 'Outer hip, thoracic', cue: 'Inhale tall, exhale deeper. 8\u201310 breaths per side.' },
          ].map(pose => (
            <ScrollReveal key={pose.name}>
              <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.125rem', fontStyle: 'normal' }}>{pose.name}</h4>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.8125rem', fontStyle: 'italic', color: 'var(--color-text-muted)', margin: '0 0 0.5rem' }}>{pose.sanskrit}</p>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: VIOLET_DEEP, margin: '0 0 0.5rem' }}>{pose.target}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>{pose.cue}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 20-Min Sequence */}
        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>20-Minute Hip Opening Sequence</h3>
            <div className="timeline" style={{ paddingLeft: '2.5rem' }}>
              {[
                { step: '1', text: 'Constructive rest \u2014 supine, knees bent. Arrive and breathe. (1 min)' },
                { step: '2', text: 'Reclined Pigeon (Figure 4) \u2014 1 min each side. Gentle piriformis access.' },
                { step: '3', text: 'Happy Baby \u2014 inner groin and sacrum release. (2 min)' },
                { step: '4', text: 'Low Lunge (tailbone tucked) \u2014 1 min each side. Psoas lengthening.' },
                { step: '5', text: 'Lizard Pose \u2014 1 min each side. Deep hip flexor access.' },
                { step: '6', text: 'Garland Pose \u2014 full squat, elbows press knees. (2 min)' },
                { step: '7', text: 'Pigeon Pose \u2014 1.5 min each side. The deepest external rotation.' },
                { step: '8', text: 'Butterfly \u2014 fold forward. (2 min)' },
                { step: '9', text: 'Wide-Legged Forward Fold \u2014 adductors and hamstrings. (2 min)' },
                { step: '10', text: 'Supine twist each side + savasana. Integration \u2014 do not skip. (3 min)' },
              ].map(item => (
                <div key={item.step} style={{ position: 'relative', marginBottom: '0.75rem' }}>
                  <div className="timeline-node" style={{ background: VIOLET_DEEP }}>{item.step}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.7, margin: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Yin vs Yang + Emotional Release */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', maxWidth: '780px' }}>
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>Yin vs. Yang Approach</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.85, marginBottom: '0.75rem' }}>
              <strong>Yang (30&ndash;90s holds):</strong> Muscle lengthening, golgi tendon release. Best for pre-activity warmup.
            </p>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.85, marginBottom: '0.75rem' }}>
              <strong>Yin (3&ndash;5 min holds):</strong> Fascial creep. Sensation intensifies at 1&ndash;2 min, softens at 3&ndash;4 min &mdash; that&rsquo;s fascial release.
            </p>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.85, margin: 0 }}>
              <strong>Grilley&rsquo;s insight:</strong> Bony anatomy sets each person&rsquo;s limit &mdash; up to 40&deg; variation in femoral neck angle. Forcing past bone causes labral tears. The correct measure is sensation, not depth.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>The Emotional Release</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.85, marginBottom: '0.75rem' }}>
              The psoas connects to the sympathetic lumbar chain. When deep openers combine tissue access with stillness and slow breath, incomplete threat responses can complete: tears, trembling, waves of anxiety followed by relief. <strong>This is the body completing unfinished business.</strong>
            </p>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.85, margin: 0 }}>
              Soften the jaw. Long exhales. Witness without interpretation. Always close with savasana. Significant trauma history warrants a trauma-informed teacher.
            </p>
          </ScrollReveal>
        </div>

        {/* Research Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem', marginTop: '2.5rem', maxWidth: '1100px' }}>
          <ScrollReveal>
            <StatCard source="Reiman et al., 2016" stat="Hip rotation predicts back pain" detail="Reduced hip internal rotation ROM is significantly associated with non-specific low back pain. The most under-addressed hip movement in yoga." url="https://pubmed.ncbi.nlm.nih.gov/27117726/" />
          </ScrollReveal>
          <ScrollReveal>
            <StatCard source="Grilley, Yin Yoga (2002)" stat="40-degree skeletal variation" detail="Dissection work showed up to 40-degree variation in femoral neck angle between individuals. Pigeon depth is partly bony architecture, not effort." />
          </ScrollReveal>
          <ScrollReveal>
            <StatCard source="van der Kolk, 2014" stat="Yoga reduces treatment-resistant PTSD" detail="Yoga emphasizing interoceptive awareness reliably reduced PTSD scores in populations where conventional therapy had failed. Mechanism: restored vagal tone." url="https://pubmed.ncbi.nlm.nih.gov/25004196/" />
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* 06 — ANS CONNECTION */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)', background: 'var(--color-cream)' }}>
        <div className="section-label" style={{ marginBottom: '2.5rem', color: VIOLET_DEEP }}>06 — The Nervous System Connection</div>
        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.25rem', fontStyle: 'normal' }}>All Yoga Is Vagus Nerve Exercise</h2>
            <p style={{ margin: '0 0 2rem' }}>Every style interacts with the autonomic nervous system through one of three mechanisms:</p>
          </div>
        </ScrollReveal>
        <ScrollReveal group>
          <div style={{ maxWidth: '1100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'var(--color-surface-raised)', borderTop: '3px solid #3D8A5A', borderRadius: '2px', padding: '2rem 1.75rem' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>Direct Down-Regulation</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 1rem', lineHeight: 1.7 }}>Slow breathing and physical support stimulate baroreceptors and the ventral vagal complex.</p>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 500, color: '#3D8A5A' }}>Restorative &middot; Yin &middot; Hatha &middot; Yoga Nidra</p>
            </div>
            <div style={{ background: 'var(--color-surface-raised)', borderTop: `3px solid ${AMBER_DEEP}`, borderRadius: '2px', padding: '2rem 1.75rem' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>Autonomic Flexibility</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 1rem', lineHeight: 1.7 }}>Sympathetic activation → parasympathetic rebound. Trains stress recovery.</p>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 500, color: AMBER_DEEP }}>Ashtanga &middot; Vinyasa &middot; Power &middot; Hot</p>
            </div>
            <div style={{ background: 'var(--color-surface-raised)', borderTop: `3px solid ${VIOLET_DEEP}`, borderRadius: '2px', padding: '2rem 1.75rem' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>Direct Vagal Stimulation</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 1rem', lineHeight: 1.7 }}>Breathwork and chanting stimulate laryngeal and auricular vagal branches.</p>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 500, color: VIOLET_DEEP }}>Kundalini</p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div style={{ maxWidth: '780px', marginTop: '2.5rem', textAlign: 'center' }}>
            <Link href="/nervous-system" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: VIOLET_DEEP, textDecoration: 'none' }}>Explore the Nervous System in depth &rarr;</Link>
          </div>
        </ScrollReveal>
      </section>

      {/* CLOSING */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)', background: 'linear-gradient(160deg, oklch(55% 0.16 310 / 0.18), oklch(93% 0.04 290))', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '820px' }}>
          <ScrollReveal>
            <blockquote style={{ margin: 0, padding: 0 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 3vw, 2rem)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.5, color: 'var(--color-text)', margin: '0 0 1.5rem', maxWidth: '52ch' }}>&ldquo;Yoga is not about touching your toes. It is about what you learn on the way down.&rdquo;</p>
              <footer style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>— Jigar Gor</footer>
            </blockquote>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[{ href: '/meditate', label: 'Meditate' }, { href: '/fascia', label: 'Fascia' }, { href: '/breathe', label: 'Breathe' }, { href: '/reiki', label: 'Reiki' }, { href: '/nervous-system', label: 'Nervous System' }, { href: '/manifest', label: 'Manifest' }, { href: '/practice', label: 'Practice Timer' }, { href: '/sound-healing', label: 'Sound Healing' }, { href: '/somatics', label: 'Somatics' }, { href: '/sleep', label: 'Sleep' }, { href: '/qigong', label: 'Qigong' }, { href: '/chakras', label: 'Chakras' }].map((l, i) => (
                <span key={l.href} style={{ display: 'contents' }}>
                  {i > 0 && <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>}
                  <Link href={l.href} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>{l.label} &rarr;</Link>
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
