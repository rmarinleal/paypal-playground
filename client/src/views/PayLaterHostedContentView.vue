<template>
  <div>
    <div id="paypal-button-container"></div>
    <div id="paypal-mark-container"></div>
    <div class="pp-message"></div>

    <div
      class="pp-message"
      data-pp-message
      data-pp-amount="450"
      data-pp-offer="PAY_LATER_SHORT_TERM"
      data-pp-style-text-color="monochrome"
      data-pp-style-text-size="14"
      data-pp-style-logo-type="inline"
      data-pp-buyerCountry="FR"
    ></div>
    <div
      class="pp-message"
      data-pp-messagesmodal
      data-pp-amount="450"
      data-pp-offer="PAY_LATER_SHORT_TERM"
      data-pp-style-text-color="monochrome"
      data-pp-style-text-size="14"
      data-pp-style-logo-type="inline"
      data-pp-buyerCountry="FR"
    >
      MERCHANT HOSTED CONTENT 450
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getPaylaterHostedConfig } from "../services/api.js";
import { initPayPalPayLaterHostedContent } from "../composables/usePayPalPayLaterHostedContent.js";

const error = ref("");

onMounted(async () => {
  try {
    const config = await getPaylaterHostedConfig();
    await initPayPalPayLaterHostedContent(config);
  } catch (err) {
    error.value = err.message;
  }
});
</script>

<style scoped>
.error {
  color: #b00;
}
</style>

