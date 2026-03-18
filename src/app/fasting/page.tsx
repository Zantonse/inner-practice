import type { Metadata } from 'next';
import FastingClient from './FastingClient';
export const metadata: Metadata = {
  title: 'Fasting & Autophagy — The Cellular Reset | Inner Practice',
  description: 'Time-restricted eating, intermittent fasting, autophagy, circadian eating, and the metabolic switch. How every contemplative tradition independently discovered fasting as medicine.',
  keywords: ['fasting', 'autophagy', 'intermittent fasting', 'time restricted eating', 'circadian eating', 'Satchin Panda', 'mTOR', 'BDNF', 'ketones', 'Ohsumi', 'metabolic switch'],
};
export default function FastingPage() { return <FastingClient />; }
