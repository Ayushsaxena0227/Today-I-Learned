<!-- import { useState } from "react";

// Create a button that toggles between two texts: “Show Password” / “Hide Password”.
export default function Toggle() {
  const [isVisible, setIsVisible] = useState(false); // start with hidden

  function handleToggle() {
    setIsVisible(prev => !prev); // flip true/false
  }

  return (
    <>
      <h1>Toggle</h1>
      <button onClick={handleToggle}>
        {isVisible ? "Hide Password" : "Show Password"}
      </button>
      <p>{isVisible ? "MySuperSecret123!" : ""}</p>
    </>
  );
} -->

<!-- solved js qs -->

<!-- Given [5,10,15,20], return an array with only the even numbers.
→ [10,20]

From ["apple","banana","avocado","blueberry"], group by first letter.
→ { a:["apple","avocado"], b:["banana","blueberry"] }

Given [1,2,3,4,5], return the running total array.
→ [1,3,6,10,15]

Given [{user:"A",action:"login"},{user:"B",action:"login"},{user:"A",action:"logout"}]
Return each user’s last action.
→ { A:"logout", B:"login" }

Implement reverseWords("Hello World").
→ "olleH dlroW"

Given [1,2,3,4,5,6], chunk into size 2.
→ [[1,2],[3,4],[5,6]]

From "id=10&title=Book&price=200", return an object.
→ {id:"10", title:"Book", price:"200"} -->

<!--
 Difference Between Two “404s”
API doesn’t exist (wrong route/method):
Express sends something like "Cannot POST /api/admin/login" → that means mismatch in route config.
API exists but entity not found:
Your code itself throws "Admin account not found." along with a 404 response. That message confirms the route logic reached DB check, but found no matching user. -->

<!-- learned about finding unique element in array with diff methods -->

sing filter() and indexOf()
This method works by filtering the array and only keeping elements whose first occurrence is at the current index.

JavaScript

const arr = [1, 2, 2, 3, 4, 4, 5];

const unique = arr.filter((item, index) => {
return arr.indexOf(item) === index;
});

console.log(unique); // Output: [1, 2, 3, 4, 5]
How it works: indexOf(item) always returns the index of the first time an item appears. The filter method includes an element only if its first appearance index (indexOf(item)) is the same as its current index. For duplicates, this condition will be false.

2. Using reduce()
   You can use the reduce method to build up a new array containing only the unique elements.

JavaScript

const arr = [1, 2, 2, 3, 4, 4, 5];

const unique = arr.reduce((acc, item) => {
return acc.includes(item) ? acc : [...acc, item];
}, []);

console.log(unique); // Output: [1, 2, 3, 4, 5]
How it works: The reduce method iterates through the array. It starts with an empty array ([]) as the accumulator (acc). For each item, it checks if the accumulator already includes it. If not, it adds the item.

3. Using a forEach() loop and an object
   This is a classic approach where you use an object (or a Map) to keep track of the items you've already seen.

JavaScript

const arr = [1, 2, 2, 3, 4, 4, 5];
const unique = [];
const seen = {}; // Use an object as a hash map

arr.forEach(item => {
if (!seen[item]) {
unique.push(item);
seen[item] = true;
}
});

console.log(unique); // Output: [1, 2, 3, 4, 5]
How it works: As you loop through the array, you check if the current item exists as a key in the seen object. If it doesn't, you add the item to your unique array and mark it as seen by adding it to the seen object.

show m dry run const arr = [1, 2, 2, 3, 4, 4, 5];

const unique = arr.filter((item, index) => {

return arr.indexOf(item) === index;

});

console.log(unique); // Output: [1, 2, 3, 4, 5]and proerly explain what does indexOfd do?>

Of course. Let's break down how this works.

First, let's clarify what the indexOf() method does, as it's the key to understanding the code.

What indexOf() Does
The arr.indexOf(item) method searches the array for a specific item and returns the index of its first occurrence.

If the item is found, it returns the index number (e.g., 0, 1, 2...).

If the item appears multiple times, it always returns the index of the very first time it saw that item.

If the item is not found, it returns -1.

For example, in your array arr = [1, 2, 2, 3, 4, 4, 5]:

arr.indexOf(2) will return 1.

arr.indexOf(4) will return 4.
