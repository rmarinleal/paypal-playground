<template>
  <div class="appswitch">
    <div class="appswitch__header">
      <h2>App Switch (Web)</h2>
      <p>Launches the PayPal app from the browser when available.</p>
    </div>
    <div class="appswitch__content">
      <button id="appswitch-button" class="appswitch__button">Launch App Switch</button>
      <div class="appswitch__status">{{ status }}</div>
    </div>
    <div id="appswitch-fallback" class="appswitch__fallback"></div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getBraintreePaymentConfig } from "../services/api.js";
import { initBraintreeAppSwitch } from "../composables/useBraintreeAppSwitch.js";

const error = ref("");
const status = ref("Ready");

onMounted(async () => {
  try {
    const config = await getBraintreePaymentConfig();
    await initBraintreeAppSwitch(config, {
      onStatus: (message) => {
        status.value = message;
      }
    });
  } catch (err) {
    error.value = err.message;
  }
});
</script>

<style scoped>
.appswitch {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.appswitch__header h2 {
  margin: 0;
  color: #003087;
}

.appswitch__content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.appswitch__button {
  background: #0070e0;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.appswitch__button:hover {
  background: #005bb5;
}

.appswitch__status {
  color: #5b6b8a;
}

.appswitch__fallback {
  margin-top: 12px;
}

.error {
  color: #b00;
}
</style>

