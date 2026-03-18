'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTimer } from './useTimer';
import ExerciseCard from './ExerciseCard';
import { EXERCISES } from './exercises';
import { MODALITY_META } from './types';
import type { Modality } from './types';

// ── Duration options for Freeform Timer ───────────────────────
const FREEFORM_DURATIONS = [5, 10, 15, 20, 30, 45, 60];
const VIOLET_DEEP = '#592E6B';
const VIOLET_PALE = '#EDE9FE';

// ── Types ──────────────────────────────────────────────────────
interface ExercisesTabProps {
  expandedExerciseId?: string | null;
  preSelectedMinutes?: number | null;
  onExpandExercise?: (id: string | null) => void;
}

// ── Helpers ────────────────────────────────────────────────────
function formatTime(seconds: number): string {
  const m = Math.floor(Math.max(0, seconds) / 60);
  const s = Math.max(0, seconds) % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// ── FreeformTimerCard ──────────────────────────────────────────
function FreeformTimerCard({ preSelectedMinutes }: { preSelectedMinutes?: number | null }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(
    preSelectedMinutes ?? 10
  );
  const [customMin, setCustomMin] = useState('');
  const timer = useTimer();

  // If a pre-selected duration comes in from outside, apply it and auto-expand
  useEffect(() => {
    if (preSelectedMinutes != null) {
      setSelectedMinutes(preSelectedMinutes);
      setCustomMin('');
      setIsExpanded(true);
    }
  }, [preSelectedMinutes]);

  const handleStart = () => {
    const mins = selectedMinutes ?? parseInt(customMin);
    if (!mins || mins < 1 || mins > 180) return;
    timer.startOpen(mins);
  };

  const displayMinutes = selectedMinutes ?? (parseInt(customMin) || 0);
  const ringTotal =
    timer.status === 'idle' ? displayMinutes * 60 : timer.totalSeconds;
  const ringRemaining =
    timer.status === 'idle' ? displayMinutes * 60 : timer.remainingSeconds;

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = ringTotal > 0 ? ringRemaining / ringTotal : 0;
  const offset = circumference * (1 - progress);

  const displayLabel =
    timer.status === 'complete'
      ? 'Complete'
      : timer.status === 'idle'
      ? ''
      : 'Practice';

  return (
    <div
      className="card"
      style={{ borderTop: `3px solid ${VIOLET_DEEP}`, marginBottom: '0.5rem' }}
    >
      {/* Header */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded((v) => !v);
          }
        }}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'var(--color-text)',
              margin: '0 0 0.375rem',
              fontStyle: 'normal',
            }}
          >
            Freeform Timer
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Set your own duration, no guidance.
          </p>
        </div>
        <span
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1,
            marginTop: '0.25rem',
            flexShrink: 0,
            transition: 'transform 200ms ease',
          }}
          aria-hidden="true"
        >
          {isExpanded ? '▾' : '▸'}
        </span>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div
          style={{
            marginTop: '1.5rem',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '1.5rem',
          }}
        >
          {/* Duration pills */}
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              margin: '0 0 0.75rem',
              textAlign: 'center',
            }}
          >
            Select duration (minutes)
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.625rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            {FREEFORM_DURATIONS.map((m) => (
              <button
                key={m}
                onClick={() => {
                  setSelectedMinutes(m);
                  setCustomMin('');
                }}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '9999px',
                  border: `1px solid ${selectedMinutes === m ? VIOLET_DEEP : 'var(--color-border)'}`,
                  background:
                    selectedMinutes === m ? VIOLET_DEEP : 'transparent',
                  color:
                    selectedMinutes === m ? '#fff' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  minWidth: '3rem',
                  transition: 'all 150ms ease',
                }}
              >
                {m}
              </button>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="number"
                min={1}
                max={180}
                placeholder="Custom"
                value={customMin}
                onChange={(e) => {
                  setCustomMin(e.target.value);
                  setSelectedMinutes(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const v = parseInt(customMin);
                    if (v >= 1 && v <= 180) setSelectedMinutes(v);
                  }
                }}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  padding: '0.4rem 0.75rem',
                  width: '5rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '9999px',
                  background: 'transparent',
                  color: 'var(--color-text)',
                  textAlign: 'center',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                min
              </span>
            </div>
          </div>

          {/* Timer ring */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '1.5rem 0',
            }}
          >
            <p
              aria-live="polite"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:
                  timer.status === 'complete'
                    ? VIOLET_DEEP
                    : 'var(--color-text-muted)',
                margin: '0 0 1.25rem',
                minHeight: '1.2em',
              }}
            >
              {displayLabel}
            </p>
            <div
              style={{
                position: 'relative',
                width: 'min(180px, calc(100vw - 6rem))',
                height: 'min(180px, calc(100vw - 6rem))',
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 200"
                style={{ transform: 'rotate(-90deg)', display: 'block' }}
              >
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="4"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={VIOLET_DEEP}
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <p
                role="timer"
                aria-live="off"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                  fontWeight: 300,
                  color: 'var(--color-text)',
                  margin: 0,
                  fontVariantNumeric: 'tabular-nums',
                  whiteSpace: 'nowrap',
                }}
              >
                {formatTime(ringRemaining)}
              </p>
            </div>
          </div>

          {/* Control bar */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '1.5rem',
            }}
          >
            {timer.status === 'idle' && (
              <button
                onClick={handleStart}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.75rem 2rem',
                  borderRadius: '2px',
                  border: 'none',
                  cursor: 'pointer',
                  background: '#985575',
                  color: '#F5EAE1',
                  transition: 'opacity 200ms ease',
                }}
                aria-label="Start timer"
              >
                Start
              </button>
            )}
            {timer.status === 'running' && (
              <button
                onClick={timer.pause}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.75rem 2rem',
                  borderRadius: '2px',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'var(--color-surface-raised)',
                  color: 'var(--color-text)',
                  transition: 'opacity 200ms ease',
                }}
                aria-label="Pause timer"
              >
                Pause
              </button>
            )}
            {timer.status === 'paused' && (
              <>
                <button
                  onClick={timer.resume}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '0.75rem 2rem',
                    borderRadius: '2px',
                    border: 'none',
                    cursor: 'pointer',
                    background: '#985575',
                    color: '#F5EAE1',
                    transition: 'opacity 200ms ease',
                  }}
                  aria-label="Resume timer"
                >
                  Resume
                </button>
                <button
                  onClick={timer.reset}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '0.75rem 2rem',
                    borderRadius: '2px',
                    border: 'none',
                    cursor: 'pointer',
                    background: 'var(--color-surface-raised)',
                    color: 'var(--color-text-muted)',
                    transition: 'opacity 200ms ease',
                  }}
                  aria-label="Reset timer"
                >
                  Reset
                </button>
              </>
            )}
            {timer.status === 'complete' && (
              <button
                onClick={timer.reset}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.75rem 2rem',
                  borderRadius: '2px',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'var(--color-surface-raised)',
                  color: 'var(--color-text)',
                  transition: 'opacity 200ms ease',
                }}
                aria-label="Reset timer"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── All modalities in display order ──────────────────────────
