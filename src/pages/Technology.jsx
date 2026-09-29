/**
 * Technology & compliance.
 *
 * Its signature moment is the audit trail: the page turns sideways and one
 * order travels scan → verify → batch & expiry → inventory → invoice →
 * dispatch, each checkpoint stamped as the trail reaches it. Compliance is
 * shown as seals being stamped, not paragraphs about licences, and the page
 * closes on the brand's black-panel statement.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";
import { ConsoleMock } from "@/components/directions/shared";
import { HeroBackdrop, HeroHeading, Enter, HIGHLIGHT } from "@/components/motion/Hero";
import { SectionHeader, SplitText } from "@/components/motion/Text";
import { CtaButton, GhostButton } from "@/components/motion/CtaButton";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { usePageMeta } from "@/hooks/usePageMeta";
import stillVerify from "@/assets/images/still-verify.jpg";
import stillPick from "@/assets/images/still-pick.jpg";
import stillPack from "@/assets/images/still-pack.jpg";
import stillRider from "@/assets/images/still-rider.jpg";
import packing from "@/assets/images/packing.webp";
import { TECH_HERO, TECH_ONE, TECH_STACK, TRACE, TECH_VERTICALS, FINAL_STATEMENT, COMPLIANCE } from "@/data/pages";

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

/* ------------------------------------------------------------------ hero --- */

function TechHero() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-white pb-16 pt-28 md:pb-20 lg:h-[100svh] lg:min-h-[44rem] lg:pt-24">
      <HeroBackdrop focus="35% 45%" />

      <div className="relative mx-auto grid w-full max-w-[88rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <HeroHeading
            eyebrow={TECH_HERO.eyebrow}
            lines={["Built for what you deliver.", ["Engineered for", { text: "how it moves.", className: HIGHLIGHT }]]}
            className="text-[clamp(2rem,min(3.5vw,6.6vh),3.4rem)]"
          />
          <Enter as="p" delay={0.35} className="mt-5 max-w-xl text-[clamp(0.98rem,1.9vh,1.12rem)] leading-relaxed text-ink-soft">
            {TECH_HERO.sub}
          </Enter>

          {/* The chain, lighting up link by link */}
          <Enter delay={0.45} className="mt-7 flex flex-wrap items-center gap-2">
            {TECH_ONE.chain.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="chain-step rounded-full border border-hairline bg-white px-3.5 py-1.5 text-[0.82rem] font-semibold text-ink-soft" style={{ "--i": i }}>
                  {step}
                </span>
                {i < TECH_ONE.chain.length - 1 ? <span className="text-ink-faint">→</span> : null}
              </span>
            ))}
          </Enter>

          <Enter delay={0.55} className="mt-9 flex flex-wrap items-center gap-3">
            <CtaButton to="/partner">Partner with us</CtaButton>
            <GhostButton href="#trace">Follow an order</GhostButton>
          </Enter>
        </div>

        <Enter delay={0.25} className="console-rise">
          <ConsoleMock className="w-full" />
          <p className="mt-4 text-center text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
            DocPharma One · illustrative console
          </p>
        </Enter>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- stack --- */

/** A card that tips toward the cursor, with a light that follows it. */
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const onMove = (event) => {
    if (reduce || event.pointerType !== "mouse") return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (event.clientX - r.left) / r.width;
    const py = (event.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 7}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 9}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={clsx("tilt-card", className)}>
      {children}
    </div>
  );
}

