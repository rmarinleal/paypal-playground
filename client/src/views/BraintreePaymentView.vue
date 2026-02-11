<template>
  <div>
    <div id="paypal-button"></div>
    <div id="pay-later-button"></div>
    <div id="pp-message"></div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getBraintreePaymentConfig } from "../services/api.js";
import { initBraintreePayment } from "../composables/useBraintreePayment.js";

const error = ref("");

onMounted(async () => {
  try {
    const config = await getBraintreePaymentConfig();
    await initBraintreePayment(config);
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

