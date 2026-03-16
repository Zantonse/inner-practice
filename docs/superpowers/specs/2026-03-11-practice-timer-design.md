# Practice Timer — Design Spec

**Date:** 2026-03-11
**Route:** `/practice`
**Status:** Approved (reviewed, issues resolved)

## Overview

A dedicated practice timer page for Inner Practice with two modes: an open countdown timer for freeform sessions and a guided interval timer with pre-built presets for specific techniques across all five tracks (Meditation, Breathwork, Yoga, Nervous System).

## Requirements

- **Two modes:** Open Timer (freeform countdown) and Guided Presets (interval sequences)
- **Location:** Dedicated `/practice` route, linked from main nav
- **Audio:** Simple singing bowl bell chime on start, transitions, and completion
- **State:** Stateless — no persistence, no login, no session logging
- **Wake Lock:** Screen stays awake during active timer via Wake Lock API

## Page Structure

1. **Compact hero** — Violet gradient (`linear-gradient(160deg, oklch(60% 0.14 300 / 0.35), oklch(93% 0.03 300))`), heading "Practice", subtitle "Set your timer. Begin." No hero image.
2. **Mode tabs** — Two pill tabs: "Open Timer" / "Guided Presets" (uses existing `.pill-tab` / `.pill-tab.active` CSS). Mode tabs always use violet regardless of active track.
3. **Timer display** — Large `MM:SS` in Cormorant Garamond, circular SVG progress ring
4. **Controls** — Start / Pause / Resume / Reset with `aria-label` attributes

### Open Timer Mode

- Duration pills: 5 / 10 / 15 / 20 / 30 / 45 / 60 min + custom input
- Custom input validation: min 1 min, max 180 min, integers only
- Optional interval bell toggle (every N minutes)
- Bell at start and end

### Guided Presets Mode

Preset cards grouped by track. Each card: name, total duration, phase count, description. Clicking loads into interval timer.

#### Presets

All presets use time-based phases only. Techniques with variable-rate components (like breath counting) are approximated to fixed durations.

| Track | Preset | Phases | Total |
|-------|--------|--------|-------|
| Meditation | Beginner Sit | 10 min continuous | 10 min |
| Meditation | Standard Sit | 20 min continuous | 20 min |
| Meditation | Extended Sit | 45 min continuous | 45 min |
| Breathwork | Box Breathing | 4s inhale → 4s hold → 4s exhale → 4s hold (×19 cycles) | 5:04 |
| Breathwork | 4-7-8 Relaxation | 4s inhale → 7s hold → 8s exhale (×16 cycles) | 5:04 |
| Breathwork | Wim Hof (3 rounds) | 90s power breathing → 90s hold → 15s recovery ×3 | 9:45 |
| Breathwork | Physiological Sigh | 2s sniff-in → 1s sniff-in → 6s exhale (×20 cycles) | 3:00 |
| Yoga | Pose Hold (5 reps) | 60s hold → 10s transition ×5 | 5:50 |
| Yoga | Yin Yoga Hold (5 reps) | 3 min hold → 30s transition ×5 | 17:30 |
| Nervous System | Cold Exposure (1 min) | 60s countdown | 1:00 |
| Nervous System | Cold Exposure (3 min) | 180s countdown | 3:00 |
| Nervous System | Coherent Breathing | 5s inhale → 5s exhale (×60 cycles) | 10:00 |

**Preset changes from initial draft (review fixes):**
- Wim Hof: "30 breaths" → fixed 90s (approximates 30 breaths at ~3s/breath)
- Physiological Sigh: broken into 3 timed micro-phases per cycle
- Box Breathing / 4-7-8: total duration = complete cycles only (no mid-cycle cutoff)
- Yoga presets: fixed at 5 reps each (no configurable UI needed)
- Cold Exposure: two separate presets at fixed durations (no selector needed)
- "Vagal Tone (6 bpm)" → renamed "Coherent Breathing" to match existing site content

**Cycle completion rule:** Repeating presets always run for a whole number of cycles. The total duration adjusts to the nearest complete cycle.

### Interval Timer Mechanics

```ts
type Phase = {
  label: string;    // "Inhale", "Hold", "Exhale", etc.
  duration: number; // seconds
};

type Preset = {
  name: string;
  track: 'meditation' | 'breathwork' | 'yoga' | 'nervous-system';
  description: string;
  phases: Phase[];
  rounds: number;   // 1 for single-pass, 3 for Wim Hof, etc.
  cycles: number;   // how many times to repeat the phase sequence per round
};
```

- Current phase label displayed above timer (e.g., "Inhale", "Hold", "Exhale")
- Bell chime on each phase transition
- Round counter for multi-round presets (e.g., "Round 2 of 3")
- Single-phase presets (Meditation): bell at start and end only, no transition bells

