'use client';

import { useState } from 'react';
import Image from 'next/image';
import ExercisesTab from './ExercisesTab';
import PracticeBuilderTab from './PracticeBuilderTab';
import TeacherPathTab from './TeacherPathTab';

type ActiveTab = 'exercises' | 'routines' | 'teacher';

export default function PracticeClient() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('exercises');
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null);
  const [preSelectedMinutes, setPreSelectedMinutes] = useState<number | null>(null);

  function handleStartPreset(exerciseId: string, minutes: number) {
    setActiveTab('exercises');
    setExpandedExerciseId(exerciseId);
    setPreSelectedMinutes(minutes);
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '60dvh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <Image
          src="/images/practice-hero.webp"
          alt=""
          fill
          priority
          style={{ objectFit: 'cover', opacity: 0.35 }}
        />

        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(28,29,55,0.72) 0%, transparent 100%)',
          }}
        />

        {/* Text block */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(2rem, 5vw, 4rem) max(1.5rem, 8vw)',
            maxWidth: '720px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-amber-light)',
              margin: '0 0 0.75rem',
            }}
          >
            Your Daily Ritual
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
              fontWeight: 700,
              color: '#F5EAE1',
              margin: '0 0 0.75rem',
              lineHeight: 1.05,
            }}
          >
            Practice
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontStyle: 'italic',
              color: '#F5EAE1',
              margin: '0 0 0.75rem',
              opacity: 0.9,
            }}
          >
            Set your intention. Begin your practice.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)',
              color: '#F5EAE1',
              margin: 0,
              opacity: 0.7,
              lineHeight: 1.7,
            }}
          >
            Guided exercises, daily routine templates, and a structured path for those ready to teach.
          </p>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(2rem, 4vw, 3rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>

          {/* ── Three Pill Tabs ──────────────────────────────── */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center',
              marginBottom: '2.5rem',
            }}
          >
            <button
              className={activeTab === 'exercises' ? 'pill-tab active' : 'pill-tab'}
              onClick={() => setActiveTab('exercises')}
            >
              Do It
            </button>
            <button
              className={activeTab === 'routines' ? 'pill-tab active' : 'pill-tab'}
              onClick={() => setActiveTab('routines')}
            >
              Daily Routines
            </button>
            <button
              className={activeTab === 'teacher' ? 'pill-tab active' : 'pill-tab'}
              onClick={() => setActiveTab('teacher')}
            >
              Teacher Path
            </button>
          </div>

          {/* ── Tab Content — all always mounted, inactive hidden ── */}
          <div style={{ display: activeTab === 'exercises' ? undefined : 'none' }}>
            <ExercisesTab
              expandedExerciseId={expandedExerciseId}
              preSelectedMinutes={preSelectedMinutes}
              onExpandExercise={(id) => setExpandedExerciseId(id)}
            />
          </div>

          <div style={{ display: activeTab === 'routines' ? undefined : 'none' }}>
            <PracticeBuilderTab
              onStartPreset={handleStartPreset}
            />
          </div>

          <div style={{ display: activeTab === 'teacher' ? undefined : 'none' }}>
            <TeacherPathTab />
          </div>

        </div>
      </section>
    </>
  );
}
