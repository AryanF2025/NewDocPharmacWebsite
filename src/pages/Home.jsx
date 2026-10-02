/**
 * Home page.
 * Real darkstore footage, the partner wall, a pinned "How it works",
 * DocPharma One as a live hub, and the bento of proof points.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
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
import { Reveal } from "@/components/ui/Reveal";
import { usePageSeo } from "@/seo/usePageSeo";
import { FAQ } from "@/seo/config";
import { CLIENT_LOGOS, INTEGRATION_LOGOS } from "@/data/logos";
import { TECH_SECTION } from "@/data/site";
import rider from "@/assets/images/rider.webp";
import packing from "@/assets/images/packing.webp";
import shashankRai from "@/assets/team/shashank-rai.webp";
import saquibAli from "@/assets/team/saquib-ali.webp";
import sagarChauhan from "@/assets/team/sagar-chauhan.webp";

/* ------------------------------------------------------------------ hero --- */

function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white lg:h-[100svh] lg:min-h-[46rem]">
      <HeroBackdrop focus="60% 40%" />

      <div className="relative mx-auto grid w-full max-w-[88rem] flex-1 items-center gap-12 px-5 pb-10 pt-28 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-14 lg:pb-8 lg:pt-24 xl:px-16">
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
            className="mt-[clamp(1.25rem,4.2vh,2.75rem)] text-[clamp(2.5rem,min(4.4vw,8.6vh),3.75rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-jet"
          />

          <Enter
            as="p"
            delay={0.35}
            className="mt-[clamp(1rem,3.2vh,2rem)] max-w-[38rem] text-[clamp(1.02rem,2.3vh,1.35rem)] leading-relaxed text-ink-soft"
          >
            India&apos;s first healthcare quick-commerce supply chain. Licensed darkstores, pharmacist validation,
            AI-driven inventory and our own fleet, in one network.
          </Enter>

          <Enter delay={0.45} className="mt-[clamp(1.5rem,5vh,3.25rem)] flex flex-wrap items-center gap-3">
            <CtaButton to="/partner">Partner with us</CtaButton>
            <GhostButton href="#how">See how an order moves</GhostButton>
          </Enter>

          <Enter as="dl" delay={0.55} className="mt-[clamp(1.75rem,6.5vh,4.25rem)] grid max-w-xl grid-cols-3 divide-x divide-hairline">
            {[
              [50, "+", "Licensed darkstores"],
              [10, "L+", "Orders delivered"],
              [19000, "+", "Pincodes served"],
            ].map(([v, suffix, l], i) => (
              <div key={l} className={i ? "pl-3 sm:pl-6" : "pr-2"}>
                <dd className="text-[clamp(1.6rem,4.2vh,2.7rem)] font-extrabold tracking-tight text-jet max-sm:text-[1.4rem]">
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
            ratio={1.15}
            className="shadow-[0_50px_100px_-45px_rgba(5,36,57,.65)] lg:max-h-[calc(100svh-11rem)] lg:rounded-[2rem]"
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

/* -------------------------------------------------------------------- faq --- */

/** Where to read more after each answer, in FAQ order. */
const FAQ_MORE = [
  ["/about", "About DocPharma"],
  ["/technology", "How delivery works"],
  ["/solutions", "See the network"],
  ["/solutions", "Find your solution"],
  ["/technology", "How orders are checked"],
  ["/technology", "See the integrations"],
  ["/partner", "Partner with us"],
];

/** Short exchanges for the chat preview, each taken from an answer below. */
const CHAT = [
  ["Which cities are live?", "12+ cities, including Delhi NCR, Mumbai, Bengaluru and Pune."],
  ["How fast is delivery?", "About 30 minutes for hyperlocal orders."],
  ["Do you check prescriptions?", "Yes. A registered pharmacist signs off before dispatch."],
  ["Do you work with Shopify?", "Yes, plus Unicommerce, EasyEcom and our order API."],
];

const FOUNDERS = [shashankRai, saquibAli, sagarChauhan];

/** A founder's photo cropped to the face, so it reads at avatar size. */
function Face({ src, className, style }) {
  return (
    <span className={clsx("block shrink-0 overflow-hidden rounded-full bg-white", className)} style={style}>
      <img src={src} alt="" loading="lazy" className="h-full w-full scale-[2.3] object-cover [transform-origin:50%_24%]" />
    </span>
  );
}

/** A question comes in, the team types, the answer lands; then the next one. */
function ChatPreview() {
  const ref = useRef(null);
  const seen = useInViewOnce(ref);
  const [n, setN] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (!seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyping(false);
      return undefined;
    }
    setTyping(true);
    const answer = window.setTimeout(() => setTyping(false), 1300);
    const next = window.setTimeout(() => setN((v) => (v + 1) % CHAT.length), 4600);
    return () => {
      window.clearTimeout(answer);
      window.clearTimeout(next);
    };
  }, [n, seen]);

  const [q, a] = CHAT[n];
  return (
    <div ref={ref} aria-hidden className="relative mt-7 h-[8.5rem] rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <AnimatePresence mode="wait">
        <motion.div key={n} exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }} className="flex flex-col gap-2.5">
          <motion.p
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="self-end rounded-2xl rounded-br-md bg-white/12 px-3.5 py-2 text-[0.85rem] font-semibold text-white"
          >
            {q}
          </motion.p>
          <div className="flex items-end gap-2">
            <Face src={FOUNDERS[n % FOUNDERS.length]} className="h-9 w-9 ring-2 ring-white/80" />
            {typing ? (
              <span className="faq-typing flex gap-1 rounded-2xl rounded-bl-md bg-brand-blue px-3.5 py-3">
                <span />
                <span />
                <span />
              </span>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="rounded-2xl rounded-bl-md bg-brand-blue px-3.5 py-2 text-[0.85rem] font-semibold leading-snug text-white"
              >
                {a}
              </motion.p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** One question. The answer stays in the page for search and screen readers, and opens smoothly. */
function FaqItem({ q, a, i, open, onToggle }) {
  const id = `faq-${i}`;
  const [to, label] = FAQ_MORE[i] || ["/partner", "Talk to our team"];
  return (
    <Reveal from="up" delay={i * 0.05}>
      <div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        className={clsx(
          "spotlight group relative overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow,transform] duration-500",
          open ? "border-brand-blue/30 shadow-[0_28px_60px_-36px_rgba(2,150,217,.6)]" : "border-hairline hover:-translate-y-0.5 hover:border-jet/15"
        )}
      >
        {/* A blue-to-green edge grows down the open card */}
        <span
          aria-hidden
          className={clsx(
            "absolute inset-y-0 left-0 w-1 origin-top bg-gradient-to-b from-brand-blue to-brand-green transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
            open ? "scale-y-100" : "scale-y-0"
          )}
        />
        <h3>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={onToggle}
            className="relative flex w-full items-center gap-4 rounded-2xl px-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-blue md:px-6"
          >
            <span
              className={clsx(
                "tabular flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-extrabold transition-colors duration-500",
                open ? "bg-brand-blue text-white" : "bg-floral text-ink-faint group-hover:text-brand-blue"
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={clsx("flex-1 text-[1.04rem] font-extrabold tracking-tight text-jet transition-colors duration-300 md:text-[1.1rem]", !open && "group-hover:text-brand-blue")}>
              {q}
            </span>
            <span
              aria-hidden
              className={clsx(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                open ? "rotate-45 bg-jet text-white" : "bg-floral text-brand-blue group-hover:bg-viking"
              )}
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M8 3v10M3 8h10" />
              </svg>
            </span>
          </button>
        </h3>
        <div
          id={id}
          role="region"
          className={clsx(
            "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
            open ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div
              className={clsx(
                "px-5 pb-6 transition-[opacity,transform] duration-500 md:pl-[4.75rem] md:pr-16",
                open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              )}
            >
              <p className="text-[0.98rem] leading-relaxed text-ink-soft">{a}</p>
              <Link
                to={to}
                tabIndex={open ? 0 : -1}
                className="group/more mt-4 inline-flex items-center gap-2 rounded-full bg-floral px-4 py-2 text-[0.85rem] font-bold text-brand-blue transition-colors duration-300 hover:bg-brand-blue hover:text-white"
              >
                {label}
                <span className="transition-transform duration-300 group-hover/more:translate-x-0.5">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

const BEAT = "M0 20 H72 L80 20 L86 13 L92 20 L104 20 L109 25 L116 3 L123 36 L129 20 L142 20 L150 12 L160 20 H240";

/** Common questions, answered in plain text. Same answers as the FAQPage schema (src/seo/config.js). */
function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" aria-label="Frequently asked questions" className="relative overflow-hidden bg-floral">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-brand-blue/[0.06] blur-[100px]" />
      <div className="relative mx-auto grid max-w-[84rem] gap-10 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] lg:gap-14">
        {/* What this is, someone to ask, and where to go next */}
        <Reveal from="up" className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative overflow-hidden rounded-[2rem] bg-jet p-7 text-white md:p-9">
            <div aria-hidden className="pb-glow pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-blue/30 blur-[90px]" />

            <div className="relative flex items-center justify-between gap-4">
              <svg aria-hidden viewBox="0 0 240 40" className="h-8 w-36 overflow-visible sm:w-40">
                <defs>
                  <linearGradient id="faq-ink" x1="0" x2="1">
                    <stop offset="0" stopColor="#0291d7" />
                    <stop offset="1" stopColor="#a1e666" />
                  </linearGradient>
                </defs>
                <path d={BEAT} fill="none" stroke="#fff" strokeOpacity=".12" strokeWidth="2" strokeLinejoin="round" />
                <path className="faq-beat" pathLength="1" d={BEAT} fill="none" stroke="url(#faq-ink)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* The people who answer */}
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2.5">
                  {FOUNDERS.map((src, i) => (
                    <Face
                      key={src}
                      src={src}
                      className="relative h-10 w-10 ring-2 ring-jet transition-transform duration-300 hover:z-10 hover:-translate-y-1"
                      style={{ zIndex: FOUNDERS.length - i }}
                    />
                  ))}
                </div>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand-green/70" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-brand-green" />
                </span>
              </div>
            </div>

            <SectionHeader tone="dark" eyebrow="FAQ" title="Questions, answered." className="relative mt-7" titleClassName="!mt-3" />
            <p className="relative mt-4 max-w-sm text-[1rem] leading-relaxed text-white/65">
              The short version of how DocPharma works, from the team that runs it.
            </p>

            <ChatPreview />

            <div className="relative mt-7 flex flex-wrap gap-2">
              {[
                ["/solutions", "Solutions"],
                ["/technology", "Technology"],
                ["/about", "About us"],
              ].map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  className="group/chip inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[0.86rem] font-bold text-white transition-colors duration-300 hover:border-brand-green hover:bg-brand-green hover:text-jet"
                >
                  {label}
                  <span className="transition-transform duration-300 group-hover/chip:translate-x-0.5">→</span>
                </Link>
              ))}
            </div>

            <div className="relative mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-[0.95rem] font-bold">Still have a question?</p>
                <a href="tel:+917542021525" className="link-underline mt-0.5 inline-block text-[0.92rem] font-bold text-white/70 hover:text-white">
                  +91 75420 21525
                </a>
                <p className="text-[0.8rem] text-white/45">Replies within two working days</p>
              </div>
              <CtaButton to="/partner">Talk to our team</CtaButton>
            </div>
          </div>
        </Reveal>

        <div className="grid content-start gap-3">
          {FAQ.map(({ q, a }, i) => (
            <FaqItem key={q} q={q} a={a} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- page --- */

export default function Home() {
  usePageSeo("home");

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
      <Faq />
    </div>
  );
}
