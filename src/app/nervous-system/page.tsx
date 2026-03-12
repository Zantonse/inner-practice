import type { Metadata } from 'next';
import NervousSystemClient from './NervousSystemClient';

export const metadata: Metadata = {
  title: 'Nervous System — The Root of Every Practice | Inner Practice',
  description:
    'The meta-layer beneath meditation, yoga, fascia, and breathwork. Discover the vagus nerve, Polyvagal Theory, 19 stimulation techniques, eye movement exercises, the Wim Hof Method, and how to measure your vagal tone through HRV.',
  keywords: [
    'vagus nerve', 'polyvagal theory', 'Stephen Porges', 'autonomic nervous system',
    'HRV', 'heart rate variability', 'vagal tone', 'nervous system regulation',
    'Wim Hof method', 'eye movements', 'EMDR', 'cold exposure', 'parasympathetic',
    'ventral vagal', 'neuroception', 'window of tolerance',
  ],
};

export default function NervousSystemPage() {
  return <NervousSystemClient />;
}
