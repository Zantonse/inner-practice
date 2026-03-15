# HANDOVER — Inner Practice Session 4 Report

**Date:** 2026-03-14
**Branch:** `main`
**Latest commit:** `b7a4e38` (fascial fitness section)
**Repo:** https://github.com/Zantonse/inner-practice
**Live site:** https://inner-practice.vercel.app

---

## 1. Session Summary

Session 4 added AI-generated ambient video accents to three pages using Google Veo 3.1, added two new content sections to the fascia page (Cupping and Fascial Fitness), updated the Veo skill files to use the LiteLLM proxy instead of requiring gcloud CLI, and began deep research for a new Reiki page. The Reiki page is partially researched but not yet built — that's the primary handoff item.

## 2. What Got Done

### Veo Video Accents (designed, generated, integrated, deployed)
- **Design spec:** `docs/superpowers/specs/2026-03-13-veo-video-accents-design.md`
- **Implementation plan:** `docs/superpowers/plans/2026-03-13-veo-video-accents.md`
- **Generated 3 Veo 3.1 videos** via LiteLLM proxy (`POST /videos` endpoint):
  - `public/videos/meditation-loop.mp4` (3.2 MB) — mountain valley mist at golden hour
  - `public/videos/yoga-loop.mp4` (872 KB) — violet/amber light trails in dark space
  - `public/videos/fascia-loop.mp4` (3.3 MB) — translucent connective tissue fibers
- **Processed into seamless loops** using `/video-loop` skill (forward-reverse-crossfade via ffmpeg)
- **Extracted poster frames:** `*-poster.jpg` for each (JPG, not WebP — ffmpeg lacked webp encoder)
- **New component:** `src/components/VideoAccent.tsx` — muted autoplay loop with IntersectionObserver play/pause and `prefers-reduced-motion` support
- **Integrated into 3 pages** (replaced `<SectionDivider />` at specific section transitions):
  - `src/app/meditate/MeditateClient.tsx` — between Foundation and Research sections
  - `src/app/yoga/YogaClient.tsx` — between Passive Styles and Yoga Nidra sections
  - `src/app/fascia/FasciaClient.tsx` — between "Where the Web Gets Stuck" and Science sections

### Cupping Section (fascia page)
- Full new section at `/fascia#cupping` with:
  - Science of decompression (negative pressure, NO release, HO-1 cascade)
  - Compression vs Decompression comparison table (Gua Sha vs Cupping)
  - Self-cupping technique (5-step timeline with silicone cups)
  - 3 research StatCards (Langevin 2006, Abo-Raya 2018, Al-Bedah 2019)
