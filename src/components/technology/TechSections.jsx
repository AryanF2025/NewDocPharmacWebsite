/**
 * Technology page sections that describe the platform as it is built:
 * the products, delivery, connections and automation, and the control room.
 */

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { LogoImg } from "@/components/ui/LogoImg";
import { SectionHeader } from "@/components/motion/Text";
import { PLATFORM, AUTOMATION, CONNECT, CONTROL } from "@/data/technology";
import { INTEGRATION_LOGOS } from "@/data/logos";
import { scrollToTarget } from "@/components/motion/smoothScroll";
import { DEMOS } from "./ProductDemos";

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

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

/** One product's panel: what it is, what it does, and its live demo. */
function ProductPanel({ item, index, compact = false }) {
  const Demo = DEMOS[item.key];
  return (
    <div className={clsx("relative grid gap-6", !compact && "md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] md:gap-8")}>
      <div>
        <div className="flex items-center gap-3">
          <span className="label text-brand-green">{item.kind}</span>
          <span className="tabular text-[0.75rem] font-extrabold text-white/35">
            {String(index + 1).padStart(2, "0")} / {String(PLATFORM.length).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-3 text-[clamp(1.7rem,2.6vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.035em]">{item.name}</h3>
        <p className="mt-3 text-[1.02rem] leading-relaxed text-white/75">{item.line}</p>
        <p className="mt-1.5 text-[0.82rem] text-white/45">Used by: {item.who}</p>
        <ul className="mt-4 grid gap-1">
          {item.points.map((point, i) => (
            <motion.li
              key={point}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.06 }}
              className="group/pt flex items-start gap-3 rounded-xl py-1 sm:-mx-2 sm:px-2 text-[0.94rem] leading-snug text-white/85 transition-colors duration-300 hover:bg-white/[0.06] hover:text-white"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/20 text-[0.6rem] text-brand-green transition-colors duration-300 group-hover/pt:bg-brand-green group-hover/pt:text-jet">✓</span>
              {point}
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col">
        <Demo />
        <p className="mt-2 text-right text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/30">Illustrative</p>
      </div>
    </div>
  );
}

/**
 * The six products, told by scroll on larger screens: the section pins, and
 * scrolling steps through the products one at a time, each with a live demo,
 * so a visitor reads every one at their own pace. A line down the list shows
 * how far through they are; clicking a product jumps to it. Phones (and
 * reduced motion) get the same panels stacked.
 */
export function PlatformExplorer() {
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  return desktop && !reduce ? <PlatformPinned /> : <PlatformStacked />;
}

function PlatformPinned() {
  const hostRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = PLATFORM.length;
  const { scrollYProgress } = useScroll({ target: hostRef, offset: ["start start", "end end"] });
  const rail = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(count - 1, Math.max(0, Math.floor(p * count * 0.999))));
  });

  const goTo = (i) => {
    const host = hostRef.current;
    if (!host) return;
    const travel = host.offsetHeight - window.innerHeight;
    const top = host.getBoundingClientRect().top + window.scrollY;
    scrollToTarget(top + (travel * (i + 0.5)) / count);
  };

  const item = PLATFORM[active];

  return (
    <section ref={hostRef} className="relative bg-floral" style={{ height: `${100 + count * 12}svh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pb-8 pt-24">
        <div className="mx-auto w-full max-w-[84rem] px-5 md:px-10">
          <SectionHeader
            eyebrow="The platform"
            title="Six products. One system underneath."
            titleClassName="!text-[clamp(1.9rem,3vw,2.7rem)]"
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)]">
            {/* The list, with how far through the visitor is */}
            <div className="relative pl-5">
              <span aria-hidden className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-jet/10" />
              <motion.span
                aria-hidden
                className="absolute left-0 top-2 w-0.5 origin-top rounded-full bg-gradient-to-b from-brand-blue to-brand-green"
                style={{ scaleY: rail, height: "calc(100% - 1rem)" }}
              />
              <ul className="grid gap-1">
                {PLATFORM.map((p, i) => {
                  const on = i === active;
                  return (
                    <li key={p.key}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={on ? "step" : undefined}
                        className="group relative flex w-full items-center gap-3.5 rounded-2xl px-3 py-2.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
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
                            "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                            on ? "bg-brand-blue text-white" : i < active ? "bg-white text-brand-blue" : "bg-white text-ink-faint group-hover:text-brand-blue"
                          )}
                        >
                          <Icon name={p.key} size={20} />
                        </span>
                        <span className="relative min-w-0">
                          <span className={clsx("block text-[1rem] font-extrabold tracking-tight transition-colors", on ? "text-jet" : "text-ink-soft group-hover:text-jet")}>
                            {p.name}
                          </span>
                          <span className="block text-[0.8rem] text-ink-faint">{p.kind}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* The panel: wipes to the next product as the visitor scrolls */}
            {/* One fixed height for every product, so nothing shifts as they change. */}
            <div className="relative flex h-[min(33rem,64svh)] items-start overflow-hidden rounded-[2rem] bg-jet px-8 pb-7 pt-8 text-white">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-blue/25 blur-[90px]" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-green/15 blur-[90px]" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(4px)", transition: { duration: 0.18 } }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="w-full"
                >
                  <ProductPanel item={item} index={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformStacked() {
  return (
    <section className="overflow-x-clip bg-floral py-24 md:py-32">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader
          eyebrow="The platform"
          title="Six products. One system underneath."
          sub="Everything an order touches, from the store's shelf to the customer's door, runs on DocPharma's own software."
        />
        <div className="mt-10 grid gap-4">
          {PLATFORM.map((item, i) => (
            <Reveal key={item.key} from="up">
              <div className="relative overflow-hidden rounded-[2rem] bg-jet p-6 text-white md:p-8">
                <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-blue/20 blur-[80px]" />
                <ProductPanel item={item} index={i} compact />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- delivery --- */

/** A route drawn across a small map; the rider follows it on a loop. */
const ROUTE = "M52 250 C 90 250, 96 190, 140 185 S 200 120, 230 110 S 262 70, 282 58";
const RIDE_S = 6; // seconds on the road, then the handover

/** Rider on a scooter, centred on 0,0. */
function RiderGlyph() {
  return (
    <g>
      <circle r="15" fill="#0296d9" stroke="#fff" strokeWidth="3" />
      <g fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="-5.5" cy="5" r="2.6" />
        <circle cx="6" cy="5" r="2.6" />
        <path d="M-5.5 5h5l3-6h4M1.5-1-1-1M7.5-1l-1.5 6" />
        <circle cx="0" cy="-6.5" r="2.2" fill="#fff" stroke="none" />
      </g>
    </g>
  );
}

/**
 * Customer tracking, played as the whole delivery: the rider leaves the
 * darkstore and rides to the door while the arrival time counts down, the
 * customer is shown the handover OTP, and the order is marked delivered.
 */
function TrackingPhone() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState("ride"); // ride | otp | done
  const [eta, setEta] = useState(12);
  const [loop, setLoop] = useState(0);
  const [typed, setTyped] = useState(0);
  const pathRef = useRef(null);
  const riderRef = useRef(null);
  const phoneRef = useRef(null);
  // Plays only while on screen, from the start each time it comes into view.
  const inView = useInView(phoneRef, { amount: 0.45 });

  useEffect(() => {
    if (reduce) {
      setPhase("otp");
      return undefined;
    }
    if (!inView) {
      setPhase("ride");
      setEta(12);
      setTyped(0);
      riderRef.current?.setAttribute("transform", "translate(52 250)");
      return undefined;
    }
    setPhase("ride");
    setEta(12);
    // Move the rider along the route, eased, from the store to the door.
    let frame;
    const start = performance.now();
    const ride = (now) => {
      const path = pathRef.current;
      const rider = riderRef.current;
      if (!path || !rider) return;
      const t = Math.min(1, (now - start) / (RIDE_S * 1000));
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const pt = path.getPointAtLength(eased * path.getTotalLength());
      rider.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      if (t < 1) frame = requestAnimationFrame(ride);
    };
    frame = requestAnimationFrame(ride);
    const tick = window.setInterval(() => setEta((m) => Math.max(1, m - 2)), (RIDE_S * 1000) / 6);
    setTyped(0);
    const toOtp = window.setTimeout(() => {
      window.clearInterval(tick);
      setPhase("otp");
    }, RIDE_S * 1000);
    // The code is entered one digit at a time.
    const digits = [1, 2, 3, 4].map((d) => window.setTimeout(() => setTyped(d), RIDE_S * 1000 + 250 + d * 380));
    const toDone = window.setTimeout(() => setPhase("done"), RIDE_S * 1000 + 2900);
    const again = window.setTimeout(() => setLoop((l) => l + 1), RIDE_S * 1000 + 4700);
    return () => {
      window.clearInterval(tick);
      cancelAnimationFrame(frame);
      [toOtp, toDone, again, ...digits].forEach(window.clearTimeout);
    };
  }, [loop, reduce, inView]);

  const step = phase === "ride" ? 2 : phase === "otp" ? 3 : 4;

  return (
    <div ref={phoneRef} className="relative mx-auto w-full max-w-[20rem]">
      <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-green/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2.4rem] border-[6px] border-jet bg-white shadow-[0_40px_80px_-35px_rgba(5,36,57,.6)]">
        {/* Map */}
        <div className="relative h-72 bg-[#eef3f6]">
          <svg viewBox="0 0 330 290" className="absolute inset-0 h-full w-full" aria-hidden>
            {[50, 110, 170, 230].map((y) => (
              <path key={y} d={`M0 ${y} H330`} stroke="#fff" strokeWidth="9" />
            ))}
            {[60, 150, 240].map((x) => (
              <path key={x} d={`M${x} 0 V290`} stroke="#fff" strokeWidth="9" />
            ))}
            <path d={ROUTE} pathLength="1" fill="none" stroke="#0296d9" strokeOpacity=".25" strokeWidth="7" strokeLinecap="round" className="route-draw" />
            <path ref={pathRef} d={ROUTE} fill="none" stroke="#0296d9" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 8" className="route-flow" />

            {/* Darkstore */}
            <g transform="translate(52 250)">
              <rect x="-18" y="-17" width="36" height="32" rx="8" fill="#052439" />
              <path d="M-9 -2 l9 -7 l9 7 v10 h-18 z" fill="none" stroke="#8fc124" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M-2 8 v-5 h4 v5" fill="none" stroke="#8fc124" strokeWidth="1.8" />
            </g>
            <text x="52" y="282" textAnchor="middle" fontSize="11" fontWeight="700" fill="#052439">Darkstore</text>

            {/* Customer's door */}
            <circle cx="282" cy="58" r="24" fill="none" stroke="#8fc124" strokeOpacity=".5" strokeWidth="2" className="door-ping" />
            <g transform="translate(282 58)">
              <circle r="16" fill="#8fc124" />
              <path d="M-7 1 l7 -6 l7 6 v7 h-14 z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
            </g>
            <text x="282" y="94" textAnchor="middle" fontSize="11" fontWeight="700" fill="#052439">You</text>

            {/* Rider */}
            <g ref={riderRef} transform={reduce ? "translate(282 58)" : "translate(52 250)"}>
              <RiderGlyph />
            </g>
          </svg>
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[0.72rem] font-bold text-jet shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" /> Live
          </span>
        </div>

        {/* Sheet: what the customer sees at each moment */}
        <div className="p-5">
          <div className="relative h-[4.25rem]">
            <div className={clsx("absolute inset-0 transition-[opacity,transform] duration-500", phase === "ride" ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0")}>
              <p className="label text-ink-faint">Arriving in</p>
              <p className="tabular mt-1 text-[2rem] font-extrabold leading-none tracking-tight text-jet">
                <span key={eta} className="count-tick inline-block">{eta}</span> <span className="text-[1rem] font-bold text-ink-soft">min</span>
              </p>
            </div>
            <div className={clsx("absolute inset-0 transition-[opacity,transform] duration-500", phase === "otp" ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0")}>
              <p className="label text-brand-blue">Rider has arrived · share OTP</p>
              <div className="mt-2 flex gap-1.5">
                {"4821".split("").map((d, i) => {
                  const shown = reduce || i < typed;
                  return (
                    <span
                      key={i}
                      className={clsx(
                        "flex h-10 w-10 items-center justify-center rounded-xl border-2 text-[1.15rem] font-extrabold leading-none text-jet transition-colors duration-300",
                        shown ? "border-brand-blue bg-viking" : i === typed ? "border-brand-blue/60 bg-white" : "border-hairline bg-white"
                      )}
                    >
                      {shown ? (
                        <span key={`${loop}-${i}`} className="tick-pop">{d}</span>
                      ) : i === typed ? (
                        <span className="h-4 w-0.5 animate-pulse rounded-full bg-brand-blue" />
                      ) : null}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className={clsx("absolute inset-0 flex items-center gap-3 transition-[opacity,transform] duration-500", phase === "done" ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0")}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-[1.1rem] font-extrabold text-white">✓</span>
              <span>
                <span className="block text-[1.2rem] font-extrabold text-jet">Delivered</span>
                <span className="block text-[0.78rem] text-ink-faint">Handed over with OTP</span>
              </span>
            </div>
          </div>
          <div className="mt-4 flex gap-1.5">
            {["Packed", "Picked up", "On the way", "Delivered"].map((s, i) => (
              <span key={s} className={clsx("h-1.5 flex-1 rounded-full transition-colors duration-500", i < step ? (step === 4 ? "bg-brand-green" : "bg-brand-blue") : "bg-floral")} />
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
    <section className="overflow-x-clip bg-white py-24 md:py-32">
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
                <div className="group relative h-full pt-4">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-hairline" />
                  <span aria-hidden className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-brand-blue to-brand-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
                  <span className="tabular text-[0.75rem] font-extrabold text-ink-faint transition-colors duration-300 group-hover:text-brand-blue">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 text-[1.05rem] font-extrabold tracking-tight text-jet transition-transform duration-300 group-hover:translate-x-1">{title}</h3>
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

/** One line in either list: a mark, a title and a short line, nothing more. */
function ListRow({ title, body, tone, i }) {
  const dark = tone === "dark";
  return (
    <li
      className={clsx(
        "group flex items-start gap-3.5 rounded-xl px-3 py-3 transition-colors duration-300",
        dark ? "hover:bg-white/[0.06]" : "hover:bg-floral"
      )}
      style={{ "--i": i }}
    >
      <span
        className={clsx(
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.62rem] transition-colors duration-300",
          dark ? "job-dot bg-brand-green/20 text-brand-green group-hover:bg-brand-green group-hover:text-jet" : "bg-viking text-brand-blue group-hover:bg-brand-blue group-hover:text-white"
        )}
      >
        {dark ? "●" : "✓"}
      </span>
      <span className="min-w-0">
        <span className={clsx("block text-[0.98rem] font-extrabold tracking-tight", dark ? "text-white" : "text-jet")}>{title}</span>
        <span className={clsx("mt-0.5 block text-[0.88rem] leading-snug", dark ? "text-white/60" : "text-ink-soft")}>{body}</span>
      </span>
    </li>
  );
}

/**
 * How partners plug in, and what runs on its own — one screen: the heading
 * with the platforms we connect to, then the two lists side by side.
 */
export function ConnectAndAutomate() {
  return (
    <section className="flex flex-col justify-center bg-floral py-20 lg:min-h-[100svh] lg:py-16">
      <div className="mx-auto w-full max-w-[84rem] px-5 md:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Plugs in, runs itself"
            title="No rebuild on your side. No babysitting on ours."
            titleClassName="!text-[clamp(1.9rem,3vw,2.7rem)]"
          />
          <Reveal from="up" className="shrink-0">
            <p className="label text-ink-faint">Works with</p>
            <div className="mt-3 flex gap-2.5">
              {CONNECT_LOGOS.map((l) => (
                <span
                  key={l.name}
                  className="flex h-[4.5rem] w-44 items-center justify-center rounded-2xl border border-hairline bg-white px-5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-blue/40"
                >
                  <LogoImg src={l.src} alt={l.name} area={5200} maxWidth={136} maxHeight={46} />
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal from="up">
            <div className="h-full rounded-[2rem] border border-hairline bg-white p-5 md:p-7">
              <p className="label px-3 text-brand-blue">Connects to your stack</p>
              <ul className="mt-3 grid">
                {CONNECT.map((c, i) => (
                  <ListRow key={c.title} {...c} i={i} />
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal from="up" delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-jet p-5 text-white md:p-7">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-green/15 blur-[90px]" />
              <div className="relative flex items-center justify-between px-3">
                <p className="label text-brand-green">Runs on its own</p>
                <span className="flex items-center gap-2 text-[0.75rem] font-semibold text-white/55">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand-green opacity-75" />
                    <span className="relative h-2 w-2 rounded-full bg-brand-green" />
                  </span>
                  Around the clock
                </span>
              </div>
              <ul className="relative mt-3 grid sm:grid-cols-2">
                {AUTOMATION.map((job, i) => (
                  <ListRow key={job.title} {...job} tone="dark" i={i} />
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
              <article
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
                className="spotlight group relative h-full overflow-hidden rounded-3xl border border-hairline bg-white p-7 transition-shadow duration-500 hover:shadow-[0_24px_50px_-32px_rgba(5,36,57,.4)]"
              >
                <span className="tabular absolute right-6 top-6 text-[0.75rem] font-extrabold text-ink-faint/60 transition-colors duration-300 group-hover:text-brand-blue">{String(i + 1).padStart(2, "0")}</span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-viking text-brand-blue transition-[background-color,color,transform] duration-500 group-hover:scale-105 group-hover:bg-brand-blue group-hover:text-white">
                  <Icon name={CONTROL_ICONS[i]} />
                </span>
                <h3 className="relative mt-5 flex items-center gap-2 text-[1.12rem] font-extrabold tracking-tight text-jet">
                  {c.title}
                  <span aria-hidden className="-translate-x-1 text-brand-blue opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
                </h3>
                <p className="relative mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
