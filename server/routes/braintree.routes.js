import { Router } from "express";
import {
  capturePaymentHandler,
  findPaymentHandler,
  getBraintreePaylaterConfig,
  getBraintreePaymentConfig,
  getBraintreeVenmoConfig
} from "../controllers/braintree.controller.js";

const router = Router();

router.get("/braintree/paylater", getBraintreePaylaterConfig);
router.get("/braintree/payment", getBraintreePaymentConfig);
router.get("/braintree/venmo", getBraintreeVenmoConfig);

router.post("/braintree/payment/capture", capturePaymentHandler);
router.get("/braintree/payment/find/:id", findPaymentHandler);

export default router;

