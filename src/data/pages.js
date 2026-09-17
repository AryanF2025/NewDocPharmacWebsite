/**
 * Copy for Technology & Compliance, About Us, and Resources.
 * Founder names, designations, investors and funding are the publicly
 * reported facts from the Pre-Series A announcement (Sept 2025).
 */

/* ------------------------------------------------ technology & compliance --- */

export const TECH_HERO = {
  eyebrow: "Technology & compliance",
  headline: "Built for what you deliver. Engineered for how it moves.",
  sub: "A compliant fulfilment infrastructure where technology, inventory and last-mile operations work as one.",
};

export const TECH_ONE = {
  eyebrow: "DocPharma One",
  headline: "One system. Every layer of fulfilment.",
  sub: "DocPharma One connects the operational layers behind every order, from stock entering the network to the moment it reaches the customer.",
  chain: ["Procure", "Receive", "Store", "Fulfil", "Deliver"],
};

export const TECH_STACK = {
  headline: "Technology that runs the network.",
  items: [
    { key: "ims", name: "IMS", body: "Real-time inventory visibility across the network." },
    { key: "oms", name: "OMS", body: "Orders routed, managed and tracked from one system." },
    { key: "wms", name: "WMS", body: "From inwarding and QC to putaway and fulfilment." },
    { key: "picking", name: "Picking App", body: "Guided, scan-based picking that reduces errors." },
    {
      key: "logistics",
      name: "Logistics Orchestration",
      body: "Intelligent assignment across hubs, zones and delivery modes.",
    },
    {
      key: "rider",
      name: "Rider App",
      body: "Real-time task assignment, navigation, OTP verification and delivery tracking.",
    },
  ],
};

/** Compliance shown, not stated — these render as stamped seals. */
export const COMPLIANCE = {
  headline: "Compliance isn't a checkbox. It's built into the infrastructure.",
  sub: "Our network is designed to support the regulatory and operational requirements of pharma, nutrition, wellness and other regulated categories.",
  seals: [
    {
      key: "drug-licensed",
      name: "Drug licensed",
      body: "Licensed infrastructure for pharmaceutical fulfilment.",
    },
    {
      key: "fssai",
      name: "FSSAI",
      body: "Infrastructure supporting compliant storage and fulfilment of food & nutrition products.",
    },
    {
      key: "pharmacist-led",
      name: "Pharmacist-led",
      body: "Prescription and medicine workflows supported by pharmacist validation.",
    },
    {
      key: "traceable",
      name: "Traceable inventory",
      body: "Batch, expiry and MRP captured at product level.",
    },
    {
      key: "verified",
      name: "Verified network",
      body: "Licensed stores, verified personnel and documented operational processes.",
    },
  ],
};

export const TRACE = {
  headline: "Where compliance meets technology.",
  sub: "Don't just show the licence. Show what happens because of it.",
  chain: ["Scan", "Verify", "Batch & expiry", "Inventory", "Invoice", "Dispatch"],
  closer: "Every movement leaves a trail.",
};

export const TECH_VERTICALS = {
  headline: "One infrastructure. Multiple possibilities.",
  items: [
    {
      name: "Pharma",
      body: "Licensed infrastructure, prescription workflows & controlled fulfilment.",
    },
    {
      name: "E-Pharmacies",
      body: "Inventory visibility, order management & hyperlocal delivery.",
    },
    {
      name: "D2C Health & Wellness",
      body: "Inventory management, fulfilment & faster last mile.",
    },
    { name: "Food & Nutrition", body: "FSSAI-supported storage and fulfilment." },
    {
      name: "Health-tech & Hospitals",
      body: "API-led fulfilment connecting digital demand to physical delivery.",
    },
  ],
};

/** The black-panel final statement. */
export const FINAL_STATEMENT = {
  lines: ["Healthcare supply chains", "need more than speed.", "They need control."],
  brand: "DocPharma",
  positioning: "Compliance × Technology × Speed",
  cta: "Build your supply chain with us",
};

/* ------------------------------------------------------------------ about --- */