const ALL_MODALITIES: Modality[] = [
  'meditation',
  'breathwork',
  'yoga',
  'fascia',
  'nervous-system',
  'reiki',
  'sound-healing',
  'somatics',
];

// ════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════
export default function ExercisesTab({
  expandedExerciseId,
  preSelectedMinutes,
  onExpandExercise,
}: ExercisesTabProps) {
  const [activeModality, setActiveModality] = useState<Modality | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(
    expandedExerciseId ?? null
  );

  // Card refs for scroll-into-view
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Sync external expandedExerciseId prop into internal state
  useEffect(() => {
    if (expandedExerciseId != null) {
      setExpandedId(expandedExerciseId);
    }
  }, [expandedExerciseId]);

  // Scroll to expanded card when expandedId changes
  useEffect(() => {
    if (!expandedId) return;
    const el = cardRefs.current.get(expandedId);
    if (el) {
      // Small delay to let the card render fully before scrolling
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }, [expandedId]);

  const handleToggle = useCallback(
    (id: string) => {
      const next = expandedId === id ? null : id;
      setExpandedId(next);
      onExpandExercise?.(next);
    },
    [expandedId, onExpandExercise]
  );

  // Filtered + grouped exercises
  const filteredExercises =
    activeModality === 'all'
      ? EXERCISES
      : EXERCISES.filter((ex) => ex.modality === activeModality);

  // Build grouped list when showing all
  const groupedByModality: { modality: Modality; exercises: typeof EXERCISES }[] =
    activeModality === 'all'
      ? ALL_MODALITIES.map((mod) => ({
          modality: mod,
          exercises: EXERCISES.filter((ex) => ex.modality === mod),
        })).filter((g) => g.exercises.length > 0)
      : [];

  return (
    <div>
      {/* ── Freeform Timer Card ─────────────────────────────── */}
      <FreeformTimerCard preSelectedMinutes={preSelectedMinutes} />

      {/* ── Modality Filter Pills ───────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: '0px',
          zIndex: 10,
          background: 'color-mix(in srgb, var(--color-cream) 88%, transparent)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          marginLeft: '-1px',
          marginRight: '-1px',
          paddingLeft: '1px',
          paddingRight: '1px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            padding: '0.75rem 0',
            justifyContent: 'center',
          }}
        >
          {/* "All" pill */}
          <button
            onClick={() => setActiveModality('all')}
            className="pill-tab"
            style={
              activeModality === 'all'
                ? {
                    background: VIOLET_DEEP,
                    borderColor: VIOLET_DEEP,
                    color: '#fff',
                    flexShrink: 0,
                  }
                : { flexShrink: 0 }
            }
          >
            All
          </button>

          {/* Modality pills */}
          {ALL_MODALITIES.map((mod) => {
            const meta = MODALITY_META[mod];
            const isActive = activeModality === mod;
            return (
              <button
                key={mod}
                onClick={() => setActiveModality(mod)}
                className="pill-tab"
                style={
                  isActive
                    ? {
                        background: meta.deep,
                        borderColor: meta.deep,
                        color: '#fff',
                        flexShrink: 0,
                      }
                    : { flexShrink: 0 }
                }
              >
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Exercise List ───────────────────────────────────── */}
      <div style={{ paddingTop: '0.5rem' }}>
        {activeModality === 'all' ? (
          /* Grouped view with sticky section headers */
          groupedByModality.map(({ modality, exercises }) => {
            const meta = MODALITY_META[modality];
            return (
              <div key={modality} style={{ marginBottom: '1.5rem' }}>
                {/* Section header */}
                <div
                  style={{
                    position: 'sticky',
                    top: '44px',
                    zIndex: 9,
                    background:
                      'color-mix(in srgb, var(--color-cream) 88%, transparent)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.375rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <p
                    className="section-label"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: meta.deep,
                      margin: 0,
                      fontWeight: 600,
                    }}
                  >
                    {meta.label}
                  </p>
                </div>

                {/* Exercise cards in this group */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {exercises.map((ex) => (
                    <div
                      key={ex.id}
                      ref={(el) => {
                        if (el) cardRefs.current.set(ex.id, el);
                        else cardRefs.current.delete(ex.id);
                      }}
                    >
                      <ExerciseCard
                        exercise={ex}
                        isExpanded={expandedId === ex.id}
                        onToggle={() => handleToggle(ex.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          /* Flat list for a specific modality */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {filteredExercises.map((ex) => (
              <div
                key={ex.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(ex.id, el);
                  else cardRefs.current.delete(ex.id);
                }}
              >
                <ExerciseCard
                  exercise={ex}
                  isExpanded={expandedId === ex.id}
                  onToggle={() => handleToggle(ex.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
