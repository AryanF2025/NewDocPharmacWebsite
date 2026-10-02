import { useEffect } from "react";
import { routeByKey } from "./config.js";
import { headTags } from "./head.js";

/**
 * Keeps the document head in step with the current page: title, description,
 * robots, canonical, Open Graph, Twitter and the page's JSON-LD. The first
 * load already has these from the pre-rendered HTML; this updates them when
 * visitors move between pages in the app.
 */
export function usePageSeo(key) {
  useEffect(() => {
    const route = routeByKey(key);
    if (!route) return;
    const t = headTags(route);

    document.title = t.title;
    for (const [attr, name, value] of t.meta) {
      let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", value);
    }

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (t.canonical) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = t.canonical;
    } else {
      canonical?.remove();
    }

    let ld = document.getElementById("page-ld");
    if (t.jsonLd) {
      if (!ld) {
        ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.id = "page-ld";
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(t.jsonLd);
    } else {
      ld?.remove();
    }
  }, [key]);
}
