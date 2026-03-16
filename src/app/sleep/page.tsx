import type { Metadata } from 'next';
import SleepClient from './SleepClient';

export const metadata: Metadata = {
  title: 'Sleep & Circadian Rhythm — Where Every Practice Comes to Rest | Inner Practice',
  description:
    'The science of sleep architecture, circadian timing for breathwork and meditation, overnight HRV patterns, Yoga Nidra as a sleep tool, and evidence-based sleep hygiene through a nervous system lens. Includes a 24-hour practice timing map and wind-down protocol.',
  keywords: [
    'sleep', 'circadian rhythm', 'sleep stages', 'NREM', 'REM', 'slow wave sleep',
    'glymphatic system', 'HRV sleep', 'overnight HRV', 'yoga nidra sleep',
    'NSDR', 'non-sleep deep rest', 'breathwork sleep', '4-7-8 breathing',
    'coherence breathing', 'sleep hygiene', 'polyvagal theory sleep',
    'melatonin', 'cortisol awakening response', 'circadian timing',
    'wind-down protocol', 'CBT-I', 'sleep architecture',
  ],
};

export default function SleepPage() {
  return <SleepClient />;
}
