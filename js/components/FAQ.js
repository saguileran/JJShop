/*
  FAQ accordion behavior with ARIA state management.
*/

import Component from "../core/Component.js";

export default class FAQ extends Component {
  init() {
    const items = this.selectAll("[data-faq-item]");

    if (items.length === 0) {
      return;
    }

    super.init();

    items.forEach((item) => {
      const button = this.select("[data-faq-button]", item);
      const panel = this.select("[data-faq-panel]", item);

      if (!button || !panel) {
        return;
      }

      this.listen(button, "click", () => {
        const shouldOpen = !item.classList.contains("is-open");
        this.closeAll(items);

        if (shouldOpen) {
          item.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });
    });
  }

  closeAll(items) {
    items.forEach((item) => {
      const button = this.select("[data-faq-button]", item);
      const panel = this.select("[data-faq-panel]", item);

      item.classList.remove("is-open");
      button?.setAttribute("aria-expanded", "false");

      if (panel) {
        panel.hidden = true;
      }
    });
  }
}
