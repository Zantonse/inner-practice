---
date: 2026-03-11
tags:
  - design
  - ui-trends
  - css
  - typography
  - color
  - research
  - meditation
  - wellness
source: claude-code
project: inner-practice
---

# Inner Practice — UI Design Brief
Generated: 2026-03-11
Project: Meditation + Yoga beginner's practice website (Next.js)

## Executive Summary

- **"Modern Mystic" palette** — warm mauve-lavender + deep violet + warm amber accent on a cream canvas. No white backgrounds. No Tailwind default purple.
- **Cormorant Garamond + Raleway** — calligraphic serif headlines with clean sans body text. Oversized display headlines (52–96px) with generous leading.
- **Video facade pattern** — lazy-load YouTube thumbnails, swap to iframe on click. Critical for a page with 12+ embeddable videos.
- **Intentional calm** — breathing-rhythm animations (4–6s cycles), color-shift hovers only (no translateY), 1000ms ease-out entrance reveals. The site does not rush.
- **Anti-generic checklist** — no Inter/Geist, no gradient orbs, no centered-everything, no Feather/Heroicons, no uniform spacing. Asymmetric padding, left-aligned text, custom SVG illustration style.

## Visual Direction

### Color Strategy

```css
:root {
  /* Brand violet */
  --color-violet-deep:   #592E6B;
  --color-violet-mid:    #D7C2EE;
  --color-violet-pale:   #EDE9FE;

  /* Warm canvas neutrals */
  --color-cream:         #F5EAE1;
  --color-linen:         #EED3C2;
  --color-stone:         #D9D8DD;
  --color-taupe:         #C5B4A3;

  /* Amber accent */
  --color-amber-light:   #E4AD75;
  --color-amber-deep:    #C07A35;

  /* Text */
  --color-text:          #2A2A2A;
  --color-text-muted:    #6B6B6B;
}

/* Dark mode */
[data-theme="dark"] {
  --color-cream:         #1C1D37;
  --color-stone:         #2A2F5E;
  --color-text:          #D6E0EA;
  --color-text-muted:    #9BA3B5;
  --color-violet-pale:   #2A2F5E;
}
```

OKLCH gradients for watercolor washes:
```css
/* Lavender-to-cream hero wash */
background: linear-gradient(160deg, oklch(75% 0.12 295), oklch(97% 0.01 60));

/* Violet-to-amber section accent */
background: linear-gradient(135deg, oklch(45% 0.18 300), oklch(75% 0.12 60));
```

### Typography

**Primary: Cormorant Garamond + Raleway** (Google Fonts)

```css
:root {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Raleway', system-ui, sans-serif;
  --font-ui: 'DM Sans', system-ui, sans-serif;

  --text-hero:    clamp(52px, 8vw, 96px);   /* Cormorant 700, lh 1.1 */
  --text-h1:      clamp(40px, 6vw, 64px);   /* Cormorant 700, lh 1.15 */
  --text-h2:      clamp(30px, 4vw, 48px);   /* Cormorant 400, lh 1.2 */
  --text-h3:      clamp(22px, 2.5vw, 32px); /* Cormorant 400i, lh 1.3 */
  --text-body-lg: 18px;                     /* Raleway 400, lh 1.85 */
  --text-body:    17px;                     /* Raleway 400, lh 1.75 */
  --text-caption: 13px;                     /* Raleway 300, ls 0.06em */
  --text-label:   12px;                     /* DM Sans 500 caps, ls 0.1em */
}
```

### Motion & Animation

```css
/* Scroll reveal — IntersectionObserver controlled */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.reveal.is-visible { opacity: 1; transform: none; }
.reveal-group > * { transition-delay: calc(var(--index, 0) * 120ms); }

/* Breathing pulse — background decorative elements only */
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.75; }
  50% { transform: scale(1.04); opacity: 1; }
}
.breathe { animation: breathe 5s ease-in-out infinite; }

/* Card hover — color warmth shift, no movement */
.card {
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
              border-color 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.card:hover {
  background-color: #f4ede6;
  border-color: var(--color-violet-mid);
}

/* Respect motion preferences */
@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 200ms ease; transform: none; }
  .breathe { animation: none; }
}
```

## Component Strategy

