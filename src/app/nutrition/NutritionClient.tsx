'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoFacade from '@/components/VideoFacade';

// ── Accent tokens (nutrition / warm olive) ─────────────────────
const OLIVE_DEEP = '#3D4D28';
const OLIVE_MID  = '#8FA076';
const OLIVE_PALE = '#E8EDDF';

// ── Stat Card ──────────────────────────────────────────────────
function StatCard({
  source,
  stat,
  detail,
  url,
}: {
  source: string;
  stat: string;
  detail: string;
  url?: string;
}) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${OLIVE_MID}`,
        padding: '1.5rem 1.75rem',
        background: 'var(--color-surface-raised)',
        borderRadius: '2px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: OLIVE_DEEP,
          margin: '0 0 0.75rem',
        }}
      >
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            {source}
          </a>
        ) : (
          source
        )}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: '0 0 0.5rem',
          lineHeight: 1.3,
        }}
      >
        {stat}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {detail}
      </p>
    </div>
  );
}

// ── Adaptogen Card ─────────────────────────────────────────────
function AdaptogenCard({
  name,
  dose,
  evidence,
  description,
}: {
  name: string;
  dose: string;
  evidence: 'Strong' | 'Moderate' | 'Low';
  description: string;
}) {
  const evidenceColor =
    evidence === 'Strong'
      ? { bg: 'rgba(45,106,79,0.10)', text: '#2D6A4F' }
      : evidence === 'Moderate'
      ? { bg: OLIVE_PALE, text: OLIVE_DEEP }
      : { bg: 'rgba(139,58,98,0.08)', text: '#8B3A62' };

  return (
    <div
      style={{
        background: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
        borderRadius: '2px',
        padding: '1.75rem',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.125rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: '0 0 0.875rem',
          fontStyle: 'normal',
        }}
      >
        {name}
      </h3>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            background: OLIVE_PALE,
            color: OLIVE_DEEP,
            border: `1px solid ${OLIVE_MID}`,
          }}
        >
          {dose}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            background: evidenceColor.bg,
            color: evidenceColor.text,
            border: '1px solid var(--color-border)',
          }}
        >
          {evidence}
        </span>
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

// ── Adaptogen data ──────────────────────────────────────────────
const adaptogens: Array<{
  name: string;
  dose: string;
  evidence: 'Strong' | 'Moderate' | 'Low';
  description: string;
}> = [
  {
    name: 'Ashwagandha (KSM-66)',
    dose: '300–600 mg/day',
    evidence: 'Strong',
    description:
      'The most-studied adaptogen for cortisol and stress. Multiple RCTs show 25–30% reductions in cortisol and significant improvements in perceived stress, anxiety, and sleep quality. Adaptogenic mechanism: modulates HPA axis, GABA receptor activity, and thyroid function. 8–12 week protocols show cumulative benefit.',
  },
  {
    name: 'Rhodiola Rosea',
    dose: '200–400 mg/day (SHR-5)',
    evidence: 'Strong',
    description:
      'Best evidence for burnout, cognitive fatigue, and stress-induced exhaustion. Koop et al. (2022) found significant reductions in burnout symptoms over 12 weeks. Mechanism: inhibits COMT and MAO enzymes, prolonging serotonin, dopamine, and norepinephrine action. Stimulant-like — take in the morning.',
  },
  {
    name: "Lion's Mane (Hericium erinaceus)",
    dose: '500–3000 mg/day',
    evidence: 'Moderate',
    description:
      'Contains hericenones and erinacines that cross the blood-brain barrier and stimulate Nerve Growth Factor (NGF) synthesis. NGF supports neuronal survival, myelination, and synaptic plasticity. Mori et al. (2009) RCT showed significant cognitive improvements in mild cognitive impairment. Promising for neuroplasticity.',
  },
  {
    name: 'Reishi (Ganoderma lucidum)',
    dose: '1.5–9 g/day (or 1.5–6 mg extract)',
    evidence: 'Moderate',
    description:
      'Polysaccharides (beta-glucans) and triterpenoids modulate immune response, reduce inflammatory cytokines (TNF-alpha, IL-6), and may support sleep quality via adenosine A1 receptor activity. Traditionally used for shen (spirit) and immune resilience. Best studied for immune modulation and fatigue in cancer patients.',
  },
  {
    name: 'Tulsi (Holy Basil)',
    dose: '300–2000 mg/day',
    evidence: 'Low',
    description:
      'Called "liquid yoga" in Ayurvedic medicine for its calming, adaptogenic, and anti-inflammatory properties. Eugenol, ursolic acid, and rosmarinic acid contribute to anxiolytic and COX-2 inhibitory effects. Acharya et al. (2012) showed improvements in cognitive function and stress. Evidence base is smaller than other adaptogens.',
  },
];

// ── Video tab data ─────────────────────────────────────────────
type VideoTab = 'mindful-eating' | 'gut-health' | 'fasting';

const videoData: Record<VideoTab, Array<{ videoId: string; title: string; description: string }>> = {
  'mindful-eating': [
    {
      videoId: '9eBtrZPGoKQ',
      title: 'Gut-Immune Brain Axis',
      description:
        'How the act of eating slowly, chewing thoroughly, and eating without distraction activates the cephalic phase digestive response — the first stage of digestion that begins in the brain before food even enters the stomach. Parasympathetic eating versus sympathetic eating.',
    },
    {
      videoId: 'SZSRgyl7pyQ',
      title: 'Dr. Science of Gut Sense',
      description:
        'An overview of the emerging psychobiotic research: how gut bacteria produce neurotransmitters, modulate inflammation, and directly influence mood and cognition via the vagus nerve. Covers Lactobacillus rhamnosus, fermented foods, and the Bravo 2011 fMRI study.',
    },
  ],
  'gut-health': [
    {
      videoId: '_67egFHXuTE',
      title: 'Microbiota-Gut-Brain Axis',
      description:
        'Sonnenburg Lab research at Stanford: a high-fermented-food diet increased microbiome diversity and decreased 19 inflammatory markers including IL-6 and IL-12p70, while a high-fiber diet without adequate fermented foods had mixed results. The case for daily fermented foods.',
    },
    {
      videoId: 'm9BBEVzr0BU',
      title: 'GI Disorders Gut-Brain Connection',
      description:
        'How EPA and DHA reduce neuroinflammation, support myelin integrity, and modulate the HPA axis stress response. Meta-analysis by Sublette et al. (2011) showed EPA dominance (d=0.53) as the active antidepressant component. Dosing, sourcing, and the omega-6:omega-3 ratio.',
    },
  ],
  fasting: [
    {
      videoId: '1xCN5o0glHg',
      title: 'The Misunderstood Science of Intermittent Fasting',
      description:
        "Satchin Panda's research on circadian-aligned eating: consuming all calories within a 10–12 hour window aligned to daylight improves metabolic health, sleep quality, and inflammatory markers. Wilkinson et al. (2020) showed 14:10 TRE reduced blood pressure and atherogenic lipids in metabolic syndrome.",
    },
  ],
};

export default function NutritionClient() {
  const [activeVideoTab, setActiveVideoTab] = useState<VideoTab>('mindful-eating');

  return (
    <div
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-body)',
        lineHeight: 1.8,
        color: 'var(--color-text)',
      }}
    >

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '85dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(3rem, 8vw, 6rem) max(1.5rem, 8vw) clamp(4rem, 8vw, 7rem)',
          background: 'linear-gradient(160deg, oklch(35% 0.08 130), oklch(50% 0.10 115))',
          overflow: 'hidden',
        }}
      >
        {/* Animated orb */}
        <div
          className="breathe"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-6vw',
            top: '15%',
            width: 'clamp(300px, 45vw, 600px)',
            height: 'clamp(300px, 45vw, 600px)',
            borderRadius: '9999px',
            background: `radial-gradient(circle, ${OLIVE_PALE}30 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(245,234,225,0.7)',
              margin: '0 0 1.25rem',
            }}
          >
            Feed Your Nervous System
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              color: '#F5EAE1',
              lineHeight: 1.05,
              margin: '0 0 1.5rem',
              maxWidth: '18ch',
            }}
          >
            Nutrition &amp; the Gut-Brain Axis
          </h1>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'rgba(245,234,225,0.85)',
              margin: '0 0 2.5rem',
              maxWidth: '52ch',
              lineHeight: 1.75,
            }}
          >
            Your gut contains 500 million neurons, produces 95% of your serotonin, and communicates
            directly with your brain via the vagus nerve. What you eat is nervous system medicine.
          </p>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { href: '#gut-brain', label: 'Gut-Brain' },
              { href: '#anti-inflammatory', label: 'Anti-Inflammatory' },
              { href: '#dysregulators', label: 'Dysregulators' },
              { href: '#fasting', label: 'Fasting' },
              { href: '#adaptogens', label: 'Adaptogens' },
              { href: '#protocol', label: 'Protocol' },
              { href: '#practice', label: 'Practice' },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: OLIVE_MID,
                  textDecoration: 'none',
                  borderBottom: `1px solid rgba(143,160,118,0.5)`,
                  paddingBottom: '0.25rem',
                  transition: 'opacity 200ms ease',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. THE GUT-BRAIN AXIS
      ══════════════════════════════════════════════════════ */}
      <section
        id="gut-brain"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>

          {/* Two-column intro */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3.5rem',
            }}
          >
            <ScrollReveal>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  margin: '0 0 1rem',
                }}
              >
                Your Second Brain
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h2)',
                  fontWeight: 400,
                  color: 'var(--color-text)',
                  margin: '0 0 1.5rem',
                }}
              >
                The Gut-Brain Axis
              </h2>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The <strong>enteric nervous system (ENS)</strong> lining your gastrointestinal tract
                contains approximately 500 million neurons &mdash; more than your spinal cord. It
                operates largely independently, coordinating digestion, immune response, and
                neurotransmitter production without waiting for instructions from the brain.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The gut and brain communicate via the <strong>vagus nerve</strong>, which carries
                roughly 80% of its signals <em>upward</em> from gut to brain (afferent), not
                downward as commonly assumed. What your gut senses, feels, and produces directly
                shapes your mood, cognition, and stress response in real time.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Neurotransmitters Made in the Gut
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                The gut microbiome is a neurotransmitter factory. Enterochromaffin cells produce
                approximately <strong>95% of the body&rsquo;s serotonin</strong> in the gut wall
                (Yano et al., 2015). Gut bacteria also synthesize GABA, dopamine precursors, and
                short-chain fatty acids that cross the blood-brain barrier and modulate neural
                function.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                A landmark 2011 study by Bravo et al. found that mice fed <em>Lactobacillus
                rhamnosus</em> showed significantly less anxiety and stress hormones &mdash; but
                only when the vagus nerve was intact. Severing it abolished the effect, confirming
                the gut-to-brain signaling pathway.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${OLIVE_MID}`,
                  padding: '1rem 1.25rem',
                  background: OLIVE_PALE,
                  borderRadius: '0 2px 2px 0',
                  marginTop: '1rem',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: OLIVE_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  The vagus nerve is the highway between your gut and your brain. Every fermented
                  food, every prebiotic gram, every anti-inflammatory meal sends signals up this
                  wire to your limbic system.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Stat Cards */}
          <ScrollReveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '1.5rem',
                marginBottom: '3.5rem',
              }}
            >
              <StatCard
                source="Yano et al., Cell, 2015"
                stat="95%"
                detail="Of the body's serotonin is produced in the gut by enterochromaffin cells under the influence of gut microbiota — not in the brain."
                url="https://pubmed.ncbi.nlm.nih.gov/26126930/"
              />
              <StatCard
                source="Furness, 2012"
                stat="500M"
                detail="Neurons in the enteric nervous system — more than the spinal cord. The gut can sense, integrate, and respond to stimuli completely independently of the central nervous system."
                url="https://pubmed.ncbi.nlm.nih.gov/22268002/"
              />
              <StatCard
                source="Powley & Baronowsky, 2005"
                stat="80%"
                detail="Of vagal nerve fibers run gut-to-brain (afferent), not brain-to-gut. Your gut is talking to your brain far more than your brain is directing your gut."
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          4. ANTI-INFLAMMATORY NUTRITION
      ══════════════════════════════════════════════════════ */}
      <section
        id="anti-inflammatory"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${OLIVE_PALE})`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                margin: '0 0 1rem',
              }}
            >
              The Evidence
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              Anti-Inflammatory Nutrition
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '60ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Neuroinflammation is now understood as a key mechanism in depression, anxiety, and
              cognitive decline. The food you eat is the most direct lever you have on systemic
              inflammation &mdash; more accessible than medication and without side effects.
            </p>
          </ScrollReveal>

          {/* Research callouts */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3.5rem',
            }}
          >
            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                The SMILES Trial
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Jacka et al. (2017) published the first RCT demonstrating that dietary change alone
                can treat major depression. Participants randomized to a Mediterranean-style diet
                (whole grains, vegetables, legumes, nuts, olive oil, fish) showed a <strong>32%
                remission rate</strong> at 12 weeks compared to 8% in the social support control
                group &mdash; a number needed to treat of 4.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The mechanism isn&rsquo;t fully resolved but likely involves reduced IL-6 and
                TNF-alpha neuroinflammation, improved serotonin precursor availability (tryptophan
                from diverse protein sources), and microbiome diversity supporting GABA and
                short-chain fatty acid production.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Key Research Findings
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>Omega-3 (EPA):</strong> Meta-analysis (Sublette et al., 2011) showed EPA
                supplementation yields a standardized effect size of d=0.53 in depression &mdash;
                comparable to first-line antidepressants. DHA appears less active. 1&ndash;2g
                EPA/day from fish oil or algae.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>Fermented foods:</strong> Tillisch et al. (2013) showed 4-week fermented
                milk consumption changed brain activity patterns on fMRI in emotional processing
                regions. Sonnenburg Lab (2021) found high-fermented-food diets reduced 19
                inflammatory proteins.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>Prebiotic fiber:</strong> Schmidt et al. (2015) showed fructooligosaccharides
                reduced morning cortisol awakening response and improved attentional bias toward
                positive stimuli compared to placebo.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                <strong>Curcumin:</strong> Lopresti et al. (2014) found curcumin extract comparable
                to fluoxetine in treating major depression, with additive effects when combined.
                Bioavailability requires piperine (black pepper) co-administration.
              </p>
            </ScrollReveal>
          </div>

          {/* 6 Food Category Cards */}
          <ScrollReveal>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                margin: '0 0 0.5rem',
                fontStyle: 'normal',
              }}
            >
              Neuroprotective Food Categories
            </h3>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '1.5rem',
                maxWidth: '56ch',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
              }}
            >
              These six categories have the most robust evidence for gut-brain axis support and
              neuroinflammation reduction.
            </p>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            {[
              {
                category: 'Fermented Foods',
                examples: 'Yogurt, kefir, kimchi, sauerkraut, miso, kombucha',
                mechanism: 'Live cultures (Lactobacillus, Bifidobacterium) colonize the gut, produce GABA and serotonin precursors, and modulate the immune system via Toll-like receptors. Diversity matters more than quantity.',
              },
              {
                category: 'Omega-3 Rich Foods',
                examples: 'Fatty fish (sardines, mackerel, salmon), walnuts, flaxseed, algae',
                mechanism: 'EPA and DHA reduce neuroinflammatory cytokines, support neuronal membrane fluidity, and modulate the HPA axis cortisol response. EPA is the antidepressant compound; DHA supports structural brain health.',
              },
              {
                category: 'Prebiotic Fibers',
                examples: 'Garlic, onion, leeks, asparagus, Jerusalem artichoke, oats, bananas',
                mechanism: 'Feed Bifidobacterium and Lactobacillus species which produce short-chain fatty acids (SCFAs) — butyrate, propionate, acetate. SCFAs cross the blood-brain barrier and reduce neuroinflammation and modulate HPA axis.',
              },
              {
                category: 'Polyphenol-Rich Foods',
                examples: 'Blueberries, dark chocolate (70%+), green tea, turmeric, olive oil, red grapes',
                mechanism: 'Polyphenols inhibit NF-kB inflammatory signaling, increase BDNF (brain-derived neurotrophic factor), and are extensively metabolized by gut bacteria into bioactive neuroprotective compounds.',
              },
              {
                category: 'Magnesium-Rich Foods',
                examples: 'Dark leafy greens, pumpkin seeds, almonds, black beans, avocado, dark chocolate',
                mechanism: 'Magnesium is an NMDA receptor antagonist with anxiolytic and antidepressant effects. Boyle et al. (2017) meta-analysis found consistent benefit in anxiety. 68% of adults are deficient by dietary intake alone.',
              },
              {
                category: 'Diverse Whole Plants',
                examples: 'Aim for 30+ different plant foods per week (American Gut Project benchmark)',
                mechanism: 'Microbiome diversity is the strongest predictor of gut-brain axis health. Each plant species feeds a different bacterial population. The 30-plants-per-week target from American Gut correlates with maximal alpha diversity.',
              },
            ].map(item => (
              <ScrollReveal key={item.category}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderTop: `3px solid ${OLIVE_MID}`,
                    borderRadius: '2px',
                    padding: '1.5rem',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.25rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {item.category}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      color: OLIVE_DEEP,
                      fontWeight: 600,
                      fontStyle: 'italic',
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {item.examples}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {item.mechanism}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          6. FOODS THAT DYSREGULATE
      ══════════════════════════════════════════════════════ */}
      <section
        id="dysregulators"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                margin: '0 0 1rem',
              }}
            >
              What Disrupts the System
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              Foods That Dysregulate
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '56ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Reducing neuroinflammation is partly a subtraction problem. These patterns have strong
              evidence linking them to gut dysbiosis, HPA axis dysregulation, and increased
              depression and anxiety risk.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            {[
              {
                factor: 'Added Sugar',
                detail: 'Knüppel et al., BMJ, 2017',
                mechanism: 'High sugar intake is associated with 23% increased risk of common mental disorders in men (Knüppel et al., 2017). Mechanism: spikes in blood glucose followed by reactive hypoglycemia trigger cortisol release. Chronic high sugar depletes beneficial Bifidobacterium and feeds Candida and proteobacterial overgrowth.',
              },
              {
                factor: 'Ultra-Processed Foods',
                detail: 'Lane et al., Public Health Nutrition, 2022',
                mechanism: 'Lane et al. (2022) found a dose-response relationship: each additional serving of ultra-processed food increased depression risk by 10%, with the highest quintile showing 44% greater depression risk than the lowest. Emulsifiers, artificial sweeteners, and seed oils disrupt gut barrier integrity and alter microbiome composition.',
              },
              {
                factor: 'Alcohol',
                detail: 'REM suppressor + gut disruptor',
                mechanism: 'Even 1–2 drinks significantly suppress REM sleep in the second half of the night, fragmenting emotional memory consolidation. Acetaldehyde (alcohol metabolite) is directly toxic to gut bacteria, reducing Lactobacillus and Bifidobacterium. Chronic use increases intestinal permeability ("leaky gut"), allowing LPS endotoxin to enter circulation and trigger neuroinflammation.',
              },
              {
                factor: 'Industrial Seed Oils',
                detail: 'Omega-6:Omega-3 ratio 15:1 vs ancestral 2:1',
                mechanism: 'Corn, soybean, sunflower, and safflower oils have shifted the modern dietary omega-6:omega-3 ratio from an ancestral ~2:1 to 15–20:1. Excess arachidonic acid (omega-6) is the substrate for pro-inflammatory eicosanoids (PGE2, LTB4). This creates a chronic inflammatory background that amplifies stress response and HPA dysregulation.',
              },
            ].map(item => (
              <ScrollReveal key={item.factor}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid rgba(220,100,100,0.3)',
                    borderLeft: '3px solid rgba(220,100,100,0.6)',
                    borderRadius: '2px',
                    padding: '1.5rem',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.25rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {item.factor}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      color: '#8B3A3A',
                      fontWeight: 600,
                      fontStyle: 'italic',
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {item.detail}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                    {item.mechanism}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          8. FASTING & AUTOPHAGY
      ══════════════════════════════════════════════════════ */}
      <section
        id="fasting"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${OLIVE_PALE})`,
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                margin: '0 0 1rem',
              }}
            >
              Cellular Renewal
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              Fasting &amp; Autophagy
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '60ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              When you stop eating, a cascade of cellular repair mechanisms activates. Yoshinori
              Ohsumi won the 2016 Nobel Prize in Physiology for mapping autophagy &mdash; the
              process by which cells dismantle and recycle damaged components. Fasting is, among
              other things, a nervous system maintenance protocol.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
              marginBottom: '3.5rem',
            }}
          >
            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Time-Restricted Eating
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Satchin Panda&rsquo;s research at the Salk Institute shows that aligning eating to
                a 10&ndash;12 hour window &mdash; ideally during daylight hours &mdash; improves
                metabolic health, reduces systemic inflammation, and strengthens circadian rhythms.
                When you eat is as important as what you eat.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Wilkinson et al. (2020) conducted a 12-week RCT in metabolic syndrome patients using
                14:10 TRE (14 hours fasted, 10 hours eating window) without caloric restriction.
                Results: significant reductions in blood pressure, atherogenic lipids, fasting
                glucose, and self-reported sleep quality.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The parasympathetic nervous system governs digestion (rest and digest). When eating
                is compressed into daylight hours and the overnight fast is protected, the autonomic
                system spends more nighttime hours in repair mode rather than digestive mode &mdash;
                amplifying HRV and morning readiness.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                Autophagy &amp; Brain Health
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>Autophagy</strong> (Greek: &ldquo;self-eating&rdquo;) is the cellular
                quality-control process that degrades misfolded proteins, damaged organelles, and
                intracellular pathogens. It activates significantly during fasting states, typically
                after 14&ndash;16 hours without food.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                In the brain, autophagy is essential for clearing the protein aggregates associated
                with Parkinson&rsquo;s, Alzheimer&rsquo;s, and ALS. Impaired autophagy accelerates
                neurodegeneration; enhanced autophagy (through fasting, exercise, and certain
                plant compounds) is neuroprotective.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '0.875rem' }}>
                <strong>BDNF:</strong> Fasting significantly increases Brain-Derived Neurotrophic
                Factor, the brain&rsquo;s primary growth protein supporting neuroplasticity, learning,
                and mood. Mattson et al. (2018) showed that intermittent fasting increases
                hippocampal BDNF and improves cognitive resilience.
              </p>
              <div
                style={{
                  borderLeft: `3px solid ${OLIVE_MID}`,
                  padding: '1rem 1.25rem',
                  background: OLIVE_PALE,
                  borderRadius: '0 2px 2px 0',
                  marginTop: '0.5rem',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: OLIVE_DEEP, margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
                  Contemplative traditions &mdash; Ramadan, Yom Kippur, Lenten fasting, Buddhist
                  Uposatha, Vedic ekadashi &mdash; have embedded fasting into spiritual practice for
                  millennia. The intersection of neurological and contemplative effects is not
                  coincidental.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Fasting protocol cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                label: '12:12 — Entry Protocol',
                window: '12 hrs eating · 12 hrs fasted',
                timing: 'Beginner-friendly',
                steps: 'Finish dinner by 7pm; breakfast at 7am. Protects the overnight fast without heroic effort. Gets autophagy started in the final hours.',
              },
              {
                label: '16:8 — Standard TRE',
                window: '8 hrs eating · 16 hrs fasted',
                timing: 'Most studied protocol',
                steps: 'Eating window noon to 8pm, or 10am to 6pm (circadian-aligned). 16 hours fasted reliably activates autophagy and BDNF upregulation.',
              },
              {
                label: '5:2 — Modified Fast',
                window: '5 normal days · 2 very-low-calorie days',
                timing: 'Flexible weekly rhythm',
                steps: 'Two non-consecutive days of 500–600 kcal. Strong evidence for insulin sensitivity, inflammatory markers, and metabolic health. Contemplative alignment: consider coinciding with weekly intention-setting days.',
              },
            ].map(protocol => (
              <ScrollReveal key={protocol.label}>
                <div
                  style={{
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    padding: '1.5rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: OLIVE_DEEP,
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {protocol.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {protocol.window}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      color: OLIVE_DEEP,
                      fontStyle: 'italic',
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {protocol.timing}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                    {protocol.steps}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. SECTION DIVIDER (flip)
      ══════════════════════════════════════════════════════ */}
      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          10. ADAPTOGENS
      ══════════════════════════════════════════════════════ */}
      <section
        id="adaptogens"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                margin: '0 0 1rem',
              }}
            >
              Plant Intelligence
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              Adaptogens
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '56ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Adaptogens are a class of plants and fungi that help the organism adapt to stress
              by modulating the HPA axis, reducing allostatic load, and supporting homeostasis.
              The term was coined by Soviet pharmacologist Nikolai Lazarev in 1947. Evidence
              quality varies widely by compound.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            {adaptogens.map(a => (
              <ScrollReveal key={a.name}>
                <AdaptogenCard
                  name={a.name}
                  dose={a.dose}
                  evidence={a.evidence}
                  description={a.description}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Adaptogens caution callout */}
          <ScrollReveal>
            <div
              style={{
                border: `1px solid ${OLIVE_MID}`,
                borderLeft: `3px solid ${OLIVE_MID}`,
                padding: '1.5rem 1.75rem',
                background: OLIVE_PALE,
                borderRadius: '0 2px 2px 0',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: OLIVE_DEEP,
                  margin: '0 0 0.75rem',
                }}
              >
                Using Adaptogens Wisely
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.75,
                  margin: '0 0 0.75rem',
                }}
              >
                Adaptogens work cumulatively over weeks to months, not immediately. They support
                the system&rsquo;s capacity to handle stress rather than masking symptoms. Prioritize
                food-first: the fiber, polyphenols, and micronutrients in whole plants are the
                foundation. Adaptogens supplement that foundation.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                Contraindications exist for most adaptogens (pregnancy, thyroid conditions, autoimmune
                disease, drug interactions). Consult a qualified practitioner before use, especially
                with existing medications.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. SECTION DIVIDER
      ══════════════════════════════════════════════════════ */}
      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          12. THE 7-WEEK PROTOCOL
      ══════════════════════════════════════════════════════ */}
      <section
        id="protocol"
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: `color-mix(in srgb, var(--color-cream) 90%, ${OLIVE_PALE})`,
        }}
      >
        <div style={{ maxWidth: '860px' }}>
          <ScrollReveal>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                margin: '0 0 1rem',
              }}
            >
              The Path Forward
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              The 7-Week Protocol
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '52ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              Microbiome research suggests meaningful compositional shifts take 4&ndash;8 weeks of
              consistent dietary change. This phased protocol builds systematically &mdash; each phase
              creates the conditions for the next to work.
            </p>
          </ScrollReveal>

          <div className="timeline" style={{ paddingLeft: '2.5rem' }}>
            {[
              {
                step: '1',
                title: 'Phase 1 — Remove Triggers (Weeks 1–2)',
                desc: 'Eliminate ultra-processed foods, added sugars above 25g/day, industrial seed oils, and alcohol for two weeks. This is the hardest phase. Withdrawal from sugar and processed food is real — microbiome composition begins to shift within 3–5 days. Keep a food journal; notice energy, mood, and sleep quality changes.',
              },
              {
                step: '2',
                title: 'Phase 2 — Add Gut-Healing Foods (Weeks 3–4)',
                desc: 'Introduce daily fermented foods (at least one serving per meal), dramatically increase vegetable diversity (target 20+ plant species this week), add prebiotic fiber sources with every meal. Bone broth or collagen-rich foods support gut lining integrity. Track your plant variety count.',
              },
              {
                step: '3',
                title: 'Phase 3 — Optimize Neurotransmitters (Weeks 5–6)',
                desc: 'Add 1–2g EPA daily from fish oil or algae supplement. Begin magnesium glycinate (300–400mg before bed). Introduce turmeric with black pepper (or curcumin extract) daily. Consider adding a high-quality probiotic (Lactobacillus + Bifidobacterium strains). Notice changes in sleep quality, mood stability, and stress resilience.',
              },
              {
                step: '4',
                title: 'Phase 4 — Circadian Eating (Week 7+)',
                desc: 'Compress your eating window to 10–12 hours, aligned with daylight. Finish your last meal 2–3 hours before sleep. Front-load calories toward the first two-thirds of the day. Continue all previous phases. This phase integrates nutrition with circadian biology and amplifies every previous intervention.',
              },
            ].map(item => (
              <div key={item.step} style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <div
                  className="timeline-node"
                  style={{ background: OLIVE_DEEP }}
                >
                  {item.step}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--color-text)',
                    lineHeight: 1.75,
                    margin: '0 0 0.25rem',
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          13. "Now, practice." SEPARATOR + VIDEOS
      ══════════════════════════════════════════════════════ */}
      <div
        id="practice"
        style={{
          padding: '2.5rem max(1.5rem, 8vw)',
          background: OLIVE_DEEP,
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'rgba(143,160,118,0.3)' }} />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: OLIVE_MID,
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Now, practice.
        </p>
        <div style={{ flex: 1, height: '1px', background: 'rgba(143,160,118,0.3)' }} />
      </div>

      {/* Practice / Video section */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6.5rem) max(1.5rem, 8vw) clamp(5rem, 9vw, 8rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              Guided Practices
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              Guided practices for mindful eating, understanding your gut microbiome, and
              applying time-restricted eating with circadian awareness.
            </p>
          </ScrollReveal>

          {/* Pill tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0.625rem',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
            }}
          >
            {[
              { key: 'mindful-eating' as VideoTab, label: 'Mindful Eating' },
              { key: 'gut-health' as VideoTab, label: 'Gut Health' },
              { key: 'fasting' as VideoTab, label: 'Fasting & TRE' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveVideoTab(tab.key)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 1.125rem',
                  borderRadius: '9999px',
                  border: `1px solid ${activeVideoTab === tab.key ? OLIVE_DEEP : 'var(--color-border)'}`,
                  background:
                    activeVideoTab === tab.key ? OLIVE_DEEP : 'var(--color-surface-raised)',
                  color: activeVideoTab === tab.key ? '#ffffff' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Video grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '2rem',
            }}
          >
            {videoData[activeVideoTab].map(video => (
              <ScrollReveal key={video.videoId}>
                <div>
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '16 / 9',
                      marginBottom: '1rem',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    <VideoFacade videoId={video.videoId} title={video.title} />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 0.5rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {video.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {video.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          14. CROSS-LINKS FOOTER
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)',
          background: `linear-gradient(160deg, oklch(35% 0.08 130 / 0.18), oklch(93% 0.03 115))`,
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <ScrollReveal>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 0.75rem',
              }}
            >
              Nutrition Connects to Everything
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '52ch',
                lineHeight: 1.75,
              }}
            >
              What you eat sets the biological conditions for every practice on this site.
              Here is where to go next.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '1rem',
              marginBottom: '4rem',
            }}
          >
            {[
              {
                href: '/nervous-system',
                label: 'Nervous System',
                desc: 'How the gut-brain axis interfaces with polyvagal theory, HRV, and vagal tone training.',
              },
              {
                href: '/sleep',
                label: 'Sleep',
                desc: 'How nutrition timing, tryptophan, magnesium, and alcohol directly shape sleep architecture.',
              },
              {
                href: '/breathe',
                label: 'Breathwork',
                desc: 'Breathing practices that activate the vagus nerve — the same highway your gut uses to talk to your brain.',
              },
              {
                href: '/meditate',
                label: 'Meditate',
                desc: 'Mindfulness meditation reduces cortisol, modulates inflammatory cytokines, and supports gut barrier integrity.',
              },
              {
                href: '/somatics',
                label: 'Somatics',
                desc: 'Somatic practices release stored tension that disrupts the parasympathetic digestion window.',
              },
              {
                href: '/trauma',
                label: 'Trauma',
                desc: 'Unresolved trauma dysregulates the HPA axis and directly alters gut microbiome composition via cortisol.',
              },
              {
                href: '/temperature',
                label: 'Temperature',
                desc: 'Cold and heat exposure modulate inflammation via the same pathways as anti-inflammatory nutrition.',
              },
              {
                href: '/taichi',
                label: 'Tai Chi',
                desc: 'Traditional Chinese Medicine and tai chi both center on Jing — the foundational essence that nutrition either replenishes or depletes.',
              },
              {
                href: '/fasting',
                label: 'Fasting',
                desc: 'Fasting and nutrition are inseparable. What you eat in your eating window determines how cleanly you fast and how deeply autophagy is triggered.',
              },
              {
                href: '/psychedelics',
                label: 'Psychedelics',
                desc: 'Gut microbiome health influences serotonin production — the primary target of psychedelic compounds. Nutrition is psychedelic preparation.',
              },
            ].map(link => (
              <ScrollReveal key={link.href}>
                <Link
                  href={link.href}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div
                    style={{
                      background: 'var(--color-surface-raised)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '2px',
                      padding: '1.5rem',
                      transition: 'border-color 300ms ease',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: OLIVE_DEEP,
                        margin: '0 0 0.5rem',
                      }}
                    >
                      {link.label}
                    </p>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {link.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Closing blockquote */}
          <ScrollReveal>
            <blockquote
              style={{
                borderLeft: `3px solid ${OLIVE_MID}`,
                paddingLeft: '1.5rem',
                margin: 0,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-text)',
                  lineHeight: 1.7,
                  margin: '0 0 0.75rem',
                  maxWidth: '48ch',
                }}
              >
                &ldquo;All disease begins in the gut.&rdquo;
              </p>
              <cite
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}
              >
                Hippocrates &mdash; 400 BCE
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
