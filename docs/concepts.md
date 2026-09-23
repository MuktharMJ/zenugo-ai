# Zenugo AI — Academic Concepts Documentation

This document provides exact file locations, code functions/queries, and concise 2–4 sentence viva explanations for all six academic concepts implemented in Zenugo AI.

---

## 1. JavaScript — async/await

- **File Path**: `client/src/components/Navbar/Navbar.jsx` (and `client/src/services/authService.js`)
- **Implementation**: `handleLogout()` in `Navbar.jsx` & `fetchUserProfile()` in `authService.js`

### Code Snippet (`Navbar.jsx`)
```javascript
const handleLogout = async () => {
  setMobileOpen(false);
  try {
    await logout();
    navigate('/', { replace: true });
  } catch (error) {
    console.error('Logout failed:', error);
    navigate('/', { replace: true });
  }
};
```

### Viva Explanation
> "This function uses `async/await` with an explicit `try/catch` block to handle asynchronous user logout cleanly. Marking the handler `async` allows using `await` to pause execution until the `logout()` Promise resolves or rejects. The `try/catch` block guarantees robust error handling so any network failure during logout is caught, logged, and gracefully handled with fallback navigation."

---

## 2. JavaScript — Promises vs Callbacks

- **File Path**: `client/src/utils/asyncPatterns.js`
- **Implementation**: `loadPreferenceCallback()`, `savePreferencePromise()`, `updatePreferenceWithChain()`, `loadPreferenceWithFallback()`

### Code Snippet (`asyncPatterns.js`)
```javascript
// Promise chaining with .then() and .catch() demonstrating error propagation
export function updatePreferenceWithChain(key, value) {
  return savePreferencePromise(key, value)
    .then((savedResult) => {
      return {
        success: true,
        data: savedResult,
        updatedAt: new Date().toISOString()
      };
    })
    .catch((error) => {
      // Error propagation: catches errors thrown from savePreferencePromise or .then
      console.error(`[asyncPatterns] Preference update failed for key "${key}":`, error.message);
      throw new Error(`Failed to update preference [${key}]: ${error.message}`);
    });
}
```

### Viva Explanation
> "Callbacks pass a function `(error, result)` that is executed after asynchronous completion, which can lead to callback hell when nested. Promises represent future asynchronous values that can be cleanly chained using `.then()` for sequential transformations and `.catch()` for centralized error propagation. Any rejection upstream automatically cascades down the chain to the `.catch()` handler."

---

## 2b. JavaScript — Closures

- **File Path**: `client/src/components/Footer/Footer.jsx`
- **Implementation**: `createSmoothScrollHandler(targetId)`

### Code Snippet (`Footer.jsx`)
```javascript
const createSmoothScrollHandler = (targetId) => {
  return (e) => {
    // Inner function captures targetId and location from outer lexical scope
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
};
```

### Viva Explanation
> "A closure is formed when an inner function retains access to variables in its outer lexical scope even after the outer function has finished executing. Here, `createSmoothScrollHandler` is a factory function that takes `targetId` and returns a click event handler. The returned function forms a closure preserving `targetId` in memory, ensuring that when the user clicks 'Features' or 'AI Chat', the correct element ID is accessed without stale state or global variables."

---

## 2c. Client-side Routing — Protected Routes

- **File Path**: `client/src/App.jsx` & `client/src/components/ProtectedRoute/ProtectedRoute.jsx`
- **Implementation**: `<ProtectedRoute><ContactPage /></ProtectedRoute>` & `<ProtectedRoute><ChatPage /></ProtectedRoute>`

### Code Snippet
```jsx
// App.jsx — Route Configuration
<Route
  path="/contact"
  element={
    <ProtectedRoute>
      <ContactPage />
    </ProtectedRoute>
  }
/>

// ProtectedRoute.jsx — Auth Guard
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="auth-loading"><div className="auth-loading__spinner" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
```

### Viva Explanation
> "Client-side route protection guards private application routes by wrapping protected page components in a higher-order `<ProtectedRoute>` component in the React Router configuration. `ProtectedRoute` consumes authentication state from `AuthContext` via `useAuth()`. If no authenticated user exists (`!user`), it redirects unauthenticated users to `/login` via `<Navigate replace />`, preventing unauthorized access while preserving smooth single-page application navigation."

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
