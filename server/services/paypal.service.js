import axios from "axios";

function getPayPalApiUrl() {
  return process.env.PAYPAL_API_URL || process.env.PP_URL || "https://api-m.sandbox.paypal.com";
}

function getPayPalClientId() {
  return process.env.PAYPAL_CLIENT_ID || process.env.ES_PP_CLIENT_ID || "";
}

function getPayPalSecret() {
  return process.env.PAYPAL_SECRET || process.env.ES_PP_SECRET || "";
}

function getPayPalMerchantId() {
  return process.env.PAYPAL_MERCHANT_ID || process.env.PP_MERCHANT_ID || "";
}

const DEFAULT_ORDER_BODY = {
  intent: "CAPTURE",
  payment_source: {
    paypal: {
      experience_context: {
        payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
        landing_page: "LOGIN",
        shipping_preference: "GET_FROM_FILE",
        user_action: "PAY_NOW",
        return_url: "https://example.com/returnUrl",
        cancel_url: "https://example.com/cancelUrl"
      }
    }
  },
  purchase_units: [
    {
      invoice_id: "90210",
      amount: {
        currency_code: "EUR",
        value: "230.00",
        breakdown: {
          item_total: {
            currency_code: "EUR",
            value: "220.00"
          },
          shipping: {
            currency_code: "EUR",
            value: "10.00"
          }
        }
      },
      payee: {
        email_address: "raul.marin.leal@gmail.com"
      },
      items: [
        {
          name: "T-Shirt",
          description: "Super Fresh Shirt",
          unit_amount: {
            currency_code: "EUR",
            value: "220.00"
          },
          quantity: "1",
          category: "PHYSICAL_GOODS",
          sku: "sku01",
          image_url: "https://example.com/static/images/items/1/tshirt_green.jpg",
          url: "https://example.com/url-to-the-item-being-purchased-1",
          upc: {
            type: "UPC-A",
            code: "123456789012"
          }
        }
      ]
    }
  ]
};

async function getAccessToken() {
  const clientId = getPayPalClientId();
  const secret = getPayPalSecret();
  if (!clientId || !secret) {
    throw new Error("Missing PayPal credentials");
  }

  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

  const response = await axios.post(
    `${getPayPalApiUrl()}/v1/oauth2/token`,
    new URLSearchParams({
      grant_type: "client_credentials",
      response_type: "id_token"
    }).toString(),
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      }
    }
  );

  return response.data;
}

export async function getAccessTokenValue() {
  const tokenResponse = await getAccessToken();
  return tokenResponse.access_token;
}

export async function getIdTokenValue(targetCustomerId = "") {
  const clientId = getPayPalClientId();
  const secret = getPayPalSecret();
  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const response = await axios.post(
    `${getPayPalApiUrl()}/v1/oauth2/token`,
    new URLSearchParams({
      grant_type: "client_credentials",
      response_type: "id_token",
      target_customer_id: targetCustomerId
    }).toString(),
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      }
    }
  );

  return response.data.id_token;
}

export async function createOrder(orderBody = {}) {
  const accessToken = await getAccessTokenValue();
  const response = await axios.post(
    `${getPayPalApiUrl()}/v2/checkout/orders`,
    {
      ...DEFAULT_ORDER_BODY,
      ...orderBody
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
}

export async function captureOrder(orderId) {
  const accessToken = await getAccessTokenValue();
  const response = await axios.post(
    `${getPayPalApiUrl()}/v2/checkout/orders/${orderId}/capture`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
}

export async function findOrderDetails(orderId) {
  const accessToken = await getAccessTokenValue();
  const response = await axios.get(
    `${getPayPalApiUrl()}/v2/checkout/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
}

export async function createVaultSetupToken() {
  const accessToken = await getAccessTokenValue();
  const response = await axios.post(
    `${getPayPalApiUrl()}/v3/vault/setup-tokens`,
    {
      payment_source: {
        paypal: {
          usage_type: "MERCHANT",
          experience_context: {
            return_url: "https://example.com/returnUrl",
            cancel_url: "https://example.com/cancelUrl"
          }
        }
      }
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
}

export async function createVaultPaymentToken(setupToken) {
  const accessToken = await getAccessTokenValue();
  const response = await axios.post(
    `${getPayPalApiUrl()}/v3/vault/payment-tokens`,
    {
      payment_source: {
        token: {
          id: setupToken,
          type: "SETUP_TOKEN"
        }
      }
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
}

export function getPayPalConfig() {
  return {
    clientId: getPayPalClientId(),
    merchantId: getPayPalMerchantId(),
    currency: process.env.PAYPAL_CURRENCY || "EUR",
    locale: process.env.PAYPAL_LOCALE || "es_ES",
    buyerCountry: process.env.PAYPAL_BUYER_COUNTRY || "ES"
  };
}

