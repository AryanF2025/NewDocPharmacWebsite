/**
 * Partner with us — the contact page.
 * Expanding panels for the five audiences we build for, wired to the
 * enquiry form, which posts to the wrapper service at VITE_API_BASE_URL.
 */

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Reveal, PageHero } from "@/components/ui/Reveal";
import { COMPLIANCE, ComplianceIcon } from "@/components/experience/compliance";
import { CONTACT, OFFICE, SOCIAL } from "@/components/experience/siteInfo";
import { submitContactEnquiry } from "@/api/contact.api";
import {
  BUSINESS_TYPES,
  SLIDER_TYPES,
  SLIDE_INTERVAL_MS,
  MONTHLY_ORDERS,
  CONTACT_INITIAL,
  CONTACT_HERO,
  PARTNER_ASSURANCES,
} from "@/data/contact";
import { usePageMeta } from "@/hooks/usePageMeta";
import { CountUp } from "@/components/experience/HeroParts";
import { SectionHeader } from "@/components/motion/Text";
import { CtaButton } from "@/components/motion/CtaButton";

/** The figures partners actually stay for. */
const PROOF = [
  [95, "%", "Fulfilment rate"],
  [93, "%", "Delivered on time"],
  [50, "+", "Licensed darkstores"],
  [30, " min", "Hyperlocal delivery"],
];

function ContactIcon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (name === "phone") {
    return (
      <svg {...common}>
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 21s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

const NEXT_STEPS = [
  ["01", "You tell us what you sell", "Categories, cities and the volumes you handle today."],
  ["02", "We map the network", "The darkstores, licences and SLA your orders need."],
  ["03", "We integrate and go live", "Plug into your existing order stack — no rebuild."],
];

/** Everything the server needs before it will accept the enquiry. */
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please tell us your name.";
  if (!form.email.trim()) errors.email = "Please add an email we can reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errors.email = "That email doesn't look right.";
  if (form.phone.trim() && !/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) errors.phone = "That phone number doesn't look right.";
  return errors;
}

const FIELD =
  "w-full rounded-xl border border-hairline bg-white px-4 py-3 text-[0.95rem] text-jet outline-none transition-colors placeholder:text-ink-faint focus:border-brand-blue";

function Field({ label, error, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.8rem] font-bold text-jet">{label}</span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-[0.78rem] font-semibold text-[#c2410c]">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-[0.78rem] text-ink-faint">{hint}</span>
      ) : null}
    </label>
  );
}

/**
 * The five audiences as expanding panels: the chosen one opens wide, the rest
 * fold into slim labelled strips. Picking one sets the enquiry form's
 * business type, so the panels and the form always agree.
 */
