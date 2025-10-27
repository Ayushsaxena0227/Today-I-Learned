n React, when a parent component re‑renders for any reason, React will re‑render its children too — passing new props (even if the values “look the same”).
If those children are pure and heavy to render, you’ll feel it.

Example:

React

function Parent({ theme }) {
const user = { name: "Ayush" }; // <- new object each render!
return <Child user={user} theme={theme} />;
}
Every time Parent renders, a new user object is created — so Child receives a “different” prop (different reference) → it re‑renders.

🧠 2️⃣ Fix #1 – React.memo: stop re‑render if props didn’t actually change
Wrap your child component like this:

React

const Child = React.memo(function Child({ user }) {
console.log("Child render");
return <p>{user.name}</p>;
});
Now React will skip rendering the child if its props are shallow‑equal (the same references and primitives).

✅ Great for functional components that depend only on props.

But… what if props are functions or objects re‑created each render?
That’s where useMemo and useCallback come in.

🧩 3️⃣ Fix #2 – useCallback: make event handlers stable
Functions are new every render:

React

<Child onClick={() => setCount(c => c + 1)} />
This inline arrow creates a new function each time → breaks memoization.
So use useCallback to make it stable:

React

const handleClick = useCallback(() => setCount(c => c + 1), []);
<Child onClick={handleClick} />
Now the onClick reference stays the same between renders — Child won’t re‑render unnecessarily.

🧩 4️⃣ Fix #3 – useMemo: make derived props stable
If you’re passing a computed object or array:

React

const user = useMemo(() => ({ name: "Ayush" }), []);
useMemo caches that value until its dependencies change, keeping its reference identical.

Then your memoized Child sees the same user object each render → no surprise updates.

🧮 5️⃣ Simple summary table
Problem Symptom Fix Example
Child re‑renders even when props look the same Parent recreates objects, arrays, or functions 🧠 Use React.memo on child + useMemo or useCallback for props React.memo(Child)
Passing heavy computed data Re‑runs expensive logic each render Use useMemo to cache value Derived userList
Passing unstable event handler New function each render Use useCallback onClick handlers
⚙️ 6️⃣ Example — putting it all together
React

import React, { useState, useCallback, useMemo } from "react";

const Child = React.memo(function Child({ user, onClick }) {
console.log("Child render");
return (

<div onClick={onClick}>
<p>{user.name}</p>
</div>
);
});

export default function Parent() {
const [count, setCount] = useState(0);

const user = useMemo(() => ({ name: "Ayush" }), []);
const handleClick = useCallback(() => console.log("Clicked!"), []);

return (
<>
<button onClick={() => setCount(c => c + 1)}>Increment ({count})</button>
<Child user={user} onClick={handleClick} />
</>
);
}
Clicking “Increment” updates the parent but does not re‑render Child because:

Child is wrapped with React.memo.
Its user and onClick props have stable references (thanks to useMemo and useCallback).
🪄 TL;DR
To prevent unnecessary child updates when parent re‑renders:

Key tool Purpose
React.memo Skip re‑render if props are shallow‑equal
useCallback Keep function props stable
useMemo Keep object/array props stable
u’ve landed right on a problem that shows up in any app with shared data (think Google Docs, GitHub issues, or even a multi‑user dashboard).
The challenge:

“Two users edit the same record; whose change wins, and how does the frontend stop one from silently overwriting the other?”

Let’s unravel it clearly.

🧩 1️⃣ What’s really happening
When the frontend loads some data, it usually does this:

text

GET /api/profile/1
→ returns { id:1, name:"Ayush", version:5 }
While user A is editing this, user B might also fetch and edit the same record.
Both then send updates:

JavaScript

PUT /api/profile/1 // from A
{ name: "Ayush Sharma" }

PUT /api/profile/1 // from B
{ name: "Ayush Kumar" }
Whichever request finishes last clobbers the other’s change — the “last writer wins” problem.

⚙️ 2️⃣ How the frontend can help avoid clobbering
There are several complementary techniques. Pick what suits your app’s complexity.

🧠 Option 1 — Optimistic concurrency with versioning / ETag
Idea:
Keep a version number or hash of the record.
When sending an update, also send the version you edited.

Frontend stores:

JavaScript

{ id:1, name:"Ayush", version:5 }
On update:

http

PUT /api/profile/1
If-Match: "v5" // using HTTP ETag semantics
body: { name: "Ayush Sharma" }
If the server’s current version isn’t “v5”, it rejects with 409 Conflict.

Frontend then:

Shows “This record has changed since you opened it.”
Option to merge or refresh data.
#### How it prevents clobber:

Each edit must match the latest version.
If someone else saved first, you’ll know before overwriting.

⚙️ Option 2 — Fetch‑latest + compare before save
Simpler version using a manual check:

When the user opens a form, store a copy of original data.
Before sending, fetch the latest value again.
Compare:
If nothing changed → safe to save.
If changed → ask the user (“Someone else updated this record. Replace or merge?”).
This is easy for low‑traffic apps without formal versioning.

⚡️ Option 3 — Use optimistic UI but reconcile on failure
Front‑end instantly applies the user’s changes for snappy feedback:

JavaScript

setLocalData(newValue);
api.update(newValue)
.catch(() => rollbackToPrevious());
If the server detects a conflict (via version mismatch or 409), revert and show an error.
This feels fast, yet stays consistent.

🔁 Option 4 — Real‑time syncing / locking
When multiple users can edit the same resource live (documents, whiteboards):

Use a WebSocket / WebRTC or a real‑time sync service.
Either:
Lock the resource (simpler): “User A is editing—others read‑only.”
Merge live updates (harder): operational transforms, CRDTs (like Google Docs).
Libraries/tools: Yjs, Automerge, Firebase Realtime DB, or Supabase realtime.

🧠 3️⃣ Frontend patterns that support these strategies
Technique What frontend stores Benefit
Version / ETag numeric or hash version Detects stale updates
Timestamp last updated time Easier than version; same concept
Local shadow copy snapshot for diff/merge Helps show “you vs. latest”
Real‑time socket live events of others’ edits Keeps data synced instantly
🧩 4️⃣ Example in React (version check)
React

async function handleSave(newProfile) {
const res = await fetch(`/api/profile/${newProfile.id}`, {
method: "PUT",
headers: { "Content-Type": "application/json", "If-Match": newProfile.version },
body: JSON.stringify(newProfile)
});

if (res.status === 409) {
alert("Someone else updated this profile. Please refresh.");
}
}
Server validates the If‑Match header and returns 409 on mismatch — simple, robust, HTTP‑standard.

🎯 Summary
Problem Danger Frontend strategy
Multiple users overwrite Old data clobbers new edits Add versions / timestamps
Conflicting edits undetected Wrong data saved Send version & verify before save
Need fast UX Delay between edit and save Use optimistic UI + rollback on conflict
Many concurrent edits True live collaboration Real‑time sync or CRDT‑based merging
🪄 TL;DR
Frontend can’t stop others from editing, but it can stop blind overwrites.
Send a version/ETag with each edit, compare before writing, and if there’s a mismatch, prompt the user or merge changes intelligently.

That’s how you protect your users from the scary “someone just erased my data” moment.
