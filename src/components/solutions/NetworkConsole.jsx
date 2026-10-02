/**
 * DocPharma One's network view: every city at a glance. Its own screen, not
 * the order table from the Technology page, so the two never repeat. Cities
 * report orders in the last hour, riders out and the average delivery time,
 * each with a small trend; the figures move the way a live board does.
 * Illustrative data.
 */

import { useEffect, useState } from "react";
import clsx from "clsx";

const START = [
  { city: "Bengaluru", stores: 11, orders: 214, riders: 68, avg: 22 * 60 + 41, trend: [8, 11, 10, 13, 12, 15, 14, 17] },
  { city: "Delhi NCR", stores: 9, orders: 187, riders: 61, avg: 24 * 60 + 8, trend: [10, 9, 12, 11, 13, 12, 15, 14] },
  { city: "Mumbai", stores: 8, orders: 163, riders: 52, avg: 23 * 60 + 17, trend: [7, 9, 8, 10, 12, 11, 12, 14] },
  { city: "Hyderabad", stores: 6, orders: 121, riders: 39, avg: 21 * 60 + 52, trend: [6, 7, 9, 8, 9, 11, 10, 12] },
  { city: "Pune", stores: 5, orders: 96, riders: 31, avg: 25 * 60 + 3, trend: [5, 6, 6, 8, 7, 9, 10, 9] },
];

const mmss = (s) => `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;

function Spark({ points, tone }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((p, i) => `${i ? "L" : "M"}${(i / (points.length - 1)) * 56} ${18 - ((p - min) / (max - min || 1)) * 14}`)
    .join(" ");
  return (
    <svg viewBox="0 0 56 20" className="h-5 w-14" aria-hidden>
      <path d={d} fill="none" stroke={tone} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="56" cy={18 - ((points[points.length - 1] - min) / (max - min || 1)) * 14} r="2.2" fill={tone} />
    </svg>
  );
}

export function NetworkConsole({ running }) {
  const [rows, setRows] = useState(START);
  const [flash, setFlash] = useState(null);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (!running || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => setBeat((b) => b + 1), 1700);
    return () => window.clearInterval(id);
  }, [running]);

  // Each beat one city moves: an order or two lands, a rider heads out or
  // comes back, the average drifts a few seconds, and its trend steps on.
  useEffect(() => {
    if (!beat) return;
    const i = (beat * 3) % START.length;
    setFlash(i);
    setRows((rs) =>
      rs.map((r, k) => {
        if (k !== i) return r;
        const step = 1 + (beat % 3);
        const avg = Math.max(20 * 60 + 30, Math.min(26 * 60, r.avg + ((beat % 5) - 2) * 6));
        const next = Math.max(4, r.trend[r.trend.length - 1] + ((beat % 4) - 1));
        return {
          ...r,
          orders: r.orders + step,
          riders: Math.max(20, r.riders + (beat % 2 ? 1 : -1)),
          avg,
          trend: [...r.trend.slice(1), next],
        };
      })
    );
  }, [beat]);

  const totals = rows.reduce((t, r) => ({ riders: t.riders + r.riders, orders: t.orders + r.orders }), { riders: 0, orders: 0 });
  const onTime = (93 + ((beat % 7) - 3) * 0.1).toFixed(1);

  return (
    <div className="overflow-hidden rounded-2xl border border-jet/10 bg-white text-left text-jet shadow-[0_40px_80px_-30px_rgba(0,0,0,.45)]">
      {/* Title bar */}
      <div className="flex items-center justify-between gap-3 border-b border-jet/8 bg-floral px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-jet/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-jet/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-jet/15" />
          </span>
          <span className="ml-2 whitespace-nowrap text-[0.75rem] font-bold">DocPharma One</span>
          <span className="truncate text-[0.75rem] text-ink-faint">/ Network · All cities</span>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-green/15 px-2.5 py-1 text-[0.72rem] font-bold text-[#5c7a15]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" /> Live
        </span>
      </div>

      {/* Network totals */}
      <div className="grid grid-cols-3 divide-x divide-jet/8 border-b border-jet/8">
        {[
          ["Orders this hour", totals.orders.toLocaleString("en-IN")],
          ["Riders on shift", String(totals.riders)],
          ["On time, today", `${onTime}%`],
        ].map(([label, v]) => (
          <div key={label} className="min-w-0 px-4 py-3">
            <p className="truncate text-[0.7rem] font-semibold uppercase tracking-wider text-ink-faint">{label}</p>
            <p className="tabular mt-1 text-[1.15rem] font-extrabold">
              <span key={v} className="count-tick inline-block">
                {v}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Cities */}
      <div className="px-2 py-2">
        <div className="grid grid-cols-[1.2fr_0.8fr_0.7fr_0.9fr_3.5rem] gap-x-2 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-ink-faint">
          <span>City</span>
          <span className="text-right">Orders/hr</span>
          <span className="text-right">Riders</span>
          <span className="text-right">Avg time</span>
          <span className="text-right">Trend</span>
        </div>
        {rows.map((r, k) => (
          <div
            key={r.city}
            className={clsx(
              "grid grid-cols-[1.2fr_0.8fr_0.7fr_0.9fr_3.5rem] items-center gap-x-2 rounded-lg px-3 py-2 text-[0.8rem] transition-colors duration-700 odd:bg-floral",
              flash === k && "!bg-viking/80"
            )}
          >
            <span className="min-w-0">
              <span className="block truncate font-bold">{r.city}</span>
              <span className="block text-[0.7rem] text-ink-faint">{r.stores} darkstores</span>
            </span>
            <span className="tabular text-right font-bold">
              <span key={r.orders} className="count-tick inline-block">
                {r.orders}
              </span>
            </span>
            <span className="tabular text-right text-ink-soft">{r.riders}</span>
            <span className={clsx("tabular text-right font-semibold", r.avg > 25 * 60 ? "text-[#c2410c]" : "text-jet")}>{mmss(r.avg)}</span>
            <span className="flex justify-end">
              <Spark points={r.trend} tone={k % 2 ? "#0296d9" : "#8fc124"} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
