/**
 * About page copy and imagery, taken from the live DocPharma site
 * (DocPharma-WebSite/src/constants/commonConstants.js) so both stay in step.
 */

import valueAccess from "@/assets/images/value-access.webp";
import valueConnected from "@/assets/images/value-connected.webp";
import valueCustomer from "@/assets/images/value-customer.webp";
import teamGroup from "@/assets/images/team-group.webp";
import teamWarehouse from "@/assets/images/team-warehouse.webp";
import joinTeam from "@/assets/images/join-team.webp";
import shashankRai from "@/assets/team/shashank-rai.webp";
import saquibAli from "@/assets/team/saquib-ali.webp";
import sagarChauhan from "@/assets/team/sagar-chauhan.webp";
import equentis from "@/assets/investors/equentis.webp";
import unicorns from "@/assets/investors/100unicorns.webp";
import vinners from "@/assets/investors/vinners.webp";
import vcats from "@/assets/investors/vcats.webp";

export const ABOUT_HERO = {
  eyebrow: "About DocPharma",
  headline: "Built for Health. Built for Bharat.",
  lead: "Healthcare is changing.",
  body: [
    "People expect products to be available when they need them. Brands are reaching consumers faster than ever. But behind that convenience is a complex physical world of inventory, warehouses, people, technology, and the last mile that needs to work together seamlessly.",
    "That is what we are building at DocPharma.",
    "A connected network that brings health, wellness and healthcare products closer to the people who need them.",
  ],
  image: teamWarehouse,
};

/** The three values, as an auto-advancing slider. */
export const VALUES = {
  title: "Our Values",
  subtitle: "Built for Health. Built for Bharat.",
  slides: [
    {
      title: "We started with a simple belief.",
      image: valueAccess,
      description:
        "A product shouldn't take days to reach someone simply because the right inventory isn't close enough. We're building a smarter network where inventory sits closer to demand, technology connects every step, and people and processes move orders with speed and accountability. We bring together warehouses, doctors, partners, technology, operations teams, and our delivery fleet to help brands serve customers faster. Sometimes, that means reaching a doorstep in as little as 30 minutes.",
      bold: "We're building access.",
    },
    {
      title: "Everything connected. Every order traceable.",
      image: valueConnected,
      description:
        "At DocPharma, technology isn't layered onto operations. It is built into how we operate. Our technology connects inventory, order processing, picking, verification, packing, and delivery, giving teams visibility across the entire journey. Our people run the operations. Our technology connects them. Our fleet moves every order. Our network brings inventory closer. Together, they create a system where every order is trackable, every handoff is visible, and every step is accountable.",
      bold: "It is built into how we operate.",
    },
    {
      title: "Built closer to the customer.",
      image: valueCustomer,
      description:
        "Traditional fulfilment often means long distances, multiple handoffs, and limited visibility. We're changing that with a distributed network that puts inventory closer to demand and the people who need it. By bringing products closer to customers, we help health and wellness brands move beyond simply being available online to being",
      bold: "available when their customers need them.",
    },
  ],
};

export const MISSION = {
  label: "Our Mission",
  title: "Make healthcare more accessible, one order at a time.",
};

export const VISION = {
  label: "Our Vision",
  title: "A more connected, accessible healthcare ecosystem for India.",
};

