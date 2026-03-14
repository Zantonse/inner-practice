'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import VideoAccent from '@/components/VideoAccent';

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ source, stat, detail, url }: { source: string; stat: string; detail: string; url?: string }) {
  return (
    <div className="stat-card" style={{ borderRadius: '2px' }}>
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-amber-deep)',
          margin: '0 0 0.75rem',
        }}
      >
        {url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}>{source}</a> : source}
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

// ── Tool Card ─────────────────────────────────────────────────
function ToolCard({
  emoji,
  name,
  origin,
  description,
  bestFor,
}: {
  emoji: string;
  name: string;
  origin: string;
  description: string;
  bestFor: string;
}) {
  return (
    <div className="card" style={{ padding: '1.75rem', borderRadius: '2px' }}>
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{emoji}</div>
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-amber-deep)',
          margin: '0 0 0.375rem',
        }}
      >
        {origin}
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.3rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: '0 0 0.75rem',
          fontStyle: 'normal',
        }}
      >
        {name}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--color-text-muted)',
          margin: '0 0 1.25rem',
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>
      <span
        style={{
          display: 'inline-block',
          padding: '0.3rem 0.75rem',
          borderRadius: '9999px',
          background: 'color-mix(in srgb, var(--color-amber-light) 25%, var(--color-cream))',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          color: 'var(--color-amber-deep)',
        }}
      >
        Best for: {bestFor}
      </span>
    </div>
  );
}

// ── Toolkit Accordion Item ────────────────────────────────────
function ToolkitItem({
  number,
  name,
  tagline,
  body,
  tip,
  isOpen,
  onToggle,
}: {
  number: number;
  name: string;
  tagline: string;
  body: string;
  tip: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
      <div className="timeline-node">{number}</div>
      <div
        style={{
          background: 'var(--color-surface-raised)',
          border: `1px solid ${isOpen ? 'var(--color-amber-light)' : 'var(--color-border)'}`,
          borderRadius: '2px',
          overflow: 'hidden',
          transition: 'border-color 300ms ease',
        }}
      >
        <button
          onClick={onToggle}
          style={{
            width: '100%',
            padding: '1.375rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                fontStyle: 'italic',
                color: 'var(--color-text-muted)',
                margin: '0 0 0.25rem',
              }}
            >
              {tagline}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 600,
                color: isOpen ? 'var(--color-amber-deep)' : 'var(--color-text)',
                margin: 0,
                fontStyle: 'normal',
                transition: 'color 300ms ease',
              }}
            >
              {name}
            </h3>
          </div>
          <div
            style={{
              flexShrink: 0,
              color: 'var(--color-text-muted)',
              transition: 'transform 300ms ease',
              transform: isOpen ? 'rotate(180deg)' : 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div
            style={{
              padding: '0 1.75rem 1.75rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--color-text)',
                margin: '1.25rem 0 1.25rem',
                lineHeight: 1.8,
              }}
            >
              {body}
            </p>
            <div
              style={{
                padding: '1rem 1.25rem',
                background: 'color-mix(in srgb, var(--color-amber-light) 15%, var(--color-cream))',
                borderLeft: '3px solid var(--color-amber-light)',
                borderRadius: '0 2px 2px 0',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-amber-deep)',
                  margin: '0 0 0.375rem',
                }}
              >
                Practice note
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-text)',
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                {tip}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Toolkit Data ──────────────────────────────────────────────
const toolkitItems = [
  {
    number: 1,
    name: 'John Barnes MFR',
    tagline: 'Myofascial Release',
    body: 'The John F. Barnes method is the gold standard of hands-on fascial work. It relies on one critical factor: time. Gentle, sustained pressure must be held for 90–120 seconds minimum before fascial tissue begins to "creep" — its slow, viscoelastic yielding. Most massage is too fast to reach the fascia; MFR waits for it. Therapists apply gentle, cross-hand compression or stretching into the tissue barrier, then hold without movement until release is felt.',
    tip: 'Self-applied MFR: place a tennis ball on the floor, position a tight area on top of it, and simply wait with sustained, gentle pressure for 90 seconds minimum. Do not roll back and forth.',
  },
  {
    number: 2,
    name: 'Cupping',
    tagline: 'Myofascial Decompression',
    body: 'The complement to gua sha: where scraping compresses and shears, cupping lifts and separates. Negative pressure (–200 to –400 mmHg) draws skin and superficial fascia away from the muscle, separating adhered layers and drawing blood into hypoxic tissue. Christopher DaPrato\'s Myofascial Decompression protocol combines cup placement with active movement — placing a cup on the posterior hip and performing slow hip circles amplifies the mechanotransduction signal dramatically. Silicone cups make this accessible at home without fire or pumps.',
    tip: 'Use gua sha and cupping together: scrape first to break collagen cross-links, then cup the same area to separate the freed layers and flood them with fresh blood. Compression + decompression in sequence is more effective than either alone.',
  },
  {
    number: 3,
    name: 'Foam Rolling',
    tagline: 'Self-Myofascial Release',
    body: 'Science confirms foam rolling improves short-term range of motion, reduces muscle soreness (DOMS), and may decrease perception of pain. The mechanism is debated: it likely works through neurological feedback (reducing muscle guarding) as much as through direct structural tissue change. An evidence-based protocol: roll slowly (1 inch per second), pause on tender spots for 20–30 seconds, and work the tissue proximal to the pain point rather than directly on it.',
    tip: 'Roll the IT band\'s origin at the TFL (tensor fascia latae) — the hip — rather than the band itself. The band is too dense to meaningfully compress; the hip is where you create change.',
  },
  {
    number: 4,
    name: 'Yin Yoga',
    tagline: 'Fascial Creep Through Stillness',
    body: 'Yin yoga targets what active movement cannot: the deep connective tissue. By holding passive shapes for 3–5 minutes, you allow muscles to relax fully and let gravitational force communicate directly with the fascial layer. This extended hold triggers "fascial creep" — slow deformation and eventual rehydration of the collagen matrix. Poses like Butterfly, Dragon, Swan, and Shoelace directly target the Deep Front Line, the IT band, and the hip capsule.',
    tip: 'Find your "edge" — the first point of clear sensation — and stop there. Going further contracts the muscle protectively. Yin works in the space of stillness, not through force.',
  },
  {
    number: 5,
    name: 'Fascial Fitness',
    tagline: 'The Catapult Mechanism',
    body: 'Dr. Robert Schleip\'s research reveals that healthy fascia acts like a spring, not just a container. When you load it eccentrically (lengthen under tension) and release, it "catapults" energy — this is how kangaroos hop and Achilles tendons run. Training this elasticity requires bouncy, oscillatory movements: rebounding, skipping, small-amplitude jumps. Sedentary posture destroys this spring quality over years. Fascial fitness restores it.',
    tip: 'Two minutes of gentle bouncing or rebounding first thing in the morning rehydrates your fascial system, activates the spring mechanism, and is arguably the single most efficient investment in long-term tissue health.',
  },
  {
    number: 6,
    name: 'Nutrition',
    tagline: 'Nutrition for the Web',
    body: 'Fascia is living collagen. It requires specific nutritional inputs: Vitamin C is the essential cofactor for collagen cross-linking — without it, newly synthesized collagen is structurally weak. Glycine and proline (abundant in bone broth) are the primary amino acid building blocks. Hyaluronic acid production depends on adequate water intake — dehydration literally stiffens the fascial glide surface. The two greatest dietary enemies of fascia are refined sugar (which creates AGEs — Advanced Glycation End-products that permanently cross-link and stiffen collagen) and chronically elevated cortisol, which actively degrades collagen.',
    tip: 'The simplest protocol: 500ml of water within 30 minutes of waking, a collagen or bone broth supplement with vitamin C, and elimination of refined sugar. These three changes alone produce measurable tissue quality improvements within 3–6 months.',
  },
  {
    number: 7,
    name: 'The 10-Minute Daily Routine',
    tagline: 'Morning & Evening Protocol',
    body: 'Morning (5 min): Drink 500ml water. 2 minutes of gentle bouncing or rebounding to rehydrate the matrix and wake the spring mechanism. 2 minutes of dynamic, multi-planar spinal movements — cat-cow, side bends, gentle twists. 1 minute of rolling the soles of the feet with a ball to stimulate the plantar fascia and begin releasing the Superficial Back Line from the ground up.\n\nEvening (5 min): Choose one Yin yoga posture — Butterfly, Swan, or Supine Twist — and hold for 3–4 minutes. Follow with 1 minute of neurogenic shaking: stand with loose knees and let the legs vibrate gently, allowing the oscillation to travel up through the body. This discharges accumulated daily tension from the nervous system.',
    tip: 'The evening shaking practice is drawn from TRE (Tension and Trauma Releasing Exercises) developed by Dr. David Berceli. The body\'s natural response to stress includes shaking — animals do this instinctively after threat. We have been socially conditioned to suppress it.',
  },
];

