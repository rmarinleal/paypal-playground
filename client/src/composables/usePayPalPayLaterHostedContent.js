import { loadScript } from "../utils/loadScript.js";

export async function initPayPalPayLaterHostedContent({ clientId }) {
  const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=messages`;
  await loadScript(sdkUrl, { "data-namespace": "PayPalSDK" });
}

