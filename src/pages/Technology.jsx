/**
 * Technology & compliance.
 *
 * Its signature moment is the audit trail: scrolling walks a single order
 * through scan → verify → batch & expiry → inventory → invoice → dispatch,
 * one step at a time, because that's what "traceable" actually means.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/experience/Magnetic";
import { ConsoleMock } from "@/components/directions/shared";
import { COMPLIANCE as COMPLIANCE_POINTS, ComplianceIcon } from "@/components/experience/compliance";
import { usePageMeta } from "@/hooks/usePageMeta";
import { TECH_HERO, TECH_ONE, TECH_STACK, TRACE, TECH_VERTICALS, FINAL_STATEMENT } from "@/data/pages";
import stillVerify from "@/assets/images/still-verify.jpg";

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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5,36,57,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(5,36,57,.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 75% 65% at 35% 45%, #000 25%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 35% 45%, #000 25%, transparent 78%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-brand-green/10 blur-[130px]" />

      <div className="relative mx-auto grid w-full max-w-[88rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="rise text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{TECH_HERO.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2rem,min(4vw,7.4vh),3.9rem)] font-extrabold leading-[1.03] tracking-[-0.045em] text-jet">
            <span className="block overflow-hidden pb-1">
              <span className="wipe block">Built for what you deliver.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="wipe block" style={{ animationDelay: ".1s" }}>
                Engineered for{" "}
                <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">how it moves.</span>
              </span>
            </span>
          </h1>
          <p className="rise mt-5 max-w-xl text-[clamp(0.98rem,1.9vh,1.12rem)] leading-relaxed text-ink-soft" style={{ animationDelay: ".25s" }}>
            {TECH_HERO.sub}
          </p>

          <div className="rise mt-7 flex flex-wrap gap-2" style={{ animationDelay: ".32s" }}>
            {TECH_ONE.chain.map((step) => (
              <span key={step} className="rounded-full border border-hairline bg-white px-3.5 py-1.5 text-[0.82rem] font-semibold text-ink-soft">
                {step}
              </span>
            ))}
          </div>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: ".4s" }}>
            <Magnetic>
              <Link
                to="/partner"
                className="group flex items-center gap-3 rounded-full bg-brand-blue py-2 pl-7 pr-2 text-[0.98rem] font-bold text-white transition-colors duration-300 hover:bg-jet"
              >
                Partner with us
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-[-45deg]">
                  →
                </span>
              </Link>
            </Magnetic>
            <a href="#trace" className="rounded-full border border-hairline bg-white px-7 py-3.5 text-[0.98rem] font-bold text-jet transition-colors duration-300 hover:border-brand-blue">
              Follow an order
            </a>
          </div>
        </div>

        <div className="rise" style={{ animationDelay: ".2s" }}>
          <ConsoleMock className="w-full" />
          <p className="mt-4 text-center text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
            DocPharma One — illustrative console
          </p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- stack --- */

