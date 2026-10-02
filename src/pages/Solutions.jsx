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
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/experience/HeroParts";
import { HeroBackdrop, HeroHeading, Enter, HIGHLIGHT } from "@/components/motion/Hero";
import { SectionHeader } from "@/components/motion/Text";
import { CtaButton, GhostButton } from "@/components/motion/CtaButton";
import { scrollToTarget } from "@/components/motion/smoothScroll";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { usePageSeo } from "@/seo/usePageSeo";
import { PoweredBy } from "@/components/solutions/PoweredBy";
import { SOLUTIONS_HERO, SOLUTION_TABS, SOLUTIONS_IMPACT } from "@/data/site";
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

/* -------------------------------------------------------------- solutions --- */

/** Two small status cards that float over each business's photo. */
const FLOAT = {
  "e-pharmacies": [
    ["rx", "Prescription validated", "Pharmacist sign-off"],
    ["ride", "Out for delivery", "30–60 min hyperlocal"],
  ],
  "corporate-wellness": [
    ["api", "Order received by API", "Straight into the network"],
    ["pin", "Tracked end to end", "Order to doorstep"],
  ],
  "health-insurers": [
    ["rx", "Member prescription", "Validated before dispatch"],
    ["home", "At the member's door", "Pan-India reach"],
  ],
  "d2c-health": [
    ["box", "Stock close to customers", "Multi-city fulfilment"],
    ["ride", "Hyperlocal delivery", "30–60 minutes"],
  ],
  hospitals: [
    ["app", "Your app, your brand", "White-labelled"],
    ["home", "Delivered to the patient", "Beyond the hospital"],
  ],
};

const GLYPH = {
  rx: "M6 4h6a4 4 0 0 1 0 8H6zM6 12v8M10 12l8 8M18 12l-8 8",
  ride: "M5 17a2.5 2.5 0 1 0 0 .1M19 17a2.5 2.5 0 1 0 0 .1M5 17l4-7h5l3 7M9 10l-1-3H6M14 10h3l2 7",
  api: "M8 6l-5 6 5 6M16 6l5 6-5 6M14 4l-4 16",
  pin: "M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  home: "M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6",
  box: "M3 7l9-4 9 4-9 4zM3 7v10l9 4 9-4V7M12 11v10",
  app: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2",
};

const pad = (n) => String(n).padStart(2, "0");

/** Plays once, the first time the element comes into view. */
const inView = { initial: "hidden", whileInView: "shown", viewport: { once: true, amount: 0.35 } };
const rise = (delay = 0) => ({
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
});

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

function FloatCard({ glyph, title, sub, delay, className, tone = "blue" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18, scale: 0.9 },
        shown: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 240, damping: 20, delay },
        },
      }}
      className={clsx("absolute z-10", className)}
    >
      <div className="sol-float flex items-center gap-3 rounded-2xl bg-white/95 py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-18px_rgba(0,0,0,.55)] backdrop-blur">
        <span
          className={clsx(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            tone === "blue" ? "bg-viking text-brand-blue" : "bg-peppermint text-[#5f8a0f]"
          )}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={GLYPH[glyph]} />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="block whitespace-nowrap text-[0.82rem] font-extrabold leading-tight text-jet">
            {title}
          </span>
          <span className="block whitespace-nowrap text-[0.72rem] font-semibold text-ink-faint">
            {sub}
          </span>
        </span>
        <span className="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green text-[0.6rem] text-white">
          ✓
        </span>
      </div>
    </motion.div>
  );
}

/**
 * One business, one screen. On desktop each card sticks under the header and
 * the next one slides up over it; the cards underneath shrink back and dim,
 * so the five stack like a deck as you scroll.
 */
