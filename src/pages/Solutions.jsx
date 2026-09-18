/**
 * Solutions — who we build for.
 *
 * Motion is deliberately restrained: one thing moves at a time. The hero's
 * audience list previews itself, the five business types travel sideways while
 * the section is pinned, and the impact figures count up once against the live
 * coverage map. Phones get the simpler version — stacked, no pinning.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/experience/Magnetic";
import { CountUp } from "@/components/experience/HeroParts";
import { COMPLIANCE, ComplianceIcon } from "@/components/experience/compliance";
import { IndiaCoverageMap } from "@/components/art/IndiaCoverageMap";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { INTEGRATION_LOGOS } from "@/data/logos";
import { usePageMeta } from "@/hooks/usePageMeta";
import { SOLUTIONS_HERO, SOLUTION_TABS, SOLUTIONS_IMPACT, INTEGRATIONS } from "@/data/site";
import stillPick from "@/assets/images/still-pick.jpg";
import stillVerify from "@/assets/images/still-verify.jpg";
import stillPack from "@/assets/images/still-pack.jpg";
import stillRider from "@/assets/images/still-rider.jpg";
import stillHandover from "@/assets/images/still-handover.jpg";

/** One still per business type, from our own darkstore film. */
const ART = {
  pharmacy: stillPick,
  platform: stillVerify,
  insurer: stillHandover,
  d2c: stillPack,
  hospital: stillRider,
};

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

/**
 * The opener previews the page: the five audiences are listed live, and
 * whichever is hovered — or cycling on its own — shows its own photograph.
 */
