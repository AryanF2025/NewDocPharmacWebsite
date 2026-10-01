/**
 * About us — the live site's copy in the new brand language: a full-screen
 * opening, the story, values as a deck of cards that stack as you scroll,
 * mission and vision as oversized type, leadership, investors and careers.
 */

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { LogoImg } from "@/components/ui/LogoImg";
import { HeroBackdrop, HeroHeading, Enter, HIGHLIGHT } from "@/components/motion/Hero";
import { SectionHeader, SplitText, Eyebrow } from "@/components/motion/Text";
import { ParallaxImage } from "@/components/motion/Media";
import { CtaButton, GhostButton } from "@/components/motion/CtaButton";
import { lockScroll } from "@/components/motion/smoothScroll";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ABOUT_HERO, VALUES, MISSION, VISION, LEADERSHIP, INVESTORS, JOIN_TEAM } from "@/data/about";

/* ------------------------------------------------------------------ hero --- */

function AboutHero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white lg:h-[100svh] lg:min-h-[44rem]">
      <HeroBackdrop focus="35% 40%" />

      <div className="relative mx-auto grid w-full max-w-[88rem] flex-1 items-center gap-12 px-5 pb-12 pt-28 md:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-6 lg:pt-24 xl:px-16">
        <div>
          <HeroHeading
            eyebrow={ABOUT_HERO.eyebrow}
            lines={["Built for Health.", ["Built for", { text: "Bharat.", className: HIGHLIGHT }]]}
            className="text-[clamp(2.2rem,min(4.4vw,8vh),4.6rem)]"
          />
          <Enter as="p" delay={0.35} className="mt-6 text-[clamp(1.15rem,2.4vh,1.5rem)] font-extrabold tracking-[-0.02em] text-jet">
            {ABOUT_HERO.lead}
          </Enter>
          <Enter as="p" delay={0.42} className="mt-3 max-w-xl text-[clamp(1rem,2vh,1.12rem)] leading-relaxed text-ink-soft">
            {ABOUT_HERO.body[0]}
          </Enter>
          <Enter delay={0.5} className="mt-8 flex flex-wrap gap-3">
            <CtaButton to="/partner">Partner with us</CtaButton>
            <GhostButton href="#mission">Our mission</GhostButton>
          </Enter>
        </div>

        {/* The team, filling the right-hand side */}
        <Enter delay={0.2} className="hero-film relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-jet shadow-[0_50px_100px_-45px_rgba(5,36,57,.65)] lg:aspect-auto lg:h-[min(68svh,34rem)]">
            <img src={JOIN_TEAM.groupImage} alt="The DocPharma team" className="hero-film-img h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-jet/80 via-jet/10 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white">
              <p className="label text-brand-green">The team behind the network</p>
              <p className="mt-2 max-w-md text-[clamp(1.05rem,2vw,1.5rem)] font-extrabold leading-snug tracking-[-0.02em]">
                Darkstores, pharmacists, technology and our own fleet, in one connected network.
              </p>
            </div>
          </div>
        </Enter>
      </div>

    </section>
  );
}

/* ----------------------------------------------------------------- story --- */

