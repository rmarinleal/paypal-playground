import axios from "axios";
import { requestLogStore } from "../utils/requestLogStore.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8082/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const startTime = Date.now();
  config.metadata = { startTime };
  return config;
});

api.interceptors.response.use(
  (response) => {
    const duration = Date.now() - (response.config.metadata?.startTime || Date.now());
    requestLogStore.addEntry({
      id: crypto.randomUUID(),
      method: response.config.method?.toUpperCase() || "GET",
      url: response.config.url || "",
      status: response.status,
      duration,
      response: response.data
    });
    return response;
  },
  (error) => {
    const config = error.config || {};
    const duration = Date.now() - (config.metadata?.startTime || Date.now());
    requestLogStore.addEntry({
      id: crypto.randomUUID(),
      method: config.method?.toUpperCase() || "GET",
      url: config.url || "",
      status: error.response?.status || 0,
      duration,
      response: error.response?.data || error.message
    });
    return Promise.reject(error);
  }
);

export function getPaylaterConfig() {
  return api.get("/paylater").then((res) => res.data);
}

export function getPaylaterHostedConfig() {
  return api.get("/paylater/hc").then((res) => res.data);
}

export function getPaylaterEdreamsConfig() {
  return api.get("/paylater/edreams").then((res) => res.data);
}

export function getCheckoutConfig() {
  return api.get("/checkout/config").then((res) => res.data);
}

export function createOrder(payload) {
  return api.post("/checkout/createOrder", payload).then((res) => res.data);
}

export function captureOrder(orderId) {
  return api.post(`/checkout/captureOrder/${orderId}`).then((res) => res.data);
}

export function findOrderDetails(orderId) {
  return api.get(`/checkout/findOrderDetails/${orderId}`).then((res) => res.data);
}

export function getBraintreePaylaterConfig() {
  return api.get("/braintree/paylater").then((res) => res.data);
}

export function getBraintreePaymentConfig() {
  return api.get("/braintree/payment").then((res) => res.data);
}

export function getBraintreeVenmoConfig() {
  return api.get("/braintree/venmo").then((res) => res.data);
}

export function captureBraintreePayment(payload) {
  return api.post("/braintree/payment/capture", payload).then((res) => res.data);
}

export function findBraintreePayment(transactionId) {
  return api.get(`/braintree/payment/find/${transactionId}`).then((res) => res.data);
}

export function getAdyenSession() {
  return api.get("/adyen/session").then((res) => res.data);
}

export function getVaultConfig() {
  return api.get("/vault/config").then((res) => res.data);
}

export function createVaultSetupToken() {
  return api.post("/vault/createVaultSetupToken", {}).then((res) => res.data);
}

export function createVaultPaymentToken(setupToken) {
  return api.post(`/vault/createVaultPaymentToken/${setupToken}`, {}).then((res) => res.data);
}

export function getRadioShowConfig() {
  return api.get("/radioshow").then((res) => res.data);
}

