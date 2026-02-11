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
import { getBraintreePaylaterConfig } from "../services/api.js";
import { initBraintreePayLater } from "../composables/useBraintreePayLater.js";

const error = ref("");

onMounted(async () => {
  try {
    const config = await getBraintreePaylaterConfig();
    await initBraintreePayLater(config);
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

