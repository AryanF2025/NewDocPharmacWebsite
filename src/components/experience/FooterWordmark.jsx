import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const LETTERS = [..."DocPharma"];

/** A heartbeat strip: flat line, a beat, flat line — repeated across the width. */
const BEAT = "h60 l6 -8 l6 8 h10 l5 6 l7 -30 l7 38 l6 -14 h12 l8 -9 l8 9 h60";
const ECG = `M0 50 ${Array.from({ length: 6 }, () => BEAT).join(" ")}`;

/**
 * The closing wordmark, in monochrome, showing its top three quarters — the rest
 * sits below the footer's bottom edge.
 *
 * Its font size is measured against the container so the word always spans
 * the full width exactly — never clipped at the edge. Letters rise from below
 * the footer's bottom edge, one after another, when the footer arrives; the
 * letter under the cursor lifts, its neighbours a little. Behind the word a
 * heartbeat line runs across on a loop.
 */
export function FooterWordmark() {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const [size, setSize] = useState(160);
  const inView = useInView(wrapRef, { once: true, margin: "0px 0px -10% 0px" });
  const [hovered, setHovered] = useState(-1);
  // After the letters have risen, hover lifts are instant rather than staggered.
  const [arrived, setArrived] = useState(false);
  useEffect(() => {
    if (!inView) return undefined;
    const id = window.setTimeout(() => setArrived(true), 1400);
    return () => window.clearTimeout(id);
  }, [inView]);

  useLayoutEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current;
      const text = textRef.current;
      if (!wrap || !text) return;
      const probe = 100;
      text.style.fontSize = `${probe}px`;
      const next = Math.floor(probe * (wrap.clientWidth / text.scrollWidth) * 0.995);
      // Write the fitted size straight back: if it matches the previous state,
      // React will not re-apply the style after the probe changed it.
      text.style.fontSize = `${next}px`;
      setSize(next);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrapRef.current);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  // One copy of the letters; both layers rise together. Without a colour
  // class, "Doc" takes the logo blue and "Pharma" the logo green.
  const letters = (colour) =>
    LETTERS.map((char, i) => (
      <motion.span
        key={i}
        className={`inline-block ${colour ?? (i < 3 ? "text-brand-blue-mark" : "text-brand-green")}`}
        initial={{ y: "60%" }}
        animate={inView ? { y: hovered === i ? "-9%" : Math.abs(hovered - i) === 1 ? "-3%" : "0%" } : { y: "60%" }}
        transition={
          arrived
            ? { type: "spring", stiffness: 420, damping: 22 }
            : { duration: 0.9, delay: inView ? i * 0.05 : 0, ease: [0.22, 1, 0.36, 1] }
        }
      >
        {char}
      </motion.span>
    ));

  return (
    <div
      ref={wrapRef}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const r = wrapRef.current.getBoundingClientRect();
        wrapRef.current.style.setProperty("--mx", `${event.clientX - r.left}px`);
        wrapRef.current.style.setProperty("--my", `${event.clientY - r.top}px`);
        // Which letter is under the cursor.
        const spans = [...textRef.current.children];
        setHovered(spans.findIndex((el) => {
          const b = el.getBoundingClientRect();
          return event.clientX >= b.left && event.clientX < b.right;
        }));
      }}
      onPointerLeave={() => setHovered(-1)}
      className="wordmark relative overflow-hidden"
      style={{ height: Math.round(size * (size < 140 ? 1 : 0.62)) }}
      aria-label="DocPharma"
      role="img"
    >
      {/* A heartbeat runs behind the word, on a loop. */}
      <svg
        aria-hidden
        viewBox="0 0 1146 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-[38%] h-[30%] w-full overflow-visible"
      >
        <path d={ECG} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <path d={ECG} pathLength="1" fill="none" stroke="url(#wm-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className="wm-pulse" />
        <defs>
          <linearGradient id="wm-ink" x1="0" x2="1">
            <stop offset="0" stopColor="#0291d7" />
            <stop offset="1" stopColor="#8fc124" />
          </linearGradient>
        </defs>
      </svg>
      <p
        ref={textRef}
        aria-hidden
        className="relative flex w-max select-none font-extrabold leading-[0.8] tracking-[-0.055em]"
        style={{ fontSize: size }}
      >
        {letters("text-white")}
      </p>
      {/* The same word in the logo's colours, revealed by a soft spotlight that
          follows the cursor. Touch screens have no cursor, so there it shows
          in full colour. */}
      <p
        aria-hidden
        className="wordmark-colour pointer-events-none absolute left-0 top-0 flex w-max select-none font-extrabold leading-[0.8] tracking-[-0.055em]"
        style={{ fontSize: size }}
      >
        {letters()}
      </p>
      {/* The crop only needs softening where the letters are actually cut. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/5 bg-gradient-to-t from-jet to-transparent sm:block" />
    </div>
  );
}
