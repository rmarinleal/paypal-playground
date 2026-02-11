import braintree from "braintree";

const BT_ENV = (process.env.BT_ENVIRONMENT || "sandbox").toLowerCase();

function getGateway() {
  const merchantId = process.env.ES_BT_MERCHANT_ID || "";
  const publicKey = process.env.ES_BT_PUBLIC_KEY || "";
  const privateKey = process.env.ES_BT_PRIVATE_KEY || "";

  if (!merchantId || !publicKey || !privateKey) {
    throw new Error("Missing Braintree credentials");
  }

  return new braintree.BraintreeGateway({
    environment: BT_ENV === "production" ? braintree.Environment.Production : braintree.Environment.Sandbox,
    merchantId,
    publicKey,
    privateKey
  });
}

export function getBraintreeConfig(region = "ES") {
  const isUS = region === "US";
  return {
    clientId: isUS ? process.env.US_PP_CLIENT_ID || "" : process.env.ES_PP_CLIENT_ID || "",
    authToken: isUS ? process.env.US_BT_AUTH_TOKEN || "" : process.env.ES_BT_AUTH_TOKEN || ""
  };
}

export async function capturePayment(amount, nonce) {
  const gateway = getGateway();
  const result = await gateway.transaction.sale({
    amount,
    paymentMethodNonce: nonce,
    deviceData: [],
    options: {
      submitForSettlement: true
    }
  });

  return result;
}

export async function findPayment(transactionId) {
  const gateway = getGateway();
  const transaction = await gateway.transaction.find(transactionId);
  return transaction;
}

