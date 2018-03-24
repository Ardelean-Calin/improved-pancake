import Vue from "vue";
import Router from "vue-router";

import AppShell from "./components/AppShell.vue";

// Views
import HomePage from "./views/HomePage.vue";
import LoginPage from "./views/LoginPage.vue";
import SignupPage from "./views/SignupPage.vue";
import SubjectlistPage from "./views/SubjectlistPage.vue";
import SubjectPage from "./views/SubjectPage.vue";
import ReviewPage from "./views/ReviewPage.vue";
import SchedulePage from "./views/SchedulePage.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/login", component: LoginPage },
    { path: "/signup", component: SignupPage },
    {
      path: "/",
      component: AppShell,
      children: [
        { path: "", component: HomePage },
        {
          path: "subjects",
          component: SubjectlistPage
        },
        {
          path: "subjects/:id",
          component: SubjectPage
        },
        {
          path: "subjects/:id/:location/:itemID",
          component: ReviewPage
        },
        { path: "signup", component: SignupPage },
        {
          path: "schedule",
          component: SchedulePage
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
