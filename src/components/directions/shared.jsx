/**
 * Pieces shared by the three direction prototypes: a live order timer, a
 * reusable console mock, and small helpers. Real-looking UI built in HTML —
 * not illustration — so the product reads as software that exists.
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Logo } from "@/components/ui/Logo";

/** Counts mm:ss upward from a start value and loops at `loopAt` seconds. */
export function useTicker(start = 0, loopAt = 30 * 60, stepMs = 1000, stepBy = 1) {
  const [t, setT] = useState(start);
  useEffect(() => {
    const id = window.setInterval(() => setT((v) => (v + stepBy >= loopAt ? start : v + stepBy)), stepMs);
    return () => window.clearInterval(id);
  }, [start, loopAt, stepMs, stepBy]);
  return t;
}

export function fmt(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Top navigation, themed per direction. */
export function DirNav({ tone = "light", className }) {
  const dark = tone === "dark";
  return (
    <nav className={clsx("relative z-20", className)}>
      <div className="mx-auto flex h-20 max-w-[88rem] items-center justify-between px-5 md:px-10">
        <Link to="/" className={dark ? "text-white" : ""}>
          <Logo tone={dark ? "mono" : "colour"} markClass="h-8 w-8" />
        </Link>
        <div
          className={clsx(
            "hidden items-center gap-1 rounded-full px-2 py-1.5 text-[0.875rem] font-semibold md:flex",
            dark ? "bg-white/10 text-white/80 backdrop-blur-md" : "bg-white text-ink-soft shadow-[0_1px_0_rgba(5,36,57,.06),0_8px_24px_-12px_rgba(5,36,57,.12)]"
          )}
        >
          {["Solutions", "Technology", "About", "Resources"].map((l) => (
            <span key={l} className={clsx("rounded-full px-4 py-1.5", dark ? "hover:bg-white/10" : "hover:bg-peppermint")}>
              {l}
            </span>
          ))}
        </div>
        <Link
          to="/partner"
          className={clsx(
            "rounded-full px-5 py-2.5 text-[0.85rem] font-bold transition",
            dark ? "bg-white text-jet hover:bg-brand-green" : "bg-jet text-white hover:bg-brand-blue"
          )}
        >
          Partner with us
        </Link>
      </div>
    </nav>
  );
}

const ORDERS = [
  { id: "DP-48213", partner: "Tata 1mg", item: "Rx · 3 items", zone: "Koramangala", stage: "Delivered", t: 1487 },
  { id: "DP-48214", partner: "MediBuddy", item: "Rx · 1 item", zone: "HSR Layout", stage: "Out for delivery", t: 1102 },
  { id: "DP-48215", partner: "HealthKart", item: "Wellness · 2", zone: "Indiranagar", stage: "Pharmacist check", t: 486 },
  { id: "DP-48216", partner: "PlatinumRx", item: "Rx · 4 items", zone: "Whitefield", stage: "Picking", t: 214 },
  { id: "DP-48217", partner: "Wellversed", item: "Nutrition · 1", zone: "BTM Layout", stage: "AI validation", t: 38 },
];

const STAGE_STYLE = {
  Delivered: "bg-brand-green/15 text-[#5c7a15]",
  "Out for delivery": "bg-brand-blue/12 text-brand-blue",
  "Pharmacist check": "bg-viking text-brand-blue-deep",
  Picking: "bg-jet/8 text-ink",
  "AI validation": "bg-jet/8 text-ink",
};

/** A DocPharma One console: KPIs, a live order table with SLA timers. */
export function ConsoleMock({ className, compact = false }) {
  const tick = useTicker(0, 3600);
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-2xl border border-jet/10 bg-white text-left shadow-[0_40px_80px_-30px_rgba(5,36,57,.35),0_2px_6px_rgba(5,36,57,.05)]",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-jet/8 bg-floral px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-jet/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-jet/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-jet/15" />
          <span className="ml-3 text-[0.75rem] font-bold text-ink">DocPharma One</span>
          <span className="text-[0.75rem] text-ink-faint">/ Bengaluru · Darkstore BLR-07</span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-brand-green/15 px-2.5 py-1 text-[0.68rem] font-bold text-[#5c7a15]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" /> Live
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 divide-x divide-jet/8 border-b border-jet/8">
        {[
          ["Orders today", (1284 + Math.floor(tick / 7)).toLocaleString("en-IN")],
          ["Avg. delivery", "24m 12s"],
          ["SLA adherence", "93.4%"],
        ].map(([k, v]) => (
          <div key={k} className="px-4 py-3.5">
            <p className="text-[0.66rem] font-semibold uppercase tracking-wider text-ink-faint">{k}</p>
            <p className="tabular mt-1 text-[1.2rem] font-extrabold text-ink">{v}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="px-2 py-2">
        <div className="grid grid-cols-[1.1fr_1fr_1.2fr_0.7fr] px-3 py-2 text-[0.64rem] font-bold uppercase tracking-wider text-ink-faint">
          <span>Order</span>
          <span className="hidden sm:block">Partner</span>
          <span>Stage</span>
          <span className="text-right">Elapsed</span>
        </div>
        {(compact ? ORDERS.slice(0, 4) : ORDERS).map((o) => {
          const elapsed = o.stage === "Delivered" ? o.t : o.t + tick;
          return (
            <div
              key={o.id}
              className="grid grid-cols-[1.1fr_1fr_1.2fr_0.7fr] items-center rounded-lg px-3 py-2.5 text-[0.78rem] odd:bg-floral"
            >
              <span>
                <span className="block font-bold text-ink">{o.id}</span>
                <span className="block text-[0.68rem] text-ink-faint">{o.zone}</span>
              </span>
              <span className="hidden text-ink-soft sm:block">{o.partner}</span>
              <span>
                <span className={clsx("rounded-full px-2 py-1 text-[0.66rem] font-bold", STAGE_STYLE[o.stage])}>{o.stage}</span>
              </span>
              <span className={clsx("tabular text-right font-bold", elapsed > 1800 ? "text-[#c2410c]" : "text-ink")}>
                {fmt(Math.min(elapsed, 3599))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Direction switcher pinned to the bottom of each prototype. */
export function DirectionSwitcher({ current }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-jet p-1.5 text-[0.8rem] font-bold text-white shadow-2xl">
      {[4, 5].map((n) => (
        <Link
          key={n}
          to={`/directions/${n}`}
          className={clsx("rounded-full px-4 py-2", n === current ? "bg-brand-green text-jet" : "hover:bg-white/10")}
        >
          {n === 4 ? "Version 4" : "Version 5 · Scroll"}
        </Link>
      ))}
    </div>
  );
}
