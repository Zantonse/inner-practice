# HANDOVER — Inner Practice Session 4 (Final)

**Date:** 2026-03-15
**Branch:** `main`
**Latest commit:** `7f512b3` (cross-links for sound healing + somatics)
**Repo:** https://github.com/Zantonse/inner-practice
**Live site:** https://inner-practice.vercel.app

---

## Session Summary

Massive session. Built 3 new pages (Reiki, Sound Healing, Somatics), added Veo video accents to 4 pages, added Cupping + Fascial Fitness + Hip Opening sections, updated all cross-links twice, and completed deep research for a Reiki learning curriculum. The site grew from 7 content pages to 10.

## Current Site (14 routes)

| Route | Color | Key Content |
|-------|-------|-------------|
| `/` | — | Home page, 5+5 grid |
| `/meditate` | Violet | Types, videos, research + video accent |
| `/yoga` | Violet | Active/passive styles, Yoga Nidra, **hip opening (NEW)**, NS connection + video accent |
| `/fascia` | Amber | Anatomy, gua sha, **cupping (NEW)**, **fascial fitness (NEW)**, toolkit, secrets + video accent |
| `/breathe` | Teal | 14 techniques |
| `/nervous-system` | Rose | Polyvagal, vagus nerve, HRV |
| `/reiki` | Gold | **NEW** — History, science, practice, **learning curriculum**, meditation connection + video accent |
| `/sound-healing` | Amber | **NEW** — Vibration science, instruments, Nada yoga, sound baths, practice + video accent |
| `/somatics` | Indigo/teal | **NEW** — SE, TRE, Feldenkrais, Alexander, Rolfing, self-practices + video accent |
| `/manifest` | Gold | WOOP, visualization, intention science |
| `/practice` | Violet | Timer with reducer, PracticeBuilderTab with 8 templates |

## Pending: Practice Page Transformation (BRAINSTORMING IN PROGRESS)

Craig wants two things brainstormed and designed:

### 1. Practice Page → Comprehensive Exercise Guide

The current `/practice` page is a timer with templates. Craig wants it transformed into a **"do it" page** — actual guided exercises with step-by-step instructions, timing, and sequences that someone can follow now that they've read and learned about each topic. Think of it as the convergence point: everything taught on the other pages becomes actionable here.

Content to draw from (all already on the site):
- **Meditation**: Gassho, body scan, Vipassana, loving-kindness (from /meditate)
- **Yoga**: Sun salutations, hip opening sequence (from /yoga)
- **Fascia**: Foam rolling protocol, fascial fitness morning routine, self-gua sha, self-cupping (from /fascia)
- **Breathwork**: Box breathing, Wim Hof, physiological sigh, Bhramari (from /breathe)
- **Nervous System**: Vagal toning exercises, cold exposure protocol (from /nervous-system)
- **Reiki**: Self-Reiki 8-position protocol, Hatsurei Ho, Gassho meditation (from /reiki)
- **Sound Healing**: Bhramari, Om chanting, sound bath (from /sound-healing)
- **Somatics**: TRE wall sit, constructive rest, Voo sound, orienting, containment (from /somatics)

### 2. Teacher Training Path

Craig wants to learn as many of these modalities as possible and become a teacher. He needs a cohesive path that recognizes these all connect through the nervous system and fascia. This could be:
- A curriculum page or section showing the learning order
- Certification paths for each modality
- How to combine them into a unified teaching practice
- The underlying framework (everything is nervous system regulation + fascial health)

### Design Approach Needed

Start the next session with:
```
pick up from the handover - brainstorm the practice page transformation and teacher training path
```

The brainstorming skill was invoked but needs to run through its full process:
1. Explore the current practice page (`src/app/practice/PracticeClient.tsx` + `PracticeBuilderTab.tsx`)
2. Ask clarifying questions about what exercises Craig wants
3. Propose 2-3 approaches for the page structure
4. Design the teacher training path
5. Write the spec

## What Got Done This Session

### New Pages Built
- **Reiki** (`/reiki`) — 700+ lines, history, science, practice, learning curriculum, Japanese techniques
- **Sound Healing** (`/sound-healing`) — Vibration science, 6 instruments, Nada yoga, daily protocol
- **Somatics** (`/somatics`) — SE, TRE, Feldenkrais, Alexander, Rolfing, 5 self-practices

### New Sections Added
- **Cupping** on fascia page (compression vs decompression, self-cupping protocol)
- **Fascial Fitness** on fascia page (Schleip's 4 principles, morning rehydration)
- **Hip Opening** on yoga page (12 poses, 20-min sequence, emotional release)
- **Learn Reiki** on reiki page (Level 1/2 curricula, Japanese techniques, daily practice, books)

### Video Accents
- 4 Veo-generated videos via LiteLLM proxy (meditation, yoga, fascia + reiki, sound healing, somatics)
- All processed into seamless loops with ffmpeg
- `VideoAccent` component with IntersectionObserver play/pause

### Infrastructure
- Updated `/veo` and `/veo-multi-shot` skills to use LiteLLM proxy
- ffmpeg installed via Homebrew
- All cross-links updated (every page links to every other page)
- Saved LiteLLM Veo workflow to mem0

## Key Files

| File | Lines | Description |
|------|-------|-------------|
| `src/app/practice/PracticeClient.tsx` | ~600 | Timer with reducer state machine — TO BE REDESIGNED |
| `src/app/practice/PracticeBuilderTab.tsx` | ~400 | Routine builder with 8 templates — TO BE REDESIGNED |
| `src/app/reiki/ReikiClient.tsx` | ~900 | Reiki page with learning section |
| `src/app/fascia/FasciaClient.tsx` | ~2300 | Largest page (cupping + fascial fitness additions) |
| `src/app/yoga/YogaClient.tsx` | ~500 | Yoga page with hip opening |
| `src/app/sound-healing/SoundHealingClient.tsx` | ~250 | Sound healing page |
| `src/app/somatics/SomaticsClient.tsx` | ~300 | Somatics page |
| `src/components/VideoAccent.tsx` | ~70 | Video accent component |
| `public/videos/*.mp4` | 7 files | Veo-generated seamless loops |

## Lessons Learned

- LiteLLM Veo workflow: POST /videos, GET /v1/videos/{id}, GET /v1/videos/{id}/content
- WebFetch fails for subagents because it uses haiku internally — need model alias in LiteLLM
- ffmpeg 8.x needs `-update 1` for single frame extraction
- Brew ffmpeg lacks webp encoder — use JPG posters instead
- Veo videos generate in parallel and complete in ~30-60 seconds
- video-loop script doubles clip duration (4s → 7.5s)
