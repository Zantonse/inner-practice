# Qigong Page — Design Spec

**Date:** 2026-03-16
**Route:** `/qigong`
**Status:** Approved

---

## Overview

A new content page for the Inner Practice site covering qigong — the ancient Chinese energy cultivation practice combining slow flowing movement, deep breathing, and meditation. The centerpiece is a detailed Forms Guide presenting Ba Duan Jin, Zhan Zhuang, Wu Qin Xi, Yi Jin Jing, and Liu Zi Jue with movements, benefits, and evidence levels. The page follows the established content page pattern and adds 4 qigong exercises to the practice page.

## Research Source

Full research brief: `~/Documents/ObsidianNotes/Claude-Research/wellness/qigong-research-2026-03.md` (617 lines, synthesized from 6 specialist domains).

---

## Files to Create / Modify

### New Files

| File | Purpose |
|------|---------|
| `src/app/qigong/page.tsx` | Server component. Sets `<Metadata>`. Renders `<QigongClient>`. |
| `src/app/qigong/QigongClient.tsx` | `'use client'` component. All page JSX and interactivity. |

### Modified Files

| File | Change |
|------|--------|
| `src/app/layout.tsx` | Add `<Link href="/qigong">Qigong</Link>` between Sleep and Practice. |
| `src/app/practice/types.ts` | Add `'qigong'` to `Modality` union and `MODALITY_META`. |
| `src/app/practice/exercises.ts` | Add 4 qigong exercises. |

---

## Design Tokens

```
Accent primary:    #2D6B4F  (jade green)
Accent light:      #A8D5BA  (card borders, pill backgrounds)
Accent pale:       #E6F4EC  (light fills, active states)
```

Dark mode: lighten accent for text, darken surfaces — follow existing pattern.

Note: `JADE_MID` (`#A8D5BA`) is a **component-local constant** used inside `QigongClient.tsx` for borders and separator styling. It is NOT a `MODALITY_META` field — `MODALITY_META` only uses `deep` and `pale`.

---

## Page Structure

### 1. Hero Section

- Gradient: oklch jade green gradient (match existing hero pattern, e.g., `linear-gradient(160deg, oklch(35% 0.10 160), oklch(50% 0.12 145))`)
- Floating animated orb (`.breathe` class), radial gradient with `${JADE_PALE}30`
- Eyebrow: `QIGONG` (font-ui, uppercase, 0.6875rem)
- h1: `The Art of Moving Stillness` (Cormorant Garamond, `var(--text-hero)`)
- Lead paragraph: Qigong is where slow movement, breath, and intention converge — a 3,000-year-old practice that hydrates fascia, activates the vagus nerve, and trains the nervous system through the simplest of gestures. Every practice on this site finds expression in qigong.
- In-page anchor nav row with explicit ID mapping:

| Nav Label | `href` | Section |
|-----------|--------|---------|
| History | `#history` | What Qigong Is |
| Science | `#science` | The Science of Slow Movement |
| Forms | `#forms` | The Forms (centerpiece) |
| Qi | `#qi` | Qi Through a Scientific Lens |
| Nervous System | `#nervous-system` | Qigong & Your Nervous System |
| Evidence | `#evidence` | Clinical Evidence |
| 90 Days | `#protocol` | Your First 90 Days |
| Practice | `#practice` | Now, practice. (videos) |
- Hero: gradient-only (like ReikiClient/SleepClient pattern) with animated orb — no `<img>`.

### 2. What Qigong Is (`id="history"`)

Two-column auto-fit grid (`minmax(min(100%, 440px), 1fr)`).

**Left column (ScrollReveal):**
- Eyebrow: `3,000 YEARS OF CULTIVATION`
- h2: `What Qigong Is`
- Mawangdui Daoyin Tu (168 BCE) — oldest illustrated exercise manual
- Three philosophical streams: Daoist (yangsheng, Wudang), Buddhist (Shaolin, Yi Jin Jing), Medical (Huangdi Neijing, meridian theory)
- Cultural Revolution suppression → 1980s Qigong Fever → modern standardization

**Right column (ScrollReveal):**
- The Three Treasures: jing (essence), qi (vital energy), shen (spirit)
- The three elements every form shares: movement (or stillness) + breath + intention (yi)
- Modern spectrum: health/medical, martial, spiritual, fitness
- Note: The term "qigong" itself is modern (1950s, Liu Guizhen) — the practices are ancient

