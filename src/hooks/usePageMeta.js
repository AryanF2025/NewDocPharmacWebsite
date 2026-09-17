import { useEffect } from "react";

/**
 * Sets the document title and meta description per route. The site is a SPA,
 * so without this every page would inherit the index.html title.
 */
export function usePageMeta({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
