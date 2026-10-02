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
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { HeroBackdrop, HeroHeading, Enter, HIGHLIGHT } from "@/components/motion/Hero";
import { SectionHeader, SplitText } from "@/components/motion/Text";
import { CtaButton, GhostButton } from "@/components/motion/CtaButton";
import { scrollToTarget } from "@/components/motion/smoothScroll";
import { usePageSeo } from "@/seo/usePageSeo";
import { PoweredBy } from "@/components/solutions/PoweredBy";
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

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * A row that slides sideways forever and speeds up with the scroll, turning
 * round when the visitor scrolls back up. Four copies keep it seamless.
 */
function DriftRow({ children, speed = 3, reverse = false }) {
  const reduce = useReducedMotion();
  const offset = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(offset, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(reverse ? 1 : -1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) direction.current = reverse ? -1 : 1;
    else if (b > 0) direction.current = reverse ? 1 : -1;
    let move = direction.current * speed * (delta / 1000);
    move += move * Math.abs(b);
    offset.set(offset.get() + move);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className="flex shrink-0 whitespace-nowrap">
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} aria-hidden={copy > 0 || undefined} className="flex shrink-0">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * What the network delivers, as a band of enormous figures sliding across
 * the screen, with what each one means sliding the other way beneath it.
 */
function Impact() {
  const stats = SOLUTIONS_IMPACT.stats;
  return (
    <section className="overflow-hidden bg-white py-24 lg:flex lg:h-[100svh] lg:min-h-[44rem] lg:flex-col lg:pb-14 lg:pt-28">
      <div className="mx-auto w-full max-w-[84rem] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <SectionHeader eyebrow={SOLUTIONS_IMPACT.eyebrow} title={SOLUTIONS_IMPACT.headline} />
          <Reveal from="up" delay={0.15}>
            <p className="max-w-sm text-[1rem] leading-relaxed text-ink-soft">
              Four figures from the network every solution runs on. Scroll faster and they move faster.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal from="up" delay={0.1} className="mt-14 flex flex-col justify-center gap-6 lg:mt-0 lg:flex-1">
        {/* The figures */}
        <DriftRow speed={2.4}>
          {stats.map((s, i) => (
            <span key={s.label} className="flex shrink-0 items-center gap-6 pr-14 md:gap-8 md:pr-20">
              <span
                className={clsx(
                  "tabular text-[clamp(4.5rem,11vw,10.5rem)] font-extrabold leading-[0.95] tracking-[-0.06em]",
                  i % 2 ? HIGHLIGHT : "text-jet"
                )}
              >
                {s.value}
                {s.suffix}
              </span>
              <span className="flex flex-col whitespace-normal">
                <span className="tabular text-[0.8rem] font-extrabold text-brand-blue">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1 w-[11rem] text-[clamp(1.1rem,1.6vw,1.45rem)] font-extrabold leading-tight tracking-tight text-jet">{s.label}</span>
              </span>
              <span aria-hidden className="ml-4 h-4 w-4 shrink-0 rotate-45 rounded-[3px] bg-brand-green md:ml-8" />
            </span>
          ))}
        </DriftRow>

        {/* What they mean, the other way */}
        <DriftRow speed={1.6} reverse>
          {stats.map((s) => (
            <span key={s.note} className="flex shrink-0 items-center gap-10 pr-10">
              <span className="text-[clamp(2rem,4.4vw,4rem)] font-extrabold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_rgba(5,36,57,.28)]">
                {s.note}
              </span>
              <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-blue/40" />
            </span>
          ))}
        </DriftRow>
      </Reveal>

      {/* The same figures for screen readers, once */}
      <ul className="sr-only">
        {stats.map((s) => (
          <li key={s.label}>
            {s.label}: {s.value}
            {s.suffix}. {s.note}.
          </li>
        ))}
      </ul>
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

      <div className="relative mx-auto w-full max-w-5xl px-5 text-center md:px-10">
        <Reveal from="up">
          <p className="label text-brand-blue">Not sure where you fit?</p>
        </Reveal>
        <SplitText
          lines={["Tell us what you sell and where.", ["We'll", { text: "map the route.", className: HIGHLIGHT }]]}
          className="mx-auto mt-5 text-[clamp(2rem,3.8vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.045em] text-jet"
        />

        {/* The sentence */}
        <Reveal from="up" delay={0.2}>
          <div className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-hairline bg-white p-6 text-left shadow-[0_40px_80px_-50px_rgba(5,36,57,.35)] md:p-9">
            <p className="text-[clamp(1.3rem,2.3vw,2rem)] font-extrabold leading-[1.6] tracking-[-0.025em] text-jet">
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
                          "rounded-full border px-4 py-2 text-[0.9rem] font-bold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-blue",
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
              <p className="text-[0.9rem] text-ink-faint">
                Replies within two working days, or call{" "}
                <a href="tel:+917542021525" className="link-underline font-bold text-jet">
                  +91 75420 21525
                </a>
              </p>
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
