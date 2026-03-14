# Veo Video Accent Strips — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 3 AI-generated ambient looping video strips as visual accents between content sections on the meditation, yoga, and fascia pages.

**Architecture:** Generate video clips with Veo 3, process into seamless loops, serve as local MP4 files via a new `VideoAccent` React component. Each video autoplays muted, loops infinitely, and pauses when off-screen.

**Tech Stack:** Next.js 16 / React 19 / Google Veo 3 / ffmpeg (via video-loop skill)

**Spec:** `docs/superpowers/specs/2026-03-13-veo-video-accents-design.md`

---

## Chunk 1: Asset Generation

### Task 1: Generate Meditation Video

**Files:**
- Create: `public/videos/meditation-loop.mp4`
- Create: `public/videos/meditation-poster.webp`

- [ ] **Step 1: Generate raw clip with Veo**

Use `/veo` skill with this prompt:

```
Slow, meditative aerial shot of morning mist rolling through a quiet mountain valley at golden hour. Soft diffused light, no people, no text. Camera barely moves. Gentle fog drifts between pine trees. Cinematic 4K, shallow depth of field.
```

Output resolution: 720p. Save raw output.

- [ ] **Step 2: Process into seamless loop**

Use `/video-loop` skill on the raw clip to create a forward-reverse-crossfade infinite loop.

- [ ] **Step 3: Extract poster frame**

```bash
ffmpeg -i public/videos/meditation-loop.mp4 -frames:v 1 -q:v 2 -f webp public/videos/meditation-poster.webp
```

- [ ] **Step 4: Verify file sizes**

```bash
ls -lh public/videos/meditation-loop.mp4 public/videos/meditation-poster.webp
```

Expected: MP4 ~1-3 MB, WebP ~20-50 KB.

---

### Task 2: Generate Yoga Video

**Files:**
- Create: `public/videos/yoga-loop.mp4`
- Create: `public/videos/yoga-poster.webp`

- [ ] **Step 1: Generate raw clip with Veo**

```
Fluid abstract motion of soft violet and amber light trails flowing through dark space, like energy moving through the body. Smooth, continuous, organic movement — no sharp edges, no particles. Feels like watching breath in slow motion. Cinematic, minimal.
```

Output resolution: 720p.

- [ ] **Step 2: Process into seamless loop**

Use `/video-loop` skill on the raw clip.

- [ ] **Step 3: Extract poster frame**

```bash
ffmpeg -i public/videos/yoga-loop.mp4 -frames:v 1 -q:v 2 -f webp public/videos/yoga-poster.webp
```

- [ ] **Step 4: Verify file sizes**

```bash
ls -lh public/videos/yoga-loop.mp4 public/videos/yoga-poster.webp
```

---

### Task 3: Generate Fascia Video

**Files:**
- Create: `public/videos/fascia-loop.mp4`
- Create: `public/videos/fascia-poster.webp`

- [ ] **Step 1: Generate raw clip with Veo**

```
Stylized close-up visualization of translucent connective tissue fibers — like fascia or collagen networks — slowly stretching and undulating in warm amber light. Macro-scale, organic, almost alive. No text, no labels. Beautiful scientific aesthetic.
```

Output resolution: 720p.

- [ ] **Step 2: Process into seamless loop**

Use `/video-loop` skill on the raw clip.

- [ ] **Step 3: Extract poster frame**

```bash
ffmpeg -i public/videos/fascia-loop.mp4 -frames:v 1 -q:v 2 -f webp public/videos/fascia-poster.webp
```

- [ ] **Step 4: Verify file sizes**

```bash
ls -lh public/videos/fascia-loop.mp4 public/videos/fascia-poster.webp
```

- [ ] **Step 5: Commit all video assets**

```bash
git add public/videos/
git commit -m "assets: add Veo-generated video loops and poster frames for meditation, yoga, fascia"
```

---

## Chunk 2: Component & Integration

### Task 4: Build VideoAccent Component

**Files:**
- Create: `src/components/VideoAccent.tsx`

- [ ] **Step 1: Create the component file**

