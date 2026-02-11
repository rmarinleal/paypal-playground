import {
  createOrder,
  captureOrder,
  findOrderDetails,
  getPayPalConfig,
  getIdTokenValue
} from "../services/paypal.service.js";

function requireClientId(clientId, res) {
  if (!clientId) {
    res.status(500).json({ error: "PayPal client ID is missing" });
    return false;
  }
  return true;
}

export async function getPaylaterConfig(req, res) {
  const config = getPayPalConfig();
  const clientId = process.env.PAYPAL_PAYLATER_CLIENT_ID || config.clientId;
  if (!requireClientId(clientId, res)) {
    return;
  }
  res.json({
    clientId,
    currency: config.currency,
    locale: config.locale,
    buyerCountry: config.buyerCountry
  });
}

export async function getPaylaterHostedConfig(req, res) {
  const config = getPayPalConfig();
  const clientId = process.env.PAYPAL_PAYLATER_HOSTED_CLIENT_ID || config.clientId;
  if (!requireClientId(clientId, res)) {
    return;
  }
  res.json({
    clientId,
    currency: process.env.PAYPAL_PAYLATER_HOSTED_CURRENCY || "USD",
    locale: process.env.PAYPAL_PAYLATER_HOSTED_LOCALE || "en_US"
  });
}

export async function getPaylaterEdreamsConfig(req, res) {
  const config = getPayPalConfig();
  const clientId = process.env.PAYPAL_PAYLATER_EDREAMS_CLIENT_ID || config.clientId;
  if (!requireClientId(clientId, res)) {
    return;
  }
  res.json({
    clientId,
    currency: config.currency,
    locale: config.locale,
    buyerCountry: config.buyerCountry
  });
}

export async function getCheckoutConfig(req, res) {
  const config = getPayPalConfig();
  if (!requireClientId(config.clientId, res)) {
    return;
  }
  res.json({
    clientId: config.clientId,
    merchantId: config.merchantId,
    currency: config.currency
  });
}

export async function createOrderHandler(req, res) {
  try {
    const order = await createOrder(req.body || {});
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function captureOrderHandler(req, res) {
  try {
    const orderId = req.params.orderId;
    const result = await captureOrder(orderId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function findOrderDetailsHandler(req, res) {
  try {
    const orderId = req.params.id;
    const result = await findOrderDetails(orderId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getVaultConfig(req, res) {
  try {
    const config = getPayPalConfig();
    if (!requireClientId(config.clientId, res)) {
      return;
    }
    const idToken = await getIdTokenValue("");
    res.json({
      clientId: config.clientId,
      currency: config.currency,
      idToken
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getRadioShowConfig(req, res) {
  const config = getPayPalConfig();
  const clientId = process.env.PAYPAL_RADIOSHOW_CLIENT_ID || config.clientId;
  if (!requireClientId(clientId, res)) {
    return;
  }
  res.json({ clientId });
}

