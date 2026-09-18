import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/experience/SiteHeader";
import { SiteFooter } from "@/components/experience/SiteFooter";
import { LogoMark } from "@/components/ui/Logo";
import Home from "@/pages/Home";

// Home ships in the main bundle; the rest split so first paint stays light.
const Solutions = lazy(() => import("@/pages/Solutions"));
const Technology = lazy(() => import("@/pages/Technology"));
const About = lazy(() => import("@/pages/About"));
const Partner = lazy(() => import("@/pages/Partner"));
const Resources = lazy(() => import("@/pages/Resources"));
const NotFound = lazy(() => import("@/pages/NotFound"));

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
        const target = document.getElementById(hash.slice(1));
        if (target) {
          // Gliding to an anchor is motion too — jump straight there if the
          // visitor has asked for less of it.
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
          return;
        }
        if (performance.now() < deadline) frame = requestAnimationFrame(find);
      };
      frame = requestAnimationFrame(find);
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname, hash]);

  return null;
}

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <LogoMark className="h-10 w-10 animate-soft-pulse" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export default function App() {

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <SiteFooter />
    </>
  );
}
