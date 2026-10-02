# SEO Implementation

How search, social and AI-answer visibility works on the DocPharma website, and how to keep it working.

Every fact used in metadata, structured data, the FAQ and `llms.txt` is taken from content already published on the site. Nothing here invents customers, statistics, certifications, reviews or locations. If a fact on the site changes, change it in `src/seo/config.js` too.

---

## 1. SEO architecture

The site is a Vite + React single-page app. Crawlers that don't run JavaScript would otherwise see one generic `<head>` for every URL, so SEO runs in two layers fed by a single config file:

| Layer | File | What it does |
| --- | --- | --- |
| Source of truth | `src/seo/config.js` | Site identity (name, legal name, domain, address, phone, social profiles), per-route title, description, schema type, sitemap priority, breadcrumbs, the FAQ, the services list and the JSON-LD builders. Plain JS so Node and the browser can both import it. |
| Head builder | `src/seo/head.js` | Turns a route into its head tags: title, description, robots, canonical, Open Graph, Twitter card and page JSON-LD. |
| Build step | `scripts/prerender-seo.mjs` | Runs after `vite build` (`npm run build`). Writes `dist/<route>.html` for every route with that route's head, plus `404.html`, `sitemap.xml` and `robots.txt`. |
| Runtime | `src/seo/usePageSeo.js` | Each page calls `usePageSeo("<key>")`. It keeps the live head in step when visitors move between pages in the app. |
| Hosting | `vercel.json` | `cleanUrls` serves `/about` from `about.html`, `trailingSlash: false` gives one URL per page, `/contact` redirects 301 to `/partner`, and any unknown path gets `404.html` with a real 404 status. |

`index.html` holds two markers the build replaces: `<!--seo:page-->…<!--/seo:page-->` (page tags) and `<!--seo:site-->` (site-wide Organization and WebSite JSON-LD). Don't remove them. The build fails loudly if they are missing.

**Adding a page:** add an entry to `ROUTES` in `src/seo/config.js`, call `usePageSeo("<key>")` in the page, and add the `<Route>` in `src/App.jsx`. The sitemap, static HTML and schema follow automatically.

**Canonical domain:** `SITE.url` is `https://docpharma.in`, the domain stated in the site's Terms. The current Vercel preview URL is different, so canonicals point away from it. That's intended once the domain is live; see §14.

## 2. Keyword strategy

The site sells B2B healthcare fulfilment, so the strategy targets the problems buyers search for, not consumer medicine-ordering terms DocPharma doesn't serve directly.

- **Core theme:** healthcare quick-commerce, 30-minute medicine delivery, healthcare supply chain in India.
- **Solution themes:** e-pharmacy fulfilment, D2C health and wellness fulfilment, corporate wellness fulfilment, medicine delivery for health insurers, fulfilment for doctors and hospitals.
- **Capability themes:** licensed darkstores, pharmacist-led prescription validation, drug-licensed and compliant fulfilment, hyperlocal last-mile delivery, inventory and order platform, Shopify/Unicommerce/EasyEcom integration.
- **Brand and entity:** DocPharma, Fledge Healthplus Private Limited, DocPharma One, founders, funding.

Keywords appear where they naturally describe the page. There is no stuffing, no hidden text and no doorway or city pages.

## 3. Page-to-keyword mapping

Each page owns one theme (`primary` in `ROUTES`), so pages don't compete with each other.

| URL | Primary theme | Schema type |
| --- | --- | --- |
| `/` | Healthcare quick-commerce, 30-minute medicine delivery | WebPage + FAQPage |
| `/solutions` | Healthcare fulfilment by business type | CollectionPage + ItemList of Service |
| `/technology` | Pharmacy fulfilment technology, DocPharma One | WebPage |
| `/about` | DocPharma company, founders, investors | AboutPage |
| `/partner` | Partner with or contact DocPharma | ContactPage |
| `/resources` | DocPharma news and press | CollectionPage |
| `/privacy`, `/terms` | Legal | WebPage |
| unknown URLs | — (noindex) | — |