// ── Practitioner Secrets Data ─────────────────────────────────
const secrets = [
  {
    number: 1,
    title: 'Fascia stores emotional trauma as physical restriction',
    body: 'Chronic sympathetic nervous system activation (fight-or-flight) triggers TGF-β1, a pro-fibrotic cytokine that converts normal fibroblasts into contractile myofibroblasts. Stress doesn\'t just feel like tension — it biochemically manufactures physical restriction. Somatic release is a real, measurable fascial event.',
  },
  {
    number: 2,
    title: 'The pain is almost never where the restriction is',
    body: 'Because of biotensegrity — the body\'s web of balanced fascial tension — a stuck plantar fascia can cause neck pain. A tight psoas can generate knee problems. A jaw restriction can produce back pain. Treating symptoms directly often fails because the source is three fascial lines away.',
  },
  {
    number: 3,
    title: 'Eccentric training is superior for fascia',
    body: 'Lengthening a muscle under load (the downward phase of a squat, the lowering phase of a bicep curl) builds more resilient fascial elasticity than concentric (shortening) movements. Eccentric training lays down collagen in a more organized, functional architecture.',
  },
  {
    number: 4,
    title: 'Fascia remodels slowly — 6 to 24 months',
    body: 'The cells that lay down new collagen (fibroblasts) take months to restructure fascial architecture. You will not feel significant structural change from one session. But you will feel it after six months of consistent practice. This is why practitioners who quit after four weeks never discover what their body was capable of becoming.',
  },
  {
    number: 5,
    title: 'Sedentary posture is the most destructive thing for fascia',
    body: 'Holding one shape (sitting at a desk for eight hours) causes fascia to lay down collagen cross-links that cement you into that posture. The tissue quite literally adapts to the shape you hold most. This is why dedicated practice sessions are insufficient if you sit for ten hours between them. Move every 30 minutes — even 2 minutes of varied movement interrupts the cross-linking cascade.',
  },
  {
    number: 6,
    title: 'Sugar and cortisol are fascia\'s worst enemies',
    body: 'High blood sugar creates Advanced Glycation End-products (AGEs) that form irreversible bonds between collagen fibers, permanently reducing elasticity. Chronically elevated cortisol actively degrades collagen and inhibits its synthesis. Fascia health is as much a metabolic and stress-management project as it is a physical one.',
  },
  {
    number: 7,
    title: 'Fascia is the organ of presence',
    body: 'With approximately 250 million sensory nerve endings — more than skin, more than eyes — fascia is the biological hardware of interoception: the felt sense of the inner body. When experienced meditators describe a shift from "watching the breath" to "being inside the body," they are describing a shift in fascial awareness. The body-scan meditation is, at its deepest level, a fascial listening practice.',
  },
];

