/*
  Base component class with lifecycle and event cleanup support.
*/

import { dom } from "../utils/dom.js";

export default class Component {
  constructor(root = document) {
    this.root = root;
    this.cleanups = [];
    this.isInitialized = false;
  }

  init() {
    this.isInitialized = true;
  }

  destroy() {
    this.cleanups.forEach((cleanup) => cleanup());
    this.cleanups = [];
    this.isInitialized = false;
  }

  listen(element, eventName, handler, options) {
    this.cleanups.push(dom.on(element, eventName, handler, options));
  }

  select(selector, parent = this.root) {
    return dom.select(selector, parent);
  }

  selectAll(selector, parent = this.root) {
    return dom.selectAll(selector, parent);
  }
}
