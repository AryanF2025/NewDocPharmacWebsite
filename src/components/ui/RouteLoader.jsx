import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { BrandLoader } from "./BrandLoader";

const MIN_MS = 700; // long enough for one heartbeat to read
const MAX_MS = 4000; // a slow image never traps the visitor here

/**
 * The loader between pages. On every page change it covers the screen and
 * stays until the new page is actually ready — its code arrived, the images
 * and video in the first screen loaded, fonts in — then fades away. While it
 * covers, the page's entrance animations are held (see `.is-route-loading` in
 * the stylesheet), so the headline plays as the loader lifts.
 *
 * It covers the first load and every refresh too: index.html paints the same
 * loader before any script arrives, and this takes over from it seamlessly.
 * Same-page anchor jumps don't count as a page change.
 */
export function RouteLoader() {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [phase, setPhase] = useState(() => {
    // Also up on the very first load, continuing index.html's loader.
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "hidden";
    document.documentElement.classList.add("is-route-loading");
    return "shown";
  }); // hidden | shown | leaving
  // The page a clicked link is heading to; the loader waits for that page,
  // not the old one still on screen while the new code downloads.
  const target = useRef(null);

  // Take over from index.html's boot loader: this one is now on screen.
  useEffect(() => {
    document.getElementById("boot-loader")?.remove();
  }, []);

  // Come up the moment an internal link to another page is clicked.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const a = event.target.closest?.("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      target.current = url.pathname;
      document.documentElement.classList.add("is-route-loading");
      setPhase("shown");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Cover before the new page paints, so the old one never flashes through.
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("shown");
    document.documentElement.classList.add("is-route-loading");
  }, [pathname]);

  useEffect(() => {
    if (phase !== "shown") return undefined;
    // Clicked, but the router hasn't switched pages yet: wait for it.
    if (target.current && target.current !== pathname) return undefined;
    target.current = null;
    let cancelled = false;
    const started = performance.now();

    const finish = () => {
      if (cancelled) return;
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      window.setTimeout(() => {
        if (cancelled) return;
        document.documentElement.classList.remove("is-route-loading");
        setPhase("leaving");
      }, wait);
    };

    const cap = window.setTimeout(finish, MAX_MS);
    waitForPage().then(() => {
      window.clearTimeout(cap);
      finish();
    });

    return () => {
      cancelled = true;
      window.clearTimeout(cap);
    };
  }, [phase, pathname]);

  // Unmount once the fade has finished.
  useEffect(() => {
    if (phase !== "leaving") return undefined;
    const id = window.setTimeout(() => setPhase("hidden"), 500);
    return () => window.clearTimeout(id);
  }, [phase]);

  // Safety: never leave animations held if this unmounts mid-load.
  useEffect(() => () => document.documentElement.classList.remove("is-route-loading"), []);

  if (phase === "hidden") return null;
  return (
    <div className={`route-loader fixed inset-0 z-[70] bg-floral ${phase === "leaving" ? "is-leaving" : ""}`}>
      <BrandLoader className="h-full !animate-none" />
    </div>
  );
}

const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));

/** Resolves when the new page's code has rendered and its first screen has loaded. */
async function waitForPage() {
  // 1. The page's own code: wait until <main> holds the page, not the
  //    code-loading placeholder.
  for (let i = 0; i < 600; i++) {
    const main = document.getElementById("main");
    if (main && main.childElementCount && !main.querySelector(":scope > .brand-loader")) break;
    await nextFrame();
  }
  await nextFrame();

  const main = document.getElementById("main");
  if (!main) return;
  const inFirstScreen = (el) => {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
  };

  // 2. Fonts.
  await (document.fonts?.ready ?? Promise.resolve());

  // 3. Images and video in the first screen, re-checked every 100ms so an
  //    element swapped in after the first look is still caught. A video
  //    counts as ready once its first frame or its poster is in — the poster
  //    is what shows until playback, so the screen already looks complete.
  //    Images marked loading="lazy" are deliberately deferred; not waited on.
  const posters = new Map();
  const posterReady = (video) => {
    const src = video.poster;
    if (!src) return false;
    if (!posters.has(src)) {
      const img = new Image();
      img.src = src;
      posters.set(src, img);
    }
    return posters.get(src).complete;
  };
  const firstScreenReady = () => {
    const images = [...main.querySelectorAll("img")].filter((img) => img.loading !== "lazy").filter(inFirstScreen);
    const videos = [...main.querySelectorAll("video")].filter(inFirstScreen);
    return images.every((img) => img.complete) && videos.every((v) => v.readyState >= 2 || posterReady(v));
  };
  while (!firstScreenReady()) {
    await new Promise((r) => setTimeout(r, 100));
  }
}
