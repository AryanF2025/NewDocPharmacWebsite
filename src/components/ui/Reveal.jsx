import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const DIRECTIONS = {
  up: "reveal-up",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

/**
 * The site's scroll reveal: content slides into place as it comes into view,
 * once. `from` picks the direction — "up" (default), "left", "right" or
 * "scale".
 *
 * Deliberately not tied to the animation library: content must never be left
 * invisible if a scroll trigger misfires, so a fallback timer always reveals
 * it. The motion itself is CSS, which reduced-motion collapses to a cut.
 */
export function Reveal({ children, delay = 0, from = "up", className, as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { rootMargin: "-6% 0px -6% 0px" }
    );
    io.observe(el);

    // Safety net: never leave content hidden.
    const timer = window.setTimeout(() => setShown(true), 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={clsx(className, shown && (DIRECTIONS[from] ?? DIRECTIONS.up))}
      style={shown ? { animationDelay: `${delay}s` } : { opacity: 0 }}
    >
      {children}
    </Tag>
  );
}

/** A page's opening block: eyebrow, headline, supporting line. */
export function PageHero({ eyebrow, headline, sub, children, className = "" }) {
  return (
    <section className={`relative overflow-hidden bg-white ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(5,36,57,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(5,36,57,.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 60% at 40% 30%, #000 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 40% 30%, #000 20%, transparent 75%)",
          }}
        />
        <div className="absolute -right-40 -top-24 h-[30rem] w-[30rem] rounded-full bg-brand-blue/10 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-brand-green/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[84rem] px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
        <p className="rise text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-jet">
          <span className="block overflow-hidden pb-1">
            <span className="wipe block">{headline}</span>
          </span>
        </h1>
        {sub ? (
          <p
            className="rise mt-5 max-w-2xl text-[clamp(1.02rem,1.4vw,1.2rem)] leading-relaxed text-ink-soft"
            style={{ animationDelay: ".2s" }}
          >
            {sub}
          </p>
        ) : null}
        {children ? (
          <div className="rise mt-9" style={{ animationDelay: ".3s" }}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
