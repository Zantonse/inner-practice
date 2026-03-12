# Practice Builder (Daily Routines Tab) Design Spec

**Date:** 2026-03-12
**Location:** Third tab on existing `/practice` page
**Files:** `src/app/practice/PracticeBuilderTab.tsx` (new), `src/app/practice/PracticeClient.tsx` (modify)

---

## Overview

A "Daily Routines" tab on the `/practice` page that lets users pick a life template (Remote Work Day, Weekend Recovery, etc.) and see a sequenced practice list for their day. Each template has 3 duration tiers (Quick ~15min, Standard ~30min, Deep ~60min). Practices are organized into Morning / Midday / Evening blocks tied to the Manifest page's 5-stage Protocol (Regulate → Resource → Intend → Act → Receive).

No persistence, no custom builder, no saved state. Pick a template, see the sequence, optionally launch timers.

---

## Data Model

```typescript
interface RoutinePractice {
  id: string;
  title: string;           // "Coherent Breathing"
  duration: number;         // minutes
  description: string;      // what to do
  why: string;              // Protocol stage connection
  timerPreset?: string;     // ID linking to existing preset in PracticeClient
  pageLink?: string;        // "/breathe", "/yoga", etc.
}

interface RoutineBlock {
  time: 'morning' | 'midday' | 'evening';
  label: string;            // "Morning — Regulate"
  practices: RoutinePractice[];
}

type DurationTier = 'quick' | 'standard' | 'deep';

interface RoutineTemplate {
  id: string;
  name: string;             // "Remote Work Day"
  icon: string;             // emoji character
  description: string;      // one-line summary
  tiers: Record<DurationTier, RoutineBlock[]>;
}
```

---

## Templates (8)

### 1. Remote Work Day
- **Morning:** Breathwork (coherent or box) + seated meditation
- **Midday:** Movement break + fascia release (desk-friendly)
- **Evening:** Yoga Nidra with sankalpa
- **Protocol focus:** Full sequence (Regulate → Resource → Intend → Act → Receive)

### 2. Office / Commute Day
- **Morning:** Short breathwork (commute-friendly, no mat)
- **Midday:** Desk fascia release (neck, wrists, shoulders)
- **Evening:** Meditation sit
- **Protocol focus:** Regulate → Intend

### 3. Weekend Recovery
- **Morning:** Extended yoga flow + breathwork
- **Midday:** Fascia deep session (foam roller, gua sha)
- **Evening:** Long Yoga Nidra
- **Protocol focus:** Resource → Receive

### 4. High-Stress Day
- **Morning:** Physiological sighs + grounding breathwork
- **Midday:** Vagal toning (cold water on face, humming, gargling)
- **Evening:** Restorative yoga + Yoga Nidra
- **Protocol focus:** Regulate heavy (nervous system recovery)

### 5. Creative / Deep Work
- **Morning:** Coherent breathing + intention setting (WOOP)
- **Midday:** Micro movement breaks (2 min every hour)
- **Evening:** Reflective meditation (open monitoring)
- **Protocol focus:** Intend → Act

### 6. Travel Day
- **Morning:** Breathwork only (no mat, no space needed)
- **Midday:** Seated fascia release + eye movement exercises
- **Evening:** Body scan meditation (hotel/transit friendly)
- **Protocol focus:** Regulate (minimal space constraints)

### 7. Athletic / Active Day
- **Morning:** Dynamic breathwork (Wim Hof or kapalabhati) + mobility
- **Midday:** Post-training fascia release
- **Evening:** Recovery Yoga Nidra
- **Protocol focus:** Resource → Receive

### 8. Low Energy Day
- **Morning:** Gentle breathwork only (coherent breathing, 5 min)
- **Midday:** Rest or very light stretching
- **Evening:** Extended Yoga Nidra (30-45 min)
- **Protocol focus:** Regulate (gentle, permission to do less)

---

## Duration Tiers

