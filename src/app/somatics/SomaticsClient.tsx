'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoAccent from '@/components/VideoAccent';

const INDIGO_DEEP = '#2D3A6A';
const INDIGO_MID = '#6B7DB8';
const TEAL_ACCENT = '#5BA8A0';

function StatCard({ source, stat, detail, url }: { source: string; stat: string; detail: string; url?: string }) {
  return (
    <div style={{ borderLeft: `3px solid ${INDIGO_MID}`, padding: '1.5rem 1.75rem', background: 'var(--color-surface-raised)', borderRadius: '2px' }}>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: INDIGO_DEEP, margin: '0 0 0.75rem' }}>{url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}>{source}</a> : source}</p>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>{stat}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>{detail}</p>
    </div>
  );
}

export default function SomaticsClient() {
  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: 1.8, color: 'var(--color-text)' }}>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '85dvh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(3rem, 8vw, 6rem) max(1.5rem, 8vw) clamp(4rem, 8vw, 7rem)', background: 'linear-gradient(160deg, oklch(38% 0.08 255), oklch(60% 0.06 240))', overflow: 'hidden' }}>
        <div className="breathe" aria-hidden="true" style={{ position: 'absolute', right: '-6vw', top: '15%', width: 'clamp(300px, 45vw, 600px)', height: 'clamp(300px, 45vw, 600px)', borderRadius: '9999px', background: `radial-gradient(circle, ${TEAL_ACCENT}25 0%, transparent 70%)`, filter: 'blur(40px)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: TEAL_ACCENT, margin: '0 0 1.25rem' }}>The Body Completes What the Mind Cannot</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-hero)', fontWeight: 700, color: '#E8EAF0', lineHeight: 1.05, margin: '0 0 1.5rem', maxWidth: '14ch' }}>Somatics</h1>
          <p style={{ fontSize: 'var(--text-body-lg)', color: 'rgba(232,234,240,0.7)', margin: '0 0 2.5rem', maxWidth: '48ch', lineHeight: 1.75 }}>
            Trauma lives in the body&rsquo;s patterns, not just in memory. Somatic practices meet the
            nervous system where the trauma is stored &mdash; through tremor, movement, awareness, and discharge.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['Methods', 'Practices', 'Evidence'].map(label => (
              <a key={label} href={`#${label.toLowerCase()}`} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: TEAL_ACCENT, textDecoration: 'none', borderBottom: `1px solid ${INDIGO_MID}`, paddingBottom: '0.25rem' }}>{label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS SOMATICS */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw)', background: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>First-Person Body</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 1.5rem' }}>What Somatics Means</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              <em>Soma</em> = the body as experienced from within. Thomas Hanna gave the term its healing meaning:
              not anatomy&rsquo;s third-person view, but the first-person felt sense of tightening, holding, breathing,
              and aliveness.
            </p>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              Bessel van der Kolk established that trauma is stored as body patterns &mdash; chronic sympathetic
              activation, a braced neck, a tightened diaphragm. Cognitive insight alone doesn&rsquo;t change
              these patterns. <strong>The body must complete what the mind cannot.</strong>
            </p>
          </ScrollReveal>

          {/* The Animal Model */}
          <ScrollReveal>
            <div style={{ background: 'var(--color-surface-raised)', border: `1px solid var(--color-border)`, borderRadius: '2px', padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: '780px', marginBottom: '3rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>The Animal Model</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Wild animals face life-threatening situations routinely yet don&rsquo;t develop PTSD. When the threat passes,
                the animal <strong>completes the defensive cycle</strong> &mdash; trembling, shaking, breathing deeply, returning
                to baseline. The mobilized survival energy discharges through the body.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                In humans, this completion is frequently interrupted by social inhibition. The energy remains locked as
                chronic tension, hypervigilance, or numbness. <strong>Trauma is not the event itself &mdash; it is the
                incomplete response to it.</strong> &mdash; Peter Levine
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <VideoAccent src="/videos/somatics-loop.mp4" poster="/videos/somatics-poster.jpg" />

      {/* METHODS */}
      <section id="methods" style={{ padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw)', background: `color-mix(in srgb, var(--color-cream) 92%, ${INDIGO_MID})` }}>
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>The Lineages</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 3rem' }}>Five Somatic Methods</h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { name: 'Somatic Experiencing', founder: 'Peter Levine', desc: 'Titrated approach to trauma resolution. Touch the edge of activation, then resource. Pendulation teaches the nervous system that activation is survivable. Discharge completes the incomplete stress response.', evidence: 'RCT support (Brom 2017, n=63, 44% clinically significant PTSD improvement)' },
              { name: 'TRE', founder: 'David Berceli', desc: '7 exercises fatiguing thighs and psoas to trigger neurogenic tremor. The body\'s built-in discharge mechanism. 20\u201330 min self-administered sessions. Tremoring completes the incomplete stress cycle.', evidence: 'Pilot studies positive; no large RCTs yet' },
              { name: 'Feldenkrais Method', founder: 'Moshe Feldenkrais', desc: 'The brain changes movement through gentle awareness, not force. Awareness Through Movement (ATM): floor lessons with tiny exploratory movements. Neuroplasticity before the term existed.', evidence: 'Moderate evidence for pain, balance, mobility' },
              { name: 'Alexander Technique', founder: 'F.M. Alexander', desc: 'Inhibition (pausing habitual response) and Direction (conscious intention without doing). Primary control: the head-neck-back relationship. Constructive rest: 15 min daily on a firm surface.', evidence: 'Strong: BMJ RCT n=579, 86% vs 46% pain-free days at 1 year' },
              { name: 'Rolfing / Structural Integration', founder: 'Ida Rolf', desc: 'Hands-on fascial reorganization around gravity in a 10-session series. Sessions 1\u20133: superficial fascia. 4\u20137: deep structures (psoas, diaphragm). 8\u201310: integration.', evidence: 'Pilot studies positive for pain and posture' },
            ].map(m => (
              <ScrollReveal key={m.name}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: INDIGO_DEEP, margin: '0 0 0.5rem' }}>{m.founder}</p>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>{m.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: '0 0 1rem', flex: 1 }}>{m.desc}</p>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', color: INDIGO_DEEP, margin: 0 }}>{m.evidence}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* SE Core Concepts */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>Somatic Experiencing: Core Concepts</h3>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1.5rem' }}>
            {[
              { term: 'Felt Sense', desc: 'The bodily knowing of a situation \u2014 not a thought about it but its physical texture. "Where do you feel that in your body?"' },
              { term: 'Titration', desc: 'Approaching activation in small doses. The nervous system processes only what it can handle. Touch the edge, then return to safety.' },
              { term: 'Pendulation', desc: 'Oscillating between resource (felt safety) and the edge of activation. Teaching the nervous system that activation is survivable and temporary.' },
              { term: 'Discharge', desc: 'As incomplete responses complete: trembling, heat, spontaneous movement, deep breath, yawning, crying. The body doing what it needs to do.' },
            ].map(c => (
              <ScrollReveal key={c.term}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>{c.term}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* PRACTICES */}
      <section id="practices" style={{ padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw)', background: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>Self-Practices</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>Practices You Can Do Today</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '56ch', lineHeight: 1.75 }}>
              No practitioner needed. These self-administered practices are the entry point to somatic work.
            </p>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { id: 'tre', name: 'TRE Wall Sit Protocol', time: '20\u201330 min', steps: 'Complete exercises 1\u20136 (ankle raises, squats, lunges, static holds). Then lie supine in butterfly position (knees out, soles together). Allow tremoring to arise and travel freely. End with 5 min savasana. Neither force nor suppress the tremor.', note: 'Start with 15 min max. Not for acute psychiatric crisis.' },
              { id: 'constructive-rest', name: 'Constructive Rest', time: '15 min', steps: 'Firm surface, knees bent, small book under head. No effort. Notice where the back contacts the floor and where it doesn\u2019t. Spine decompresses. Roll to one side before standing.', note: 'The Alexander Technique\u2019s daily practice. Deceptively powerful.' },
              { id: 'voo-sound', name: 'The Voo Sound', time: '3\u20135 min', steps: 'Inhale through the nose. Exhale sustaining a low-pitched "Voooooo" \u2014 like a foghorn. Feel vibration in chest and belly. 3\u20135 repetitions. Activates the vagus nerve through laryngeal and thoracic vibration.', note: 'Peter Levine\u2019s go-to self-regulation technique.' },
              { id: 'orienting', name: 'Orienting Exercise', time: '2\u20133 min', steps: 'Slowly turn head and eyes around the room as if arriving somewhere new. Let the eyes be drawn to whatever is interesting. Rest there. The nervous system\u2019s "it\u2019s safe to look" signal.', note: 'Activates the orienting response. Interrupts freeze.' },
              { id: 'containment', name: 'Containment', time: '5 min', steps: 'One hand on chest, one on belly. Eyes closed. Three slow breaths. Name what you physically feel \u2014 not what you think: "tightness under my right hand." Affect labeling reduces amygdala reactivity.', note: 'Lieberman et al. 2007: naming sensations downregulates threat.' },
            ].map(p => (
              <ScrollReveal key={p.name}>
                <div id={p.id} style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: 0, fontStyle: 'normal' }}>{p.name}</h4>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.06em', color: INDIGO_DEEP }}>{p.time}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: '0 0 0.75rem' }}>{p.steps}</p>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--color-text-muted)', margin: 0 }}>{p.note}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Polyvagal Connection */}
          <ScrollReveal>
            <div style={{ background: 'var(--color-surface-raised)', border: `1px solid var(--color-border)`, borderRadius: '2px', padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: '780px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>The Polyvagal Thread</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                All somatic methods work through a common pathway: <strong>restoring ventral vagal tone
                by completing incomplete defensive responses</strong>. Trauma narrows the
                <strong> window of tolerance</strong> (Daniel Siegel) &mdash; the zone within which experience can be
                processed without overwhelm or shutdown. Somatic practice widens it.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The oscillation between resource and activation (SE), effort and ease (Feldenkrais),
                direction and release (Alexander) &mdash; all exercise the <strong>vagal brake</strong> and
                practice the autonomic flexibility that trauma erodes.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider flip />

      {/* EVIDENCE */}
      <section id="evidence" style={{ padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw)', background: `color-mix(in srgb, var(--color-cream) 92%, ${INDIGO_MID})` }}>
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>The Research</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 3rem' }}>Evidence Landscape</h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <ScrollReveal><StatCard source="Brom et al., 2017" stat="SE: 44% clinically significant improvement" detail="RCT, n=63, PTSD. Somatic Experiencing showed significant symptom reduction. Published in Frontiers in Psychology." url="https://pubmed.ncbi.nlm.nih.gov/28515705/" /></ScrollReveal>
            <ScrollReveal><StatCard source="Little et al., 2008" stat="Alexander: 86% pain-free days" detail="BMJ RCT, n=579. 24 Alexander lessons produced the largest long-term back pain reduction of any intervention tested \u2014 including massage and exercise." url="https://pubmed.ncbi.nlm.nih.gov/18713809/" /></ScrollReveal>
            <ScrollReveal><StatCard source="van der Kolk, 2014" stat="The Body Keeps the Score" detail="Established that trauma is stored as body patterns, not just narrative memory. Cognitive insight alone doesn\u2019t change chronic sympathetic activation." url="https://pubmed.ncbi.nlm.nih.gov/25004196/" /></ScrollReveal>
          </div>
          <ScrollReveal>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, maxWidth: '56ch' }}>
              The absence of large RCTs for some methods reflects the difficulty and cost of this research,
              not evidence of ineffectiveness. Somatic practices have decades of consistent clinical use.
              They are complements to &mdash; not replacements for &mdash; evidence-based medical and psychological care.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)', background: `linear-gradient(160deg, oklch(38% 0.08 255 / 0.18), oklch(93% 0.04 240))`, borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '860px', textAlign: 'center' }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 1.5rem' }}>Continue Exploring</h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[{ href: '/nervous-system', label: 'Nervous System' }, { href: '/fascia', label: 'Fascia' }, { href: '/reiki', label: 'Reiki' }, { href: '/yoga', label: 'Yoga' }, { href: '/meditate', label: 'Meditate' }, { href: '/breathe', label: 'Breathe' }, { href: '/sound-healing', label: 'Sound Healing' }, { href: '/manifest', label: 'Manifest' }, { href: '/practice', label: 'Practice' }, { href: '/sleep', label: 'Sleep' }, { href: '/qigong', label: 'Qigong' }].map(link => (
                <Link key={link.href} href={link.href} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: INDIGO_DEEP, textDecoration: 'none', padding: '0.625rem 1.25rem', border: `1px solid ${INDIGO_MID}`, borderRadius: '2px' }}>{link.label}</Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
