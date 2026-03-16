# Sleep & Circadian Rhythm Page — Design Spec

**Date:** 2026-03-16
**Route:** `/sleep`
**Status:** Approved

---

## Overview

A new content page for the Inner Practice site covering sleep architecture, circadian rhythm, overnight HRV, Yoga Nidra/NSDR, breathwork for sleep, and sleep hygiene through a polyvagal lens. The centerpiece is a 24-hour practice timing map showing when each technique is most (and least) effective based on circadian biology. The page follows the established content page pattern and adds 5 sleep-related exercises to the practice page.

## Research Source

Full research brief: `~/Documents/ObsidianNotes/Claude-Research/wellness/sleep-circadian-rhythm-research-2026-03.md` (755 lines, synthesized from 6 specialist domains).

---

## Files to Create / Modify

### New Files

| File | Purpose |
|------|---------|
| `src/app/sleep/page.tsx` | Server component. Sets `<Metadata>` (title, description, OG). Renders `<SleepClient>`. |
| `src/app/sleep/SleepClient.tsx` | `'use client'` component. All page JSX, interactivity, section content. |

### Modified Files

| File | Change |
|------|--------|
| `src/app/layout.tsx` | Add `<Link href="/sleep">Sleep</Link>` to nav between "Reiki" and "Practice". |
| `src/app/practice/exercises.ts` | Add 5 sleep exercises (see Practice Integration section). |
| `src/app/practice/types.ts` | Add `"sleep"` to the `Modality` type. Add `sleep` entry to `MODALITY_META` with color `#1B4D5C` and label `"Sleep"`. |

---

## Design Tokens

```
Accent primary:    #1B4D5C  (midnight teal)
Accent light:      #A3C4CC  (card borders, pill backgrounds)
Accent pale:       #E8F2F4  (light fills, active states)
Accent gradient:   linear-gradient(135deg, #1B4D5C 0%, #2E7070 50%, #1B4D5C 100%)
```

Dark mode variants follow the existing pattern — lighten accent for text, darken surfaces.

---

## Page Structure

### 1. Hero Section

- Gradient background using midnight teal accent
- Floating animated orb (existing `.breathe` CSS keyframe)
- Eyebrow: `SLEEP & CIRCADIAN RHYTHM` (font-ui, uppercase, 0.6875rem)
- h1: `Where Every Practice Comes to Rest` (Cormorant Garamond, `var(--text-hero)`)
- Lead paragraph: Sleep is when the nervous system does its deepest regulation — glymphatic clearance, emotional memory consolidation, autonomic restoration. Every practice on this site either prepares you for sleep or benefits from it.
- In-page anchor nav row (like Breathe page): Science | Circadian Code | HRV | Yoga Nidra | Breathwork | Hygiene | Wind-Down | Practice
- Hero image: gradient-only hero (like ReikiClient pattern) with animated orb — no `<img>` element. Simpler and consistent with most recently built pages.

### 2. What Sleep Actually Is (`id="science"`)

Two-column auto-fit grid (`minmax(min(100%, 440px), 1fr)`).

**Left column (ScrollReveal):**
- Eyebrow: `THE ARCHITECTURE OF REST`
- h2: `What Happens When You Sleep`
- The two-process model (Process S + Process C) explained concisely
- Adenosine accumulation, caffeine's masking effect
- Why consistent wake time anchors the circadian clock

**Right column (ScrollReveal):**
- Ultradian cycles (90-110 min, Dement & Kleitman 1957)
- Stage composition: N1 (2-5%), N2 (45-55%), N3/SWS (13-23%), REM (20-25%)
- The critical architectural shift: cycles 1-2 are SWS-dominant (physical), cycles 4-6 are REM-dominant (emotional)
- Callout: "Sleeping 6 hours instead of 8 doesn't remove 2 hours proportionally — it eliminates almost all of cycles 5-6, which are nearly pure REM."

**StatCards (3-card grid):**

