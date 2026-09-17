/**
 * Every word of site copy lives here so the components stay layout-only.
 * Source: the DocPharma website design brief, plus publicly reported figures
 * from the Pre-Series A coverage (Sept 2025).
 */

export const BRAND = {
  name: "DocPharma",
  tagline: "Elevating healthcare together",
  positioning: "Compliance × Technology × Speed",
};

export const NAV = [
  { label: "Solutions", to: "/solutions" },
  { label: "Technology", to: "/technology" },
  { label: "About", to: "/about" },
  { label: "Resources", to: "/resources" },
];

export const CTA = { label: "Partner with us", to: "/partner" };

/* ---------------------------------------------------------------- home --- */

export const HERO = {
  eyebrow: "India's first healthcare quick-commerce supply chain",
  headline: ["Empowering healthcare.", "Delivering faster."],
  sub: "We run the licensed dark stores, the fulfilment floor and the last mile behind India's healthcare businesses, so a prescription can reach a doorstep in thirty minutes.",
  ticker: ["30 minutes", "AI-powered", "Compliance-first"],
};

/** The six hero stages. One-word labels — the copy lives around the graphic. */
export const HERO_STAGES = [
  { key: "putaway", label: "Putaway", line: "Inventory ready to fulfil" },
  { key: "pick", label: "Pick & scan", line: "Accurate picking, every time" },
  { key: "pack", label: "Pack", line: "Verified and dispatch-ready" },
  { key: "rider", label: "Rider assigned", line: "The right rider, automatically" },
  { key: "route", label: "Route", line: "Intelligent last-mile orchestration" },
  { key: "delivered", label: "Delivered in 30 min", line: "From fulfilment centre to doorstep" },
];

export const PARTNERS_SECTION = {
  eyebrow: "Trusted by",
  headline: "Trusted by leaders across healthcare & wellness.",
};

/** Six checkpoints, one continuous flow. */
export const ORDER_FLOW = {
  eyebrow: "How it works",
  headline: "Every order, on the clock.",
  sub: "From the moment it lands on DocPharma One to the moment it's handed over — six checkpoints, one continuous flow, tracked to the minute.",
  steps: [
    {
      n: "01",
      label: "Order received",
      title: "Order received at DocPharma One",
      body: "The order enters the system instantly and is allocated to the nearest fulfilment point.",
      stamp: "T+0 min",
    },
    {
      n: "02",
      label: "AI validation",
      title: "First layer of validation",
      body: "AI-based prescription auto-validation reads the script and flags anything that needs a human eye.",
      stamp: "T+1 min",
    },
    {
      n: "03",
      label: "Pick & pack",
      title: "Picked and packed in four minutes",
      body: "Guided picking, barcode verification at the shelf, sealed for dispatch.",
      stamp: "T+5 min",
    },
    {
      n: "04",
      label: "Pharmacist",
      title: "Second layer of validation",
      body: "A registered pharmacist checks the invoice against the prescription and signs off.",
      stamp: "T+8 min",
    },
    {
      n: "05",
      label: "Rider assigned",
      title: "Auto-rider assignment",
      body: "The nearest rider is assigned by distance, load and delivery SLA.",
      stamp: "T+10 min",
    },
    {
      n: "06",
      label: "Delivered",
      title: "Delivered in 30 minutes",
      body: "OTP confirmed, handover at the door, proof of delivery captured.",
      stamp: "T+30 min",
    },
  ],
};

export const TECH_SECTION = {
  eyebrow: "DocPharma One — AI-driven intelligence, built into every order",
  headline: ["One system thinks.", "The whole network moves."],
  sub: "DocPharma One, a platform connecting inventory, orders, fulfilment and delivery. Built to make healthcare supply chains faster, simpler and more reliable.",
  modules: [
    {
      n: "01",
      title: "Inventory intelligence",
      body: "Inwarding, putaway and real-time inventory visibility across every fulfilment point.",
    },
    {
      n: "02",
      title: "Real-time order management",
      body: "Orders from every channel, synced and intelligently allocated to the right fulfilment location.",
    },
    {
      n: "03",
      title: "Smart pick, pack & verify",
      body: "Guided picking, SKU scanning, verification and packing for accurate fulfilment.",
    },
    {
      n: "04",
      title: "Intelligent last-mile orchestration",
      body: "The right rider, route and delivery partner selected for every SLA.",
    },
    {
      n: "05",
      title: "Real-time control & tracking",
      body: "End-to-end order visibility with live tracking, exceptions and operational control.",
    },
  ],
};

