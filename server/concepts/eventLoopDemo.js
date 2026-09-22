/**
 * ==============================================================
 * CONCEPT: JavaScript Event Loop
 * ==============================================================
 * Run: node server/concepts/eventLoopDemo.js
 *
 * This script demonstrates how JavaScript's event loop processes
 * different types of tasks:
 *
 * 1. SYNCHRONOUS CODE — Executes immediately on the call stack.
 * 2. MICROTASKS (Promise.resolve().then()) — Queued in the
 *    microtask queue, processed after the current call stack
 *    clears but BEFORE any macrotasks.
 * 3. MACROTASKS (setTimeout) — Queued in the task queue,
 *    processed after microtasks are drained.
 *
 * Expected output order:
 *   1. [SYNC] Start — Zenugo AI Event Loop Demo
 *   2. [SYNC] End — Synchronous code finished
 *   3. [MICROTASK] Promise resolved — User session validated
 *   4. [MICROTASK] Chained Promise — Profile data ready
 *   5. [MACROTASK] setTimeout — Analytics event dispatched
 * ==============================================================
 */

console.log("=== Zenugo AI — Event Loop Demo ===\n");

// 1. Synchronous — runs first (call stack)
console.log("1. [SYNC] Start — Zenugo AI Event Loop Demo");

// 2. Macrotask — setTimeout goes into the task/macrotask queue
// Even with 0ms delay, it runs AFTER all microtasks
setTimeout(() => {
  console.log("5. [MACROTASK] setTimeout — Analytics event dispatched");
  console.log("\n=== Demo Complete ===");
  console.log("Order: Sync → Microtasks → Macrotasks");
  console.log("The event loop always drains microtasks before processing the next macrotask.");
}, 0);

// 3. Microtask — Promise.resolve().then() goes into the microtask queue
// Microtasks run AFTER synchronous code but BEFORE setTimeout
Promise.resolve("session-valid").then((status) => {
  console.log(`3. [MICROTASK] Promise resolved — User session validated (${status})`);
});

// 4. Another microtask — chained Promise
Promise.resolve()
  .then(() => {
    return "profile-loaded";
  })
  .then((data) => {
    console.log(`4. [MICROTASK] Chained Promise — Profile data ready (${data})`);
  });

// 5. Synchronous — still on the call stack
console.log("2. [SYNC] End — Synchronous code finished");