### Completion State

When `status === 'complete'`:
- Progress ring is fully depleted (empty)
- Timer shows `00:00`
- Text above timer: "Complete" in accent color
- Bell chime plays
- Controls show only "Reset" button (returns to preset selection or duration picker)
- No auto-reset — user manually resets

## Technical Implementation

### Files

| File | Action |
|------|--------|
| `src/app/practice/page.tsx` | Create — server component with metadata |
| `src/app/practice/PracticeClient.tsx` | Create — main client component |
| `src/app/layout.tsx` | Modify — add "Practice" nav link |
| `public/sounds/bowl.mp3` | Add — singing bowl chime |

### Component Architecture

All in `PracticeClient.tsx`:

- `PracticeClient` — top-level, mode tabs, state management
- `OpenTimer` — freeform countdown with duration selector
- `GuidedPresets` — preset card grid
- `IntervalTimer` — phase-aware countdown with round tracking
- `TimerDisplay` — shared circular SVG ring + time display
- `ControlBar` — Start/Pause/Reset buttons

### State Management

Single `useReducer` for timer state. All phase transition logic lives inside the reducer (not in component-level effects) to avoid stale closure issues with `setInterval`.

```ts
type Phase = { label: string; duration: number };

type TimerState = {
  status: 'idle' | 'running' | 'paused' | 'complete';
  mode: 'open' | 'guided';
  selectedPreset: Preset | null;
  totalSeconds: number;
  remainingSeconds: number;
  currentPhaseIndex: number;
  phaseRemaining: number;
  currentRound: number;
  currentCycle: number;
  totalRounds: number;
  totalCycles: number;
  phases: Phase[];
};

type TimerAction =
  | { type: 'TICK' }
  | { type: 'START_OPEN'; totalSeconds: number }
  | { type: 'START_PRESET'; preset: Preset }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESET' };
```

The `TICK` action handler in the reducer:
1. Decrements `phaseRemaining`
2. If phase complete → advance to next phase, reset `phaseRemaining`
3. If all phases complete → advance cycle count
4. If all cycles complete → advance round count
5. If all rounds complete → set `status: 'complete'`
6. Also decrements `remainingSeconds` for the overall progress ring

### Audio

- Instantiate `new Audio('/sounds/bowl.mp3')` inside `useEffect(() => { ... }, [])` — never at module scope (SSR safety)
- Store in `useRef<HTMLAudioElement>`
- Play on: session start, phase transitions (rewind to 0 before replay), session complete
- Wrapped in try/catch for autoplay policy
- Single-phase presets: bell at start and end only

### Wake Lock

```ts
const wakeLockRef = useRef<WakeLockSentinel | null>(null);

// In start handler:
useEffect(() => {
  if (state.status === 'running') {
    navigator.wakeLock?.request('screen')
      .then(sentinel => { wakeLockRef.current = sentinel; })
      .catch(() => {}); // Feature not supported or denied
  }
  return () => { wakeLockRef.current?.release(); wakeLockRef.current = null; };
}, [state.status]);
```

### Styling

- Inline styles matching existing design system
- Page chrome uses violet accent (consistent with nav/brand)
- Preset cards use track-specific accent colors:
  - Meditation: violet (`--color-violet-deep`)
  - Breathwork: teal (`--color-teal-deep`)
  - Yoga: amber (`--color-amber-deep`)
  - Nervous System: rose (`--color-rose-deep`)
- Timer ring stroke color matches the active preset's track accent (violet default for open timer)

### Timer Ring (SVG)

Circular progress ring using SVG `<circle>` with `stroke-dasharray` / `stroke-dashoffset` animated via React state. Diameter ~200px.

### Accessibility

- Start/Pause/Reset buttons include `aria-label` attributes
- Timer display uses `role="timer"` and `aria-live="off"` (to avoid screen reader noise every second)
- Phase label uses `aria-live="polite"` to announce phase changes

## Design Decisions

1. **Single file (PracticeClient.tsx)** — follows existing pattern where each route has one large client component
2. **Presets as data, not config UI** — no custom sequence builder, keeping it stateless and simple
3. **All phases are time-based** — variable-rate techniques approximated to fixed durations for simplicity
4. **Complete cycles only** — repeating presets adjust total duration to whole cycles, never cut off mid-phase
5. **HTMLAudioElement over Web Audio API** — single bell sound doesn't need mixing/layering
6. **No landing page changes** — nav link is sufficient for discovery
7. **useReducer with all logic in reducer** — avoids stale closure issues with setInterval; tick handler is pure
8. **Audio ref in useEffect** — SSR-safe instantiation, stored in useRef to avoid re-renders
9. **WakeLock in useRef** — sentinel stored in ref with cleanup on status change
