import { useEffect, useState } from "react";

/**
 * Rotating announcement pill for the top of the hero.
 * Each item slides in from the right and leaves to the left; hovering pauses.
 * Figures match the ones used elsewhere on the site.
 */
const NEWS = [
  { tag: "Funding", text: "$2M Pre-Series A led by Equentis", tone: "bg-brand-green text-white" },
  { tag: "Milestone", text: "10 lakh+ orders delivered by our own riders", tone: "bg-brand-blue text-white" },
  { tag: "Network", text: "Live across 12+ cities and 19,000+ pincodes", tone: "bg-jet text-white" },
  { tag: "Scale", text: "50+ licensed darkstores and growing", tone: "bg-brand-green text-white" },
];

const INTERVAL_MS = 3400;

export function NewsTicker({ className = "" }) {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = window.setInterval(() => {
      setIndex((i) => {
        setPrevious(i);
        return (i + 1) % NEWS.length;
      });
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  // The outgoing headline only needs to exist for its slide-out.
  useEffect(() => {
    if (previous === null) return undefined;
    const id = window.setTimeout(() => setPrevious(null), 600);
    return () => window.clearTimeout(id);
  }, [previous]);

  const item = NEWS[index];

  return (
    <div
      className={`inline-flex max-w-full items-center gap-2 overflow-hidden rounded-full border border-hairline bg-white py-1.5 pl-1.5 pr-3 shadow-[0_6px_20px_-12px_rgba(5,36,57,.25)] ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-live="polite"
    >
      <span
        key={`tag-${index}`}
        className={`news-pop shrink-0 rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.08em] ${item.tone}`}
      >
        {item.tag}
      </span>

      {/* Fixed-height window the headlines slide through, right to left. CSS, so it never stalls. */}
      <span className="relative block h-6 w-[min(25rem,62vw)] overflow-hidden">
        {previous !== null ? (
          <span key={`out-${previous}`} className="news-out absolute inset-0 truncate text-[0.9rem] font-semibold leading-6 text-jet" aria-hidden>
            {NEWS[previous].text}
          </span>
        ) : null}
        <span key={`in-${index}`} className="news-in absolute inset-0 truncate text-[0.9rem] font-semibold leading-6 text-jet">
          {item.text}
        </span>
      </span>

      {/* Progress dots */}
      <span className="hidden shrink-0 items-center gap-1 sm:flex" aria-hidden>
        {NEWS.map((n, i) => (
          <span
            key={n.text}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-4 bg-brand-blue" : "w-1.5 bg-jet/15"}`}
          />
        ))}
      </span>
    </div>
  );
}
