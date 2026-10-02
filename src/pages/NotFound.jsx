import { HeroBackdrop, HeroHeading, Enter, HIGHLIGHT } from "@/components/motion/Hero";
import { CtaButton, GhostButton } from "@/components/motion/CtaButton";
import { usePageSeo } from "@/seo/usePageSeo";

/** A delivery that lost its address: the route draws, the pin drops, no one's home. */
export default function NotFound() {
  usePageSeo("notFound");

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-white">
      <HeroBackdrop focus="50% 50%" />

      <div className="relative mx-auto grid w-full max-w-[84rem] items-center gap-12 px-5 pb-16 pt-28 md:px-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <HeroHeading
            eyebrow="Error 404"
            lines={["This address isn't", ["on our", { text: "route.", className: HIGHLIGHT }]]}
            className="text-[clamp(2.4rem,5.4vw,4.6rem)]"
          />
          <Enter as="p" delay={0.35} className="mt-5 max-w-lg text-[1.08rem] leading-relaxed text-ink-soft">
            Our riders reach 19,000+ pincodes, but not this one. The page may have moved, or the link may be mistyped.
          </Enter>
          <Enter delay={0.45} className="mt-9 flex flex-wrap gap-3">
            <CtaButton to="/">Back to home</CtaButton>
            <GhostButton to="/partner">Talk to us</GhostButton>
          </Enter>
        </div>

        <Enter delay={0.25} className="mx-auto w-full max-w-md">
          <svg viewBox="0 0 400 320" className="lost-route h-auto w-full" aria-hidden>
            <path
              d="M40 270 C 120 270, 110 180, 190 180 S 260 90, 330 80"
              fill="none"
              stroke="#e4e4e7"
              strokeWidth="3"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
            <path
              className="lost-route-line"
              d="M40 270 C 120 270, 110 180, 190 180 S 260 90, 330 80"
              pathLength="1"
              fill="none"
              stroke="url(#lost)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="lost" x1="0" x2="1">
                <stop offset="0" stopColor="#0296d9" />
                <stop offset="1" stopColor="#8fc124" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="270" r="9" fill="#0296d9" />
            <circle cx="40" cy="270" r="18" fill="none" stroke="#0296d9" strokeOpacity=".3" strokeWidth="2" />
            <g className="lost-pin">
              <path d="M330 34c-15 0-26 11-26 25 0 19 26 43 26 43s26-24 26-43c0-14-11-25-26-25z" fill="#052439" />
              <text x="330" y="66" textAnchor="middle" fill="#8fc124" fontSize="17" fontWeight="800">
                ?
              </text>
            </g>
          </svg>
        </Enter>
      </div>
    </section>
  );
}
