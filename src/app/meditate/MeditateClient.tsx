'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import VideoFacade from '@/components/VideoFacade';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoAccent from '@/components/VideoAccent';

// ── Video Data ───────────────────────────────────────────────
type VideoEntry = {
  id: string;
  title: string;
  channel: string;
  views: string;
};

type Duration = '5' | '10' | '15';

const videos: Record<Duration, VideoEntry[]> = {
  '5': [
    { id: 'inpok4MKVLM', title: '5-Minute Meditation You Can Do Anywhere', channel: 'Goodful', views: '30.3M views' },
    { id: 'j734gLbQFbU', title: '5 Minute Guided Morning Meditation', channel: 'Lavendaire', views: '12.2M views' },
    { id: 'c1Ndym-IsQg', title: 'Mini Meditation | Let Go of Stress', channel: 'Headspace', views: '131K views' },
  ],
  '10': [
    { id: 'ZToicYcHIOU', title: 'Daily Calm | 10 Minute Mindfulness Meditation', channel: 'Calm', views: '31.1M views' },
    { id: '6p_yaNFSYao', title: 'Mindfulness Meditation — Guided 10 Minutes', channel: 'The Honest Guys', views: '15.3M views' },
    { id: 'U9YKY7fdwyg', title: '10-Minute Meditation For Beginners', channel: 'Goodful', views: '5.7M views' },
  ],
  '15': [
    { id: 'W19PdslW7iw', title: '15 Minute Guided Meditation To Find Peace', channel: 'Boho Beautiful', views: '5.6M views' },
    { id: 'IzV6J4WCwRM', title: 'Back to Basics Guided Meditation', channel: 'Jason Stephenson', views: '2.8M views' },
    { id: 'wVSkYKj26qg', title: 'Easy Guided Meditation for Beginners', channel: 'Yoga with Kassandra', views: '1.17M views' },
  ],
};

// ── Meditation Type Data ─────────────────────────────────────
const meditationTypes = [
  {
    id: 'breath-awareness',
    icon: '/images/icon-breath.webp',
    name: 'Breath Awareness',
    description: 'Anchor attention to the natural rhythm of breathing.',
    bestFor: 'Beginners · Anxiety',
    iconFallback: '◯',
  },
  {
    id: 'body-scan',
    icon: '/images/icon-bodyscan.webp',
    name: 'Body Scan',
    description: 'Systematically bring awareness through each part of the body.',
    bestFor: 'Sleep · Tension',
    iconFallback: '⬡',
  },
  {
    id: 'loving-kindness',
    icon: '/images/icon-loving-kindness.webp',
    name: 'Loving-Kindness',
    description: 'Cultivate compassion toward yourself and others.',
    bestFor: 'Emotional wellbeing · Relationships',
    iconFallback: '♡',
  },
  {
    id: 'visualization',
    icon: '/images/icon-visualization.webp',
    name: 'Guided Visualization',
    description: 'Use mental imagery to reach deeper states of relaxation.',
    bestFor: 'Creativity · Stress relief',
    iconFallback: '◈',
  },
  {
    id: 'yoga-nidra',
    icon: '/images/icon-yoga-nidra.webp',
    name: 'Yoga Nidra',
    description: 'A state between sleep and waking — profound rest.',
    bestFor: 'Exhaustion · Deep rest',
    iconFallback: '◑',
  },
  {
    id: 'walking-meditation',
    icon: '/images/icon-walking.webp',
    name: 'Walking Meditation',
    description: 'Bring full mindful presence to each step you take.',
    bestFor: 'Restless minds · Movement',
    iconFallback: '◻',
  },
];

// ── Icon fallback component ─────────────────────────────────
function MeditationTypeIcon({ src, fallback, name }: { src: string; fallback: string; name: string }) {
  return (
    <div
      style={{
        width: '3rem',
        height: '3rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.75rem',
        color: 'var(--color-violet-deep)',
      }}
    >
      {fallback}
    </div>
  );
}

// ── Stat Card ───────────────────────────────────────────────
function StatCard({ source, stat, detail }: { source: string; stat: string; detail: string }) {
  return (
    <div
      className="stat-card"
      style={{ borderRadius: '2px' }}
    >
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-amber-deep)',
          margin: '0 0 0.75rem',
        }}
      >
        {source}
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

