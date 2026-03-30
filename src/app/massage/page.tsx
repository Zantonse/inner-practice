import type { Metadata } from 'next';
import MassageClient from './MassageClient';

export const metadata: Metadata = {
  title: 'Massage — The Science of Therapeutic Touch | Inner Practice',
  description:
    'Explore massage therapy: mechanotransduction and fascia science, 11 modalities compared, honest clinical evidence from JAMA 2024, polyvagal mapping, C-tactile afferents, self-massage protocols by goal, and cross-links to breathwork, fascia, yoga, and nervous system practices.',
  keywords: [
    'massage therapy', 'massage science', 'mechanotransduction', 'fascia massage',
    'deep tissue', 'swedish massage', 'thai massage', 'myofascial release',
    'trigger point therapy', 'sports massage', 'self-massage', 'foam rolling',
    'massage gun', 'C-tactile afferents', 'polyvagal theory', 'vagal tone',
    'trauma-informed touch', 'massage evidence', 'DOMS recovery',
    'craniosacral therapy', 'rolfing', 'shiatsu', 'lymphatic drainage',
  ],
};

export default function MassagePage() {
  return <MassageClient />;
}
