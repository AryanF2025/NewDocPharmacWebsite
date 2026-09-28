/**
 * When the page curtain finishes lifting. Hero entrances read this on mount so
 * they play as the page is revealed, not unseen underneath the curtain.
 */

let revealAt = 0;

/** Called by the curtain: the new page becomes visible `ms` from now. */
export function scheduleReveal(ms) {
  revealAt = performance.now() + ms;
}

/** Seconds until the page is visible — the delay a hero entrance should add. */
export function introDelay() {
  if (typeof performance === "undefined") return 0;
  return Math.max(0, revealAt - performance.now()) / 1000;
}
