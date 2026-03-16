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
