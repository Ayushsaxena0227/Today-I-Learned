The reduce() function
reduce() is like a Swiss Army knife for turning an array into one single value.
That value might be:

a number (like a sum),
a string,
or even an object (like your frequency counter).
It takes two main arguments:

A callback function ((acc, item) => { ... })
An initial value ({} here)
Step 3: Understanding “accumulator” (acc)
Think of acc (short for accumulator) as a running total or evolving collection.

On the first iteration, acc starts as {} because that’s your initial value.
For each item (each letter in "Mississippi"), you update acc.
Here’s what happens step by step:

Iteration item acc after processing
1 "M" { M: 1 }
2 "i" { M: 1, i: 1 }
3 "s" { M: 1, i: 1, s: 1 }
4 "s" { M: 1, i: 1, s: 2 }
… … …
Final { M: 1, i: 4, s: 4, p: 2 }
Step 4: The return acc;
At the end of each run of the callback, you must return the updated accumulator so that reduce() can:

Pass that updated object into the next iteration.
Eventually give you the final accumulated result at the end.
If you forget return acc;, the “running total” would vanish between steps—reduce() would receive undefined on the next loop.

So, the line:

JavaScript

return acc;
means “Hey, reduce, here’s my updated object—keep it going!”

Step 5: The magic of reduce()
Once finished, reduce() gives you the final accumulator, which you store in Occ.
That’s why Occ ends up as:

JavaScript

{ M: 1, i: 4, s: 4, p: 2 }
In short:
Purpose of reduce: Condense an array into one value.
acc (the accumulator): Keeps track of that ongoing result.
return acc: Passes your updated value into the next loop.
Why use reduce: It’s compact, flexible, and can build numbers, strings, or objects efficiently from arrays.

// . Use async/await to fetch comments and count how many belong to postId = 10.
async function Fetchcomments() {
try {
const res = await fetch("https://jsonplaceholder.typicode.com/comments");
const data = await res.json();
const Filtered = data.filter((item) => item.postId === 1).length;
console.log(Filtered);
} catch (error) {
console.log("Error fetching posts", error);
}
}
Fetchcomments();
/ }, {});
// console.log(freq);
// const repeated = Object.keys(freq).filter((ch) => freq[ch] > 1);
// console.log(repeated);
// Given "Hello123World", count how many digits appear in the stcons
// const str = "Hello123World";
// const NumberofDigit = str
// .split("")
// .filter((ch) => ch >= "0" && ch <= "9").length;
// console.log(NumberofDigit);
// From [100, -50, 200, -100, 300], filter out negative numbers and return their sum.
// const arr = [100, -50, 200, -100, 300];
// const PositiveNo = arr.filter((item) => item > 0);
// console.log(PositiveNo);
const str = "Mississippi";
const Occ = str.split("").reduce((acc, item) => {
acc[item] = (acc[item] || 0) + 1;
return acc;
}, {});
console.log(Occ);
