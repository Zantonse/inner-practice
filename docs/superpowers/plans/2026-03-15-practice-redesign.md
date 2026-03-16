# Practice Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `/practice` from a standalone timer into a 3-tab exercise hub with 43 guided practices, daily routines, and a teacher training curriculum roadmap.

**Architecture:** Extract the existing timer reducer into a `useTimer` custom hook. Build an exercise card component with two variants (structured/reference). Page shell manages tab state with all tabs always-mounted (display:none). Exercise data lives in a typed data file. Certification data populated via web research.

**Tech Stack:** Next.js 16, React 19, TypeScript, inline styles (existing design system), SVG timer ring, Web Audio (HTMLAudioElement), Wake Lock API

**Spec:** `docs/superpowers/specs/2026-03-15-practice-redesign-design.md`

**Existing patterns to follow:** See `src/app/breathe/BreatheClient.tsx` for page structure, `src/app/practice/PracticeClient.tsx` for the current timer implementation, `src/app/globals.css` for CSS vars and `.pill-tab` class.

---

## Chunk 1: Foundation — Types, Timer Hook, Data Files

### Task 1: Create shared types

**Files:**
- Create: `src/app/practice/types.ts`

- [ ] **Step 1: Create types.ts with all shared type definitions**

```ts
// src/app/practice/types.ts

export type Modality =
  | 'meditation' | 'breathwork' | 'yoga' | 'fascia'
  | 'nervous-system' | 'reiki' | 'sound-healing' | 'somatics';

export type ExerciseType = 'structured' | 'reference';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type TimerStatus = 'idle' | 'running' | 'paused' | 'complete';

export type Phase = {
  label: string;
  duration: number; // seconds (supports fractional, e.g., 5.5)
};

export type Exercise = {
  id: string;
  name: string;
  modality: Modality;
  type: ExerciseType;
  level: Level;
  duration: string;        // display string, e.g., '4–10 min'
  description: string;     // one-liner for collapsed card
  learnMorePath: string;   // e.g., '/breathe#box-breathing'
  // Structured exercises:
  phases?: Phase[];
  defaultCycles?: number;
  defaultRounds?: number;
  // Reference exercises:
  instructions?: string[];
  defaultMinutes?: number;
};

export type Certification = {
  modality: Modality;
  program: string;
  school: string;
  format: 'in-person' | 'online' | 'hybrid';
  duration: string;
  cost: string;
  prerequisites: string;
  url: string;
};

export const MODALITY_META: Record<Modality, { label: string; deep: string; pale: string }> = {
  meditation:       { label: 'Meditation',      deep: '#592E6B', pale: '#EDE9FE' },
  breathwork:       { label: 'Breathwork',      deep: '#2E7070', pale: '#E0F4F4' },
  yoga:             { label: 'Yoga',            deep: '#C07A35', pale: '#FFF3E0' },
  fascia:           { label: 'Fascia',          deep: '#8A5A1C', pale: '#FEF3E2' },
  'nervous-system': { label: 'Nervous System',  deep: '#8B3A62', pale: '#F5E0EC' },
  reiki:            { label: 'Reiki',           deep: '#7A5A1E', pale: '#FFF8E1' },
  'sound-healing':  { label: 'Sound Healing',   deep: '#6B4E8B', pale: '#F0E8F7' },
  somatics:         { label: 'Somatics',        deep: '#2D3A6A', pale: '#E8EAF6' },
};

export const LEVEL_COLORS: Record<Level, string> = {
  beginner: '#2E7070',     // teal
  intermediate: '#C07A35', // amber
  advanced: '#592E6B',     // violet
};
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit --project tsconfig.json 2>&1 | grep types.ts`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/practice/types.ts
git commit -m "feat(practice): add shared type definitions and modality metadata"
```

---

### Task 2: Extract useTimer hook from PracticeClient

**Files:**
- Create: `src/app/practice/useTimer.ts`
- Reference: `src/app/practice/PracticeClient.tsx:84-169` (existing reducer), `PracticeClient.tsx:512-575` (existing effects/handlers)

- [ ] **Step 1: Create useTimer.ts — extract reducer and side effects into a custom hook**

The hook wraps the existing `timerReducer` (lines 84-169 of PracticeClient.tsx) and all side effects (audio, interval, wake lock). It exposes the high-level API from the spec.

**Note:** The existing code uses `mode: 'open' | 'guided'`. This hook renames `'guided'` to `'structured'` to match the spec's exercise type terminology. The `mode` field is internal to the reducer and not exposed in the hook's return value, so no external code depends on the old string.

```ts
// src/app/practice/useTimer.ts
'use client';

import { useReducer, useEffect, useRef, useCallback } from 'react';
import type { Exercise, TimerStatus, Phase } from './types';

// ── Internal types (not exported) ─────────────────────────────
type TimerState = {
  status: TimerStatus;
  mode: 'open' | 'structured';
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
  | { type: 'START_STRUCTURED'; phases: Phase[]; cycles: number; rounds: number }
  | { type: 'TICK' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESET' }
  | { type: 'CLEAR_CHIME' };

// ── Reducer ───────────────────────────────────────────────────
const initialState: TimerState = {
  status: 'idle', mode: 'open',
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
        shouldChime: true,
      };

    case 'START_STRUCTURED': {
      const cycleDur = action.phases.reduce((s, ph) => s + Math.round(ph.duration), 0);
      const total = cycleDur * action.cycles * action.rounds;
      return {
        ...initialState, status: 'running', mode: 'structured',
        totalSeconds: total, remainingSeconds: total,
        phases: action.phases, currentPhaseIndex: 0,
        phaseRemaining: Math.round(action.phases[0].duration),
        currentCycle: 1, totalCycles: action.cycles,
        currentRound: 1, totalRounds: action.rounds,
        shouldChime: true,
      };
    }

    case 'TICK': {
      if (state.status !== 'running') return state;
      const next = { ...state, remainingSeconds: state.remainingSeconds - 1, phaseRemaining: state.phaseRemaining - 1, shouldChime: false };

      if (next.phaseRemaining <= 0) {
        const nextIdx = next.currentPhaseIndex + 1;
        if (nextIdx < next.phases.length) {
          next.currentPhaseIndex = nextIdx;
          next.phaseRemaining = Math.round(next.phases[nextIdx].duration);
          next.shouldChime = true;
        } else {
          const nextCycle = next.currentCycle + 1;
          if (nextCycle <= next.totalCycles) {
            next.currentCycle = nextCycle;
            next.currentPhaseIndex = 0;
            next.phaseRemaining = Math.round(next.phases[0].duration);
            next.shouldChime = true;
          } else {
            const nextRound = next.currentRound + 1;
            if (nextRound <= next.totalRounds) {
              next.currentRound = nextRound;
              next.currentCycle = 1;
              next.currentPhaseIndex = 0;
              next.phaseRemaining = Math.round(next.phases[0].duration);
              next.shouldChime = true;
            } else {
              next.status = 'complete';
              next.shouldChime = true;
            }
          }
        }
      }
      if (next.remainingSeconds <= 0) { next.status = 'complete'; next.shouldChime = true; }
      return next;
    }

    case 'PAUSE':      return { ...state, status: 'paused', shouldChime: false };
    case 'RESUME':     return { ...state, status: 'running', shouldChime: false };
    case 'RESET':      return initialState;
    case 'CLEAR_CHIME': return { ...state, shouldChime: false };
    default:           return state;
  }
}

