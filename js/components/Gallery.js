/*
  Lightweight image gallery enhancement for selectable preview images.
*/

import Component from "../core/Component.js";

export default class Gallery extends Component {
  init() {
    const gallery = this.select("[data-gallery]");

    if (!gallery) {
      return;
    }

    const preview = this.select("[data-gallery-preview]", gallery);
    const buttons = this.selectAll("[data-gallery-image]", gallery);

    if (!preview || buttons.length === 0) {
      return;
    }

    super.init();

    buttons.forEach((button) => {
      this.listen(button, "click", () => {
        preview.src = button.dataset.galleryImage;
        preview.alt = button.dataset.galleryAlt || preview.alt;
      });
    });
  }
}