- Added "Cupping" to toolkit accordion (#2) with MFD protocol
- Renumbered toolkit items 1-7, updated nav tabs

### Fascial Fitness Section (fascia page)
- Full new section at `/fascia#fascial-fitness` with:
  - The Catapult Mechanism (elastic recoil, collagen crimp)
  - Muscle vs Fascia Training comparison table
  - Schleip's 4 Principles card grid (elastic recoil, counter-movement, ninja principle, fascial stretching)
  - Morning Rehydration Protocol (5-step timeline)
  - 3 research StatCards (Kawakami 2002, Schleip & Müller 2013, Fascia Research Congress)

### Veo Skill Updates
- Updated `/veo` SKILL.md — Phase 5 and Implementation section now default to LiteLLM proxy workflow
- Updated `/veo-multi-shot` SKILL.md — Phase 6 now shows LiteLLM as preferred generation method
- Both keep Vertex AI/gcloud as documented fallback
- Files are in the plugin cache: `/Users/craigverzosa/.claude/plugins/cache/veo-tools/veo-tools/1.0.0/skills/`

### Reiki Page Research (INCOMPLETE)
- Dispatched 6 parallel research agents across domains
- **3 files completed:**
  - `/tmp/deep-research/history.md` — Usui origins, Japanese lineage, Takata, Gokai, 3 levels
  - `/tmp/deep-research/mechanisms.md` — biofield science, biomagnetics, relaxation response, polyvagal, placebo
  - `/tmp/deep-research/meditation-connection.md` — EEG, parasympathetic activation, co-regulation, body scan overlap
- **3 files NOT written** (agents hit output token limits or WebFetch auth errors):
  - `clinical.md` — clinical evidence, RCTs, systematic reviews
  - `practice.md` — hand positions, self-Reiki protocol, hospital programs
  - `researchers.md` — Shamini Jain, Ann Baldwin, David Feinstein, hospital programs

## 3. What Didn't Work / Bugs Encountered

- **gcloud CLI not installed** — could not use the standard Veo skill setup. Pivoted to LiteLLM proxy which already had `veo-3.1-generate-preview` configured
- **ffmpeg WebP encoder missing** — `brew install ffmpeg` installed a build without libwebp. Used JPG poster frames instead (extracted via ffmpeg → JPG, skipped sips WebP conversion which also failed)
- **ffmpeg 8.x requires `-update 1` flag** — for single-frame extraction, older `-frames:v 1` syntax alone throws an error about missing sequence pattern
- **Reiki research agents hit max_output_tokens** — the clinical, practice, and researchers agents kept trying to write large files but the Write tool content parameter was empty by the time it hit the API (token limit truncation). The agents need to write in smaller chunks
- **WebFetch failing with 401** — subagents couldn't use WebFetch because the LiteLLM key doesn't have `claude-haiku-4-5-20251001` access (WebFetch internally uses haiku)

## 4. Key Decisions Made

- **Video accents as section breaks, not hero backgrounds** — less intrusive, doesn't compete with existing content
- **LiteLLM proxy over gcloud for Veo** — Craig can't install gcloud CLI; the proxy at `llm.atko.ai` already has Veo configured with the standard API key
- **JPG poster frames instead of WebP** — pragmatic fallback; works identically in all browsers
- **Cupping placed between Gua Sha and Toolkit** — they're complementary opposites (compression vs decompression)
- **Fascial Fitness as a full section** — was previously just a toolkit accordion entry; Schleip's 4-principle framework warranted deeper coverage
- **Reiki as a new page** (not a section on an existing page) — it's a distinct modality, warranting its own route at `/reiki`

## 5. Lessons Learned / Gotchas

- **LiteLLM Veo workflow:** `POST /videos` to submit, `GET /v1/videos/{id}` to poll, `GET /v1/videos/{id}/content` to download MP4. Auth header is `Authorization: Bearer ${LITELLM_API_KEY}` for POST, `x-litellm-api-key: ${LITELLM_API_KEY}` for GET. This is saved in mem0.
- **Veo videos can generate in parallel** — all 3 submitted simultaneously and completed within a couple minutes
- **Video-loop script doubles clip duration** — 4s input → ~7.5s seamless loop (forward + reverse - crossfade overlap)
- **WebFetch uses haiku internally** — if the LiteLLM key doesn't include haiku, subagents can't use WebFetch. This blocked 3 of 6 research agents.
- **The fascia page is now very large** (~1800+ lines) — approaching the point where it should be considered for splitting, though it still builds fine

## 6. Current State

- **Build:** Passes cleanly (`npx next build` — all 11 pages static)
- **Deployed:** Live at https://inner-practice.vercel.app (latest deploy includes fascial fitness)
- **Uncommitted changes:** None (all committed). Untracked files are audit screenshots and playwright logs from earlier sessions
- **Branch:** `main`
- **Latest commit:** `b7a4e38` — feat: add Fascial Fitness section to fascia page

## 7. Clear Next Steps

1. **Complete Reiki research** — 3 of 6 domains are done. Need to research or write from training knowledge:
   - Clinical evidence (RCTs, systematic reviews, HRV/cortisol studies, NCCIH position)
   - The practice (12 hand positions, self-Reiki protocol, hospital programs)
   - Key researchers (Shamini Jain, Ann Baldwin, David Feinstein)
   - Available research files are in `/tmp/deep-research/` — read `history.md`, `mechanisms.md`, `meditation-connection.md`
2. **Synthesize research with Gemini** — concat all specialist outputs, run through `research.py` script
3. **Build `/reiki` page** — new route at `src/app/reiki/page.tsx` + `ReikiClient.tsx`
   - Color scheme: warm gold/amber (distinct from existing pages)
   - Sections: History & Lineage, The Science (honest evidence assessment), Proposed Mechanisms, The Practice (hand positions, self-Reiki protocol), Meditation & NS Connections, Cross-links
   - Follow existing page patterns (StatCards, ScrollReveal, SectionDivider, inline styles)
4. **Add Reiki to navigation** — `src/app/layout.tsx` nav links, home page card in `src/app/page.tsx`
5. **Generate hero image for Reiki** — via `/gemini-image-gen` skill
6. **Optional: Convert poster frames to WebP** — install `brew install webp` for `cwebp` tool, or use a Node-based converter

## 8. Important Files Map

| File | Description |
|------|-------------|
| `src/components/VideoAccent.tsx` | New — muted autoplay video with IntersectionObserver play/pause |
| `src/app/meditate/MeditateClient.tsx` | Modified — added VideoAccent between Foundation and Research |
| `src/app/yoga/YogaClient.tsx` | Modified — added VideoAccent between Passive Styles and Yoga Nidra |
| `src/app/fascia/FasciaClient.tsx` | Modified — added VideoAccent, Cupping section, Fascial Fitness section, updated nav/toolkit |
| `public/videos/*.mp4` | 3 Veo-generated seamless loops (meditation, yoga, fascia) |
| `public/videos/*-poster.jpg` | 3 poster frames for video loading states |
| `docs/superpowers/specs/2026-03-13-veo-video-accents-design.md` | Design spec for video accents |
| `docs/superpowers/plans/2026-03-13-veo-video-accents.md` | Implementation plan for video accents |
| `/tmp/deep-research/history.md` | Reiki history research (COMPLETE) |
| `/tmp/deep-research/mechanisms.md` | Reiki mechanisms research (COMPLETE) |
| `/tmp/deep-research/meditation-connection.md` | Reiki-meditation connections research (COMPLETE) |
| `/tmp/deep-research/clinical.md` | Reiki clinical evidence (NOT WRITTEN — needs redo) |
| `/tmp/deep-research/practice.md` | Reiki practice protocol (NOT WRITTEN — needs redo) |
| `/tmp/deep-research/researchers.md` | Reiki key researchers (NOT WRITTEN — needs redo) |
| `src/app/layout.tsx` | Global nav — Reiki link needs to be added here |
| `src/app/page.tsx` | Home page — Reiki card needs to be added to the paths array |
