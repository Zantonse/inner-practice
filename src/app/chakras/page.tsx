import type { Metadata } from 'next';
import ChakrasClient from './ChakrasClient';

export const metadata: Metadata = {
  title: 'Chakras — The Body-Mind Map | Inner Practice',
  description:
    'The seven chakras explained through both traditional wisdom and modern science. Nerve plexus mapping, polyvagal overlay, endocrine glands, opening and balancing techniques, kundalini, and how every practice on this site maps to specific energy centers.',
  keywords: [
    'chakras', 'seven chakras', 'root chakra', 'sacral chakra', 'solar plexus chakra',
    'heart chakra', 'throat chakra', 'third eye chakra', 'crown chakra',
    'muladhara', 'svadhisthana', 'manipura', 'anahata', 'vishuddha', 'ajna', 'sahasrara',
    'kundalini', 'energy centers', 'chakra meditation', 'bija mantra',
    'polyvagal chakras', 'nerve plexus', 'endocrine chakras', 'chakra balancing',
  ],
};

export default function ChakrasPage() {
  return <ChakrasClient />;
}
