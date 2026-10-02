/**
 * Technology page sections that describe the platform as it is built:
 * the products, delivery, connections and automation, and the control room.
 */

import { useEffect, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { LogoImg } from "@/components/ui/LogoImg";
import { SectionHeader } from "@/components/motion/Text";
import { PLATFORM, AUTOMATION, CONNECT, CONTROL } from "@/data/technology";
import { INTEGRATION_LOGOS } from "@/data/logos";

const EASE = [0.22, 1, 0.36, 1];

/* ----------------------------------------------------------------- icons --- */

const ICON = {
  one: "M4 5h16v14H4zM4 9h16M9 9v10",
  picker: "M4 7V5h3M17 5h3v2M20 17v2h-3M7 19H4v-2M8 9v6M11 9v6M14 9v6M17 9v6",
  rider: "M6 17a2 2 0 1 0 0-.01M18 17a2 2 0 1 0 0-.01M8 17h6l3-6h-4l-2-3H8M14 11l-3 6",
  logistics: "M12 3v4M12 17v4M3 12h4M17 12h4M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2",
  dashboard: "M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z",
  tracking: "M12 21s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
  cash: "M3 7h18v10H3zM12 12m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M6 10v4M18 10v4",
  roster: "M5 5h14v15H5zM5 9h14M9 3v4M15 3v4M8 13h3M8 16h6",
  zones: "M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14",
  catalogue: "M4 6h7v5H4zM13 6h7v5h-7zM4 13h7v5H4zM15.5 15.5h2M16.5 14.5v2",
  approvals: "M9 12l2 2 4-4M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z",
  roles: "M9 8a3 3 0 1 0 0-.01M3 19c.5-3 3-5 6-5s5.5 2 6 5M17 8h4M19 6v4",
};

function Icon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={ICON[name]} />
    </svg>
  );
}

const CONTROL_ICONS = ["cash", "roster", "zones", "catalogue", "approvals", "roles"];

/* ------------------------------------------------------- platform explorer --- */

/**
 * The six products as a list you can explore: pointing at (or tabbing to) one
 * opens its panel — who uses it, what it does — with a pill sliding to it.
 * Nothing changes on its own.
 */
