'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';
import StatCard from '@/components/StatCard';

// ── Accent tokens (qigong / jade green) ─────────────────────
const JADE_DEEP = '#1D5038';
const JADE_MID  = '#A8D5BA';
const JADE_PALE = '#E6F4EC';

// ── Form Card (qigong forms section) ──────────────────────────
function FormCard({
  name,
  duration,
  evidence,
  description,
  movements,
}: {
  name: string;
  duration: string;
  evidence: 'Strong' | 'Moderate' | 'Low-Moderate' | 'Low';
  description: string;
  movements: string[];
}) {
  const evidenceColor =
    evidence === 'Strong'
      ? { bg: 'rgba(45,107,79,0.10)', text: '#2D6B4F' }
      : evidence === 'Moderate'
      ? { bg: JADE_PALE, text: JADE_DEEP }
      : evidence === 'Low-Moderate'
      ? { bg: 'rgba(228,173,117,0.12)', text: '#8B5E2A' }
      : { bg: 'rgba(139,58,98,0.08)', text: '#8B3A62' };

  return (
    <div
      style={{
        background: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
        borderLeft: `3px solid ${JADE_MID}`,
        borderRadius: '2px',
        padding: '1.75rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: 0,
            fontStyle: 'normal',
          }}
        >
          {name}
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.625rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              background: JADE_PALE,
              color: JADE_DEEP,
              border: `1px solid ${JADE_MID}`,
            }}
          >
            {duration}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.625rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              background: evidenceColor.bg,
              color: evidenceColor.text,
              border: '1px solid var(--color-border)',
            }}
          >
            {evidence} evidence
          </span>
        </div>
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: '0 0 1rem' }}>
        {description}
      </p>
      {movements.length > 0 && (
        <ul
          style={{
            fontSize: '0.8125rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.8,
            paddingLeft: '1.125rem',
            margin: 0,
          }}
        >
          {movements.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Video tab data ─────────────────────────────────────────────
type VideoTab = 'ba-duan-jin' | 'zhan-zhuang' | 'general';

const videoData: Record<VideoTab, Array<{ videoId: string; title: string; description: string }>> = {
  'ba-duan-jin': [
    {
      videoId: '3DkvDrirPpg',
      title: 'Ba Duan Jin — Eight Brocades',
      description: 'The complete Ba Duan Jin sequence, the most widely practiced and clinically researched qigong form. All eight movements from Two Hands Hold Up the Heavens to Bouncing on the Toes. Suitable for all fitness levels with no equipment required.',
    },
  ],
  'zhan-zhuang': [
    {
      videoId: 'iJDqEOmErNA',
      title: 'Zhan Zhuang — Standing Meditation',
      description: 'Zhan Zhuang (Standing Like a Tree) is the foundational still qigong practice. This guided session introduces the wuji posture and tree-holding posture with alignment cues and breath guidance. Begin with 5 minutes and build gradually over weeks.',
    },
  ],
  general: [
    {
      videoId: 'cwlvTcWR3Gs',
      title: 'Morning Qigong Flow',
      description: 'A gentle morning qigong routine combining flowing movement, breath coordination, and intention. Ideal for establishing a daily practice habit. This sequence draws from multiple forms to create a complete, accessible morning session.',
    },
  ],
};

export default function QigongClient() {
  const [activeVideoTab, setActiveVideoTab] = useState<VideoTab>('ba-duan-jin');

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
          background: 'linear-gradient(160deg, oklch(35% 0.10 160), oklch(50% 0.12 145))',
          overflow: 'hidden',
        }}
      >
        {/* Hero image */}
        <Image
          src="/images/hero-qigong.webp"
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
            QIGONG
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
            The Art of Moving Stillness
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
            Qigong is where slow movement, breath, and intention converge &mdash; a 3,000-year-old practice
            that hydrates fascia, activates the vagus nerve, and trains the nervous system through the
            simplest of gestures.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { href: '#history', label: 'History' },
              { href: '#science', label: 'Science' },
              { href: '#forms', label: 'Forms' },
              { href: '#qi', label: 'Qi' },
              { href: '#nervous-system', label: 'Nervous System' },
              { href: '#evidence', label: 'Evidence' },
              { href: '#protocol', label: '90 Days' },
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
                  color: JADE_MID,
                  textDecoration: 'none',
                  borderBottom: `1px solid rgba(168,213,186,0.5)`,
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
          2. WHAT QIGONG IS
      ══════════════════════════════════════════════════════ */}
      <section
        id="history"
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
                3,000 YEARS OF CULTIVATION
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
                What Qigong Is
              </h2>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The earliest illustrated record of qigong-like exercises is the <strong>Mawangdui Daoyin Tu</strong>,
                a silk scroll discovered in a Han dynasty tomb dated 168 BCE. It depicts 44 figures in therapeutic
                movement postures with accompanying text &mdash; making it the oldest illustrated exercise manual
                in human history.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Three distinct streams shaped the tradition. <strong>Daoist yangsheng (nourishing life)</strong>
                &mdash; associated with Wudang mountain practices &mdash; cultivated longevity through wu wei
                and yielding movement. <strong>Buddhist qigong</strong>, most famously the Shaolin Yi Jin Jing
                (Muscle/Tendon Changing Classic), built physical vitality in service of extended sitting
                meditation. <strong>Medical qigong</strong>, rooted in the Huangdi Neijing (Yellow Emperor&rsquo;s
                Classic), mapped practice onto meridian theory and the five-organ system.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The term &ldquo;qigong&rdquo; itself was only coined in the 1950s by Liu Guizhen, who used it to
                systematize traditional practices for a modern health-care context. After severe suppression during
                the Cultural Revolution, qigong saw explosive revival &mdash; the so-called <strong>Qigong Fever</strong>
                of the 1980s attracted an estimated 60&ndash;100 million practitioners. The Chinese Health Qigong
                Association, established in 2000, now standardizes forms practiced in 69+ countries.
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
                The Three Treasures and Three Elements
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Classical qigong theory rests on the <strong>Three Treasures (San Bao)</strong>: jing (essence &mdash;
                the body&rsquo;s physical substrate and reproductive vitality), qi (life force &mdash; the animating
                functional energy), and shen (spirit/consciousness &mdash; the mind and its luminous clarity). Practice
                moves upward through this hierarchy: refining jing into qi, and qi into shen.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Every qigong form, regardless of tradition, combines exactly three elements: <strong>movement</strong>
                (xing), <strong>breath</strong> (xi), and <strong>intention</strong> (yi). The integration of these
                three is what distinguishes qigong from ordinary exercise or mere relaxation.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The modern spectrum ranges from gentle, slow-flowing sequences practiced by elderly populations in
                parks to the powerful, martial-adjacent iron shirt qigong, and to purely still practices like Zhan
                Zhuang where the entire practice is postural. All share the same foundational logic: conscious
                attention directed through the body cultivates and circulates qi.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${JADE_MID}`,
                  padding: '1rem 1.25rem',
                  background: JADE_PALE,
                  borderRadius: '0 2px 2px 0',
                  marginTop: '1rem',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: JADE_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  The three elements &mdash; movement, breath, and intention &mdash; are not metaphor. They map
                  directly onto modern neuroscience: proprioception, respiratory control, and directed attention
                  are three distinct but interdependent nervous system processes.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Stat Cards */}
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
                source="Mawangdui Silk Scroll"
                stat="168 BCE"
                detail="The Mawangdui Daoyin Tu — oldest illustrated exercise manual in existence. Excavated in 1973 from a Han dynasty tomb in Hunan Province, China."
                accentColor={JADE_MID}
                accentTextColor={JADE_DEEP}
              />
              <StatCard
                source="Chinese Health Qigong Association"
                stat="69+"
                detail="Countries practicing standardized health qigong forms developed and disseminated by the CHQA since its establishment in 2000."
                accentColor={JADE_MID}
                accentTextColor={JADE_DEEP}
              />
              <StatCard
                source="Every form"
                stat="3"
                detail="Every qigong form, without exception, combines movement (xing), breath (xi), and intention (yi). The triad is the defining structure of the practice."
                accentColor={JADE_MID}
                accentTextColor={JADE_DEEP}
              />
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          4. THE SCIENCE OF SLOW MOVEMENT
      ══════════════════════════════════════════════════════ */}
      <section
        id="science"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${JADE_PALE})`,
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
              WHY SLOWNESS HEALS
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
              The Science of Slow Movement
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
              Qigong&rsquo;s characteristic slowness is not aesthetic. It targets specific mechanoreceptors,
              optimizes fascial hydration, and stimulates piezoelectric signaling that ordinary exercise
              &mdash; by being too fast &mdash; completely bypasses.
            </p>
          </ScrollReveal>

          {/* Two-column prose */}
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
                Fascia as Thixotropic Gel
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Fascia researcher Robert Schleip&rsquo;s 2012 work established that connective tissue behaves as a
                <strong> thixotropic gel</strong>: it becomes more fluid with slow, sustained compression and less
                viscous with prolonged loading. The &ldquo;sponge squeeze&rdquo; mechanism of qigong &mdash; compression
                through weight shift and gentle twisting &mdash; forces metabolic waste out of fascial tissue and draws
                in fresh interstitial fluid on release.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Fascia contains <strong>piezoelectric</strong> properties, first documented by Fukada and Yasuda in
                1957: mechanical stress on collagen fibers generates electrical signals that stimulate tenocyte and
                fibroblast activity. Slow, sustained loading generates stronger and more sustained piezoelectric
                current than rapid loading &mdash; which is precisely why qigong&rsquo;s pace outperforms conventional
                exercise for fascial remodeling.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Helene Langevin&rsquo;s 2006 research demonstrated a compelling anatomical correspondence between
                traditional meridian pathways and planes of connective tissue. Approximately 80% of acupuncture
                points lie along fascial cleavage planes where mechanoreceptor density is highest. This does not
                &ldquo;prove&rdquo; qi, but it does suggest that meridian-guided movement systematically stimulates
                a real anatomical substrate.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div style={{ margin: '2.5rem 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <img
                  src="/images/illustrations/qigong-meridian-flow.jpg"
                  alt="The flow of qi through meridian lines along the body"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                />
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
                Interoception and the Ruffini Ending
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Schleip&rsquo;s 2003 research on fascial mechanoreceptors identified <strong>Ruffini endings</strong>
                as particularly relevant to qigong. Unlike Golgi tendon organs (which respond to rapid stretch) and
                Pacinian corpuscles (which respond to vibration), Ruffini endings respond specifically to
                slow, sustained, tangential stretch &mdash; and their activation has been shown to directly lower
                sympathetic nervous system activity.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The <strong>interoceptive</strong> dimension of qigong &mdash; the sustained, directed internal
                attention to bodily sensation &mdash; trains the right anterior insula, the primary cortical
                region for interoceptive awareness (Craig 2003, 2009). MRI studies confirm structural thickening
                of the right insula in long-term practitioners, correlating with enhanced vagal tone and emotional
                regulation capacity.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${JADE_MID}`,
                  padding: '1rem 1.25rem',
                  background: JADE_PALE,
                  borderRadius: '0 2px 2px 0',
                  marginTop: '1rem',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: JADE_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  Slow movement + internal attention = Ruffini activation + interoceptive training. This combination
                  uniquely lowers sympathetic tone while building body awareness &mdash; two outcomes that fast
                  exercise cannot simultaneously produce.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Stat Cards */}
          <ScrollReveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '1.5rem',
              }}
            >
              <StatCard
                source="Zou et al., 2018 — 22 RCTs"
                stat="43%"
                detail="Reduction in fall risk in older adults practicing qigong regularly, across a meta-analysis of 22 randomized controlled trials. Balance and proprioception are among the strongest documented effects."
                url="https://pubmed.ncbi.nlm.nih.gov/29330499/"
                accentColor={JADE_MID}
                accentTextColor={JADE_DEEP}
              />
              <StatCard
                source="Wei et al., 2013 — MRI study"
                stat="Thicker cortex"
                detail="Long-term qigong practitioners show thicker right anterior insula and left primary somatosensory cortex — the interoceptive and body-map regions — compared to matched controls."
                accentColor={JADE_MID}
                accentTextColor={JADE_DEEP}
              />
              <StatCard
                source="Schleip, 2012 — Fascia research"
                stat="2&ndash;3&times;"
                detail="Greater fascial hydration and fluid exchange with slow sustained loading versus static stretching. The sponge-squeeze mechanism of qigong movement outperforms passive stretch for connective tissue remodeling."
                accentColor={JADE_MID}
                accentTextColor={JADE_DEEP}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          6. THE FORMS — CENTERPIECE
      ══════════════════════════════════════════════════════ */}
      <section
        id="forms"
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
              YOUR PRACTICE MENU
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
              The Forms
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
              Each major qigong form has a distinct structure, target duration, and evidence base.
              The five forms below represent the most practiced and most researched in both traditional
              and clinical contexts.
            </p>
          </ScrollReveal>

          {/* Form Cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              marginBottom: '3.5rem',
            }}
          >
            <ScrollReveal>
              <FormCard
                name="Ba Duan Jin — Eight Brocades"
                duration="12–15 min"
                evidence="Strong"
                description="The most widely practiced and clinically researched qigong form. Developed during the Song dynasty, Ba Duan Jin has the most robust RCT evidence base of any qigong form, with documented benefits for cancer-related fatigue, lipid profiles, depression, and osteoarthritis. The eight movements systematically open the three burners and stimulate all major meridians."
                movements={[
                  'Two Hands Hold Up the Heavens — triple burner regulation',
                  'Drawing the Bow Left and Right — lung and heart opening',
                  'Separating Heaven and Earth — spleen and stomach',
                  'Wise Owl Gazes Backwards — cervical decompression',
                  'Sway the Head and Shake the Tail — heart fire release',
                  'Two Hands Hold the Feet — kidney and lumbar activation',
                  'Clench the Fists — liver qi and muscular strengthening',
                  'Bouncing on the Toes — triple warmer vibration and integration',
                ]}
              />
            </ScrollReveal>

            <ScrollReveal>
              <div style={{ margin: '2.5rem 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <img
                  src="/images/illustrations/qigong-ba-duan-jin.jpg"
                  alt="Ba Duan Jin Eight Brocades — all eight qigong positions illustrated"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <FormCard
                name="Zhan Zhuang — Standing Like a Tree"
                duration="5–40 min"
                evidence="Moderate"
                description="The foundational still qigong. The practitioner stands in one of several postures — most commonly the wuji (emptiness) posture or the tree-embracing posture &mdash; for extended periods, directing attention inward while the body releases and settles. Research by Lam (2016) found significant HRV improvement with as little as 15 minutes daily practice over 8 weeks. Among the most demanding practices at advanced durations, yet completely accessible for beginners at 5 minutes."
                movements={[]}
              />
            </ScrollReveal>

            <ScrollReveal>
              <FormCard
                name="Wu Qin Xi — Five Animal Frolics"
                duration="20–25 min"
                evidence="Moderate"
                description="Attributed to the physician Hua Tuo (145&ndash;208 CE), Wu Qin Xi imitates the movements of five animals to stimulate five organ systems. Each animal embodies a distinct energetic quality and movement pattern. Wang (2016) documented significant bone density improvements in postmenopausal women practicing Wu Qin Xi over 12 months."
                movements={[
                  'Tiger (Hu) — liver and gallbladder, power and decisiveness',
                  'Deer (Lu) — kidney and bladder, gentleness and longevity',
                  'Bear (Xiong) — spleen and stomach, rooting and digestion',
                  'Monkey (Hou) — heart and small intestine, agility and joy',
                  'Crane (He) — lung and large intestine, lightness and clarity',
                ]}
              />
            </ScrollReveal>

            <ScrollReveal>
              <FormCard
                name="Yi Jin Jing — Muscle/Tendon Changing Classic"
                duration="20–30 min"
                evidence="Low-Moderate"
                description="Traditionally attributed to Bodhidharma at Shaolin, Yi Jin Jing consists of 12 sequential postures emphasizing the tendons, sinews, and deep fascial layers. The movements are more physically demanding than Ba Duan Jin, with held positions that build grip strength and structural integrity. Ye (2014) documented significant grip strength and flexibility gains after 12 weeks."
                movements={[
                  'Wei Tuo Presenting the Pestle (3 variations)',
                  'Stars and Moon Exchange Positions',
                  'Nine Ghosts Drawing Sabers',
                  'Three Plates Falling to the Ground',
                  'Blue Dragon Emerges from the Water',
                  'Crouching Tiger Springs',
                  'Bow to the Earth (all 12 progressive postures)',
                ]}
              />
            </ScrollReveal>

            <ScrollReveal>
              <FormCard
                name="Liu Zi Jue — Six Healing Sounds"
                duration="10–15 min"
                evidence="Low-Moderate"
                description="Six specific vocalizations, each associated with an organ system, are produced on the exhale while making corresponding gentle movements. The sounds activate specific resonance frequencies in the chest and abdominal cavities. The extended exhale pattern in all six sounds directly stimulates the vagus nerve and promotes respiratory sinus arrhythmia, making Liu Zi Jue particularly effective for HRV and parasympathetic tone."
                movements={[
                  'Xu (shhh) — liver and gallbladder, releasing stress and anger',
                  'He (haww) — heart and small intestine, cooling excess heat',
                  'Hu (whooo) — spleen, stomach, and pancreas, centering',
                  'Si (sss) — lung and large intestine, grief release',
                  'Chui (chwee) — kidney and bladder, fear and cold clearing',
                  'Xi (hee) — triple burner, harmonizing all systems',
                ]}
              />
            </ScrollReveal>
          </div>

          {/* Moving vs Still comparison */}
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
              Moving vs Still Qigong
            </h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                label: 'Moving Qigong (Dong Gong)',
                color: JADE_MID,
                textColor: JADE_DEEP,
                desc: 'Continuous flowing sequences that build proprioception, balance, and cardiovascular adaptation. More accessible for beginners and easier to sustain through mental restlessness. Ba Duan Jin, Wu Qin Xi, and Yi Jin Jing are moving forms. Best entry point for most people.',
              },
              {
                label: 'Still Qigong (Jing Gong)',
                color: '#E4AD75',
                textColor: '#8B5E2A',
                desc: 'Held postures or complete stillness that demand significantly more focused attention. Builds concentration, structural integration, and interoceptive sensitivity beyond what moving practice alone develops. Zhan Zhuang is the primary still form. Ideally introduced after a foundation of moving qigong.',
              },
              {
                label: 'Sound Qigong',
                color: '#8B3A62',
                textColor: '#8B3A62',
                desc: 'Uses vocalized sounds as the primary vehicle for qi movement. Liu Zi Jue is the canonical example. The extended exhale resonance directly activates vagal pathways. Can be practiced standing, seated, or even supine, making it highly accessible across ability levels.',
              },
            ].map(card => (
              <ScrollReveal key={card.label}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: `1px solid var(--color-border)`,
                    borderTop: `3px solid ${card.color}`,
                    borderRadius: '2px',
                    padding: '1.5rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: card.textColor,
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {card.label}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {card.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. QI THROUGH A SCIENTIFIC LENS
      ══════════════════════════════════════════════════════ */}
      <section
        id="qi"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${JADE_PALE})`,
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
              THE HONEST QUESTION
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
              Qi Through a Scientific Lens
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
              Qi is the most contested concept in qigong. Here is what the research actually says,
              and where scientific translation is reasonable versus where it is speculative.
            </p>
          </ScrollReveal>

          {/* Two-column */}
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
                Scientific Translations of Qi
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>Metabolic qi (ying qi)</strong>: Nutrient qi flowing through the channels corresponds
                closely to ATP production and cellular metabolism &mdash; the body&rsquo;s actual energy currency.
                The concept of &ldquo;deficient qi&rdquo; in an organ maps plausibly onto reduced oxidative phosphorylation
                or mitochondrial dysfunction.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>Defensive qi (wei qi)</strong>: The protective qi that circulates at the body&rsquo;s surface
                corresponds well to immune surveillance &mdash; the innate immune system&rsquo;s constant patrol of
                tissue boundaries. Qigong&rsquo;s documented effects on NK cell activity and immunoglobulin levels
                suggest this is more than metaphor.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>Organ qi (zang-fu qi)</strong>: The functional activity of each organ system. Heart qi
                maps to cardiac output and autonomic tone. Lung qi maps to respiratory capacity and oxygenation.
                Kidney qi maps to adrenal and reproductive function. These translations are imperfect but coherent.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                <strong>Meridian qi / channel flow</strong>: The least directly translatable concept. The most
                plausible modern parallel is interoceptive signaling &mdash; the brain&rsquo;s moment-to-moment
                mapping of internal body state via vagal afferents and fascial mechanoreceptors (Craig 2003).
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
                Measurements at the Boundary
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Several experimental measurements have been reported from qigong masters emitting &ldquo;external qi.&rdquo;
                Seto et al. (1992) measured infrared radiation from masters&rsquo; hands 1&ndash;4&deg;C above baseline
                during emission states &mdash; within the range of ordinary vasodilation and not requiring exotic
                mechanisms.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Van Wijk et al. (2005) documented elevated biophoton emission from trained practitioners.
                Zimmerman (1990) used a SQUID magnetometer to measure biomagnetic fields of 0.3&ndash;1.0 milligauss
                from healers&rsquo; hands &mdash; orders of magnitude above background, though also within the range
                of ordinary ion channel currents.
              </p>
              <div
                style={{
                  background: 'var(--color-surface-raised)',
                  border: `1px solid ${JADE_MID}`,
                  borderRadius: '2px',
                  padding: '1.25rem',
                  marginTop: '1rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: JADE_DEEP,
                    margin: '0 0 0.5rem',
                  }}
                >
                  The Bottom Line on Measurement
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                  All reported &ldquo;qi measurements&rdquo; are consistent with well-understood biophysical processes.
                  None require novel physics. The more interesting question is not &ldquo;does qi exist?&rdquo; but
                  &ldquo;does directing attention through the body produce measurable physiological effects?&rdquo;
                  The answer to the latter is clearly yes.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Honest callout */}
          <ScrollReveal>
            <div
              style={{
                border: `1px solid #E4AD75`,
                borderLeft: `3px solid #E4AD75`,
                padding: '1.5rem 1.75rem',
                background: 'rgba(228,173,117,0.08)',
                borderRadius: '0 2px 2px 0',
                marginBottom: '3rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#8B5E2A',
                  margin: '0 0 0.75rem',
                }}
              >
                Honest Assessment
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
                Qigong works through well-understood mechanisms: slow movement activates Ruffini mechanoreceptors
                lowering sympathetic tone; resonance-range breathing improves HRV; postural awareness trains
                interoceptive cortex; group practice activates ventral vagal social engagement circuits; and the
                attentional dimension trains focused concentration equally to formal meditation.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0, fontSize: '0.9375rem' }}>
                None of these mechanisms require a concept of qi to be real and effective. At the same time,
                qi as a <em>clinical language</em> &mdash; a way of tracking the functional vitality of organ
                systems &mdash; has proved remarkably productive for 2,000 years. The honest practitioner can
                hold both: using qi as a practical map while remaining agnostic about its ultimate nature.
              </p>
            </div>
          </ScrollReveal>

          {/* Evidence table */}
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
              Evidence Landscape
            </h3>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              {
                status: 'Established',
                color: '#2D6B4F',
                bg: 'rgba(45,107,79,0.08)',
                findings: 'Balance and fall prevention, blood pressure reduction, HRV improvement, quality of life in cancer patients, chronic pain reduction',
              },
              {
                status: 'Strong',
                color: JADE_DEEP,
                bg: JADE_PALE,
                findings: 'Anxiety and depression reduction, lipid profile improvement, immune function (NK cells, IgA), fatigue reduction in chronic disease',
              },
              {
                status: 'Moderate',
                color: '#8B5E2A',
                bg: 'rgba(228,173,117,0.10)',
                findings: 'Bone density, grip strength, cognitive function in older adults, COPD exercise tolerance, fibromyalgia symptom reduction',
              },
              {
                status: 'Preliminary',
                color: '#8B3A62',
                bg: 'rgba(139,58,98,0.06)',
                findings: 'Type 2 diabetes glycemic control, PTSD symptom improvement, inflammatory markers (CRP, IL-6), sleep quality',
              },
              {
                status: 'No Evidence',
                color: 'var(--color-text-muted)',
                bg: 'var(--color-surface-raised)',
                findings: 'External qi transmission to non-consenting subjects, detection of meridian channels via physical measurement, replication of extreme Zhan Zhuang claims (e.g., burning paper at distance)',
              },
            ].map(row => (
              <ScrollReveal key={row.status}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 120px) minmax(0, 1fr)',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    background: row.bg,
                    borderRadius: '2px',
                    alignItems: 'start',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: row.color,
                      margin: 0,
                      paddingTop: '0.125rem',
                    }}
                  >
                    {row.status}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                    {row.findings}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. SECTION DIVIDER (unconditional)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          9. QIGONG & YOUR NERVOUS SYSTEM
      ══════════════════════════════════════════════════════ */}
      <section
        id="nervous-system"
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
              YOUR MOVING MEDITATION
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
              Qigong &amp; Your Nervous System
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
              Qigong is one of the most thoroughly studied mind-body practices for autonomic regulation.
              Its effects on HRV, cortisol, and blood pressure are among the best-replicated findings
              in the mind-body medicine literature.
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
                HRV: The Autonomic Window
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                Chang et al. (2020) meta-analysis of HRV outcomes across qigong and tai chi trials found a
                significant effect on high-frequency HRV (HF-HRV, a direct index of vagal tone) with a
                moderate effect size of <strong>d = 0.45</strong>, and a significant reduction in the LF/HF ratio
                (sympathovagal balance index) with <strong>d = 0.38</strong>. These are clinically meaningful
                improvements, comparable to coherence breathing protocols.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                The breathing component is central to this effect. Qigong&rsquo;s characteristic breathing rate of
                4&ndash;8 breaths per minute falls directly within the <strong>resonance frequency range</strong>
                that maximizes baroreflex gain and HRV amplitude. This is not traditional knowledge coincidentally
                aligned with physiology &mdash; slow abdominal breathing was deliberately cultivated for the
                autonomic effects it produces.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Park et al. (2017) demonstrated that HRV improvements from qigong practice carry over into
                overnight resting HRV &mdash; confirming that the practice resets the autonomic set-point rather
                than producing only transient session-level changes.
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
                Polyvagal Mapping of Qigong
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                Stephen Porges&rsquo; polyvagal framework maps qigong practice onto all three autonomic states.
                <strong> Ventral vagal activation</strong> is supported by group practice contexts: the social
                engagement system is activated by co-regulation, eye contact, prosodic instructor voice, and
                the facial movement involved in Liu Zi Jue vocalizations.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>Sympathetic down-regulation</strong> is the most documented outcome: cortisol reduction,
                HRV improvement, and blood pressure normalization all reflect withdrawal of sympathetic tone.
                The slow, unpredictable weight shifts of Ba Duan Jin and Wu Qin Xi require sufficient
                sympathetic engagement to maintain balance while preventing over-activation.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                <strong>Dorsal vagal access</strong> is the distinctive feature of Zhan Zhuang: the extended
                immobility and internal stillness share characteristics with the physiological state of
                freeze, but practiced voluntarily within safety &mdash; which theoretically allows the
                nervous system to metabolize and re-contextualize dorsal vagal states rather than being
                trapped in them.
              </p>
            </ScrollReveal>
          </div>

          {/* Stat Cards */}
          <ScrollReveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '1.5rem',
              }}
            >
              <StatCard
                source="Chang et al., 2020 meta-analysis"
                stat="d = 0.45"
                detail="Effect size for HF-HRV improvement across qigong and tai chi RCTs — a moderate, clinically significant increase in vagal tone. Among the most robust autonomic effects of any mind-body practice."
                url="https://pubmed.ncbi.nlm.nih.gov/32354619/"
                accentColor={JADE_MID}
                accentTextColor={JADE_DEEP}
              />
              <StatCard
                source="Wang et al., 2014 — RCT"
                stat="-23%"
                detail="Reduction in salivary cortisol after 8 weeks of regular qigong practice (3 sessions/week, 60 min). Cortisol normalization was sustained at 12-week follow-up."
                accentColor={JADE_MID}
                accentTextColor={JADE_DEEP}
              />
              <StatCard
                source="Lee et al., 2007 — meta-analysis"
                stat="-12.1/-8.5"
                detail="Average reduction in systolic/diastolic blood pressure (mmHg) across qigong hypertension trials. Effect is comparable to first-line antihypertensive medications for mild-moderate hypertension."
                accentColor={JADE_MID}
                accentTextColor={JADE_DEEP}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. CLINICAL EVIDENCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="evidence"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${JADE_PALE})`,
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
              WHAT THE RESEARCH SHOWS
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
              Clinical Evidence by Condition
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2rem',
                maxWidth: '56ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Qigong has been studied across a wide range of clinical populations. The evidence varies
              significantly by condition, form, duration, and trial quality. What follows are the most
              replicated findings.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            {[
              {
                condition: 'Chronic Pain',
                effect: 'd = 0.43',
                detail: 'Meta-analysis of 13 RCTs (Lee et al., 2015). Significant reduction in pain intensity and disability across musculoskeletal, fibromyalgia, and neck pain populations. Effect persists at 3-month follow-up.',
                color: JADE_MID,
                textColor: JADE_DEEP,
              },
              {
                condition: 'Anxiety & Depression',
                effect: 'd = 0.52 / d = 0.42',
                detail: 'Wang et al. (2014) systematic review. Anxiety effect (d=0.52) outperforms depression effect (d=0.42) but both are clinically meaningful. Particularly strong in cancer patients and older adults.',
                color: JADE_MID,
                textColor: JADE_DEEP,
              },
              {
                condition: 'Hypertension',
                effect: '-12.1 / -8.5 mmHg',
                detail: 'Lee et al. (2007) meta-analysis of hypertension trials. Systolic and diastolic reductions comparable to pharmacological first-line treatment in mild-moderate hypertension. Effect dependent on regular practice (3+x/week).',
                color: '#E4AD75',
                textColor: '#8B5E2A',
              },
              {
                condition: 'Cancer-Related Fatigue',
                effect: 'd = 0.53',
                detail: 'Chen et al. (2016) systematic review of 13 RCTs. Ba Duan Jin specifically shows the strongest evidence in this population. Fatigue, quality of life, and depression all improved. Mechanism includes cortisol normalization and IL-6 reduction.',
                color: '#E4AD75',
                textColor: '#8B5E2A',
              },
              {
                condition: 'COPD',
                effect: '+35m 6MWD',
                detail: '6-minute walk distance improvement in COPD patients after 12 weeks of qigong (Liu et al., 2018). Secondary outcomes: improved FEV1, reduced dyspnea, and better quality of life scores. Low risk for this population.',
                color: '#8B3A62',
                textColor: '#8B3A62',
              },
              {
                condition: 'Cognitive Function',
                effect: 'Multiple domains',
                detail: 'Wayne et al. (2021) review: improvements in attention, memory, executive function, and processing speed in older adults. The multi-domain demand of qigong (motor + breath + attention) may uniquely stimulate cognitive reserve.',
                color: '#8B3A62',
                textColor: '#8B3A62',
              },
            ].map(item => (
              <ScrollReveal key={item.condition}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    padding: '1.5rem',
                    borderTop: `3px solid ${item.color}`,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.25rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {item.condition}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      color: item.textColor,
                      fontWeight: 600,
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {item.effect}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {item.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Dose callout */}
          <ScrollReveal>
            <div
              style={{
                border: `1px solid #E4AD75`,
                borderLeft: `3px solid #E4AD75`,
                padding: '1.5rem 1.75rem',
                background: 'rgba(228,173,117,0.08)',
                borderRadius: '0 2px 2px 0',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#8B5E2A',
                  margin: '0 0 0.75rem',
                }}
              >
                Minimum Effective Dose
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
                Across the clinical evidence base, the most consistent finding is that meaningful outcomes
                require: <strong>at minimum 2&ndash;3 sessions per week, 30 minutes per session, sustained
                for 8 or more weeks</strong>. Studies using shorter durations or lower frequencies consistently
                show weaker effects.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0, fontSize: '0.9375rem' }}>
                Daily practice of even 10&ndash;15 minutes appears to outperform twice-weekly 30-minute sessions
                for HRV and anxiety outcomes &mdash; suggesting that consistency of the nervous system signal
                matters more than session length. The eight-week mark is when most measured biomarkers
                (HRV, cortisol, blood pressure) show statistically significant change.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          12. YOUR FIRST 90 DAYS
      ══════════════════════════════════════════════════════ */}
      <section
        id="protocol"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: 'var(--color-cream)',
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
              YOUR PATH INTO PRACTICE
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
              Your First 90 Days
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
              Qigong is a skill that reveals itself slowly. The first 90 days are about establishing
              the habit, learning the form, and beginning to feel the subtle effects that become obvious
              only after consistent practice.
            </p>
          </ScrollReveal>

          <div className="timeline" style={{ paddingLeft: '2.5rem' }}>
            {[
              {
                step: '1',
                title: 'Weeks 1–4: Foundation',
                desc: 'Learn Ba Duan Jin from a guided video (see Practice section below). Practice all 8 movements daily for 12&ndash;15 minutes, prioritizing consistency over perfection. Do not worry about breath coordination in the first two weeks &mdash; let the movement patterns settle first. Add 5 minutes of Zhan Zhuang (wuji posture) at the end of each session by week 3.',
              },
              {
                step: '2',
                title: 'Weeks 5–8: Expansion',
                desc: 'Begin coordinating breath with movement: inhale on opening/rising movements, exhale on closing/descending movements. Add Liu Zi Jue on 2&ndash;3 sessions per week as a 10-minute addition. Extend Zhan Zhuang to 10 minutes. By week 8 your baseline HRV and morning resting heart rate should show measurable change if you have been consistent.',
              },
              {
                step: '3',
                title: 'Weeks 9+: Deepening',
                desc: 'Introduce a second form: Wu Qin Xi or Yi Jin Jing depending on your interest. Alternate forms across the week rather than always doing the same sequence. Explore practicing outdoors when possible &mdash; natural environments amplify the grounding quality of qigong. Begin exploring the literature to understand what you are feeling in the body during practice.',
              },
            ].map(item => (
              <div key={item.step} style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <div
                  className="timeline-node"
                  style={{ background: JADE_DEEP }}
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

          {/* Contraindications callout */}
          <ScrollReveal>
            <div
              style={{
                border: `1px solid #8B3A62`,
                borderLeft: `3px solid #8B3A62`,
                padding: '1.5rem 1.75rem',
                background: 'rgba(139,58,98,0.06)',
                borderRadius: '0 2px 2px 0',
                marginTop: '2.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#8B3A62',
                  margin: '0 0 0.75rem',
                }}
              >
                Contraindications &amp; Precautions
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.75,
                  margin: '0 0 0.75rem',
                }}
              >
                Qigong is among the safest movement practices available, but some precautions apply:
              </p>
              <ul
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.9,
                  paddingLeft: '1.25rem',
                  margin: 0,
                }}
              >
                <li><strong>Acute psychosis or unstable psychiatric conditions</strong> &mdash; intensive Zhan Zhuang can be destabilizing; begin only with moving forms and a qualified instructor</li>
                <li><strong>Severe osteoporosis</strong> &mdash; avoid deep forward bends and spinal rotation in Yi Jin Jing; Ba Duan Jin is generally safe</li>
                <li><strong>Recent surgery or acute injury</strong> &mdash; rest the affected area; modify or skip movements that load the injured tissue</li>
                <li><strong>Vertigo or vestibular conditions</strong> &mdash; seated qigong is available for all major forms; do not practice standing balance sequences during acute episodes</li>
                <li><strong>&ldquo;Qigong deviation&rdquo; (zou huo ru mo)</strong> &mdash; rare dissociative or hypomanic states reported in intensive long-form practice; stop if you experience unusual emotional volatility, paranoia, or altered perception</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          13. "Now, practice." SEPARATOR + VIDEOS
      ══════════════════════════════════════════════════════ */}
      {/* Section break — jade */}
      <div
        id="practice"
        style={{
          padding: '2.5rem max(1.5rem, 8vw)',
          background: JADE_DEEP,
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'rgba(168,213,186,0.3)' }} />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: JADE_MID,
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Now, practice.
        </p>
        <div style={{ flex: 1, height: '1px', background: 'rgba(168,213,186,0.3)' }} />
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
              Begin with Ba Duan Jin if you are new to qigong &mdash; it is the most accessible form with
              the strongest evidence base. Zhan Zhuang can be added as a short daily still practice once
              the moving forms feel natural.
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
              { key: 'ba-duan-jin' as VideoTab, label: 'Ba Duan Jin' },
              { key: 'zhan-zhuang' as VideoTab, label: 'Zhan Zhuang' },
              { key: 'general' as VideoTab, label: 'General Qigong' },
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
                  border: `1px solid ${activeVideoTab === tab.key ? JADE_DEEP : 'var(--color-border)'}`,
                  background:
                    activeVideoTab === tab.key ? JADE_DEEP : 'var(--color-surface-raised)',
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
          background: `linear-gradient(160deg, oklch(35% 0.10 160 / 0.18), var(--color-cream))`,
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
              Qigong Connects to Everything
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              Qigong&rsquo;s three elements &mdash; movement, breath, and intention &mdash; each have their own
              deep practice traditions on this site. Here is where to go next.
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
                href: '/fascia',
                label: 'Fascia',
                desc: 'The thixotropic gel beneath every qigong movement &mdash; hydration, piezoelectricity, and the connective tissue web.',
              },
              {
                href: '/breathe',
                label: 'Breathwork',
                desc: 'The complete breath technique library, including resonance frequency breathing and the science of slow exhalation.',
              },
              {
                href: '/nervous-system',
                label: 'Nervous System',
                desc: 'Polyvagal theory, HRV in depth, vagal tone training, and the neuroscience of safety and regulation.',
              },
              {
                href: '/meditate',
                label: 'Meditate',
                desc: 'Focused attention, open monitoring, and interoceptive meditation &mdash; the &ldquo;intention&rdquo; element of qigong deepened.',
              },
              {
                href: '/somatics',
                label: 'Somatics',
                desc: 'Body-based trauma processing, Feldenkrais, and somatic experiencing &mdash; the embodiment continuum.',
              },
              {
                href: '/sleep',
                label: 'Sleep',
                desc: 'How qigong&rsquo;s HRV and cortisol effects translate into deeper sleep and stronger overnight autonomic recovery.',
              },
              {
                href: '/chakras',
                label: 'Chakras',
                desc: 'The subtle energy centers of yogic anatomy &mdash; the energetic map that qigong&rsquo;s meridian system parallels and intersects.',
              },
              {
                href: '/trauma',
                label: 'Trauma',
                desc: 'How qigong&rsquo;s slow, rhythmic movement discharges stored survival responses and supports intergenerational healing through the nervous system.',
              },
              {
                href: '/nutrition',
                label: 'Nutrition',
                desc: 'Traditional Chinese Medicine and qigong both center on Jing — the foundational essence that nutrition either replenishes or depletes.',
              },
              {
                href: '/temperature',
                label: 'Temperature',
                desc: 'Qigong cultivates internal heat (nei gong) through breath and movement — a complementary approach to cold and heat exposure protocols.',
              },
              {
                href: '/nature',
                label: 'Nature',
                desc: 'Classical qigong is practiced outdoors to absorb Qi from the natural environment — trees, earth, sky, and seasonal rhythms.',
              },
              {
                href: '/taichi',
                label: 'Tai Chi',
                desc: 'The martial expression of qigong — silk-reeling, rooting, and yielding as a complete moving meditation practice.',
              },
              {
                href: '/fasting',
                label: 'Fasting',
                desc: 'Traditional Chinese Medicine and qigong both emphasize cultivating Jing — fasting conserves and clarifies the foundational essence.',
              },
              {
                href: '/psychedelics',
                label: 'Psychedelics',
                desc: 'Both open the same interoceptive channels — qi sensitivity and expanded body awareness share neurological underpinnings.',
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
                        color: JADE_DEEP,
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
                borderLeft: `3px solid ${JADE_MID}`,
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
                &ldquo;To the mind that is still, the whole universe surrenders.&rdquo;
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
                Lao Tzu &mdash; Tao Te Ching
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
