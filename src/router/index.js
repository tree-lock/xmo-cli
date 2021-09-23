import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("@/pages/Home.vue") },
  { path: "/about", component: () => import("@/pages/About.vue") },
  { path: "/login", component: () => import("@/pages/Login.vue") },
  {
    path: "/404",
    component: () => import("@/pages/NotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
