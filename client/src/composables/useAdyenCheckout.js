import { loadScript } from "../utils/loadScript.js";
import { loadStyle } from "../utils/loadStyle.js";

const ADYEN_SDK_VERSION = "5.41.0";

export async function initAdyenCheckout({ clientKey, session }) {
  const jsUrl = `https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/${ADYEN_SDK_VERSION}/adyen.js`;
  const cssUrl = `https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/${ADYEN_SDK_VERSION}/adyen.css`;

  await loadScript(jsUrl);
  await loadStyle(cssUrl);

  if (!window.AdyenCheckout) {
    throw new Error("Adyen SDK not available");
  }

  const paypalConfiguration = {
    merchantId: "MQ6VMR8JHWF3U",
    intent: "capture",
    style: {
      layout: "vertical",
      color: "gold"
    },
    cspNonce: "MY_CSP_NONCE",
    onShippingChange: () => {},
    onInit: () => {},
    onClick: () => {},
    blockPayPalCreditButton: false,
    blockPayPalPayLaterButton: false
  };

  const configuration = {
    environment: "test",
    clientKey,
    showPayButton: true,
    session: {
      id: session.id,
      sessionData: session.sessionData
    },
    onPaymentCompleted: (result, component) => {
      console.info(result, component);
    },
    onError: (error, component) => {
      console.error(error.name, error.message, error.stack, component);
    },
    paymentMethodsConfiguration: {
      paypal: paypalConfiguration
    }
  };

  const checkout = await window.AdyenCheckout(configuration);
  checkout.create("paypal").mount("#paypal-container");
}

