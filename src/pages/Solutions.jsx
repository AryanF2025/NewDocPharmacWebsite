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
import { CountUp } from "@/components/experience/HeroParts";
import { HeroBackdrop, HeroHeading, Enter, HIGHLIGHT } from "@/components/motion/Hero";
import { SectionHeader, SplitText } from "@/components/motion/Text";
import { CtaButton, GhostButton } from "@/components/motion/CtaButton";
import { scrollToTarget } from "@/components/motion/smoothScroll";
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

/** A 270° arc from bottom left, round the top, to bottom right. */
const GAUGE_ARC = "M 27.47 92.53 A 46 46 0 1 1 92.53 92.53";

/**
 * A rate as a gauge: ticks round a 270° track, a gradient that sweeps to the
 * value with a glowing knob riding its end, a slow outer ring, and an icon
 * for what is being measured.
 */
function Gauge({ i, value, on }) {
  const [from, to] = i === 0 ? ["#0296d9", "#62c4ef"] : ["#8fc124", "#b8e86a"];
  const sweep = "1.8s cubic-bezier(.22,1,.36,1) .2s";
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={`gauge-${i}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>

      {/* Slow outer ring */}
      <circle className="gauge-spin" cx="60" cy="60" r="58" fill="none" stroke={from} strokeOpacity=".25" strokeWidth="1" strokeDasharray="1 5" />

      {/* Ticks every 10% */}
      {Array.from({ length: 11 }, (_, t) => (
        <line
          key={t}
          x1="60"
          y1="5"
          x2="60"
          y2={t % 5 === 0 ? "11" : "9"}
          stroke="#052439"
          strokeOpacity={t * 10 <= value && on ? ".45" : ".15"}
          strokeWidth="1.4"
          strokeLinecap="round"
          transform={`rotate(${-135 + t * 27} 60 60)`}
          style={{ transition: `stroke-opacity .4s ${0.2 + t * 0.12}s` }}
        />
      ))}

      {/* Track and fill */}
      <path d={GAUGE_ARC} fill="none" stroke="#052439" strokeOpacity=".07" strokeWidth="8" strokeLinecap="round" />
      <path
        d={GAUGE_ARC}
        fill="none"
        stroke={`url(#gauge-${i})`}
        strokeWidth="8"
        strokeLinecap="round"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset={on ? 100 - value : 100}
        style={{ transition: `stroke-dashoffset ${sweep}` }}
      />

      {/* The knob rides the end of the fill */}
      <g style={{ transformOrigin: "60px 60px", transform: `rotate(${on ? (270 * value) / 100 : 0}deg)`, transition: `transform ${sweep}` }}>
        <g transform="translate(27.47 92.53)">
          <circle className="gauge-glow" r="9" fill={to} opacity=".35" />
          <circle r="5.5" fill="#fff" stroke={from} strokeWidth="3" />
        </g>
      </g>

      {/* What it measures */}
      <circle cx="60" cy="60" r="24" fill="#fff" />
      <circle cx="60" cy="60" r="24" fill={from} fillOpacity=".08" />
      {i === 0 ? (
        <path d="M50 60.5l6.5 6.5 13.5-14" fill="none" stroke={from} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <g fill="none" stroke={from} strokeWidth="3.2" strokeLinecap="round">
          <circle cx="60" cy="60" r="11" />
          <path d="M60 53.5V60l4.5 3" />
        </g>
      )}
    </svg>
  );
}

/** A picture for each figure: a gauge for a rate, a dial for time, bars for depth. */
function StatArt({ i, value, on }) {
  const draw = { transition: "stroke-dashoffset 1.8s cubic-bezier(.22,1,.36,1) .2s" };
  if (i < 2) return <Gauge i={i} value={value} on={on} />;
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

/** True while the element is well on screen. */
function useOnScreen(ref, threshold = 0.5) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return on;
}

/** The big picture on the stage. It mounts empty, then sweeps to its value. */
function StageArt({ i, value }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setOn(true), 120);
    return () => window.clearTimeout(id);
  }, []);
  return <StatArt i={i} value={value} on={on} />;
}

const FIGURE_MS = 5000;

/**
 * What the network delivers, as a slider. The stage shows one figure large:
 * its picture sweeping in, the number counting up, and what it means. The
 * four figures sit beside it; the current one is filled in and times itself.
 */
