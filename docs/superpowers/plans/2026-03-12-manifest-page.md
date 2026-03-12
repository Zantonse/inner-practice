# /manifest Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/manifest` page — Inner Practice's synthesis page tying all 5 existing tracks into a manifestation framework grounded in neuroscience and goal science.

**Architecture:** Hybrid data-driven page. Three data-driven sections rendered by a shared `ManifestSection` component, plus one bespoke Protocol section with a vertical step flow. Gold accent palette. ~600-800 lines total.

**Tech Stack:** Next.js 16, React 19, TypeScript, inline styles with CSS custom properties, existing shared components (ScrollReveal, SectionDivider, VideoFacade).

**Spec:** `docs/superpowers/specs/2026-03-12-manifest-page-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/app/manifest/page.tsx` | Server component: metadata + renders ManifestClient |
| Create | `src/app/manifest/ManifestClient.tsx` | Client component: full page content |
| Modify | `src/app/layout.tsx` | Add "Manifest" nav link |
| Modify | `src/app/page.tsx` | Add manifest + practice to PathKey and paths array, update hero layout |

---

## Chunk 1: Core Page Scaffold

### Task 1: Create the server component (`page.tsx`)

**Files:**
- Create: `src/app/manifest/page.tsx`

- [ ] **Step 1: Create directory and server component**

```typescript
// src/app/manifest/page.tsx
import type { Metadata } from 'next';
import ManifestClient from './ManifestClient';

export const metadata: Metadata = {
  title: 'Manifest — The Science of Intention | Inner Practice',
  description:
    'How neuroscience, goal science, and ancient contemplative traditions converge into a practical framework for intentional creation. Evidence-based manifestation grounded in nervous system regulation.',
  keywords: [
    'manifestation', 'intention setting', 'goal science', 'WOOP',
    'implementation intentions', 'sankalpa', 'yoga nidra', 'visualization',
    'HeartMath', 'heart coherence', 'polyvagal theory', 'nervous system',
    'mental contrasting', 'Oettingen', 'Gollwitzer', 'neuroplasticity',
  ],
};

export default function ManifestPage() {
  return <ManifestClient />;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/manifest/page.tsx
git commit -m "feat: add /manifest server component with metadata"
```

---

### Task 2: Create ManifestClient with types, data, and local components

**Files:**
- Create: `src/app/manifest/ManifestClient.tsx`

This is the main task. Build the entire client component in one file following the data-driven pattern from `YogaClient.tsx`. The file has these internal sections:

1. Accent tokens
2. TypeScript interfaces
3. Section data arrays (THE SCIENCE, THE PRACTICE LINEAGE, HONEST BOUNDARIES)
4. Protocol steps data array
5. Local components: `StatCard`, `ManifestSection`, `ProtocolStep`
6. Main `ManifestClient` export with hero + 4 sections + cross-links

- [ ] **Step 1: Write the accent tokens, interfaces, and section data**

**IMPORTANT:** The first line of `ManifestClient.tsx` must be `'use client';` — every client component in this codebase requires this directive. Add it before any imports.

Accent tokens:
```typescript
const GOLD_DEEP  = '#9A7230';
const GOLD_MID   = '#D4A74A';
const GOLD_LIGHT = '#F0D68A';
```

Interfaces (from spec):
```typescript
interface ManifestPoint { id: string; title: string; body: string; }
interface ManifestStat { source: string; stat: string; detail: string; }
interface ManifestVideo { id: string; title: string; description: string; }
interface ManifestSectionData {
  id: string; heading: string; intro: string;
  points: ManifestPoint[]; stats?: ManifestStat[]; videos?: ManifestVideo[];
}
interface ProtocolStep {
  stage: number; name: string; description: string; why: string;
  links: { label: string; href: string; accentColor: string }[];
}
```

Section data — populate from spec content. Three `ManifestSectionData` objects:
- `scienceSection` — 4 points, 3 stats, 1 video
- `lineageSection` — 4 points, 3 stats, 1-2 videos
- `boundariesSection` — 4 points, no stats, no videos

Protocol steps — 5 `ProtocolStep` objects using the accent color lookup from the spec:
```
| /breathe         | #2E7070 teal  |
| /nervous-system  | #8B3A62 rose  |
| /yoga            | #592E6B violet|
| /meditate        | #592E6B violet|
| /practice        | #592E6B violet|
| /fascia          | #C07A35 amber |
```

- [ ] **Step 2: Write the local `StatCard` component**

