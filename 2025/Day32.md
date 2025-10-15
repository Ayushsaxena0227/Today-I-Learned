🧠 Common threads first
All of these methods iterate through an array element by element and give your callback both:

the current value (element)
the current index
So in the callback you can always use:

JavaScript

arrayMethod((item, index) => { ... });
But the purpose and return value from these methods are very different.

⚙️ 1️⃣ forEach
Purpose: Perform an action for each element.

Returns: undefined (always).
It does not build or return a new array.

JavaScript

const arr = [10, 20, 30];
const result = arr.forEach((item, index) => {
console.log(index, item);
});
console.log(result); // undefined
✅ Use this when you just need to do something (e.g., logging, pushing to another array), not when you need to create a new array.

⚙️ 2️⃣ map
Purpose: Transform each element.

Returns: A new array with one result per element.

JavaScript

const arr = [1, 2, 3];
const doubled = arr.map((num, idx) => num \* 2);
console.log(doubled); // [2, 4, 6]
✅ Same length as the original, but values replaced with whatever you return inside.
👉 If you forget return, you’ll get [undefined, undefined, …].

⚙️ 3️⃣ filter
Purpose: Keep only certain elements.

Returns: A new, shorter array of elements that passed the test.

JavaScript

const arr = [5, 10, 15, 20];
const over10 = arr.filter(num => num > 10);
console.log(over10); // [15, 20]
✅ Keeps the original values, just fewer of them.

⚙️ 4️⃣ reduce
Purpose: Accumulate values into a single output (sum, object, array, etc.).

Returns: One single value (the accumulator after the final iteration).

JavaScript

const arr = [1, 2, 3];
const sum = arr.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 6
The first argument is a callback (accumulator, element, index) => newAccumulator
The second argument (0 in the example) is the initial value of the accumulator.
✅ Reduce can be used to build any kind of result: a sum, an object, even a brand‑new array.

🧩 Summary Table
Method Main Goal Returns What Changes Original? Typical Use
forEach perform side‑effects undefined ❌ logging, pushing to external array
map transform values new array (same length) ❌ convert data (shapes, values)
filter select subset new array (shorter) ❌ extract matching items
reduce accumulate → single result single value (any type) ❌ sum, count, group, flatten
💡 Bonus tip: access to index
All callbacks get (item, index, array) parameters automatically, so yes:

JavaScript

arr.forEach((item, index) => console.log(index));
arr.map((item, index) => console.log(index));
arr.filter((item, index) => console.log(index));
arr.reduce((acc, item, index) => { console.log(index); return acc; }, {});
They all let you read the index — it’s just that each one returns something different.

🧠 In short
forEach → does work, returns nothing.
map → makes a new, transformed array.
filter → makes a new, shorter array.
reduce → folds everything down to one value.
// → ["one","two","three"]
// const str = "one two two three three three";
// const Uniquewords = str.split(" ").reduce((acc, item) => {
// if (!acc.includes(item)) {
// acc.push(item);
// }
// return acc;
// }, []);
// console.log(Uniquewords);

// const arr = [
// { product: "A", price: 100 },
// { product: "B", price: 200 },
// { product: "C", price: 150 },
// ];
// let currprice = 0;
// arr.forEach((item) => {
// if (item.price > currprice) {
// currprice = item;
// }
// });
// console.log(currprice.product);
// // return the product name with highest price.
// // → "B"

// Find index of all occurrences of "a" in "javascript".
// → [1,3]
const str = "javascript";
const IndexStore = str
.split("")
.map((ch, index) => (ch === "a" ? index : -1))
.filter((index) => index !== -1);
console.log(IndexStore);
const Storeindex = [];
str.split("").forEach((ch, index) => {
if (ch === "a") {
Storeindex.push(index);
}
});
console.log(Storeindex);
