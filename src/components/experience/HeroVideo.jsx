import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { fmt } from "@/components/directions/shared";
import wideMp4 from "@/assets/video/hero.mp4";
import wideWebm from "@/assets/video/hero.webm";
import widePoster from "@/assets/images/hero-poster.webp";
import phoneMp4 from "@/assets/video/hero-phone.mp4";
import phoneWebm from "@/assets/video/hero-phone.webm";
import phonePoster from "@/assets/images/hero-poster-phone.webp";

/**
 * The darkstore film.
 *
 * The wide clip (1920×878) carries a black band across its left 405px, left
 * room for a text card in the old layout. We crop exactly that band and
 * nothing else — the stage captions in the top-right corner stay fully visible.
 * Phones get the separate portrait cut.
 *
 * The clip is a 10-second story, so the live order card reads the video's own
 * time: the stage it shows is the stage on screen.
 */
const WIDE_CONTENT_RATIO = (1920 - 405) / 878; // visible area after the crop
const WIDE_SCALE = 1920 / (1920 - 405); // video width relative to the frame

const STAGES = ["Picked from the shelf", "Prescription verified", "Packed & sealed", "Rider assigned", "Delivered at the door"];

export function useIsWide() {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide;
}

export function HeroVideo({ className, showCard = true, rounded = true, ratio }) {
  const wide = useIsWide();
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    const onTime = () => video.duration && setProgress(video.currentTime / video.duration);
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, [wide]);

  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted) video.play().catch(() => {});
  };

  const stage = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));
  const clock = Math.round(progress * 30 * 60);

  return (
    <div
      className={clsx("relative w-full overflow-hidden bg-jet", rounded && "rounded-[1.75rem]", className)}
      style={{ aspectRatio: wide ? ratio ?? WIDE_CONTENT_RATIO : 428 / 510 }}
      data-cursor="media"
      data-cursor-label={muted ? "Sound on" : "Sound off"}
      onClick={toggleSound}
    >
      <video
        key={wide ? "wide" : "phone"}
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={wide ? widePoster : phonePoster}
        aria-label="DocPharma darkstore: a pharmacist picks, verifies and packs an order, and a rider delivers it"
        className={clsx("absolute top-0 h-full max-w-none object-cover", wide ? "right-0 object-right" : "left-0 w-full")}
        style={wide ? { width: `${WIDE_SCALE * 100}%` } : undefined}
      >
        <source src={wide ? wideWebm : phoneWebm} type="video/webm" />
        <source src={wide ? wideMp4 : phoneMp4} type="video/mp4" />
      </video>

      {showCard ? (
        <div className="absolute bottom-4 left-4 w-[15.5rem] rounded-2xl border border-white/60 bg-white/88 p-3.5 shadow-[0_24px_50px_-24px_rgba(5,36,57,.55)] backdrop-blur-xl sm:bottom-5 sm:left-5">
          <div className="flex items-center justify-between">
            <span className="text-[0.64rem] font-bold uppercase tracking-[0.14em] text-ink-faint">Order DP-48216</span>
            <span className="flex items-center gap-1.5 rounded-full bg-peppermint px-2 py-0.5 text-[0.62rem] font-bold text-[#5f8a0f]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" /> Live
            </span>
          </div>
          <div className="mt-2 flex items-end justify-between">
            <span className="tabular text-[1.75rem] font-extrabold leading-none tracking-tight text-jet">{fmt(clock)}</span>
            <span className="text-[0.68rem] text-ink-faint">of 30:00</span>
          </div>
          <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-jet/8">
            <div className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-green" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="relative mt-2.5 h-5 overflow-hidden">
            <p key={stage} className="news-in flex items-center gap-2 text-[0.8rem] font-semibold text-jet">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-green text-[0.55rem] text-white">✓</span>
              {STAGES[stage]}
            </p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          toggleSound();
        }}
        aria-pressed={!muted}
        aria-label={muted ? "Turn video sound on" : "Turn video sound off"}
        className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-jet/45 text-white backdrop-blur-md transition hover:bg-jet/70 sm:bottom-5 sm:right-5"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M11 5 6 9H2v6h4l5 4z" />
          {muted ? (
            <>
              <path d="m23 9-6 6" />
              <path d="m17 9 6 6" />
            </>
          ) : (
            <>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
