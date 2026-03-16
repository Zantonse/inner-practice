# Sleep & Circadian Rhythm Page — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/sleep` content page and add 5 sleep exercises to the practice page.

**Architecture:** Follow the established content page pattern (server `page.tsx` + client `SleepClient.tsx`). The client component contains all page JSX with inline styles, using shared components (ScrollReveal, SectionDivider, VideoFacade). Practice page integration requires adding a `sleep` modality to `types.ts` and 5 exercises to `exercises.ts`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, inline styles

**Spec:** `docs/superpowers/specs/2026-03-16-sleep-page-design.md`
**Research:** `~/Documents/ObsidianNotes/Claude-Research/wellness/sleep-circadian-rhythm-research-2026-03.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/app/practice/types.ts` | Modify | Add `'sleep'` to `Modality` union and `MODALITY_META` |
| `src/app/practice/exercises.ts` | Modify | Add 5 sleep exercises at end of array |
| `src/app/layout.tsx` | Modify | Add Sleep nav link between Reiki and Practice |
| `src/app/sleep/page.tsx` | Create | Server component with metadata |
| `src/app/sleep/SleepClient.tsx` | Create | Full page client component (~1400 lines) |

---

## Chunk 1: Data Layer & Navigation

### Task 1: Add sleep modality to types.ts

**Files:**
- Modify: `src/app/practice/types.ts:3-5` (Modality union)
- Modify: `src/app/practice/types.ts:45-54` (MODALITY_META)

- [ ] **Step 1: Add `'sleep'` to the `Modality` type union**

In `src/app/practice/types.ts`, add `| 'sleep'` to the union on line 5:

```ts
export type Modality =
  | 'meditation' | 'breathwork' | 'yoga' | 'fascia'
  | 'nervous-system' | 'reiki' | 'sound-healing' | 'somatics'
  | 'sleep';
```

- [ ] **Step 2: Add sleep entry to `MODALITY_META`**

After the `somatics` entry (line 53), add:

