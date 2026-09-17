/**
 * Home page.
 * Light palette with real darkstore footage, a live order card, a pinned
 * "How it works", the DocPharma One console and the capabilities grid.
 */

import clsx from "clsx";
import { ConsoleMock, useTicker, fmt } from "@/components/directions/shared";
import { HeroVideo } from "@/components/experience/HeroVideo";
import { HowItWorksPinned } from "@/components/experience/HowItWorksPinned";
import { Magnetic } from "@/components/experience/Magnetic";
import { NewsTicker } from "@/components/experience/NewsTicker";
import { CountUp } from "@/components/experience/HeroParts";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { LogoImg } from "@/components/ui/LogoImg";
import { COMPLIANCE, ComplianceIcon } from "@/components/experience/compliance";
import { useEffect, useState } from "react";
import { IndiaCoverageMap, COVERAGE_CITIES } from "@/components/art/IndiaCoverageMap";
import { CLIENT_LOGOS, INTEGRATION_LOGOS } from "@/data/logos";
import rider from "@/assets/images/rider.webp";
import packing from "@/assets/images/packing.webp";

/* ------------------------------------------------------------------ hero --- */

function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white lg:h-[100svh] lg:min-h-[46rem]">
      {/* Backdrop: a faint grid and two soft brand glows. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(5,36,57,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(5,36,57,.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 70% at 60% 40%, #000 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 60% 40%, #000 30%, transparent 75%)",
          }}
        />
        <div className="absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full bg-brand-blue/12 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-brand-green/12 blur-[120px]" />
      </div>

      {/* Main row */}
      <div className="relative mx-auto grid w-full max-w-[100rem] flex-1 items-center gap-12 px-5 pb-10 pt-28 md:px-10 lg:grid-cols-[1fr_1.12fr] lg:gap-16 lg:pb-6 lg:pt-24 xl:px-16">
        <div>
          <div className="rise">
            <NewsTicker />
          </div>

          <h1 className="mt-[clamp(1.25rem,3vh,2rem)] text-[clamp(2.5rem,min(4vw,7.6vh),5.2rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-jet">
            <span className="block overflow-hidden pb-1">
              <span className="wipe block whitespace-nowrap max-sm:whitespace-normal">Medicine delivered</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="wipe block whitespace-nowrap max-sm:whitespace-normal" style={{ animationDelay: ".1s" }}>
                in <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">30 minutes.</span>
              </span>
            </span>
          </h1>

          <p
            className="rise mt-[clamp(1rem,2.4vh,1.5rem)] max-w-[36rem] text-[clamp(1.02rem,2.1vh,1.25rem)] leading-relaxed text-ink-soft"
            style={{ animationDelay: ".25s" }}
          >
            India&apos;s first healthcare quick-commerce supply chain. Licensed darkstores, pharmacist validation,
            AI-driven inventory and our own fleet, in one network.
          </p>

          <div className="rise mt-[clamp(1.5rem,3.6vh,2.5rem)] flex flex-wrap items-center gap-3" style={{ animationDelay: ".35s" }}>
            <Magnetic>
              <a
                href="/partner"
                className="group flex items-center gap-3 rounded-full bg-brand-blue py-2 pl-7 pr-2 text-[clamp(0.95rem,1.9vh,1.08rem)] font-bold text-white shadow-[0_14px_34px_-14px_rgba(2,150,217,.9)] transition-colors hover:bg-jet"
              >
                Partner with us
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-[-45deg]">
                  →
                </span>
              </a>
            </Magnetic>
            <a
              href="#how"
              className="rounded-full border border-hairline bg-white px-7 py-3.5 text-[clamp(0.95rem,1.9vh,1.08rem)] font-bold text-jet transition-colors hover:border-brand-blue"
            >
              See how an order moves
            </a>
          </div>

          <dl className="rise mt-[clamp(1.75rem,4.6vh,3rem)] grid max-w-xl grid-cols-3 divide-x divide-hairline" style={{ animationDelay: ".45s" }}>
            {[
              [50, "+", "Licensed darkstores"],
              [10, "L+", "Orders delivered"],
              [19000, "+", "Pincodes served"],
            ].map(([v, suffix, l], i) => (
              <div key={l} className={i ? "pl-6" : "pr-2"}>
                <dd className="text-[clamp(1.6rem,3.8vh,2.4rem)] font-extrabold tracking-tight text-jet">
                  <CountUp value={v} suffix={suffix} delay={600 + i * 120} />
                </dd>
                <dt className="mt-0.5 text-[clamp(0.82rem,1.7vh,0.95rem)] text-ink-faint">{l}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Framed film */}
        <div className="rise relative" style={{ animationDelay: ".2s" }}>
          <HeroVideo
            ratio={1.45}
            className="shadow-[0_50px_100px_-45px_rgba(5,36,57,.65)] lg:max-h-[calc(100svh-15rem)] lg:rounded-[2.25rem]"
          />
        </div>
      </div>

      {/* Scroll cue: tells a first-time visitor there is more below. */}
      <a
        href="#trusted"
        className="group relative mx-auto mb-5 hidden flex-col items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-brand-blue lg:flex"
      >
        Scroll to explore
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-white shadow-sm transition-colors group-hover:border-brand-blue">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="scroll-cue">
            <path d="M3 5.5 7 9.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
    </section>
  );
}

/* ---------------------------------------------------------- DocPharma One --- */