function BusinessCard({ tab, i, count, progress, stacking }) {
  const dark = i % 2 === 0;
  const flip = i % 2 === 1;
  const [first, second] = FLOAT[tab.id];

  // While later cards arrive this one recedes: a little smaller, a little darker.
  const steps = count - 1;
  const start = i / steps;
  const scale = useTransform(progress, [start, 1], [1, 1 - (steps - i) * 0.04]);
  const shade = useTransform(
    progress,
    [start, Math.min(1, start + 1 / steps)],
    [0, i === count - 1 ? 0 : 0.45]
  );

  // The photo drifts against the scroll inside its frame.
  const photo = useRef(null);
  const { scrollYProgress } = useScroll({ target: photo, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <>
      {/* Links like /solutions#d2c-health land here: a sticky card reports where
        it is stuck, not where it sits, so the anchor is a plain marker. */}
      <span id={tab.id} aria-hidden className="block h-0 scroll-mt-0" />
      <div
        className="max-lg:mb-6 lg:sticky lg:flex lg:h-[100svh] lg:items-start"
        style={stacking ? { top: 0, paddingTop: `calc(6rem + ${i * 0.85}rem)` } : undefined}
      >
        <motion.article
          {...inView}
          style={stacking ? { scale } : undefined}
          className={clsx(
            "relative grid w-full origin-top overflow-hidden rounded-[2.25rem] lg:h-[calc(100svh-10.5rem)] lg:min-h-[32rem] lg:grid-cols-2",
            dark ? "bg-jet text-white" : "border border-hairline bg-floral text-jet",
            "shadow-[0_-24px_60px_-30px_rgba(5,36,57,.35)]"
          )}
        >
          {/* Copy */}
          <div className={clsx("relative flex flex-col p-7 sm:p-10 lg:p-12", flip && "lg:order-2")}>
            <motion.div variants={rise(0)} className="flex items-center gap-3">
              <span
                className={clsx(
                  "tabular flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-[0.78rem] font-extrabold",
                  dark ? "bg-white/10 text-brand-green" : "bg-white text-brand-blue shadow-sm"
                )}
              >
                {pad(i + 1)}
              </span>
              <span
                className={clsx(
                  "text-[0.8rem] font-extrabold uppercase tracking-[0.18em]",
                  dark ? "text-white/70" : "text-ink-soft"
                )}
              >
                {tab.tab}
              </span>
              <motion.span
                variants={{
                  hidden: { scaleX: 0 },
                  shown: { scaleX: 1, transition: { duration: 1, ease: EASE, delay: 0.2 } },
                }}
                className={clsx("h-px flex-1 origin-left", dark ? "bg-white/15" : "bg-hairline")}
              />
              <span
                className={clsx(
                  "tabular hidden text-[0.78rem] font-bold sm:inline",
                  dark ? "text-white/40" : "text-ink-faint"
                )}
              >
                {pad(i + 1)} / {pad(count)}
              </span>
            </motion.div>

            <div className="mt-8 lg:mt-auto">
              <h3 className="text-[clamp(1.8rem,2.7vw,2.7rem)] font-extrabold leading-[1.06] tracking-[-0.04em]">
                {tab.headline.split(" ").map((word, w) => (
                  <span
                    key={`${word}${w}`}
                    className="inline-block overflow-hidden pb-[0.08em] align-top"
                  >
                    <motion.span
                      className="inline-block"
                      variants={{
                        hidden: { y: "105%" },
                        shown: {
                          y: 0,
                          transition: { duration: 0.7, ease: EASE, delay: 0.1 + w * 0.04 },
                        },
                      }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  </span>
                ))}
              </h3>
              <motion.p
                variants={rise(0.3)}
                className={clsx(
                  "sol-short-hide mt-4 max-w-lg text-[1.02rem] leading-relaxed",
                  dark ? "text-white/65" : "text-ink-soft"
                )}
              >
                {tab.copy}
              </motion.p>
              <motion.p
                variants={rise(0.4)}
                className={clsx(
                  "mt-4 border-l-2 border-brand-green pl-3 text-[1.05rem] font-bold leading-snug",
                  dark ? "text-white" : "text-jet"
                )}
              >
                {OUTCOME[tab.id]}
              </motion.p>

              <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {tab.props.map((prop, p) => (
                  <motion.li
                    key={prop}
                    variants={{
                      hidden: { opacity: 0, x: -14 },
                      shown: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5, ease: EASE, delay: 0.45 + p * 0.06 },
                      },
                    }}
                    className={clsx(
                      "flex items-start gap-2.5 text-[0.92rem] font-semibold",
                      dark ? "text-white/90" : "text-jet"
                    )}
                  >
                    <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-brand-green text-[0.55rem] text-jet">
                      ✓
                    </span>
                    {prop}
                  </motion.li>
                ))}
              </ul>

              <motion.div variants={rise(0.75)} className="mt-8 flex flex-wrap items-center gap-4">
                <CtaButton to="/partner">{tab.cta}</CtaButton>
                {i < count - 1 ? (
                  <a
                    href={`#${SOLUTION_TABS[i + 1].id}`}
                    className={clsx(
                      "group/next inline-flex items-center gap-2 text-[0.9rem] font-bold transition-colors",
                      dark
                        ? "text-white/60 hover:text-white"
                        : "text-ink-soft hover:text-brand-blue"
                    )}
                  >
                    Next: {SOLUTION_TABS[i + 1].tab}
                    <span className="transition-transform duration-300 group-hover/next:translate-y-0.5">
                      ↓
                    </span>
                  </a>
                ) : null}
              </motion.div>
            </div>
          </div>

          {/* Photo, revealed by a wipe, drifting with the scroll, with live status */}
          <div
            ref={photo}
            className={clsx(
              "relative min-h-[20rem] p-3 max-lg:order-first sm:min-h-[24rem] lg:min-h-0",
              flip && "lg:order-1"
            )}
          >
            <motion.div
              variants={{
                hidden: { clipPath: "inset(12% 12% 12% 12% round 1.75rem)" },
                shown: {
                  clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
                  transition: { duration: 1.1, ease: EASE, delay: 0.1 },
                },
              }}
              className="absolute inset-3 overflow-hidden rounded-[1.75rem] bg-jet"
            >
              <motion.img
                src={ART[tab.art]}
                alt=""
                loading="lazy"
                style={{ y: drift }}
                className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jet/70 via-transparent to-jet/10" />
              <span className="tabular absolute bottom-3 right-6 text-[clamp(5rem,9vw,8.5rem)] font-extrabold leading-none tracking-[-0.06em] text-white/85 mix-blend-overlay">
                {pad(i + 1)}
              </span>
            </motion.div>

            <FloatCard
              glyph={first[0]}
              title={first[1]}
              sub={first[2]}
              delay={0.7}
              className={clsx("left-7 top-8", flip && "lg:left-auto lg:right-7")}
            />
            <FloatCard
              glyph={second[0]}
              title={second[1]}
              sub={second[2]}
              delay={0.9}
              tone="green"
              className={clsx("hidden sm:block", flip ? "left-7 top-[42%]" : "right-7 top-[42%]")}
            />
          </div>

          {/* Dims as the next card covers it */}
          {stacking ? (
            <motion.div
              aria-hidden
              style={{ opacity: shade }}
              className="pointer-events-none absolute inset-0 z-20 bg-jet"
            />
          ) : null}
        </motion.article>
      </div>
    </>
  );
}

