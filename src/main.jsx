import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import "@/styles/index.css";

// This site never uses a service worker. If a browser still holds one for
// this domain, it can answer page files with a cached HTML page (the
// "MIME type text/html" failure) — so remove it and its caches, then reload
// once onto the live site.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then(async (registrations) => {
      if (!registrations.length) return;
      await Promise.all(registrations.map((r) => r.unregister()));
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }
      try {
        if (sessionStorage.getItem("dp-sw-cleared")) return;
        sessionStorage.setItem("dp-sw-cleared", "1");
      } catch {
        return;
      }
      window.location.reload();
    })
    .catch(() => {});
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
