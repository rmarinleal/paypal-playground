const loadedStyles = new Map();

export function loadStyle(href, attributes = {}) {
  if (loadedStyles.has(href)) {
    return loadedStyles.get(href);
  }

  const promise = new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;

    Object.entries(attributes).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });

    link.onload = () => resolve(link);
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
    document.head.appendChild(link);
  });

  loadedStyles.set(href, promise);
  return promise;
}

