import { Router } from "express";
import { getVaultConfig } from "../controllers/paypal.controller.js";
import {
  createVaultSetupTokenHandler,
  createVaultPaymentTokenHandler
} from "../controllers/vault.controller.js";

const router = Router();

router.get("/vault/config", getVaultConfig);
router.post("/vault/createVaultSetupToken", createVaultSetupTokenHandler);
router.post("/vault/createVaultPaymentToken/:token", createVaultPaymentTokenHandler);

export default router;

