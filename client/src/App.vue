<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <span class="brand__logo">PayPal</span>
        <span class="brand__subtitle">Payments Lab</span>
      </div>
      <nav class="nav">
        <RouterLink to="/paylater" class="nav__link">Pay Later</RouterLink>
        <RouterLink to="/paylater-hc" class="nav__link">Pay Later HC</RouterLink>
        <RouterLink to="/paylater-edreams" class="nav__link">Pay Later eDreams</RouterLink>
        <RouterLink to="/checkout" class="nav__link">Checkout</RouterLink>
        <div class="nav__section">Braintree</div>
        <RouterLink to="/braintree/paylater" class="nav__link">Pay Later</RouterLink>
        <RouterLink to="/braintree/payment" class="nav__link">Payment</RouterLink>
        <RouterLink to="/braintree/venmo" class="nav__link">Venmo</RouterLink>
        <RouterLink to="/braintree/appswitch" class="nav__link">App Switch</RouterLink>
        <div class="nav__section">Other</div>
        <RouterLink to="/adyen" class="nav__link">Adyen</RouterLink>
        <RouterLink to="/vault" class="nav__link">Vault</RouterLink>
        <RouterLink to="/radioshow" class="nav__link">Radio Show</RouterLink>
      </nav>
    </aside>
    <section class="content">
      <header class="content__header">
        <h1 class="content__title">{{ currentTitle }}</h1>
        <p class="content__subtitle">Sandbox-ready flows with PayPal styling.</p>
      </header>
      <div class="content__body" :style="{ '--panel-width': panelWidth + 'px' }">
        <main class="content__main">
          <RouterView />
        </main>
        <div class="content__resizer" @mousedown="startResize" />
        <RequestLogPanel />
      </div>
      <CodePanel :title="currentTitle" :snippet="currentSnippet" />
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
import { useRoute } from "vue-router";
import { RouterLink, RouterView } from "vue-router";
import CodePanel from "./components/CodePanel.vue";
import RequestLogPanel from "./components/RequestLogPanel.vue";
import { getRenderCode } from "./utils/renderCodeRegistry.js";

const route = useRoute();

const currentCode = computed(() => {
  const key = route.meta?.codeKey;
  return getRenderCode(key);
});

const currentTitle = computed(() => currentCode.value.title);
const currentSnippet = computed(() => currentCode.value.snippet);

const panelWidth = ref(320);
let isResizing = false;

const onMouseMove = (event) => {
  if (!isResizing) {
    return;
  }
  const minWidth = 240;
  const maxWidth = 520;
  const nextWidth = window.innerWidth - event.clientX;
  panelWidth.value = Math.max(minWidth, Math.min(maxWidth, nextWidth));
};

const onMouseUp = () => {
  isResizing = false;
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
};

const startResize = () => {
  isResizing = true;
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
};

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
});
</script>

<style scoped>
.app-shell {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  font-family: "Inter", "Segoe UI", system-ui, sans-serif;
  color: #0b1f44;
  background: #f8fafc;
}

.sidebar {
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.brand {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.brand__logo {
  font-size: 20px;
  font-weight: 700;
  color: #003087;
}

.brand__subtitle {
  font-size: 12px;
  color: #5b6b8a;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav__link {
  text-decoration: none;
  color: #0b1f44;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav__link.router-link-active {
  background: #e6f0ff;
  color: #003087;
}

.nav__link:hover {
  background: #f0f4ff;
}

.nav__section {
  margin-top: 12px;
  font-size: 12px;
  color: #5b6b8a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.content {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.content__header {
  padding: 24px 32px 8px;
}

.content__title {
  margin: 0;
  font-size: 24px;
  color: #003087;
}

.content__subtitle {
  margin: 4px 0 0;
  color: #5b6b8a;
  font-size: 14px;
}

.content__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 6px var(--panel-width, 320px);
  gap: 0;
  align-items: stretch;
}

.content__main {
  padding: 16px 32px;
  background: #ffffff;
  margin: 0 0 0 0;
  border-radius: 16px 0 0 16px;
  box-shadow: 0 10px 30px rgba(0, 48, 135, 0.05);
}

.content__resizer {
  cursor: col-resize;
  background: linear-gradient(90deg, transparent, #dbe2f0, transparent);
}

@media (max-width: 900px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }

  .content__main {
    margin: 0;
    border-radius: 0;
  }

  .content__body {
    grid-template-columns: 1fr;
  }
}
</style>

