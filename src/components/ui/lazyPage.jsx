import { Component, lazy } from "react";

const RELOAD_KEY = "dp-chunk-reload";

/** A page file that hasn't arrived in this long is treated as failed. */
const LOAD_TIMEOUT_MS = 15000;

/**
 * `React.lazy` for a page, hardened against bad cached files.
 *
 * A browser can hold a broken copy of a page file — or of any file that page
 * imports (an HTML page cached under a script's URL, say). When a page fails
 * to load, or takes too long, this re-downloads the page file and every file
 * it imports, overwriting whatever the browser had stored, then reloads once
 * (a failed script can't be retried within the same page view). A session
 * flag stops it looping; if that still doesn't help, <PageErrorBoundary>
 * shows a way out instead of a stuck loader.
 */
export function lazyPage(load, pick) {
  const choose = (module) => (pick ? { default: module[pick] } : module);

  return lazy(() =>
    withTimeout(load(), LOAD_TIMEOUT_MS)
      .then((module) => {
        clearFlag();
        return choose(module);
      })
      .catch(async (error) => {
        if (readFlag()) throw error;
        setFlag();

        const url = String(error?.message ?? "").match(/https?:\/\/\S+?\.js/)?.[0];
        await Promise.allSettled([
          url ? refreshModuleGraph(url) : refreshLoadedScripts(),
          fetch(window.location.pathname, { cache: "reload" }),
        ]);
        window.location.reload();
        // Keep the loader on screen while the page reloads.
        return new Promise(() => {});
      })
  );
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const id = window.setTimeout(() => reject(new Error("Page load timed out")), ms);
    promise.then(
      (value) => {
        window.clearTimeout(id);
        resolve(value);
      },
      (error) => {
        window.clearTimeout(id);
        reject(error);
      }
    );
  });
}

/**
 * Re-download a script and everything it imports, past the browser cache.
 * `cache: "reload"` replaces the stored copy, so the next load gets the real
 * file even where a broken one was cached "forever".
 */
async function refreshModuleGraph(start) {
  const seen = new Set();
  const queue = [start];
  while (queue.length && seen.size < 60) {
    const url = queue.shift();
    if (seen.has(url)) continue;
    seen.add(url);
    try {
      const res = await fetch(url, { cache: "reload" });
      const type = res.headers.get("content-type") ?? "";
      if (!type.includes("javascript")) continue;
      const text = await res.text();
      for (const match of text.matchAll(/["'](\.{1,2}\/[\w.-]+\.js)["']/g)) {
        queue.push(new URL(match[1], url).href);
      }
    } catch {
      // Keep going with the rest.
    }
  }
}

/** No URL in the error (e.g. a timeout): refresh every script this page has used. */
async function refreshLoadedScripts() {
  const urls = performance
    .getEntriesByType("resource")
    .map((entry) => entry.name)
    .filter((name) => name.startsWith(window.location.origin) && name.endsWith(".js"));
  await Promise.allSettled(urls.map((u) => refreshModuleGraph(u)));
}

function readFlag() {
  try {
    return sessionStorage.getItem(RELOAD_KEY) === "1";
  } catch {
    return false;
  }
}
function setFlag() {
  try {
    sessionStorage.setItem(RELOAD_KEY, "1");
  } catch {
    // Storage blocked: the reload still happens once per failure.
  }
}
function clearFlag() {
  try {
    sessionStorage.removeItem(RELOAD_KEY);
  } catch {
    // ignore
  }
}

/** Last resort: a page that still won't load gets a way out, not a blank screen. */
export class PageErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
        <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand-blue">Just a moment</p>
        <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-jet">This page needs a refresh.</h1>
        <p className="mt-3 max-w-md text-ink-soft">We&apos;ve just updated the site. Reload to get the latest version.</p>
        <button
          type="button"
          onClick={() => {
            clearFlag();
            window.location.reload();
          }}
          className="mt-8 rounded-full bg-brand-blue px-7 py-3.5 font-bold text-white transition-colors hover:bg-jet"
        >
          Reload page
        </button>
      </div>
    );
  }
}
