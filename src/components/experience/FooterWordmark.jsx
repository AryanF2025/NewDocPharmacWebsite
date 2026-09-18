import { useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const LETTERS = [..."DocPharma"];

/**
 * The closing wordmark, in monochrome, showing its top three quarters — the rest
 * sits below the footer's bottom edge.
 *
 * Its font size is measured against the container so the word always spans
 * the full width exactly — never clipped at the edge. Letters rise from below
 * the footer's bottom edge, one after another, when the footer arrives, and
 * each lifts slightly under the cursor.
 */
export function FooterWordmark() {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const [size, setSize] = useState(160);
  const inView = useInView(wrapRef, { once: true, margin: "0px 0px -10% 0px" });

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

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden"
      style={{ height: Math.round(size * (size < 140 ? 1 : 0.62)) }}
      aria-label="DocPharma"
      role="img"
    >
      <p
        ref={textRef}
        aria-hidden
        className="flex w-max select-none font-extrabold leading-[0.8] tracking-[-0.055em]"
        style={{ fontSize: size }}
      >
        {LETTERS.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block text-white"
            initial={{ y: "60%" }}
            animate={inView ? { y: "0%" } : { y: "60%" }}
            whileHover={{ y: "-6%" }}
            transition={{ duration: 0.9, delay: inView ? i * 0.05 : 0, ease: [0.22, 1, 0.36, 1] }}
          >
            {char}
          </motion.span>
        ))}
      </p>
      {/* The crop only needs softening where the letters are actually cut. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/5 bg-gradient-to-t from-jet to-transparent sm:block" />
    </div>
  );
}
