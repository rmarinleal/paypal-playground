import { reactive } from "vue";

const MAX_ENTRIES = 50;

const state = reactive({
  entries: []
});

function addEntry(entry) {
  state.entries.unshift(entry);
  if (state.entries.length > MAX_ENTRIES) {
    state.entries.pop();
  }
}

function clearEntries() {
  state.entries.splice(0, state.entries.length);
}

export const requestLogStore = {
  state,
  addEntry,
  clearEntries
};

