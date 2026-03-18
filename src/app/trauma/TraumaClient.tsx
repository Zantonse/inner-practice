'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';

// ── Accent tokens (trauma / deep amber) ─────────────────────
const AMBER_DEEP = '#8B5E3C';
const AMBER_MID  = '#C4956A';
const AMBER_PALE = '#F5E6D8';

// ── Stat Card ──────────────────────────────────────────────────
function StatCard({
  source,
  stat,
  detail,
  url,
}: {
  source: string;
  stat: string;
  detail: string;
  url?: string;
}) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${AMBER_MID}`,
        padding: '1.5rem 1.75rem',
        background: 'var(--color-surface-raised)',
        borderRadius: '2px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: AMBER_DEEP,
          margin: '0 0 0.75rem',
        }}
      >
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            {source}
          </a>
        ) : (
          source
        )}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: '0 0 0.5rem',
          lineHeight: 1.3,
        }}
      >
        {stat}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {detail}
      </p>
    </div>
  );
}

// ── Video tab data ─────────────────────────────────────────────
type VideoTab = 'trauma-yoga' | 'somatic' | 'grounding';

const videoData: Record<VideoTab, Array<{ videoId: string; title: string; description: string }>> = {
  'trauma-yoga': [
    {
      videoId: '53RX2ESUqpE',
      title: 'Bessel van der Kolk — The Body Keeps the Score',
      description: 'A trauma-informed yoga session drawing on the Trauma Center Trauma Sensitive Yoga (TCTSY) framework. All choices are offered — not directed — allowing the body to reclaim agency that trauma interrupted.',
    },
  ],
  somatic: [
    {
      videoId: 'nmJDkzDMllc',
      title: 'Peter Levine — Somatic Experiencing',
      description: 'David Berceli\'s TRE protocol activates the body\'s natural trembling mechanism to discharge frozen survival energy stored in the psoas and deep hip flexors. The shaking completes the incomplete defensive response.',
    },
  ],
  grounding: [
    {
      videoId: 'ByefRCzza3I',
      title: 'Gabor Maté — Trauma and Healing',
      description: 'Somatic grounding anchors awareness in the present body when trauma pulls consciousness into past threat states. This practice teaches the nervous system that the present moment is safe.',
    },
  ],
};

export default function TraumaClient() {
  const [activeVideoTab, setActiveVideoTab] = useState<VideoTab>('trauma-yoga');

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
          background: 'linear-gradient(160deg, oklch(35% 0.08 55), oklch(50% 0.10 40))',
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
            background: `radial-gradient(circle, ${AMBER_PALE}30 0%, transparent 70%)`,
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
              color: AMBER_DEEP,
              margin: '0 0 1.25rem',
            }}
          >
            THE INHERITED NERVOUS SYSTEM
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              color: 'var(--color-text)',
              lineHeight: 1.05,
              margin: '0 0 1.5rem',
              maxWidth: '18ch',
            }}
          >
            Generational Trauma
          </h1>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'var(--color-text-muted)',
              margin: '0 0 2.5rem',
              maxWidth: '52ch',
              lineHeight: 1.75,
            }}
          >
            Your grandmother&rsquo;s stress can alter how your genes express today. Generational trauma
            is the inherited pattern operating across your epigenetics, autonomic nervous system,
            fascia, and psyche &mdash; and every practice on this site addresses a different layer
            of this inheritance.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { href: '#science', label: 'Science' },
              { href: '#autonomic', label: 'Autonomic' },
              { href: '#body-map', label: 'Body Map' },
              { href: '#practice-map', label: 'Practice Map' },
              { href: '#healing', label: 'Healing' },
              { href: '#safety', label: 'Safety' },
              { href: '#protocol', label: 'Protocol' },
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
                  color: AMBER_DEEP,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${AMBER_MID}`,
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
          2. THE SCIENCE OF INHERITANCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="science"
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
                THE MOLECULAR EVIDENCE
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
                The Science of Inheritance
              </h2>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Epigenetics is the study of heritable changes in gene expression that do not involve
                changes to the underlying DNA sequence. Two primary mechanisms drive these changes:
                {' '}<strong>DNA methylation</strong> (chemical tags added to cytosine bases that typically
                silence genes) and <strong>histone modification</strong> (chemical changes to the
                protein scaffolding around which DNA coils, altering how tightly or loosely genes
                are packaged and therefore accessible for transcription).
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Trauma alters gene expression without changing the genetic code itself. A person who
                experiences chronic stress does not develop a different genome &mdash; but they may
                develop a profoundly different epigenome, switching certain genes on or off in ways
                that affect stress reactivity, immune function, and neurotransmitter sensitivity.
                These marks can be passed to the next generation through the germline.
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
                The HPA Axis Recalibration
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The hypothalamic-pituitary-adrenal (HPA) axis is the body&rsquo;s primary stress
                response system. Trauma methylates cortisol receptor genes &mdash; most significantly
                {' '}<strong>NR3C1</strong> (glucocorticoid receptor) and <strong>FKBP5</strong> (a
                regulator of cortisol binding). When these genes are methylated, receptor sensitivity
                drops, and the feedback loop that should terminate the stress response becomes impaired.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The stress response baseline effectively gets &ldquo;set&rdquo; in early life based on the
                environment the developing nervous system perceives. A high-threat early environment
                programs a hair-trigger HPA axis &mdash; adaptive in danger, dysregulating in safety.
                Critically, maternal cortisol crosses the placenta, meaning stress calibration can
                begin in utero before the infant has experienced the world at all.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${AMBER_MID}`,
                  padding: '1rem 1.25rem',
                  background: AMBER_PALE,
                  borderRadius: '0 2px 2px 0',
                  marginTop: '1rem',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: AMBER_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  Epigenetic marks are not permanent sentences. Meaney&rsquo;s cross-fostering
                  experiments showed that nurturing environments can normalize methylation patterns
                  set by early adversity &mdash; trauma is not destiny.
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
                source="Yehuda et al., 2015"
                stat="FKBP5"
                detail="Holocaust survivor offspring showed altered methylation at this cortisol-regulating gene — a molecular signature of inherited stress response dysregulation without direct trauma exposure."
                url="https://pubmed.ncbi.nlm.nih.gov/26442889/"
              />
              <StatCard
                source="Heijmans et al., 2008"
                stat="60 years"
                detail="Dutch Hunger Winter study: famine-exposed individuals showed altered IGF2 methylation six decades later, demonstrating the extraordinary persistence of epigenetic marks set by early adversity."
                url="https://pubmed.ncbi.nlm.nih.gov/18971336/"
              />
              <StatCard
                source="Meaney cross-fostering"
                stat="Reversible"
                detail="Epigenetic marks normalized when nurturing environment changed. High-licking rat mothers produced pups with lower stress reactivity regardless of genetic origin — trauma is not destiny."
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
          4. THE AUTONOMIC INHERITANCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="autonomic"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${AMBER_PALE})`,
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
              THE NERVOUS SYSTEM REMEMBERS
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
              The Autonomic Inheritance
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
              Generational trauma is not only molecular. It transmits through the nervous system
              itself &mdash; through co-regulation, attachment, and the polyvagal cascade that shapes
              how a child learns to perceive safety and threat before language exists.
            </p>
          </ScrollReveal>

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
                Polyvagal Transmission
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Neuroception &mdash; Stephen Porges&rsquo; term for the nervous system&rsquo;s
                unconscious scanning for safety and danger &mdash; is calibrated in part before birth.
                Maternal cortisol crosses the placenta, exposing the developing fetus to the mother&rsquo;s
                stress chemistry. The fetal HPA axis begins learning the &ldquo;threat level&rdquo; of the
                environment from the womb onward.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                After birth, <strong>co-regulation</strong> is the primary mechanism of transmission.
                The infant&rsquo;s nervous system does not self-regulate &mdash; it borrows the caregiver&rsquo;s
                regulated nervous system as a scaffold. A dysregulated caregiver with unresolved trauma
                cannot reliably provide this scaffold. The child&rsquo;s baseline nervous system state is
                therefore shaped by the caregiver&rsquo;s unresolved inheritance.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The polyvagal cascade across generations: grandparent trauma &rarr; dysregulated
                autonomic baseline &rarr; impaired co-regulation capacity &rarr; child learns
                threat-biased neuroception &rarr; reduced vagal tone &rarr; hypervigilant adult
                whose nervous system is perpetually running an old survival program.
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
                Attachment Theory Integration
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Bowlby&rsquo;s attachment theory and Porges&rsquo; polyvagal theory converge: each
                attachment style maps directly onto a polyvagal state.
              </p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  marginBottom: '1.25rem',
                }}
              >
                {[
                  { style: 'Secure', vagal: 'Ventral vagal', desc: 'Safe, connected, flexible' },
                  { style: 'Anxious', vagal: 'Sympathetic', desc: 'Hyperactivated, hypervigilant' },
                  { style: 'Avoidant', vagal: 'Dorsal vagal', desc: 'Shutdown, numbed, dissociated' },
                  { style: 'Disorganized', vagal: 'Oscillation', desc: 'No coherent strategy; chaotic' },
                ].map(item => (
                  <div
                    key={item.style}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                    }}
                  >
                    <div>
                      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: AMBER_DEEP, margin: '0 0 0.25rem' }}>
                        {item.style}
                      </p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text)', margin: 0, fontWeight: 500 }}>
                        {item.vagal}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5, paddingTop: '1.1rem' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  borderLeft: `3px solid ${AMBER_MID}`,
                  padding: '1rem 1.25rem',
                  background: AMBER_PALE,
                  borderRadius: '0 2px 2px 0',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: AMBER_DEEP,
                    margin: '0 0 0.375rem',
                  }}
                >
                  Key Research
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.7, margin: 0 }}>
                  Beauchaine (2001) documented vagal tone as a generational marker.
                  Van IJzendoorn (1995) found the Adult Attachment Interview predicts
                  the child&rsquo;s attachment style with 70&ndash;80% accuracy &mdash; a finding
                  that demonstrates how reliably unresolved parental attachment transmits.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          6. WHERE TRAUMA LIVES IN THE BODY
      ══════════════════════════════════════════════════════ */}
      <section
        id="body-map"
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
              THE BODY KEEPS THE SCORE
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
              Where Trauma Lives
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
              Bessel van der Kolk&rsquo;s landmark research established that trauma is not simply a
              psychological event &mdash; it is a somatic reality. The body encodes survival experiences
              as physical patterns that persist long after the threat has passed.
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
                Neuroscience of Traumatic Encoding
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Van der Kolk&rsquo;s neuroimaging research found three consistent findings in traumatized
                brains: an <strong>overactive amygdala</strong> (threat detection operating at perpetual
                high sensitivity), an <strong>underactive prefrontal cortex</strong> (the &ldquo;thinking brain&rdquo;
                goes offline during activation), and a <strong>dysregulated insula</strong> (impaired
                ability to accurately read internal body states).
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The insula finding is particularly important for somatic healing: trauma survivors
                often develop alexithymia &mdash; difficulty identifying and describing their own
                feelings &mdash; because the system that reads the body has been disrupted. This is
                why &ldquo;just talking about it&rdquo; often fails and body-based approaches are essential.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Wilhelm Reich&rsquo;s concept of <strong>muscular armor</strong> describes how emotional
                experience is held as chronic muscle tension organized in 7 body segments (from crown
                to pelvis) that map with striking correspondence to the yogic chakra system. Each segment
                holds a layer of unexpressed emotional charge.
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
                Fascia &amp; The Psoas
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Robert Schleip&rsquo;s research on fascial myofibroblasts revealed that fascia is not
                passive connective tissue but a living, contractile system containing smooth muscle
                cells. Under sustained stress, myofibroblasts can create chronic fascial tension
                independent of the muscular system &mdash; the body&rsquo;s connective tissue
                literally thickens and hardens around held emotional states.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The <strong>psoas muscle</strong> holds a unique position in trauma physiology. As
                the primary muscle that draws the torso toward the legs in the fetal position, it is
                the body&rsquo;s primary fear response muscle. It connects the lumbar spine to the
                femur, passes through the hip joint, and is directly innervated by the same nerve
                roots that activate the &ldquo;freeze&rdquo; response.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The hip-emotion connection is recognized across traditions: yogic hip openers
                are described as unlocking grief and fear, TRE targets the psoas directly, and
                multiple somatic therapy frameworks converge on the pelvis and hips as the primary
                trauma storage site. The convergence of biomechanical, neurological, and traditional
                frameworks here is significant.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          8. PRACTICE CROSS-REFERENCE MAP — CENTERPIECE
      ══════════════════════════════════════════════════════ */}
      <section
        id="practice-map"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${AMBER_PALE})`,
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
              EVERY PRACTICE ADDRESSES A LAYER
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
              The Practice Map
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
              Generational trauma operates on multiple layers simultaneously &mdash; epigenetic,
              neurological, fascial, psychological, relational. Each practice on this site addresses
              a specific layer. No single modality heals the whole pattern; the full map does.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                href: '/breathe',
                modality: 'Breathwork',
                mechanism: 'Vagal Reset',
                desc: 'Extended exhale exercises the weakened vagal brake. Each long exhale is a rep for the underactivated parasympathetic system.',
                color: '#6B8F71',
              },
              {
                href: '/yoga',
                modality: 'Yoga',
                mechanism: 'Somatic Release',
                desc: 'Hip openers release the psoas and its stored fear response. Backbends open the thoracic cage where grief and sadness compress.',
                color: '#8B7355',
              },
              {
                href: '/meditate',
                modality: 'Meditation',
                mechanism: 'Witnessing the Pattern',
                desc: 'Builds the prefrontal observer that trauma deactivated. Creates the gap between stimulus and response that was collapsed.',
                color: '#5B7FA6',
              },
              {
                href: '/fascia',
                modality: 'Fascia',
                mechanism: 'Releasing the Physical Record',
                desc: 'Myofascial release breaks up the body armor — the chronic holding patterns where emotional charge has solidified into tissue.',
                color: AMBER_DEEP,
              },
              {
                href: '/somatics',
                modality: 'Somatics',
                mechanism: 'Completing the Survival Cycle',
                desc: 'TRE and somatic experiencing allow the body to complete the defensive response that was frozen mid-activation.',
                color: '#7B6B8A',
              },
              {
                href: '/nervous-system',
                modality: 'Nervous System',
                mechanism: 'Rewiring the Baseline',
                desc: 'HRV training and polyvagal exercises gradually shift the set point from sympathetic hypervigilance toward ventral vagal.',
                color: '#4A7C6F',
              },
              {
                href: '/qigong',
                modality: 'Qigong',
                mechanism: 'Safe Slow Movement',
                desc: 'Teaches the nervous system: I can move slowly because I am safe. Slow deliberate movement is itself a polyvagal signal.',
                color: '#8B7355',
              },
              {
                href: '/reiki',
                modality: 'Reiki',
                mechanism: 'Co-Regulation',
                desc: 'Provides the safe, attuned, non-demanding presence that was missing in the original wounding. Replaces absent co-regulation.',
                color: '#9B6B8A',
              },
              {
                href: '/sound',
                modality: 'Sound',
                mechanism: 'Pattern Interrupt',
                desc: 'Frequency shifts brainwave states. Low-frequency resonance (drum, bass, crystal bowls) bypasses cognitive defenses.',
                color: '#5B7FA6',
              },
              {
                href: '/sleep',
                modality: 'Sleep',
                mechanism: 'Overnight Processing',
                desc: 'REM sleep processes emotional memories, recalibrating threat response. Trauma disrupts REM; restoring sleep restores processing.',
                color: '#1B4D5C',
              },
              {
                href: '/chakras',
                modality: 'Chakras',
                mechanism: 'Diagnostic Map',
                desc: 'Shows WHERE the inherited pattern is expressed in the body. Each chakra corresponds to a developmental stage and body region.',
                color: '#7B4F7A',
              },
              {
                href: '/manifestation',
                modality: 'Manifestation',
                mechanism: 'Rewriting the Narrative',
                desc: 'Addresses the inherited limiting beliefs and identity patterns installed by survival-mode caregivers. Rewrites the story.',
                color: '#6B7A8D',
              },
            ].map(card => (
              <ScrollReveal key={card.href}>
                <Link href={card.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                  <div
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      borderTop: `3px solid ${card.color}`,
                      borderRadius: '2px',
                      padding: '1.5rem',
                      height: '100%',
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
                        color: card.color,
                        margin: '0 0 0.25rem',
                      }}
                    >
                      {card.modality}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        margin: '0 0 0.75rem',
                      }}
                    >
                      {card.mechanism}
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                      {card.desc}
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
          10. HEALING PROTOCOLS
      ══════════════════════════════════════════════════════ */}
      <section
        id="healing"
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
              PROFESSIONAL PATHWAYS
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
              Healing Protocols
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
              Self-practice addresses surface layers and builds capacity. Deeper generational
              healing often requires professional support. These are the evidence-based and
              culturally grounded modalities with the strongest track records.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
              marginBottom: '3.5rem',
            }}
          >
            {[
              {
                name: 'Somatic Experiencing',
                founder: 'Peter Levine',
                approach: 'Body-based trauma resolution focused on completing incomplete defensive responses. Works with the felt sense — body sensation — to discharge frozen survival energy without requiring narrative.',
                evidence: 'RCTs show significant PTSD symptom reduction (Brom et al., 2017). Particularly effective for developmental and pre-verbal trauma where talk therapy has limited access.',
              },
              {
                name: 'EMDR',
                founder: 'Francine Shapiro',
                approach: 'Eye Movement Desensitization and Reprocessing uses bilateral stimulation (eye movements, taps, tones) during trauma memory recall to facilitate adaptive information processing.',
                evidence: 'WHO-recommended, VA-endorsed. Meta-analyses show large effect sizes for PTSD. Effective for single-incident and complex/developmental trauma.',
              },
              {
                name: 'Internal Family Systems',
                founder: 'Richard Schwartz',
                approach: 'Maps the psyche as a system of parts — protective managers, firefighters, and exiles carrying trauma. Works to unburden exiles without forcing integration, accessing the innate Self that can witness and heal.',
                evidence: 'Growing evidence base. Particularly suited to generational trauma where multiple legacy burdens are passed through family systems.',
              },
              {
                name: 'Psychedelic-Assisted Therapy',
                founder: 'MAPS trials',
                approach: 'MDMA-assisted therapy for PTSD (Phase 3 trials) and psilocybin-assisted therapy for treatment-resistant conditions. Psychedelics temporarily suppress the default mode network and the habitual threat-scanning that maintains trauma patterns.',
                evidence: 'MDMA-AT showed 67% no longer meeting PTSD criteria vs 32% placebo (Mitchell et al., 2021). Regulatory approval pending in multiple jurisdictions.',
              },
              {
                name: 'Indigenous Frameworks',
                founder: 'Brave Heart, DeGruy, Menakem',
                approach: 'Historical Unresolved Grief (Maria Yellow Horse Brave Heart), Post Traumatic Slave Syndrome (Joy DeGruy), and Resmaa Menakem\'s My Grandmother\'s Hands offer body-based and culturally grounded frameworks for collective and racialized generational trauma.',
                evidence: 'These frameworks center the collective and somatic dimensions that Western clinical models often omit. Essential for understanding intergenerational trauma in community context.',
              },
            ].map(item => (
              <ScrollReveal key={item.name}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderLeft: `3px solid ${AMBER_MID}`,
                    borderRadius: '2px',
                    padding: '1.75rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: AMBER_DEEP,
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {item.founder}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.875rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: '0 0 0.75rem' }}>
                    {item.approach}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                    {item.evidence}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Epigenetic reversal callout */}
          <ScrollReveal>
            <div
              style={{
                border: `1px solid ${AMBER_MID}`,
                borderLeft: `3px solid ${AMBER_MID}`,
                padding: '1.5rem 1.75rem',
                background: AMBER_PALE,
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
                  color: AMBER_DEEP,
                  margin: '0 0 0.75rem',
                }}
              >
                Epigenetic Reversal Evidence
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
                Kaliman et al. (2014) demonstrated that a single day of intensive mindfulness
                meditation practice by experienced meditators produced measurable changes in gene
                expression &mdash; including downregulation of pro-inflammatory genes (RIPK2, COX2)
                and changes to histone-modifying genes.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0, fontSize: '0.9375rem' }}>
                This does not mean eight hours of meditation undoes generations of trauma. But it
                is evidence that practice reaches the molecular level &mdash; that the tools of
                embodied healing are not merely psychological. The epigenome is plastic. Every
                practice session is a signal sent to the cellular level.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          12. SAFETY & INTEGRATION
      ══════════════════════════════════════════════════════ */}
      <section
        id="safety"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${AMBER_PALE})`,
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
              HEALING WITH CARE
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
              Safety &amp; Integration
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
              Trauma healing is not linear and is not without risk. The goal is healing
              within the <em>window of tolerance</em> &mdash; not overwhelming the system
              with more than it can integrate.
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
                The Window of Tolerance
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Dan Siegel&rsquo;s <em>window of tolerance</em> describes the zone of arousal
                in which healing and integration are possible. Too little activation (dorsal
                shutdown, dissociation) and the system is too frozen to process. Too much
                (sympathetic flooding, overwhelm) and the system is too dysregulated to integrate.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Generational trauma often means the window is narrow &mdash; small triggers
                push the system outside the zone. The work of somatic and therapeutic practice
                is to widen the window gradually, building the capacity to be with difficult
                material without being flooded or dissociating.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Grounding practices are the anchor: when the window is exceeded, return to
                sensation. 5-4-3-2-1 (five things you see, four you hear, three you can touch,
                two you smell, one you taste). Cold water on the face. Feet on the floor.
                These are not bypasses &mdash; they are the foundation that makes
                deeper work safe.
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
                When Healing Destabilizes
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Some practices can move faster than integration allows. Warning signs that
                the approach needs adjustment:
              </p>
              <ul
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.9,
                  paddingLeft: '1.25rem',
                  marginBottom: '1rem',
                }}
              >
                <li><strong>Too much too fast:</strong> Intense breathwork, long retreats, or deep bodywork can flood the system before integration capacity exists</li>
                <li><strong>Kundalini without grounding:</strong> Rapid energy practices without a stable somatic foundation can trigger dissociation, depersonalization, or spiritual emergency</li>
                <li><strong>Spiritual bypassing:</strong> Using practice to transcend or escape the body rather than arrive in it; the wound goes underground, not away</li>
              </ul>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The goal of all trauma-informed practice is increased <em>presence</em>, not
                decreased sensation. If practice is consistently producing overwhelm, numbness,
                or the need to escape, the approach &mdash; not the person &mdash; needs adjustment.
              </p>
            </ScrollReveal>
          </div>

          {/* Safety callout */}
          <ScrollReveal>
            <div
              style={{
                border: `1px solid ${AMBER_MID}`,
                borderLeft: `3px solid ${AMBER_MID}`,
                padding: '1.5rem 1.75rem',
                background: 'rgba(196,149,106,0.08)',
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
                  color: AMBER_DEEP,
                  margin: '0 0 0.75rem',
                }}
              >
                When to Seek Professional Help
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.75,
                  margin: '0 0 0.75rem',
                }}
              >
                Self-directed practice is valuable but has limits. Seek a trauma-informed
                therapist or somatic practitioner if you experience:
              </p>
              <ul
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.9,
                  paddingLeft: '1.25rem',
                  margin: '0 0 0.75rem',
                }}
              >
                <li>Persistent intrusive memories, flashbacks, or nightmares</li>
                <li>Recognized patterns of childhood abuse, neglect, or emotional unavailability in caregivers</li>
                <li>Frequent dissociation, depersonalization, or losing time</li>
                <li>Relationship patterns that consistently recreate early wounding dynamics</li>
                <li>Somatic symptoms without clear medical cause (chronic pain, digestive issues, autoimmune patterns)</li>
              </ul>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.7, margin: 0 }}>
                The practices on this site can be powerful adjuncts to therapeutic work. They are
                not replacements for it when the wound is deep.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          13. BOTTOM-UP PROTOCOL
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
              A SEQUENCED APPROACH
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
              Bottom-Up Protocol
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
              Trauma healing follows a sequence. Safety must precede emotional processing;
              capacity must precede depth. This four-phase protocol maps the polyvagal
              and chakra systems onto a progressive healing arc.
            </p>
          </ScrollReveal>

          <div className="timeline" style={{ paddingLeft: '2.5rem' }}>
            {[
              {
                phase: '1',
                title: 'Safety \u2014 Root Chakra (Weeks 1\u20134)',
                chakra: 'Muladhara / Root',
                practices: 'Grounding practices, somatic anchoring, 5-4-3-2-1 presence exercises, gentle walking, basic breathwork. Establish daily routine and physical safety first.',
                desc: 'The nervous system cannot heal what it does not feel safe enough to touch. Phase 1 is entirely about expanding the window of tolerance. No deep somatic work yet. Build the container before opening it.',
              },
              {
                phase: '2',
                title: 'Emotional Capacity \u2014 Sacral & Solar (Weeks 5\u20138)',
                chakra: 'Svadhisthana & Manipura',
                practices: 'Breathwork (extended exhale, coherence breathing), hip openers, TRE introduction, body scan meditation. Begin building access to emotion without being overwhelmed.',
                desc: 'With a stable foundation, begin moving into emotional and survival-energy territory. Hip openers address psoas storage. Breathwork builds vagal tone. TRE begins the trembling discharge of frozen survival energy.',
              },
              {
                phase: '3',
                title: 'Connection \u2014 Heart Chakra (Weeks 9\u201312)',
                chakra: 'Anahata / Heart',
                practices: 'Loving-kindness meditation, co-regulation practices (Reiki, group practice, somatic therapy), chest-opening yoga, relational healing work.',
                desc: 'Once individual capacity is established, the relational dimension of healing opens. Generational trauma is relational in origin; connection is part of the repair. This phase introduces the heart center and safe other-directed practices.',
              },
              {
                phase: '4',
                title: 'Expression & Integration \u2014 Throat to Crown (Ongoing)',
                chakra: 'Vishuddha through Sahasrara',
                practices: 'Narrative therapy, journaling the family story, somatic tracking of inherited beliefs, manifestation work around identity, meaning-making practices.',
                desc: 'The final phase integrates experience into narrative and meaning. Telling the story \u2014 to yourself, in therapy, or in community \u2014 completes the loop that trauma left open. This phase is ongoing; integration has no finish line.',
              },
            ].map(item => (
              <div key={item.phase} style={{ position: 'relative', marginBottom: '2rem' }}>
                <div
                  className="timeline-node"
                  style={{ background: AMBER_DEEP }}
                >
                  {item.phase}
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
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.75rem',
                    color: AMBER_DEEP,
                    fontStyle: 'italic',
                    margin: '0 0 0.5rem',
                  }}
                >
                  {item.chakra}
                </p>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: AMBER_DEEP,
                    fontWeight: 600,
                    lineHeight: 1.7,
                    margin: '0 0 0.375rem',
                  }}
                >
                  {item.practices}
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
          14. "Now, practice." SEPARATOR + VIDEOS
      ══════════════════════════════════════════════════════ */}
      {/* Section break — amber accent */}
      <div
        id="practice"
        style={{
          padding: '2.5rem max(1.5rem, 8vw)',
          background: AMBER_DEEP,
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'rgba(196,149,106,0.3)' }} />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: AMBER_MID,
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Now, practice.
        </p>
        <div style={{ flex: 1, height: '1px', background: 'rgba(196,149,106,0.3)' }} />
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
              These three modalities directly address the somatic dimension of generational
              trauma. Start with the one that feels most accessible &mdash; the body knows
              where it needs to begin.
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
              { key: 'trauma-yoga' as VideoTab, label: 'Trauma-Informed Yoga' },
              { key: 'somatic' as VideoTab, label: 'Somatic Release' },
              { key: 'grounding' as VideoTab, label: 'Grounding' },
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
                  border: `1px solid ${activeVideoTab === tab.key ? AMBER_DEEP : 'var(--color-border)'}`,
                  background:
                    activeVideoTab === tab.key ? AMBER_DEEP : 'var(--color-surface-raised)',
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
          15. CROSS-LINKS FOOTER
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)',
          background: 'linear-gradient(160deg, oklch(35% 0.08 55 / 0.18), oklch(93% 0.03 40))',
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
              Generational Trauma Connects Everything
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '56ch',
                lineHeight: 1.75,
              }}
            >
              This is the page that ties the whole site together. Every practice here addresses
              a different layer of the inherited pattern. Begin anywhere. The body will show you
              which layer needs attention.
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
                href: '/breathe',
                label: 'Breathwork',
                desc: 'Extended exhale activates the vagal brake — the weakened parasympathetic pathway inherited from a dysregulated nervous system.',
              },
              {
                href: '/yoga',
                label: 'Yoga',
                desc: 'Hip openers release the psoas — the primary fear response muscle where generational freeze is stored.',
              },
              {
                href: '/meditate',
                label: 'Meditate',
                desc: 'Builds the prefrontal witness that trauma suppressed — the capacity to observe patterns without being defined by them.',
              },
              {
                href: '/fascia',
                label: 'Fascia',
                desc: 'Releases the body armor — the fascial thickening where unexpressed survival emotion has hardened into tissue.',
              },
              {
                href: '/somatics',
                label: 'Somatics',
                desc: 'Completes the incomplete survival response — discharging the frozen energy that trauma left suspended in the body.',
              },
              {
                href: '/nervous-system',
                label: 'Nervous System',
                desc: 'The full polyvagal map — understanding how the inherited autonomic baseline operates and how to shift it.',
              },
              {
                href: '/qigong',
                label: 'Qigong',
                desc: 'Slow deliberate movement as a polyvagal signal — teaching the body that safety allows unhurried presence.',
              },
              {
                href: '/reiki',
                label: 'Reiki',
                desc: 'Provides the attuned co-regulatory presence that was absent in the original wounding — relational repair through the body.',
              },
              {
                href: '/sound',
                label: 'Sound',
                desc: 'Frequency bypasses cognitive defenses — low resonance reaches the nervous system directly, pattern-interrupting inherited vigilance.',
              },
              {
                href: '/sleep',
                label: 'Sleep',
                desc: 'REM processes emotional memories overnight. Trauma disrupts REM; restoring sleep is restoring the nightly processing window.',
              },
              {
                href: '/chakras',
                label: 'Chakras',
                desc: 'Maps where the generational pattern expresses in the body — the diagnostic overlay that shows which layer needs attention.',
              },
              {
                href: '/manifestation',
                label: 'Manifestation',
                desc: 'Addresses the inherited limiting beliefs installed by survival-mode caregivers — rewriting the story at the identity level.',
              },
              {
                href: '/nutrition',
                label: 'Nutrition',
                desc: 'The gut-brain axis is dysregulated by chronic trauma — inflammation, cortisol, and microbiome disruption. Nutrition is nervous system repair.',
              },
              {
                href: '/temperature',
                label: 'Temperature',
                desc: 'Cold exposure activates the same norepinephrine pathways that trauma dysregulated — a direct physiological intervention for the stress response.',
              },
              {
                href: '/nature',
                label: 'Nature',
                desc: 'Nature immersion downregulates the default mode network and restores parasympathetic tone — a direct counter to the hypervigilance of trauma.',
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
                        color: AMBER_DEEP,
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
                borderLeft: `3px solid ${AMBER_MID}`,
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
                  maxWidth: '52ch',
                }}
              >
                &ldquo;Biology is not destiny. The epigenome is plastic, the nervous system is
                plastic, and every conscious act of healing sends a new signal down the generational
                line.&rdquo;
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
                Resmaa Menakem &mdash; My Grandmother&rsquo;s Hands
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
