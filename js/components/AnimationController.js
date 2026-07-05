/*
  Reveals marked elements as they enter the viewport.
*/

import Component from "../core/Component.js";

export default class AnimationController extends Component {
  init() {
    const elements = this.selectAll("[data-reveal]");

    if (elements.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    super.init();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    elements.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });

    this.cleanups.push(() => observer.disconnect());
  }
}