## 4. Title strategy

- Unique per page, written as `Topic | DocPharma`, with the brand first only on the home page.
- Leads with what the searcher wants (for example "Healthcare Fulfilment Solutions for E-Pharmacies, D2C Brands & Insurers").
- Kept to roughly 50–80 characters. Longer titles truncate gracefully because the important words come first.
- The same text is used for `og:title` and `twitter:title`.

## 5. Meta description strategy

- Unique per page, about 140–200 characters, written as a plain-language summary of what the page offers, with a concrete fact (30 minutes, 12+ cities, reply within two working days) where the page states one.
- The same text is used for `og:description` and `twitter:description`.

## 6. Schema implementation

All JSON-LD is generated in `src/seo/config.js` and linked by `@id`:

- **Organization** (`https://docpharma.in/#organization`): name, legal name, logo, description, address (registered office, Lucknow), phone, email, a sales ContactPoint, area served (India) and `sameAs` links to LinkedIn and Instagram. It's on every page.
- **WebSite** (`/#website`): name, language and publisher. It's on every page.
- **WebPage / AboutPage / ContactPage / CollectionPage** per route, with `isPartOf`, `about` and `breadcrumb`.
- **BreadcrumbList** on every inner page (Home › Page). Breadcrumbs exist in schema only; the minimal design has no visible breadcrumb bar, and the pages are one level deep.
- **FAQPage** on the home page. It mirrors the visible FAQ word for word.
- **ItemList of Service** on `/solutions`, one entry per audience, with `provider` set to the organisation and `areaServed` set to the cities named on the site.

Deliberately not added: Review/AggregateRating (there are no published reviews), LocalBusiness opening hours (not published), and Product/Offer (no public pricing).

Validate with the [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/) after each deploy.

## 7. Internal linking strategy

- The header, mobile menu and footer link every indexable page.
- Home → Solutions ("Explore solutions"), and the FAQ intro links Solutions, Technology and Partner with descriptive anchor text.
- Solutions sections are deep-linkable (`/solutions#e-pharmacies` etc.) and are reached from the header dropdown.
- The header's "Partner with us" button (on every page) and the page CTAs lead to Partner, the conversion page.
- The old `/contact` path redirects to `/partner` so existing links keep their value.

## 8. Sitemap strategy

