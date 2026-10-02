/**
 * "Powered by": the two things every solution runs on, as one navy screen.
 *
 * Left, the physical network: a darkstore's catchment, live, with riders
 * leaving the store, reaching the door and coming back. Right, the software:
 * the DocPharma One console running, with its six products lighting up in
 * turn. Between them, the join: both engines meet in every order.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { ConsoleMock } from "@/components/directions/shared";
import { CountUp } from "@/components/experience/HeroParts";
import { SectionHeader } from "@/components/motion/Text";
import { Reveal } from "@/components/ui/Reveal";
import { PLATFORM } from "@/data/technology";
import rider from "@/assets/images/rider.webp";
import stillVerify from "@/assets/images/still-verify.jpg";

/** True while the element is on screen, so the animations only run when seen. */
function useOnScreen(ref) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return on;
}

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Lets a card's border and glow follow the cursor (see .spotlight in index.css). */
const track = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

/* --------------------------------------------------------- the network --- */

const HUB = [200, 132];

/** Rider routes out of the darkstore, each to a door, with its delivery time. */
const ROUTES = [
  { d: "M200 132 C 232 118, 262 82, 318 62", to: [318, 62], min: 18, side: "left" },
  { d: "M200 132 C 168 150, 122 152, 88 196", to: [88, 196], min: 24, side: "right" },
  { d: "M200 132 C 216 170, 252 200, 304 212", to: [304, 212], min: 21, side: "left" },
  { d: "M200 132 C 178 108, 132 88, 100 56", to: [100, 56], min: 27, side: "right" },
];

