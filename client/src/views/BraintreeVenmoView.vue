<template>
  <div>
    <button id="venmo-button" style="display: none">Pay with Venmo</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getBraintreeVenmoConfig } from "../services/api.js";
import { initBraintreeVenmo } from "../composables/useBraintreeVenmo.js";

const error = ref("");

onMounted(async () => {
  try {
    const config = await getBraintreeVenmoConfig();
    await initBraintreeVenmo(config);
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

