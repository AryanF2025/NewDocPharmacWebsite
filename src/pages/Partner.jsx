/**
 * Partner with us — the contact page.
 * The form posts to the wrapper service at VITE_API_BASE_URL (POST /send-mail/).
 */

import { useState } from "react";
import { Reveal, PageHero } from "@/components/ui/Reveal";
import { COMPLIANCE, ComplianceIcon } from "@/components/experience/compliance";
import { CONTACT, OFFICE, SOCIAL } from "@/components/experience/siteInfo";
import { submitContactEnquiry } from "@/api/contact.api";
import { BUSINESS_TYPES, MONTHLY_ORDERS, CONTACT_INITIAL, PARTNER_HERO, PARTNER_ASSURANCES } from "@/data/contact";
import { usePageMeta } from "@/hooks/usePageMeta";
import stillHandover from "@/assets/images/still-handover.jpg";

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

export default function Partner() {
  usePageMeta({
    title: "Partner with us — DocPharma",
    description:
      "Tell us what you sell and where you deliver. We'll map the darkstores, compliance and SLA to put your products 30 minutes from your customers.",
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
      <PageHero eyebrow={PARTNER_HERO.eyebrow} headline={PARTNER_HERO.headline} sub={PARTNER_HERO.sub}>
        <ul className="flex flex-wrap gap-2.5">
          {PARTNER_ASSURANCES.map((point) => (
            <li key={point} className="flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-2 text-[0.88rem] font-semibold text-ink-soft">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-[0.6rem] text-white">✓</span>
              {point}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="bg-floral pb-20 md:pb-28">
        <div className="mx-auto grid max-w-[84rem] gap-6 px-5 md:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          {/* ------------------------------------------------- form --- */}
          <Reveal>
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
                  <p className="mt-2 text-[0.98rem] text-ink-soft">
                    Fields marked with an asterisk are required.
                  </p>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <Field label="Your name *" error={errors.name}>
                      <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Priya Sharma"
                        autoComplete="name"
                        className={FIELD}
                      />
                    </Field>

                    <Field label="Company" error={errors.company}>
                      <input
                        id="company"
                        name="company"
                        value={form.company}
                        onChange={set("company")}
                        placeholder="Company name"
                        autoComplete="organization"
                        className={FIELD}
                      />
                    </Field>

                    <Field label="Work email *" error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="you@company.com"
                        autoComplete="email"
                        className={FIELD}
                      />
                    </Field>

                    <Field label="Phone" error={errors.phone}>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        className={FIELD}
                      />
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
                        <input
                          id="cities"
                          name="cities"
                          value={form.cities}
                          onChange={set("cities")}
                          placeholder="Bengaluru, Mumbai, Delhi NCR"
                          className={FIELD}
                        />
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

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group mt-8 flex items-center gap-3 rounded-full bg-brand-blue py-2 pl-7 pr-2 text-[1rem] font-bold text-white transition-colors hover:bg-jet disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send enquiry"}
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-[-45deg]">
                      →
                    </span>
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* ------------------------------------------------- aside --- */}
          <div className="space-y-4">
            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-hairline bg-white p-7">
                <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">What happens next</p>
                <ol className="mt-5 space-y-5">
                  {NEXT_STEPS.map(([n, title, body]) => (
                    <li key={n} className="flex gap-4">
                      <span className="tabular text-[0.78rem] font-extrabold text-brand-green">{n}</span>
                      <span>
                        <span className="block text-[1rem] font-extrabold text-jet">{title}</span>
                        <span className="mt-1 block text-[0.92rem] leading-relaxed text-ink-soft">{body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="relative overflow-hidden rounded-[2rem] bg-jet p-7 text-white">
                <img src={stillHandover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-jet via-jet/80 to-jet/40" />
                <div className="relative">
                  <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-green">Why partners stay</p>
                  <ul className="mt-5 grid gap-2">
                    {COMPLIANCE.map((item) => (
                      <li key={item.title} className="flex items-center gap-3 text-[0.94rem] font-semibold text-white/85">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-green/15 text-brand-green">
                          <ComplianceIcon name={item.icon} />
                        </span>
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-[2rem] border border-hairline bg-white p-7">
                <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">Reach us</p>
                <a
                  href={CONTACT.phoneHref}
                  className="mt-4 block text-[1.05rem] font-extrabold text-jet transition-colors hover:text-brand-blue"
                >
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-1 block text-[0.95rem] font-semibold text-ink-soft transition-colors hover:text-brand-blue"
                >
                  {CONTACT.email}
                </a>
                <address className="mt-4 text-[0.94rem] not-italic leading-relaxed text-ink-soft">
                  {OFFICE.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <div className="mt-5 flex gap-2">
                  {SOCIAL.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-hairline px-4 py-2 text-[0.85rem] font-semibold text-ink-soft transition-colors hover:border-brand-blue hover:text-jet"
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
