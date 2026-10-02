/**
 * Single source of truth for SEO: site identity, per-route metadata, the FAQ
 * and the structured data built from them.
 *
 * Plain data and functions only (no React, no asset imports), because the
 * build script (scripts/prerender-seo.mjs) imports this file under Node to
 * write each route's static <head>, the sitemap and robots.txt.
 *
 * Every fact here is taken from content already published on the site.
 */

export const SITE = {
  name: "DocPharma",
  legalName: "FLEDGE HEALTHPLUS PRIVATE LIMITED",
  // Official domain, as stated in the site's Terms. Change here if production moves.
  url: "https://docpharma.in",
  locale: "en_IN",
  language: "en-IN",
  themeColor: "#0296d9",
  ogImage: "/og/docpharma-og.jpg",
  ogImageAlt: "DocPharma: medicine delivered in 30 minutes from licensed darkstores",
  logo: "/icons/icon-512.png",
  tagline: "India's first healthcare quick-commerce supply chain",
  phone: "+91 75420 21525",
  phoneE164: "+917542021525",
  email: "tech-support@fledgehealth.com",
  address: {
    streetAddress: "A2 306, Azure Tower, MI Central Park, Arjunganj",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "226001",
    addressCountry: "IN",
  },
  sameAs: ["https://www.linkedin.com/company/docpharmaindia", "https://www.instagram.com/docpharma.in"],
  // Cities named on the site's coverage map; the site also states 12+ cities.
  cities: ["Delhi NCR", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata"],
};

export const abs = (path = "/") => `${SITE.url}${path}`;

/**
 * Per-route metadata. `index: false` keeps a route out of search and the
 * sitemap. `primary` is the search theme the page owns (see SEO_IMPLEMENTATION.md).
 */
export const ROUTES = [
  {
    key: "home",
    path: "/",
    title: "DocPharma | 30-Minute Medicine Delivery & Healthcare Supply Chain in India",
    description:
      "DocPharma runs licensed darkstores, pharmacist-led fulfilment and its own rider fleet, so pharmacies, health brands and insurers can deliver medicine in 30 minutes across 12+ Indian cities.",
    primary: "healthcare quick-commerce / 30-minute medicine delivery",
    type: "WebPage",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    key: "solutions",
    path: "/solutions",
    title: "Healthcare Fulfilment Solutions for E-Pharmacies, D2C Brands & Insurers | DocPharma",
    description:
      "Licensed darkstore fulfilment and last-mile delivery for e-pharmacies, D2C health and wellness brands, corporate wellness platforms, health insurers, doctors and hospitals.",
    primary: "healthcare fulfilment solutions by business type",
    type: "CollectionPage",
    priority: "0.9",
    changefreq: "monthly",
    crumbs: [["Solutions", "/solutions"]],
  },
  {
    key: "technology",
    path: "/technology",
    title: "DocPharma One: Pharmacy Inventory, Order & Delivery Platform | DocPharma",
    description:
      "DocPharma One connects inventory, orders, scan-verified picking, rider apps and live tracking on licensed, pharmacist-led, fully traceable infrastructure.",
    primary: "pharmacy fulfilment technology / DocPharma One",
    type: "WebPage",
    priority: "0.8",
    changefreq: "monthly",
    crumbs: [["Technology", "/technology"]],
  },
  {
    key: "about",
    path: "/about",
    title: "About DocPharma | Healthcare Supply Chain Built for Bharat",
    description:
      "The story, values, leadership and investors behind DocPharma, the healthcare quick-commerce network bringing medicine closer to people across India.",
    primary: "DocPharma company / founders",
    type: "AboutPage",
    priority: "0.7",
    changefreq: "monthly",
    crumbs: [["About", "/about"]],
  },
  {
    key: "partner",
    path: "/partner",
    title: "Partner with DocPharma | Healthcare Fulfilment & Delivery Enquiries",
    description:
      "Tell us what you sell and where. DocPharma maps the licensed darkstores and delivery SLA your orders need, and replies within two working days.",
    primary: "partner / contact DocPharma",
    type: "ContactPage",
    priority: "0.8",
    changefreq: "yearly",
    crumbs: [["Partner with us", "/partner"]],
  },
  {
    key: "resources",
    path: "/resources",
    title: "DocPharma in the News | Funding, Launches & Founder Interviews",
    description:
      "Press coverage of DocPharma: the $2M Pre-Series A, the 30-minute healthcare delivery network for D2C brands, and interviews with the founders.",
    primary: "DocPharma news / press",
    type: "CollectionPage",
    priority: "0.6",
    changefreq: "monthly",
    crumbs: [["Resources", "/resources"]],
  },
  {
    key: "privacy",
    path: "/privacy",
    title: "Privacy Policy | DocPharma",
    description: "How DocPharma (Fledge Healthplus Private Limited) collects, uses and protects personal information on its website and services.",
    type: "WebPage",
    priority: "0.3",
    changefreq: "yearly",
    crumbs: [["Privacy Policy", "/privacy"]],
  },
  {
    key: "terms",
    path: "/terms",
    title: "Terms & Conditions | DocPharma",
    description: "The terms that govern use of the DocPharma website, operated by Fledge Healthplus Private Limited.",
    type: "WebPage",
    priority: "0.3",
    changefreq: "yearly",
    crumbs: [["Terms & Conditions", "/terms"]],
  },
  {
    key: "notFound",
    path: "/404",
    title: "Page not found | DocPharma",
    description: "This page could not be found. Visit the DocPharma home page or partner with us.",
    index: false,
  },
];

export const routeByKey = (key) => ROUTES.find((r) => r.key === key);

/** The five audiences the network serves — mirrors the Solutions page. */
export const SERVICES = [
  ["E-pharmacy fulfilment", "Compliant darkstore network, drug-licensed fulfilment and pharmacist-led prescription validation for online pharmacies."],
  ["D2C health & wellness fulfilment", "Multi-city stock held close to customers, with 30-minute hyperlocal delivery for health and wellness brands."],
  ["Corporate wellness fulfilment", "Medicine and wellness orders from corporate wellness platforms, fulfilled and delivered by the DocPharma network."],
  ["Medicine delivery for health insurers", "Fulfilment and doorstep delivery of medicines for health insurance members."],
  ["Fulfilment for doctors & hospitals", "API-led fulfilment that connects digital demand from doctors and hospitals to physical delivery."],
];

/**
 * Questions people ask about DocPharma, answered only with what the site
 * already states. Rendered visibly on the home page and as FAQPage schema.
 */
export const FAQ = [
  {
    q: "What is DocPharma?",
    a: "DocPharma is India's first healthcare quick-commerce supply chain. It runs licensed darkstores, pharmacist validation, AI-driven inventory and its own delivery fleet as one network, so healthcare businesses can deliver medicines and wellness products to customers fast without building that infrastructure themselves.",
  },
  {
    q: "How fast does DocPharma deliver?",
    a: "Hyperlocal orders are delivered in about 30 minutes, because inventory sits inside each darkstore's catchment. For e-pharmacies DocPharma also offers 30–60 minute hyperlocal, same-day and next-day delivery.",
  },
  {
    q: "Which cities does DocPharma serve?",
    a: "DocPharma operates in 12+ cities, including Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Pune and Kolkata, and delivers to 19,000+ pincodes across India through its own riders and partner couriers.",
  },
  {
    q: "Who is DocPharma for?",
    a: "Businesses that sell health and wellness products: e-pharmacies, D2C health and wellness brands, corporate wellness platforms, health insurers, and doctors and hospitals.",
  },
  {
    q: "Are prescriptions checked before medicines are dispatched?",
    a: "Yes. Every prescription is validated and a registered pharmacist signs off before dispatch. Fulfilment runs on drug-licensed infrastructure, food and nutrition products are handled FSSAI-compliantly, and batch, expiry and MRP are captured for every unit.",
  },
  {
    q: "Does DocPharma integrate with my existing systems?",
    a: "Yes, with no rebuild required. DocPharma works with Shopify, Unicommerce and EasyEcom, and accepts orders through its order API with status updates sent back by webhook.",
  },
  {
    q: "How do I start working with DocPharma?",
    a: "Send an enquiry through the Partner with us page with your categories, cities and order volumes. The partnerships team replies within two working days with the network, delivery SLA and what it takes to go live. You can also call +91 75420 21525.",
  },
];

/* ------------------------------------------------------- structured data --- */

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: abs(SITE.logo), width: 512, height: 512 },
    image: abs(SITE.ogImage),
    description:
      "India's first healthcare quick-commerce supply chain: licensed darkstores, pharmacist validation, AI-driven inventory and an in-house delivery fleet in one network.",
    slogan: "Elevating healthcare together",
    email: SITE.email,
    telephone: SITE.phone,
    address: { "@type": "PostalAddress", ...SITE.address },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: "IN",
        availableLanguage: ["en"],
      },
    ],
    areaServed: { "@type": "Country", name: "India" },
    sameAs: SITE.sameAs,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.url,
    name: SITE.name,
    inLanguage: SITE.language,
    publisher: { "@id": ORG_ID },
  };
}

