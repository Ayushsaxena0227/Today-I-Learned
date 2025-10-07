Step 1 – What a JSON response actually is
When you call an API using fetch(), you don’t immediately get JavaScript data.

You first get a Response object — it’s like a sealed envelope containing the data as text, not as ready‑to‑use objects or arrays.

⚙️ Step 2 – How to parse it properly
Use await response.json() (or response.json().then(...))
This reads the raw text body from the network stream
and parses the JSON string into normal JavaScript values.
Example:

JavaScript

async function getProduct() {
const response = await fetch("https://dummyjson.com/products/1");

// Always check status before parsing (optional but healthy habit)
if (!response.ok) {
throw new Error(`HTTP error! Status: ${response.status}`);
}

// Parse JSON body → gets converted to JS object
const data = await response.json();

console.log(data); // now a usable object
console.log("Title:", data.title); // access field safely
console.log("Price:", data.price);
}
🔍 Step 3 – What if you don’t parse it?
If you try:

JavaScript

const res = await fetch("https://dummyjson.com/products/1");
console.log(res.price); // ❌ undefined
res is a Response object, not your product data —
JavaScript has no idea what price means there.
You must first decode (await res.json()).

🎯 Step 4 – Steps summary
Phase Operation What you get
1 fetch(url) Response object — includes status, headers, and a stream
2 await res.json() Parses that body into a JS object/array
3 Access fields like data.productName Now you can use normal JS syntax
🍕 Layman analogy
Imagine calling a pizza shop’s API:

fetch() = You get a sealed box (it’s clearly a pizza box, but you haven’t opened it).
response.json() = You open the box and actually see what’s inside.
Only then can you pick a slice → access a property like data.price.
✅ Key takeaway
Always await response.json() before trying to read values from an API response.
