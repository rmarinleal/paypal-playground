<template>
  <div>
    <div id="paypal-button-container"></div>
    <p id="result-message"></p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getVaultConfig } from "../services/api.js";
import { initPayPalVault } from "../composables/usePayPalVault.js";

const error = ref("");

onMounted(async () => {
  try {
    const config = await getVaultConfig();
    await initPayPalVault(config);
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

