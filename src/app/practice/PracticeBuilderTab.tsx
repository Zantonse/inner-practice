'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

const GOLD_DEEP = '#7A5A1E';
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
  onStartPreset?: (exerciseId: string, minutes: number) => void;
}

function getTotalMinutes(blocks: RoutineBlock[]): number {
  return blocks.reduce((sum, b) => sum + b.practices.reduce((s, p) => s + p.duration, 0), 0);
}

const TEMPLATES: RoutineTemplate[] = [
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
            { id: 'rw-q-1', title: 'Coherent Breathing', duration: 6, description: 'Five and a half seconds in, five and a half seconds out. Brings heart rate variability into coherence and shifts the nervous system toward ventral vagal.', why: 'Regulate: establish nervous system safety before the workday begins.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
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
            { id: 'rw-s-1', title: 'Coherent Breathing', duration: 6, description: 'Five and a half seconds in, five and a half seconds out. Brings HRV into coherence.', why: 'Regulate: shift the ANS toward safety.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
            { id: 'rw-s-2', title: 'Seated Meditation', duration: 10, description: 'Open monitoring or focused attention. Sit comfortably, observe without engaging.', why: 'Resource: build attentional capacity for the day ahead.', timerPreset: 'med-breath', pageLink: '/meditate' },
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
            { id: 'rw-d-1', title: 'Coherent Breathing', duration: 11, description: 'Extended coherence session. Five and a half seconds in, five and a half seconds out. Feel the shift from sympathetic to ventral vagal.', why: 'Regulate: deep nervous system reset.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
            { id: 'rw-d-2', title: 'Seated Meditation', duration: 20, description: 'Open monitoring meditation. Observe thoughts, sensations, and sounds without engaging.', why: 'Resource: build the sustained attention that supports clarity throughout the day.', timerPreset: 'med-breath', pageLink: '/meditate' },
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
  },
  {
    id: 'office-commute',
    name: 'Office / Commute Day',
    icon: '🏢',
    description: 'A practice that fits around commuting and office hours.',
    tiers: {
      quick: [
        {
          time: 'morning', label: 'Morning — Regulate',
          practices: [
            { id: 'oc-q-1', title: 'Box Breathing', duration: 5, description: 'Inhale 4 counts, hold 4, exhale 4, hold 4. Commute-friendly — no mat required. Can be done in transit or before leaving home.', why: 'Regulate: shift out of morning rush sympathetic activation before the workday begins.', timerPreset: 'breath-box', pageLink: '/breathe' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Intend',
          practices: [
            { id: 'oc-q-2', title: 'Seated Meditation', duration: 10, description: 'Sit comfortably. Observe breath, thoughts, and sensations without engaging. Let the day settle.', why: 'Intend: create a clean transition from work mind to home mind.', timerPreset: 'med-breath', pageLink: '/meditate' },
          ],
        },
      ],
      standard: [
        {
          time: 'morning', label: 'Morning — Regulate',
          practices: [
            { id: 'oc-s-1', title: 'Box Breathing', duration: 5, description: 'Inhale 4, hold 4, exhale 4, hold 4. Equal-ratio breathing activates the parasympathetic without requiring a reclining position.', why: 'Regulate: establish calm coherence before commuting.', timerPreset: 'breath-box', pageLink: '/breathe' },
            { id: 'oc-s-2', title: 'Physiological Sighs', duration: 5, description: 'Double inhale through the nose, long exhale through the mouth. The fastest known method to offload CO2 and reduce acute anxiety.', why: 'Regulate: rapidly discharge residual stress before heading into a social environment.', timerPreset: 'breath-sigh', pageLink: '/breathe' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Resource',
          practices: [
            { id: 'oc-s-3', title: 'Desk Fascia Release', duration: 5, description: 'Neck rolls, shoulder shrugs, wrist circles, and chest opener at your desk. Target the forward-head and rounded-shoulder pattern from screen time.', why: 'Resource: prevent the cumulative fascial loading that becomes chronic tension by end of week.', pageLink: '/fascia' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Intend',
          practices: [
            { id: 'oc-s-4', title: 'Seated Meditation', duration: 15, description: 'Open monitoring. Sit for 15 minutes and let the office residue dissolve. No technique required — simply witness.', why: 'Intend: clear the cognitive and emotional residue of the workday.', timerPreset: 'med-breath', pageLink: '/meditate' },
          ],
        },
      ],
      deep: [
        {
          time: 'morning', label: 'Morning — Regulate',
          practices: [
            { id: 'oc-d-1', title: 'Box Breathing', duration: 10, description: 'Extended box breathing session. Equal-ratio 4-4-4-4 for nervous system coherence. Extend to 5-5-5-5 as it becomes comfortable.', why: 'Regulate: a full 10 minutes of box breathing measurably reduces cortisol and heart rate.', timerPreset: 'breath-box', pageLink: '/breathe' },
            { id: 'oc-d-2', title: 'Seated Meditation', duration: 10, description: 'Focused attention on breath. When the mind wanders, note it and return. This noticing-and-returning is the training.', why: 'Resource: 10 minutes of focused attention improves sustained concentration for 2-3 hours post-practice.', timerPreset: 'med-breath', pageLink: '/meditate' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Resource',
          practices: [
            { id: 'oc-d-3', title: 'Desk Fascia — Full Protocol', duration: 10, description: 'Comprehensive desk release: neck, shoulders, chest, wrists, and hip flexors. Use door frame for chest opener. 90-second holds per area.', why: 'Resource: sustained holds of 90 seconds begin to remodel fascia rather than simply stretching muscle.', pageLink: '/fascia' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Intend & Receive',
          practices: [
            { id: 'oc-d-4', title: 'Seated Meditation', duration: 20, description: 'Open monitoring for 20 minutes. Allow the full day to be witnessed — the wins, the friction, the unfinished threads. No fixing required.', why: 'Intend: deep witnessing creates the internal space where new intentions can be planted.', timerPreset: 'med-breath', pageLink: '/meditate' },
            { id: 'oc-d-5', title: '4-7-8 Breathing', duration: 5, description: 'Inhale 4, hold 7, exhale 8. The extended exhale activates the dorsal vagal brake and prepares the nervous system for deep rest.', why: 'Receive: signal the body that the workday is fully complete. Permission to stop.', timerPreset: 'breath-478', pageLink: '/breathe' },
          ],
        },
      ],
    },
  },
  {
    id: 'weekend-recovery',
    name: 'Weekend Recovery',
    icon: '🌿',
    description: 'Deep restoration when you have space and time.',
    tiers: {
      quick: [
        {
          time: 'morning', label: 'Morning — Resource',
          practices: [
            { id: 'wr-q-1', title: 'Coherent Breathing', duration: 11, description: 'Five and a half seconds in, five and a half seconds out. The weekend gives you time to fully arrive in the practice. Let the coherence deepen.', why: 'Resource: longer coherence sessions build cumulative HRV resilience over the week.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'wr-q-2', title: 'Yoga Nidra', duration: 10, description: 'Lie down. Guided body scan and rotation of consciousness. Let the week dissolve layer by layer.', why: 'Receive: Yoga Nidra promotes deep parasympathetic rest and is widely used for nervous system recovery, though it is not a substitute for actual sleep.', pageLink: '/yoga' },
          ],
        },
      ],
      standard: [
        {
          time: 'morning', label: 'Morning — Resource',
          practices: [
            { id: 'wr-s-1', title: 'Coherent Breathing', duration: 11, description: 'Five and a half seconds in, five and a half seconds out. Extended morning coherence session.', why: 'Resource: build the HRV baseline that buffers stress throughout the coming week.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
            { id: 'wr-s-2', title: 'Yoga Flow', duration: 15, description: 'Sun salutations and standing poses. Move with breath, not against it. The weekend gives you time to stay in poses and feel the tissue respond.', why: 'Resource: fluid movement flushes metabolic waste from connective tissue loaded during the week.', pageLink: '/yoga' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Resource',
          practices: [
            { id: 'wr-s-3', title: 'Fascia Deep Session', duration: 10, description: 'Foam roller on thoracic spine, gua sha on neck and shoulders. 2-3 minute holds in areas of density. Let gravity do the work.', why: 'Resource: the weekend is when fascial remodeling sessions are possible — they require time and absence of urgency.', pageLink: '/fascia' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'wr-s-4', title: 'Yoga Nidra', duration: 20, description: 'Full guided Nidra. Complete rotation of consciousness through the body, visualization, and sankalpa. Allow yourself to be received.', why: 'Receive: the 20-minute format reaches the deepest hypnagogic states where genuine replenishment occurs.', pageLink: '/yoga' },
          ],
        },
      ],
      deep: [
        {
          time: 'morning', label: 'Morning — Resource',
          practices: [
            { id: 'wr-d-1', title: 'Coherent Breathing', duration: 15, description: 'Fifteen minutes of heart coherence. The first five minutes shift the system; the next ten restructure it. Stay through any restlessness.', why: 'Resource: extended coherence sessions create measurable shifts in autonomic tone that persist for days.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
            { id: 'wr-d-2', title: 'Yoga Flow', duration: 25, description: 'Unhurried yoga practice. Sun salutations to warm, standing sequence, floor work, and a 5-minute savasana. Let the body set the pace.', why: 'Resource: the combination of breath, movement, and sustained holds addresses all layers — muscle, fascia, and nervous system.', pageLink: '/yoga' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Resource',
          practices: [
            { id: 'wr-d-3', title: 'Fascia Deep Protocol', duration: 20, description: 'Comprehensive session: thoracic foam roller, gua sha neck and shoulders, hip flexor release, plantar fascia. 3-minute holds. This is the week\'s deep maintenance.', why: 'Resource: 20 minutes of targeted fascia work addresses the cumulative load of a full week of movement patterns.', pageLink: '/fascia' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'wr-d-4', title: 'Yoga Nidra', duration: 30, description: 'Extended Nidra session. Complete body rotation, sense withdrawal, visualization, and deep sankalpa planting. The 30-minute format reaches the deepest restoration states.', why: 'Receive: the longest format penetrates chronic holding patterns that shorter sessions cannot reach.', pageLink: '/yoga' },
            { id: 'wr-d-5', title: 'Yin Hold Closing', duration: 10, description: 'One or two long yin holds — dragon pose or supported fish — as the Nidra afterglow settles. Stay for 5 minutes each side. Breathe into resistance.', why: 'Receive: yin holds in a post-Nidra state allow the deepest fascial release, when the nervous system is most receptive.', timerPreset: 'yoga-posehold', pageLink: '/yoga' },
          ],
        },
      ],
    },
  },
  {
    id: 'high-stress',
    name: 'High-Stress Day',
    icon: '🔥',
    description: 'When your nervous system needs rescue, not optimization.',
    tiers: {
      quick: [
        {
          time: 'morning', label: 'Morning — Regulate',
          practices: [
            { id: 'hs-q-1', title: 'Physiological Sighs', duration: 5, description: 'Double inhale through the nose, long slow exhale through the mouth. Repeat for 5 minutes. The fastest tool to reduce acute physiological stress.', why: 'Regulate: physiological sighs offload CO2 faster than any other breath pattern, rapidly reducing the panic signal.', timerPreset: 'breath-sigh', pageLink: '/breathe' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'hs-q-2', title: 'Yoga Nidra', duration: 10, description: 'Lie down. Let the structure of the Nidra hold you. You don\'t have to do anything except follow the voice.', why: 'Receive: on a high-stress day the most important thing is to stop. Nidra makes stopping feel safe.', pageLink: '/yoga' },
          ],
        },
      ],
      standard: [
        {
          time: 'morning', label: 'Morning — Regulate',
          practices: [
            { id: 'hs-s-1', title: 'Physiological Sighs', duration: 5, description: 'Double inhale, long exhale. Repeat. Prioritize the exhale — make it twice as long as the inhale.', why: 'Regulate: exhale-dominant breathing activates the vagal brake and reduces heart rate within minutes.', timerPreset: 'breath-sigh', pageLink: '/breathe' },
            { id: 'hs-s-2', title: 'Box Breathing', duration: 5, description: 'After the sighs, transition to box breathing to stabilize: inhale 4, hold 4, exhale 4, hold 4. Box breathing consolidates the regulation.', why: 'Regulate: box breathing sustains the coherence state initiated by the sighs.', timerPreset: 'breath-box', pageLink: '/breathe' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Regulate',
          practices: [
            { id: 'hs-s-3', title: 'Vagal Toning', duration: 5, description: 'Splash cold water on face and wrists. Hum or sing for 2 minutes. Optional: gargle water for 30 seconds. These directly stimulate the vagus nerve.', why: 'Regulate: the vagus nerve runs through the face, throat, and gut — cold and sound stimulate it directly.', pageLink: '/nervous-system' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'hs-s-4', title: 'Yoga Nidra', duration: 15, description: 'Lie down and be held by the structure. Follow the body scan without trying to relax — simply observe.', why: 'Receive: the instruction to simply observe removes the pressure to perform relaxation, which paradoxically allows it.', pageLink: '/yoga' },
          ],
        },
      ],
      deep: [
        {
          time: 'morning', label: 'Morning — Regulate',
          practices: [
            { id: 'hs-d-1', title: 'Physiological Sighs', duration: 5, description: 'Double inhale, extended exhale. Do not rush. Let the exhale be audible. Stay with it for the full 5 minutes.', why: 'Regulate: a highly effective acute intervention. Begin here regardless of what follows.', timerPreset: 'breath-sigh', pageLink: '/breathe' },
            { id: 'hs-d-2', title: 'Box Breathing', duration: 10, description: 'Transition from sighs to box breathing. Extended 10-minute session. Allow the box pattern to become effortless.', why: 'Regulate: 10 minutes of box breathing measurably reduces cortisol and stabilizes the stress response.', timerPreset: 'breath-box', pageLink: '/breathe' },
            { id: 'hs-d-3', title: 'Grounding Meditation', duration: 10, description: 'Feel the weight of your body. Name 5 things you can see, 4 you can touch, 3 you can hear. Then sit and observe the body from inside.', why: 'Regulate: sensory grounding interrupts the threat-narrative loop and returns attention to present-moment safety.', timerPreset: 'med-breath', pageLink: '/meditate' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Regulate',
          practices: [
            { id: 'hs-d-4', title: 'Vagal Toning Protocol', duration: 10, description: 'Cold water on face and wrists for 30 seconds. Hum for 3 minutes. Gargle for 1 minute. Physiological sigh round to close. This sequence is your emergency vagal kit.', why: 'Regulate: layering multiple vagal stimulation methods creates a stronger and longer-lasting parasympathetic response.', pageLink: '/nervous-system' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'hs-d-5', title: 'Yin Hold', duration: 15, description: 'Supported child\'s pose or reclined butterfly for 5-7 minutes each. Use bolsters or pillows. Do not stretch — simply rest inside the shape.', why: 'Receive: yin poses held for 5+ minutes activate the parasympathetic response through mechanoreceptor stimulation in the fascia.', timerPreset: 'yoga-posehold', pageLink: '/yoga' },
            { id: 'hs-d-6', title: 'Yoga Nidra', duration: 20, description: 'Full Nidra session. After a high-stress day, a 20-minute Nidra is a highly effective recovery tool. Let it do the work.', why: 'Receive: Nidra after yin produces a compounding effect — the body is already open; the Nidra deepens into that openness.', pageLink: '/yoga' },
          ],
        },
      ],
    },
  },
  {
    id: 'creative-deep-work',
    name: 'Creative / Deep Work',
    icon: '✨',
    description: 'Prime the mind for focused, creative output.',
    tiers: {
      quick: [
        {
          time: 'morning', label: 'Morning — Intend',
          practices: [
            { id: 'cw-q-1', title: 'Coherent Breathing', duration: 6, description: 'Five and a half seconds in, five and a half seconds out. Bring the nervous system into coherence before engaging with the creative challenge.', why: 'Intend: coherence increases access to intuitive processing and reduces the self-censorship that kills creative flow.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
            { id: 'cw-q-2', title: 'WOOP Intention Setting', duration: 5, description: 'Wish, Outcome, Obstacle, Plan. Identify one specific creative or deep-work goal. Vividly imagine completion, then the main internal obstacle.', why: 'Intend: WOOP activates the implementation intention circuitry, significantly increasing follow-through on creative work.', pageLink: '/manifest' },
          ],
        },
      ],
      standard: [
        {
          time: 'morning', label: 'Morning — Intend',
          practices: [
            { id: 'cw-s-1', title: 'Coherent Breathing', duration: 11, description: 'Extended coherence session. Allow the first 3 minutes to discharge urgency, then sink into the rhythm.', why: 'Intend: 10 minutes of coherence produces a measurable shift in prefrontal function, improving both focus and divergent thinking.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
            { id: 'cw-s-2', title: 'WOOP Intention Setting', duration: 5, description: 'Wish, Outcome, Obstacle, Plan. Specific goal. Vivid outcome visualization. Identify the single biggest internal obstacle. Form a concrete if-then plan.', why: 'Intend: the WOOP method doubles follow-through rates compared to simple goal-setting or positive visualization alone.', pageLink: '/manifest' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Intend',
          practices: [
            { id: 'cw-s-3', title: 'Reflective Meditation', duration: 10, description: 'Sit with the day\'s creative output. Review what emerged without judgment. Notice what wants to continue tomorrow.', why: 'Intend: brief evening reflection consolidates the day\'s insights and seeds the subconscious for overnight processing.', timerPreset: 'med-breath', pageLink: '/meditate' },
          ],
        },
      ],
      deep: [
        {
          time: 'morning', label: 'Morning — Intend',
          practices: [
            { id: 'cw-d-1', title: 'Coherent Breathing', duration: 11, description: 'Full coherence session before engaging the creative challenge. Feel the nervous system shift from scanning to presence.', why: 'Intend: coherence is the prerequisite for flow states — it reduces threat-detection noise so the creative signal can emerge.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
            { id: 'cw-d-2', title: 'WOOP Intention Setting', duration: 5, description: 'Full WOOP protocol with written notes if possible. Wish → Outcome → Obstacle → Plan. Be specific about the obstacle — it is the most important step.', why: 'Intend: writing WOOP increases implementation probability by a further 30-40% over mental WOOP alone.', pageLink: '/manifest' },
            { id: 'cw-d-3', title: 'Focused Meditation', duration: 10, description: 'Focused attention on breath. Build the attentional muscle that deep work requires. When distraction arises, note it and return. This is the skill.', why: 'Act: the focused attention practice directly trains the same neural circuitry used in deep creative work.', timerPreset: 'med-breath', pageLink: '/meditate' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Resource',
          practices: [
            { id: 'cw-d-4', title: 'Micro Movement Break', duration: 5, description: 'Five minutes of movement — walk, stretch, shake. No screen. No input. Let the body move and the mind drift. Ideas often emerge in this gap.', why: 'Resource: default mode network activation during movement breaks produces the associative connections that creative breakthroughs require.', pageLink: '/fascia' },
            { id: 'cw-d-5', title: 'Desk Fascia Reset', duration: 5, description: 'Neck, shoulders, and wrists. Release the postural pattern that builds from deep-work posture. The body affects the mind.', why: 'Resource: fascial restriction in the upper body compresses breathing capacity, which reduces cognitive performance.', pageLink: '/fascia' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Intend',
          practices: [
            { id: 'cw-d-6', title: 'Reflective Meditation', duration: 20, description: 'Extended evening reflection. Sit with the full arc of the day\'s creative work — what emerged, what resisted, what is unresolved. Witness without fixing.', why: 'Intend: 20 minutes of reflective meditation seeds the subconscious problem-solving that occurs during sleep.', timerPreset: 'med-breath', pageLink: '/meditate' },
          ],
        },
      ],
    },
  },
  {
    id: 'travel',
    name: 'Travel Day',
    icon: '✈️',
    description: 'No mat, no equipment, minimal space.',
    tiers: {
      quick: [
        {
          time: 'morning', label: 'Morning — Regulate',
          practices: [
            { id: 'tv-q-1', title: 'Box Breathing', duration: 5, description: 'Inhale 4, hold 4, exhale 4, hold 4. Can be done seated in transit, at a gate, in a hotel room. No equipment or space required.', why: 'Regulate: travel disrupts circadian rhythm and activates background stress. Box breathing counteracts the physiological cost.', timerPreset: 'breath-box', pageLink: '/breathe' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'tv-q-2', title: 'Body Scan Meditation', duration: 10, description: 'Lie down or sit reclined. Sweep attention through the body from feet to crown. No technique required — simply feel each area.', why: 'Receive: body scan after travel helps the nervous system locate itself in the new environment.', timerPreset: 'med-breath', pageLink: '/meditate' },
          ],
        },
      ],
      standard: [
        {
          time: 'morning', label: 'Morning — Regulate',
          practices: [
            { id: 'tv-s-1', title: 'Box Breathing', duration: 5, description: 'Equal-ratio breathing for nervous system coherence. Commute and transit friendly.', why: 'Regulate: establish a regulated baseline before entering the sensory load of airports, train stations, or new environments.', timerPreset: 'breath-box', pageLink: '/breathe' },
            { id: 'tv-s-2', title: 'Coherent Breathing', duration: 6, description: 'Five and a half seconds in, five and a half seconds out. Follow up box breathing with coherent breathing to deepen regulation.', why: 'Regulate: the transition from box to coherent brings the ANS from stabilized to deeply coherent.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Resource',
          practices: [
            { id: 'tv-s-3', title: 'Seated Fascia + Eye Exercises', duration: 5, description: 'Neck rolls, shoulder circles, and wrist rotations in your seat. Eye exercises: focus near and far alternately, trace the horizon if visible.', why: 'Resource: long transit collapses posture and locks the visual system in a fixed focal plane. Both need active reset.', pageLink: '/fascia' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'tv-s-4', title: 'Body Scan Meditation', duration: 15, description: 'Extended body scan. Sweep from feet to crown and back. Feel the new location in the body. Ground in the present geography.', why: 'Receive: arriving in a new place without grounding the body creates a dissociated presence. The body scan lands you.', timerPreset: 'med-breath', pageLink: '/meditate' },
          ],
        },
      ],
      deep: [
        {
          time: 'morning', label: 'Morning — Regulate',
          practices: [
            { id: 'tv-d-1', title: 'Box Breathing', duration: 5, description: 'Box breathing to establish initial regulation. 4-4-4-4 ratio.', why: 'Regulate: begin the travel day from a baseline of coherence rather than urgency.', timerPreset: 'breath-box', pageLink: '/breathe' },
            { id: 'tv-d-2', title: 'Coherent Breathing', duration: 11, description: 'Extended coherent breathing to deepen the morning regulation. Five and a half in, five and a half out.', why: 'Regulate: 10 minutes of coherence buffers against the cumulative stress load of a full travel day.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Resource',
          practices: [
            { id: 'tv-d-3', title: 'Seated Fascia + Eye Protocol', duration: 10, description: 'Comprehensive in-seat release: neck, shoulders, wrists, hip rocking. Eye exercises: near-far focus, slow tracking. Stand and walk if possible.', why: 'Resource: prolonged transit locks the body in patterns that become overnight pain. The midday break prevents accumulation.', pageLink: '/nervous-system' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'tv-d-4', title: 'Body Scan Meditation', duration: 20, description: 'Full body scan meditation. Feel every region of the body in the new location. Let the nervous system update its map.', why: 'Receive: after travel the nervous system holds a stale body map. The body scan updates it, reducing ambient tension.', timerPreset: 'med-breath', pageLink: '/meditate' },
            { id: 'tv-d-5', title: 'Yoga Nidra', duration: 10, description: 'Short Nidra session to complete the landing. Follow the guided rotation and plant a simple sankalpa for the trip.', why: 'Receive: Nidra after a body scan compounds the landing process and sets the intention for the journey ahead.', pageLink: '/yoga' },
          ],
        },
      ],
    },
  },
  {
    id: 'athletic',
    name: 'Athletic / Active Day',
    icon: '💪',
    description: 'Complement physical training with nervous system work.',
    tiers: {
      quick: [
        {
          time: 'morning', label: 'Morning — Resource',
          practices: [
            { id: 'at-q-1', title: 'Wim Hof Breathwork', duration: 5, description: '3 rounds of 30 deep breaths, breath retention, and recovery breath. Activates the sympathetic system and alkalizes the blood. Pre-workout activation.', why: 'Resource: Wim Hof breathing increases adrenaline, reduces inflammation markers, and primes the body for intense physical effort.', timerPreset: 'breath-wimhof', pageLink: '/breathe' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'at-q-2', title: 'Recovery Yoga Nidra', duration: 10, description: 'Lie down after training. Let the body be completely still. Follow the guided Nidra and let the athletic effort integrate.', why: 'Receive: post-training Nidra accelerates recovery by activating the parasympathetic response that triggers repair and adaptation.', pageLink: '/yoga' },
          ],
        },
      ],
      standard: [
        {
          time: 'morning', label: 'Morning — Resource',
          practices: [
            { id: 'at-s-1', title: 'Wim Hof Breathwork', duration: 5, description: '3 rounds. 30 deep breaths, exhale retention, inhale retention. Follow the structure.', why: 'Resource: pre-training Wim Hof increases exercise capacity and reduces perceived exertion during the session.', timerPreset: 'breath-wimhof', pageLink: '/breathe' },
            { id: 'at-s-2', title: 'Dynamic Pose Hold', duration: 5, description: 'Warrior I, Warrior II, and a balance pose (tree or eagle). 60 seconds each. Activate the stabilizer system before loading.', why: 'Resource: pre-activation of stabilizers reduces injury risk and improves force transfer during athletic movement.', timerPreset: 'yoga-posehold', pageLink: '/yoga' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Resource',
          practices: [
            { id: 'at-s-3', title: 'Post-Training Fascia Release', duration: 10, description: 'Foam roller on quads, hamstrings, and IT band. Lacrosse ball on glutes and upper back. 90-second holds in areas of density.', why: 'Resource: fascia release within 2 hours of training accelerates the clearing of inflammatory byproducts.', pageLink: '/fascia' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'at-s-4', title: 'Recovery Yoga Nidra', duration: 15, description: 'Guided Nidra with body scan through the trained areas. Feel each muscle group soften progressively. Plant a recovery sankalpa.', why: 'Receive: the combination of body awareness during Nidra with the trained areas accelerates neuromuscular recovery.', pageLink: '/yoga' },
          ],
        },
      ],
      deep: [
        {
          time: 'morning', label: 'Morning — Resource',
          practices: [
            { id: 'at-d-1', title: 'Wim Hof Breathwork', duration: 10, description: 'Extended session: 4-5 rounds. Feel the full alkalizing effect before training. End with a cold exposure if available.', why: 'Resource: 4-5 rounds produce stronger anti-inflammatory and performance-priming effects than the standard 3-round protocol.', timerPreset: 'breath-wimhof', pageLink: '/breathe' },
            { id: 'at-d-2', title: 'Dynamic Pose Holds', duration: 10, description: 'Full activation sequence: Warrior I, II, III, balance pose, hip opener. 60-90 seconds each. Move between poses slowly.', why: 'Resource: comprehensive pre-activation of the stabilizer and proprioceptive systems prepares the body for maximal output.', timerPreset: 'yoga-posehold', pageLink: '/yoga' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Resource',
          practices: [
            { id: 'at-d-3', title: 'Post-Training Fascia Protocol', duration: 15, description: 'Full-body foam rolling and targeted soft tissue work. Prioritize the training areas but include hips, thoracic spine, and feet. 2-minute holds.', why: 'Resource: comprehensive post-training fascia work is one of the high-impact recovery interventions available.', pageLink: '/fascia' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'at-d-4', title: 'Recovery Yoga Nidra', duration: 20, description: 'Full recovery Nidra. Extended rotation through the trained areas. Feel each muscle group surrender progressively. Plant a recovery and performance sankalpa.', why: 'Receive: 20-minute post-training Nidra measurably reduces DOMS and accelerates readiness for the next session.', pageLink: '/yoga' },
            { id: 'at-d-5', title: 'Cold Exposure', duration: 5, description: 'Cold shower or ice bath for 3-5 minutes. Breathe through the initial shock. Find stillness inside the cold. This is also a nervous system practice.', why: 'Receive: cold exposure after training reduces inflammation, boosts norepinephrine, and trains composure under physiological stress.', timerPreset: 'ns-coldshower', pageLink: '/breathe' },
          ],
        },
      ],
    },
  },
  {
    id: 'low-energy',
    name: 'Low Energy Day',
    icon: '🌙',
    description: 'Permission to do less. Gentle regulation only.',
    tiers: {
      quick: [
        {
          time: 'morning', label: 'Morning — Regulate',
          practices: [
            { id: 'le-q-1', title: 'Coherent Breathing', duration: 6, description: 'Five and a half seconds in, five and a half seconds out. Gentle, effortless. No performance required — simply ride the breath rhythm.', why: 'Regulate: on low energy days, coherent breathing restores baseline function without taxing depleted resources.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'le-q-2', title: 'Yoga Nidra', duration: 10, description: 'Lie down. Follow the voice. Nothing more is required. If you fall asleep, that is the practice.', why: 'Receive: on low energy days, the most important practice is to stop and be held. Nidra provides structure for that.', pageLink: '/yoga' },
          ],
        },
      ],
      standard: [
        {
          time: 'morning', label: 'Morning — Regulate',
          practices: [
            { id: 'le-s-1', title: 'Coherent Breathing', duration: 11, description: 'Extended gentle coherence session. Five and a half seconds in, five and a half seconds out. Move slowly. No urgency.', why: 'Regulate: 10 minutes of coherent breathing on a low-energy day provides enough nervous system resourcing to function without depleting further.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'le-s-2', title: 'Yoga Nidra', duration: 20, description: 'Full guided Nidra. Let the practice do everything. Your only job is to remain awake enough to follow the body scan.', why: 'Receive: 20 minutes of Nidra restores more than sleep of the same duration. On depleted days, this is the primary recovery tool.', pageLink: '/yoga' },
          ],
        },
      ],
      deep: [
        {
          time: 'morning', label: 'Morning — Regulate',
          practices: [
            { id: 'le-d-1', title: 'Coherent Breathing', duration: 11, description: 'Gentle, sustained coherence. No forcing the pace or the rhythm. Let the breath find its own length.', why: 'Regulate: even on low energy days, 10 minutes of coherence creates a physiological floor that prevents further depletion.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
            { id: 'le-d-2', title: 'Gentle Seated Meditation', duration: 10, description: 'Open monitoring, no technique. Sit and observe. If the mind wanders, let it — notice when you notice, and return without judgment.', why: 'Regulate: light meditation without performance pressure provides gentle resourcing without the effortful engagement that depletes further.', timerPreset: 'med-breath', pageLink: '/meditate' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Resource',
          practices: [
            { id: 'le-d-3', title: 'Gentle Movement', duration: 5, description: 'Slow walking, gentle neck rolls, and easy stretching. No intensity. Move only as much as feels nourishing.', why: 'Resource: on low energy days, even 5 minutes of gentle movement maintains circulation and prevents the stagnation that compounds fatigue.', pageLink: '/yoga' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Receive',
          practices: [
            { id: 'le-d-4', title: 'Yoga Nidra', duration: 30, description: 'The longest Nidra format. Be completely horizontal. Let everything go. This is the primary medicine for depletion.', why: 'Receive: 30 minutes of Nidra is a highly effective non-sleep recovery intervention. On a low energy day, this is the entire practice.', pageLink: '/yoga' },
            { id: 'le-d-5', title: '4-7-8 Breathing', duration: 10, description: 'After Nidra, 4-7-8 breathing to complete the transition into rest: inhale 4, hold 7, exhale 8. Repeat for 10 minutes. Let sleep approach.', why: 'Receive: 4-7-8 after Nidra creates the deepest possible preparation for sleep — the body is already open and the breath invitation simply completes it.', timerPreset: 'breath-478', pageLink: '/breathe' },
          ],
        },
      ],
    },
  },
  {
    id: 'wim-hof',
    name: 'Wim Hof Method',
    icon: '🧊',
    description: 'Three pillars — breathwork, cold exposure, and commitment. Progressive protocol.',
    tiers: {
      quick: [
        {
          time: 'morning', label: 'Morning — Breathe',
          practices: [
            { id: 'wh-q-1', title: 'WHM Breathing (3 Rounds)', duration: 15, description: '30–40 deep power breaths per round: full inhale through the nose (belly then chest), passive exhale. After the last exhale, hold with empty lungs as long as comfortable. Recovery breath: inhale fully, hold 15 seconds, release. Repeat for 3 rounds. Always lying down or seated — never standing.', why: 'Breathe: the core of the method. Cyclic hyperventilation shifts blood pH and triggers a 2–3x epinephrine surge. Each subsequent round produces longer retention times as blood chemistry shifts.', timerPreset: 'breath-wimhof', pageLink: '/wim-hof' },
          ],
        },
      ],
      standard: [
        {
          time: 'morning', label: 'Morning — Breathe',
          practices: [
            { id: 'wh-s-1', title: 'WHM Breathing (3 Rounds)', duration: 15, description: '30–40 power breaths, empty-lung retention, 15-second recovery breath — 3 full rounds. Sit or lie down. Tingling and lightheadedness are normal. Track your retention times to see adaptation.', why: 'Breathe: the breathing rounds produce controlled respiratory alkalosis and intermittent hypoxia. This is the physiological trigger for the method\'s anti-inflammatory and mood effects.', timerPreset: 'breath-wimhof', pageLink: '/wim-hof' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Cold',
          practices: [
            { id: 'wh-s-2', title: 'Cold Shower', duration: 3, description: 'End your shower with cold water. Start at 30 seconds and build to 2–3 minutes over weeks. Focus on slow, controlled exhales through the cold shock response. Do not hyperventilate — the goal is composure under stress.', why: 'Cold: cold water triggers a 200–300% norepinephrine increase. The Soberg protocol says 11 minutes of cold per week spread across sessions is the minimum effective dose. End on cold — the rewarming process is where metabolic benefit occurs.', pageLink: '/wim-hof' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Recover',
          practices: [
            { id: 'wh-s-3', title: 'Coherent Breathing', duration: 10, description: 'Five and a half seconds in, five and a half seconds out. After an activating morning of WHM breathing and cold exposure, coherent breathing returns the nervous system to ventral vagal safety. This is the parasympathetic counterbalance.', why: 'Recover: WHM breathing is activating, not calming. Evening coherence restores autonomic balance and supports the deep sleep that consolidates the day\'s adaptations.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
          ],
        },
      ],
      deep: [
        {
          time: 'morning', label: 'Morning — Breathe & Cold',
          practices: [
            { id: 'wh-d-1', title: 'WHM Breathing (4 Rounds)', duration: 20, description: '40 power breaths per round with more forceful exhales. 4 full rounds. Track retention times — experienced practitioners reach 2–3+ minutes on later rounds. Always lying down. Never practice in or near water.', why: 'Breathe: the extended 4-round protocol produces stronger catecholamine release and longer retention adaptation. Each round should feel incrementally deeper.', timerPreset: 'breath-wimhof', pageLink: '/wim-hof' },
            { id: 'wh-d-2', title: 'Cold Shower or Ice Bath', duration: 5, description: 'Cold shower for 3–5 minutes, or ice bath at 50°F (10°C) for 2–3 minutes. Do 2–3 breathing rounds before entering. Breathe slowly and deliberately through the shock. Never do ice baths alone — always have someone present. Exit immediately if shivering becomes uncontrollable.', why: 'Cold: combining breathing rounds with immediate cold entry amplifies the adrenergic response. The breathing pre-loads the system with alkalosis, making the cold more tolerable and the hormonal response more potent.', pageLink: '/wim-hof' },
          ],
        },
        {
          time: 'midday', label: 'Midday — Commit',
          practices: [
            { id: 'wh-d-3', title: 'Focused Meditation', duration: 10, description: 'Sit and observe the body after the morning\'s activation. Notice residual energy, warmth, tingling. The commitment pillar is about sustained daily practice and tolerating discomfort — this seated practice builds that capacity.', why: 'Commit: the third pillar is the most underrated. Most people have the physical capacity for the method but abandon it before adaptation occurs. Meditation builds the mental endurance that sustains the practice.', timerPreset: 'med-breath', pageLink: '/meditate' },
            { id: 'wh-d-4', title: 'Fascia Release', duration: 10, description: 'Foam roller on thoracic spine and hip flexors. The cold exposure and breath-holding create a temporary state of muscular tension — fascia work releases it and improves the range of motion benefits from the cold.', why: 'Resource: cold exposure creates vasoconstriction followed by rebound vasodilation. Fascia work during the rebound phase enhances circulation to connective tissue.', pageLink: '/fascia' },
          ],
        },
        {
          time: 'evening', label: 'Evening — Recover & Integrate',
          practices: [
            { id: 'wh-d-5', title: 'Coherent Breathing', duration: 11, description: 'Extended coherence session. Five and a half seconds in, five and a half seconds out. After a full WHM day, the evening coherence is essential — it signals the nervous system that the challenge is complete and restoration can begin.', why: 'Recover: the WHM protocol is a deliberate hormetic stressor. Like exercise, the benefit comes from the recovery period, not the stress itself. Coherent breathing optimizes that recovery window.', timerPreset: 'breath-coherent', pageLink: '/breathe' },
            { id: 'wh-d-6', title: 'Yoga Nidra', duration: 20, description: 'Full Yoga Nidra session. The deep rest that follows a WHM day consolidates the physiological adaptations — cold tolerance, breath-hold capacity, and autonomic flexibility all improve during rest, not during the practice itself.', why: 'Integrate: Nidra after a full WHM day creates the deepest recovery state. The body has been deliberately stressed across multiple systems; Nidra lets them all integrate simultaneously.', pageLink: '/yoga' },
          ],
        },
      ],
    },
  },
];

const TIER_LABELS: Record<DurationTier, string> = {
  quick: 'Quick ~15min',
  standard: 'Standard ~30min',
  deep: 'Deep ~60min',
};

const TIERS: DurationTier[] = ['quick', 'standard', 'deep'];

function PracticeItem({ practice, onStartPreset }: { practice: RoutinePractice; onStartPreset?: (exerciseId: string, minutes: number) => void }) {
  return (
    <div style={{ marginBottom: '1.25rem', paddingLeft: '1rem', borderLeft: `2px solid ${GOLD_LIGHT}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-text)' }}>
          {practice.title}
        </span>
        <span style={{
          background: `${GOLD_MID}22`,
          color: GOLD_DEEP,
          border: `1px solid ${GOLD_MID}44`,
          borderRadius: '999px',
          padding: '0.125rem 0.5rem',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
        }}>
          {practice.duration} min
        </span>
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 0.375rem 0', lineHeight: 1.6 }}>
        {practice.description}
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontStyle: 'italic', color: GOLD_DEEP, margin: '0 0 0.5rem 0', lineHeight: 1.5 }}>
        {practice.why}
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {practice.timerPreset && onStartPreset && (
          <button
            onClick={() => onStartPreset(practice.timerPreset!, practice.duration)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: GOLD_MID, fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 500 }}
          >
            Start Timer →
          </button>
        )}
        {practice.pageLink && (
          <Link
            href={practice.pageLink}
            style={{ color: GOLD_MID, fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 500, textDecoration: 'none' }}
          >
            Learn more →
          </Link>
        )}
      </div>
    </div>
  );
}

function RoutineDetail({
  template,
  tier,
  onTierChange,
  onBack,
  onStartPreset,
}: {
  template: RoutineTemplate;
  tier: DurationTier;
  onTierChange: (t: DurationTier) => void;
  onBack: () => void;
  onStartPreset?: (exerciseId: string, minutes: number) => void;
}) {
  const blocks = template.tiers[tier];

  const tierButtonStyle = (t: DurationTier) => ({
    background: t === tier ? GOLD_MID : 'transparent',
    color: t === tier ? '#1C1C1C' : 'var(--color-text-muted)',
    border: `1px solid ${t === tier ? GOLD_MID : 'var(--color-border)'}`,
    padding: '0.375rem 0.875rem',
    borderRadius: '999px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.8125rem',
    fontWeight: t === tier ? 600 : 400,
    letterSpacing: '0.02em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
  });

  return (
    <div>
      <ScrollReveal>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.875rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          ← Back to templates
        </button>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--color-text)', margin: '0 0 0.5rem 0' }}>
          {template.icon} {template.name}
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: '0 0 1.5rem 0' }}>
          {template.description}
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {TIERS.map(t => (
            <button key={t} onClick={() => onTierChange(t)} style={tierButtonStyle(t)}>
              {TIER_LABELS[t]}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {blocks.map((block) => {
        const [blockLabel, blockTag] = block.label.split(' — ');
        return (
          <ScrollReveal key={block.time}>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', color: 'var(--color-text)', margin: '0 0 1rem 0' }}>
                {blockLabel}{blockTag ? (
                  <span> — <span style={{ color: GOLD_DEEP }}>{blockTag}</span></span>
                ) : null}
              </h3>
              {block.practices.map(practice => (
                <PracticeItem key={practice.id} practice={practice} onStartPreset={onStartPreset} />
              ))}
            </div>
          </ScrollReveal>
        );
      })}

      <ScrollReveal>
        <div style={{
          marginTop: '2rem',
          padding: '1.25rem',
          background: `${GOLD_MID}11`,
          border: `1px solid ${GOLD_MID}33`,
          borderRadius: '12px',
        }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7 }}>
            Want to go deeper with intention setting? Visit the{' '}
            <Link href="/manifest" style={{ color: GOLD_MID, textDecoration: 'none', fontWeight: 500 }}>
              Manifestation page
            </Link>{' '}
            to work with WOOP, visualization, and sankalpa practices.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}

function TemplateCard({
  template,
  selectedTier,
  onClick,
}: {
  template: RoutineTemplate;
  selectedTier: DurationTier;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const totalMinutes = getTotalMinutes(template.tiers[selectedTier]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--color-surface-raised)',
        border: `1px solid ${hovered ? GOLD_MID : 'var(--color-border)'}`,
        borderRadius: '12px',
        padding: '1.25rem',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: hovered ? `0 4px 16px ${GOLD_MID}22` : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{template.icon}</span>
        <span style={{
          background: `${GOLD_MID}22`,
          color: GOLD_DEEP,
          border: `1px solid ${GOLD_MID}44`,
          borderRadius: '999px',
          padding: '0.125rem 0.625rem',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
        }}>
          {totalMinutes} min
        </span>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-text)', marginBottom: '0.375rem' }}>
        {template.name}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
        {template.description}
      </div>
    </div>
  );
}

export default function PracticeBuilderTab({ onStartPreset }: PracticeBuilderTabProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [tier, setTier] = useState<DurationTier>('standard');

  const template = TEMPLATES.find(t => t.id === selectedTemplate) ?? null;

  const tierButtonStyle = (t: DurationTier) => ({
    background: t === tier ? GOLD_MID : 'transparent',
    color: t === tier ? '#1C1C1C' : 'var(--color-text-muted)',
    border: `1px solid ${t === tier ? GOLD_MID : 'var(--color-border)'}`,
    padding: '0.375rem 0.875rem',
    borderRadius: '999px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.8125rem',
    fontWeight: t === tier ? 600 : 400,
    letterSpacing: '0.02em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
  });

  if (template) {
    return (
      <RoutineDetail
        template={template}
        tier={tier}
        onTierChange={setTier}
        onBack={() => setSelectedTemplate(null)}
        onStartPreset={onStartPreset}
      />
    );
  }

  return (
    <div>
      <ScrollReveal>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-text)', margin: '0 0 0.5rem 0' }}>
            Daily Routines
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--color-text-muted)', margin: '0 0 1.25rem 0' }}>
            Eight life-context templates, each with three duration tiers. Choose the one that fits your day, then adjust the depth.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {TIERS.map(t => (
              <button key={t} onClick={() => setTier(t)} style={tierButtonStyle(t)}>
                {TIER_LABELS[t]}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
        }}>
          {TEMPLATES.map(t => (
            <TemplateCard
              key={t.id}
              template={t}
              selectedTier={tier}
              onClick={() => setSelectedTemplate(t.id)}
            />
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
