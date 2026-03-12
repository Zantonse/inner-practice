'use client';

import { useReducer, useEffect, useRef, useCallback, useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

// ── Accent tokens ──────────────────────────────────────────────
const VIOLET_DEEP = '#592E6B';
const TEAL_DEEP   = '#2E7070';
const TEAL_MID    = '#5BA4A4';
const AMBER_DEEP  = '#C07A35';
const ROSE_DEEP   = '#8B3A62';
const ROSE_MID    = '#C27BA0';

// ── Types ──────────────────────────────────────────────────────
type Phase = { label: string; duration: number };
type Track = 'meditation' | 'breathwork' | 'yoga' | 'nervous-system';

type Preset = {
  id: string;
  name: string;
  track: Track;
  description: string;
  phases: Phase[];
  cycles: number;
  rounds: number;
};

type TimerStatus = 'idle' | 'running' | 'paused' | 'complete';

type TimerState = {
  status: TimerStatus;
  mode: 'open' | 'guided';
  selectedPreset: Preset | null;
  totalSeconds: number;
  remainingSeconds: number;
  phases: Phase[];
  currentPhaseIndex: number;
  phaseRemaining: number;
  currentCycle: number;
  totalCycles: number;
  currentRound: number;
  totalRounds: number;
  shouldChime: boolean;
};

type TimerAction =
  | { type: 'START_OPEN'; totalSeconds: number }
  | { type: 'START_PRESET'; preset: Preset }
  | { type: 'TICK' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESET' }
  | { type: 'CLEAR_CHIME' };

// ── Track Metadata ─────────────────────────────────────────────
const TRACK_META: Record<Track, { label: string; accent: string; accentLight: string }> = {
  meditation:      { label: 'Meditation',     accent: VIOLET_DEEP, accentLight: '#D7C2EE' },
  breathwork:      { label: 'Breathwork',     accent: TEAL_DEEP,   accentLight: '#A8DADA' },
  yoga:            { label: 'Yoga',           accent: AMBER_DEEP,  accentLight: '#E4AD75' },
  'nervous-system': { label: 'Nervous System', accent: ROSE_DEEP,   accentLight: '#E8B4CF' },
};

// ── Presets ─────────────────────────────────────────────────────
const PRESETS: Preset[] = [
  // Meditation
  { id: 'med-10', name: 'Beginner Sit', track: 'meditation', description: '10 minutes of stillness.', phases: [{ label: 'Meditate', duration: 600 }], cycles: 1, rounds: 1 },
  { id: 'med-20', name: 'Standard Sit', track: 'meditation', description: '20 minutes of open awareness.', phases: [{ label: 'Meditate', duration: 1200 }], cycles: 1, rounds: 1 },
  { id: 'med-45', name: 'Extended Sit', track: 'meditation', description: '45 minutes of deep practice.', phases: [{ label: 'Meditate', duration: 2700 }], cycles: 1, rounds: 1 },
  // Breathwork
  { id: 'box', name: 'Box Breathing', track: 'breathwork', description: '4-4-4-4 equal ratio. Used by Navy SEALs for calm under pressure.', phases: [{ label: 'Inhale', duration: 4 }, { label: 'Hold', duration: 4 }, { label: 'Exhale', duration: 4 }, { label: 'Hold', duration: 4 }], cycles: 19, rounds: 1 },
  { id: '478', name: '4-7-8 Relaxation', track: 'breathwork', description: 'Dr. Andrew Weil\'s calming breath. Activates the vagus nerve.', phases: [{ label: 'Inhale', duration: 4 }, { label: 'Hold', duration: 7 }, { label: 'Exhale', duration: 8 }], cycles: 16, rounds: 1 },
  { id: 'wimhof', name: 'Wim Hof (3 Rounds)', track: 'breathwork', description: 'Power breathing, retention, and recovery. Builds autonomic resilience.', phases: [{ label: 'Power Breathing', duration: 90 }, { label: 'Breath Hold', duration: 90 }, { label: 'Recovery Breath', duration: 15 }], cycles: 1, rounds: 3 },
  { id: 'sigh', name: 'Physiological Sigh', track: 'breathwork', description: 'Double inhale, long exhale. Fastest known calm-down signal.', phases: [{ label: 'Sniff In', duration: 2 }, { label: 'Sniff In', duration: 1 }, { label: 'Exhale', duration: 6 }], cycles: 20, rounds: 1 },
  // Yoga
  { id: 'pose-hold', name: 'Pose Hold (5 reps)', track: 'yoga', description: '60-second holds with 10-second transitions.', phases: [{ label: 'Hold', duration: 60 }, { label: 'Transition', duration: 10 }], cycles: 5, rounds: 1 },
  { id: 'yin-hold', name: 'Yin Yoga (5 holds)', track: 'yoga', description: '3-minute deep holds with 30-second transitions.', phases: [{ label: 'Hold', duration: 180 }, { label: 'Transition', duration: 30 }], cycles: 5, rounds: 1 },
  // Nervous System
  { id: 'cold-1', name: 'Cold Exposure (1 min)', track: 'nervous-system', description: 'Short cold immersion timer.', phases: [{ label: 'Cold Exposure', duration: 60 }], cycles: 1, rounds: 1 },
  { id: 'cold-3', name: 'Cold Exposure (3 min)', track: 'nervous-system', description: 'Extended cold immersion timer.', phases: [{ label: 'Cold Exposure', duration: 180 }], cycles: 1, rounds: 1 },
  { id: 'coherent', name: 'Coherent Breathing', track: 'nervous-system', description: '5s in, 5s out at 6 breaths/min. Maximizes vagal tone.', phases: [{ label: 'Inhale', duration: 5 }, { label: 'Exhale', duration: 5 }], cycles: 60, rounds: 1 },
];

// ── Reducer ─────────────────────────────────────────────────────
const initialState: TimerState = {
  status: 'idle', mode: 'open', selectedPreset: null,
  totalSeconds: 0, remainingSeconds: 0,
  phases: [], currentPhaseIndex: 0, phaseRemaining: 0,
  currentCycle: 1, totalCycles: 1, currentRound: 1, totalRounds: 1,
  shouldChime: false,
};

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'START_OPEN':
      return {
        ...initialState, status: 'running', mode: 'open',
        totalSeconds: action.totalSeconds, remainingSeconds: action.totalSeconds,
        phases: [{ label: 'Practice', duration: action.totalSeconds }],
        currentPhaseIndex: 0, phaseRemaining: action.totalSeconds,
        currentCycle: 1, totalCycles: 1, currentRound: 1, totalRounds: 1,
        shouldChime: true,
      };

    case 'START_PRESET': {
      const p = action.preset;
      const cycleDur = p.phases.reduce((s, ph) => s + ph.duration, 0);
      const total = cycleDur * p.cycles * p.rounds;
      return {
        ...initialState, status: 'running', mode: 'guided', selectedPreset: p,
        totalSeconds: total, remainingSeconds: total,
        phases: p.phases, currentPhaseIndex: 0, phaseRemaining: p.phases[0].duration,
        currentCycle: 1, totalCycles: p.cycles, currentRound: 1, totalRounds: p.rounds,
        shouldChime: true,
      };
    }

    case 'TICK': {
      if (state.status !== 'running') return state;
      const next: TimerState = {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        phaseRemaining: state.phaseRemaining - 1,
        shouldChime: false,
      };

      if (next.phaseRemaining <= 0) {
        const nextPhaseIdx = next.currentPhaseIndex + 1;
        if (nextPhaseIdx < next.phases.length) {
          next.currentPhaseIndex = nextPhaseIdx;
          next.phaseRemaining = next.phases[nextPhaseIdx].duration;
          next.shouldChime = true;
        } else {
          const nextCycle = next.currentCycle + 1;
          if (nextCycle <= next.totalCycles) {
            next.currentCycle = nextCycle;
            next.currentPhaseIndex = 0;
            next.phaseRemaining = next.phases[0].duration;
            next.shouldChime = true;
          } else {
            const nextRound = next.currentRound + 1;
            if (nextRound <= next.totalRounds) {
              next.currentRound = nextRound;
              next.currentCycle = 1;
              next.currentPhaseIndex = 0;
              next.phaseRemaining = next.phases[0].duration;
              next.shouldChime = true;
            } else {
              next.status = 'complete';
              next.shouldChime = true;
            }
          }
        }
      }

      if (next.remainingSeconds <= 0) {
        next.status = 'complete';
        next.shouldChime = true;
      }
      return next;
    }

    case 'PAUSE':     return { ...state, status: 'paused', shouldChime: false };
    case 'RESUME':    return { ...state, status: 'running', shouldChime: false };
    case 'RESET':     return initialState;
    case 'CLEAR_CHIME': return { ...state, shouldChime: false };
    default:          return state;
  }
}

