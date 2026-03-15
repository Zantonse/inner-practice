import type { Metadata } from 'next';
import SoundHealingClient from './SoundHealingClient';

export const metadata: Metadata = {
  title: 'Sound Healing — Vibration as Medicine | Inner Practice',
  description:
    'Explore sound healing: singing bowls, binaural beats, mantra, Nada yoga, tuning forks, and the science of how vibration activates the vagus nerve, entrains brainwaves, and shifts the nervous system.',
  keywords: [
    'sound healing', 'singing bowls', 'binaural beats', 'sound bath',
    'mantra', 'om chanting', 'nada yoga', 'tuning forks', 'vagus nerve',
    'humming', 'bhramari pranayama', 'frequency healing', 'entrainment',
  ],
};

export default function SoundHealingPage() {
  return <SoundHealingClient />;
}
