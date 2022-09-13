import { auth, account, lock, unlock, accountAndLock } from "./middlewares";
const routes = [
  {
    path: "/",
    meta: {
      middlewares: [accountAndLock],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/locked",
    name: "locked",
    meta: {
      middlewares: [unlock],
    },
    component: () => import("pages/Locked.vue"),
  },
  {
    path: "/import",
    meta: {
      middlewares: [lock],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Import.vue") }],
  },
  {
    path: "/createwalletstep1",
    meta: {
      middlewares: [account, lock],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CreateWalletStep1.vue") },
    ],
  },
  {
    path: "/createwalletstep2",
    meta: {
      middlewares: [account, lock],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CreateWalletStep2.vue") },
    ],
  },
  {
    path: "/createwalletstep3",
    meta: {
      middlewares: [account, lock],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CreateWalletStep3.vue") },
    ],
  },
  {
    path: "/startscreen",
    meta: {
      middlewares: [account, unlock],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/StartScreen.vue") }],
  },
  {
    path: "/startscreenperson",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/StartScreenPerson.vue") },
      {
        path: "/writename",
        component: () => import("pages/StartScreenAccounts.vue"),
      },
    ],
  },
  {
    path: "/createpersonality",

    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CreatePersonality.vue") },
    ],
  },
  {
    path: "/accounts",
    meta: {
      middlewares: [auth, lock],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "accounts",
        component: () => import("pages/StartScreenAccounts.vue"),
      },
    ],
  },
  {
    path: "/send",
    meta: {
      middlewares: [auth, lock],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "send", component: () => import("pages/Send.vue") },
      { path: "selected", component: () => import("pages/SendSelected.vue") },
      { path: "amount", component: () => import("pages/SendAmount.vue") },
      { path: "final", component: () => import("pages/SendFinal.vue") },
    ],
  },
  {
    path: "/addaddress",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/AddAddress.vue") }],
  },
  {
    path: "/setupperson",
    meta: {
      middlewares: [auth, lock],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "setupperson",
        component: () => import("pages/SetUpPerson.vue"),
      },
    ],
  },
  {
    path: "/linkaccount",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/LinkAccount.vue") }],
  },
  {
    path: "/shareaddress",
    meta: {
      middlewares: [auth, lock],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ShareAddress.vue") }],
  },
  {
    path: "/receivecoins",
    meta: {
      middlewares: [auth, lock],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ReceiveCoins.vue") }],
  },
  {
    path: "/requestpayment",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/RequestPayment.vue") },
    ],
  },
  {
    path: "/requestpaymentlink",
    meta: {
      middlewares: [auth, lock],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/RequestPaymentLink.vue") },
    ],
  },
  {
    path: "/accountdetails",
    meta: {
      middlewares: [auth, lock],
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AccountDetails.vue") },
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
