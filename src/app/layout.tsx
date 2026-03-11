import type { Metadata } from 'next';
import { Cormorant_Garamond, Raleway, DM_Sans } from 'next/font/google';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import ProgressBar from '@/components/ProgressBar';
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
  title: 'Inner Practice — A Beginner\'s Journey',
  description:
    'Meditation and kundalini yoga for beginners. Quiet the mind, awaken your energy. Guided sessions, educational resources, and a beginner-friendly practice flow.',
  keywords: ['meditation', 'yoga', 'kundalini', 'mindfulness', 'beginner', 'guided meditation'],
  openGraph: {
    title: 'Inner Practice',
    description: 'Quiet the mind. Awaken your energy.',
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
        <ProgressBar />

        <nav className="site-nav">
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
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.375rem',
                fontWeight: 600,
                letterSpacing: '0.03em',
                color: 'var(--color-violet-deep)',
                textDecoration: 'none',
              }}
            >
              Inner Practice
            </Link>

            {/* Nav links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
              }}
            >
              <Link
                href="/meditate"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                Meditate
              </Link>
              <Link
                href="/yoga"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                Yoga
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <main style={{ paddingTop: '60px' }}>
          {children}
        </main>

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
                A beginner&apos;s journey into meditation &amp; yoga
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
        </footer>
      </body>
    </html>
  );
}
