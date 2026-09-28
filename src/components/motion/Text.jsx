import { useRef, useState } from "react";
import clsx from "clsx";
import { Reveal } from "@/components/ui/Reveal";
import { useInViewOnce } from "./useInViewOnce";
import { introDelay } from "./intro";

/**
 * Normalises `lines` into words. A line is a string, or an array of strings
 * and `{ text, className }` segments (used for the gradient highlight).
 */
function toWords(lines) {
  let i = 0;
  return lines.map((line) => {
    const segments = Array.isArray(line) ? line : [line];
    return segments.flatMap((segment) => {
      const text = typeof segment === "string" ? segment : segment.text;
      const className = typeof segment === "string" ? undefined : segment.className;
      return text
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => ({ word, className, i: i++ }));
    });
  });
}

function plain(lines) {
  return lines
    .map((line) => (Array.isArray(line) ? line.map((s) => (typeof s === "string" ? s : s.text)).join(" ") : line))
    .join(" ");
}

/**
 * The site's headline reveal: every word rises out of its own mask, unblurring
 * as it lands, on a stagger. `trigger="view"` waits for the scroll;
 * `trigger="mount"` plays as the page opens (after the curtain lifts).
 */
export function SplitText({ lines, as: Tag = "h2", className, trigger = "view", delay = 0, stagger = 0.045 }) {
  const ref = useRef(null);
  const seen = useInViewOnce(ref);
  const [start] = useState(() => (trigger === "mount" ? introDelay() : 0));
  const shown = trigger === "mount" || seen;
  const rows = toWords(Array.isArray(lines) ? lines : [lines]);

  return (
    <Tag
      ref={ref}
      aria-label={plain(Array.isArray(lines) ? lines : [lines])}
      className={clsx("split", shown && "is-in", className)}
      style={{ "--d": `${start + delay}s`, "--stagger": `${stagger}s` }}
    >
      {rows.map((words, r) => (
        <span key={r} aria-hidden className={rows.length > 1 ? "block" : undefined}>
          {words.map(({ word, className: wordClass, i }, w) => (
            <span key={i}>
              <span className="split-mask">
                <span className={clsx("split-word", wordClass)} style={{ "--i": i }}>
                  {word}
                </span>
              </span>
              {w < words.length - 1 ? " " : null}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/** Small uppercase label that slides in above a headline. */
export function Eyebrow({ children, tone = "light", className, trigger = "view", delay = 0 }) {
  const ref = useRef(null);
  const seen = useInViewOnce(ref);
  const [start] = useState(() => (trigger === "mount" ? introDelay() : 0));
  const shown = trigger === "mount" || seen;

  return (
    <p
      ref={ref}
      className={clsx(
        "eyebrow-line flex items-center text-[0.8rem] font-bold uppercase tracking-[0.16em]",
        tone === "dark" ? "text-brand-green" : "text-brand-blue",
        shown && "is-in",
        className
      )}
      style={{ "--d": `${start + delay}s` }}
    >
      <span className="eyebrow-text">{children}</span>
    </p>
  );
}

export const TITLE_CLASS = "text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.04em]";

/**
 * Every section opens the same way: eyebrow, headline, optional line of
 * support. One component so the rhythm is identical on every page.
 */
export function SectionHeader({ eyebrow, title, sub, tone = "light", align = "left", className, titleClassName, children }) {
  const dark = tone === "dark";
  const center = align === "center";

  return (
    <div className={clsx(center && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Eyebrow tone={tone} className={center ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <SplitText
        lines={title}
        className={clsx(
          "mt-4 max-w-3xl",
          TITLE_CLASS,
          dark ? "text-white" : "text-jet",
          center && "mx-auto",
          titleClassName
        )}
      />
      {sub ? (
        <Reveal from="up" delay={0.15}>
          <p
            className={clsx(
              "mt-5 max-w-2xl text-[1.05rem] leading-relaxed",
              dark ? "text-white/65" : "text-ink-soft",
              center && "mx-auto"
            )}
          >
            {sub}
          </p>
        </Reveal>
      ) : null}
      {children}
    </div>
  );
}
