'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';

// ── Accent tokens (temperature / ice blue) ─────────────────────
const ICE_DEEP = '#3B7A9E';
const ICE_MID  = '#7BB8D4';
const ICE_PALE = '#DFF0F7';

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
        borderLeft: `3px solid ${ICE_MID}`,
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
          color: ICE_DEEP,
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

// ── Protocol Card ──────────────────────────────────────────────
function ProtocolCard({
  label,
  duration,
  timing,
  steps,
}: {
  label: string;
  duration: string;
  timing: string;
  steps: string;
}) {
  return (
    <div
      style={{
        background: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
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
          color: ICE_DEEP,
          margin: '0 0 0.25rem',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: '0 0 0.25rem',
        }}
      >
        {duration}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.75rem',
          color: ICE_DEEP,
          fontStyle: 'italic',
          margin: '0 0 0.75rem',
        }}
      >
        {timing}
      </p>
      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
        {steps}
      </p>
    </div>
  );
}

// ── Video tab data ─────────────────────────────────────────────
type VideoTab = 'cold' | 'wim-hof' | 'sauna';

const videoData: Record<VideoTab, Array<{ videoId: string; title: string; description: string }>> = {
  cold: [
    {
      videoId: 'AJiQMFTnR04',
      title: 'The Science of Cold Exposure',
      description: 'Andrew Huberman breaks down the exact mechanisms of deliberate cold exposure — norepinephrine, dopamine, brown fat activation, and the Søeberg principle. The most evidence-grounded cold protocol overview available.',
    },
    {
      videoId: 'x3MnWCcaBeo',
      title: 'Cold Shower Benefits — What Happens to Your Body',
      description: 'Practical walkthrough of cold water immersion protocols from 30-second cold finishes to full ice baths. Covers temperature ranges, duration, timing, and what the research says about recovery and mental health.',
    },
  ],
  'wim-hof': [
    {
      videoId: 'nRGfUK6WQTY',
      title: 'Wim Hof Method Explained',
      description: 'The original Wim Hof breathing and cold exposure method. Covers the three-pillar approach: breathing, cold, and commitment. Note: the breathing component is activating — do not practice before bed.',
    },
  ],
  sauna: [
    {
      videoId: 'eKDo-YjnjiQ',
      title: 'Sauna Benefits — The Finnish Evidence',
      description: 'The Laukkanen 20-year Kuopio cohort study unpacked. Covers frequency, temperature, duration, and the cardiovascular mechanism. Also discusses heat shock proteins and why sauna 4–7 times weekly is the optimal dose.',
    },
  ],
};

