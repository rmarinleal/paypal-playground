import { loadScript } from "../utils/loadScript.js";
import { createOrder, findOrderDetails } from "../services/api.js";

export async function initPayPalCheckout({ clientId, merchantId, currency }) {
  const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}&merchant-id=${merchantId}&currency=${currency}&components=messages,buttons,funding-eligibility&enable-funding=paylater&intent=capture`;
  await loadScript(sdkUrl);

  if (!window.paypal) {
    throw new Error("PayPal SDK not available");
  }

  window.paypal
    .Buttons({
      createOrder: async () => {
        const order = await createOrder({});
        return order.id;
      },
      onShippingAddressChange: (data) => {
        console.log("onShippingAddressChange", data);
      },
      onApprove: async (data) => {
        console.log("onApprove", data);
        const result = await findOrderDetails(data.orderID);
        console.log("orderDetails", result);
      },
      onPaymentCompleted: (result, component) => {
        console.info("onPaymentCompleted", result, component);
      }
    })
    .render("#paypal-button-container");
}

