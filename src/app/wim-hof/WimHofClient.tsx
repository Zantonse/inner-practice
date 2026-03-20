'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import StatCard from '@/components/StatCard';

// ── Accent tokens (arctic steel blue) ──────────────────────────
const FROST_DEEP  = '#1B3A4B';  // deep steel blue
const FROST_MID   = '#4A90A4';  // arctic mid-tone
const FROST_LIGHT = '#A3D4E0';  // pale frost
const FROST_PALE  = '#E3F2F6';  // near-white ice

export default function WimHofClient() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

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
          background: 'linear-gradient(160deg, oklch(40% 0.06 220), oklch(72% 0.05 210))',
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
            background: `radial-gradient(circle, ${FROST_PALE}30 0%, transparent 70%)`,
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
              color: 'rgba(227,242,246,0.75)',
              margin: '0 0 1.25rem',
            }}
          >
            The Wim Hof Method
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              color: '#EEF7FA',
              lineHeight: 1.05,
              margin: '0 0 1.5rem',
              maxWidth: '18ch',
            }}
          >
            The Iceman&apos;s Three Pillars
          </h1>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'rgba(227,242,246,0.85)',
              margin: '0 0 2.5rem',
              maxWidth: '52ch',
              lineHeight: 1.75,
            }}
          >
            Breathe. Brave the cold. Commit. &mdash; Voluntary control of the autonomic nervous
            system, validated by science.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { href: '#pillars',  label: 'Pillars'   },
              { href: '#breathing',label: 'Breathing' },
              { href: '#cold',     label: 'Cold'      },
              { href: '#science',  label: 'Science'   },
              { href: '#evidence', label: 'Evidence'  },
              { href: '#safety',   label: 'Safety'    },
              { href: '#training', label: 'Training'  },
              { href: '#connect',  label: 'Connect'   },
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
                  color: FROST_LIGHT,
                  textDecoration: 'none',
                  borderBottom: `1px solid rgba(163,212,224,0.5)`,
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
          2. WHAT IS THE WIM HOF METHOD
      ══════════════════════════════════════════════════════ */}
      <section
        id="pillars"
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
                Origins &amp; Philosophy
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
                What Is the Wim Hof Method?
              </h2>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Wim Hof (born April 20, 1959, Sittard, Netherlands) discovered cold immersion at 17
                when he plunged into the Beatrixpark canal in Amsterdam. He felt an immediate, profound
                connection — a sense of aliveness that nothing else had produced. He kept returning.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                After the death by suicide of his wife Olaya in 1995, cold and breath became his
                primary healing practice. The methodology that emerged from decades of personal
                experimentation accumulated 18 Guinness World Records: longest ice bath (1 hour 52
                minutes), barefoot half-marathon on ice and snow, Everest ascent in shorts to 7,400m.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                In 2011, Radboud University Medical Center demonstrated he could voluntarily influence
                his autonomic nervous system and immune response &mdash; the first scientific
                demonstration that this was physiologically possible. The question shifted from
                &ldquo;Is Wim Hof a freak of nature?&rdquo; to &ldquo;Can this be taught?&rdquo;
                Subsequent controlled studies answered: yes, it can.
              </p>
            </ScrollReveal>

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
                The Three Pillars
              </h3>

              {[
                {
                  title: 'Breathing',
                  body: 'Cyclic hyperventilation (30\u201340 deep breaths) followed by breath retention. Produces controlled respiratory alkalosis and intermittent hypoxia. Triggers a massive catecholamine release \u2014 epinephrine 2\u20133x baseline within minutes. The breathing component is the most physiologically distinctive element of the method.',
                },
                {
                  title: 'Cold Exposure',
                  body: 'Progressive, deliberate cold stress \u2014 from cold showers to ice baths. Activates brown adipose tissue, releases norepinephrine (200\u2013300% increase), and builds cold tolerance over weeks. The cold pillar is separate from the breathing pillar; both are required for full method effects.',
                },
                {
                  title: 'Commitment (Mindset)',
                  body: 'Patient dedication and gradual progression. The mental component that sustains practice through discomfort. Wim Hof argues that the commitment pillar is the most underrated: most people have the physical capacity to do the method but abandon it before adaptation occurs.',
                },
              ].map((pillar, i) => (
                <div
                  key={i}
                  style={{
                    borderLeft: `3px solid ${FROST_MID}`,
                    paddingLeft: '1.25rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: FROST_DEEP,
                      margin: '0 0 0.375rem',
                    }}
                  >
                    {pillar.title}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {pillar.body}
                  </p>
                </div>
              ))}
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
                source="Kox et al., PNAS (2014)"
                stat="194% increase in IL-10"
                detail="First controlled demonstration that trained individuals can voluntarily suppress the innate immune response via breathing and cold exposure."
                url="https://pubmed.ncbi.nlm.nih.gov/24799686/"
                accentColor={FROST_MID}
                accentTextColor={FROST_DEEP}
              />
              <StatCard
                source="Buijze et al., PLOS ONE (2016)"
                stat="29% fewer sick days"
                detail="Largest cold-exposure RCT to date (n=3,018). Participants ending showers with 30\u201390 seconds of cold water reported significantly fewer sick days."
                url="https://pubmed.ncbi.nlm.nih.gov/27631616/"
                accentColor={FROST_MID}
                accentTextColor={FROST_DEEP}
              />
              <StatCard
                source="Guinness World Records"
                stat="18 world records"
                detail="Including longest ice bath (1 hr 52 min), barefoot half-marathon on ice and snow, and Everest climb in shorts to 7,400m."
                accentColor={FROST_MID}
                accentTextColor={FROST_DEEP}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          3. BREATHING PROTOCOL
      ══════════════════════════════════════════════════════ */}
      <section
        id="breathing"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${FROST_PALE})`,
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
              Pillar One &mdash; Controlled Hyperventilation
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
              }}
            >
              The Breathing Protocol
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
              The WHM breathing technique is a form of cyclic hyperventilation with retention. Each
              round systematically alters blood chemistry &mdash; raising pH, lowering CO2, creating
              intermittent hypoxia &mdash; which triggers an adrenergic cascade that practitioners
              can learn to direct.
            </p>
          </ScrollReveal>

          {/* Step-by-step protocol card */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `4px solid ${FROST_MID}`,
                background: FROST_PALE,
                borderRadius: '0 4px 4px 0',
                padding: '2rem 2rem 2rem 1.75rem',
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
                  color: FROST_DEEP,
                  margin: '0 0 1.5rem',
                }}
              >
                Step-by-Step Protocol
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                  gap: '1.5rem',
                }}
              >
                {[
                  {
                    step: 'Step 1',
                    title: '30\u201340 Power Breaths',
                    body: 'Inhale fully through nose or mouth (belly then chest). Exhale passively \u2014 let the air fall out. Repeat 30\u201340 times. Maintain a steady rhythm (about 2 seconds per cycle). You may feel tingling and lightheadedness \u2014 this is expected.',
                  },
                  {
                    step: 'Step 2',
                    title: 'The Retention',
                    body: 'After the last exhale, hold your breath with lungs empty. Relax completely. Time the hold. Beginners typically achieve 1\u20132 minutes; experienced practitioners 2\u20133+ minutes. Do not force.',
                  },
                  {
                    step: 'Step 3',
                    title: 'Recovery Breath',
                    body: 'Inhale deeply, hold for 15 seconds with lungs full, squeezing gently as if pushing air into your back and head. Then release completely.',
                  },
                  {
                    step: 'Step 4',
                    title: 'Repeat',
                    body: 'Complete 3\u20134 rounds total. Each subsequent round typically produces longer retention times as blood chemistry shifts. Rest between rounds \u2014 no rush.',
                  },
                ].map((s, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: FROST_DEEP,
                        margin: '0 0 0.25rem',
                      }}
                    >
                      {s.step}
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
                      {s.title}
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Physiological Effects Grid */}
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
              Physiological Effects
            </h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem',
            }}
          >
            {[
              {
                title: 'Respiratory Alkalosis',
                body: 'Blood pH rises to ~7.75 (normal: 7.35\u20137.45). CO2 drops, bicarbonate buffers shift. This is temporary and self-resolving. The alkalotic state changes how oxygen binds to hemoglobin and sensitizes certain neural pathways.',
              },
              {
                title: 'Intermittent Hypoxia',
                body: 'SpO2 drops to ~50% during retention (normal: 95\u2013100%). This triggers HIF-1\u03b1 expression and EPO production \u2014 the same pathway altitude training uses to enhance oxygen-carrying capacity.',
              },
              {
                title: 'Epinephrine Surge',
                body: '2\u20133x baseline epinephrine within minutes. Kox et al. (2014) showed trained WHM practitioners produced epinephrine levels comparable to first-time bungee jumpers \u2014 but in a controlled, voluntary context.',
              },
              {
                title: 'Cortisol Stays Normal',
                body: 'Unlike acute stress, WHM breathing does NOT elevate cortisol significantly. This dissociation between epinephrine (high) and cortisol (normal) is unusual and scientifically notable \u2014 most stressors raise both in tandem.',
              },
            ].map((card, i) => (
              <ScrollReveal key={i}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderTop: `3px solid ${FROST_MID}`,
                    borderRadius: '2px',
                    padding: '1.5rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.625rem',
                    }}
                  >
                    {card.title}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {card.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Advanced Variations Accordions */}
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
              Advanced Variations
            </h3>
          </ScrollReveal>
          <div style={{ marginBottom: '2.5rem' }}>
            {[
              {
                title: 'Power Breathing',
                body: 'Increase to 50\u201360 breaths with more forceful exhales. Add breath holds at the top of inhale between rounds. The increased ventilation deepens the alkalotic state and can produce more pronounced body sensation and longer retentions. For experienced practitioners only \u2014 the stronger hyperventilation increases fainting risk if practiced while standing.',
              },
              {
                title: 'Push-Up Challenge',
                body: 'During the empty-lung retention, perform push-ups until you must breathe. The low-CO2 state suppresses the urge to breathe, allowing surprising reps \u2014 often 20\u201340% more than normal. This is the WHM\u2019s signature demonstration exercise and illustrates the dissociation between oxygen availability and the breathing urge. The urge to breathe is primarily CO2-driven, not oxygen-driven.',
              },
              {
                title: 'Cold Shower Breath-Hold',
                body: 'Perform 2\u20133 breathing rounds seated safely, then enter the cold shower during the retention phase. The combination amplifies the adrenergic response significantly. The cold shock and the breath-hold both independently trigger sympathoadrenal activation; combined, the effect is synergistic. CRITICAL: Never practice breath-holds submerged or near water deep enough to drown.',
              },
              {
                title: 'Brown Fat Activation Breathing',
                body: 'Focus breathing into the intercostal muscles and upper back area \u2014 consciously expanding the ribcage laterally and posteriorly rather than lifting the shoulders. Some evidence suggests this may preferentially activate brown adipose tissue in the supraclavicular region, where BAT density is highest in adults. The mechanism is speculative but the technique is low-risk and complementary to cold exposure.',
              },
            ].map((item, i) => (
              <ScrollReveal key={i}>
                <div
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    style={{
                      cursor: 'pointer',
                      padding: '1rem 0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        margin: 0,
                        fontStyle: 'normal',
                      }}
                    >
                      {item.title} {openAccordion === i ? '▾' : '▸'}
                    </h4>
                  </div>
                  {openAccordion === i && (
                    <div style={{ paddingBottom: '1.25rem' }}>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
                        {item.body}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Safety callout */}
          <ScrollReveal>
            <div
              style={{
                background: '#FDF2F2',
                borderLeft: '4px solid #DC2626',
                padding: '1.5rem',
                borderRadius: '0 2px 2px 0',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#991B1B',
                  margin: '0 0 0.5rem',
                }}
              >
                Safety Warning
              </p>
              <p
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: '#991B1B',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                NEVER practice breathing exercises in or near water, while standing, while driving,
                or anywhere a loss of consciousness could cause injury or death. Always practice lying
                down or seated in a safe environment. Loss of consciousness during breath retention is
                possible, especially in the first weeks of practice.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          4. COLD EXPOSURE PROTOCOL
      ══════════════════════════════════════════════════════ */}
      <section
        id="cold"
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
              Pillar Two &mdash; Progressive Cold Adaptation
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
              }}
            >
              Cold Exposure Protocol
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
              The WHM cold protocol is progressive and methodical. You do NOT jump into an ice bath
              on day one. The 10-week plan builds tolerance gradually, always pairing cold with the
              breathing technique for maximum adaptation.
            </p>
          </ScrollReveal>

          {/* 10-Week Progressive Timeline */}
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
              10-Week Progressive Timeline
            </h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem',
            }}
          >
            {[
              {
                phase: 'Week 1',
                title: 'Breathing Only',
                body: 'Master 3\u20134 rounds of the breathing technique before any cold exposure. Build the physiological foundation. Understand your baseline retention times. Practice lying down in a safe space, never standing.',
              },
              {
                phase: 'Weeks 2\u20133',
                title: 'Cold Showers',
                body: 'End warm showers with 30 seconds of cold water. Gradually increase to 1\u20132 minutes over these two weeks. Focus on controlled breathing during the cold shock. Notice when the shock transitions to acceptance.',
              },
              {
                phase: 'Weeks 4\u20135',
                title: 'Extended Cold',
                body: 'Full cold showers (2\u20133 minutes). Practice breathing rounds before entering. Notice the shift from shock response to calm adaptation. The nervous system is beginning to recalibrate its baseline.',
              },
              {
                phase: 'Weeks 6\u20137',
                title: 'Breath-Hold in Cold',
                body: 'Combine retention holds with cold exposure. Perform breathing rounds before entering cold, then enter during a retention phase. This is an advanced technique \u2014 build gradually and never practice submerged.',
              },
              {
                phase: 'Week 8',
                title: 'Ice Bath Introduction',
                body: 'First ice bath: 50\u00b0F (10\u00b0C) water, 2 minutes maximum. Complete breathing rounds first. Have someone present. Exit if shivering becomes uncontrollable. The body is generating heat \u2014 that is the goal.',
              },
              {
                phase: 'Weeks 9\u201310',
                title: 'Integration',
                body: 'Extend ice bath duration (up to 5 minutes at 50\u00b0F). Begin outdoor cold exposure when conditions allow. Design your own protocol based on your body\u2019s adaptation response. Consistency matters more than extremity.',
              },
            ].map((phase, i) => (
              <ScrollReveal key={i}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderLeft: `4px solid ${FROST_MID}`,
                    borderRadius: '0 2px 2px 0',
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
                      color: FROST_MID,
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {phase.phase}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.625rem',
                    }}
                  >
                    {phase.title}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {phase.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Temperature Reference Card */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${FROST_MID}`,
                background: FROST_PALE,
                borderRadius: '0 2px 2px 0',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: FROST_DEEP,
                  margin: '0 0 1rem',
                }}
              >
                Temperature Reference
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                  gap: '0.75rem',
                }}
              >
                {[
                  { label: 'Cold shower', value: '50\u201360\u00b0F (10\u201315\u00b0C)' },
                  { label: 'Ice bath (beginner)', value: '~50\u00b0F (10\u00b0C), 2 min max' },
                  { label: 'Ice bath (advanced)', value: '35\u201341\u00b0F (2\u20135\u00b0C), up to 10 min' },
                  { label: 'Outdoor cold', value: 'Varies \u2014 wind chill is a major factor' },
                ].map((item, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: FROST_DEEP,
                        margin: '0 0 0.2rem',
                      }}
                    >
                      {item.label}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', margin: 0 }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Søberg Principle Callout */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${FROST_MID}`,
                background: FROST_PALE,
                borderRadius: '0 2px 2px 0',
                padding: '1.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: FROST_DEEP,
                  margin: '0 0 0.625rem',
                }}
              >
                The S&oslash;berg Principle
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>
                Dr. Susanna S&oslash;berg&apos;s research: end on cold &mdash; do not rewarm passively. Let
                the body generate its own heat through shivering and thermogenesis. The metabolic
                benefit comes from the rewarming process, not the cold itself. Minimum effective dose:
                11 minutes of cold exposure per week, spread across sessions (not all at once). This
                applies to WHM ice bath sessions as much as to cold showers.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          5. THE SCIENCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="science"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${FROST_PALE})`,
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
              Mechanisms &amp; Pathways
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
              }}
            >
              The Science
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
              The WHM engages multiple physiological systems simultaneously. Understanding the
              mechanisms helps practitioners optimize their practice and set realistic expectations
              about what the science does and doesn&apos;t support.
            </p>
          </ScrollReveal>

          {/* Mechanistic Cascade — vertical timeline */}
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
              Mechanistic Cascade
            </h3>
            <div style={{ marginBottom: '3.5rem' }}>
              {[
                'Cyclic hyperventilation \u2192 respiratory alkalosis (pH \u2191) + hypocapnia (CO\u2082 \u2193)',
                '\u2192 intermittent hypoxia during retention (SpO\u2082 ~50%)',
                '\u2192 sympathoadrenal activation: epinephrine \u2191 2\u20133\u00d7, norepinephrine \u2191 200\u2013300%',
                '\u2192 immune modulation: anti-inflammatory IL-10 \u2191 194%, pro-inflammatory TNF-\u03b1 \u2193, IL-6 \u2193',
                '\u2192 cold exposure \u2192 brown adipose tissue activation + peripheral vasoconstriction',
                '\u2192 cumulative adaptation: improved autonomic flexibility, cold tolerance, subjective well-being',
              ].map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flexShrink: 0,
                      width: '20px',
                    }}
                  >
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: FROST_MID,
                        flexShrink: 0,
                        marginTop: '0.35rem',
                      }}
                    />
                    {i < 5 && (
                      <div
                        style={{
                          width: '2px',
                          flex: 1,
                          background: `${FROST_MID}60`,
                          minHeight: '1.5rem',
                        }}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text)',
                      lineHeight: 1.75,
                      paddingBottom: '1rem',
                      margin: 0,
                    }}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* 6 Mechanism Cards */}
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
              Mechanisms
            </h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem',
            }}
          >
            {[
              {
                title: 'Autonomic Nervous System Control',
                badge: 'Well-Established',
                badgeBg: '#E6F4EA',
                badgeColor: '#1B7A3D',
                body: 'The WHM allows voluntary influence over the sympathetic nervous system. Kox et al. (2014) demonstrated this conclusively \u2014 trained subjects could suppress innate immune response via breathing, representing the first proof of voluntary autonomic control in healthy adults.',
              },
              {
                title: 'Immune Modulation',
                badge: 'Well-Established',
                badgeBg: '#E6F4EA',
                badgeColor: '#1B7A3D',
                body: 'Anti-inflammatory cytokine IL-10 increases 194% while pro-inflammatory cytokines decrease significantly. The mechanism is primarily epinephrine-mediated suppression of inflammatory pathways through adrenergic receptors on immune cells.',
              },
              {
                title: 'PAG Activation',
                badge: 'Preliminary',
                badgeBg: '#FFF3E0',
                badgeColor: '#E65100',
                body: 'Muzik et al. (2018) fMRI study found activation of the periaqueductal gray (PAG) \u2014 a brainstem region involved in pain modulation and autonomic control \u2014 during WHM practice. Critical caveat: n=1 (Wim Hof himself). Needs replication in a broader sample.',
              },
              {
                title: 'Intercostal Thermogenesis',
                badge: 'Preliminary',
                badgeBg: '#FFF3E0',
                badgeColor: '#E65100',
                body: 'Muzik et al. (2018) also reported forced intercostal muscle activation generating heat independent of brown fat. If confirmed in larger samples, this mechanism would be physiologically novel \u2014 a form of heat generation not previously characterized.',
              },
              {
                title: 'Endocannabinoid Release',
                badge: 'Inferred',
                badgeBg: '#E3F2FD',
                badgeColor: '#1565C0',
                body: 'Cold stress is known to activate the endocannabinoid system (Koltyn et al.). The euphoria reported during ice bath recovery may partly involve anandamide release, but this has not been measured specifically during WHM practice \u2014 the link is physiologically plausible but not directly evidenced.',
              },
              {
                title: 'Vagal Tone',
                badge: 'Contested',
                badgeBg: '#F5F5F5',
                badgeColor: '#616161',
                body: 'Some practitioners report improved HRV, but the acute WHM breathing phase is strongly sympathetic \u2014 not vagal. Long-term vagal benefits may occur through cold exposure component and the recovery periods between rounds, but direct evidence for WHM-specific HRV improvement is limited.',
              },
            ].map((card, i) => (
              <ScrollReveal key={i}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    padding: '1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        margin: 0,
                      }}
                    >
                      {card.title}
                    </p>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.125rem 0.5rem',
                        borderRadius: '2px',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        background: card.badgeBg,
                        color: card.badgeColor,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {card.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Honest Assessment Callout */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${FROST_MID}`,
                background: FROST_PALE,
                borderRadius: '0 2px 2px 0',
                padding: '1.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: FROST_DEEP,
                  margin: '0 0 0.625rem',
                }}
              >
                Honest Assessment: Cortisol Dissociation
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.8, margin: 0 }}>
                WHM breathing produces high epinephrine without corresponding cortisol elevation. This
                is scientifically unusual &mdash; most stressors that raise epinephrine also raise
                cortisol. The mechanism is not fully understood but may relate to the voluntary,
                controlled nature of the practice. This does <strong>NOT</strong> mean WHM
                &ldquo;reduces cortisol&rdquo; &mdash; it means the practice doesn&apos;t elevate it
                despite the adrenergic activation. The distinction matters for how we interpret the
                method&apos;s mental health effects.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          6. THE EVIDENCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="evidence"
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
              Clinical Research
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
              }}
            >
              The Evidence
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
              The evidence base for the WHM is growing but still modest compared to established
              therapies. Here is an honest assessment of what the research shows and what it
              doesn&apos;t.
            </p>
          </ScrollReveal>

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
                source="Kox et al., PNAS (2014)"
                stat="n=24 (12 trained, 12 control)"
                detail="Gold-standard endotoxemia challenge. Trained group showed voluntary immune suppression via breathing. First proof that the autonomic nervous system and innate immune response can be voluntarily influenced."
                url="https://pubmed.ncbi.nlm.nih.gov/24799686/"
                accentColor={FROST_MID}
                accentTextColor={FROST_DEEP}
              />
              <StatCard
                source="Buijze et al., PLOS ONE (2016)"
                stat="n=3,018"
                detail="Largest cold-exposure RCT. 30/60/90 seconds of cold shower ending. All cold groups showed 29% fewer sick days vs. control. Duration didn\u2019t matter \u2014 the cold stimulus itself was the active ingredient."
                url="https://pubmed.ncbi.nlm.nih.gov/27631616/"
                accentColor={FROST_MID}
                accentTextColor={FROST_DEEP}
              />
              <StatCard
                source="Almahayni & Hammond (2024)"
                stat="Systematic Review"
                detail="Reviewed all published WHM studies. Concluded: consistent evidence for immune modulation and autonomic control, preliminary evidence for mood and pain, insufficient evidence for disease-specific claims."
                url="https://pubmed.ncbi.nlm.nih.gov/38270553/"
                accentColor={FROST_MID}
                accentTextColor={FROST_DEEP}
              />
            </div>
          </ScrollReveal>

          {/* Evidence Summary Table */}
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
              Evidence Summary
            </h3>
            <div style={{ overflowX: 'auto', marginBottom: '3.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${FROST_MID}` }}>
                    {['Domain', 'Evidence Level', 'Key Finding'].map(h => (
                      <th
                        key={h}
                        style={{
                          textAlign: 'left',
                          padding: '0.75rem 1rem',
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: FROST_DEEP,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Immune modulation', 'Strong (RCT)', 'Voluntary suppression of innate immune response (Kox 2014)'],
                    ['Sick day reduction', 'Strong (RCT)', '29% fewer self-reported sick days (Buijze 2016, n=3018)'],
                    ['Breathing components', 'Moderate', 'Alkalosis, hypoxia, epinephrine surge well-documented'],
                    ['Depression / mood', 'Preliminary', 'Case reports and small studies; no large RCTs'],
                    ['Autoimmune disease', 'Preliminary', 'Anecdotal reports; Buijze pilot in axial spondyloarthritis'],
                    ['Cardiovascular', 'Indirect', 'Cold exposure cardiovascular benefits established; WHM-specific data limited'],
                    ['Brain / neuroimaging', 'Preliminary', 'PAG activation (Muzik 2018, n=1); needs replication'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          style={{
                            padding: '0.75rem 1rem',
                            color: j === 0 ? 'var(--color-text)' : 'var(--color-text-muted)',
                            fontWeight: j === 0 ? 500 : 400,
                            lineHeight: 1.6,
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Evidence vs Claims */}
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
              Evidence vs. Claims
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: '1.5rem',
              }}
            >
              <div
                style={{
                  background: '#F0FAF4',
                  border: '1px solid #A7D7B8',
                  borderTop: '3px solid #2E7D52',
                  borderRadius: '2px',
                  padding: '1.5rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#2E7D52',
                    margin: '0 0 1rem',
                  }}
                >
                  Supported by Evidence
                </p>
                <ul
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text)',
                    lineHeight: 1.9,
                    paddingLeft: '1.25rem',
                    margin: 0,
                  }}
                >
                  <li>Voluntary autonomic modulation</li>
                  <li>Acute immune suppression (innate arm)</li>
                  <li>Catecholamine (epinephrine, norepinephrine) release</li>
                  <li>Cold tolerance development over weeks</li>
                  <li>Reduced self-reported sick days</li>
                </ul>
              </div>
              <div
                style={{
                  background: '#FDF6EE',
                  border: '1px solid #E4C28B',
                  borderTop: '3px solid #C47A1A',
                  borderRadius: '2px',
                  padding: '1.5rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#C47A1A',
                    margin: '0 0 1rem',
                  }}
                >
                  Weakly Supported or Unsubstantiated
                </p>
                <ul
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text)',
                    lineHeight: 1.9,
                    paddingLeft: '1.25rem',
                    margin: 0,
                  }}
                >
                  <li>Curing autoimmune disease</li>
                  <li>Cancer treatment or prevention</li>
                  <li>Altitude sickness prevention</li>
                  <li>Replacing medical treatment</li>
                  <li>Long-term adaptive immune enhancement</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          7. SAFETY & CONTRAINDICATIONS
      ══════════════════════════════════════════════════════ */}
      <section
        id="safety"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${FROST_PALE})`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>

          {/* Critical Safety Banner */}
          <ScrollReveal>
            <div
              style={{
                background: '#FDF2F2',
                borderLeft: '4px solid #DC2626',
                padding: '1.5rem',
                borderRadius: '0 2px 2px 0',
                marginBottom: '3rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#991B1B',
                  margin: '0 0 0.625rem',
                }}
              >
                Critical Safety Information
              </p>
              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#991B1B',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                32 documented drowning deaths have been associated with the Wim Hof breathing
                technique practiced in or near water. NEVER practice breathing exercises in water,
                near water, while standing, or while driving. This is not a precaution &mdash; it is
                a clinical necessity.
              </p>
            </div>
          </ScrollReveal>

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
              Risk Assessment
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 2.5rem',
              }}
            >
              Safety &amp; Contraindications
            </h2>
          </ScrollReveal>

          {/* 3 Contraindication Tiers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            {[
              {
                title: 'Absolute Contraindications',
                subtitle: 'Do NOT practice without medical clearance',
                accentBorder: '#DC2626',
                accentBg: '#FDF2F2',
                accentText: '#991B1B',
                items: [
                  'Cardiovascular disease (uncontrolled)',
                  'Epilepsy or seizure disorders',
                  'Pregnancy',
                  'Kidney disease',
                  'Cold urticaria',
                  'History of stroke or TIA',
                ],
              },
              {
                title: 'Requires Medical Clearance',
                subtitle: 'Consult your doctor first',
                accentBorder: '#D97706',
                accentBg: '#FFFBEB',
                accentText: '#92400E',
                items: [
                  'Hypertension on medication',
                  'Raynaud\u2019s phenomenon (secondary)',
                  'Migraine disorders',
                  'SSRI / SNRI medication',
                  'Children under 16',
                ],
              },
              {
                title: 'Relative Cautions',
                subtitle: 'Proceed with awareness',
                accentBorder: FROST_MID,
                accentBg: FROST_PALE,
                accentText: FROST_DEEP,
                items: [
                  'Recent surgery',
                  'Asthma (controlled)',
                  'History of panic attacks',
                  'First trimester recovery',
                ],
              },
            ].map((tier, i) => (
              <ScrollReveal key={i}>
                <div
                  style={{
                    background: tier.accentBg,
                    border: `1px solid ${tier.accentBorder}40`,
                    borderTop: `3px solid ${tier.accentBorder}`,
                    borderRadius: '2px',
                    padding: '1.5rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: tier.accentText,
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {tier.title}
                  </p>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: tier.accentText,
                      fontStyle: 'italic',
                      margin: '0 0 1rem',
                      opacity: 0.8,
                    }}
                  >
                    {tier.subtitle}
                  </p>
                  <ul
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text)',
                      lineHeight: 1.9,
                      paddingLeft: '1.25rem',
                      margin: 0,
                    }}
                  >
                    {tier.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Documented Incidents */}
          <ScrollReveal>
            <div
              style={{
                background: '#FDF2F2',
                border: '1px solid #FECACA',
                borderLeft: '4px solid #DC2626',
                borderRadius: '0 2px 2px 0',
                padding: '1.5rem',
                marginBottom: '2.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#991B1B',
                  margin: '0 0 1rem',
                }}
              >
                Documented Incidents
              </p>
              {[
                {
                  label: 'Goh & Tham (2021, Wilderness & Environmental Medicine)',
                  body: 'Case report of cold water drowning during WHM breathing. Patient performed breathing rounds in a pool, lost consciousness during breath retention, and drowned.',
                },
                {
                  label: 'Metzger family lawsuit (2022)',
                  body: 'Filed against Innerfire B.V. (Wim Hof\u2019s company) after a 17-year-old drowned during WHM breathing practice in a pool. The case raised questions about marketing and safety disclosure.',
                },
                {
                  label: 'Sunday Times investigation (2024)',
                  body: 'Documented 32 drowning deaths associated with WHM-style breathing near water. The investigation prompted review of the method\u2019s safety materials and online instructional videos.',
                },
              ].map((incident, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: i < 2 ? '1rem' : 0,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#991B1B',
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {incident.label}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.7, margin: 0 }}>
                    {incident.body}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Responsible Practice Guidelines */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${FROST_MID}`,
                background: FROST_PALE,
                borderRadius: '0 2px 2px 0',
                padding: '1.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: FROST_DEEP,
                  margin: '0 0 1rem',
                }}
              >
                11 Responsible Practice Guidelines
              </p>
              <ol
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text)',
                  lineHeight: 2,
                  paddingLeft: '1.5rem',
                  margin: 0,
                }}
              >
                <li>Always practice breathing lying down or seated on the ground</li>
                <li>Never practice in or near water (pools, baths, lakes, ocean)</li>
                <li>Never practice while standing &mdash; loss of consciousness is possible</li>
                <li>Never practice while driving or operating machinery</li>
                <li>Progress cold exposure gradually over weeks, not days</li>
                <li>Never do ice baths alone &mdash; always have someone present</li>
                <li>Exit cold immediately if shivering becomes uncontrollable</li>
                <li>Do not combine with alcohol or recreational drugs</li>
                <li>Monitor for signs of hypothermia: confusion, slurred speech, drowsiness</li>
                <li>If you have ANY medical condition, consult your doctor first</li>
                <li>The breathing technique is not meditation &mdash; it is physiologically activating</li>
              </ol>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          8. TRAINING & COURSES
      ══════════════════════════════════════════════════════ */}
      <section
        id="training"
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
              Learning Paths
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 1.25rem',
              }}
            >
              Training &amp; Courses
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
              Wim Hof&apos;s company Innerfire B.V. offers structured courses. You can also learn
              the method effectively through free resources &mdash; the science and technique are
              well-documented in publicly available papers and videos.
            </p>
          </ScrollReveal>

          {/* Course Table */}
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
              Course Options
            </h3>
            <div style={{ overflowX: 'auto', marginBottom: '3rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${FROST_MID}` }}>
                    {['Course', 'Format', 'Price', 'Best For'].map(h => (
                      <th
                        key={h}
                        style={{
                          textAlign: 'left',
                          padding: '0.75rem 1rem',
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: FROST_DEEP,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Free Mini Class', 'Online video', 'Free', 'First taste \u2014 basic breathing + cold shower'],
                    ['Classic 10-Week', 'Online self-paced', '$119', 'Structured progressive program'],
                    ['Fundamentals', 'Online + coaching', '$329', 'Deeper practice with guidance'],
                    ['Power of Mind', 'Online advanced', '$469', 'Advanced techniques, mental training'],
                    ['WHM App', 'iOS / Android', '$5.99/mo', 'Daily guided sessions, timers'],
                    ['Live Workshops', 'In-person', '$50\u2013150', 'Community practice, instructor-led'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          style={{
                            padding: '0.75rem 1rem',
                            color: j === 0 ? 'var(--color-text)' : 'var(--color-text-muted)',
                            fontWeight: j === 0 ? 500 : 400,
                            lineHeight: 1.6,
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Instructor Certification */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${FROST_MID}`,
                background: FROST_PALE,
                borderRadius: '0 2px 2px 0',
                padding: '1.5rem',
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
                  color: FROST_DEEP,
                  margin: '0 0 0.625rem',
                }}
              >
                Instructor Certification Path
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.8, margin: '0 0 0.75rem' }}>
                Three modules: Academy (online theory) &rarr; Expedition (5-day immersive) &rarr;
                Assessment. Total cost: $5,000&ndash;$8,000 plus annual licensing fee
                (&euro;499/year). First aid certification and insurance are required. The
                certification path is one of the more demanding among wellness modalities.
              </p>
            </div>
          </ScrollReveal>

          {/* Self-Study Path */}
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
              Self-Study Path (5 Steps)
            </h3>
            <div style={{ marginBottom: '2.5rem' }}>
              {[
                'Watch the free Mini Class on wimhofmethod.com',
                'Practice the basic breathing technique daily for 2 weeks',
                'Add cold showers (30 seconds, building to 2 minutes over 2\u20133 weeks)',
                'Read \u201cThe Wim Hof Method\u201d (2020) and/or \u201cWhat Doesn\u2019t Kill Us\u201d by Scott Carney',
                'Consider the Classic 10-Week course for structured progression with accountability',
              ].map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: FROST_MID,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: '0.125rem',
                    }}
                  >
                    {i + 1}
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Cost Callout */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${FROST_MID}`,
                background: FROST_PALE,
                borderRadius: '0 2px 2px 0',
                padding: '1.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: FROST_DEEP,
                  margin: '0 0 0.625rem',
                }}
              >
                On Cost
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.8, margin: 0 }}>
                You can practice the complete Wim Hof Method for free. The breathing technique is
                documented in published papers and freely available videos. Cold water costs nothing.
                The paid courses add structure, community, and progressive programming &mdash; but
                the method itself is open. The science is in peer-reviewed journals. The technique
                is in public domain. Start with the free resources before committing to paid courses.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          9. CONNECTIONS
      ══════════════════════════════════════════════════════ */}
      <section
        id="connect"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${FROST_PALE})`,
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
              The Wider Web
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 2.5rem',
              }}
            >
              Connections
            </h2>
          </ScrollReveal>

          {/* Comparison Table */}
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
              WHM vs Tummo vs Pranayama
            </h3>
            <div style={{ overflowX: 'auto', marginBottom: '3.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${FROST_MID}` }}>
                    {['Aspect', 'Wim Hof Method', 'Tummo', 'Pranayama'].map(h => (
                      <th
                        key={h}
                        style={{
                          textAlign: 'left',
                          padding: '0.75rem 1rem',
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: FROST_DEEP,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Origin', 'Netherlands, 2000s', 'Tibetan Buddhism, 11th c.', 'Vedic/Yoga, ~500 BCE'],
                    ['Breathing', 'Cyclic hyperventilation + retention', 'Vase breathing + visualization', 'Many techniques (kapalabhati, nadi shodhana, etc.)'],
                    ['Cold Element', 'Central \u2014 progressive protocol', 'Central \u2014 inner heat generation', 'Not typically included'],
                    ['Visualization', 'Minimal', 'Essential \u2014 flame imagery', 'Varies by tradition'],
                    ['Goal', 'Autonomic control, health', 'Spiritual realization, inner heat', 'Prana regulation, consciousness'],
                    ['Training', 'Online/workshop, weeks', 'Monastic/retreat, years', 'Guru/teacher, months\u2013years'],
                    ['Evidence', 'Growing (RCTs exist)', 'Limited (Benson 1982, Kozhevnikov 2013)', 'Moderate (varies by technique)'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          style={{
                            padding: '0.75rem 1rem',
                            color: j === 0 ? 'var(--color-text)' : 'var(--color-text-muted)',
                            fontWeight: j === 0 ? 500 : 400,
                            lineHeight: 1.6,
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Hormesis Framework */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: `3px solid ${FROST_MID}`,
                background: FROST_PALE,
                borderRadius: '0 2px 2px 0',
                padding: '1.5rem',
                marginBottom: '3.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: FROST_DEEP,
                  margin: '0 0 0.625rem',
                }}
              >
                The Hormesis Framework
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.8, margin: 0 }}>
                The WHM is fundamentally a hormetic practice &mdash; controlled stress producing
                adaptive resilience. This principle connects it to cold exposure (temperature page),
                fasting, exercise, and certain breathwork practices. The key is the dose: enough
                stress to trigger adaptation, not so much as to cause damage. The WHM&apos;s
                10-week progressive structure is a careful attempt to calibrate this dose. The
                failures of the method &mdash; drowning incidents, cardiovascular events &mdash;
                almost always involve people who skipped the progressive phase.
              </p>
            </div>
          </ScrollReveal>

          {/* Cross-Link Cards */}
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
              Related Pages
            </h3>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem',
            }}
          >
            {[
              {
                href: '/temperature',
                label: 'Temperature',
                desc: 'The science of deliberate cold and heat exposure. WHM\u2019s cold pillar in broader context.',
              },
              {
                href: '/breathe',
                label: 'Breathe',
                desc: '14+ breathing techniques including the cyclic patterns that underpin WHM breathwork.',
              },
              {
                href: '/nervous-system',
                label: 'Nervous System',
                desc: 'The autonomic nervous system that WHM trains \u2014 sympathetic activation and vagal recovery.',
              },
              {
                href: '/meditate',
                label: 'Meditate',
                desc: 'The commitment pillar overlaps with meditative discipline. WHM breathing is activating, not calming.',
              },
              {
                href: '/fascia',
                label: 'Fascia',
                desc: 'Cold exposure affects fascial tissue. Temperature-induced changes in tissue hydration and stiffness.',
              },
            ].map(card => (
              <ScrollReveal key={card.href}>
                <Link href={card.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      borderTop: `3px solid ${FROST_MID}`,
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
                        color: FROST_DEEP,
                        margin: '0 0 0.5rem',
                      }}
                    >
                      {card.label}
                    </p>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA Nav Bar */}
          <ScrollReveal>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '1.5rem',
              }}
            >
              {[
                { href: '/temperature',    label: 'Temperature'   },
                { href: '/breathe',        label: 'Breathe'       },
                { href: '/nervous-system', label: 'Nervous System'},
                { href: '/meditate',       label: 'Meditate'      },
                { href: '/fascia',         label: 'Fascia'        },
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
                    color: FROST_MID,
                    textDecoration: 'none',
                    borderBottom: `1px solid ${FROST_MID}60`,
                    paddingBottom: '0.2rem',
                    transition: 'opacity 200ms ease',
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
          10. CLOSING QUOTE + BOTTOM NAV
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(5rem, 9vw, 8rem) max(1.5rem, 8vw)',
          background: FROST_DEEP,
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          <blockquote
            style={{
              margin: '0 auto 4rem',
              maxWidth: '42ch',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.375rem, 3vw, 2rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#EEF7FA',
                lineHeight: 1.6,
                margin: '0 0 1.25rem',
              }}
            >
              &ldquo;What I am capable of, everybody can learn.&rdquo;
            </p>
            <cite
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontStyle: 'normal',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: FROST_LIGHT,
              }}
            >
              Wim Hof
            </cite>
          </blockquote>

          {/* Bottom Nav */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <Link
              href="/temperature"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                color: FROST_LIGHT,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: `1px solid ${FROST_LIGHT}60`,
                paddingBottom: '0.25rem',
                transition: 'opacity 200ms ease',
              }}
            >
              &larr; Temperature
            </Link>
            <Link
              href="/reflexology"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                color: FROST_LIGHT,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: `1px solid ${FROST_LIGHT}60`,
                paddingBottom: '0.25rem',
                transition: 'opacity 200ms ease',
              }}
            >
              Reflexology &rarr;
            </Link>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