Same shape as yoga/nervous-system pages, with `GOLD_DEEP` border:
```typescript
function StatCard({ source, stat, detail }: ManifestStat) {
  return (
    <div style={{
      borderLeft: `3px solid ${GOLD_DEEP}`,
      padding: '1.5rem 1.75rem',
      background: 'var(--color-surface-raised)',
      borderRadius: '2px',
    }}>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD_DEEP, margin: '0 0 0.75rem' }}>{source}</p>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>{stat}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>{detail}</p>
    </div>
  );
}
```

- [ ] **Step 3: Write the `ManifestSection` component**

Renders a data-driven section. Layout per spec:
- Heading: `GOLD_DEEP`, Cormorant Garamond display font
- Intro paragraph: max-width `780px`, centered
- Key points: vertical list — bold title in `GOLD_DEEP` `font-ui` label styling, followed by body text in `font-body`. Stacked vertically within `780px` prose column.
- StatCards: responsive grid `repeat(auto-fit, minmax(280px, 1fr))`, max-width `1100px`, below key points
- Videos: after stat cards, max-width `780px`, one per row

Wrap entire section in `ScrollReveal`.

```typescript
function ManifestSection({ section }: { section: ManifestSectionData }) {
  return (
    <ScrollReveal>
      <section style={{ padding: 'var(--section-pt-md) max(1.5rem, 8vw) var(--section-pb-md)' }}>
        {/* heading */}
        {/* intro — 780px centered */}
        {/* points — vertical list, 780px */}
        {/* stats grid — 1100px */}
        {/* videos — 780px, rendered as VideoFacade + caption */}
        {section.videos?.map(v => (
          <div key={v.id} style={{ maxWidth: '780px', margin: '0 auto 1.5rem' }}>
            <VideoFacade videoId={v.id} title={v.title} />
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0.75rem 0 0' }}>
              {v.description}
            </p>
          </div>
        ))}
      </section>
    </ScrollReveal>
  );
}
```

**Note:** `VideoFacade` accepts `{ videoId, title, className? }` only. The `description` field from `ManifestVideo` is rendered as a caption `<p>` below the facade, not passed as a prop. This matches the pattern used in YogaClient.

- [ ] **Step 4: Write the `ProtocolStepCard` component and protocol section**

The bespoke section. Vertical step flow with connecting lines.

Each step card:
- Stage number in a gold circle
- Name + description
- "Why" paragraph
- Link pills with colored accent pips matching the target page

Connecting vertical line between cards: use an absolutely positioned `<div>` — **not** a `::before` pseudo-element (pseudo-elements cannot be applied via inline styles, and this codebase uses inline styles exclusively).

Example connector between step cards:
```typescript
<div style={{
  position: 'absolute',
  left: '1.25rem',
  top: '100%',
  width: '1px',
  height: '2rem',
  background: `color-mix(in srgb, ${GOLD_MID} 40%, var(--color-border))`,
}} />
```

The protocol section also includes:
- Section heading: "The Inner Practice Protocol"
- Intro paragraph explaining the Regulate → Receive framework
- Closing paragraph (meta-insight about Inner Practice being a manifestation protocol)

- [ ] **Step 5: Write the main `ManifestClient` export**

Structure:
```
Hero (gold gradient, eyebrow, title, subtitle)
SectionDivider
ManifestSection(scienceSection)
SectionDivider flip
ManifestSection(lineageSection)
SectionDivider
Protocol section (bespoke)
SectionDivider flip
ManifestSection(boundariesSection)
Cross-links section
```

Hero follows the same pattern as other pages — full-width gradient background with:
- Eyebrow: "The path of intention"
- Title: "Manifest"
- Subtitle: "What the science of intention, the wisdom of ancient practice, and your nervous system have in common."

Cross-links section at bottom — links to all other pages. Same pattern as MeditateClient's cross-link section (background tinted with accent color, grid of link cards).

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: Compiles successfully with zero TypeScript errors, `/manifest` route generates.

- [ ] **Step 7: Commit**

```bash
git add src/app/manifest/ManifestClient.tsx
git commit -m "feat: build /manifest page with 4 sections and protocol flow"
```

---

## Chunk 2: Site Integration

### Task 3: Add Manifest to navigation

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add Manifest nav link**