```ts
  sleep:            { label: 'Sleep',           deep: '#1B4D5C', pale: '#E8F2F4' },
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors (the new modality is valid but no exercises reference it yet)

- [ ] **Step 4: Commit**

```bash
git add src/app/practice/types.ts
git commit -m "feat(practice): add sleep modality to types"
```

---

### Task 2: Add 5 sleep exercises to exercises.ts

**Files:**
- Modify: `src/app/practice/exercises.ts` (append to end of exercises array)

- [ ] **Step 1: Find the end of the exercises array**

The exercises array ends with a `];` line. Add the 5 new exercises before that closing bracket.

- [ ] **Step 2: Add all 5 sleep exercises**

Append these entries to the exercises array:

```ts
  // ── Sleep ─────────────────────────────────────────────────────
  {
    id: 'evening-4-7-8',
    name: 'Evening 4-7-8 Breathing',
    modality: 'sleep',
    type: 'structured',
    level: 'beginner',
    duration: '2–5 min',
    description: 'Extended exhale pattern that maximally engages the vagal brake. The 2:1 exhale-to-inhale ratio shifts the autonomic nervous system toward parasympathetic dominance.',
    learnMorePath: '/sleep#breathwork',
    phases: [
      { label: 'Inhale', duration: 4 },
      { label: 'Hold', duration: 7 },
      { label: 'Exhale', duration: 8 },
    ],
    defaultCycles: 4,
    defaultRounds: 1,
    defaultMinutes: 5,
  },
  {
    id: 'pre-sleep-yoga-nidra',
    name: 'Pre-Sleep Yoga Nidra',
    modality: 'sleep',
    type: 'reference',
    level: 'beginner',
    duration: '20 min',
    description: 'Systematic rotation of consciousness that induces theta and delta brain waves while maintaining awareness. The bridge between waking practice and sleep.',
    learnMorePath: '/sleep#yoga-nidra',
    defaultMinutes: 20,
    instructions: [
      'Lie down in savasana (corpse pose). Close your eyes.',
      'Set your sankalpa — a short, positive intention stated mentally three times.',
      'Rotate awareness through each body part: right hand thumb, index finger, middle finger... following the guided sequence.',
      'Count breaths backward from 27 to 1. If you lose count, start again from 27.',
      'Experience opposite sensations: heavy/light, warm/cool.',
      'If sleep comes during the practice, welcome it — this is the ideal outcome.',
    ],
  },
  {
    id: 'wind-down-body-scan',
    name: 'Wind-Down Body Scan',
    modality: 'sleep',
    type: 'reference',
    level: 'beginner',
    duration: '15 min',
    description: 'Interoceptive awareness practice that activates the insular cortex — the same circuit the brain uses to assess internal safety. Supports the neuroception of safety required for sleep.',
    learnMorePath: '/sleep#wind-down',
    defaultMinutes: 15,
    instructions: [
      'Lie in bed in a comfortable position. Close your eyes.',
      'Begin at the crown of your head. Notice any sensation without trying to change it.',
      'Slowly move awareness down: forehead, eyes, jaw (release tension here), throat, shoulders.',
      'Continue through arms, hands, chest, belly (let the breath move here naturally).',
      'Move through hips, legs, feet. Spend extra time on areas holding tension.',
      'Expand awareness to the whole body as a single field of sensation.',
      'Rest in this whole-body awareness. Let sleep come when it comes.',
    ],
  },
  {
    id: 'cyclic-sighing',
    name: 'Cyclic Sighing',
    modality: 'sleep',
    type: 'structured',
    level: 'beginner',
    duration: '5 min',
    description: 'Double nasal inhale followed by extended mouth exhale. The 2023 Stanford RCT found 5 minutes more effective than mindfulness meditation for reducing anxiety.',
    learnMorePath: '/sleep#breathwork',
    phases: [
      { label: 'Double inhale', duration: 3 },
      { label: 'Long exhale', duration: 7 },
    ],
    defaultCycles: 30,
    defaultRounds: 1,
    defaultMinutes: 5,
  },
  {
    id: 'sleep-coherence',
    name: 'Sleep Coherence Breathing',
    modality: 'sleep',
    type: 'structured',
    level: 'beginner',
    duration: '10 min',
    description: 'Breathing at the resonance frequency of the cardiovascular system (~5.5 bpm). Maximizes HRV and primes the autonomic nervous system for the parasympathetic dominance of deep sleep.',
    learnMorePath: '/sleep#breathwork',
    phases: [
      { label: 'Inhale', duration: 5.5 },
      { label: 'Exhale', duration: 5.5 },
    ],
    defaultCycles: 55,
    defaultRounds: 1,
    defaultMinutes: 10,
  },
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/app/practice/exercises.ts
git commit -m "feat(practice): add 5 sleep exercises"
```

---

### Task 3: Add Sleep to navigation

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add Sleep nav link**

Locate the closing `</Link>` for the Reiki nav link (the one containing `href="/reiki"`) and insert the Sleep link block immediately after it, before the `<Link href="/practice">` block:

```tsx
              <Link
                href="/sleep"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                Sleep
              </Link>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(nav): add Sleep link to main navigation"
```

---

### Task 4: Create server component page.tsx

**Files:**
- Create: `src/app/sleep/page.tsx`

- [ ] **Step 1: Create the sleep directory and page.tsx**

```tsx
import type { Metadata } from 'next';
import SleepClient from './SleepClient';

export const metadata: Metadata = {
  title: 'Sleep & Circadian Rhythm — Where Every Practice Comes to Rest | Inner Practice',
  description:
    'The science of sleep architecture, circadian timing for breathwork and meditation, overnight HRV patterns, Yoga Nidra as a sleep tool, and evidence-based sleep hygiene through a nervous system lens. Includes a 24-hour practice timing map and wind-down protocol.',
  keywords: [
    'sleep', 'circadian rhythm', 'sleep stages', 'NREM', 'REM', 'slow wave sleep',
    'glymphatic system', 'HRV sleep', 'overnight HRV', 'yoga nidra sleep',
    'NSDR', 'non-sleep deep rest', 'breathwork sleep', '4-7-8 breathing',
    'coherence breathing', 'sleep hygiene', 'polyvagal theory sleep',
    'melatonin', 'cortisol awakening response', 'circadian timing',
    'wind-down protocol', 'CBT-I', 'sleep architecture',
  ],
};

