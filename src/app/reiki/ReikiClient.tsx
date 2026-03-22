'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoAccent from '@/components/VideoAccent';
import StatCard from '@/components/StatCard';

// ── Accent tokens (warm gold / sacred amber) ──────────────────
const GOLD_DEEP = '#6B5010';
const GOLD_MID = '#D4A843';
const GOLD_LIGHT = '#F0D68A';


// ── Hand Position Card ────────────────────────────────────────
function HandPosition({ number, name, placement, addresses }: { number: number; name: string; placement: string; addresses: string }) {
  return (
    <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.5rem' }}>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.12em', color: GOLD_DEEP, margin: '0 0 0.5rem' }}>{String(number).padStart(2, '0')}</p>
      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', fontStyle: 'normal' }}>{name}</h4>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.7, margin: '0 0 0.5rem' }}>{placement}</p>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', color: 'var(--color-text-muted)', margin: 0 }}>{addresses}</p>
    </div>
  );
}

// ── Gokai Data ────────────────────────────────────────────────
const gokai = [
  { jp: 'Ikaro na', en: 'Do not anger' },
  { jp: 'Shinpai suna', en: 'Do not worry' },
  { jp: 'Kansha shite', en: 'Be grateful' },
  { jp: 'Gyo wo hage me', en: 'Work diligently' },
  { jp: 'Hito ni shinsetsu ni', en: 'Be kind to all living beings' },
];

// ── Evidence Table Data ───────────────────────────────────────
const evidenceRows = [
  { domain: 'Anxiety reduction', quality: 'Low\u2013Moderate', direction: 'Positive', note: '~15 RCTs; most consistent finding' },
  { domain: 'Subjective pain', quality: 'Low', direction: 'Positive', note: 'Often no advantage over sham' },
  { domain: 'HRV / parasympathetic', quality: 'Low', direction: 'Conflicting', note: 'Key studies disagree (n=45 vs n=189)' },
  { domain: 'Cortisol reduction', quality: 'Very Low', direction: 'Trend positive', note: 'Small samples, no sham control' },
  { domain: 'Quality of life', quality: 'Low', direction: 'Generally positive', note: 'Palliative care settings' },
  { domain: 'Disease modification', quality: 'None', direction: 'No evidence', note: '' },
  { domain: 'Biofield mechanism', quality: 'None', direction: 'No evidence', note: 'Spiritual/traditional framework' },
];

// ── Self-Reiki Protocol ───────────────────────────────────────
const selfReikiPositions = [
  { num: 1, name: 'Eyes / Face', placement: 'Palms cupped lightly over the eyes, heels at temples' },
  { num: 2, name: 'Back of Head', placement: 'Hands slid under the skull, cradling the occipital ridge' },
  { num: 3, name: 'Throat', placement: 'One hand flat at the base of the throat, collarbone level' },
  { num: 4, name: 'Heart', placement: 'Both hands flat over the sternum / chest center' },
  { num: 5, name: 'Solar Plexus', placement: 'Both hands flat over upper abdomen at the diaphragm' },
  { num: 6, name: 'Lower Abdomen', placement: 'Both hands below the navel' },
  { num: 7, name: 'Knees', placement: 'One palm on each knee' },
  { num: 8, name: 'Feet (optional)', placement: 'Hands wrapped around or resting on the soles' },
];

// ── Tabs ──────────────────────────────────────────────────────
type TabKey = 'history' | 'science' | 'practice' | 'connection';

