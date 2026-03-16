# Practice Page Redesign — Design Spec

**Date:** 2026-03-15
**Route:** `/practice`
**Status:** Reviewed — issues resolved

## Overview

Redesign the `/practice` page from a standalone timer into a comprehensive exercise hub with teacher training curriculum. The page becomes three tabs: a guided exercise library (~45 practices across 8 modalities), the existing daily routine builder, and a teacher training roadmap.

The existing timer state machine (useReducer, wake lock, bowl chime, SVG ring) is preserved as the engine. The 13 existing presets are absorbed into the exercise library. Exercise type determines UI: structured practices get auto-advancing phases, freeform practices get reference cards with open timers.

## Requirements

- **Three tabs:** "Do It" (exercises), "Daily Routines" (existing), "Teacher Path" (curriculum)
- **~45 exercises** across 8 modalities, each with timer integration
- **Two exercise UI variants:** structured (auto-advancing) and reference (open timer)
- **Modality filter pills** with per-modality accent colors
- **Timer engine extraction** to reusable `useTimer` hook
- **Teacher training roadmap:** framework thesis, learning order timeline, certification directory
- **No persistent state** — no login, no progress tracking, no localStorage
- **Responsive** — works on mobile (single column) through desktop

## Page Structure

### Hero

Compact violet gradient hero (existing pattern). Heading: "Practice". Subtitle: "Set your intention. Begin your practice." No hero image. (The subtitle stays action-oriented for returning users who use this page as a quick-launch timer, while accommodating the expanded scope.)

### Tab Bar

Three pill tabs below the hero, using existing `.pill-tab` / `.pill-tab.active` CSS:

1. **Do It** (default active)
2. **Daily Routines**
3. **Teacher Path**

All tabs use violet regardless of active modality filter.

---

## Tab 1: "Do It" — Exercise Library

### Freeform Timer Card

Always visible at the top, not affected by modality filters. A single card labeled "Freeform Timer" with description "Set your own duration, no guidance." Expanding it reveals duration pills (5/10/15/20/30/45/60 min + custom input) and the timer ring. This replaces the old "Open Timer" tab.

**The Freeform Timer is outside the exercise accordion group.** It can be expanded simultaneously with any exercise card. This means a user can have both the Freeform Timer and one exercise card expanded at the same time. This is intentional — the Freeform Timer is a utility, not an exercise.

### Modality Filter Pills

Horizontal scrollable row of 8 pills + "All" default:

| Pill | Accent Color (active state) |
|------|----------------------------|
| All | Violet (`#592E6B`) |
| Meditation | Violet (`#592E6B`) |
| Breathwork | Teal (`#2E7070`) |
| Yoga | Violet (`#592E6B`) |
| Fascia | Amber (`#8A5A1C`) |
| Nervous System | Rose (`#8B3A62`) |
| Reiki | Gold (`#7A5A1E`) |
| Sound Healing | Soft Purple (`#6B4E8B`) |
| Somatics | Indigo (`#2D3A6A`) |

When "All" is selected, exercises are grouped by modality with section headers (using existing `.section-label` sticky pattern). When a specific modality is selected, only those exercises show with no section header.

**Sticky offset stacking:** The site nav is 60px. The tab bar is ~48px. The modality pill row is ~44px. Section labels in "All" mode need `top: 152px` (60 + 48 + 44) to stack below all sticky headers. The pill row itself uses `top: 108px` (60 + 48).

### Exercise Cards — Collapsed State

Each card displays:
- **Name** (e.g., "Box Breathing") — h3, serif
- **Badges:** modality pill (accent color) + difficulty pill (teal=Beginner, amber=Intermediate, violet=Advanced)
- **Duration range** (e.g., "4–10 min") — muted text
- **One-line description** — body text
- **"Learn more →"** link to the relevant content page anchor (e.g., `/breathe#box-breathing`)
- **Expand chevron** on the right

