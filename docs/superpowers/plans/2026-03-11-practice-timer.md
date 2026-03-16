# Practice Timer Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/practice` page with a freeform countdown timer and guided interval presets for all 5 Inner Practice tracks.

**Architecture:** Single-route client component (`PracticeClient.tsx`) with `useReducer` for timer state management. Two modes: open timer (simple countdown) and guided presets (phase-aware interval timer). All presets defined as data arrays. Audio via `HTMLAudioElement` in `useRef`. Wake Lock API for screen-on during sessions.

**Tech Stack:** Next.js 16, React 19, TypeScript, inline styles (existing design system), SVG for timer ring, Web Audio (HTMLAudioElement)

**Spec:** `docs/superpowers/specs/2026-03-11-practice-timer-design.md`

**Existing patterns to follow:** See `src/app/breathe/BreatheClient.tsx` for page structure, `src/app/nervous-system/page.tsx` for server component pattern, `src/app/globals.css` for CSS vars and `.pill-tab` class.

---

## Chunk 1: Foundation — Server Component, Nav Link, Audio Asset

### Task 1: Create the singing bowl audio file

**Files:**
- Create: `public/sounds/bowl.mp3`

We need a singing bowl chime sound (~2 seconds, <50KB). Generate a synthetic one using the Web Audio API offline, or download a CC0 singing bowl sample.

- [ ] **Step 1: Generate a synthetic bowl sound using ffmpeg**

```bash
# Generate a 2-second sine wave with exponential decay (singing bowl approximation)
ffmpeg -f lavfi -i "sine=frequency=528:duration=2" -af "afade=t=out:st=0.3:d=1.7,volume=0.8" -b:a 64k public/sounds/bowl.mp3
```

If `ffmpeg` is not available, use Python:
```bash
python3 -c "
import struct, math, wave
sr, dur, freq = 44100, 2.0, 528
samples = []
for i in range(int(sr * dur)):
    t = i / sr
    env = math.exp(-t * 3.0)
    val = env * (math.sin(2 * math.pi * freq * t) * 0.5 + math.sin(2 * math.pi * freq * 2.003 * t) * 0.3 + math.sin(2 * math.pi * freq * 3.009 * t) * 0.15)
    samples.append(int(val * 32767))
with wave.open('/tmp/bowl.wav', 'w') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes(struct.pack('<' + 'h' * len(samples), *samples))
print('Written to /tmp/bowl.wav')
"
# Then convert to mp3 if ffmpeg available, or use the wav directly renamed
```

- [ ] **Step 2: Verify the file exists and is reasonable size**

```bash
ls -la public/sounds/bowl.mp3  # or bowl.wav
# Expected: < 100KB
```

---

### Task 2: Create server component (`page.tsx`)

**Files:**
- Create: `src/app/practice/page.tsx`

- [ ] **Step 1: Create the directory and server component**

```tsx
import type { Metadata } from 'next';
import PracticeClient from './PracticeClient';

export const metadata: Metadata = {
  title: 'Practice — Timer & Guided Sessions | Inner Practice',
  description:
    'Set a meditation timer, follow guided breathwork intervals, or practice with pre-built sequences for yoga, nervous system regulation, and more.',
  keywords: [
    'meditation timer', 'breathwork timer', 'yoga timer', 'box breathing',
    'Wim Hof timer', '4-7-8 breathing', 'interval timer', 'practice timer',
    'coherent breathing', 'cold exposure timer',
  ],
};

export default function PracticePage() {
  return <PracticeClient />;
}
```

- [ ] **Step 2: Verify file created**

```bash
ls src/app/practice/page.tsx
```

---

### Task 3: Add "Practice" link to nav

**Files:**
- Modify: `src/app/layout.tsx` (around line 155, after the "Nervous System" link)

- [ ] **Step 1: Add the Practice nav link after the Nervous System link**

Insert this Link block after the Nervous System `</Link>` and before `<ThemeToggle />`:

```tsx
<Link
  href="/practice"
  style={{
    fontFamily: 'var(--font-ui)',
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    transition: 'color 300ms ease',
  }}
>
  Practice
</Link>
```

- [ ] **Step 2: Verify layout.tsx has 6 nav links**

Check the file — should now have: Meditate, Yoga, Fascia, Breathe, Nervous System, Practice.

---

### Task 4: Create stub PracticeClient so the build passes

**Files:**
- Create: `src/app/practice/PracticeClient.tsx`

- [ ] **Step 1: Create a minimal stub**

```tsx
'use client';

export default function PracticeClient() {
  return (
    <section style={{ padding: '8rem 2rem', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-text)' }}>
        Practice
      </h1>
      <p style={{ color: 'var(--color-text-muted)' }}>Timer coming soon.</p>
    </section>
  );
}
```

