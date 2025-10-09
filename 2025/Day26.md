Example 1 – E‑commerce: Product Card
Parent → Child:
The product list (parent) gives each ProductCard (child) its data.

React

// Parent: renders a list of products
import ProductCard from "./ProductCard";

export default function ProductList() {
const products = [
{ id: 1, name: "Laptop", price: 899 },
{ id: 2, name: "Headphones", price: 199 },
];

return (

<div>
<h1>Our Products</h1>
{products.map(p => (
<ProductCard key={p.id} name={p.name} price={p.price} />
))}
</div>
);
}
Child:

React

export default function ProductCard({ name, price }) {
return (

<div style={{ border: "1px solid gray", padding: "10px", margin: "6px" }}>
<h3>{name}</h3>
<p>Price: ${price}</p>
</div>
);
}
💬 Here, the parent knows all the products; each child card only needs its own slice (name + price).

📧 Example 2 – Social app: Message Bubble
Parent

React

import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
const userMessage = {
sender: "Alice",
text: "Meet me at 6 PM?",
time: "5:42 PM"
};

return (

<div>
<h1>Chat</h1>
<MessageBubble
        sender={userMessage.sender}
        text={userMessage.text}
        time={userMessage.time}
      />
</div>
);
}
Child

React

export default function MessageBubble({ sender, text, time }) {
return (

<div style={{ background: "#e9f7ff", borderRadius: "8px", padding: "8px" }}>
<strong>{sender}</strong> · <span>{time}</span>
<p>{text}</p>
</div>
);
}
💬 ChatWindow knows all message details; MessageBubble just displays them neatly.

🌡️ Example 3 – Weather App: Temperature Display
Parent

React

import TemperatureDisplay from "./TemperatureDisplay";

export default function WeatherApp() {
const temperature = 28; // degrees Celsius
const city = "Delhi";

return (

<div>
<h1>Weather Report</h1>
<TemperatureDisplay city={city} temp={temperature} />
</div>
);
}
Child

React

export default function TemperatureDisplay({ city, temp }) {
return (

<p>
🌤️ Current temperature in <strong>{city}</strong> is <strong>{temp}°C</strong>
</p>
);
}
💬 The parent fetches weather data; the child displays it nicely.

💡 Key takeaway
In every example:

The parent owns the data (arrays, objects, API responses).
The child receives relevant pieces via props.
Props are read‑only: children can use them, but not change them.
1️⃣ How re‑renders flow
When a parent component re‑renders:

React re‑executes that parent’s function,
creates new element descriptions (<Child …/>),
and calls the child component again.
So by default, all children within that parent’s JSX tree re‑render whenever the parent does — even if their props didn’t change.

⚙️ Example
React

function Parent() {
const [count, setCount] = useState(0);
return (

<div>
<button onClick={() => setCount(count + 1)}>Increase</button>
<Child name="Alice" />
</div>
);
}
Clicking the button changes count, making the parent re‑render.
React will also call Child again, even though name="Alice" hasn’t changed.

🪄 2️⃣ Optimize with React.memo
Wrap your child component with React.memo() so React will skip re‑rendering it if its props are the same as last time.

React

const Child = React.memo(function Child({ name }) {
console.log("Child render");
return <h3>Hello {name}</h3>;
});
Now, each click on the button that only changes count won’t re‑run Child.
React compares the new props with old props using a shallow comparison — if they’re identical, it reuses the previous result.

Output in console:

text

Child render ← printed only once
No wasted re‑renders.

⚙️ 3️⃣ Memoize functions and objects (parent side)
If you pass objects or functions as props, React sees new references every render, even if their contents are the same.

JavaScript

<Child data={{ name: "Alice" }} /> // new object each render ❌
<Child onClick={() => doSomething()} /> // new function each render ❌
Use useMemo or useCallback to stabilize those references so React.memo can detect “no real change.”

React

