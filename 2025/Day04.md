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

<!-- CORS -->

You (the browser) want to borrow sugar from your neighbor’s apartment (another domain).
The guard at your neighbor’s door (the server) won’t let you in unless your neighbor has explicitly said: “Yes, this person is allowed to borrow sugar.”
Likewise, CORS (Cross-Origin Resource Sharing) is a security rule in browsers that controls whether one website (origin A) can request data/resources from another website (origin B).

Why does CORS exist?
Browsers enforce Same-Origin Policy (SOP):

By default, a web page can only access resources (API, scripts, etc.) from the same domain, port, and protocol it came from.
This prevents malicious sites from stealing sensitive data (like cookies, tokens, etc.) from other domains.
Without CORS:

Site attacker.com could load code to secretly request your bank data from bank.com if you’re logged in.
With CORS:

bank.com must say: “Only trust requests from myapp.com, not attacker.com.”
⚙️ How CORS Actually Works (Technical Terms)
When your React frontend (running on http://localhost:3000) calls an API on http://api.myapp.com, the browser checks:

Client Request: Browser sends OPTIONS or actual request with CORS headers.
Like:

text

Origin: http://localhost:3000
Server Response: The API responds with allowed origins in response headers:

text

Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type, Authorization
Decision:

If the Origin (from request) matches the Access-Control-Allow-Origin (from response), ✅ request succeeds.
If not, ❌ browser blocks it (CORS error).
⚠️ Note: Browser blocks the request — not the server. That’s why you only see CORS issues when running frontend in browser, not in tools like Postman.

🔥 Common Causes of CORS Errors
Frontend & backend are on different domains (e.g., localhost:3000 vs localhost:5000).
Backend doesn’t send the correct Access-Control-Allow-Origin.
Sending special headers (Authorization, Content-Type) triggers a preflight OPTIONS request.
Using \* (wildcard) with credentials (cookies, auth headers) — not allowed.
🛠️ How to Fix CORS (Examples)

1. In Express.js (Backend)
   JavaScript

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
origin: 'http://localhost:3000', // ✅ Allow only frontend origin
methods: ['GET','POST'],
credentials: true // if you need to send cookies
}));

app.listen(5000, () => console.log("Server running")); 2. In Firebase Functions
JavaScript

const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

exports.api = functions.https.onRequest((req, res) => {
cors(req, res, () => {
res.json({ message: "Hello from Firebase" });
});
}); 3. In Cloud (AWS S3, API Gateway, GCP storage)
In AWS S3, enable CORS policy in bucket:
JSON

[
{
"AllowedHeaders": ["*"],
"AllowedMethods": ["GET", "POST", "PUT"],
"AllowedOrigins": ["http://myapp.com"],
"ExposeHeaders": []
}
]

CORS stands for Cross-Origin Resource Sharing. It’s a browser security feature that prevents a web page from requesting data from another domain unless explicitly allowed.
It works by adding special HTTP response headers like Access-Control-Allow-Origin that tell the browser which domains are trusted to access the resources.
Common causes of CORS errors include APIs not sending the right headers, or mismatched origins. The fix is usually on the server side, by configuring proper CORS headers.
