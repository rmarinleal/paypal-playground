import { loadScript } from "../utils/loadScript.js";

export async function initPayPalPayLater({ clientId, currency, buyerCountry }) {
  const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&components=messages,buttons,funding-eligibility,marks&enable-funding=paylater&intent=capture&buyer-country=${buyerCountry}`;
  await loadScript(sdkUrl);

  if (!window.paypal) {
    throw new Error("PayPal SDK not available");
  }

  window.paypal
    .Messages({
      buyerCountry,
      amount: 120,
      style: {
        layout: "text",
        text: {
          size: "11",
          align: "left"
        }
      }
    })
    .render(".pp-message");

  window.paypal.getFundingSources().forEach((fundingSource) => {
    const button = window.paypal.Buttons({
      fundingSource,
      buyerCountry,
      style: { label: "pay" },
      createOrder: (data, actions) =>
        actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: currency,
                value: "100.00"
              },
              description: "Pago de 100€"
            }
          ]
        })
    });

    if (button.isEligible()) {
      button.render("#paypal-button-container");
    }
  });

  window.paypal.getFundingSources().forEach((fundingSource) => {
    const mark = window.paypal.Marks({
      fundingSource,
      buyerCountry,
      amount: {
        currency_code: currency,
        value: "100.00"
      }
    });

    if (mark.isEligible()) {
      mark.render("#paypal-mark-container");
    }
  });
}

