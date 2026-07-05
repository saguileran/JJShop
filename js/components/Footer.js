/*
  Footer enhancements for dynamic year output.
*/

import Component from "../core/Component.js";

export default class Footer extends Component {
  init() {
    const yearTargets = this.selectAll("[data-current-year]");

    if (yearTargets.length === 0) {
      return;
    }

    super.init();
    yearTargets.forEach((target) => {
      target.textContent = new Date().getFullYear();
    });
  }
}
