/**
 * "Who we build for": the five businesses as one pinned, full-screen reel.
 *
 * The section holds the screen for five scrolls. Each business's photo fills
 * it, and the next one opens out of a growing circle. On the left the five
 * names roll past like a dial, the current one bright; on the right a glass
 * panel carries what that business gets. Phones (and reduced motion) get the
 * same content as a plain list of cards.
 */

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useMotionTemplate, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { SectionHeader, Eyebrow } from "@/components/motion/Text";
import { CtaButton } from "@/components/motion/CtaButton";
import { scrollToTarget } from "@/components/motion/smoothScroll";
import { SOLUTION_TABS } from "@/data/site";

const EASE = [0.22, 1, 0.36, 1];
const pad = (n) => String(n).padStart(2, "0");

/** Two small status cards that float over each business's photo. */
const FLOAT = {
  "e-pharmacies": [
    ["rx", "Prescription validated", "Pharmacist sign-off"],
    ["ride", "Out for delivery", "30–60 min hyperlocal"],
  ],
  "corporate-wellness": [
    ["api", "Order received by API", "Straight into the network"],
    ["pin", "Tracked end to end", "Order to doorstep"],
  ],
  "health-insurers": [
    ["rx", "Member prescription", "Validated before dispatch"],
    ["home", "At the member's door", "Pan-India reach"],
  ],
  "d2c-health": [
    ["box", "Stock close to customers", "Multi-city fulfilment"],
    ["ride", "Hyperlocal delivery", "30–60 minutes"],
  ],
  hospitals: [
    ["app", "Your app, your brand", "White-labelled"],
    ["home", "Delivered to the patient", "Beyond the hospital"],
  ],
};

const GLYPH = {
  rx: "M6 4h6a4 4 0 0 1 0 8H6zM6 12v8M10 12l8 8M18 12l-8 8",
  ride: "M5 17a2.5 2.5 0 1 0 0 .1M19 17a2.5 2.5 0 1 0 0 .1M5 17l4-7h5l3 7M9 10l-1-3H6M14 10h3l2 7",
  api: "M8 6l-5 6 5 6M16 6l5 6-5 6M14 4l-4 16",
  pin: "M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  home: "M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6",
  box: "M3 7l9-4 9 4-9 4zM3 7v10l9 4 9-4V7M12 11v10",
  app: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2",
};

function StatusCard({ glyph, title, sub, tone = "blue" }) {
  return (
    <div className="sol-float flex items-center gap-3 rounded-2xl bg-white/95 py-2.5 pl-2.5 pr-4 text-left shadow-[0_18px_40px_-18px_rgba(0,0,0,.6)] backdrop-blur">
      <span
        className={clsx(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          tone === "blue" ? "bg-viking text-brand-blue" : "bg-peppermint text-[#5f8a0f]"
        )}
      >
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={GLYPH[glyph]} />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-[0.82rem] font-extrabold leading-tight text-jet">{title}</span>
        <span className="block whitespace-nowrap text-[0.72rem] font-semibold text-ink-faint">{sub}</span>
      </span>
      <span className="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green text-[0.6rem] text-white">✓</span>
    </div>
  );
}

