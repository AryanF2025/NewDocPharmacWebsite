import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import clsx from "clsx";
import { Logo } from "@/components/ui/Logo";
import { Magnetic } from "./Magnetic";
import { SOCIAL } from "./siteInfo";
import riderStill from "@/assets/images/still-rider.jpg";

const SOLUTIONS = [
  { name: "E-Pharmacies", line: "Licensed darkstores and pharmacist-led fulfilment", to: "/solutions#e-pharmacies" },
  { name: "D2C Health & Wellness", line: "Multi-city stock, 30-minute delivery", to: "/solutions#d2c-health" },
  { name: "Corporate Wellness", line: "Plug your platform into fulfilment", to: "/solutions#corporate-wellness" },
  { name: "Health Insurers", line: "Medicine delivery for members", to: "/solutions#health-insurers" },
  { name: "Doctors & Hospitals", line: "Care beyond the hospital walls", to: "/solutions#hospitals" },
];

const LINKS = [
  { label: "Technology", to: "/technology" },
  { label: "About", to: "/about" },
  { label: "Resources", to: "/resources" },
];

/**
 * Floating pill header. Slides away while you scroll down and returns the
 * moment you scroll up, so it never sits on top of the content being read.
 */
export function SiteHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [raised, setRaised] = useState(false);
  const [menu, setMenu] = useState(false);
  const [solutions, setSolutions] = useState(false);
  const closeTimer = useRef(null);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setRaised(current > 24);
    if (menu || solutions) return;
    setHidden(current > previous && current > 180);
  });

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const openSolutions = () => {
    window.clearTimeout(closeTimer.current);
    setSolutions(true);
  };
  const closeSolutions = () => {
    closeTimer.current = window.setTimeout(() => setSolutions(false), 140);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-6"
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={clsx(
            "relative mx-auto flex h-16 max-w-[84rem] items-center justify-between rounded-full border pl-5 pr-2 transition-all duration-500",
            raised || solutions
              ? "border-jet/8 bg-white/85 shadow-[0_12px_40px_-18px_rgba(5,36,57,.35)] backdrop-blur-xl"
              : "border-transparent bg-white/60 backdrop-blur-md"
          )}
        >
          <Link to="/" aria-label="DocPharma home">
            <Logo markClass="h-7 w-7" />
          </Link>

          <nav className="hidden items-center gap-1 text-[0.9rem] font-semibold text-ink-soft lg:flex">
            <div onPointerEnter={openSolutions} onPointerLeave={closeSolutions} className="relative">
              <button
                type="button"
                aria-expanded={solutions}
                onClick={() => setSolutions((v) => !v)}
                className={clsx(
                  "flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors",
                  solutions ? "bg-floral text-jet" : "hover:text-jet"
                )}
              >
                Solutions
                <motion.svg animate={{ rotate: solutions ? 180 : 0 }} width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                  <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </motion.svg>
              </button>
            </div>
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  clsx("rounded-full px-4 py-2 transition-colors", isActive ? "bg-floral text-jet" : "hover:text-jet")
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:block">
              <Link
                to="/partner"
                className="group flex items-center gap-2 rounded-full bg-brand-blue py-2.5 pl-5 pr-2.5 text-[0.88rem] font-bold text-white transition-colors hover:bg-jet"
              >
                Partner with us
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-[-45deg]">
                  →
                </span>
              </Link>
            </Magnetic>
            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-jet text-white lg:hidden"
            >
              <span className="space-y-1.5">
                <span className="block h-0.5 w-5 rounded bg-current" />
                <span className="block h-0.5 w-3.5 rounded bg-current" />
              </span>
            </button>
          </div>

          {/* Solutions panel */}
          <AnimatePresence>
            {solutions ? (
              <motion.div
                onPointerEnter={openSolutions}
                onPointerLeave={closeSolutions}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-[calc(100%+10px)] hidden w-[min(52rem,calc(100vw-3rem))] -translate-x-1/2 grid-cols-[1.4fr_1fr] gap-3 rounded-3xl border border-jet/8 bg-white p-3 shadow-[0_30px_70px_-30px_rgba(5,36,57,.45)] lg:grid"
              >
                <ul className="grid gap-1 p-2">
                  {SOLUTIONS.map((s, i) => (
                    <motion.li key={s.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                      <Link
                        to={s.to}
                        onClick={() => setSolutions(false)}
                        className="group flex items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-floral"
                      >
                        <span>
                          <span className="block text-[0.95rem] font-bold text-jet">{s.name}</span>
                          <span className="block text-[0.82rem] text-ink-faint">{s.line}</span>
                        </span>
                        <span className="text-brand-blue opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <Link
                  to="/solutions"
                  onClick={() => setSolutions(false)}
                  className="group relative overflow-hidden rounded-2xl bg-jet p-6 text-white"
                >
                  <img src={riderStill} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-jet via-jet/40 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end">
                    <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-brand-green">One network</p>
                    <p className="mt-2 text-[1.35rem] font-extrabold leading-tight">Every solution runs on the same 30-minute network.</p>
                    <p className="mt-3 text-[0.85rem] font-bold">All solutions →</p>
                  </div>
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu ? (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-jet px-6 pb-8 pt-5 text-white lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between">
              <Logo tone="mono" markClass="h-7 w-7" className="text-white" />
              <button type="button" onClick={() => setMenu(false)} aria-label="Close menu" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl">
                ×
              </button>
            </div>
            <nav className="mt-12 flex flex-col">
              {[{ label: "Solutions", to: "/solutions" }, ...LINKS, { label: "Partner with us", to: "/partner" }].map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }}>
                  <Link to={l.to} onClick={() => setMenu(false)} className="block border-b border-white/10 py-4 text-[2.1rem] font-extrabold tracking-tight">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex gap-3">
              {SOCIAL.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold">
                  {s.name}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
