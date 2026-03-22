'use client';

import Link from 'next/link';
import { CERTIFICATIONS } from './certifications';
import { MODALITY_META, Modality } from './types';

// ─── Learning Order Data ──────────────────────────────────────────────────────

interface LearningNode {
  order: number;
  modality: Modality;
  rationale: string;
  duration: string;
  path: string;
}

const LEARNING_ORDER: LearningNode[] = [
  {
    order: 1,
    modality: 'nervous-system',
    rationale:
      'The foundation. Understanding polyvagal theory and autonomic states explains why every other modality works — and why sequencing matters. All regulation starts here.',
    duration: '2–4 weeks',
    path: '/nervous-system',
  },
  {
    order: 2,
    modality: 'breathwork',
    rationale:
      'The fastest lever for nervous system regulation. Breath directly controls the vagus nerve — it is the only part of the autonomic system you can consciously drive. Daily practice begins here.',
    duration: '4–8 weeks',
    path: '/breathe',
  },
  {
    order: 3,
    modality: 'meditation',
    rationale:
      'Builds interoceptive awareness — the ability to sense internal body states — which underpins every other modality. Ongoing practice is the substrate on which everything else sits.',
    duration: 'Ongoing',
    path: '/meditate',
  },
  {
    order: 4,
    modality: 'fascia',
    rationale:
      'The structural layer that transmits force, stores tension, and communicates with the nervous system via mechanoreceptors. Foam rolling and fascial fitness daily changes what the body can receive.',
    duration: '4–6 weeks',
    path: '/fascia',
  },
  {
    order: 5,
    modality: 'yoga',
    rationale:
      'Combines breath, movement, and fascial work in a single practice. The RYT-200 training is the natural bridge from personal practice to teaching others, integrating all previous foundations.',
    duration: '6–12 months (RYT-200)',
    path: '/yoga',
  },
  {
    order: 6,
    modality: 'somatics',
    rationale:
      'Trauma-informed bodywork that releases stored survival responses from fascia and the nervous system. Essential for anyone working with others — it provides the safety framework for touch and movement.',
    duration: '3–6 months',
    path: '/somatics',
  },
  {
    order: 7,
    modality: 'reiki',
    rationale:
      'Energy work adds a subtle vibrational layer to sessions. Requires external attunement from a Reiki Master — it cannot be self-taught. Levels deepen over months and years of practice.',
    duration: 'Levels span months–years',
    path: '/reiki',
  },
  {
    order: 8,
    modality: 'sound-healing',
    rationale:
      'Vibrational tools (singing bowls, tuning forks, gongs) complement every modality above, directly entraining brainwaves and creating acoustic massage of fascia and the nervous system.',
    duration: '2–4 months',
    path: '/sound-healing',
  },
];

// ─── Ordered modality list for certification grouping ────────────────────────

const CERT_MODALITY_ORDER: Modality[] = [
  'nervous-system',
  'breathwork',
  'meditation',
  'fascia',
  'yoga',
  'somatics',
  'reiki',
  'sound-healing',
];

// ─── Format badge colors ──────────────────────────────────────────────────────