// ── Helpers ─────────────────────────────────────────────────────
function formatTime(seconds: number): string {
  const m = Math.floor(Math.max(0, seconds) / 60);
  const s = Math.max(0, seconds) % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function presetTotalSeconds(p: Preset): number {
  return p.phases.reduce((s, ph) => s + ph.duration, 0) * p.cycles * p.rounds;
}

function formatDuration(totalSec: number): string {
  if (totalSec < 60) return `${totalSec}s`;
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return s > 0 ? `${m}:${String(s).padStart(2, '0')}` : `${m} min`;
}

// ── TimerDisplay ────────────────────────────────────────────────
function TimerDisplay({
  remaining,
  total,
  accentColor,
  phaseLabel,
  status,
  roundInfo,
}: {
  remaining: number;
  total: number;
  accentColor: string;
  phaseLabel: string;
  status: TimerStatus;
  roundInfo?: string;
}) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? remaining / total : 0;
  const offset = circumference * (1 - progress);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0' }}>
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
          margin: '0 0 1.5rem',
          minHeight: '1.2em',
        }}
      >
        {status === 'complete' ? 'Complete' : phaseLabel}
      </p>

      {/* Ring + time */}
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="100" cy="100" r={radius} fill="none" stroke="var(--color-border)" strokeWidth="4" />
          <circle
            cx="100" cy="100" r={radius} fill="none"
            stroke={accentColor} strokeWidth="4"
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
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 300,
            color: 'var(--color-text)',
            margin: 0,
            letterSpacing: '0.04em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {formatTime(remaining)}
        </p>
      </div>

      {/* Round info */}
      {roundInfo && (
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          color: 'var(--color-text-muted)',
          margin: '1rem 0 0',
          letterSpacing: '0.08em',
        }}>
          {roundInfo}
        </p>
      )}
    </div>
  );
}