### 3. SectionDivider

### 4. The Science of Slow Movement (`id="science"`)

**Eyebrow:** `WHY SLOWNESS HEALS`
**h2:** `The Science of Slow Movement`

**Intro prose (ScrollReveal):**
- Fascia as thixotropic gel — becomes fluid under gentle load, rigid when immobile (Schleip 2012)
- The "sponge squeeze" mechanism: slow oscillatory movements hydrate fascia more effectively than static stretching
- Piezoelectric signaling: collagen generates electrical charges when deformed (Fukada & Yasuda 1957); meridians correspond to fascial planes (Langevin 2006)
- Proprioceptive refinement: Ruffini endings respond to sustained gentle stretching → lowers sympathetic activity (Schleip 2003)
- Interoceptive training: "sensing qi" = training interoception → anterior insular cortex → emotional regulation (Craig 2003, 2009)

**StatCards (3-card grid):**

| Source | Stat | Detail |
|--------|------|--------|
| Zou et al., J Am Geriatrics Soc, 2018 | 43% | Reduction in fall rates — qigong/tai chi vs controls (22 RCTs, 2,349 participants) |
| Wei et al., PLoS ONE, 2013 | Thicker cortex | Increased cortical thickness in right insula and left somatosensory cortex in long-term practitioners |
| Schleip, 2012 | 2-3× | Fascia hydration from slow oscillatory movement vs static stretching |

### 5. SectionDivider flip

### 6. The Forms (`id="forms"`) — CENTERPIECE

**Eyebrow:** `YOUR PRACTICE MENU`
**h2:** `The Forms`

**Intro:** Brief note that qigong has thousands of forms. These five are the most researched and accessible, standardized by the Chinese Health Qigong Association.

**5 form cards** — each as a full-width card with jade green left border:

**Ba Duan Jin (八段锦, Eight Pieces of Brocade)**
- Origin: Song Dynasty (~12th century)
- Time: 12-15 minutes
- Movements: List all 8 (Two Hands Hold Up Heavens, Drawing the Bow, Separating Heaven and Earth, Wise Owl Gazes Backward, Swaying Head and Wagging Tail, Two Hands Hold the Feet, Thrusting the Fists, Bouncing on the Toes)
- Benefits: Most researched form. Cancer fatigue (Zou 2018, 9 RCTs), lipid profiles (An 2015), depression (d=0.64, Xiao & Zhuang 2016), knee OA (Zheng 2015)
- Evidence pill: "Strong"
- Best for pill: "Beginners, daily practice, rehabilitation"

**Zhan Zhuang (站桩, Standing Like a Tree)**
- Origin: Ancient Daoist internal cultivation
- Time: 5-40 minutes
- Description: Static posture — slightly bent knees, arms rounded as if holding a large ball. Isometric muscle engagement + slow breathing + meditative stillness.
- Benefits: Fascia hydration via prolonged static load with micro-movements. Increased RMSSD and HF-HRV vs seated rest (Lam 2016). Deep meditative states.
- Evidence pill: "Moderate"
- Best for pill: "Meditation practitioners, stress/anxiety, advanced practice"

**Wu Qin Xi (五禽戲, Five Animal Frolics)**
- Origin: Attributed to physician Hua Tuo (~2nd century CE)
- Time: 20-25 minutes
- Animals: Tiger (power, bone), Deer (grace, spine), Bear (grounding, digestion), Monkey (agility, mental sharpness), Crane (balance, lungs)
- Benefits: Lumbar spine bone mineral density in postmenopausal women (Wang 2016). Engages creativity and play.
- Evidence pill: "Moderate"
- Best for pill: "Variety seekers, bone health, playful movement"

**Yi Jin Jing (易筋經, Muscle-Tendon Change Classic)**
- Origin: Traditionally Shaolin Temple, ~17th century text
- Time: 20-30 minutes
- Description: 12 movements emphasizing tendon and fascia conditioning through sustained stretches with muscular engagement. More physically demanding than Ba Duan Jin.
- Benefits: Grip strength, trunk flexibility, balance (Ye 2014). Bone mineral density (Lu 2013). Aligns with Schleip's collagen remodeling timeline (6-24 months).
- Evidence pill: "Low-Moderate"
- Best for pill: "Experienced practitioners, fascia focus, strength"

