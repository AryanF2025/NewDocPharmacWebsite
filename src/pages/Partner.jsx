/**
 * Partner with us — the contact page.
 * Expanding panels for the five audiences we build for, wired to the
 * enquiry form, which posts to the wrapper service at VITE_API_BASE_URL.
 */

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";
import { HeroBackdrop, HeroHeading, Enter } from "@/components/motion/Hero";
import { COMPLIANCE, ComplianceIcon } from "@/components/experience/compliance";
import { CONTACT, OFFICE, SOCIAL } from "@/components/experience/siteInfo";
import { submitContactEnquiry } from "@/api/contact.api";
import {
  BUSINESS_TYPES,
  MONTHLY_ORDERS,
  CONTACT_INITIAL,
  CONTACT_HERO,
  PARTNER_ASSURANCES,
} from "@/data/contact";
import { usePageMeta } from "@/hooks/usePageMeta";
import { scrollToTarget } from "@/components/motion/smoothScroll";
import { CountUp } from "@/components/experience/HeroParts";
import { Select } from "@/components/ui/Select";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { CtaButton, GhostButton } from "@/components/motion/CtaButton";

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
  if (!form.businessType) errors.businessType = "Pick the option that fits your business.";
  if (form.phone.trim() && !/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) errors.phone = "That phone number doesn't look right.";
  return errors;
}

const FIELD =
  "w-full rounded-xl border border-hairline bg-white px-4 py-3 text-[0.95rem] text-jet outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-ink-faint hover:border-[#cfd4da] focus:border-brand-blue focus:bg-white focus:shadow-[0_0_0_3px_rgba(2,150,217,.15)]";

/** A form field. Pass `labelId` for custom controls: they are named by the
 *  label text instead of being wrapped in a <label>. */
function Field({ label, error, children, hint, labelId }) {
  const Tag = labelId ? "div" : "label";
  return (
    <Tag className="field group block">
      <span id={labelId} className="mb-1.5 block text-[0.8rem] font-bold text-jet transition-colors duration-200 group-focus-within:text-brand-blue">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-[0.78rem] font-semibold text-[#c2410c]">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-[0.78rem] text-ink-faint">{hint}</span>
      ) : null}
    </Tag>
  );
}

/**
 * The form's first question, "I'm a…": one tap per business type, with a
 * line under it saying what we'll help that business do. Arrow keys move
 * between the choices, as in any radio group.
 */
function BusinessTypeChips({ value, onPick, error }) {
  const index = BUSINESS_TYPES.findIndex((type) => type.value === value);
  const current = index >= 0 ? BUSINESS_TYPES[index] : null;

  const onKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const from = index < 0 ? (step > 0 ? -1 : 0) : index;
    const next = (from + step + BUSINESS_TYPES.length) % BUSINESS_TYPES.length;
    onPick(BUSINESS_TYPES[next].value);
    event.currentTarget.querySelectorAll('[role="radio"]')[next]?.focus();
  };

  return (
    <div className="field">
      {/* The question as a sentence: the choice writes itself into the blank. */}
      <p id="businessType-label" className="flex flex-wrap items-baseline gap-x-2 text-[clamp(1.25rem,2.2vw,1.6rem)] font-extrabold tracking-[-0.02em] text-jet">
        <span>I&apos;m</span>
        <span
          className={clsx(
            "relative inline-flex min-w-[9rem] justify-center border-b-2 px-1 pb-0.5 transition-colors duration-300",
            current ? "border-brand-blue text-brand-blue" : error ? "border-dashed border-[#c2410c]" : "border-dashed border-ink-faint/50"
          )}
        >
          {current ? (
            <span key={current.value} className="blank-fill">
              {current.phrase}
            </span>
          ) : (
            <span className="text-ink-faint/50" aria-hidden>
              &nbsp;
            </span>
          )}
          {!current ? <span className="sr-only">(choose below)</span> : null}
        </span>
        <span className="-ml-2">.</span>
      </p>

      <div role="radiogroup" aria-labelledby="businessType-label" aria-invalid={Boolean(error)} onKeyDown={onKeyDown} className="mt-4 flex flex-wrap gap-2">
        {BUSINESS_TYPES.map((type, i) => {
          const active = i === index;
          return (
            <button
              key={type.value}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active || (index < 0 && i === 0) ? 0 : -1}
              onClick={() => onPick(type.value)}
              className={clsx(
                "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[0.88rem] font-semibold outline-none transition-[background-color,border-color,color,box-shadow,transform] duration-300 focus-visible:shadow-[0_0_0_3px_rgba(2,150,217,.2)] active:scale-[0.97]",
                active
                  ? "border-brand-blue bg-brand-blue text-white shadow-[0_8px_20px_-10px_rgba(2,150,217,.8)]"
                  : "border-hairline bg-white text-ink-soft hover:border-brand-blue/50 hover:bg-viking/50 hover:text-jet"
              )}
            >
              <span
                aria-hidden
                className={clsx(
                  "grid transition-[grid-template-columns,opacity] duration-300",
                  active ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
                )}
              >
                <span className="overflow-hidden text-[0.7rem]">✓</span>
              </span>
              {type.tab}
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="mt-2.5 text-[0.78rem] font-semibold text-[#c2410c]">{error}</p>
      ) : current ? (
        // What we'll help with — changes with the choice.
        <p key={current.value} className="choice-note mt-3 flex items-center gap-2 text-[0.88rem] text-ink-soft">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
          {current.value === "other" ? (
            <span>Tell us what you need in the message below.</span>
          ) : (
            <span>
              We&apos;ll help you <span className="font-bold text-jet">{current.heading.charAt(0).toLowerCase() + current.heading.slice(1)}</span>
            </span>
          )}
        </p>
      ) : null}
      <input type="hidden" name="businessType" value={value} />
    </div>
  );
}

