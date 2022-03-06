const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/import",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Import.vue") }],
  },
  {
    path: "/createwalletstep1",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CreateWalletStep1.vue") },
    ],
  },
  {
    path: "/createwalletstep2",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CreateWalletStep2.vue") },
    ],
  },
  {
    path: "/createwalletstep3",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CreateWalletStep3.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
