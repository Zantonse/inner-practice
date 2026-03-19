'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoAccent from '@/components/VideoAccent';
import StatCard from '@/components/StatCard';

const AMBER_DEEP = '#6B5010';
const AMBER_MID = '#D4A843';
const AMBER_LIGHT = '#F0D68A';


export default function SoundHealingClient() {
  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: 1.8, color: 'var(--color-text)' }}>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '85dvh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(3rem, 8vw, 6rem) max(1.5rem, 8vw) clamp(4rem, 8vw, 7rem)', background: 'linear-gradient(160deg, oklch(50% 0.08 55), oklch(75% 0.06 45))', overflow: 'hidden' }}>
        <div className="breathe" aria-hidden="true" style={{ position: 'absolute', right: '-6vw', top: '15%', width: 'clamp(300px, 45vw, 600px)', height: 'clamp(300px, 45vw, 600px)', borderRadius: '9999px', background: `radial-gradient(circle, ${AMBER_LIGHT}30 0%, transparent 70%)`, filter: 'blur(40px)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: AMBER_DEEP, margin: '0 0 1.25rem' }}>Vibration as Medicine</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-hero)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.05, margin: '0 0 1.5rem', maxWidth: '14ch' }}>Sound Healing</h1>
          <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text-muted)', margin: '0 0 2.5rem', maxWidth: '48ch', lineHeight: 1.75 }}>
            From singing bowls to the science of humming &mdash; how vibration activates the vagus nerve,
            entrains brainwaves, and shifts the nervous system from threat to safety.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['Science', 'Instruments', 'Practice', 'Evidence'].map(label => (
              <a key={label} href={`#${label.toLowerCase()}`} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: AMBER_DEEP, textDecoration: 'none', borderBottom: `1px solid ${AMBER_MID}`, paddingBottom: '0.25rem' }}>{label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* SCIENCE */}
      <section id="science" style={{ padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw)', background: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>How Sound Affects the Body</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 1.5rem' }}>The Science of Vibration</h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', marginBottom: '3rem' }}>
            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>Vibration Through the Body</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>The body is ~60% water. Water transmits sound four times faster than air, meaning vibration applied at the surface rapidly reaches internal tissues. The fascial network is piezoelectric and functions as a body-wide tensegrity system &mdash; sound travels this matrix to distant structures.</p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>The brain&rsquo;s electrical activity can be influenced by rhythmic auditory input through the <strong>frequency-following response</strong> &mdash; the basis of binaural beats and shamanic drumming. But the strongest mechanism is simpler: <strong>humming activates the vagus nerve</strong> through laryngeal vibration, driving parasympathetic output that reduces heart rate, lowers cortisol, and dampens inflammation.</p>
            </ScrollReveal>
            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>Brainwave Entrainment</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead><tr style={{ borderBottom: `2px solid ${AMBER_MID}` }}>
                    {['Band', 'Range', 'State'].map(h => <th key={h} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: AMBER_DEEP, padding: '0.75rem 1rem', textAlign: 'left' }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {[['Delta', '0.5\u20134 Hz', 'Deep sleep'], ['Theta', '4\u20138 Hz', 'Meditation, creativity'], ['Alpha', '8\u201313 Hz', 'Relaxed alertness'], ['Beta', '13\u201330 Hz', 'Focus, active thinking'], ['Gamma', '30+ Hz', 'Peak cognition, insight']].map((r, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '0.625rem 1rem', fontWeight: 500 }}>{r[0]}</td>
                        <td style={{ padding: '0.625rem 1rem', color: 'var(--color-text-muted)' }}>{r[1]}</td>
                        <td style={{ padding: '0.625rem 1rem', color: 'var(--color-text-muted)' }}>{r[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
            <ScrollReveal><StatCard source="Kalyani et al., 2011" stat="Om chanting deactivates the amygdala" detail="fMRI showed Om chanting produced limbic deactivation matching direct vagus nerve stimulation. The active mechanism: laryngeal vibration, not semantic content." url="https://pubmed.ncbi.nlm.nih.gov/21654967/" accentColor={AMBER_MID} accentTextColor={AMBER_DEEP} /></ScrollReveal>
            <ScrollReveal><StatCard source="Weitzberg & Lundberg, 2002" stat="Humming: 15x nasal nitric oxide" detail="Nasal humming increased nitric oxide production 15-fold vs quiet breathing. NO is a vasodilator, airway cleanser, and antimicrobial agent." url="https://pubmed.ncbi.nlm.nih.gov/12119224/" accentColor={AMBER_MID} accentTextColor={AMBER_DEEP} /></ScrollReveal>
            <ScrollReveal><StatCard source="Goldsby et al., 2017" stat="Singing bowls reduce tension and fatigue" detail="62 adults: singing bowl meditation significantly reduced anxiety, depression, anger, and fatigue vs silent rest. Moderate to large effect sizes." url="https://pubmed.ncbi.nlm.nih.gov/28695748/" accentColor={AMBER_MID} accentTextColor={AMBER_DEEP} /></ScrollReveal>
          </div>
        </div>
      </section>

      <VideoAccent src="/videos/sound-healing-loop.mp4" poster="/videos/sound-healing-poster.jpg" />

      {/* INSTRUMENTS */}
      <section id="instruments" style={{ padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw)', background: `color-mix(in srgb, var(--color-cream) 88%, ${AMBER_LIGHT})` }}>
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>Tools of Vibration</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 3rem' }}>The Instruments</h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { id: 'singing-bowls', name: 'Tibetan Singing Bowls', desc: 'Hand-hammered bronze alloys producing rich multi-harmonic tones. The beating effect between harmonics entrains brainwaves. Striking gives transient tone; rimming gives continuous.' },
              { id: 'crystal-bowls', name: 'Crystal Singing Bowls', desc: 'Spun from fused quartz. Purer sustained tone with fewer overtones. Louder and effective for group sessions. Each bowl tuned to a specific note.' },
              { id: 'binaural-beats', name: 'Binaural Beats', desc: 'Two slightly different frequencies in each ear (headphones required). The brain generates a pulsing perception at the difference frequency. Garcia-Argibay 2019: moderate evidence for anxiety reduction.' },
              { id: 'chanting', name: 'Mantra & Chanting', desc: 'Om traverses the entire vocal cavity. The terminal "M" produces strong laryngeal vibration activating vagal mechanoreceptors. Kirtan synchronizes group respiration and co-regulation.' },
              { id: 'tuning-forks', name: 'Tuning Forks', desc: 'Weighted forks (128 Hz) pressed on bone transmit vibration through bone conduction. Stimulates proprioceptors and pain gating. Used in neurology for vibration-sense testing.' },
              { id: 'bhramari', name: 'The Human Voice', desc: 'Humming is the most accessible sound practice. Bhramari pranayama (bee breath): sustained "hmmmm" on exhale. 5\u201310 min produces measurable heart rate and blood pressure reductions.' },
            ].map(t => (
              <ScrollReveal key={t.name}>
                <div id={t.id} style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>{t.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>{t.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Nada Yoga + Sound Baths */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)' }}>
            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>Nada Yoga: The Yoga of Sound</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}><strong>Ahata nada</strong> (struck sound) &mdash; external, audible: instruments, voice, nature. <strong>Anahata nada</strong> (unstruck sound) &mdash; the inner sound heard in deep meditation, possibly corresponding to endogenous neural oscillations perceptible under very low sensory input.</p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>Nada meditation involves sealing the ears (Shanmukhi Mudra) and listening inward, progressing through subtler inner sounds &mdash; ocean, thunder, bells, flutes, bees &mdash; to the primordial vibration.</p>
            </ScrollReveal>
            <ScrollReveal>
              <h3 id="sound-bath" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>Sound Baths</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>Participants lie supine while a practitioner plays continuously for 30&ndash;90 minutes: crystal and Tibetan bowls, gongs, chimes, tingsha cymbals, shruti box, and voice.</p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>Physical stillness, darkness, and continuous complex auditory input create conditions for <strong>theta brainwave dominance</strong> (4&ndash;8 Hz). Acoustic driving prevents full sleep while enabling very deep relaxation. Hypnagogic imagery is common.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* PRACTICE */}
      <section id="practice" style={{ padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw)', background: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>Daily Protocol</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 2rem' }}>Your Sound Practice</h2>
          </ScrollReveal>
          <div className="timeline" style={{ paddingLeft: '2.5rem', marginBottom: '3rem', maxWidth: '780px' }}>
            {[
              { step: '1', text: 'Morning: 10 rounds of Bhramari (bee breath) \u2014 exhale through nose sustaining "hmmmm." Raises nasal NO 15x and activates vagal tone. (5 min)' },
              { step: '2', text: 'Follow with 3\u20135 min of Om or So Hum chanting at the pitch where chest resonance is strongest. (5 min)' },
              { step: '3', text: 'Midday: alpha-range binaural beats (8\u201310 Hz) with headphones, or brief Bhramari. (3\u20135 min)' },
              { step: '4', text: 'Evening: sound bath listening (bowls, gongs) lying in a darkened room. Target conscious theta \u2014 allow imagery without following into sleep. (15\u201330 min)' },
              { step: '5', text: 'Stack with breathwork: extended exhales at 5\u20136 breaths/min with humming on the exhale. Both vagal interventions amplify each other.' },
            ].map(item => (
              <div key={item.step} style={{ position: 'relative', marginBottom: '1rem' }}>
                <div className="timeline-node" style={{ background: AMBER_DEEP }}>{item.step}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Frequency by State */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>Frequency by Intention</h3>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1.5rem' }}>
            {[
              { state: 'Grounding / Anxiety', tools: 'Lower bowls (C\u2013D, 130\u2013200 Hz), binaural delta/theta' },
              { state: 'Focus / Clarity', tools: 'Higher bowls (A\u2013B, 400\u2013500 Hz), binaural alpha/low beta' },
              { state: 'Creative Exploration', tools: 'Binaural theta (5\u20137 Hz), Nada yoga inner listening' },
              { state: 'Social Connection', tools: 'Kirtan, group chanting (500\u20132000 Hz prosodic range)' },
            ].map(f => (
              <ScrollReveal key={f.state}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.5rem' }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: AMBER_DEEP, margin: '0 0 0.5rem' }}>{f.state}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>{f.tools}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider flip />

      {/* EVIDENCE */}
      <section id="evidence" style={{ padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw)', background: `color-mix(in srgb, var(--color-cream) 92%, ${AMBER_LIGHT})` }}>
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>Honest Assessment</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 3rem' }}>What the Evidence Shows</h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { label: 'Established', items: ['Vagal stimulation through laryngeal vibration', '15x nitric oxide from nasal humming', 'Relaxation response from sound meditation', 'Frequency-following response (EEG)'] },
              { label: 'Preliminary', items: ['Binaural beats for anxiety and focus', 'Singing bowl meditation for mood', 'Group sound baths and co-regulation', 'Specific frequency matching to tissues'] },
              { label: 'Lacks Evidence', items: ['Sound "healing" specific diseases', 'Biofield Tuning mechanism', '432 Hz vs 440 Hz tuning claims', 'Planetary gong frequencies'] },
            ].map(col => (
              <ScrollReveal key={col.label}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem' }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: col.label === 'Established' ? '#2D6A4F' : col.label === 'Preliminary' ? AMBER_DEEP : 'var(--color-text-muted)', margin: '0 0 1rem', padding: '0.15rem 0.5rem', display: 'inline-block', borderRadius: '9999px', background: col.label === 'Established' ? 'rgba(45,106,79,0.1)' : col.label === 'Preliminary' ? `color-mix(in srgb, ${AMBER_LIGHT} 20%, var(--color-cream))` : 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>{col.label}</p>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                    {col.items.map(item => <li key={item} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '0.25rem' }}>{item}</li>)}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)', background: `linear-gradient(160deg, oklch(50% 0.08 55 / 0.18), var(--color-cream))`, borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '860px', textAlign: 'center' }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 1.5rem' }}>Continue Exploring</h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[{ href: '/meditate', label: 'Meditate' }, { href: '/breathe', label: 'Breathe' }, { href: '/reiki', label: 'Reiki' }, { href: '/nervous-system', label: 'Nervous System' }, { href: '/yoga', label: 'Yoga' }, { href: '/somatics', label: 'Somatics' }, { href: '/fascia', label: 'Fascia' }, { href: '/manifest', label: 'Manifest' }, { href: '/practice', label: 'Practice' }, { href: '/sleep', label: 'Sleep' }, { href: '/qigong', label: 'Qigong' }, { href: '/chakras', label: 'Chakras' }, { href: '/trauma', label: 'Trauma' }, { href: '/nutrition', label: 'Nutrition' }, { href: '/temperature', label: 'Temperature' }, { href: '/nature', label: 'Nature' }, { href: '/taichi', label: 'Tai Chi' }, { href: '/fasting', label: 'Fasting' }, { href: '/psychedelics', label: 'Psychedelics' }].map(link => (
                <Link key={link.href} href={link.href} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: AMBER_DEEP, textDecoration: 'none', padding: '0.625rem 1.25rem', border: `1px solid ${AMBER_MID}`, borderRadius: '2px' }}>{link.label}</Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