/** What the partnerships team works through after an enquiry — the same
 *  steps as "What happens next", shown as a plan being put together. */
const PLAN = [
  "Enquiry received",
  "Nearest licensed darkstores mapped",
  "Delivery SLA agreed",
  "Plugged into your order stack",
  "Live in your cities",
];

/** Ticks through the plan one step at a time, holds, then starts over. */
function NetworkPlanCard() {
  const [done, setDone] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(PLAN.length);
      return undefined;
    }
    const id = window.setTimeout(
      () => setDone((d) => (d >= PLAN.length ? 0 : d + 1)),
      done === 0 ? 900 : done >= PLAN.length ? 2600 : 1100
    );
    return () => window.clearTimeout(id);
  }, [done]);

  const live = done >= PLAN.length;

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* A soft brand halo behind the card */}
      <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-blue/15 via-transparent to-brand-green/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-hairline bg-white shadow-[0_40px_80px_-40px_rgba(5,36,57,.45)]">
        <div className="flex items-center justify-between gap-3 border-b border-hairline bg-floral px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
              <LogoMark className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-[0.9rem] font-extrabold text-jet">Your network plan</span>
              <span className="block text-[0.75rem] text-ink-faint">DocPharma partnerships</span>
            </span>
          </div>
          <span
            className={clsx(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-bold transition-colors duration-500",
              live ? "bg-brand-green/15 text-[#5c7a15]" : "bg-viking text-brand-blue"
            )}
          >
            <span className={clsx("h-1.5 w-1.5 rounded-full", live ? "bg-brand-green" : "animate-pulse bg-brand-blue")} />
            {live ? "Ready" : "In progress"}
          </span>
        </div>

        <ol className="relative space-y-1 p-4">
          {/* The thread the steps hang on, filling as they complete */}
          <span aria-hidden className="absolute bottom-8 left-[2.15rem] top-8 w-px bg-hairline" />
          <span
            aria-hidden
            className="absolute left-[2.15rem] top-8 w-px origin-top bg-gradient-to-b from-brand-blue to-brand-green transition-[height] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ height: `calc((100% - 4rem) * ${Math.min(1, Math.max(0, done - 1) / (PLAN.length - 1))})` }}
          />
          {PLAN.map((step, i) => {
            const isDone = i < done;
            const isNext = i === done;
            return (
              <li
                key={step}
                className={clsx(
                  "relative flex items-center gap-3.5 rounded-2xl px-3 py-2.5 transition-colors duration-500",
                  isNext ? "bg-viking/60" : ""
                )}
              >
                <span
                  className={clsx(
                    "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500",
                    isDone ? "border-brand-green bg-brand-green text-white" : isNext ? "border-brand-blue bg-white" : "border-hairline bg-white"
                  )}
                >
                  {isDone ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="plan-tick">
                      <path d="m2.5 6.3 2.3 2.2L9.5 3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
                    </svg>
                  ) : isNext ? (
                    <span className="h-2 w-2 animate-pulse rounded-full bg-brand-blue" />
                  ) : null}
                </span>
                <span
                  className={clsx(
                    "text-[0.95rem] font-semibold transition-colors duration-500",
                    isDone ? "text-jet" : isNext ? "text-brand-blue-deep" : "text-ink-faint"
                  )}
                >
                  {step}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/** The contact page's opening: the promise on the left, the plan on the right. */
function PartnerHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <HeroBackdrop focus="40% 40%" />
      {/* Fade the backdrop out at the bottom so the form below continues the same surface. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
      <div className="relative mx-auto grid max-w-[84rem] items-center gap-14 px-5 pb-20 pt-28 md:px-10 md:pt-36 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:pb-20">
        <div>
          <HeroHeading eyebrow={CONTACT_HERO.eyebrow} lines={CONTACT_HERO.title} className="max-w-2xl text-[clamp(2.2rem,4.6vw,3.8rem)]" />
          <Enter as="p" delay={0.3} className="mt-5 max-w-xl text-[clamp(1.02rem,1.4vw,1.15rem)] leading-relaxed text-ink-soft">
            {CONTACT_HERO.subtitle}
          </Enter>
          <ul className="mt-8 space-y-3">
            {PARTNER_ASSURANCES.map((point, i) => (
              <Enter as="li" key={point} delay={0.4 + i * 0.08} className="flex items-center gap-3 text-[0.98rem] font-semibold text-jet">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-peppermint text-[0.7rem] text-[#5f8a0f]">✓</span>
                {point}
              </Enter>
            ))}
          </ul>
          <Enter delay={0.7} className="mt-9 flex flex-wrap items-center gap-3">
            <CtaButton
              onClick={() => {
                const form = document.getElementById("enquiry");
                if (form) scrollToTarget(form);
              }}
            >
              Start your enquiry
            </CtaButton>
            <GhostButton href={CONTACT.phoneHref}>Call {CONTACT.phone}</GhostButton>
          </Enter>
        </div>

        <Enter delay={0.35}>
          <NetworkPlanCard />
        </Enter>
      </div>
    </section>
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

  const pickType = (value) => {
    setForm((f) => ({ ...f, businessType: value }));
    setErrors((e) => (e.businessType ? { ...e, businessType: undefined } : e));
  };

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
      <PartnerHero />

      {/* ------------------------------------------------ form + aside --- */}
      {/* Same white surface as the hero, so the page reads as one piece. */}
      <section className="bg-white pb-24 pt-2 md:pb-32">
        {/* min-w-0 on the columns: a long address row may truncate, never widen the page. */}
        <div className="mx-auto grid max-w-[84rem] gap-6 px-5 md:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-10 [&>*]:min-w-0">
          <Reveal from="left">
            <div className="rounded-[2rem] border border-hairline bg-white p-6 shadow-[0_30px_60px_-42px_rgba(5,36,57,.35)] md:p-10">
              {status === "sent" ? (
                <div className="sent flex min-h-[26rem] flex-col items-start justify-center">
                  <span className="sent-badge flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green text-white">
                    <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden>
                      <path className="sent-tick" d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
                    </svg>
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
                    className="pill-fill mt-8 rounded-full border border-hairline px-6 py-3 text-[0.92rem] font-bold text-jet"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form id="enquiry" onSubmit={onSubmit} noValidate className="scroll-mt-28">
                  <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold tracking-[-0.03em] text-jet">
                    Tell us about your business
                  </h2>
                  <p className="mt-2 text-[0.98rem] text-ink-soft">Fields marked with an asterisk are required.</p>

                  <div className="mt-7">
                    <BusinessTypeChips value={form.businessType} onPick={pickType} error={errors.businessType} />
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
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

                    <Field label="Monthly orders" labelId="monthlyOrders-label">
                      <Select
                        id="monthlyOrders"
                        name="monthlyOrders"
                        labelledBy="monthlyOrders-label"
                        value={form.monthlyOrders}
                        onChange={set("monthlyOrders")}
                        options={MONTHLY_ORDERS.map((range) => ({ value: range, label: range }))}
                      />
                    </Field>

                    <div>
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
                      className="pill-fill inline-flex min-h-10 items-center gap-2 rounded-full border border-hairline px-4 text-[0.85rem] font-semibold text-ink-soft"
                    >
                      <SocialIcon name={s.name} />
                      {s.name}
                      <span aria-hidden className="pill-arrow">↗</span>
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
