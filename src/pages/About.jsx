/**
 * About us — the live site's copy, rebuilt in the new brand language:
 * a full-screen opening, values revealed one at a time as you scroll, leadership
 * that fits one screen, mission and vision, investors, and the careers CTA.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/experience/Magnetic";
import { CountUp } from "@/components/experience/HeroParts";
import { COMPLIANCE, ComplianceIcon } from "@/components/experience/compliance";
import { LogoImg } from "@/components/ui/LogoImg";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ABOUT_HERO, VALUES, MISSION, VISION, LEADERSHIP, INVESTORS, JOIN_TEAM } from "@/data/about";

const HERO_STATS = [
  [50, "+", "Licensed darkstores"],
  [12, "+", "Cities"],
  [10, "L+", "Orders delivered"],
  [500, "+", "In-house fleet"],
];


/* ------------------------------------------------------------------ hero --- */

/** Full screen, so the page starts as one held image before anything scrolls. */
function AboutHero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white lg:h-[100svh] lg:min-h-[44rem]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(5,36,57,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(5,36,57,.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 60% at 35% 40%, #000 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 35% 40%, #000 20%, transparent 75%)",
          }}
        />
        <div className="absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-brand-green/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-brand-blue/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[100rem] flex-1 items-center gap-12 px-5 pb-12 pt-28 md:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-6 lg:pt-24 xl:px-16">
        <div>
          <p className="rise text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{ABOUT_HERO.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.2rem,min(4.4vw,8vh),4.6rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-jet">
            <span className="block overflow-hidden pb-1">
              <span className="wipe block">Built for Health.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="wipe block" style={{ animationDelay: ".1s" }}>
                Built for{" "}
                <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">Bharat.</span>
              </span>
            </span>
          </h1>

          <p className="rise mt-6 text-[clamp(1.15rem,2.4vh,1.5rem)] font-extrabold tracking-[-0.02em] text-jet" style={{ animationDelay: ".2s" }}>
            {ABOUT_HERO.lead}
          </p>
          <p className="rise mt-3 max-w-xl text-[clamp(1rem,2vh,1.12rem)] leading-relaxed text-ink-soft" style={{ animationDelay: ".28s" }}>
            {ABOUT_HERO.body[0]}
          </p>

          <dl
            className="rise mt-[clamp(1.5rem,4vh,2.5rem)] grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-hairline pt-6 sm:grid-cols-4"
            style={{ animationDelay: ".36s" }}
          >
            {HERO_STATS.map(([value, suffix, label]) => (
              <div key={label}>
                <dd className="text-[clamp(1.5rem,3.4vh,2.2rem)] font-extrabold tracking-tight text-jet">
                  <CountUp value={value} suffix={suffix} />
                </dd>
                <dt className="mt-1 text-[0.85rem] text-ink-faint">{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* The team, filling the right-hand side */}
        <div className="rise relative" style={{ animationDelay: ".2s" }}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.25rem] bg-jet shadow-[0_50px_100px_-45px_rgba(5,36,57,.65)] lg:aspect-auto lg:h-[min(68svh,34rem)]">
            <img src={JOIN_TEAM.groupImage} alt="The DocPharma team" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-jet/80 via-jet/10 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-brand-green">The team behind the network</p>
              <p className="mt-2 max-w-md text-[clamp(1.05rem,2vw,1.5rem)] font-extrabold leading-snug tracking-[-0.02em]">
                Darkstores, pharmacists, technology and our own fleet — in one connected network.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue: the visitor has to move before the page does. */}
      <a
        href="#story"
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

/* ------------------------------------------------------- values, scrolled --- */

/**
 * The three values, one at a time, driven by scroll.
 *
 * The section is three screens tall and pins its content for that whole
 * distance: scrolling moves the photo filmstrip sideways and swaps the copy,
 * so a visitor sees every value before the page moves on. The progress bar
 * tracks the scroll, and each segment is also a shortcut to that value.
 */
function ValuesScroll() {
  const hostRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = VALUES.slides.length;

  const { scrollYProgress } = useScroll({ target: hostRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const fill = useTransform(progress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(count - 1, Math.max(0, Math.floor(p * count * 0.999))));
  });

  /** Move the page so value `i` is the one on screen. */
  const goTo = (i) => {
    const host = hostRef.current;
    if (!host) return;
    const travel = host.offsetHeight - window.innerHeight;
    const top = host.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (travel * i) / (count - 1), behavior: "smooth" });
  };

  const slide = VALUES.slides[active];

  return (
    <section ref={hostRef} className="relative bg-white" style={{ height: `${count * 100}svh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden py-20 pt-24">
        <div className="mx-auto w-full max-w-[84rem] px-5 md:px-10">
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{VALUES.title}</p>
          <h2 className="mt-2 max-w-2xl text-[clamp(1.6rem,3vw,2.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-jet">
            {VALUES.subtitle}
          </h2>

          <div className="mt-6 grid overflow-hidden rounded-[2rem] border border-hairline bg-white lg:grid-cols-[1.05fr_1fr]">
            {/* Photo filmstrip, moved by the scroll */}
            <div className="relative aspect-[16/10] overflow-hidden bg-jet sm:aspect-[16/9] lg:aspect-auto lg:h-[min(56svh,32rem)]">
              <div
                className="absolute inset-0 flex transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)]"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {VALUES.slides.map((s, i) => (
                  <div key={s.title} className="h-full w-full shrink-0 overflow-hidden">
                    <img
                      src={s.image}
                      alt=""
                      className={clsx(
                        "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]",
                        i === active ? "scale-100" : "scale-110"
                      )}
                    />
                  </div>
                ))}
              </div>
              <span className="tabular absolute left-5 top-5 rounded-full bg-white/92 px-3 py-1.5 text-[0.75rem] font-extrabold text-jet backdrop-blur">
                {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-col justify-center p-6 md:p-9">
              <div key={active} className="reveal-up">
                <h3 className="text-[clamp(1.3rem,2.4vw,2rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-jet">
                  {slide.title}
                </h3>
                <p className="mt-4 text-[clamp(0.92rem,1.9vh,1rem)] leading-relaxed text-ink-soft">{slide.description}</p>
                <p className="mt-3 text-[1.02rem] font-extrabold text-brand-blue">{slide.bold}</p>
              </div>

              {/* Progress follows the scroll; segments are shortcuts. */}
              <div className="relative mt-7 flex gap-2">
                {VALUES.slides.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to value ${i + 1}: ${s.title}`}
                    aria-current={i === active}
                    className="h-6 flex-1"
                  >
                    <span className="block h-1 rounded-full bg-jet/10" />
                  </button>
                ))}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-blue to-brand-green"
                  style={{ width: fill }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ mission & vision --- */

/** The floating emblem that overhangs each card, lit in the card's colour. */
function CardEmblem({ kind }) {
  const tint = kind === "mission" ? "#0296D9" : "#8FC124";
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -top-9 left-7 grid h-20 w-20 place-items-center rounded-[1.4rem] border border-white/20 bg-white/10 backdrop-blur-md transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5"
      style={{ boxShadow: `0 18px 45px -12px ${tint}` }}
    >
      <svg width="38" height="38" viewBox="0 0 48 48" fill="none" aria-hidden>
        <defs>
          <linearGradient id={`emblem-${kind}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={tint} />
          </linearGradient>
        </defs>
        {kind === "mission" ? (
          <>
            {/* A target: everything aimed at one thing — access. */}
            <circle cx="24" cy="24" r="16" stroke={`url(#emblem-${kind})`} strokeWidth="2.5" />
            <circle cx="24" cy="24" r="9" stroke={`url(#emblem-${kind})`} strokeWidth="2.5" opacity="0.75" />
            <circle cx="24" cy="24" r="3.4" fill={`url(#emblem-${kind})`} />
          </>
        ) : (
          <>
            {/* A horizon with a rising route — where we're headed. */}
            <path d="M6 32c6-12 12-18 18-18s12 6 18 18" stroke={`url(#emblem-${kind})`} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M6 38h36" stroke={`url(#emblem-${kind})`} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            <circle cx="24" cy="14" r="4" fill={`url(#emblem-${kind})`} />
          </>
        )}
      </svg>
    </span>
  );
}