### Landing Page — Dual-Path Split Hero
- Flexbox 50/50 split, `min-height: 100dvh`
- Hover: hovered panel grows to `flex: 1.8`, sibling shrinks to `flex: 0.6`
- Transition: `flex 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Centered brand element floating between panels
- Mobile: stack vertically, full-width panels

### Meditation Page — Educational Long-Scroll
- Sticky section label: `position: sticky; backdrop-filter: blur(12px)`
- Vertical dot navigator (desktop only, fixed right edge)
- Scroll progress bar: CSS `animation-timeline: scroll(root)`
- Progressive disclosure: `line-clamp: 4` with gradient mask expand
- Meditation type cards: `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`

### Meditation Page — Video Practice Section
- Duration pill tabs: `border-radius: 9999px`, horizontal scroll on mobile
- Video facade pattern: static thumbnail → click → iframe replacement
- YouTube params: `?modestbranding=1&rel=0&playsinline=1`
- Responsive embed: `aspect-ratio: 16 / 9`

### Yoga Page — Step-by-Step Practice
- Vertical timeline with `::before` line and numbered circle nodes
- Native `<details>`/`<summary>` for expandable step content
- Completed steps: `filter: grayscale(60%)`

### CSS Grain Texture
```css
.grain::after {
  content: '';
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,...feTurbulence...");
  opacity: 0.04;
  mix-blend-mode: multiply;
  pointer-events: none;
}
```

## Anti-Pattern Checklist

- [ ] No `#FFFFFF` backgrounds — use `#F5EAE1` cream canvas
- [ ] No Tailwind default purple/indigo — use semantic `--color-violet-*` tokens
- [ ] No Inter, Roboto, Geist, or system fonts for display
- [ ] No `translateY(-2px)` hover effects — color shifts only
- [ ] No three-column feature grid
- [ ] No centered body text — left-align by default
- [ ] No Feather, Heroicons, or Material outline icons
- [ ] No gradient orb backgrounds
- [ ] No `border-radius > 4px` on content containers
- [ ] No uniform vertical padding across all sections
- [ ] No hero → features → CTA predictable ordering
- [ ] Every animation gates behind `prefers-reduced-motion`

## CSS Techniques

| Feature | Replaces | Use Case |
|---------|----------|----------|
| `oklch()` | hex/rgb gradients | Perceptually smooth lavender washes |
| `text-wrap: balance` | Manual headline breaks | Elegant headline typography |
| `aspect-ratio: 16/9` | Padding-bottom hack | YouTube embed containers |
| `@starting-style` | JS entry animations | Page element entry transitions |
| `:has()` | JS parent selectors | Active tab state styling |
| Container queries | Media queries | Responsive meditation type cards |
| CSS nesting | Preprocessors | Cleaner component styles |
| `animation-timeline: scroll()` | GSAP ScrollTrigger | Scroll progress bar |
| `backdrop-filter: blur()` | Opaque headers | Sticky section labels |
| `clamp()` | Breakpoint-specific sizes | Fluid type and spacing |

## Asset Requirements (for Stage 2)

1. **Hero illustration** — Abstract watercolor meditation figure, warm lavender + amber tones
2. **Yoga illustration** — Seated yoga pose, matching watercolor style
3. **Section divider** — Horizontal watercolor wash, lavender to cream
4. **Meditation type icons** (6) — Minimal line art: breath, body scan, loving-kindness, visualization, yoga nidra, walking
5. **Logo mark** — "Inner Practice" in Cormorant Garamond with a subtle breath-curve accent

## Verified YouTube Video IDs

### 5 Minutes
- `inpok4MKVLM` — Goodful (30M views)
- `j734gLbQFbU` — Lavendaire (12M views)
- `c1Ndym-IsQg` — Headspace (131K views)

### 10 Minutes
- `ZToicYcHIOU` — Calm (31M views)
- `6p_yaNFSYao` — Honest Guys (15M views)
- `U9YKY7fdwyg` — Goodful (5.7M views)

### 15 Minutes
- `W19PdslW7iw` — Boho Beautiful (5.6M views)
- `IzV6J4WCwRM` — Jason Stephenson (2.8M views)
- `wVSkYKj26qg` — Yoga with Kassandra (1.17M views)

## Sources

- Big Human — Mindfulness App Design 2026
- SMPLY Studio — Wellness Design Trends 2026
- The Brand Alchemists — Spiritual Brand Color Palettes 2025
- Wix — Website Color Trends 2026
- prg.sh — "Why Your AI Keeps Building the Same Purple Gradient Website" (Oct 2025)
- Medium/Bootcamp — Google Font Pairings 2025
- ibrand.media — Wellness Website Design Trends
- FlowmazeUX — Next-Gen Website Design Guide 2026
- Mockplus — Split Screen Design
- dev.to — Breaking the AI-Generated UI Curse