export const NUMBERS = {
  eyebrow: "By the numbers",
  headline:
    "Fast, reliable, and reaching every pin code, for the patients, customers, and pharma & wellness brands who trust us.",
  stats: [
    { value: 50, suffix: "+", label: "Darkstores" },
    { value: 12, suffix: "+", label: "Cities covered" },
    { value: 10, suffix: "L+", label: "Orders delivered" },
    { value: 6, suffix: "L+", label: "Lives impacted" },
    { value: 95, suffix: "%", label: "Fulfilment rate" },
    { value: 93, suffix: "%", label: "Delivery adherence" },
    { value: 500, suffix: "+", label: "In-house fleet" },
    { value: 19000, suffix: "+", label: "Pincodes" },
  ],
};

export const INTEGRATIONS = {
  headline: "Trusted partners & integrations",
  sub: "No rebuild required, DocPharma plugs directly into your order, fulfilment, and delivery stack.",
};

/* ----------------------------------------------------------- solutions --- */

export const SOLUTIONS_HERO = {
  eyebrow: "Solutions",
  headline: "End-to-end supply chain, built for healthcare.",
  sub: "DocPharma runs the sourcing, fulfilment and last-mile infrastructure behind India's healthcare businesses: pharmacies, platforms, insurers and hospitals can put medicine on doorsteps without building the network themselves.",
  pills: ["30-minute delivery", "Hyperlocal fulfilment", "Pan-India network"],
};

export const SOLUTION_TABS = [
  {
    id: "e-pharmacies",
    tab: "E-Pharmacies",
    headline: "Pharmacy infrastructure built for speed and compliance.",
    copy: "Extend your pharmacy network without building every store yourself.",
    props: [
      "Compliant dark-store network",
      "Drug-licensed fulfilment infrastructure",
      "Pharmacist-led prescription validation",
      "30–60 minute hyperlocal delivery",
      "Same-day & next-day delivery",
      "Inventory & order management",
      "Last-mile orchestration",
    ],
    cta: "Build your pharmacy network",
    art: "pharmacy",
  },
  {
    id: "corporate-wellness",
    tab: "Corporate Wellness",
    headline: "Turn healthcare demand into healthcare delivered.",
    copy: "Connect your platform to a ready healthcare fulfilment network — from order processing to doorstep.",
    props: [
      "API-led integration",
      "Medicine sourcing & fulfilment",
      "Prescription workflows",
      "Inventory visibility",
      "Hyperlocal delivery",
      "Same-day / next-day delivery",
      "End-to-end order tracking",
    ],
    cta: "Power your platform",
    art: "platform",
  },
  {
    id: "health-insurers",
    tab: "Health Insurers",
    headline: "From coverage to care, without the logistics headache.",
    copy: "Enable medicine sourcing and delivery for your members through a compliant healthcare fulfilment network.",
    props: [
      "Medicine sourcing",
      "Patient / member fulfilment",
      "Prescription validation",
      "Doorstep delivery",
      "Pan-India reach",
      "Order & delivery visibility",
    ],
    cta: "Serve your members faster",
    art: "insurer",
  },
  {
    id: "d2c-health",
    tab: "D2C Health & Wellness",
    headline: "Your products. Our infrastructure. Delivered faster.",
    copy: "Scale your D2C business without building warehouses, fulfilment teams and last-mile operations city by city.",
    props: [
      "Inventory management",
      "Dark-store fulfilment",
      "30–60 minute hyperlocal delivery",
      "Same-day / next-day delivery",
      "Order processing",
      "Multi-city fulfilment",
      "Last-mile management",
    ],
    cta: "Scale your delivery network",
    art: "d2c",
  },
  {
    id: "hospitals",
    tab: "Doctors & Hospitals",
    headline: "Extend hospital care beyond the hospital.",
    copy: "Give patients access to medicines and fulfilment beyond your physical facility.",
    props: [
      "White-labelled applications",
      "Medicine delivery",
      "Prescription fulfilment",
      "Inventory management",
      "Order processing",
      "Patient delivery",
      "Fulfilment management",
    ],
    cta: "Build your healthcare delivery layer",
    art: "hospital",
  },
];

export const SOLUTIONS_IMPACT = {
  eyebrow: "Impact",
  headline: "What the network delivers.",
  stats: [
    { value: 95, suffix: "%", label: "Fulfilment rate", note: "Orders fulfilled first time" },
    { value: 93, suffix: "%", label: "Delivery adherence", note: "Inside the promised SLA" },
    { value: 30, suffix: " min", label: "Median hyperlocal", note: "Order to doorstep" },
    { value: 40, suffix: "k+", label: "SKUs per store", note: "Depth at the point of demand" },
  ],
};