// ── ControlBar ──────────────────────────────────────────────────
function ControlBar({
  status,
  onStart,
  onPause,
  onResume,
  onReset,
}: {
  status: TimerStatus;
  onStart?: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}) {
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
        <button onClick={onPause} style={btn('var(--color-surface-raised)', 'var(--color-text)')} aria-label="Pause timer">
          Pause
        </button>
      )}
      {status === 'paused' && (
        <>
          <button onClick={onResume} style={btn(ROSE_MID, '#F5EAE1')} aria-label="Resume timer">
            Resume
          </button>
          <button onClick={onReset} style={btn('var(--color-surface-raised)', 'var(--color-text-muted)')} aria-label="Reset timer">
            Reset
          </button>
        </>
      )}
      {status === 'complete' && (
        <button onClick={onReset} style={btn('var(--color-surface-raised)', 'var(--color-text)')} aria-label="Reset timer">
          Reset
        </button>
      )}
    </div>
  );
}

// ── PresetCard ──────────────────────────────────────────────────
function PresetCard({
  preset,
  onSelect,
}: {
  preset: Preset;
  onSelect: (p: Preset) => void;
}) {
  const meta = TRACK_META[preset.track];
  const total = presetTotalSeconds(preset);
  const phaseCount = preset.phases.length * preset.cycles * preset.rounds;

  return (
    <button
      onClick={() => onSelect(preset)}
      style={{
        textAlign: 'left',
        background: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
        borderTop: `3px solid ${meta.accent}`,
        borderRadius: '2px',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'border-color 300ms ease, background-color 300ms ease',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <h4 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.125rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: 0,
          fontStyle: 'normal',
        }}>
          {preset.name}
        </h4>
        <span style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.625rem',
          fontWeight: 500,
          color: meta.accent,
          letterSpacing: '0.06em',
          whiteSpace: 'nowrap',
          marginLeft: '0.75rem',
        }}>
          {formatDuration(total)}
        </span>
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.8125rem',
        color: 'var(--color-text-muted)',
        margin: '0 0 0.75rem',
        lineHeight: 1.6,
      }}>
        {preset.description}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {preset.phases.map((ph, i) => (
          <span key={i} style={{
            display: 'inline-block',
            padding: '0.15rem 0.5rem',
            borderRadius: '9999px',
            background: `color-mix(in srgb, ${meta.accentLight} 25%, var(--color-cream))`,
            fontFamily: 'var(--font-ui)',
            fontSize: '0.5625rem',
            fontWeight: 500,
            color: meta.accent,
            letterSpacing: '0.04em',
          }}>
            {ph.label} {ph.duration}s
          </span>
        ))}
        {preset.rounds > 1 && (
          <span style={{
            display: 'inline-block',
            padding: '0.15rem 0.5rem',
            borderRadius: '9999px',
            background: 'var(--color-linen)',
            fontFamily: 'var(--font-ui)',
            fontSize: '0.5625rem',
            fontWeight: 500,
            color: 'var(--color-text-muted)',
          }}>
            {preset.rounds} rounds
          </span>
        )}
        {preset.cycles > 1 && (
          <span style={{
            display: 'inline-block',
            padding: '0.15rem 0.5rem',
            borderRadius: '9999px',
            background: 'var(--color-linen)',
            fontFamily: 'var(--font-ui)',
            fontSize: '0.5625rem',
            fontWeight: 500,
            color: 'var(--color-text-muted)',
          }}>
            {preset.cycles} cycles
          </span>
        )}
      </div>
    </button>
  );
}