Cards use the existing `.card` CSS pattern (2px border-radius, hover lift, violet-mid border on hover). **Expanded cards suppress the hover transform** — apply `transform: none` and `box-shadow: none` override when `aria-expanded="true"` to prevent a running timer from lifting on hover.

### Exercise Cards — Expanded State (Structured)

For exercises with `type: 'structured'` — breathwork ratios, TRE sequences, hip opening sequences, or any practice with discrete timed phases.

Expanded area contains:
1. **Step list** — numbered steps, current step highlighted with accent color background
2. **Timer ring** — SVG progress ring (existing component), sized to fit within the card
3. **Phase label** — current phase name and countdown (e.g., "Inhale — 4s")
4. **Cycle/round counter** — if applicable (e.g., "Cycle 3 of 19 · Round 1 of 3")
5. **Duration selector** — before starting, choose cycle count or preset duration
6. **Control bar** — Start / Pause / Resume / Reset buttons (existing pattern)

The timer auto-advances through phases. Bowl chime plays on phase transitions (existing `shouldChime` behavior). Wake lock activates on start.

### Exercise Cards — Expanded State (Reference)

For exercises with `type: 'reference'` — meditation sits, self-Reiki, constructive rest, or any practice where timing is intuitive.

Expanded area contains:
1. **Instruction list** — numbered steps or key cues, presented as a reference card (no highlighting/advancing)
2. **Duration pills** — 5/10/15/20/30 min + custom
3. **Timer ring** — simple countdown, no phases
4. **Control bar** — Start / Pause / Resume / Reset

Bowl chime at start and end only.

### Exercise Inventory

**Breathwork (14):**

| id | Name | Type | Level | Duration | Phases |
|----|------|------|-------|----------|--------|
| breath-sigh | Physiological Sigh | structured | beginner | 1–3 breaths | Double inhale + long exhale, 20 cycles |
| breath-box | Box Breathing | structured | beginner | 4–10 min | 4 phases (4:4:4:4), 19 cycles |
| breath-478 | 4-7-8 Breathing | structured | beginner | 2–5 min | 3 phases (4:7:8), 16 cycles |
| breath-diaphragm | Diaphragmatic Breathing | reference | beginner | 5–15 min | — |
| breath-nadi | Nadi Shodhana | structured | beginner | 5–15 min | Alternate nostril ratio |
| breath-ujjayi | Ujjayi Breath | reference | beginner | 5–20 min | — |
| breath-coherent | Coherent Breathing | structured | beginner | 10–20 min | 2 phases (5.5:5.5), 60 cycles |
| breath-kapalabhati | Kapalabhati | structured | intermediate | 3–10 min | Rapid exhale bursts + rest |
| breath-fire | Breath of Fire | structured | intermediate | 3–11 min | Rapid equal breaths + rest |
| breath-wimhof | Wim Hof Method | structured | intermediate | ~15 min | 3 phases, 1 cycle, 3 rounds (configurable rounds via stepper) |
| breath-buteyko | Buteyko Method | reference | intermediate | 10–30 min | — |
| breath-tummo | Tummo | reference | advanced | 20–60 min | — |
| breath-holotropic | Holotropic Breathwork | reference | advanced | 2–3 hours | — |
| breath-cyclic | Cyclic Hyperventilation | structured | intermediate | 5–15 min | 25 breaths + hold, cycles |

**Meditation (5):**

| id | Name | Type | Level | Duration |
|----|------|------|-------|----------|
| med-breath | Breath Awareness | reference | beginner | 2–20 min |
| med-bodyscan | Body Scan | reference | beginner | 10–30 min |
| med-lovingkindness | Loving-Kindness | reference | beginner | 10–20 min |
| med-visualization | Guided Visualization | reference | beginner | 10–20 min |
| med-walking | Walking Meditation | reference | beginner | 10–30 min |

Yoga Nidra appears under Yoga only (`yoga-nidra`), since it is a yogic practice. The Meditation content page can cross-reference it via "Learn more" links.

**Yoga (3):**

