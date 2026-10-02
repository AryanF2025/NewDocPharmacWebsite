import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import clsx from "clsx";
import { Logo } from "@/components/ui/Logo";
import { Magnetic } from "./Magnetic";
import { MobileMenu } from "./MobileMenu";
import { lockScroll } from "@/components/motion/smoothScroll";
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

/** The background pill that slides between header links. */
function NavPill() {
  return (
    <motion.span
      layoutId="nav-pill"
      aria-hidden
      className="absolute inset-0 rounded-full bg-viking"
      transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.6 }}
    />
  );
}

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
  const closeMenu = useCallback(() => setMenu(false), []);
  const { pathname } = useLocation();
  const [hovered, setHovered] = useState(null);
  const current = ["/solutions", ...LINKS.map((l) => l.to)].find((to) => pathname.startsWith(to)) ?? null;
  // Where the sliding pill sits: under the cursor, else on the current page.
  const pill = hovered ?? (solutions ? "/solutions" : current);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setRaised(current > 24);
    if (menu || solutions) return;
    setHidden(current > previous && current > 180);
  });

  useEffect(() => {
    lockScroll(menu);
    return () => lockScroll(false);
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
        className="fixed inset-x-0 top-2.5 z-50 px-2.5 md:top-4 md:px-6"
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={clsx(
            "relative mx-auto flex h-14 max-w-[84rem] items-center justify-between rounded-full border pl-4 pr-1.5 transition-all duration-500 sm:h-16 sm:pl-5 sm:pr-2",
            raised || solutions
              ? "border-jet/8 bg-white/85 shadow-[0_12px_40px_-18px_rgba(5,36,57,.35)] backdrop-blur-xl"
              : "border-transparent bg-white/60 backdrop-blur-md"
          )}
        >
          <Link to="/" aria-label="DocPharma home">
            <Logo markClass="h-6 w-6 sm:h-7 sm:w-7" className="[&>span:last-child]:text-[1.15rem] sm:[&>span:last-child]:text-[1.35rem]" />
          </Link>

          {/* One soft pill slides between items under the cursor; with nothing
              hovered it rests on the current page. */}
          <nav
            className="hidden items-center gap-1 text-[0.9rem] font-semibold text-ink-soft lg:flex"
            onPointerLeave={() => setHovered(null)}
          >
            <div onPointerEnter={openSolutions} onPointerLeave={closeSolutions} className="relative">
              {/* Clicking opens the Solutions page; hovering shows the menu. */}
              <NavLink
                to="/solutions"
                aria-expanded={solutions}
                onClick={() => setSolutions(false)}
                onFocus={openSolutions}
                onPointerEnter={() => setHovered("/solutions")}
                className={clsx(
                  "relative flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors duration-300",
                  pill === "/solutions" || solutions ? "text-brand-blue-deep" : "hover:text-jet"
                )}
              >
                {pill === "/solutions" ? <NavPill /> : null}
                <span className="relative">Solutions</span>
                <motion.svg className="relative" animate={{ rotate: solutions ? 180 : 0 }} width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                  <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </motion.svg>
              </NavLink>
            </div>
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onPointerEnter={() => setHovered(l.to)}
                className={clsx(
                  "relative rounded-full px-4 py-2 transition-colors duration-300",
                  pill === l.to ? "text-brand-blue-deep" : "hover:text-jet"
                )}
              >
                {pill === l.to ? <NavPill /> : null}
                <span className="relative">{l.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:block">
              <Link
                to="/partner"
                className="cta group relative isolate flex items-center gap-2 overflow-hidden rounded-full bg-brand-blue py-2.5 pl-5 pr-2.5 text-[0.88rem] font-bold text-white"
              >
                <span aria-hidden className="cta-fill cta-fill--sm absolute inset-0 rounded-full bg-jet" />
                <span className="relative">Partner with us</span>
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 group-hover:rotate-[-45deg]">
                  →
                </span>
              </Link>
            </Magnetic>
            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-floral text-jet transition-colors hover:bg-viking lg:hidden"
            >
              <span className="space-y-1.5">
                <span className="block h-[1.5px] w-[1.1rem] rounded bg-current" />
                <span className="ml-auto block h-[1.5px] w-3 rounded bg-current" />
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
                    <p className="label text-brand-green">One network</p>
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
      <AnimatePresence>{menu ? <MobileMenu solutions={SOLUTIONS} onClose={closeMenu} /> : null}</AnimatePresence>
    </>
  );
}