function BusinessTypePanels({ value, onPick }) {
  const [paused, setPaused] = useState(false);
  const shown = Math.max(0, SLIDER_TYPES.findIndex((type) => type.value === value));

  useEffect(() => {
    if (paused) return undefined;
    const id = window.setTimeout(() => {
      onPick(SLIDER_TYPES[(shown + 1) % SLIDER_TYPES.length].value);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [shown, paused, onPick]);

  return (
    <div
      className="flex h-[34rem] flex-col gap-2 md:h-[26rem] md:flex-row md:gap-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDER_TYPES.map((type, i) => {
        const active = i === shown;
        return (
          <button
            key={type.value}
            type="button"
            onClick={() => onPick(type.value)}
            onFocus={() => onPick(type.value)}
            // Hovering a folded panel opens it — the pointer leads, no click needed.
            onMouseEnter={() => onPick(type.value)}
            aria-pressed={active}
            aria-label={type.label}
            className={clsx(
              "panel group relative min-h-0 min-w-0 overflow-hidden rounded-3xl bg-jet text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-floral",
              active ? "is-active" : ""
            )}
            style={{ flexGrow: active ? 5 : 1 }}
          >
            <img
              src={type.image}
              alt=""
              loading="lazy"
              className={clsx(
                "absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)]",
                active ? "scale-100 group-hover:scale-[1.04]" : "scale-125"
              )}
            />
            {/* Folded panels read as solid brand navy with the photo just
                showing through; the open one keeps its photo, darkened only
                where the words sit. */}
            <div
              className={clsx(
                "absolute inset-0 transition-[background-color,opacity] duration-700",
                active ? "opacity-0" : "bg-jet/85 group-hover:bg-jet/70"
              )}
            />
            <div
              className={clsx(
                "absolute inset-0 bg-gradient-to-t from-jet via-jet/45 via-35% to-transparent to-70% transition-opacity duration-700",
                active ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Folded: number at the top, label reading up from the bottom */}
            <span
              className={clsx(
                "pointer-events-none absolute inset-0 flex items-center gap-4 px-5 transition-opacity duration-500 md:flex-col md:items-center md:justify-between md:px-0 md:py-6",
                active ? "opacity-0" : "opacity-100"
              )}
            >
              <span className="tabular text-[0.75rem] font-extrabold text-brand-green">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[0.85rem] font-extrabold uppercase tracking-[0.14em] text-white transition-colors duration-500 group-hover:text-brand-green md:rotate-180 md:[writing-mode:vertical-rl]">
                {type.tab}
              </span>
            </span>

            {/* Open: the choice marked top-right, the heading bottom-left */}
            <span
              className={clsx(
                "absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.78rem] font-bold text-jet shadow-[0_8px_24px_-10px_rgba(5,36,57,.5)] transition-[opacity,transform] duration-500",
                active ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-green text-[0.55rem] text-white">✓</span>
              Selected below
            </span>
            <span className={clsx("absolute inset-x-6 bottom-7 md:inset-x-8", active ? "panel-copy" : "pointer-events-none opacity-0")}>
              <span className="tabular block text-[0.75rem] font-extrabold uppercase tracking-[0.16em] text-brand-green">
                {String(i + 1).padStart(2, "0")} · {type.tab}
              </span>
              <span className="mt-2 block max-w-lg text-[clamp(1.3rem,2.4vw,2rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
                {type.heading}
              </span>
            </span>

            {/* Time until the next business: a thin line along the bottom edge */}
            <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
              {active ? (
                <span
                  key={`${shown}-${paused}`}
                  className={clsx("block h-full origin-left bg-brand-green", paused ? "scale-x-100" : "how-fill")}
                  style={paused ? undefined : { animationDuration: `${SLIDE_INTERVAL_MS}ms` }}
                />
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function Partner() {
  usePageMeta({
    title: "Partner with us — DocPharma",
    description:
      "Let's build better healthcare access together. Fulfil more orders, reach customers faster, expand into new cities or build a healthcare delivery layer.",
  });

  const [form, setForm] = useState(CONTACT_INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [failure, setFailure] = useState("");

  const set = (key) => (event) => {
    const { value } = event.target;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const pickType = (value) => setForm((f) => ({ ...f, businessType: value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    setFailure("");
    try {
      await submitContactEnquiry(form);
      setStatus("sent");
      setForm(CONTACT_INITIAL);
    } catch (error) {
      setStatus("error");
      setFailure(error.message);
    }
  };

  return (
    <>
      <PageHero eyebrow={CONTACT_HERO.eyebrow} headline={CONTACT_HERO.title} sub={CONTACT_HERO.subtitle}>
        <ul className="flex flex-wrap gap-2.5">
          {PARTNER_ASSURANCES.map((point) => (
            <li
              key={point}
              className="flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-2 text-[0.88rem] font-semibold text-ink-soft"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-[0.6rem] text-white">✓</span>
              {point}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* --------------------------------------- who we build for --- */}
      <section className="bg-floral pt-20 md:pt-28">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <SectionHeader eyebrow="Who we build for" title="Pick what fits you. We'll shape the network around it." />
          <Reveal from="up" delay={0.08} className="mt-8">
            <BusinessTypePanels value={form.businessType} onPick={pickType} />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ form + aside --- */}
      <section className="bg-floral pb-24 pt-16 md:pb-32 md:pt-20">
        {/* min-w-0 on the columns: a long address row may truncate, never widen the page. */}
        <div className="mx-auto grid max-w-[84rem] gap-6 px-5 md:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-10 [&>*]:min-w-0">
          <Reveal from="left">
            <div className="rounded-[2rem] border border-hairline bg-white p-6 md:p-10">
              {status === "sent" ? (
                <div className="flex min-h-[26rem] flex-col items-start justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green text-[1.4rem] font-extrabold text-white">
                    ✓
                  </span>
                  <h2 className="mt-6 text-[clamp(1.6rem,2.6vw,2.2rem)] font-extrabold tracking-[-0.03em] text-jet">
                    Thanks — we've got it.
                  </h2>
                  <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">
                    Our partnerships team will come back to you within two working days with the network, the SLA and
                    what it takes to go live.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 rounded-full border border-hairline px-6 py-3 text-[0.92rem] font-bold text-jet transition-colors hover:border-brand-blue"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold tracking-[-0.03em] text-jet">
                    Tell us about your business
                  </h2>
                  <p className="mt-2 text-[0.98rem] text-ink-soft">Fields marked with an asterisk are required.</p>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <Field label="Your name *" error={errors.name}>
                      <input id="name" name="name" value={form.name} onChange={set("name")} placeholder="Priya Sharma" autoComplete="name" className={FIELD} />
                    </Field>

                    <Field label="Company" error={errors.company}>
                      <input id="company" name="company" value={form.company} onChange={set("company")} placeholder="Company name" autoComplete="organization" className={FIELD} />
                    </Field>

                    <Field label="Work email *" error={errors.email}>
                      <input id="email" name="email" type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" autoComplete="email" className={FIELD} />
                    </Field>

                    <Field label="Phone" error={errors.phone}>
                      <input id="phone" name="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" autoComplete="tel" className={FIELD} />
                    </Field>

                    <Field label="Type of business *">
                      <select id="businessType" name="businessType" value={form.businessType} onChange={set("businessType")} className={FIELD}>
                        {BUSINESS_TYPES.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Monthly orders">
                      <select id="monthlyOrders" name="monthlyOrders" value={form.monthlyOrders} onChange={set("monthlyOrders")} className={FIELD}>
                        {MONTHLY_ORDERS.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <div className="sm:col-span-2">
                      <Field label="Cities you need" hint="Where your customers are — we'll map the nearest darkstores.">
                        <input id="cities" name="cities" value={form.cities} onChange={set("cities")} placeholder="Bengaluru, Mumbai, Delhi NCR" className={FIELD} />
                      </Field>
                    </div>

                    <div className="sm:col-span-2">
                      <Field label="Anything else?">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={form.message}
                          onChange={set("message")}
                          placeholder="What you sell, the delivery promise you want, and anything we should know."
                          className={`${FIELD} resize-y`}
                        />
                      </Field>
                    </div>
                  </div>

                  {status === "error" ? (
                    <p role="alert" className="mt-6 rounded-xl bg-[#fdf1ec] px-4 py-3 text-[0.9rem] font-semibold text-[#c2410c]">
                      {failure} You can also call us on{" "}
                      <a href={CONTACT.phoneHref} className="underline">
                        {CONTACT.phone}
                      </a>
                      .
                    </p>
                  ) : null}

                  <CtaButton type="submit" disabled={status === "sending"} className="mt-8">
                    {status === "sending" ? "Sending…" : "Send enquiry"}
                  </CtaButton>
                </form>
              )}
            </div>
          </Reveal>

          {/* The column beside the form stays in view while the form scrolls. */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {/* What happens next: a timeline whose line draws down on arrival */}
            <Reveal from="right" delay={0.06}>
              <div className="rounded-[2rem] border border-hairline bg-white p-7">
                <p className="label text-brand-blue">What happens next</p>
                <ol className="relative mt-6 space-y-6">
                  <span aria-hidden className="timeline-line absolute bottom-3 left-[0.95rem] top-3 w-px bg-gradient-to-b from-brand-blue to-brand-green" />
                  {NEXT_STEPS.map(([n, title, body]) => (
                    <li key={n} className="group relative flex gap-4">
                      <span className="tabular relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-peppermint text-[0.7rem] font-extrabold text-[#5f8a0f] ring-1 ring-brand-green/30 transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                        {n}
                      </span>
                      <span className="pt-0.5">
                        <span className="block text-[1rem] font-extrabold text-jet">{title}</span>
                        <span className="mt-1 block text-[0.92rem] leading-relaxed text-ink-soft">{body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            {/* Why partners stay: proof, not adjectives */}
            <Reveal from="right" delay={0.12}>
              <div className="rounded-[2rem] border border-hairline bg-white p-7">
                <p className="label text-brand-blue">Why partners stay</p>
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {PROOF.map(([value, suffix, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl bg-floral px-4 py-4 transition-[transform,background-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:bg-peppermint/70"
                    >
                      <p className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-[1.8rem] font-extrabold leading-none tracking-tight text-transparent">
                        <CountUp value={value} suffix={suffix} />
                      </p>
                      <p className="mt-1.5 text-[0.82rem] font-semibold text-ink-soft">{label}</p>
                    </div>
                  ))}
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {COMPLIANCE.map((item) => (
                    <li key={item.title} className="flex items-center gap-1.5 rounded-full border border-hairline px-2.5 py-1 text-[0.75rem] font-semibold text-jet">
                      <span className="text-[#5f8a0f] [&_svg]:h-3.5 [&_svg]:w-3.5">
                        <ComplianceIcon name={item.icon} />
                      </span>
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Reach us: each way in is one clickable row */}
            <Reveal from="right" delay={0.18}>
              <div className="rounded-[2rem] border border-hairline bg-white p-3">
                <p className="px-4 pb-1 pt-4 label text-brand-blue">Reach us</p>
                {[
                  { icon: "phone", label: "Call", value: CONTACT.phone, href: CONTACT.phoneHref },
                  { icon: "mail", label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                  {
                    icon: "pin",
                    label: "Office",
                    value: OFFICE.lines.slice(0, 2).join(", "),
                    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE.lines.join(", "))}`,
                    external: true,
                  },
                ].map((row) => (
                  <a
                    key={row.label}
                    href={row.href}
                    {...(row.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex items-center gap-3.5 rounded-2xl px-4 py-3 transition-colors duration-300 hover:bg-floral"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-viking text-brand-blue transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
                      <ContactIcon name={row.icon} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block label text-ink-faint">{row.label}</span>
                      <span className="block truncate text-[0.95rem] font-bold text-jet">{row.value}</span>
                    </span>
                    <span aria-hidden className="-translate-x-1 text-brand-blue opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                  </a>
                ))}
                <div className="flex gap-2 px-4 pb-4 pt-2">
                  {SOCIAL.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-hairline px-4 py-2 text-[0.82rem] font-semibold text-ink-soft transition-colors hover:border-brand-blue hover:text-jet"
                    >
                      {s.name} ↗
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
