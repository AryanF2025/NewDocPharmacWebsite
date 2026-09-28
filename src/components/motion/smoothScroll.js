/**
 * Scrolling helpers. Scrolling itself is native — no inertia layer — so the
 * page responds the instant the wheel or finger moves.
 */

/** Scroll to a y position or an element, honouring its scroll-margin. */
export function scrollToTarget(target, { immediate = false } = {}) {
  const el = typeof target === "number" ? null : target;
  const offset = el ? parseFloat(getComputedStyle(el).scrollMarginTop || "0") : 0;
  const top = el ? el.getBoundingClientRect().top + window.scrollY - offset : target;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: immediate || reduce ? "instant" : "smooth" });
}

/** Freeze page scroll under dialogs and the mobile menu. */
export function lockScroll(locked) {
  document.body.style.overflow = locked ? "hidden" : "";
}
