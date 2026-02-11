import { loadScript } from "../utils/loadScript.js";
import { createVaultSetupToken, createVaultPaymentToken } from "../services/api.js";

export async function initPayPalVault({ clientId, currency, idToken }) {
  const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&components=buttons&locale=es_ES`;
  await loadScript(sdkUrl, { "data-user-id-token": idToken });

  if (!window.paypal) {
    throw new Error("PayPal SDK not available");
  }

  window.paypal
    .Buttons({
      style: {
        color: "black",
        shape: "pill",
        label: "paypal"
      },
      createVaultSetupToken: async () => {
        const data = await createVaultSetupToken();
        return data.id;
      },
      onApprove: async ({ vaultSetupToken }) => {
        await createVaultPaymentToken(vaultSetupToken);
      },
      onError: () => {}
    })
    .render("#paypal-button-container");
}

