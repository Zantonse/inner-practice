import type { Metadata } from 'next';
import WimHofClient from './WimHofClient';
export const metadata: Metadata = {
  title: 'The Wim Hof Method — Three Pillars of Cold, Breath & Commitment | Inner Practice',
  description: 'Breathwork, cold exposure, and commitment: the Wim Hof Method explained. Protocols, progressive training, scientific evidence (Kox 2014, Buijze 2016), safety guidelines, and connections to Tummo and pranayama.',
  keywords: ['Wim Hof', 'Wim Hof Method', 'cold exposure', 'ice bath', 'breathwork', 'cyclic hyperventilation', 'cold therapy', 'Tummo', 'hormesis', 'autonomic nervous system', 'immune modulation', 'Kox study'],
};
export default function WimHofPage() { return <WimHofClient />; }
