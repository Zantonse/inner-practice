import type { Metadata } from 'next';
import TemperatureClient from './TemperatureClient';
export const metadata: Metadata = {
  title: 'Cold & Heat Therapy — Train Your Autonomic Nervous System | Inner Practice',
  description: 'Deliberate cold exposure, sauna science, contrast therapy, and hormesis. How temperature trains autonomic flexibility, boosts dopamine, and builds resilience.',
  keywords: ['cold exposure', 'cold shower', 'ice bath', 'sauna', 'heat therapy', 'contrast therapy', 'hormesis', 'Wim Hof', 'dopamine', 'norepinephrine', 'brown fat', 'heat shock proteins'],
};
export default function TemperaturePage() { return <TemperatureClient />; }
