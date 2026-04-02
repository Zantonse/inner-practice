import React from 'react';

interface InfoCardProps {
  children: React.ReactNode;
  accentColor?: string;
  id?: string;
}

export default function InfoCard({
  children,
  accentColor = 'var(--color-amber-light)',
  id,
}: InfoCardProps) {
  return (
    <div
      id={id}
      style={{
        padding: '1.25rem 1.5rem',
        background: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
        borderRadius: '2px',
        borderLeft: `3px solid ${accentColor}`,
      }}
    >
      {children}
    </div>
  );
}
