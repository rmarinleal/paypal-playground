<template>
  <div>
    <div id="paypal-container"></div>
    <div id="dropin-container"></div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAdyenSession } from "../services/api.js";
import { initAdyenCheckout } from "../composables/useAdyenCheckout.js";

const error = ref("");

onMounted(async () => {
  try {
    const { clientKey, session } = await getAdyenSession();
    await initAdyenCheckout({ clientKey, session });
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

