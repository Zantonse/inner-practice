import type { Metadata } from 'next';
import MeditateClient from './MeditateClient';

export const metadata: Metadata = {
  title: 'Learn to Meditate — Inner Practice',
  description:
    'Discover the science and art of meditation. Learn different techniques, how to start, and practice with curated guided meditation videos.',
};

export default function MeditatePage() {
  return <MeditateClient />;
}