| id | Name | Type | Level | Duration |
|----|------|------|-------|----------|
| yoga-hipopening | Hip Opening Sequence | structured | beginner | 20 min |
| yoga-nidra | Yoga Nidra Protocol | reference | beginner | 20–45 min |
| yoga-posehold | Pose Hold Series | structured | beginner | 6–18 min |

**Fascia (4):**

| id | Name | Type | Level | Duration |
|----|------|------|-------|----------|
| fascia-foamroll | Foam Rolling Protocol | structured | beginner | 10–20 min |
| fascia-fitness | Fascial Fitness Morning | structured | beginner | 10 min |
| fascia-guasha | Self-Gua Sha | reference | beginner | 5–10 min |
| fascia-cupping | Self-Cupping | reference | intermediate | 10–15 min |

**Nervous System (6):**

| id | Name | Type | Level | Duration |
|----|------|------|-------|----------|
| ns-diaphragm | Slow Diaphragmatic | reference | beginner | 5–10 min |
| ns-gargling | Vagal Gargling | reference | beginner | 1–2 min |
| ns-coldface | Cold Face Immersion | structured | intermediate | 30–60 sec |
| ns-coldshower | Cold Shower/Plunge | structured | intermediate | 1–3 min |
| ns-auricular | Auricular Massage | reference | beginner | 2–5 min |
| ns-laughter | Laughter Practice | reference | beginner | 5 min |

**Cross-modality duplicates resolved:** Bhramari Pranayama appears under Sound Healing only (`sound-bhramari`). OM Chanting appears under Sound Healing only (`sound-om`). These are fundamentally sound/vibration practices even though they have nervous system effects. Each exercise has a single canonical entry; the Nervous System content page can reference them via "Learn more" links.

**Reiki (3):**

| id | Name | Type | Level | Duration |
|----|------|------|-------|----------|
| reiki-self | Self-Reiki Protocol | reference | beginner | 20–40 min |
| reiki-hatsurei | Hatsurei Ho | reference | intermediate | 15–20 min |
| reiki-gassho | Gassho Meditation | reference | beginner | 10–20 min |

**Sound Healing (3):**

| id | Name | Type | Level | Duration |
|----|------|------|-------|----------|
| sound-bhramari | Bhramari (Bee Breath) | structured | beginner | 5 min |
| sound-om | Om/So Hum Chanting | reference | beginner | 5–15 min |
| sound-bath | Sound Bath Listening | reference | beginner | 15–30 min |

**Somatics (5):**

| id | Name | Type | Level | Duration |
|----|------|------|-------|----------|
| soma-tre | TRE Wall Sit Protocol | structured | beginner | 20–30 min |
| soma-constructive | Constructive Rest | reference | beginner | 15 min |
| soma-voo | The Voo Sound | reference | beginner | 3–5 min |
| soma-orienting | Orienting Exercise | reference | beginner | 2–3 min |
| soma-containment | Containment | reference | beginner | 5 min |

**Total: 43 exercises** (Breathwork 14 + Meditation 5 + Yoga 3 + Fascia 4 + Nervous System 6 + Reiki 3 + Sound Healing 3 + Somatics 5) plus Freeform Timer = **44 cards**

---

## Tab 2: "Daily Routines" — Existing

The existing `PracticeBuilderTab.tsx` renders with one update: the `timerPreset` strings are remapped to new exercise IDs.

### timerPreset ID Migration

The existing `timerPreset` strings in `PracticeBuilderTab.tsx` must be updated to match the new exercise IDs in `exercises.ts`:

| Old `timerPreset` | New exercise ID |
|-------------------|----------------|
| `'coherent'` | `'breath-coherent'` |
| `'box'` | `'breath-box'` |
| `'478'` | `'breath-478'` |
| `'wimhof'` | `'breath-wimhof'` |
| `'sigh'` | `'breath-sigh'` |
| `'med-10'` | `'med-breath'` |
| `'med-20'` | `'med-breath'` |
| `'med-45'` | `'med-breath'` |
| `'pose-hold'` | `'yoga-posehold'` |
| `'yin-hold'` | `'yoga-posehold'` |
| `'cold-1'` | `'ns-coldshower'` |
| `'cold-3'` | `'ns-coldshower'` |

