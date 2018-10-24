// Stylesheets & artsy stuff
import "vuetify/dist/vuetify.min.css";

// Other dependencies
// Firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";

// Initialise firebase
import { firebaseConfig } from "../firebaseConfig";
firebase.initializeApp(firebaseConfig);

import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import updateAvailable from "./registerServiceWorker";

const messaging = firebase.messaging();
messaging.onMessage(function(payload) {
  // eslint-disable-next-line
  console.log("Message received. ", payload);
});

// Add user observer
firebase.auth().onAuthStateChanged(user => {
  store.commit("setUser", user);
  if (user) {
    store.dispatch("dispatchAllActions");
  }
});

updateAvailable.then(code => {
  if (code == "updated") {
    store.dispatch("showSnackbar", {
      text:
        "🎉🎈Update disponibil. Reîncărcați aplicația pentru a descărca ultima versiune.🎈🎉",
      timeout: 0
    });
  } else if (code == "offline") {
    store.dispatch("showSnackbar", {
      text: "Sunteți offline. Unele funcționalități nu vor merge.😟",
      timeout: 0
    });
  }
});

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
