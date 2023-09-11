// localStorage.js

/**
 * Saves the data to local storage.
 * @param {string} key - The key to store the data under.
 * @param {any} value - The value to store.
 */
export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Loads data from local storage.
 * @param {string} key - The key to retrieve data from.
 * @returns {any} - The retrieved data, or null if not found.
 */
export function loadFromLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 * Removes data from local storage.
 * @param {string} key - The key to remove data from.
 */
export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}