Where old presets had duration variants (e.g., `med-10` vs `med-45`), the new exercise card's duration selector handles the choice. The "Start Timer →" button in Daily Routines calls a callback that: (1) switches to the "Do It" tab, (2) expands the matching exercise card, (3) pre-selects the duration if the routine specified one.

---

## Tab 3: "Teacher Path" — Curriculum Roadmap

### Section A: The Framework

2-3 paragraphs explaining the unified model:
- The **nervous system** is the control layer — polyvagal states determine what the body can receive
- **Fascia** is the structural layer — the connective tissue web that transmits force, stores trauma, and responds to every modality
- Every practice on the site works through one or both: breathwork regulates the NS directly, yoga reshapes fascia while co-regulating the NS, somatics releases stored trauma from both, Reiki and sound healing work at the energetic/vibrational level of the NS
- Craig's teaching framework: **regulate first, then mobilize, then integrate**

Below the text, a simple HTML/CSS diagram showing the two foundations at the base with modalities branching upward. Built with flexbox and border lines — no SVG or image dependency.

### Section B: Learning Order

A vertical timeline using the existing `.timeline` / `.timeline-node` CSS pattern. 8 nodes in recommended sequence:

| # | Modality | Rationale | Study Duration | Page Link |
|---|----------|-----------|---------------|-----------|
| 1 | Nervous System | Foundation — understand why everything works | 2–4 weeks | /nervous-system |
| 2 | Breathwork | Fastest lever for NS regulation; daily practice starts here | 4–8 weeks | /breathe |
| 3 | Meditation | Builds interoceptive awareness needed for all modalities | Ongoing | /meditate |
| 4 | Fascia | Understand the structural layer; foam rolling + fascial fitness daily | 4–6 weeks | /fascia |
| 5 | Yoga | Combines breath, movement, fascial work; bridge to teaching | 6–12 months (RYT-200) | /yoga |
| 6 | Somatics | Trauma-informed bodywork; essential for working with others safely | 3–6 months | /somatics |
| 7 | Reiki | Energy work adds subtle layer; requires external attunement | Levels span months–years | /reiki |
| 8 | Sound Healing | Vibrational tools complement all of the above | 2–4 months | /sound-healing |

Each node: numbered circle with modality accent color, modality name, 1-2 sentence rationale, estimated study period, "Explore →" link.

### Section C: Certification Directory

Cards grouped by modality. Each card:
- Program name / school
- Format badge (In-person / Online / Hybrid)
- Duration and approximate cost
- Prerequisites
- External "Learn more →" link

**Certifications to research and populate during implementation:**

| Modality | Key Programs |
|----------|-------------|
| Yoga | RYT-200, RYT-500 (Yoga Alliance) |
| Breathwork | Wim Hof Instructor, SOMA Breathwork, Oxygen Advantage |
| Somatics | TRE Provider (TRE for All), SE Practitioner (SEI) |
| Reiki | Usui Shiki Ryoho Levels 1-3, Holy Fire Reiki |
| Sound Healing | SSI (Sound Healing Academy), BAST |
| Fascia | John Barnes MFR seminars, FRC (Functional Range Conditioning) |
| Meditation | MBSR Teacher Training (UMass), Spirit Rock/IMS teacher path |
| Nervous System | Polyvagal Institute trainings, Safe & Sound Protocol |

This data will be populated via web research during implementation. **Empty state:** If any modality has zero certifications populated at build time, show a single card: "Certification programs for [Modality] are being researched. Check back soon." This prevents a blank section.

---

## Data Architecture

### Types (`src/app/practice/types.ts`)

