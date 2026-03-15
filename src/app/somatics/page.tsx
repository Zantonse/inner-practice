import type { Metadata } from 'next';
import SomaticsClient from './SomaticsClient';

export const metadata: Metadata = {
  title: 'Somatics — The Body Completes What the Mind Cannot | Inner Practice',
  description:
    'Explore somatic healing: Somatic Experiencing (Peter Levine), TRE neurogenic tremor, Feldenkrais, Alexander Technique, and the science of how the body releases stored trauma through movement, awareness, and discharge.',
  keywords: [
    'somatics', 'somatic experiencing', 'Peter Levine', 'TRE',
    'neurogenic tremor', 'trauma release', 'Feldenkrais', 'Alexander Technique',
    'Rolfing', 'structural integration', 'polyvagal', 'window of tolerance',
    'body awareness', 'felt sense', 'titration', 'pendulation',
  ],
};

export default function SomaticsPage() {
  return <SomaticsClient />;
}
