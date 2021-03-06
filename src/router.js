import Vue from "vue";
import Router from "vue-router";

import store from "./store";

import AppShell from "./components/AppShell.vue";

// Views
import FeedbackPage from "./views/FeedbackPage.vue";
import HomePage from "./views/HomePage.vue";
import LoginPage from "./views/LoginPage.vue";
import ReviewPage from "./views/ReviewPage.vue";
import SchedulePage from "./views/SchedulePage.vue";
import SignupPage from "./views/SignupPage.vue";
import SubjectlistPage from "./views/SubjectlistPage.vue";
import SubjectPage from "./views/SubjectPage.vue";

Vue.use(Router);

// Navigation guard which only allows signed-in users
// to go to certain routes. Else redirects them to /login
const isSignedIn = (to, from, next) => {
  if (store.state.user) next();
  else next("/login");
};

// Navigation guard which does not allow signed-in users
// to go to some routes.
const isSignedout = (to, from, next) => {
  if (!store.state.user) next();
  else next(false);
};

export default new Router({
  routes: [
    { path: "/login", component: LoginPage, beforeEnter: isSignedout },
    { path: "/signup", component: SignupPage, beforeEnter: isSignedout },
    {
      path: "/",
      component: AppShell,
      children: [
        { path: "", component: HomePage },
        {
          path: "subjects",
          component: SubjectlistPage,
          beforeEnter: isSignedIn
        },
        {
          path: "subjects/:id",
          component: SubjectPage,
          beforeEnter: isSignedIn
        },
        {
          path: "subjects/:id/:itemID",
          component: ReviewPage,
          beforeEnter: isSignedIn
        },
        { path: "signup", component: SignupPage, beforeEnter: isSignedIn },
        {
          path: "schedule",
          component: SchedulePage,
          beforeEnter: isSignedIn
        },
        { path: "feedback", component: FeedbackPage, beforeEnter: isSignedIn }
      ]
    }
  ],
  scrollBehavior({ savedPosition }) {
    return new Promise((resolve, reject) => {
      if (savedPosition) {
        setTimeout(() => {
          resolve(savedPosition);
        }, 200);
      } else {
        setTimeout(() => {
          resolve({ x: 0, y: 0 });
        }, 200);
      }
    });
  }
});
