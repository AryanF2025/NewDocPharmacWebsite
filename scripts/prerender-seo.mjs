/**
 * Post-build SEO step. Runs after `vite build` and turns the single-page
 * dist/index.html into one HTML file per route, each carrying that route's own
 * title, description, canonical, Open Graph, Twitter and JSON-LD, so crawlers
 * and link previews see the right page without running JavaScript.
 *
 * Also writes 404.html (noindex), sitemap.xml and robots.txt, all from
 * src/seo/config.js.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, SITE, abs, siteGraph } from "../src/seo/config.js";
import { headHtml } from "../src/seo/head.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const template = await readFile(join(dist, "index.html"), "utf8");

const PAGE = /<!--seo:page-->[\s\S]*?<!--\/seo:page-->/;
const SITE_LD = "<!--seo:site-->";
if (!PAGE.test(template) || !template.includes(SITE_LD)) {
  throw new Error("prerender-seo: SEO markers missing from dist/index.html");
}

const siteLd = `<script type="application/ld+json" id="site-ld">${JSON.stringify(siteGraph()).replace(/</g, "\\u003c")}</script>`;
const render = (route) => template.replace(PAGE, headHtml(route)).replace(SITE_LD, siteLd);

const written = [];
for (const route of ROUTES) {
  // "/" -> index.html, "/about" -> about.html (served at /about via cleanUrls), "/404" -> 404.html
  const file = route.path === "/" ? "index.html" : `${route.path.slice(1)}.html`;
  const out = join(dist, file);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, render(route));
  written.push(file);
}

const today = new Date().toISOString().slice(0, 10);
const indexable = ROUTES.filter((r) => r.index !== false);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (r) => `  <url>
    <loc>${abs(r.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), sitemap);

const robots = `# ${SITE.name}: ${SITE.url}
User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`;
await writeFile(join(dist, "robots.txt"), robots);

console.log(`prerender-seo: ${written.join(", ")}, sitemap.xml (${indexable.length} URLs), robots.txt`);
