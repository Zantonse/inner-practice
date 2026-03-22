import type { Metadata } from 'next';
import ReflexologyClient from './ReflexologyClient';

export const metadata: Metadata = {
  title: 'Reflexology — The Body in the Foot | Inner Practice',
  description:
    'Explore reflexology: 5,000 years of mapped pressure therapy from Egyptian tombs to modern clinical evidence. Learn foot maps, core techniques, session flow, training pathways, and how reflexology connects to fascia, breathwork, and the nervous system.',
  keywords: [
    'reflexology', 'foot reflexology', 'zone therapy', 'reflex map', 'eunice ingham',
    'foot map', 'pressure therapy', 'nerve endings', 'holistic wellness',
    'reflexology training', 'ARCB certification', 'reflexology evidence',
    'gate control theory', 'vagal tone', 'complementary therapy',
  ],
};

export default function ReflexologyPage() {
  return <ReflexologyClient />;
}
