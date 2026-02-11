import { capturePayment, findPayment, getBraintreeConfig } from "../services/braintree.service.js";

export async function getBraintreePaylaterConfig(req, res) {
  res.json(getBraintreeConfig("ES"));
}

export async function getBraintreePaymentConfig(req, res) {
  res.json(getBraintreeConfig("ES"));
}

export async function getBraintreeVenmoConfig(req, res) {
  res.json(getBraintreeConfig("US"));
}

export async function capturePaymentHandler(req, res) {
  try {
    const { amount, paymentMethodNonce } = req.body;
    const result = await capturePayment(amount, paymentMethodNonce);

    if (!result.success) {
      res.status(400).json({ error: result.message });
      return;
    }

    res.json({ transactionId: result.transaction.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function findPaymentHandler(req, res) {
  try {
    const transaction = await findPayment(req.params.id);
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

