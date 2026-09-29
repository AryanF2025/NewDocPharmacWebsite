import { LogoMark } from "./Logo";

/**
 * The page loader: a heartbeat.
 *
 * An ECG trace runs left to right, its leading dot glowing, and the DocPharma
 * mark beats as the trace spikes — a strong pulse, then a softer echo. Pure
 * SVG + CSS, so it works before anything else has loaded, and it stays hidden
 * for the first moment so a fast load never flashes it.
 */

/** One heartbeat on a 240×40 strip: baseline, P wave, the QRS spike, T wave. */
const BEAT = "M0 20 H72 L80 20 L86 13 L92 20 L104 20 L109 25 L116 3 L123 36 L129 20 L142 20 L150 12 L160 20 H240";

export function BrandLoader({ className = "min-h-[100svh]" }) {
  return (
    <div role="status" aria-live="polite" className={`brand-loader flex flex-col items-center justify-center ${className}`}>
      <LogoMark className="hb-mark h-14 w-14 md:h-16 md:w-16" />

      <svg viewBox="0 0 240 40" className="mt-7 h-10 w-60 overflow-visible md:w-72" aria-hidden>
        <defs>
          <linearGradient id="hb-ink" x1="0" x2="1">
            <stop offset="0" stopColor="#0291d7" />
            <stop offset="1" stopColor="#8fc124" />
          </linearGradient>
        </defs>
        {/* The monitor's resting line */}
        <path d={BEAT} fill="none" stroke="#052439" strokeOpacity=".08" strokeWidth="2" strokeLinejoin="round" />
        {/* The trace, drawing left to right */}
        <path d={BEAT} pathLength="1" fill="none" stroke="url(#hb-ink)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="hb-trace" />
        {/* Its leading dot, travelling the same path in step */}
        <circle r="3.4" className="hb-dot">
          <animateMotion dur="1.8s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear" path={BEAT} />
        </circle>
      </svg>

      <p className="mt-6 text-[1.05rem] font-bold tracking-[-0.02em]">
        <span className="text-brand-blue-mark">Doc</span>
        <span className="text-brand-green">Pharma</span>
      </p>
      <p className="mt-1 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-ink-faint">
        Loading
        <span className="hb-ellipsis" aria-hidden>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  );
}
