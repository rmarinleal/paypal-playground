import { loadScript } from "../utils/loadScript.js";

export async function initBraintreeVenmo({ authToken }) {
  window.ES_BT_AUTH_TOKEN = authToken;

  await loadScript("https://js.braintreegateway.com/web/3.109.0/js/client.min.js");
  await loadScript("https://js.braintreegateway.com/web/3.109.0/js/venmo.min.js");
  await loadScript("https://js.braintreegateway.com/web/3.109.0/js/data-collector.min.js");

  if (!window.braintree) {
    return;
  }

  const venmoButton = document.getElementById("venmo-button");

  window.braintree.client.create(
    {
      authorization: window.ES_BT_AUTH_TOKEN
    },
    (clientErr, clientInstance) => {
      if (clientErr) {
        console.error("Error creating client:", clientErr);
        return;
      }

      window.braintree.venmo.create(
        {
          client: clientInstance,
          allowDesktop: true,
          mobileWebFallBack: true,
          allowDesktopWebLogin: true,
          paymentMethodUsage: "multi_use",
          totalAmount: "10.00",
          subTotalAmount: "8.00",
          taxAmount: "1.00",
          discountAmount: "1.00",
          shippingAmount: "2.00",
          lineItems: [
            { quantity: 2, unitAmount: "5.00", type: "DEBIT" },
            { quantity: 1, unitAmount: "2.00", type: "CREDIT" }
          ]
        },
        (venmoErr, venmoInstance) => {
          if (venmoErr) {
            console.error("Error creating Venmo:", venmoErr);
            return;
          }

          venmoButton.style.display = "block";
          venmoButton.addEventListener("click", () => {
            venmoButton.disabled = true;
            venmoInstance.tokenize((tokenizeErr, payload) => {
              venmoButton.removeAttribute("disabled");
              if (tokenizeErr) {
                console.error(tokenizeErr);
                return;
              }
              console.log("Got a payment method nonce:", payload.nonce);
              console.log("Venmo user:", payload.details.username);
            });
          });
        }
      );
    }
  );
}