export const ABOUT_HERO = {
  eyebrow: "About us",
  headline: "Built for health. Built for Bharat.",
  sub: "A connected network that brings health, wellness and healthcare products closer to the people who need them.",
};

export const ABOUT_STORY = [
  {
    id: "belief",
    headline: "We started with a simple belief.",
    lead: "Healthcare should be easier to access.",
    body: [
      "A product shouldn't take days to reach someone simply because the right inventory isn't close enough.",
      "So we set out to build a different kind of network — one where inventory sits closer to demand, technology connects every step, and people and processes work together to move every order with speed and accountability.",
      "Today, our network brings together warehouses, doctors, partners, technology, operations teams and our own delivery fleet to help brands serve their customers faster.",
    ],
    pull: "We are building access.",
  },
  {
    id: "connected",
    headline: "Everything connected. Every order traceable.",
    lead: "Technology isn't something we added on top of operations. It is built into the way we operate.",
    body: [
      "Our own technology connects inventory, order processing, picking, verification, packing and delivery — giving our teams visibility across the entire journey.",
    ],
    stack: [
      "Our people run the operations.",
      "Our technology connects them.",
      "Our fleet moves the order.",
      "Our network brings inventory closer.",
    ],
    pull: "Every order tracked. Every handoff visible. Every step accountable.",
  },
  {
    id: "closer",
    headline: "Built closer to the customer.",
    lead: "The traditional journey of a product can involve long distances, multiple handoffs and limited visibility.",
    body: [
      "We are changing that by building a distributed network that puts inventory closer to where people live and where demand is created.",
    ],
    stack: ["Closer inventory.", "Fewer handoffs.", "Faster fulfilment.", "Better access."],
    pull: "Available when their customers need them.",
  },
];

export const VALUES = {
  headline: "What we believe",
  items: [
    {
      name: "Access matters",
      body: "Healthcare and wellness products should be easier to find, easier to access and easier to receive.",
    },
    {
      name: "Every order matters",
      body: "Behind every order is a person waiting for something they need. We treat every delivery with that responsibility.",
    },
    {
      name: "Technology should solve real problems",
      body: "We build technology around what happens on the ground, not the other way around.",
    },
    {
      name: "Own the journey",
      body: "From inventory to doorstep, we believe in visibility, accountability and ownership at every step.",
    },
    {
      name: "Build for Bharat",
      body: "India is not one market. We are building infrastructure that works for the scale, diversity and realities of India.",
    },
  ],
};

export const FOUNDERS = {
  headline: "The people behind DocPharma",
  lead: "We didn't start by trying to build a bigger logistics network. We started by asking a simpler question: what would it take to make healthcare more accessible?",
  body: "That question led us to rethink how inventory moves, how technology connects operations, how brands reach consumers and how the last mile should work.",
  people: [
    {
      name: "Shashank Rai",
      role: "Co-Founder & CEO",
      initials: "SR",
      quote:
        "Healthcare supply chains demand a fundamentally different approach from traditional commerce.",
    },
    {
      name: "Saquib Ali",
      role: "Co-Founder & CBO",
      initials: "SA",
      quote:
        "Quick commerce trained Indian customers to expect anything in minutes, except the one category that matters most when they actually need it: medicine.",
    },
    {
      name: "Sagar Chauhan",
      role: "Co-Founder & CPTO",
      initials: "SC",
      quote:
        "DocPharma One is the intelligence layer powering our entire supply chain, built from the ground up for AI-driven inventory forecasting.",
    },
  ],
};

export const MISSION = {
  headline: "Our mission",
  lead: "Make healthcare more accessible, one order at a time.",
  body: [
    "We exist to remove the distance between people and the products they need.",
    "By bringing together network, technology, people and delivery, we are making it easier for brands to reach consumers — faster, more reliably and closer to home.",
  ],
};

export const VISION = {
  headline: "Our vision",
  lead: "A more connected, accessible healthcare ecosystem for India.",
  body: [
    "We imagine a future where the products people need are available closer to them.",
    "Where brands can serve customers without being limited by fragmented infrastructure.",
    "Where technology makes every movement visible.",
    "And where access to healthcare isn't defined by distance.",
  ],
  closer: "We are building towards that future — one network, one brand and one order at a time.",
};