| Source | Stat | Detail |
|--------|------|--------|
| Xie et al., *Science*, 2013 | 60% | Brain cells shrink by 60% during sleep, expanding channels for glymphatic waste clearance |
| Nedergaard lab, 2013 | 2× | Beta-amyloid clearance runs at twice the rate during sleep vs waking |
| Takahashi et al., 1968 | 70% | Of daily growth hormone is secreted during slow-wave sleep |

### 3. SectionDivider

Standard `<SectionDivider>` component.

### 4. The Circadian Code (`id="circadian"`) — CENTERPIECE

**Eyebrow:** `WHEN YOU PRACTICE MATTERS`
**h2:** `The Circadian Code`

**Intro prose (ScrollReveal):**
- SCN as master pacemaker (~20,000 neurons, 480nm light sensitivity)
- Cortisol awakening response (50-75% spike in first 30-45 min)
- Melatonin as darkness signal (DLMO 2 hrs before habitual sleep, suppressed by 200 lux)
- Core body temperature (must drop 1-2°F for sleep onset, peaks 5-7 PM)
- The Forbidden Zone (Derk-Jan Dijk): 2-3 hrs before bedtime, circadian alerting signal peaks

**24-Hour Practice Timing Table:**

Styled as a grid of 7 cards (not an HTML `<table>`), each card representing a time window. Each card has:
- Time window label (bold, font-ui)
- Biological state (italic, font-body)
- Recommended practices (font-body, with technique name as bold inline)
- Left border in midnight teal accent

| Window | Biological State | Recommended Practices |
|--------|-----------------|----------------------|
| Wake + 0-30 min | CAR peak, cortisol surging | Outdoor morning light (5-10 min) |
| Wake + 30-90 min | High cortisol, sympathetic dominant | Kapalabhati, Breath of Fire, Wim Hof, cold exposure |
| Wake + 2-5 hrs | Cortisol subsiding, alertness building | Box breathing, focused meditation, vigorous yoga |
| Wake + 5-8 hrs | Midday equilibrium, thermal peak approaching | Coherence breathing, alternate nostril, sustained mindfulness |
| Wake + 6-8 hrs | Natural circadian alertness dip | NSDR / Yoga Nidra (10-20 min) |
| 2-3 hrs before bed | Forbidden zone alerting signal | Reduce light; avoid all stimulating practices |
| 1-2 hrs before bed | DLMO approaching, melatonin rising | 4-7-8, cyclic sighing, body scan, Ujjayi, Yoga Nidra |

**Three window cards (ScrollReveal group):**
- **Morning Window** — Ride the cortisol wave. Light protocol (Huberman/Foster). Stimulating practices.
- **Midday Window** — Integration and reset. Coherence breathing, NSDR for the post-lunch dip.
- **Evening Window** — Support the transition to darkness. Light protocol. Calming practices only.

**Chronotype note:** Brief callout that all windows are relative to natural wake time, not the clock. Chronotype is ~50% heritable (Hu et al. 2016 GWAS).

### 5. SectionDivider flip

### 6. HRV: Your Overnight Report Card (`id="hrv"`)

**Eyebrow:** `YOUR AUTONOMIC REPORT CARD`
**h2:** `HRV During Sleep`

**Two-column layout:**

**Left (ScrollReveal):**
- Stage-by-stage narrative: N2 parasympathetic build → N3 as peak parasympathetic state of 24 hours (HR drops 10-30%, RMSSD 1.5-2x waking, BP drops 10-20%) → REM sympathetic surges (HR irregular, HRV drops to waking levels)
- The overnight oscillation pattern: first cycle largest RMSSD peak, gradual decline as REM dominates later cycles

**Right (ScrollReveal):**
- Callout card: "Good vs Concerning Patterns"
  - Good: >30% RMSSD increase wake→SWS, sharp NREM/REM oscillation, first-half > second-half
  - Concerning: Flat HRV (sympathetic overdrive), no oscillation (fragmented sleep), elevated resting HR throughout
- Wearable note: Oura measures deepest sleep first half; Whoop measures last SWS before waking; Apple Watch reports nightly average

