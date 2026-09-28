import Lenis from "lenis";

/**
 * One Lenis instance for the whole site: inertial wheel scrolling, so the
 * scroll-linked scenes glide rather than step. Scroll position stays native,
 * which keeps sticky sections and `useScroll` working unchanged.
 *
 * Skipped entirely for visitors who prefer reduced motion.
 */

let lenis = null;
let frame = 0;

export function startSmoothScroll() {
  if (lenis || typeof window === "undefined") return lenis;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  const loop = (time) => {
    lenis?.raf(time);
    frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);
  return lenis;
}

export const getLenis = () => lenis;

export function stopSmoothScroll() {
  cancelAnimationFrame(frame);
  lenis?.destroy();
  lenis = null;
}

/** Scroll to a y position or an element, through Lenis when it's running. */
export function scrollToTarget(target, { immediate = false } = {}) {
  const el = typeof target === "number" ? null : target;
  const offset = el ? -parseFloat(getComputedStyle(el).scrollMarginTop || "0") : 0;

  if (lenis) {
    lenis.scrollTo(target, { immediate, offset, force: true });
    return;
  }
  const top = el ? el.getBoundingClientRect().top + window.scrollY + offset : target;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: immediate || reduce ? "auto" : "smooth" });
}

/** Freeze page scroll under dialogs and the mobile menu. */
export function lockScroll(locked) {
  document.body.style.overflow = locked ? "hidden" : "";
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
