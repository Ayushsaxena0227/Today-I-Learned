1️⃣ .map() — Transform Data
📘 Interviewer might say
“You have an array of users and you only need their names — show me how you’d get that.”

JavaScript

const users = [
{ id: 1, name: "Alice" },
{ id: 2, name: "Bob" },
{ id: 3, name: "Charlie" }
];

const names = users.map(user => user.name);
console.log(names); // ['Alice', 'Bob', 'Charlie']
✅ Explanation:
.map() runs a transformation on each element and returns a new array.
The resulting array has the same length as the original one.

🗣️ Interview sound‑bite:

“.map() answers the question ‘What do I want each element to become?’ — I transform each item into its name, id, or any computed value.”

🧠 Follow‑up Question
“Can you create a new array that contains objects with an added field index?”

JavaScript

const result = users.map((user, i) => ({ ...user, index: i + 1 }));
console.log(result);
/_
[
{ id:1, name:'Alice', index:1 },
{ id:2, name:'Bob', index:2 },
...
]
_/
🎯 Shows you know you can return a new object per item.

🕵️‍♂️ 2️⃣ .filter() — Select / Pick Data
📘 Typical Question
“You have an array of users; keep only those who are admins.”

JavaScript

const users = [
{ name: "Alice", isAdmin: true },
{ name: "Bob", isAdmin: false },
{ name: "Eve", isAdmin: true }
];

const admins = users.filter(user => user.isAdmin);
console.log(admins);
// [{ name:'Alice', isAdmin:true }, { name:'Eve', isAdmin:true }]
✅ Explanation:
.filter() keeps only the elements for which the callback returns true.
New array may be shorter (or even empty).

⚙️ Common extensions:

Filter by multiple conditions.
JavaScript

const highPrivAdmins = users.filter(u => u.isAdmin && u.level > 5);
Filter out falsy values.
JavaScript

[0, 1, 2, '', null].filter(Boolean); // [1,2]
🗣️ Interview line:

“.filter() answers ‘Which elements pass my test?’”

🧮 3️⃣ .reduce() — Aggregate / Summarize Data
📘 Classic Interview Prompt
“Given an array of numbers, find the total sum using .reduce().”

JavaScript

const numbers = [10, 20, 30];

const sum = numbers.reduce((accumulator, currentValue) => {
return accumulator + currentValue;
}, 0);

console.log(sum); // 60
✅ Explain clearly:

accumulator = the running total (starts = 0 here).
currentValue = current element in array.
Return value → becomes next iteration’s accumulator.
text

Iteration 1: acc=0, cur=10 → return 10
Iteration 2: acc=10, cur=20 → return 30
Iteration 3: acc=30, cur=30 → return 60
Final result: 60
⚡ Follow‑up Problem
“Given products with price × quantity, find total cart cost.”

JavaScript

const cart = [
{ item: "Laptop", price: 50000, qty: 1 },
{ item: "Mouse", price: 1000, qty: 2 },
{ item: "Bag", price: 2000, qty: 3 }
];

const total = cart.reduce(
(acc, product) => acc + product.price \* product.qty,
0
);

console.log(total); // 50000 + 2000 + 6000 = 58000
⚙️ 4️⃣ Chaining Methods — Real‑world Scenario
📘 Question
“Get the UPPERCASE names of users who are admins over 30.”

JavaScript

const users = [
{ name: "Alice", age: 25, isAdmin: true },
{ name: "Bob", age: 35, isAdmin: false },
{ name: "Eve", age: 40, isAdmin: true }
];

const names = users
.filter(user => user.isAdmin && user.age > 30) // pick target users
.map(user => user.name.toUpperCase()); // transform names

console.log(names); // ['EVE']
✅ Demonstrates both understanding + chaining readability.

🗣️ Interview answer thing:

“These methods are chainable because each returns a new array (reduce returns a value) — they make data manipulation declarative.”

🧪 5️⃣ Combo Practice: Filter → Reduce
📘 Question
“Given an array of products, calculate the total price of items in stock.”

JavaScript

const products = [
{ name: "Phone", price: 1000, inStock: true },
{ name: "TV", price: 2000, inStock: false },
{ name: "Watch", price: 500, inStock: true }
];

const totalInStockValue = products
.filter(p => p.inStock)
.reduce((acc, p) => acc + p.price, 0);

console.log(totalInStockValue); // 1500
Pen‑and‑paper explanation:

Filter removes non‑stock items → [Phone, Watch].
Reduce sums their prices → 1500.
🔍 6️⃣ Bonus: Count Frequency with .reduce()
“How many times does each number appear in array [1,2,2,3,3,3]? ”

JavaScript

const arr = [1, 2, 2, 3, 3, 3];

const freq = arr.reduce((acc, num) => {
acc[num] = (acc[num] || 0) + 1;
return acc;
}, {});

console.log(freq); // { '1':1, '2':2, '3':3 }
🧠 7️⃣ Quick Comparison Table
Method Purpose Returns Mutates original? Typical use
.map() Transform New array (same length) ❌ Extract / adjust data
.filter() Choose New array (≤ length) ❌ Remove unwanted elements
.reduce() Aggregate Any type (number, obj) ❌ Sum, count, group
