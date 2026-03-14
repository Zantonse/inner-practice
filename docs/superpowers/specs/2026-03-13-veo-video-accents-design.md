# Veo Video Accent Strips

**Date:** 2026-03-13
**Status:** Draft
**Scope:** Meditation, Yoga, Fascia pages

## Summary

Add AI-generated ambient video strips to three content pages as visual breaks between sections. Each page gets one silent, autolooping video that plays inline — no controls, no audio, no interaction. Videos are generated with Google Veo 3, processed into seamless loops, and served as local MP4 files.

## Goals

- Add visual richness and rhythm to long-form content pages
- Match each video's aesthetic to its page's subject matter
- Zero impact on existing YouTube embeds or other pages

## Non-Goals

- Hero background videos (out of scope — heroes stay as-is)
- Audio or playback controls
- Videos on breathe, nervous-system, manifest, or practice pages
- Replacing or modifying the existing `VideoFacade` YouTube component

## Video Content

Three videos, one per page, each with a distinct visual style:

### Meditation — Realistic Nature
> Slow, meditative aerial shot of morning mist rolling through a quiet mountain valley at golden hour. Soft diffused light, no people, no text. Camera barely moves. Gentle fog drifts between pine trees. Cinematic 4K, shallow depth of field.

### Yoga — Abstract / Ethereal
> Fluid abstract motion of soft violet and amber light trails flowing through dark space, like energy moving through the body. Smooth, continuous, organic movement — no sharp edges, no particles. Feels like watching breath in slow motion. Cinematic, minimal.

### Fascia — Anatomical / Educational
> Stylized close-up visualization of translucent connective tissue fibers — like fascia or collagen networks — slowly stretching and undulating in warm amber light. Macro-scale, organic, almost alive. No text, no labels. Beautiful scientific aesthetic.

Each clip: 5-8 seconds raw, processed into a seamless forward-reverse-crossfade loop.

## Placement

Videos are inserted as full-width cinematic strips between existing content sections:

| Page | Insert Between | Purpose |
|------|---------------|---------|
| `/meditate` | End of "Foundation" section (~line 316) and start of "Research" section (~line 321) | Visual pause between learning styles and seeing science |
| `/yoga` | End of "02 — The Passive Styles" (~line 168) and start of "03 — Yoga Nidra" (~line 173) | Flowing transition into the deep-rest section |
| `/fascia` | End of "Where the Web Gets Stuck" section (~line 556) and start of "The Science" section (~line 563), replacing the `<SectionDivider />` at ~line 558 | Anatomical visualization bridging theory to practice |

## Component: `VideoAccent`

**File:** `src/components/VideoAccent.tsx`

A client component that renders a muted, autolooping `<video>` element inside a constrained-height container.

### Props

```typescript
interface VideoAccentProps {
  src: string;       // Path to MP4 in public/videos/
  poster: string;    // Path to WebP poster frame
  alt: string;       // Accessible description for screen readers
}
```

### Behavior

- **Container:** `clamp(250px, 30vw, 400px)` height, `overflow: hidden`, `border-radius: 2px`, with horizontal padding `max(1.5rem, 8vw)` matching existing page sections
- **Video element:** `autoPlay`, `muted`, `loop`, `playsInline`, `object-fit: cover`
- **Scroll-aware:** Own `IntersectionObserver` on the `<video>` element plays when in viewport, pauses when off-screen (avoids wasted decoding). This is separate from `ScrollReveal`'s one-shot observer — `ScrollReveal` fires once for the fade-in, while the video observer runs continuously for play/pause.
- **Reduced motion:** Respects `prefers-reduced-motion` — shows static poster frame, does not autoplay
- **Scroll reveal:** Wrapped in existing `ScrollReveal` component for fade-in entrance
- **No controls:** No visible play/pause/mute UI
- **Aria:** `aria-hidden="true"` since the video is purely decorative

### HTML Structure

```tsx
<ScrollReveal>
  <div style={{
    height: 'clamp(250px, 30vw, 400px)',
    overflow: 'hidden',
    borderRadius: '2px',
  }}>
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    >
      <source src={src} type="video/mp4" />
    </video>
  </div>
</ScrollReveal>
```

## File Structure

```
public/
  videos/
    meditation-loop.mp4        # ~1-3 MB, 720p
    meditation-poster.webp     # ~20-50 KB, first frame
    yoga-loop.mp4
    yoga-poster.webp
    fascia-loop.mp4
    fascia-poster.webp
src/
  components/
    VideoAccent.tsx            # New component
```

## Performance

- **Resolution:** 720p — sufficient for a 400px-tall strip with `object-fit: cover`
- **File size:** ~1-3 MB per clip (5-8 sec loop at 720p). Each page loads only its own video.
- **Preload:** `preload="none"` — no download until the video enters the viewport
- **Intersection Observer:** Play on enter viewport, pause on exit. Single observer per video instance.
- **Poster frames:** Extracted first frame as WebP. Shown during load and for `prefers-reduced-motion`.
- **No impact on existing assets:** YouTube embeds via `VideoFacade` are untouched.

## Generation Workflow

1. Generate 3 raw clips with `/veo` (one per prompt above)
2. Process each into a seamless loop with `/video-loop`
3. Extract first frame of each loop as `.webp` poster
4. Place files in `public/videos/`
5. Build `VideoAccent` component
6. Insert component into `MeditateClient.tsx`, `YogaClient.tsx`, `FasciaClient.tsx` at specified locations
7. Test autoplay, reduced-motion fallback, scroll play/pause, mobile rendering

## Files Modified

| File | Change |
|------|--------|
| `src/components/VideoAccent.tsx` | New file — reusable video accent component |
| `src/app/meditate/MeditateClient.tsx` | Insert `<VideoAccent>` between Foundation and Research sections |
| `src/app/yoga/YogaClient.tsx` | Insert `<VideoAccent>` between Passive Styles and Yoga Nidra sections |
| `src/app/fascia/FasciaClient.tsx` | Insert `<VideoAccent>` between anatomy overview and myofascial tools sections |
| `public/videos/*` | 6 new files (3 MP4 + 3 WebP posters) |
