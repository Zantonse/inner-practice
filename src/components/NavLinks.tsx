'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

// ── Grouped navigation structure ──────────────────────────────
interface NavPage {
  label: string;
  href: string;
}

interface NavGroup {
  label: string;
  pages: NavPage[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Body',
    pages: [
      { label: 'Yoga', href: '/yoga' },
      { label: 'Fascia', href: '/fascia' },
      { label: 'Somatics', href: '/somatics' },
      { label: 'Tai Chi', href: '/taichi' },
      { label: 'Nutrition', href: '/nutrition' },
      { label: 'Fasting', href: '/fasting' },
      { label: 'Temperature', href: '/temperature' },
    ],
  },
  {
    label: 'Breath',
    pages: [
      { label: 'Breathe', href: '/breathe' },
      { label: 'Wim Hof', href: '/wim-hof' },
      { label: 'Sleep', href: '/sleep' },
    ],
  },
  {
    label: 'Mind',
    pages: [
      { label: 'Meditate', href: '/meditate' },
      { label: 'Trauma', href: '/trauma' },
      { label: 'Nature', href: '/nature' },
      { label: 'Psychedelics', href: '/psychedelics' },
    ],
  },
  {
    label: 'Energy',
    pages: [
      { label: 'Reiki', href: '/reiki' },
      { label: 'Chakras', href: '/chakras' },
      { label: 'Sound', href: '/sound-healing' },
      { label: 'Qigong', href: '/qigong' },
      { label: 'Reflexology', href: '/reflexology' },
      { label: 'Nervous System', href: '/nervous-system' },
    ],
  },
  {
    label: 'Practice',
    pages: [
      { label: 'Practice', href: '/practice' },
      { label: 'Manifest', href: '/manifest' },
    ],
  },
];

// ── Chevron SVG ────────────────────────────────────────────────
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className || 'chevron'}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Hamburger icon ─────────────────────────────────────────────
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {isOpen ? (
        <>
          <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

// ── Desktop NavLinks ───────────────────────────────────────────
export default function NavLinks() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close everything on route change
  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
    setMobileAccordion(null);
  }, [pathname]);

  // Close desktop dropdown on click outside
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  function toggleGroup(label: string) {
    setOpenGroup((prev) => (prev === label ? null : label));
  }

  function toggleMobileAccordion(label: string) {
    setMobileAccordion((prev) => (prev === label ? null : label));
  }

  function groupIsActive(group: NavGroup): boolean {
    return group.pages.some((p) => pathname === p.href);
  }

  return (
    <>
      {/* ── Desktop nav (hidden on mobile) ──────────────────── */}
      <div className="nav-groups nav-desktop" ref={navRef}>
        {NAV_GROUPS.map((group) => {
          const isOpen = openGroup === group.label;
          const hasActivePage = groupIsActive(group);

          return (
            <div className="nav-group" key={group.label}>
              <button
                className={`nav-group-btn${hasActivePage ? ' group-active' : ''}`}
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={() => toggleGroup(group.label)}
              >
                {group.label}
                <ChevronDown />
              </button>
              <div
                className="nav-dropdown"
                data-open={isOpen}
                role="menu"
              >
                {group.pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    role="menuitem"
                    className={pathname === page.href ? 'nav-active' : undefined}
                  >
                    {page.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        <ThemeToggle />
      </div>

      {/* ── Mobile hamburger + panel (hidden on desktop) ─────── */}
      <div className="nav-mobile">
        <ThemeToggle />
        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <HamburgerIcon isOpen={mobileOpen} />
        </button>
      </div>

      {/* Mobile slide-down panel */}
      {mobileOpen && (
        <div className="nav-mobile-panel" role="navigation" aria-label="Mobile navigation">
          {/* Backdrop */}
          <div
            className="nav-mobile-backdrop"
            onClick={() => setMobileOpen(false)}
          />
          <div className="nav-mobile-content">
            {NAV_GROUPS.map((group) => {
              const isAccordionOpen = mobileAccordion === group.label;
              const hasActivePage = groupIsActive(group);

              return (
                <div key={group.label} className="nav-mobile-group">
                  <button
                    className={`nav-mobile-group-btn${hasActivePage ? ' group-active' : ''}`}
                    onClick={() => toggleMobileAccordion(group.label)}
                    aria-expanded={isAccordionOpen}
                  >
                    <span>{group.label}</span>
                    <ChevronDown className={`chevron-mobile${isAccordionOpen ? ' open' : ''}`} />
                  </button>
                  {isAccordionOpen && (
                    <div className="nav-mobile-links">
                      {group.pages.map((page) => (
                        <Link
                          key={page.href}
                          href={page.href}
                          className={pathname === page.href ? 'nav-active' : undefined}
                        >
                          {page.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
