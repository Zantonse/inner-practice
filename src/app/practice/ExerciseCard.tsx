'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTimer } from './useTimer';
import type { Exercise } from './types';
import { MODALITY_META, LEVEL_COLORS } from './types';

// ── Types ─────────────────────────────────────────────────────
interface ExerciseCardProps {
  exercise: Exercise;
  isExpanded: boolean;
  onToggle: () => void;
}

// ── Helpers ───────────────────────────────────────────────────
function formatTime(seconds: number): string {
  const m = Math.floor(Math.max(0, seconds) / 60);
  const s = Math.max(0, seconds) % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function computeStructuredDuration(exercise: Exercise, cycles: number, rounds: number): string {
  if (!exercise.phases?.length) return '';
  const cycleSec = exercise.phases.reduce((sum, ph) => sum + Math.round(ph.duration), 0);
  const totalSec = cycleSec * cycles * rounds;
  const totalMin = Math.round(totalSec / 60);
  const useRounds = (exercise.defaultRounds ?? 1) > 1;
  if (useRounds) {
    return `${rounds} round${rounds !== 1 ? 's' : ''} · ~${totalMin} min`;
  }
  return `${cycles} cycle${cycles !== 1 ? 's' : ''} · ~${totalMin} min`;
}

// ── TimerRing ─────────────────────────────────────────────────
function TimerRing({
  remaining,
  total,
  accentColor,
  phaseLabel,
  phaseRemaining,
  status,
}: {
  remaining: number;
  total: number;
  accentColor: string;
  phaseLabel: string;
  phaseRemaining: number;
  status: string;
}) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? remaining / total : 0;
  const offset = circumference * (1 - progress);

  const displayLabel =
    status === 'complete'
      ? 'Complete'
      : status === 'idle'
      ? ''
      : phaseLabel
      ? `${phaseLabel} — ${phaseRemaining}s`
      : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1.5rem 0' }}>
      {/* Phase label */}
      <p
        aria-live="polite"
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: status === 'complete' ? accentColor : 'var(--color-text-muted)',
          margin: '0 0 1.25rem',
          minHeight: '1.2em',
        }}
      >
        {displayLabel}
      </p>

      {/* Ring + time */}
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
          <circle cx="100" cy="100" r={radius} fill="none" stroke="var(--color-border)" strokeWidth="4" />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={accentColor}
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
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 300,
            color: 'var(--color-text)',
            margin: 0,
            letterSpacing: '0.04em',
            fontVariantNumeric: 'tabular-nums',
            whiteSpace: 'nowrap',
          }}
        >
          {formatTime(remaining)}
        </p>
      </div>
    </div>
  );
}

// ── ControlBar ────────────────────────────────────────────────
function ControlBar({
  status,
  onStart,
  onPause,
  onResume,
  onReset,
}: {
  status: string;
  onStart?: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}) {
  const ROSE_MID = '#985575';

  const btn = (bg: string, color: string): React.CSSProperties => ({
    fontFamily: 'var(--font-ui)',
    fontSize: '0.8125rem',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '0.75rem 2rem',
    borderRadius: '2px',
    border: 'none',
    cursor: 'pointer',
    background: bg,
    color,
    transition: 'opacity 200ms ease',
  });

  return (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
      {status === 'idle' && onStart && (
        <button onClick={onStart} style={btn(ROSE_MID, '#F5EAE1')} aria-label="Start timer">
          Start
        </button>
      )}
      {status === 'running' && (
        <button
          onClick={onPause}
          style={btn('var(--color-surface-raised)', 'var(--color-text)')}
          aria-label="Pause timer"
        >
          Pause
        </button>
      )}
      {status === 'paused' && (
        <>
          <button onClick={onResume} style={btn(ROSE_MID, '#F5EAE1')} aria-label="Resume timer">
            Resume
          </button>
          <button
            onClick={onReset}
            style={btn('var(--color-surface-raised)', 'var(--color-text-muted)')}
            aria-label="Reset timer"
          >
            Reset
          </button>
        </>
      )}
      {status === 'complete' && (
        <button
          onClick={onReset}
          style={btn('var(--color-surface-raised)', 'var(--color-text)')}
          aria-label="Reset timer"
        >
          Reset
        </button>
      )}
    </div>
  );
}

// ── DurationSelector ──────────────────────────────────────────
const DURATION_OPTIONS = [5, 10, 15, 20, 30];

