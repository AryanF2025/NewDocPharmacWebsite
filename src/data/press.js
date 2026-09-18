/**
 * Press coverage — real articles, taken from the live DocPharma site.
 * Newest first; headline, outlet and date are each article's own.
 */

import economicTimes from "@/assets/media/economic-times.webp";
import startupStory from "@/assets/media/startup-story.webp";
import indianStartupNews from "@/assets/media/indian-startup-news.webp";
import startupory from "@/assets/media/startupory.webp";
import tal64 from "@/assets/media/tal64.webp";

export const PRESS_HERO = {
  eyebrow: "Resources",
  headline: "In the media.",
  sub: "Coverage of the network we're building — the funding, the 30-minute promise, and the case for treating healthcare logistics differently.",
};

export const PRESS = [
  {
    id: "et-retail-seed-round",
    image: economicTimes,
    publication: "The Economic Times Retail",
    headline: "DocPharma raises $2 million to expand healthcare quick-commerce network to 50 cities",
    date: "1 September 2026",
    topic: "Funding",
    href: "https://retail.economictimes.indiatimes.com/news/health-and-beauty/docpharma-raises-2-million-to-expand-healthcare-quick-commerce-network-to-50-cities/133675019",
  },
  {
    id: "startup-story-30-minute-network",
    image: startupStory,
    publication: "Startup Story",
    headline: "DocPharma launches India's fastest 30-minute healthcare delivery network for D2C wellness brands",
    date: "19 November 2025",
    topic: "Network",
    href: "https://startupstorymedia.com/docpharma-launches-indias-fastest-30-minute-healthcare-delivery-network-for-d2c-wellness-brands-across-delhi-mumbai-and-bangalore",
  },
  {
    id: "indian-startup-news-as-fast-as-groceries",
    image: indianStartupNews,
    publication: "Indian Startup News",
    headline: "Can Medicines Reach You as Fast as Groceries? DocPharma Says Yes.",
    date: "21 July 2025",
    topic: "Network",
    href: "https://indianstartupnews.com/stories/can-medicines-reach-you-as-fast-as-groceries-docpharma-says-yes-9520172",
  },
  {
    id: "startupory-as-fast-as-groceries",
    image: startupory,
    publication: "Startupory",
    headline: "Can Medicines Reach You as Fast as Groceries? DocPharma Says Yes",
    date: "21 July 2025",
    topic: "Network",
    href: "https://startupory.com/article/docpharma-30-minute-medicine-delivery",
  },
  {
    id: "tal64-founder-interview",
    image: tal64,
    publication: "tal64",
    headline: "From 7-Day Waits to 60-Minute Delivery: The DocPharma Interview",
    date: "5 April 2025",
    topic: "Interview",
    href: "https://www.tal64.com/p/the-docpharma-interview",
  },
];

export const PRESS_TOPICS = ["All", ...Array.from(new Set(PRESS.map((item) => item.topic)))];
