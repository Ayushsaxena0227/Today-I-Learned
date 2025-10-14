1️⃣ “Validate form inputs before sending data to the server”
What it means
Before making a network request (e.g., a sign‑up POST call), you must ensure the entered data is valid — so the user fixes obvious mistakes early and your backend isn’t spammed with bad data.

Why it matters
Prevents round‑trip delays and “Invalid input” errors from the server.
Reduces server load, saves bandwidth.
Gives immediate feedback to the user.
✅ How you do it on the frontend
Use controlled inputs in React so you always know current values.
Check conditions before you call API (e.g., non‑empty, correct format, password match).
Show inline error messages next to fields.
Example logic (not full code):

JavaScript

if (!email.includes("@")) {
setError("Please enter a valid email address");
return; // 🛑 stop API call
}
if (password.length < 6) {
setError("Password must be at least 6 characters");
return;
}
await sendDataToServer(); // only runs when inputs are valid
Tools/libraries: plain JS, HTML5 validation attributes (required, minLength, pattern), or helpers like Formik + Yup.

⚙️ 2️⃣ “Your API is slow — what’s one simple frontend tweak to keep UI responsive while waiting?” → Loading state
What it means
While the user waits for a slow network call, you don’t want the screen to freeze or look broken; you show clear visual feedback like a spinner or “Loading…” message.
That’s your loading state.

✅ Common pattern
React

const [loading, setLoading] = useState(false);

async function handleSubmit() {
setLoading(true); // 🟡 show loader
try {
const data = await fetchData();
setResult(data);
} finally {
setLoading(false); // ⚪ hide loader
}
}
JSX:

React

{loading ? <p>⏳ Loading...</p> : <DataView data={result} />}
💬 Why it helps
User knows something is happening — no panic clicks or duplicate submits.
Keeps UI interactive (buttons disabled but not frozen).
Prevents multiple duplicate calls (“double‑click” problem).
⚡ 3️⃣ “A table of items keeps scrolling laggy. What basic optimization could you apply?” → Windowing / limit DOM nodes
What it means
If a table renders, say, 10 000 rows, the browser has to paint 10 000 DOM nodes — very heavy work, causing lag during scroll.
Windowing (a.k.a. virtualization) means:

Only render the items currently visible on screen (+ a few buffer rows) instead of the entire list.

✅ Real‑world approach
Manually slice your data:
React

const visibleRows = allRows.slice(startIdx, endIdx);
and render only that portion.
Or use ready‑made libraries:
react-window,
react-virtualized.
Example (conceptually):

React

<List
height={400}
itemCount={movies.length}
itemSize={35}

> {({ index, style }) => (

    <Row style={style} movie={movies[index]} />

)}
</List>
💬 Why it helps
React only creates ~20–30 DOM nodes at any moment, not thousands.
Smooth scrolling even on slower devices.
Great for tables, chat windows, long feeds, file lists, etc.
🧩 Summary Table
