# /manifest Page Design Spec

**Date:** 2026-03-12
**Route:** `/manifest`
**Files:** `src/app/manifest/ManifestClient.tsx`, `src/app/manifest/page.tsx`

---

## Overview

The `/manifest` page is Inner Practice's synthesis page — the "why everything works together" page that ties all 5 existing tracks (meditate, yoga, fascia, breathe, nervous system) into a coherent framework for intentional creation. Unlike other pages that teach a single discipline, this page makes an argument: nervous system regulation is the prerequisite for effective intention-setting, and the science supports a specific sequence.

**Tone:** Balanced synthesis — each section pairs research with practical application.
**Approach:** Hybrid — data-driven backbone (shared `ManifestSection` component) with one bespoke section (the Protocol).
**Estimated size:** ~600-800 lines.

---

## Accent Tokens

```typescript
const GOLD_DEEP  = '#9A7230';  // section headers, stat card borders, labels
const GOLD_MID   = '#D4A74A';  // pill badges, highlights
const GOLD_LIGHT = '#F0D68A';  // surface tints, pill backgrounds
```

Dark mode variants will follow the same pattern as other pages (desaturate and shift for contrast against `--color-surface` dark values).

---

## Page Structure

### Hero

Standard Inner Practice hero pattern — full-width gradient header.

- **Eyebrow:** "The path of intention"
- **Title:** "Manifest"
- **Subtitle:** "What the science of intention, the wisdom of ancient practice, and your nervous system have in common."
- **Background:** Gold-to-cream gradient with watercolor hero image (`/images/hero-manifest.png` — to be generated)

### Landing Page Integration

Add Manifest + Practice to the landing page hero card grid. Manifest gets `eyebrow: 'The path of intention'`, gold gradient treatment.

**Required type updates in `page.tsx`:**
- Update `PathKey` union type to include `'manifest'` and `'practice'`
- Both new entries need all required fields from the `paths` array type (including `imageAlt`)

### Nav Integration

Add "Manifest" link to the nav bar in `layout.tsx`.

---

## Section 1: The Science of Intention

**Component:** Data-driven `ManifestSection`
**Content source:** Goal science research + neuroscience research

### Key Points (rendered as subsection cards)

1. **Neural Overlap** — The brain uses the same machinery for imagining as for perceiving (Naselaris 2020, Dijkstra 2017). Vivid visualization activates motor cortex, planning regions, and identity systems. The "manifestation muscle" is real neuroplasticity.

2. **The Visualization Paradox** — Oettingen's 30-year finding: pure positive visualization reduces motivation (systolic BP drops, energy depletes). The fix: Mental Contrasting — alternate between desired future and realistic obstacles. This is WOOP (Wish, Outcome, Obstacle, Plan).

3. **Implementation Intentions** — Gollwitzer's d=0.65 effect size across 94 tests. "If X, then Y" planning turns vague aspiration into deployable action. MCII (WOOP + if-then) outperforms either alone.

4. **Process vs. Outcome Visualization** — Imagining doing the work outperforms imagining having the result. Motor cortex engagement, self-efficacy building, obstacle preparation.

### StatCards

- Gollwitzer & Sheeran 2006 meta-analysis: **d = 0.65** across 94 independent tests
- Oettingen: obese women with positive fantasies lost *less* weight over one year
- American Physiological Society: **~13% strength gains** from mental practice alone (no physical movement)

### Video

1 embed — WOOP walkthrough or Oettingen talk on mental contrasting.

---

## Section 2: The Practice Lineage

**Component:** Data-driven `ManifestSection`
**Content source:** Traditions research + nervous system connection research

### Key Points

1. **Sankalpa** — Not a wish but a dharmic vow. Sanskrit: san (connection to highest truth) + kalpa (vow). Present-tense, soul-aligned. The Bhagavad Gita warns: intention without action is incomplete. Paired with karma (action) and kriya (practice).

2. **Yoga Nidra as Manifestation Technology** — The hypnagogic state reduces prefrontal gating (Datta 2022 EEG: delta increases centrally, decreases prefrontally by 2.713 dB). Sankalpa planted during this window bypasses the inner critic. Planted twice — beginning and deepest point (Stage 7).