const REEL_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function useReel() {
  const [on, setOn] = useState(() => typeof window !== "undefined" && window.matchMedia(REEL_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(REEL_QUERY);
    const update = () => setOn(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return on;
}

/* --------------------------------------------------------------- the reel --- */

const STEPS = SOLUTION_TABS.length - 1;
/** Height of one name on the dial, in rem. */
const ROW = 5;

/** One business's photo. Every one after the first opens out of a circle. */
function Photo({ i, src, progress }) {
  const mid = (i - 0.5) / STEPS;
  const radius = useTransform(progress, [mid - 0.09, mid + 0.07], [0, 150]);
  const clip = useMotionTemplate`circle(${radius}% at 70% 52%)`;
  const scale = useTransform(progress, i === 0 ? [0, 0.25] : [mid - 0.09, mid + 0.3], [1.12, 1]);
  return (
    <motion.div className="absolute inset-0" style={i === 0 ? undefined : { clipPath: clip }}>
      <motion.img src={src} alt="" loading={i === 0 ? undefined : "lazy"} style={{ scale }} className="h-full w-full object-cover" />
    </motion.div>
  );
}

/** One name on the dial: bright and full size at the centre line, faint away from it. */
function DialName({ tab, i, progress, active, onPick }) {
  const distance = useTransform(progress, (v) => Math.min(1, Math.abs(v * STEPS - i)));
  const opacity = useTransform(distance, [0, 1], [1, 0.2]);
  const scale = useTransform(distance, [0, 1], [1, 0.7]);
  return (
    <motion.li style={{ height: `${ROW}rem`, opacity, scale }} className="flex origin-left items-center">
      <button
        type="button"
        onClick={onPick}
        aria-current={active ? "true" : undefined}
        className="group flex items-baseline gap-4 whitespace-nowrap text-left outline-none focus-visible:underline"
      >
        <span className="tabular text-[0.9rem] font-extrabold text-brand-green">{pad(i + 1)}</span>
        <span className="text-[clamp(2rem,3.1vw,3.2rem)] font-extrabold leading-none tracking-[-0.045em] text-white transition-colors duration-300 group-hover:text-brand-green">
          {tab.tab}
        </span>
        <span
          className={clsx(
            "text-[1.6rem] text-brand-green transition-all duration-500",
            active ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
          )}
        >
          →
        </span>
      </button>
    </motion.li>
  );
}

/** One bar per business in the progress; it fills as the reel reaches that business. */
function Segment({ i, progress }) {
  const fill = useTransform(progress, (v) => Math.min(1, Math.max(0, v * STEPS - i + 1)));
  return (
    <span className="h-1 w-8 overflow-hidden rounded-full bg-white/15">
      <motion.span style={{ scaleX: fill }} className="block h-full origin-left rounded-full bg-gradient-to-r from-brand-blue to-brand-green" />
    </span>
  );
}

/** The business in detail, in a glass panel that swaps as the dial turns. */
function Details({ tab }) {
  return (
    <motion.div
      key={tab.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
      transition={{ duration: 0.6, ease: EASE }}
      className="rounded-[2rem] border border-white/15 bg-jet/55 p-7 shadow-[0_40px_80px_-40px_rgba(0,0,0,.7)] backdrop-blur-xl xl:p-8"
    >
      <h3 className="text-[clamp(1.4rem,1.9vw,1.9rem)] font-extrabold leading-[1.1] tracking-[-0.035em]">
        {tab.headline.split(" ").map((word, w) => (
          <span key={`${word}${w}`} className="inline-block overflow-hidden pb-[0.08em] align-top">
            <motion.span
              className="inline-block"
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 + w * 0.035 }}
            >
              {word}&nbsp;
            </motion.span>
          </span>
        ))}
      </h3>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
        className="mt-3 text-[0.98rem] leading-relaxed text-white/70"
      >
        {tab.copy}
      </motion.p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {tab.props.map((prop, p) => (
          <motion.li
            key={prop}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 24, delay: 0.25 + p * 0.04 }}
            className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.07] px-3 py-1.5 text-[0.8rem] font-semibold text-white/90"
          >
            <span className="text-[0.6rem] text-brand-green">✓</span>
            {prop}
          </motion.li>
        ))}
      </ul>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.5 }} className="mt-6">
        <CtaButton to="/partner">{tab.cta}</CtaButton>
      </motion.div>
    </motion.div>
  );
}

