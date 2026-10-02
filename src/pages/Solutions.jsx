/**
 * Solutions — who we build for.
 *
 * The hero is the five businesses as a mosaic, pharma weighted largest. Pick
 * one (there, from the header menu, or from the footer) and the solutions
 * section below opens on it: headline, value props ticking in, the outcome and
 * its call to action. Then what powers every one of them, the impact, and a
 * closing call.
 */

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { HeroBackdrop, HeroHeading, Enter, HIGHLIGHT } from "@/components/motion/Hero";
import { SectionHeader, SplitText } from "@/components/motion/Text";
import { CtaButton, GhostButton } from "@/components/motion/CtaButton";
import { scrollToTarget } from "@/components/motion/smoothScroll";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { usePageSeo } from "@/seo/usePageSeo";
import { PoweredBy } from "@/components/solutions/PoweredBy";
import { CountUp } from "@/components/experience/HeroParts";
import { BusinessReel } from "@/components/solutions/BusinessReel";
import { SOLUTIONS_HERO, SOLUTION_TABS, SOLUTIONS_IMPACT } from "@/data/site";
import { BUSINESS_TYPES, MONTHLY_ORDERS } from "@/data/contact";
import { COVERAGE_CITIES } from "@/components/art/IndiaCoverageMap";
import stillPick from "@/assets/images/still-pick.jpg";
import stillVerify from "@/assets/images/still-verify.jpg";
import stillPack from "@/assets/images/still-pack.jpg";
import stillRider from "@/assets/images/still-rider.jpg";
import stillHandover from "@/assets/images/still-handover.jpg";

const EASE = [0.22, 1, 0.36, 1];

const ART = {
  pharmacy: stillPick,
  platform: stillVerify,
  insurer: stillHandover,
  d2c: stillPack,
  hospital: stillRider,
};

/** What each business type gets out of it. */
const OUTCOME = {
  "e-pharmacies": "Your pharmacy, live in a new city without a new lease.",
  "corporate-wellness": "Your members order; our network delivers.",
  "health-insurers": "Cover turns into medicine at the member's door.",
  "d2c-health": "Your bestsellers, minutes from your customers.",
  hospitals: "Care that continues after the patient leaves.",
};

/** Mosaic placement: pharma leads, taking the tall tile. */
const TILE_PLACE = ["row-span-2", "", "", "", ""];

/** Brings business `i`'s card into view. */
function openBusiness(i) {
  const el = document.getElementById(SOLUTION_TABS[i].id);
  if (el) scrollToTarget(el);
}

/* ------------------------------------------------------------------ hero --- */

