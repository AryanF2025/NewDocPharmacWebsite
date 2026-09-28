import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import "@/styles/index.css";

// After a new deploy, a tab still running the old build asks for page chunks
// that no longer exist. Reload once to pick up the new build instead of
// leaving a blank page; the flag stops a reload loop if the chunk is truly gone.
window.addEventListener("vite:preloadError", (event) => {
  const key = "dp-chunk-reload";
  let reloaded = false;
  try {
    reloaded = sessionStorage.getItem(key) === "1";
    sessionStorage.setItem(key, "1");
  } catch {
    // Storage blocked: still worth one reload attempt.
  }
  if (reloaded) return;
  event.preventDefault();
  window.location.reload();
});
// Once the page has run cleanly for a while, allow a future reload again.
window.setTimeout(() => {
  try {
    sessionStorage.removeItem("dp-chunk-reload");
  } catch {
    // ignore
  }
}, 15000);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
