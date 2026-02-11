import { createSession } from "../services/adyen.service.js";

export async function createAdyenSession(req, res) {
  try {
    const result = await createSession();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

