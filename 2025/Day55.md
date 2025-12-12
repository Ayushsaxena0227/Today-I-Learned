. JavaScript Modules: ES6 vs. CommonJS
Concept: Understanding the two primary ways to import and export code in the JavaScript ecosystem.

What It Is: You can't put all your code in one file. Modules let you split your code into logical, reusable pieces.

ES6 Modules (ESM): import / export

This is the modern, standard way to do modules in JavaScript, both in the browser and in Node.js.
It's static: you can't dynamically decide what to import inside an if statement (though you can use dynamic import() for that). This allows bundlers like Webpack/Vite to perform "tree-shaking."
Tree-shaking: If you only import { useA } from './hooks' but the file also exports useB and useC, the bundler is smart enough to remove useB and useC from the final production code, making your app smaller.
Syntax: export const myVar = ...; and import { myVar } from './file';
CommonJS (CJS): require / module.exports

This is the original module system of Node.js. You will see it everywhere in older Node.js projects, config files (webpack.config.js, tailwind.config.js), and many backend codebases.
It's dynamic: you can require a file inside a function or an if block.
Syntax: module.exports = { myVar: ... }; and const { myVar } = require('./file');
What Interviewers Expect:

Spot the Difference: They will show you code and ask, "Is this using ES6 Modules or CommonJS?" You need to instantly recognize import/export vs. require/module.exports.
What is Tree-Shaking? "Can you explain what tree-shaking is and why it's a benefit of ES6 modules?" You should explain the concept of eliminating unused code from the final bundle and link it to the static nature of import/export.
Named vs. Default Exports: A common ES6 question. "What is the difference between a named export and a default export?"
Named: export const a; You can have many per file. You must import it with the exact same name in curly braces: import { a } from './file';.
Default: export default a; You can only have one per file. You can import it with any name you want, without braces: import myCustomName from './file';.
Why it matters: You will constantly be working in codebases that use one or both of these systems. Understanding them is as fundamental as knowing what a function or a variable is.

28. Error Handling - The Full Picture
    Concept: Moving beyond console.log(error) to a robust, user-friendly error strategy.

What It Is: Errors will happen. A professional app handles them gracefully. There are two main types of errors:

Expected Errors: Things you can anticipate. Example: User submits a form with an invalid email (400 Bad Request from the API).
Unexpected Errors: Things you can't anticipate. Example: A third-party API is down (503 Service Unavailable), or there's a bug in your code that throws a runtime exception.
A complete strategy involves:

Catching Errors: Using try...catch for synchronous code and .catch() or try...catch with async/await for asynchronous code.
Informing the User: Don't just show a broken page. Show a friendly message like, "Sorry, we couldn't load your profile. Please try again later."
Logging Errors: For unexpected errors, you must log them to a service (like Sentry, LogRocket, or Datadog). This alerts your team that something is wrong so you can fix it. console.log is useless once the code is in production.
Error Boundaries (React Specific): A special React component that catches JavaScript errors anywhere in its child component tree. It prevents a single buggy component from crashing your entire application. Instead, it can display a fallback UI.
What Interviewers Expect:

try...catch with async/await: This is a must-know. "How do you handle errors with async/await?" The answer is to wrap your await calls in a try...catch block.
Error Boundaries: "What is an Error Boundary and what problem does it solve?" You should explain that it's a class component (or can be implemented with a library for hooks) that uses componentDidCatch to catch runtime errors in its children, preventing a whole-app crash.
Your Error Handling Philosophy: "An API call fails. Describe what your code should do."
The catch block is triggered.
Set an error state (setError('Something went wrong')).
The UI re-renders to show the error message to the user.
(For unexpected errors) Call a logging service like Sentry.captureException(error) to report the bug.
Why it matters: Flawless error handling is a hallmark of a senior developer. It directly impacts user trust and your team's ability to maintain the application.

29. Browser Storage Explained
    Concept: localStorage, sessionStorage, and Cookies. Knowing which to use and when.

What It Is: The browser gives you several ways to store data on a user's machine. They have very different use cases and security implications.

localStorage:

Persistence: Stays forever, until the user clears their browser data or your code removes it.
Scope: Available across all tabs and windows for a given origin (e.g., your-app.com).
Capacity: ~5MB.
Use Case: Storing user preferences that should last, like theme: 'dark' or a user's saved cart in an e-commerce site before they log in. Not for sensitive data like tokens.
sessionStorage:

Persistence: Gone as soon as the user closes the tab.
Scope: Only available in the current tab. A new tab for the same site will have a separate sessionStorage.
Capacity: ~5MB.
Use Case: Storing temporary data for a specific user session, like data for a multi-step form. If the user refreshes, the data is still there, but if they close the tab and come back, it's gone.
Cookies:

Persistence: You set an expiration date.
Scope: Available across all tabs and windows for a given origin.
Capacity: Very small, ~4KB.
Key Feature: Sent to the server automatically with every single HTTP request. This is their main purpose.
Use Case: Storing session identifiers or authentication tokens (especially in an httpOnly cookie for security).
What Interviewers Expect:

Compare and Contrast: The most common question is "Explain the differences between localStorage, sessionStorage, and Cookies." You need to hit on Persistence, Scope, and whether it's sent to the server.
Choose the Right Tool: "You want to save the contents of a user's shopping cart before they log in. What would you use?" Answer: localStorage, because you want it to persist even if they close the tab and come back later.
Security Implications (revisited): "Why shouldn't you store a JWT in localStorage?" Answer: Because it's accessible via JavaScript, making it vulnerable to XSS attacks where a script could steal the token.
