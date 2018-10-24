/* eslint-disable no-console */
/* eslint-env node */

import { register } from "register-service-worker";

const updateAvailable = new Promise((resolve, reject) => {
  if (process.env.NODE_ENV === "production") {
    register(`${process.env.BASE_URL}service-worker.js`, {
      ready() {
        console.log(
          "App is being served from cache by a service worker.\n" +
            "For more details, visit https://goo.gl/AFskqB"
        );
        resolve("ready");
      },
      cached() {
        console.log("Content has been cached for offline use.");
        resolve("cached");
      },
      updated() {
        console.log("New content is available; please refresh.");
        resolve("updated");
      },
      offline() {
        console.log(
          "No internet connection found. App is running in offline mode."
        );
        resolve("offline");
      },
      error(error) {
        console.error("Error during service worker registration:", error);
        resolve("error");
      }
    });
  } else {
    resolve("cached");
  }
});

export default updateAvailable;
