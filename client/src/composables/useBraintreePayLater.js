import { loadScript } from "../utils/loadScript.js";

export async function initBraintreePayLater({ authToken }) {
  window.ES_BT_AUTH_TOKEN = authToken;

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
              components: "buttons,messages",
              locale: "en_ES",
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
                      amount: 10.0,
                      currency: "EUR",
                      intent: "capture",
                      enableShippingAddress: true,
                      shippingAddressEditable: false,
                      shippingAddressOverride: {
                        recipientName: "Scruff McGruff",
                        line1: "1234 Main St.",
                        line2: "Unit 1",
                        city: "Chicago",
                        countryCode: "US",
                        postalCode: "60652",
                        state: "IL",
                        phone: "123.456.7890"
                      }
                    }),
                  onShippingChange: (data, actions) => actions.resolve(),
                  onApprove: (data) =>
                    paypalCheckoutInstance.tokenizePayment(data, () => {}),
                  onCancel: (data) =>
                    console.log("PayPal payment cancelled", JSON.stringify(data, 0, 2)),
                  onError: (err) => console.error("PayPal error", err)
                })
                .render("#paypal-button");
            }
          );
        }
      );

      window.braintree.paypalCheckout.create(
        { client: clientInstance },
        (paypalCheckoutErr, paypalCheckoutInstance) => {
          if (paypalCheckoutErr) {
            console.error("Error creating PayPal Checkout:", paypalCheckoutErr);
            return;
          }

          paypalCheckoutInstance.loadPayPalSDK(
            {
              components: "messages",
              currency: "EUR",
              "enable-funding": "paylater",
              dataAttributes: {
                amount: "90.00"
              }
            },
            () => {
              window.paypal
                .Messages({
                  amount: 500,
                  placement: "product-list",
                  style: {
                    text: { size: 16 },
                    layout: "text",
                    logo: { type: "alternative" }
                  }
                })
                .render("#pp-message");
            }
          );
        }
      );
    }
  );
}

