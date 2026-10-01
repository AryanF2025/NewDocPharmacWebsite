import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";
import { COVERAGE_CITIES } from "@/components/art/IndiaCoverageMap";
import { FooterWordmark } from "./FooterWordmark";
import { CtaButton } from "@/components/motion/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { scrollToTarget } from "@/components/motion/smoothScroll";
import { SOCIAL, CAREERS_URL, OFFICE, CONTACT } from "./siteInfo";

const COLUMNS = [
  {
    title: "Solutions",
    links: [
      ["E-Pharmacies", "/solutions#e-pharmacies"],
      ["D2C Health & Wellness", "/solutions#d2c-health"],
      ["Corporate Wellness", "/solutions#corporate-wellness"],
      ["Health Insurers", "/solutions#health-insurers"],
      ["Doctors & Hospitals", "/solutions#hospitals"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About us", "/about"],
      ["Technology & compliance", "/technology"],
      ["Resources & press", "/resources"],
      ["Partner with us", "/partner"],
      ["Careers", CAREERS_URL],
    ],
  },
];

// The cities named on the coverage map; the rest are summed up, not guessed.
const CITIES = [...COVERAGE_CITIES.map((c) => c.name), "+5 more cities"];

const ICONS = {
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  mail: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm0 0 9 6 9-6",
  pin: "M12 21s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
  LinkedIn: "M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7M4 4h16v16H4z",
  Instagram: "M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm8 7.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M17 7v.01",
};

function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={ICONS[name]} />
    </svg>
  );
}

/** Footer link: slides right with a green arrow leading it on hover. */
function FooterLink({ href, children }) {
  const external = href.startsWith("http");
  const cls =
    "group inline-flex min-h-9 items-center gap-2 text-[0.95rem] text-white/65 transition-colors duration-300 hover:text-white";
  const inner = (
    <>
      <span aria-hidden className="w-0 -translate-x-2 overflow-hidden text-brand-green opacity-0 transition-all duration-300 group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100">
        →
      </span>
      <span className="transition-transform duration-300">{children}</span>
      {external ? <span aria-hidden className="text-[0.75rem] text-white/35">↗</span> : null}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link to={href} className={cls}>
      {inner}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden rounded-t-[2.5rem] border-t border-white/10 bg-jet text-white">
      {/* Faint grid and brand glows, as on the other dark panels. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, #000 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, #000 20%, transparent 70%)",
          }}
        />
        <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand-blue/15 blur-[140px]" />
        <div className="absolute -right-40 top-20 h-[26rem] w-[26rem] rounded-full bg-brand-green/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[84rem] px-6 pt-16 md:px-10 md:pt-20">
        {/* The closing call */}
        <Reveal>
          <div className="flex flex-col gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="label text-brand-green">Partner with DocPharma</p>
              <h2 className="mt-4 max-w-2xl text-balance text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1.04] tracking-[-0.04em]">
                Let&apos;s put medicine <span className="text-brand-green">30 minutes</span> from your customers.
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <CtaButton to="/partner" variant="white">
                Partner with us
              </CtaButton>
              <a
                href={CONTACT.phoneHref}
                className="group inline-flex min-h-[3.5rem] items-center gap-3 rounded-full border border-white/20 px-6 font-bold text-white transition-colors duration-300 hover:border-brand-green"
              >
                <span className="text-brand-green transition-transform duration-300 group-hover:rotate-12">
                  <Icon name="phone" />
                </span>
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Live network: the cities, drifting past */}
        <div className="flex items-center gap-5 border-b border-white/10 py-5">
          <span className="flex shrink-0 items-center gap-2 label text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-green opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-brand-green" />
            </span>
            Delivering now
          </span>
          <div className="marquee-host mask-fade-x min-w-0 flex-1 overflow-hidden">
            <div className="flex w-max animate-marquee" style={{ "--marquee-duration": "45s" }}>
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                  {CITIES.map((city) => (
                    <span key={`${copy}-${city}`} className="flex items-center whitespace-nowrap text-[0.95rem] font-semibold text-white/55">
                      <span className="px-5">{city}</span>
                      <span className="h-1 w-1 rounded-full bg-brand-blue" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.15fr]">
          <div>
            <Logo tone="mono" markClass="h-9 w-9" className="text-white" />
            <p className="mt-5 max-w-xs text-[1rem] leading-relaxed text-white/60">
              India&apos;s first healthcare quick-commerce supply chain. Elevating healthcare together.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`DocPharma on ${s.name}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green hover:bg-brand-green hover:text-jet"
                >
                  <Icon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="label text-white/40">{col.title}</p>
              <ul className="mt-4 flex flex-col">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="label text-white/40">Get in touch</p>
            <ul className="mt-4 space-y-1">
              {[
                { icon: "phone", value: CONTACT.phone, href: CONTACT.phoneHref },
                { icon: "mail", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                {
                  icon: "pin",
                  value: OFFICE.lines.join(", "),
                  href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE.lines.join(", "))}`,
                  external: true,
                },
              ].map((row) => (
                <li key={row.icon}>
                  <a
                    href={row.href}
                    {...(row.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex gap-3 rounded-2xl py-2 text-[0.95rem] leading-relaxed text-white/65 transition-colors duration-300 hover:text-white"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-jet">
                      <Icon name={row.icon} size={16} />
                    </span>
                    <span className="min-w-0 break-words pt-1">{row.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-[0.85rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DocPharma. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to="/privacy" className="link-underline inline-flex min-h-10 items-center transition-colors hover:text-white">
              Privacy policy
            </Link>
            <Link to="/terms" className="link-underline inline-flex min-h-10 items-center transition-colors hover:text-white">
              Terms of use
            </Link>
            <button
              type="button"
              onClick={() => scrollToTarget(0)}
              className="group flex min-h-10 items-center gap-2 font-semibold text-white/70 transition-colors hover:text-white"
            >
              Back to top
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/15 transition-all duration-300 group-hover:border-brand-green group-hover:bg-brand-green group-hover:text-jet">
                <span className="block transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Closing wordmark: a heartbeat runs behind it; the logo colours
          follow the cursor; each letter lifts as it passes. */}
      <div className="relative mx-auto max-w-[84rem] px-6 pt-4 md:px-10">
        <FooterWordmark />
      </div>
    </footer>
  );
}
