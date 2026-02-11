export const renderCodeRegistry = {
  paylater: {
    title: "PayPal Pay Later",
    snippet: `loadPayPalSdk({ components: "messages,buttons,funding-eligibility,marks" });
paypal.Messages({ buyerCountry, amount: 120 }).render(".pp-message");
paypal.getFundingSources().forEach((fundingSource) => {
  paypal.Buttons({ fundingSource, createOrder }).render("#paypal-button-container");
  paypal.Marks({ fundingSource, amount }).render("#paypal-mark-container");
});`
  },
  paylaterHosted: {
    title: "PayPal Pay Later Hosted Content",
    snippet: `loadPayPalSdk({ components: "messages" });
// Merchant hosted messages markup already in page
// PayPal renders hosted content via data-pp-* attributes`
  },
  paylaterEdreams: {
    title: "PayPal Pay Later eDreams",
    snippet: `loadPayPalSdk({ components: "messages,buttons" });
paypal.Messages({ buyerCountry, amount: 500 }).render(".pp-message");
paypal.Buttons({ fundingSource: paypal.FUNDING.PAYLATER, createOrder })
  .render("#paypal-button-container");`
  },
  checkout: {
    title: "PayPal Checkout",
    snippet: `loadPayPalSdk({ components: "messages,buttons" });
paypal.Buttons({
  createOrder: () => api.createOrder(),
  onApprove: (data) => api.findOrderDetails(data.orderID)
}).render("#paypal-button-container");`
  },
  braintreePaylater: {
    title: "Braintree Pay Later",
    snippet: `braintree.client.create({ authorization }, (client) => {
  braintree.paypalCheckout.create({ client }, (pp) => {
    pp.loadPayPalSDK({ components: "buttons,messages" }, () => {
      paypal.Buttons({ createOrder }).render("#paypal-button");
      paypal.Messages({ amount: 500 }).render("#pp-message");
    });
  });
});`
  },
  braintreePayment: {
    title: "Braintree Payment",
    snippet: `braintree.client.create({ authorization }, (client) => {
  braintree.paypalCheckout.create({ client }, (pp) => {
    pp.loadPayPalSDK({ components: "buttons" }, () => {
      paypal.Buttons({ createOrder, onApprove }).render("#paypal-button");
    });
  });
});`
  },
  braintreeVenmo: {
    title: "Braintree Venmo",
    snippet: `braintree.client.create({ authorization }, (client) => {
  braintree.venmo.create({ client }, (venmo) => {
    venmoButton.onclick = () => venmo.tokenize();
  });
});`
  },
  braintreeAppSwitch: {
    title: "Braintree App Switch",
    snippet: `braintree.client.create({ authorization }, (client) => {
  braintree.paypalCheckout.create({ client }, (pp) => {
    pp.createPayment({ flow: "checkout", amount: 10.0, currency: "EUR" })
      .then((paymentId) => pp.startVaultInitiatedCheckout({ paymentId, userAction: "commit" }));
  });
});`
  },
  adyen: {
    title: "Adyen PayPal",
    snippet: `const checkout = await AdyenCheckout({ clientKey, session });
checkout.create("paypal").mount("#paypal-container");`
  },
  vault: {
    title: "PayPal Vault",
    snippet: `loadPayPalSdk({ components: "buttons" });
paypal.Buttons({
  createVaultSetupToken: () => api.createVaultSetupToken(),
  onApprove: ({ vaultSetupToken }) => api.createVaultPaymentToken(vaultSetupToken)
}).render("#paypal-button-container");`
  },
  radioshow: {
    title: "PayPal Radio Show",
    snippet: `paypal.Marks().render("#paypal-marks-container");
paypal.Buttons().render("#paypal-buttons-container");`
  }
};

export function getRenderCode(key) {
  return renderCodeRegistry[key] || {
    title: "Select a flow",
    snippet: "// Select a flow from the menu to view its render code."
  };
}

