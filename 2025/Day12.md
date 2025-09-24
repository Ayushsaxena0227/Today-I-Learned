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