**Below:** How meditation/breathwork shows up in overnight HRV (Krygier 2013: +11.6ms RMSSD after 10-day Vipassana; Lehrer 2003: 22% baroreflex gain from resonance breathing).

### 7. Yoga Nidra & NSDR (`id="yoga-nidra"`)

**Eyebrow:** `THE BRIDGE BETWEEN PRACTICE AND SLEEP`
**h2:** `Yoga Nidra & Non-Sleep Deep Rest`

**Two-column:**
- Left: What Yoga Nidra is (8 stages from Satyananda), the hypnagogic state, how it differs from guided meditation
- Right: The "conscious delta" state (Datta 2021) — delta waves co-existing with maintained awareness

**Evidence cards (ScrollReveal group, 3 cards):**
- Lou et al. 1999: 65% dopamine increase (PET, n=9 experienced practitioners)
- Kumar 2008: SOL reduced ~10 min, improved PSQI
- iRest/Richard Miller: DoD-approved for PTSD, VA hospital studies

**Honest assessment callout box (amber border):**
- "1 hour = 4 hours of sleep" — no controlled study validates this ratio. Yoga Nidra provides some SWS-like restorative benefits but cannot replace full sleep cycles including REM and glymphatic clearance.
- The 65% dopamine figure is real but from 9 experienced practitioners.

**Protocol table (styled grid):**

| Protocol | Duration | Best Use |
|----------|----------|----------|
| Quick NSDR | 10 min | Afternoon energy dip, post-learning |
| Pre-sleep Yoga Nidra | 20-30 min | Reduce sleep onset latency |
| Full practice | 30-45 min | Comprehensive nervous system reset |

### 8. SectionDivider

### 9. Breathwork for Sleep (`id="breathwork"`)

**Eyebrow:** `BREATHING YOUR WAY TO SLEEP`
**h2:** `Breathwork Techniques for Sleep`

**6 technique cards** in auto-fit grid. Each card:
- Technique name (h3, font-display)
- Ratio badge (e.g., "2:1 exhale:inhale") — pill shape, midnight teal
- Timing pill: "Evening" (teal) / "Morning Only" (amber) / "Anytime" (neutral)
- Evidence pill: "Strong" / "Moderate" / "Low"
- 2-3 sentence mechanism and recommendation

**Techniques:**
1. **4-7-8 Breathing** — Evening, Moderate. Extended exhale maximally engages vagal brake.
2. **Coherence Breathing (5.5 bpm)** — Evening/Anytime, Strong. Resonance frequency of cardiovascular system. Lehrer et al. 2003.
3. **Cyclic Sighing** — Evening, Strong. Double inhale + long exhale. Balban/Huberman 2023 Stanford RCT.
4. **Left Nostril Breathing** — Evening, Low-Moderate. Increased right hemisphere activity (Shannahoff-Khalsa 1991).
5. **Box Breathing (modified 4-4-6-2)** — Anytime, Moderate. Modified for sleep with longer exhale.
6. **Wim Hof Method** — Morning Only, Strong (contraindicated before sleep). 200-300% epinephrine spike.

**Contraindications callout (rose border, icon):**
"These practices should NOT be done within 2-3 hours of bedtime: Wim Hof / Tummo, Kapalabhati, Breath of Fire, cold exposure. The sympathetic activation directly opposes sleep onset."

### 10. Sleep Hygiene Through the Nervous System (`id="hygiene"`)

**Eyebrow:** `THE ENVIRONMENT OF SAFETY`
**h2:** `Sleep Hygiene Through the Nervous System`

**Polyvagal intro (ScrollReveal):**
- Neuroception of safety is the prerequisite for sleep
- Falling asleep IS the ventral vagal → dorsal vagal (safe immobilization) transition
- If the nervous system detects threat, sympathetic mobilization blocks sleep onset

**6 factor cards (auto-fit grid, ScrollReveal group):**

Each card: factor name (h3), key number (bold stat), mechanism, practical recommendation.

