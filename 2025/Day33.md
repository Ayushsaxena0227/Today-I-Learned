tep 1: What callbacks really are (in one line)
A callback is a function you give to another function so it can call it later.

Okay, again —
→ You don’t run it yourself right away; you hand it over to be run later, maybe after something finishes, like a delay, a server call, or a button click.

🧠 Let’s start easy – Synchronous (runs right away)
Example:

JavaScript

function welcomeUser(username, callback) {
console.log("Welcome, " + username);
// now run your provided function
callback();
}

function showDashboard() {
console.log("Opening dashboard...");
}

welcomeUser("Ava", showDashboard);
🧾 Output:

text

Welcome, Ava
Opening dashboard...
You passed showDashboard as data to another function, and it got called inside.
That’s all a callback really is.

🕐 Now let’s go real-world: Asynchronous
Imagine making an online order.

You: “I want a burger.” 🍔
Shop: “Cool—we’ll call you when it’s ready.” ☎️

→ That “call me when it’s ready” part = callback

Code:

JavaScript

console.log("Placing order...");

setTimeout(() => {
console.log("✅ Burger is ready!");
}, 2000); // pretend 2 seconds to cook

console.log("🤙 Doing something else while waiting...");
Output:

text

Placing order...
🤙 Doing something else while waiting...
✅ Burger is ready!
Here, the arrow function () => console.log("✅ Burger is ready!")
is our callback — passed into setTimeout, so JS can “call back” when 2 seconds pass.

🎬 Another realistic example — downloading data
Think about apps fetching your profile data from a server (takes time).
We’ll fake it using setTimeout.

JavaScript

function getUserData(callback) {
console.log("Fetching user data from server...");

setTimeout(() => {
const user = { name: "Ava", age: 25 };
console.log("✅ Data received!");
callback(user);
}, 2000);
}

function showUserProfile(user) {
console.log(`User Profile:\nName: ${user.name}\nAge: ${user.age}`);
}

getUserData(showUserProfile);
Output:

text

Fetching user data from server...
✅ Data received!
User Profile:
Name: Ava
Age: 25
Here:

getUserData starts an async operation.
We pass showUserProfile as a callback.
When the “data” arrives (2 sec later), it calls our callback and gives it the data.
That’s real‑world callback behavior — things like fetch, readFile, and setTimeout do this under the hood.

🌈 What’s happening behind the scenes
JS does not sit idle waiting 2 seconds (it’s single‑threaded).
It tells the browser: “Run this later after 2 seconds.”
Browser finishes its timer and drops your callback back into the event loop.
When your turn comes, JS runs it.

 → Remember the result of a function.
useCallback → Remember the function itself.
In short:

useMemo = “I remember what I got ✅”
useCallback = “I remember how I got it 🔁”

💻 1️⃣ Example — useMemo: Memorize Expensive Calculations
Imagine a large array filter or data transformation that takes noticeable time.
Without memoization, React runs that logic on every render, even if inputs haven’t changed.

React

import { useMemo, useState } from "react";

export default function ExpensiveList({ numbers }) {
  const [filter, setFilter] = useState(false);

  // ⏱️ Heavy computation: filter primes (just example)
  const primes = useMemo(() => {
    console.log("Calculating primes..."); // runs only when numbers change
    return numbers.filter(isPrime);
  }, [numbers]);

  return (
    <div>
      <button onClick={() => setFilter(!filter)}>
        Toggle Filter ({filter.toString()})
      </button>
      <ul>
        {primes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
🔍 Behavior:
useMemo runs that calculation only when numbers change.
React remembers (memoizes) the output of the callback.
On re‑renders (due to filter toggling, for instance), the expensive code won’t rerun.
Without useMemo: the filter(isPrime) recomputes every single render.
With useMemo: it caches and reuses the previous result.

💡 2️⃣ Example — useCallback: Memorize Function References
React function components re‑create all their functions on every render by default.

That means something like this:

React

function Parent() {
  const handleClick = () => console.log("clicked");
  return <Child onClick={handleClick} />;
}
creates a new handleClick every render.

If Child is wrapped in React.memo(), it still re‑renders because the prop (onClick) changed identity every time.

To fix that:
➡️ You memoize the function reference using useCallback.

React

import { useCallback, useState, memo } from "react";

const Child = memo(({ onClick }) => {
  console.log("Child rendered!");
  return <button onClick={onClick}>Click Me</button>;
});

export default function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); // stable reference between renders

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment count</button>
      <Child onClick={handleClick} />
    </div>
  );
}
🔍 Behavior:
handleClick keeps the same reference between renders (unless dependencies change).
React.memo(Child) sees the prop reference is the same → skips re‑rendering.
Performance improves in component trees with many memoized children.
🚀 When to Use
Situation	Hook to Use	Why
You have expensive computation returning a value (filter, sort, map, calculation)	useMemo	Avoid recomputing unnecessarily
You’re passing a callback function to a memoized child (React.memo, custom hooks, event handlers)	useCallback	Avoid re‑creating function identity
You need to memoize derived data (e.g., filteredList, totalPrice, sortedItems)	useMemo	Keeps derived data cached
You need to memoize event handlers or actions	useCallback	Keeps same handler instance
