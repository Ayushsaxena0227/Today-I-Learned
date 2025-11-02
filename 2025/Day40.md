echnical Definition
Throttle ek technique hai jisme hum kisi function ko bar‑bar chalne se rok kar fixed interval me sirf ek baar chalne dete hain — chahe user ne usko 100 baar trigger kiya ho.

So:
function har time trigger hua, par chalega sirf n milliseconds ke interval pe.

🧠 Layman Explanation
Samjho tumne ek scroll event lagaya hai:

JavaScript

window.addEventListener("scroll", () => {
console.log("scrolling...");
});
Agar user scroll karta raha ➜ browser har millisecond event fire karega 😨
→ 1000+ calls per second!

👉 Throttle bolta hai:

“Chill! main har 200 ms me ek baar hi chalunga chahe tum kitni baar scroll karo.”

🧮 Throttle Function Implementation
JavaScript

function throttle(func, interval) {
let lastCall = 0;
return function (...args) {
const now = Date.now();
if (now - lastCall >= interval) {
lastCall = now;
func.apply(this, args);
}
};
}
✅ Usage:

JavaScript

const logScroll = () => console.log("Scrolled at:", new Date().toLocaleTimeString());

const throttledScroll = throttle(logScroll, 2000);

window.addEventListener("scroll", throttledScroll);
Output:
No matter how fast you scroll, console bolega bas har 2 second me ek baar:

text

Scrolled at: 10:00:02
Scrolled at: 10:00:04
Scrolled at: 10:00:06
🧩 Throttle vs Debounce (Quick Difference)
Feature Throttle Debounce
Purpose Restrict frequency of execution Delay until no new event occurs
Execution Timing Runs at regular intervals Runs once after quiet period
Example Scroll / resize / mousemove events Search box / auto-save typing
Analogy “Main har 2 sec me ek baar hi bolunga” “Main jab tum chup ho jao tab bolunga”
⚙️ Real‑World Uses
Use Case Why Throttle helps
Window scroll events Limit heavy UI updates or API loads
Window resize Update layout width once every few ms
Mousemove tracking Avoid thousands of pointer event logs
Continuous button press Prevent rapid firing APIs
IoT / sensor data stream Reduce network calls and load
💻 Example 2 — Throttle in Express (Server Side)
Throttling ka concept backend me bhi apply karte hain (Middleware level).
For example: API throttling (rate‑limiting).

JavaScript

const rateLimit = require("express-rate-limit");

const apiThrottle = rateLimit({
windowMs: 1000, // 1 second
max: 5, // allow max 5 requests
});

app.use("/api", apiThrottle);
⚙️ Express me library internally same pattern use karti hai:

track last request time per IP → only allow if interval passed.

🧕 Layman Analogy
Sochho tumhara doston ka group message bhej raha hai “Hi” bar‑bar har millisecond.
Phone crash ho jayega 😩

Throttle lagao →

“Sirf har 5 second me ek Hi bhejne do — baaki ignore.” 😄

Performance recover, phone safe.

🧮 Advanced Version — Leading & Trailing Calls
Kabhi‑kabhi hume control chahiye ki function

start me chale (leading call)
end me bhi chale (trailing call).
Using lodash:

JavaScript

import throttle from "lodash/throttle";

window.addEventListener(
"scroll",
throttle(() => console.log("scroll fired!"), 1000, {
leading: true, // run immediately
trailing: false // skip last extra run
})
);
🚀 Interview‑Ready Summary
Throttle ek optimization technique hai jisse hum kisi function ke execution frequency ko limit karte hain.
It ensures that a function executes at most once every X milliseconds, regardless of how many times it’s triggered.
Commonly used in scroll, resize, or mousemove events to prevent performance issues.
