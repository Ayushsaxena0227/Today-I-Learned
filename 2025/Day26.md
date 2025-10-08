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