| Tier | Total Time | Approach |
|------|-----------|----------|
| **Quick** | ~15 min | 1 practice per block, shortest durations. Morning only may suffice. |
| **Standard** | ~30 min | 1-2 practices per block, moderate durations. |
| **Deep** | ~60 min | 2-3 practices per block, full durations. Complete Protocol coverage. |

Quick tier may omit the Midday block entirely for some templates — if you only have 15 minutes, splitting across 3 blocks doesn't make sense.

---

## UI Design

### Tab Integration

Add "Daily Routines" as a third tab in PracticeClient's existing tab system. The tab type extends from `'open' | 'presets'` to `'open' | 'guided' | 'routines'`.

Tab styling matches existing tabs exactly — same inline styles, same active/inactive states.

### Template Picker (default view)

**Duration toggle:** 3 pills above the template grid — Quick / Standard / Deep. Styled like existing preset category filters in PracticeClient. Default: Standard. Active pill uses `GOLD_MID` background.

**Template grid:** 2 columns on desktop (via CSS grid `repeat(auto-fit, minmax(300px, 1fr))`), 1 column on mobile. Each card shows:
- Icon (emoji) + template name
- One-line description
- Total time for current duration tier as a pill badge
- Subtle border, hover state with `GOLD_MID` border highlight

Cards are clickable — selecting one transitions to the detail view.

### Template Detail View (selected template)

Replaces the template grid when a card is clicked. Shows:

**Header:**
- Back arrow + "Back to templates" link
- Template name + icon
- Duration tier pills (can switch tier while viewing detail)
- Total time

**Practice sequence:** Three blocks stacked vertically:

Each block:
- Block header: "Morning — Regulate" (time-of-day + Protocol stage name, Protocol stage in `GOLD_DEEP`)
- Practices listed vertically within the block, each showing:
  - Title + duration pill (e.g., "Coherent Breathing" + "5 min")
  - Description paragraph (what to do)
  - "Why" line in `GOLD_DEEP` italic (Protocol connection)
  - Optional "Start Timer →" button if `timerPreset` is set — clicking this switches to the Guided tab and could auto-select that preset
  - Optional page link ("Learn more on /breathe →") if `pageLink` is set

Blocks that have no practices for the selected tier are hidden.

**Closing:** A small note at the bottom: "These routines follow the Inner Practice Protocol — learn why the sequence matters on the Manifest page." with a link to `/manifest`.

### Accent Colors

