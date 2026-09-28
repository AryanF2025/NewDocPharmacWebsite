import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/experience/SiteHeader";
import { SiteFooter } from "@/components/experience/SiteFooter";
import { BrandLoader } from "@/components/ui/BrandLoader";
import { scrollToTarget } from "@/components/motion/smoothScroll";
import Home from "@/pages/Home";

// Home ships in the main bundle; the rest split so first paint stays light.
const PAGES = {
  solutions: () => import("@/pages/Solutions"),
  technology: () => import("@/pages/Technology"),
  about: () => import("@/pages/About"),
  partner: () => import("@/pages/Partner"),
  resources: () => import("@/pages/Resources"),
  legal: () => import("@/pages/Legal"),
  notFound: () => import("@/pages/NotFound"),
};
const Solutions = lazy(PAGES.solutions);
const Technology = lazy(PAGES.technology);
const About = lazy(PAGES.about);
const Partner = lazy(PAGES.partner);
const Resources = lazy(PAGES.resources);
const NotFound = lazy(PAGES.notFound);
const PrivacyPolicy = lazy(() => PAGES.legal().then((m) => ({ default: m.PrivacyPolicy })));
const TermsOfUse = lazy(() => PAGES.legal().then((m) => ({ default: m.TermsOfUse })));

/**
 * Once the first page is up and the browser is idle, fetch the other pages in
 * the background, so moving around the site rarely has to wait on the loader.
 * Skipped on data-saver connections.
 */
function usePrefetchPages() {
  useEffect(() => {
    if (navigator.connection?.saveData) return undefined;
    const idle = window.requestIdleCallback ?? ((fn) => window.setTimeout(fn, 1500));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => Object.values(PAGES).forEach((load) => load().catch(() => {})), { timeout: 4000 });
    return () => cancel(id);
  }, []);
}

/**
 * Restores the top of the page between routes, but honours in-page anchors so
 * the footer's `/solutions#d2c-health` links land on the right tab.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Pages are code-split, so the target may not exist on the first frame —
      // keep looking briefly rather than silently doing nothing.
      let frame;
      const deadline = performance.now() + 2500;
      const find = () => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
          scrollToTarget(target);
          return;
        }
        if (performance.now() < deadline) frame = requestAnimationFrame(find);
      };
      frame = requestAnimationFrame(find);
      return () => cancelAnimationFrame(frame);
    }
    scrollToTarget(0, { immediate: true });
  }, [pathname, hash]);

  return null;
}

/** Same-page `#anchor` links glide through the smooth scroller. */
function useAnchorScroll() {
  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const a = event.target.closest?.('a[href^="#"]');
      // The skip link has to move keyboard focus, so it keeps its native jump.
      if (!a || a.getAttribute("href") === "#main") return;
      const target = document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1)));
      if (!target) return;
      event.preventDefault();
      scrollToTarget(target);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

function RouteFallback() {
  return <BrandLoader />;
}

export default function App() {
  useAnchorScroll();
  usePrefetchPages();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-blue focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <ScrollManager />
      <SiteHeader />

      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/about" element={<About />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/contact" element={<Partner />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <SiteFooter />
    </>
  );
}