function Parent() {
const data = useMemo(() => ({ name: "Alice" }), []);
const handleClick = useCallback(() => console.log("clicked"), []);

return <Child data={data} onClick={handleClick} />;
}
Now the “same” object and callback are reused between renders.
Children wrapped in React.memo won’t rerender unless those memos change.

🧩 4️⃣ Selective re‑rendering via component splitting
Sometimes you don’t need to wrap things in React.memo.
You can simply split big parents into smaller ones so changes are localized.

React

function Parent() {
return (
<>
<Counter /> {/_ re-renders often _/}
<StaticBanner /> {/_ never depends on counter _/}
</>
);
}
Only Counter re‑renders when its state changes; StaticBanner stays intact.

🌀 5️⃣ One-liner recap
Issue Solution
Parent re‑renders cause children to re‑render Wrap child in React.memo()
Child receives new object/function props each render Memoize props using useMemo / useCallback
Parent contains unrelated components Split into smaller components
Props frequently change anyway Accept the rerender (React is fast!)
🚀 6️⃣ Final take‑away mental model
React re‑renders when data it depends on changes.
React.memo + useMemo + useCallback help you tell React,
“Don’t bother re‑drawing this; nothing truly changed.”

et’s go carefully through what unmounting means, why it happens, and why you sometimes need to handle it in useEffect.

🧠 1️⃣ What “unmount” actually means
In React, there’s a complete lifecycle for each component:

Mount: the component is created and inserted into the DOM.
Update: its state or props change and it re‑renders.
Unmount: it’s removed from the DOM (React deletes it).
So “unmounting” = the moment React cleans up and removes your component from the page.

Example:
Imagine you have this small app:

React

{showProfile && <UserProfile />}
When showProfile is true, UserProfile mounts.
When showProfile becomes false, React removes it → unmounts that component.
⚙️ 2️⃣ Why we care about unmounting
Unmounting by itself is automatic; React removes elements efficiently.

But you may need to handle cleanup manually when your component created some side effects while it was alive.

Typical cleanup situations
Side effect you created Why cleanup matters
setInterval or setTimeout Otherwise those timers keep running forever in the background
Subscribed to a WebSocket or event listener You don’t want events firing for a component that’s gone
Start a network request You might need to cancel or ignore the response if it comes after unmount
Added global CSS class or DOM manipulation Need to undo those alterations
Without cleanup, your app can leak memory, send duplicate network requests, or attempt to update non‑existent components (which causes “state updates on unmounted component” warnings).

🔧 3️⃣ How to handle unmounting with useEffect
useEffect can return a cleanup function.
React calls that cleanup right before the component unmounts
(or before the effect runs again on updates).

Example:

React

useEffect(() => {
console.log("Component mounted");

// set up an interval
const intervalId = setInterval(() => console.log("running..."), 1000);

// 👇 cleanup runs when component unmounts
return () => {
clearInterval(intervalId);
console.log("Component unmounted, interval cleared");
};
}, []); // only mount & unmount because deps = []
When the component disappears, React calls that inner function — your cleanup runs, freeing resources.

💡 4️⃣ When do components unmount in real apps?
Navigating away from a route
Conditional rendering toggles ({show && <Comp/>})
Parent re‑renders with fewer children
Components being replaced by others in lists
Essentially, anytime its parent stops including it in the rendered tree.

🧩 5️⃣ Tiny analogy
Think of mounting and unmounting like plugging in and unplugging a gadget.

While it’s plugged in, it might:

use electricity (timers, listeners, subscriptions)
When you unplug (unmount):

you must stop those background activities; otherwise electricity keeps flowing and wastes power → memory leaks in programming terms.
✅ In short
Unmount = React removes the component from the DOM.
You don’t trigger it manually; it happens when the component is no longer rendered.
You should clean up any side‑effects your component created (timers, event listeners, etc.) in a return () => {...} cleanup function inside useEffect.