`dist/sitemap.xml` is generated on every build from `ROUTES`. It lists only indexable routes, with absolute `https://docpharma.in` URLs, `lastmod` set to the build date, and `changefreq` and `priority` from the config. The 404 page and redirects are excluded. Submit `https://docpharma.in/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## 9. Robots strategy

`dist/robots.txt` allows all crawlers, including AI crawlers, because the site is public marketing content, and points to the sitemap. Per-page control uses the `robots` meta tag: `index, follow, max-image-preview:large` on real pages and `noindex, follow` on the 404 page. To keep AI training crawlers out later, add rules such as `User-agent: GPTBot` / `Disallow: /` in `scripts/prerender-seo.mjs`. That's a business decision, not a technical one.

## 10. AI SEO / GEO strategy

Generative engines (ChatGPT, Perplexity, Gemini, Google AI Overviews) quote sources that state facts clearly and consistently.

- **Entity consistency:** one name, legal name, address, phone, email and set of social profiles, defined once in `SITE` and reused in schema, `llms.txt` and the FAQ.
- **Server-visible content:** each URL's static HTML carries its own title, description and JSON-LD, so AI crawlers that don't run JavaScript still get the right summary.
- **`/llms.txt`:** a short, factual summary of the company with links to every page, following the llms.txt convention.
- **Quotable answers:** FAQ answers are self-contained sentences that name DocPharma explicitly, so they make sense when quoted out of context.

## 11. AEO / FAQ strategy

The home page has a visible, accessible FAQ: native `<details>`/`<summary>` elements that work with the keyboard and without JavaScript, with each question as an `<h3>`. It answers the questions buyers ask: what DocPharma is, delivery speed, cities, who it's for, prescription checks and compliance, integrations, and how to start. The same text feeds the FAQPage schema, so markup and visible content never drift apart. Add new questions to `FAQ` in `src/seo/config.js`; both update together.

Google currently shows FAQ rich results only for a small set of authoritative government and health sites, so the value here is answer-engine extraction and on-page clarity, not a guaranteed rich snippet.

## 12. Performance recommendations

Already in place: route-level code splitting, hashed immutable assets, WebP images with `loading="lazy"` below the fold, a poster image for the hero video, an inline boot loader, a Google Fonts request trimmed to the weights in use (400–800, no italics), and `display=swap`.

Next steps:
- Self-host Open Sans (woff2, `font-display: swap`, preload the 700 weight) to remove the third-party font round-trip.
- Add `width`/`height` attributes to the remaining large images to reduce layout shift.
- Watch Core Web Vitals in Search Console once there is enough field data. The hero video and `motion` bundle are the main LCP/INP costs.
- Consider full pre-rendering of page body content (for example `vite-react-ssg`) if Search Console shows inner pages indexed without their body text.

## 13. Content recommendations

- Give each Solutions audience enough copy to rank on its own, and only split it into its own URL if there is real unique content (process, SLAs, compliance specifics) to avoid thin pages.
- Add real, attributable proof when available: named case studies with client permission, and published metrics with their source and date.
- Keep the Resources page current. Each new press piece is a fresh, linkable entity signal.
- Use descriptive alt text for any new image (what it shows, not keywords).

## 14. Remaining manual tasks

These can't be done in code:

1. **Confirm and connect the production domain** `docpharma.in` in Vercel (or change `SITE.url` if production lives elsewhere). Until then, canonicals and the sitemap point to a domain that doesn't serve this build.
2. **Google Search Console:** verify the domain, submit the sitemap and request indexing of the main pages.
3. **Bing Webmaster Tools:** import from Search Console and submit the sitemap. Bing also feeds several AI assistants.
4. **Google Business Profile** for the registered office, if the business wants local visibility. Use exactly the NAP (name, address, phone) in `SITE`.
5. **Keep social profiles consistent:** the LinkedIn and Instagram bios should use the same name and description.
6. **Validate after deploy:** run the Rich Results Test and the Schema Markup Validator, and check link previews with the LinkedIn Post Inspector and the Facebook Sharing Debugger.
7. **Check the 404 status on Vercel:** `curl -I https://docpharma.in/does-not-exist` should return `404`. The local preview server always returns 200.
8. **Analytics:** add a privacy-compliant analytics tool if wanted, and update the Privacy Policy to match.

## 15. Recommended future content

Only publish these where DocPharma has real material:

- Case studies per audience (e-pharmacy, D2C brand, insurer) with permission.
- Guides that answer buyer questions: how prescription validation works at DocPharma, what a darkstore is and how it differs from a warehouse, and how to integrate Shopify with 30-minute delivery.
- A careers page with real openings (JobPosting schema).
- A city coverage page only if each city has genuinely different information (darkstore count, SLA). Otherwise keep coverage on the home page.

## 16. SEO checklist

Run this before each release:

- [ ] `npm run build` passes and prints `prerender-seo: …`
- [ ] Every route in `ROUTES` has a unique title and description
- [ ] `dist/<route>.html` shows the right `<title>`, canonical and JSON-LD
- [ ] JSON-LD parses, and Rich Results Test shows no errors
- [ ] `dist/sitemap.xml` lists only indexable URLs on the production domain
- [ ] `dist/robots.txt` points at the sitemap
- [ ] Each page has exactly one `<h1>`
- [ ] New images have meaningful `alt` text, or `alt=""` if decorative
- [ ] Unknown URLs return 404 in production, and `/contact` returns 301 to `/partner`
- [ ] The visible FAQ and the FAQPage schema match (both come from `FAQ`)
- [ ] Facts in `SITE`, `FAQ` and `public/llms.txt` still match the site
