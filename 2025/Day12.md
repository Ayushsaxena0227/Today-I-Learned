<!-- solved js api qs -->

2024-01-05","2020-08-09","2022-12-31"]

<!-- Sort them in descending order so the latest date appears first.

An API returns products:
JSON

[
  { "id": 1, "name": "Laptop", "price": 1000 },
  { "id": 2, "name": "Keyboard", "price": null },
  { "id": 3, "name": "Phone", "price": 800 }
]
Filter out products where price is null.

API response comes as:
JSON

{
  "users": [
    { "id": 1, "profile": { "username": "alpha" } },
    { "id": 2, "profile": { "username": "beta" } }
  ]
}
Extract all usernames into an array. -->

Safe Ways to Handle Missing Profile/Username

1. Using Optional Chaining (?.)
   JavaScript

const arr = data.users.map(u => u.profile?.username || "N/A");

console.log(arr);
// ["alpha", "beta"] (or "N/A" if username is missing)
👉 Explanation:

u.profile?.username → safely checks if profile exists.
If it doesn’t → returns undefined.
Then || "N/A" gives a fallback string. 2. Using Filter to Ignore Users Without Username
JavaScript

const arr = data.users
.map(u => u.profile?.username)
.filter(Boolean);

console.log(arr);
// ["alpha", "beta"] (skips missing ones)
👉 filter(Boolean) removes any null, undefined, or empty string values.

3. If you want IDs + usernames (safe object form)
   JavaScript

const arr = data.users.map(u => ({
id: u.id,
username: u.profile?.username ?? "Unknown"
}));

console.log(arr);
// [
// { id: 1, username: "alpha" },
// { id: 2, username: "beta" },
// { id: 3, username: "Unknown" } <-- if missing
// ]
👉 Here I used the nullish coalescing operator (??) which only applies fallback if the value is null or undefined (not just falsy like empty string or 0).

Use ?. (optional chaining) when nested fields may not exist.
Combine with || or ?? for safe defaults.
Add .filter(...) if you want to completely skip missing ones.
missing), and another version where it includes "Unknown" placeholders?

<!-- if an API gives you a huge array of users but you only want the first 50, you can use .slice().

🔎 Why .slice()?
.slice(start, end) → extracts a shallow copy of the array from start up to but not including end.
Non‑destructive → doesn’t modify the original array, just returns the subarray.
So if API returns:

JavaScript

const users = await fetch("/api/users").then(res => res.json());
And you only want the first 50:

JavaScript

const first50 = users.slice(0, 50);
✅ This gives you indexes 0 → 49 (50 items).

⚡ Alternative: .splice() ❌
.splice() would also let you grab first 50, but it mutates (removes) items from the original array.
Example:
JavaScript

const first50 = users.splice(0, 50);
first50 = first 50 users
users = now has all users from index 50 onward (original modified).
⚠️ Usually not good when you just want a copy.
⚡ Alternative: .filter() (overkill here)
You could filter by index:

JavaScript

const first50 = users.filter((_, i) => i < 50);
Works, but .slice is simpler & faster.
 -->

reduce() accumulator (acc) can be anything you initialize:
[] → array
{} → object (for mappings or counters)
new Set() → Set (for uniqueness smarter/faster)
Here, because you passed [] as the second argument to reduce, acc is an array.