function SolutionsHero() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held) return undefined;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % SOLUTION_TABS.length), 3200);
    return () => window.clearTimeout(id);
  }, [active, held]);

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
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[32rem] w-[32rem] rounded-full bg-brand-blue/10 blur-[130px]" />

      <div className="relative mx-auto grid w-full max-w-[88rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="rise text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{SOLUTIONS_HERO.eyebrow}</p>

          <h1 className="mt-4 text-[clamp(2rem,min(4vw,7.4vh),3.9rem)] font-extrabold leading-[1.03] tracking-[-0.045em] text-jet">
            <span className="block overflow-hidden pb-1">
              <span className="wipe block">End-to-end supply chain,</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="wipe block" style={{ animationDelay: ".1s" }}>
                built for{" "}
                <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">healthcare.</span>
              </span>
            </span>
          </h1>

          <p className="rise mt-5 max-w-xl text-[clamp(0.98rem,1.9vh,1.12rem)] leading-relaxed text-ink-soft" style={{ animationDelay: ".25s" }}>
            {SOLUTIONS_HERO.sub}
          </p>

          <div className="rise mt-6 flex flex-wrap gap-2" style={{ animationDelay: ".32s" }}>
            {SOLUTIONS_HERO.pills.map((pill) => (
              <span key={pill} className="rounded-full border border-hairline bg-white px-3.5 py-1.5 text-[0.82rem] font-semibold text-ink-soft">
                {pill}
              </span>
            ))}
          </div>

          {/* The five audiences, listed live. */}
          <ul
            className="rise mt-7 border-t border-hairline"
            style={{ animationDelay: ".4s" }}
            onMouseLeave={() => setHeld(false)}
          >
            {SOLUTION_TABS.map((item, i) => (
              <li key={item.id}>
                <a
                  href="#who"
                  onMouseEnter={() => {
                    setHeld(true);
                    setActive(i);
                  }}
                  onFocus={() => {
                    setHeld(true);
                    setActive(i);
                  }}
                  className="group flex items-center justify-between border-b border-hairline py-[clamp(0.5rem,1.5vh,0.85rem)]"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="tabular text-[0.7rem] font-extrabold text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={clsx(
                        "text-[clamp(0.98rem,2vh,1.15rem)] font-extrabold tracking-tight transition-colors duration-300",
                        i === active ? "text-brand-blue" : "text-jet group-hover:text-brand-blue"
                      )}
                    >
                      {item.tab}
                    </span>
                  </span>
                  <span
                    className={clsx(
                      "text-brand-blue transition-all duration-300",
                      i === active ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    )}
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Whichever audience is live shows its own photograph. */}
        <div className="rise relative" style={{ animationDelay: ".2s" }}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.25rem] bg-jet shadow-[0_50px_100px_-45px_rgba(5,36,57,.6)] lg:aspect-auto lg:h-[min(64svh,32rem)]">
            {SOLUTION_TABS.map((item, i) => (
              <img
                key={item.id}
                src={ART[item.art]}
                alt=""
                className={clsx(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                  i === active ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-jet/80 via-jet/10 to-transparent" />
            <div key={active} className="reveal-up absolute inset-x-6 bottom-6 text-white">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-brand-green">{SOLUTION_TABS[active].tab}</p>
              <p className="mt-2 max-w-md text-[clamp(1.05rem,2.2vw,1.5rem)] font-extrabold leading-snug tracking-[-0.02em]">
                {SOLUTION_TABS[active].copy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------- the five audiences --- */

function SolutionPanel({ item, index, total, active = true }) {
  return (
    <article className="flex h-full w-full shrink-0 items-center">
      <div className="mx-auto grid w-full max-w-[84rem] items-center gap-8 px-5 md:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div className={clsx("transition-opacity duration-500", active ? "opacity-100" : "opacity-40")}>
          <p className="tabular text-[0.78rem] font-extrabold text-brand-green">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <p className="mt-3 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{item.tab}</p>
          <h2 className="mt-3 max-w-xl text-[clamp(1.5rem,min(2.8vw,4.4vh),2.5rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-jet">
            {item.headline}
          </h2>
          <p className="mt-4 max-w-lg text-[clamp(0.95rem,1.9vh,1.05rem)] leading-relaxed text-ink-soft">{item.copy}</p>

          <ul className="mt-6 grid max-w-xl gap-x-6 gap-y-2 sm:grid-cols-2">
            {item.props.map((prop) => (
              <li key={prop} className="flex items-start gap-2.5 text-[clamp(0.85rem,1.7vh,0.95rem)] text-ink-soft">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                {prop}
              </li>
            ))}
          </ul>

          <Magnetic className="mt-7 inline-block">
            <Link
              to="/partner"
              className="group flex items-center gap-3 rounded-full bg-jet py-2 pl-6 pr-2 text-[0.92rem] font-bold text-white transition-colors duration-300 hover:bg-brand-blue"
            >
              {item.cta}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-[-45deg]">
                →
              </span>
            </Link>
          </Magnetic>
        </div>

        <figure className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-jet lg:aspect-auto lg:h-[min(56svh,30rem)]">
          <img
            src={ART[item.art]}
            alt=""
            className={clsx("h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)]", active ? "scale-100" : "scale-105")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jet/70 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-6 bottom-6 text-[0.95rem] font-extrabold text-white">{item.tab}</figcaption>
        </figure>
      </div>
    </article>
  );
}

/** Desktop: the panels travel sideways while the section is pinned. */
function AudiencesPinned({ openAt }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const total = SOLUTION_TABS.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.35 });
  const x = useTransform(progress, [0, 1], ["0%", `-${(total - 1) * 100}%`]);
  const fill = useTransform(progress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(total - 1, Math.max(0, Math.round(p * (total - 1)))));
  });

  const goTo = (i, behavior = "smooth") => {
    const host = ref.current;
    if (!host) return;
    const travel = host.offsetHeight - window.innerHeight;
    const top = host.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (travel * i) / (total - 1), behavior });
  };

  // Arriving from the header menu (/solutions#health-insurers) opens that one.
  useLayoutEffect(() => {
    if (openAt == null || openAt < 0) return undefined;
    const id = window.setTimeout(() => goTo(openAt, "auto"), 60);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAt]);

  return (
    <section id="who" ref={ref} className="relative bg-floral" style={{ height: `${total * 100}svh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pb-8 pt-24">
        <div className="mx-auto w-full max-w-[84rem] px-5 md:px-10">
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">Who we build for</p>
        </div>

        <div className="mt-6 flex min-h-0 flex-1 items-center">
          <motion.div className="flex h-full w-full" style={{ x }}>
            {SOLUTION_TABS.map((item, i) => (
              <SolutionPanel key={item.id} item={item} index={i} total={total} active={i === active} />
            ))}
          </motion.div>
        </div>

        <div className="mx-auto mt-6 w-full max-w-[84rem] px-5 md:px-10">
          <div className="relative flex gap-2">
            {SOLUTION_TABS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active}
                className={clsx(
                  "flex-1 pb-3 text-left text-[0.82rem] font-bold transition-colors duration-300",
                  i === active ? "text-jet" : "text-ink-faint hover:text-ink-soft"
                )}
              >
                {item.tab}
              </button>
            ))}
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-jet/10" />
            <motion.span
              aria-hidden
              className="absolute bottom-0 left-0 h-0.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-green"
              style={{ width: fill }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Phones and tablets: the same content, stacked. */
function AudiencesStacked() {
  return (
    <section id="who" className="bg-floral py-20">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">Who we build for</p>
      </div>
      <div className="mt-8 space-y-14">
        {SOLUTION_TABS.map((item, i) => (
          <Reveal key={item.id} from="up">
            <div id={item.id} className="scroll-mt-24">
              <SolutionPanel item={item} index={i} total={SOLUTION_TABS.length} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- impact --- */

/** The figures sit against the live coverage map — the reach they describe. */
function Impact() {
  return (
    <section className="relative overflow-hidden bg-jet py-20 text-white md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-brand-blue/20 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-brand-green/15 blur-[140px]" />
      </div>

      <div className="relative mx-auto grid max-w-[84rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <Reveal from="left">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-green">{SOLUTIONS_IMPACT.eyebrow}</p>
            <h2 className="mt-3 max-w-xl text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.04em]">
              {SOLUTIONS_IMPACT.headline}
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10">
            {SOLUTIONS_IMPACT.stats.map((stat, i) => (
              <Reveal key={stat.label} from="up" delay={(i % 2) * 0.06}>
                <div className="h-full bg-jet p-6">
                  <p className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold leading-none tracking-[-0.05em] text-white">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-[0.95rem] font-bold text-white">{stat.label}</p>
                  <p className="mt-1 text-[0.85rem] text-white/55">{stat.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal from="right">
          <IndiaCoverageMap className="mx-auto h-auto w-full max-w-[26rem]" />
          <p className="mt-6 text-center text-[0.8rem] font-bold uppercase tracking-[0.16em] text-white/45">
            12+ cities · 50+ darkstores · 19,000+ pincodes
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page --- */

export default function Solutions() {
  usePageMeta({
    title: "Solutions — DocPharma",
    description:
      "End-to-end supply chain built for healthcare: e-pharmacies, corporate wellness platforms, health insurers, D2C brands, doctors and hospitals.",
  });

  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const { hash } = useLocation();
  const openAt = SOLUTION_TABS.findIndex((item) => item.id === hash.slice(1));

  return (
    <>
      <SolutionsHero />
      {desktop && !reduce ? <AudiencesPinned openAt={openAt} /> : <AudiencesStacked />}
      <Impact />

      {/* Plugs into what you already run */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <Reveal from="left">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">Integrations</p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-jet">
              {INTEGRATIONS.headline}
            </h2>
            <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">{INTEGRATIONS.sub}</p>
          </Reveal>
        </div>

        <div className="mt-10">
          <LogoMarquee items={INTEGRATION_LOGOS} rows={1} duration={55} logoArea={4200} slot={210} />
        </div>

        <div className="mx-auto mt-12 max-w-[84rem] px-5 md:px-10">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COMPLIANCE.map((item, i) => (
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
        </div>
      </section>
    </>
  );
}