function Impact() {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref, 0.4);
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const stats = SOLUTIONS_IMPACT.stats;
  const playing = onScreen && !hold;
  const stat = stats[active];

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % stats.length), FIGURE_MS);
    return () => window.clearTimeout(id);
  }, [playing, active, stats.length]);

  return (
    <section ref={ref} className="bg-white py-24 lg:flex lg:h-[100svh] lg:min-h-[44rem] lg:flex-col lg:pb-12 lg:pt-28">
      <div className="mx-auto w-full max-w-[84rem] px-5 md:px-10 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <SectionHeader eyebrow={SOLUTIONS_IMPACT.eyebrow} title={SOLUTIONS_IMPACT.headline} />
          <Reveal from="up" delay={0.15}>
            <p className="max-w-sm text-[1rem] leading-relaxed text-ink-soft">
              Four figures from the network every solution runs on: fulfilment, punctuality, speed and depth.
            </p>
          </Reveal>
        </div>

        <Reveal from="up" className="mt-10 lg:flex lg:min-h-0 lg:flex-1">
          <div
            onPointerEnter={() => setHold(true)}
            onPointerLeave={() => setHold(false)}
            className="grid gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-5"
          >
            {/* The stage */}
            <div className="relative min-h-[26rem] overflow-hidden rounded-[2.25rem] border border-hairline bg-floral lg:min-h-0">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(2,150,217,.09),transparent_60%)]" />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 grid grid-cols-1 items-center gap-6 p-8 sm:grid-cols-[minmax(0,1fr)_auto] md:p-12"
                >
                  <div className="order-2 sm:order-1">
                    <p className="tabular text-[0.8rem] font-extrabold text-brand-blue">
                      {String(active + 1).padStart(2, "0")} / {String(stats.length).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-[1.15rem] font-extrabold tracking-tight text-jet">{stat.label}</p>
                    <p className="tabular mt-4 text-[clamp(3.6rem,7vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.06em] text-jet">
                      <CountUp value={stat.value} suffix={stat.suffix} duration={1300} />
                    </p>
                    <p className="mt-4 max-w-xs text-[1.05rem] leading-relaxed text-ink-soft">{stat.note}</p>
                  </div>
                  <div className="order-1 mx-auto h-40 w-40 sm:order-2 lg:h-[min(19rem,36svh)] lg:w-[min(19rem,36svh)]">
                    <StageArt i={active} value={stat.value} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* The four figures */}
            <ul className="grid gap-3 lg:min-h-0 lg:grid-rows-4">
              {stats.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.label} className="lg:min-h-0">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={on}
                      className={clsx(
                        "group relative flex h-full w-full items-center justify-between gap-4 overflow-hidden rounded-3xl border px-6 py-5 text-left outline-none transition-[background-color,border-color,color,transform] duration-500 focus-visible:ring-2 focus-visible:ring-brand-blue",
                        on ? "border-jet bg-jet text-white" : "border-hairline bg-white text-jet hover:-translate-y-0.5 hover:border-jet/20 hover:bg-floral"
                      )}
                    >
                      <span className="min-w-0">
                        <span className={clsx("tabular block text-[0.72rem] font-extrabold", on ? "text-brand-green" : "text-ink-faint")}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-1 block text-[1.02rem] font-extrabold tracking-tight">{s.label}</span>
                        <span className={clsx("block truncate text-[0.85rem]", on ? "text-white/60" : "text-ink-faint")}>{s.note}</span>
                      </span>
                      <span className={clsx("tabular shrink-0 text-[clamp(1.5rem,2.2vw,2rem)] font-extrabold tracking-[-0.04em]", on ? "text-white" : "text-jet/80")}>
                        {s.value}
                        {s.suffix}
                      </span>
                      {/* Time left on this figure */}
                      {on ? (
                        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
                          <span
                            key={`${active}-${playing}`}
                            className="sol-tab-fill block h-full bg-gradient-to-r from-brand-blue to-brand-green !opacity-100"
                            style={{ animationDuration: `${FIGURE_MS}ms`, animationPlayState: playing ? "running" : "paused" }}
                          />
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- closing call --- */

/** The route the finale rides: darkstore, bottom left, to the customer's door, top right. */
const FINALE_ROUTE = "M 120 650 C 300 650, 360 548, 520 578 S 800 705, 1010 612 S 1240 392, 1330 300";

/** Checkpoints along the way: how far along the route, and which side of it the label sits so it never crosses the line. */
const FINALE_STOPS = [
  [0.2, "Order in", "up"],
  [0.42, "Picked & packed", "down"],
  [0.63, "Pharmacist check", "down"],
  [0.82, "Out for delivery", "left"],
];

/** One delivery: ride, wait at the door, then go again. */
const RIDE_MS = 5200;
const LOOP_MS = 8000;

/**
 * The last screen. Once it is on screen a delivery plays out behind the
 * call: the dashed route flows from a darkstore toward a customer's door,
 * a rider rides it with the minutes ticking, each checkpoint lights as it is
 * passed, and the door turns green on arrival. Then it runs again.
 */
function ClosingCall() {
  const ref = useRef(null);
  const path = useRef(null);
  const reveal = useRef(null);
  const rider = useRef(null);
  const onScreen = useOnScreen(ref, 0.55);
  const [stops, setStops] = useState([]);
  const [reached, setReached] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [arrived, setArrived] = useState(false);

  // Where the checkpoints sit on the route.
  useEffect(() => {
    const p = path.current;
    if (!p) return;
    const len = p.getTotalLength();
    setStops(
      FINALE_STOPS.map(([at, label, side]) => {
        const pt = p.getPointAtLength(at * len);
        return { at, label, side, x: pt.x, y: pt.y };
      })
    );
  }, []);

  useEffect(() => {
    const p = path.current;
    if (!p) return undefined;
    const len = p.getTotalLength();
    const paint = (v) => {
      const pt = p.getPointAtLength(v * len);
      rider.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      reveal.current?.setAttribute("stroke-dashoffset", String(1 - v));
      setMinutes(Math.max(1, Math.round(v * 24)));
      setReached(FINALE_STOPS.filter(([at]) => v >= at).length);
      setArrived(v >= 1);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(1);
      return undefined;
    }
    if (!onScreen) {
      paint(0);
      return undefined;
    }
    const start = performance.now();
    let raf = requestAnimationFrame(function loop(now) {
      const t = (now - start) % LOOP_MS;
      const u = Math.min(1, t / RIDE_MS);
      paint(u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2);
      raf = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(raf);
  }, [onScreen]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-floral py-28 lg:flex lg:h-[100svh] lg:min-h-[44rem] lg:items-center">
      {/* The delivery, behind everything */}
      <svg aria-hidden viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 hidden h-full w-full md:block">
        <defs>
          <linearGradient id="finale-ink" x1="0" x2="1">
            <stop offset="0" stopColor="#0296d9" />
            <stop offset="1" stopColor="#8fc124" />
          </linearGradient>
          {/* Only the part of the route already ridden shows */}
          <mask id="finale-ridden" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="800">
            <path ref={reveal} d={FINALE_ROUTE} fill="none" stroke="#fff" strokeWidth="16" pathLength="1" strokeDasharray="1 1" strokeDashoffset="1" />
          </mask>
        </defs>

        {/* The whole route, faint */}
        <path ref={path} d={FINALE_ROUTE} fill="none" stroke="#052439" strokeOpacity=".1" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
        {/* The ridden part, flowing toward the door */}
        <path
          className="finale-flow"
          d={FINALE_ROUTE}
          fill="none"
          stroke="url(#finale-ink)"
          strokeWidth="3.5"
          strokeDasharray="10 8"
          strokeLinecap="round"
          mask="url(#finale-ridden)"
        />

        {/* Checkpoints */}
        {stops.map((s, k) => {
          const done = k < reached;
          return (
            <g key={s.label} transform={`translate(${s.x} ${s.y})`}>
              <circle r={done ? 8 : 6} fill={done ? "#8fc124" : "#fff"} stroke={done ? "#8fc124" : "#052439"} strokeOpacity={done ? 1 : 0.2} strokeWidth="2.5" style={{ transition: "all .35s" }} />
              {done ? <path d="M-3.5 0l2.5 2.5 4.5-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> : null}
              <text
                x={s.side === "left" ? -18 : 0}
                y={s.side === "up" ? -18 : s.side === "down" ? 30 : 5}
                textAnchor={s.side === "left" ? "end" : "middle"}
                fill="#052439"
                fillOpacity={done ? 0.9 : 0.35} fontSize="13" fontWeight="800" style={{ transition: "fill-opacity .35s" }}>
                {s.label}
              </text>
            </g>
          );
        })}

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
            {arrived ? `Delivered · ${minutes} min` : "Your customer"}
          </text>
        </g>

        {/* The rider, with the minutes so far */}
        <g ref={rider} transform="translate(120 650)" style={{ opacity: arrived ? 0 : 1, transition: "opacity .3s" }}>
          <circle className="gauge-glow" r="16" fill="#8fc124" opacity=".3" />
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
