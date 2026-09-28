import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { LogoMark } from "@/components/ui/Logo";
import { scheduleReveal } from "./intro";
import { getLenis } from "./smoothScroll";

const COVER_MS = 520;
const LIFT_MS = 820;
const INTRO_HOLD_MS = 900;
/** How far into the lift the top of the page is uncovered. */
const REVEAL_LAG_MS = 380;

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The brand curtain.
 *
 * First load: a jet panel with the mark and wordmark, a short progress line,
 * then the panel wipes upward to reveal the page — a preloader that is also
 * the brand's first impression.
 *
 * Between pages: an internal link click is held while the panel wipes up over
 * the old page; the route changes underneath it, then it wipes away upward.
 * Back/forward and in-page anchors skip it, so history stays instant.
 */
export function PageCurtain() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // Set during the first render, before the page below it renders, so the
  // hero entrances already know to wait for the lift.
  const [phase, setPhase] = useState(() => {
    if (prefersReduced()) return "idle";
    scheduleReveal(INTRO_HOLD_MS + REVEAL_LAG_MS);
    return "intro";
  });
  const [label, setLabel] = useState("");
  const busy = useRef(false);

  // First load: hold on the logo, then lift.
  useEffect(() => {
    if (phase !== "intro") return undefined;
    getLenis()?.stop();
    const id = window.setTimeout(() => {
      getLenis()?.start();
      setPhase("idle");
    }, INTRO_HOLD_MS + LIFT_MS);
    return () => window.clearTimeout(id);
    // Runs once, on the first render only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hold internal link clicks until the curtain has covered the page.
  useEffect(() => {
    if (prefersReduced()) return undefined;

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const a = event.target.closest?.("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page: anchors, reloads
      if (busy.current) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      busy.current = true;
      setLabel(a.dataset.curtain || a.textContent.replace(/[→↗]/g, "").trim().slice(0, 32));
      setPhase("cover");
      getLenis()?.stop();

      window.setTimeout(() => {
        scheduleReveal(REVEAL_LAG_MS);
        navigate(url.pathname + url.search + url.hash);
        setPhase("lift");
        getLenis()?.start();
        window.setTimeout(() => {
          setPhase("idle");
          busy.current = false;
        }, LIFT_MS);
      }, COVER_MS);
    };

    // Capture phase, so this runs before the router's own link handler.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  // A route change that didn't come through the curtain (back/forward) ends
  // any stray state rather than leaving the panel up.
  useEffect(() => {
    if (!busy.current && phase === "cover") setPhase("idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (phase === "idle") return null;

  return (
    <div aria-hidden className={clsx("curtain", `curtain--${phase}`)}>
      <div className="curtain-inner">
        <LogoMark tone="mono" className="curtain-mark h-12 w-12 text-white md:h-14 md:w-14" />
        {phase === "intro" ? (
          <>
            <p className="curtain-word mt-6 overflow-hidden text-[clamp(2rem,5vw,3.4rem)] font-extrabold tracking-[-0.045em] text-white">
              <span className="block">
                Doc<span className="text-brand-green">Pharma</span>
              </span>
            </p>
            <p className="curtain-tag mt-2 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-white/50">
              Elevating healthcare together
            </p>
            <span className="curtain-bar mt-8 block h-px w-40 overflow-hidden bg-white/15">
              <span className="block h-full w-full origin-left bg-gradient-to-r from-brand-blue to-brand-green" />
            </span>
          </>
        ) : (
          <p className="curtain-label mt-5 text-[0.8rem] font-bold uppercase tracking-[0.22em] text-white/60">{label}</p>
        )}
      </div>
    </div>
  );
}
