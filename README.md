# DocPharma website

India's first healthcare quick-commerce supply chain — marketing site.

Built with React 19, Vite 6, Tailwind CSS 4 and Motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
```

Requires Node.js 20 or newer.

## Environment variables

| Variable | Used for | Where |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Partner / contact form API (`POST /send-mail/`) | `.env` (committed, public) |

`VITE_` variables are inlined into the browser bundle, so never put a secret in one.
Secrets for local tooling go in `.env.local`, which is git-ignored.

## Deploy on Vercel

1. Import the GitHub repository in Vercel.
2. Framework preset: **Vite** (Vercel detects it). Build command `npm run build`, output directory `dist`.
3. Under **Settings → Environment Variables**, set `VITE_API_BASE_URL` for each environment
   (Preview can use `https://partner-api.dev.docpharma.in`; set the production API for Production).
4. Deploy. `vercel.json` rewrites every route to `index.html`, so deep links such as
   `/solutions` work, and long-caches the hashed files under `/assets`.

## Project layout

```
src/
  pages/            Home is complete; other routes are placeholders
  components/
    experience/     header, footer, hero video, news ticker, how-it-works
    art/            India coverage map
    directions/     shared console mock + timer helpers
    ui/             logo, logo marquee, logo sizing
  data/             copy, logos, India map geometry (Survey of India boundary)
  assets/           video, stills from the video, partner logos
```

The India map is generated from the official Survey of India boundary
(datameet/maps, `Country/india-soi.geojson`, CC-0).