const FORMAT_COLORS: Record<'in-person' | 'online' | 'hybrid', { bg: string; text: string }> = {
  'in-person': { bg: '#FEF3E2', text: '#8A5A1C' },
  'online':    { bg: '#E0F4F4', text: '#2E7070' },
  'hybrid':    { bg: '#EDE9FE', text: '#592E6B' },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function TeacherPathTab() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', paddingBottom: '5rem' }}>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION A: THE FRAMEWORK
      ══════════════════════════════════════════════════════════════════════ */}

      <section style={{ marginBottom: '5rem' }}>

        {/* Section label */}
        <p
          className="section-label"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6875rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            marginBottom: '1.5rem',
          }}
        >
          Section A
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(28px, 4vw, 42px)',
            lineHeight: 1.2,
            color: 'var(--color-text)',
            marginBottom: '1.75rem',
          }}
        >
          The Unified Framework
        </h2>

        <div style={{ maxWidth: '68ch' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.8,
              color: 'var(--color-text)',
              marginBottom: '1.25rem',
            }}
          >
            Every wellness modality — breath, movement, energy work, sound — ultimately acts on two
            foundational layers of the body. The{' '}
            <strong>nervous system</strong> is the control layer: the polyvagal state the body is
            in determines what kind of input it can safely receive. A body locked in sympathetic
            activation (fight-or-flight) or dorsal shutdown cannot integrate gentle touch, deep
            fascia work, or meditative stillness. Regulation always comes first.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.8,
              color: 'var(--color-text)',
              marginBottom: '1.25rem',
            }}
          >
            <strong>Fascia</strong> is the structural layer — the continuous web of connective
            tissue that surrounds every muscle, organ, and nerve. It transmits mechanical force
            throughout the body, stores the physical imprint of unresolved stress and trauma, and
            communicates directly with the nervous system through mechanoreceptors embedded in its
            matrix. Every physical modality reshapes fascia, whether or not that is its stated
            intention.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.8,
              color: 'var(--color-text)',
              marginBottom: 0,
            }}
          >
            The teaching framework that flows from this understanding is simple:{' '}
            <strong>regulate first, then mobilize, then integrate</strong>. Breathwork and
            meditation regulate the nervous system directly. Yoga and fascia work mobilize and
            reshape the structural layer while co-regulating the autonomic state. Somatics releases
            stored survival responses from both layers. Reiki and sound healing work at the
            energetic and vibrational level of the nervous system — potent when the body is already
            regulated, and ineffective when it is not.
          </p>
        </div>

        {/* ── Flexbox Architecture Diagram ── */}
        <div
          style={{
            marginTop: '3rem',
            padding: '2rem',
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            borderRadius: 4,
            overflowX: 'auto',
          }}
        >
          {/* Modality row */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '1rem',
            }}
          >
            {(
              [
                'meditation',
                'breathwork',
                'yoga',
                'reiki',
                'sound-healing',
                'somatics',
              ] as Modality[]
            ).map((mod) => (
              <span
                key={mod}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: MODALITY_META[mod].deep,
                  background: MODALITY_META[mod].pale,
                  border: `1px solid ${MODALITY_META[mod].deep}33`,
                  borderRadius: 2,
                  padding: '0.3rem 0.75rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {MODALITY_META[mod].label}
              </span>
            ))}
          </div>

          {/* Vertical connector */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <div
              style={{
                width: 1,
                height: 28,
                background: 'var(--color-border)',
              }}
            />
          </div>

          {/* Foundation layers */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              maxWidth: 520,
              margin: '0 auto',
            }}
          >
            {/* Nervous System */}
            <div
              style={{
                background: 'var(--color-surface-raised)',
                border: '1.5px solid #8B3A62',
                borderRadius: 4,
                padding: '0.75rem 1.25rem',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#8B3A62',
                }}
              >
                Nervous System Regulation
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: '#636363',
                  margin: '0.25rem 0 0',
                  lineHeight: 1.4,
                }}
              >
                Polyvagal state · Autonomic tone · Vagal brake
              </p>
            </div>

            {/* Fascia */}
            <div
              style={{
                background: 'var(--color-surface-raised)',
                border: '1.5px solid #8A5A1C',
                borderRadius: 4,
                padding: '0.75rem 1.25rem',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#8A5A1C',
                }}
              >
                Fascial Health
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: '#636363',
                  margin: '0.25rem 0 0',
                  lineHeight: 1.4,
                }}
              >
                Connective tissue · Force transmission · Trauma storage
              </p>
            </div>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: 'var(--color-text-muted)',
              textAlign: 'center',
              marginTop: '1rem',
              marginBottom: 0,
            }}
          >
            All modalities act on one or both foundations. Regulation enables reception.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION B: LEARNING ORDER
      ══════════════════════════════════════════════════════════════════════ */}

      <section style={{ marginBottom: '5rem' }}>

        <p
          className="section-label"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6875rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            marginBottom: '1.5rem',
          }}
        >
          Section B
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(28px, 4vw, 42px)',
            lineHeight: 1.2,
            color: 'var(--color-text)',
            marginBottom: '0.75rem',
          }}
        >
          Learning Order
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.8,
            color: 'var(--color-text-muted)',
            maxWidth: '60ch',
            marginBottom: '3rem',
          }}
        >
          Each modality builds on the one before it. The sequence is not arbitrary — it follows the
          regulate-mobilize-integrate logic of the framework above.
        </p>

        {/* Timeline */}
        <div className="timeline">
          {LEARNING_ORDER.map((node, i) => {
            const meta = MODALITY_META[node.modality];
            return (
              <div
                key={node.order}
                style={{
                  position: 'relative',
                  marginBottom: i < LEARNING_ORDER.length - 1 ? '2.5rem' : 0,
                  paddingBottom: i < LEARNING_ORDER.length - 1 ? '0.25rem' : 0,
                }}
              >
                {/* Node circle */}
                <div
                  className="timeline-node"
                  style={{ background: meta.deep }}
                >
                  {node.order}
                </div>

                {/* Content */}
                <div>
                  {/* Header row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      flexWrap: 'wrap',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: 'clamp(18px, 2vw, 22px)',
                        lineHeight: 1.2,
                        color: meta.deep,
                        margin: 0,
                      }}
                    >
                      {meta.label}
                    </h3>

                    {/* Duration badge */}
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.6875rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        color: meta.deep,
                        background: meta.pale,
                        border: `1px solid ${meta.deep}33`,
                        borderRadius: 2,
                        padding: '0.2rem 0.625rem',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {node.duration}
                    </span>
                  </div>

                  {/* Rationale */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 16,
                      lineHeight: 1.75,
                      color: 'var(--color-text)',
                      marginBottom: '0.75rem',
                      maxWidth: '62ch',
                    }}
                  >
                    {node.rationale}
                  </p>

                  {/* Explore link */}
                  <Link
                    href={node.path}
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: meta.deep,
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none';
                    }}
                  >
                    Explore {meta.label} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION C: CERTIFICATION DIRECTORY
      ══════════════════════════════════════════════════════════════════════ */}

      <section>

        <p
          className="section-label"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6875rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            marginBottom: '1.5rem',
          }}
        >
          Section C
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(28px, 4vw, 42px)',
            lineHeight: 1.2,
            color: 'var(--color-text)',
            marginBottom: '0.75rem',
          }}
        >
          Certification Directory
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.8,
            color: 'var(--color-text-muted)',
            maxWidth: '60ch',
            marginBottom: '3.5rem',
          }}
        >
          Programs are organized by modality in the recommended learning sequence. Costs are
          approximate as of 2024–2025; verify current pricing with the institution before
          enrolling.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {CERT_MODALITY_ORDER.map((modality) => {
            const meta = MODALITY_META[modality];
            const certs = CERTIFICATIONS.filter((c) => c.modality === modality);

            return (
              <div key={modality}>
                {/* Modality group header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                    paddingBottom: '0.75rem',
                    borderBottom: `2px solid ${meta.deep}`,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      fontSize: 'clamp(20px, 2.5vw, 26px)',
                      lineHeight: 1.2,
                      color: meta.deep,
                      margin: 0,
                    }}
                  >
                    {meta.label}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      color: meta.deep,
                      opacity: 0.7,
                    }}
                  >
                    {certs.length} program{certs.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Certification cards */}
                {certs.length === 0 ? (
                  <div
                    className="card"
                    style={{
                      borderLeft: `3px solid ${meta.deep}`,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: 'var(--color-text-muted)',
                        fontStyle: 'italic',
                        margin: 0,
                      }}
                    >
                      Certification programs for {meta.label} are being researched. Check back soon.
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    {certs.map((cert) => {
                      const fmtColors = FORMAT_COLORS[cert.format];
                      return (
                        <div
                          key={cert.program}
                          className="card"
                          style={{
                            borderTop: `3px solid ${meta.deep}`,
                            padding: '1.5rem 1.75rem',
                            borderRadius: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.875rem',
                          }}
                        >
                          {/* Format badge */}
                          <div>
                            <span
                              style={{
                                fontFamily: 'var(--font-ui)',
                                fontSize: '0.625rem',
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: fmtColors.text,
                                background: fmtColors.bg,
                                border: `1px solid ${fmtColors.text}33`,
                                borderRadius: 2,
                                padding: '0.2rem 0.5rem',
                              }}
                            >
                              {cert.format}
                            </span>
                          </div>

                          {/* Program name + school */}
                          <div>
                            <p
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 600,
                                fontSize: 18,
                                lineHeight: 1.3,
                                color: 'var(--color-text)',
                                margin: '0 0 0.25rem',
                              }}
                            >
                              {cert.program}
                            </p>
                            <p
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 13,
                                lineHeight: 1.5,
                                color: 'var(--color-text-muted)',
                                margin: 0,
                              }}
                            >
                              {cert.school}
                            </p>
                          </div>

                          {/* Detail rows */}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.5rem',
                              flex: 1,
                            }}
                          >
                            <DetailRow label="Duration" value={cert.duration} />
                            <DetailRow label="Cost" value={cert.cost} />
                            <DetailRow label="Prerequisites" value={cert.prerequisites} />
                          </div>

                          {/* External link */}
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: 'var(--font-ui)',
                              fontSize: '0.8125rem',
                              fontWeight: 600,
                              color: meta.deep,
                              textDecoration: 'none',
                              letterSpacing: '0.04em',
                              marginTop: 'auto',
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                                'underline';
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none';
                            }}
                          >
                            Learn more →
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ─── Sub-component ────────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.625rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          whiteSpace: 'nowrap',
          paddingTop: 2,
          minWidth: 80,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          lineHeight: 1.55,
          color: 'var(--color-text)',
        }}
      >
        {value}
      </span>
    </div>
  );
}
