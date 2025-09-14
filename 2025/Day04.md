 <!-- What is a Memory Leak (Simple Terms)? -->

Layman’s Analogy:
Imagine you’re renting a hotel room. When you check out, you’re supposed to give the keys back and free the room for others to use.
But if you forget to return the keys, the hotel thinks the room is still occupied — even though you’re gone. Over time, more and more rooms seem “occupied” even if nobody is using them. Eventually, no rooms are left → the hotel (memory) crashes.

In programming: a memory leak is when your React app keeps “holding onto” memory it should have released because something wasn’t properly cleaned up.

Over time, this leftover clutter slows things down or even causes a crash.

Why does it happen in React specifically?
React components mount (appear) and unmount (disappear) all the time (when you change routes, tabs, etc).
If you don’t properly clean up things tied to a component, those “dangling connections” stick around in memory even though the component is gone.

Common Causes in React (with Examples)

1. Uncleared Subscriptions or Timers
   You set up setInterval or connect to a WebSocket inside a component.
   Forget to clear it when the component unmounts.
   Example:

JavaScript

useEffect(() => {
const interval = setInterval(() => {
console.log("Tick...");
}, 1000);

return () => clearInterval(interval); // ✅ cleanup
}, []);
If you forget clearInterval, intervals keep running — memory leak.

2. Async Calls Updating Unmounted Components
   You fetch data, but the user navigates away before the fetch finishes.
   The setState tries to run on a component that already unmounted.
   Example:

JavaScript

useEffect(() => {
let isMounted = true;

fetch('/api/data').then(res => res.json()).then(data => {
if (isMounted) setData(data); // only update if still mounted
});

return () => { isMounted = false; }; // ✅ cleanup
}, []);
If you don’t guard this, React warns:
"Can’t perform a state update on an unmounted component."

3. Unremoved Event Listeners
   Attaching a window or document event but not removing it.
   Example:

JavaScript

useEffect(() => {
const handleResize = () => console.log("resized");
window.addEventListener('resize', handleResize);

return () => window.removeEventListener('resize', handleResize); // ✅ cleanup
}, []);
If you don’t remove it, the listener reference stays in memory forever.

4. Lingering References in Refs or Closures
   Keeping references to large objects inside closures or refs without resetting them.
   Example:

JavaScript

const bigCacheRef = useRef(null);

// later...
bigCacheRef.current = hugeArray; // persists in memory indefinitely
Unless you reset it (bigCacheRef.current = null), GC (garbage collector) won’t clean it up.

🛠️ How Do You Fix Memory Leaks in React?
Always use cleanup functions inside useEffect:
return () => { ... } is your cleanup block.
Cancel async requests if the component unmounts.
Remove event listeners properly.
Clear timers/intervals.
Be careful with refs storing “big” data.

<!-- in short -->

"A memory leak in React happens when a component keeps holding onto memory it doesn’t need anymore — usually because we forgot to clean something up. For example, uncleared timers, subscriptions, event listeners, or async calls updating unmounted components. These prevent garbage collection, so over time memory usage grows and the app slows or crashes.
The fix is to always clean up in the useEffect return function — for example, calling clearInterval, unsubscribing from listeners, or cancelling async calls when the component unmounts."
