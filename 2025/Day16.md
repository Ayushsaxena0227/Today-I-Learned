// const arr = [false, 0, null, "", 5, "hi", undefined, NaN];
// const FilteredValues = arr.filter(Boolean);
// console.log(FilteredValues);
irst, how .filter() works
.filter() runs a callback on every element in an array.
If callback returns:
true → keep that element in the new array ✅
false → remove it ❌
Example:

JavaScript

[1, 2, 3].filter((x) => x > 1);
// → [2, 3]
Here:

For 1, x > 1 → false → remove.
For 2, 3 → true → keep.
2️⃣ .filter(Boolean)
Now, what happens if you just pass Boolean?

JavaScript

const arr = [false, 0, null, "", 5, "hi", undefined, NaN];
arr.filter(Boolean);
For each element, .filter calls the Boolean function like:
→ Boolean(false)
→ Boolean(0)
→ Boolean(null)
…and so on.
3️⃣ What does Boolean(value) do?
Boolean() is just a built‑in that converts its argument to true or false using JS truthy/falsy rules.

Boolean(false) → false
Boolean(0) → false
Boolean("") → false
Boolean(null) → false
Boolean(undefined) → false
Boolean(NaN) → false
✅ All of these are falsy, so they return false → .filter discards them.

Boolean(5) → true
Boolean("hi") → true
✅ These are truthy, so .filter keeps them.