// ── Main Component ──────────────────────────────────────────
export default function MeditateClient() {
  const [activeDuration, setActiveDuration] = useState<Duration>('10');
  const [activeVideo, setActiveVideo] = useState<VideoEntry>(videos['10'][0]);
  const [videoKey, setVideoKey] = useState(0);

  const durations: Duration[] = ['5', '10', '15'];

  const handleDurationChange = (d: Duration) => {
    setActiveDuration(d);
    setActiveVideo(videos[d][0]);
    setVideoKey(k => k + 1);
  };

  const handleVideoSelect = (v: VideoEntry) => {
    setActiveVideo(v);
    setVideoKey(k => k + 1);
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          PART A: LEARN
      ══════════════════════════════════════════════════════ */}

      {/* Hero */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(3rem, 6vw, 5rem)',
          background: 'linear-gradient(160deg, oklch(75% 0.12 295 / 0.4), oklch(97% 0.01 60))',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Breathing decorative element */}
        <div
          className="breathe"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-8vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(200px, 35vw, 400px)',
            height: 'clamp(200px, 35vw, 400px)',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, oklch(75% 0.12 295 / 0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1100px', position: 'relative' }}>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-violet-deep)',
              margin: '0 0 1.25rem',
            }}
          >
            The Art of Stillness
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              color: 'var(--color-text)',
              lineHeight: 1.05,
              margin: '0 0 1.5rem',
              maxWidth: '14ch',
            }}
          >
            Learn to Meditate
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
              color: 'var(--color-text-muted)',
              margin: 0,
              maxWidth: '52ch',
              lineHeight: 1.85,
            }}
          >
            Meditation is one of the oldest intrapsychic technologies humans have developed.
            Thousands of years of wisdom, now supported by rigorous science. Here&apos;s everything
            you need to begin.
          </p>
        </div>
      </section>

      {/* What is Meditation */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(3rem, 5vw, 4.5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'start',
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
                  margin: '0 0 1.25rem',
                }}
              >
                Foundation
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h2)',
                  fontWeight: 400,
                  color: 'var(--color-text)',
                  margin: '0 0 1.75rem',
                  lineHeight: 1.2,
                }}
              >
                What is Meditation?
              </h2>
              <p style={{ marginBottom: '1.25rem', lineHeight: 1.85 }}>
                Meditation is an ancient intrapsychic technology — a method for training attention and awareness.
                At its simplest, it&apos;s the practice of observing the activity of your own mind without being
                swept away by it. Not emptying the mind (that&apos;s a myth), but changing your relationship to
                the thoughts that arise.
              </p>
              <p style={{ marginBottom: '1.25rem', lineHeight: 1.85 }}>
                When you sit and watch your breath, you&apos;re exercising the exact same mental muscle that
                governs your ability to stay focused in a meeting, respond calmly in an argument, or simply
                notice when anxiety is rising before it takes over. Meditation is training for the mind.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <p style={{ lineHeight: 1.85, marginBottom: '1.25rem', marginTop: 'clamp(0rem, 2vw, 2rem)' }}>
                The science backs this up. Brain imaging studies show that regular meditation practitioners
                develop measurably different neural structures — more gray matter in areas governing attention,
                introspection, and emotional regulation. Less reactivity in the amygdala, the brain&apos;s
                alarm system.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Perhaps most importantly: meditation doesn&apos;t require any belief system, any equipment,
                or any prior experience. You already have everything you need. The practice begins with the
                very next breath.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <VideoAccent
        src="/videos/meditation-loop.mp4"
        poster="/videos/meditation-poster.jpg"
      />

      {/* The Science */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: 'color-mix(in srgb, var(--color-cream) 88%, var(--color-violet-mid))',
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
              Research
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 3rem',
              }}
            >
              The Science
            </h2>
          </ScrollReveal>

          <ScrollReveal group>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              <StatCard
                source="Harvard Medical School"
                stat="8 weeks physically changes brain structure"
                detail="Regular meditation increases gray matter density in the hippocampus and prefrontal cortex — regions linked to learning, memory, and self-awareness."
              />
              <StatCard
                source="Mount Sinai — 2025"
                stat="10 minutes alters brain waves on your first session"
                detail="Even a single 10-minute session produces measurable changes in alpha and theta wave activity, associated with relaxed focus and reduced cognitive chatter."
              />
              <StatCard
                source="Johns Hopkins University"
                stat="As effective as antidepressants for anxiety"
                detail="A meta-analysis of 47 clinical trials found mindfulness meditation programs had moderate evidence for improving anxiety, depression, and pain."
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Types of Meditation */}
      <section
        style={{
          padding: 'clamp(4.5rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
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
              Explore
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
              Types of Meditation
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '54ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              There is no single "right" meditation. Different practices serve different needs.
              Explore what resonates with you.
            </p>
          </ScrollReveal>

          <div
            className="reveal-group"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {meditationTypes.map((type, i) => (
              <div
                key={type.name}
                id={type.id}
                className="card reveal"
                style={{
                  padding: '2rem 1.75rem',
                  borderRadius: '2px',
                }}
              >
                <MeditationTypeIcon src={type.icon} fallback={type.iconFallback} name={type.name} />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 0.625rem',
                    fontStyle: 'normal',
                  }}
                >
                  {type.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                    margin: '0 0 1.25rem',
                    lineHeight: 1.65,
                  }}
                >
                  {type.description}
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '9999px',
                    background: 'color-mix(in srgb, var(--color-violet-mid) 30%, var(--color-cream))',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    color: 'var(--color-violet-deep)',
                  }}
                >
                  Best for: {type.bestFor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider flip />

      {/* How to Begin */}
      <section
        style={{
          padding: 'clamp(5rem, 8vw, 8rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6.5rem)',
          background: 'color-mix(in srgb, var(--color-cream) 94%, var(--color-linen))',
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
              Getting Started
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 3.5rem',
              }}
            >
              How to Begin
            </h2>
          </ScrollReveal>

          <div className="timeline">
            {/* Step 1: Find Your Space */}
            <ScrollReveal>
              <div style={{ position: 'relative', marginBottom: '3.5rem' }}>
                <div className="timeline-node">1</div>
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
                  Find Your Space
                </h3>
                <p style={{ margin: '0 0 1rem', lineHeight: 1.8, maxWidth: '56ch', color: 'var(--color-text-muted)' }}>
                  You don&apos;t need a special room. A chair, a quiet corner, even your parked car.
                  The only requirement: you won&apos;t be interrupted for the next few minutes.
                  Consistency of location helps signal your nervous system that it&apos;s time to shift modes.
                </p>
                <p style={{ margin: 0, lineHeight: 1.8, maxWidth: '56ch', color: 'var(--color-text-muted)' }}>
                  Over time, your chosen spot will develop a quality of its own — the mind learns to
                  settle just by arriving there.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 2: Choose Your Posture */}
            <ScrollReveal>
              <div style={{ position: 'relative', marginBottom: '3.5rem' }}>
                <div className="timeline-node">2</div>
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
                  Choose Your Posture
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '0.75rem',
                    maxWidth: '600px',
                  }}
                >
                  {[
                    { icon: '🪑', label: 'Chair', note: 'Recommended for beginners' },
                    { icon: '🧘', label: 'Floor cushion', note: 'Traditional, more grounded' },
                    { icon: '🛋', label: 'Lying down', note: 'Risk of sleep — stay alert' },
                    { icon: '🚶', label: 'Walking', note: 'Movement-based practice' },
                  ].map(p => (
                    <div
                      key={p.label}
                      style={{
                        padding: '1rem 1.25rem',
                        background: 'var(--color-surface-raised)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '2px',
                      }}
                    >
                      <div style={{ fontSize: '1.25rem', marginBottom: '0.375rem' }}>{p.icon}</div>
                      <p
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: 'var(--color-text)',
                          margin: '0 0 0.25rem',
                        }}
                      >
                        {p.label}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.75rem',
                          color: 'var(--color-text-muted)',
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {p.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Step 3: Your First Session */}
            <ScrollReveal>
              <div style={{ position: 'relative', marginBottom: '3.5rem' }}>
                <div className="timeline-node">3</div>
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
                  Your First Session
                </h3>
                <p style={{ margin: '0 0 1rem', lineHeight: 1.8, maxWidth: '56ch', color: 'var(--color-text-muted)' }}>
                  Start with just 2–5 minutes. Sit comfortably, close your eyes, and notice the physical
                  sensation of breathing — the coolness at the nostrils, the chest rising, the belly expanding.
                </p>
                <div
                  style={{
                    padding: '1.25rem 1.5rem',
                    background: 'color-mix(in srgb, var(--color-violet-pale) 60%, var(--color-cream))',
                    border: '1px solid var(--color-violet-mid)',
                    borderRadius: '2px',
                    maxWidth: '52ch',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-violet-deep)',
                      margin: '0 0 0.625rem',
                    }}
                  >
                    The Method
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      color: 'var(--color-text)',
                      margin: 0,
                      lineHeight: 1.75,
                    }}
                  >
                    Count each exhale from 1 to 10. When you reach 10 (or lose count — you will),
                    simply return to 1. No judgment. The return <em>is</em> the practice.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 4: Common Obstacles */}
            <ScrollReveal>
              <div style={{ position: 'relative', marginBottom: '3.5rem' }}>
                <div className="timeline-node">4</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 1.25rem',
                    fontStyle: 'normal',
                  }}
                >
                  Common Obstacles
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
                  {[
                    {
                      problem: 'Racing thoughts',
                      solution: 'This is normal. Thoughts arising is not failure — it\'s the nature of mind. Each time you notice you\'ve drifted and return to breath, you\'ve successfully meditated.',
                    },
                    {
                      problem: 'Restlessness',
                      solution: 'Itching, fidgeting, the urge to move. Try labeling it: "restless." Naming sensations increases the gap between stimulus and reaction.',
                    },
                    {
                      problem: 'Falling asleep',
                      solution: 'Meditate earlier in the day, or sit upright rather than lying down. Slightly open eyes directed at the floor can help maintain alertness.',
                    },
                  ].map(item => (
                    <div
                      key={item.problem}
                      style={{
                        padding: '1.25rem 1.5rem',
                        background: 'var(--color-surface-raised)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '2px',
                        borderLeft: '3px solid var(--color-amber-light)',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: 'var(--color-text)',
                          margin: '0 0 0.5rem',
                        }}
                      >
                        {item.problem}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.875rem',
                          color: 'var(--color-text-muted)',
                          margin: 0,
                          lineHeight: 1.7,
                        }}
                      >
                        {item.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Step 5: Building the Habit */}
            <ScrollReveal>
              <div style={{ position: 'relative' }}>
                <div className="timeline-node">5</div>
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
                  Building the Habit
                </h3>
                <p style={{ margin: '0 0 1rem', lineHeight: 1.8, maxWidth: '56ch', color: 'var(--color-text-muted)' }}>
                  Consistency matters more than duration. Two minutes every day creates more change than
                  an hour once a week. Start with 2 minutes. Add a minute per week. After 8 weeks,
                  you will notice the difference.
                </p>
                <p style={{ margin: 0, lineHeight: 1.8, maxWidth: '56ch', color: 'var(--color-text-muted)' }}>
                  The most reliable method: habit stacking. Attach your practice to something you already
                  do every morning — right after your first coffee, right before you open your phone.
                  The anchor carries the habit.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The Connection to Yoga */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5rem)',
          background: 'linear-gradient(160deg, oklch(65% 0.14 310 / 0.15), oklch(97% 0.01 60))',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '800px' }}>
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
              The Connection
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
              Meditation &amp; Yoga
            </h2>
            <p style={{ marginBottom: '1.25rem', lineHeight: 1.85, maxWidth: '58ch' }}>
              Yoga and meditation are not separate practices — they are two faces of the same path.
              Yoga, in its complete form, uses physical postures and breath to prepare the body and
              nervous system for the stillness of meditation.
            </p>
            <p style={{ marginBottom: '2rem', lineHeight: 1.85, maxWidth: '58ch' }}>
              Kundalini yoga in particular bridges the two: kriyas (movement sequences) and pranayama
              (breathwork) build energy and clear the channels, while the closing meditation allows
              that energy to settle into awareness. Many practitioners find that even 5 minutes of
              kundalini before sitting makes the meditation session notably deeper.
            </p>
            <Link
              href="/yoga"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.875rem 2rem',
                background: 'var(--color-violet-deep)',
                color: '#F5EAE1',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                transition: 'background-color 300ms ease',
              }}
            >
              Explore Kundalini Yoga
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PART B: PRACTICE
      ══════════════════════════════════════════════════════ */}

      {/* Section break */}
      <div
        style={{
          padding: '2.5rem max(1.5rem, 8vw)',
          background: 'var(--color-violet-deep)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'rgba(215,194,238,0.3)' }} />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: 'var(--color-violet-mid)',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Now, practice.
        </p>
        <div style={{ flex: 1, height: '1px', background: 'rgba(215,194,238,0.3)' }} />
      </div>

      {/* Practice Section */}
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
              Choose Your Practice
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '50ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Select a duration. We&apos;ll guide you to the right session.
            </p>
          </ScrollReveal>

          {/* Duration pill tabs */}
          <div
            role="tablist"
            aria-label="Meditation duration"
            style={{
              display: 'flex',
              gap: '0.625rem',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            {durations.map(d => (
              <button
                key={d}
                role="tab"
                aria-selected={activeDuration === d}
                className={`pill-tab ${activeDuration === d ? 'active' : ''}`}
                onClick={() => handleDurationChange(d)}
              >
                {d} min
              </button>
            ))}
          </div>

          {/* Featured video + info */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: '2.5rem',
              alignItems: 'start',
            }}
          >
            {/* Video player */}
            <div>
              <VideoFacade
                key={`${activeVideo.id}-${videoKey}`}
                videoId={activeVideo.id}
                title={activeVideo.title}
              />

              <div style={{ marginTop: '1.25rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.375rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 0.375rem',
                    fontStyle: 'normal',
                  }}
                >
                  {activeVideo.title}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      color: 'var(--color-violet-deep)',
                      margin: 0,
                    }}
                  >
                    {activeVideo.channel}
                  </p>
                  <span style={{ color: 'var(--color-border)', fontSize: '0.75rem' }}>·</span>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.8125rem',
                      color: 'var(--color-text-muted)',
                      margin: 0,
                    }}
                  >
                    {activeVideo.views}
                  </p>
                </div>
              </div>
            </div>

            {/* More videos list */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  margin: '0 0 1rem',
                }}
              >
                More at {activeDuration} minutes
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {videos[activeDuration].map((v) => {
                  const isActive = v.id === activeVideo.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => handleVideoSelect(v)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        padding: '1rem 1.25rem',
                        background: isActive
                          ? 'color-mix(in srgb, var(--color-violet-pale) 80%, var(--color-cream))'
                          : 'var(--color-surface-raised)',
                        border: `1px solid ${isActive ? 'var(--color-violet-mid)' : 'var(--color-border)'}`,
                        borderRadius: '2px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        width: '100%',
                        transition: 'border-color 300ms ease, background-color 300ms ease',
                      }}
                    >
                      {/* Thumbnail */}
                      <div
                        style={{
                          width: '80px',
                          flexShrink: 0,
                          aspectRatio: '16/9',
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: '1px',
                          background: '#1a1a1a',
                        }}
                      >
                        <Image
                          src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                          alt={v.title}
                          fill
                          sizes="80px"
                          style={{ objectFit: 'cover' }}
                          unoptimized
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.875rem',
                            fontWeight: isActive ? 500 : 400,
                            color: isActive ? 'var(--color-violet-deep)' : 'var(--color-text)',
                            margin: '0 0 0.25rem',
                            lineHeight: 1.4,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {v.title}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '0.75rem',
                            color: 'var(--color-text-muted)',
                            margin: 0,
                          }}
                        >
                          {v.channel} · {v.views}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cross-Links ──────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(3rem, 5vw, 4rem) max(1.5rem, 8vw)',
          background: 'color-mix(in srgb, var(--color-violet-mid) 10%, var(--color-cream))',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <ScrollReveal>
          <div style={{ maxWidth: '780px' }}>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-violet-deep)',
                margin: '0 0 1rem',
              }}
            >
              Deepen your practice
            </p>
            <p style={{ margin: '0 0 2rem', fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              Meditation is a top-down path to the nervous system — the prefrontal cortex quiets the amygdala via the vagus nerve.
              Combine it with bottom-up practices for a complete approach.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { href: '/breathe', label: 'Breathwork' },
                { href: '/yoga', label: 'Yoga' },
                { href: '/fascia', label: 'Fascia' },
                { href: '/reiki', label: 'Reiki' },
                { href: '/nervous-system', label: 'Nervous System' },
                { href: '/practice', label: 'Practice Timer' },
                { href: '/manifest', label: 'Manifest' },
                { href: '/sound-healing', label: 'Sound Healing' },
                { href: '/somatics', label: 'Somatics' },
                { href: '/sleep', label: 'Sleep' },
                { href: '/qigong', label: 'Qigong' },
                { href: '/chakras', label: 'Chakras' },
              ].map((link, i, arr) => (
                <span key={link.href} style={{ display: 'contents' }}>
                  <Link href={link.href} style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                    {link.label} &rarr;
                  </Link>
                  {i < arr.length - 1 && <span style={{ color: 'var(--color-border)' }}>&middot;</span>}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
