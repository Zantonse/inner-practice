import type { Metadata } from 'next';
import NutritionClient from './NutritionClient';
export const metadata: Metadata = {
  title: 'Nutrition & Gut-Brain Axis — Feed Your Nervous System | Inner Practice',
  description: 'The gut-brain axis, anti-inflammatory nutrition, fermented foods, fasting, adaptogens, and how food directly regulates the vagus nerve and autonomic nervous system.',
  keywords: ['nutrition', 'gut brain axis', 'microbiome', 'anti-inflammatory diet', 'fermented foods', 'fasting', 'autophagy', 'adaptogens', 'ashwagandha', 'Mediterranean diet', 'omega-3', 'magnesium', 'psychobiotics'],
};
export default function NutritionPage() { return <NutritionClient />; }
