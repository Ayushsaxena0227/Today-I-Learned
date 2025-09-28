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
