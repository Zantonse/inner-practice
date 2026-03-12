# Practice Builder (Daily Routines Tab) Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Daily Routines" tab to the `/practice` page with 8 life templates (Remote Work Day, Office Day, Weekend Recovery, etc.), each with 3 duration tiers (Quick/Standard/Deep), showing sequenced practice lists tied to the Inner Practice Protocol.

**Architecture:** New `PracticeBuilderTab.tsx` component (~400-500 lines) with data-driven template cards. Minimal integration edits to existing `PracticeClient.tsx` (add tab button, import, render). Gold accent color for routine content (ties to /manifest). Templates defined as typed arrays following the yoga page's data-driven pattern.

**Tech Stack:** Next.js 16, React 19, TypeScript, inline styles with CSS custom properties, existing shared components (ScrollReveal).

**Spec:** `docs/superpowers/specs/2026-03-12-practice-builder-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/app/practice/PracticeBuilderTab.tsx` | Daily Routines tab: template data, picker UI, detail view |
| Modify | `src/app/practice/PracticeClient.tsx` | Add third tab button, import and render PracticeBuilderTab |

---

## Task 1: Create PracticeBuilderTab.tsx

**Files:**
- Create: `src/app/practice/PracticeBuilderTab.tsx`

This is the main task. Build the entire component in one file with these sections:

1. `'use client'` directive
2. Imports (`useState` from react, `Link` from next/link, `ScrollReveal` from components)
3. Gold accent tokens
4. TypeScript interfaces
5. Template data (8 templates × 3 tiers)
6. Local components: TemplateCard, PracticeItem, RoutineDetail
7. Main PracticeBuilderTab export

- [ ] **Step 1: Write interfaces, tokens, and props**

```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

const GOLD_DEEP = '#9A7230';
const GOLD_MID  = '#D4A74A';
const GOLD_LIGHT = '#F0D68A';

interface RoutinePractice {
  id: string;
  title: string;
  duration: number;
  description: string;
  why: string;
  timerPreset?: string;
  pageLink?: string;
}

interface RoutineBlock {
  time: 'morning' | 'midday' | 'evening';
  label: string;
  practices: RoutinePractice[];
}

type DurationTier = 'quick' | 'standard' | 'deep';

interface RoutineTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  tiers: Record<DurationTier, RoutineBlock[]>;
}

interface PracticeBuilderTabProps {
  onStartPreset?: (presetId: string) => void;
}
```

- [ ] **Step 2: Write all 8 template data arrays**

Populate from the spec. The "Remote Work Day" template has complete reference data in the spec — use it verbatim. For the remaining 7 templates, follow the same structure using the template descriptions and preset/page link mappings from the spec.

Key preset ID mappings (from spec):
- Coherent Breathing → `'coherent'`
- Box Breathing → `'box'`
- 4-7-8 → `'478'`
- Physiological Sigh → `'sigh'`
- Wim Hof → `'wimhof'`
- Meditation 10/20/45 min → `'med-10'` / `'med-20'` / `'med-45'`
- Yin Hold → `'yin-hold'`
- Pose Hold → `'pose-hold'`

Page link mappings:
- Breathwork → `/breathe`
- Yoga / Yoga Nidra → `/yoga`
- Fascia / gua sha → `/fascia`
- Meditation / body scan → `/meditate`
- Vagal toning / eye exercises → `/nervous-system`
- WOOP / intention → `/manifest`

Duration targets: Quick ~15min, Standard ~30min, Deep ~60min. Quick tier may omit midday block.

- [ ] **Step 3: Write the TemplateCard component**

Grid card showing: icon + name, description, total time pill. Clickable.

```typescript
function getTotalMinutes(blocks: RoutineBlock[]): number {
  return blocks.reduce((sum, b) => sum + b.practices.reduce((s, p) => s + p.duration, 0), 0);
}

function TemplateCard({ template, tier, isSelected, onSelect }: {
  template: RoutineTemplate;
  tier: DurationTier;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const total = getTotalMinutes(template.tiers[tier]);
  return (
    <button
      onClick={onSelect}
      style={{
        background: 'var(--color-surface-raised)',
        border: `1px solid ${isSelected ? GOLD_MID : 'var(--color-border)'}`,
        borderRadius: '2px',
        padding: '1.5rem',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'border-color 300ms ease',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.5rem' }}>{template.icon}</span>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: 0,
        }}>{template.name}</h3>
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.875rem',
        color: 'var(--color-text-muted)',
        margin: '0 0 0.75rem',
        lineHeight: 1.6,
      }}>{template.description}</p>
      <span style={{
        display: 'inline-block',
        padding: '0.2rem 0.65rem',
        borderRadius: '9999px',
        background: `color-mix(in srgb, ${GOLD_LIGHT} 30%, var(--color-cream))`,
        fontFamily: 'var(--font-ui)',
        fontSize: '0.625rem',
        fontWeight: 500,
        color: GOLD_DEEP,
        letterSpacing: '0.04em',
      }}>{total} min</span>
    </button>
  );
}
```