const CYCLE = 7200;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** A darkstore's catchment, with riders running orders out to the door. */
function CatchmentMap({ running }) {
  const routeRefs = useRef([]);
  const trailRefs = useRef([]);
  const riderRefs = useRef([]);
  const pinRefs = useRef([]);
  const tagRefs = useRef([]);

  useEffect(() => {
    const paint = (now) => {
      ROUTES.forEach((route, i) => {
        const path = routeRefs.current[i];
        if (!path) return;
        const u = ((now + i * (CYCLE / ROUTES.length)) % CYCLE) / CYCLE;
        // 0–.62 out to the door, .62–.86 handed over, .86–1 fade and reset.
        const p = u < 0.62 ? ease(u / 0.62) : 1;
        const done = u >= 0.62;
        const fade = u > 0.86 ? 1 - (u - 0.86) / 0.14 : 1;
        const pt = path.getPointAtLength(p * path.getTotalLength());
        riderRefs.current[i]?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        riderRefs.current[i]?.setAttribute("opacity", String(done ? 0 : 1));
        trailRefs.current[i]?.setAttribute("stroke-dashoffset", String(1 - p));
        trailRefs.current[i]?.setAttribute("opacity", String(fade));
        pinRefs.current[i]?.setAttribute("data-done", done && fade > 0.05 ? "1" : "0");
        const tag = tagRefs.current[i];
        if (tag) tag.style.opacity = done ? String(fade) : "0";
      });
    };

    if (!running || reduced()) {
      paint(CYCLE * 0.3);
      return undefined;
    }
    let raf = requestAnimationFrame(function loop(now) {
      paint(now);
      raf = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(raf);
  }, [running]);

  return (
    <svg viewBox="-70 0 540 260" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="pb-hub-glow">
          <stop offset="0" stopColor="#0296d9" stopOpacity=".45" />
          <stop offset="1" stopColor="#0296d9" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pb-trail" x1="0" x2="1">
          <stop offset="0" stopColor="#0296d9" />
          <stop offset="1" stopColor="#a1e666" />
        </linearGradient>
      </defs>

      {/* Streets */}
      <g stroke="#fff" strokeOpacity=".07" strokeWidth="1">
        <path d="M-70 62 H470 M-70 132 H470 M-70 212 H470 M-20 0 V260 M88 0 V260 M200 0 V260 M318 0 V260 M420 0 V260" />
        <path d="M-40 250 L150 0 M250 260 L440 20" strokeOpacity=".05" />
      </g>

      {/* The catchment: three rings and a wave that keeps going out */}
      <g fill="none" stroke="#fff">
        {[44, 82, 120].map((r) => (
          <circle key={r} cx={HUB[0]} cy={HUB[1]} r={r} strokeOpacity=".12" strokeDasharray="2 5" />
        ))}
        <circle className="pb-wave" cx={HUB[0]} cy={HUB[1]} r="120" stroke="#0296d9" strokeWidth="1.5" />
      </g>
      <text x={HUB[0]} y={HUB[1] - 124} textAnchor="middle" fill="#fff" fillOpacity=".4" fontSize="8.5" fontWeight="700" letterSpacing="1.4">
        DARKSTORE CATCHMENT
      </text>

      {/* Routes, trails and doors */}
      {ROUTES.map((route, i) => (
        <g key={route.d}>
          <path ref={(el) => (routeRefs.current[i] = el)} d={route.d} fill="none" stroke="#fff" strokeOpacity=".1" strokeWidth="2" strokeDasharray="1 4" />
          <path
            ref={(el) => (trailRefs.current[i] = el)}
            d={route.d}
            pathLength="1"
            fill="none"
            stroke="url(#pb-trail)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="1 1"
            strokeDashoffset="1"
          />
          <g ref={(el) => (pinRefs.current[i] = el)} className="pb-door" transform={`translate(${route.to[0]} ${route.to[1]})`}>
            <circle className="pb-door-ring" r="11" fill="none" stroke="#a1e666" strokeWidth="1.5" />
            <circle r="5" className="pb-door-dot" />
          </g>
        </g>
      ))}

      {/* Riders */}
      {ROUTES.map((route, i) => (
        <g key={`r${route.d}`} ref={(el) => (riderRefs.current[i] = el)} transform={`translate(${HUB[0]} ${HUB[1]})`}>
          <circle r="9" fill="#a1e666" fillOpacity=".22" />
          <circle r="4.5" fill="#a1e666" stroke="#052439" strokeWidth="1.5" />
        </g>
      ))}

      {/* The darkstore */}
      <circle cx={HUB[0]} cy={HUB[1]} r="34" fill="url(#pb-hub-glow)" />
      <g transform={`translate(${HUB[0] - 15} ${HUB[1] - 15})`}>
        <rect width="30" height="30" rx="9" fill="#0296d9" />
        <path d="M15 8v14M8 15h14" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </g>
      <text x={HUB[0]} y={HUB[1] + 30} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">
        Darkstore
      </text>

      {/* "Delivered" tags at the door */}
      {ROUTES.map((route, i) => {
        const w = 110;
        const x = route.side === "left" ? route.to[0] - w - 14 : route.to[0] + 14;
        return (
          <g key={`t${route.d}`} ref={(el) => (tagRefs.current[i] = el)} style={{ opacity: 0, transition: "opacity .25s" }}>
            <rect x={x} y={route.to[1] - 11} width={w} height="22" rx="11" fill="#fff" />
            <circle cx={x + 12} cy={route.to[1]} r="4" fill="#8fc124" />
            <text x={x + 21} y={route.to[1] + 3.5} fill="#052439" fontSize="9" fontWeight="800">
              Delivered · {route.min} min
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ----------------------------------------------------------- the cards --- */

function Stat({ value, suffix, label, delay }) {
  return (
    <div className="min-w-0">
      <p className="tabular whitespace-nowrap text-[clamp(1.35rem,1.9vw,1.75rem)] font-extrabold leading-none tracking-[-0.04em] text-white">
        <CountUp value={value} suffix={suffix} delay={delay} />
      </p>
      <p className="mt-1.5 text-[0.8rem] font-semibold leading-snug text-white/55">{label}</p>
    </div>
  );
}

function EngineCard({ index, eyebrow, title, body, stats, link, visual, live, delay }) {
  return (
    <Reveal from="up" delay={delay} className="lg:min-h-0">
      <Link
        to={link.to}
        onPointerMove={track}
        className="spotlight group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] outline-none backdrop-blur-sm transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/20 focus-visible:ring-2 focus-visible:ring-brand-blue"
      >
        {/* The live picture */}
        <div className="relative h-[17rem] shrink-0 overflow-hidden sm:h-[20rem] lg:h-auto lg:min-h-[15rem] lg:flex-1">
          {visual}
          <div className="absolute left-5 top-5 flex items-center gap-2.5">
            <span className="tabular flex h-7 min-w-7 items-center justify-center rounded-full bg-white/10 px-2 text-[0.72rem] font-extrabold text-white backdrop-blur">
              {String(index).padStart(2, "0")}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-jet/70 px-3 py-1.5 text-[0.72rem] font-bold text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
              {live}
            </span>
          </div>
        </div>

        {/* What it is */}
        <div className="relative border-t border-white/10 p-6 md:px-7 md:py-6">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <p className="label text-brand-green">{eyebrow}</p>
              <h3 className="mt-1.5 text-[clamp(1.2rem,1.6vw,1.45rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-white">{title}</h3>
              <p className="mt-1.5 max-w-md text-[0.9rem] leading-relaxed text-white/60">{body}</p>
            </div>
            <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-jet transition-[transform,background-color] duration-500 group-hover:rotate-[-45deg] group-hover:bg-brand-green">
              →
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
            {stats.map((s, i) => (
              <Stat key={s.label} {...s} delay={delay * 1000 + i * 120} />
            ))}
          </div>
          <span className="sr-only">{link.label}</span>
        </div>
      </Link>
    </Reveal>
  );
}

/** The six DocPharma One products, lighting up one after another. */
function ProductRail({ running }) {
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (!running || reduced()) return undefined;
    const id = window.setInterval(() => setOn((v) => (v + 1) % PLATFORM.length), 1500);
    return () => window.clearInterval(id);
  }, [running]);

  return (
    <ul className="flex flex-col items-stretch gap-1.5">
      {PLATFORM.map((p, i) => (
        <li
          key={p.key}
          className={clsx(
            "whitespace-nowrap rounded-full border px-3 py-1.5 text-center text-[0.72rem] font-bold transition-all duration-500",
            i === on ? "border-brand-green bg-brand-green text-jet shadow-[0_0_24px_-4px_rgba(161,230,102,.7)]" : "border-white/15 bg-jet/60 text-white/70 backdrop-blur"
          )}
        >
          {p.name}
        </li>
      ))}
    </ul>
  );
}

export function PoweredBy() {
  const ref = useRef(null);
  const running = useOnScreen(ref);

  return (
    <section ref={ref} className="relative overflow-hidden bg-jet py-20 text-white lg:flex lg:min-h-[100svh] lg:flex-col lg:pb-12 lg:pt-24">
      {/* Slow light behind the cards */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="pb-glow absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-brand-blue/25 blur-[120px]" />
        <div className="pb-glow pb-glow-2 absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-brand-green/15 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-[84rem] px-5 md:px-10 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <SectionHeader
            tone="dark"
            eyebrow="Powered by"
            title={["Every solution runs on", "the same two engines."]}
            titleClassName="!mt-3 !text-[clamp(1.8rem,2.8vw,2.7rem)]"
          />
          <Reveal from="up" delay={0.2}>
            <p className="max-w-sm text-[1rem] leading-relaxed text-white/60">
              A licensed network on the ground and the software that runs it. However you plug in, every order rides on both.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-10 grid gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-2 lg:gap-6">
          <EngineCard
            index={1}
            delay={0}
            eyebrow="The network"
            live="Riders out now"
            title="Licensed darkstores, our own riders."
            body="Stock sits inside each darkstore's catchment, so our own fleet reaches the door inside 30 minutes, with an OTP at every hand-off."
            stats={[
              { value: 500, suffix: "+", label: "In-house riders" },
              { value: 30, suffix: " min", label: "Hyperlocal SLA" },
              { value: 12, suffix: "+", label: "Cities live" },
            ]}
            link={{ to: "/about", label: "Meet the team behind the network" }}
            visual={
              <>
                <img src={rider} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-b from-jet/40 via-jet/60 to-jet/90" />
                <div className="absolute inset-x-3 bottom-1 top-12 sm:inset-x-6">
                  <CatchmentMap running={running} />
                </div>
              </>
            }
          />

          {/* Where the two engines meet */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-[38%] z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <span className="pb-join relative flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-jet text-[1.4rem] font-extrabold text-brand-green shadow-[0_0_0_8px_rgba(5,36,57,1)]">
              +
            </span>
          </div>

          <EngineCard
            index={2}
            delay={0.12}
            eyebrow="DocPharma One"
            live="Console live"
            title="One platform from shelf to doorstep."
            body="Inventory, orders, scan-verified picking, rider routing and live tracking in one system that plugs into the tools you already use."
            stats={[
              { value: 6, suffix: "", label: "Products, one platform" },
              { value: 40, suffix: "k+", label: "SKUs per store" },
              { value: 93, suffix: "%", label: "Delivery adherence" },
            ]}
            link={{ to: "/technology", label: "See the technology" }}
            visual={
              <>
                <img src={stillVerify} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-b from-jet/30 via-jet/70 to-jet/95" />
                <div className="absolute left-5 right-5 top-16 bottom-0 overflow-hidden sm:right-[10.5rem] [mask-image:linear-gradient(to_bottom,#000_60%,transparent_96%)] [perspective:1200px]">
                  <div className="w-[122%] origin-top-left transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] [transform:rotateX(8deg)_scale(.82)] group-hover:[transform:rotateX(0)_scale(.82)]">
                    <ConsoleMock compact className="w-full" />
                  </div>
                </div>
                <div className="absolute right-5 top-16 hidden w-[8.5rem] sm:block">
                  <ProductRail running={running} />
                </div>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
