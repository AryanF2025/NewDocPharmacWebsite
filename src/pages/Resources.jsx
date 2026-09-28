/**
 * Resources — press coverage.
 *
 * Its signature moment is the filter: picking a topic re-orders the grid, and
 * the cards animate to their new places rather than snapping. The lead story
 * gets a wider tile, so the page has a clear first read.
 */

import { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PRESS, PRESS_HERO, PRESS_TOPICS } from "@/data/press";
import { HeroBackdrop, HeroHeading, Enter } from "@/components/motion/Hero";
import { CtaButton } from "@/components/motion/CtaButton";
import { useInViewOnce } from "@/components/motion/useInViewOnce";

const EASE = [0.22, 1, 0.36, 1];

function PressCard({ item, lead = false, index = 0 }) {
  const ref = useRef(null);
  const seen = useInViewOnce(ref);
  return (
    <motion.a
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={seen ? { opacity: 1, y: 0 } : undefined}
      exit={{ opacity: 0, scale: 0.96 }}
      href={item.href}
      target="_blank"
      rel="noreferrer"
      transition={{ duration: 0.8, ease: EASE, delay: seen ? (index % 2) * 0.1 : 0, layout: { duration: 0.5, ease: EASE } }}
      className={clsx(
        "group flex flex-col overflow-hidden rounded-[1.75rem] border border-hairline bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_24px_50px_-30px_rgba(5,36,57,.4)]",
        lead && "lg:col-span-2 lg:flex-row"
      )}
    >
      <div className={clsx("relative overflow-hidden bg-floral", lead ? "aspect-[16/9] lg:aspect-auto lg:w-1/2" : "aspect-[16/9]")}>
        <img
          src={item.image}
          alt=""
          loading="lazy"
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
        <HeroBackdrop focus="35% 40%" />

        <div className="relative mx-auto max-w-[84rem] px-5 md:px-10">
          <HeroHeading eyebrow={PRESS_HERO.eyebrow} lines={PRESS_HERO.headline} className="text-[clamp(2.2rem,5vw,4rem)]" />
          <Enter as="p" delay={0.3} className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-ink-soft">
            {PRESS_HERO.sub}
          </Enter>

          {/* Filter */}
          <Enter delay={0.4} className="mt-9 flex flex-wrap gap-2">
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
          </Enter>
        </div>
      </section>

      {/* ------------------------------------------------------ grid --- */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <motion.div layout className="grid gap-5 md:grid-cols-2">
            {shown.map((item, i) => (
              <PressCard key={item.id} item={item} index={i} lead={topic === "All" && i === 0} />
            ))}
          </motion.div>

          {shown.length === 0 ? <p className="py-16 text-center text-ink-faint">Nothing filed under this topic yet.</p> : null}
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
              <CtaButton to="/partner" className="shrink-0">
                Get in touch
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