export default function ReikiClient() {
  const [activeTab, setActiveTab] = useState<TabKey>('history');

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
          background: 'linear-gradient(160deg, oklch(30% 0.10 65), oklch(40% 0.08 50))',
          overflow: 'hidden',
        }}
      >
        {/* Hero image */}
        <Image
          src="/images/hero-reiki.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.35 }}
        />
        {/* Gradient overlay */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,29,55,0.72) 0%, transparent 100%)' }} />

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
            The Healing Art of Presence
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
            Reiki
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
            A Japanese healing practice rooted in meditative presence and gentle touch.
            From Mikao Usui&rsquo;s 1922 enlightenment on Mount Kurama to over 800 hospitals
            worldwide &mdash; and the honest science of what it does and doesn&rsquo;t do.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['History', 'Science', 'Practice', 'Learn', 'Connection'].map(label => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: GOLD_MID,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${GOLD_MID}`,
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
          THE GOKAI (Five Principles)
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(3.5rem, 7vw, 6rem) max(1.5rem, 8vw)',
          background: `linear-gradient(180deg, var(--color-cream) 0%, color-mix(in srgb, ${GOLD_LIGHT} 8%, var(--color-cream)) 100%)`,
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
            The Five Principles &mdash; Gokai (五戒)
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              fontStyle: 'italic',
              color: 'var(--color-text-muted)',
              margin: '0 0 2.5rem',
            }}
          >
            &ldquo;The secret method of inviting happiness &mdash; the miraculous medicine for all diseases.&rdquo;
          </p>
        </ScrollReveal>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '560px',
            margin: '0 auto',
          }}
        >
          {gokai.map((g, i) => (
            <ScrollReveal key={i}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', textAlign: 'left' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: 0, minWidth: '3ch' }}>{i + 1}.</p>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.125rem' }}>{g.en}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--color-text-muted)', margin: 0 }}>{g.jp}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '2rem auto 0', maxWidth: '48ch', lineHeight: 1.75 }}>
            Usui intended these to be recited morning and evening with hands in <em>gassho</em> (prayer position).
            The temporal framing &mdash; &ldquo;just for today&rdquo; &mdash; dissolves anticipatory anxiety and rumination,
            performing the same cognitive defusion function as present-moment mindfulness.
          </p>
        </ScrollReveal>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          HISTORY
      ══════════════════════════════════════════════════════ */}
      <section
        id="history"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>Origins</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 1.5rem' }}>
              From Mount Kurama to the World
            </h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', marginBottom: '3rem' }}>
            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>Mikao Usui (1865&ndash;1926)</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                In 1922, after 21 days of fasting, prayer, and meditation (<em>isyu guo</em>) on Mount Kurama
                north of Kyoto, Mikao Usui reported a sudden <em>satori</em> &mdash; an experience of healing energy
                flowing through his body. He founded the <strong>Usui Reiki Ryoho Gakkai</strong> in Tokyo&rsquo;s Harajuku
                district that same year, teaching over 2,000 students and initiating 16 master-level teachers
                before his death in 1926.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Usui&rsquo;s original system emphasized spiritual development and self-practice far more than
                healing others. The Gakkai continues to this day as a closed Japanese society, preserving
                practices &mdash; <em>reiju</em>, <em>gyoshi</em>, <em>kotodama</em>, <em>waka</em> poetry &mdash; that
                were largely stripped from Western transmission.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>The Western Path</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                <strong>Chujiro Hayashi</strong>, a retired naval officer and Usui&rsquo;s senior student, systematized
                the 12 hand positions and opened a healing clinic in Tokyo. <strong>Hawayo Takata</strong> (1900&ndash;1980),
                born in Hawaii to Japanese immigrants, trained under Hayashi after her own healing experience
                in 1935 and brought Reiki to the West.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Takata simplified the system for Western audiences: removing Japanese-language practices,
                standardizing hand positions, and emphasizing therapy over spiritual development. Between
                1970 and 1980, she initiated 22 Reiki masters &mdash; the roots of virtually every Western
                lineage. Since the 1990s, researchers like Frank Arjava Petter and Hiroshi Doi have
                worked to restore original Japanese practices into Western training.
              </p>
            </ScrollReveal>
          </div>

          {/* Three Levels */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>The Three Levels</h3>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { num: '01', title: 'Shoden \u2014 First Teaching', desc: 'Self-healing hand positions, the five principles, Gassho meditation, Kenyoku (dry brushing), Joshin Kokyu Ho (breath work). Four reiju attunements open sensitivity to Reiki energy.' },
              { num: '02', title: 'Okuden \u2014 Inner Teaching', desc: 'Three classical symbols and mantras: Choku Rei (power/focus), Sei He Ki (mental/emotional), Hon Sha Ze Sho Nen (distance connection). Byosen scanning and distance healing techniques.' },
              { num: '03', title: 'Shinpiden \u2014 Mystery Teaching', desc: 'The master symbol (Dai Ko Myo), the ability to give reiju/attunements, and full teaching authority. Usui treated this as an ongoing spiritual commitment, not a course completion.' },
            ].map(level => (
              <ScrollReveal key={level.num}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem' }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.12em', color: GOLD_DEEP, margin: '0 0 0.75rem' }}>{level.num}</p>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>{level.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>{level.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <VideoAccent
        src="/videos/reiki-loop.mp4"
        poster="/videos/reiki-poster.jpg"
      />

      {/* ══════════════════════════════════════════════════════
          THE SCIENCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="science"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 88%, ${GOLD_LIGHT})`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>Evidence</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
              The Honest Science
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              Reiki has been studied in 30&ndash;40 RCTs and several systematic reviews. The evidence
              consistently shows relaxation and reduced anxiety. Whether this exceeds what any mindful
              touch practice provides remains an open question.
            </p>
          </ScrollReveal>

          {/* Evidence Quality Table */}
          <ScrollReveal>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -0.5rem', padding: '0 0.5rem', marginBottom: '3rem' }}>
              <table style={{ width: '100%', minWidth: '480px', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${GOLD_MID}` }}>
                    {['Domain', 'Evidence Quality', 'Direction', 'Note'].map(h => (
                      <th key={h} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: GOLD_DEEP, padding: '0.75rem 1rem', textAlign: 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {evidenceRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: 'var(--color-text)' }}>{row.domain}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>{row.quality}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>{row.direction}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Mechanisms */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', marginBottom: '3rem' }}>
            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>What the Evidence Supports</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                <strong>Anxiety reduction</strong> is the most consistent finding &mdash; supported by ~15 RCTs across
                pre-operative, oncology, and palliative care settings. Effect sizes of d&nbsp;=&nbsp;0.4&ndash;0.7.
                The relaxation response (Benson, 1975) is reliably triggered: decreased heart rate, respiratory
                rate, cortisol, and increased peripheral vasodilation.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                <strong>Baldwin&rsquo;s rat studies</strong> at the University of Arizona are methodologically significant:
                Reiki-treated animals showed reduced microvascular damage and lower heart rates. Animal models
                eliminate expectation as a confound &mdash; the strongest non-placebo evidence in the literature.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>The Honest Limits</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Some small studies have found Reiki outperforms sham for HRV measures, while larger
                studies have found no significant difference &mdash; the evidence remains mixed and
                methodologically limited. The larger studies suggest observed improvements may reflect
                general relaxation and safe touch, not Reiki-specific mechanisms.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The NCCIH states: &ldquo;No scientific studies have shown Reiki to be effective for treating
                any specific health condition.&rdquo; The biofield energy mechanism has zero peer-reviewed support &mdash;
                it is a spiritual framework, not a validated mechanism. Reiki is safe as a complement, never
                a substitute for conventional care.
              </p>
            </ScrollReveal>
          </div>

          {/* Proposed Mechanisms */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>Proposed Mechanisms</h3>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { label: 'Established', title: 'Relaxation Response', desc: 'Sustained gentle touch in a quiet environment triggers parasympathetic dominance \u2014 reduced heart rate, cortisol, and blood pressure. The same mechanism activated by meditation and deep breathing.' },
              { label: 'Established', title: 'Polyvagal Co-Regulation', desc: 'The practitioner\u2019s calm nervous system signals safety through touch, posture, and vocal tone. The recipient\u2019s system downregulates from sympathetic activation \u2014 documented mammalian social neurobiology.' },
              { label: 'Plausible', title: 'CT Afferent Pathway', desc: 'Gentle sustained touch activates C-tactile nerve fibers that project to the insula, not somatosensory cortex \u2014 triggering emotional regulation and social bonding circuits.' },
              { label: 'Traditional', title: 'Biofield / Ki Energy', desc: 'The traditional framework of universal life energy. Biomagnetic measurements from healers\u2019 hands exist (Zimmerman 1990) but have not been independently replicated or shown to affect tissue.' },
            ].map((m) => (
              <ScrollReveal key={m.title}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem' }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: m.label === 'Established' ? '#2D6A4F' : m.label === 'Plausible' ? GOLD_DEEP : 'var(--color-text-muted)', margin: '0 0 0.75rem', padding: '0.15rem 0.5rem', display: 'inline-block', borderRadius: '9999px', background: m.label === 'Established' ? 'rgba(45,106,79,0.1)' : m.label === 'Plausible' ? `color-mix(in srgb, ${GOLD_LIGHT} 20%, var(--color-cream))` : 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>{m.label}</p>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>{m.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Research Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
            <ScrollReveal><StatCard source="McManus, 2017" stat="13 RCTs reviewed" detail="Reiki showed positive trends for anxiety and pain reduction, though the review noted significant methodological limitations across studies." url="https://pubmed.ncbi.nlm.nih.gov/28874060/" accentColor={GOLD_MID} accentTextColor={GOLD_DEEP} /></ScrollReveal>
            <ScrollReveal><StatCard source="Baldwin et al., 2006" stat="Animal models eliminate placebo" detail="Noise-stressed rats receiving Reiki showed reduced microvascular damage. Because rats don't believe in Reiki, these effects cannot be attributed to expectation." url="https://pubmed.ncbi.nlm.nih.gov/16646732/" accentColor={GOLD_MID} accentTextColor={GOLD_DEEP} /></ScrollReveal>
            <ScrollReveal><StatCard source="Joyce & Herbison, 2015" stat="Cochrane: insufficient evidence" detail="The gold-standard Cochrane Review found only 3 qualifying RCTs. Conclusion: insufficient to say whether Reiki is effective. Evidence quality: Very Low." url="https://pubmed.ncbi.nlm.nih.gov/25629820/" accentColor={GOLD_MID} accentTextColor={GOLD_DEEP} /></ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          THE PRACTICE
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
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>Hands-On</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
              The 12 Hand Positions
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              A traditional session lasts 60&ndash;90 minutes. The receiver lies fully clothed on a massage table.
              Each position is held 3&ndash;5 minutes, moving through head, torso, and back.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem', marginBottom: '3.5rem' }}>
            {[
              { n: 1, name: 'Crown', placement: 'Both palms on top of the head', addresses: 'Central nervous system, clarity' },
              { n: 2, name: 'Eyes / Sinuses', placement: 'Palms cup lightly over the eyes', addresses: 'Stress, headache, sinus' },
              { n: 3, name: 'Ears / Temples', placement: 'Palms cup the ears', addresses: 'Balance, anxiety, inner ear' },
              { n: 4, name: 'Occiput', placement: 'Cradling the back of the skull', addresses: 'Vagus nerve, nervous system' },
              { n: 5, name: 'Throat', placement: 'Hands at base of throat', addresses: 'Communication, thyroid' },
              { n: 6, name: 'Heart Center', placement: 'Hands across the sternum', addresses: 'Grief, immune function' },
              { n: 7, name: 'Solar Plexus', placement: 'Upper abdomen at diaphragm', addresses: 'Digestive tension, anxiety' },
              { n: 8, name: 'Lower Abdomen', placement: 'Hands below the navel', addresses: 'Foundational security' },
              { n: 9, name: 'Upper Back', placement: 'Across shoulder blades', addresses: 'Chronic tension, burden' },
              { n: 10, name: 'Mid Back', placement: 'Over the adrenal glands', addresses: 'Cortisol, chronic fatigue' },
              { n: 11, name: 'Lower Back', placement: 'Lumbar-sacral junction', addresses: 'Low back pain, kidneys' },
              { n: 12, name: 'Sacrum', placement: 'Hands on the sacrum', addresses: 'Grounding, session close' },
            ].map(pos => (
              <ScrollReveal key={pos.n}>
                <HandPosition number={pos.n} name={pos.name} placement={pos.placement} addresses={pos.addresses} />
              </ScrollReveal>
            ))}
          </div>

          {/* Self-Reiki Protocol */}
          <div id="self-reiki" />
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', fontStyle: 'normal' }}>Daily Self-Reiki Protocol</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '56ch', lineHeight: 1.75 }}>
              15&ndash;20 minutes. Lie on your back or sit upright. Begin with 60 seconds of Gassho and the five principles.
              Hold each position 2 minutes &mdash; stay longer where you feel warmth or pulsing.
            </p>
          </ScrollReveal>
          <div className="timeline" style={{ paddingLeft: '2.5rem', marginBottom: '2.5rem' }}>
            {selfReikiPositions.map((pos) => (
              <div key={pos.num} style={{ position: 'relative', marginBottom: '1rem' }}>
                <div className="timeline-node" style={{ background: GOLD_DEEP }}>{pos.num}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>
                  <strong>{pos.name}</strong> &mdash; {pos.placement}
                </p>
              </div>
            ))}
          </div>
          <ScrollReveal>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, maxWidth: '56ch' }}>
              Close with Gassho at heart center, three breaths, and briskly rub palms together.
              Even 10 minutes daily produces cumulative benefit. Usui himself self-treated every morning.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          LEARN REIKI
      ══════════════════════════════════════════════════════ */}
      <section
        id="learn"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 92%, ${GOLD_LIGHT})`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>The Learning Path</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
              Learn Reiki
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              A practical curriculum you can follow &mdash; from finding a teacher through daily practice
              to the Japanese techniques most Western schools never teach.
            </p>
          </ScrollReveal>

          {/* Finding a Teacher */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>Finding a Teacher</h3>
            <p style={{ lineHeight: 1.85, marginBottom: '1.5rem', maxWidth: '56ch' }}>
              Reiki is transmitted, not just learned. The attunement chain from Usui to your teacher
              determines what was preserved. Look for: clear lineage they can articulate, an active personal
              daily practice, emphasis on self-practice over treating clients, reasonable fees, and in-person
              training for attunements.
            </p>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { name: 'Western Usui', desc: 'Through Takata\u2019s 22 masters. Most common. Simplified hand positions, Western anatomy framing. Good availability but gaps in Japanese techniques.' },
              { name: 'Jikiden Reiki', desc: 'Through Hayashi \u2192 Yamaguchi family. Closest to pre-Western Japanese practice. Byosen scanning, clinical precision. The most authentic path available.' },
              { name: 'Gendai Reiki Ho', desc: 'Hiroshi Doi\u2019s synthesis of Japanese and Western. Historically informed, accessible. Bridges the Gakkai\u2019s original system with modern practice.' },
              { name: 'Komyo Reiki', desc: 'Hyakuten Inamoto\u2019s Zen integration. Emphasis on simplicity, stillness, and the contemplative dimension. For those drawn to meditation.' },
            ].map(l => (
              <ScrollReveal key={l.name}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', fontStyle: 'normal' }}>{l.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>{l.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Level 1 Curriculum */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', fontStyle: 'normal' }}>Level 1: Shoden &mdash; First Teaching</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '56ch' }}>
              The foundation. Self-healing, daily practice, and developing sensitivity. Spend 3&ndash;6 months here
              before Level 2. The 21-day cleansing period after attunement is real: expect vivid dreams,
              emotional release, fatigue, and heightened sensitivity.
            </p>
          </ScrollReveal>

          {/* Japanese Techniques */}
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD_DEEP, margin: '0 0 1.5rem' }}>Core Techniques</p>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { jp: 'Hatsurei Ho', id: 'hatsurei-ho', kanji: '発霊法', en: 'Awakening Spirit', desc: 'The complete daily practice: Kenyoku \u2192 Joshin Kokyu Ho \u2192 Gassho in a 20\u201345 min seated sequence. The container for all other techniques.' },
              { jp: 'Kenyoku Ho', id: 'kenyoku-ho', kanji: '乾浴法', en: 'Dry Bathing', desc: '3 diagonal chest sweeps + 3 arm sweeps. Firm pressure, exhale on each stroke. Clears the practitioner\u2019s energy field before and after sessions.' },
              { jp: 'Joshin Kokyu Ho', id: 'joshin-kokyu-ho', kanji: '浄心呼吸法', en: 'Cleansing Breath', desc: 'Inhale through crown to hara (lower abdomen). Brief hold, radiate Ki outward. Exhale to release. 10\u201320 minutes. Activates hands for treatment.' },
              { jp: 'Byosen Reikan Ho', id: 'byosen-reikan-ho', kanji: '病腺霊感法', en: 'Intuitive Scanning', desc: 'Palms 2\u20136 inches above the body, head to feet. 5 levels of sensation: warmth \u2192 heat \u2192 tingling \u2192 pulsing \u2192 pain. The diagnostic foundation of Japanese Reiki.' },
              { jp: 'Reiji Ho', id: 'reiji-ho', kanji: '霊示法', en: 'Guided Placement', desc: 'Letting hands be drawn intuitively to where healing is needed. Trust the first impulse. Usui\u2019s original method \u2014 fixed positions came later.' },
              { jp: 'Gyoshi Ho', id: 'gyoshi-ho', kanji: '凝視法', en: 'Healing Gaze', desc: 'Directing Ki through softened eyes. For areas impractical to touch. Combine with hand treatment for dual-channel healing.' },
            ].map(t => (
              <ScrollReveal key={t.jp}>
                <div id={t.id} style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem' }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', color: GOLD_DEEP, margin: '0 0 0.25rem' }}>{t.kanji}</p>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.25rem', fontStyle: 'normal' }}>{t.jp}</h4>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic', margin: '0 0 0.75rem' }}>{t.en}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>{t.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Daily Practice Protocol */}
          <div id="gassho" />
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', fontStyle: 'normal' }}>The Daily Practice</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '56ch' }}>
              Three tiers: minimum (10 min), full morning (30 min), and evening (10 min).
              The most important thing is showing up. Everything else follows.
            </p>
          </ScrollReveal>
          <div className="timeline" style={{ paddingLeft: '2.5rem', marginBottom: '3rem' }}>
            {[
              { step: '1', text: 'Gassho + Gokai recitation \u2014 palms together, recite the five precepts. Set the day\u2019s intention. (3 min)' },
              { step: '2', text: 'Joshin Kokyu Ho \u2014 cleansing breath from crown to hara. 5\u201310 cycles minimum. (5 min)' },
              { step: '3', text: 'Kenyoku Ho \u2014 3 chest sweeps, 3 arm sweeps. Firm, with exhale. (2 min)' },
              { step: '4', text: 'Self-treatment positions 1\u20138 \u2014 eyes, temples, occiput, throat, heart, solar plexus, hara, knees/feet. (20 min)' },
              { step: '5', text: 'Close \u2014 sweep hands crown to feet 3 times. Silent gratitude. Three breaths. (1 min)' },
            ].map(item => (
              <div key={item.step} style={{ position: 'relative', marginBottom: '1rem' }}>
                <div className="timeline-node" style={{ background: GOLD_DEEP }}>{item.step}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* First Year Progression */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>First Year Progression</h3>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { period: 'Months 1\u20133', title: 'Foundation', desc: 'Establish the daily habit. Use the minimum practice on difficult days. Study the Gokai. Begin logging sensations. By Month 3 the sequence should feel natural.' },
              { period: 'Months 4\u20136', title: 'Deepening', desc: 'Develop byosen sensitivity. Instead of fixed timing, stay at each position until sensation peaks and subsides. Begin treating others regularly.' },
              { period: 'Months 7\u201312', title: 'Integration', desc: 'The shift from Reiki as a scheduled practice to Reiki as an orientation. Hands go automatically to pain. Sensation becomes interesting rather than alarming.' },
            ].map(p => (
              <ScrollReveal key={p.period}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem' }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.12em', color: GOLD_DEEP, margin: '0 0 0.5rem' }}>{p.period}</p>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.75rem', fontStyle: 'normal' }}>{p.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Level 2 Preview */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', fontStyle: 'normal' }}>Level 2: Okuden &mdash; The Three Symbols</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '56ch' }}>
              After 3&ndash;6 months of Level 1, Okuden introduces three symbols that direct and anchor
              healing intention. Intention becomes explicit: Level 1 asks you to show up with open hands;
              Level 2 asks you to direct healing across present, past, and future.
            </p>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { name: 'Cho Ku Rei', kanji: '\u30c1\u30e7\u30af\u30ec\u30a4', meaning: 'Power / Activation', desc: 'The ignition key. Concentrates and amplifies energy. Used at session start/close, for space clearing, and to sandwich other symbols: CKR \u2192 [symbol] \u2192 CKR.' },
              { name: 'Sei He Ki', kanji: '\u30bb\u30a4\u30d8\u30ad', meaning: 'Mental / Emotional', desc: 'Works on the emotional body. Surfaces and dissolves held patterns \u2014 grief, habits, trauma. Applied at the back of the head for subconscious access.' },
              { name: 'Hon Sha Ze Sho Nen', kanji: '\u30db\u30f3\u30b7\u30e3\u30bc\u30b7\u30e7\u30cd\u30f3', meaning: 'Distance / Time', desc: 'Transcends time and space. Foundation of every distance healing session. Also used for past healing (childhood, old trauma) and future support.' },
            ].map(s => (
              <ScrollReveal key={s.name}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem' }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', color: GOLD_DEEP, margin: '0 0 0.25rem' }}>{s.kanji}</p>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.25rem', fontStyle: 'normal' }}>{s.name}</h4>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic', margin: '0 0 0.75rem' }}>{s.meaning}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Recommended Reading */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>Recommended Reading</h3>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
            {[
              { author: 'Pamela Miles', title: 'Reiki: A Comprehensive Guide', note: 'The clinical standard. Most rigorous, evidence-conscious overview available. Essential for understanding the research landscape.' },
              { author: 'Frans & Bronwen Stiene', title: 'The Reiki Sourcebook', note: 'The most comprehensive reference text. Covers lineage, techniques, history, and symbols with scholarly rigor. If you buy one book, this is it.' },
              { author: 'Frank Arjava Petter', title: 'Reiki Fire', note: 'The book that recovered Japanese Reiki materials for the West. Challenges the Western origin myth with primary Japanese sources.' },
              { author: 'Hiroshi Doi', title: 'Iyashino Gendai Reiki Ho', note: 'Written from inside the original Japanese tradition. Practical, grounded, and philosophically serious.' },
            ].map(b => (
              <ScrollReveal key={b.title}>
                <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.5rem' }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD_DEEP, margin: '0 0 0.5rem' }}>{b.author}</p>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', fontStyle: 'italic' }}>{b.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>{b.note}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          MEDITATION & NERVOUS SYSTEM CONNECTION
      ══════════════════════════════════════════════════════ */}
      <section
        id="connection"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 92%, ${GOLD_LIGHT})`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>The Bridge</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 400, color: 'var(--color-text)', margin: '0 0 0.75rem' }}>
              Where Reiki Meets Every Other Practice
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '56ch', fontSize: 'var(--text-body-lg)', lineHeight: 1.75 }}>
              Reiki is not separate from meditation, breathwork, yoga, or nervous system regulation &mdash;
              it is a relational delivery vehicle for all of them.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', marginBottom: '3rem' }}>
            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>The Practitioner&rsquo;s Brain</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                C. Maxwell Cade&rsquo;s informal EEG observations (not peer-reviewed) suggested that
                <strong> Reiki Master-Teachers during active treatment show the same &ldquo;Awakened Mind&rdquo;
                brainwave pattern</strong> as Zen masters with 20+ years of practice: simultaneous beta, alpha,
                theta, and delta activity. This is practitioner literature, not controlled research &mdash; but
                the practitioner state it describes aligns with what controlled meditation studies do confirm:
                deep contemplative practice produces measurable shifts in neural oscillation.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The predominance of <strong>theta (4&ndash;7 Hz)</strong> is significant: the same band that
                increases during MBSR mindfulness, Vipassana, and flow states. Reiki as treatment and
                Reiki as meditation are the same activity viewed from different angles.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>Body Scan in Two Bodies</h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Reiki hand positions move systematically through the body &mdash; head to feet &mdash; mapping
                directly onto the <strong>MBSR body scan</strong> and <strong>yoga nidra</strong> sequences.
                Both practices recruit the insula-mediated interoceptive network to generate updated awareness
                of body regions that typically receive little conscious attention.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The critical difference: body scan meditation is self-directed. Reiki is <strong>relational</strong> &mdash;
                one person holds awareness for another, activating the social engagement system in a way solo
                practice cannot. The fascia&rsquo;s millions of sensory nerve endings respond to the sustained
                gentle touch, creating a dialogic interoceptive experience.
              </p>
            </ScrollReveal>
          </div>

          {/* Cross-practice connections */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1.5rem', fontStyle: 'normal' }}>Cross-Practice Connections</h3>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { practice: 'Meditation', link: '/meditate', desc: 'Gassho meditation trains the same single-pointed attention as dharana. Self-Reiki provides a physical anchor for practitioners who find abstract meditation difficult.' },
              { practice: 'Breathwork', link: '/breathe', desc: 'Joshin Kokyu Ho (Reiki breath meditation) overlaps with coherent breathing at 5.5\u20136 breaths/min. Sessions naturally synchronize with slow diaphragmatic rhythm.' },
              { practice: 'Yoga', link: '/yoga', desc: 'Savasana is the canonical posture for receiving Reiki. The Anjali mudra shared between yoga and Gassho marks a common contemplative lineage working with prana/ki.' },
              { practice: 'Fascia', link: '/fascia', desc: 'Fascia\u2019s piezoelectric properties mean gentle sustained touch creates microcurrents along fascial planes \u2014 potentially one physical substrate for \u201cenergy flow\u201d descriptions.' },
              { practice: 'Nervous System', link: '/nervous-system', desc: 'Polyvagal co-regulation is the core mechanism. The practitioner\u2019s ventral vagal state, broadcast through touch and presence, invites the recipient\u2019s system to safety.' },
            ].map(c => (
              <ScrollReveal key={c.practice}>
                <Link href={c.link} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', borderRadius: '2px', padding: '1.75rem', transition: 'border-color 300ms ease' }}>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD_DEEP, margin: '0 0 0.75rem' }}>{c.practice}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>{c.desc}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Hospital Programs */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 1rem', fontStyle: 'normal' }}>In Hospitals</h3>
            <p style={{ lineHeight: 1.85, marginBottom: '2rem', maxWidth: '56ch' }}>
              Over 800 hospitals worldwide offer Reiki, including Hartford Hospital (1999), Cleveland Clinic,
              Yale-New Haven, MD Anderson, Memorial Sloan Kettering, and Dana-Farber. Common reported outcomes:
              reduced pre/post-operative anxiety, decreased pain scores, improved patient satisfaction, and
              reduced chemotherapy-related nausea. The strongest defensible claim: <em>Reiki is a safe
              complementary practice associated with relaxation and reduced anxiety, particularly in acute care settings.</em>
            </p>
          </ScrollReveal>

          {/* Research Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
            <ScrollReveal><StatCard source="Díaz-Rodríguez et al., 2011" stat="HRV increases with Reiki" detail="RCT in nursing staff found significant parasympathetic upregulation (HF-HRV) compared to sham and rest. The best positive biomarker finding." url="https://pubmed.ncbi.nlm.nih.gov/21568717/" accentColor={GOLD_MID} accentTextColor={GOLD_DEEP} /></ScrollReveal>
            <ScrollReveal><StatCard source="Jain & Mills, 2010" stat="66 biofield therapy trials" detail="Systematic review: moderate evidence for pain reduction. Positive effects clustered in studies with poor blinding. Rigorous sham-controlled trials showed smaller effects." url="https://pubmed.ncbi.nlm.nih.gov/20563676/" accentColor={GOLD_MID} accentTextColor={GOLD_DEEP} /></ScrollReveal>
            <ScrollReveal><StatCard source="Porges, 2011" stat="Co-regulation is the mechanism" detail="Polyvagal Theory explains how therapeutic presence and safe touch produce physiological change through neuroception of safety — no energy transfer required." accentColor={GOLD_MID} accentTextColor={GOLD_DEEP} /></ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CROSS-LINKS
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)',
          background: `linear-gradient(160deg, oklch(55% 0.10 65 / 0.18), var(--color-cream))`,
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
                { href: '/manifest', label: 'Manifest' },
                { href: '/practice', label: 'Practice' },
                { href: '/sound-healing', label: 'Sound Healing' },
                { href: '/somatics', label: 'Somatics' },
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
                    color: GOLD_DEEP,
                    textDecoration: 'none',
                    padding: '0.625rem 1.25rem',
                    border: `1px solid ${GOLD_MID}`,
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
