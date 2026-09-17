import { useEffect, useState } from "react";

/**
 * Rotating announcement pill for the top of the hero.
 * Each item slides in from the right and leaves to the left. It rotates on its
 * own, pauses while hovered, and visitors can jump to any story with the dots
 * or step forward with the arrow.
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

  const goTo = (next) => {
    if (next === index) return;
    setPrevious(index);
    setIndex(next);
  };

  // Restarts whenever the story changes, so a manual pick gets its full time on screen.
  useEffect(() => {
    if (paused) return undefined;
    const id = window.setTimeout(() => {
      setPrevious(index);
      setIndex((index + 1) % NEWS.length);
    }, INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [paused, index]);

  // The outgoing headline only needs to exist for its slide-out.
  useEffect(() => {
    if (previous === null) return undefined;
    const id = window.setTimeout(() => setPrevious(null), 600);
    return () => window.clearTimeout(id);
  }, [previous]);

  const item = NEWS[index];

  return (
    <div
      className={`inline-flex max-w-full items-center gap-2 overflow-hidden rounded-[1.25rem] border border-hairline bg-white py-1.5 pl-1.5 pr-1.5 sm:rounded-full shadow-[0_6px_20px_-12px_rgba(5,36,57,.25)] ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Company news"
    >
      <span
        key={`tag-${index}`}
        className={`news-pop hidden w-[5.4rem] shrink-0 rounded-full sm:inline-block py-1 text-center text-[0.68rem] font-bold uppercase tracking-[0.08em] ${item.tone}`}
      >
        {item.tag}
      </span>

      {/* Fixed-height window the headlines slide through, right to left. CSS, so it never stalls. */}
      <span className="relative ml-2 block h-10 w-[calc(100vw-7.5rem)] max-w-[24rem] overflow-hidden sm:ml-0 sm:h-6" aria-live="polite">
        {previous !== null ? (
          <span
            key={`out-${previous}-${index}`}
            className="news-out absolute inset-0 flex items-center text-[0.84rem] font-semibold leading-5 text-jet sm:block sm:truncate sm:text-[0.9rem] sm:leading-6"
            aria-hidden
          >
            {NEWS[previous].text}
          </span>
        ) : null}
        <span key={`in-${index}`} className="news-in absolute inset-0 flex items-center text-[0.84rem] font-semibold leading-5 text-jet sm:block sm:truncate sm:text-[0.9rem] sm:leading-6">
          {item.text}
        </span>
      </span>

      {/* Dots: jump to any story */}
      <span className="hidden shrink-0 items-center sm:flex">
        {NEWS.map((n, i) => (
          <button
            key={n.text}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show news ${i + 1} of ${NEWS.length}: ${n.tag}`}
            aria-current={i === index}
            className="group flex h-6 items-center px-[3px]"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-4 bg-brand-blue" : "w-1.5 bg-jet/15 group-hover:bg-jet/40"
              }`}
            />
          </button>
        ))}
      </span>

      {/* Next story */}
      <button
        type="button"
        onClick={() => goTo((index + 1) % NEWS.length)}
        aria-label="Next news"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-floral text-jet transition-colors hover:bg-brand-blue hover:text-white"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
          <path d="M4.5 2.5 8 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
