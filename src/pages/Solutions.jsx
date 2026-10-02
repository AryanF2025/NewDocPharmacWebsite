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
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/experience/HeroParts";
import { HeroBackdrop, HeroHeading, Enter, HIGHLIGHT } from "@/components/motion/Hero";
import { SectionHeader, SplitText } from "@/components/motion/Text";
import { CtaButton, GhostButton } from "@/components/motion/CtaButton";
import { scrollToTarget } from "@/components/motion/smoothScroll";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { usePageSeo } from "@/seo/usePageSeo";
import { PoweredBy } from "@/components/solutions/PoweredBy";
import { BusinessReel } from "@/components/solutions/BusinessReel";
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

/* ----------------------------------------------------------------- impact --- */

/** A picture for each figure: a ring for a rate, a dial for time, bars for depth. */
function StatArt({ i, value, on }) {
  const draw = { transition: "stroke-dashoffset 1.8s cubic-bezier(.22,1,.36,1) .2s" };
  if (i < 2) {
    return (
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r="26" fill="none" stroke="#052439" strokeOpacity=".07" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke={i === 0 ? "#0296d9" : "#8fc124"}
          strokeWidth="5"
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
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
        <circle cx="32" cy="32" r="26" fill="#fff" stroke="#052439" strokeOpacity=".07" strokeWidth="5" />
        {[0, 1, 2, 3].map((q) => (
          <line key={q} x1="32" y1="9" x2="32" y2="12.5" stroke="#052439" strokeOpacity=".25" strokeWidth="1.5" transform={`rotate(${q * 90} 32 32)`} />
        ))}
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="#0296d9"
          strokeWidth="5"
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
          y2="15"
          stroke="#052439"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            transformOrigin: "32px 32px",
            transform: `rotate(${on ? 180 : 0}deg)`,
            transition: "transform 1.8s cubic-bezier(.22,1,.36,1) .2s",
          }}
        />
        <circle cx="32" cy="32" r="3" fill="#052439" />
      </svg>
    );
  }
  return (
    <span className="flex h-full w-full items-end justify-center gap-2" aria-hidden>
      {[0.4, 0.62, 0.5, 0.82, 1].map((h, j) => (
        <span
          key={j}
          className="w-[14%] rounded-full bg-gradient-to-t from-brand-blue to-brand-green transition-[height] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ height: on ? `${h * 100}%` : "6%", transitionDelay: `${0.2 + j * 0.09}s` }}
        />
      ))}
    </span>
  );
}

/** One figure, as a tall card: what it measures, its picture, the number, and the note. */
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
        className="spotlight group relative flex h-full flex-col rounded-[2rem] border border-hairline bg-floral p-7 transition-[transform,background-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_30px_60px_-36px_rgba(5,36,57,.45)] xl:p-8"
      >
        <div className="flex items-center justify-between">
          <p className="text-[0.95rem] font-extrabold tracking-tight text-jet">{stat.label}</p>
          <span className="tabular text-[0.75rem] font-extrabold text-ink-faint transition-colors duration-300 group-hover:text-brand-blue">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="my-8 flex flex-1 items-center justify-center lg:my-4">
          <div className="h-28 w-28 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 lg:h-[min(11rem,22svh)] lg:w-[min(11rem,22svh)]">
            <StatArt i={i} value={stat.value} on={on} />
          </div>
        </div>

        <p className="tabular text-[clamp(2.6rem,4.2vw,4rem)] font-extrabold leading-none tracking-[-0.05em] text-jet">
          <CountUp value={stat.value} suffix={stat.suffix} delay={i * 100} />
        </p>
        <p className="mt-2 text-[0.95rem] text-ink-soft">{stat.note}</p>
      </div>
    </Reveal>
  );
}

