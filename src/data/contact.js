/**
 * Contact page copy, matching the live DocPharma site's wording.
 * The slider imagery uses stills from our own darkstore film.
 */

import stillPick from "@/assets/images/still-pick.jpg";
import stillVerify from "@/assets/images/still-verify.jpg";
import stillHandover from "@/assets/images/still-handover.jpg";
import stillPack from "@/assets/images/still-pack.jpg";
import stillRider from "@/assets/images/still-rider.jpg";

export const CONTACT_HERO = {
  eyebrow: "Partner with us",
  title: "Let's build better healthcare access together.",
  subtitle:
    "Whether you need to fulfil more orders, reach customers faster, expand into new cities or build a healthcare delivery layer.",
};

/** The five audiences in the slider. `value` is what the form submits. */
export const BUSINESS_TYPES = [
  { value: "e-pharmacy", tab: "E-Pharmacy", label: "E-Pharmacy", heading: "Expand fulfilment & delivery", image: stillPick },
  {
    value: "corporate-wellness",
    tab: "Corporate Wellness",
    label: "Corporate Wellness",
    heading: "Connect healthcare demand to supply",
    image: stillVerify,
  },
  {
    value: "health-insurer",
    tab: "Health Insurer",
    label: "Health Insurer",
    heading: "Enable medicine access for members",
    image: stillHandover,
  },
  {
    value: "d2c-health",
    tab: "D2C Health",
    label: "D2C Health & Wellness Brand",
    heading: "Scale fulfilment & delivery",
    image: stillPack,
  },
  { value: "hospital", tab: "Hospital", label: "Doctor / Hospital", heading: "Extend care beyond the hospital", image: stillRider },
  { value: "other", tab: "Other", label: "Other", heading: "Tell us what you need", image: stillPick },
];

/** The slider shows every audience except the catch-all. */
export const SLIDER_TYPES = BUSINESS_TYPES.filter((type) => type.value !== "other");

export const SLIDE_INTERVAL_MS = 4000;

export const MONTHLY_ORDERS = ["Under 1,000", "1,000 – 10,000", "10,000 – 50,000", "50,000+"];

export const CONTACT_INITIAL = {
  name: "",
  company: "",
  email: "",
  phone: "",
  businessType: BUSINESS_TYPES[0].value,
  monthlyOrders: MONTHLY_ORDERS[1],
  cities: "",
  message: "",
};

export const PARTNER_ASSURANCES = [
  "A response within two working days",
  "No rebuild — we plug into your existing stack",
  "Licensed, pharmacist-led fulfilment from day one",
];
