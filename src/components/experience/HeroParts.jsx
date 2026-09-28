import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { introDelay } from "@/components/motion/intro";

/**
 * Counts up from zero once the figure is on screen — so a number further down
 * the page is still counting when the visitor reaches it. Plain rAF.
 */
export function CountUp({ value, suffix = "", duration = 1600, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInViewOnce(ref, { margin: "0px 0px -8% 0px" });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return undefined;
    }
    // In a hero, wait for the curtain to lift as well.
    const wait = delay + introDelay() * 1000;
    let frame;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, Math.max(0, (now - start) / duration));
        setShown(Math.round(value * (1 - Math.pow(1 - t, 4))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, wait);

    // Safety net: if frames never arrive (background tab, throttled renderer),
    // the real figure still lands rather than the page showing a zero.
    const settle = window.setTimeout(() => setShown(value), wait + duration + 400);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(settle);
      cancelAnimationFrame(frame);
    };
  }, [inView, value, duration, delay]);

  return (
    <span ref={ref} className="tabular">
      {shown.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
