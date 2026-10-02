/**
 * A live order timer and the DocPharma One console mock. Real-looking UI built in HTML —
 * not illustration — so the product reads as software that exists.
 */

import { useEffect, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";

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

const STAGES = ["AI validation", "Picking", "Pharmacist check", "Out for delivery", "Delivered"];

const STAGE_STYLE = {
  Delivered: "bg-brand-green/15 text-[#5c7a15]",
  "Out for delivery": "bg-brand-blue/12 text-brand-blue",
  "Pharmacist check": "bg-viking text-brand-blue-deep",
  Picking: "bg-jet/8 text-ink",
  "AI validation": "bg-jet/8 text-ink",
};

/** Partners and areas new orders are drawn from, in turn. */
const PARTNERS = ["Tata 1mg", "MediBuddy", "HealthKart", "PlatinumRx", "Wellversed"];
const ZONES = ["Koramangala", "HSR Layout", "Indiranagar", "Whitefield", "BTM Layout", "Jayanagar", "Bellandur"];

const START = [
  { num: 48213, stage: 4, t: 1487 },
  { num: 48214, stage: 3, t: 1102 },
  { num: 48215, stage: 2, t: 486 },
  { num: 48216, stage: 1, t: 214 },
  { num: 48217, stage: 0, t: 38 },
].map((o, i) => ({ ...o, partner: PARTNERS[i], zone: ZONES[i] }));

/**
 * A DocPharma One console that behaves like one: orders move through their
 * stages, a delivered order leaves the table and a new one arrives, and the
 * figures at the top move with them. Illustrative data.
 */
export function ConsoleMock({ className, compact = false }) {
  const [rows, setRows] = useState(START);
  const [kpi, setKpi] = useState({ orders: 1284, avg: 24 * 60 + 12, sla: 93.4 });
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    // The clocks on open orders.
    const clock = window.setInterval(() => setRows((rs) => rs.map((r) => (r.stage === 4 ? r : { ...r, t: r.t + 1 }))), 1000);
    // Every couple of seconds, something happens on the floor.
    let next = 48218;
    let beat = 0;
    const work = window.setInterval(() => {
      beat++;
      setRows((rs) => {
        const done = rs.find((r) => r.stage === 4);
        if (done && beat % 2 === 0) {
          // A delivered order leaves; a new one comes in.
          const i = next % PARTNERS.length;
          const fresh = { num: next, stage: 0, t: 0, partner: PARTNERS[i], zone: ZONES[(next * 3) % ZONES.length] };
          next++;
          setFlash(fresh.num);
          setKpi((k) => ({
            orders: k.orders + 1,
            avg: Math.max(23 * 60, Math.min(25 * 60, k.avg + ((next % 5) - 2) * 7)),
            sla: Math.round(Math.max(92.8, Math.min(94.2, k.sla + ((next % 3) - 1) * 0.1)) * 10) / 10,
          }));
          return [...rs.filter((r) => r !== done), fresh];
        }
        // Otherwise the furthest-along open order moves to its next stage.
        const pick = rs.filter((r) => r.stage < 4).sort((x, y) => y.stage - x.stage)[0];
        if (!pick) return rs;
        setFlash(pick.num);
        return rs.map((r) => (r === pick ? { ...r, stage: r.stage + 1 } : r));
      });
    }, 2200);
    return () => {
      window.clearInterval(clock);
      window.clearInterval(work);
    };
  }, []);

  const shown = compact ? rows.slice(0, 4) : rows;
  const avgLabel = `${Math.floor(kpi.avg / 60)}m ${String(kpi.avg % 60).padStart(2, "0")}s`;

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-2xl border border-jet/10 bg-white text-left shadow-[0_40px_80px_-30px_rgba(5,36,57,.35),0_2px_6px_rgba(5,36,57,.05)]",
        className
      )}
    >
      {/* Title bar — the location and window dots drop away on phones. */}
      <div className="flex items-center justify-between gap-3 border-b border-jet/8 bg-floral px-3.5 py-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="hidden gap-1.5 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-jet/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-jet/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-jet/15" />
          </span>
          <span className="whitespace-nowrap text-[0.75rem] font-bold text-ink sm:ml-3">DocPharma One</span>
          <span className="hidden truncate text-[0.75rem] text-ink-faint md:inline">/ Bengaluru · Darkstore BLR-07</span>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-green/15 px-2.5 py-1 text-[0.72rem] font-bold text-[#5c7a15]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" /> Live
        </span>
      </div>

      {/* KPIs — each value rolls into its new figure. */}
      <div className="grid grid-cols-3 divide-x divide-jet/8 border-b border-jet/8">
        {[
          ["Orders", "Orders today", kpi.orders.toLocaleString("en-IN")],
          ["Avg. time", "Avg. delivery", avgLabel],
          ["SLA", "SLA adherence", `${kpi.sla.toFixed(1)}%`],
        ].map(([short, long, v]) => (
          <div key={long} className="min-w-0 overflow-hidden px-3 py-3 sm:px-4 sm:py-3.5">
            <p className="truncate text-[0.7rem] font-semibold uppercase tracking-wider text-ink-faint sm:text-[0.72rem]">
              <span className="sm:hidden">{short}</span>
              <span className="hidden sm:inline">{long}</span>
            </p>
            <p className="tabular mt-1 whitespace-nowrap text-[1rem] font-extrabold text-ink sm:text-[1.2rem]">
              <span key={v} className="count-tick inline-block">
                {v}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Table — three columns on phones, four from sm up. */}
      <div className="px-1.5 py-2 sm:px-2">
        <div className="grid grid-cols-[1fr_auto_3.2rem] gap-x-3 px-3 py-2 text-[0.7rem] font-bold uppercase tracking-wider text-ink-faint sm:grid-cols-[1.1fr_1fr_1.2fr_0.7fr] sm:gap-x-2 sm:text-[0.72rem]">
          <span>Order</span>
          <span className="hidden sm:block">Partner</span>
          <span>Stage</span>
          <span className="text-right">Time</span>
        </div>
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((o) => {
            const stage = STAGES[o.stage];
            return (
              <motion.div
                key={o.num}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18, transition: { duration: 0.25 } }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={clsx(
                  "grid grid-cols-[1fr_auto_3.2rem] items-center gap-x-3 rounded-lg px-3 py-2.5 text-[0.76rem] transition-colors duration-700 odd:bg-floral sm:grid-cols-[1.1fr_1fr_1.2fr_0.7fr] sm:gap-x-2 sm:text-[0.78rem]",
                  flash === o.num && "!bg-viking/80"
                )}
              >
                <span className="min-w-0">
                  <span className="block font-bold text-ink">DP-{o.num}</span>
                  <span className="block truncate text-[0.72rem] text-ink-faint">{o.zone}</span>
                </span>
                <span className="hidden truncate text-ink-soft sm:block">{o.partner}</span>
                <span>
                  <span key={stage} className={clsx("tick-pop whitespace-nowrap rounded-full px-2 py-1 text-[0.72rem] font-bold", STAGE_STYLE[stage])}>
                    {stage}
                  </span>
                </span>
                <span className={clsx("tabular text-right font-bold", o.t > 1800 ? "text-[#c2410c]" : "text-ink")}>{fmt(Math.min(o.t, 3599))}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
