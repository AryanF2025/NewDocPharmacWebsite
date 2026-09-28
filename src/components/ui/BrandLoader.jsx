/**
 * The page loader, told as an order being fulfilled.
 *
 * The two halves of the mark draw themselves in and fill with their brand
 * colours, a rider travels the infinity loop, and the status underneath runs
 * through the fulfilment steps. Pure SVG + CSS: it has to work before anything
 * else has loaded. It stays invisible for the first moment, so a fast load
 * never flashes it.
 */

const GREEN =
  "M36.1311 17.1057C39.7095 17.1057 40.9131 18.7629 40.8946 20.3785C40.8436 23.8736 37.6402 23.8366 35.1358 22.8876C32.8722 22.0265 30.1039 20.3924 27.0949 18.6611C23.6091 16.6613 18.2115 13.4903 13.0823 12.2265C8.3698 11.0646 3.67116 11.4766 1.25472 16.1752C-0.504378 19.6008 -0.286805 23.9615 1.12047 27.0492C0.791799 21.6747 2.05094 16.8789 5.23583 15.0226C8.43461 13.1662 11.564 14.018 14.7257 15.4623C20.9612 18.3047 31.7797 27.0492 37.1171 27.0492C46.5653 27.3455 47.0884 13.1246 36.1311 13.1246H32.7888V9.77767C32.7888 4.94015 28.8355 0.986816 24.0072 0.986816C19.179 0.986816 15.221 4.94015 15.221 9.77767V11.6293C16.5681 12.0599 17.8967 12.583 19.2114 13.1709V9.77767C19.2114 7.14828 21.3779 4.97719 24.0119 4.97719C26.6459 4.97719 28.8077 7.14365 28.8077 9.77767V17.115H36.1404L36.1311 17.1057Z";
const BLUE =
  "M11.8687 27.0999C8.29035 27.0999 7.08676 25.4427 7.10527 23.8271C7.15619 20.3321 10.3596 20.3691 12.864 21.3181C15.1277 22.1791 17.8959 23.8132 20.9049 25.5445C24.3907 27.5443 29.7884 30.7153 34.9175 31.9791C39.63 33.141 44.3287 32.729 46.7451 28.0304C48.5042 24.6048 48.2867 20.2441 46.8794 17.1564C47.208 22.5309 45.9489 27.3268 42.764 29.1831C39.5652 31.0394 36.4359 30.1876 33.2741 28.7433C27.0386 25.901 16.2202 17.1564 10.8827 17.1564C1.4345 16.8602 0.911401 31.0811 11.8687 31.0811H15.211V34.428C15.211 39.2655 19.1643 43.2188 23.9926 43.2188C28.8209 43.2188 32.7788 39.2655 32.7788 34.428V32.5763C31.4317 32.1458 30.1031 31.6227 28.7885 31.0348V34.428C28.7885 37.0574 26.622 39.2284 23.988 39.2284C21.354 39.2284 19.1921 37.062 19.1921 34.428V27.0907H11.8595L11.8687 27.0999Z";

/** The infinity loop the rider follows — through the centre of the mark. */
const LOOP = "M24 22 C 30 14, 42 14, 42 22 C 42 30, 30 30, 24 22 C 18 14, 6 14, 6 22 C 6 30, 18 30, 24 22 Z";

const STEPS = ["Picking", "Verifying", "Packing", "On its way"];

export function BrandLoader({ className = "min-h-[100svh]" }) {
  return (
    <div role="status" aria-live="polite" className={`brand-loader flex flex-col items-center justify-center ${className}`}>
      <svg viewBox="-2 -2 52 48" className="h-20 w-20 overflow-visible md:h-24 md:w-24" aria-hidden>
        <path d={GREEN} pathLength="1" className="bl-half bl-green" fillRule="evenodd" />
        <path d={BLUE} pathLength="1" className="bl-half bl-blue" fillRule="evenodd" />
        <path id="bl-loop" d={LOOP} fill="none" stroke="none" />
        <circle r="1.9" className="bl-rider">
          <animateMotion dur="1.8s" repeatCount="indefinite" rotate="auto">
            <mpath href="#bl-loop" />
          </animateMotion>
        </circle>
      </svg>

      {/* The status runs through the fulfilment steps, one after another. */}
      <p className="mt-6 flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
        <span className="relative block h-[1.2em] w-[7.5rem] overflow-hidden text-left">
          {STEPS.map((step, i) => (
            <span key={step} className="bl-step absolute inset-x-0 top-0" style={{ animationDelay: `${i * 0.7}s` }}>
              {step}…
            </span>
          ))}
        </span>
      </p>
      <span className="sr-only">Loading</span>
    </div>
  );
}
