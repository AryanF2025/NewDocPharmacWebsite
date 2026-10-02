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
import { BusinessReel } from "@/components/solutions/BusinessReel";
import { SOLUTIONS_HERO, SOLUTION_TABS } from "@/data/site";
import { INTEGRATION_LOGOS } from "@/data/logos";
import { LogoImg } from "@/components/ui/LogoImg";
import { BUSINESS_TYPES, MONTHLY_ORDERS } from "@/data/contact";
import { COVERAGE_CITIES } from "@/components/art/IndiaCoverageMap";
import stillPick from "@/assets/images/still-pick.jpg";
import stillVerify from "@/assets/images/still-verify.jpg";
import stillPack from "@/assets/images/still-pack.jpg";
import stillRider from "@/assets/images/still-rider.jpg";
import stillHandover from "@/assets/images/still-handover.jpg";
import teamWarehouse from "@/assets/images/team-warehouse.webp";

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

/* --------------------------------------------------------------- going live --- */

const STACK = INTEGRATION_LOGOS.filter((l) => ["Shopify", "Unicommerce", "EasyEcom"].includes(l.name));

/** From first call to first delivery: what partnering actually involves. */
const GO_LIVE = [
  ["Tell us what you sell", "Your categories, cities and order volumes. The partnerships team replies within two working days."],
  ["We map your network", "The licensed darkstores, delivery SLA and compliance your orders need, city by city."],
  ["Plug in your stack", "Shopify, Unicommerce, EasyEcom or our order API, with status sent back by webhook. No rebuild."],
  ["Go live", "Stock sits in the darkstores and orders reach your customers' doors in about 30 minutes."],
];

const STEP_MS = 3200;

/**
 * Going live, in the site's own language: the heading and a photo of the
 * team in a darkstore on the left, four numbered points on the right. The
 * points play through in turn, each one's line filling while it is current,
 * and a small checklist on the photo keeps count. Hovering a point takes over.
 */
function GoingLive() {
  const ref = useRef(null);
  const seen = useInViewOnce(ref, { margin: "0px 0px -25% 0px" });
  const [step, setStep] = useState(0);
  const [hold, setHold] = useState(null);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const at = hold ?? step;

  useEffect(() => {
    if (!seen || hold !== null || reduce) return undefined;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % GO_LIVE.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [seen, hold, step, reduce]);

  return (
    <section className="bg-white py-24 lg:flex lg:h-[100svh] lg:min-h-[44rem] lg:items-center lg:py-28">
      <div ref={ref} className="mx-auto grid w-full max-w-[84rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        {/* Heading and the team */}
        <div>
          <SectionHeader
            eyebrow="Going live"
            title="From first call to first delivery."
            sub="No warehouse to lease, no fleet to hire. Four steps, and your orders run on the network above."
          />
          <Reveal from="up" delay={0.1}>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[2rem] bg-jet">
              <img src={teamWarehouse} alt="The DocPharma team in one of its darkstores" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-jet/50 via-transparent to-transparent" />

              {/* The checklist, keeping count */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(5,36,57,.55)] backdrop-blur sm:right-auto">
                <div className="flex gap-1.5">
                  {GO_LIVE.map(([title], i) => (
                    <span
                      key={title}
                      className={clsx(
                        "flex h-6 w-6 items-center justify-center rounded-full text-[0.62rem] font-extrabold transition-colors duration-500",
                        i < at ? "bg-brand-green text-white" : i === at ? "bg-brand-blue text-white" : "bg-floral text-ink-faint"
                      )}
                    >
                      {i < at ? "✓" : i + 1}
                    </span>
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-faint">Going live · Step {at + 1} of 4</p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={at}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="truncate text-[0.9rem] font-extrabold text-jet"
                    >
                      {GO_LIVE[at][0]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* The four points */}
        <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2" onPointerLeave={() => setHold(null)}>
          {GO_LIVE.map(([title, body], i) => {
            const on = i === at;
            return (
              <Reveal as="li" key={title} from="up" delay={i * 0.07}>
                <div onPointerEnter={() => setHold(i)} className="relative h-full pt-5">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-hairline" />
                  <span
                    aria-hidden
                    key={`${i}-${on}-${hold}`}
                    className={clsx(
                      "absolute left-0 top-0 h-0.5 w-full origin-left bg-gradient-to-r from-brand-blue to-brand-green",
                      on ? (hold === null && !reduce ? "golive-fill" : "scale-x-100") : i < at ? "scale-x-100 opacity-40" : "scale-x-0"
                    )}
                    style={on && hold === null ? { animationDuration: `${STEP_MS}ms` } : undefined}
                  />
                  <span className={clsx("tabular text-[0.75rem] font-extrabold transition-colors duration-300", on ? "text-brand-blue" : "text-ink-faint")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={clsx("mt-1 text-[1.15rem] font-extrabold tracking-tight text-jet transition-transform duration-300", on && "translate-x-1")}>{title}</h3>
                  <p className={clsx("mt-2 text-[0.95rem] leading-relaxed transition-colors duration-300", on ? "text-ink-soft" : "text-ink-faint")}>{body}</p>
                  {i === 2 ? (
                    <div className={clsx("mt-4 flex items-center gap-5 transition-opacity duration-300", on ? "opacity-100" : "opacity-50 grayscale")}>
                      {STACK.map((l) => (
                        <LogoImg key={l.name} src={l.src} alt={l.name} area={1300} maxWidth={84} maxHeight={22} />
                      ))}
                    </div>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </ol>
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
      <GoingLive />
      <PoweredBy />
      <ClosingCall />
    </>
  );
}