```ts
export type Modality =
  | 'meditation' | 'breathwork' | 'yoga' | 'fascia'
  | 'nervous-system' | 'reiki' | 'sound-healing' | 'somatics'

export type ExerciseType = 'structured' | 'reference'
export type Level = 'beginner' | 'intermediate' | 'advanced'

export type Phase = {
  label: string
  duration: number  // seconds
}

export type Exercise = {
  id: string
  name: string
  modality: Modality
  type: ExerciseType
  level: Level
  duration: string              // display string, e.g., '4–10 min'
  description: string           // one-liner for collapsed card
  learnMorePath: string         // e.g., '/breathe#box-breathing'
  // Structured exercises:
  phases?: Phase[]
  defaultCycles?: number
  defaultRounds?: number
  // Reference exercises:
  instructions?: string[]
  defaultMinutes?: number
}

export type Certification = {
  modality: Modality
  program: string
  school: string
  format: 'in-person' | 'online' | 'hybrid'
  duration: string
  cost: string
  prerequisites: string
  url: string
}
```

### File Structure

| File | Lines (est.) | Responsibility |
|------|-------------|---------------|
| `PracticeClient.tsx` | ~150 | Page shell: hero, tab state, renders active tab |
| `useTimer.ts` | ~200 | Custom hook: timer reducer, audio, wake lock, interval (see hook API below) |
| `ExercisesTab.tsx` | ~250 | "Do It" tab: modality pills, exercise list, filter logic |
| `ExerciseCard.tsx` | ~300 | Single card: collapsed/expanded, structured/reference variants |
| `PracticeBuilderTab.tsx` | ~824 | Unchanged — Daily Routines |
| `TeacherPathTab.tsx` | ~350 | Framework, timeline, certification directory |
| `exercises.ts` | ~600 | Exercise data array (43 exercises) |
| `certifications.ts` | ~200 | Certification data array |
| `types.ts` | ~40 | Shared type definitions |

**Total estimated:** ~2,900 lines across 9 files (vs. current 1,624 across 2 files). The increase is mostly data (exercises.ts, certifications.ts) — component code stays lean.

### `useTimer` Hook API

The hook wraps the existing `timerReducer` and all side effects (audio, interval, wake lock). It exposes a high-level API so consumers don't dispatch raw actions:

```ts
function useTimer(): {
  // State (read-only)
  status: TimerStatus           // 'idle' | 'running' | 'paused' | 'complete'
  remainingSeconds: number
  totalSeconds: number
  currentPhaseLabel: string     // empty string when no phase
  phaseRemaining: number
  currentCycle: number
  totalCycles: number
  currentRound: number
  totalRounds: number

  // Actions
  startOpen: (minutes: number) => void
  startStructured: (exercise: Exercise) => void
  pause: () => void
  resume: () => void
  reset: () => void
}
```

Only one timer runs at a time per hook instance. Each `ExerciseCard` gets its own `useTimer()`, but only one card is expanded at a time (accordion), so only one timer is active. The Freeform Timer card has its own independent `useTimer()` instance.

### Duration Selector Behavior

**Structured exercises:** Show the default cycle/round count with a computed duration label (e.g., "19 cycles · ~7 min"). The user can adjust the primary repeating unit via +/- stepper buttons — this is cycles for most exercises, but rounds for exercises where `defaultRounds > 1` (e.g., Wim Hof: adjust 3 rounds, not the single cycle within each round). The duration label updates reactively. No minute-based pills — cycles/rounds are the natural unit.

**Fractional-second phases:** Coherent Breathing uses 5.5-second phases. The timer ticks at 1-second intervals. For phases with fractional durations, round to the nearest second for display (`6s`, `5s` alternating) but track the fractional total internally so cumulative drift stays under 0.5s over a full session.

**Reference exercises:** Show duration pills (5/10/15/20/30 min + custom input). These are minute-based since there are no phases to count.

---

## Styling

All components use **inline styles** following the existing site pattern (no Tailwind utility classes in components). Colors reference the design system variables defined in `globals.css`.

### Modality Accent Colors (used in filter pills and exercise badges)

