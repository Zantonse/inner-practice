// src/app/practice/types.ts

export type Modality =
  | 'meditation' | 'breathwork' | 'yoga' | 'fascia'
  | 'nervous-system' | 'reiki' | 'sound-healing' | 'somatics' | 'sleep' | 'qigong' | 'chakras' | 'trauma'
  | 'nutrition' | 'temperature' | 'nature';

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
  sleep:            { label: 'Sleep',           deep: '#1B4D5C', pale: '#E8F2F4' },
  qigong:           { label: 'Qigong',          deep: '#2D6B4F', pale: '#E6F4EC' },
  chakras:          { label: 'Chakras',          deep: '#6B3FA0', pale: '#EDE3F7' },
  trauma:           { label: 'Trauma',           deep: '#8B5E3C', pale: '#F5E6D8' },
  nutrition:        { label: 'Nutrition',         deep: '#5C6B3C', pale: '#E8EDDF' },
  temperature:      { label: 'Temperature',       deep: '#3B7A9E', pale: '#DFF0F7' },
  nature:           { label: 'Nature',            deep: '#4A6B52', pale: '#E2EDDF' },
};

export const LEVEL_COLORS: Record<Level, string> = {
  beginner: '#2E7070',     // teal
  intermediate: '#C07A35', // amber
  advanced: '#592E6B',     // violet
};
