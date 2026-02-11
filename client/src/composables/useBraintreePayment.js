import { loadScript } from "../utils/loadScript.js";
import { captureBraintreePayment, findBraintreePayment, findOrderDetails } from "../services/api.js";

export async function initBraintreePayment({ authToken }) {
  window.ES_BT_AUTH_TOKEN = authToken;

  await loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js");
  await loadScript("https://js.braintreegateway.com/web/3.92.1/js/client.min.js");
  await loadScript("https://js.braintreegateway.com/web/3.92.1/js/paypal-checkout.min.js");

  if (!window.braintree || !window.paypal) {
    return;
  }

  window.braintree.client.create(
    {
      authorization: window.ES_BT_AUTH_TOKEN
    },
    (clientErr, clientInstance) => {
      if (clientErr) {
        console.error("Error creating client:", clientErr);
        return;
      }

      window.braintree.paypalCheckout.create(
        { client: clientInstance },
        (paypalCheckoutErr, paypalCheckoutInstance) => {
          if (paypalCheckoutErr) {
            console.error("Error creating PayPal Checkout:", paypalCheckoutErr);
            return;
          }

          paypalCheckoutInstance.loadPayPalSDK(
            {
              components: "buttons",
              currency: "EUR",
              intent: "capture"
            },
            () => {
              window.paypal
                .Buttons({
                  fundingSource: window.paypal.FUNDING.PAYPAL,
                  createOrder: () =>
                    paypalCheckoutInstance.createPayment({
                      flow: "checkout",
                      amount: 30.0,
                      currency: "EUR",
                      intent: "capture"
                    }),
                  onShippingChange: (data, actions) => actions.resolve(),
                  onApprove: (data) =>
                    paypalCheckoutInstance.tokenizePayment(data, async (err, payload) => {
                      if (err) {
                        console.error(err);
                        return;
                      }

                      const captureResult = await captureBraintreePayment({
                        paymentMethodNonce: payload.nonce,
                        amount: 30.0
                      });

                      if (!captureResult.transactionId) {
                        console.error("Capture failed", captureResult);
                        return;
                      }

                      const transaction = await findBraintreePayment(captureResult.transactionId);
                      if (transaction?.paypal?.paymentId) {
                        const orderDetails = await findOrderDetails(transaction.paypal.paymentId);
                        console.log(orderDetails);
                      }
                    }),
                  onCancel: (data) =>
                    console.log("PayPal payment cancelled", JSON.stringify(data, 0, 2)),
                  onError: (err) => console.error("PayPal error", err)
                })
                .render("#paypal-button");
            }
          );
        }
      );
    }
  );
}

