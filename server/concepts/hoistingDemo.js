/**
 * ==============================================================
 * CONCEPT: JavaScript Hoisting
 * ==============================================================
 * Run: node server/concepts/hoistingDemo.js
 *
 * Hoisting is JavaScript's behavior of moving declarations to
 * the top of their scope during the compilation phase, before
 * code execution.
 *
 * This script demonstrates three aspects:
 * 1. `var` hoisting — declaration is hoisted, value is undefined
 * 2. Function declaration hoisting — fully hoisted (callable before definition)
 * 3. `let`/`const` temporal dead zone — hoisted but NOT initialized
 * ==============================================================
 */

console.log("=== Zenugo AI — Hoisting Demo ===\n");

// ──────────────────────────────────────────────
// DEMO 1: var hoisting
// ──────────────────────────────────────────────
// `var` declarations are hoisted to the top of their function scope.
// The declaration is hoisted, but the assignment stays in place.
// So accessing the variable before assignment gives `undefined`.

function demonstrateVarHoisting() {
  console.log("1. [VAR HOISTING] Value before assignment:", appName);
  // At this point, `var appName` is hoisted but equals undefined

  var appName = "Zenugo AI";

  console.log("   [VAR HOISTING] Value after assignment:", appName);
  return appName;
}

demonstrateVarHoisting();

// ──────────────────────────────────────────────
// DEMO 2: Function declaration hoisting
// ──────────────────────────────────────────────
// Function declarations are fully hoisted — both the name AND
// the function body. This means you can call a function before
// its declaration appears in the source code.

console.log("\n2. [FUNCTION HOISTING] Calling before declaration:", getWelcomeMessage());

function getWelcomeMessage() {
  return "Welcome to Zenugo AI — function declarations are fully hoisted!";
}

// ──────────────────────────────────────────────
// DEMO 3: let/const temporal dead zone (TDZ)
// ──────────────────────────────────────────────
// `let` and `const` are hoisted but NOT initialized.
// Accessing them before declaration throws a ReferenceError.
// The zone between the start of the scope and the declaration
// is called the "temporal dead zone" (TDZ).

function demonstrateTemporalDeadZone() {
  try {
    // This will throw ReferenceError because `userRole` is in the TDZ
    console.log("\n3. [TDZ] Attempting to access `let` before declaration...");
    console.log(userRole); // ReferenceError
  } catch (error) {
    console.log("   [TDZ] Caught Error:", error.message);
    console.log("   [TDZ] `let` and `const` are hoisted but not initialized — this is the Temporal Dead Zone.");
  }

  let userRole = "wellness-user";
  console.log("   [TDZ] Value after declaration:", userRole);
}

demonstrateTemporalDeadZone();

console.log("\n=== Hoisting Demo Complete ===");
console.log("Summary:");
console.log("  - `var` declarations are hoisted but initialized as undefined");
console.log("  - Function declarations are fully hoisted (name + body)");
console.log("  - `let`/`const` are hoisted but remain in the Temporal Dead Zone until declared");