- Tab buttons: existing violet system (matches current Open Timer / Guided Presets tabs)
- Duration tier pills: `GOLD_MID` (#D4A74A) active background, same as manifest page
- Protocol stage labels: `GOLD_DEEP` (#9A7230) text color
- Template card borders on hover: `GOLD_MID`
- Template card backgrounds: `var(--color-surface-raised)`

---

## File Structure

### New: `src/app/practice/PracticeBuilderTab.tsx`

~400-500 lines. Contains:
1. `'use client'` directive
2. Imports (Link, ScrollReveal)
3. Gold accent tokens (GOLD_DEEP, GOLD_MID)
4. TypeScript interfaces (RoutinePractice, RoutineBlock, DurationTier, RoutineTemplate)
5. Template data array (8 templates × 3 tiers)
6. Local components: TemplateCard, RoutineDetailView, PracticeBlock
7. Main `PracticeBuilderTab` export

Props accepted from PracticeClient:
```typescript
interface PracticeBuilderTabProps {
  onStartPreset?: (presetId: string) => void;  // callback to switch to presets tab
}
```

### Modify: `src/app/practice/PracticeClient.tsx`

Minimal changes:
- Extend tab type: `type Tab = 'open' | 'guided' | 'routines';`
- Add third tab button in the tab bar
- Import and render `<PracticeBuilderTab />` when `activeTab === 'routines'`
- Add `onStartPreset` handler that switches to guided tab (if implementing timer launch)

---

## Timer Preset Linking

Some routine practices can link to existing timer presets. The `timerPreset` field on `RoutinePractice` should use the same preset ID system already in PracticeClient. When the user clicks "Start Timer →", the parent component switches to the Guided tab.

**UX behavior:** Clicking "Start Timer →" switches to the Guided tab and pre-selects the preset but does NOT auto-start the timer. The user still hits the start button. This avoids the issue where a running timer hides the tab bar and traps the user.

---

## Timer Preset ID Mapping

Existing preset IDs in PracticeClient: `'box'`, `'478'`, `'wimhof'`, `'sigh'`, `'coherent'`, `'pose-hold'`, `'yin-hold'`, `'cold-1'`, `'cold-3'`, `'med-10'`, `'med-20'`, `'med-45'`.

| Practice | Preset ID | Notes |
|----------|-----------|-------|
| Coherent Breathing | `'coherent'` | Used in Remote Work, Creative, Low Energy |
| Box Breathing | `'box'` | Used in Remote Work (alt), Office |
| 4-7-8 Breathing | `'478'` | Used in High-Stress evening |
| Physiological Sigh | `'sigh'` | Used in High-Stress morning |
| Wim Hof Breathwork | `'wimhof'` | Used in Athletic morning |
| Meditation (10 min) | `'med-10'` | Quick tier meditation sits |
| Meditation (20 min) | `'med-20'` | Standard tier meditation sits |
| Meditation (45 min) | `'med-45'` | Deep tier meditation sits |
| Yin Hold | `'yin-hold'` | Used in Weekend fascia |
| Pose Hold | `'pose-hold'` | Used in Athletic mobility |
| Cold Exposure (1 min) | `'cold-1'` | Used in Athletic recovery (optional) |

Practices without a matching preset (fascia release, yoga flows, vagal toning, WOOP, movement breaks, eye exercises, body scan, Yoga Nidra) set `timerPreset: undefined` and show no "Start Timer" button. They show a `pageLink` to the relevant page instead.

### Page Link Mapping

| Practice Type | pageLink |
|---------------|----------|
| Any breathwork | `/breathe` |
| Yoga flows / Yoga Nidra | `/yoga` |
| Fascia / gua sha / foam roller | `/fascia` |
| Meditation / body scan | `/meditate` |
| Vagal toning / eye exercises | `/nervous-system` |
| WOOP / intention setting | `/manifest` |

---

## Duration Pill Styling

The duration tier pills (Quick / Standard / Deep) use **inline styles** for the active state, NOT the global `.pill-tab.active` class (which is violet). This avoids conflicting with the existing tab system.

Active pill style:
```typescript
{
  background: GOLD_MID,        // #D4A74A
  color: '#1C1C1C',
  borderColor: GOLD_MID,
}
```

Inactive pill style: same as existing `.pill-tab` default (transparent background, border only).

---

## Reference Data: Remote Work Day (complete)

This is the full data for one template. Other templates follow the same structure. The developer should use this as the pattern and create the remaining 7.

```typescript
{
  id: 'remote-work',
  name: 'Remote Work Day',
  icon: '🏠',
  description: 'Structured practice around a home office day.',
  tiers: {
    quick: [
      {
        time: 'morning', label: 'Morning — Regulate',
        practices: [
          { id: 'rw-q-1', title: 'Coherent Breathing', duration: 5, description: 'Five and a half seconds in, five and a half seconds out. Brings heart rate variability into coherence and shifts the nervous system toward ventral vagal.', why: 'Regulate: establish nervous system safety before the workday begins.', timerPreset: 'coherent', pageLink: '/breathe' },
        ],
      },
      {
        time: 'evening', label: 'Evening — Intend',
        practices: [
          { id: 'rw-q-2', title: 'Yoga Nidra with Sankalpa', duration: 10, description: 'Lie down. Follow a guided Yoga Nidra. Plant your sankalpa at the beginning and at the deepest point.', why: 'Intend: the hypnagogic state reduces prefrontal gating — intentions planted here bypass the inner critic.', pageLink: '/yoga' },
        ],
      },
    ],
    standard: [
      {
        time: 'morning', label: 'Morning — Regulate',
        practices: [
          { id: 'rw-s-1', title: 'Coherent Breathing', duration: 5, description: 'Five and a half seconds in, five and a half seconds out. Brings HRV into coherence.', why: 'Regulate: shift the ANS toward safety.', timerPreset: 'coherent', pageLink: '/breathe' },
          { id: 'rw-s-2', title: 'Seated Meditation', duration: 10, description: 'Open monitoring or focused attention. Sit comfortably, observe without engaging.', why: 'Resource: build attentional capacity for the day ahead.', timerPreset: 'med-10', pageLink: '/meditate' },
        ],
      },
      {
        time: 'midday', label: 'Midday — Resource',
        practices: [
          { id: 'rw-s-3', title: 'Movement Break + Desk Fascia', duration: 5, description: 'Stand, stretch, roll your neck and shoulders. Use a lacrosse ball on upper back if available. Break the cross-linking from sitting.', why: 'Resource: release fascial tension that accumulates during desk work.', pageLink: '/fascia' },
        ],
      },
      {
        time: 'evening', label: 'Evening — Intend',
        practices: [
          { id: 'rw-s-4', title: 'Yoga Nidra with Sankalpa', duration: 15, description: 'Guided Yoga Nidra. Plant your sankalpa at beginning and at Stage 7 (deepest point).', why: 'Intend: intention-setting during the hypnagogic window.', pageLink: '/yoga' },
        ],
      },
    ],
    deep: [
      {
        time: 'morning', label: 'Morning — Regulate & Resource',
        practices: [
          { id: 'rw-d-1', title: 'Coherent Breathing', duration: 10, description: 'Extended coherence session. Five and a half seconds in, five and a half seconds out. Feel the shift from sympathetic to ventral vagal.', why: 'Regulate: deep nervous system reset.', timerPreset: 'coherent', pageLink: '/breathe' },
          { id: 'rw-d-2', title: 'Seated Meditation', duration: 20, description: 'Open monitoring meditation. Observe thoughts, sensations, and sounds without engaging.', why: 'Resource: build the sustained attention that supports clarity throughout the day.', timerPreset: 'med-20', pageLink: '/meditate' },
        ],
      },
      {
        time: 'midday', label: 'Midday — Resource',
        practices: [
          { id: 'rw-d-3', title: 'Fascia Release Session', duration: 10, description: 'Foam roller or gua sha on upper back, neck, and forearms. Target the tissue patterns created by desk posture.', why: 'Resource: release stored tension. The body holds patterns that restrict the nervous system.', pageLink: '/fascia' },
        ],
      },
      {
        time: 'evening', label: 'Evening — Intend & Receive',
        practices: [
          { id: 'rw-d-4', title: 'WOOP Intention Setting', duration: 5, description: 'Wish, Outcome, Obstacle, Plan. Pick one specific goal. Vividly imagine the best outcome, then the main internal obstacle, then form an if-then plan.', why: 'Intend: evidence-based goal science. MCII outperforms either mental contrasting or implementation intentions alone.', pageLink: '/manifest' },
          { id: 'rw-d-5', title: 'Yoga Nidra with Sankalpa', duration: 20, description: 'Full Yoga Nidra session. Plant your sankalpa — the same intention from WOOP, stated as present-tense reality — at the beginning and deepest point.', why: 'Intend + Receive: Sankalpa in the hypnagogic state, then practice tolerating the expansion of receiving.', pageLink: '/yoga' },
        ],
      },
    ],
  },
}
```

Total times: Quick ~15min, Standard ~35min, Deep ~65min. Other templates should target similar ranges.

---

## What This Does NOT Include

- No saved/custom routines
- No user accounts or persistence
- No calendar integration
- No notifications/reminders
- No drag-and-drop customization
- No progress tracking