**Liu Zi Jue (六字訣, Six Healing Sounds)**
- Origin: Tang Dynasty medical texts
- Time: 10-15 minutes
- Description: Six exhalation sounds (Xu, He, Hu, Si, Chui, Xi) each directed at a specific organ system. Extended exhale activates vagus nerve; vibrations stimulate laryngeal/pharyngeal vagal afferents.
- Benefits: Respiratory function, vagal stimulation similar to Bhramari humming. Connects to sound healing page.
- Evidence pill: "Low-Moderate"
- Best for pill: "Sound healing practitioners, respiratory focus"

**Moving vs Still comparison table below the forms:**

| Dimension | Moving Qigong | Still Qigong (Zhan Zhuang) |
|-----------|--------------|---------------------------|
| Primary benefit | Fascia hydration, balance, proprioception | Deep parasympathetic states, meditative depth |
| Breathing | Coordinated with movement | Independent, very slow |
| HRV effect | Moderate increase | Stronger increase |
| Accessibility | High — modifiable for seated | Moderate — standing can be challenging |
| Time | 15-30 min per form | 10-40 min per session |
| Best for | Beginners, mobility-limited, rehabilitation | Experienced practitioners, stress/anxiety |

### 7. SectionDivider

### 8. Qi Through a Scientific Lens (`id="qi"`)

**Eyebrow:** `THE HONEST QUESTION`
**h2:** `Qi Through a Scientific Lens`

**Two-column:**
- Left: Scientific translations — metabolic qi (ATP/mitochondria), defensive qi (immune function), organ qi (functional activity), meridian qi (interoceptive sensations: warmth, tingling, heaviness = vasodilation + fascial mechanoreception + interoception)
- Right: Biofield measurements — infrared emission (Seto 1992, palm temp +1-4°C, explained by vasodilation), biophoton studies (Van Wijk 2005, controversial), SQUID magnetometer (Zimmerman 1990, 0.3-1.0 milligauss)

**Honest assessment callout (amber `#E4AD75` border):**
"Qigong works through well-understood physiological mechanisms — slow breathing (vagal activation), gentle movement (fascia hydration, proprioception), meditative attention (cortical changes, stress reduction), and social engagement (group practice). Whether qi represents an additional phenomenon beyond these mechanisms is an open question that current instrumentation cannot resolve. The practices are effective regardless of which explanatory framework you prefer."

**Evidence table:**

| Claim | Evidence Level |
|-------|---------------|
| Qigong produces measurable physiological changes (HR, BP, cortisol, HRV) | Established |
| Practitioners emit increased infrared during practice | Well-supported (explained by vasodilation) |
| Qi can be transmitted from practitioner to patient | Very Low — no blinded study has isolated this |
| Meridians correspond to fascial planes | Plausible (Langevin imaging) |
| Biophoton emission differs in practitioners | Low — methodological concerns |

### 9. Qigong & Your Nervous System (`id="nervous-system"`)

**Eyebrow:** `YOUR MOVING MEDITATION`
**h2:** `Qigong & Your Nervous System`

**Two-column:**
- Left: HRV meta-analysis (Chang 2020: HF-HRV d=0.45, LF/HF d=0.38, stronger with >12 weeks). The breathing component — diaphragmatic, slow (4-8 bpm), nasal, coordinated with movement — falls in resonance frequency range. Overnight HRV carryover (Park 2017: Baduanjin → improved nocturnal HRV).
- Right: Polyvagal framing — ventral vagal (group practice, mirroring teacher), sympathetic down-regulation (slow movement, stable temp), dorsal vagal access (Zhan Zhuang deep stillness). Cortisol -23% (Wang 2014). BP -12.1/-8.5 mmHg (Lee 2007, comparable to medication).

**StatCards:** HRV d=0.45, Cortisol -23%, BP -12.1/-8.5

### 10. SectionDivider flip

### 11. Clinical Evidence (`id="evidence"`)

**Eyebrow:** `WHAT THE RESEARCH SHOWS`
**h2:** `Clinical Evidence by Condition`

