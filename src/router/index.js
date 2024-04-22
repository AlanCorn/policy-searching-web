import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "indexView",
      component: IndexView,
      redirect: "/homePage",
      children: [
        {
          path: "/login",
          name: "loginView",
          component: () => import("../views/Login/LoginView.vue"),
        },
        {
          path: "/register",
          name: "LoginInformation",
          component: () => import("../views/Login/LoginInformation.vue"),
        },
        {
          path: "/homePage",
          name: "homePage",
          component: () => import("../views/HomePage/HomePage.vue"),
        },
        {
          path: "/personalCenter",
          name: "personalCenter",
          component: () => import("../views/PersonalCenter/PersonalCenter.vue"),
        },
        {
          path: "/policy",
          name: "policyView",
          component: () => import("../views/Policy/PolicyView.vue"),
        },
        {
          path: "/search",
          name: "policySearch",
          component: () => import("../views/PolicySearch/PolicySearchView.vue"),
        },
        {
          path: "/dataManage",
          name: "dataManage",
          component: () => import("../views/DataManage/DataManage.vue"),
        },
      ],
    },
  ],
});

export default router;
