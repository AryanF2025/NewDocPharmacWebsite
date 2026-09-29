import { Component, lazy } from "react";

const RELOAD_KEY = "dp-chunk-reload";

/**
 * `React.lazy` for a page, hardened against stale builds.
 *
 * After a deploy, a browser can still hold an old copy of a page file (or an
 * HTML page cached in its place), so the import fails. When that happens this
 * refetches the failed file and the HTML past the browser cache, then reloads
 * once to pick up the new build. A session flag stops it looping; if the
 * reload doesn't help, the error reaches <PageErrorBoundary> instead of
 * leaving a blank screen.
 */
export function lazyPage(load, pick) {
  return lazy(() =>
    load()
      .then((module) => {
        clearFlag();
        return pick ? { default: module[pick] } : module;
      })
      .catch(async (error) => {
        if (readFlag()) throw error;
        setFlag();
        const url = String(error?.message ?? "").match(/https?:\/\/\S+?\.js/)?.[0];
        await Promise.allSettled([
          url ? fetch(url, { cache: "reload" }) : null,
          fetch(window.location.pathname, { cache: "reload" }),
        ]);
        window.location.reload();
        // Keep the loader on screen while the page reloads.
        return new Promise(() => {});
      })
  );
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
