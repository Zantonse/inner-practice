import type { Metadata } from 'next';
import PsychedelicsClient from './PsychedelicsClient';
export const metadata: Metadata = {
  title: 'Psychedelics & Neuroplasticity — The Catalysts | Inner Practice',
  description: 'Psilocybin, MDMA, and the neuroscience of psychedelic therapy. DMN suppression, neuroplasticity, clinical evidence for depression and PTSD, safety protocols, and integration with contemplative practice.',
  keywords: ['psychedelics', 'psilocybin', 'MDMA', 'neuroplasticity', 'default mode network', 'psychedelic therapy', 'integration', 'PTSD', 'depression', 'microdosing', 'entropic brain'],
};
export default function PsychedelicsPage() { return <PsychedelicsClient />; }
