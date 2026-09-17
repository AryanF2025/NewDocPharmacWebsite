/** Compliance points, shown compactly wherever the page needs proof. */

export const COMPLIANCE = [
  { icon: "shield", title: "Drug licensed", line: "Licensed pharmaceutical fulfilment" },
  { icon: "leaf", title: "FSSAI compliant", line: "Food & nutrition storage and delivery" },
  { icon: "pharmacist", title: "Pharmacist-led", line: "Every prescription validated" },
  { icon: "barcode", title: "Fully traceable", line: "Batch, expiry & MRP on every unit" },
];

export function ComplianceIcon({ name }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5.5c0 4.3 3 8.1 7 9.5 4-1.4 7-5.2 7-9.5V6z" />
          <path d="m9 12 2.2 2.2L15.5 10" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" />
          <path d="M5 19c3-4 6-7 10-9" />
        </svg>
      );
    case "pharmacist":
      return (
        <svg {...common}>
          <circle cx="12" cy="7.5" r="3.5" />
          <path d="M5 20c.6-3.6 3.4-6 7-6s6.4 2.4 7 6" />
          <path d="M12 15.5v3M10.5 17h3" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M4 6v12M7.5 6v12M10 6v12M13.5 6v12M16 6v12M20 6v12" />
        </svg>
      );
  }
}

