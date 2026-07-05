/*
  DOM utility helpers for scoped queries and event binding.
*/

export const dom = {
  select(selector, parent = document) {
    return parent.querySelector(selector);
  },

  selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
  },

  on(element, eventName, handler, options) {
    element?.addEventListener(eventName, handler, options);
    return () => element?.removeEventListener(eventName, handler, options);
  }
};
