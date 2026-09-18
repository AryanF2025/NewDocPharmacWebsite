/**
 * Resources — press coverage.
 *
 * Its signature moment is the filter: picking a topic re-orders the grid, and
 * the cards animate to their new places rather than snapping. The lead story
 * gets a wider tile, so the page has a clear first read.
 */

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/experience/Magnetic";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PRESS, PRESS_HERO, PRESS_TOPICS } from "@/data/press";
import { INVESTORS } from "@/data/about";
import { LogoImg } from "@/components/ui/LogoImg";

const EASE = [0.22, 1, 0.36, 1];

function PressCard({ item, lead = false }) {
  return (
    <motion.a
      layout
      href={item.href}
      target="_blank"
      rel="noreferrer"
      transition={{ duration: 0.45, ease: EASE }}
      className={clsx(
        "group flex flex-col overflow-hidden rounded-[1.75rem] border border-hairline bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_24px_50px_-30px_rgba(5,36,57,.4)]",
        lead && "lg:col-span-2 lg:flex-row"
      )}
    >
      <div className={clsx("relative overflow-hidden bg-floral", lead ? "aspect-[16/9] lg:aspect-auto lg:w-1/2" : "aspect-[16/9]")}>
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
        />
      </div>

      <div className={clsx("flex flex-1 flex-col p-6 md:p-7", lead && "lg:justify-center lg:p-9")}>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-floral px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
            {item.topic}
          </span>
          <span className="text-[0.82rem] text-ink-faint">{item.date}</span>
        </div>

        <h3
          className={clsx(
            "mt-4 font-extrabold leading-[1.15] tracking-[-0.03em] text-jet",
            lead ? "text-[clamp(1.3rem,2.4vw,1.9rem)]" : "text-[1.1rem]"
          )}
        >
          {item.headline}
        </h3>

        <p className="mt-3 text-[0.9rem] font-bold text-brand-blue">{item.publication}</p>

        <span className="mt-5 inline-flex items-center gap-2 text-[0.88rem] font-bold text-jet">
          Read the article
          <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
        </span>
      </div>
    </motion.a>
  );
}

export default function Resources() {
  usePageMeta({
    title: "Resources — DocPharma",
    description: "Press coverage of DocPharma: the $2M Pre-Series A, the 30-minute network, and the founders' story.",
  });

  const [topic, setTopic] = useState("All");
  const shown = useMemo(() => (topic === "All" ? PRESS : PRESS.filter((item) => item.topic === topic)), [topic]);

  return (
    <>
      {/* ------------------------------------------------------- hero --- */}
      <section className="relative overflow-hidden bg-white pb-12 pt-28 md:pb-16 md:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(5,36,57,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(5,36,57,.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 60% at 35% 40%, #000 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 35% 40%, #000 20%, transparent 75%)",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-24 h-[28rem] w-[28rem] rounded-full bg-brand-blue/10 blur-[130px]" />

        <div className="relative mx-auto max-w-[84rem] px-5 md:px-10">
          <p className="rise text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{PRESS_HERO.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-jet">
            <span className="block overflow-hidden pb-1">
              <span className="wipe block">{PRESS_HERO.headline}</span>
            </span>
          </h1>
          <p className="rise mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-ink-soft" style={{ animationDelay: ".2s" }}>
            {PRESS_HERO.sub}
          </p>

          {/* Filter */}
          <div className="rise mt-9 flex flex-wrap gap-2" style={{ animationDelay: ".3s" }}>
            {PRESS_TOPICS.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setTopic(name)}
                aria-pressed={topic === name}
                className={clsx(
                  "relative rounded-full px-4 py-2 text-[0.85rem] font-bold transition-colors duration-300",
                  topic === name ? "text-white" : "text-ink-soft hover:text-jet"
                )}
              >
                {topic === name ? (
                  <motion.span layoutId="press-filter" className="absolute inset-0 -z-10 rounded-full bg-jet" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                ) : (
                  <span className="absolute inset-0 -z-10 rounded-full border border-hairline bg-white" />
                )}
                {name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ grid --- */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <motion.div layout className="grid gap-5 md:grid-cols-2">
            {shown.map((item, i) => (
              <PressCard key={item.id} item={item} lead={topic === "All" && i === 0} />
            ))}
          </motion.div>

          {shown.length === 0 ? <p className="py-16 text-center text-ink-faint">Nothing filed under this topic yet.</p> : null}
        </div>
      </section>

      {/* -------------------------------------------------- investors --- */}
      <section className="bg-floral py-20 md:py-24">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <Reveal from="left">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{INVESTORS.title}</p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-jet">
              Backed to build the network.
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {INVESTORS.logos.map((logo, i) => (
              <Reveal key={logo.name} from="up" delay={i * 0.06}>
                <div className="flex h-32 items-center justify-center rounded-3xl border border-hairline bg-white px-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/30">
                  <LogoImg src={logo.src} alt={logo.name} area={8000} maxWidth={200} maxHeight={76} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- press kit --- */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <Reveal from="up">
            <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-hairline bg-floral px-8 py-10 md:flex-row md:items-center md:px-12">
              <div>
                <h2 className="text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold leading-tight tracking-[-0.03em] text-jet">
                  Writing about DocPharma?
                </h2>
                <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">
                  Our partnerships team can help with figures, quotes and interviews.
                </p>
              </div>
              <Magnetic>
                <Link
                  to="/partner"
                  className="group flex shrink-0 items-center gap-3 rounded-full bg-brand-blue py-2 pl-7 pr-2 text-[0.98rem] font-bold text-white transition-colors duration-300 hover:bg-jet"
                >
                  Get in touch
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-[-45deg]">
                    →
                  </span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
