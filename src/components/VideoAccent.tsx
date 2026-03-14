'use client';

import { useEffect, useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

interface VideoAccentProps {
  src: string;
  poster: string;
}

export default function VideoAccent({ src, poster }: VideoAccentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      video.pause();
      return;
    }

    // Play/pause based on viewport visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <ScrollReveal>
      {/* Outer padding matches existing section gutters: max(1.5rem, 8vw) */}
      <div
        style={{
          padding: '0 max(1.5rem, 8vw)',
        }}
      >
        <div
          style={{
            height: 'clamp(250px, 30vw, 400px)',
            overflow: 'hidden',
            borderRadius: '2px',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={poster}
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      </div>
    </ScrollReveal>
  );
}