- [ ] **Step 2: Run build to verify compilation**

```bash
npx next build 2>&1 | tail -15
```

Expected: All 7 routes compile (`/`, `/breathe`, `/fascia`, `/meditate`, `/nervous-system`, `/practice`, `/yoga`). Zero TypeScript errors.

- [ ] **Step 3: Commit foundation**

```bash
git add src/app/practice/ src/app/layout.tsx public/sounds/
git commit -m "feat(practice): add /practice route stub, nav link, and bowl audio"
```

---

## Chunk 2: Timer Core — Types, Reducer, and Timer Display

### Task 5: Write the full PracticeClient with types, presets, and reducer

**Files:**
- Modify: `src/app/practice/PracticeClient.tsx`

This is the main implementation task. The file will contain:

1. Type definitions (`Phase`, `Preset`, `TimerState`, `TimerAction`)
2. Preset data arrays (all 13 presets from the spec)
3. Timer reducer function
4. Sub-components: `TimerDisplay`, `ControlBar`, `OpenTimer`, `GuidedPresets`, `IntervalTimer`
5. Main `PracticeClient` component

- [ ] **Step 1: Define types and constants at the top of the file**

```tsx
'use client';

import { useReducer, useEffect, useRef, useCallback } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

// ── Accent tokens ──────────────────────────────────────────────
const VIOLET_DEEP = '#592E6B';
const TEAL_DEEP   = '#2E7070';
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
};

type TimerAction =
  | { type: 'START_OPEN'; totalSeconds: number }
  | { type: 'START_PRESET'; preset: Preset }
  | { type: 'TICK' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESET' };
```

- [ ] **Step 2: Define all 13 presets**

Define the preset arrays organized by track. Reference the spec table for exact values. Each preset is a `Preset` object. Group them:

```tsx
const PRESETS: Preset[] = [
  // -- Meditation --
  { id: 'med-10', name: 'Beginner Sit', track: 'meditation', description: '10 minutes of stillness.', phases: [{ label: 'Meditate', duration: 600 }], cycles: 1, rounds: 1 },
  { id: 'med-20', name: 'Standard Sit', track: 'meditation', description: '20 minutes of stillness.', phases: [{ label: 'Meditate', duration: 1200 }], cycles: 1, rounds: 1 },
  { id: 'med-45', name: 'Extended Sit', track: 'meditation', description: '45 minutes of deep practice.', phases: [{ label: 'Meditate', duration: 2700 }], cycles: 1, rounds: 1 },
  // -- Breathwork --
  { id: 'box', name: 'Box Breathing', track: 'breathwork', description: '4-4-4-4 equal ratio breathing. Used by Navy SEALs.', phases: [{ label: 'Inhale', duration: 4 }, { label: 'Hold', duration: 4 }, { label: 'Exhale', duration: 4 }, { label: 'Hold', duration: 4 }], cycles: 19, rounds: 1 },
  { id: '478', name: '4-7-8 Relaxation', track: 'breathwork', description: 'Dr. Andrew Weil\'s calming breath pattern.', phases: [{ label: 'Inhale', duration: 4 }, { label: 'Hold', duration: 7 }, { label: 'Exhale', duration: 8 }], cycles: 16, rounds: 1 },
  { id: 'wimhof', name: 'Wim Hof (3 Rounds)', track: 'breathwork', description: 'Power breathing, retention, and recovery.', phases: [{ label: 'Power Breathing', duration: 90 }, { label: 'Breath Hold', duration: 90 }, { label: 'Recovery Breath', duration: 15 }], cycles: 1, rounds: 3 },
  { id: 'sigh', name: 'Physiological Sigh', track: 'breathwork', description: 'Double inhale, long exhale. Fastest known calm-down.', phases: [{ label: 'Sniff In', duration: 2 }, { label: 'Sniff In', duration: 1 }, { label: 'Exhale', duration: 6 }], cycles: 20, rounds: 1 },
  // -- Yoga --
  { id: 'pose-hold', name: 'Pose Hold (5 reps)', track: 'yoga', description: '60-second holds with 10-second transitions.', phases: [{ label: 'Hold', duration: 60 }, { label: 'Transition', duration: 10 }], cycles: 5, rounds: 1 },
  { id: 'yin-hold', name: 'Yin Yoga Hold (5 reps)', track: 'yoga', description: '3-minute deep holds with 30-second transitions.', phases: [{ label: 'Hold', duration: 180 }, { label: 'Transition', duration: 30 }], cycles: 5, rounds: 1 },
  // -- Nervous System --
  { id: 'cold-1', name: 'Cold Exposure (1 min)', track: 'nervous-system', description: 'Short cold exposure timer.', phases: [{ label: 'Cold Exposure', duration: 60 }], cycles: 1, rounds: 1 },
  { id: 'cold-3', name: 'Cold Exposure (3 min)', track: 'nervous-system', description: 'Extended cold exposure timer.', phases: [{ label: 'Cold Exposure', duration: 180 }], cycles: 1, rounds: 1 },
  { id: 'coherent', name: 'Coherent Breathing', track: 'breathwork', description: '5s in, 5s out at 6 breaths/min. Maximizes vagal tone.', phases: [{ label: 'Inhale', duration: 5 }, { label: 'Exhale', duration: 5 }], cycles: 60, rounds: 1 },
];
```

