/*
  Small localStorage wrapper with graceful failure handling.
*/

export default class StorageManager {
  constructor(namespace) {
    this.namespace = namespace;
  }

  get(key) {
    try {
      const value = window.localStorage.getItem(this.getKey(key));
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  set(key, value) {
    try {
      window.localStorage.setItem(this.getKey(key), JSON.stringify(value));
    } catch {
      return false;
    }

    return true;
  }

  remove(key) {
    try {
      window.localStorage.removeItem(this.getKey(key));
    } catch {
      return false;
    }

    return true;
  }

  getKey(key) {
    return `${this.namespace}:${key}`;
  }
}
