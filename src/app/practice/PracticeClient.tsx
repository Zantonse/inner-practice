'use client';

import { useState } from 'react';
import ExercisesTab from './ExercisesTab';
import PracticeBuilderTab from './PracticeBuilderTab';
import TeacherPathTab from './TeacherPathTab';
import PageHero from '@/components/PageHero';
import StickyNav from '@/components/StickyNav';

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
    <div style={{ '--page-accent': 'var(--color-amber-deep)' } as React.CSSProperties}>
      <StickyNav
        accentColor="var(--color-amber-deep)"
        sections={[
          { id: 'exercises', label: 'Do It' },
          { id: 'routines', label: 'Routines' },
          { id: 'teacher', label: 'Teacher Path' },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <PageHero
        imageSrc="/images/practice-hero.webp"
        backgroundGradient="linear-gradient(to top, rgba(28,29,55,0.72) 0%, transparent 100%)"
        eyebrow="Your Daily Ritual"
        headline="Practice"
        subtitle="Guided exercises, daily routine templates, and a structured path for those ready to teach."
        accentColor="var(--color-amber-light)"
        minHeight="60dvh"
      >
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
      </PageHero>

      {/* ── Main Content ──────────────────────────────────────── */}
      <section
        id="exercises"
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
              id="exercises"
              className={activeTab === 'exercises' ? 'pill-tab active' : 'pill-tab'}
              onClick={() => setActiveTab('exercises')}
            >
              Do It
            </button>
            <button
              id="routines"
              className={activeTab === 'routines' ? 'pill-tab active' : 'pill-tab'}
              onClick={() => setActiveTab('routines')}
            >
              Daily Routines
            </button>
            <button
              id="teacher"
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
    </div>
  );
}
