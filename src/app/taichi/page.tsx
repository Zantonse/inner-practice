import type { Metadata } from 'next';
import TaiChiClient from './TaiChiClient';
export const metadata: Metadata = {
  title: 'Tai Chi — The Moving Meditation | Inner Practice',
  description: 'The science of tai chi: fall prevention, cognitive protection, chronic pain relief, and cardiovascular health. Five styles, clinical evidence, fascial mechanisms, and a beginner protocol.',
  keywords: ['tai chi', 'taiji', 'yang style', 'chen style', 'sun style', 'fall prevention', 'balance', 'cognitive function', 'moving meditation', 'push hands', '24 form', 'Peter Wayne'],
};
export default function TaiChiPage() { return <TaiChiClient />; }