function SolutionsHero() {
  // The tiles take turns: each lights up and shows its line, until a visitor
  // points at the mosaic, when hover takes over.
  const [spot, setSpot] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => setSpot((v) => (v + 1) % SOLUTION_TABS.length), 2800);
    return () => window.clearInterval(id);
  }, [hold]);

  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-white pb-16 pt-28 md:pb-20 lg:h-[100svh] lg:min-h-[44rem] lg:pb-10 lg:pt-24">
      <HeroBackdrop focus="30% 45%" />

      <div className="relative mx-auto grid w-full max-w-[88rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <HeroHeading
            eyebrow={SOLUTIONS_HERO.eyebrow}
            lines={[
              "End-to-end supply chain,",
              ["built for", { text: "healthcare.", className: HIGHLIGHT }],
            ]}
            className="text-[clamp(2rem,min(3.4vw,7vh),3rem)]"
          />
          <Enter
            as="p"
            delay={0.3}
            className="mt-5 max-w-xl text-[clamp(0.98rem,1.9vh,1.1rem)] leading-relaxed text-ink-soft"
          >
            {SOLUTIONS_HERO.sub}
          </Enter>

          <ul className="mt-7 flex flex-wrap gap-2">
            {SOLUTIONS_HERO.pills.map((pill, i) => (
              <Enter
                as="li"
                key={pill}
                delay={0.4 + i * 0.1}
                className="flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-2 text-[0.86rem] font-semibold text-ink-soft transition-colors duration-300 hover:border-brand-green/50 hover:text-jet"
              >
                <span
                  className="hero-tick flex h-4 w-4 items-center justify-center rounded-full bg-brand-green text-[0.55rem] text-white"
                  style={{ animationDelay: `${1 + i * 0.15}s` }}
                >
                  ✓
                </span>
                {pill}
              </Enter>
            ))}
          </ul>

          <Enter delay={0.5} className="mt-9 flex flex-wrap items-center gap-3">
            <CtaButton to="/partner">Partner with us</CtaButton>
            <GhostButton href="#solutions">Find your solution</GhostButton>
          </Enter>
        </div>

        {/* The five businesses. Hover to read; click to open below. */}
        <div
          onPointerEnter={() => setHold(true)}
          onPointerLeave={() => setHold(false)}
          className="grid h-[34rem] grid-cols-2 grid-rows-3 gap-3 sm:h-[38rem] lg:h-[min(72svh,40rem)]"
        >
          {SOLUTION_TABS.map((item, i) => (
            <Enter
              key={item.id}
              delay={0.15 + i * 0.08}
              className={clsx("tile-in min-h-0", TILE_PLACE[i])}
            >
              <button
                type="button"
                onClick={() => openBusiness(i)}
                data-on={!hold && spot === i}
                className="group relative h-full w-full overflow-hidden rounded-3xl bg-jet text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                <img
                  src={ART[item.art]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07] group-data-[on=true]:scale-[1.07]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-jet/90 via-jet/25 to-transparent transition-colors duration-500 group-hover:from-jet/95 group-data-[on=true]:from-jet/95 group-hover:via-jet/55 group-data-[on=true]:via-jet/55" />

                <span
                  aria-hidden
                  className="tile-sweep pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 group-data-[on=true]:opacity-100"
                />
                {!hold && spot === i ? (
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
                    <span className="tile-timer block h-full bg-gradient-to-r from-brand-blue to-brand-green" />
                  </span>
                ) : null}

                <span className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
                  <span className="tabular block text-[0.7rem] font-extrabold text-brand-green">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={clsx(
                      "mt-1 flex items-center justify-between gap-3 font-extrabold leading-tight tracking-tight text-white",
                      i === 0
                        ? "text-[clamp(1.2rem,2vw,1.6rem)]"
                        : "text-[clamp(0.98rem,1.4vw,1.15rem)]"
                    )}
                  >
                    {item.tab}
                    <span className="flex h-8 w-8 shrink-0 translate-y-2 items-center justify-center rounded-full bg-white text-[0.85rem] text-jet opacity-0 transition-all duration-500 group-hover:translate-y-0 group-data-[on=true]:translate-y-0 group-hover:rotate-[-45deg] group-data-[on=true]:rotate-[-45deg] group-hover:opacity-100 group-data-[on=true]:opacity-100">
                      →
                    </span>
                  </span>
                  {/* The one-liner opens on hover */}
                  <span className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] [grid-template-rows:0fr] group-hover:[grid-template-rows:1fr] group-data-[on=true]:[grid-template-rows:1fr] group-focus-visible:[grid-template-rows:1fr]">
                    <span className="overflow-hidden">
                      <span className="block pt-2 text-[0.85rem] leading-snug text-white/75">
                        {item.copy}
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            </Enter>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- impact --- */

/** Each figure's pillar: how tall it stands, and the accent on its cap and bar. */
const PILLARS = [
  { h: 70, accent: "bg-jet" },
  { h: 60, accent: "bg-brand-blue" },
  { h: 46, accent: "bg-gradient-to-r from-brand-blue to-brand-green" },
  { h: 54, accent: "bg-brand-green" },
];

/** One figure as a pillar that rises from the floor of the screen. */
function Pillar({ stat, i, seen }) {
  const p = PILLARS[i];
  const percent = stat.suffix === "%";
  return (
    <div className="group relative lg:flex lg:h-full lg:items-end">
      <div
        data-in={seen}
        style={{ "--h": `${p.h}%`, "--i": i }}
        className="pillar relative flex w-full flex-col overflow-hidden rounded-[1.75rem] border border-hairline bg-gradient-to-b from-floral to-white p-7 text-jet transition-shadow duration-500 group-hover:shadow-[0_-20px_50px_-30px_rgba(5,36,57,.35)] lg:rounded-b-none lg:border-b-0 xl:p-8"
      >
        <span aria-hidden className={clsx("absolute inset-x-0 top-0 h-1", p.accent)} />
        <div className="flex items-center justify-between">
          <span className="text-[0.95rem] font-extrabold tracking-tight">{stat.label}</span>
          <span className="tabular text-[0.75rem] font-extrabold text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
        </div>
        <p className="tabular mt-4 text-[clamp(2.3rem,3.4vw,3.4rem)] font-extrabold leading-none tracking-[-0.05em]">
          <CountUp value={stat.value} suffix={stat.suffix} delay={300 + i * 150} />
        </p>
        {percent ? (
          <span aria-hidden className="mt-4 block h-1 w-full overflow-hidden rounded-full bg-jet/8">
            <span className={clsx("pillar-bar block h-full rounded-full", p.accent)} style={{ "--w": `${stat.value}%` }} />
          </span>
        ) : null}
        <p className="mt-4 max-w-[16rem] text-[0.92rem] leading-snug text-ink-soft">{stat.note}</p>
      </div>
    </div>
  );
}

/** What the network delivers: four pillars, rising one after another. */
function Impact() {
  const ref = useRef(null);
  const seen = useInViewOnce(ref, { margin: "0px 0px -20% 0px" });
  const stats = SOLUTIONS_IMPACT.stats;
  return (
    <section className="relative overflow-hidden bg-white pt-24 lg:flex lg:h-[100svh] lg:min-h-[44rem] lg:flex-col lg:pt-28">
      <div className="mx-auto w-full max-w-[84rem] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <SectionHeader eyebrow={SOLUTIONS_IMPACT.eyebrow} title={SOLUTIONS_IMPACT.headline} />
          <Reveal from="up" delay={0.15}>
            <p className="max-w-sm text-[1rem] leading-relaxed text-ink-soft">
              Four figures from the network every solution on this page runs on.
            </p>
          </Reveal>
        </div>
      </div>

      <div
        ref={ref}
        className="mx-auto mt-10 grid w-full max-w-[84rem] gap-3 px-5 pb-20 sm:grid-cols-2 md:px-10 lg:mt-12 lg:min-h-0 lg:flex-1 lg:grid-cols-4 lg:gap-4 lg:pb-0"
      >
        {stats.map((stat, i) => (
          <Pillar key={stat.label} stat={stat} i={i} seen={seen} />
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- closing call --- */

const START_TYPES = BUSINESS_TYPES.filter((t) => t.value !== "other");
const START_CITIES = [...COVERAGE_CITIES.map((c) => c.name), "Another city"];

/**
 * The last screen starts the enquiry. The visitor finishes one sentence (what
 * they are, where, and how many orders) by picking chips, one blank at a
 * time, and the button opens the Partner form with those answers filled in.
 */
function ClosingCall() {
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [orders, setOrders] = useState("");
  const [slot, setSlot] = useState(0);

  const picked = START_TYPES.find((t) => t.value === type);
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (city && city !== "Another city") params.set("city", city);
  if (orders) params.set("orders", orders);
  const query = params.toString();
  const to = `/partner${query ? `?${query}` : ""}#enquiry`;

  const SLOTS = [
    { label: "what you are", value: picked?.phrase, options: START_TYPES.map((t) => [t.value, t.label]), pick: setType, current: type },
    { label: "where", value: city, options: START_CITIES.map((c) => [c, c]), pick: setCity, current: city },
    { label: "how many", value: orders, options: MONTHLY_ORDERS.map((o) => [o, o]), pick: setOrders, current: orders },
  ];
  const active = SLOTS[slot];
  const choose = (value) => {
    active.pick(value);
    if (slot < SLOTS.length - 1) setSlot(slot + 1);
  };

  const blank = (i) => {
    const s = SLOTS[i];
    const on = i === slot;
    return (
      <button
        type="button"
        onClick={() => setSlot(i)}
        className={clsx(
          "relative mx-1 inline-flex items-baseline rounded-xl px-2 align-baseline outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-blue",
          on ? "bg-viking/70" : "hover:bg-viking/40"
        )}
      >
        <span className={clsx(s.value ? "text-brand-blue" : "text-ink-faint/70")}>{s.value || s.label}</span>
        <span aria-hidden className={clsx("absolute inset-x-2 -bottom-0.5 h-[3px] rounded-full", s.value ? "bg-brand-blue" : "bg-hairline", on && "sol-blank")} />
      </button>
    );
  };

  return (
    <section className="relative overflow-hidden bg-floral py-28 lg:flex lg:h-[100svh] lg:min-h-[44rem] lg:items-center">
      {/* A delivery route flowing along the foot of the screen */}
      <svg aria-hidden viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-40 w-full">
        <path d="M0 150 C 240 150, 320 70, 560 100 S 900 180, 1120 120 S 1340 40, 1440 60" fill="none" stroke="url(#start-ink)" strokeWidth="2.5" strokeDasharray="10 8" strokeLinecap="round" className="finale-flow" opacity=".55" />
        <defs>
          <linearGradient id="start-ink" x1="0" x2="1">
            <stop offset="0" stopColor="#0296d9" />
            <stop offset="1" stopColor="#8fc124" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative mx-auto grid w-full max-w-[84rem] items-center gap-10 px-5 md:px-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
        {/* The ask */}
        <div>
          <Reveal from="up">
            <p className="label text-brand-blue">Not sure where you fit?</p>
          </Reveal>
          <SplitText
            lines={["Tell us what you sell", "and where.", ["We'll", { text: "map the route.", className: HIGHLIGHT }]]}
            className="mt-4 text-[clamp(1.9rem,3vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-jet"
          />
          <Reveal from="up" delay={0.2}>
            <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
              Finish the sentence and we&apos;ll open the enquiry with your answers filled in. The partnerships team replies within two working days.
            </p>
            <p className="mt-5 text-[0.92rem] text-ink-faint">
              Rather talk?{" "}
              <a href="tel:+917542021525" className="link-underline font-bold text-jet">
                +91 75420 21525
              </a>
            </p>
          </Reveal>
        </div>

        {/* The sentence */}
        <Reveal from="up" delay={0.15}>
          <div className="rounded-[1.75rem] border border-hairline bg-white p-6 shadow-[0_30px_60px_-45px_rgba(5,36,57,.35)] md:p-8">
            <p className="text-[clamp(1.05rem,1.5vw,1.3rem)] font-bold leading-[1.9] text-jet">
              I&apos;m {blank(0)} in {blank(1)} with {blank(2)} orders a month.
            </p>

            <div className="mt-6 border-t border-hairline pt-5">
              <p className="tabular text-[0.75rem] font-extrabold uppercase tracking-[0.16em] text-ink-faint">
                {slot + 1} / 3 · Pick {active.label}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={slot}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {active.options.map(([value, label], k) => {
                    const on = active.current === value;
                    return (
                      <motion.button
                        key={value}
                        type="button"
                        onClick={() => choose(value)}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 420, damping: 26, delay: k * 0.03 }}
                        aria-pressed={on}
                        className={clsx(
                          "rounded-full border px-3.5 py-1.5 text-[0.84rem] font-semibold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-blue",
                          on ? "border-jet bg-jet text-white" : "border-hairline bg-floral text-ink-soft hover:border-jet hover:text-jet"
                        )}
                      >
                        {on ? "✓ " : ""}
                        {label}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[0.85rem] text-ink-faint">{type ? "Opens the enquiry, filled in." : "You can skip any blank."}</p>
              <CtaButton to={to}>{type ? "Map my route" : "Talk to our team"}</CtaButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page --- */

export default function Solutions() {
  usePageSeo("solutions");

  return (
    <>
      <SolutionsHero />
      <BusinessReel art={ART} outcome={OUTCOME} />
      <Impact />
      <PoweredBy />
      <ClosingCall />
    </>
  );
}