export function PlatformExplorer() {
  const [active, setActive] = useState(0);
  const item = PLATFORM[active];

  return (
    <section className="bg-floral py-24 md:py-32">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader
          eyebrow="The platform"
          title="Six products. One system underneath."
          sub="Everything an order touches, from the store's shelf to the customer's door, runs on DocPharma's own software."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
          {/* The list */}
          <ul role="tablist" aria-label="DocPharma products" className="grid gap-1.5 self-start">
            {PLATFORM.map((p, i) => {
              const on = i === active;
              return (
                <li key={p.key} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="platform-panel"
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group relative flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    {on ? (
                      <motion.span
                        layoutId="platform-pill"
                        aria-hidden
                        className="absolute inset-0 rounded-2xl bg-white shadow-[0_18px_40px_-26px_rgba(5,36,57,.45)]"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    ) : null}
                    <span
                      className={clsx(
                        "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                        on ? "bg-brand-blue text-white" : "bg-white text-ink-soft group-hover:text-brand-blue"
                      )}
                    >
                      <Icon name={p.key} />
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span className={clsx("block text-[1.05rem] font-extrabold tracking-tight transition-colors", on ? "text-jet" : "text-ink-soft group-hover:text-jet")}>
                        {p.name}
                      </span>
                      <span className="block text-[0.85rem] text-ink-faint">{p.kind}</span>
                    </span>
                    <span
                      aria-hidden
                      className={clsx(
                        "relative text-brand-blue transition-all duration-300",
                        on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                      )}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* The panel */}
          <div id="platform-panel" role="tabpanel" className="relative min-h-[26rem] overflow-hidden rounded-[2rem] bg-jet p-7 text-white md:p-10">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-blue/25 blur-[90px]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-green/15 blur-[90px]" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="relative"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="label text-brand-green">{item.kind}</span>
                  <span className="tabular text-[0.8rem] font-extrabold text-white/40">
                    {String(active + 1).padStart(2, "0")} / {String(PLATFORM.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.035em]">{item.name}</h3>
                <p className="mt-3 max-w-lg text-[1.08rem] leading-relaxed text-white/75">{item.line}</p>
                <p className="mt-2 text-[0.88rem] text-white/45">Used by: {item.who}</p>

                <ul className="mt-8 grid gap-3">
                  {item.points.map((point, i) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.06 }}
                      className="flex items-start gap-3 text-[0.98rem] text-white/85"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/20 text-[0.6rem] text-brand-green">✓</span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- delivery --- */

/** A route drawn across a small map; the rider follows it on a loop. */
const ROUTE = "M40 250 C 80 250, 90 190, 140 185 S 200 120, 230 110 S 270 60, 290 52";

function TrackingPhone() {
  // Arrival time counts down with the rider, then the loop starts over.
  const [eta, setEta] = useState(18);
  useEffect(() => {
    const id = window.setInterval(() => setEta((m) => (m <= 1 ? 18 : m - 1)), 400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[20rem]">
      <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-green/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2.4rem] border-[6px] border-jet bg-white shadow-[0_40px_80px_-35px_rgba(5,36,57,.6)]">
        {/* Map */}
        <div className="relative h-72 bg-[#eef3f6]">
          <svg viewBox="0 0 330 290" className="absolute inset-0 h-full w-full" aria-hidden>
            {/* streets */}
            {[50, 110, 170, 230].map((y) => (
              <path key={y} d={`M0 ${y} H330`} stroke="#fff" strokeWidth="9" />
            ))}
            {[60, 150, 240].map((x) => (
              <path key={x} d={`M${x} 0 V290`} stroke="#fff" strokeWidth="9" />
            ))}
            <path d={ROUTE} fill="none" stroke="#0296d9" strokeOpacity=".2" strokeWidth="7" strokeLinecap="round" />
            <path d={ROUTE} fill="none" stroke="#0296d9" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 8" className="route-flow" />
            {/* store and door */}
            <circle cx="40" cy="250" r="9" fill="#052439" />
            <circle cx="290" cy="52" r="11" fill="#8fc124" />
            <circle cx="290" cy="52" r="20" fill="none" stroke="#8fc124" strokeOpacity=".5" strokeWidth="2" className="door-ping" />
            {/* rider */}
            <g>
              <circle r="11" fill="#fff" />
              <circle r="7" fill="#0296d9" />
              <animateMotion dur="7.2s" repeatCount="indefinite" path={ROUTE} />
            </g>
          </svg>
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[0.72rem] font-bold text-jet shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" /> Live
          </span>
        </div>
        {/* Sheet */}
        <div className="p-5">
          <p className="label text-ink-faint">Arriving in</p>
          <p className="tabular mt-1 text-[2rem] font-extrabold leading-none tracking-tight text-jet">
            {eta} <span className="text-[1rem] font-bold text-ink-soft">min</span>
          </p>
          <div className="mt-4 flex gap-1.5">
            {["Packed", "Picked up", "On the way", "Delivered"].map((s, i) => (
              <span key={s} className={clsx("h-1.5 flex-1 rounded-full", i < 3 ? "bg-brand-blue" : "bg-floral")} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-floral px-3.5 py-3">
            <span>
              <span className="block text-[0.9rem] font-bold text-jet">Your rider</span>
              <span className="block text-[0.75rem] text-ink-faint">Call goes through a masked number</span>
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center label text-ink-faint">Customer live tracking · illustrative</p>
    </div>
  );
}

const DELIVERY_POINTS = [
  ["Own fleet first", "DocPharma's own riders take hyperlocal orders; partner couriers extend reach beyond the city."],
  ["Routed, not guessed", "Each order is assigned by zone, priority and delivery mode, then grouped into rider routes."],
  ["Proof at every hand-off", "Pickups and returns are confirmed by OTP, so every movement has a record."],
  ["Privacy built in", "Riders and customers talk through masked numbers; neither sees the other's."],
];

export function Delivery() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[84rem] items-center gap-14 px-5 md:px-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <SectionHeader
            eyebrow="Last mile"
            title="Delivery that knows where every order is."
            sub="Riders, routes and couriers, orchestrated by one engine, with the customer watching it happen."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {DELIVERY_POINTS.map(([title, body], i) => (
              <Reveal key={title} from="up" delay={i * 0.07}>
                <div className="h-full border-t-2 border-hairline pt-4 transition-colors duration-300 hover:border-brand-blue">
                  <h3 className="text-[1.05rem] font-extrabold tracking-tight text-jet">{title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal from="scale">
          <TrackingPhone />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------- connect and automation --- */

const CONNECT_LOGOS = INTEGRATION_LOGOS.filter((l) => ["Shopify", "Unicommerce", "EasyEcom"].includes(l.name));

export function ConnectAndAutomate() {
  return (
    <section className="bg-floral py-24 md:py-32">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader
          eyebrow="Plugs in, runs itself"
          title="No rebuild on your side. No babysitting on ours."
          sub="Orders arrive from the systems you already use, and the routine work runs on its own, around the clock."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* Connect */}
          <Reveal from="up">
            <div className="h-full rounded-[2rem] border border-hairline bg-white p-7 md:p-9">
              <p className="label text-brand-blue">Connects to</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {CONNECT_LOGOS.map((l) => (
                  <span key={l.name} className="flex h-16 w-36 items-center justify-center rounded-2xl bg-floral px-4 transition-colors duration-300 hover:bg-viking">
                    <LogoImg src={l.src} alt={l.name} area={2200} maxWidth={110} maxHeight={40} className="mix-blend-multiply" />
                  </span>
                ))}
              </div>
              <ul className="mt-7 divide-y divide-hairline">
                {CONNECT.map((c) => (
                  <li key={c.title} className="group flex gap-4 py-4">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-blue transition-transform duration-300 group-hover:scale-150" />
                    <span>
                      <span className="block text-[1rem] font-extrabold text-jet">{c.title}</span>
                      <span className="mt-1 block text-[0.93rem] leading-relaxed text-ink-soft">{c.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Automate */}
          <Reveal from="up" delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-jet p-7 text-white md:p-9">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-green/15 blur-[90px]" />
              <div className="relative flex items-center justify-between">
                <p className="label text-brand-green">Always running</p>
                <span className="flex items-center gap-2 text-[0.78rem] font-semibold text-white/60">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand-green opacity-75" />
                    <span className="relative h-2 w-2 rounded-full bg-brand-green" />
                  </span>
                  Scheduled jobs
                </span>
              </div>
              <ul className="relative mt-6 grid gap-3 sm:grid-cols-2">
                {AUTOMATION.map((job, i) => (
                  <li
                    key={job.title}
                    className="job group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-300 hover:border-brand-green/40 hover:bg-white/[0.07]"
                    style={{ "--i": i }}
                  >
                    <span className="flex items-center gap-2 text-[0.95rem] font-extrabold">
                      <span className="job-dot h-1.5 w-1.5 rounded-full bg-brand-green" />
                      {job.title}
                    </span>
                    <span className="mt-1.5 block text-[0.86rem] leading-relaxed text-white/60">{job.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ control room --- */

export function ControlRoom() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader
          eyebrow="The control room"
          title="Run the whole network from one screen."
          sub="The admin side of DocPharma One, where operations, finance and catalogue teams keep every store, rider and rupee in order."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTROL.map((c, i) => (
            <Reveal key={c.title} from="up" delay={(i % 3) * 0.07}>
              <article className="group h-full rounded-3xl border border-hairline bg-white p-7 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_24px_50px_-30px_rgba(5,36,57,.4)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-viking text-brand-blue transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
                  <Icon name={CONTROL_ICONS[i]} />
                </span>
                <h3 className="mt-5 text-[1.12rem] font-extrabold tracking-tight text-jet">{c.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
