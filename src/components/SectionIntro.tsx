import React from 'react';

interface SectionIntroProps {
  label: string;
  title: string;
  children?: React.ReactNode;
  accentColor?: string;
  id?: string;
}

export default function SectionIntro({
  label,
  title,
  children,
  accentColor,
  id,
}: SectionIntroProps) {
  const labelColor =
    accentColor !== undefined && accentColor !== 'var(--color-text-muted)'
      ? accentColor
      : 'var(--color-text-muted)';

  return (
    <div id={id}>
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: labelColor,
          margin: '0 0 1rem',
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-h2)',
          fontWeight: 400,
          color: 'var(--color-text)',
          margin: '0 0 1rem',
        }}
      >
        {title}
      </h2>
      {children && (
        <div
          style={{
            color: 'var(--color-text-muted)',
            marginBottom: '3rem',
            maxWidth: '58ch',
            fontSize: 'var(--text-body-lg)',
            lineHeight: 1.75,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