function DurationSelector({
  selected,
  onSelect,
  customMin,
  onCustomChange,
  accentColor,
}: {
  selected: number | null;
  onSelect: (min: number) => void;
  customMin: string;
  onCustomChange: (val: string) => void;
  accentColor: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.625rem',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1rem 0',
      }}
    >
      {DURATION_OPTIONS.map((m) => (
        <button
          key={m}
          onClick={() => onSelect(m)}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            padding: '0.4rem 0.9rem',
            borderRadius: '9999px',
            border: `1px solid ${selected === m ? accentColor : 'var(--color-border)'}`,
            background: selected === m ? accentColor : 'transparent',
            color: selected === m ? '#fff' : 'var(--color-text-muted)',
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
          onChange={(e) => onCustomChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const v = parseInt(customMin);
              if (v >= 1 && v <= 180) onSelect(v);
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
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          min
        </span>
      </div>
    </div>
  );
}

// ── Main ExerciseCard ─────────────────────────────────────────
export default function ExerciseCard({ exercise, isExpanded, onToggle }: ExerciseCardProps) {
  const timer = useTimer();

  // Stepper state (structured)
  const defaultStepperValue =
    (exercise.defaultRounds ?? 1) > 1
      ? (exercise.defaultRounds ?? 1)
      : (exercise.defaultCycles ?? 1);
  const [stepperValue, setStepperValue] = useState(defaultStepperValue);

  // Duration selector state (reference)
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(exercise.defaultMinutes ?? 10);
  const [customMin, setCustomMin] = useState('');

  // Pause-on-collapse / resume-on-expand
  const prevExpandedRef = useRef(isExpanded);
  useEffect(() => {
    if (prevExpandedRef.current && !isExpanded && timer.status === 'running') {
      timer.pause();
    }
    if (!prevExpandedRef.current && isExpanded && timer.status === 'paused') {
      timer.resume();
    }
    prevExpandedRef.current = isExpanded;
  }, [isExpanded, timer]);

  const modalityMeta = MODALITY_META[exercise.modality];
  const accentColor = modalityMeta.deep;
  const accentPale = modalityMeta.pale;

  // Derived values
  const useRoundsLabel = (exercise.defaultRounds ?? 1) > 1;
  const stepperLabel = computeStructuredDuration(
    exercise,
    useRoundsLabel ? (exercise.defaultCycles ?? 1) : stepperValue,
    useRoundsLabel ? stepperValue : (exercise.defaultRounds ?? 1)
  );

  const roundInfo =
    timer.totalRounds > 1
      ? `Cycle ${timer.currentCycle} of ${timer.totalCycles} · Round ${timer.currentRound} of ${timer.totalRounds}`
      : timer.totalCycles > 1
      ? `Cycle ${timer.currentCycle} of ${timer.totalCycles}`
      : undefined;

  // Start handlers
  const handleStartStructured = () => {
    const cycles = useRoundsLabel ? (exercise.defaultCycles ?? 1) : stepperValue;
    const rounds = useRoundsLabel ? stepperValue : (exercise.defaultRounds ?? 1);
    const modifiedExercise = { ...exercise, defaultCycles: cycles, defaultRounds: rounds };
    timer.startStructured(modifiedExercise);
  };

  const handleStartOpen = () => {
    const mins = selectedMinutes ?? parseInt(customMin);
    if (!mins || mins < 1 || mins > 180) return;
    timer.startOpen(mins);
  };

  // Badge styles
  const modalityBadgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.2rem 0.6rem',
    borderRadius: '9999px',
    background: accentPale,
    fontFamily: 'var(--font-ui)',
    fontSize: '0.625rem',
    fontWeight: 600,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: accentColor,
    whiteSpace: 'nowrap',
  };

  const levelBadgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.2rem 0.6rem',
    borderRadius: '9999px',
    background: `color-mix(in srgb, ${LEVEL_COLORS[exercise.level]} 12%, var(--color-cream))`,
    fontFamily: 'var(--font-ui)',
    fontSize: '0.625rem',
    fontWeight: 600,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: LEVEL_COLORS[exercise.level],
    whiteSpace: 'nowrap',
  };

  return (
    <div
      className="card"
      style={
        isExpanded
          ? { transform: 'none', borderTop: `3px solid ${accentColor}` }
          : { borderTop: `3px solid ${accentColor}` }
      }
    >
      {/* ── Card Header (always visible) ─────────────────── */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
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
        {/* Left content */}
        <div style={{ flex: 1, minWidth: 0 }}>
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
            {exercise.name}
          </h3>

          {/* Badges + duration */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <span style={modalityBadgeStyle}>{modalityMeta.label}</span>
            <span style={levelBadgeStyle}>{exercise.level}</span>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6875rem',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.03em',
              }}
            >
              {exercise.duration}
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
              margin: '0 0 0.5rem',
              lineHeight: 1.6,
            }}
          >
            {exercise.description}
          </p>

          {/* Learn more link */}
          <Link
            href={exercise.learnMorePath}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.75rem',
              color: accentColor,
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Learn more →
          </Link>
        </div>

        {/* Expand chevron */}
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

      {/* ── Expanded Content ──────────────────────────────── */}
      {isExpanded && (
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>

          {/* ── STRUCTURED variant ──────────────────────── */}
          {exercise.type === 'structured' && exercise.phases && (
            <>
              {/* Step list */}
              <ol
                style={{
                  margin: '0 0 1.5rem',
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {exercise.phases.map((phase, idx) => {
                  const isActive =
                    timer.status !== 'idle' &&
                    timer.status !== 'complete' &&
                    idx === Math.min(
                      // We can't directly access currentPhaseIndex, so derive from phaseRemaining
                      // Instead use currentPhaseLabel to highlight matching phase
                      exercise.phases!.findIndex(
                        (p) => p.label === timer.currentPhaseLabel
                      ),
                      exercise.phases!.length - 1
                    );
                  return (
                    <li
                      key={idx}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        background: isActive ? accentPale : 'var(--color-surface-raised)',
                        border: `1px solid ${isActive ? accentColor : 'var(--color-border)'}`,
                        transition: 'background 300ms ease, border-color 300ms ease',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.5625rem',
                          fontWeight: 600,
                          color: isActive ? accentColor : 'var(--color-text-muted)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.75rem',
                          color: isActive ? accentColor : 'var(--color-text)',
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {phase.label}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.625rem',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {phase.duration}s
                      </span>
                    </li>
                  );
                })}
              </ol>

              {/* Timer ring */}
              <TimerRing
                remaining={timer.status === 'idle' ? 0 : timer.remainingSeconds}
                total={timer.totalSeconds}
                accentColor={accentColor}
                phaseLabel={timer.currentPhaseLabel}
                phaseRemaining={timer.phaseRemaining}
                status={timer.status}
              />

              {/* Cycle / round counter (when active) */}
              {(timer.status === 'running' || timer.status === 'paused') && roundInfo && (
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    color: 'var(--color-text-muted)',
                    textAlign: 'center',
                    margin: '0 0 0.5rem',
                    letterSpacing: '0.08em',
                  }}
                >
                  {roundInfo}
                </p>
              )}

              {/* Cycle / round stepper (pre-start only) */}
              {timer.status === 'idle' && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    margin: '0.75rem 0 1rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      margin: 0,
                    }}
                  >
                    {useRoundsLabel ? 'Rounds' : 'Cycles'}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                      aria-label={`Decrease ${useRoundsLabel ? 'rounds' : 'cycles'}`}
                      onClick={() => setStepperValue((v) => Math.max(1, v - 1))}
                      style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        border: '1px solid var(--color-border)',
                        background: 'var(--color-surface-raised)',
                        color: 'var(--color-text)',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        lineHeight: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-ui)',
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: 300,
                        color: 'var(--color-text)',
                        minWidth: '2rem',
                        textAlign: 'center',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {stepperValue}
                    </span>
                    <button
                      aria-label={`Increase ${useRoundsLabel ? 'rounds' : 'cycles'}`}
                      onClick={() => setStepperValue((v) => v + 1)}
                      style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        border: '1px solid var(--color-border)',
                        background: 'var(--color-surface-raised)',
                        color: 'var(--color-text)',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        lineHeight: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-ui)',
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      color: accentColor,
                      margin: 0,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {stepperLabel}
                  </p>
                </div>
              )}

              {/* Control bar */}
              <ControlBar
                status={timer.status}
                onStart={handleStartStructured}
                onPause={timer.pause}
                onResume={timer.resume}
                onReset={timer.reset}
              />
            </>
          )}

          {/* ── REFERENCE variant ───────────────────────── */}
          {exercise.type === 'reference' && exercise.instructions && (
            <>
              {/* Instruction list */}
              <ol
                style={{
                  margin: '0 0 1.5rem',
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.625rem',
                }}
              >
                {exercise.instructions.map((step, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '1.375rem',
                        height: '1.375rem',
                        borderRadius: '50%',
                        background: accentPale,
                        color: accentColor,
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: '0.1rem',
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'var(--color-text)',
                        lineHeight: 1.65,
                      }}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              {/* Duration selector */}
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  margin: '0 0 0.5rem',
                  textAlign: 'center',
                }}
              >
                Select duration (minutes)
              </p>
              <DurationSelector
                selected={selectedMinutes}
                onSelect={(m) => { setSelectedMinutes(m); setCustomMin(''); }}
                customMin={customMin}
                onCustomChange={(v) => { setCustomMin(v); setSelectedMinutes(null); }}
                accentColor={accentColor}
              />

              {/* Timer ring — simple countdown, no phases */}
              <TimerRing
                remaining={
                  timer.status === 'idle'
                    ? (selectedMinutes ?? (parseInt(customMin) || 0)) * 60
                    : timer.remainingSeconds
                }
                total={
                  timer.status === 'idle'
                    ? (selectedMinutes ?? (parseInt(customMin) || 0)) * 60
                    : timer.totalSeconds
                }
                accentColor={accentColor}
                phaseLabel=""
                phaseRemaining={0}
                status={timer.status}
              />

              {/* Control bar */}
              <ControlBar
                status={timer.status}
                onStart={handleStartOpen}
                onPause={timer.pause}
                onResume={timer.resume}
                onReset={timer.reset}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