// ── Hook ──────────────────────────────────────────────────────
export function useTimer() {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Audio init
  useEffect(() => {
    audioRef.current = new Audio('/sounds/bowl.wav');
    audioRef.current.volume = 0.5;
    audioRef.current.preload = 'auto';
  }, []);

  // Chime
  useEffect(() => {
    if (state.shouldChime && audioRef.current) {
      try { audioRef.current.currentTime = 0; audioRef.current.play().catch(() => {}); } catch { /* autoplay blocked */ }
      dispatch({ type: 'CLEAR_CHIME' });
    }
  }, [state.shouldChime]);

  // Interval
  useEffect(() => {
    if (state.status === 'running') {
      intervalRef.current = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [state.status]);

  // Wake lock
  useEffect(() => {
    if (state.status === 'running') {
      navigator.wakeLock?.request('screen').then(s => { wakeLockRef.current = s; }).catch(() => {});
    }
    return () => { wakeLockRef.current?.release(); wakeLockRef.current = null; };
  }, [state.status]);

  // Actions
  const startOpen = useCallback((minutes: number) => {
    if (minutes < 1 || minutes > 180) return;
    dispatch({ type: 'START_OPEN', totalSeconds: minutes * 60 });
  }, []);

  const startStructured = useCallback((exercise: Exercise) => {
    if (!exercise.phases?.length) return;
    dispatch({
      type: 'START_STRUCTURED',
      phases: exercise.phases,
      cycles: exercise.defaultCycles ?? 1,
      rounds: exercise.defaultRounds ?? 1,
    });
  }, []);

  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const resume = useCallback(() => dispatch({ type: 'RESUME' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return {
    status: state.status,
    remainingSeconds: state.remainingSeconds,
    totalSeconds: state.totalSeconds,
    currentPhaseLabel: state.phases[state.currentPhaseIndex]?.label ?? '',
    phaseRemaining: state.phaseRemaining,
    currentCycle: state.currentCycle,
    totalCycles: state.totalCycles,
    currentRound: state.currentRound,
    totalRounds: state.totalRounds,
    startOpen,
    startStructured,
    pause,
    resume,
    reset,
  };
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit --project tsconfig.json 2>&1 | grep useTimer`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/practice/useTimer.ts
git commit -m "feat(practice): extract useTimer hook from PracticeClient"
```

---

### Task 3: Create exercise data file

**Files:**
- Create: `src/app/practice/exercises.ts`
- Reference: `src/app/practice/PracticeClient.tsx:65-82` (existing presets to migrate)

This file contains all 43 exercises. The existing 12 presets from `PracticeClient.tsx` (lines 65-82) are migrated here with new IDs and enriched with descriptions, instructions, and `learnMorePath` values.

**Important dependency:** The `learnMorePath` anchor IDs (e.g., `/breathe#box-breathing`) must be verified against the actual content pages. Use placeholder anchors during this task; verification and fixing happens in Task 10.

- [ ] **Step 1: Create exercises.ts with all 43 exercises**

The file is too large to inline here completely. Structure it as:

```ts
// src/app/practice/exercises.ts
import type { Exercise } from './types';

export const EXERCISES: Exercise[] = [
  // ─── Breathwork (14) ─────────────────────────────────────────
  {
    id: 'breath-sigh',
    name: 'Physiological Sigh',
    modality: 'breathwork',
    type: 'structured',
    level: 'beginner',
    duration: '1–3 breaths',
    description: 'Double inhale through the nose, long exhale through the mouth. Fastest known calm-down signal.',
    learnMorePath: '/breathe#physiological-sigh',
    phases: [
      { label: 'Sniff In', duration: 2 },
      { label: 'Sniff In', duration: 1 },
      { label: 'Exhale', duration: 6 },
    ],
    defaultCycles: 20,
    defaultRounds: 1,
  },
  {
    id: 'breath-box',
    name: 'Box Breathing',
    modality: 'breathwork',
    type: 'structured',
    level: 'beginner',
    duration: '4–10 min',
    description: '4-4-4-4 equal ratio. Used by Navy SEALs for calm under pressure.',
    learnMorePath: '/breathe#box-breathing',
    phases: [
      { label: 'Inhale', duration: 4 },
      { label: 'Hold', duration: 4 },
      { label: 'Exhale', duration: 4 },
      { label: 'Hold', duration: 4 },
    ],
    defaultCycles: 19,
    defaultRounds: 1,
  },
  {
    id: 'breath-478',
    name: '4-7-8 Breathing',
    modality: 'breathwork',
    type: 'structured',
    level: 'beginner',
    duration: '2–5 min',
    description: "Dr. Andrew Weil's calming breath. Activates the vagus nerve.",
    learnMorePath: '/breathe#4-7-8-breathing',
    phases: [
      { label: 'Inhale', duration: 4 },
      { label: 'Hold', duration: 7 },
      { label: 'Exhale', duration: 8 },
    ],
    defaultCycles: 16,
    defaultRounds: 1,
  },
  {
    id: 'breath-diaphragm',
    name: 'Diaphragmatic Breathing',
    modality: 'breathwork',
    type: 'reference',
    level: 'beginner',
    duration: '5–15 min',
    description: 'Deep belly breathing that activates the parasympathetic nervous system.',
    learnMorePath: '/breathe#diaphragmatic-breathing',
    instructions: [
      'Place one hand on your chest, one on your belly.',
      'Breathe in slowly through the nose — feel your belly rise, chest stays still.',
      'Exhale slowly through the mouth or nose.',
      'Focus on making each exhale slightly longer than the inhale.',
    ],
    defaultMinutes: 10,
  },
  {
    id: 'breath-nadi',
    name: 'Nadi Shodhana',
    modality: 'breathwork',
    type: 'structured',
    level: 'beginner',
    duration: '5–15 min',
    description: 'Alternate nostril breathing. Balances left and right brain hemispheres.',
    learnMorePath: '/breathe#nadi-shodhana',
    phases: [
      { label: 'Left Inhale', duration: 4 },
      { label: 'Hold', duration: 4 },
      { label: 'Right Exhale', duration: 4 },
      { label: 'Right Inhale', duration: 4 },
      { label: 'Hold', duration: 4 },
      { label: 'Left Exhale', duration: 4 },
    ],
    defaultCycles: 12,
    defaultRounds: 1,
  },
  {
    id: 'breath-ujjayi',
    name: 'Ujjayi Breath',
    modality: 'breathwork',
    type: 'reference',
    level: 'beginner',
    duration: '5–20 min',
    description: 'Ocean breath. Slight constriction at the back of the throat creates an audible whisper.',
    learnMorePath: '/breathe#ujjayi',
    instructions: [
      'Sit comfortably. Slightly constrict the back of your throat.',
      'Inhale slowly through the nose — you should hear a soft ocean-like sound.',
      'Exhale through the nose with the same gentle constriction.',
      'Keep the breath smooth, even, and unhurried.',
    ],
    defaultMinutes: 10,
  },
  {
    id: 'breath-coherent',
    name: 'Coherent Breathing',
    modality: 'breathwork',
    type: 'structured',
    level: 'beginner',
    duration: '10–20 min',
    description: '5.5s in, 5.5s out at ~5.5 breaths per minute. Maximizes vagal tone.',
    learnMorePath: '/breathe#coherent-breathing',
    phases: [
      { label: 'Inhale', duration: 5.5 },
      { label: 'Exhale', duration: 5.5 },
    ],
    defaultCycles: 60,
    defaultRounds: 1,
  },
  {
    id: 'breath-kapalabhati',
    name: 'Kapalabhati',
    modality: 'breathwork',
    type: 'structured',
    level: 'intermediate',
    duration: '3–10 min',
    description: 'Skull-shining breath. Rapid forceful exhales with passive inhales.',
    learnMorePath: '/breathe#kapalabhati',
    phases: [
      { label: 'Rapid Exhales (30)', duration: 30 },
      { label: 'Rest', duration: 30 },
    ],
    defaultCycles: 3,
    defaultRounds: 1,
  },
  {
    id: 'breath-fire',
    name: 'Breath of Fire',
    modality: 'breathwork',
    type: 'structured',
    level: 'intermediate',
    duration: '3–11 min',
    description: 'Rapid equal inhales and exhales through the nose. Energizing Kundalini technique.',
    learnMorePath: '/breathe#breath-of-fire',
    phases: [
      { label: 'Breath of Fire', duration: 60 },
      { label: 'Hold + Rest', duration: 30 },
    ],
    defaultCycles: 3,
    defaultRounds: 1,
  },
  {
    id: 'breath-wimhof',
    name: 'Wim Hof Method',
    modality: 'breathwork',
    type: 'structured',
    level: 'intermediate',
    duration: '~15 min',
    description: 'Power breathing, breath retention, and recovery. Builds autonomic resilience.',
    learnMorePath: '/breathe#wim-hof',
    phases: [
      { label: 'Power Breathing', duration: 90 },
      { label: 'Breath Hold', duration: 90 },
      { label: 'Recovery Breath', duration: 15 },
    ],
    defaultCycles: 1,
    defaultRounds: 3,
  },
  {
    id: 'breath-buteyko',
    name: 'Buteyko Method',
    modality: 'breathwork',
    type: 'reference',
    level: 'intermediate',
    duration: '10–30 min',
    description: 'Reduced breathing to increase CO₂ tolerance. Nasal breathing focus.',
    learnMorePath: '/breathe#buteyko',
    instructions: [
      'Sit upright. Close your mouth and breathe only through your nose.',
      'Take a normal breath in, then a normal breath out.',
      'Pinch your nose and hold — count seconds until first urge to breathe (Control Pause).',
      'Release and breathe normally. Target: gradually increase your Control Pause.',
    ],
    defaultMinutes: 15,
  },
  {
    id: 'breath-tummo',
    name: 'Tummo',
    modality: 'breathwork',
    type: 'reference',
    level: 'advanced',
    duration: '20–60 min',
    description: 'Tibetan inner fire meditation. Visualization of heat combined with breath retention.',
    learnMorePath: '/breathe#tummo',
    instructions: [
      'Sit in meditation posture. Visualize a thin, hollow central channel from perineum to crown.',
      'Visualize a tiny flame at the navel center.',
      'Inhale deeply, drawing breath down to the flame. Hold with gentle abdominal lock.',
      'Visualize the flame growing with each breath, filling the central channel with heat.',
      'Exhale slowly. Repeat, feeling warmth spread through the body.',
    ],
    defaultMinutes: 20,
  },
  {
    id: 'breath-holotropic',
    name: 'Holotropic Breathwork',
    modality: 'breathwork',
    type: 'reference',
    level: 'advanced',
    duration: '2–3 hours',
    description: 'Accelerated deep breathing with evocative music. Best done in a facilitated group.',
    learnMorePath: '/breathe#holotropic',
    instructions: [
      'This practice should be done with a trained facilitator and a sitter.',
      'Lie down comfortably. Begin breathing faster and deeper than normal.',
      'Maintain connected breathing — no pauses between inhale and exhale.',
      'Allow whatever arises (emotions, movements, sounds) without judgment.',
      'Session lasts 2-3 hours. Integration period follows.',
    ],
    defaultMinutes: 60,
  },
  {
    id: 'breath-cyclic',
    name: 'Cyclic Hyperventilation',
    modality: 'breathwork',
    type: 'structured',
    level: 'intermediate',
    duration: '5–15 min',
    description: 'Huberman Lab protocol. 25 deep breaths followed by breath hold.',
    learnMorePath: '/breathe#cyclic-hyperventilation',
    phases: [
      { label: 'Deep Breaths (25)', duration: 75 },
      { label: 'Hold (exhale)', duration: 30 },
      { label: 'Recovery', duration: 15 },
    ],
    defaultCycles: 3,
    defaultRounds: 1,
  },

  // ─── Meditation (5) ──────────────────────────────────────────
  {
    id: 'med-breath',
    name: 'Breath Awareness',
    modality: 'meditation',
    type: 'reference',
    level: 'beginner',
    duration: '2–20 min',
    description: 'Count exhales 1-10, then restart. The foundation of all meditation.',
    learnMorePath: '/meditate#breath-awareness',
    instructions: [
      'Sit comfortably with eyes closed or softly focused downward.',
      'Breathe naturally. Begin counting each exhale: 1, 2, 3... up to 10.',
      'When you lose count (you will), gently return to 1.',
      'The practice IS the returning — not the counting.',
    ],
    defaultMinutes: 10,
  },
  {
    id: 'med-bodyscan',
    name: 'Body Scan',
    modality: 'meditation',
    type: 'reference',
    level: 'beginner',
    duration: '10–30 min',
    description: 'Systematic attention through each body part. Builds interoceptive awareness.',
    learnMorePath: '/meditate#body-scan',
    instructions: [
      'Lie down or sit comfortably. Close your eyes.',
      'Begin at the top of your head. Notice any sensations without judging.',
      'Slowly move attention down: forehead, eyes, jaw, neck, shoulders...',
      'Continue through arms, hands, chest, belly, hips, legs, feet.',
      'If the mind wanders, gently return to where you left off.',
    ],
    defaultMinutes: 15,
  },
  {
    id: 'med-lovingkindness',
    name: 'Loving-Kindness',
    modality: 'meditation',
    type: 'reference',
    level: 'beginner',
    duration: '10–20 min',
    description: 'Metta meditation. Cultivate compassion for self, loved ones, and all beings.',
    learnMorePath: '/meditate#loving-kindness',
    instructions: [
      'Sit comfortably. Begin with yourself: "May I be happy. May I be healthy. May I be safe."',
      'Expand to a loved one. Visualize them and repeat the phrases.',
      'Expand to a neutral person (someone you neither like nor dislike).',
      'Expand to a difficult person. This is where the practice deepens.',
      'Finally, expand to all beings everywhere.',
    ],
    defaultMinutes: 15,
  },
  {
    id: 'med-visualization',
    name: 'Guided Visualization',
    modality: 'meditation',
    type: 'reference',
    level: 'beginner',
    duration: '10–20 min',
    description: 'Create vivid mental imagery for relaxation, creativity, or intention-setting.',
    learnMorePath: '/meditate#visualization',
    instructions: [
      'Sit or lie down comfortably. Close your eyes.',
      'Choose a scene: a peaceful beach, forest, mountain, or sacred space.',
      'Engage all senses: what do you see, hear, feel, smell?',
      'Spend time in this space. Let it feel real and nurturing.',
      'When ready, slowly return to the room.',
    ],
    defaultMinutes: 15,
  },
  {
    id: 'med-walking',
    name: 'Walking Meditation',
    modality: 'meditation',
    type: 'reference',
    level: 'beginner',
    duration: '10–30 min',
    description: 'Slow, deliberate walking with full attention on each step.',
    learnMorePath: '/meditate#walking-meditation',
    instructions: [
      'Find a quiet path, 10-20 paces long.',
      'Stand at one end. Feel your feet on the ground.',
      'Walk slowly: lift, move, place. Feel each micro-movement.',
      'At the end, pause. Turn slowly. Walk back.',
      'If the mind wanders, notice, then return attention to your feet.',
    ],
    defaultMinutes: 15,
  },

  // ─── Yoga (3) ────────────────────────────────────────────────
  {
    id: 'yoga-hipopening',
    name: 'Hip Opening Sequence',
    modality: 'yoga',
    type: 'structured',
    level: 'beginner',
    duration: '20 min',
    description: '10-step sequence targeting hip flexors, glutes, and deep rotators.',
    learnMorePath: '/yoga#hip-opening',
    phases: [
      { label: 'Constructive Rest', duration: 120 },
      { label: 'Reclined Pigeon (each side)', duration: 120 },
      { label: 'Happy Baby', duration: 90 },
      { label: 'Low Lunge (each side)', duration: 120 },
      { label: 'Lizard (each side)', duration: 120 },
      { label: 'Garland Squat', duration: 90 },
      { label: 'Pigeon (each side)', duration: 180 },
      { label: 'Butterfly', duration: 120 },
      { label: 'Wide-Legged Forward Fold', duration: 90 },
      { label: 'Supine Twist + Savasana', duration: 150 },
    ],
    defaultCycles: 1,
    defaultRounds: 1,
  },
  {
    id: 'yoga-nidra',
    name: 'Yoga Nidra Protocol',
    modality: 'yoga',
    type: 'reference',
    level: 'beginner',
    duration: '20–45 min',
    description: 'Guided sleep meditation through 8 stages. Deep rest without sleeping.',
    learnMorePath: '/yoga#yoga-nidra',
    instructions: [
      'Lie in Savasana. Cover yourself — body temperature drops.',
      'Set your Sankalpa (intention) as a short, positive statement.',
      'Follow the rotation of consciousness through 31-61 body points.',
      'Shift to breath awareness — count breaths backward from 27.',
      'Experience pairs of opposites: heavy/light, hot/cold.',
      'Visualization stage: rapid archetypal images.',
      'Repeat your Sankalpa at the deepest point.',
      'Slowly externalize: wiggle fingers, deepen breath, open eyes.',
    ],
    defaultMinutes: 30,
  },
  {
    id: 'yoga-posehold',
    name: 'Pose Hold Series',
    modality: 'yoga',
    type: 'structured',
    level: 'beginner',
    duration: '6–18 min',
    description: '60-second holds with 10-second transitions. Build strength and presence.',
    learnMorePath: '/yoga#pose-hold',
    phases: [
      { label: 'Hold', duration: 60 },
      { label: 'Transition', duration: 10 },
    ],
    defaultCycles: 5,
    defaultRounds: 1,
  },

  // ─── Fascia (4) ──────────────────────────────────────────────
  {
    id: 'fascia-foamroll',
    name: 'Foam Rolling Protocol',
    modality: 'fascia',
    type: 'structured',
    level: 'beginner',
    duration: '10–20 min',
    description: 'Systematic foam rolling at 1 inch per second, 20-30 seconds per spot.',
    learnMorePath: '/fascia#foam-rolling',
    phases: [
      { label: 'Calves', duration: 60 },
      { label: 'IT Band / Outer Thigh', duration: 60 },
      { label: 'Quads', duration: 60 },
      { label: 'Hamstrings', duration: 60 },
      { label: 'Glutes', duration: 60 },
      { label: 'Upper Back', duration: 60 },
      { label: 'Lats', duration: 60 },
    ],
    defaultCycles: 1,
    defaultRounds: 1,
  },
  {
    id: 'fascia-fitness',
    name: 'Fascial Fitness Morning',
    modality: 'fascia',
    type: 'structured',
    level: 'beginner',
    duration: '10 min',
    description: "Schleip's 4 principles: rehydrate, bounce, stretch, sense. Morning reboot for fascia.",
    learnMorePath: '/fascia#fascial-fitness',
    phases: [
      { label: 'Bouncing / Rebounding', duration: 120 },
      { label: 'Spinal Cat-Cow Waves', duration: 90 },
      { label: 'Fascial Stretches (long holds)', duration: 180 },
      { label: 'Plantar Ball Rolling', duration: 60 },
      { label: 'Self-Sensing / Body Scan', duration: 60 },
    ],
    defaultCycles: 1,
    defaultRounds: 1,
  },
  {
    id: 'fascia-guasha',
    name: 'Self-Gua Sha',
    modality: 'fascia',
    type: 'reference',
    level: 'beginner',
    duration: '5–10 min',
    description: 'Scraping technique to break fascial adhesions and improve circulation.',
    learnMorePath: '/fascia#gua-sha',
    instructions: [
      'Apply oil to the target area (neck, upper back, or forearms).',
      'Use a gua sha tool or smooth edge. Scrape in one direction, 10-15 strokes.',
      'Work from origin to insertion of the muscle.',
      'Redness (sha) is normal — it indicates fascial restriction release.',
      'Drink water afterward. Avoid on broken skin or bruises.',
    ],
    defaultMinutes: 10,
  },
  {
    id: 'fascia-cupping',
    name: 'Self-Cupping',
    modality: 'fascia',
    type: 'reference',
    level: 'intermediate',
    duration: '10–15 min',
    description: 'Myofascial decompression. Lifts tissue to improve glide and circulation.',
    learnMorePath: '/fascia#cupping',
    instructions: [
      'Apply oil to the target area.',
      'Squeeze the silicone cup, place on skin, release to create suction.',
      'Stationary: leave in place 3-5 minutes. Moving: slide slowly along muscle.',
      'Combine with gua sha for compress-then-decompress effect.',
      'Circular marks are normal and fade in 3-7 days. Start with lighter suction.',
    ],
    defaultMinutes: 10,
  },

  // ─── Nervous System (6) ──────────────────────────────────────
  {
    id: 'ns-diaphragm',
    name: 'Slow Diaphragmatic',
    modality: 'nervous-system',
    type: 'reference',
    level: 'beginner',
    duration: '5–10 min',
    description: 'Slow belly breathing at 6 breaths per minute. Direct vagal nerve stimulation.',
    learnMorePath: '/nervous-system#diaphragmatic',
    instructions: [
      'Sit or lie down. Place a hand on your belly.',
      'Inhale slowly through the nose for 5 seconds — belly rises.',
      'Exhale slowly for 5 seconds — belly falls.',
      'Focus on the exhale being slightly longer for maximum parasympathetic activation.',
    ],
    defaultMinutes: 10,
  },
  {
    id: 'ns-gargling',
    name: 'Vagal Gargling',
    modality: 'nervous-system',
    type: 'reference',
    level: 'beginner',
    duration: '1–2 min',
    description: 'Vigorous gargling stimulates the vagus nerve via the pharyngeal muscles.',
    learnMorePath: '/nervous-system#gargling',
    instructions: [
      'Take a large sip of water.',
      'Gargle vigorously for 30 seconds — loud enough to challenge the throat muscles.',
      'Spit out. Repeat 2-3 times.',
      'You may tear up — this is a vagal activation sign.',
    ],
    defaultMinutes: 2,
  },
  {
    id: 'ns-coldface',
    name: 'Cold Face Immersion',
    modality: 'nervous-system',
    type: 'structured',
    level: 'intermediate',
    duration: '30–60 sec',
    description: 'Mammalian dive reflex. Cold water on the face triggers rapid parasympathetic shift.',
    learnMorePath: '/nervous-system#cold-face',
    phases: [{ label: 'Cold Face Immersion', duration: 30 }],
    defaultCycles: 1,
    defaultRounds: 1,
  },
  {
    id: 'ns-coldshower',
    name: 'Cold Shower / Plunge',
    modality: 'nervous-system',
    type: 'structured',
    level: 'intermediate',
    duration: '1–3 min',
    description: 'Cold exposure builds stress resilience and dopamine. Start with 30 seconds.',
    learnMorePath: '/nervous-system#cold-exposure',
    phases: [{ label: 'Cold Exposure', duration: 60 }],
    defaultCycles: 1,
    defaultRounds: 1,
  },
  {
    id: 'ns-auricular',
    name: 'Auricular Massage',
    modality: 'nervous-system',
    type: 'reference',
    level: 'beginner',
    duration: '2–5 min',
    description: 'Ear massage targets the auricular branch of the vagus nerve (ABVN).',
    learnMorePath: '/nervous-system#auricular',
    instructions: [
      'Gently massage the outer ear (tragus and concha) between thumb and forefinger.',
      'Apply gentle pressure in circular motions for 2-3 minutes.',
      'Pay special attention to the inner curve of the ear (cymba conchae).',
      'Notice sensations of warmth, tingling, or relaxation.',
    ],
    defaultMinutes: 3,
  },
  {
    id: 'ns-laughter',
    name: 'Laughter Practice',
    modality: 'nervous-system',
    type: 'reference',
    level: 'beginner',
    duration: '5 min',
    description: 'Voluntary laughter becomes real laughter. Diaphragm contracts activate the vagus nerve.',
    learnMorePath: '/nervous-system#laughter',
    instructions: [
      'Stand or sit comfortably.',
      'Begin with forced "ha ha ha" from the belly.',
      'Make eye contact with yourself in a mirror (or others in a group).',
      'Let the absurdity turn forced laughter into genuine laughter.',
      'Continue for 5 minutes. End with deep breathing.',
    ],
    defaultMinutes: 5,
  },

  // ─── Reiki (3) ───────────────────────────────────────────────
  {
    id: 'reiki-self',
    name: 'Self-Reiki Protocol',
    modality: 'reiki',
    type: 'reference',
    level: 'beginner',
    duration: '20–40 min',
    description: '8 hand positions from head to feet. 3-5 minutes per position.',
    learnMorePath: '/reiki#self-reiki',
    instructions: [
      'Position 1 — Eyes/Face: palms cupped over eyes, heels at temples. 3-5 min.',
      'Position 2 — Back of Head: hands under skull, cradling occipital ridge. 3-5 min.',
      'Position 3 — Throat: one hand at base of throat, collarbone level. 3-5 min.',
      'Position 4 — Heart: both hands flat over sternum. 3-5 min.',
      'Position 5 — Solar Plexus: both hands over upper abdomen. 3-5 min.',
      'Position 6 — Lower Abdomen: both hands below navel. 3-5 min.',
      'Position 7 — Knees: one palm on each knee. 3-5 min.',
      'Position 8 — Feet (optional): hands wrapped around soles. 3-5 min.',
    ],
    defaultMinutes: 30,
  },
  {
    id: 'reiki-hatsurei',
    name: 'Hatsurei Ho',
    modality: 'reiki',
    type: 'reference',
    level: 'intermediate',
    duration: '15–20 min',
    description: 'Traditional Japanese Reiki technique. Kenyoku (dry brushing) + Joshin Kokyu Ho (breathing).',
    learnMorePath: '/reiki#hatsurei-ho',
    instructions: [
      'Kenyoku (Dry Brushing): sweep right hand from left shoulder to right hip (3x). Reverse. Then sweep down each arm (3x).',
      'Connect to Reiki: raise hands above head, feel energy flowing down.',
      'Joshin Kokyu Ho: breathe into the hara (lower abdomen). Exhale through hands.',
      'Gassho Meditation: palms together at heart. Focus on the point where middle fingers meet.',
      'Mokunen (Affirm): silently state "I will begin/end Hatsurei Ho."',
    ],
    defaultMinutes: 20,
  },
  {
    id: 'reiki-gassho',
    name: 'Gassho Meditation',
    modality: 'reiki',
    type: 'reference',
    level: 'beginner',
    duration: '10–20 min',
    description: 'Hands in prayer position at heart. Focus on the point where middle fingertips meet.',
    learnMorePath: '/reiki#gassho',
    instructions: [
      'Sit comfortably. Bring palms together at heart center.',
      'Close your eyes. Focus all attention on the point where your middle fingertips meet.',
      'When thoughts arise, gently return focus to the fingertips.',
      'Maintain for 10-20 minutes. This is Usui\'s core meditation practice.',
    ],
    defaultMinutes: 15,
  },

  // ─── Sound Healing (3) ───────────────────────────────────────
  {
    id: 'sound-bhramari',
    name: 'Bhramari (Bee Breath)',
    modality: 'sound-healing',
    type: 'structured',
    level: 'beginner',
    duration: '5 min',
    description: 'Humming breath. The vibration stimulates the vagus nerve and calms the mind.',
    learnMorePath: '/sound-healing#bhramari',
    phases: [
      { label: 'Inhale', duration: 4 },
      { label: 'Hum (exhale)', duration: 8 },
    ],
    defaultCycles: 10,
    defaultRounds: 1,
  },
  {
    id: 'sound-om',
    name: 'Om / So Hum Chanting',
    modality: 'sound-healing',
    type: 'reference',
    level: 'beginner',
    duration: '5–15 min',
    description: 'Chest-resonant chanting at your natural pitch. Vagal stimulation through vibration.',
    learnMorePath: '/sound-healing#chanting',
    instructions: [
      'Sit upright. Take a deep breath in.',
      'Chant "Om" or "So Hum" at a pitch that resonates in your chest.',
      'Sustain the sound for the full exhale — feel vibration in sternum and throat.',
      'Inhale naturally. Repeat. Find a rhythm that feels meditative.',
    ],
    defaultMinutes: 10,
  },
  {
    id: 'sound-bath',
    name: 'Sound Bath Listening',
    modality: 'sound-healing',
    type: 'reference',
    level: 'beginner',
    duration: '15–30 min',
    description: 'Lie down and receive sound from singing bowls, gongs, or a recorded bath.',
    learnMorePath: '/sound-healing#sound-bath',
    instructions: [
      'Lie in Savasana in a quiet, dark room.',
      'Play a sound bath recording (singing bowls, gongs, or crystal bowls).',
      'Close your eyes. Let the sound wash over you without analyzing.',
      'If thoughts arise, return attention to the sound vibrations.',
      'Remain still for a few minutes after the sound ends.',
    ],
    defaultMinutes: 20,
  },

  // ─── Somatics (5) ────────────────────────────────────────────
  {
    id: 'soma-tre',
    name: 'TRE Wall Sit Protocol',
    modality: 'somatics',
    type: 'structured',
    level: 'beginner',
    duration: '20–30 min',
    description: '7 exercises to fatigue the psoas, then allow neurogenic tremoring in butterfly position.',
    learnMorePath: '/somatics#tre',
    phases: [
      { label: 'Ankle Stretches', duration: 60 },
      { label: 'Calf Raises', duration: 60 },
      { label: 'Forward Fold Hang', duration: 120 },
      { label: 'Wall Sit (thighs parallel)', duration: 120 },
      { label: 'Wall Sit (deeper)', duration: 60 },
      { label: 'Standing Hip Opener', duration: 60 },
      { label: 'Butterfly Supine — Allow Tremoring', duration: 600 },
    ],
    defaultCycles: 1,
    defaultRounds: 1,
  },
  {
    id: 'soma-constructive',
    name: 'Constructive Rest',
    modality: 'somatics',
    type: 'reference',
    level: 'beginner',
    duration: '15 min',
    description: 'Alexander Technique floor practice. Knees bent, head on books. Spinal decompression.',
    learnMorePath: '/somatics#constructive-rest',
    instructions: [
      'Lie on your back on a firm surface.',
      'Place 1-3 paperback books under your head (not a pillow).',
      'Bend your knees, feet flat on the floor hip-width apart.',
      'Rest hands on your lower ribs or beside you.',
      'Think: "Let my neck be free, let my head go forward and up, let my back lengthen and widen."',
      'Do nothing. Let gravity decompress. Stay for 15 minutes.',
    ],
    defaultMinutes: 15,
  },
  {
    id: 'soma-voo',
    name: 'The Voo Sound',
    modality: 'somatics',
    type: 'reference',
    level: 'beginner',
    duration: '3–5 min',
    description: 'Peter Levine\'s low-pitched "Voooo" on exhale. Settles the viscera via vagal activation.',
    learnMorePath: '/somatics#voo-sound',
    instructions: [
      'Sit or stand. Take a deep breath in.',
      'On the exhale, make a deep, low "Vooooooo" sound.',
      'Pitch it as low as you comfortably can — feel it vibrate in your belly.',
      'At the end of the exhale, pause and notice internal sensations.',
      'Repeat 5-10 times.',
    ],
    defaultMinutes: 5,
  },
  {
    id: 'soma-orienting',
    name: 'Orienting Exercise',
    modality: 'somatics',
    type: 'reference',
    level: 'beginner',
    duration: '2–3 min',
    description: 'Slow head/eye sweep around the room. Tells the nervous system the environment is safe.',
    learnMorePath: '/somatics#orienting',
    instructions: [
      'Sit comfortably. Slowly turn your head to the right.',
      'Let your eyes look at what your head is turning toward — take it in.',
      'Pause when something catches your attention. Really see it.',
      'Continue the slow sweep all the way to the left.',
      'Notice any sighs, yawns, or settling — signs of discharge.',
    ],
    defaultMinutes: 3,
  },
  {
    id: 'soma-containment',
    name: 'Containment',
    modality: 'somatics',
    type: 'reference',
    level: 'beginner',
    duration: '5 min',
    description: 'Self-holding with hands on chest and belly. Names physical sensations to build awareness.',
    learnMorePath: '/somatics#containment',
    instructions: [
      'Place one hand on your chest and one on your belly.',
      'Feel the warmth of your hands through your clothing.',
      'Name what you notice physically: "I feel pressure... warmth... tightness..."',
      'Stay with sensations. Don\'t try to change them.',
      'Breathe naturally. Let the containment create safety.',
    ],
    defaultMinutes: 5,
  },
];
```

- [ ] **Step 2: Verify the data compiles**

Run: `npx tsc --noEmit --project tsconfig.json 2>&1 | grep exercises.ts`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/practice/exercises.ts
git commit -m "feat(practice): add 43 exercise data definitions"
```

---

### Task 4: Create certification data file (with research)

**Files:**
- Create: `src/app/practice/certifications.ts`

This task requires web research to populate accurate certification programs. Research 2-3 programs per modality.

- [ ] **Step 1: Research certifications for all 8 modalities**

Use web search to find legitimate certification programs. For each, collect: program name, school, format, duration, approximate cost, prerequisites, URL.

- [ ] **Step 2: Create certifications.ts with researched data**

```ts
// src/app/practice/certifications.ts
import type { Certification } from './types';

export const CERTIFICATIONS: Certification[] = [
  // Populate with researched data — 2-3 per modality
  // Structure per entry:
  // { modality, program, school, format, duration, cost, prerequisites, url }
];
```

Each entry must have real, verified data. If a modality has no good results, leave it empty — the empty state card will render.

- [ ] **Step 3: Verify compiles**

Run: `npx tsc --noEmit --project tsconfig.json 2>&1 | grep certifications.ts`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/practice/certifications.ts
git commit -m "feat(practice): add certification directory data"
```

---

## Chunk 2: UI Components — ExerciseCard, ExercisesTab, TeacherPathTab

### Task 5: Build ExerciseCard component

**Files:**
- Create: `src/app/practice/ExerciseCard.tsx`
- Reference: `src/app/practice/types.ts`, `src/app/practice/useTimer.ts`

This is the core UI component. It renders collapsed and expanded states, with two expanded variants (structured and reference). Each card manages its own `useTimer` instance.

- [ ] **Step 1: Create ExerciseCard.tsx**

The component needs:
- Props: `exercise: Exercise`, `isExpanded: boolean`, `onToggle: () => void`
- Collapsed state: name, badges, duration, description, learn more link, expand chevron
- Expanded structured: step list with current step highlighted, timer ring, phase label, cycle/round counter, cycle stepper, control bar
- Expanded reference: instruction list, duration pills, timer ring, control bar
- Uses `useTimer()` hook internally
- Inline styles following site patterns
- `aria-expanded` on the card button
- Suppresses `.card` hover transform when expanded

Key inline components needed inside this file:
- `TimerDisplay` — extract from PracticeClient.tsx (lines 190-278), parameterize for size
- `ControlBar` — extract from PracticeClient.tsx (lines 281-338)
- `DurationSelector` — extract from PracticeClient.tsx (lines 451-506) for reference exercises
- `CycleStepper` — new, for structured exercises

**Pause-on-collapse / resume-on-expand:** When `isExpanded` transitions from `true` to `false` and `timer.status === 'running'`, call `timer.pause()`. When `isExpanded` transitions from `false` to `true` and `timer.status === 'paused'`, call `timer.resume()`. Implement with a `useEffect` watching `isExpanded` and using a `useRef` to track the previous value:

```ts
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
```

- [ ] **Step 2: Verify compiles**

Run: `npx tsc --noEmit --project tsconfig.json 2>&1 | grep ExerciseCard`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/practice/ExerciseCard.tsx
git commit -m "feat(practice): add ExerciseCard with structured/reference variants"
```

---

### Task 6: Build ExercisesTab component

**Files:**
- Create: `src/app/practice/ExercisesTab.tsx`
- Reference: `src/app/practice/exercises.ts`, `src/app/practice/ExerciseCard.tsx`, `src/app/practice/types.ts`

- [ ] **Step 1: Create ExercisesTab.tsx**

The component needs:
- Props: `expandedExerciseId?: string | null`, `onExpandExercise?: (id: string) => void` (for cross-tab "Start Timer" from routines)
- State: `activeModality: Modality | 'all'`, `expandedId: string | null` (use prop if provided, else internal)
- Freeform Timer card at the top (outside accordion group, own `useTimer` instance)
- Modality filter pills with horizontal scroll, accent colors
- Exercise cards filtered by active modality, grouped with sticky section headers when "All"
- Accordion: only one exercise card expanded at a time (Freeform Timer excluded)
- Scroll-to-card on expand: `element.scrollIntoView({ behavior: 'smooth', block: 'start' })`
- Sticky offsets: pill row `top: 108px`, section labels `top: 152px`

- [ ] **Step 2: Verify compiles**

Run: `npx tsc --noEmit --project tsconfig.json 2>&1 | grep ExercisesTab`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/practice/ExercisesTab.tsx
git commit -m "feat(practice): add ExercisesTab with modality filters and accordion"
```

---

### Task 7: Build TeacherPathTab component

**Files:**
- Create: `src/app/practice/TeacherPathTab.tsx`
- Reference: `src/app/practice/certifications.ts`, `src/app/practice/types.ts`, `src/app/globals.css` (`.timeline` / `.timeline-node` classes)

- [ ] **Step 1: Create TeacherPathTab.tsx**

Three sections:
- **Framework:** 2-3 paragraphs on NS regulation + fascia as the unified model. HTML/CSS diagram with flexbox showing foundations at base and modalities branching up.
- **Learning Order:** Vertical timeline with 8 nodes using `.timeline` / `.timeline-node` CSS. Each node's containing `<div>` must have `position: relative` (required by `.timeline-node`'s `position: absolute; left: -3rem`). Override `.timeline-node`'s hardcoded `background: var(--color-violet-deep)` with inline `style={{ background: MODALITY_META[modality].deep }}` to achieve per-modality coloring. Each node shows: numbered circle with modality accent color, name, rationale, study duration, "Explore →" link.
- **Certification Directory:** Cards grouped by modality. Each card shows program, school, format badge, duration, cost, prerequisites, external link. **For each modality with zero certifications in the array, render a placeholder card:** "Certification programs for [Modality] are being researched. Check back soon."

- [ ] **Step 2: Verify compiles**

Run: `npx tsc --noEmit --project tsconfig.json 2>&1 | grep TeacherPathTab`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/practice/TeacherPathTab.tsx
git commit -m "feat(practice): add TeacherPathTab with framework, timeline, certifications"
```

---

## Chunk 3: Integration — Rewrite PracticeClient, Update PracticeBuilderTab, Verify

### Task 8: Rewrite PracticeClient.tsx as thin page shell

**Files:**
- Modify: `src/app/practice/PracticeClient.tsx` (full rewrite)
- Reference: all new components

- [ ] **Step 1: Rewrite PracticeClient.tsx**

The new PracticeClient is a thin shell (~150 lines):
- Hero section (violet gradient, "Practice" heading, updated subtitle)
- Three pill tabs: "Do It", "Daily Routines", "Teacher Path"
- All three tabs always mounted, inactive ones get `style={{ display: 'none' }}`
- Tab state: `activeTab: 'exercises' | 'routines' | 'teacher'`
- Cross-tab callback: when "Start Timer →" is clicked in Daily Routines, switch to "exercises" tab and expand the matching exercise card
- Renders: `<ExercisesTab />`, `<PracticeBuilderTab />`, `<TeacherPathTab />`

Remove all old code: the timer reducer, PRESETS array, PresetCard, DurationSelector, TimerDisplay, ControlBar — all of this now lives in `useTimer.ts` and `ExerciseCard.tsx`.

- [ ] **Step 2: Verify compiles**

Run: `npx tsc --noEmit --project tsconfig.json 2>&1 | grep PracticeClient`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/practice/PracticeClient.tsx
git commit -m "feat(practice): rewrite PracticeClient as thin tab shell"
```

---

### Task 9: Update PracticeBuilderTab with new exercise IDs

**Files:**
- Modify: `src/app/practice/PracticeBuilderTab.tsx`

- [ ] **Step 1: Update all timerPreset strings to new exercise IDs**

Find and replace per the migration table in the spec:
- `'coherent'` → `'breath-coherent'`
- `'box'` → `'breath-box'`
- `'478'` → `'breath-478'`
- `'wimhof'` → `'breath-wimhof'`
- `'sigh'` → `'breath-sigh'`
- `'med-10'` → `'med-breath'`
- `'med-20'` → `'med-breath'`
- `'med-45'` → `'med-breath'`
- `'pose-hold'` → `'yoga-posehold'`
- `'yin-hold'` → `'yoga-posehold'`
- `'cold-1'` → `'ns-coldshower'`
- `'cold-3'` → `'ns-coldshower'`

- [ ] **Step 2: Update the `onStartPreset` callback signature**

Change `onStartPreset?: (presetId: string) => void` to `onStartPreset?: (exerciseId: string, minutes: number) => void`. At each call site, pass the routine practice's duration: `onStartPreset(practice.timerPreset!, practice.duration)`. In PracticeClient (Task 8), the callback becomes: `(id, min) => { setActiveTab('exercises'); setExpandedExerciseId(id); setPreSelectedMinutes(min); }`. The `ExercisesTab` receives `expandedExerciseId` and `preSelectedMinutes` as props and uses them to expand the card and pre-fill the duration selector.

**Coherent breathing timing change:** The migration from `'coherent'` to `'breath-coherent'` changes phase durations from 5s/5s to 5.5s/5.5s (after `Math.round` in the reducer: 6s/6s per phase, 12s per cycle). This means a 60-cycle session is now ~12 min instead of ~10 min. Update the `duration` field on affected routine practices from `5` to `6` (for the Quick tier entry) and from `10` to `12` (for the Deep tier entry) to reflect the actual timing. The Standard tier's `5` min coherent entry becomes `6`.

- [ ] **Step 3: Verify compiles**

Run: `npx tsc --noEmit --project tsconfig.json 2>&1 | grep PracticeBuilderTab`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/practice/PracticeBuilderTab.tsx
git commit -m "fix(practice): migrate timerPreset IDs to new exercise IDs"
```

---

### Task 10: Verify and add anchor IDs on content pages

**Files:**
- Modify (if needed): All 8 content page client components

- [ ] **Step 1: Check each `learnMorePath` anchor against actual content pages**

For each of the 43 exercises, verify the anchor ID exists on the target page. Run a search for the heading text and check if it has an `id` attribute.

Content pages to check:
- `src/app/breathe/BreatheClient.tsx` (14 anchors)
- `src/app/meditate/MeditateClient.tsx` (5 anchors)
- `src/app/yoga/YogaClient.tsx` (3 anchors)
- `src/app/fascia/FasciaClient.tsx` (4 anchors)
- `src/app/nervous-system/NervousSystemClient.tsx` (6 anchors)
- `src/app/reiki/ReikiClient.tsx` (3 anchors)
- `src/app/sound-healing/SoundHealingClient.tsx` (3 anchors)
- `src/app/somatics/SomaticsClient.tsx` (5 anchors)

- [ ] **Step 2: Add missing `id` attributes to section headings**

For any heading that lacks an `id`, add one matching the anchor in `exercises.ts`.

- [ ] **Step 3: Update any `learnMorePath` values in exercises.ts if the actual anchor IDs differ**

- [ ] **Step 4: Commit**

```bash
git add src/app/*/  src/app/practice/exercises.ts
git commit -m "fix: add anchor IDs to content pages for practice page cross-links"
```

---

### Task 11: Build verification and visual spot-check

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: all 14 routes generate as static pages, no errors

- [ ] **Step 2: Run dev server and spot-check**

Run: `npm run dev`

Check:
- `/practice` loads with 3 tabs
- "Do It" tab shows Freeform Timer + exercise cards
- Modality filter pills work
- Expanding a card shows instructions/timer
- Starting a structured exercise auto-advances phases
- Starting a reference exercise runs a simple countdown
- Bowl chime plays on start and transitions
- "Daily Routines" tab works, "Start Timer →" switches to exercises tab
- "Teacher Path" shows framework, timeline, certifications
- Mobile responsive (resize browser to 375px)
- Dark mode toggle works

- [ ] **Step 3: Commit any visual fixes**

```bash
git add -A
git commit -m "fix(practice): visual polish from spot-check"
```

- [ ] **Step 4: Push to origin**

```bash
git push origin main
```
