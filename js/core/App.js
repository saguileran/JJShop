/*
  Application bootstrapper that registers independent UI components.
*/

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import FAQ from "../components/FAQ.js";
import Gallery from "../components/Gallery.js";
import ProductCatalog from "../components/ProductCatalog.js";
import ContactForm from "../components/ContactForm.js";
import AnimationController from "../components/AnimationController.js";
import StorageManager from "../services/StorageManager.js";
import BicycleService from "../services/BicycleService.js";

export default class App {
  constructor(documentRoot = document) {
    this.root = documentRoot;
    this.components = [];
    this.storage = new StorageManager("bicicletas-andina");
    this.bicycleService = new BicycleService();
  }

  register(component) {
    this.components.push(component);
  }

  init() {
    this.register(new Navbar(this.root));
    this.register(new Footer(this.root));
    this.register(new FAQ(this.root));
    this.register(new Gallery(this.root));
    this.register(new ProductCatalog(this.root, this.bicycleService));
    this.register(new ContactForm(this.root, this.storage));
    this.register(new AnimationController(this.root));

    this.components.forEach((component) => component.init());
  }
}
