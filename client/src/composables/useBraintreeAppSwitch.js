import { loadScript } from "../utils/loadScript.js";

export async function initBraintreeAppSwitch({ authToken }, { onStatus } = {}) {
  if (!authToken) {
    throw new Error("Missing Braintree auth token");
  }

  window.ES_BT_AUTH_TOKEN = authToken;

  await loadScript("https://js.braintreegateway.com/web/3.109.0/js/client.min.js");
  await loadScript("https://js.braintreegateway.com/web/3.109.0/js/paypal-checkout.min.js");

  if (!window.braintree) {
    throw new Error("Braintree SDK not available");
  }

  window.braintree.client.create(
    { authorization: window.ES_BT_AUTH_TOKEN },
    (clientErr, clientInstance) => {
      if (clientErr) {
        console.error("Error creating client:", clientErr);
        onStatus?.("Client init failed");
        return;
      }

      window.braintree.paypalCheckout.create(
        { client: clientInstance },
        (paypalCheckoutErr, paypalCheckoutInstance) => {
          if (paypalCheckoutErr) {
            console.error("Error creating PayPal Checkout:", paypalCheckoutErr);
            onStatus?.("PayPal Checkout init failed");
            return;
          }

          const button = document.getElementById("appswitch-button");
          if (!button) {
            onStatus?.("Button not found");
            return;
          }

          const startPayment = () =>
            paypalCheckoutInstance.createPayment({
              flow: "checkout",
              amount: 10.0,
              currency: "EUR",
              intent: "capture",
              enableShippingAddress: true
            });

          const renderFallback = () => {
            const container = document.getElementById("appswitch-fallback");
            if (!container) {
              return;
            }
            onStatus?.("App switch unavailable, showing web checkout");
            paypalCheckoutInstance.loadPayPalSDK({ components: "buttons" }, () => {
              window.paypal
                .Buttons({
                  createOrder: () => startPayment(),
                  onApprove: (data) =>
                    paypalCheckoutInstance.tokenizePayment(data, (err, payload) => {
                      if (err) {
                        console.error(err);
                        return;
                      }
                      console.log("PayPal payment nonce", payload.nonce);
                    })
                })
                .render("#appswitch-fallback");
            });
          };

          button.addEventListener("click", () => {
            onStatus?.("Launching app switch...");
            startPayment()
              .then((paymentId) => {
                const startCheckout = paypalCheckoutInstance.startCheckout;
                if (typeof startCheckout === "function") {
                  return startCheckout.call(paypalCheckoutInstance, { paymentId });
                }
                throw new Error("App switch is not supported in this environment");
              })
              .catch((err) => {
                console.error("App switch error:", err);
                renderFallback();
              });
          });

          onStatus?.("Ready");
        }
      );
    }
  );
}

