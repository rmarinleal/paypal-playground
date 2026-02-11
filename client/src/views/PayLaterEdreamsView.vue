<template>
  <div>
    <p>eDreams Paylater 2nd button:</p>
    <div id="paypal-button-container"></div>
    <p>eDreams Paylater Banner for ES:</p>
    <div class="pp-message"></div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getPaylaterEdreamsConfig } from "../services/api.js";
import { initPayPalPayLaterEdreams } from "../composables/usePayPalPayLaterEdreams.js";

const error = ref("");

onMounted(async () => {
  try {
    const config = await getPaylaterEdreamsConfig();
    await initPayPalPayLaterEdreams(config);
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

