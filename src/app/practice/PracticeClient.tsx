'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
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
          padding: 'clamp(5rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(2rem, 4vw, 3rem)',
          background: 'linear-gradient(160deg, oklch(60% 0.14 300 / 0.15), oklch(93% 0.03 300))',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--color-text)',
            margin: '0 0 0.75rem',
          }}
        >
          Practice
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
            color: 'var(--color-text-muted)',
            margin: 0,
          }}
        >
          Set your intention. Begin your practice.
        </p>
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
            <ScrollReveal>
              <ExercisesTab
                expandedExerciseId={expandedExerciseId}
                preSelectedMinutes={preSelectedMinutes}
                onExpandExercise={(id) => setExpandedExerciseId(id)}
              />
            </ScrollReveal>
          </div>

          <div style={{ display: activeTab === 'routines' ? undefined : 'none' }}>
            <ScrollReveal>
              <PracticeBuilderTab
                onStartPreset={handleStartPreset}
              />
            </ScrollReveal>
          </div>

          <div style={{ display: activeTab === 'teacher' ? undefined : 'none' }}>
            <ScrollReveal>
              <TeacherPathTab />
            </ScrollReveal>
          </div>

        </div>
      </section>
    </>
  );
}
