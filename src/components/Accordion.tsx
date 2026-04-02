'use client';

import { useState, useCallback, type ReactNode } from 'react';

export interface AccordionItem {
  id: string;
  header: ReactNode;
  body: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  accentColor?: string;
  allowMultiple?: boolean;
  defaultOpen?: string | string[];
  variant?: 'card' | 'minimal';
}

export default function Accordion({
  items,
  accentColor = 'var(--color-violet-deep)',
  allowMultiple = false,
  defaultOpen,
  variant = 'card',
}: AccordionProps) {
  const [openSingle, setOpenSingle] = useState<string | null>(
    !allowMultiple && typeof defaultOpen === 'string' ? defaultOpen : null,
  );
  const [openMulti, setOpenMulti] = useState<Set<string>>(
    () => {
      if (!allowMultiple) return new Set<string>();
      if (Array.isArray(defaultOpen)) return new Set(defaultOpen);
      if (typeof defaultOpen === 'string') return new Set([defaultOpen]);
      return new Set<string>();
    },
  );

  const isOpen = useCallback(
    (id: string) => (allowMultiple ? openMulti.has(id) : openSingle === id),
    [allowMultiple, openMulti, openSingle],
  );

  const toggle = useCallback(
    (id: string) => {
      if (allowMultiple) {
        setOpenMulti((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });
      } else {
        setOpenSingle((prev) => (prev === id ? null : id));
      }
    },
    [allowMultiple],
  );

  const isMinimal = variant === 'minimal';

  return (
    <div>
      {items.map((item, index) => {
        const open = isOpen(item.id);
        return (
          <div
            key={item.id}
            id={item.id}
            style={{
              background: isMinimal ? 'transparent' : 'var(--color-surface-raised)',
              border: isMinimal
                ? 'none'
                : `1px solid ${open ? accentColor : 'var(--color-border)'}`,
              borderBottom: isMinimal ? '1px solid var(--color-border)' : undefined,
              borderRadius: isMinimal ? '0' : '2px',
              overflow: 'hidden',
              transition: 'border-color 300ms ease',
              marginBottom: isMinimal ? '0' : '0.875rem',
            }}
          >
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={open}
              style={{
                width: '100%',
                padding: isMinimal ? '1rem 0' : '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                {!isMinimal && (
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: 'var(--color-text-muted)',
                      minWidth: '1.5rem',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
                {item.header}
              </div>
              <div
                style={{
                  flexShrink: 0,
                  color: 'var(--color-text-muted)',
                  transition: 'transform 300ms ease',
                  transform: open ? 'rotate(180deg)' : 'none',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>

            {open && (
              <div
                style={{
                  padding: isMinimal ? '0 0 1rem' : '0 1.5rem 1.5rem',
                  borderTop: isMinimal ? 'none' : '1px solid var(--color-border)',
                }}
              >
                {item.body}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