function Reel({ art, outcome }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const dialProgress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.4 });
  const dialY = useTransform(dialProgress, [0, 1], ["0rem", `-${STEPS * ROW}rem`]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(STEPS, Math.max(0, Math.round(v * STEPS)))));

  const pick = (i) => {
    const el = document.getElementById(SOLUTION_TABS[i].id);
    if (el) scrollToTarget(el);
  };

  const tab = SOLUTION_TABS[active];
  const [first, second] = FLOAT[tab.id];

  return (
    <section ref={ref} id="solutions" className="relative bg-jet" style={{ height: `${(STEPS + 1) * 100}svh` }}>
      {/* Where /solutions#d2c-health and the hero tiles land: one screen of
          scroll per business, so each anchor opens on its own photo. */}
      {SOLUTION_TABS.map((t, i) => (
        <span key={t.id} id={t.id} aria-hidden className="absolute left-0 block h-0" style={{ top: `${i * 100}svh` }} />
      ))}

      <div className="sticky top-0 h-[100svh] overflow-hidden text-white">
        {SOLUTION_TABS.map((t, i) => (
          <Photo key={t.id} i={i} src={art[t.art]} progress={scrollYProgress} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-jet via-jet/80 to-jet/25" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-jet/80 to-transparent" />

        <div className="relative mx-auto grid h-full max-w-[84rem] grid-cols-[minmax(0,1fr)_minmax(0,27rem)] grid-rows-[auto_minmax(0,1fr)] gap-x-10 gap-y-6 px-10 pb-10 pt-28 xl:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
          {/* The section's own title, and the one place that says where you are */}
          <div className="col-span-2 flex items-end justify-between gap-10 border-b border-white/10 pb-6">
            <div>
              <Eyebrow tone="dark">Who we build for</Eyebrow>
              <h2 className="mt-3 text-[clamp(1.9rem,2.7vw,2.7rem)] font-extrabold leading-[1.05] tracking-[-0.04em]">
                One network. Five ways to plug in.
              </h2>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <div className="flex gap-1.5" aria-hidden>
                {SOLUTION_TABS.map((t, i) => (
                  <Segment key={t.id} i={i} progress={dialProgress} />
                ))}
              </div>
              <p className="tabular text-[0.95rem] font-extrabold text-white/50">
                <span className="text-white">{pad(active + 1)}</span> / {pad(STEPS + 1)}
              </p>
            </div>
          </div>

          {/* The dial of names, and what the current one gets */}
          <div className="flex min-h-0 flex-col">
            <div className="relative mb-6 min-h-0 flex-1">
              {/* The centre line the current name sits on */}
              <span aria-hidden className="absolute -left-6 top-1/2 h-px w-4 bg-brand-green" />
              <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_24%,#000_68%,transparent_92%)]">
                <motion.ul style={{ y: dialY, top: `calc(50% - ${ROW / 2}rem)` }} className="absolute left-0 right-0">
                  {SOLUTION_TABS.map((t, i) => (
                    <DialName key={t.id} tab={t} i={i} progress={dialProgress} active={i === active} onPick={() => pick(i)} />
                  ))}
                </motion.ul>
              </div>
            </div>

            <div className="relative h-[5.5rem] max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
                >
                  <p className="label text-brand-green">What you get</p>
                  <p className="mt-2 text-[clamp(1.15rem,1.6vw,1.45rem)] font-extrabold leading-snug tracking-[-0.02em]">{outcome[tab.id]}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Status over the photo, then the details panel */}
          <div className="flex min-h-0 flex-col justify-end gap-4">
            <div className="sol-floats">
              <AnimatePresence mode="wait">
                <motion.div key={tab.id} className="flex flex-col items-end gap-3" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
                  {[first, second].map(([glyph, title, sub], k) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, x: 30, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.35 + k * 0.15 }}
                      className={k ? "mr-12" : undefined}
                    >
                      <StatusCard glyph={glyph} title={title} sub={sub} tone={k ? "green" : "blue"} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <Details key={tab.id} tab={tab} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- phones, reduced motion --- */

function List({ art, outcome }) {
  return (
    <section id="solutions" className="bg-white py-20">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader eyebrow="Who we build for" title="One network. Five ways to plug in." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {SOLUTION_TABS.map((tab, i) => {
            const [glyph, title, sub] = FLOAT[tab.id][0];
            return (
              <motion.article
                key={tab.id}
                id={tab.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="scroll-mt-24 overflow-hidden rounded-[2rem] bg-jet text-white"
              >
                <div className="relative h-56 sm:h-64">
                  <img src={art[tab.art]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-jet to-transparent" />
                  <div className="absolute left-4 top-4">
                    <StatusCard glyph={glyph} title={title} sub={sub} />
                  </div>
                  <span className="tabular absolute bottom-3 right-5 text-[4rem] font-extrabold leading-none tracking-[-0.06em] text-white/85 mix-blend-overlay">
                    {pad(i + 1)}
                  </span>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.18em] text-brand-green">{tab.tab}</p>
                  <h3 className="mt-2 text-[1.5rem] font-extrabold leading-[1.12] tracking-[-0.03em]">{tab.headline}</h3>
                  <p className="mt-3 border-l-2 border-brand-green pl-3 text-[0.98rem] font-semibold leading-snug text-white/85">{outcome[tab.id]}</p>
                  <ul className="mt-5 grid gap-2">
                    {tab.props.map((prop) => (
                      <li key={prop} className="flex items-start gap-2.5 text-[0.92rem] font-semibold text-white/90">
                        <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-brand-green text-[0.55rem] text-jet">✓</span>
                        {prop}
                      </li>
                    ))}
                  </ul>
                  <CtaButton to="/partner" className="mt-6">
                    {tab.cta}
                  </CtaButton>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function BusinessReel({ art, outcome }) {
  const reel = useReel();
  return reel ? <Reel art={art} outcome={outcome} /> : <List art={art} outcome={outcome} />;
}
