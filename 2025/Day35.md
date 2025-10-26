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
