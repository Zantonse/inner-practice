'use client';

import { useState, useEffect, useCallback } from 'react';

interface StickyNavProps {
  sections: { id: string; label: string }[];
  accentColor?: string;
}

export default function StickyNav({ sections, accentColor = 'var(--color-violet-deep)' }: StickyNavProps) {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [expanded, setExpanded] = useState(false);

  const updateActive = useCallback(() => {
    const scrollY = window.scrollY + 120;
    let current = '';
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el && el.offsetTop <= scrollY) {
        current = s.id;
      }
    }
    setActiveId(current);
  }, [sections]);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.85);
      updateActive();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [updateActive]);

  if (!visible) return null;

  return (
    <>
      {/* Desktop: vertical sidebar */}
      <nav
        aria-label="Page sections"
        style={{
          position: 'fixed',
          left: 'max(0.75rem, calc((100vw - 1280px) / 2 - 120px))',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 80,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          opacity: visible ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
        className="sticky-nav-desktop"
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={() => setExpanded(false)}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.625rem',
              fontWeight: activeId === s.id ? 600 : 400,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: activeId === s.id ? accentColor : 'var(--color-text-muted)',
              textDecoration: 'none',
              padding: '0.3rem 0.5rem',
              borderLeft: activeId === s.id ? `2px solid ${accentColor}` : '2px solid transparent',
              transition: 'color 200ms ease, border-color 200ms ease',
              whiteSpace: 'nowrap',
            }}
          >
            {s.label}
          </a>
        ))}
      </nav>

      {/* Mobile: floating pill that expands */}
      <div
        className="sticky-nav-mobile"
        style={{
          position: 'fixed',
          bottom: '5rem',
          right: '1rem',
          zIndex: 80,
        }}
      >
        {expanded && (
          <div
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 0.5rem)',
              right: 0,
              background: 'color-mix(in srgb, var(--color-cream) 92%, transparent)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '0.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.125rem',
              minWidth: '140px',
            }}
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setExpanded(false)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: activeId === s.id ? 600 : 400,
                  color: activeId === s.id ? accentColor : 'var(--color-text-muted)',
                  textDecoration: 'none',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '4px',
                  background: activeId === s.id ? 'rgba(0,0,0,0.04)' : 'transparent',
                  transition: 'background 150ms ease',
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        )}
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-label="Page sections"
          aria-expanded={expanded}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid var(--color-border)',
            background: 'color-mix(in srgb, var(--color-cream) 85%, transparent)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </>
  );
}