export default function TemperatureClient() {
  const [activeVideoTab, setActiveVideoTab] = useState<VideoTab>('cold');

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
          background: 'linear-gradient(160deg, oklch(40% 0.10 220), oklch(55% 0.12 205))',
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
            background: `radial-gradient(circle, ${ICE_PALE}30 0%, transparent 70%)`,
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
              color: ICE_DEEP,
              margin: '0 0 1.25rem',
            }}
          >
            Train Your Autonomic Nervous System
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
            Cold &amp; Heat Therapy
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
            Controlled temperature stress builds resilience at the cellular level. Cold triggers a 250%
            dopamine surge lasting hours. Sauna 4&ndash;7 times weekly reduces mortality by 40%. Contrast
            therapy trains the autonomic flexibility that every other practice on this site develops.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { href: '#cold', label: 'Cold' },
              { href: '#heat', label: 'Heat' },
              { href: '#contrast', label: 'Contrast' },
              { href: '#practice-map', label: 'Practice Map' },
              { href: '#protocols', label: 'Protocols' },
              { href: '#safety', label: 'Safety' },
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
                  color: ICE_DEEP,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${ICE_MID}`,
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
          2. DELIBERATE COLD EXPOSURE
      ══════════════════════════════════════════════════════ */}
      <section
        id="cold"
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
                Hormesis &amp; the Cold Shock Cascade
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
                Deliberate Cold Exposure
              </h2>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                <strong>Hormesis</strong> is the principle that controlled, sublethal stress produces adaptive
                resilience. Cold water immersion is one of the most potent hormetic stressors available &mdash;
                it triggers a coordinated cascade of neuroendocrine responses that are measurably different
                from any other intervention in terms of catecholamine release.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The cold shock response begins within seconds: norepinephrine floods the system (200&ndash;300%
                above baseline), the adrenal medulla releases epinephrine, brown adipose tissue activates for
                thermogenesis, and a sustained dopaminergic response follows &mdash; lasting up to two hours
                after a single cold immersion session.
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
                Brown Fat Activation
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Brown adipose tissue (BAT) is a metabolically active fat that burns energy to generate heat.
                Adults were long thought to have negligible BAT, but van Marken Lichtenbelt et al. (2009, <em>NEJM</em>)
                demonstrated that cold exposure activates substantial BAT in adult humans, and that regular
                cold exposure increases BAT volume and metabolic activity.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The mechanism involves &beta;3-adrenergic receptors on brown adipocytes responding to
                norepinephrine &mdash; the same catecholamine surge that produces the mental and mood
                effects of cold. This means the thermogenic and psychological benefits share a common
                upstream trigger.
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
                marginBottom: '3.5rem',
              }}
            >
              <StatCard
                source="&Scaron;r&aacute;mek et al., 2000"
                stat="250%"
                detail="Dopamine increase sustained for up to 2 hours following cold water immersion. The effect is long-lasting compared to the sharp but brief dopamine spikes from food, social media, or other rewards."
                url="https://pubmed.ncbi.nlm.nih.gov/10751106/"
              />
              <StatCard
                source="Buijze et al., 2016 (n=3018)"
                stat="29%"
                detail="Reduction in self-reported sick days in participants who ended their morning shower with 30, 60, or 90 seconds of cold water — a Dutch RCT across over 3,000 participants."
                url="https://pubmed.ncbi.nlm.nih.gov/27631616/"
              />
              <StatCard
                source="&Scaron;r&aacute;mek et al., 2000"
                stat="2+ hrs"
                detail="Duration of dopamine elevation after cold immersion. The sustained nature of this effect — unlike the sharp peak-and-crash of most dopaminergic inputs — is part of what makes cold exposure uniquely beneficial for mood."
                url="https://pubmed.ncbi.nlm.nih.gov/10751106/"
              />
            </div>
          </ScrollReveal>

          {/* Norepinephrine detail */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${ICE_MID}`,
                padding: '1.25rem 1.5rem',
                background: ICE_PALE,
                borderRadius: '0 2px 2px 0',
                marginBottom: '2rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: ICE_DEEP,
                  margin: '0 0 0.5rem',
                }}
              >
                The Norepinephrine Effect
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>
                Norepinephrine (&Scaron;r&aacute;mek 2000: +200&ndash;300%) drives focus, attention, and mood regulation.
                It is the same neurotransmitter targeted by ADHD medications and many antidepressants &mdash;
                but cold exposure produces it endogenously, without the receptor downregulation that comes
                from exogenous administration. This is the core case for deliberate cold as a mental health tool.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          4. HEAT THERAPY
      ══════════════════════════════════════════════════════ */}
      <section
        id="heat"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${ICE_PALE})`,
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
              The Kuopio Evidence
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
              Heat Therapy
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
              The Kuopio Ischemic Heart Disease study &mdash; 20 years, 2,315 Finnish men &mdash; produced
              the most striking epidemiological findings in sauna research. Regular sauna use is not merely
              relaxing; it is cardiovascularly parallel to moderate aerobic exercise.
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
                Cardiovascular Parallel
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                At 80&ndash;100&deg;C, sauna raises heart rate to 100&ndash;150 bpm &mdash; comparable to
                moderate aerobic exercise. Cardiac output increases. Peripheral vasodilation occurs. Blood
                volume is redistributed to the skin for cooling. The cardiovascular system performs a
                substantial workout without mechanical joint load.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Laukkanen et al. (2015, <em>JAMA Internal Medicine</em>) found that sauna use 4&ndash;7 times
                weekly was associated with 40% lower all-cause mortality and 65% lower risk of Alzheimer&apos;s
                disease compared to once-weekly use. The dose-response relationship was clear and consistent
                across subgroups.
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
                Heat Shock Proteins &amp; Mental Health
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Elevated core body temperature triggers the production of heat shock proteins (HSPs) &mdash;
                molecular chaperones that repair damaged proteins, reduce cellular inflammation, and support
                mitochondrial function. HSPs are part of the mechanism behind sauna&apos;s cardioprotective
                and neuroprotective effects.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Janssen et al. (2016) found that sauna-induced hyperthermia produced significant antidepressant
                effects persisting for 6 weeks after a single session. The proposed mechanism involves
                serotonergic pathways and the thermal regulation of mood circuits &mdash; the same
                logic behind why warm baths improve sleep onset.
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
                marginBottom: '3rem',
              }}
            >
              <StatCard
                source="Laukkanen et al., 2015 (JAMA)"
                stat="40%"
                detail="Lower all-cause mortality in men using sauna 4–7 times per week versus once per week. The Kuopio Ischemic Heart Disease study followed 2,315 Finnish men for 20 years."
                url="https://pubmed.ncbi.nlm.nih.gov/25705824/"
              />
              <StatCard
                source="Laukkanen et al., 2017"
                stat="65%"
                detail="Lower risk of Alzheimer's disease and dementia in the highest sauna-frequency group. The association held after controlling for cardiovascular risk factors, physical activity, and socioeconomic status."
                url="https://pubmed.ncbi.nlm.nih.gov/27932366/"
              />
              <StatCard
                source="Laukkanen Kuopio Cohort"
                stat="20 years"
                detail="Follow-up duration of the landmark Finnish sauna cohort study — one of the longest-running prospective investigations of lifestyle and mortality in existence."
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
          6. CONTRAST THERAPY
      ══════════════════════════════════════════════════════ */}
      <section
        id="contrast"
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
              Hot-Cold Cycling
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
              Contrast Therapy
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
              Alternating hot and cold exposure trains the autonomic nervous system to transition rapidly
              between sympathetic and parasympathetic states &mdash; the same flexibility developed by
              breathwork, HRV training, and meditation, but through a direct physical mechanism.
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
                Enhanced Circulation
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Heat causes vasodilation &mdash; blood vessels expand, peripheral circulation increases,
                and the cardiovascular system pumps harder to distribute blood to the skin surface.
                Cold causes vasoconstriction &mdash; blood is shunted inward to protect core temperature.
                Cycling between the two creates a vascular &ldquo;pump&rdquo; that drives circulation
                through capillary beds more forcefully than either modality alone.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                This enhanced microcirculation underlies contrast therapy&apos;s reputation for reducing
                delayed-onset muscle soreness (DOMS) and accelerating recovery from intense training. The
                evidence here is moderate but consistent across sports medicine literature.
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
                Autonomic Flexibility &amp; the Nordic Cycle
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The traditional Nordic sauna cycle &mdash; hot sauna (15&ndash;20 min), cold plunge or
                snow roll, rest &mdash; repeated 2&ndash;3 times &mdash; is one of the oldest systematic
                contrast protocols in the world. It trains the nervous system to activate and recover
                repeatedly, building what researchers call &ldquo;autonomic flexibility.&rdquo;
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The social and co-regulation dimension of Nordic sauna culture deserves acknowledgment: the
                practice is deeply communal. Nervous system regulation in the presence of others activates
                ventral vagal circuits (Polyvagal theory) in ways solo practice does not &mdash; the sauna
                may be as much a social healing ritual as a physiological protocol.
              </p>
            </ScrollReveal>
          </div>

          {/* Protocol detail */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${ICE_MID}`,
                padding: '1.25rem 1.5rem',
                background: ICE_PALE,
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
                  color: ICE_DEEP,
                  margin: '0 0 0.5rem',
                }}
              >
                The Nordic Cycle
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>
                Sauna (80&ndash;100&deg;C, 15&ndash;20 min) &rarr; Cold plunge or cold shower (10&ndash;15&deg;C,
                1&ndash;3 min) &rarr; Rest (10&ndash;15 min). Repeat 2&ndash;3 rounds. End on cold for
                the dopamine effect; end on heat for deeper relaxation and sleep preparation. Total time:
                60&ndash;90 minutes.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          8. TEMPERATURE & EVERY PRACTICE
      ══════════════════════════════════════════════════════ */}
      <section
        id="practice-map"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${ICE_PALE})`,
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
              Where Temperature Fits
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
              Temperature &amp; Every Practice
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
              Temperature stress does not exist in isolation. It amplifies and is amplified by every
              other modality on this site. Here is how each connection works.
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
                practice: 'Breathwork',
                href: '/breathe',
                connection: 'Cold exposure is breath training. The involuntary hyperventilation response to cold must be overridden by conscious slow breathing — the same skill built in Wim Hof, box breathing, and pranayama. Cold is the hardest context in which to practice breath control, which is why it transfers.',
              },
              {
                practice: 'Nervous System',
                href: '/nervous-system',
                connection: 'Cold is direct autonomic training. The cold shock response activates the sympathetic branch maximally; controlled recovery activates the parasympathetic brake. Repeat the cycle and you build the vagal resilience that HRV training measures.',
              },
              {
                practice: 'HRV',
                href: '/nervous-system#hrv',
                connection: 'Regular cold exposure raises resting HRV over weeks, consistent with its norepinephrine-mediated vagal tone effects. Sauna before sleep deepens SWS and elevates overnight HRV. Both are among the strongest non-exercise interventions for HRV improvement.',
              },
              {
                practice: 'Sleep',
                href: '/sleep',
                connection: 'Evening sauna is one of the most effective sleep onset interventions: core body temperature rise followed by rapid post-sauna cooling mimics the natural thermal drop required for sleep initiation. Cold in the morning accelerates the cortisol awakening response.',
              },
              {
                practice: 'Fascia',
                href: '/fascia',
                connection: 'Heat increases fascia pliability. The collagen matrix softens at elevated temperatures, making post-sauna the optimal window for mobility work, stretching, and deep tissue release. Cold firms the fascial network and reduces inflammatory edema post-training.',
              },
              {
                practice: 'Trauma',
                href: '/trauma',
                connection: 'Cold exposure can be a powerful tool for restoring agency in trauma recovery. The voluntary choice to enter cold stress — and the discovery that you can regulate your response — builds interoceptive confidence that is transferable to emotional regulation. Cold is a controlled microdose of the activation trauma survivors often fear.',
              },
            ].map(card => (
              <ScrollReveal key={card.practice}>
                <Link href={card.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      borderTop: `3px solid ${ICE_MID}`,
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
                        color: ICE_DEEP,
                        margin: '0 0 0.5rem',
                      }}
                    >
                      {card.practice}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                      {card.connection}
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
          10. PROTOCOLS
      ══════════════════════════════════════════════════════ */}
      <section
        id="protocols"
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
              Step by Step
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
              Protocols
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
              Start at the beginner level and build tolerance over weeks, not days. The goal is
              consistent exposure, not extreme duration.
            </p>
          </ScrollReveal>

          {/* Cold protocols */}
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
              Cold Exposure
            </h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem',
            }}
          >
            <ScrollReveal>
              <ProtocolCard
                label="Beginner"
                duration="30 sec cold finish"
                timing="End of warm shower, morning"
                steps="Take normal warm shower. At the end, switch to cold for 30 seconds. Breathe slowly through the cold. Focus on not tensing up. Do this daily for 2 weeks before increasing duration."
              />
            </ScrollReveal>
            <ScrollReveal>
              <ProtocolCard
                label="Intermediate"
                duration="2–5 min cold shower"
                timing="Morning, post-workout, or midday"
                steps="Begin immediately at cold. Water should be genuinely cold — not cool. Slow nasal breathing throughout. 11 minutes total per week across sessions is the Huberman-cited minimum effective dose for norepinephrine benefits."
              />
            </ScrollReveal>
            <ScrollReveal>
              <ProtocolCard
                label="Advanced"
                duration="2–11 min ice bath"
                timing="Morning, or after strength training"
                steps="Water temperature 10–15°C (50–59°F). Enter slowly. Slow nasal breathing. 11 minutes per week total is sufficient for benefits. Do not exceed 20 minutes in a single session. Do not use within 4 hours post-strength training if hypertrophy is the goal (blunts mTOR)."
              />
            </ScrollReveal>
          </div>

          {/* Heat & Contrast protocols */}
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
              Heat &amp; Contrast
            </h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem',
            }}
          >
            <ScrollReveal>
              <ProtocolCard
                label="Sauna"
                duration="15–20 min per session"
                timing="4–7x weekly for mortality benefits; evening for sleep"
                steps="80–100°C. Sit or lie down. Allow heart rate to rise. Exit before discomfort becomes distress. Cool down for 5–10 min (cold shower, cool air, or rest). The Kuopio optimal dose: 4–7 sessions per week, 15–20 min each."
              />
            </ScrollReveal>
            <ScrollReveal>
              <ProtocolCard
                label="Contrast Therapy"
                duration="60–90 min total"
                timing="Recovery days, or 2+ hrs post-training"
                steps="Sauna (15–20 min) → Cold plunge or cold shower (1–3 min) → Rest (10 min). Repeat 2–3 rounds. Nordic cycle tradition: end the final round on cold for alertness, or on heat for relaxation and sleep."
              />
            </ScrollReveal>
            <ScrollReveal>
              <ProtocolCard
                label="Søeberg Principle"
                duration="Applies to any cold exposure"
                timing="When the goal is mood and dopamine"
                steps="Do not rub your body or add external heat immediately after cold exposure. Allow the body to rewarm itself. The act of shivering and self-rewarming extends the norepinephrine and dopamine release curve — cutting it short with a towel or warm shower shortens the benefit window."
              />
            </ScrollReveal>
          </div>

          {/* Timing callout */}
          <ScrollReveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '1.5rem',
              }}
            >
              {[
                {
                  label: 'Morning Cold',
                  color: ICE_MID,
                  textColor: ICE_DEEP,
                  desc: 'Cold in the morning amplifies the cortisol awakening response and produces a dopamine surge that elevates mood and focus for 2+ hours. This is the optimal timing for cold exposure as a mood and productivity tool.',
                },
                {
                  label: 'Evening Sauna',
                  color: '#E4AD75',
                  textColor: '#8B5E2A',
                  desc: 'Sauna 90 minutes before bed raises core temperature, then the subsequent cooling accelerates sleep onset. The heat shock protein response and cardiovascular flush also prepare the body for deep, restorative sleep.',
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
          </ScrollReveal>
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
        id="safety"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${ICE_PALE})`,
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
              Know Before You Start
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
              Safety &amp; Contraindications
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
              Temperature extremes place real demands on the cardiovascular and autonomic nervous systems.
              The following contraindications are not cautionary footnotes &mdash; they are clinical considerations
              that apply to a meaningful subset of the population.
            </p>
          </ScrollReveal>

          {/* Safety callout */}
          <ScrollReveal>
            <div
              style={{
                border: `1px solid #8B3A62`,
                borderLeft: `3px solid #8B3A62`,
                padding: '1.5rem 1.75rem',
                background: 'rgba(139,58,98,0.06)',
                borderRadius: '0 2px 2px 0',
                marginBottom: '2rem',
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
                Contraindications — Consult a Physician
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.75,
                  margin: '0 0 0.75rem',
                }}
              >
                Do not begin deliberate cold or heat exposure without medical clearance if you have any
                of the following conditions:
              </p>
              <ul
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.9,
                  paddingLeft: '1.25rem',
                  margin: '0 0 1rem',
                }}
              >
                <li><strong>Hypertension (uncontrolled)</strong> &mdash; cold immersion produces sharp acute BP elevation; hot sauna produces vasodilation that can cause orthostatic hypotension on standing</li>
                <li><strong>Cardiovascular disease</strong> &mdash; cardiac arrhythmias, recent MI, or unstable angina are absolute contraindications for extreme temperature protocols</li>
                <li><strong>Raynaud&apos;s syndrome or phenomenon</strong> &mdash; cold triggers severe vasospasm; even brief cold exposure can cause tissue damage</li>
                <li><strong>Pregnancy</strong> &mdash; elevated core temperature is teratogenic in the first trimester; both extreme heat and extreme cold are contraindicated</li>
                <li><strong>Epilepsy</strong> &mdash; cold shock and hyperventilation responses can lower seizure threshold</li>
                <li><strong>Open wounds, skin infections, or acute inflammation</strong> &mdash; immersion introduces infection risk and alters inflammatory responses unpredictably</li>
              </ul>
              <p
                style={{
                  fontSize: '0.8125rem',
                  color: '#8B3A62',
                  lineHeight: 1.7,
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                Never practice cold immersion alone. Never practice breath-hold techniques in or near water.
                Exit immediately if you experience chest pain, dizziness, or numbness.
              </p>
            </div>
          </ScrollReveal>

          {/* General guidelines */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${ICE_MID}`,
                padding: '1.25rem 1.5rem',
                background: ICE_PALE,
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
                  color: ICE_DEEP,
                  margin: '0 0 0.5rem',
                }}
              >
                For Healthy Adults
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>
                Progress gradually. The physiological adaptations to cold and heat take weeks to develop.
                Beginners who start with 30-second cold shower endings and build over 4&ndash;6 weeks have
                significantly better adherence and fewer adverse events than those who begin with full
                immersion. The beneficial stress is dose-dependent &mdash; more is not always better.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          13. "Now, practice." SEPARATOR + VIDEOS
      ══════════════════════════════════════════════════════ */}
      <div
        id="practice"
        style={{
          padding: '2.5rem max(1.5rem, 8vw)',
          background: ICE_DEEP,
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'rgba(123,184,212,0.3)' }} />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: '#ffffff',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Now, practice.
        </p>
        <div style={{ flex: 1, height: '1px', background: 'rgba(123,184,212,0.3)' }} />
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
              Cold exposure science, the Wim Hof method, and sauna protocols &mdash; curated from
              the most evidence-aligned sources available.
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
              { key: 'cold' as VideoTab, label: 'Cold Exposure' },
              { key: 'wim-hof' as VideoTab, label: 'Wim Hof Method' },
              { key: 'sauna' as VideoTab, label: 'Sauna Science' },
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
                  border: `1px solid ${activeVideoTab === tab.key ? ICE_DEEP : 'var(--color-border)'}`,
                  background:
                    activeVideoTab === tab.key ? ICE_DEEP : 'var(--color-surface-raised)',
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
          background: `linear-gradient(160deg, oklch(40% 0.10 220 / 0.18), oklch(93% 0.03 205))`,
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
              Temperature Connects to Everything
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              Every practice on this site either prepares the autonomic nervous system for temperature
              stress or benefits from the resilience it builds. Here is where to go next.
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
                desc: 'Cold exposure is breath training in real time. Build the same skill with intention in every other context.',
              },
              {
                href: '/nervous-system',
                label: 'Nervous System',
                desc: 'Polyvagal theory, vagal tone, HRV — the autonomic science behind why temperature works.',
              },
              {
                href: '/sleep',
                label: 'Sleep',
                desc: 'Evening sauna as sleep protocol. Morning cold as circadian anchor. Temperature is the bridge.',
              },
              {
                href: '/fascia',
                label: 'Fascia',
                desc: 'Heat unlocks fascial pliability. Cold reduces inflammation. Temperature is the therapist.',
              },
              {
                href: '/yoga',
                label: 'Yoga',
                desc: 'Post-sauna mobility work takes advantage of peak fascial pliability and parasympathetic state.',
              },
              {
                href: '/trauma',
                label: 'Trauma',
                desc: 'Cold exposure restores agency. The voluntary choice to enter and regulate in cold stress is therapeutic.',
              },
              {
                href: '/nutrition',
                label: 'Nutrition',
                desc: 'Brown fat activation, metabolic rate, and the hormonal cascades triggered by temperature — nutrition and cold are deeply linked.',
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
                        color: ICE_DEEP,
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
                borderLeft: `3px solid ${ICE_MID}`,
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
                &ldquo;The cold is a noble teacher.&rdquo;
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
                Wim Hof
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
