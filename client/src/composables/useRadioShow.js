import { loadScript } from "../utils/loadScript.js";

export async function initRadioShow({ clientId }) {
  const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=messages,buttons,funding-eligibility,marks`;
  await loadScript(sdkUrl);

  if (!window.paypal) {
    throw new Error("PayPal SDK not available");
  }

  window.paypal.Marks().render("#paypal-marks-container");
  window.paypal.Buttons().render("#paypal-buttons-container");

  document.querySelectorAll("input[name=payment-option]").forEach((el) => {
    el.addEventListener("change", (event) => {
      const isPayPal = event.target.value === "paypal";
      document.querySelector("#alternate-button-container").style.display = isPayPal
        ? "none"
        : "block";
      document.querySelector("#paypal-buttons-container").style.display = isPayPal
        ? "block"
        : "none";
    });
  });

  document.querySelector("#alternate-button-container").style.display = "none";
}

