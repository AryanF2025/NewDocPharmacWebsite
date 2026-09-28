import { useRef } from "react";
import clsx from "clsx";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { HeroBackdrop, HeroHeading, Enter } from "@/components/motion/Hero";

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
 * It waits for the element to actually reach the screen (the old fallback
 * timer revealed everything 1.5s after load, so most reveals played unseen).
 * Anything already scrolled past shows at once, so nothing is left hidden.
 */
export function Reveal({ children, delay = 0, from = "up", className, as: Tag = "div" }) {
  const ref = useRef(null);
  const shown = useInViewOnce(ref);

  return (
    <Tag
      ref={ref}
      className={clsx(className, "reveal", shown && (DIRECTIONS[from] ?? DIRECTIONS.up))}
      style={shown ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** A page's opening block: eyebrow, headline, supporting line. */
export function PageHero({ eyebrow, headline, sub, children, className = "" }) {
  return (
    <section className={`relative overflow-hidden bg-white ${className}`}>
      <HeroBackdrop focus="40% 30%" />

      <div className="relative mx-auto max-w-[84rem] px-5 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36">
        <HeroHeading eyebrow={eyebrow} lines={headline} className="max-w-4xl text-[clamp(2.2rem,5vw,4rem)]" />
        {sub ? (
          <Enter as="p" delay={0.3} className="mt-5 max-w-2xl text-[clamp(1.02rem,1.4vw,1.2rem)] leading-relaxed text-ink-soft">
            {sub}
          </Enter>
        ) : null}
        {children ? (
          <Enter delay={0.42} className="mt-9">
            {children}
          </Enter>
        ) : null}
      </div>
    </section>
  );
}
