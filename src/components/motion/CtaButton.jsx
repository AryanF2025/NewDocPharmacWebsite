import { Link } from "react-router-dom";
import clsx from "clsx";
import { Magnetic } from "@/components/experience/Magnetic";

const VARIANTS = {
  blue: {
    pill: "bg-brand-blue text-white shadow-[0_14px_34px_-14px_rgba(2,150,217,.9)]",
    fill: "bg-jet",
    knob: "bg-white/20 text-white",
  },
  white: { pill: "bg-white text-jet", fill: "bg-brand-green", knob: "bg-jet text-white" },
  green: { pill: "bg-brand-green text-jet", fill: "bg-white", knob: "bg-jet text-white" },
};

/**
 * The one primary button: a pill that pulls toward the cursor, fills from the
 * arrow side on hover, and turns its arrow to point the way.
 */
export function CtaButton({ to, href, children, variant = "blue", className, type, disabled, onClick }) {
  const v = VARIANTS[variant] ?? VARIANTS.blue;
  const inner = (
    <>
      <span aria-hidden className={clsx("cta-fill absolute inset-0 rounded-full", v.fill)} />
      <span className="relative">{children}</span>
      <span
        className={clsx(
          "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-[-45deg]",
          v.knob
        )}
      >
        →
      </span>
    </>
  );
  const cls = clsx(
    "cta group relative isolate flex items-center gap-3 overflow-hidden rounded-full py-2 pl-7 pr-2 text-[0.98rem] font-bold transition-colors duration-500",
    v.pill,
    variant === "blue" && "hover:text-white",
    variant !== "blue" && "hover:text-jet",
    disabled && "pointer-events-none opacity-60"
  );

  let el;
  if (to) {
    el = (
      <Link to={to} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  } else if (href) {
    el = (
      <a href={href} target="_blank" rel="noreferrer" className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  } else {
    el = (
      <button type={type ?? "button"} disabled={disabled} className={cls} onClick={onClick}>
        {inner}
      </button>
    );
  }

  return <Magnetic className={clsx("inline-block", className)}>{el}</Magnetic>;
}

/** The quieter partner to the CTA: an outlined pill. */
export function GhostButton({ to, href, children, tone = "light", className }) {
  const cls = clsx(
    "pill-fill inline-flex items-center rounded-full border px-7 py-3.5 text-[0.98rem] font-bold",
    tone === "dark" ? "pill-fill--dark border-white/25 text-white" : "border-hairline bg-white text-jet",
    className
  );
  return to ? (
    <Link to={to} className={cls}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}
