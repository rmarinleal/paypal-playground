<template>
  <div>
    <label>
      <input type="radio" name="payment-option" value="paypal" checked />
      PayPal
      <div id="paypal-marks-container"></div>
    </label>
    <label>
      <input type="radio" name="payment-option" value="card" />
      Credit card
    </label>
    <br />
    <label>
      <input type="radio" name="payment-option" value="alternate" />
      Alternative
    </label>
    <br />
    <hr />
    <br />
    <div id="paypal-buttons-container"></div>
    <div id="card-button-container"></div>
    <div id="alternate-button-container">
      <button>Pay with a different method</button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getRadioShowConfig } from "../services/api.js";
import { initRadioShow } from "../composables/useRadioShow.js";

const error = ref("");

onMounted(async () => {
  try {
    const config = await getRadioShowConfig();
    await initRadioShow(config);
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

