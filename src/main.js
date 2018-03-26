// Stylesheets & artsy stuff
import "vuetify/dist/vuetify.min.css";

// Other dependencies
// Firebase
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Initialise firebase
import firebaseConfig from "../firebaseConfig";
firebase.initializeApp(firebaseConfig);

import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

// Add user observer
firebase.auth().onAuthStateChanged(user => {
  store.commit("setUser", user);
  if (user) {
    store.dispatch("dispatchAllActions");
  }
});

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
