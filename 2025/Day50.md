The "Can't-Live-Without" Interview List

1. JavaScript Fundamentals
   Concept: Closures, this, and The Event Loop

What It Is:

Closures: Inner function's ability to remember and access its outer function's scope, even after the outer function has finished executing.
this Keyword: A special keyword whose value is determined by how a function is called (simple call, method call, arrow function).
Event Loop: The model that allows JS (a single-threaded language) to handle asynchronous operations without freezing, using the Call Stack, Web APIs, and Microtask/Macrotask Queues.
What Interviewers Expect:

Practical Problems: Aapko for loop with setTimeout waala question (var vs let) aana chahiye.
Code Prediction: Aapko console.log(this) alag-alag scenarios mein predict karna aana chahiye. They will give you code snippets and ask for the output.
Asynchronous Flow: Aapko Promise.then() vs setTimeout(..., 0) waale code ka output batana aana chahiye (Microtask vs Macrotask).
Why it matters: Ye concepts prove karte hain ki aap JavaScript ko sirf use nahi karte, aap usko samajhte hain. It shows your debugging skills will be strong. 2. JavaScript ES6+ Features
Concept: map, filter, reduce, Destructuring, Spread/Rest Operator, async/await

What It Is: The modern syntax and methods you use every single day in React and Node.js.

Array Methods (map, filter, reduce): Functional ways to iterate and transform arrays without for loops.
Destructuring: Unpacking values from arrays or properties from objects into distinct variables.
Spread (...): Expanding an iterable (like an array or object) into individual elements.
Rest (...): Collecting multiple elements or arguments into a single array.
async/await: Syntactic sugar over Promises to write asynchronous code that looks synchronous and is easier to read.
What Interviewers Expect:

Fluency: Aapko inko use karke on-the-spot chote-mote problems solve karne aane chahiye. E.g., "Given an array of user objects, return an array of just their names." (Use .map). "Given an array of numbers, return their sum." (Use .reduce).
Difference between Spread and Rest: They will show you code and ask, "Yahan ... spread hai ya rest?" (Hint: Spread "expands", Rest "collects").
Error Handling in async/await: Aapko try...catch block ka importance batana aana chahiye. "What happens if an awaited promise rejects?" 3. React Core Concepts
Concept: Components, Props, State, and the Render Cycle

What It Is: The absolute foundation of React.

Components: Reusable UI building blocks.
Props: How parent components pass data down to child components (one-way data flow).
State (useState): A component's internal memory. When state changes, the component re-renders.
Render Cycle: The process: State change -> Re-render -> Virtual DOM comparison (Reconciliation) -> Actual DOM update.
What Interviewers Expect:

Lifting State Up: A classic design pattern question. "You have two sibling components that need to share data. How do you do it?" The answer is to lift
