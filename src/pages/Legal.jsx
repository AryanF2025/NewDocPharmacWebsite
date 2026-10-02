/**
 * Privacy Policy and Terms & Conditions.
 *
 * Long documents, so the motion here is navigational rather than decorative:
 * a reading-progress bar, and a contents rail that highlights the section
 * you're in and scrolls itself to keep that item in view.
 */

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion, useScroll, useSpring } from "motion/react";
import { usePageSeo } from "@/seo/usePageSeo";
import { HeroHeading, Enter } from "@/components/motion/Hero";
import { LEGAL_CONTACT, PRIVACY_POLICY, TERMS_AND_CONDITIONS } from "@/data/legal";

const LIST_TYPES = new Set(["bullet", "item", "sub"]);

/** One block of legal copy: a paragraph, or a list point ("bullet" and
 *  "item" are top-level points; "sub" is a point nested under the one above). */
function Block({ block }) {
  if (LIST_TYPES.has(block.type)) {
    const sub = block.type === "sub";
    return (
      <li className={sub ? "ml-6 flex gap-3 text-[0.97rem] leading-relaxed text-ink-soft" : "flex gap-3 text-[1rem] leading-relaxed text-ink-soft"}>
        <span
          aria-hidden
          className={sub ? "mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full border border-brand-green" : "mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green"}
        />
        <span>
          {block.label ? <strong className="font-bold text-jet">{block.label}: </strong> : null}
          {block.text}
        </span>
      </li>
    );
  }
  return <p className="text-[1rem] leading-relaxed text-ink-soft">{block.text}</p>;
}

/** List points need a list around them; paragraphs don't. */
function Body({ body }) {
  const out = [];
  let bullets = [];

  const flush = (key) => {
    if (!bullets.length) return;
    out.push(
      <ul key={`ul-${key}`} className="space-y-3">
        {bullets}
      </ul>
    );
    bullets = [];
  };

  body.forEach((block, i) => {
    if (LIST_TYPES.has(block.type)) {
      bullets.push(<Block key={i} block={block} />);
      return;
    }
    flush(i);
    out.push(<Block key={i} block={block} />);
  });
  flush("end");

  return <div className="space-y-4">{out}</div>;
}

function LegalDocument({ doc, seoKey }) {
  const [active, setActive] = useState(doc.sections[0]?.id);
  const sectionRefs = useRef({});
  const railRef = useRef(null);

  usePageSeo(seoKey);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Keep the current item visible in the rail without moving the page.
  useEffect(() => {
    const rail = railRef.current;
    const item = rail?.querySelector(`[data-rail="${active}"]`);
    if (!rail || !item) return;
    const top = item.offsetTop - rail.clientHeight / 2 + item.clientHeight / 2;
    rail.scrollTo({ top, behavior: "smooth" });
  }, [active]);

  return (
    <>
      {/* How far through the document you are. */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-blue to-brand-green"
        style={{ scaleX: progress }}
      />

      <section className="relative overflow-hidden bg-white pb-12 pt-28 md:pt-36">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-24 h-[28rem] w-[28rem] rounded-full bg-brand-blue/10 blur-[130px]" />
        <div className="relative mx-auto max-w-[84rem] px-5 md:px-10">
          <HeroHeading eyebrow="Legal" lines={doc.title} className="text-[clamp(2.1rem,4.4vw,3.6rem)]" />
          <Enter as="p" delay={0.3} className="mt-4 text-[0.92rem] text-ink-faint">
            {doc.effectiveDate ? `Effective ${doc.effectiveDate} · ` : ""}
            {doc.sections.length} sections
          </Enter>
        </div>
      </section>

      <section className="bg-white pb-20 md:pb-28">
        <div className="mx-auto grid max-w-[84rem] gap-10 px-5 md:px-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
          {/* Contents */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="label text-ink-faint">Contents</p>
            <nav ref={railRef} className="rail-scroll mt-4 max-h-[60svh] overflow-y-auto pr-2">
              <ol className="space-y-1">
                {doc.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      data-rail={section.id}
                      className={clsx(
                        "group flex items-start gap-3 rounded-xl px-3 py-2 text-[0.88rem] transition-colors duration-300",
                        active === section.id ? "bg-floral font-bold text-jet" : "text-ink-soft hover:bg-floral/70"
                      )}
                    >
                      <span
                        className={clsx(
                          "tabular flex h-6 w-7 shrink-0 items-center justify-center rounded-md text-[0.72rem] font-extrabold transition-colors duration-300",
                          active === section.id ? "bg-brand-blue text-white" : "bg-floral text-ink-faint group-hover:text-jet"
                        )}
                      >
                        {String(section.number).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 pt-0.5 leading-snug">{section.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* The document */}
          <div>
            <div className="space-y-4 border-b border-hairline pb-10">
              {doc.intro.map((block, i) => (
                <p key={i} className="text-[1.05rem] leading-relaxed text-ink-soft">
                  {block.text}
                </p>
              ))}
            </div>

            <div className="mt-10 space-y-12">
              {doc.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="scroll-mt-28"
                >
                  <div className="flex items-start gap-4">
                    {/* Number badge, centred on the heading first line. */}
                    <span className="flex h-[1.25em] shrink-0 items-center text-[clamp(1.25rem,2.2vw,1.7rem)]">
                      <span className="tabular flex h-9 w-9 items-center justify-center rounded-xl bg-peppermint text-[0.82rem] font-extrabold text-[#5f8a0f]">
                        {String(section.number).padStart(2, "0")}
                      </span>
                    </span>
                    <h2 className="text-[clamp(1.25rem,2.2vw,1.7rem)] font-extrabold leading-tight tracking-[-0.03em] text-jet">
                      {section.heading}
                    </h2>
                  </div>
                  <div className="mt-4">
                    <Body body={section.body} />
                  </div>
                </section>
              ))}
            </div>

            {/* Who to contact about this document */}
            <div className="mt-14 rounded-[2rem] border border-hairline bg-floral p-7 md:p-9">
              <p className="label text-brand-blue">Questions about this document</p>
              <p className="mt-4 text-[1.05rem] font-extrabold text-jet">{LEGAL_CONTACT.company}</p>
              <p className="mt-1 text-[0.95rem] text-ink-soft">{LEGAL_CONTACT.name}</p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[0.95rem]">
                <a href={`tel:${LEGAL_CONTACT.phone.replace(/\s/g, "")}`} className="inline-flex min-h-10 items-center font-bold text-jet transition-colors hover:text-brand-blue">
                  {LEGAL_CONTACT.phone}
                </a>
                <a href={`mailto:${LEGAL_CONTACT.email}`} className="inline-flex min-h-10 items-center font-semibold text-ink-soft transition-colors hover:text-brand-blue">
                  {LEGAL_CONTACT.email}
                </a>
              </div>
              <address className="mt-3 text-[0.92rem] not-italic leading-relaxed text-ink-faint">{LEGAL_CONTACT.address}</address>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalDocument
      doc={PRIVACY_POLICY}
      seoKey="privacy"
    />
  );
}

export function TermsOfUse() {
  return (
    <LegalDocument
      doc={TERMS_AND_CONDITIONS}
      seoKey="terms"
    />
  );
}
