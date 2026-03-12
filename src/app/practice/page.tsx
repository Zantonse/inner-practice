import type { Metadata } from 'next';
import PracticeClient from './PracticeClient';

export const metadata: Metadata = {
  title: 'Practice — Timer & Guided Sessions | Inner Practice',
  description:
    'Set a meditation timer, follow guided breathwork intervals, or choose a daily routine template. 13 guided presets, 8 life-context templates, and an open timer for any practice.',
  keywords: [
    'meditation timer', 'breathwork timer', 'yoga timer', 'box breathing',
    'Wim Hof timer', '4-7-8 breathing', 'interval timer', 'practice timer',
    'coherent breathing', 'cold exposure timer', 'daily routine', 'practice template',
    'morning routine', 'evening routine', 'yoga nidra timer',
  ],
};

export default function PracticePage() {
  return <PracticeClient />;
}
