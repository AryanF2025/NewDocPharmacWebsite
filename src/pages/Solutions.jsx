/**
 * Solutions — who we build for.
 *
 * This page's own device is the configurator: pick a business type and the
 * network assembles itself, module by module, with the outcome and the call to
 * action changing to match. Nothing here is borrowed from another page.
 */

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/experience/HeroParts";
import { HeroBackdrop, HeroHeading, Enter, HIGHLIGHT } from "@/components/motion/Hero";
import { SectionHeader } from "@/components/motion/Text";
import { CtaButton } from "@/components/motion/CtaButton";
import { usePageMeta } from "@/hooks/usePageMeta";
import { SOLUTIONS_HERO, SOLUTION_TABS, SOLUTIONS_IMPACT } from "@/data/site";
import stillPick from "@/assets/images/still-pick.jpg";
import stillVerify from "@/assets/images/still-verify.jpg";
import stillPack from "@/assets/images/still-pack.jpg";
import stillRider from "@/assets/images/still-rider.jpg";
import stillHandover from "@/assets/images/still-handover.jpg";

const ART = {
  pharmacy: stillPick,
  platform: stillVerify,
  insurer: stillHandover,
  d2c: stillPack,
  hospital: stillRider,
};

/** What each business type gets out of it — the line under the assembled stack. */
const OUTCOME = {
  "e-pharmacies": "Your pharmacy, live in a new city without a new lease.",
  "corporate-wellness": "Your members order; our network delivers.",
  "health-insurers": "Cover turns into medicine at the member's door.",
  "d2c-health": "Your bestsellers, minutes from your customers.",
  hospitals: "Care that continues after the patient leaves.",
};

/* ------------------------------------------------------------------ hero --- */

