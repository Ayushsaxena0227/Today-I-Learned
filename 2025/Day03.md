<!-- Mutating vs Non‑Mutating Array Methods in JS -->

Interviewers often test whether you can tell apart the "bad boys" 🤨 that mutate their parent array from the "polite ones" that return a new array without harm.

Mutating methods (danger: side-effects)

push(), pop(), shift(), unshift(), splice(), sort(), reverse().
These alter the original array.
Non‑mutating methods (safe, functional style)

map(), filter(), reduce(), concat(), slice().

 <!-- Backend Filtering vs React-Side Filtering -->

Do you mean we should filter the data on the backend rather than in React?
👉 Yes, most of the time.

Why?
Efficiency: Imagine you have 10,000 users in your DB. If you fetch all 10k into React, then filter age >= 18, you’ve wasted:

Network bandwidth (sending data you never use).
Memory/CPU in the browser for unnecessary processing.
Better: just query the backend:

SQL

SELECT id, age FROM Users WHERE age >= 18;
or if Firebase:

JavaScript

db.collection("users").where("age", ">=", 18)
Now the frontend only receives what it needs.

Scalability: Backends/databases are optimized for filtering/aggregation via indexes. Clients are not.

Security: Some data may not even be authorized to reach the frontend! Filtering sensitive records (e.g. only fetch users in your department) must happen on the server.

3️⃣ When to Filter on the Frontend (React)?
It’s not always backend-only. Frontend filtering makes sense when:

You already have a small dataset in memory (e.g. 20 items from an API).
You want to apply UI-specific filters that the server doesn’t know, e.g.:
Search box: filter employees by input text.
Toggle switch: show only “favorites” in the list.
💡 Rule of thumb:

Data rules (business rules, sensitive info, big data) → filter on backend/server/DB.
Presentation rules (UI toggles, quick searches, local-only preferences) → filter inside React/frontend.
4️⃣ Interview-Answer Style
If asked: “Should you filter in React or backend?”
You can say:

"It depends on the data volume and responsibility. For large datasets, backend filtering is critical for performance and security — databases are designed for that. In the frontend I’d only filter if the data is already small enough or if the filters are purely for presentation."
