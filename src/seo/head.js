import { SITE, abs, pageGraph } from "./config.js";

/**
 * The page-specific <head> tags for a route, as data. Used twice: by the
 * build script to write each route's static HTML (what crawlers and social
 * previews read without running JavaScript), and by usePageSeo to keep the
 * live document in step as visitors move between pages.
 */
export function headTags(route) {
  const url = abs(route.path);
  const index = route.index !== false;
  const image = abs(SITE.ogImage);
  return {
    title: route.title,
    meta: [
      ["name", "description", route.description],
      ["name", "robots", index ? "index, follow, max-image-preview:large" : "noindex, follow"],
      ["property", "og:type", "website"],
      ["property", "og:site_name", SITE.name],
      ["property", "og:locale", SITE.locale],
      ["property", "og:title", route.title],
      ["property", "og:description", route.description],
      ["property", "og:url", url],
      ["property", "og:image", image],
      ["property", "og:image:width", "1200"],
      ["property", "og:image:height", "630"],
      ["property", "og:image:alt", SITE.ogImageAlt],
      ["name", "twitter:card", "summary_large_image"],
      ["name", "twitter:title", route.title],
      ["name", "twitter:description", route.description],
      ["name", "twitter:image", image],
      ["name", "twitter:image:alt", SITE.ogImageAlt],
    ],
    canonical: index ? url : null,
    jsonLd: index ? pageGraph(route) : null,
  };
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

/** The same tags as an HTML string, for the build script. */
export function headHtml(route) {
  const t = headTags(route);
  const lines = [
    `<title>${esc(t.title)}</title>`,
    ...t.meta.map(([attr, key, value]) => `<meta ${attr}="${key}" content="${esc(value)}" data-seo />`),
    t.canonical ? `<link rel="canonical" href="${t.canonical}" data-seo />` : "",
    t.jsonLd ? `<script type="application/ld+json" id="page-ld">${JSON.stringify(t.jsonLd).replace(/</g, "\\u003c")}</script>` : "",
  ];
  return lines.filter(Boolean).join("\n    ");
}
