import '@testing-library/jest-dom';

// Global localStorage mock for Node 26 compatibility in JSDOM
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  get length() {
    return Object.keys(this.store).length;
  }
  key(index) {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  value: new LocalStorageMock(),
  writable: true,
});

// Mock window.scrollTo
window.scrollTo = () => {};
