/**
 * Solutions — who we build for.
 *
 * The hero is the five businesses as a mosaic, pharma weighted largest. Pick
 * one (there, from the header menu, or from the footer) and the solutions
 * section below opens on it: headline, value props ticking in, the outcome and
 * its call to action. Then what powers every one of them, the impact, and a
 * closing call.
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/experience/HeroParts";
import { HeroBackdrop, HeroHeading, Enter, HIGHLIGHT } from "@/components/motion/Hero";
import { SectionHeader } from "@/components/motion/Text";
import { CtaButton, GhostButton } from "@/components/motion/CtaButton";
import { scrollToTarget } from "@/components/motion/smoothScroll";
import { usePageMeta } from "@/hooks/usePageMeta";
import { SOLUTIONS_HERO, SOLUTION_TABS, SOLUTIONS_IMPACT } from "@/data/site";
import stillPick from "@/assets/images/still-pick.jpg";
import stillVerify from "@/assets/images/still-verify.jpg";
import stillPack from "@/assets/images/still-pack.jpg";
import stillRider from "@/assets/images/still-rider.jpg";
import stillHandover from "@/assets/images/still-handover.jpg";

const EASE = [0.22, 1, 0.36, 1];

const ART = {
  pharmacy: stillPick,
  platform: stillVerify,
  insurer: stillHandover,
  d2c: stillPack,
  hospital: stillRider,
};

/** What each business type gets out of it. */
const OUTCOME = {
  "e-pharmacies": "Your pharmacy, live in a new city without a new lease.",
  "corporate-wellness": "Your members order; our network delivers.",
  "health-insurers": "Cover turns into medicine at the member's door.",
  "d2c-health": "Your bestsellers, minutes from your customers.",
  hospitals: "Care that continues after the patient leaves.",
};

/** Mosaic placement: pharma leads, taking the tall tile. */
const TILE_PLACE = [
  "row-span-2",
  "",
  "",
  "",
  "",
];

/** Opens business `i` in the solutions section and brings it into view. */
function useOpen(setPicked) {
  return (i) => {
    setPicked(i);
    const el = document.getElementById("solution-tabs");
    if (el) scrollToTarget(el);
  };
}

/* ------------------------------------------------------------------ hero --- */

