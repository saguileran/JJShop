/*
  Product catalog renderer backed by data/bicycles.json.
*/

import Component from "../core/Component.js";

export default class ProductCatalog extends Component {
  constructor(root, bicycleService) {
    super(root);
    this.bicycleService = bicycleService;
    this.products = [];
    this.activeCategory = "todas";
  }

  async init() {
    this.catalog = this.select("[data-catalog]");
    this.filters = this.selectAll("[data-filter]");

    if (!this.catalog) {
      return;
    }

    super.init();
    this.bindFilters();

    try {
      this.products = await this.bicycleService.getBicycles();
      this.render();
    } catch (error) {
      this.catalog.dataset.state = "static";
    }
  }

  bindFilters() {
    this.filters.forEach((button) => {
      this.listen(button, "click", () => {
        this.activeCategory = button.dataset.filter;
        this.filters.forEach((filter) => {
          filter.setAttribute("aria-pressed", String(filter === button));
        });
        this.render();
      });
    });
  }

  render() {
    const visibleProducts = this.activeCategory === "todas"
      ? this.products
      : this.products.filter((product) => product.category === this.activeCategory);

    this.catalog.innerHTML = visibleProducts.map((product) => this.createCard(product)).join("");
  }

  createCard(product) {
    const features = product.features.map((feature) => `<li>${feature}</li>`).join("");
    const image = this.bicycleService.resolveAssetPath(product.image);

    return `
      <article class="card product-card">
        <img class="card__image" src="${image}" alt="${product.name}" loading="lazy">
        <div class="card__body">
          <span class="tag">${product.status}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <ul class="feature-list">${features}</ul>
          <strong class="product-card__price">${product.price}</strong>
        </div>
      </article>
    `;
  }
}