1. **Temperature** — 60-67°F room. Core must drop 1-3°F. Warm bath paradox (Haghayegh 2019: -10 min SOL).
2. **Light** — 480nm melanopsin. 200 lux suppresses melatonin 50%. Warm/amber 2 hrs pre-bed.
3. **Caffeine** — 5-6 hr half-life. CYP1A2 fast vs slow metabolizers. Drake 2013: 6 hrs pre-bed still reduces sleep 1+ hr.
4. **Alcohol** — Sedating onset BUT suppresses REM 20-40%. Net negative.
5. **Exercise** — Morning/afternoon improves (Kredlow 2015: d=0.47). Vigorous within 2 hrs delays onset.
6. **Meals** — Last meal 2-3 hrs before bed (Satchin Panda TRE research).

**CBT-I callout (gold border):**
Brief note: CBT-I is the gold standard for insomnia (ACP 2016 first-line recommendation). Sleep restriction + stimulus control. Effects persist at 12 months vs medication effects disappearing (Mitchell 2012).

### 11. SectionDivider flip

### 12. The Wind-Down Protocol (`id="wind-down"`)

**Eyebrow:** `YOUR EVENING SEQUENCE`
**h2:** `The Wind-Down Protocol`

Intro: "A 90-minute sequence using practices from across the site, ordered by autonomic mechanism."

**Timeline (`.timeline` with `.timeline-node`):**

1. **Dim the lights** (90 min before bed) — Switch to warm/amber (<2700K), below eye level. Supports DLMO.
2. **The 3-2-1 check** (ongoing) — 3 hrs since last meal? 2 hrs since last work? 1 hr since last screen?
3. **Warm shower** (60-45 min before bed) — Peripheral vasodilation → accelerated core temp drop.
4. **Gentle yoga** (10-15 min) — Legs-up-the-wall, supported child's pose, supine twist. Fascia release + diaphragmatic breathing.
5. **Breathwork transition** (5-10 min) — Coherence breathing (3-5 min) → 4-7-8 breathing (4-8 cycles).
6. **Body scan / Yoga Nidra in bed** (10-20 min) — Systematic rotation of consciousness. If sleep comes during practice, welcome it.

Each node includes the autonomic mechanism in italics below the instruction.

### 13. "Now, practice." Section

Replicate the exact `div` pattern from `MeditateClient.tsx` lines 873-897: `background: 'var(--color-violet-deep)'` container with horizontal rule elements flanking italic text in `var(--color-violet-mid)`.

Pill tab selector for guided sleep content categories:
- Yoga Nidra / NSDR
- Evening Breathwork
- Sleep Meditations

`<VideoFacade>` embeds for curated YouTube guided sessions (Yoga Nidra for sleep, NSDR protocols, evening breathwork).

### 14. Cross-Links Footer

"Sleep connects to everything" heading.

Inline link cards to:
- `/breathe` — "The breath is your fastest path to parasympathetic activation"
- `/nervous-system` — "Understand the autonomic system that sleep regulates"
- `/yoga` — "Yoga Nidra bridges practice and sleep"
- `/meditate` — "Meditation improves sleep architecture"
- `/somatics` — "Release tension the body is holding before bed"

Closing blockquote: research-backed, thematic.

---

## Practice Page Integration

### New Modality

In `types.ts`, add to `Modality` type and `MODALITY_META`:

```ts
sleep: { label: 'Sleep', deep: '#1B4D5C', pale: '#E8F2F4' }
```

### New Exercises in `exercises.ts`

**1. Evening 4-7-8 Breathing**
- `id`: `'evening-4-7-8'`
- `name`: `'Evening 4-7-8 Breathing'`
- `modality`: `'sleep'`
- `type`: `'structured'`
- `level`: `'beginner'`
- `duration`: `'2–5 min'`
- `defaultMinutes`: 5
- `phases`: `[{ label: 'Inhale', duration: 4 }, { label: 'Hold', duration: 7 }, { label: 'Exhale', duration: 8 }]`
- `learnMorePath`: `'/sleep#breathwork'`
- `description`: Extended exhale pattern that maximally engages the vagal brake. The 2:1 exhale-to-inhale ratio shifts the autonomic nervous system toward parasympathetic dominance.

