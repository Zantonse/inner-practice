import type { Metadata } from 'next';
import QigongClient from './QigongClient';

export const metadata: Metadata = {
  title: 'Qigong — The Art of Moving Stillness | Inner Practice',
  description:
    'Explore qigong: 3,000 years of energy cultivation through slow movement, breath, and intention. The science of fascia hydration, specific forms (Ba Duan Jin, Zhan Zhuang, Wu Qin Xi), qi research, HRV and vagal tone effects, clinical evidence, and a 90-day beginner protocol.',
  keywords: [
    'qigong', 'chi kung', 'ba duan jin', 'eight brocades', 'zhan zhuang',
    'standing meditation', 'wu qin xi', 'five animal frolics', 'yi jin jing',
    'liu zi jue', 'six healing sounds', 'qi', 'chi', 'tai chi',
    'fascia hydration', 'slow movement', 'HRV qigong', 'vagal tone',
    'medical qigong', 'energy cultivation', 'Chinese medicine',
  ],
};

export default function QigongPage() {
  return <QigongClient />;
}