```ts
const MODALITY_COLORS: Record<Modality, { deep: string; pale: string }> = {
  meditation:      { deep: '#592E6B', pale: '#EDE9FE' },  // violet
  breathwork:      { deep: '#2E7070', pale: '#E0F4F4' },  // teal
  yoga:            { deep: '#C07A35', pale: '#FFF3E0' },  // amber (matches existing yoga track)
  fascia:          { deep: '#8A5A1C', pale: '#FEF3E2' },  // deep amber
  'nervous-system':{ deep: '#8B3A62', pale: '#F5E0EC' },  // rose
  reiki:           { deep: '#7A5A1E', pale: '#FFF8E1' },  // gold
  'sound-healing': { deep: '#6B4E8B', pale: '#F0E8F7' },  // soft purple (distinct from violet)
  somatics:        { deep: '#2D3A6A', pale: '#E8EAF6' },  // indigo
}
```

### Responsive Behavior

- **Mobile (<768px):** Single column. Modality pills scroll horizontally. Exercise cards full-width. Timer ring scales to `min(180px, calc(100vw - 6rem))`. Filter pills use smaller text.
- **Desktop (>=768px):** Single column (matching site's editorial layout). Cards may be slightly narrower with more padding. Timer ring at 200px (existing size). No multi-column grid for exercises — one card per row keeps the focus on the active exercise.

---

## Interaction Details

### Card Expand/Collapse
- Only one card expanded at a time (accordion behavior)
- Expanding a card scrolls it to the top of the viewport (below the sticky tab bar)
- Smooth height transition on expand/collapse
- If a timer is running and user collapses the card, timer pauses and state is preserved (re-expanding resumes)

### Timer Behavior
- Identical to existing: `setInterval` at 1000ms, `shouldChime` flag, `navigator.wakeLock`
- Bowl chime (`/sounds/bowl.wav`) on start, phase transitions (structured), and completion
- SVG ring animates from full to empty based on `remainingSeconds / totalSeconds`
- Completing an exercise: ring fills back, "Complete" label, Reset button

### Tab Switching & Mounting Strategy
- **All three tabs are always mounted in the DOM.** Inactive tabs use `style={{ display: 'none' }}` to hide, not conditional React rendering. This preserves timer state, expanded card state, and scroll position across tab switches.
- Switching tabs while a timer is running: the `useTimer` hook's `setInterval` continues ticking (since the component stays mounted). No explicit pause/resume on tab switch — the timer runs silently in the hidden tab. If the user returns, they see the timer has progressed.
- This matches native tab behavior and avoids the complexity of pause-on-hide/resume-on-show.

### "Start Timer →" in Daily Routines
- The existing routine items have `timerPreset` links. These should switch to the "Do It" tab and expand + start the corresponding exercise card.

---

## Accessibility

- All interactive elements have `aria-label` attributes
- Exercise cards use `role="button"` with `aria-expanded`
- Timer announces phase changes via `aria-live="polite"` region
- Modality pills use `role="tablist"` / `role="tab"` semantics
- Level badges use descriptive text, not color alone
- Respects `prefers-reduced-motion`: expand/collapse uses instant `display` toggle (no height transition), timer ring has no animated stroke-dashoffset transition
- Tab navigation works with arrow keys for pill filters

---

## Out of Scope

- User accounts / login
- Progress tracking / localStorage persistence
- Audio guides / voice instructions
- Video demonstrations within exercise cards
- Sharing / social features
- Custom exercise creation

---

## Implementation Dependencies

- **Anchor IDs on content pages:** The `learnMorePath` values (e.g., `/breathe#box-breathing`) assume matching HTML `id` attributes on the content page headings. Verify and add missing anchors on all 8 content pages before populating `exercises.ts`.
- **Certification research:** The Teacher Path tab's certification directory requires web research to populate `certifications.ts` with accurate program data. This is a content task, not a code task — schedule it as a distinct implementation step.
- **CSS class name helper:** The `Modality` type uses hyphens (`'sound-healing'`). For any CSS class targeting, use a `data-modality` attribute rather than trying to use the modality string as a class name directly.
