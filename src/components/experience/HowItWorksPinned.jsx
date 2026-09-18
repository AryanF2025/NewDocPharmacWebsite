import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import clsx from "clsx";
import { ConsoleMock } from "@/components/directions/shared";
import stillVerify from "@/assets/images/still-verify.jpg";
import stillPick from "@/assets/images/still-pick.jpg";
import stillPack from "@/assets/images/still-pack.jpg";
import stillRider from "@/assets/images/still-rider.jpg";
import stillHandover from "@/assets/images/still-handover.jpg";

/** `at` is the minute each checkpoint starts on the 30-minute clock. */
const STEPS = [
  { title: "Order received", body: "The order lands on DocPharma One and is routed to the nearest licensed darkstore.", at: 0, media: "console" },
  { title: "AI prescription check", body: "Every prescription is read and validated before a single item is picked.", at: 1, media: stillVerify },
  { title: "Picked & packed", body: "Guided, barcode-verified picking. Sealed for dispatch in four minutes.", at: 5, media: stillPick },
  { title: "Pharmacist sign-off", body: "A registered pharmacist matches the invoice to the prescription and signs off.", at: 8, media: stillPack },
  { title: "Rider assigned", body: "The nearest rider is assigned automatically, by distance and delivery SLA.", at: 10, media: stillRider },
  { title: "Delivered", body: "OTP-confirmed handover at the door, inside 30 minutes.", at: 30, media: stillHandover },
];

function Media({ step }) {
  if (step.media === "console") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-jet via-[#053a66] to-brand-blue-deep p-6 xl:p-10">
        <ConsoleMock compact className="w-full max-w-lg" />
      </div>
    );
  }
  return <img src={step.media} alt="" className="h-full w-full object-cover" />;
}

/**
 * "How it works".
 *
 * Left: pinned, and sized to exactly one screen — heading, then the photo
 * filling whatever height is left, so nothing is ever cut off.
 * Right: the six checkpoints scroll past normally; whichever is in the middle
 * of the screen drives the photo, the clock and the progress on the left.
 */
