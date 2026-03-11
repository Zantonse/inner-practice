import type { Metadata } from 'next';
import YogaClient from './YogaClient';

export const metadata: Metadata = {
  title: 'Kundalini Yoga — Inner Practice',
  description:
    'A 5-minute beginner kundalini yoga practice. Tune in, breathe, move, meditate, and close — a complete daily sequence.',
};

export default function YogaPage() {
  return <YogaClient />;
}