/**
 * Mission and vision as two lit cards on a dark field: a centred statement,
 * then a card each, with the emblem overhanging the top edge.
 */
function MissionVision() {
  const cards = [
    { ...MISSION, kind: "mission" },
    { ...VISION, kind: "vision" },
  ];

  return (
    <section id="mission" className="relative scroll-mt-24 overflow-hidden bg-jet py-20 text-white md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-brand-blue/25 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-brand-green/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[84rem] px-5 md:px-10">
        <Reveal from="up" className="text-center">
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-green">Mission &amp; Vision</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3.4rem)] font-extrabold leading-[1.06] tracking-[-0.04em]">
            We focus on{" "}
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">access.</span>
            <br />
            That&apos;s it.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-white/65">
            A connected network that brings health, wellness and healthcare products closer to the people who need them.
          </p>
        </Reveal>

        <div className="mt-24 grid gap-6 md:grid-cols-2 md:gap-8">
          {cards.map((card, i) => (
            <Reveal key={card.label} from={i === 0 ? "left" : "right"}>
              <article
                className={clsx(
                  "group relative h-full rounded-[1.75rem] border border-white/15 p-8 pt-16 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 md:p-10 md:pt-20",
                  card.kind === "mission"
                    ? "bg-gradient-to-br from-brand-blue/35 via-brand-blue/10 to-white/[0.04]"
                    : "bg-gradient-to-br from-brand-green/30 via-brand-green/10 to-white/[0.04]"
                )}
              >
                <CardEmblem kind={card.kind} />
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-white/60">{card.label}</p>
                <h3 className="mt-4 text-[clamp(1.4rem,2.6vw,2.1rem)] font-extrabold leading-[1.12] tracking-[-0.03em]">
                  {card.title}
                </h3>
                <p className="mt-5 text-[1rem] leading-relaxed text-white/70">{card.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- leadership --- */

/**
 * The three founders on one screen: compact cards with a short bio, and the
 * full bio in a dialog so the cards stay even and the section stays one screen.
 */
function Leadership() {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (event) => event.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const member = open === null ? null : LEADERSHIP.members[open];

  return (
    <section id="leadership" className="flex scroll-mt-4 flex-col justify-center bg-white py-20 md:py-24 lg:h-[100svh] lg:min-h-[46rem] lg:py-0">
      <div className="mx-auto w-full max-w-[84rem] px-5 md:px-10">
        <Reveal from="left">
          <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{LEADERSHIP.title}</p>
          <h2 className="mt-3 max-w-3xl text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-jet">
            {LEADERSHIP.subtitle}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-3 lg:mt-10">
          {LEADERSHIP.members.map((person, i) => (
            <Reveal key={person.name} from="up" delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-hairline bg-white">
                <div className="relative aspect-[4/3] overflow-hidden bg-jet lg:h-[min(34svh,20rem)] lg:aspect-auto">
                  <img
                    src={person.image}
                    alt={`${person.name}, ${person.designation}`}
                    className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jet/85 via-jet/10 to-transparent" />
                  <div className="absolute inset-x-5 bottom-4 text-white">
                    <h3 className="text-[1.15rem] font-extrabold tracking-tight">{person.name}</h3>
                    <p className="mt-0.5 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-brand-green">
                      {person.designation}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="line-clamp-3 text-[0.92rem] leading-relaxed text-ink-soft">{person.preview}</p>
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className="mt-3 self-start text-[0.85rem] font-bold text-brand-blue transition-colors hover:text-jet"
                  >
                    Read full profile →
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Full profile */}
      {member ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-jet/70 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label={`${member.name}, ${member.designation}`}
          onClick={() => setOpen(null)}
        >
          <div
            className="reveal-up max-h-[85svh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] bg-white p-6 md:p-9"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <img src={member.image} alt="" className="h-20 w-20 shrink-0 rounded-2xl object-cover object-top" />
              <div className="min-w-0 flex-1">
                <h3 className="text-[1.35rem] font-extrabold tracking-tight text-jet">{member.name}</h3>
                <p className="mt-1 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brand-blue">{member.designation}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-floral text-[1.2rem] text-jet transition-colors hover:bg-viking"
              >
                ×
              </button>
            </div>
            <p className="mt-6 text-[1rem] leading-relaxed text-ink-soft">{member.description}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/* ----------------------------------------------------------------- page --- */

export default function About() {
  usePageMeta({
    title: "About — DocPharma",
    description:
      "Built for Health. Built for Bharat. The story, values, leadership and investors behind DocPharma's healthcare supply chain.",
  });

  return (
    <>
      <AboutHero />

      {/* ------------------------------------------------------- story --- */}
      <section id="story" className="scroll-mt-4 bg-floral py-20 md:py-28">
        <div className="mx-auto grid max-w-[84rem] items-center gap-10 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal from="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-jet">
              <img src={ABOUT_HERO.image} alt="Inside a DocPharma darkstore" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-jet/60 via-transparent to-transparent" />
            </div>
          </Reveal>

          <Reveal from="right">
            <div className="space-y-4">
              {ABOUT_HERO.body.map((para, i) => (
                <p
                  key={para}
                  className={clsx(
                    "leading-relaxed",
                    i === 1
                      ? "text-[clamp(1.3rem,2.4vw,1.9rem)] font-extrabold tracking-[-0.03em] text-jet"
                      : "text-[1.05rem] text-ink-soft"
                  )}
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ValuesScroll />

      {/* Compliance: how we work, not a badge. */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COMPLIANCE.map((item, i) => (
              <Reveal key={item.title} from="up" delay={i * 0.06}>
                <div className="flex h-full items-center gap-3 rounded-2xl border border-hairline bg-floral px-4 py-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-peppermint text-[#5f8a0f]">
                    <ComplianceIcon name={item.icon} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.92rem] font-bold text-jet">{item.title}</span>
                    <span className="block text-[0.78rem] text-ink-faint">{item.line}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MissionVision />

      <Leadership />

      {/* --------------------------------------------------- investors --- */}
      <section id="investors" className="scroll-mt-24 bg-floral py-20 md:py-24">
        <div className="mx-auto max-w-[84rem] px-5 text-center md:px-10">
          <Reveal from="up">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{INVESTORS.title}</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-jet">
              Backed to build the network.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            {INVESTORS.logos.map((logo, i) => (
              <Reveal key={logo.name} from="up" delay={i * 0.08}>
                <div className="flex h-36 items-center justify-center rounded-3xl border border-hairline bg-white px-8 transition-all duration-500 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_24px_50px_-30px_rgba(5,36,57,.4)]">
                  <LogoImg src={logo.src} alt={logo.name} area={9000} maxWidth={220} maxHeight={84} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ join us --- */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <Reveal from="scale">
            <div className="grid overflow-hidden rounded-[2rem] bg-jet text-white lg:grid-cols-[1fr_1fr]">
              <div className="flex flex-col justify-center p-8 md:p-14">
                <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-green">{JOIN_TEAM.title}</p>
                <h2 className="mt-4 text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
                  {JOIN_TEAM.subtitle}
                </h2>
                <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-white/70">{JOIN_TEAM.description}</p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <a
                      href={JOIN_TEAM.buttonUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-full bg-brand-green py-2 pl-7 pr-2 text-[1rem] font-extrabold text-jet transition-colors hover:bg-white"
                    >
                      {JOIN_TEAM.buttonText}
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-jet text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                        →
                      </span>
                    </a>
                  </Magnetic>
                  <Link
                    to="/partner"
                    className="rounded-full border border-white/25 px-6 py-3.5 text-[0.95rem] font-bold text-white transition-colors hover:border-white/60"
                  >
                    Partner with us
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[18rem] lg:min-h-full">
                <img src={JOIN_TEAM.image} alt="The DocPharma team at work" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-jet via-jet/30 to-transparent max-lg:bg-gradient-to-t" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