3. **Heart-Brain Coherence** — HeartMath's validated finding: sustained positive emotion produces smooth sine-wave HRV (coherence). Coherent state improves cognition, perception, self-regulation via changed afferent heart-to-brain signaling. The "feel as if" instruction has a legitimate physiological mechanism.

4. **Neville Goddard's SATS** — "State Akin To Sleep" targets the same hypnagogic window as Yoga Nidra. Western parallel to an ancient yogic technology. Legitimate mechanism: intention insertion during reduced critical filtering.

### StatCards

- Datta 2022: prefrontal delta **decreased 2.713 dB** during Yoga Nidra (reduced gating)
- HeartMath 2025 RCT: coherence training increased hippocampal volume after 4-5 weeks
- Kozhevnikov 2009: deity visualization monks showed enhanced visuospatial processing

### Videos

1-2 embeds — guided Yoga Nidra with sankalpa, possibly HeartMath coherence intro.

---

## Section 3: The Inner Practice Protocol (Bespoke)

**Component:** Custom JSX — vertical step flow
**Content source:** Nervous system connection research (Regulate → Resource → Intend → Act → Receive)

This is the page's climax. A vertical 5-stage flow showing how all Inner Practice tracks converge into a manifestation protocol.

### Visual Treatment

5 numbered stage cards, connected by vertical lines/arrows. Each card contains:
- Stage number + name
- One-line description
- The neurophysiological "why"
- Linked Inner Practice page(s) that train this capacity
- Small colored pip matching the linked page's accent color (teal, rose, violet, etc.)

### Page Accent Color Lookup (for ProtocolStep link pips)

| Page | Accent Deep | Accent Light | Source File |
|------|-------------|--------------|-------------|
| `/meditate` | `#592E6B` (violet) | `#D7C2EE` | YogaClient.tsx shared palette |
| `/yoga` | `#592E6B` (violet) | `#D7C2EE` | YogaClient.tsx |
| `/fascia` | `#C07A35` (amber) | `#E4AD75` | globals.css `--color-amber-deep` |
| `/breathe` | `#2E7070` (teal) | `#A8DADA` | BreatheClient.tsx `TEAL_DEEP` |
| `/nervous-system` | `#8B3A62` (rose) | `#E8B4CF` | NervousSystemClient.tsx `ROSE_DEEP` |
| `/practice` | `#592E6B` (violet) | `#D7C2EE` | Uses site default violet |

### The 5 Stages

| Stage | Name | Description | Why | Links to |
|-------|------|-------------|-----|----------|
| 1 | **Regulate** | Establish nervous system safety | Sympathetic/dorsal modes suppress prefrontal planning. Can't manifest from dysregulation. | `/breathe`, `/nervous-system` |
| 2 | **Resource** | Build reliable ventral vagal access | Feelings of safety, capacity, connection. HeartMath coherence lives here. | `/nervous-system`, `/yoga` |
| 3 | **Intend** | Plant intention from a regulated state | Sankalpa in Yoga Nidra's hypnagogic window, or WOOP for implementation intentions. | `/meditate`, `/yoga` (Nidra) |
| 4 | **Act** | Aligned action from clarity, not urgency | Implementation intentions fire automatically. Process visualization builds motor pathways. | `/practice` (timer) |
| 5 | **Receive** | Tolerate expansion without contraction | Many self-sabotage at receiving because ANS flags success as threat. | `/fascia` (release), `/nervous-system` |

### Closing Paragraph

Meta-insight: Inner Practice was designed as a manifestation protocol all along. Breathwork regulates, yoga resources, meditation directs attention, fascia releases stored tension, the nervous system is the substrate.

### Cross-Links

Full cross-link bar at bottom linking to all pages + `/practice` timer. Same pattern as `/meditate` and `/fascia`.

---

## Section 4: Honest Boundaries

**Component:** Data-driven `ManifestSection` (minimal variant — clean prose, no stat cards or videos)

