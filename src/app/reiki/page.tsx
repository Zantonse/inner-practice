import type { Metadata } from 'next';
import ReikiClient from './ReikiClient';

export const metadata: Metadata = {
  title: 'Reiki — The Healing Art of Presence | Inner Practice',
  description:
    'Explore Reiki energy healing: the history from Mikao Usui to modern hospitals, peer-reviewed research on anxiety and pain reduction, the 12 hand positions, self-Reiki protocol, and how Reiki connects to meditation, polyvagal theory, and nervous system regulation.',
  keywords: [
    'reiki', 'reiki healing', 'energy healing', 'mikao usui', 'hand positions',
    'self-reiki', 'biofield', 'reiki research', 'reiki science', 'gassho meditation',
    'polyvagal theory', 'co-regulation', 'therapeutic touch', 'reiki attunement',
    'hospital reiki', 'integrative medicine', 'relaxation response',
  ],
};

export default function ReikiPage() {
  return <ReikiClient />;
}