export const ABOUT_CLOSER = {
  headline: "This is DocPharma.",
  lead: "We connect what happens behind the scenes to what matters at the doorstep.",
  closer: "Building the network that brings health closer to Bharat.",
};

/** Named investors from the Pre-Series A round. */
export const INVESTORS = {
  eyebrow: "Backed by",
  headline: "Backed to build the network.",
  sub: "A $2M Pre-Series A led by Equentis, to expand across 50 cities and 100 new licensed dark stores.",
  names: ["Equentis", "100Unicorns", "Vinners", "VCATs"],
};

/* -------------------------------------------------------------- resources --- */

export const RESOURCES_HERO = {
  eyebrow: "Press",
  headline: "In the media.",
  sub: "Coverage of the network we're building, and the case for treating healthcare logistics differently.",
};

export const PRESS = [
  {
    outlet: "Inc42",
    title: "Quick commerce supply chain startup DocPharma nets $2 Mn for expansion",
    href: "https://inc42.com/buzz/quick-commerce-supply-chain-startup-docpharma-nets-2-mn-for-expansion/",
    date: "Sept 2025",
  },
  {
    outlet: "Entrackr",
    title: "Equentis leads $2 Mn Pre-Series A round in DocPharma",
    href: "https://entrackr.com/snippets/equentis-leads-2-mn-pre-series-a-round-in-docpharma-12482287",
    date: "Sept 2025",
  },
  {
    outlet: "Indian Startup News",
    title:
      "Healthcare-focused quick commerce supply chain platform DocPharma raises $2 million in funding",
    href: "https://indianstartupnews.com/funding/healthcare-focused-quick-commerce-supply-chain-platform-docpharma-raises-2-million-in-funding-12483146",
    date: "Sept 2025",
  },
  {
    outlet: "Indian Startup Times",
    title:
      "DocPharma raises $2 million in Pre-Series A round led by Equentis to expand prescription-compliant healthcare supply chain",
    href: "https://www.indianstartuptimes.com/investment/docpharma-raises-2-million-in-pre-series-a-round-led-by-equentis-to-expand-prescription-compliant-healthcare-supply-chain/",
    date: "Sept 2025",
  },
  {
    outlet: "D2C Insider Pulse",
    title: "DocPharma raises $2 Mn to scale quick-commerce healthcare network",
    href: "https://pulse.d2cinsider.com/docpharma-raises-2-mn-to-scale-quick-commerce-healthcare-network/",
    date: "Sept 2025",
  },
  {
    outlet: "EquityPandit",
    title: "DocPharma raises $2 million to expand healthcare network",
    href: "https://www.equitypandit.com/docpharma-raises-2-million-to-expand-healthcare-network/",
    date: "Sept 2025",
  },
];

/** Editorial pieces. Written here so Resources isn't an empty shell. */
export const BLOGS = [
  {
    slug: "why-medicine-is-the-last-category",
    tag: "Point of view",
    title: "Why medicine was the last category quick commerce couldn't crack",
    excerpt:
      "Groceries needed speed. Medicine needs speed plus a licence, a pharmacist and a batch number. That difference is the whole business.",
    read: "5 min read",
  },
  {
    slug: "two-layers-of-validation",
    tag: "Operations",
    title: "Two layers of validation, and why we won't drop either one",
    excerpt:
      "AI reads every prescription in seconds. A registered pharmacist still signs off before the box is sealed. Here's the reasoning behind keeping both.",
    read: "4 min read",
  },
  {
    slug: "inventory-closer-to-demand",
    tag: "Network",
    title: "The 30-minute promise is an inventory problem, not a delivery problem",
    excerpt:
      "You cannot ride your way out of stock sitting 200km away. What it takes to place the right SKUs inside the right catchment.",
    read: "6 min read",
  },
  {
    slug: "what-is-docpharma-one",
    tag: "Technology",
    title: "What DocPharma One actually is",
    excerpt:
      "Not another WMS. The operating system that lets one network see stock, decide fulfilment, move it and deliver against a tight SLA.",
    read: "7 min read",
  },
];
