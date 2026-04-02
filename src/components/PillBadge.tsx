import React from 'react';

interface PillBadgeProps {
  children: React.ReactNode;
  accentColor?: string;
  accentTextColor?: string;
  size?: 'sm' | 'md';
}

export default function PillBadge({
  children,
  accentColor = 'var(--color-violet-deep)',
  accentTextColor,
  size = 'sm',
}: PillBadgeProps) {
  const padding = size === 'md' ? '0.3rem 0.75rem' : '0.2rem 0.65rem';
  const fontSize = size === 'md' ? '0.6875rem' : '0.625rem';
  const textColor = accentTextColor ?? accentColor;

  return (
    <span
      style={{
        display: 'inline-block',
        padding,
        borderRadius: '9999px',
        background: `color-mix(in srgb, ${accentColor} 30%, var(--color-cream))`,
        fontFamily: 'var(--font-ui)',
        fontSize,
        fontWeight: 500,
        letterSpacing: '0.05em',
        color: textColor,
      }}
    >
      {children}
    </span>
  );
}
