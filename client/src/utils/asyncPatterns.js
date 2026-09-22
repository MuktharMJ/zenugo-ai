/**
 * ==============================================================
 * CONCEPT: Promises vs Callbacks
 * ==============================================================
 * This utility demonstrates two fundamental JavaScript async patterns:
 *
 * 1. CALLBACK PATTERN — The original async pattern in JavaScript.
 *    A function is passed as an argument and invoked when the
 *    async operation completes. Follows Node.js convention:
 *    callback(error, result).
 *
 * 2. PROMISE PATTERN — A modern alternative that returns a Promise
 *    object. Uses resolve() for success and reject() for failure.
 *    Promises can be chained with .then()/.catch() and consumed
 *    with async/await.
 *
 * These functions manage user wellness preferences in localStorage,
 * which is a real Zenugo AI feature concern.
 * ==============================================================
 */

// ──────────────────────────────────────────────
// CALLBACK-BASED: Load a user preference
// ──────────────────────────────────────────────
// The callback pattern passes a function that is called when the
// async work finishes. The first argument is an error (null if none),
// and the second is the result. This is the Node.js callback convention.

export function loadPreferenceCallback(key, callback) {
  // setTimeout simulates async I/O (e.g., reading from storage/network)
  setTimeout(() => {
    try {
      const value = localStorage.getItem(`zenugo_pref_${key}`);
      // callback(error, result) — null error means success
      callback(null, value);
    } catch (error) {
      // callback(error) — pass the error as the first argument
      callback(error, null);
    }
  }, 100);
}

// ──────────────────────────────────────────────
// PROMISE-BASED: Save a user preference
// ──────────────────────────────────────────────
// The Promise pattern returns a Promise object instead of accepting
// a callback. resolve() signals success, reject() signals failure.
// Promises are the foundation that async/await is built on top of.

export function savePreferencePromise(key, value) {
  return new Promise((resolve, reject) => {
    if (!key) {
      reject(new Error("Preference key is required"));
      return;
    }

    try {
      localStorage.setItem(`zenugo_pref_${key}`, value);
      resolve({ key, value, savedAt: new Date().toISOString() });
    } catch (error) {
      reject(error);
    }
  });
}

// ──────────────────────────────────────────────
// BRIDGE: Wrapping a callback in a Promise
// ──────────────────────────────────────────────
// This demonstrates how Promises wrap callbacks, which is exactly
// how async/await works under the hood — it consumes Promises,
// and Promises often wrap callback-based APIs.

export function loadPreferencePromisified(key) {
  return new Promise((resolve, reject) => {
    loadPreferenceCallback(key, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
}
