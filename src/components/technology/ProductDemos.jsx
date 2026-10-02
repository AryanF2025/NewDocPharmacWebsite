/**
 * Small live demos, one per product on the Technology page. Each shows what
 * the product does rather than describing it, and loops while it is on
 * screen. Figures and codes are illustrative.
 */

import { createContext, useContext, useEffect, useState } from "react";
import clsx from "clsx";

/** True while the visitor points at a demo: it then runs at double speed. */
const Fast = createContext(false);
const useSpeed = (ms) => (useContext(Fast) ? Math.round(ms / 2) : ms);

/** Re-runs a cycle every `ms` (halved on hover): returns a counter. */
function useCycle(ms) {
  const step = useSpeed(ms);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => setN((v) => v + 1), step);
    return () => window.clearInterval(id);
  }, [step]);
  return n;
}

/** A demo's frame. Pointing at it speeds the demo up and lights the frame. */
function Frame({ children, className }) {
  const [fast, setFast] = useState(false);
  return (
    <Fast.Provider value={fast}>
      <div
        onPointerEnter={(e) => e.pointerType === "mouse" && setFast(true)}
        onPointerLeave={() => setFast(false)}
        className={clsx(
          "demo-frame relative h-[15rem] overflow-hidden rounded-2xl border bg-white/[0.04] p-4 transition-[border-color,background-color,box-shadow] duration-500",
          fast ? "border-brand-green/40 bg-white/[0.07] shadow-[0_0_0_4px_rgba(143,193,36,.08)]" : "border-white/10",
          className
        )}
      >
        {children}
        <span
          className={clsx(
            "pointer-events-none absolute right-3 top-3 rounded-full bg-brand-green/15 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-brand-green transition-opacity duration-300",
            fast ? "opacity-100" : "opacity-0"
          )}
        >
          2× speed
        </span>
      </div>
    </Fast.Provider>
  );
}

/* DocPharma One: stock drains smoothly as orders are picked; a low item is
   restocked and fills back up. */
