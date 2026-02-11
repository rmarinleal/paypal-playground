import crypto from "crypto";
import adyen from "@adyen/api-library";

const ADYEN_API_KEY = process.env.ADYEN_API_KEY || "";
const ADYEN_MERCHANT_ACCOUNT = process.env.ADYEN_MERCHANT_ACCOUNT || "";
const ADYEN_CLIENT_KEY = process.env.ADYEN_CLIENT_KEY || "";
const ADYEN_ENV = (process.env.ADYEN_ENVIRONMENT || "TEST").toUpperCase();

function buildClient() {
  const { Client } = adyen;
  const client = new Client({ apiKey: ADYEN_API_KEY, environment: ADYEN_ENV });
  return client;
}

export async function createSession() {
  if (!ADYEN_API_KEY || !ADYEN_MERCHANT_ACCOUNT) {
    throw new Error("Missing Adyen credentials");
  }

  const reference = `PPTR-${crypto.randomUUID()}`;
  const shopperReference = `MyLocal-${crypto.randomUUID()}`;

  const { CheckoutAPI } = adyen;
  const checkout = new CheckoutAPI(buildClient());

  const session = await checkout.sessions({
    merchantAccount: ADYEN_MERCHANT_ACCOUNT,
    storePaymentMethod: false,
    amount: {
      currency: "USD",
      value: 1000
    },
    shopperReference,
    countryCode: "ES",
    reference,
    returnUrl: process.env.ADYEN_RETURN_URL || "http://localhost:5173/adyen",
    recurringProcessingModel: "CardOnFile",
    lineItems: [
      {
        quantity: 1,
        itemCategory: "PHYSICAL_GOODS",
        amountExcludingTax: 590,
        description: "Red Shoes",
        sku: "ABC123",
        taxAmount: 10
      },
      {
        quantity: 3,
        itemCategory: "PHYSICAL_GOODS",
        amountExcludingTax: 90,
        description: "Polkadot Socks",
        sku: "DEF234",
        taxAmount: 10
      }
    ]
  });

  return {
    clientKey: ADYEN_CLIENT_KEY,
    session
  };
}

