import type { Metadata } from 'next';
import NatureClient from './NatureClient';
export const metadata: Metadata = {
  title: 'Nature & Forest Bathing — The Original Medicine | Inner Practice',
  description: 'Shinrin-yoku (forest bathing), phytoncides and immune function, grounding science, morning light protocols, and why nature is the environment your nervous system was designed for.',
  keywords: ['forest bathing', 'shinrin-yoku', 'nature therapy', 'phytoncides', 'grounding', 'earthing', 'NK cells', 'attention restoration', 'biophilia', 'outdoor meditation', 'vitamin D', 'morning light'],
};
export default function NaturePage() { return <NatureClient />; }
