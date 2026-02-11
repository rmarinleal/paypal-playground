import { loadScript } from "../utils/loadScript.js";

export async function initPayPalPayLaterEdreams({ clientId, currency, buyerCountry }) {
  const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&components=messages,funding-eligibility,buttons&enable-funding=paylater&intent=authorize`;
  await loadScript(sdkUrl);

  if (!window.paypal) {
    throw new Error("PayPal SDK not available");
  }

  window.paypal
    .Messages({
      buyerCountry,
      amount: 500,
      style: {
        layout: "text",
        text: {
          size: "11",
          align: "left"
        }
      }
    })
    .render(".pp-message");

  const button = window.paypal.Buttons({
    fundingSource: window.paypal.FUNDING.PAYLATER,
    buyerCountry,
    style: {
      label: "pay"
    },
    createOrder: (data, actions) =>
      actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: "900.00"
            },
            description: "Transacción de ejemplo"
          }
        ]
      })
  });

  if (button.isEligible()) {
    button.render("#paypal-button-container");
  }
}

