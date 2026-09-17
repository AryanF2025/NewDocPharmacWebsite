import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";
import { Magnetic } from "./Magnetic";
import { FooterWordmark } from "./FooterWordmark";
import { SOCIAL, CAREERS_URL, OFFICE } from "./siteInfo";

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

function FooterLink({ href, children }) {
  const external = href.startsWith("http");
  const cls = "group inline-flex items-center gap-2 py-1.5 text-[0.95rem] text-white/65 transition-colors hover:text-white";
  const inner = (
    <>
      <span className="h-px w-0 bg-brand-green transition-all duration-300 group-hover:w-3" />
      {children}
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
    <footer className="relative overflow-hidden rounded-t-[2.5rem] bg-jet text-white">
      <div className="mx-auto max-w-[84rem] px-6 pt-16 md:px-10 md:pt-20">
        {/* Links */}
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="mono" markClass="h-9 w-9" className="text-white" />
            <p className="mt-5 max-w-xs text-[1rem] leading-relaxed text-white/60">
              India's first healthcare quick-commerce supply chain. Elevating healthcare together.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-4 py-2 text-[0.85rem] font-semibold text-white/80 transition-colors hover:border-brand-green hover:text-white"
                >
                  {s.name} ↗
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-white/40">{col.title}</p>
              <ul className="mt-4 flex flex-col">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-white/40">Registered office</p>
            <address className="mt-5 text-[0.95rem] not-italic leading-relaxed text-white/65">
              {OFFICE.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-[0.85rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DocPharma. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to="/privacy" className="transition-colors hover:text-white">Privacy policy</Link>
            <Link to="/terms" className="transition-colors hover:text-white">Terms of use</Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 font-semibold text-white/70 transition-colors hover:text-white"
            >
              Back to top
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand-green group-hover:bg-brand-green group-hover:text-jet">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Closing wordmark in the logo colours */}
      <div className="mx-auto max-w-[84rem] px-6 pt-4 md:px-10">
        <FooterWordmark />
      </div>
    </footer>
  );
}