**6 condition cards (auto-fit grid):**

Each card: condition name (h3), key finding (bold stat), source, evidence pill.

1. **Chronic Pain** — d=0.43 (Lauche 2013, 12 RCTs). Wang 2010 NEJM for fibromyalgia. Evidence: Moderate.
2. **Anxiety & Depression** — d=0.52 anxiety, d=0.42 depression (Wang 2014). Evidence: Moderate.
3. **Hypertension** — -12.1/-8.5 mmHg (Lee 2007). Dose-dependent, stronger >12 weeks. Evidence: Strong.
4. **Cancer-Related Fatigue** — d=0.53, improved QoL (Zeng 2014, 13 RCTs). Evidence: Moderate.
5. **COPD** — +35m 6-min walk, +0.19L FEV1 (Liu 2015). Evidence: Moderate.
6. **Cognitive Function** — Improved executive function (Wayne 2014). MCI improvement (Zheng 2015). Evidence: Low-Moderate.

**Dose callout:** Minimum effective: 2-3×/week, 30 min, 8+ weeks. Optimal: daily 20-30 min. Subjective benefits: 2-4 weeks. Objective markers: 8-12 weeks. Fascia remodeling: 6-24 months. Benefits diminish 4-8 weeks after stopping.

### 12. Your First 90 Days (`id="protocol"`)

**Eyebrow:** `YOUR PATH INTO PRACTICE`
**h2:** `Your First 90 Days`

**Timeline (`.timeline` with `.timeline-node`):**

1. **Weeks 1-4: Foundation** — Learn 3-4 Ba Duan Jin movements (1, 2, 3, 8). 10-15 min daily. Focus: coordinated breathing, relaxed shoulders, grounded feet. Add 2-3 min Zhan Zhuang at the end.
2. **Weeks 5-8: Expansion** — Learn all 8 Ba Duan Jin movements. 15-20 min daily. Increase Zhan Zhuang to 5 min. Begin noticing internal sensations without grasping.
3. **Weeks 9+: Deepening** — Full Ba Duan Jin (12-15 min) + Zhan Zhuang (10-20 min). Optionally add Wu Qin Xi or Yi Jin Jing. Practice outdoors. Consider group practice for co-regulation.

**Contraindications callout (rose border):** Acute joint/spinal injury (use seated forms), severe osteoporosis (avoid deep knee bends), active psychosis (rare), "qigong deviation" (culture-bound, treatable with grounding), dizziness during Zhan Zhuang (start with 2-3 min holds).

### 13. "Now, practice." Section

Replicate separator from SleepClient but remap to jade green:
- Container: `JADE_DEEP` (`#2D6B4F`)
- Divider lines: `rgba(168,213,186,0.3)` (JADE_MID at 30%)
- Text: `JADE_MID` (`#A8D5BA`)

Pill tabs: Ba Duan Jin | Zhan Zhuang | General Qigong
VideoFacade embeds for guided qigong sessions.

### 14. Cross-Links Footer

"Qigong connects to everything" heading.

Link cards:
- `/fascia` — "Slow movement hydrates the fascial network"
- `/breathe` — "Qigong breathing operates at resonance frequency"
- `/nervous-system` — "Every form regulates the autonomic nervous system"
- `/meditate` — "Zhan Zhuang is standing meditation"
- `/somatics` — "Interoceptive training through movement"
- `/sleep` — "Evening qigong as part of the wind-down"

Closing blockquote.

---

## Practice Page Integration

### New Modality

In `types.ts`:
```ts
// Add to Modality union:
| 'qigong'

// Add to MODALITY_META:
qigong: { label: 'Qigong', deep: '#2D6B4F', pale: '#E6F4EC' },
```

### New Exercises

**1. Ba Duan Jin (Eight Brocades)**
- `id`: `'ba-duan-jin'`
- `name`: `'Ba Duan Jin (Eight Brocades)'`
- `modality`: `'qigong'`
- `type`: `'reference'`
- `level`: `'beginner'`
- `duration`: `'12–15 min'`
- `defaultMinutes`: 15
- `learnMorePath`: `'/qigong#forms'`
- `description`: The most researched qigong form. Eight standing movements targeting the whole body — spine, shoulders, hips, legs, and internal organs. Takes 12-15 minutes for a complete round.
- `instructions`: ['Stand with feet shoulder-width apart, knees slightly bent, arms relaxed.', 'Move through each of the eight movements slowly, coordinating breath with motion.', 'Inhale during expansion/rising movements. Exhale during contraction/sinking.', 'Repeat each movement 6-8 times before transitioning to the next.', 'Maintain soft focus and relaxed shoulders throughout.', 'End with 1-2 minutes of still standing, hands at lower abdomen.']

