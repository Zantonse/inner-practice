import type { Metadata } from 'next';
import { Cormorant_Garamond, Raleway, DM_Sans } from 'next/font/google';
import './globals.css';
import ProgressBar from '@/components/ProgressBar';
import NavLinks from '@/components/NavLinks';
import BackToTop from '@/components/BackToTop';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import Link from 'next/link';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Inner Practice — Stillness. Breath. Release.',
  description:
    'Meditation, yoga, fascia release, breathwork, nervous system regulation, and evidence-based manifestation. Explore 10 yoga styles, 14 breathwork techniques, the vagus nerve, Polyvagal Theory, and the science of intention-setting. Guided sessions, practice timers, and daily routine templates.',
  keywords: [
    'meditation', 'yoga', 'yoga nidra', 'fascia', 'gua sha', 'mindfulness', 'beginner',
    'guided meditation', 'myofascial release', 'breathwork', 'pranayama', 'breathing exercises',
    'Wim Hof', 'box breathing', 'physiological sigh', 'nervous system', 'HRV', 'vagus nerve',
    'polyvagal theory', 'Stephen Porges', 'autonomic nervous system', 'vagal tone', 'eye movement',
    'manifestation', 'sankalpa', 'WOOP', 'intention setting', 'visualization', 'goal science',
    'practice timer', 'daily routines',
  ],
  openGraph: {
    title: 'Inner Practice',
    description: 'Meditation, yoga, breathwork, fascia, nervous system regulation, and the science of intention.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
        lang="en"
        suppressHydrationWarning
        className={`${cormorant.variable} ${raleway.variable} ${dmSans.variable}`}
      >
      <body>
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <ProgressBar />

        <nav className="site-nav" aria-label="Main navigation">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '1280px',
              margin: '0 auto',
            }}
          >
            {/* Brand */}
            <Link
              href="/"
              className="nav-brand"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.375rem',
                fontWeight: 600,
                letterSpacing: '0.03em',
                color: 'var(--color-violet-deep)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Inner Practice
            </Link>

            <NavLinks />
          </div>
        </nav>

        <main id="main-content">
          {children}
        </main>
        <BackToTop />

        <footer
          style={{
            padding: '3rem max(1.5rem, 5vw)',
            borderTop: '1px solid var(--color-border)',
            background: 'color-mix(in srgb, var(--color-cream) 95%, var(--color-violet-mid))',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--color-violet-deep)',
                  margin: 0,
                  maxWidth: 'none',
                }}
              >
                Inner Practice
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                  marginTop: '0.25rem',
                  margin: '0.25rem 0 0',
                  maxWidth: 'none',
                }}
              >
                Meditation, yoga, breathwork, fascia, nervous system &amp; intentional practice
              </p>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                margin: 0,
                maxWidth: 'none',
              }}
            >
              Practice with intention. Move with awareness.
            </p>
          </div>

          <div style={{ borderTop: '1px solid oklch(50% 0 0 / 0.15)', marginTop: '1.5rem', paddingTop: '1rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
              <strong>About our evidence review:</strong> Wellness and mind-body research is a young field.
              Many studies cited on this site have small sample sizes, lack blinding, or have not been
              independently replicated. We distinguish strong evidence from preliminary findings where
              possible, but readers should treat all claims as starting points for their own research,
              not as medical conclusions. Traditional and contemplative frameworks are presented alongside
              scientific evidence and should not be conflated with it.
            </p>
          </div>
        </footer>
        <MedicalDisclaimer />
      </body>
    </html>
  );
}