export default function SleepPage() {
  return <SleepClient />;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/sleep/page.tsx
git commit -m "feat(sleep): add server component with metadata"
```

---

## Chunk 2: SleepClient.tsx — Sections 1-7 (Hero through HRV)

### Task 5: Build SleepClient.tsx — Hero, Architecture, Circadian Code, HRV

**Files:**
- Create: `src/app/sleep/SleepClient.tsx`

This is the bulk of the work. Build the first 7 sections of the page. Follow the exact patterns from `ReikiClient.tsx` for hero, StatCard, and layout structure.

- [ ] **Step 1: Create SleepClient.tsx with imports, accent tokens, and StatCard**

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';

// ── Accent tokens (midnight teal) ────────────────────────────
const TEAL_DEEP = '#1B4D5C';
const TEAL_MID = '#A3C4CC';
const TEAL_PALE = '#E8F2F4';

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ source, stat, detail, url }: { source: string; stat: string; detail: string; url?: string }) {
  return (
    <div style={{ borderLeft: `3px solid ${TEAL_MID}`, padding: '1.5rem 1.75rem', background: 'var(--color-surface-raised)', borderRadius: '2px' }}>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEAL_DEEP, margin: '0 0 0.75rem' }}>
        {url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}>{source}</a> : source}
      </p>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>{stat}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>{detail}</p>
    </div>
  );
}
```

Follow the ReikiClient pattern exactly for StatCard. Use `TEAL_MID` for the border color and `TEAL_DEEP` for the source label color.

- [ ] **Step 2: Build the Hero section**

Follow the ReikiClient hero pattern (lines 83-150). Use:
- Gradient: `linear-gradient(160deg, oklch(35% 0.08 210), oklch(52% 0.10 195))` (dark midnight teal to medium teal). Note: uses `oklch()` color space and 160deg angle to match the ReikiClient hero pattern rather than the spec's `linear-gradient(135deg, #1B4D5C, #2E7070, #1B4D5C)`. This is a deliberate consistency choice — all existing heroes use oklch gradients.
- Orb: `radial-gradient(circle, ${TEAL_PALE}30 0%, transparent 70%)`
- Eyebrow: `SLEEP & CIRCADIAN RHYTHM`
- h1: `Where Every Practice Comes to Rest`
- Lead paragraph about sleep as the nervous system's deepest regulation
- In-page anchor nav row with links to: `#science`, `#circadian`, `#hrv`, `#yoga-nidra`, `#breathwork`, `#hygiene`, `#wind-down`, `#practice`

The anchor nav is a flex row of `<a>` elements styled as underlined inline links (matching the BreatheClient hero anchor nav pattern — `fontFamily: 'var(--font-ui)'`, `fontSize: '0.75rem'`, `textTransform: 'uppercase'`, `letterSpacing: '0.08em'`, with underline offset). Each anchor scrolls to the corresponding `id` on the page. Wrap in a `div` with `display: 'flex'`, `flexWrap: 'wrap'`, `gap: '1rem 1.5rem'`.

- [ ] **Step 3: Build Section 2 — What Sleep Actually Is (`id="science"`)**

Two-column auto-fit grid. Content from the research brief:

Left column (ScrollReveal):
- Eyebrow: `THE ARCHITECTURE OF REST`
- h2: `What Happens When You Sleep`
- Two-process model (Process S: adenosine/sleep pressure, Process C: circadian drive)
- Why consistent wake time matters

Right column (ScrollReveal):
- Ultradian cycles (90-110 min, 4-6 per night)
- Stage percentages: N1 2-5%, N2 45-55%, N3 13-23%, REM 20-25%
- Callout about cycles 1-2 being SWS-dominant vs 4-6 being REM-dominant
- Highlight: truncating to 6 hours disproportionately eliminates REM

Then 3 StatCards:
- "60%" / Xie et al., Science, 2013 / brain cell shrinkage for glymphatic clearance
- "2x" / Nedergaard lab, 2013 / waste clearance rate during sleep vs waking
- "70%" / Takahashi et al., 1968 / growth hormone secreted during SWS

Add a glymphatic subsection: Nedergaard discovery, AQP4 channels, beta-amyloid/tau/alpha-synuclein clearance, single night deprivation +5% beta-amyloid, requires actual sleep not rest.

- [ ] **Step 4: Build SectionDivider + Section 4 — The Circadian Code (`id="circadian"`)**

This is the centerpiece section.

- `<SectionDivider />`
- Eyebrow: `WHEN YOU PRACTICE MATTERS`
- h2: `The Circadian Code`
- Intro prose: SCN, cortisol awakening response, melatonin/DLMO, core body temperature rhythm, Forbidden Zone
- **24-Hour Practice Timing Table**: Styled as 7 cards in a vertical stack, each with midnight-teal left border. Each card shows: time window (bold), biological state (italic), recommended practices. Use the same `borderLeft: 3px solid ${TEAL_MID}` pattern as StatCard but in a full-width list format.
- Three window detail cards (ScrollReveal group, auto-fit grid): Morning Window, Midday Window, Evening Window — each with specific techniques and the circadian "why"
- Chronotype callout note

- [ ] **Step 5: Build SectionDivider flip + Section 6 — HRV Overnight (`id="hrv"`)**

- `<SectionDivider flip />`
- Eyebrow: `YOUR AUTONOMIC REPORT CARD`
- h2: `HRV During Sleep`
- Two-column layout:
  - Left: stage-by-stage narrative (N2 build → N3 peak → REM dip → overnight oscillation pattern)
  - Right: "Good vs Concerning Patterns" callout card + wearable interpretation note (Oura/Whoop/Apple Watch)
- Below: meditation/breathwork effects on overnight HRV (Krygier 2013, Lehrer 2003, Koenig 2016)

- [ ] **Step 6: Verify the page renders**

Run: `npm run dev`
Navigate to: `http://localhost:3000/sleep`
Expected: Hero + Science + Circadian Code + HRV sections render correctly, anchor nav scrolls to sections, dark mode works

- [ ] **Step 7: Commit**

```bash
git add src/app/sleep/SleepClient.tsx
git commit -m "feat(sleep): add SleepClient with hero, architecture, circadian, HRV sections"
```

---

## Chunk 3: SleepClient.tsx — Sections 8-14 (Yoga Nidra through Cross-links)

### Task 6: Build remaining sections — Yoga Nidra, Breathwork, Hygiene, Wind-Down, Practice, Cross-links

**Files:**
- Modify: `src/app/sleep/SleepClient.tsx`

- [ ] **Step 1: Build Section 7 — Yoga Nidra & NSDR (`id="yoga-nidra"`)**

- `<SectionDivider />`  (if not already placed after HRV)
- Eyebrow: `THE BRIDGE BETWEEN PRACTICE AND SLEEP`
- h2: `Yoga Nidra & Non-Sleep Deep Rest`
- Two-column: Left: what it is (8 stages), hypnagogic state. Right: "conscious delta" (Datta 2021)
- 3 evidence cards (ScrollReveal group): Lou 1999 dopamine, Kumar 2008 SOL, iRest/Miller DoD
- Honest assessment callout (amber border `#E4AD75`): the "1 hour = 4 hours" claim + 65% dopamine context
- Protocol table: 3-row grid (Quick NSDR 10min / Pre-sleep 20-30min / Full 30-45min)

- [ ] **Step 2: Build SectionDivider + Section 9 — Breathwork for Sleep (`id="breathwork"`)**

Place an unconditional `<SectionDivider />` after the Yoga Nidra section, then:
- Eyebrow: `BREATHING YOUR WAY TO SLEEP`
- h2: `Breathwork Techniques for Sleep`
- 6 technique cards in auto-fit grid. Each card:
  - Technique name (h3, font-display)
  - Ratio badge pill (e.g., "2:1 exhale:inhale") in midnight teal
  - Timing pill: "Evening" (teal bg) / "Morning Only" (amber bg) / "Anytime" (neutral bg)
  - Evidence pill: "Strong" / "Moderate" / "Low"
  - 2-3 sentence mechanism
- Techniques: 4-7-8, Coherence (5.5 bpm), Cyclic Sighing, Left Nostril, Box Breathing (modified), Wim Hof (morning only)
- Contraindications callout (rose border `var(--color-rose-deep)` or `#8B3A62`): Wim Hof/Tummo 3+ hrs, Kapalabhati 2-3 hrs, Breath of Fire 2-3 hrs, cold exposure 2-3 hrs

- [ ] **Step 3: Build Section 10 — Sleep Hygiene (`id="hygiene"`)**

- Eyebrow: `THE ENVIRONMENT OF SAFETY`
- h2: `Sleep Hygiene Through the Nervous System`
- Polyvagal intro prose: neuroception of safety → dorsal vagal transition = falling asleep
- 6 factor cards (auto-fit grid, ScrollReveal group): Temperature, Light, Caffeine, Alcohol, Exercise, Meals — each with key number, mechanism, recommendation
- CBT-I callout (gold border): ACP 2016 first-line, Mitchell 2012 persistence

- [ ] **Step 4: Build SectionDivider flip + Section 12 — Wind-Down Protocol (`id="wind-down"`)**

- `<SectionDivider flip />`
- Eyebrow: `YOUR EVENING SEQUENCE`
- h2: `The Wind-Down Protocol`
- Intro line
- `.timeline` with 6 `.timeline-node` steps (use existing CSS classes):
  1. Dim the lights (90 min before bed)
  2. The 3-2-1 check
  3. Warm shower (60-45 min before bed)
  4. Gentle yoga (10-15 min)
  5. Breathwork transition (5-10 min)
  6. Body scan / Yoga Nidra in bed (10-20 min)
- Each node: number, title (bold), instruction, autonomic mechanism (italic)

- [ ] **Step 5: Build Section 13 — "Now, practice." + Videos**

Replicate the separator pattern from `MeditateClient.tsx` lines 873-897, but remap to teal tokens:
- Container div with `background: TEAL_DEEP` (`#1B4D5C`) instead of violet
- Two decorative line divs using `rgba(163,196,204,0.3)` (TEAL_MID at 30% opacity) for the hr-style lines
- Italic "Now, practice." text in `TEAL_MID` (`#A3C4CC`) instead of violet-mid
- Keep the same padding, flex layout, and font styling from MeditateClient

Then:
- Pill tab state: `const [videoCategory, setVideoCategory] = useState<string>('nidra')`
- 3 pill tabs: "Yoga Nidra / NSDR" | "Evening Breathwork" | "Sleep Meditations"
- `<VideoFacade>` embeds (pick appropriate YouTube IDs for sleep-focused Yoga Nidra, NSDR, and breathwork sessions)

Note: Use placeholder YouTube IDs that can be swapped later. The structure matters more than the specific videos.

- [ ] **Step 6: Build Section 14 — Cross-links footer**

- "Sleep connects to everything" heading
- 5 inline link cards to: `/breathe`, `/nervous-system`, `/yoga`, `/meditate`, `/somatics`
- Each with a one-line description connecting that practice to sleep
- Closing blockquote

- [ ] **Step 7: Verify full page renders correctly**

Run: `npm run dev`
Check:
1. All 14 sections render at `http://localhost:3000/sleep`
2. Anchor nav scrolls to correct sections
3. Dark mode toggle works throughout
4. Mobile responsive (check at 375px width)
5. Nav link appears and works
6. Practice page shows 5 new sleep exercises under "Sleep" modality badge
7. "Learn more" links on exercise cards navigate to `/sleep#breathwork`, `/sleep#yoga-nidra`, `/sleep#wind-down`

- [ ] **Step 8: Commit**

```bash
git add src/app/sleep/SleepClient.tsx
git commit -m "feat(sleep): complete all page sections — yoga nidra, breathwork, hygiene, wind-down, practice, cross-links"
```

---

## Chunk 4: Polish & Final Verification

### Task 7: Final build verification and cleanup

**Files:**
- All modified files

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors. Check for any TypeScript errors or missing imports.

- [ ] **Step 2: Visual QA pass**

Run: `npm run dev`
Walk through the full page in both light and dark mode. Check:
- Accent colors consistent (midnight teal `#1B4D5C` throughout)
- StatCard borders, eyebrow labels, pill tabs all use teal tokens
- ScrollReveal animations fire on scroll
- SectionDividers render correctly (standard + flip variants)
- Timeline nodes are numbered and spaced correctly
- Technique cards are responsive (stack on mobile, grid on desktop)
- VideoFacade thumbnails load
- No horizontal scroll on mobile
- Cross-links navigate to correct pages

- [ ] **Step 3: Commit any polish fixes**

```bash
git add -A
git commit -m "fix(sleep): visual polish and responsive adjustments"
```

(Skip this commit if no fixes were needed.)

- [ ] **Step 4: Final commit summary**

Expected commits in order:
1. `feat(practice): add sleep modality to types`
2. `feat(practice): add 5 sleep exercises`
3. `feat(nav): add Sleep link to main navigation`
4. `feat(sleep): add server component with metadata`
5. `feat(sleep): add SleepClient with hero, architecture, circadian, HRV sections`
6. `feat(sleep): complete all page sections`
7. `fix(sleep): visual polish` (if needed)