/** What the network delivers, as one screen of four figures. */
function Impact() {
  return (
    <section className="bg-white py-24 lg:flex lg:h-[100svh] lg:min-h-[44rem] lg:flex-col lg:pb-12 lg:pt-28">
      <div className="mx-auto w-full max-w-[84rem] px-5 md:px-10 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <SectionHeader eyebrow={SOLUTIONS_IMPACT.eyebrow} title={SOLUTIONS_IMPACT.headline} />
          <Reveal from="up" delay={0.15}>
            <p className="max-w-sm text-[1rem] leading-relaxed text-ink-soft">
              Four figures from the network every solution above runs on: how often orders are fulfilled, how often they arrive on time, how fast, and how deep the shelves go.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:min-h-0 lg:flex-1 lg:grid-cols-4">
          {SOLUTIONS_IMPACT.stats.map((stat, i) => (
            <ImpactCard key={stat.label} stat={stat} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- closing call --- */

/** The route the finale draws: darkstore, bottom left, to the customer's door, top right. */
const FINALE_ROUTE = "M 120 650 C 300 650, 360 548, 520 578 S 800 705, 1010 612 S 1240 392, 1330 300";

/**
 * The last screen. As it scrolls in, a delivery route draws itself from a
 * darkstore to a customer's door, a rider rides it with the minutes ticking,
 * and the door lights up as the screen settles. The call sits in the middle.
 */
function ClosingCall() {
  const ref = useRef(null);
  const path = useRef(null);
  const rider = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const draw = useTransform(scrollYProgress, [0.2, 0.92], [0, 1]);
  const [minutes, setMinutes] = useState(0);
  const [arrived, setArrived] = useState(false);

  const place = (v) => {
    const p = path.current;
    if (!p) return;
    const pt = p.getPointAtLength(v * p.getTotalLength());
    rider.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
    setMinutes(Math.max(1, Math.round(v * 24)));
    setArrived(v > 0.985);
  };
  useMotionValueEvent(draw, "change", (v) => !reduce && place(v));
  useEffect(() => place(reduce ? 1 : draw.get()), [reduce, draw]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-floral py-28 lg:flex lg:h-[100svh] lg:min-h-[44rem] lg:items-center">
      {/* The route, behind everything */}
      <svg aria-hidden viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 hidden h-full w-full md:block">
        <defs>
          <linearGradient id="finale-ink" x1="0" x2="1">
            <stop offset="0" stopColor="#0296d9" />
            <stop offset="1" stopColor="#8fc124" />
          </linearGradient>
        </defs>
        <path ref={path} d={FINALE_ROUTE} fill="none" stroke="#052439" strokeOpacity=".08" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
        <motion.path
          d={FINALE_ROUTE}
          fill="none"
          stroke="url(#finale-ink)"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ pathLength: reduce ? 1 : draw }}
        />

        {/* The darkstore */}
        <g transform="translate(120 650)">
          <circle r="34" fill="#0296d9" opacity=".12" />
          <rect x="-18" y="-18" width="36" height="36" rx="10" fill="#0296d9" />
          <path d="M0 -9v18M-9 0h18" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
          <text y="44" textAnchor="middle" fill="#052439" fontSize="15" fontWeight="800">
            Darkstore
          </text>
        </g>

        {/* The door */}
        <g transform="translate(1330 300)">
          {arrived ? <circle className="door-ping" r="30" fill="none" stroke="#8fc124" strokeWidth="2.5" /> : null}
          <circle r="22" fill={arrived ? "#8fc124" : "#fff"} stroke="#8fc124" strokeWidth="3" style={{ transition: "fill .4s" }} />
          <path
            d="M-8 1l8-7 8 7M-6 0v8h12v-8"
            fill="none"
            stroke={arrived ? "#fff" : "#8fc124"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "stroke .4s" }}
          />
          <text y="-36" textAnchor="middle" fill="#052439" fontSize="15" fontWeight="800">
            {arrived ? "Delivered" : "Your customer"}
          </text>
        </g>

        {/* The rider, with the minutes so far */}
        <g ref={rider} transform="translate(120 650)" style={{ opacity: arrived ? 0 : 1, transition: "opacity .3s" }}>
          <circle r="18" fill="#8fc124" opacity=".25" />
          <circle r="9" fill="#8fc124" stroke="#fff" strokeWidth="3" />
          <rect x="16" y="-34" width="70" height="26" rx="13" fill="#052439" />
          <text x="51" y="-16" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800">
            {minutes} min
          </text>
        </g>
      </svg>

      <div className="relative mx-auto max-w-6xl px-5 text-center md:px-10">
        <Reveal from="up">
          <p className="label text-brand-blue">Not sure where you fit?</p>
        </Reveal>
        <SplitText
          lines={["Tell us what you sell and where.", ["We'll", { text: "map the route.", className: HIGHLIGHT }]]}
          className="mx-auto mt-5 text-[clamp(2.1rem,4.1vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-jet"
        />
        <Reveal from="up" delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-[1.08rem] leading-relaxed text-ink-soft">
            The darkstores, licences and delivery SLA your orders need, back to you within two working days.
          </p>
        </Reveal>
        <Reveal from="up" delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <CtaButton to="/partner">Talk to our team</CtaButton>
            <GhostButton to="/technology">See the technology</GhostButton>
          </div>
          <p className="mt-6 text-[0.9rem] text-ink-faint">
            Or call{" "}
            <a href="tel:+917542021525" className="link-underline font-bold text-jet">
              +91 75420 21525
            </a>
          </p>
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
