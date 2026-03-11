import Image from 'next/image';

interface SectionDividerProps {
  className?: string;
  flip?: boolean;
}

export default function SectionDivider({ className = '', flip = false }: SectionDividerProps) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '4rem',
        position: 'relative',
        overflow: 'hidden',
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
      aria-hidden="true"
    >
      {/* Try to use the generated image; fall back to SVG gradient */}
      <svg
        viewBox="0 0 1440 64"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="divider-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#D7C2EE" stopOpacity="0.6" />
            <stop offset="40%"  stopColor="#EDE9FE" stopOpacity="0.4" />
            <stop offset="70%"  stopColor="#E4AD75" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F5EAE1" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M0,32 C180,8 360,56 540,32 C720,8 900,56 1080,32 C1260,8 1380,48 1440,32 L1440,64 L0,64 Z"
          fill="url(#divider-grad)"
        />
        <path
          d="M0,48 C240,24 480,64 720,40 C960,16 1200,56 1440,36 L1440,64 L0,64 Z"
          fill="url(#divider-grad)"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
