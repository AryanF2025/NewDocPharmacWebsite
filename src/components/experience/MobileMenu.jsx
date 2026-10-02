import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import clsx from "clsx";
import { Logo } from "@/components/ui/Logo";
import { CONTACT, SOCIAL } from "./siteInfo";
import { SocialIcon } from "@/components/ui/SocialIcon";

const EASE = [0.22, 1, 0.36, 1];

const ITEMS = [
  { label: "Solutions", line: "Five ways to plug into the network", to: "/solutions", expand: true },
  { label: "Technology", line: "DocPharma One and compliance", to: "/technology" },
  { label: "About", line: "Our story, values and team", to: "/about" },
  { label: "Resources", line: "Press and media coverage", to: "/resources" },
];

/**
 * The phone menu: a light sheet that wipes down from the top, numbered rows
 * with a line on what each page holds, Solutions opening in place onto its
 * five businesses, and the partner call waiting at the bottom.
 */
export function MobileMenu({ solutions, onClose }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(pathname === "/solutions");

  // Escape closes it, as a dialog should.
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const rise = (i) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay: 0.18 + i * 0.05 },
  });

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-white lg:hidden"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Top bar, lined up with the header it replaces */}
      <div className="flex h-[4.75rem] shrink-0 items-center justify-between px-5">
        <Link to="/" onClick={onClose} aria-label="DocPharma home">
          <Logo markClass="h-7 w-7" className="[&>span:last-child]:text-[1.2rem]" />
        </Link>
        <motion.button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-floral text-jet transition-colors active:bg-viking"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </motion.button>
      </div>

      <nav className="px-5 pt-2">
        <ol className="border-t border-hairline">
          {ITEMS.map((item, i) => {
            const current = pathname === item.to;
            return (
              <motion.li key={item.to} {...rise(i)} className="border-b border-hairline">
                <div className="flex items-center">
                  <Link to={item.to} onClick={onClose} className="group flex min-w-0 flex-1 items-center gap-4 py-4">
                    <span className="tabular w-6 shrink-0 text-[0.72rem] font-extrabold text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className={clsx("flex items-center gap-2 text-[1.45rem] font-extrabold tracking-[-0.03em]", current ? "text-brand-blue" : "text-jet")}>
                        {item.label}
                        {current ? <span className="h-1.5 w-1.5 rounded-full bg-brand-green" aria-label="current page" /> : null}
                      </span>
                      <span className="block truncate text-[0.85rem] text-ink-faint">{item.line}</span>
                    </span>
                  </Link>
                  {item.expand ? (
                    <button
                      type="button"
                      onClick={() => setOpen((v) => !v)}
                      aria-expanded={open}
                      aria-label={open ? "Hide solutions" : "Show solutions"}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-floral text-jet"
                    >
                      <motion.svg animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.35, ease: EASE }} width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                        <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </motion.svg>
                    </button>
                  ) : (
                    <span aria-hidden className="pr-3 text-ink-faint">→</span>
                  )}
                </div>

                {/* Solutions opens in place onto its five businesses */}
                {item.expand ? (
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <ul className="grid gap-1.5 pb-4 pl-10">
                        {solutions.map((s) => (
                          <li key={s.to}>
                            <Link to={s.to} onClick={onClose} className="block rounded-2xl bg-floral px-4 py-3 active:bg-viking">
                              <span className="block text-[0.95rem] font-bold text-jet">{s.name}</span>
                              <span className="block text-[0.8rem] text-ink-faint">{s.line}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </motion.li>
            );
          })}
        </ol>
      </nav>

      {/* The partner call, waiting at the bottom */}
      <motion.div {...rise(ITEMS.length + 1)} className="mt-auto p-5 pt-8">
        <div className="rounded-[2rem] bg-jet p-6 text-white">
          <p className="label text-brand-green">Partner with us</p>
          <p className="mt-2 text-[1.3rem] font-extrabold leading-tight tracking-[-0.03em]">Put your products 30 minutes from your customers.</p>
          <Link
            to="/partner"
            onClick={onClose}
            className="mt-5 flex items-center justify-between rounded-full bg-white py-2 pl-6 pr-2 font-bold text-jet active:bg-brand-green"
          >
            Talk to our team
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-jet text-white">→</span>
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.85rem] text-white/70">
            <a href={CONTACT.phoneHref} className="font-semibold text-white">
              {CONTACT.phone}
            </a>
            {SOCIAL.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="pill-fill pill-fill--dark inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/20 px-3 font-semibold">
                <SocialIcon name={s.name} size={14} />
                {s.name}
                <span aria-hidden className="pill-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
