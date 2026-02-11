import { Router } from "express";
import {
  createOrderHandler,
  captureOrderHandler,
  findOrderDetailsHandler,
  getPaylaterConfig,
  getPaylaterEdreamsConfig,
  getPaylaterHostedConfig,
  getCheckoutConfig,
  getRadioShowConfig
} from "../controllers/paypal.controller.js";

const router = Router();

router.get("/paylater", getPaylaterConfig);
router.get("/paylater/hc", getPaylaterHostedConfig);
router.get("/paylater/edreams", getPaylaterEdreamsConfig);
router.get("/checkout/config", getCheckoutConfig);
router.get("/radioshow", getRadioShowConfig);

router.post("/checkout/createOrder", createOrderHandler);
router.post("/checkout/createOrder/:type", createOrderHandler);
router.post("/checkout/captureOrder/:orderId", captureOrderHandler);
router.get("/checkout/findOrderDetails/:id", findOrderDetailsHandler);

export default router;