```tsx
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit component**

```bash
git add src/components/VideoAccent.tsx
git commit -m "feat: add VideoAccent component for ambient looping video strips"
```

---

### Task 5: Integrate into Meditation Page

**Files:**
- Modify: `src/app/meditate/MeditateClient.tsx:318` (replace `<SectionDivider />` between Foundation and Research)

- [ ] **Step 1: Add import**

At the top of `MeditateClient.tsx`, add:
```tsx
import VideoAccent from '@/components/VideoAccent';
```

- [ ] **Step 2: Replace SectionDivider with VideoAccent**

Find the `<SectionDivider />` between the Foundation section (ending ~line 316) and "The Science" section (starting ~line 321). Replace:

```tsx
      <SectionDivider />

      {/* The Science */}
```

With:

```tsx
      <VideoAccent
        src="/videos/meditation-loop.mp4"
        poster="/videos/meditation-poster.webp"
      />

      {/* The Science */}
```

- [ ] **Step 3: Verify build**

```bash
npx next build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/meditate/MeditateClient.tsx
git commit -m "feat: add meditation video accent strip between Foundation and Research sections"
```

---

### Task 6: Integrate into Yoga Page

**Files:**
- Modify: `src/app/yoga/YogaClient.tsx:170` (replace `<SectionDivider />` between Passive Styles and Yoga Nidra)

- [ ] **Step 1: Add import**

At the top of `YogaClient.tsx`, add:
```tsx
import VideoAccent from '@/components/VideoAccent';
```

- [ ] **Step 2: Replace SectionDivider with VideoAccent**

Find the `<SectionDivider />` between the Passive Styles section (ending ~line 168) and "03 — Yoga Nidra" (starting ~line 173). Replace:

```tsx
      <SectionDivider />

      {/* 03 — YOGA NIDRA */}
```

With:

```tsx
      <VideoAccent
        src="/videos/yoga-loop.mp4"
        poster="/videos/yoga-poster.webp"
      />

      {/* 03 — YOGA NIDRA */}
```

- [ ] **Step 3: Verify build**

```bash
npx next build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/yoga/YogaClient.tsx
git commit -m "feat: add yoga video accent strip between Passive Styles and Yoga Nidra sections"
```

---

### Task 7: Integrate into Fascia Page

**Files:**
- Modify: `src/app/fascia/FasciaClient.tsx:558` (replace `<SectionDivider />` between "Where the Web Gets Stuck" and "The Science")

- [ ] **Step 1: Add import**

At the top of `FasciaClient.tsx`, add:
```tsx
import VideoAccent from '@/components/VideoAccent';
```

- [ ] **Step 2: Replace SectionDivider with VideoAccent**

Find the `<SectionDivider />` between the "Where the Web Gets Stuck" section (ending ~line 556) and "THE SCIENCE" section (starting ~line 563). Replace:

```tsx
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          THE SCIENCE
      ══════════════════════════════════════════════════════ */}
```

With:

```tsx
      <VideoAccent
        src="/videos/fascia-loop.mp4"
        poster="/videos/fascia-poster.webp"
      />

      {/* ══════════════════════════════════════════════════════
          THE SCIENCE
      ══════════════════════════════════════════════════════ */}
```

- [ ] **Step 3: Verify build**

```bash
npx next build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/fascia/FasciaClient.tsx
git commit -m "feat: add fascia video accent strip between anatomy and science sections"
```

---

### Task 8: Final Verification

- [ ] **Step 1: Full build check**

```bash
npx next build 2>&1 | tail -30
```

Expected: all pages build successfully.

- [ ] **Step 2: Start dev server and visually verify** *(human-only — agentic workers: skip to Step 3)*

```bash
npx next dev
```

Open each page in a browser and verify:
- `/meditate` — video plays between Foundation and Research sections
- `/yoga` — video plays between Passive Styles and Yoga Nidra sections
- `/fascia` — video plays between anatomy overview and Science sections
- Videos autoplay muted, loop seamlessly, pause when scrolled off-screen
- Poster frames show on initial load before video starts

- [ ] **Step 3: Test reduced motion** *(human-only)*

In browser DevTools, enable `prefers-reduced-motion: reduce`. Reload each page. Verify videos show static poster frame and do not autoplay.

- [ ] **Step 4: Test mobile viewport** *(human-only)*

Resize browser to 375px width. Verify video strips scale down gracefully and the `clamp(250px, 30vw, 400px)` height works at narrow widths (~250px height).
