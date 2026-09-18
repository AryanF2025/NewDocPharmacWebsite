/**
 * About us — the live site's copy, rebuilt in the new brand language:
 * the story, an auto-advancing values slider, leadership, mission and vision,
 * investors, and the careers call to action.
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Reveal, PageHero } from "@/components/ui/Reveal";
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

const SLIDE_MS = 6000;

/* ------------------------------------------------------- values slider --- */

function ValuesSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = VALUES.slides.length;

  useEffect(() => {
    if (paused) return undefined;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % count), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, count]);

  const slide = VALUES.slides[active];

  return (
    <div
      className="mt-12 overflow-hidden rounded-[2rem] border border-hairline bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        {/* Image track slides sideways between values */}
        <div className="relative aspect-[4/3] overflow-hidden bg-jet lg:aspect-auto lg:min-h-[30rem]">
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

        {/* Copy */}
        <div className="flex flex-col justify-center p-7 md:p-10">
          <div key={active} className="reveal-up">
            <h3 className="text-[clamp(1.4rem,2.6vw,2.1rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-jet">
              {slide.title}
            </h3>
            <p className="mt-5 text-[1rem] leading-relaxed text-ink-soft">{slide.description}</p>
            <p className="mt-3 text-[1.05rem] font-extrabold text-brand-blue">{slide.bold}</p>
          </div>

          {/* Progress bars double as controls */}
          <div className="mt-8 flex gap-2">
            {VALUES.slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show value ${i + 1}: ${s.title}`}
                aria-current={i === active}
                className="h-6 flex-1"
              >
                <span className="block h-1 overflow-hidden rounded-full bg-jet/10">
                  <span
                    key={`${i}-${active}-${paused}`}
                    className={clsx(
                      "block h-full origin-left rounded-full bg-gradient-to-r from-brand-blue to-brand-green",
                      i < active && "scale-x-100",
                      i > active && "scale-x-0",
                      i === active && (paused ? "scale-x-100" : "how-fill")
                    )}
                    style={i === active && !paused ? { animationDuration: `${SLIDE_MS}ms` } : undefined}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- leadership --- */

function LeaderCard({ member, delay }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal from="up" delay={delay}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-hairline bg-white">
        <div className="relative aspect-[4/5] overflow-hidden bg-jet">
          <img
            src={member.image}
            alt={`${member.name}, ${member.designation}`}
            className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jet/85 via-jet/10 to-transparent" />
          <div className="absolute inset-x-5 bottom-5 text-white">
            <h3 className="text-[1.25rem] font-extrabold tracking-tight">{member.name}</h3>
            <p className="mt-0.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brand-green">
              {member.designation}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-[0.95rem] leading-relaxed text-ink-soft">
            {open ? member.description : member.preview}
          </p>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-4 self-start text-[0.88rem] font-bold text-brand-blue transition-colors hover:text-jet"
          >
            {open ? "Read less" : "Read more"}
          </button>
        </div>
      </article>
    </Reveal>
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
      <PageHero eyebrow={ABOUT_HERO.eyebrow} headline={ABOUT_HERO.headline} sub={ABOUT_HERO.lead}>
        <dl className="grid max-w-3xl grid-cols-2 gap-x-6 gap-y-6 border-t border-hairline pt-7 sm:grid-cols-4">
          {HERO_STATS.map(([value, suffix, label]) => (
            <div key={label}>
              <dd className="text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold tracking-tight text-jet">
                <CountUp value={value} suffix={suffix} />
              </dd>
              <dt className="mt-1 text-[0.88rem] text-ink-faint">{label}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* ------------------------------------------------------- story --- */}
      <section className="bg-floral py-20 md:py-28">
        <div className="mx-auto grid max-w-[84rem] items-center gap-10 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal from="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-jet">
              <img src={ABOUT_HERO.image} alt="The DocPharma team on the fulfilment floor" className="h-full w-full object-cover" />
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

      {/* ------------------------------------------------------ values --- */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <Reveal from="left">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{VALUES.title}</p>
            <h2 className="mt-3 max-w-2xl text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-jet">
              {VALUES.subtitle}
            </h2>
          </Reveal>

          <ValuesSlider />

          {/* Compliance: how we work, not a badge. */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* -------------------------------------------- mission & vision --- */}
      <section className="bg-floral py-20 md:py-28">
        <div className="mx-auto grid max-w-[84rem] gap-5 px-5 md:px-10 lg:grid-cols-2">
          {[MISSION, VISION].map((block, i) => (
            <Reveal key={block.label} from={i === 0 ? "left" : "right"}>
              <div
                className={clsx(
                  "flex h-full flex-col justify-between rounded-[2rem] p-8 md:p-12",
                  i === 0 ? "bg-jet text-white" : "border border-hairline bg-white"
                )}
              >
                <p
                  className={clsx(
                    "text-[0.8rem] font-bold uppercase tracking-[0.16em]",
                    i === 0 ? "text-brand-green" : "text-brand-blue"
                  )}
                >
                  {block.label}
                </p>
                <h2
                  className={clsx(
                    "mt-10 text-[clamp(1.5rem,2.8vw,2.3rem)] font-extrabold leading-[1.12] tracking-[-0.03em]",
                    i === 0 ? "text-white" : "text-jet"
                  )}
                >
                  {block.title}
                </h2>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- leadership --- */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <Reveal from="left">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{LEADERSHIP.title}</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-jet">
              {LEADERSHIP.subtitle}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {LEADERSHIP.members.map((member, i) => (
              <LeaderCard key={member.name} member={member} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- investors --- */}
      <section className="bg-floral py-20 md:py-24">
        <div className="mx-auto max-w-[84rem] px-5 text-center md:px-10">
          <Reveal from="up">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{INVESTORS.title}</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-jet">
              Backed to build the network.
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {INVESTORS.logos.map((logo, i) => (
              <Reveal key={logo.name} from="up" delay={i * 0.08}>
                <div className="flex h-24 items-center justify-center rounded-2xl border border-hairline bg-white px-5 transition-colors duration-500 hover:border-brand-blue/30">
                  <LogoImg src={logo.src} alt={logo.name} area={3200} maxWidth={150} maxHeight={52} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- join us --- */}
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
