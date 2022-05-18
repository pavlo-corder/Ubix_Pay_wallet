
import {auth} from './middlewares'
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
  {
    path: "/startscreen",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/StartScreen.vue") },
    ],
  },
  {
    path: "/startscreenperson",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/StartScreenPerson.vue") },
      { path: "/writename", component: () => import("pages/StartScreenAccounts.vue") },
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
      middlewares: [ auth ]
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/StartScreenAccounts.vue") },
    ],
  },
  {
    path: "/send",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Send.vue") },
      { path: "selected", component: () => import("pages/SendSelected.vue") },
      { path: "amount", component: () => import("pages/SendAmount.vue") },
      { path: "final", component: () => import("pages/SendFinal.vue") },
    ],
  },
  {
    path: "/addaddress",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AddAddress.vue") },
    ],
  },
  {
    path: "/setupperson",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/SetUpPerson.vue") },
    ],
  },
  {
    path: "/linkaccount",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/LinkAccount.vue") },
    ],
  },
  {
    path: "/shareaddress",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ShareAddress.vue") },
    ],
  },
  {
    path: "/receivecoins",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ReceiveCoins.vue") },
    ],
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
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/RequestPaymentLink.vue") },
    ],
  },
  {
    path: "/accountdetails",
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
