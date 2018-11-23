/* eslint-disable no-console */
const DEBUG = true;

// When the user navigates to your site,
// the browser tries to redownload the script file that defined the service
// worker in the background.
// If there is even a byte's difference in the service worker file compared
// to what it currently has, it considers it 'new'.
const { assets } = global.serviceWorkerOption;

const CACHE_NAME = new Date().toISOString();

const JEKYLL_ASSETS = [
  "/assets/images/bday_tart.jpg",
  "/assets/images/bento.jpg",
  "/assets/images/danishes.jpg",
  "/assets/images/favicon.ico",
  "/assets/images/hanare_foodtruck_shelf.jpg",
  "/assets/images/hanare_magazine.jpg",
  "/assets/images/hanare_owners.jpg",
  "/assets/images/katsuo.jpg",
  "/assets/images/logo-192.png",
  "/assets/images/logo-512.png",
  "/assets/images/mekabu_loaf.jpg",
  "/assets/images/oyster_gratin.jpg ",
  "/assets/images/pastry_assortment.jpg",
  "/assets/images/sugar_butter.jpg",
  "/assets/images/thumbnail.jpg",
  "/assets/images/wakame_shio.jpg"
];

const assetsToCache = [...JEKYLL_ASSETS, ...assets, "./"].map(path => {
  return new URL(path, global.location).toString();
});

// When the service worker is first added to a computer.
const onInstall = event => {
  // Perform install steps.
  if (DEBUG) {
    console.log("[SW] Install event");
  }

  // Add core website files to cache during serviceworker installation.
  event.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(assetsToCache);
      })
      .then(() => {
        if (DEBUG) {
          console.log("Cached assets: main", assetsToCache);
        }
      })
      .catch(error => {
        console.error(error);
        throw error;
      })
  );
};

// After the install event.
const onActivate = event => {
  if (DEBUG) {
    console.log("[SW] Activate event");
  }

  // Clean the caches
  event.waitUntil(
    global.caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete the caches that are not the current one.
          if (cacheName.indexOf(CACHE_NAME) === 0) {
            return null;
          }

          return global.caches.delete(cacheName);
        })
      );
    })
  );
};

const onMessage = event => {
  switch (event.data.action) {
    case "skipWaiting":
      if (self.skipWaiting) {
        self.skipWaiting();
        self.clients.claim();
      }
      break;
    default:
      break;
  }
};

const onFetch = event => {
  const request = event.request;

  // Ignore not GET request.
  if (request.method !== "GET") {
    if (DEBUG) {
      console.log(`[SW] Ignore non GET request ${request.method}`);
    }
    return;
  }

  const requestUrl = new URL(request.url);

  // Ignore difference origin.
  const stripWww = url => url.replace(/\/\/www./, "//");
  if (stripWww(requestUrl.origin) !== stripWww(location.origin)) {
    if (DEBUG) {
      console.log(
        `[SW] Ignore difference origin: '${requestUrl.origin}', '${
          location.origin
        }'`
      );
    }
    return;
  }

  const resource = global.caches.match(request).then(response => {
    if (response) {
      if (DEBUG) {
        console.log(`[SW] fetch URL ${requestUrl.href} from cache`);
      }

      return response;
    }

    // Load and cache known assets.
    return fetch(request)
      .then(responseNetwork => {
        // let's say 304 is good
        if (!responseNetwork || responseNetwork.status > 399) {
          if (DEBUG) {
            console.log(
              `[SW] URL [${requestUrl.toString()}] wrong responseNetwork: ${
                responseNetwork.status
              } ${responseNetwork.type}`
            );
          }

          return responseNetwork;
        }

        if (DEBUG) {
          console.log(`[SW] URL ${requestUrl.href} fetched`);
        }

        const responseCache = responseNetwork.clone();

        global.caches
          .open(CACHE_NAME)
          .then(cache => {
            return cache.put(request, responseCache);
          })
          .then(() => {
            if (DEBUG) {
              console.log(`[SW] Cache asset: ${requestUrl.href}`);
            }
          });

        return responseNetwork;
      })
      .catch(() => {
        // User is landing on our page.
        if (event.request.mode === "navigate") {
          return global.caches.match("./");
        }

        return null;
      });
  });

  event.respondWith(resource);
};

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("message", onMessage);
self.addEventListener("fetch", onFetch);
