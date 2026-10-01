/**
 * Home page.
 * Real darkstore footage, the partner wall, a pinned "How it works",
 * DocPharma One as a live hub, and the bento of proof points.
 */

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTicker, fmt } from "@/components/directions/shared";
import { HeroVideo } from "@/components/experience/HeroVideo";
import { HowItWorksPinned } from "@/components/experience/HowItWorksPinned";
import { NetworkHub } from "@/components/experience/NetworkHub";
import { NewsTicker } from "@/components/experience/NewsTicker";
import { CountUp } from "@/components/experience/HeroParts";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { LogoImg } from "@/components/ui/LogoImg";
import { COMPLIANCE, ComplianceIcon } from "@/components/experience/compliance";
import { IndiaCoverageMap, COVERAGE_CITIES } from "@/components/art/IndiaCoverageMap";
import { HeroBackdrop, Enter, HIGHLIGHT } from "@/components/motion/Hero";
import { SplitText, SectionHeader, Eyebrow } from "@/components/motion/Text";
import { CtaButton, GhostButton } from "@/components/motion/CtaButton";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { usePageMeta } from "@/hooks/usePageMeta";
import { CLIENT_LOGOS, INTEGRATION_LOGOS } from "@/data/logos";
import { TECH_SECTION } from "@/data/site";
import rider from "@/assets/images/rider.webp";
import packing from "@/assets/images/packing.webp";

/* ------------------------------------------------------------------ hero --- */

function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white lg:h-[100svh] lg:min-h-[46rem]">
      <HeroBackdrop focus="60% 40%" />

      <div className="relative mx-auto grid w-full max-w-[88rem] flex-1 items-center gap-12 px-5 pb-10 pt-28 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-16 lg:pb-6 lg:pt-24 xl:px-16">
        <div>
          <Enter>
            <NewsTicker />
          </Enter>

          <SplitText
            as="h1"
            trigger="mount"
            delay={0.1}
            stagger={0.07}
            lines={["Medicine delivered", ["in", { text: "30 minutes.", className: HIGHLIGHT }]]}
            className="mt-[clamp(1.25rem,3vh,2rem)] text-[clamp(2.5rem,min(4vw,7.6vh),5.2rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-jet"
          />

          <Enter
            as="p"
            delay={0.35}
            className="mt-[clamp(1rem,2.4vh,1.5rem)] max-w-[36rem] text-[clamp(1.02rem,2.1vh,1.25rem)] leading-relaxed text-ink-soft"
          >
            India&apos;s first healthcare quick-commerce supply chain. Licensed darkstores, pharmacist validation,
            AI-driven inventory and our own fleet, in one network.
          </Enter>

          <Enter delay={0.45} className="mt-[clamp(1.5rem,3.6vh,2.5rem)] flex flex-wrap items-center gap-3">
            <CtaButton to="/partner">Partner with us</CtaButton>
            <GhostButton href="#how">See how an order moves</GhostButton>
          </Enter>

          <Enter as="dl" delay={0.55} className="mt-[clamp(1.75rem,4.6vh,3rem)] grid max-w-xl grid-cols-3 divide-x divide-hairline">
            {[
              [50, "+", "Licensed darkstores"],
              [10, "L+", "Orders delivered"],
              [19000, "+", "Pincodes served"],
            ].map(([v, suffix, l], i) => (
              <div key={l} className={i ? "pl-3 sm:pl-6" : "pr-2"}>
                <dd className="text-[clamp(1.6rem,3.8vh,2.4rem)] font-extrabold tracking-tight text-jet max-sm:text-[1.4rem]">
                  <CountUp value={v} suffix={suffix} delay={500 + i * 120} />
                </dd>
                <dt className="mt-0.5 text-[clamp(0.82rem,1.7vh,0.95rem)] text-ink-faint">{l}</dt>
              </div>
            ))}
          </Enter>
        </div>

        {/* Framed film — opens like a shutter as the page arrives */}
        <Enter delay={0.2} className="hero-film relative">
          <HeroVideo
            ratio={1.45}
            className="shadow-[0_50px_100px_-45px_rgba(5,36,57,.65)] lg:max-h-[calc(100svh-15rem)] lg:rounded-[2rem]"
          />
        </Enter>
      </div>

    </section>
  );
}

