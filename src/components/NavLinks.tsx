'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: 'Meditate', href: '/meditate' },
  { label: 'Yoga', href: '/yoga' },
  { label: 'Fascia', href: '/fascia' },
  { label: 'Breathe', href: '/breathe' },
  { label: 'Nervous System', href: '/nervous-system' },
  { label: 'Sound', href: '/sound-healing' },
  { label: 'Somatics', href: '/somatics' },
  { label: 'Reiki', href: '/reiki' },
  { label: 'Sleep', href: '/sleep' },
  { label: 'Qigong', href: '/qigong' },
  { label: 'Chakras', href: '/chakras' },
  { label: 'Trauma', href: '/trauma' },
  { label: 'Nutrition', href: '/nutrition' },
  { label: 'Temperature', href: '/temperature' },
  { label: 'Nature', href: '/nature' },
  { label: 'Tai Chi', href: '/taichi' },
  { label: 'Fasting', href: '/fasting' },
  { label: 'Psychedelics', href: '/psychedelics' },
  { label: 'Practice', href: '/practice' },
  { label: 'Manifest', href: '/manifest' },
];

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: '0.875rem',
  fontWeight: 500,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)',
  textDecoration: 'none',
  transition: 'color 300ms ease',
};

const activeLinkStyle: React.CSSProperties = {
  ...linkStyle,
  color: 'var(--color-violet-deep)',
};

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="nav-links">
      {NAV_ITEMS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={pathname === href ? 'nav-active' : undefined}
          style={pathname === href ? activeLinkStyle : linkStyle}
        >
          {label}
        </Link>
      ))}
      <ThemeToggle />
    </div>
  );
}
