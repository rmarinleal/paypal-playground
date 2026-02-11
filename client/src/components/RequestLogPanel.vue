<template>
  <aside class="request-panel">
    <header class="request-panel__header">
      <div>
        <div class="request-panel__title">API Activity</div>
        <div class="request-panel__subtitle">Frontend → Backend</div>
      </div>
      <button class="request-panel__clear" @click="clearEntries">Clear</button>
    </header>
    <div class="request-panel__list">
      <div v-if="entries.length === 0" class="request-panel__empty">
        No API calls yet.
      </div>
      <article v-for="entry in entries" :key="entry.id" class="request-panel__item">
        <div class="request-panel__meta">
          <span class="request-panel__method">{{ entry.method }}</span>
          <span class="request-panel__url">{{ entry.url }}</span>
        </div>
        <div class="request-panel__details">
          <span :class="['request-panel__status', entry.status >= 400 ? 'is-error' : 'is-ok']">
            {{ entry.status || "ERR" }}
          </span>
          <span class="request-panel__duration">{{ entry.duration }} ms</span>
        </div>
        <pre class="request-panel__body"><code>{{ format(entry.response) }}</code></pre>
      </article>
    </div>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { requestLogStore } from "../utils/requestLogStore.js";

const entries = computed(() => requestLogStore.state.entries);
const clearEntries = () => requestLogStore.clearEntries();

function format(payload) {
  if (payload == null) {
    return "";
  }
  if (typeof payload === "string") {
    return payload.length > 500 ? `${payload.slice(0, 500)}...` : payload;
  }
  try {
    const json = JSON.stringify(payload, null, 2);
    return json.length > 800 ? `${json.slice(0, 800)}...` : json;
  } catch (error) {
    return String(payload);
  }
}
</script>

<style scoped>
.request-panel {
  width: 100%;
  background: #ffffff;
  border-left: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
}

.request-panel__header {
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.request-panel__title {
  font-weight: 700;
  color: #003087;
}

.request-panel__subtitle {
  font-size: 12px;
  color: #5b6b8a;
}

.request-panel__clear {
  background: #f0f4ff;
  color: #003087;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.request-panel__list {
  padding: 12px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.request-panel__empty {
  color: #5b6b8a;
  font-size: 13px;
}

.request-panel__item {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;
  background: #f9fbff;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.request-panel__meta {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: #1d2c52;
  font-weight: 600;
}

.request-panel__method {
  background: #e6f0ff;
  color: #003087;
  padding: 2px 6px;
  border-radius: 4px;
}

.request-panel__url {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.request-panel__details {
  display: flex;
  gap: 8px;
  font-size: 11px;
  color: #5b6b8a;
}

.request-panel__status {
  font-weight: 700;
}

.request-panel__status.is-ok {
  color: #0a7a3b;
}

.request-panel__status.is-error {
  color: #c52727;
}

.request-panel__body {
  margin: 0;
  padding: 8px;
  border-radius: 6px;
  background: #0b1f44;
  color: #f2f6ff;
  font-size: 11px;
  max-height: 120px;
  overflow: auto;
}
</style>