function Story() {
  return (
    <section id="story" className="scroll-mt-4 bg-floral py-24 md:py-32">
      <div className="mx-auto grid max-w-[84rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <ParallaxImage src={ABOUT_HERO.image} alt="Inside a DocPharma darkstore" className="aspect-[4/3] rounded-[2rem]">
          <div className="absolute inset-0 bg-gradient-to-t from-jet/60 via-transparent to-transparent" />
        </ParallaxImage>

        <div>
          <Eyebrow>Our story</Eyebrow>
          <SplitText
            lines={ABOUT_HERO.body[1]}
            className="mt-4 text-[clamp(1.8rem,3.2vw,2.7rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-jet"
          />
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-lg text-[1.08rem] leading-relaxed text-ink-soft">{ABOUT_HERO.body[2]}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------- values, as a stack --- */

/**
 * One value card. It sticks near the top of the screen; as the next card
 * slides up over it, it eases back — smaller and dimmer — so the deck reads
 * as a stack being built rather than a list going past.
 */
function ValueCard({ slide, i, count, progress }) {
  const reduce = useReducedMotion();
  const target = 1 - (count - 1 - i) * 0.05;
  const scale = useTransform(progress, [i / count, 1], [1, target]);
  const dim = useTransform(progress, [i / count, 1], [0, (count - 1 - i) * 0.12]);

  return (
    // Every card is pinned, so the stack leaves as one piece with the last card
    // on top. The last card needs no scroll room after it, so its wrapper is
    // only as tall as the card — the stack releases the moment it lands.
    <div
      className={clsx(
        "sticky top-0 flex items-start justify-center pt-[calc(6rem+var(--offset))]",
        i < count - 1 ? "h-[88svh]" : "pb-24"
      )}
      style={{ "--offset": `${i * 1.6}rem` }}
    >
      <motion.article
        style={reduce ? undefined : { scale, transformOrigin: "50% 0%" }}
        className={clsx(
          "relative grid w-full overflow-hidden rounded-[2rem] border border-hairline shadow-[0_-20px_60px_-40px_rgba(5,36,57,.45)] lg:h-[min(64svh,34rem)] lg:grid-cols-[1fr_1.05fr]",
          "bg-floral"
        )}
      >
        <div className="flex flex-col justify-between gap-8 p-7 md:p-11">
          <div className="flex items-center justify-between">
            <span className="tabular text-[0.8rem] font-extrabold text-brand-blue">
              {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <span className="label text-ink-faint">{VALUES.title}</span>
          </div>
          <div>
            <h3 className="text-[clamp(1.6rem,3vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-jet">{slide.title}</h3>
            <p className="mt-4 line-clamp-5 max-w-lg text-[clamp(0.92rem,1.9vh,1.02rem)] leading-relaxed text-ink-soft lg:line-clamp-none">
              {slide.description}
            </p>
            <p className="mt-4 text-[1.08rem] font-extrabold text-brand-blue">{slide.bold}</p>
          </div>
        </div>
        <div className="relative min-h-[14rem] overflow-hidden">
          <img src={slide.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        {/* Receding cards dim under the one arriving on top. */}
        <motion.span aria-hidden className="pointer-events-none absolute inset-0 bg-jet" style={{ opacity: reduce ? 0 : dim }} />
      </motion.article>
    </div>
  );
}

function ValuesStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const count = VALUES.slides.length;

  return (
    <section className="bg-white pt-24 md:pt-32">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader eyebrow={VALUES.title} title="What we are building, and why." />
        <div ref={ref} className="relative mt-4">
          {VALUES.slides.map((slide, i) => (
            <ValueCard key={slide.title} slide={slide} i={i} count={count} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ mission & vision --- */

/**
 * Mission and vision as oversized outlined words — MISSION in brand blue,
 * VISION in brand green — with the statement set solid across each. The
 * outlines drift in opposite directions as the section passes.
 */
function MissionVision() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const driftLeft = useTransform(scrollYProgress, [0, 1], ["-8%", "4%"]);
  const driftRight = useTransform(scrollYProgress, [0, 1], ["8%", "-4%"]);

  const rows = [
    { ...MISSION, word: "MISSION", index: "01", stamp: "Today", stroke: "#0296D9", dot: "bg-brand-blue", drift: driftLeft, align: "" },
    {
      ...VISION,
      word: "VISION",
      index: "02",
      stamp: "Where we're going",
      stroke: "#8FC124",
      dot: "bg-brand-green",
      drift: driftRight,
      align: "lg:ml-auto lg:text-right",
    },
  ];

  return (
    <section
      id="mission"
      ref={ref}
      className="relative flex scroll-mt-24 flex-col justify-center overflow-hidden bg-jet py-20 text-white md:py-24 lg:min-h-[100svh] lg:pb-10 lg:pt-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 78%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[84rem] px-5 md:px-10">
        <Eyebrow tone="dark">Mission &amp; Vision</Eyebrow>

        <div className="mt-8 space-y-14 lg:space-y-[clamp(1.25rem,5vh,3.5rem)]">
          {rows.map((row) => (
            <div key={row.word} className={clsx("group relative max-w-3xl", row.align)}>
              {/* Outlined by default; a solid copy sweeps across it on hover. */}
              <motion.p
                aria-hidden
                style={{ x: reduce ? 0 : row.drift }}
                className="relative select-none text-[clamp(3rem,min(8.5vw,13vh),7rem)] font-extrabold leading-[0.8] tracking-[-0.05em]"
              >
                <span className="block" style={{ WebkitTextStrokeWidth: "2px", WebkitTextStrokeColor: row.stroke, color: "transparent" }}>
                  {row.word}
                </span>
                <span
                  className={clsx(
                    "absolute inset-0 block overflow-hidden whitespace-nowrap transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
                    "w-0 group-hover:w-full [@media(hover:none)]:w-full",
                    row.align && "ml-auto"
                  )}
                  style={{ color: row.stroke }}
                >
                  {row.word}
                </span>
              </motion.p>

              <div className="relative -mt-[0.38em]">
                <Reveal>
                  <div className={clsx("flex items-center gap-3", row.align && "lg:justify-end")}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white/80 backdrop-blur">
                      <span className={clsx("h-1.5 w-1.5 rounded-full", row.dot)} />
                      {row.label}
                    </span>
                    <span className="tabular text-[0.75rem] font-extrabold text-white/45">{row.index}</span>
                  </div>
                </Reveal>

                <SplitText
                  lines={row.title}
                  className="mt-3 text-[clamp(1.35rem,min(2.5vw,3.6vh),2.1rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-white"
                />
                <Reveal delay={0.15}>
                  <p className={clsx("mt-3 max-w-xl text-[clamp(0.95rem,1.9vh,1.05rem)] leading-relaxed text-white/65", row.align && "lg:ml-auto")}>
                    {row.body}
                  </p>
                  <p className="mt-3 label text-white/45">{row.stamp}</p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- leadership --- */

/**
 * The founders: compact cards with a short bio, the full bio in a dialog so
 * the cards stay even.
 */
function Leadership() {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (event) => event.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open]);

  const member = open === null ? null : LEADERSHIP.members[open];

  return (
    <section id="leadership" className="scroll-mt-4 bg-floral py-24 md:py-32">
      <div className="mx-auto w-full max-w-[84rem] px-5 md:px-10">
        <SectionHeader eyebrow={LEADERSHIP.title} title={LEADERSHIP.subtitle} />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {LEADERSHIP.members.map((person, i) => (
            <Reveal key={person.name} from="up" delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-hairline bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-35px_rgba(5,36,57,.45)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-jet lg:aspect-auto lg:h-[min(34svh,20rem)]">
                  <img
                    src={person.image}
                    alt={`${person.name}, ${person.designation}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top grayscale-[35%] transition-[transform,filter] duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jet/85 via-jet/10 to-transparent" />
                  <div className="absolute inset-x-5 bottom-4 text-white">
                    <h3 className="text-[1.15rem] font-extrabold tracking-tight">{person.name}</h3>
                    <p className="mt-0.5 label text-brand-green">{person.designation}</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="line-clamp-3 text-[0.92rem] leading-relaxed text-ink-soft">{person.preview}</p>
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className="link-underline mt-1 self-start py-2.5 text-[0.85rem] font-bold text-brand-blue"
                  >
                    Read full profile →
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {member ? (
        <div
          className="fade-in fixed inset-0 z-[80] flex items-end justify-center bg-jet/70 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label={`${member.name}, ${member.designation}`}
          onClick={() => setOpen(null)}
        >
          <div
            className="reveal-up max-h-[85svh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 md:p-9"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <img src={member.image} alt="" className="h-20 w-20 shrink-0 rounded-2xl object-cover object-top" />
              <div className="min-w-0 flex-1">
                <h3 className="text-[1.35rem] font-extrabold tracking-tight text-jet">{member.name}</h3>
                <p className="mt-1 label text-brand-blue">{member.designation}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-floral text-[1.2rem] text-jet transition-[background-color,transform] duration-300 hover:rotate-90 hover:bg-viking"
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
      <Story />
      <ValuesStack />
      <MissionVision />
      <Leadership />

      {/* --------------------------------------------------- investors --- */}
      <section id="investors" className="scroll-mt-24 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[84rem] px-5 text-center md:px-10">
          <SectionHeader align="center" eyebrow={INVESTORS.title} title="Backed to build the network." />

          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            {INVESTORS.logos.map((logo, i) => (
              <Reveal key={logo.name} from="scale" delay={i * 0.08}>
                <div className="flex h-36 items-center justify-center rounded-3xl border border-hairline bg-floral px-8 transition-all duration-500 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_24px_50px_-30px_rgba(5,36,57,.4)]">
                  <LogoImg src={logo.src} alt={logo.name} area={9000} maxWidth={220} maxHeight={84} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ join us --- */}
      <section className="bg-white pb-24 md:pb-32">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <Reveal from="scale">
            <div className="grid overflow-hidden rounded-[2rem] bg-jet text-white lg:grid-cols-[1fr_1fr]">
              <div className="flex flex-col justify-center p-8 md:p-14">
                <Eyebrow tone="dark">{JOIN_TEAM.title}</Eyebrow>
                <SplitText
                  lines={JOIN_TEAM.subtitle}
                  className="mt-4 text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.04em]"
                />
                <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-white/70">{JOIN_TEAM.description}</p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <CtaButton href={JOIN_TEAM.buttonUrl} variant="green">
                    {JOIN_TEAM.buttonText}
                  </CtaButton>
                  <GhostButton to="/partner" tone="dark">
                    Partner with us
                  </GhostButton>
                </div>
              </div>

              <ParallaxImage src={JOIN_TEAM.image} alt="The DocPharma team at work" className="min-h-[18rem] lg:min-h-full" strength={8}>
                <div className="absolute inset-0 bg-gradient-to-r from-jet via-jet/30 to-transparent max-lg:bg-gradient-to-t" />
              </ParallaxImage>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
