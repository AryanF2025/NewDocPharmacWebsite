/*
 * DocPharma does not use a service worker. This file exists only to retire
 * any worker a browser may still hold for this domain: when that worker checks
 * for an update it receives this script, which clears its caches, unregisters
 * itself and reloads open tabs onto the live site.
 */
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const tabs = await self.clients.matchAll({ type: "window" });
      tabs.forEach((tab) => tab.navigate(tab.url));
    })()
  );
});
