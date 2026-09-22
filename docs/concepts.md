# Zenugo AI — Academic Concepts Documentation

This document provides exact file locations, code functions/queries, and concise 2–4 sentence viva explanations for all six academic concepts implemented in Zenugo AI.

---

## 1. JavaScript — async/await

- **File Path**: `client/src/services/authService.js` (used in `client/src/context/AuthContext.jsx`)
- **Implementation**: `fetchUserProfile()`

### Code Snippet
```javascript
export async function fetchUserProfile() {
  try {
    const response = await getMe();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
}
```

### Viva Explanation
> "This function uses `async/await` to handle asynchronous HTTP calls cleanly without callback nesting. Declaring a function with `async` ensures it returns a Promise, while the `await` keyword pauses execution until the inner Promise resolves. The surrounding `try/catch` block captures network or server errors synchronously within asynchronous flow."

---

## 2. JavaScript — Promises vs Callbacks

- **File Path**: `client/src/utils/asyncPatterns.js`
- **Implementation**: `loadPreferenceCallback()`, `savePreferencePromise()`, `loadPreferencePromisified()`

### Code Snippet
```javascript
// Callback-based pattern
export function loadPreferenceCallback(key, callback) {
  setTimeout(() => {
    try {
      const value = localStorage.getItem(`zenugo_pref_${key}`);
      callback(null, value);
    } catch (error) {
      callback(error, null);
    }
  }, 100);
}

// Promise-based pattern
export function savePreferencePromise(key, value) {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error("Preference key is required"));
    try {
      localStorage.setItem(`zenugo_pref_${key}`, value);
      resolve({ key, value });
    } catch (error) {
      reject(error);
    }
  });
}
```

### Viva Explanation
> "Callbacks are functions passed as arguments that execute once an async operation finishes, following Node.js `(error, result)` convention. Promises represent the eventual completion or failure of an asynchronous operation using explicit `resolve()` and `reject()` handlers. Unlike callbacks, Promises avoid callback hell, support chaining (`.then()`), and serve as the foundation for `async/await`."

---

## 3. JavaScript — Event Loop

- **File Path**: `server/concepts/eventLoopDemo.js`
- **Implementation**: Runnable demonstration script (`node server/concepts/eventLoopDemo.js`)

### Code Snippet
```javascript
console.log("1. [SYNC] Start");

setTimeout(() => {
  console.log("5. [MACROTASK] setTimeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("3. [MICROTASK] Promise resolved");
});

console.log("2. [SYNC] End");
```

### Viva Explanation
> "The JavaScript event loop processes synchronous code first on the call stack. When asynchronous operations occur, Promise callbacks are pushed to the microtask queue, while `setTimeout` callbacks go to the macrotask queue. Microtasks are completely drained before the event loop processes the next macrotask, ensuring microtasks run before timer callbacks even with 0ms timers."

---

## 4. JavaScript — Hoisting

- **File Path**: `server/concepts/hoistingDemo.js`
- **Implementation**: Runnable demonstration script (`node server/concepts/hoistingDemo.js`)

### Code Snippet
```javascript
// Function declaration hoisting
getWelcomeMessage(); // Callable before declaration
function getWelcomeMessage() {
  return "Welcome to Zenugo AI";
}

// var vs let/const hoisting
function demonstrateVarHoisting() {
  console.log(appName); // undefined (declaration hoisted, assignment stays)
  var appName = "Zenugo AI";
}
```

### Viva Explanation
> "Hoisting is JavaScript's default behavior of moving declarations to the top of their scope before execution. Function declarations are fully hoisted with their implementation, allowing them to be called before definition. Variables declared with `var` are hoisted but initialized to `undefined`, whereas `let` and `const` remain in the Temporal Dead Zone (TDZ) and throw a ReferenceError if accessed prior to declaration."

---

## 5. Relational Schema Design with PK/FK

- **File Path**: `server/postgres/schema.sql`
- **Implementation**: Relational model for `users` and `conversations`

### SQL Schema
```sql
CREATE TABLE users (
    id       SERIAL       PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,
    email    VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE conversations (
    id       SERIAL       PRIMARY KEY,
    user_id  INTEGER      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title    VARCHAR(200) NOT NULL
);
```

### Viva Explanation
> "This PostgreSQL schema models a one-to-many relationship between users and conversations using relational constraints. The `id` column acts as a `PRIMARY KEY` guaranteeing row uniqueness, while `user_id` in `conversations` is a `FOREIGN KEY` that `REFERENCES users(id)`. Constraints like `NOT NULL` and `UNIQUE` preserve data integrity and enforce schema rules at the database level."

---

## 6. SQL JOINS

- **File Path**: `server/postgres/queries.sql` (and `server/postgres/postgresClient.js`)
- **Implementation**: Executable `INNER JOIN` and `LEFT JOIN` queries

### SQL Queries
```sql
-- INNER JOIN: returns matching records from both tables
SELECT users.name, conversations.title
FROM users
INNER JOIN conversations ON users.id = conversations.user_id;

-- LEFT JOIN: returns all records from left table (users) and matching right records
SELECT users.name, conversations.title
FROM users
LEFT JOIN conversations ON users.id = conversations.user_id;
```

### Viva Explanation
> "An `INNER JOIN` returns only records where matching foreign key keys exist in both joined tables (e.g., users who have conversations). A `LEFT JOIN` retrieves all rows from the left table (`users`) regardless of whether a matching record exists in the right table (`conversations`), producing `NULL` for missing right-side attributes. These JOIN operations allow efficient relational queries across normalized tables."
