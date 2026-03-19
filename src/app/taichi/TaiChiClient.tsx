'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';
import StatCard from '@/components/StatCard';

// ── Accent tokens (tai chi / warm earth) ───────────────────────
const EARTH_DEEP = '#5A4E3C';
const EARTH_MID  = '#A89880';
const EARTH_PALE = '#EDE8DF';

// ── Style Card (five tai chi families) ─────────────────────────
function StyleCard({
  name,
  founder,
  character,
  description,
}: {
  name: string;
  founder: string;
  character: string;
  description: string;
}) {
  return (
    <div
      style={{
        background: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
        borderRadius: '2px',
        padding: '1.75rem',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.125rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: '0 0 0.25rem',
          fontStyle: 'normal',
        }}
      >
        {name}
      </h3>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            background: EARTH_PALE,
            color: EARTH_DEEP,
            border: `1px solid ${EARTH_MID}`,
          }}
        >
          {character}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6875rem',
            color: 'var(--color-text-muted)',
          }}
        >
          {founder}
        </span>
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

// ── Ingredient Card (Peter Wayne 8 Active Ingredients) ─────────
function IngredientCard({
  number,
  name,
  description,
}: {
  number: string;
  name: string;
  description: string;
}) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${EARTH_MID}`,
        padding: '1.25rem 1.5rem',
        background: 'var(--color-surface-raised)',
        borderRadius: '2px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.625rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: EARTH_MID,
          margin: '0 0 0.25rem',
        }}
      >
        Ingredient {number}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: '0 0 0.5rem',
        }}
      >
        {name}
      </p>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

// ── Video tab data ─────────────────────────────────────────────
type VideoTab = '24-form' | 'sun-style' | 'qigong-warmup';

const videoData: Record<VideoTab, Array<{ videoId: string; title: string; description: string }>> = {
  '24-form': [
    {
      videoId: 'R8NbQecDygQ',
      title: '24 Yang Style Tai Chi Form | Full Beginner Instruction',
      description: 'The simplified 24-movement Yang form (Simplified Tai Chi) is the most widely practiced form in the world, codified by the Chinese government in 1956 from Yang family tradition. Ideal for beginners — every posture is taught step by step.',
    },
    {
      videoId: 'e4VIw41R-PU',
      title: '24 Form Tai Chi Demonstration Back View Master Amin Wu',
      description: 'A real-time practice session of the full 24-form. No instruction — just follow and embody. Use this once you know the sequence and want to build flow, breath coordination, and the meditative quality of continuous movement.',
    },
  ],
  'sun-style': [
    {
      videoId: 'V0uSIE4bxmI',
      title: 'Tai Chi 24 - Yang Style Tai Chi 24 Form Tutorial in HD',
      description: 'Sun-style is the most accessible style for older adults and those with joint concerns — characterized by small, compact movements, lively footwork, and open-close hand transitions that continuously mobilize the wrists. The style preferred in fall prevention research.',
    },
  ],
  'qigong-warmup': [
    {
      videoId: 'aXC4bAb_jU8',
      title: 'Yang Style Tai Chi-24 Form',
      description: 'Before practicing the form, 5–10 minutes of Tai Chi-specific qigong primes the joints, activates the fascial meridian lines, and brings the mind into present awareness. These standing, swinging, and loosening exercises are the foundation of every traditional training session.',
    },
  ],
};

export default function TaiChiClient() {
  const [activeVideoTab, setActiveVideoTab] = useState<VideoTab>('24-form');

  return (
    <div
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-body)',
        lineHeight: 1.8,
        color: 'var(--color-text)',
      }}
    >

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '85dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(3rem, 8vw, 6rem) max(1.5rem, 8vw) clamp(4rem, 8vw, 7rem)',
          background: 'linear-gradient(160deg, oklch(35% 0.06 60), oklch(50% 0.08 45))',
          overflow: 'hidden',
        }}
      >
        {/* Animated orb */}
        <div
          className="breathe"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-6vw',
            top: '15%',
            width: 'clamp(300px, 45vw, 600px)',
            height: 'clamp(300px, 45vw, 600px)',
            borderRadius: '9999px',
            background: `radial-gradient(circle, ${EARTH_PALE}30 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
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
            The Moving Meditation
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              color: '#F5EAE1',
              lineHeight: 1.05,
              margin: '0 0 1.5rem',
              maxWidth: '18ch',
            }}
          >
            Tai Chi
          </h1>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'rgba(245,234,225,0.85)',
              margin: '0 0 2.5rem',
              maxWidth: '52ch',
              lineHeight: 1.75,
            }}
          >
            A martial art refined into medicine. Tai chi reduces falls by 58%, slows cognitive decline,
            matches physical therapy for chronic pain &mdash; and every movement is a lesson in fascial
            loading, vagal toning, and embodied presence.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { href: '#styles', label: 'Styles' },
              { href: '#evidence', label: 'Evidence' },
              { href: '#mechanisms', label: 'Mechanisms' },
              { href: '#connections', label: 'Connections' },
              { href: '#getting-started', label: 'Getting Started' },
              { href: '#practice', label: 'Practice' },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: EARTH_MID,
                  textDecoration: 'none',
                  borderBottom: `1px solid rgba(168,152,128,0.5)`,
                  paddingBottom: '0.25rem',
                  transition: 'opacity 200ms ease',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. HISTORY & STYLES
      ══════════════════════════════════════════════════════ */}
      <section
        id="styles"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>

          {/* Two-column intro */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3.5rem',
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
                  margin: '0 0 1rem',
                }}
              >
                Origin &amp; Lineage
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
                History &amp; Styles
              </h2>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Tai chi chuan (&ldquo;Supreme Ultimate Fist&rdquo;) traces to 17th-century Chen Village in Henan
                province, where the Chen family developed a martial system integrating the Taoist philosophy of
                <em> wu wei</em> &mdash; yielding, non-forcing action &mdash; with devastating combat application.
                The key insight was that relaxed softness could overcome tensed hardness: a principle verified
                by modern biomechanics in the concept of fascial pre-tensioning.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Over the following three centuries, the art branched into five major family styles, each with
                distinct biomechanical signatures. In the 20th century, these combat forms were refined into
                health-oriented practice, and today tai chi is practiced by an estimated 250 million people
                worldwide &mdash; the largest single body-mind practice on Earth.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Tai Chi vs Qigong
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The terms are often conflated but describe distinct practices. Qigong is the broader category:
                any system of deliberate breath, movement, and intent to cultivate <em>qi</em>. Tai chi is a
                specific martial-lineage form within that category &mdash; distinguished by its continuous
                flowing sequence (the <em>form</em>), its rooting in combat application, and its emphasis on
                <strong> sung</strong> (relax-sink) as a biomechanical principle, not merely a mental state.
              </p>
              {/* Comparison table */}
              <div
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  fontSize: '0.8125rem',
                }}
              >
                {[
                  { dimension: 'Structure', taichi: 'Fixed sequential form', qigong: 'Diverse — sets, flows, static' },
                  { dimension: 'Martial roots', taichi: 'Yes — combat application', qigong: 'Not necessarily' },
                  { dimension: 'Duration', taichi: '10–40 min per form', qigong: '5–30 min typical' },
                  { dimension: 'Research base', taichi: 'Very strong (falls, cognition, pain)', qigong: 'Strong (HRV, stress, immune)' },
                  { dimension: 'Skill curve', taichi: 'Moderate (form memorization)', qigong: 'Lower entry barrier' },
                ].map((row, i) => (
                  <div
                    key={row.dimension}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.2fr 1.5fr 1.5fr',
                      background: i % 2 === 0 ? 'var(--color-surface-raised)' : 'transparent',
                      padding: '0.625rem 0.875rem',
                      gap: '0.75rem',
                    }}
                  >
                    <span style={{ fontWeight: 600, color: EARTH_DEEP }}>{row.dimension}</span>
                    <span style={{ color: 'var(--color-text)' }}>{row.taichi}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{row.qigong}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Five Styles */}
          <ScrollReveal>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.5rem',
                fontStyle: 'normal',
              }}
            >
              The Five Family Styles
            </h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.25rem',
              marginBottom: '3.5rem',
            }}
          >
            {[
              {
                name: 'Chen Style',
                founder: 'Chen Wangting, ~1670',
                character: 'Original / Explosive',
                description: 'The oldest lineage, retaining the most martial content. Characterized by alternating slow flows and sudden bursts (fa jin — explosive power release), low stances, and silk-reeling (chan si jin) spiraling energy through the limbs. The most biomechanically demanding style; not recommended as a starting point.',
              },
              {
                name: 'Yang Style',
                founder: 'Yang Luchan, ~1820',
                character: 'Most Widely Practiced',
                description: 'The most practiced style globally, codified into the simplified 24-form by the Chinese Sports Committee in 1956. Features large, expansive postures and steady, even pace throughout. The 24-form is the world\'s most thoroughly researched tai chi intervention and the ideal entry point for health-oriented practice.',
              },
              {
                name: 'Wu Hao Style',
                founder: 'Wu Yuxiang, ~1850',
                character: 'Small-Frame / Internal',
                description: 'The least-known major style, characterized by extremely compact, precise movements and a focus on internal qi cultivation over external form. Small footsteps, tight transitions, and extraordinary sensitivity in hands. Rarely taught outside specialist lineage holders.',
              },
              {
                name: 'Wu Style',
                founder: 'Wu Quanyou, ~1870',
                character: 'Gentle / Medical',
                description: 'Distinguished from Wu Hao by its gentle forward lean and medically oriented adaptations. Features soft, flowing movement with no sudden transitions. Widely used in therapeutic and elder-care settings. Often confused with Wu Hao style due to transliteration differences in pinyin.',
              },
              {
                name: 'Sun Style',
                founder: 'Sun Lutang, ~1912',
                character: 'Best for Beginners / Rehab',
                description: 'The newest major style, synthesized by martial genius Sun Lutang from Chen, Yang, Bagua, and Xingyi. Features small, compact postures, lively follow-steps, and distinctive open-close hand transitions. Easiest on the knees due to higher stances. Preferred in fall prevention trials and physical therapy applications.',
              },
            ].map(style => (
              <ScrollReveal key={style.name}>
                <StyleCard
                  name={style.name}
                  founder={style.founder}
                  character={style.character}
                  description={style.description}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Peter Wayne 8 Active Ingredients */}
          <ScrollReveal>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
                fontStyle: 'normal',
              }}
            >
              Peter Wayne&rsquo;s 8 Active Ingredients
            </h3>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '1.5rem',
                maxWidth: '60ch',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
              }}
            >
              Harvard Medical School researcher Peter Wayne identified eight interdependent therapeutic
              components of tai chi practice &mdash; explaining <em>why</em> a single intervention
              produces benefits across such diverse health domains.
            </p>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1rem',
            }}
          >
            {[
              { number: '1', name: 'Awareness', description: 'Mindful, focused attention on movement, sensation, and intention. Builds interoceptive capacity and prefrontal regulation simultaneously.' },
              { number: '2', name: 'Intention', description: 'Yi (mind-intent) leads movement before the body moves. Trains the motor-executive loop and cultivates the mind-body connection that is absent in purely physical exercise.' },
              { number: '3', name: 'Structural Integration', description: 'Structural alignment and joint stacking cultivate postural awareness that transfers to everyday movement and reduces chronic musculoskeletal load.' },
              { number: '4', name: 'Fractionated Relaxation', description: 'The progressive softening of specific muscle groups while maintaining structure. Requires simultaneous activation and release — a skill that trains the nervous system in nuanced regulation.' },
              { number: '5', name: 'Refined Balance', description: 'Continuous weight shifting in single-leg stances trains proprioceptive and vestibular integration at every practice session. The primary mechanism for falls reduction.' },
              { number: '6', name: 'Rhythmic, Gentle Movement', description: 'Slow, rhythmic movement activates the cerebellar timing circuits and the parasympathetic nervous system simultaneously. The pace is medicine in itself.' },
              { number: '7', name: 'Social Engagement', description: 'Group practice amplifies oxytocin, activates the social engagement system (Porges), and provides the accountability structure linked to long-term adherence.' },
              { number: '8', name: 'Embodied Spirituality', description: 'The Taoist philosophical framework of yielding, non-striving, and finding order in cyclical change. Provides a coherent worldview that supports the practice and extends beyond it.' },
            ].map(ingredient => (
              <ScrollReveal key={ingredient.number}>
                <IngredientCard
                  number={ingredient.number}
                  name={ingredient.name}
                  description={ingredient.description}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          4. CLINICAL EVIDENCE — CENTERPIECE
      ══════════════════════════════════════════════════════ */}
      <section
        id="evidence"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${EARTH_PALE})`,
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
              What the Research Shows
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
              Clinical Evidence
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '60ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Tai chi has been studied in over 500 clinical trials. The evidence base is strongest
              for falls prevention, cognitive decline, and chronic pain &mdash; three domains where
              conventional medicine has the fewest effective options.
            </p>
          </ScrollReveal>

          {/* Headline StatCards */}
          <ScrollReveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '1.5rem',
                marginBottom: '3.5rem',
              }}
            >
              <StatCard
                source="Li et al., JAMA Internal Medicine, 2019 (n=670)"
                stat="58% fewer falls"
                detail="The largest RCT of tai chi for falls prevention. 670 community-dwelling adults at high fall risk randomized to tai chi vs stretch-and-strength. Tai chi reduced falls by 58% over 24 weeks — the largest effect size ever recorded for a falls intervention."
                url="https://pubmed.ncbi.nlm.nih.gov/30882847/"
                accentColor={EARTH_MID}
                accentTextColor={EARTH_DEEP}
              />
              <StatCard
                source="Lam et al., Annals of Internal Medicine, 2019"
                stat="Slows MCI&rarr;dementia"
                detail="3-year RCT in adults with Mild Cognitive Impairment. Tai chi significantly slowed conversion from MCI to dementia compared to cognitive training and aerobic exercise. The only intervention to show this profile over 36 months."
                url="https://pubmed.ncbi.nlm.nih.gov/30778162/"
                accentColor={EARTH_MID}
                accentTextColor={EARTH_DEEP}
              />
              <StatCard
                source="Wang et al., BMJ, 2011"
                stat="As effective as PT"
                detail="High-quality RCT in knee osteoarthritis showing tai chi matched physical therapy for pain reduction and functional improvement. No serious adverse events. Sustained at 52-week follow-up."
                url="https://pubmed.ncbi.nlm.nih.gov/21908496/"
                accentColor={EARTH_MID}
                accentTextColor={EARTH_DEEP}
              />
            </div>
          </ScrollReveal>

          {/* Falls Prevention deep-dive */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3.5rem',
            }}
          >
            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Falls Prevention
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Falls are the leading cause of injury death in adults over 65 &mdash; and they are largely
                preventable. Li et al. (2019, JAMA) assigned 670 high-risk adults to 24 weeks of either
                tai chi or a supervised stretch-and-strength program. Tai chi reduced injurious falls
                by 58% &mdash; a magnitude that far exceeds pharmacological interventions and most
                exercise programs.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The mechanism is not simply muscle strength but the integration of proprioception,
                vestibular processing, and anticipatory postural adjustment that tai chi trains through
                continuous single-leg weight transfers. After 24 weeks, practitioners had measurably
                better reaction times, balance recovery speed, and anticipatory muscle activation
                compared to the strength-training group.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Cognition &amp; MCI
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Lam et al. (2019, Annals of Internal Medicine) conducted a 3-year trial in adults with
                Mild Cognitive Impairment randomized to tai chi, cognitive training, or combined aerobic
                exercise. Tai chi significantly reduced conversion to dementia over 36 months, improved
                global cognition scores, and showed superior effects on memory and processing speed
                compared to cognitive training alone.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${EARTH_MID}`,
                  padding: '1rem 1.25rem',
                  background: EARTH_PALE,
                  borderRadius: '0 2px 2px 0',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: EARTH_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  Tao et al. (2017) showed that 12 weeks of tai chi produced measurable increases in
                  cortical thickness in regions associated with memory and executive function, and
                  increased hippocampal volume &mdash; the same brain structure that shrinks in
                  Alzheimer&rsquo;s disease.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Pain evidence */}
          <ScrollReveal>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.5rem',
                fontStyle: 'normal',
              }}
            >
              Chronic Pain
            </h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '3.5rem',
            }}
          >
            <ScrollReveal>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  border: `1px solid ${EARTH_MID}`,
                  borderRadius: '2px',
                  padding: '1.75rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: EARTH_DEEP,
                    margin: '0 0 0.75rem',
                  }}
                >
                  Fibromyalgia &mdash; Wang et al., NEJM, 2010
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.85, marginBottom: '0.75rem', color: 'var(--color-text)' }}>
                  In a landmark NEJM trial, 66 fibromyalgia patients were randomized to either tai chi
                  or wellness education and stretching. The tai chi group showed clinically significant
                  improvements in pain, sleep quality, depression, and quality of life at 12 and 24 weeks.
                </p>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.75, margin: 0, color: 'var(--color-text-muted)' }}>
                  The finding was notable because fibromyalgia involves central sensitization &mdash; a
                  pain-amplification disorder of the nervous system. Tai chi&rsquo;s effects on this class
                  of pain suggest autonomic and neuroplastic mechanisms beyond peripheral tissue repair.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  border: `1px solid ${EARTH_MID}`,
                  borderRadius: '2px',
                  padding: '1.75rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: EARTH_DEEP,
                    margin: '0 0 0.75rem',
                  }}
                >
                  Knee Osteoarthritis &mdash; Wang et al., BMJ, 2011
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.85, marginBottom: '0.75rem', color: 'var(--color-text)' }}>
                  The BMJ RCT compared 12 weeks of tai chi to physical therapy in 204 patients with
                  symptomatic knee OA. Both groups showed equivalent reductions in pain and improvements
                  in function at 12 weeks. At 52-week follow-up, both maintained gains &mdash; with
                  tai chi showing additional benefits in depression and quality of life scores.
                </p>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.75, margin: 0, color: 'var(--color-text-muted)' }}>
                  This equivalence with physical therapy at a fraction of the cost and with no adverse
                  events is what made the BMJ finding a landmark in evidence-based integrative medicine.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Cardiovascular and mental health */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                domain: 'Cardiovascular',
                color: EARTH_MID,
                summary: 'Meta-analyses show tai chi reduces systolic blood pressure by 10–17 mmHg, equivalent to first-line antihypertensive medication. Effect is mediated by autonomic rebalancing and improved arterial compliance.',
              },
              {
                domain: 'Heart Failure',
                color: EARTH_MID,
                summary: 'Yeh et al. (2011, JACC Heart Failure) found tai chi significantly improved quality of life, exercise capacity, and mood in chronic heart failure patients — with no adverse events across 6 months.',
              },
              {
                domain: 'Mental Health',
                color: EARTH_MID,
                summary: 'Multiple RCTs document significant reductions in anxiety and depression scores, with effect sizes comparable to SSRI medication for mild-to-moderate presentations. Mechanism includes HRV elevation and mindful movement.',
              },
              {
                domain: 'PTSD (Irwin 2014)',
                color: EARTH_MID,
                summary: 'Irwin et al. (2014) demonstrated that mind-body practices including tai chi reduced inflammatory markers (CRP, IL-6) linked to PTSD and trauma-induced dysregulation. Social engagement component amplifies effect.',
              },
            ].map(item => (
              <ScrollReveal key={item.domain}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    padding: '1.5rem',
                    borderTop: `3px solid ${item.color}`,
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.75rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {item.domain}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {item.summary}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          6. MECHANISMS
      ══════════════════════════════════════════════════════ */}
      <section
        id="mechanisms"
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
              Why It Works
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
              Mechanisms
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '56ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              The breadth of tai chi&rsquo;s clinical benefits is explained by four overlapping
              physiological mechanisms &mdash; each operating through a different system, each
              reinforcing the others.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3rem',
            }}
          >
            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Fascia: Silk-Reeling &amp; Weight-Shifting
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The signature Chen-style principle of <em>chan si jin</em> (&ldquo;silk-reeling energy&rdquo;)
                describes a spiraling, whole-body movement pattern that propagates from the dan tian (lower
                abdomen) through limbs and extremities. Modern fascia research recognizes this as continuous
                tensile loading through the myofascial chains &mdash; the same tissue Tom Myers mapped as
                &ldquo;Anatomy Trains.&rdquo;
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The slow, continuous weight-shifting through the full range of motion provides a uniquely
                gentle but comprehensive fascial hydration and loading protocol. Unlike static stretching,
                the movement-load creates piezoelectric fascial stimulation. Unlike high-load exercise, the
                slow pace prevents micro-tearing in inflamed or sensitized tissue.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Autonomic: HRV &amp; Vagal Toning
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Tai chi practice consistently elevates Heart Rate Variability, the primary index of
                parasympathetic tone. A 2015 meta-analysis (Zou et al.) found a pooled effect size of
                <strong> d=0.40</strong> for HRV improvement across 11 RCTs &mdash; a moderate-to-strong
                effect that compares favorably with aerobic exercise and coherence breathing protocols.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The mechanism is multi-factorial: synchronized breath and movement activates the
                baroreflex; the social engagement of group practice stimulates the ventral vagal circuit;
                and the non-striving, meditative attention quality reduces the prefrontal-amygdala threat
                activation that chronically suppresses vagal tone in anxiety and trauma states.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Proprioception &amp; Vestibular Integration
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Every tai chi posture involves a carefully calibrated single-leg weight transfer, demanding
                that the proprioceptive (joint position), vestibular (inner ear), and visual systems
                continuously reconcile and update. The slow pace makes this process <em>conscious</em> &mdash;
                requiring the practitioner to sense micro-instabilities rather than reflexively compensate.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                This conscious proprioceptive training is fundamentally different from balance training on
                unstable surfaces. The neural circuits being trained are anticipatory postural adjustment
                (APA) circuits &mdash; the ones that fire 100ms before a foot contacts the ground to
                pre-stabilize the body. It is these circuits, not raw strength, that predict fall risk.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Neuroplasticity
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Tao et al. (2017) used structural MRI to compare brain morphology in long-term tai chi
                practitioners versus non-practitioners and found significantly greater cortical thickness
                in prefrontal, motor, and somatosensory regions &mdash; and larger hippocampal volume.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${EARTH_MID}`,
                  padding: '1rem 1.25rem',
                  background: EARTH_PALE,
                  borderRadius: '0 2px 2px 0',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: EARTH_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  The hippocampus is the memory-formation and spatial navigation hub that shrinks earliest
                  in Alzheimer&rsquo;s disease. Tao et al.&rsquo;s finding of <strong>enlarged hippocampal
                  volume</strong> in tai chi practitioners provides a structural explanation for Lam&rsquo;s
                  clinical finding that tai chi slows MCI-to-dementia conversion over 3 years.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          8. TAI CHI & SITE PRACTICES — CONNECTIONS
      ══════════════════════════════════════════════════════ */}
      <section
        id="connections"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${EARTH_PALE})`,
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
              How Tai Chi Relates to Other Practices
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
              Tai Chi &amp; Site Practices
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '56ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Tai chi is not an isolated practice. Understanding how it amplifies and is amplified by
              the other practices on this site reveals the deeper architecture of embodied health.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                practice: 'Qigong',
                color: EARTH_MID,
                relationship: 'Foundational complement',
                description: 'Qigong is the parent category from which tai chi emerges. Standing qigong (zhan zhuang) develops the rootedness that tai chi form requires. Many practitioners train qigong alongside tai chi to deepen internal awareness and fill the gaps between form sessions.',
                href: '/qigong',
              },
              {
                practice: 'Fascia',
                color: EARTH_MID,
                relationship: 'Structural mechanism',
                description: 'Silk-reeling and slow continuous weight-bearing directly hydrate and load the fascial network. The myofascial chains described in Anatomy Trains are the medium through which tai chi\'s structural integration operates. Fascia research is the modern scientific translation of qi meridian theory.',
                href: '/fascia',
              },
              {
                practice: 'Nervous System',
                color: EARTH_MID,
                relationship: 'Primary benefit pathway',
                description: 'HRV elevation (d=0.40), sympathetic downregulation, and ventral vagal activation are core tai chi mechanisms. The practice trains the polyvagal hierarchy through: social engagement (group practice), slow rhythm (respiratory sinus arrhythmia), and soft attention (prefrontal-amygdala regulation).',
                href: '/nervous-system',
              },
              {
                practice: 'Sleep',
                color: EARTH_MID,
                relationship: 'Irwin 2014 — inflammatory bridge',
                description: 'Irwin et al. (2014) showed that mind-body practices including tai chi reduced pro-inflammatory cytokines (CRP, IL-6, TNF-alpha) that underlie both poor sleep and chronic disease. Tai chi practice also reduces evening cortisol, directly supporting the parasympathetic conditions required for sleep onset.',
                href: '/sleep',
              },
              {
                practice: 'Meditation',
                color: EARTH_MID,
                relationship: 'Moving versus still',
                description: 'Tai chi and sitting meditation activate many of the same neural circuits — prefrontal regulation, default mode network quieting, interoceptive awareness. Tai chi provides these benefits in a moving, load-bearing context that sedentary meditation cannot match. Many practitioners use tai chi as their primary meditation vehicle.',
                href: '/meditate',
              },
              {
                practice: 'Breathwork',
                color: EARTH_MID,
                relationship: 'Shared autonomic mechanism',
                description: 'Traditional tai chi synchronizes breath with movement: inhale on expansion phases, exhale on compression. This breath-movement coupling creates the same baroreflex resonance as coherence breathing (5.5 bpm). Explicit breathwork practice deepens this capacity and transfers back into the form.',
                href: '/breathe',
              },
              {
                practice: 'Trauma',
                color: EARTH_MID,
                relationship: 'Bottom-up somatic processing',
                description: 'Trauma lives in the body as chronic muscular holding, autonomic dysregulation, and disrupted proprioception. Tai chi addresses all three: slow movement discharges held tension, the meditative attention trains interoception, and the non-threatening social context rebuilds the felt sense of safety in embodied presence.',
                href: '/trauma',
              },
            ].map(item => (
              <ScrollReveal key={item.practice}>
                <Link
                  href={item.href}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
                >
                  <div
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      padding: '1.5rem',
                      borderTop: `3px solid ${item.color}`,
                      height: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: EARTH_DEEP,
                        margin: '0 0 0.25rem',
                      }}
                    >
                      {item.practice}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.6875rem',
                        color: 'var(--color-text-muted)',
                        fontStyle: 'italic',
                        margin: '0 0 0.75rem',
                      }}
                    >
                      {item.relationship}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          10. GETTING STARTED
      ══════════════════════════════════════════════════════ */}
      <section
        id="getting-started"
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
              Where to Begin
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
              Getting Started
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '56ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              The most important principle: start with a form you can practice daily, in the style
              that matches your current body. Depth comes from repetition over years &mdash;
              not from choosing the &ldquo;correct&rdquo; style at the outset.
            </p>
          </ScrollReveal>

          {/* Form recommendations */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              marginBottom: '3.5rem',
            }}
          >
            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Yang 24-Form
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The ideal starting point for most people. 24 postures, 6–10 minutes per complete
                run-through, with the full research evidence base of Yang-style attached. Originally
                designed by the Chinese Sports Committee as a simplified, accessible introduction to
                tai chi for the general public &mdash; it accomplishes this brilliantly.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Learning sequence: begin with the opening sequence and the first 6 postures. Practice
                these until they are automatic before adding the next section. Expecting to learn the
                full form in a single session is the most common failure mode.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${EARTH_MID}`,
                  padding: '1rem 1.25rem',
                  background: EARTH_PALE,
                  borderRadius: '0 2px 2px 0',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: EARTH_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  Best for: all adults, general health, research-backed outcomes. Widely taught globally.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Sun Style (Therapeutic)
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The preferred choice for adults with knee pain, hip replacements, balance concerns, or
                anyone over 70. Sun style&rsquo;s higher stances reduce knee flexion stress, and the
                open-close hand transitions maintain wrist and shoulder mobility without demanding
                lower-body depth.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Sun style is the form used in the majority of falls prevention trials, and is specifically
                recommended in physical therapy literature as an adjunct to post-surgical rehabilitation.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${EARTH_MID}`,
                  padding: '1rem 1.25rem',
                  background: EARTH_PALE,
                  borderRadius: '0 2px 2px 0',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: EARTH_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  Best for: older adults, post-surgical rehab, chronic knee/hip conditions, fall prevention programs.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Beginner Timeline */}
          <ScrollReveal>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
                fontStyle: 'normal',
              }}
            >
              Beginner Timeline: 3 Phases
            </h3>
          </ScrollReveal>
          <div className="timeline" style={{ paddingLeft: '2.5rem', marginBottom: '3rem' }}>
            {[
              {
                step: '1',
                title: 'Foundation (Weeks 1–4): Learn to stand',
                desc: 'Before learning any posture, learn to stand in Wu Chi posture: feet shoulder-width, knees slightly bent, pelvis neutral, crown lifting. 5 minutes of standing qigong daily builds the internal awareness and root that the form requires. Without this, you will practice the outer shape without the inner quality.',
              },
              {
                step: '2',
                title: 'Form Acquisition (Months 1–3): Learn the sequence',
                desc: 'Learn 3–4 new postures per week using video instruction. Prioritize memorizing the sequence over doing it perfectly — your body will refine the quality through repetition. Practice the partial form you know every day. Full form mastery typically takes 2–3 months of consistent daily practice.',
              },
              {
                step: '3',
                title: 'Integration (Months 3–12+): Discover the practice',
                desc: 'Once you know the full sequence, the real practice begins. You begin noticing the quality of your weight shifts, the softness in transitions, the breath patterns. This is when tai chi stops being a memory exercise and becomes a meditation. The first year of form-polishing is when the health benefits consolidate.',
              },
            ].map(item => (
              <div key={item.step} style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <div
                  className="timeline-node"
                  style={{ background: EARTH_DEEP }}
                >
                  {item.step}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--color-text)',
                    lineHeight: 1.75,
                    margin: '0 0 0.25rem',
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          12. SAFETY
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${EARTH_PALE})`,
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
              Risk Profile
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
              Safety Considerations
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Tai chi has an exceptionally favorable safety profile. In clinical trials across thousands
              of participants, serious adverse events are rare. The most relevant considerations are
              joint loading specifics for practitioners with existing conditions.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
              marginBottom: '2.5rem',
            }}
          >
            <ScrollReveal>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  padding: '1.5rem',
                  borderTop: `3px solid #2D6A4F`,
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 0.75rem',
                    fontStyle: 'normal',
                  }}
                >
                  Overall Risk Profile
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                  Across hundreds of clinical trials, tai chi shows an exceptionally low adverse event rate.
                  A 2017 systematic review of 35 RCTs found no serious adverse events attributable to
                  tai chi practice. Minor muscle soreness in the first 2 weeks is common and expected.
                  Tai chi is safe for most populations including elderly, cardiac, and post-surgical patients.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  padding: '1.5rem',
                  borderTop: `3px solid #E4AD75`,
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 0.75rem',
                    fontStyle: 'normal',
                  }}
                >
                  Knee Considerations
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                  Traditional forms with deep, low stances (especially Chen style) require significant
                  knee flexion and can aggravate existing knee pathology. For knee OA, meniscus injuries,
                  or replacements: practice Sun style (higher stances), or raise the height of all postures
                  in Yang style. The BMJ OA trial used modified posture heights throughout.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  padding: '1.5rem',
                  borderTop: `3px solid ${EARTH_MID}`,
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 0.75rem',
                    fontStyle: 'normal',
                  }}
                >
                  Balance &amp; Beginners
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                  Single-leg postures in early practice may initially increase fall risk in very high-risk
                  individuals before protective effects kick in. For those with severe balance impairment,
                  begin near a wall or chair for support. The protective effect typically emerges within
                  6–8 weeks as proprioceptive circuits adapt.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          13. "Now, practice." SEPARATOR + VIDEOS
      ══════════════════════════════════════════════════════ */}
      {/* Section break — warm earth */}
      <div
        id="practice"
        style={{
          padding: '2.5rem max(1.5rem, 8vw)',
          background: EARTH_DEEP,
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'rgba(168,152,128,0.3)' }} />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: '#FFFFFF',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Now, practice.
        </p>
        <div style={{ flex: 1, height: '1px', background: 'rgba(168,152,128,0.3)' }} />
      </div>

      {/* Practice / Video section */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(5rem, 9vw, 8rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              Guided Practices
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              The 24-form is the recommended starting point. Use the Sun-style videos if you have
              knee concerns or are working in a therapeutic context. Begin every session with the
              qigong warm-up to prepare the joints and center the mind.
            </p>
          </ScrollReveal>

          {/* Pill tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0.625rem',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
            }}
          >
            {[
              { key: '24-form' as VideoTab, label: '24-Form (Yang)' },
              { key: 'sun-style' as VideoTab, label: 'Sun Style' },
              { key: 'qigong-warmup' as VideoTab, label: 'Qigong Warm-Up' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveVideoTab(tab.key)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 1.125rem',
                  borderRadius: '9999px',
                  border: `1px solid ${activeVideoTab === tab.key ? EARTH_DEEP : 'var(--color-border)'}`,
                  background:
                    activeVideoTab === tab.key ? EARTH_DEEP : 'var(--color-surface-raised)',
                  color: activeVideoTab === tab.key ? '#ffffff' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Video grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '2rem',
            }}
          >
            {videoData[activeVideoTab].map(video => (
              <ScrollReveal key={video.videoId}>
                <div>
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '16 / 9',
                      marginBottom: '1rem',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    <VideoFacade videoId={video.videoId} title={video.title} />
                  </div>
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
                    {video.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {video.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          14. CROSS-LINKS FOOTER
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)',
          background: `linear-gradient(160deg, oklch(35% 0.06 60 / 0.18), var(--color-cream))`,
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
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
              Tai Chi Connects to Everything
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              Every benefit of tai chi overlaps with at least one other practice on this site.
              Here is where to go deeper.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '1rem',
              marginBottom: '4rem',
            }}
          >
            {[
              {
                href: '/qigong',
                label: 'Qigong',
                desc: 'The parent practice — standing, moving, and breathing cultivation that feeds directly into tai chi depth.',
              },
              {
                href: '/fascia',
                label: 'Fascia',
                desc: 'Silk-reeling and weight-shifting are fascial practices. The myofascial meridians are the modern science of qi pathways.',
              },
              {
                href: '/nervous-system',
                label: 'Nervous System',
                desc: 'HRV elevation, polyvagal activation, and sympathetic downregulation — the core tai chi mechanism explained.',
              },
              {
                href: '/sleep',
                label: 'Sleep',
                desc: 'Evening tai chi reduces inflammatory markers and cortisol, supporting the biological conditions for deep sleep.',
              },
              {
                href: '/meditate',
                label: 'Meditate',
                desc: 'Moving meditation and sitting meditation are two paths to the same neural state. Each deepens the other.',
              },
              {
                href: '/breathe',
                label: 'Breathwork',
                desc: 'Coherence breathing and tai chi share the same baroreflex mechanism. Combine them for maximum HRV impact.',
              },
              {
                href: '/yoga',
                label: 'Yoga',
                desc: 'Both traditions address structural alignment, breath integration, and the nervous system through the body. Different paths, complementary maps.',
              },
              {
                href: '/trauma',
                label: 'Trauma',
                desc: 'Slow embodied movement is bottom-up somatic processing. Tai chi is one of the safest trauma-sensitive movement practices available.',
              },
              {
                href: '/somatics',
                label: 'Somatics',
                desc: 'Somatic awareness and tai chi\'s fractionated relaxation train the same interoceptive and proprioceptive circuits.',
              },
              {
                href: '/nature',
                label: 'Nature',
                desc: 'Traditional tai chi practice is outdoors — morning light, earthing, and natural environment amplify every mechanism.',
              },
              {
                href: '/fasting',
                label: 'Fasting',
                desc: 'Fasted morning tai chi enhances fat oxidation and BDNF while preserving the metabolic clarity that supports intent-based practice.',
              },
              {
                href: '/psychedelics',
                label: 'Psychedelics',
                desc: 'Both cultivate heightened interoceptive awareness. Tai chi practice during integration helps anchor expanded states in the body.',
              },
            ].map(link => (
              <ScrollReveal key={link.href}>
                <Link
                  href={link.href}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      padding: '1.5rem',
                      transition: 'border-color 300ms ease',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: EARTH_DEEP,
                        margin: '0 0 0.5rem',
                      }}
                    >
                      {link.label}
                    </p>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {link.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Closing blockquote */}
          <ScrollReveal>
            <blockquote
              style={{
                borderLeft: `3px solid ${EARTH_MID}`,
                paddingLeft: '1.5rem',
                margin: 0,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-text)',
                  lineHeight: 1.7,
                  margin: '0 0 0.75rem',
                  maxWidth: '48ch',
                }}
              >
                &ldquo;In motion, be like water. At rest, be like a mountain. In yielding, be like a
                willow. In striking, be like thunder.&rdquo;
              </p>
              <cite
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}
              >
                Traditional Tai Chi Principle
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
