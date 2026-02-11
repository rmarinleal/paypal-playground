import { createRouter, createWebHistory } from "vue-router";
import PayLaterView from "../views/PayLaterView.vue";
import PayLaterHostedContentView from "../views/PayLaterHostedContentView.vue";
import PayLaterEdreamsView from "../views/PayLaterEdreamsView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import BraintreePayLaterView from "../views/BraintreePayLaterView.vue";
import BraintreePaymentView from "../views/BraintreePaymentView.vue";
import BraintreeVenmoView from "../views/BraintreeVenmoView.vue";
import BraintreeAppSwitchView from "../views/BraintreeAppSwitchView.vue";
import AdyenView from "../views/AdyenView.vue";
import VaultView from "../views/VaultView.vue";
import RadioShowView from "../views/RadioShowView.vue";

const routes = [
  { path: "/", redirect: "/paylater" },
  { path: "/paylater", component: PayLaterView, meta: { codeKey: "paylater" } },
  { path: "/paylater-hc", component: PayLaterHostedContentView, meta: { codeKey: "paylaterHosted" } },
  { path: "/paylater-edreams", component: PayLaterEdreamsView, meta: { codeKey: "paylaterEdreams" } },
  { path: "/checkout", component: CheckoutView, meta: { codeKey: "checkout" } },
  { path: "/braintree/paylater", component: BraintreePayLaterView, meta: { codeKey: "braintreePaylater" } },
  { path: "/braintree/payment", component: BraintreePaymentView, meta: { codeKey: "braintreePayment" } },
  { path: "/braintree/venmo", component: BraintreeVenmoView, meta: { codeKey: "braintreeVenmo" } },
  { path: "/braintree/appswitch", component: BraintreeAppSwitchView, meta: { codeKey: "braintreeAppSwitch" } },
  { path: "/adyen", component: AdyenView, meta: { codeKey: "adyen" } },
  { path: "/vault", component: VaultView, meta: { codeKey: "vault" } },
  { path: "/radioshow", component: RadioShowView, meta: { codeKey: "radioshow" } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

