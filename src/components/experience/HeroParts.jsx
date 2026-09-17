import { useEffect, useState } from "react";

/** Counts up from zero once, on mount. Plain rAF — no animation library needed. */
export function CountUp({ value, suffix = "", duration = 1600, delay = 500 }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return undefined;
    }
    let frame;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, Math.max(0, (now - start) / duration));
        setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [value, duration, delay]);

  return (
    <span className="tabular">
      {shown.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