export function PlatformBand() {
  return (
    <section id="platform" className="relative overflow-hidden bg-gradient-to-br from-jet via-[#053a66] to-brand-blue-deep py-24 lg:py-32">
      <div className="mx-auto grid max-w-[88rem] items-center gap-14 px-5 md:px-10 lg:grid-cols-[1fr_1.25fr]">
        <div className="text-white">
          <p className="text-[0.8rem] font-bold text-brand-green">DocPharma One</p>
          <h2 className="mt-3 text-[clamp(2.2rem,4.2vw,3.5rem)] font-extrabold leading-[1] tracking-[-0.04em]">
            One system thinks. The whole network moves.
          </h2>
          <p className="mt-5 max-w-md text-[1.1rem] leading-relaxed text-white/70">
            Inventory, orders, fulfilment and delivery on one platform, built to make healthcare supply chains faster,
            simpler and more reliable.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Inventory intelligence", "Real-time order management", "Smart pick, pack & verify", "Last-mile orchestration"].map(
              (m) => (
                <li key={m} className="flex items-center gap-2.5 text-[0.95rem] text-white/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  {m}
                </li>
              )
            )}
          </ul>
        </div>
        <ConsoleMock />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ bento --- */

function Tile({ className, children }) {
  return <div className={clsx("relative overflow-hidden rounded-3xl border border-hairline p-7", className)}>{children}</div>;
}



function CoverageTile() {
  const [active, setActive] = useState(null);
  return (
    <Tile className="flex flex-col bg-white md:col-span-2 md:row-span-2">
      <p className="text-[0.8rem] font-bold text-brand-blue">Coverage</p>
      <h3 className="mt-2 text-[1.5rem] font-extrabold leading-tight tracking-tight text-jet">
        12+ cities.
        <br />
        19,000+ pincodes.
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
              "rounded-full px-2.5 py-1 text-[0.75rem] font-semibold transition-colors",
              active === c.name ? "bg-brand-blue text-white" : "bg-floral text-ink-soft hover:bg-viking"
            )}
          >
            {c.name}
          </button>
        ))}
        <span className="rounded-full bg-floral px-2.5 py-1 text-[0.75rem] font-semibold text-ink-faint">+5 more</span>
      </div>
    </Tile>
  );
}

export function Bento() {
  const t = useTicker(0, 30 * 60, 1000, 1);
  return (
    <section id="bento" className="bg-floral">
      <div className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[0.8rem] font-bold text-brand-blue">Why DocPharma</p>
            <h2 className="mt-3 text-[clamp(2.2rem,4.2vw,3.5rem)] font-extrabold leading-[1] tracking-[-0.04em] text-jet">
              Everything between the order and the door.
            </h2>
          </div>
          <a href="/solutions" className="text-[0.95rem] font-bold text-brand-blue">
            Explore solutions →
          </a>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          {/* Speed, with the rider photo */}
          <Tile className="min-h-[26rem] border-0 bg-jet p-0 text-white md:col-span-4">
            <img src={rider} alt="DocPharma rider on a delivery" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-jet via-jet/80 to-transparent" />
            <div className="relative p-8">
              <p className="text-[0.8rem] font-bold text-brand-green">Speed</p>
              <p className="tabular mt-3 text-[clamp(3.5rem,8vw,6.5rem)] font-extrabold leading-none tracking-[-0.05em]">{fmt(t)}</p>
              <p className="mt-4 max-w-xs text-[1.05rem] leading-relaxed text-white/70">
                Inventory sits inside the catchment, so the 30-minute promise holds.
              </p>
            </div>
          </Tile>

          {/* Coverage */}
          <CoverageTile />

          {/* Compliance */}
          <Tile className="bg-white md:col-span-2">
            <p className="text-[0.8rem] font-bold text-brand-blue">Compliance</p>
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
          <Tile className="min-h-[15rem] border-0 p-0 md:col-span-2">
            <img src={packing} alt="An order being sealed for dispatch" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-jet/90 to-transparent" />
            <div className="absolute bottom-0 p-7 text-white">
              <p className="tabular text-[2.2rem] font-extrabold leading-none">4 min</p>
              <p className="mt-1 text-[0.95rem] text-white/75">Pick, verify and pack</p>
            </div>
          </Tile>

          {/* Numbers */}
          <Tile className="flex items-stretch border-0 bg-brand-blue p-0 text-white md:col-span-3">
            {/* A 2×2 of equal cells that fills the tile's full height, each centred. */}
            <div className="grid w-full grid-cols-2 grid-rows-2">
              {[
                ["95%", "Fulfilment rate"],
                ["93%", "Delivery adherence"],
                ["500+", "In-house fleet"],
                ["6L+", "Lives impacted"],
              ].map(([v, l], i) => (
                <div
                  key={l}
                  className={clsx(
                    "flex flex-col items-center justify-center px-4 py-7 text-center",
                    i % 2 === 0 && "border-r border-white/20",
                    i < 2 && "border-b border-white/20"
                  )}
                >
                  <p className="tabular text-[clamp(2.2rem,3.6vw,3rem)] font-extrabold leading-none tracking-tight">{v}</p>
                  <p className="mt-2 text-[0.95rem] text-white/80">{l}</p>
                </div>
              ))}
            </div>
          </Tile>

          {/* Integrations */}
          <Tile className="bg-white md:col-span-3">
            <p className="text-[0.8rem] font-bold text-brand-blue">Integrations</p>
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
  useEffect(() => {
    document.title = "DocPharma — Medicine delivered in 30 minutes";
  }, []);

  return (
    <div className="bg-floral">
      <Hero />

      <section id="trusted" className="scroll-mt-4 border-y border-hairline bg-white py-14">
        <p className="text-center text-[clamp(0.9rem,1.2vw,1.05rem)] font-bold uppercase tracking-[0.16em] text-ink-soft">
          Trusted by leaders across healthcare &amp; wellness
        </p>
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
