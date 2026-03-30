import type { Metadata } from 'next';
import FloatClient from './FloatClient';

export const metadata: Metadata = {
  title: 'Float Tanks — Sensory Deprivation & the Science of REST | Inner Practice',
  description:
    'Explore float tanks and flotation REST: the neuroscience of sensory deprivation from John C. Lilly to modern fMRI research, honest clinical evidence for anxiety and pain, the session experience, DIY tank construction, commercial tanks compared, and how floating integrates with meditation, breathwork, massage, fascia, and nervous system practices.',
  keywords: [
    'float tank', 'sensory deprivation', 'flotation REST', 'isolation tank',
    'float therapy', 'John C. Lilly', 'theta brainwaves', 'default mode network',
    'float tank anxiety', 'float tank evidence', 'Justin Feinstein', 'LIBR',
    'Epsom salt', 'magnesium sulfate', 'DIY float tank', 'home float tank',
    'float tank meditation', 'sensory deprivation tank', 'REST therapy',
    'float tank recovery', 'polyvagal float', 'interoception',
    'Dreampod', 'Samadhi tank', 'Zen Float',
  ],
};

export default function FloatPage() {
  return <FloatClient />;
}