function Stack() {
  return (
    <section className="bg-floral py-20 md:py-28">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <Reveal from="left">
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{TECH_ONE.eyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-jet">
            {TECH_STACK.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">{TECH_ONE.sub}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TECH_STACK.items.map((item, i) => (
            <Reveal key={item.key} from="up" delay={(i % 3) * 0.06}>
              <article className="group h-full rounded-3xl border border-hairline bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_24px_50px_-30px_rgba(5,36,57,.4)]">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[1.15rem] font-extrabold tracking-tight text-jet">{item.name}</h3>
                  <span className="tabular text-[0.75rem] font-extrabold text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{item.body}</p>
                <span className="mt-5 block h-0.5 w-8 bg-gradient-to-r from-brand-blue to-brand-green transition-all duration-500 group-hover:w-16" />
              </article>
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

/** Desktop: the trail advances one step per screen of scroll. */
function TracePinned() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const total = TRACE.chain.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const fill = useTransform(progress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(total - 1, Math.max(0, Math.floor(p * total * 0.999))));
  });

  return (
    <section id="trace" ref={ref} className="relative bg-jet text-white" style={{ height: `${total * 70}svh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-brand-blue/20 blur-[140px]" />
          <div className="absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-brand-green/15 blur-[140px]" />
        </div>

        <div className="relative mx-auto w-full max-w-[84rem] px-5 md:px-10">
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-green">Where compliance meets technology</p>
          <h2 className="mt-3 max-w-2xl text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.04em]">
            {TRACE.headline}
          </h2>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            {/* The step itself */}
            <div>
              <p className="tabular text-[0.8rem] font-extrabold text-brand-green">
                {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
              <div key={active} className="reveal-up">
                <h3 className="mt-3 text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
                  {TRACE.chain[active]}
                </h3>
                <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-white/70">{TRACE_DETAIL[active]}</p>
              </div>

              <div className="relative mt-9 flex gap-2">
                {TRACE.chain.map((step) => (
                  <span key={step} className="h-1 flex-1 rounded-full bg-white/15" />
                ))}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-blue to-brand-green"
                  style={{ width: fill }}
                />
              </div>

              <ol className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {TRACE.chain.map((step, i) => (
                  <li
                    key={step}
                    className={clsx(
                      "text-[0.85rem] font-bold transition-colors duration-300",
                      i === active ? "text-white" : i < active ? "text-white/55" : "text-white/25"
                    )}
                  >
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* The order, moving through it */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#04131f] lg:aspect-auto lg:h-[min(52svh,28rem)]">
              <img src={stillVerify} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-jet via-jet/70 to-jet/30" />

              <div className="absolute inset-0 flex flex-col justify-center gap-2.5 p-7 md:p-9">
                {TRACE.chain.map((step, i) => (
                  <div
                    key={step}
                    className={clsx(
                      "flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-500",
                      i === active
                        ? "border-brand-green/60 bg-white/10 opacity-100"
                        : i < active
                          ? "border-white/10 bg-white/[0.04] opacity-70"
                          : "border-white/5 bg-transparent opacity-35"
                    )}
                  >
                    <span
                      className={clsx(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-extrabold transition-colors duration-500",
                        i <= active ? "bg-brand-green text-jet" : "border border-white/25 text-white/50"
                      )}
                    >
                      {i < active ? "✓" : String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.92rem] font-bold">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-10 text-[clamp(1.1rem,2.2vw,1.6rem)] font-extrabold tracking-[-0.02em] text-brand-green">{TRACE.closer}</p>
        </div>
      </div>
    </section>
  );
}

/** Phones: the same trail as a plain list. */
function TraceStacked() {
  return (
    <section id="trace" className="bg-jet py-20 text-white">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-green">Where compliance meets technology</p>
        <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.06] tracking-[-0.04em]">{TRACE.headline}</h2>

        <ol className="mt-10 space-y-4">
          {TRACE.chain.map((step, i) => (
            <Reveal key={step} from="up" delay={i * 0.05}>
              <li className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green text-[0.7rem] font-extrabold text-jet">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[1.05rem] font-extrabold">{step}</span>
                  <span className="mt-1 block text-[0.95rem] leading-relaxed text-white/70">{TRACE_DETAIL[i]}</span>
                </span>
              </li>
            </Reveal>
          ))}
        </ol>

        <p className="mt-10 text-[1.3rem] font-extrabold tracking-[-0.02em] text-brand-green">{TRACE.closer}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ verticals --- */

function Verticals() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <Reveal from="left">
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">Categories</p>
          <h2 className="mt-3 max-w-2xl text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-jet">
            {TECH_VERTICALS.headline}
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-hairline border-y border-hairline">
          {TECH_VERTICALS.items.map((item, i) => (
            <Reveal key={item.name} from="up" delay={i * 0.04}>
              <div className="group grid gap-2 py-6 transition-colors duration-300 hover:bg-floral md:grid-cols-[1fr_2fr] md:gap-10 md:px-4">
                <h3 className="text-[1.1rem] font-extrabold tracking-tight text-jet transition-colors duration-300 group-hover:text-brand-blue">
                  {item.name}
                </h3>
                <p className="text-[1rem] leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COMPLIANCE_POINTS.map((item, i) => (
            <Reveal key={item.title} from="up" delay={i * 0.05}>
              <div className="flex h-full items-center gap-3 rounded-2xl border border-hairline bg-floral px-4 py-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-peppermint text-[#5f8a0f]">
                  <ComplianceIcon name={item.icon} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.92rem] font-bold text-jet">{item.title}</span>
                  <span className="block text-[0.78rem] text-ink-faint">{item.line}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal from="up">
          <p className="mt-14 max-w-3xl text-[clamp(1.4rem,3vw,2.3rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-jet">
            {FINAL_STATEMENT.lines.join(" ")}
          </p>
          <p className="mt-4 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{FINAL_STATEMENT.positioning}</p>
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
      "DocPharma One connects inventory, orders, fulfilment and delivery — on licensed, pharmacist-led, fully traceable infrastructure.",
  });

  const desktop = useIsDesktop();
  const reduce = useReducedMotion();

  return (
    <>
      <TechHero />
      <Stack />
      {desktop && !reduce ? <TracePinned /> : <TraceStacked />}
      <Verticals />
    </>
  );
}