function SolutionsHero({ onPick }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held) return undefined;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % SOLUTION_TABS.length), 3200);
    return () => window.clearTimeout(id);
  }, [active, held]);

  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-white pb-16 pt-28 md:pb-20 lg:h-[100svh] lg:min-h-[44rem] lg:pt-24">
      <HeroBackdrop focus="35% 45%" />

      <div className="relative mx-auto grid w-full max-w-[88rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <HeroHeading
            eyebrow={SOLUTIONS_HERO.eyebrow}
            lines={["End-to-end supply chain,", ["built for", { text: "healthcare.", className: HIGHLIGHT }]]}
            className="text-[clamp(2rem,min(4vw,7.4vh),3.9rem)]"
          />

          <Enter as="p" delay={0.35} className="mt-5 max-w-xl text-[clamp(0.98rem,1.9vh,1.12rem)] leading-relaxed text-ink-soft">
            {SOLUTIONS_HERO.sub}
          </Enter>

          <Enter as="ul" delay={0.45} className="mt-7 border-t border-hairline" onMouseLeave={() => setHeld(false)}>
            {SOLUTION_TABS.map((item, i) => (
              <li key={item.id}>
                <a
                  href="#build"
                  onClick={() => onPick(i)}
                  onMouseEnter={() => {
                    setHeld(true);
                    setActive(i);
                  }}
                  onFocus={() => {
                    setHeld(true);
                    setActive(i);
                  }}
                  className="group flex items-center justify-between border-b border-hairline py-[clamp(0.5rem,1.5vh,0.85rem)]"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="tabular text-[0.7rem] font-extrabold text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={clsx(
                        "text-[clamp(0.98rem,2vh,1.15rem)] font-extrabold tracking-tight transition-colors duration-300",
                        i === active ? "text-brand-blue" : "text-jet group-hover:text-brand-blue"
                      )}
                    >
                      {item.tab}
                    </span>
                  </span>
                  <span
                    className={clsx(
                      "text-brand-blue transition-all duration-300",
                      i === active ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    )}
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </Enter>
        </div>

        <Enter delay={0.2} className="hero-film relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.25rem] bg-jet shadow-[0_50px_100px_-45px_rgba(5,36,57,.6)] lg:aspect-auto lg:h-[min(64svh,32rem)]">
            {SOLUTION_TABS.map((item, i) => (
              <img
                key={item.id}
                src={ART[item.art]}
                alt=""
                className={clsx("sol-slide absolute inset-0 h-full w-full object-cover", i === active && "is-active")}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-jet/80 via-jet/10 to-transparent" />
            <div key={active} className="sol-caption absolute inset-x-6 bottom-6 text-white">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-brand-green">{SOLUTION_TABS[active].tab}</p>
              <p className="mt-2 max-w-md text-[clamp(1.05rem,2.2vw,1.5rem)] font-extrabold leading-snug tracking-[-0.02em]">
                {SOLUTION_TABS[active].copy}
              </p>
            </div>
          </div>
        </Enter>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- configurator --- */

/**
 * The page's own idea: choosing a business type assembles its network, one
 * module at a time, and the outcome and call to action follow the choice.
 */
function Configurator({ picked, setPicked }) {
  const item = SOLUTION_TABS[picked];

  return (
    <section id="build" className="scroll-mt-24 bg-jet py-20 text-white md:py-28">
      {/* The header menu and the footer link straight to a business type
          (/solutions#d2c-health). These are the marks those links land on —
          all five sit here, because the configurator is where they all lead. */}
      {SOLUTION_TABS.map((tab) => (
        <span key={tab.id} id={tab.id} aria-hidden className="block scroll-mt-24" />
      ))}

      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader tone="dark" eyebrow="Build your network" title="Pick what you are. We'll assemble the rest." />

        {/* Choose */}
        <div className="mt-9 flex flex-wrap gap-2">
          {SOLUTION_TABS.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPicked(i)}
              aria-pressed={i === picked}
              className={clsx(
                "relative rounded-full px-5 py-2.5 text-[0.88rem] font-bold transition-colors duration-300",
                i === picked ? "text-jet" : "text-white/70 hover:text-white"
              )}
            >
              {i === picked ? (
                <motion.span
                  layoutId="config-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-brand-green"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : (
                <span className="absolute inset-0 -z-10 rounded-full border border-white/20" />
              )}
              {tab.tab}
            </button>
          ))}
        </div>

        {/* Assemble */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div key={item.id} className="reveal-up">
            <h3 className="text-[clamp(1.4rem,2.6vw,2.2rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">{item.headline}</h3>
            <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-white/65">{item.copy}</p>

            <p className="mt-8 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-white/45">What you get</p>
            <p className="mt-3 max-w-md text-[clamp(1.1rem,2.2vw,1.5rem)] font-extrabold leading-snug tracking-[-0.02em] text-brand-green">
              {OUTCOME[item.id]}
            </p>

            <CtaButton to="/partner" variant="white" className="mt-8">
              {item.cta}
            </CtaButton>
          </div>

          {/* The modules snap into place, one after another. */}
          <ul className="grid gap-2.5">
            {item.props.map((prop, i) => (
              <li
                key={`${item.id}-${prop}`}
                className="reveal-up flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors duration-300 hover:border-brand-green/40 hover:bg-white/[0.07]"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-green/15 text-[0.7rem] font-extrabold text-brand-green">
                  ✓
                </span>
                <span className="text-[0.98rem] font-semibold text-white/90">{prop}</span>
                <span className="tabular ml-auto text-[0.72rem] font-extrabold text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- outcomes --- */

/** The figures, on a rail that fills as the section passes. */
function Outcomes() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const rail = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const width = useTransform(rail, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader eyebrow={SOLUTIONS_IMPACT.eyebrow} title={SOLUTIONS_IMPACT.headline} />

        <div className="relative mt-12 h-0.5 rounded-full bg-jet/10">
          <motion.span className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-blue to-brand-green" style={{ width }} />
        </div>

        <div className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS_IMPACT.stats.map((stat, i) => (
            <Reveal key={stat.label} from="up" delay={(i % 4) * 0.06}>
              <div className="h-full bg-white p-6 md:p-8">
                <p className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-none tracking-[-0.05em] text-jet">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-[0.95rem] font-bold text-jet">{stat.label}</p>
                <p className="mt-1 text-[0.88rem] text-ink-faint">{stat.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page --- */

export default function Solutions() {
  usePageMeta({
    title: "Solutions — DocPharma",
    description:
      "End-to-end supply chain built for healthcare: e-pharmacies, corporate wellness platforms, health insurers, D2C brands, doctors and hospitals.",
  });

  const { hash } = useLocation();
  const [picked, setPicked] = useState(() => {
    const i = SOLUTION_TABS.findIndex((tab) => tab.id === hash.slice(1));
    return i < 0 ? 0 : i;
  });

  // Arriving from the header menu or the footer opens that business type; the
  // app's ScrollManager brings the section itself into view.
  useEffect(() => {
    const i = SOLUTION_TABS.findIndex((tab) => tab.id === hash.slice(1));
    if (i >= 0) setPicked(i);
  }, [hash]);

  return (
    <>
      <SolutionsHero onPick={setPicked} />
      <Configurator picked={picked} setPicked={setPicked} />
      <Outcomes />
    </>
  );
}