### Key Points

1. **Not quantum mechanics** — Quantum observer effects operate at subatomic scale. They do not mean "thoughts create physical reality." Invoking quantum physics is category error.

2. **Not the Law of Attraction** — "Like attracts like" has no empirical support as a universal law. Oettingen proved the opposite: positive fantasy alone reduces goal achievement. What works is specific intention + obstacle awareness + aligned action.

3. **Survivor bias is real** — Every manifestation success story has thousands of identical attempts that failed. The evidence supports manifestation practices improving probability through better self-regulation and planning — not guaranteeing outcomes.

4. **Trauma-informed caveat** — "You can't manifest from a dysregulated nervous system" is not victim-blaming. It's neurophysiology. For people carrying unresolved trauma, somatic work may need to come before intention-setting practices. Regulation is the foundation, not a character flaw to overcome.

No videos or stat cards. Clean prose. A trusted teacher being honest.

---

## Shared Components

### ManifestSection

Renders a data-driven section with:
- Section heading (gold accent, Cormorant Garamond display font)
- Intro paragraph (max-width `780px`, centered)
- Array of key point subsections — rendered as a **vertical list**: bold title in `GOLD_DEEP` with `font-ui` label styling, followed by body text in `font-body` prose. Not cards, not accordions — simple titled paragraphs stacked vertically within the `780px` prose column.
- Optional array of StatCards — rendered in a responsive CSS grid (`repeat(auto-fit, minmax(280px, 1fr))`) **below** the key points, max-width `1100px`
- Optional array of VideoFacade embeds — rendered **after** StatCards, max-width `780px`, one per row
- ScrollReveal wrapping for entrance animation on the entire section

### Existing Components Reused

- `ScrollReveal` — entrance animations (from `src/components/ScrollReveal`)
- `SectionDivider` — between sections (from `src/components/SectionDivider`)
- `VideoFacade` — YouTube embeds with lazy loading (from `src/components/VideoFacade`)

### Local Components (defined inside ManifestClient.tsx)

- `StatCard` — research citation cards. This is a file-local component in the existing codebase (defined privately in yoga and nervous-system pages). Define a new local copy in ManifestClient.tsx with `borderLeft` color set to `GOLD_DEEP` instead of the page's own accent. Same props: `{ source, stat, detail }`.

---

## Data Model

```typescript
interface ManifestPoint {
  id: string;
  title: string;
  body: string;
}

interface ManifestStat {
  source: string;
  stat: string;
  detail: string;
}

interface ManifestVideo {
  id: string;        // YouTube video ID
  title: string;
  description: string;
}

interface ManifestSectionData {
  id: string;
  heading: string;
  intro: string;
  points: ManifestPoint[];
  stats?: ManifestStat[];
  videos?: ManifestVideo[];
}
```

The Protocol section is NOT data-driven — it uses its own `ProtocolStep` interface and bespoke layout.

```typescript
interface ProtocolStep {
  stage: number;
  name: string;
  description: string;
  why: string;
  links: { label: string; href: string; accentColor: string }[];
}
```

---

## Landing Page Updates

Add to the `paths` array in `src/app/page.tsx`:

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
  accentColor: GOLD_LIGHT,
}
```

Also add Practice to the paths array with all required fields including `imageAlt`. Restructure hero from 3+2 to 3+2+2 or 4+3 layout to accommodate 7 paths.

---

## Nav Update

Add "Manifest" to the nav links in `layout.tsx`. Current nav has 7 links + theme toggle. Adding Manifest makes 8 — the mobile horizontal scroll already handles overflow.

---

## Research Sources

All content draws from these Obsidian notes:
- `Claude-Research/wellness/manifestation-goal-science-2026-03.md`
- `Claude-Research/wellness/Manifestation-Contemplative-Practice.md`
- `Claude-Research/wellness/Manifestation-Traditions-Techniques.md`
- `Claude-Research/wellness/Manifestation-Nervous-System.md` (just completed)

Plus the neuroscience agent output (agent `a44ce03`) for salience network, predictive processing, and self-fulfilling prophecy content.