- [ ] **Step 4: Write the PracticeItem component**

Single practice within a block. Shows title + duration pill, description, why, optional timer/page links.

- Title in `var(--color-text)`, duration pill beside it
- Description in `var(--color-text-muted)`
- Why in `GOLD_DEEP` italic
- "Start Timer →" button if `timerPreset` is set (calls `onStartPreset`)
- "Learn more →" link if `pageLink` is set

- [ ] **Step 5: Write the RoutineDetail component**

The detail view when a template is selected. Shows:
- Back link ("← Back to templates")
- Template name + icon + duration pills (switchable)
- Blocks stacked vertically, each with a header like "Morning — Regulate" and PracticeItem children
- Closing link to /manifest

- [ ] **Step 6: Write the main PracticeBuilderTab export**

Manages two pieces of state:
- `selectedTemplate: string | null` — which template is expanded (null = picker view)
- `tier: DurationTier` — which duration tier is active (default: 'standard')

Renders either the template picker grid (with duration pills above) or the RoutineDetail view.

Duration tier pills use **inline styles** for the active state (NOT the global `.pill-tab.active` class which is violet):

Active: `{ background: GOLD_MID, color: '#1C1C1C', borderColor: GOLD_MID }`
Inactive: match existing `.pill-tab` appearance with inline styles.

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: Compiles with zero TS errors (PracticeBuilderTab is not yet imported, so it's just a standalone file that must type-check).

Note: Next.js tree-shakes unused files, but TypeScript still checks them. The file should compile clean.

- [ ] **Step 8: Commit**

```bash
git add src/app/practice/PracticeBuilderTab.tsx
git commit -m "feat: add PracticeBuilderTab with 8 life templates and 3 duration tiers"
```

---

## Task 2: Integrate into PracticeClient

**Files:**
- Modify: `src/app/practice/PracticeClient.tsx`

- [ ] **Step 1: Add import**

At the top of PracticeClient.tsx, add after existing imports:

```typescript
import PracticeBuilderTab from './PracticeBuilderTab';
```

- [ ] **Step 2: Extend tab state type**

Line 512 currently reads:
```typescript
const [activeTab, setActiveTab] = useState<'open' | 'guided'>('open');
```

Change to:
```typescript
const [activeTab, setActiveTab] = useState<'open' | 'guided' | 'routines'>('open');
```

- [ ] **Step 3: Add the third tab button**

After the "Guided Presets" button (line 647-652), add:

```typescript
<button
  className={activeTab === 'routines' ? 'pill-tab active' : 'pill-tab'}
  onClick={() => setActiveTab('routines')}
>
  Daily Routines
</button>
```

- [ ] **Step 4: Add the routines tab content**

After the guided presets section (which ends around line 772 with `{!isTimerActive && activeTab === 'guided' && (...)}`), add:

```typescript
{/* ── Daily Routines (idle) ─────────────────────── */}
{!isTimerActive && activeTab === 'routines' && (
  <PracticeBuilderTab
    onStartPreset={(presetId) => {
      // Switch to guided tab — user manually starts the preset
      setActiveTab('guided');
    }}
  />
)}
```

Note: The `onStartPreset` callback just switches tabs. It does NOT auto-start the timer (per spec: "pre-selects the preset but does NOT auto-start"). For simplicity, it switches tabs and the user finds the preset manually. Auto-selecting a specific preset would require lifting preset state, which is more complexity than needed.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Zero TS errors, all routes generate including `/practice`.

- [ ] **Step 6: Commit and push**

```bash
git add src/app/practice/PracticeClient.tsx src/app/practice/PracticeBuilderTab.tsx
git commit -m "feat: integrate Daily Routines tab into /practice page"
git push
```

---

## Verification Checklist

- [ ] `npm run build` passes with zero errors
- [ ] `/practice` shows 3 tabs: Open Timer, Guided Presets, Daily Routines
- [ ] Template picker displays 8 cards in a 2-column grid
- [ ] Duration tier pills switch between Quick/Standard/Deep
- [ ] Card time badges update when tier changes
- [ ] Clicking a template shows the sequenced practice list
- [ ] Practice blocks show Morning/Midday/Evening with Protocol stage labels
- [ ] "Start Timer →" buttons appear only for practices with timer presets
- [ ] "Learn more →" links appear for practices with page links
- [ ] "Back to templates" returns to the picker view
- [ ] Dark mode renders correctly
- [ ] Mobile layout stacks to single column