const STOCK = [
  ["Paracetamol 650", "B2407", 82],
  ["Metformin 500", "B2411", 54],
  ["Vitamin D3", "B2402", 91],
  ["Pantoprazole 40", "B2409", 36],
];
function InventoryDemo() {
  const step = useSpeed(1500);
  const [levels, setLevels] = useState(() => STOCK.map(([, , l]) => l));
  const [picked, setPicked] = useState(-1);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let tick = 0;
    const id = window.setInterval(() => {
      tick++;
      const i = (tick * 3) % STOCK.length;
      setPicked(i);
      setLevels((ls) =>
        ls.map((l, j) => {
          if (l < 18) return 92; // restocked
          return j === i ? l - (6 + ((tick * 7) % 9)) : l;
        })
      );
    }, step);
    return () => window.clearInterval(id);
  }, [step]);
  const low = levels.findIndex((l) => l < 30);
  return (
    <Frame>
      <div className="flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/45">
        <span>Stock · BLR-07</span>
        <span className="flex items-center gap-1.5 text-brand-green">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" /> Live
        </span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {STOCK.map(([name, batch], i) => (
          <li key={name} className="demo-row" style={{ "--i": i }}>
            <div className="flex items-center justify-between gap-2 text-[0.8rem]">
              <span className={clsx("truncate font-semibold transition-colors duration-500", picked === i ? "text-white" : "text-white/80")}>{name}</span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="tabular w-8 text-right text-[0.7rem] font-bold text-white/55">{levels[i]}%</span>
                <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.68rem] text-white/70">{batch}</span>
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={clsx(
                  "h-full rounded-full transition-[width,background-color] duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]",
                  levels[i] < 30 ? "bg-[#f59e0b]" : "bg-gradient-to-r from-brand-blue to-brand-green"
                )}
                style={{ width: `${levels[i]}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p
        className={clsx(
          "mt-3 flex items-center gap-2 text-[0.72rem] font-semibold text-[#fbbf24] transition-[opacity,transform] duration-500",
          low >= 0 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        )}
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#fbbf24]" />
        {low >= 0 ? `${STOCK[low][0]} running low · restock raised` : "All stock healthy"}
      </p>
    </Frame>
  );
}

/* Picker app: each scan sweeps the pack and re-verifies its details. */
function ScanDemo() {
  const n = useCycle(2600);
  const units = ["B2407", "B2411", "B2402"];
  const batch = units[n % units.length];
  return (
    <Frame className="flex items-center gap-4">
      <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-xl bg-white p-2.5">
        <div className="h-2 w-16 rounded bg-brand-blue/70" />
        <div className="mt-1.5 h-1.5 w-12 rounded bg-jet/15" />
        <div className="mt-1 h-1.5 w-14 rounded bg-jet/15" />
        <div className="absolute inset-x-2.5 bottom-2.5 flex h-10 items-end gap-[2px]">
          {Array.from({ length: 22 }, (_, i) => (
            <span key={i} className="bg-jet" style={{ width: i % 3 ? 2 : 1, height: `${70 + ((i * 37) % 30)}%` }} />
          ))}
        </div>
        <span key={n} className="demo-scan absolute inset-x-0 h-0.5 bg-[#ef4444] shadow-[0_0_10px_2px_rgba(239,68,68,.6)]" />
      </div>
      <dl className="min-w-0 flex-1 space-y-2 text-[0.8rem]">
        {[
          ["Batch", batch],
          ["MRP", "₹ 32.00"],
          ["Expiry", "08 / 2027"],
        ].map(([k, v], i) => (
          <div key={k} className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.06] px-2.5 py-1.5">
            <dt className="text-white/50">{k}</dt>
            <dd className="flex items-center gap-1.5 font-semibold text-white">
              <span key={`${n}-${k}`} className="blank-fill">{v}</span>
              <span key={`t${n}-${k}`} className="tick-pop text-[0.65rem] text-brand-green" style={{ animationDelay: `${0.5 + i * 0.12}s` }}>✓</span>
            </dd>
          </div>
        ))}
        <div className="flex items-center justify-between pt-1 text-[0.72rem] font-bold">
          <span className="flex items-center gap-2 text-brand-green">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" /> Picked & verified
          </span>
          <span className="tabular text-white/55">{12 + n} units</span>
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

/* Logistics engine: stock comes in from distributors to the darkstore, and
   each order leaves it for the customer — by our own rider inside the 30-minute
   zone, or a partner courier beyond it. Counts move at a believable pace. */
const INBOUND = "M38 70 H 94";
const OWN = "M146 70 C 170 70, 176 36, 200 36";
const COURIER = "M146 70 C 170 70, 176 104, 200 104";
function LogisticsDemo() {
  const step = useSpeed(2200);
  const [delivered, setDelivered] = useState({ own: 128, courier: 34, inbound: 412 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let k = 0;
    const id = window.setInterval(() => {
      k++;
      setDelivered((d) => ({
        own: d.own + (k % 4 === 0 ? 0 : 1),
        courier: d.courier + (k % 4 === 0 ? 1 : 0),
        inbound: d.inbound + (k % 3 === 0 ? 6 : 0),
      }));
    }, step);
    return () => window.clearInterval(id);
  }, [step]);
  const dur = `${(step / 1000) * 1.1}s`;
  return (
    <Frame>
      <svg viewBox="0 0 240 140" className="h-[10.5rem] w-full" aria-hidden>
        {/* routes */}
        <path d={INBOUND} fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="2.5" strokeDasharray="4 6" className="flow-dash" />
        <path d={OWN} fill="none" stroke="#8fc124" strokeWidth="2.5" strokeDasharray="4 6" className="flow-dash" />
        <path d={COURIER} fill="none" stroke="#0296d9" strokeWidth="2.5" strokeDasharray="4 6" className="flow-dash" />
        {/* stock coming in */}
        <rect r="2" width="9" height="7" rx="1.5" fill="#fff" opacity=".85">
          <animateMotion dur={dur} repeatCount="indefinite" path={INBOUND} />
        </rect>
        {/* orders going out */}
        {[0, 0.36].map((b) => (
          // Hidden until its run begins, so it never waits at the corner.
          <circle key={b} r="4" fill="#8fc124" opacity="0">
            <set attributeName="opacity" to="1" begin={`${b * parseFloat(dur)}s`} />
            <animateMotion dur={dur} begin={`${b * parseFloat(dur)}s`} repeatCount="indefinite" path={OWN} />
          </circle>
        ))}
        <circle r="4" fill="#0296d9" opacity="0">
          <set attributeName="opacity" to="1" begin={`${0.7 * parseFloat(dur)}s`} />
          <animateMotion dur={dur} begin={`${0.7 * parseFloat(dur)}s`} repeatCount="indefinite" path={COURIER} />
        </circle>

        {/* nodes */}
        <rect x="2" y="52" width="38" height="36" rx="9" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.2)" />
        <path d="M15 67 l6 -3 l6 3 v7 l-6 3 l-6 -3 z M15 67 l6 3 l6 -3 M21 70 v7" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="94" y="46" width="52" height="48" rx="11" fill="#0a3452" stroke="#8fc124" strokeOpacity=".6" />
        <circle cx="120" cy="70" r="30" fill="none" stroke="#8fc124" strokeOpacity=".4" className="hub-ping" />
        <text x="120" y="68" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff">Darkstore</text>
        <text x="120" y="80" textAnchor="middle" fontSize="7" fontWeight="700" fill="rgba(255,255,255,.55)">in stock</text>
        <rect x="200" y="20" width="38" height="32" rx="9" fill="rgba(143,193,36,.18)" />
        <path d="M213 36 l6 -5 l6 5 v6 h-12 z M217 42 v-3 h4 v3" fill="none" stroke="#8fc124" strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="200" y="88" width="38" height="32" rx="9" fill="rgba(2,150,217,.2)" />
        <path d="M213 104 l6 -5 l6 5 v6 h-12 z M217 110 v-3 h4 v3" fill="none" stroke="#62b8de" strokeWidth="1.4" strokeLinejoin="round" />

        {/* labels */}
        <text x="21" y="102" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,.55)">Distributor</text>
        <text x="219" y="15" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#8fc124">Own rider · 30 min</text>
        <text x="219" y="132" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#62b8de">Courier · beyond</text>
      </svg>
      <div className="absolute inset-x-4 bottom-3 grid grid-cols-3 gap-2 text-center">
        {[
          ["Units in", delivered.inbound, "text-white"],
          ["Own fleet", delivered.own, "text-brand-green"],
          ["Courier", delivered.courier, "text-[#62b8de]"],
        ].map(([label, v, tone]) => (
          <div key={label} className="rounded-lg bg-white/[0.05] py-1">
            <p className={clsx("tabular text-[0.9rem] font-extrabold leading-tight", tone)}>
              <span key={v} className="count-tick inline-block">{v}</span>
            </p>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-white/45">{label}</p>
          </div>
        ))}
      </div>
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
