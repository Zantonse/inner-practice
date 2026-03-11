import type { Metadata } from 'next';
import BreatheClient from './BreatheClient';

export const metadata: Metadata = {
  title: 'The Master Switch — Breathwork & Pranayama | Inner Practice',
  description:
    'Breathing is the only voluntary gateway to your autonomic nervous system. Explore 14 breathwork techniques — from the physiological sigh to Wim Hof — organized by category and depth. Science-backed, tradition-rooted.',
  keywords: [
    'breathwork', 'pranayama', 'breathing exercises', 'physiological sigh',
    'box breathing', 'Wim Hof', 'Buteyko', 'Nadi Shodhana', 'Kapalabhati',
    'coherent breathing', 'HRV', 'vagus nerve', 'nervous system', 'stress reduction',
    'sleep breathing', 'diaphragmatic breathing', 'Holotropic breathwork',
  ],
};

export default function BreathePage() {
  return <BreatheClient />;
}
