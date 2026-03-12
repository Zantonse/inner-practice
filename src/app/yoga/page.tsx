import type { Metadata } from 'next';
import YogaClient from './YogaClient';

export const metadata: Metadata = {
  title: 'Yoga — Every Style, Every Path | Inner Practice',
  description:
    'Explore 10 yoga styles from Hatha to Yoga Nidra. Deep dive into the science of yogic sleep, NSDR, Kundalini, Yin, Restorative, Vinyasa, Ashtanga, Power, and Hot Yoga. Find the style that fits your nervous system.',
  keywords: [
    'yoga styles', 'yoga nidra', 'NSDR', 'non-sleep deep rest', 'kundalini yoga',
    'hatha yoga', 'vinyasa', 'ashtanga', 'yin yoga', 'restorative yoga',
    'hot yoga', 'bikram', 'power yoga', 'iyengar', 'kirtan kriya',
    'yoga for anxiety', 'yoga for sleep', 'yoga for depression',
  ],
};

export default function YogaPage() {
  return <YogaClient />;
}
