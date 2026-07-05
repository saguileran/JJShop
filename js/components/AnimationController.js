/*
  Reveals marked elements as they enter the viewport.
*/

import Component from "../core/Component.js";

export default class AnimationController extends Component {
  init() {
    const elements = this.selectAll("[data-reveal]");
    const counters = this.selectAll("[data-count-to]");

    if (elements.length === 0 && counters.length === 0) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      counters.forEach((element) => {
        element.textContent = this.formatCount(element, this.readCountTarget(element));
      });
      return;
    }

    super.init();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const target = entry.target;

        if (target.matches("[data-reveal]")) {
          target.classList.add("is-visible");
        }

        if (target.matches("[data-count-to]")) {
          this.animateCount(target);
        }

        observer.unobserve(target);
      });
    }, { threshold: 0.18 });

    elements.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });

    counters.forEach((element) => observer.observe(element));

    this.cleanups.push(() => observer.disconnect());
  }

  readCountTarget(element) {
    const value = Number.parseInt(element.dataset.countTo, 10);
    return Number.isFinite(value) ? value : 0;
  }

  formatCount(element, value) {
    const prefix = element.dataset.countPrefix ?? "";
    const suffix = element.dataset.countSuffix ?? "";
    return `${prefix}${value}${suffix}`;
  }

  animateCount(element) {
    const target = this.readCountTarget(element);
    const duration = 1200;
    const startTime = performance.now();

    const tick = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(target * eased);

      element.textContent = this.formatCount(element, currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      }
    };

    element.textContent = this.formatCount(element, 0);
    window.requestAnimationFrame(tick);
  }
}
