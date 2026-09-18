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
import { usePageMeta } from "@/hooks/usePageMeta";
import { LEGAL_CONTACT, PRIVACY_POLICY, TERMS_AND_CONDITIONS } from "@/data/legal";

/** One block of legal copy: paragraph, labelled bullet, or plain list item. */
function Block({ block }) {
  if (block.type === "bullet") {
    return (
      <li className="flex gap-3 text-[1rem] leading-relaxed text-ink-soft">
        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
        <span>
          {block.label ? <strong className="font-bold text-jet">{block.label}: </strong> : null}
          {block.text}
        </span>
      </li>
    );
  }
  return <p className="text-[1rem] leading-relaxed text-ink-soft">{block.text}</p>;
}

/** Bullets need a list around them; paragraphs don't. */
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
    if (block.type === "bullet") {
      bullets.push(<Block key={i} block={block} />);
      return;
    }
    flush(i);
    out.push(<Block key={i} block={block} />);
  });
  flush("end");

  return <div className="space-y-4">{out}</div>;
}

function LegalDocument({ doc, description }) {
  const [active, setActive] = useState(doc.sections[0]?.id);
  const sectionRefs = useRef({});
  const railRef = useRef(null);

  usePageMeta({ title: `${doc.title} — DocPharma`, description });

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
          <p className="rise text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">Legal</p>
          <h1 className="mt-4 text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-jet">
            <span className="block overflow-hidden pb-1">
              <span className="wipe block">{doc.title}</span>
            </span>
          </h1>
          <p className="rise mt-4 text-[0.92rem] text-ink-faint" style={{ animationDelay: ".2s" }}>
            {doc.effectiveDate ? `Effective ${doc.effectiveDate} · ` : ""}
            {doc.sections.length} sections
          </p>
        </div>
      </section>

      <section className="bg-white pb-20 md:pb-28">
        <div className="mx-auto grid max-w-[84rem] gap-10 px-5 md:px-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
          {/* Contents */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink-faint">Contents</p>
            <nav ref={railRef} className="mt-4 max-h-[60svh] overflow-y-auto pr-2 [scrollbar-width:thin]">
              <ol className="space-y-1">
                {doc.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      data-rail={section.id}
                      className={clsx(
                        "flex gap-3 rounded-xl px-3 py-2 text-[0.88rem] transition-colors duration-300",
                        active === section.id ? "bg-floral font-bold text-jet" : "text-ink-soft hover:bg-floral/70"
                      )}
                    >
                      <span className="tabular shrink-0 text-ink-faint">{String(section.number).padStart(2, "0")}</span>
                      <span className="min-w-0">{section.heading}</span>
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
                  <div className="flex items-baseline gap-3">
                    <span className="tabular text-[0.8rem] font-extrabold text-brand-green">
                      {String(section.number).padStart(2, "0")}
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
            <div className="mt-14 rounded-[1.75rem] border border-hairline bg-floral p-7 md:p-9">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-brand-blue">Questions about this document</p>
              <p className="mt-4 text-[1.05rem] font-extrabold text-jet">{LEGAL_CONTACT.company}</p>
              <p className="mt-1 text-[0.95rem] text-ink-soft">{LEGAL_CONTACT.name}</p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[0.95rem]">
                <a href={`tel:${LEGAL_CONTACT.phone.replace(/\s/g, "")}`} className="font-bold text-jet transition-colors hover:text-brand-blue">
                  {LEGAL_CONTACT.phone}
                </a>
                <a href={`mailto:${LEGAL_CONTACT.email}`} className="font-semibold text-ink-soft transition-colors hover:text-brand-blue">
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
      description="How DocPharma collects, uses, shares and protects your personal information."
    />
  );
}

export function TermsOfUse() {
  return (
    <LegalDocument
      doc={TERMS_AND_CONDITIONS}
      description="The terms that govern your use of the DocPharma website and services."
    />
  );
}