/** The five businesses, one screen each, stacking as you scroll. */
function SolutionStack() {
  const ref = useRef(null);
  const stacking = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="solutions" className="relative bg-white pb-20 pt-20 lg:pb-24 lg:pt-28">
      <div className="mx-auto w-full max-w-[84rem] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeader eyebrow="Who we build for" title="One network. Five ways to plug in." />
          <Reveal from="up" delay={0.15}>
            <ul className="flex max-w-xl flex-wrap gap-2">
              {SOLUTION_TABS.map((tab, i) => (
                <li key={tab.id}>
                  <a
                    href={`#${tab.id}`}
                    className="group/jump inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-3.5 py-2 text-[0.84rem] font-bold text-ink-soft transition-colors duration-300 hover:border-jet hover:bg-jet hover:text-white"
                  >
                    <span className="tabular text-[0.72rem] text-brand-blue transition-colors group-hover/jump:text-brand-green">
                      {pad(i + 1)}
                    </span>
                    {tab.tab}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div ref={ref} className="mt-10 lg:mt-0">
          {SOLUTION_TABS.map((tab, i) => (
            <BusinessCard
              key={tab.id}
              tab={tab}
              i={i}
              count={SOLUTION_TABS.length}
              progress={scrollYProgress}
              stacking={stacking}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- impact --- */

/** A small picture for each figure: a ring for a rate, a clock for time, bars for depth. */
function StatArt({ i, value, on }) {
  const draw = { transition: "stroke-dashoffset 1.8s cubic-bezier(.22,1,.36,1) .2s" };
  if (i < 2) {
    return (
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden>
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="#052439"
          strokeOpacity=".08"
          strokeWidth="6"
        />
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke={i === 0 ? "#0296d9" : "#8fc124"}
          strokeWidth="6"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={on ? 100 - value : 100}
          style={draw}
        />
      </svg>
    );
  }
  if (i === 2) {
    // Half the dial: thirty minutes of the hour.
    return (
      <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden>
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="#fff"
          stroke="#052439"
          strokeOpacity=".08"
          strokeWidth="6"
        />
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="#0296d9"
          strokeWidth="6"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={on ? 50 : 100}
          transform="rotate(-90 32 32)"
          style={draw}
        />
        <line
          x1="32"
          y1="32"
          x2="32"
          y2="14"
          stroke="#052439"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            transformOrigin: "32px 32px",
            transform: `rotate(${on ? 180 : 0}deg)`,
            transition: "transform 1.8s cubic-bezier(.22,1,.36,1) .2s",
          }}
        />
        <circle cx="32" cy="32" r="3.5" fill="#052439" />
      </svg>
    );
  }
  return (
    <span className="flex h-16 items-end gap-1.5" aria-hidden>
      {[0.45, 0.7, 0.55, 0.9, 1].map((h, j) => (
        <span
          key={j}
          className="w-2.5 rounded-full bg-gradient-to-t from-brand-blue to-brand-green transition-[height] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ height: on ? `${h * 100}%` : "8%", transitionDelay: `${0.2 + j * 0.09}s` }}
        />
      ))}
    </span>
  );
}

function ImpactCard({ stat, i }) {
  const ref = useRef(null);
  const on = useInViewOnce(ref);
  return (
    <Reveal from="up" delay={i * 0.08} className="h-full">
      <div
        ref={ref}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        className="spotlight group relative flex h-full flex-col rounded-3xl border border-hairline bg-floral p-7 transition-[transform,background-color,box-shadow] duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-32px_rgba(5,36,57,.4)]"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="tabular text-[clamp(2.4rem,3.6vw,3.2rem)] font-extrabold leading-none tracking-[-0.05em] text-jet">
            <CountUp value={stat.value} suffix={stat.suffix} delay={i * 100} />
          </p>
          <StatArt i={i} value={stat.value} on={on} />
        </div>
        <p className="mt-auto pt-8 text-[1.02rem] font-extrabold tracking-tight text-jet">
          {stat.label}
        </p>
        <p className="mt-1 text-[0.9rem] text-ink-soft">{stat.note}</p>
      </div>
    </Reveal>
  );
}

function Impact() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader eyebrow={SOLUTIONS_IMPACT.eyebrow} title={SOLUTIONS_IMPACT.headline} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS_IMPACT.stats.map((stat, i) => (
            <ImpactCard key={stat.label} stat={stat} i={i} />
          ))}
        </div>

        {/* Closing call, with a delivery route flowing along its foot. */}
        <Reveal from="up" className="mt-20">
          <div className="relative overflow-hidden rounded-[2rem] bg-jet px-7 py-12 text-white md:px-12 md:py-14">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="pb-glow absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-blue/30 blur-[100px]" />
              <svg
                viewBox="0 0 600 200"
                preserveAspectRatio="none"
                className="absolute inset-x-0 bottom-0 h-1/2 w-full opacity-45"
              >
                <path
                  d="M20 185 C 160 190, 240 120, 340 150 S 500 175, 585 70"
                  fill="none"
                  stroke="#fff"
                  strokeOpacity=".12"
                  strokeWidth="2"
                />
                <path
                  className="route-flow"
                  d="M20 185 C 160 190, 240 120, 340 150 S 500 175, 585 70"
                  fill="none"
                  stroke="#a1e666"
                  strokeWidth="2.5"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="label text-brand-green">Not sure where you fit?</p>
                <h2 className="mt-3 max-w-xl text-[clamp(1.6rem,2.8vw,2.4rem)] font-extrabold leading-[1.1] tracking-[-0.035em]">
                  Tell us what you sell and where. We&apos;ll map the route.
                </h2>
                <p className="mt-3 max-w-lg text-[1.02rem] leading-relaxed text-white/65">
                  The darkstores, licences and delivery SLA your orders need, back to you within two
                  working days.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <CtaButton to="/partner">Talk to our team</CtaButton>
                <GhostButton to="/technology" tone="dark">
                  See the technology
                </GhostButton>
              </div>
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
      <SolutionStack />
      <PoweredBy />
      <Impact />
    </>
  );
}