// ── Duration Selector ───────────────────────────────────────────
const DURATION_OPTIONS = [5, 10, 15, 20, 30, 45, 60];

function DurationSelector({
  selected,
  onSelect,
  customMin,
  onCustomChange,
}: {
  selected: number | null;
  onSelect: (min: number) => void;
  customMin: string;
  onCustomChange: (val: string) => void;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', justifyContent: 'center', alignItems: 'center' }}>
      {DURATION_OPTIONS.map((m) => (
        <button
          key={m}
          onClick={() => onSelect(m)}
          className={selected === m ? 'pill-tab active' : 'pill-tab'}
          style={{ minWidth: '3.5rem' }}
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
            padding: '0.5rem 0.75rem',
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

// ════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ════════════════════════════════════════════════════════════════
export default function PracticeClient() {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const [activeTab, setActiveTab] = useState<'open' | 'guided'>('open');
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(10);
  const [customMin, setCustomMin] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Audio init (SSR-safe)
  useEffect(() => {
    audioRef.current = new Audio('/sounds/bowl.wav');
    audioRef.current.volume = 0.5;
    audioRef.current.preload = 'auto';
  }, []);

  // Play chime when shouldChime flag is set
  useEffect(() => {
    if (state.shouldChime && audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      } catch { /* autoplay blocked */ }
      dispatch({ type: 'CLEAR_CHIME' });
    }
  }, [state.shouldChime]);

  // Interval tick
  useEffect(() => {
    if (state.status === 'running') {
      intervalRef.current = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.status]);

  // Wake lock
  useEffect(() => {
    if (state.status === 'running') {
      navigator.wakeLock?.request('screen')
        .then((s) => { wakeLockRef.current = s; })
        .catch(() => {});
    }
    return () => {
      wakeLockRef.current?.release();
      wakeLockRef.current = null;
    };
  }, [state.status]);

  // Handlers
  const handleStartOpen = useCallback(() => {
    const mins = selectedMinutes ?? parseInt(customMin);
    if (!mins || mins < 1 || mins > 180) return;
    dispatch({ type: 'START_OPEN', totalSeconds: mins * 60 });
  }, [selectedMinutes, customMin]);

  const handleStartPreset = useCallback((preset: Preset) => {
    dispatch({ type: 'START_PRESET', preset });
  }, []);

  const handlePause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const handleResume = useCallback(() => dispatch({ type: 'RESUME' }), []);
  const handleReset = useCallback(() => dispatch({ type: 'RESET' }), []);

  // Derived values
  const accentColor = state.selectedPreset
    ? TRACK_META[state.selectedPreset.track].accent
    : VIOLET_DEEP;

  const roundInfo = state.totalRounds > 1
    ? `Round ${state.currentRound} of ${state.totalRounds}`
    : state.totalCycles > 1
      ? `Cycle ${state.currentCycle} of ${state.totalCycles}`
      : undefined;

  const isTimerActive = state.status !== 'idle';

  // Group presets by track
  const presetsByTrack = (Object.keys(TRACK_META) as Track[]).map((track) => ({
    track,
    meta: TRACK_META[track],
    presets: PRESETS.filter((p) => p.track === track),
  })).filter((g) => g.presets.length > 0);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
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
          Set your timer. Begin.
        </p>
      </section>

      {/* ── Main Content ────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(2rem, 4vw, 3rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>

          {/* Mode Tabs (hidden when timer is active) */}
          {!isTimerActive && (
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <button
                className={activeTab === 'open' ? 'pill-tab active' : 'pill-tab'}
                onClick={() => setActiveTab('open')}
              >
                Open Timer
              </button>
              <button
                className={activeTab === 'guided' ? 'pill-tab active' : 'pill-tab'}
                onClick={() => setActiveTab('guided')}
              >
                Guided Presets
              </button>
            </div>
          )}

          {/* ── Active Timer View ─────────────────────────── */}
          {isTimerActive && (
            <ScrollReveal>
              <div style={{ textAlign: 'center' }}>
                {/* Preset name if guided */}
                {state.selectedPreset && (
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.375rem',
                    fontWeight: 600,
                    color: accentColor,
                    margin: '0 0 0.5rem',
                    fontStyle: 'normal',
                  }}>
                    {state.selectedPreset.name}
                  </p>
                )}

                <TimerDisplay
                  remaining={state.remainingSeconds}
                  total={state.totalSeconds}
                  accentColor={accentColor}
                  phaseLabel={state.phases[state.currentPhaseIndex]?.label ?? ''}
                  status={state.status}
                  roundInfo={roundInfo}
                />

                <ControlBar
                  status={state.status}
                  onPause={handlePause}
                  onResume={handleResume}
                  onReset={handleReset}
                />
              </div>
            </ScrollReveal>
          )}

          {/* ── Open Timer (idle) ─────────────────────────── */}
          {!isTimerActive && activeTab === 'open' && (
            <ScrollReveal>
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    margin: '0 0 1.5rem',
                  }}
                >
                  Select duration (minutes)
                </p>

                <DurationSelector
                  selected={selectedMinutes}
                  onSelect={(m) => { setSelectedMinutes(m); setCustomMin(''); }}
                  customMin={customMin}
                  onCustomChange={(v) => { setCustomMin(v); setSelectedMinutes(null); }}
                />

                {/* Preview */}
                <TimerDisplay
                  remaining={(selectedMinutes ?? (parseInt(customMin) || 0)) * 60}
                  total={(selectedMinutes ?? (parseInt(customMin) || 0)) * 60}
                  accentColor={VIOLET_DEEP}
                  phaseLabel=""
                  status="idle"
                />

                <ControlBar
                  status="idle"
                  onStart={handleStartOpen}
                  onPause={handlePause}
                  onResume={handleResume}
                  onReset={handleReset}
                />
              </div>
            </ScrollReveal>
          )}

          {/* ── Guided Presets (idle) ─────────────────────── */}
          {!isTimerActive && activeTab === 'guided' && (
            <div>
              {presetsByTrack.map((group) => (
                <ScrollReveal key={group.track}>
                  <div style={{ marginBottom: '2.5rem' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.6875rem',
                        fontWeight: 500,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: group.meta.accent,
                        margin: '0 0 1rem',
                      }}
                    >
                      {group.meta.label}
                    </p>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: '0.875rem',
                      }}
                    >
                      {group.presets.map((preset) => (
                        <PresetCard key={preset.id} preset={preset} onSelect={handleStartPreset} />
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