Note: Coherent Breathing is listed under `nervous-system` in the spec but uses breathwork mechanics. Set `track: 'nervous-system'` to match the spec grouping.

- [ ] **Step 3: Write the timer reducer**

The reducer handles all state transitions. The `TICK` action is self-contained — no external references.

```tsx
function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'START_OPEN':
      return {
        ...state, status: 'running', mode: 'open', selectedPreset: null,
        totalSeconds: action.totalSeconds, remainingSeconds: action.totalSeconds,
        phases: [{ label: 'Practice', duration: action.totalSeconds }],
        currentPhaseIndex: 0, phaseRemaining: action.totalSeconds,
        currentCycle: 1, totalCycles: 1, currentRound: 1, totalRounds: 1,
      };
    case 'START_PRESET': {
      const p = action.preset;
      const cycleDuration = p.phases.reduce((s, ph) => s + ph.duration, 0);
      const total = cycleDuration * p.cycles * p.rounds;
      return {
        ...state, status: 'running', mode: 'guided', selectedPreset: p,
        totalSeconds: total, remainingSeconds: total,
        phases: p.phases, currentPhaseIndex: 0, phaseRemaining: p.phases[0].duration,
        currentCycle: 1, totalCycles: p.cycles, currentRound: 1, totalRounds: p.rounds,
      };
    }
    case 'TICK': {
      if (state.status !== 'running') return state;
      const next = { ...state, remainingSeconds: state.remainingSeconds - 1, phaseRemaining: state.phaseRemaining - 1 };
      if (next.phaseRemaining <= 0) {
        // Advance phase
        const nextPhaseIdx = next.currentPhaseIndex + 1;
        if (nextPhaseIdx < next.phases.length) {
          next.currentPhaseIndex = nextPhaseIdx;
          next.phaseRemaining = next.phases[nextPhaseIdx].duration;
        } else {
          // Cycle complete
          const nextCycle = next.currentCycle + 1;
          if (nextCycle <= next.totalCycles) {
            next.currentCycle = nextCycle;
            next.currentPhaseIndex = 0;
            next.phaseRemaining = next.phases[0].duration;
          } else {
            // Round complete
            const nextRound = next.currentRound + 1;
            if (nextRound <= next.totalRounds) {
              next.currentRound = nextRound;
              next.currentCycle = 1;
              next.currentPhaseIndex = 0;
              next.phaseRemaining = next.phases[0].duration;
            } else {
              next.status = 'complete';
            }
          }
        }
      }
      if (next.remainingSeconds <= 0) next.status = 'complete';
      return next;
    }
    case 'PAUSE': return { ...state, status: 'paused' };
    case 'RESUME': return { ...state, status: 'running' };
    case 'RESET': return initialState;
    default: return state;
  }
}

const initialState: TimerState = {
  status: 'idle', mode: 'open', selectedPreset: null,
  totalSeconds: 0, remainingSeconds: 0,
  phases: [], currentPhaseIndex: 0, phaseRemaining: 0,
  currentCycle: 1, totalCycles: 1, currentRound: 1, totalRounds: 1,
};
```

- [ ] **Step 4: Write the TimerDisplay sub-component (SVG ring + time)**

```tsx
function TimerDisplay({ remaining, total, accentColor }: { remaining: number; total: number; accentColor: string }) {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? remaining / total : 0;
  const offset = circumference * (1 - progress);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0' }}>
      <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="100" cy="100" r={radius} fill="none" stroke="var(--color-border)" strokeWidth="4" />
        <circle cx="100" cy="100" r={radius} fill="none" stroke={accentColor} strokeWidth="4"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.3s ease' }} />
      </svg>
      <p role="timer" aria-live="off" style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        fontWeight: 300, color: 'var(--color-text)', margin: '-140px 0 0', position: 'relative',
        letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums',
      }}>
        {timeStr}
      </p>
    </div>
  );
}
```