export const LEADERSHIP = {
  title: "Leadership",
  subtitle: "People who understand the complexity of the supply chain.",
  members: [
    {
      name: "Shashank Rai",
      designation: "Co-Founder",
      image: shashankRai,
      preview:
        "Shashank Rai is the Co-Founder of DocPharma and an IIT (ISM) Dhanbad alumnus with an MBA from IIM Kolkata. With 14+ years in supply-chain, he began at Tata Steel managing 4 million tonnes of outbound traffic, then scaled complex logistics at Udaan, led rapid-commerce ops at Shadowfax, and most recently directed country-wide warehousing for Flipkart, Myntra and Flipkart Healthplus.",
      description:
        "Shashank Rai is the Co-Founder of DocPharma and an IIT (ISM) Dhanbad alumnus with an MBA from IIM Kolkata. With 14+ years in supply-chain, he began at Tata Steel managing 4 million tonnes of outbound traffic, then scaled complex logistics at Udaan, led rapid-commerce ops at Shadowfax, and most recently directed country-wide warehousing for Flipkart, Myntra and Flipkart Healthplus. At DocPharma he steers the technology stack powering the pharmacy-delivery network: compliant back-end, licensed dark-store ecosystem and proprietary ERP/supply-chain tools that serve 30+ health & wellness platforms across dozens of Indian cities, driving zero-error logistics and 4-minute order packing.",
    },
    {
      name: "Saquib Ali",
      designation: "Co-Founder",
      image: saquibAli,
      preview:
        "Saquib Ali is a seasoned technology entrepreneur with over 14 years of experience building and scaling high-growth businesses. Holding a B.Tech in Electronics & Communication Engineering, he co-founded DocPharma, leading its product vision and growth strategy. Prior to that, Saquib served in senior leadership roles at top Indian startups — leading product and category strategy for Udaan, driving business and P&L at Toppr, and helming strategy & growth at MediBuddy.",
      description:
        "Saquib Ali is a seasoned technology entrepreneur with over 14 years of experience building and scaling high-growth businesses. Holding a B.Tech in Electronics & Communication Engineering, he co-founded DocPharma, leading its product vision and growth strategy. Prior to that, Saquib served in senior leadership roles at top Indian startups — leading product and category strategy for Udaan, driving business and P&L at Toppr, and helming strategy & growth at MediBuddy. As a repeat founder, he blends data-driven decision making with a culture of rapid experimentation to turn early-stage ideas into fully monetised, market-impactful ventures, with a particular focus on leveraging technology to solve real-world problems in the health-tech space.",
    },
    {
      name: "Sagar Chauhan",
      designation: "Co-Founder",
      image: sagarChauhan,
      preview:
        "Co-Founder of DocPharma and an experienced technology leader with over 13 years of building and scaling high-growth platforms. An IIT (ISM Dhanbad) Computer Science graduate, he launched his career as a Software Engineer at Samsung before moving into leadership roles in the startup ecosystem. He has held Head of Engineering and CTO positions at several rapidly expanding fintech and enterprise tech companies, notably PayU, Pidge, and SaveIN Capital.",
      description:
        "Co-Founder of DocPharma and an experienced technology leader with over 13 years of building and scaling high-growth platforms. An IIT (ISM Dhanbad) Computer Science graduate, he launched his career as a Software Engineer at Samsung before moving into leadership roles in the startup ecosystem. He has held Head of Engineering and CTO positions at several rapidly expanding fintech and enterprise tech companies, notably PayU, Pidge, and SaveIN Capital, where he drove end-to-end product development and technology strategy, turning early-stage ideas into commercially successful, large-scale businesses. As Co-Founder of DocPharma, he continues to lead the company's product vision, strategy, and engineering excellence.",
    },
  ],
};

export const INVESTORS = {
  title: "Our Investors",
  logos: [
    { name: "Equentis", src: equentis },
    { name: "100Unicorns", src: unicorns },
    { name: "Vinners", src: vinners },
    { name: "VCATs", src: vcats },
  ],
};

export const JOIN_TEAM = {
  title: "Join Our Team",
  subtitle: "Build what's next in healthcare.",
  description:
    "We're building a team that believes healthcare can move faster, work smarter, and reach people when they need it most. Join us to build meaningful solutions, solve real problems, and shape the future of healthcare fulfilment.",
  buttonText: "View Positions",
  buttonUrl: "https://www.linkedin.com/company/docpharmaindia/jobs/",
  image: joinTeam,
  groupImage: teamGroup,
};
