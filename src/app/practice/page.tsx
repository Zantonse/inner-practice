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
