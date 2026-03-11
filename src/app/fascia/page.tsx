import type { Metadata } from 'next';
import FasciaClient from './FasciaClient';

export const metadata: Metadata = {
  title: 'The Living Web — Fascia & Body Release | Inner Practice',
  description:
    'Explore fascia — the body\'s largest sensory organ. Learn gua sha, myofascial release, yin yoga, and how releasing connective tissue transforms the body and deepens meditation. Science-backed and spiritually grounded.',
  keywords: [
    'fascia', 'gua sha', 'myofascial release', 'connective tissue',
    'foam rolling', 'yin yoga', 'trigger points', 'fascial fitness',
    'body release', 'somatic healing', 'Tom Myers', 'Schleip',
  ],
};

export default function FasciaPage() {
  return <FasciaClient />;
}
