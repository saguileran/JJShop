/*
  Accessible mobile navigation controller.
*/

import Component from "../core/Component.js";

export default class Navbar extends Component {
  init() {
    const toggle = this.select("[data-nav-toggle]");
    const menu = this.select("[data-nav-menu]");

    if (!toggle || !menu) {
      return;
    }

    super.init();

    const setOpen = (isOpen) => {
      toggle.setAttribute("aria-expanded", String(isOpen));
      menu.classList.toggle("is-open", isOpen);
    };

    this.listen(toggle, "click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
    });

    this.selectAll("[data-nav-menu] a").forEach((link) => {
      this.listen(link, "click", () => setOpen(false));
    });

    this.listen(document, "keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });
  }
}