Add a new `<Link href="/manifest">` after the Practice link, using the same inline style object as all other nav links. The nav already handles overflow via horizontal scroll on mobile.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Compiles, all routes generate.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add Manifest to navigation bar"
```

---

### Task 4: Add Manifest + Practice to landing page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update PathKey union type**

Add `'manifest'` and `'practice'` to the `PathKey` type union on line 12.

- [ ] **Step 2: Add manifest entry to paths array**

Add after the `nervous-system` entry:
```typescript
{
  key: 'manifest',
  href: '/manifest',
  eyebrow: 'The path of intention',
  title: 'Manifest',
  tagline: 'The science of turning intention into reality.',
  image: '/images/hero-manifest.png',
  imageAlt: 'Abstract watercolor manifestation illustration with golden light',
  gradFrom: 'oklch(65% 0.12 75)',
  gradTo: 'oklch(82% 0.08 60)',
  overlayColor: 'rgba(154,114,48,0.6)',
  accentColor: '#F0D68A',  // GOLD_LIGHT hex value — const not available in page.tsx scope
},
```

Also add a practice entry:
```typescript
{
  key: 'practice',
  href: '/practice',
  eyebrow: 'The path of discipline',
  title: 'Practice',
  tagline: 'Guided timers for breath, body, and mind.',
  image: '/images/hero-meditation.png',
  imageAlt: 'Abstract watercolor practice timer illustration',
  gradFrom: 'oklch(60% 0.10 290)',
  gradTo: 'oklch(80% 0.06 280)',
  overlayColor: 'rgba(89,46,107,0.55)',
  accentColor: '#D7C2EE',
},
```

- [ ] **Step 3: Update hero layout from 3+2 to accommodate 7 paths**

Current layout: `topRow = paths.slice(0, 3)`, `bottomRow = paths.slice(3)`.

With 7 paths, update to a 4+3 split:
```typescript
const topRow = paths.slice(0, 4);
const bottomRow = paths.slice(3);
```

Wait — that would overlap. Use:
```typescript
const topRow = paths.slice(0, 4);
const bottomRow = paths.slice(4);
```

Also update the vertical divider logic. Currently checks `path.key !== 'fascia'` for the top row divider. With 4 items in the top row, the divider should skip the *last* item in each row instead:

```typescript
{/* Vertical divider line (right side, except last in row) */}
{idx < row.length - 1 && (
  <div style={{ position: 'absolute', right: 0, top: '10%', bottom: '10%', width: '1px', background: 'rgba(245,234,225,0.18)', zIndex: 3 }} />
)}
```

This requires changing the `topRow.map` and `bottomRow.map` to include an index parameter.

**IMPORTANT:** The bottom row also has a hardcoded divider check: `path.key === 'breathe'`. This must also be replaced with the same `idx < row.length - 1` pattern. With 3 items in the bottom row (indices 0, 1, 2), dividers should fire on indices 0 and 1. Both rows must be updated.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Compiles, landing page renders with 7 hero cards in 4+3 layout.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add Manifest and Practice to landing page hero grid (4+3 layout)"
```

---

### Task 5: Generate hero image and final deploy

**Files:**
- Create: `public/images/hero-manifest.png`

- [ ] **Step 1: Generate watercolor hero image**

Use the gemini-image-gen skill to create a watercolor-style abstract illustration for the manifest page hero. Prompt should match the existing hero image aesthetic — soft, abstract, luminous. Gold/amber tones. Spiritual but not religious. Save to `public/images/hero-manifest.png`.

If the generated image is too large (>500KB), compress it.

- [ ] **Step 2: Verify locally**

Run: `npm run dev`
Navigate to `/manifest` and `/` (landing page). Verify:
- Hero image renders on the manifest page
- Landing page shows 7 cards in 4+3 layout
- Nav bar includes Manifest link
- All 4 sections render with correct content
- Protocol step flow displays correctly
- Cross-links work
- Dark mode toggle works on all new content

- [ ] **Step 3: Final build check**

Run: `npm run build`
Expected: Zero errors, all routes generate including `/manifest`.

- [ ] **Step 4: Commit and push**

```bash
git add public/images/hero-manifest.png
git commit -m "feat: add manifest hero watercolor image"
git push
```

This triggers Vercel auto-deploy.

---

## YouTube Video IDs (to be sourced during implementation)

The implementing agent should search YouTube for high-quality videos matching these criteria and select appropriate IDs:

- **Section 1 (Science):** WOOP walkthrough or Gabriele Oettingen talk on mental contrasting
- **Section 2 (Practice Lineage):** Guided Yoga Nidra with sankalpa (20-30 min), possibly a HeartMath coherence introduction

Prefer videos that are:
- From verified/reputable channels
- Under 30 minutes
- Well-produced with clear audio
- Scientifically grounded (no "quantum manifestation" content)

---

## Verification Checklist

After all tasks complete:

- [ ] `npm run build` passes with zero errors
- [ ] `/manifest` route renders all 4 sections
- [ ] Protocol step flow shows 5 stages with colored pips and working links
- [ ] StatCards display in responsive grid
- [ ] Videos load via VideoFacade (lazy thumbnails)
- [ ] Cross-links section links to all pages
- [ ] Landing page shows 7 hero cards (4+3 layout)
- [ ] Nav bar shows Manifest link, scrolls on mobile
- [ ] Dark mode renders correctly on all new content
- [ ] Vercel deployment succeeds
