import { useState } from "react";
import clsx from "clsx";
import { introDelay } from "./intro";
import { SplitText, Eyebrow } from "./Text";

const GLOWS = {
  blueRight: "absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-brand-blue/12 blur-[120px]",
  greenLeft: "absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-brand-green/12 blur-[120px]",
};

/** The faint grid and two brand glows every page opens on. */
export function HeroBackdrop({ focus = "40% 40%" }) {
  const mask = `radial-gradient(ellipse 75% 65% at ${focus}, #000 25%, transparent 78%)`;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="hero-grid absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5,36,57,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(5,36,57,.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
      <div className={GLOWS.blueRight} />
      <div className={GLOWS.greenLeft} />
    </div>
  );
}

/** The gradient highlight used on the last words of every hero headline. */
export const HIGHLIGHT = "bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent";

/** Hero eyebrow + headline, timed to the curtain. */
export function HeroHeading({ eyebrow, lines, className }) {
  return (
    <>
      {eyebrow ? <Eyebrow trigger="mount">{eyebrow}</Eyebrow> : null}
      <SplitText
        as="h1"
        trigger="mount"
        delay={0.08}
        stagger={0.06}
        lines={lines}
        className={clsx("mt-5 font-extrabold leading-[1.03] tracking-[-0.045em] text-jet", className)}
      />
    </>
  );
}

/**
 * Anything else in a hero: rises in after the headline. CSS rather than JS,
 * so the first screen never waits on a library to become readable.
 */
export function Enter({ as: Tag = "div", delay = 0, className, children, ...rest }) {
  const [start] = useState(() => introDelay());
  return (
    <Tag className={clsx("rise", className)} style={{ animationDelay: `${start + delay}s` }} {...rest}>
      {children}
    </Tag>
  );
}

/** "Scroll to explore" — only where a hero fills the screen. */
export function ScrollCue({ href }) {
  return (
    <a
      href={href}
      className="group relative mx-auto mb-5 hidden flex-col items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-brand-blue lg:flex"
    >
      Scroll to explore
      <span className="relative flex h-11 w-7 justify-center rounded-full border border-hairline bg-white pt-2 transition-colors group-hover:border-brand-blue">
        <span className="scroll-cue-dot h-2 w-1 rounded-full bg-current" />
      </span>
    </a>
  );
}
