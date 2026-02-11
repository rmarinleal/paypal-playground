import { createVaultSetupToken, createVaultPaymentToken } from "../services/paypal.service.js";

export async function createVaultSetupTokenHandler(req, res) {
  try {
    const result = await createVaultSetupToken();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createVaultPaymentTokenHandler(req, res) {
  try {
    const setupToken = req.params.token;
    const result = await createVaultPaymentToken(setupToken);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