- [ ] **Step 5: Write the ControlBar sub-component**

```tsx
function ControlBar({ status, onStart, onPause, onResume, onReset }: {
  status: TimerStatus;
  onStart?: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}) {
  const btnStyle = (bg: string, color: string): React.CSSProperties => ({
    fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 500,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '0.75rem 2rem', borderRadius: '2px', border: 'none', cursor: 'pointer',
    background: bg, color, transition: 'opacity 200ms ease',
  });

  return (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
      {status === 'idle' && onStart && (
        <button onClick={onStart} style={btnStyle(ROSE_MID, '#F5EAE1')} aria-label="Start timer">Start</button>
      )}
      {status === 'running' && (
        <button onClick={onPause} style={btnStyle('var(--color-surface-raised)', 'var(--color-text)')} aria-label="Pause timer">Pause</button>
      )}
      {status === 'paused' && (
        <>
          <button onClick={onResume} style={btnStyle(ROSE_MID, '#F5EAE1')} aria-label="Resume timer">Resume</button>
          <button onClick={onReset} style={btnStyle('var(--color-surface-raised)', 'var(--color-text-muted)')} aria-label="Reset timer">Reset</button>
        </>
      )}
      {status === 'complete' && (
        <button onClick={onReset} style={btnStyle('var(--color-surface-raised)', 'var(--color-text)')} aria-label="Reset timer">Reset</button>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Write the OpenTimer sub-component (duration selector + timer)**

Includes: duration pill buttons, custom input with validation (1-180 min), and the shared TimerDisplay + ControlBar.

- [ ] **Step 7: Write the GuidedPresets sub-component (preset card grid)**

Cards grouped by track using a `TRACK_META` map for labels and accent colors. Each card is clickable and dispatches `START_PRESET`.

- [ ] **Step 8: Write the main PracticeClient component**

Wires together: mode tabs, audio ref (in useEffect), wake lock ref, setInterval tick, and renders the appropriate sub-component based on mode and status.

Key implementation details:
- `useEffect` for `setInterval` that dispatches `TICK` every 1000ms when `status === 'running'`; clears on cleanup and when status changes
- `useEffect` for audio: `audioRef.current = new Audio('/sounds/bowl.mp3')` on mount only
- `useEffect` for wake lock: request when running, release on cleanup
- `useEffect` watching `currentPhaseIndex` changes to play the bowl chime on transitions
- Play bowl chime when `status` transitions to `'running'` or `'complete'`

- [ ] **Step 9: Verify build compiles**

```bash
npx next build 2>&1 | tail -15
```

Expected: All 7 routes compile. Zero TypeScript errors.

- [ ] **Step 10: Manual verification on dev server**

```bash
npx next dev
# Open http://localhost:3000/practice
```

Verify:
- Mode tabs switch between Open Timer and Guided Presets
- Open Timer: duration pills select times, Start begins countdown, Pause/Resume work, bell plays at start/end
- Guided Presets: cards display grouped by track, clicking loads and starts interval timer
- Phase labels update during interval timer (Inhale/Hold/Exhale etc.)
- SVG ring depletes as time passes
- "Complete" state shows at end with Reset button

- [ ] **Step 11: Commit the full implementation**

```bash
git add src/app/practice/PracticeClient.tsx
git commit -m "feat(practice): implement timer with open + guided preset modes"
```

---

## Chunk 3: Polish and Deploy

### Task 6: Test edge cases and fix issues

- [ ] **Step 1: Test all 13 presets load correctly**

Open each preset card, verify it starts with the correct phase label and total time.

- [ ] **Step 2: Test Wim Hof multi-round**

Start Wim Hof preset. Verify round counter shows "Round 1 of 3", advances through all 3 rounds, then completes.

- [ ] **Step 3: Test wake lock**

Start a timer, verify screen stays on. Pause — verify wake lock releases. Resume — verify re-acquired.

- [ ] **Step 4: Test custom duration input**

Enter 0 → rejected. Enter 200 → rejected (max 180). Enter 15 → accepted.

- [ ] **Step 5: Fix any issues found**

- [ ] **Step 6: Commit fixes**

```bash
git add -A && git commit -m "fix(practice): edge case fixes from manual testing"
```

---

### Task 7: Deploy

- [ ] **Step 1: Push to remote**

```bash
git push origin main
```

- [ ] **Step 2: Deploy to Vercel**

```bash
npx vercel --yes --prod
```

Expected: All 7 routes in the build output. Production URL updates.

- [ ] **Step 3: Verify live site**

Open https://inner-practice.vercel.app/practice — verify timer works in production.