**2. Pre-Sleep Yoga Nidra**
- `id`: `'pre-sleep-yoga-nidra'`
- `name`: `'Pre-Sleep Yoga Nidra'`
- `modality`: `'sleep'`
- `type`: `'reference'`
- `level`: `'beginner'`
- `duration`: `'20 min'`
- `defaultMinutes`: 20
- `learnMorePath`: `'/sleep#yoga-nidra'`
- `description`: Systematic rotation of consciousness that induces theta and delta brain waves while maintaining awareness. The bridge between waking practice and sleep.

**3. Wind-Down Body Scan**
- `id`: `'wind-down-body-scan'`
- `name`: `'Wind-Down Body Scan'`
- `modality`: `'sleep'`
- `type`: `'reference'`
- `level`: `'beginner'`
- `duration`: `'15 min'`
- `defaultMinutes`: 15
- `learnMorePath`: `'/sleep#wind-down'`
- `description`: Interoceptive awareness practice that activates the insular cortex — the same circuit the brain uses to assess internal safety. Supports the neuroception of safety required for sleep.

**4. Cyclic Sighing**
- `id`: `'cyclic-sighing'`
- `name`: `'Cyclic Sighing'`
- `modality`: `'sleep'`
- `type`: `'structured'`
- `level`: `'beginner'`
- `duration`: `'5 min'`
- `defaultMinutes`: 5
- `phases`: `[{ label: 'Double inhale', duration: 3 }, { label: 'Long exhale', duration: 7 }]`
- `learnMorePath`: `'/sleep#breathwork'`
- `description`: Double nasal inhale followed by extended mouth exhale. The 2023 Stanford RCT found 5 minutes more effective than mindfulness meditation for reducing anxiety.

**5. Sleep Coherence Breathing**
- `id`: `'sleep-coherence'`
- `name`: `'Sleep Coherence Breathing'`
- `modality`: `'sleep'`
- `type`: `'structured'`
- `level`: `'beginner'`
- `duration`: `'10 min'`
- `defaultMinutes`: 10
- `phases`: `[{ label: 'Inhale', duration: 5.5 }, { label: 'Exhale', duration: 5.5 }]`
- `learnMorePath`: `'/sleep#breathwork'`
- `description`: Breathing at the resonance frequency of the cardiovascular system (~5.5 bpm). Maximizes HRV and primes the autonomic nervous system for the parasympathetic dominance of deep sleep.

---

## Navigation Change

In `src/app/layout.tsx`, add between Reiki and Practice:

```tsx
<Link href="/sleep">Sleep</Link>
```

---

## Evidence & Content Source

All content draws from the synthesized research brief at `Claude-Research/wellness/sleep-circadian-rhythm-research-2026-03.md`. Key sources cited on the page:

- Xie et al., *Science*, 2013 (glymphatic system)
- Borbely, 1982 (two-process model)
- Dement & Kleitman, 1957 (ultradian cycles)
- Kox et al., *PNAS*, 2014 (Wim Hof epinephrine)
- Balban et al., *Nature Scientific Reports*, 2023 (cyclic sighing RCT)
- Lehrer et al., 2003 (resonance breathing / baroreflex)
- Black et al., *JAMA Internal Medicine*, 2015 (meditation and sleep)
- Lou et al., *Human Brain Mapping*, 1999 (Yoga Nidra dopamine PET)
- Haghayegh et al., *Sleep Medicine Reviews*, 2019 (warm bath meta-analysis)
- Mitchell et al., 2012 (CBT-I vs medication meta-analysis)

---

## Out of Scope

- No new shared components (reuses ScrollReveal, SectionDivider, VideoFacade, VideoAccent)
- No new CSS classes in globals.css beyond page-specific inline styles
- No hero image generation (reuse existing)
- No video asset creation (VideoFacade embeds only)
- No changes to the Practice page UI (ExercisesTab, ExerciseCard) — only data additions
