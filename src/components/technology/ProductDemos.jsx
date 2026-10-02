/**
 * Small live demos, one per product on the Technology page. Each shows what
 * the product does rather than describing it, and loops while it is on
 * screen. Figures and codes are illustrative.
 */

import { useEffect, useState } from "react";
import clsx from "clsx";

/** Re-runs a cycle every `ms`: returns a counter that ticks up. */
function useCycle(ms) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => setN((v) => v + 1), ms);
    return () => window.clearInterval(id);
  }, [ms]);
  return n;
}

const Frame = ({ children, className }) => (
  <div className={clsx("relative h-[15rem] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4", className)}>
    {children}
  </div>
);

/* DocPharma One: stock by batch, levels filling in. */
function InventoryDemo() {
  const rows = [
    ["Paracetamol 650", "B2407", 82],
    ["Metformin 500", "B2411", 54],
    ["Vitamin D3", "B2402", 91],
    ["Pantoprazole 40", "B2409", 23],
  ];
  return (
    <Frame>
      <div className="flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/45">
        <span>Stock · BLR-07</span>
        <span className="text-brand-green">Live</span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {rows.map(([name, batch, level], i) => (
          <li key={name} className="demo-row" style={{ "--i": i }}>
            <div className="flex items-center justify-between gap-2 text-[0.8rem]">
              <span className="truncate font-semibold text-white/90">{name}</span>
              <span className="shrink-0 rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.68rem] text-white/70">{batch}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={clsx("demo-bar h-full rounded-full", level < 30 ? "bg-[#f59e0b]" : "bg-gradient-to-r from-brand-blue to-brand-green")}
                style={{ "--w": `${level}%`, "--i": i }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="demo-alert mt-3 flex items-center gap-2 text-[0.72rem] font-semibold text-[#fbbf24]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24]" /> Pantoprazole 40 running low
      </p>
    </Frame>
  );
}

/* Picker app: the scan sweeps the pack, then the details land. */
function ScanDemo() {
  const n = useCycle(3600);
  return (
    <Frame className="flex items-center gap-4">
      <div key={n} className="relative h-36 w-28 shrink-0 overflow-hidden rounded-xl bg-white p-2.5">
        <div className="h-2 w-16 rounded bg-brand-blue/70" />
        <div className="mt-1.5 h-1.5 w-12 rounded bg-jet/15" />
        <div className="mt-1 h-1.5 w-14 rounded bg-jet/15" />
        <div className="absolute inset-x-2.5 bottom-2.5 flex h-10 items-end gap-[2px]">
          {Array.from({ length: 22 }, (_, i) => (
            <span key={i} className="bg-jet" style={{ width: i % 3 ? 2 : 1, height: `${70 + ((i * 37) % 30)}%` }} />
          ))}
        </div>
        <span className="demo-scan absolute inset-x-0 h-0.5 bg-[#ef4444] shadow-[0_0_10px_2px_rgba(239,68,68,.6)]" />
      </div>
      <dl key={`f${n}`} className="min-w-0 flex-1 space-y-2 text-[0.8rem]">
        {[
          ["Batch", "B2407"],
          ["MRP", "₹ 32.00"],
          ["Expiry", "08 / 2027"],
        ].map(([k, v], i) => (
          <div key={k} className="demo-field flex items-center justify-between gap-2 rounded-lg bg-white/[0.06] px-2.5 py-1.5" style={{ "--i": i }}>
            <dt className="text-white/50">{k}</dt>
            <dd className="flex items-center gap-1.5 font-semibold text-white">
              {v} <span className="text-[0.65rem] text-brand-green">✓</span>
            </dd>
          </div>
        ))}
        <div className="demo-field flex items-center gap-2 pt-1 text-[0.72rem] font-bold text-brand-green" style={{ "--i": 3 }}>
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" /> Picked & verified
        </div>
      </dl>
    </Frame>
  );
}

/* Rider app: the route is driven, then the OTP is keyed in. */
const RIDE = "M14 120 C 50 120, 60 80, 100 76 S 150 40, 186 30";
function RiderDemo() {
  const n = useCycle(4800);
  const [digits, setDigits] = useState(0);
  useEffect(() => {
    setDigits(0);
    const timers = [1, 2, 3, 4].map((d) => window.setTimeout(() => setDigits(d), 2200 + d * 350));
    return () => timers.forEach(window.clearTimeout);
  }, [n]);
  return (
    <Frame className="flex flex-col">
      <svg viewBox="0 0 200 140" className="h-28 w-full" aria-hidden>
        <path d={RIDE} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="6" strokeLinecap="round" />
        <path key={n} d={RIDE} pathLength="1" fill="none" stroke="#0296d9" strokeWidth="3" strokeLinecap="round" className="demo-ride" />
        <circle cx="14" cy="120" r="5" fill="#fff" />
        <circle cx="186" cy="30" r="7" fill="#8fc124" />
        <circle key={`r${n}`} r="6" fill="#0296d9" stroke="#fff" strokeWidth="2">
          <animateMotion dur="2s" fill="freeze" path={RIDE} />
        </circle>
      </svg>
      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white/45">Handover OTP</span>
        <span className="flex gap-1.5">
          {"4821".split("").map((d, i) => (
            <span
              key={i}
              className={clsx(
                "flex h-8 w-7 items-center justify-center rounded-lg border text-[0.9rem] font-extrabold transition-all duration-300",
                i < digits ? "border-brand-green bg-brand-green/15 text-white" : "border-white/15 text-transparent"
              )}
            >
              {d}
            </span>
          ))}
        </span>
      </div>
      <p className={clsx("mt-2 text-right text-[0.72rem] font-bold transition-opacity duration-300", digits === 4 ? "text-brand-green opacity-100" : "opacity-0")}>
        ✓ Verified
      </p>
    </Frame>
  );
}

/* Logistics engine: each order goes the best way — own fleet or partner. */
function LogisticsDemo() {
  const n = useCycle(2600);
  const own = n % 3 !== 2; // most orders stay on our own fleet
  return (
    <Frame>
      <svg viewBox="0 0 220 150" className="h-full w-full" aria-hidden>
        <path d="M44 75 C 100 75, 110 32, 170 32" fill="none" stroke={own ? "#8fc124" : "rgba(255,255,255,.15)"} strokeWidth="2.5" className="transition-[stroke] duration-500" />
        <path d="M44 75 C 100 75, 110 118, 170 118" fill="none" stroke={!own ? "#0296d9" : "rgba(255,255,255,.15)"} strokeWidth="2.5" className="transition-[stroke] duration-500" />
        <circle cx="34" cy="75" r="16" fill="#0a3452" stroke="rgba(255,255,255,.25)" />
        <text x="34" y="79" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">Hub</text>
        <g key={n}>
          <circle r="5" fill={own ? "#8fc124" : "#0296d9"}>
            <animateMotion dur="1.6s" fill="freeze" path={own ? "M44 75 C 100 75, 110 32, 170 32" : "M44 75 C 100 75, 110 118, 170 118"} />
          </circle>
        </g>
        <rect x="160" y="18" width="56" height="28" rx="8" fill={own ? "rgba(143,193,36,.18)" : "rgba(255,255,255,.05)"} className="transition-[fill] duration-500" />
        <text x="188" y="36" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">Own fleet</text>
        <rect x="160" y="104" width="56" height="28" rx="8" fill={!own ? "rgba(2,150,217,.22)" : "rgba(255,255,255,.05)"} className="transition-[fill] duration-500" />
        <text x="188" y="122" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">Partner</text>
      </svg>
      <p className="absolute bottom-3 left-4 text-[0.72rem] font-semibold text-white/55">
        Order #{2140 + n} → <span className="font-bold text-white">{own ? "own rider, 30-min zone" : "partner courier, out of zone"}</span>
      </p>
    </Frame>
  );
}

/* Partner dashboard: the day's orders build up. */
function DashboardDemo() {
  const n = useCycle(900);
  const bars = [38, 52, 44, 70, 62, 84, 76];
  return (
    <Frame className="flex flex-col">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/45">Orders today</p>
          <p className="tabular mt-1 text-[1.7rem] font-extrabold leading-none text-white">{(1284 + n).toLocaleString("en-IN")}</p>
        </div>
        <span className="rounded-full bg-brand-green/15 px-2 py-0.5 text-[0.7rem] font-bold text-brand-green">On track</span>
      </div>
      <div className="mt-auto flex h-24 items-end gap-2">
        {bars.map((h, i) => (
          <span key={i} className="demo-col flex-1 rounded-t-md bg-gradient-to-t from-brand-blue to-brand-blue/50" style={{ "--h": `${h}%`, "--i": i }} />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[0.62rem] font-semibold text-white/35">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="flex-1 text-center">{d}</span>
        ))}
      </div>
    </Frame>
  );
}

/* Live tracking: the arrival ring counts down. */
function TrackingDemo() {
  const n = useCycle(500);
  const total = 18;
  const left = total - (n % (total + 4));
  const done = left <= 0;
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <Frame className="flex items-center justify-center gap-6">
      <svg viewBox="0 0 110 110" className="h-32 w-32 -rotate-90" aria-hidden>
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="8" />
        <circle
          cx="55"
          cy="55"
          r={r}
          fill="none"
          stroke={done ? "#8fc124" : "#0296d9"}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={done ? 0 : c * (left / total)}
          className="transition-[stroke-dashoffset,stroke] duration-500"
        />
      </svg>
      <div>
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/45">{done ? "Status" : "Arriving in"}</p>
        <p className="tabular mt-1 text-[1.9rem] font-extrabold leading-none text-white">
          {done ? <span className="text-brand-green">Arrived</span> : <>{left} min</>}
        </p>
        <p className="mt-2 text-[0.75rem] text-white/55">Updates as the rider moves</p>
      </div>
    </Frame>
  );
}

export const DEMOS = {
  one: InventoryDemo,
  picker: ScanDemo,
  rider: RiderDemo,
  logistics: LogisticsDemo,
  dashboard: DashboardDemo,
  tracking: TrackingDemo,
};
