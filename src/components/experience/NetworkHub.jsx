import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { LogoMark } from "@/components/ui/Logo";
import { useInViewOnce } from "@/components/motion/useInViewOnce";

const SIZE = 520;
const C = SIZE / 2;
const R = 190;

const ICONS = {
  inventory: "M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8",
  orders: "M6 4h12v16H6zM9 9h6M9 13h6M9 17h3",
  pick: "M4 6v12M7 6v12M10 6v12M13.5 6v12M16 6v12M20 6v12",
  route: "M6 18a2 2 0 1 0 0-.01M18 6a2 2 0 1 0 0-.01M8 18h5a3 3 0 0 0 0-6h-2a3 3 0 0 1 0-6h5",
  control: "M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 12l6-6",
};

const SHORT = ["Inventory", "Orders", "Pick & pack", "Last mile", "Control"];
const ICON_KEYS = ["inventory", "orders", "pick", "route", "control"];

/**
 * DocPharma One as the thing it is: one core, five systems. Data pulses run
 * from the core out to every module continuously; the module being read
 * about gets the bright, fast line. Auto-advances until the visitor picks one.
 */
export function NetworkHub({ modules }) {
  const ref = useRef(null);
  const inView = useInViewOnce(ref);
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!inView || held) return undefined;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % modules.length), 3200);
    return () => window.clearTimeout(id);
  }, [active, held, inView, modules.length]);

  const nodes = modules.map((m, i) => {
    const a = ((-90 + i * (360 / modules.length)) * Math.PI) / 180;
    return { ...m, x: C + R * Math.cos(a), y: C + R * Math.sin(a), short: SHORT[i], icon: ICONS[ICON_KEYS[i]] };
  });

  return (
    <div ref={ref} className={clsx("hub grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14", inView && "is-in")}>
      {/* The five systems, as a list you can read */}
      <ol className="order-2 lg:order-1" onMouseLeave={() => setHeld(false)}>
        {nodes.map((m, i) => (
          <li key={m.n} className="hub-item border-t border-white/10 last:border-b" style={{ "--i": i }}>
            <button
              type="button"
              onMouseEnter={() => {
                setHeld(true);
                setActive(i);
              }}
              onFocus={() => {
                setHeld(true);
                setActive(i);
              }}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className="group grid w-full grid-cols-[2.5rem_1fr] gap-x-3 py-4 text-left"
            >
              <span
                className={clsx(
                  "tabular pt-1 text-[0.75rem] font-extrabold transition-colors duration-500",
                  i === active ? "text-brand-green" : "text-white/35"
                )}
              >
                {m.n}
              </span>
              <span>
                <span
                  className={clsx(
                    "block text-[1.1rem] font-extrabold tracking-tight transition-colors duration-500",
                    i === active ? "text-white" : "text-white/45 group-hover:text-white/80"
                  )}
                >
                  {m.title}
                </span>
                <span
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ gridTemplateRows: i === active ? "1fr" : "0fr" }}
                >
                  <span className="overflow-hidden">
                    <span className="block pt-2 text-[0.95rem] leading-relaxed text-white/65">{m.body}</span>
                  </span>
                </span>
                {/* How long until the next module takes over */}
                <span className="mt-3 block h-px overflow-hidden bg-white/10">
                  {i === active ? (
                    <span
                      key={`${active}-${held}`}
                      className={clsx("block h-full origin-left bg-brand-green", held ? "scale-x-100" : "how-fill")}
                      style={held ? undefined : { animationDuration: "3200ms" }}
                    />
                  ) : null}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      {/* The system */}
      <div className="relative order-1 mx-auto w-full max-w-[34rem] lg:order-2">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-auto w-full overflow-visible" aria-hidden>
          <defs>
            <radialGradient id="hub-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0296d9" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0296d9" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Orbit */}
          <circle cx={C} cy={C} r={R} className="hub-orbit" pathLength="1" />
          <circle cx={C} cy={C} r={R + 34} className="hub-orbit-outer" />

          {/* Spokes, with data travelling out along each */}
          {nodes.map((n, i) => (
            <g key={n.n}>
              <line x1={C} y1={C} x2={n.x} y2={n.y} pathLength="1" className="hub-spoke" style={{ "--i": i }} />
              <line
                x1={C}
                y1={C}
                x2={n.x}
                y2={n.y}
                pathLength="1"
                className={clsx("hub-pulse", i === active && "is-active")}
                style={{ animationDelay: `${i * 0.37}s` }}
              />
            </g>
          ))}

          {/* Core */}
          <circle cx={C} cy={C} r="120" fill="url(#hub-core)" className="hub-glow" />
          <circle cx={C} cy={C} r="62" className="hub-core-ring" />
          <circle cx={C} cy={C} r="54" fill="#ffffff" className="hub-core" />

          {/* Modules */}
          {nodes.map((n, i) => (
            <g
              key={n.n}
              className={clsx("hub-node", i === active && "is-active")}
              style={{ "--i": i, transformOrigin: `${n.x}px ${n.y}px` }}
              onMouseEnter={() => {
                setHeld(true);
                setActive(i);
              }}
              onMouseLeave={() => setHeld(false)}
            >
              <circle cx={n.x} cy={n.y} r="46" className="hub-node-halo" />
              <circle cx={n.x} cy={n.y} r="34" className="hub-node-disc" />
              <path
                d={n.icon}
                transform={`translate(${n.x - 12} ${n.y - 12})`}
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hub-node-icon"
              />
              <text x={n.x} y={n.y + (n.y > C ? 62 : -50)} textAnchor="middle" className="hub-node-label">
                {n.short}
              </text>
            </g>
          ))}
        </svg>
        {/* The mark sits in HTML over the core so it stays the exact brand drawing. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <LogoMark className="hub-mark h-[11%] w-[11%]" />
        </div>
      </div>
    </div>
  );
}
