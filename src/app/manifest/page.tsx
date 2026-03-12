import type { Metadata } from 'next';
import ManifestClient from './ManifestClient';

export const metadata: Metadata = {
  title: 'Manifest — The Science of Intention | Inner Practice',
  description:
    'How neuroscience, goal science, and ancient contemplative traditions converge into a practical framework for intentional creation. Evidence-based manifestation grounded in nervous system regulation.',
  keywords: [
    'manifestation', 'intention setting', 'goal science', 'WOOP',
    'implementation intentions', 'sankalpa', 'yoga nidra', 'visualization',
    'HeartMath', 'heart coherence', 'polyvagal theory', 'nervous system',
    'mental contrasting', 'Oettingen', 'Gollwitzer', 'neuroplasticity',
  ],
};

export default function ManifestPage() {
  return <ManifestClient />;
}