export function HowItWorksPinned() {
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const ring = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = STEPS[active];

  return (
    <section ref={sectionRef} id="how" className="bg-white">
      <HowItWorksMobile />
      <div className="mx-auto hidden max-w-[84rem] gap-10 px-5 md:px-10 lg:grid lg:grid-cols-2 lg:gap-20">
        {/* ------------------------------------------ left: one screen --- */}
        <div className="pt-20 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:pb-8 lg:pt-24">
          <p className="text-[0.8rem] font-bold text-brand-blue">How it works</p>
          <h2 className="mt-2 text-[clamp(2.1rem,3.4vw,3.2rem)] font-extrabold leading-[1] tracking-[-0.04em] text-jet">
            Every order, on the clock.
          </h2>
          <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
            Six checkpoints, one continuous flow, tracked to the minute.
          </p>

          {/* The photo takes all remaining height, never more. */}
          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-jet lg:aspect-auto lg:min-h-0 lg:flex-1">
            {/* Filmstrip: all six frames in a row. Moving forward slides the
                strip right-to-left; scrolling back slides it the other way.
                The arriving frame settles from a slight zoom, the leaving one
                recedes and dims. */}
            <div
              className="absolute inset-0 flex transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {STEPS.map((s, i) => (
                <div key={s.title} className="relative h-full w-full shrink-0 overflow-hidden">
                  <div
                    className="h-full w-full transition-[transform,opacity,filter] duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)]"
                    style={{
                      transform: i === active ? "scale(1)" : "scale(1.14)",
                      opacity: i === active ? 1 : 0.55,
                      filter: i === active ? "none" : "saturate(.6)",
                    }}
                  >
                    <Media step={s} />
                  </div>
                </div>
              ))}
            </div>

            {/* Checkpoint badge with a progress ring */}
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl bg-white/92 px-4 py-3 backdrop-blur">
              <div className="min-w-0">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                  Checkpoint {active + 1} of {STEPS.length}
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={step.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="truncate text-[1.02rem] font-extrabold text-jet"
                  >
                    {step.title}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-3">
                <span className="tabular rounded-full bg-viking px-3 py-1 text-[0.78rem] font-extrabold text-brand-blue">
                  T+{step.at} min
                </span>
                <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
                  <circle cx="20" cy="20" r="16" fill="none" stroke="#052439" strokeOpacity="0.1" strokeWidth="4" />
                  <motion.circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="#8FC124"
                    strokeWidth="4"
                    strokeLinecap="round"
                    transform="rotate(-90 20 20)"
                    style={{ pathLength: ring }}
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Six-segment progress */}
          <div className="mt-4 flex gap-1.5">
            {STEPS.map((s, i) => (
              <span key={s.title} className="h-1 flex-1 overflow-hidden rounded-full bg-jet/8">
                <motion.span
                  className="block h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-green"
                  initial={false}
                  animate={{ width: i <= active ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            ))}
          </div>
        </div>

        {/* ------------------------------------ right: scrolling steps --- */}
        <ol className="pb-16 lg:py-[30vh]">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              data-i={i}
              ref={(el) => (stepRefs.current[i] = el)}
              className={clsx(
                "border-l-2 py-9 pl-8 transition-colors duration-500 lg:flex lg:min-h-[60vh] lg:flex-col lg:justify-center",
                i === active ? "border-brand-blue" : "border-hairline"
              )}
            >
              <span className="tabular text-[0.8rem] font-extrabold text-brand-green">
                {String(i + 1).padStart(2, "0")} · T+{s.at} min
              </span>
              <h3
                className={clsx(
                  "mt-3 text-[clamp(1.7rem,2.8vw,2.4rem)] font-extrabold tracking-[-0.03em] transition-colors duration-500",
                  i === active ? "text-jet" : "text-jet/25"
                )}
              >
                {s.title}
              </h3>
              <p
                className={clsx(
                  "mt-3 max-w-md text-[1.08rem] leading-relaxed transition-colors duration-500",
                  i === active ? "text-ink-soft" : "text-ink-faint/60"
                )}
              >
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================ mobile === */

/** Step 1 on phones: a new-order notification sized for a narrow card. */
function OrderReceivedMobile({ active }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-center gap-3 overflow-hidden bg-gradient-to-br from-jet via-[#053a66] to-brand-blue-deep p-5">
      <div key={active ? "on" : "off"} className={clsx("rounded-2xl bg-white p-4 shadow-xl", active && "how-pop")}>
        <div className="flex items-center justify-between">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink-faint">New order</span>
          <span className="flex items-center gap-1.5 rounded-full bg-peppermint px-2 py-0.5 text-[0.62rem] font-bold text-[#5f8a0f]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" /> Live
          </span>
        </div>
        <p className="mt-1.5 text-[1.05rem] font-extrabold text-jet">DP-48216 · Rx, 3 items</p>
        <p className="text-[0.78rem] text-ink-faint">Routed to nearest darkstore</p>
      </div>
      <div className="flex items-center gap-2 px-1 text-white">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-green text-[0.7rem] font-extrabold text-jet">✓</span>
        <span className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/20">
          <span key={active ? "on" : "off"} className={clsx("block h-full origin-left bg-brand-green", active ? "how-draw" : "scale-x-0")} />
        </span>
        <span className="shrink-0 text-[0.78rem] font-bold">Darkstore</span>
      </div>
    </div>
  );
}

const CARD_WIDTH = 0.84; // share of the viewport each card takes
const CARD_GAP = 12; // px

/**
 * Phones: the section pins to the screen and scrolling down slides the
 * checkpoint cards sideways, one at a time. The ‹ › buttons and progress
 * segments move the page to that card, so the two stay in sync.
 */
function HowItWorksMobile() {
  const hostRef = useRef(null);
  const [viewport, setViewport] = useState(390);
  const [active, setActive] = useState(0);
  const count = STEPS.length;

  useEffect(() => {
    const update = () => setViewport(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: hostRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.3 });

  const step = viewport * CARD_WIDTH + CARD_GAP;
  const x = useTransform(progress, [0, 1], [0, -step * (count - 1)]);
  const fill = useTransform(progress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(count - 1, Math.max(0, Math.round(p * (count - 1)))));
  });

  // Move the page so card i sits in the middle of the strip.
  const goTo = (i) => {
    const host = hostRef.current;
    if (!host) return;
    const travel = host.offsetHeight - window.innerHeight;
    const top = host.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (travel * i) / (count - 1), behavior: "smooth" });
  };

  return (
    // One extra screen of scroll per card after the first.
    <div ref={hostRef} className="relative lg:hidden" style={{ height: `${100 + (count - 1) * 70}svh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pb-5 pt-[4.5rem]">
        <div className="px-5">
          <p className="text-[0.78rem] font-bold text-brand-blue">How it works</p>
          <h2 className="mt-1 text-[clamp(1.6rem,4.2svh,2.1rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-jet">
            Every order, on the clock.
          </h2>
          <p className="mt-2 text-[clamp(0.88rem,2svh,1rem)] leading-snug text-ink-soft">
            Six checkpoints, one continuous flow, tracked to the minute.
          </p>
        </div>

        {/* Cards slide sideways with the page scroll */}
        <div className="relative mt-[clamp(0.75rem,2.5svh,1.5rem)] min-h-0 flex-1">
          <motion.div
            className="absolute inset-y-0 left-0 flex items-center"
            style={{ x, paddingLeft: `${((1 - CARD_WIDTH) / 2) * 100}vw`, gap: CARD_GAP }}
          >
            {STEPS.map((s, i) => {
              const isActive = i === active;
              return (
                <article
                  key={s.title}
                  aria-label={`Checkpoint ${i + 1} of ${count}: ${s.title}`}
                  className={clsx(
                    "flex max-h-full shrink-0 flex-col overflow-hidden rounded-[1.75rem] border bg-white transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                    isActive
                      ? "scale-100 border-brand-blue/25 opacity-100 shadow-[0_24px_50px_-28px_rgba(5,36,57,.45)]"
                      : "scale-[.93] border-hairline opacity-50"
                  )}
                  style={{ width: `${CARD_WIDTH * 100}vw` }}
                >
                  <div className="relative aspect-[4/3] max-h-[34svh] w-full overflow-hidden bg-jet">
                    {s.media === "console" ? (
                      <OrderReceivedMobile active={isActive} />
                    ) : (
                      <img
                        src={s.media}
                        alt=""
                        className={clsx(
                          "h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]",
                          isActive ? "scale-100" : "scale-[1.15]"
                        )}
                      />
                    )}
                    <span className="tabular absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[0.72rem] font-extrabold text-jet backdrop-blur">
                      {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                    </span>
                  </div>
                  <div key={isActive ? "on" : "off"} className={clsx("p-[clamp(0.9rem,2.4svh,1.25rem)]", isActive && "how-rise")}>
                    <p className="tabular text-[0.76rem] font-extrabold text-brand-green">T+{s.at} min</p>
                    <h3 className="mt-0.5 text-[clamp(1.15rem,3svh,1.35rem)] font-extrabold tracking-tight text-jet">{s.title}</h3>
                    <p className="mt-1 text-[clamp(0.86rem,2svh,0.95rem)] leading-relaxed text-ink-soft">{s.body}</p>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </div>

        {/* Progress follows the scroll; tapping a segment jumps to that card. */}
        <div className="mt-3 px-5">
          <div className="relative flex gap-1.5">
            {STEPS.map((s, i) => (
              <button key={s.title} type="button" onClick={() => goTo(i)} aria-label={`Go to ${s.title}`} className="h-6 flex-1">
                <span className="block h-1 rounded-full bg-jet/10" />
              </button>
            ))}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-blue to-brand-green"
              style={{ width: fill }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