function Stack() {
  return (
    <section className="bg-floral py-24 md:py-32">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader eyebrow={TECH_ONE.eyebrow} title={TECH_STACK.headline} sub={TECH_ONE.sub} />

        <div className="mt-12 grid gap-4 [perspective:1200px] md:grid-cols-2 lg:grid-cols-3">
          {TECH_STACK.items.map((item, i) => (
            <Reveal key={item.key} from="up" delay={(i % 3) * 0.08}>
              <TiltCard className="h-full">
                <article className="group relative h-full overflow-hidden rounded-3xl border border-hairline bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-brand-blue/30 hover:shadow-[0_24px_50px_-30px_rgba(5,36,57,.4)]">
                  <span aria-hidden className="tilt-light pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-baseline justify-between">
                    <h3 className="text-[1.15rem] font-extrabold tracking-tight text-jet">{item.name}</h3>
                    <span className="tabular text-[0.75rem] font-extrabold text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="relative mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{item.body}</p>
                  <span className="relative mt-5 block h-0.5 w-8 bg-gradient-to-r from-brand-blue to-brand-green transition-all duration-500 group-hover:w-16" />
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- audit trail --- */

const TRACE_DETAIL = [
  "The unit is scanned at the shelf, so the system knows exactly which pack left which rack.",
  "A pharmacist verifies the prescription against the order before anything is sealed.",
  "Batch number and expiry are captured at product level, not just at order level.",
  "Inventory updates across the network the moment the pack is committed.",
  "The invoice is raised against the verified order, matching what was picked.",
  "Dispatch hands the order to a rider with proof of what left the store, and when.",
];

const TRACE_STAMP = ["Scanned", "Verified", "Captured", "Synced", "Matched", "Released"];

/** A checkpoint's ink stamp: it lands, overshoots, and settles at an angle. */
function Stamp({ label, on, tone = "green" }) {
  return (
    <span
      className={clsx(
        "stamp pointer-events-none inline-flex items-center gap-1.5 rounded-lg border-2 px-2.5 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.14em]",
        tone === "green" ? "border-brand-green text-brand-green" : "border-brand-blue text-brand-blue",
        on && "is-on"
      )}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
        <path d="M2 6.5 5 9l5-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  );
}

/**
 * Desktop: the section pins, and scrolling down carries the trail sideways.
 * A line draws along the checkpoints as they pass; each one is stamped as the
 * line reaches it.
 */
function TraceHorizontal() {
  const hostRef = useRef(null);
  const trackRef = useRef(null);
  const [travel, setTravel] = useState(0);
  const [reached, setReached] = useState(-1);
  const total = TRACE.chain.length;

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: hostRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -travel]);
  const line = useTransform(smooth, [0.02, 0.95], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setReached(Math.min(total - 1, Math.floor(((p - 0.02) / 0.93) * total)));
  });

  return (
    <section id="trace" ref={hostRef} className="relative bg-jet text-white" style={{ height: `calc(100svh + ${travel}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-brand-blue/20 blur-[140px]" />
          <div className="absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-brand-green/15 blur-[140px]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[84rem] items-end justify-between gap-8 px-5 md:px-10">
          <SectionHeader tone="dark" eyebrow="The audit trail" title={TRACE.headline} sub={TRACE.sub} />
          <p className="tabular hidden shrink-0 pb-2 text-[0.85rem] font-extrabold text-white/50 xl:block">
            <span className="text-brand-green">{String(Math.max(0, reached + 1)).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
          </p>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="relative mt-12 flex w-max items-stretch gap-6 pl-[max(1.25rem,calc((100vw_-_84rem)/2_+_2.5rem))] pr-[18vw]">
          {/* The trail itself, drawing as you go */}
          <span aria-hidden className="pointer-events-none absolute left-0 right-0 top-[3.3rem] h-0 border-t-2 border-dashed border-white/12" />
          <motion.span
            aria-hidden
            style={{ scaleX: line }}
            className="pointer-events-none absolute left-0 right-0 top-[3.2rem] h-[3px] origin-left rounded-full bg-gradient-to-r from-brand-blue to-brand-green shadow-[0_0_14px_rgba(143,193,36,.6)]"
          />

          {TRACE.chain.map((step, i) => {
            const on = i <= reached;
            return (
              <article
                key={step}
                className={clsx(
                  "relative flex w-[min(24rem,78vw)] shrink-0 flex-col rounded-[1.75rem] border p-7 transition-[border-color,background-color] duration-700",
                  on ? "border-brand-green/40 bg-white/[0.07]" : "border-white/10 bg-white/[0.02]"
                )}
              >
                <span
                  className={clsx(
                    "relative z-10 flex h-11 w-11 items-center justify-center rounded-full text-[0.8rem] font-extrabold transition-all duration-500",
                    on ? "scale-110 bg-brand-green text-jet shadow-[0_0_0_8px_rgba(143,193,36,.15)]" : "border border-white/25 bg-jet text-white/60"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-7 text-[clamp(1.5rem,2.4vw,2.1rem)] font-extrabold leading-[1.05] tracking-[-0.035em]">{step}</h3>
                <p className={clsx("mt-3 text-[1rem] leading-relaxed transition-colors duration-700", on ? "text-white/75" : "text-white/35")}>
                  {TRACE_DETAIL[i]}
                </p>
                <div className="mt-auto pt-8">
                  <Stamp label={TRACE_STAMP[i]} on={on} />
                </div>
              </article>
            );
          })}

          <div className="flex w-[min(26rem,80vw)] shrink-0 items-center">
            <p className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-brand-green">{TRACE.closer}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Phones and reduced motion: the same trail as a vertical timeline. */
function TraceStacked() {
  return (
    <section id="trace" className="bg-jet py-20 text-white">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader tone="dark" eyebrow="The audit trail" title={TRACE.headline} sub={TRACE.sub} />

        <ol className="relative mt-10 space-y-4 before:absolute before:bottom-6 before:left-[1.9rem] before:top-6 before:w-px before:bg-gradient-to-b before:from-brand-blue before:to-brand-green">
          {TRACE.chain.map((step, i) => (
            <TraceRow key={step} step={step} i={i} />
          ))}
        </ol>

        <Reveal>
          <p className="mt-10 text-[1.3rem] font-extrabold tracking-[-0.02em] text-brand-green">{TRACE.closer}</p>
        </Reveal>
      </div>
    </section>
  );
}

function TraceRow({ step, i }) {
  const ref = useRef(null);
  const on = useInViewOnce(ref, { margin: "0px 0px -30% 0px" });
  return (
    <li ref={ref} className={clsx("reveal relative flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5", on && "reveal-up")}>
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green text-[0.7rem] font-extrabold text-jet">
        {String(i + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="block text-[1.05rem] font-extrabold">{step}</span>
        <span className="mt-1 block text-[0.95rem] leading-relaxed text-white/70">{TRACE_DETAIL[i]}</span>
        <span className="mt-3 block">
          <Stamp label={TRACE_STAMP[i]} on={on} />
        </span>
      </span>
    </li>
  );
}

/* -------------------------------------------------------------- seals --- */

const SEAL_ICONS = {
  "drug-licensed": "M12 3 5 6v5.5c0 4.3 3 8.1 7 9.5 4-1.4 7-5.2 7-9.5V6zM9 12l2.2 2.2L15.5 10",
  fssai: "M5 19c0-8 5-13 14-14 0 9-5 14-13 14M5 19c3-4 6-7 10-9",
  "pharmacist-led": "M12 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7M5 20c.6-3.6 3.4-6 7-6s6.4 2.4 7 6M12 15.5v3M10.5 17h3",
  traceable: "M4 6v12M7.5 6v12M10 6v12M13.5 6v12M16 6v12M20 6v12",
  verified: "M12 3l2.4 1.8 3-.2.9 2.9 2.4 1.8-1 2.8 1 2.8-2.4 1.8-.9 2.9-3-.2L12 21l-2.4-1.8-3 .2-.9-2.9-2.4-1.8 1-2.8-1-2.8 2.4-1.8.9-2.9 3 .2zM8.5 12l2.3 2.3 4.7-4.6",
};

/**
 * Compliance shown, not stated: five seals, each in its own card, stamped on
 * one after another. Their rings turn slowly like an embossed mark; hovering a
 * card lifts it and turns its seal to brand green.
 */
function Seals() {
  const ref = useRef(null);
  const inView = useInViewOnce(ref);

  return (
    <section className="relative overflow-hidden bg-floral py-24 md:py-32">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader align="center" eyebrow="Compliance" title={COMPLIANCE.headline} sub={COMPLIANCE.sub} />

        <div ref={ref} className={clsx("seals mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5", inView && "is-in")}>
          {COMPLIANCE.seals.map((seal, i) => (
            <div
              key={seal.key}
              className="seal group flex flex-col items-center rounded-[1.75rem] border border-hairline bg-white px-5 pb-7 pt-8 text-center transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand-green/40 hover:shadow-[0_30px_60px_-35px_rgba(5,36,57,.45)]"
              style={{ "--i": i }}
            >
              <div className="relative h-32 w-32">
                <svg viewBox="0 0 120 120" className="seal-ring absolute inset-0 h-full w-full" aria-hidden>
                  <defs>
                    <path id={`seal-${seal.key}`} d="M60 60 m-47 0 a47 47 0 1 1 94 0 a47 47 0 1 1 -94 0" />
                  </defs>
                  <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" />
                  <text className="fill-current text-[9px] font-bold uppercase tracking-[0.28em]">
                    <textPath href={`#seal-${seal.key}`}>{`${seal.name} · DocPharma verified · `}</textPath>
                  </text>
                </svg>
                <span className="seal-core absolute inset-[22%] flex items-center justify-center rounded-full bg-peppermint text-[#5f8a0f] transition-[background-color,color,transform] duration-500 group-hover:scale-105 group-hover:bg-brand-green group-hover:text-jet">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={SEAL_ICONS[seal.key]} />
                  </svg>
                </span>
              </div>
              <h3 className="mt-6 text-[0.95rem] font-extrabold uppercase tracking-[0.08em] text-jet">{seal.name}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">{seal.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ verticals --- */

const VERTICAL_ART = [stillVerify, stillPick, stillPack, packing, stillRider];

/**
 * The categories as rows. Hovering one sweeps a navy band in behind it and a
 * photo of that category floats beside the cursor, following it on a spring —
 * the photo swaps as you move between rows. Touch screens get the rows alone.
 */
function Verticals() {
  const listRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const x = useSpring(0, { stiffness: 220, damping: 26, mass: 0.5 });
  const y = useSpring(0, { stiffness: 220, damping: 26, mass: 0.5 });

  const onMove = (event) => {
    if (event.pointerType !== "mouse") return;
    const r = listRef.current.getBoundingClientRect();
    x.set(event.clientX - r.left);
    y.set(event.clientY - r.top);
  };

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader eyebrow="Categories" title={TECH_VERTICALS.headline} />

        <div ref={listRef} className="relative mt-12 border-t border-hairline" onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
          {TECH_VERTICALS.items.map((item, i) => (
            <Reveal key={item.name} from="up" delay={i * 0.05}>
              <div
                onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(i)}
                className="row-sweep group relative grid gap-2 overflow-hidden border-b border-hairline py-7 md:grid-cols-[4rem_1fr_2fr_2rem] md:items-center md:gap-8 md:px-4"
              >
                <span className="tabular relative text-[0.8rem] font-extrabold text-ink-faint transition-colors duration-500 group-hover:text-brand-green">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative text-[clamp(1.3rem,2.2vw,1.8rem)] font-extrabold tracking-tight text-jet transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-white">
                  {item.name}
                </h3>
                <p className="relative text-[1rem] leading-relaxed text-ink-soft transition-colors duration-500 group-hover:text-white/75">{item.body}</p>
                <span aria-hidden className="relative hidden -translate-x-2 text-[1.2rem] text-white opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:block">
                  →
                </span>
              </div>
            </Reveal>
          ))}

          {/* The photo that follows the cursor */}
          <motion.div
            aria-hidden
            style={{ x, y }}
            className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
          >
            <div
              className={clsx(
                "relative -translate-x-1/2 -translate-y-[115%] overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(5,36,57,.55)] transition-[opacity,transform] duration-300 ease-out",
                hovered === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
              )}
              style={{ width: "17rem", height: "11rem" }}
            >
              {VERTICAL_ART.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className={clsx(
                    "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500",
                    hovered === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  )}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- final statement --- */

/**
 * The closing statement, as the brief scripts it: the claim, a pause, the
 * answer, then the brand. It plays once when it arrives — nothing waits on
 * the scroll, so it never sits half-lit.
 */
function FinalStatement() {
  const claim = FINAL_STATEMENT.lines.slice(0, 2).join(" ");
  const answer = FINAL_STATEMENT.lines[2];

  // Runs under the footer's rounded top, so the two dark panels meet cleanly.
  return (
    <section className="relative -mb-10 flex min-h-[86svh] items-center overflow-hidden bg-jet pb-32 pt-24 text-center text-white">
      {/* The same grid and brand glows as the other dark panels, and the mark
          itself, faint and oversized, behind the words. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 65% at 50% 50%, #000 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 65% at 50% 50%, #000 20%, transparent 75%)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-[80%] -translate-y-1/2 rounded-full bg-brand-blue/15 blur-[130px]" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-[10%] -translate-y-[30%] rounded-full bg-brand-green/10 blur-[130px]" />
        <LogoMark tone="mono" className="absolute left-1/2 top-1/2 h-[min(70vw,34rem)] w-[min(70vw,34rem)] -translate-x-1/2 -translate-y-1/2 text-white opacity-[0.035]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 md:px-10">
        <SplitText
          as="p"
          lines={claim}
          stagger={0.05}
          className="font-editorial text-[clamp(2.2rem,5.2vw,4.6rem)] leading-[1.08] tracking-[-0.02em]"
        />
        {/* The pause, then the answer. */}
        <SplitText
          as="p"
          lines={answer}
          delay={1}
          stagger={0.09}
          className="font-editorial mt-2 text-[clamp(2.2rem,5.2vw,4.6rem)] italic leading-[1.08] tracking-[-0.02em] text-brand-green"
        />
        <Reveal delay={1.2}>
          <p className="mt-12 text-[1.5rem] font-extrabold tracking-[-0.03em]">{FINAL_STATEMENT.brand}</p>
          <p className="mt-1 text-[0.8rem] font-bold uppercase tracking-[0.2em] text-white/55">{FINAL_STATEMENT.positioning}</p>
          <div className="mt-8 flex justify-center">
            <CtaButton to="/partner" variant="white">
              {FINAL_STATEMENT.cta}
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page --- */

export default function Technology() {
  usePageMeta({
    title: "Technology & Compliance — DocPharma",
    description:
      "DocPharma One connects inventory, orders, fulfilment and delivery on licensed, pharmacist-led, fully traceable infrastructure.",
  });

  const desktop = useIsDesktop();
  const reduce = useReducedMotion();

  return (
    <>
      <TechHero />
      <Stack />
      {desktop && !reduce ? <TraceHorizontal /> : <TraceStacked />}
      <Seals />
      <Verticals />
      <FinalStatement />
    </>
  );
}
