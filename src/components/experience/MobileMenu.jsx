import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import clsx from "clsx";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { CONTACT, SOCIAL } from "./siteInfo";

const EASE = [0.22, 1, 0.36, 1];

const ITEMS = [
  { label: "Solutions", to: "/solutions", expand: true },
  { label: "Technology", to: "/technology" },
  { label: "About", to: "/about" },
  { label: "Resources", to: "/resources" },
];

/**
 * The phone menu, kept plain: four large links (the current page in blue),
 * Solutions opening in place onto its businesses, and one clear call to
 * partner at the bottom.
 */
export function MobileMenu({ solutions, onClose }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Escape closes it, as a dialog should.
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const rise = (i) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: EASE, delay: 0.12 + i * 0.05 },
  });

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-white lg:hidden"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {/* Top bar, lined up with the header it replaces */}
      <div className="flex h-[4.75rem] shrink-0 items-center justify-between px-5">
        <Link to="/" onClick={onClose} aria-label="DocPharma home">
          <Logo markClass="h-7 w-7" className="[&>span:last-child]:text-[1.2rem]" />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-floral text-jet transition-colors active:bg-viking"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav className="px-5 pt-4">
        <ul>
          {ITEMS.map((item, i) => {
            const current = pathname === item.to;
            return (
              <motion.li key={item.to} {...rise(i)} className="border-b border-hairline">
                <div className="flex items-center">
                  <Link
                    to={item.to}
                    onClick={onClose}
                    aria-current={current ? "page" : undefined}
                    className={clsx(
                      "flex min-h-16 flex-1 items-center gap-2.5 text-[1.6rem] font-extrabold tracking-[-0.03em] transition-colors",
                      current ? "text-brand-blue" : "text-jet active:text-brand-blue"
                    )}
                  >
                    {item.label}
                    {current ? <span aria-hidden className="h-2 w-2 rounded-full bg-brand-green" /> : null}
                  </Link>
                  {item.expand ? (
                    <button
                      type="button"
                      onClick={() => setOpen((v) => !v)}
                      aria-expanded={open}
                      aria-label={open ? "Hide solutions" : "Show solutions"}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-jet active:bg-floral"
                    >
                      <motion.svg animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: EASE }} width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                        <path d="M3 5.5 7 9.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </button>
                  ) : null}
                </div>

                {item.expand ? (
                  <div
                    className="grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(.22,1,.36,1)]"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <ul className="pb-3">
                        {solutions.map((s) => (
                          <li key={s.to}>
                            <Link
                              to={s.to}
                              onClick={onClose}
                              className="flex min-h-11 items-center justify-between rounded-xl px-3 text-[1rem] font-semibold text-ink-soft active:bg-floral"
                            >
                              {s.name}
                              <span aria-hidden className="text-brand-blue">→</span>
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
        </ul>
      </nav>

      {/* One clear call, then the quick ways to reach us */}
      <motion.div {...rise(ITEMS.length)} className="mt-auto space-y-4 p-5 pb-8">
        <Link
          to="/partner"
          onClick={onClose}
          className="flex min-h-14 items-center justify-between rounded-full bg-brand-blue py-2 pl-6 pr-2 text-[1.02rem] font-bold text-white active:bg-jet"
        >
          Partner with us
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">→</span>
        </Link>
        <div className="flex items-center justify-between">
          <a href={CONTACT.phoneHref} className="flex min-h-11 items-center text-[0.95rem] font-bold text-jet">
            {CONTACT.phone}
          </a>
          <div className="flex gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`DocPharma on ${s.name}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink-soft active:border-brand-blue active:text-brand-blue"
              >
                <SocialIcon name={s.name} size={18} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
