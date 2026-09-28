import { useRef } from "react";
import clsx from "clsx";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useInViewOnce } from "./useInViewOnce";

/**
 * A photo that wipes open as it arrives, then drifts slower than the page
 * while it passes — the depth cue the rest of the site's imagery shares.
 * The frame (rounding, aspect, shadow) comes from `className`.
 */
export function ParallaxImage({ src, alt = "", className, imgClassName, strength = 10, children }) {
  const ref = useRef(null);
  const shown = useInViewOnce(ref, { margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={clsx("img-wipe relative overflow-hidden bg-jet", shown && "is-in", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={reduce ? undefined : { y, scale: 1 + (strength * 2.4) / 100 }}
        className={clsx("absolute inset-0 h-full w-full object-cover", imgClassName)}
      />
      {children}
    </div>
  );
}