/** Structured data for one route: its page, breadcrumbs, and page-specific extras. */
export function pageSchema(route) {
  const url = abs(route.path);
  const graph = [
    {
      "@type": route.type || "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: route.title,
      description: route.description,
      inLanguage: SITE.language,
      isPartOf: { "@id": SITE_ID },
      about: { "@id": ORG_ID },
      primaryImageOfPage: { "@type": "ImageObject", url: abs(SITE.ogImage) },
    },
  ];

  if (route.crumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [["Home", "/"], ...route.crumbs].map(([name, path], i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
        item: abs(path),
      })),
    });
    graph[0].breadcrumb = { "@id": `${url}#breadcrumb` };
  }

  if (route.key === "home") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: FAQ.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    });
  }

  if (route.key === "solutions") {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#services`,
      name: "DocPharma healthcare fulfilment solutions",
      itemListElement: SERVICES.map(([name, description], i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name,
          description,
          serviceType: "Healthcare fulfilment and last-mile delivery",
          provider: { "@id": ORG_ID },
          areaServed: SITE.cities.map((c) => ({ "@type": "City", name: c })),
        },
      })),
    });
  }

  return graph;
}

/** Site-wide schema (organisation + website), shared by every page. */
export const siteGraph = () => ({ "@context": "https://schema.org", "@graph": [organizationSchema(), websiteSchema()] });
export const pageGraph = (route) => ({ "@context": "https://schema.org", "@graph": pageSchema(route) });