**2. Zhan Zhuang (Standing Meditation)**
- `id`: `'zhan-zhuang'`
- `name`: `'Zhan Zhuang (Standing Meditation)'`
- `modality`: `'qigong'`
- `type`: `'reference'`
- `level`: `'beginner'`
- `duration`: `'10–20 min'`
- `defaultMinutes`: 15
- `learnMorePath`: `'/qigong#forms'`
- `description`: Stand like a tree — the internal counterpart to moving qigong. Isometric muscle engagement meets meditative stillness. Builds deep parasympathetic states while strengthening legs and core.
- `instructions`: ['Stand with feet shoulder-width apart, knees slightly bent (never locked).', 'Raise arms as if holding a large ball at chest height. Elbows below shoulders, fingers pointing toward each other.', 'Relax shoulders down. Tuck chin slightly. Breathe slowly through the nose.', 'When legs tremble or burn, breathe into the sensation rather than fighting it.', 'Start with 5 minutes. Add 1-2 minutes per week as comfort allows.', 'End by slowly lowering arms and standing still for 30 seconds.']

**3. Five Animal Frolics (Wu Qin Xi)**
- `id`: `'wu-qin-xi'`
- `name`: `'Five Animal Frolics (Wu Qin Xi)'`
- `modality`: `'qigong'`
- `type`: `'reference'`
- `level`: `'intermediate'`
- `duration`: `'20–25 min'`
- `defaultMinutes`: 20
- `learnMorePath`: `'/qigong#forms'`
- `description`: Imitate the movements of tiger, deer, bear, monkey, and crane. Each animal cultivates a different quality — from power and grounding to agility and lightness.
- `instructions`: ['Begin with 2-3 minutes of gentle warm-up movement.', 'Tiger: Strong, gripping movements emphasizing bone and tendon strength.', 'Deer: Graceful turns and stretches for spinal flexibility.', 'Bear: Heavy, grounded swaying for stability and digestive function.', 'Monkey: Quick, playful movements for agility and mental sharpness.', 'Crane: Balanced, light movements for poise and respiratory function.', 'Perform each animal sequence for 3-4 minutes before transitioning.']

**4. Six Healing Sounds (Liu Zi Jue)**
- `id`: `'liu-zi-jue'`
- `name`: `'Six Healing Sounds (Liu Zi Jue)'`
- `modality`: `'qigong'`
- `type`: `'structured'`
- `level`: `'beginner'`
- `duration`: `'10–15 min'`
- `defaultMinutes`: 10
- `learnMorePath`: `'/qigong#forms'`
- `description`: Six exhalation sounds each directed at a specific organ system. The extended exhale activates the vagus nerve while vibrations stimulate vagal afferents in the throat — similar to Bhramari humming.
- `phases`: `[{ label: 'Xu (Liver)', duration: 10 }, { label: 'He (Heart)', duration: 10 }, { label: 'Hu (Spleen)', duration: 10 }, { label: 'Si (Lungs)', duration: 10 }, { label: 'Chui (Kidneys)', duration: 10 }, { label: 'Xi (Triple Burner)', duration: 10 }]`
- `defaultCycles`: 6
- `defaultRounds`: 1

Note: `liu-zi-jue` intentionally has both `phases` (for phase-driven timer) and `defaultMinutes` (for flat-duration fallback), matching the pattern used by sleep exercises like `evening-4-7-8`.

---

## Navigation Change

In `src/app/layout.tsx`, locate the closing `</Link>` for the Sleep nav link and insert immediately after, before `<Link href="/practice">`:

```tsx
              <Link
                href="/qigong"
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
                Qigong
              </Link>
```

---

## Out of Scope

- No new shared components
- No new CSS classes in globals.css
- No hero image generation
- No video asset creation (VideoFacade embeds only)
- No changes to Practice page UI components
