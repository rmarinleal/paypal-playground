import { Router } from "express";
import { createAdyenSession } from "../controllers/adyen.controller.js";

const router = Router();

router.get("/adyen/session", createAdyenSession);

export default router;

