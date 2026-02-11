<template>
  <section class="code-panel">
    <header class="code-panel__header">
      <span class="code-panel__title">Render Code</span>
      <span class="code-panel__subtitle">{{ title }}</span>
    </header>
    <pre class="code-panel__body"><code>{{ snippet }}</code></pre>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ""
  },
  snippet: {
    type: String,
    default: "// Select a flow from the menu to view its render code."
  }
});
</script>

<style scoped>
.code-panel {
  background: #f5f7fb;
  border-top: 1px solid #dbe2f0;
  padding: 12px 16px;
  height: 220px;
  display: flex;
  flex-direction: column;
}

.code-panel__header {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
  color: #003087;
  font-weight: 600;
}

.code-panel__title {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.code-panel__subtitle {
  font-size: 13px;
  color: #5b6b8a;
  font-weight: 500;
}

.code-panel__body {
  margin: 0;
  padding: 12px;
  border-radius: 8px;
  background: #0b1f44;
  color: #f2f6ff;
  font-size: 12px;
  line-height: 1.5;
  overflow: auto;
  flex: 1;
}
</style>

