/*
  Loads bicycle catalog data from the static JSON file.
*/

export default class BicycleService {
  constructor(path = null) {
    this.path = path || this.resolveDataPath();
  }

  async getBicycles() {
    const response = await fetch(this.path);

    if (!response.ok) {
      throw new Error(`No se pudo cargar el catálogo: ${response.status}`);
    }

    return response.json();
  }

  resolveDataPath() {
    const isInPagesDirectory = window.location.pathname.includes("/pages/");
    return isInPagesDirectory ? "../data/bicycles.json" : "./data/bicycles.json";
  }

  resolveAssetPath(path) {
    const isInPagesDirectory = window.location.pathname.includes("/pages/");
    return isInPagesDirectory ? `../${path}` : `./${path}`;
  }
}
