/** The five businesses the brief asks the form to segment by, plus a catch-all. */
export const BUSINESS_TYPES = [
  { value: "e-pharmacy", label: "E-Pharmacy" },
  { value: "corporate-wellness", label: "Corporate Wellness" },
  { value: "health-insurer", label: "Health Insurer" },
  { value: "d2c-health", label: "D2C Health & Wellness Brand" },
  { value: "hospital", label: "Doctor / Hospital" },
  { value: "other", label: "Other" },
];

export const MONTHLY_ORDERS = [
  "Under 1,000",
  "1,000 – 10,000",
  "10,000 – 50,000",
  "50,000+",
];

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

export const PARTNER_HERO = {
  eyebrow: "Partner with us",
  headline: "Let's put your products closer to your customers.",
  sub: "Tell us what you sell and where you need it delivered. We'll come back with the network, the SLA and what it takes to go live.",
};

export const PARTNER_ASSURANCES = [
  "A response within two working days",
  "No rebuild — we plug into your existing stack",
  "Licensed, pharmacist-led fulfilment from day one",
];
