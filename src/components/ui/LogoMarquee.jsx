/**
 * A continuous logo strip.
 *
 * The brief flagged two problems with the old wall: logos were "not aligned
 * (huge size variation)". The fix is here — every mark is rendered into an
 * identical fixed-height box, constrained by `max-height` rather than width,
 * then optically nudged by its per-logo `scale`. They also render greyscale at
 * rest so no single brightly-coloured mark dominates the row.
 */

import clsx from "clsx";
import { LogoImg } from "./LogoImg";

function Track({ items, reverse, duration, logoArea, slot }) {
  return (
    <div
      className={clsx("flex w-max animate-marquee items-center", reverse && "[animation-direction:reverse]")}
      style={{ "--marquee-duration": `${duration}s` }}
    >
      {/* Rendered twice so the -50% translate loops seamlessly. */}
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
          {items.map((logo) => (
            <div
              key={`${copy}-${logo.name}`}
              className="flex h-20 shrink-0 items-center justify-center px-6"
              style={{ width: slot }}
            >
              <LogoImg
                src={logo.src}
                alt={copy === 0 ? logo.name : ""}
                area={logoArea}
                maxWidth={slot - 48}
                maxHeight={64}
                className="opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function LogoMarquee({ items, rows = 2, duration = 46, className, logoArea = 3800, slot = 210 }) {
  if (rows === 1) {
    return (
      <div className={clsx("marquee-host mask-fade-x overflow-hidden", className)}>
        <Track items={items} duration={duration} logoArea={logoArea} slot={slot} />
      </div>
    );
  }

  // Split across two rows travelling in opposite directions — reads as a
  // network in motion rather than a single conveyor.
  const mid = Math.ceil(items.length / 2);

  return (
    <div className={clsx("marquee-host mask-fade-x space-y-2 overflow-hidden", className)}>
      <Track items={items.slice(0, mid)} duration={duration} logoArea={logoArea} slot={slot} />
      <Track items={items.slice(mid)} duration={duration + 8} reverse logoArea={logoArea} slot={slot} />
    </div>
  );
}
