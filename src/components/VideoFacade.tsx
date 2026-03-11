'use client';

import { useState } from 'react';
import Image from 'next/image';

interface VideoFacadeProps {
  videoId: string;
  title: string;
  className?: string;
}

export default function VideoFacade({ videoId, title, className = '' }: VideoFacadeProps) {
  const [isActive, setIsActive] = useState(false);
  // YouTube maxresdefault (1280x720) is not always available; hqdefault (480x360) always is.
  // We try maxres first and fall back via onError.
  const [thumbnailUrl, setThumbnailUrl] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  );
  const embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&playsinline=1&autoplay=1`;

  if (isActive) {
    return (
      <div
        className={className}
        style={{ position: 'relative', aspectRatio: '16 / 9', width: '100%' }}
      >
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`video-facade ${className}`}
      onClick={() => setIsActive(true)}
      role="button"
      tabIndex={0}
      aria-label={`Play: ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsActive(true);
        }
      }}
    >
      <Image
        src={thumbnailUrl}
        alt={`Thumbnail for ${title}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
        style={{ objectFit: 'cover' }}
        unoptimized
        onError={() => {
          // Fallback to hqdefault if maxresdefault not available
          setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
        }}
      />
      <div className="video-play-btn">
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.15)" />
          <circle cx="40" cy="40" r="32" fill="rgba(89,46,107,0.85)" />
          <polygon points="32,26 58,40 32,54" fill="#F5EAE1" />
        </svg>
      </div>
    </div>
  );
}