function SolutionsHero({ open }) {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-white pb-16 pt-28 md:pb-20 lg:h-[100svh] lg:min-h-[44rem] lg:pb-10 lg:pt-24">
      <HeroBackdrop focus="30% 45%" />

      <div className="relative mx-auto grid w-full max-w-[88rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <HeroHeading
            eyebrow={SOLUTIONS_HERO.eyebrow}
            lines={["End-to-end supply chain,", ["built for", { text: "healthcare.", className: HIGHLIGHT }]]}
            className="text-[clamp(2rem,min(3.8vw,7vh),3.6rem)]"
          />
          <Enter as="p" delay={0.3} className="mt-5 max-w-xl text-[clamp(0.98rem,1.9vh,1.1rem)] leading-relaxed text-ink-soft">
            {SOLUTIONS_HERO.sub}
          </Enter>

          <Enter as="ul" delay={0.4} className="mt-7 flex flex-wrap gap-2">
            {SOLUTIONS_HERO.pills.map((pill) => (
              <li key={pill} className="flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-2 text-[0.86rem] font-semibold text-ink-soft">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-green text-[0.55rem] text-white">✓</span>
                {pill}
              </li>
            ))}
          </Enter>

          <Enter delay={0.5} className="mt-9 flex flex-wrap items-center gap-3">
            <CtaButton to="/partner">Partner with us</CtaButton>
            <GhostButton href="#solutions">Find your solution</GhostButton>
          </Enter>
        </div>

        {/* The five businesses. Hover to read; click to open below. */}
        <div className="grid h-[34rem] grid-cols-2 grid-rows-3 gap-3 sm:h-[38rem] lg:h-[min(72svh,40rem)]">
          {SOLUTION_TABS.map((item, i) => (
            <Enter key={item.id} delay={0.15 + i * 0.08} className={clsx("tile-in min-h-0", TILE_PLACE[i])}>
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative h-full w-full overflow-hidden rounded-[1.5rem] bg-jet text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                <img
                  src={ART[item.art]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-jet/90 via-jet/25 to-transparent transition-colors duration-500 group-hover:from-jet/95 group-hover:via-jet/55" />

                <span className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
                  <span className="tabular block text-[0.7rem] font-extrabold text-brand-green">{String(i + 1).padStart(2, "0")}</span>
                  <span className={clsx("mt-1 flex items-center justify-between gap-3 font-extrabold leading-tight tracking-tight text-white", i === 0 ? "text-[clamp(1.2rem,2vw,1.6rem)]" : "text-[clamp(0.98rem,1.4vw,1.15rem)]")}>
                    {item.tab}
                    <span className="flex h-8 w-8 shrink-0 translate-y-2 items-center justify-center rounded-full bg-white text-[0.85rem] text-jet opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:rotate-[-45deg] group-hover:opacity-100">
                      →
                    </span>
                  </span>
                  {/* The one-liner opens on hover */}
                  <span className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] [grid-template-rows:0fr] group-hover:[grid-template-rows:1fr] group-focus-visible:[grid-template-rows:1fr]">
                    <span className="overflow-hidden">
                      <span className="block pt-2 text-[0.85rem] leading-snug text-white/75">{item.copy}</span>
                    </span>
                  </span>
                </span>
              </button>
            </Enter>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- solutions --- */

function SolutionTabs({ picked, setPicked }) {
  const item = SOLUTION_TABS[picked];

  const onKey = (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    setPicked((picked + step + SOLUTION_TABS.length) % SOLUTION_TABS.length);
  };

  return (
    <section id="solutions" className="relative scroll-mt-24 bg-white py-24 md:py-28">

      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader eyebrow="Who we build for" title="One network. Five ways to plug in." />

        {/* Picking a business (hero tiles, header menu, footer
            /solutions#d2c-health) lands here, on the tabs, so the business
            itself fills the screen rather than the section heading. */}
        <div id="solution-tabs" className="relative scroll-mt-24">
          {SOLUTION_TABS.map((tab) => (
            <span key={tab.id} id={tab.id} aria-hidden className="absolute top-0 block scroll-mt-24" />
          ))}
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Business type"
          onKeyDown={onKey}
          className="-mx-5 mt-10 flex gap-1 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:inline-flex md:rounded-full md:border md:border-hairline md:bg-floral md:p-1.5 [&::-webkit-scrollbar]:hidden"
        >
          {SOLUTION_TABS.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={i === picked}
              tabIndex={i === picked ? 0 : -1}
              onClick={() => setPicked(i)}
              className={clsx(
                "relative shrink-0 rounded-full px-5 py-2.5 text-[0.9rem] font-bold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-blue",
                i === picked ? "text-white" : "text-ink-soft hover:text-jet max-md:border max-md:border-hairline"
              )}
            >
              {i === picked ? (
                <motion.span layoutId="solution-tab" className="absolute inset-0 rounded-full bg-jet" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              ) : null}
              <span className="relative">{tab.tab}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div role="tabpanel" className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14"
            >
              <div>
                <p className="tabular text-[0.8rem] font-extrabold text-brand-blue">
                  {String(picked + 1).padStart(2, "0")} / {String(SOLUTION_TABS.length).padStart(2, "0")} · {item.tab}
                </p>
                <h3 className="mt-3 text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-jet">{item.headline}</h3>
                <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-ink-soft">{item.copy}</p>

                <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {item.props.map((prop, i) => (
                    <motion.li
                      key={prop}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.06 }}
                      className="flex items-start gap-3 text-[0.97rem] font-semibold text-jet"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 22, delay: 0.25 + i * 0.06 }}
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-peppermint text-[0.62rem] text-[#5f8a0f]"
                      >
                        ✓
                      </motion.span>
                      {prop}
                    </motion.li>
                  ))}
                </ul>

                <CtaButton to="/partner" className="mt-10">
                  {item.cta}
                </CtaButton>
              </div>

              <div className="relative">
                <div className="img-wipe is-in relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-jet lg:aspect-auto lg:h-full lg:min-h-[28rem]">
                  <motion.img
                    src={ART[item.art]}
                    alt=""
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: EASE }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jet/85 via-jet/10 to-transparent" />
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
                    className="absolute inset-x-6 bottom-6 text-white md:inset-x-8 md:bottom-8"
                  >
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-brand-green">What you get</p>
                    <p className="mt-2 max-w-md text-[clamp(1.15rem,2vw,1.55rem)] font-extrabold leading-snug tracking-[-0.02em]">{OUTCOME[item.id]}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- powered by --- */

const POWER = [
  {
    key: "fleet",
    eyebrow: "Our own fleet",
    title: "500+ riders who work for us, not a marketplace.",
    body: "Trained on medicine handling, assigned automatically by distance and SLA, and every handover confirmed by OTP.",
    points: ["OTP-verified handover", "Live tracking", "30-minute hyperlocal SLA"],
    image: stillHandover,
    link: { to: "/about", label: "Meet the team" },
  },
  {
    key: "one",
    eyebrow: "DocPharma One",
    title: "One system from shelf to doorstep.",
    body: "Inventory, orders, picking, verification and last mile on our own platform, so every order is visible and every step accountable.",
    points: ["Real-time inventory", "Pharmacist-verified orders", "Plugs into your stack"],
    image: stillVerify,
    link: { to: "/technology", label: "See the technology" },
  },
];

function PoweredBy() {
  return (
    <section className="bg-floral py-24 md:py-28">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader eyebrow="Powered by" title="Every solution runs on the same two things." />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {POWER.map((card, i) => (
            <Reveal key={card.key} from="up" delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-hairline bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-35px_rgba(5,36,57,.45)]">
                <div className="relative aspect-[16/8] overflow-hidden bg-jet">
                  <img
                    src={card.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 md:p-9">
                  <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{card.eyebrow}</p>
                  <h3 className="mt-3 text-[clamp(1.4rem,2.2vw,1.9rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-jet">{card.title}</h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">{card.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {card.points.map((point) => (
                      <li key={point} className="rounded-full bg-floral px-3.5 py-1.5 text-[0.82rem] font-semibold text-jet">
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link to={card.link.to} className="link-underline mt-auto self-start pt-8 text-[0.95rem] font-bold text-brand-blue">
                    {card.link.label} →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- impact --- */

function Impact() {
  return (
    <section className="bg-white py-24 md:py-28">
      <div className="mx-auto max-w-[84rem] px-5 md:px-10">
        <SectionHeader eyebrow={SOLUTIONS_IMPACT.eyebrow} title={SOLUTIONS_IMPACT.headline} />

        <div className="mt-12 grid border-y border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS_IMPACT.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              from="up"
              delay={i * 0.08}
              className={clsx("py-8 sm:px-6 lg:py-10", i > 0 && "max-sm:border-t sm:border-l border-hairline", i === 2 && "sm:max-lg:border-l-0 sm:max-lg:border-t")}
            >
              <p className="text-[clamp(2.4rem,4vw,3.4rem)] font-extrabold leading-none tracking-[-0.05em] text-jet">
                <CountUp value={stat.value} suffix={stat.suffix} delay={i * 100} />
              </p>
              <p className="mt-4 text-[1rem] font-bold text-jet">{stat.label}</p>
              <p className="mt-1 text-[0.9rem] text-ink-faint">{stat.note}</p>
            </Reveal>
          ))}
        </div>

        {/* Closing call */}
        <Reveal from="up" className="mt-20">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-hairline bg-floral px-8 py-10 md:flex-row md:items-center md:px-12">
            <div>
              <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-tight tracking-[-0.03em] text-jet">Not sure where you fit?</h2>
              <p className="mt-2 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">
                Tell us what you sell and where. We&apos;ll map the darkstores, licences and SLA your orders need.
              </p>
            </div>
            <CtaButton to="/partner" className="shrink-0">
              Talk to our team
            </CtaButton>
          </div>
        </Reveal>
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
  const open = useOpen(setPicked);

  // Arriving from the header menu or the footer opens that business type; the
  // app's ScrollManager brings the section itself into view.
  useEffect(() => {
    const i = SOLUTION_TABS.findIndex((tab) => tab.id === hash.slice(1));
    if (i >= 0) setPicked(i);
  }, [hash]);

  return (
    <>
      <SolutionsHero open={open} />
      <SolutionTabs picked={picked} setPicked={setPicked} />
      <PoweredBy />
      <Impact />
    </>
  );
}
