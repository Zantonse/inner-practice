import type { Metadata } from 'next';
import TraumaClient from './TraumaClient';

export const metadata: Metadata = {
  title: 'Generational Trauma — The Inherited Nervous System | Inner Practice',
  description:
    'How trauma passes through generations via epigenetics, autonomic nervous system patterns, and fascial storage. The science of inheritance, where trauma lives in the body, how every practice modality addresses inherited patterns, and safe healing protocols.',
  keywords: [
    'generational trauma', 'epigenetics', 'intergenerational trauma', 'inherited trauma',
    'Rachel Yehuda', 'Bessel van der Kolk', 'body keeps the score', 'polyvagal theory',
    'somatic experiencing', 'Peter Levine', 'EMDR', 'IFS', 'window of tolerance',
    'trauma release', 'psoas trauma', 'fascial trauma', 'vagal tone', 'HPA axis',
    'cortisol methylation', 'epigenetic inheritance', 'trauma healing',
  ],
};

export default function TraumaPage() {
  return <TraumaClient />;
}
