/**
 * About us.
 * The story, what we believe, the founders, mission and vision, and who backs
 * us — in the same light brand language as the home page.
 */

import { Link } from "react-router-dom";
import { Reveal, PageHero } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/experience/Magnetic";
import { CountUp } from "@/components/experience/HeroParts";
import { COMPLIANCE, ComplianceIcon } from "@/components/experience/compliance";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  ABOUT_HERO,
  ABOUT_STORY,
  VALUES,
  FOUNDERS,
  MISSION,
  VISION,
  ABOUT_CLOSER,
  INVESTORS,
} from "@/data/pages";
import stillPick from "@/assets/images/still-pick.jpg";
import stillPack from "@/assets/images/still-pack.jpg";
import stillHandover from "@/assets/images/still-handover.jpg";

const STORY_IMAGES = [stillPick, stillPack, stillHandover];

const HERO_STATS = [
  [50, "+", "Licensed darkstores"],
  [12, "+", "Cities"],
  [10, "L+", "Orders delivered"],
  [500, "+", "In-house fleet"],
];

export default function About() {
  usePageMeta({
    title: "About — DocPharma",
    description:
      "Built for health. Built for Bharat. The story, team, mission and investors behind India's healthcare quick-commerce supply chain.",
  });

  return (
    <>
      <PageHero eyebrow={ABOUT_HERO.eyebrow} headline={ABOUT_HERO.headline} sub={ABOUT_HERO.sub}>
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
        <div className="mx-auto max-w-[84rem] space-y-20 px-5 md:space-y-28 md:px-10">
          {ABOUT_STORY.map((block, i) => (
            <div key={block.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={i % 2 ? "lg:order-last" : undefined}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-jet">
                  <img src={STORY_IMAGES[i % STORY_IMAGES.length]} alt="" className="h-full w-full object-cover" />
                </div>
              </Reveal>

              <div>
                <Reveal>
                  <h2 className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-jet">
                    {block.headline}
                  </h2>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="mt-5 text-[1.15rem] font-semibold leading-relaxed text-jet">{block.lead}</p>
                </Reveal>
                {block.body.map((para, j) => (
                  <Reveal key={para} delay={0.1 + j * 0.05}>
                    <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">{para}</p>
                  </Reveal>
                ))}

                {block.stack ? (
                  <Reveal delay={0.18}>
                    <ul className="mt-7 grid gap-2 sm:grid-cols-2">
                      {block.stack.map((line) => (
                        <li key={line} className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 text-[0.92rem] font-semibold text-jet">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ) : null}

                {block.pull ? (
                  <Reveal delay={0.22}>
                    <p className="mt-8 border-l-2 border-brand-green pl-5 text-[clamp(1.15rem,2.2vw,1.6rem)] font-extrabold leading-snug tracking-[-0.02em] text-jet">
                      {block.pull}
                    </p>
                  </Reveal>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ values --- */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <Reveal>
            <p className="text-[0.8rem] font-bold text-brand-blue">What we believe</p>
            <h2 className="mt-3 max-w-2xl text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-jet">
              {VALUES.headline}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {VALUES.items.map((v, i) => (
              <Reveal key={v.name} delay={(i % 3) * 0.06}>
                <article className="group h-full rounded-3xl border border-hairline bg-floral p-7 transition-colors duration-500 hover:border-brand-blue/30 hover:bg-white">
                  <span className="tabular text-[0.75rem] font-extrabold text-brand-green">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.2rem] font-extrabold tracking-tight text-jet">{v.name}</h3>
                  <p className="mt-2.5 text-[0.98rem] leading-relaxed text-ink-soft">{v.body}</p>
                </article>
              </Reveal>
            ))}

            {/* Compliance sits with the values: it's how we work, not a badge. */}
            <Reveal delay={0.18}>
              <div className="h-full rounded-3xl bg-jet p-7 text-white">
                <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-brand-green">Non-negotiable</p>
                <h3 className="mt-4 text-[1.2rem] font-extrabold tracking-tight">Compliance, built in</h3>
                <ul className="mt-5 grid gap-2">
                  {COMPLIANCE.map((item) => (
                    <li key={item.title} className="flex items-center gap-2.5 text-[0.92rem] font-semibold text-white/85">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-green/15 text-brand-green">
                        <ComplianceIcon name={item.icon} />
                      </span>
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- founders --- */}
      <section className="bg-floral py-20 md:py-28">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <Reveal>
            <p className="text-[0.8rem] font-bold text-brand-blue">The team</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-jet">
              {FOUNDERS.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-ink-soft">{FOUNDERS.lead}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">{FOUNDERS.body}</p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {FOUNDERS.people.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article className="flex h-full flex-col rounded-3xl border border-hairline bg-white p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-jet text-[0.95rem] font-extrabold text-brand-green">
                    {p.initials}
                  </span>
                  <h3 className="mt-6 text-[1.15rem] font-extrabold tracking-tight text-jet">{p.name}</h3>
                  <p className="mt-1 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-brand-blue">{p.role}</p>
                  <blockquote className="mt-5 flex-1 text-[0.98rem] leading-relaxed text-ink-soft">“{p.quote}”</blockquote>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------- mission & vision --- */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-16">
          {[MISSION, VISION].map((block, i) => (
            <Reveal key={block.headline} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-[2rem] border border-hairline p-8 md:p-10">
                <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-green">{block.headline}</p>
                <h2 className="mt-4 text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-jet">
                  {block.lead}
                </h2>
                <div className="mt-5 space-y-3">
                  {block.body.map((para) => (
                    <p key={para} className="text-[1.02rem] leading-relaxed text-ink-soft">
                      {para}
                    </p>
                  ))}
                </div>
                {block.closer ? <p className="mt-6 text-[1.02rem] font-semibold text-brand-blue">{block.closer}</p> : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------- investors --- */}
      <section className="bg-floral py-20 md:py-24">
        <div className="mx-auto max-w-[84rem] px-5 text-center md:px-10">
          <Reveal>
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">{INVESTORS.eyebrow}</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-jet">
              {INVESTORS.headline}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">{INVESTORS.sub}</p>
          </Reveal>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {INVESTORS.names.map((name, i) => (
              <Reveal key={name} delay={i * 0.06}>
                <span className="block rounded-full border border-hairline bg-white px-6 py-3 text-[0.95rem] font-extrabold text-jet">
                  {name}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- closing --- */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-jet via-[#053a66] to-brand-blue-deep px-8 py-14 text-white md:px-14 md:py-20">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-green">{ABOUT_CLOSER.headline}</p>
              <h2 className="mt-5 max-w-3xl text-[clamp(1.9rem,3.8vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.04em]">
                {ABOUT_CLOSER.lead}
              </h2>
              <p className="mt-4 max-w-xl text-[1.08rem] text-white/70">{ABOUT_CLOSER.closer}</p>
              <Magnetic className="mt-9 inline-block">
                <Link
                  to="/partner"
                  className="group flex items-center gap-3 rounded-full bg-brand-green py-2 pl-7 pr-2 text-[1rem] font-extrabold text-jet transition-colors hover:bg-white"
                >
                  Partner with us
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-jet text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
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