/* ---------------------------------------------------------- DocPharma One --- */

function PlatformBand() {
  return (
    <section id="platform" className="relative flex flex-col justify-center overflow-hidden bg-jet py-20 text-white lg:min-h-[100svh] lg:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 60% 70% at 75% 50%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 75% 50%, #000 20%, transparent 75%)",
        }}
      />
      <div className="relative mx-auto max-w-[84rem] px-5 md:px-10">
        <NetworkHub modules={TECH_SECTION.modules}>
          <SectionHeader
            tone="dark"
            eyebrow="DocPharma One · AI-driven intelligence"
            title={TECH_SECTION.headline}
            titleClassName="!text-[clamp(1.9rem,3vw,2.8rem)]"
          />
        </NetworkHub>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ bento --- */

/** A bento tile that rises into place when its row arrives. */
function Tile({ className, children, delay = 0 }) {
  const ref = useRef(null);
  const shown = useInViewOnce(ref);
  return (
    <div
      ref={ref}
      className={clsx("reveal relative overflow-hidden rounded-3xl border border-hairline p-7", shown && "reveal-up", className)}
      style={shown ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

function CoverageTile() {
  const [active, setActive] = useState(null);
  return (
    <Tile delay={0.1} className="flex flex-col bg-white md:col-span-2 md:row-span-2">
      <p className="label text-brand-blue">Coverage</p>
      <h3 className="mt-2 text-[1.5rem] font-extrabold leading-tight tracking-tight text-jet">
        <CountUp value={12} suffix="+" /> cities.
        <br />
        <CountUp value={19000} suffix="+" /> pincodes.
      </h3>
      <div className="relative my-5 flex min-h-[18rem] flex-1 items-center justify-center">
        <IndiaCoverageMap active={active} className="h-full max-h-[26rem] w-full" />
      </div>
      <div className="flex flex-wrap gap-1.5" onMouseLeave={() => setActive(null)}>
        {COVERAGE_CITIES.map((c) => (
          <button
            key={c.name}
            type="button"
            onMouseEnter={() => setActive(c.name)}
            onFocus={() => setActive(c.name)}
            onBlur={() => setActive(null)}
            className={clsx(
              "inline-flex min-h-9 items-center rounded-full px-3 text-[0.78rem] font-semibold transition-colors",
              active === c.name ? "bg-brand-blue text-white" : "bg-floral text-ink-soft hover:bg-viking"
            )}
          >
            {c.name}
          </button>
        ))}
        <span className="inline-flex min-h-9 items-center rounded-full bg-floral px-3 text-[0.78rem] font-semibold text-ink-faint">+5 more</span>
      </div>
    </Tile>
  );
}

/** The running clock, in its own component so its tick re-renders only itself. */
function SpeedClock() {
  const t = useTicker(0, 30 * 60, 1000, 1);
  return <p className="tabular mt-3 text-[clamp(3.5rem,8vw,6.5rem)] font-extrabold leading-none tracking-[-0.05em]">{fmt(t)}</p>;
}

function Bento() {
  return (
    <section id="bento" className="bg-floral">
      <div className="mx-auto max-w-[84rem] px-5 py-24 md:px-10 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow="Why DocPharma" title="Everything between the order and the door." />
          <Link to="/solutions" className="link-underline inline-flex min-h-10 items-center text-[0.95rem] font-bold text-brand-blue">
            Explore solutions →
          </Link>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          {/* Speed, with the rider photo */}
          <Tile className="min-h-[26rem] border-0 bg-jet p-0 text-white md:col-span-4">
            <img src={rider} alt="DocPharma rider on a delivery" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-jet via-jet/80 to-transparent" />
            <div className="relative p-8">
              <p className="label text-brand-green">Speed</p>
              <SpeedClock />
              <p className="mt-4 max-w-xs text-[1.05rem] leading-relaxed text-white/70">
                Inventory sits inside the catchment, so the 30-minute promise holds.
              </p>
            </div>
          </Tile>

          <CoverageTile />

          {/* Compliance */}
          <Tile delay={0.05} className="bg-white md:col-span-2">
            <p className="label text-brand-blue">Compliance</p>
            <h3 className="mt-2 text-[1.25rem] font-extrabold tracking-tight text-jet">Built in, not bolted on</h3>
            <ul className="mt-5 grid grid-cols-2 gap-2">
              {COMPLIANCE.map((item) => (
                <li key={item.title} title={item.line} className="flex items-center gap-2 rounded-xl bg-floral px-2.5 py-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-peppermint text-[#5f8a0f]">
                    <ComplianceIcon name={item.icon} />
                  </span>
                  <span className="text-[0.8rem] font-semibold leading-tight text-jet">{item.title}</span>
                </li>
              ))}
            </ul>
          </Tile>

          {/* Packing */}
          <Tile delay={0.12} className="min-h-[15rem] border-0 p-0 md:col-span-2">
            <img src={packing} alt="An order being sealed for dispatch" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-jet/90 to-transparent" />
            <div className="absolute bottom-0 p-7 text-white">
              <p className="text-[2.2rem] font-extrabold leading-none">
                <CountUp value={4} suffix=" min" duration={900} />
              </p>
              <p className="mt-1 text-[0.95rem] text-white/75">Pick, verify and pack</p>
            </div>
          </Tile>

          {/* Numbers */}
          <Tile className="flex items-stretch bg-white p-0 md:col-span-3">
            <div className="grid w-full grid-cols-2 grid-rows-2">
              {[
                [95, "%", "Fulfilment rate"],
                [93, "%", "Delivery adherence"],
                [500, "+", "In-house fleet"],
                [6, "L+", "Lives impacted"],
              ].map(([v, suffix, l], i) => (
                <div
                  key={l}
                  className={clsx(
                    "flex flex-col items-center justify-center px-4 py-7 text-center transition-colors duration-300 hover:bg-floral",
                    i % 2 === 0 && "border-r border-hairline",
                    i < 2 && "border-b border-hairline"
                  )}
                >
                  <p className="text-[clamp(2.2rem,3.6vw,3rem)] font-extrabold leading-none tracking-tight text-brand-blue">
                    <CountUp value={v} suffix={suffix} delay={i * 90} />
                  </p>
                  <p className="mt-2 text-[0.95rem] text-ink-soft">{l}</p>
                </div>
              ))}
            </div>
          </Tile>

          {/* Integrations */}
          <Tile delay={0.08} className="bg-white md:col-span-3">
            <p className="label text-brand-blue">Integrations</p>
            <h3 className="mt-2 text-[1.25rem] font-extrabold tracking-tight text-jet">No rebuild required</h3>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {INTEGRATION_LOGOS.slice(0, 6).map((l) => (
                <div key={l.name} className="flex h-20 items-center justify-center rounded-2xl bg-floral px-4 transition-colors duration-300 hover:bg-viking">
                  <LogoImg src={l.src} alt={l.name} area={2600} maxWidth={150} maxHeight={54} className="mix-blend-multiply" />
                </div>
              ))}
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- page --- */

export default function Home() {
  usePageMeta({
    title: "DocPharma — Medicine delivered in 30 minutes",
    description:
      "India's first healthcare quick-commerce supply chain: licensed darkstores, pharmacist validation, AI-driven inventory and our own fleet.",
  });

  return (
    <div className="bg-floral">
      <Hero />

      <section id="trusted" className="scroll-mt-4 border-y border-hairline bg-white py-20 md:py-24">
        <SectionHeader align="center" eyebrow="Trusted by" title="Leaders across healthcare & wellness." className="px-5" />
        <div className="mt-10">
          <LogoMarquee items={CLIENT_LOGOS} rows={2} duration={65} logoArea={5600} slot={250} />
        </div>
      </section>

      <HowItWorksPinned />
      <PlatformBand />
      <Bento />
    </div>
  );
}
