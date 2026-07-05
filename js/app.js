/*
  Entry point for the static bicycle shop website.
*/

import App from "./core/App.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = new App(document);
  app.init();
});
