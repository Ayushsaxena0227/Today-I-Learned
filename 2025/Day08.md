<!-- solved js questions using reduce, undersrtnad more in depth about acc -->
<!-- qs Take [{id:1,name:"Alice"},{id:2,name:"Bob"}] and return an object keyed by id.
→ {1:"Alice", 2:"Bob"}
 -->

In Array.prototype.reduce, you give it:

array.reduce((acc, currentItem) => {
// do something
return acc;
}, initialValue)
acc = accumulator → the thing you’re building up step by step.
currentItem (often called item or cur) = the element from the array you’re currently iterating over.
initialValue = what acc starts off as (in your case {}).
In your example
JavaScript

const result = arr.reduce((acc, item) => {
acc[item.id] = item.name;
return acc;
}, {});
On the first run:

acc = {} (empty object, because you gave {} as initialValue)
item = { id: 1, name: "Alice" }
👉 We do: acc[1] = "Alice" → acc = {1: "Alice"}
Return that.
On the second run:

acc = {1: "Alice"} (carried from last step)
item = { id: 2, name: "Bob" }
👉 We do: acc[2] = "Bob" → acc = {1: "Alice", 2: "Bob"}
At the end, reduce spits out the fully accumulated object → {1:"Alice", 2:"Bob"}.
