import runtime from "serviceworker-webpack-plugin/lib/runtime";
import registerEvents from "serviceworker-webpack-plugin/lib/browser/registerEvents";
import applyUpdate from "serviceworker-webpack-plugin/lib/browser/applyUpdate";

export default {
  init: () => {
    console.log("serviceworkerHandler.init");

    if (
      "serviceWorker" in navigator &&
      (window.location.protocol === "https:" ||
        window.location.hostname === "localhost")
    ) {
      runtime.options = { updateViaCache: "none" };

      const registration = runtime.register();

      registerEvents(registration, {
        onInstalled: () => {
          console.log("onInstalled");
        },
        onUpdateReady: () => {
          console.log("onUpdateReady");
        },
        onUpdating: () => {
          console.log("onUpdating");
        },
        onUpdateFailed: () => {
          console.log("onUpdateFailed");
        },
        onUpdated: () => {
          console.log("onUpdated");
        }
      });
    } else {
      console.log(`serviceWorker not available: ${window.location.hostname}`);
    }
  }
};
