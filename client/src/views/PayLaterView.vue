<template>
  <div>
    <div id="paypal-mark-container"></div>
    <div id="paypal-button-container"></div>
    <div class="pp-message"></div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getPaylaterConfig } from "../services/api.js";
import { initPayPalPayLater } from "../composables/usePayPalPayLater.js";

const error = ref("");

onMounted(async () => {
  try {
    const config = await getPaylaterConfig();
    await initPayPalPayLater(config);
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