// ── Main Component ────────────────────────────────────────────
export default function FasciaClient() {
  const [openToolkit, setOpenToolkit] = useState<number | null>(7);

  const toggleToolkit = (n: number) => {
    setOpenToolkit(prev => (prev === n ? null : n));
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(3rem, 6vw, 5rem)',
          background: 'linear-gradient(160deg, oklch(65% 0.09 35 / 0.45), oklch(93% 0.04 50))',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative breathing web orb */}
        <div
          className="breathe"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-6vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(220px, 38vw, 440px)',
            height: 'clamp(220px, 38vw, 440px)',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, oklch(72% 0.1 35 / 0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1100px', position: 'relative' }}>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-amber-deep)',
              margin: '0 0 1.25rem',
            }}
          >
            Connective Tissue &amp; Release
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              color: 'var(--color-text)',
              lineHeight: 1.05,
              margin: '0 0 1.25rem',
              maxWidth: '12ch',
            }}
          >
            The Living Web
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
              color: 'var(--color-text-muted)',
              margin: '0 0 2.5rem',
              maxWidth: '50ch',
              lineHeight: 1.85,
            }}
          >
            Your body&apos;s hidden communication network. 250 million nerve endings. The physical
            substrate of emotion, the mirror of your meridians, and the forgotten foundation of every yoga pose you&apos;ve ever held.
          </p>

          {/* Hero image */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(200px, 40vw, 420px)',
              aspectRatio: '4/3',
              borderRadius: '2px',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
              display: 'none',
            }}
          >
            <Image
              src="/images/hero-fascia.webp"
              alt="Abstract watercolor illustration of fascia web tissue"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Anchor nav */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['Science', 'Gua Sha', 'Cupping', 'Toolkit', 'Spirit', 'Secrets'].map(label => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(' ', '-')}`}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-amber-deep)',
                  textDecoration: 'none',
                  borderBottom: '1px solid color-mix(in srgb, var(--color-amber-light) 60%, transparent)',
                  paddingBottom: '2px',
                  transition: 'color 300ms ease, border-color 300ms ease',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHAT IS FASCIA
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(3rem, 5vw, 4.5rem)',
          background: 'var(--color-cream)',
        }}
      >
        <div style={{ maxWidth: '1100px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'start',
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
                  margin: '0 0 1.25rem',
                }}
              >
                Foundation
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h2)',
                  fontWeight: 400,
                  color: 'var(--color-text)',
                  margin: '0 0 1.75rem',
                  lineHeight: 1.2,
                }}
              >
                What is Fascia?
              </h2>
              <p style={{ marginBottom: '1.25rem', lineHeight: 1.85 }}>
                For centuries, anatomists treated fascia as inert &ldquo;packing material&rdquo; — the white, fibrous
                stuff to be cut away so they could study the &ldquo;real&rdquo; structures. Today, science recognizes
                fascia as a <strong>dynamic, living, mechanically active organ system</strong> that permeates the entire
                human body. It wraps, separates, and connects every muscle, bone, nerve, artery, and organ in a
                continuous three-dimensional web.
              </p>
              <p style={{ marginBottom: '1.25rem', lineHeight: 1.85 }}>
                Fascia is composed of collagen and elastin fibers (providing strength and springy recoil), suspended
                in a fluid gel-like ground substance rich in <strong>hyaluronic acid</strong>. When healthy, this
                ground substance allows fascial layers to glide frictionlessly. Crucially, fascia contains specialized
                cells (myofibroblasts) with smooth muscle actin — meaning fascia can actively contract,
                independently of conscious muscle movement, often in direct response to autonomic stress.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <p style={{ lineHeight: 1.85, marginBottom: '1.25rem', marginTop: 'clamp(0rem, 2vw, 2rem)' }}>
                In 2018, researchers using live-tissue imaging discovered something that changed anatomy:
                what appeared as solid collagen walls in cadaver tissue was actually a fluid-filled, open highway
                in living humans — a body-wide shock absorber and communication network. This interstitium
                discovery reframed fascia as perhaps the body&apos;s most architecturally important tissue.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The key insight is <strong>biotensegrity</strong>: the body is not stacked like a tower of bricks
                but held in a continuous web of balanced fascial tension. Bones &ldquo;float&rdquo; within this network.
                A restriction in your plantar fascia can pull through the entire web, generating pain in your neck
                or shoulders. This is why treating the symptom almost never resolves the cause — you must find
                where the web is stuck.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <VideoAccent
        src="/videos/fascia-loop.mp4"
        poster="/videos/fascia-poster.jpg"
      />

      {/* ══════════════════════════════════════════════════════
          THE SCIENCE
      ══════════════════════════════════════════════════════ */}
      <section
        id="science"
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(3.5rem, 6vw, 5.5rem)',
          background: 'color-mix(in srgb, var(--color-cream) 88%, var(--color-violet-mid))',
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
              Research
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 400,
                color: 'var(--color-text)',
                margin: '0 0 3rem',
              }}
            >
              The Science
            </h2>
          </ScrollReveal>

          <ScrollReveal group>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              <StatCard
                source="Schleip et al. — Fascia Research"
                stat="250 million nerve endings — more than skin or eyes"
                detail="Fascia is the body's largest sensory organ, providing the biological hardware for interoception: the felt sense of the body's interior that underlies all body-scan and somatic meditation."
                url="https://pubmed.ncbi.nlm.nih.gov/22440512/"
              />
              <StatCard
                source="Langevin, Harvard — 2002"
                stat="80% of acupuncture points map to fascial planes"
                detail="A landmark Harvard study found that 80% of acupuncture points and 50% of meridian pathways correspond directly to connective tissue planes — suggesting the body's ancient energy maps are anatomically real."
                url="https://pubmed.ncbi.nlm.nih.gov/11893556/"
              />
              <StatCard
                source="NIH Microdialysis Research"
                stat="pH below 5.0 at active trigger points"
                detail="Active fascial trigger points create a biochemical environment as acidic as vinegar — activating the same pain receptors triggered by capsaicin (chili peppers). This is the fascia's hidden pain generator."
                url="https://pubmed.ncbi.nlm.nih.gov/18439759/"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHEN FASCIA GETS STUCK
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4.5rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
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
              Pathology
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
              When Fascia Gets Stuck
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
              Immobility, chronic stress, injury, and repetitive postural patterns cause the hyaluronic acid
              in fascia to thicken and superaggregate. The tissue loses its glide, forming sticky adhesions
              that compress nerves and restrict movement.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            <ScrollReveal>
              <div
                style={{
                  padding: '1.75rem',
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  borderLeft: '3px solid var(--color-violet-mid)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 0.75rem',
                    fontStyle: 'normal',
                  }}
                >
                  Fascial Adhesions
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                    margin: 0,
                    lineHeight: 1.75,
                  }}
                >
                  When fascial layers that should glide freely begin sticking together, they form adhesions.
                  These restrict range of motion and create the "pulling" sensation of tightness. Adhesions
                  can compress capillaries, creating localized areas of metabolic waste accumulation — the
                  &ldquo;energy crisis&rdquo; at the heart of trigger points.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div
                style={{
                  padding: '1.75rem',
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  borderLeft: '3px solid var(--color-amber-light)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 0.75rem',
                    fontStyle: 'normal',
                  }}
                >
                  The Stress-to-Fibrosis Pathway
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                    margin: 0,
                    lineHeight: 1.75,
                  }}
                >
                  Chronic sympathetic activation releases <strong>TGF-β1</strong>, a pro-fibrotic cytokine
                  that converts normal fibroblasts into contractile myofibroblasts. These cells actively
                  tighten the fascial web and lay down excess collagen. Stress doesn&apos;t just feel like
                  tension — it biochemically manufactures physical restriction.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div
                style={{
                  padding: '1.75rem',
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  borderLeft: '3px solid var(--color-linen)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: '0 0 0.75rem',
                    fontStyle: 'normal',
                  }}
                >
                  The Psoas: Muscle of Fear
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                    margin: 0,
                    lineHeight: 1.75,
                  }}
                >
                  The psoas major connects the lumbar spine to the femur — the body&apos;s primary &ldquo;fear muscle,&rdquo;
                  contracting instantly to curl us into a fetal position under threat. Richly innervated by the
                  sympathetic nervous system, chronic stress leaves the psoas in perpetual low-grade contraction.
                  This is why deep hip openers trigger unexpected emotional releases: you are literally
                  unwinding stored fear from the body.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          GUA SHA
      ══════════════════════════════════════════════════════ */}
      <section
        id="gua-sha"
        style={{
          padding: 'clamp(5rem, 8vw, 8rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6.5rem)',
          background: 'color-mix(in srgb, var(--color-cream) 94%, var(--color-linen))',
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
              Ancient Technique
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
              Gua Sha &amp; Scraping
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
              2,000 years of Traditional Chinese Medicine. Validated by modern microcirculation research.
              The most direct way to mechanically break fascial adhesions and restore tissue hydration.
            </p>
          </ScrollReveal>

          {/* What + How */}
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
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                What it Does
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Gua sha involves scraping lubricated skin with a smooth-edged tool to create controlled
                mechanical shearing across the fascial layer. This produces <em>petechiae</em> (redness or
                slight bruising called &ldquo;sha&rdquo;) by rupturing stagnant capillaries in congested tissue.
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                The science: scraping increases local microperfusion by <strong>up to 400%</strong>. The minor
                superficial trauma upregulates Heme Oxygenase-1 (HO-1), triggering a powerful
                anti-inflammatory healing cascade. Cross-linked collagen adhesions are physically broken
                and the ground substance is rehydrated. Western clinical equivalents — IASTM (Instrument-Assisted
                Soft Tissue Mobilization) and the Graston Technique — produce identical physiological effects.
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
                The Technique
              </h3>
              <div className="timeline" style={{ paddingLeft: '2.5rem' }}>
                {[
                  { step: '1', text: 'Apply a generous layer of oil (sesame is traditional; coconut or jojoba work well).' },
                  { step: '2', text: 'Hold the tool at a 15–30 degree angle to the skin.' },
                  { step: '3', text: 'Use firm, unidirectional strokes 4–8 inches long, always working toward the heart.' },
                  { step: '4', text: 'Work each area for 5–15 minutes. Redness or petechiae (small red spots) are normal and expected.' },
                  { step: '5', text: 'Drink 500ml water after treatment to support lymphatic clearance.' },
                ].map((item) => (
                  <div
                    key={item.step}
                    style={{ position: 'relative', marginBottom: '1rem' }}
                  >
                    <div className="timeline-node" style={{ background: 'var(--color-amber-deep)' }}>
                      {item.step}
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text)',
                        margin: 0,
                        lineHeight: 1.7,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Tool Comparison */}
          <ScrollReveal>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                margin: '0 0 1.5rem',
              }}
            >
              Tool Comparison
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem',
            }}
          >
            {[
              {
                emoji: '🐃',
                name: 'Buffalo Horn',
                origin: 'Traditional TCM',
                description: 'The classical gua sha tool. Cooling energetically (yin). Excellent heat conductivity — removes heat from inflamed tissue. Medium weight with a good grip.',
                bestFor: 'Back, shoulders, full-body',
              },
              {
                emoji: '🪨',
                name: 'Bian Stone',
                origin: 'Most prized in TCM',
                description: 'The oldest tool in Traditional Chinese Medicine. Dense volcanic stone that emits far-infrared radiation and negative ions. Heavy, deeply penetrating pressure.',
                bestFor: 'Deep tissue, chronic restriction',
              },
              {
                emoji: '⚙️',
                name: 'Stainless Steel',
                origin: 'Clinical / IASTM',
                description: 'Modern clinical standard. Maximum durability, sterilizable, and preferred by physical therapists for IASTM and Graston technique. Most precise feedback.',
                bestFor: 'Clinical use, precision work',
              },
              {
                emoji: '💎',
                name: 'Jade / Rose Quartz',
                origin: 'Modern wellness',
                description: 'Light-weight tools favored for facial gua sha. Too gentle for deep myofascial work but excellent for lymphatic drainage, reducing facial puffiness, and daily face lifting.',
                bestFor: 'Face, neck, lymphatics',
              },
            ].map((tool) => (
              <ScrollReveal key={tool.name}>
                <ToolCard {...tool} />
              </ScrollReveal>
            ))}
          </div>

          {/* Safety callout */}
          <ScrollReveal>
            <div
              style={{
                padding: '1.5rem 1.75rem',
                background: 'color-mix(in srgb, var(--color-linen) 60%, var(--color-cream))',
                border: '1px solid var(--color-taupe)',
                borderRadius: '2px',
                borderTop: '3px solid var(--color-amber-deep)',
                maxWidth: '700px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-amber-deep)',
                  margin: '0 0 0.75rem',
                }}
              >
                Contraindications — Read Before You Begin
              </p>
              <ul
                style={{
                  margin: 0,
                  padding: '0 0 0 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {[
                  'Do not scrape over open wounds, cuts, or active skin infections.',
                  'Avoid varicose veins, bruises, sunburn, or inflamed skin.',
                  'Contraindicated if taking blood thinners or anticoagulants.',
                  'Do not use directly over bony prominences or the spine.',
                  'The redness (sha) typically fades in 2–5 days — this is normal.',
                  'Consult a physician if you have a bleeding disorder, skin condition, or are pregnant.',
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.65,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CUPPING
      ══════════════════════════════════════════════════════ */}
      <section
        id="cupping"
        style={{
          padding: 'clamp(5rem, 8vw, 8rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6.5rem)',
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
              Decompression Therapy
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
              Cupping &amp; Myofascial Decompression
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
              Where gua sha compresses, cupping lifts. Negative pressure separates adhered fascial layers,
              draws blood into hypoxic tissue, and creates the space your fascia needs to glide.
            </p>
          </ScrollReveal>

          {/* Mechanism + Comparison */}
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
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: '0 0 1rem',
                  fontStyle: 'normal',
                }}
              >
                The Science of Decompression
              </h3>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                A cup evacuated of air creates <strong>negative pressure</strong> (–200 to –400 mmHg),
                lifting skin, superficial fascia, and subcutaneous tissue <em>away</em> from the underlying muscle.
                This produces two structural effects: <strong>layer separation</strong> between adhered fascial
                planes, and <strong>fluid redistribution</strong> as blood and interstitial fluid rush into the
                decompressed zone.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1rem' }}>
                Mechanical deformation of the vascular endothelium triggers <strong>nitric oxide (NO)</strong> release — a
                potent local vasodilator. Hyperemia continues 15–30 minutes after cup removal. The cup marks
                (ecchymosis) activate the same <strong>HO-1 anti-inflammatory cascade</strong> as gua sha petechiae:
                heme breaks down into bilirubin (antioxidant) and carbon monoxide (anti-inflammatory signaling).
              </p>
              <p style={{ lineHeight: 1.85, margin: 0 }}>
                Langevin et al. (2006) demonstrated that tensile load on fibroblasts — exactly what cupping
                delivers — triggers cytoskeletal remodeling, MMP-mediated collagen turnover, and new collagen
                synthesis. Cupping applies this tensile load across a broad tissue area simultaneously.
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
                Compression vs. Decompression
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--color-border)', borderRadius: '2px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                {[
                  ['', 'Gua Sha', 'Cupping'],
                  ['Force', 'Into tissue', 'Lifting away'],
                  ['Fascia effect', 'Shears cross-links', 'Separates layers'],
                  ['Fluid effect', 'Forces out, rebounds', 'Draws blood in'],
                  ['Best for', 'Dense adhesions', 'Layer separation'],
                ].map((row, i) => (
                  i === 0 ? (
                    <div key={i} style={{ display: 'contents' }}>
                      <div style={{ background: 'var(--color-surface-raised)', padding: '0.75rem 1rem', fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-amber-deep)', gridColumn: '1 / 2' }}>{row[1]}</div>
                      <div style={{ background: 'var(--color-surface-raised)', padding: '0.75rem 1rem', fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-amber-deep)' }}>{row[2]}</div>
                    </div>
                  ) : (
                    <div key={i} style={{ display: 'contents' }}>
                      <div style={{ background: 'var(--color-surface-raised)', padding: '0.625rem 1rem' }}>
                        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 0.25rem' }}>{row[0]}</p>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text)', margin: 0 }}>{row[1]}</p>
                      </div>
                      <div style={{ background: 'var(--color-surface-raised)', padding: '0.625rem 1rem' }}>
                        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0 0 0.25rem' }}>{row[0]}</p>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text)', margin: 0 }}>{row[2]}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
                Many skilled practitioners use both in the same session: gua sha first to break cross-linked
                collagen adhesions, cupping second to separate remaining adhered layers and flood the area
                with fresh blood. Compression cannot separate stuck fascial layers — it adds more load to
                already-compressed, hypoxic tissue. Decompression creates the space for layers to slide.
              </p>
            </ScrollReveal>
          </div>

          {/* Self-Cupping Technique */}
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
              Self-Cupping with Silicone Cups
            </h3>
            <p style={{ lineHeight: 1.85, marginBottom: '1.5rem', maxWidth: '56ch' }}>
              Silicone cups compress, seal, and self-suction — no flame or pump required. The practical home tool
              for fascial decompression.
            </p>
            <div className="timeline" style={{ paddingLeft: '2.5rem', marginBottom: '2rem' }}>
              {[
                { step: '1', text: 'Apply light oil (jojoba, sesame, or coconut) to create a seal without excess slip.' },
                { step: '2', text: 'Squeeze the cup, place on skin, release. Skin should lift 2–3mm. More than 5mm or sharp pain = reduce suction.' },
                { step: '3', text: 'Stationary: hold 5–10 minutes. Sliding: move at 1–2 inches per second with long, directional strokes.' },
                { step: '4', text: 'Remove by pressing adjacent skin to break the seal — never pull the cup by the rim.' },
                { step: '5', text: 'Drink 500ml water. Move lightly or stretch within 30–60 minutes. Marks resolve in 3–7 days.' },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{ position: 'relative', marginBottom: '1rem' }}
                >
                  <div className="timeline-node" style={{ background: 'var(--color-amber-deep)' }}>
                    {item.step}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--color-text)',
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Research Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
            }}
          >
            <ScrollReveal>
              <StatCard
                source="Langevin et al., 2006"
                stat="Fibroblasts remodel in minutes"
                detail="Tensile mechanical load triggers cytoskeletal reorganization, MMP-mediated collagen turnover, and new collagen synthesis in connective tissue fibroblasts."
                url="https://pubmed.ncbi.nlm.nih.gov/16645126/"
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Abo-Raya, 2018"
                stat="Cupping outperformed laser therapy"
                detail="RCT showed dry cupping produced greater improvements in pressure pain threshold and cervical range of motion for upper trapezius trigger points vs. low-level laser."
                url="https://pubmed.ncbi.nlm.nih.gov/29706756/"
              />
            </ScrollReveal>
            <ScrollReveal>
              <StatCard
                source="Al-Bedah et al., 2019"
                stat="Multi-pathway mechanism confirmed"
                detail="Comprehensive review synthesized cupping's circulatory, neurological, immunological, and fascial mechanisms. The most cited modern mechanism paper."
                url="https://pubmed.ncbi.nlm.nih.gov/30671385/"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          COMPLETE TOOLKIT
      ══════════════════════════════════════════════════════ */}
      <section
        id="toolkit"
        style={{
          padding: 'clamp(4.5rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: 'color-mix(in srgb, var(--color-cream) 92%, var(--color-violet-mid))',
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
              Methods
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
              The Complete Toolkit
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
              Maintaining a healthy fascial system requires a multi-disciplinary approach. Each method communicates
              with a different aspect of the living web. Tap each to expand.
            </p>
          </ScrollReveal>

          <div className="timeline" style={{ maxWidth: '800px' }}>
            {toolkitItems.map((item) => (
              <ScrollReveal key={item.number}>
                <ToolkitItem
                  {...item}
                  isOpen={openToolkit === item.number}
                  onToggle={() => toggleToolkit(item.number)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          CRANIOSACRAL THERAPY
      ══════════════════════════════════════════════════════ */}
      <section
        id="craniosacral"
        style={{
          padding: 'clamp(4.5rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: 'var(--color-cream)',
          borderTop: '1px solid var(--color-border)',
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
              Practitioner-Assisted
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
              Craniosacral Therapy
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
              A gentle, hands-on modality that works with the fascial membrane surrounding the brain and spinal cord &mdash; the dural tube. What the evidence supports, what it doesn&apos;t, and where it fits.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-amber-deep)', margin: '0 0 0.75rem' }}>The Dural Connection</p>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
                  The dura mater &mdash; the outermost meningeal layer &mdash; runs as a continuous fascial tube from the inside of the skull to the sacrum. This is real anatomy, not metaphor. CST practitioners apply approximately 5 grams of pressure (the weight of a nickel) to the skull and sacrum, working with this fascial membrane to release restrictions. Modern fascia research confirms the tissue contains abundant mechanoreceptors and has contractile properties via myofibroblasts.
                </p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-amber-deep)', margin: '0 0 0.75rem' }}>ANS Regulation</p>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
                  The most scientifically credible mechanism: gentle cranial touch may stimulate afferent mechanoreceptors that feed into brainstem nuclei involved in autonomic regulation. A 2024 meta-analysis of HRV studies (Cook et al., PMC11329942) found a moderate short-term increase in parasympathetic activity after CST (HF-HRV SMD = &minus;0.46). A 2023 RCT in firefighter cadets (W&oacute;jcik et al.) showed CST significantly reduced cortisol (p &le; 0.0001) and CRH levels after just 5 sessions.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
              <div style={{ borderLeft: '3px solid var(--color-amber-deep)', padding: '1.5rem 1.75rem', background: 'var(--color-surface-raised)', borderRadius: '2px' }}>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-amber-deep)', margin: '0 0 0.75rem' }}><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11329942/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Cook et al. 2024</a></p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>Moderate parasympathetic increase after CST</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>HF-HRV meta-analysis shows a significant short-term shift toward vagal tone &mdash; the most objective evidence supporting CST&apos;s nervous system claims.</p>
              </div>
              <div style={{ borderLeft: '3px solid var(--color-amber-deep)', padding: '1.5rem 1.75rem', background: 'var(--color-surface-raised)', borderRadius: '2px' }}>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-amber-deep)', margin: '0 0 0.75rem' }}><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10970181/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Fernandez-Carnero et al. 2024</a></p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>No significant clinical benefit across 15 RCTs</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>The most rigorous 2024 systematic review found CST produces no statistically significant improvements for any musculoskeletal or non-musculoskeletal condition tested.</p>
              </div>
              <div style={{ borderLeft: '3px solid var(--color-amber-deep)', padding: '1.5rem 1.75rem', background: 'var(--color-surface-raised)', borderRadius: '2px' }}>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-amber-deep)', margin: '0 0 0.75rem' }}><a href="https://www.mdpi.com/2076-328X/13/11/914" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}>W&oacute;jcik et al. 2023</a></p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 600, color: 'var(--color-text)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>Cortisol significantly reduced after 5 CST sessions</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>Firefighter cadets showed significantly reduced stress hormones (cortisol p &le; 0.0001, CRH p = 0.00067) vs. control &mdash; though the study lacked a sham condition.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div style={{ background: 'color-mix(in srgb, var(--color-amber-light) 10%, var(--color-cream))', border: '1px solid color-mix(in srgb, var(--color-amber-light) 30%, var(--color-border))', borderRadius: '2px', padding: '2rem 2.25rem', maxWidth: '780px' }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-amber-deep)', margin: '0 0 1rem' }}>Honest Boundaries</p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, margin: '0 0 1rem' }}>
                The <strong style={{ color: 'var(--color-text)' }}>cranial rhythmic impulse</strong> &mdash; the foundational theoretical construct of CST &mdash; has poor inter-rater reliability. Multiple studies show practitioners cannot agree on its rate or quality in the same patient. Adult cranial sutures are fused and have minimal clinically significant motion.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, margin: '0 0 1rem' }}>
                The two largest 2024 meta-analyses (Fernandez-Carnero, 15 RCTs; Amendolara, 24 RCTs / 1,613 participants) both concluded CST demonstrates <strong style={{ color: 'var(--color-text)' }}>no significant effects for any studied indication</strong>. GRADE evidence quality ranges from very low to low.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
                What <em>is</em> supported: CST is low-risk, produces genuine relaxation, and may support short-term autonomic regulation via vagal modulation. The fascial release component sits on more solid biological ground than the CRI theory. If you pursue CST, understand it as a gentle somatic modality that may complement your self-practice &mdash; not as a replacement for evidence-based treatment.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider flip />

      {/* ══════════════════════════════════════════════════════
          THE INNER BODY — SPIRIT & ENERGY
      ══════════════════════════════════════════════════════ */}
      <section
        id="spirit"
        style={{
          padding: 'clamp(5rem, 8vw, 8rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6.5rem)',
          background: 'linear-gradient(160deg, oklch(75% 0.12 295 / 0.15), oklch(97% 0.01 60))',
          borderTop: '1px solid var(--color-border)',
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
              The Spiritual Dimension
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
              The Inner Body
            </h2>
            <p
              style={{
                color: 'var(--color-text-muted)',
                marginBottom: '3.5rem',
                maxWidth: '56ch',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.75,
              }}
            >
              The most profound revelations in fascia research validate ancient spiritual anatomy — and
              explain why the practices on this site work so deeply together.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '4rem',
            }}
          >
            {[
              {
                title: 'The Fascia–Meridian Connection',
                subtitle: 'Langevin, Harvard — 2002',
                body: 'Dr. Helene Langevin\'s landmark study found 80% of acupuncture points and 50% of meridian pathways correspond directly to connective tissue planes. When an acupuncture needle is rotated, it physically winds fascial fibers. The "qi" of Traditional Chinese Medicine may be the mechanical, electrical, and chemical signaling traveling through the fascial web — ancient intuition mapped onto modern tissue.',
                accent: 'var(--color-violet-mid)',
              },
              {
                title: 'Anatomy Trains & Yoga',
                subtitle: 'Tom Myers',
                body: 'Tom Myers mapped the body\'s "Anatomy Trains" — continuous myofascial meridians that run from sole to skull. The Deep Front Line (connecting the inner arches, psoas, diaphragm, and throat) is the body\'s structural and emotional core. Yoga asanas are not arbitrary shapes — they systematically stretch and remodel specific fascial lines. Forward folds target the Superficial Back Line, facilitating the neurological state of introspection.',
                accent: 'var(--color-amber-light)',
              },
              {
                title: 'Piezoelectricity: The Physical Energy Body',
                subtitle: 'Collagen & Bioelectricity',
                body: 'Collagen is piezoelectric — it generates electrical charges when mechanically compressed or stretched. Every yoga pose, every gua sha stroke, every moment of deep breathing generates measurable bioelectricity in the fascial matrix. This electrical field transmits at extraordinary speed, acting as a body-wide communication network that closely resembles the yogic concept of the subtle energy body (prana vayu).',
                accent: 'var(--color-linen)',
              },
              {
                title: 'Kundalini and the Nadis',
                subtitle: 'Sushumna & Dura Mater',
                body: 'The central channel of kundalini yoga — the Sushumna nadi — corresponds anatomically to the dura mater: the continuous fascial tube that protects the spinal cord from sacrum to skull. The 72,000 nadis of yogic anatomy closely mirror Tom Myers\' fascial lines. The physical sensations of kundalini awakening (heat, vibration, spontaneous kriyas) align with piezoelectric fascial discharge and the unwinding of stored autonomic trauma.',
                accent: 'var(--color-violet-mid)',
              },
              {
                title: 'Why We Cry in Hip Openers',
                subtitle: 'Psoas, Amygdala & Release',
                body: 'Deep hip openers — Pigeon pose, Lizard, Yin Dragon — stretch the psoas and the entire Deep Front Line. Because the psoas is richly innervated by the sympathetic nervous system and intimately connected to the amygdala (the brain\'s threat-detection center), releasing it signals the nervous system that a long-held threat has finally passed. This triggers a parasympathetic cascade: spontaneous tears, trembling, or profound relief. This is not psychological drama — it is fascial biology.',
                accent: 'var(--color-amber-light)',
              },
              {
                title: 'Fascia as the Organ of Presence',
                subtitle: 'Interoception & Meditation',
                body: 'With 250 million nerve endings, fascia is the biological hardware of interoception — the felt sense of the body\'s interior. When experienced meditators describe a shift from "watching the breath" to "being inside the body," they are describing a shift in fascial awareness. The body-scan meditation is, at its deepest level, a practice of fascial listening. Stillness is not absence — it is the condition in which the body\'s subtlest signals finally become audible.',
                accent: 'var(--color-linen)',
              },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <div
                  className="card"
                  style={{
                    padding: '2rem 1.75rem',
                    borderRadius: '2px',
                    borderTop: `3px solid ${item.accent}`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      margin: '0 0 0.5rem',
                    }}
                  >
                    {item.subtitle}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      margin: '0 0 1rem',
                      fontStyle: 'normal',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      margin: 0,
                      lineHeight: 1.75,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Cross-links to meditate and yoga */}
          <ScrollReveal>
            <div
              style={{
                padding: '2rem 2.25rem',
                background: 'color-mix(in srgb, var(--color-violet-pale) 50%, var(--color-cream))',
                border: '1px solid var(--color-violet-mid)',
                borderRadius: '2px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--color-violet-deep)',
                    margin: '0 0 0.5rem',
                    fontStyle: 'normal',
                  }}
                >
                  Continue your inner practice
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                    margin: 0,
                    lineHeight: 1.65,
                    maxWidth: '50ch',
                  }}
                >
                  Fascia, breath, and stillness are three dimensions of the same practice. When the
                  tissue is free, the breath moves deeper. When the breath is calm, the mind clears.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link
                  href="/meditate"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.75rem',
                    background: 'var(--color-violet-deep)',
                    color: '#F5EAE1',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    transition: 'background-color 300ms ease',
                  }}
                >
                  Meditate
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/yoga"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.75rem',
                    background: 'transparent',
                    color: 'var(--color-violet-deep)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    border: '1px solid var(--color-violet-mid)',
                    transition: 'background-color 300ms ease, border-color 300ms ease',
                  }}
                >
                  Yoga
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRACTITIONER SECRETS
      ══════════════════════════════════════════════════════ */}
      <section
        id="secrets"
        style={{
          padding: 'clamp(4.5rem, 8vw, 7rem) max(1.5rem, 8vw) clamp(4rem, 7vw, 6rem)',
          background: 'var(--color-cream)',
          borderTop: '1px solid var(--color-border)',
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
              Advanced Insight
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
              Practitioner Secrets
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
              Seven things the specialists know — that most people don&apos;t — about how the body&apos;s fascial web actually works.
            </p>
          </ScrollReveal>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '820px',
            }}
          >
            {secrets.map((secret) => (
              <ScrollReveal key={secret.number}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2.5rem 1fr',
                    gap: '1.5rem',
                    padding: '1.5rem 1.75rem',
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    alignItems: 'start',
                  }}
                >
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '9999px',
                      background: 'var(--color-amber-deep)',
                      color: '#F5EAE1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {secret.number}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        margin: '0 0 0.625rem',
                        fontStyle: 'normal',
                        lineHeight: 1.3,
                      }}
                    >
                      {secret.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)',
                        margin: 0,
                        lineHeight: 1.75,
                      }}
                    >
                      {secret.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CLOSING QUOTE
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) max(1.5rem, 8vw) clamp(4.5rem, 8vw, 7rem)',
          background: 'linear-gradient(160deg, oklch(65% 0.09 35 / 0.2), oklch(93% 0.04 50))',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          <ScrollReveal>
            <blockquote style={{ margin: 0, padding: 0 }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: 'var(--color-text)',
                  margin: '0 0 1.5rem',
                  maxWidth: '52ch',
                }}
              >
                &ldquo;The medicine of the future will be the medicine of form.&rdquo;
              </p>
              <footer
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  marginBottom: '3rem',
                }}
              >
                — Tom Myers, Anatomy Trains
              </footer>
            </blockquote>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                href="/meditate"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Meditate
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>·</span>
              <Link
                href="/yoga"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Yoga
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link
                href="/breathe"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                Breathe &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link
                href="/nervous-system"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                Nervous System &rarr;
              </Link>
              <span style={{ color: 'var(--color-border)', alignSelf: 'center' }}>&middot;</span>
              <Link
                href="/manifest"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                Manifest &rarr;
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
