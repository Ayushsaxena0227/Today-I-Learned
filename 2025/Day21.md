Why did React introduce Hooks?
Hooks were introduced in React 16.8 (early 2019) to solve three main problems:

Complex component logic
Class lifecycle methods (like componentDidMount, componentDidUpdate, etc.) often held multiple unrelated concerns in one place. Hooks let you split logic into independent, reusable functions (called custom hooks).

Stateful logic reuse
You used to need HOCs (higher-order components) or render props to share logic. Hooks eliminate those gymnastics.

Awkward this keyword
Remember forgetting to bind this? Hooks use plain functions, so no this drama.

So the guiding principle:

Hooks let you use React’s features (state, lifecycle, refs, context) in function components.

🧠 3️⃣ The Core Hooks (in depth)
Let’s break down the “standard library” first.

🪣 useState(initialValue)
Manages local state in a functional component.
Returns a state variable and a setter function.
React

const [count, setCount] = useState(0);
count → current state value.
setCount → triggers re-render with new state.
Every render gets its own snapshot of state.
State updates are asynchronous and batched by React.

👉 Example:

React

setCount(prev => prev + 1);
Using the functional updater form ensures correct updates if many state changes batch together.

⏱️ useEffect(callback, dependencies)
Handles side effects — anything that touches the outside world (API calls, DOM, timers, subscriptions, etc.)

React

useEffect(() => {
console.log("Mounted or count changed:", count);
return () => {
console.log("Cleanup on unmount or before re-run");
};
}, [count]);
Runs after render.
Dependencies array determines when it re-runs.
[] → run once (on mount/unmount)
[count] → run when count changes
Return a cleanup function to clean things on unmount.
🧭 useContext(MyContext)
Accesses the nearest <MyContext.Provider> value.

React

const theme = useContext(ThemeContext);
Re-renders when the context value changes. Great for global state like auth, language, or theme.

🧱 useReducer(reducer, initialState)
Alternative to useState for complex state logic.
Follows Redux-like pattern.

React

const [state, dispatch] = useReducer(reducer, { count: 0 });

function reducer(state, action) {
switch (action.type) {
case "increment": return { count: state.count + 1 };
case "decrement": return { count: state.count - 1 };
default: return state;
}
}
Then:

React

dispatch({ type: 'increment' });
Useful when state transitions depend on action types.

🧲 useRef(initialValue)
Persists mutable values that don’t trigger re-renders when changed.

React

const inputRef = useRef(null);

// focus input
inputRef.current.focus();
Refs can store DOM elements or mutable data (like timers, previous values, counters).

🧩 useMemo(callback, deps)
Memorizes computed values expensive to re‑calculate.

React

const double = useMemo(() => count \* 2, [count]);
Runs the function only when its dependencies change (optimization).

🧠 useCallback(callback, deps)
Memorizes a function definition to prevent unnecessary re‑creations (important for prop drilling or useEffect dependencies).

React

const increment = useCallback(() => setCount(c => c + 1), []);
🧪 useLayoutEffect
Like useEffect, but fires synchronously after all DOM mutations.
Use only when you must measure or manipulate the DOM before the browser repaints (rare).

🧩 useImperativeHandle
Customizes what refs expose when using forwardRef. Used mostly in library code.

🧰 4️⃣ Custom Hooks
You can compose your own hooks:
Any function that starts with use and calls other hooks inside is a “custom hook”.

Example — a simple useFetch:

React

import { useState, useEffect } from "react";

export function useFetch(url) {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetch(url)
.then(res => res.json())
.then(json => setData(json))
.finally(() => setLoading(false));
}, [url]);

return { data, loading };
}
Use it anywhere:

React

const { data, loading } = useFetch("/api/users");
⚖️ 5️⃣ Hook Rules (most common mistakes!)
React enforces strict rules for predictability:

🧩 Rule 1: Only call hooks at top level
Don’t call hooks inside loops, conditions, or nested functions.
Why? React relies on call order to map state/effects to components.
✅ Good:

React

const [count, setCount] = useState(0);
❌ Bad:

React

if (someCondition) {
const [count, setCount] = useState(0); // NO
}
🧩 Rule 2: Only call hooks from React components or custom hooks
Don’t call hooks from regular JS functions.
✅ Good:

React

function MyComponent() {
useState();
}
✅ Good:

React

function useCustomHook() {
useState();
}
❌ Bad:

React

function doSomething() { useState(); }
React’s linter plugin enforces these rules.

⚙️ 6️⃣ How Hooks work under the hood (simplified mental model)
React keeps an internal linked list of Hook objects per component instance.
Every time your component renders, hooks are called in the same order.

For each call, React either:

creates new hook state (on first render), or
reuses the previous hook’s state (on re-render).
That’s why order and consistency matter — it’s how React tracks which useState belongs to which variable.

🧩 7️⃣ Lifecycle mapping
If you miss classes, here’s the mapping:

Class lifecycle Equivalent hooks
componentDidMount useEffect(() => {...}, [])
componentDidUpdate useEffect(() => {...}, [deps])
componentWillUnmount cleanup in useEffect return () => {}
So hooks give you lifecycle control but more granular and cleaner.

🌟 8️⃣ Practical Example: Combining Hooks
React

function Dashboard() {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const isMounted = useRef(true);

useEffect(() => {
setLoading(true);
fetch("/api/users")
.then(res => res.json())
.then(data => {
if (isMounted.current) setUsers(data);
})
.finally(() => setLoading(false));
return () => { isMounted.current = false }; // cleanup
}, []);

return (
<>
<h1>Dashboard ({loading ? "Loading..." : `${users.length} users`})</h1>
</>
);
}
You can see useState + useEffect + useRef work together.

🔮 9️⃣ Common custom hooks you’ll create
useForm → manage form inputs, errors.
useDebounce → delay value updates.
usePrevious → track old state values via useRef.
useClickOutside → close modals on outside click.
useAuth → expose login/logout context.
useAPI → abstract API calls/loading/errors.
🎯 10️⃣ The Core Philosophy
Hooks are about:

Composability (combine small units of logic),
Reusability (share logic easily),
Simplicity (functions are easier than classes).
React’s “mental model” is a function pure in output, side effects explicit in hooks.

🎓 Quick Recap Table
Purpose Hook Mental model
Local state useState “Remember something between renders.”
Side-effects useEffect “Do something after render.”
Context useContext “Read global context data.”
Complex state useReducer “Redux-style local state logic.”
Memoization (value) useMemo “Cache computed value.”
Memoization (callback) useCallback “Cache function reference.”
Persist across renders, no re-render useRef “A non-reactive box to store data/DOM.”
React hooks essentially turn components into small, pure functions that render UI, plus hooks that describe behavior around that UI — all elegantly contained in one place.

💡 Once you understand that “re-render” simply means “React re‑runs your function, and restores the remembered states/effects from hooks,” the entire hook system feels like magic that makes sense.

Would you like a next step guide explaining how custom hooks communicate with each other (for example how your usePasswordReset internally handles effects + async APIs)?
