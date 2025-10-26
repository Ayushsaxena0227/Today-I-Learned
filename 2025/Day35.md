. slice() — Non‑destructive “copy” method
🧠 Meaning:
“Give me a portion of something, but don’t change the original.”

Works on
✅ Strings
✅ Arrays

🔹 For a string
JavaScript

const word = "Programming";
const part = word.slice(0, 3); // "Pro"
Returns a new string "Pro".
Original "Programming" stays intact.
🔹 For an array
JavaScript

const nums = [10, 20, 30, 40, 50];
const sliced = nums.slice(1, 4); // [20, 30, 40]

console.log(nums); // [10, 20, 30, 40, 50] (unchanged!)
It extracts items from start to (end − 1) — identical to your string case.

🔍 Key: Returns a new array / string, never mutates.

🧩 2. splice() — Destructive “surgery” method (for arrays only)
🧠 Meaning:
“Cut into this array, optionally remove, and insert new elements.”

❌ Works only on
arrays — not strings.

Example:

JavaScript

const arr = [10, 20, 30, 40, 50];

// remove 2 items starting from index 1
const removed = arr.splice(1, 2);

console.log(removed); // [20, 30]
console.log(arr); // [10, 40, 50] (MUTATED!)
It modifies arr directly.

You can also insert new elements:

JavaScript

arr.splice(1, 0, 25, 35);
// starting at index 1, remove 0 items, insert 25 and 35
// arr → [10, 25, 35, 40, 50]
fetch(`/api/users?page=${page}&limit=20`)
isn’t magic by itself; it’s a hint to your backend API that says:

“Hey server, give me just page N of users, 20 records per page.”

Which means yes — your backend must be built to understand page and limit query parameters, then slice (or paginate) the database results accordingly before sending them to the frontend.

Let’s see what that looks like with a concrete example.

🧩 1️⃣ Frontend behaviour
In your React code:

React

const [page, setPage] = useState(1);

useEffect(() => {
fetch(`/api/users?page=${page}&limit=20`)
.then(res => res.json())
.then(data => setUsers(data.users));
}, [page]);
When the user clicks “Next,” you increase page by 1.
The frontend calls the same endpoint again with ?page=2&limit=20.
You just render what comes back.
So the heavy lifting happens server‑side.

⚙️ 2️⃣ Backend design pattern
Assume Node + Express + a MongoDB/Mongoose backend (pattern is identical in SQL, Python, etc.).

Sample endpoint
JavaScript

// GET /api/users?page=2&limit=20
app.get("/api/users", async (req, res) => {
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 20;
const skip = (page - 1) \* limit;

const users = await User.find() // or SQL: SELECT \* FROM users
.skip(skip) // skip previous records
.limit(limit); // get this many

const total = await User.countDocuments(); // for total_pages calc

res.json({
users,
total,
totalPages: Math.ceil(total / limit),
currentPage: page,
});
});
Explanation
Parameter Meaning
page which block of results to fetch
limit how many per block
skip used by database to ignore records before that page
So:

page = 1 → skip 0, limit 20
page = 2 → skip 20, limit 20
page = 3 → skip 40, limit 20 … and so on.
The database returns only that subset, and the frontend renders it instantly because it’s tiny.

🧠 3️⃣ Why this design rocks
Benefit Explanation
🚀 Fast Each response small → faster transfer + faster render
📉 Lightweight Browser doesn’t hold the whole million‑row dataset
🔁 Reusable Same API supports multiple clients (web, mobile, etc.)
🧩 Scalable Works no matter how big your database grows
Bonus tip
You can also add sort, search, filter as additional query parameters:

Bash

/api/users?page=3&limit=20&sort=name&order=asc&filter=city:Delhi
Your backend parses them and adjusts the database query accordingly — classic RESTful design.

🪄 TL;DR
Yes — if your frontend calls:

JavaScript

fetch(`/api/users?page=${page}&limit=20`)
then your backend must implement pagination logic using those parameters.

That’s the divided‑labor pattern of mature web apps:

Frontend → controls which page to request
Backend → returns just that portion of the dataset
