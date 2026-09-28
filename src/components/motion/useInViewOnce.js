import { useEffect, useState } from "react";

/**
 * True once the element has scrolled into view, and stays true.
 *
 * Content is never left hidden: without IntersectionObserver it shows at
 * once, and anything already scrolled past (an anchor jump, a restored scroll
 * position) shows immediately instead of waiting to be scrolled back to.
 */
export function useInViewOnce(ref, { margin = "0px 0px -12% 0px" } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined" || el.getBoundingClientRect().bottom < 0) {
      setInView(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) return;
        setInView(true);
        io.disconnect();
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);

  return inView;
}
