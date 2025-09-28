. Event Loop & Call Stack
Call stack → where JS keeps track of what function is currently executing.
Event loop → mechanism that allows JS (single‑threaded) to handle async tasks.
Flow:
All synchronous code runs first, line by line.
Async tasks (timers, fetch, promises) get offloaded.
Once the stack is empty, the event loop takes callbacks from the callback/microtask queue and pushes them into the stack.
👉 Example:

JavaScript

console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
Order: A → D → C → B ✨
(reason: Promise.then (microtask queue) has higher priority than setTimeout (callback queue)).

🔎 2. Closures & Scope
Scope = defines access of variables (block scope with let/const, function scope with var).
Closure = when an inner function “remembers” variables from its outer function, even after the outer function has returned.
👉 Example:

JavaScript

function outer() {
let count = 0;
return function inner() {
count++;
return count;
};
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
inner() still remembers count → closure.

Closures are the core of data hiding, encapsulation, currying, event listeners.

🔎 3. Promises vs Async/Await
Promise = object representing eventual result of async operation.
States = pending → fulfilled / rejected.
JavaScript

fetch("url")
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
Async/Await = syntactic sugar on top of promises, makes async code look synchronous.
JavaScript

async function getData() {
try {
const res = await fetch("url");
const data = await res.json();
console.log(data);
} catch (err) {
console.error(err);
}
}
👉 Under the hood, still promises. Just cleaner syntax.

🔎 4. Prototypes & Inheritance
JS objects have an internal property [[Prototype]] (can be accessed with **proto**).
Functions in JS are also objects with a prototype property.
Prototype Chain: If you try to access a property/method on an object and it’s not found, JS looks up the chain.
👉 Example:

JavaScript

function Person(name) {
this.name = name;
}
Person.prototype.sayHi = function() {
console.log(`Hi, I'm ${this.name}`);
};

const p = new Person("Alice");
p.sayHi(); // Hi, I'm Alice
sayHi isn’t on p but is found in Person.prototype.

⚡ In ES6+, we use class syntax (but under the hood, still prototype‑based inheritance).

🔎 5. Array Methods
These are powerful higher‑order methods that interviewers always ask about:

map()
Transforms each element → returns new array, same length.
JavaScript

const nums = [1, 2, 3];
const doubled = nums.map(x => x \* 2);
console.log(doubled); // [2, 4, 6]
filter()
Returns elements that satisfy condition → new array, length ≤ original.
JavaScript

const nums = [1, 2, 3, 4];
const evens = nums.filter(x => x % 2 === 0);
console.log(evens); // [2, 4]
reduce()
Reduces array → single value (or object/array if you want).
Signature: (accumulator, currentValue) => newAccumulator
JavaScript

const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, val) => acc + val, 0);
console.log(sum); // 10
👉 Advanced usage: grouping, flattening, counting.

JavaScript

const words = ["apple", "banana", "apple"];
const counts = words.reduce((acc,w) => {
acc[w] = (acc[w] || 0) + 1;
return acc;
}, {});
// { apple: 2, banana: 1 }
✅ Summary for Your Interview
Event Loop/Call Stack: Understand sync vs async execution order.
Closures: Functions hold references to outer lexical scope.
Promises/Asyncawait: Both handle async; async/await = neat syntax.
Prototype chain: Inheritance in JS is prototype‑based.
map/filter/reduce: Higher order functions for transforms, filtering, and reducing to one val

<!-- 10000 items rendering in react -->

10,000 DOM elements walk into a browser,
Don’t Render What You Don’t Need
Virtualization / Windowing:
Only render the DOM nodes that are visible to the user. (React world: react-window, react-virtualized; plain JS frameworks sometimes use "infinite scrolling" techniques.) Instead of 10,000 actual elements, you may render just ~30 that stay on-screen and recycle them as the user scrolls.
This is usually the single biggest win.

Pagination or Chunking:
If virtualization isn’t possible (e.g. your layout’s complex), consider breaking down data into paginated chunks, loading just what’s necessary on demand.

2. Batch DOM Updates Instead of Death by a Thousand Cuts
   Minimize reflows/repaints:
   Group DOM mutations together instead of applying styles or element insertions in a loop.
   Example: build the big chunk of HTML in memory (document.createDocumentFragment) and inject it once instead of appending 10,000 items individually.

Use requestAnimationFrame:
If updates are visual/animated, schedule them in requestAnimationFrame so they sync with the browser’s rendering pipeline.

3. Use Efficient Component Rendering on the Frontend
   Diff intelligently:
   React, Vue, Svelte, etc. rely on virtual DOM / compiler optimizations. But even then, rendering 10,000 nodes is heavy. Memoization (React.memo, useMemo, etc.) ensures unchanged nodes aren’t constantly re-rendering.

Lazy mounting:
Don’t render subtrees of components until they’re actually visible or needed.

4. Consider Content Representation
   Canvas or WebGL rendering:
   For extremely high-volume visual elements (think charts, heatmaps, node graphs), sometimes it’s better not to use DOM at all. A <canvas> can render huge amounts of "things" much faster than thousands of DOM nodes.

Compact HTML structures:
If possible, use CSS tricks or pseudo-elements (::before/::after) instead of individual DOM nodes when elements are decorative.

5. Server-Side Rendering + Streaming
   If you must render so many items, SSR can send a pre-built chunk so the browser spends less time constructing from scratch. Combine it with hydration strategies like partial hydration where non-critical sections are left static.
6. Never Forget the Human Side
   Do users even need to see 10,000 items at once?
   Sometimes the purest optimization is a UX decision. Showing 10,000 items simultaneously is basically a Where’s Waldo puzzle for users—often, grouping, searching, or filtering is the better approach.
