Find the postId which has the highest number of comments.

🧩 Step 1: How to Approach
Fetch the /comments API → gives array of comments.
Each comment belongs to some postId.
We need to count how many times each postId appears (frequency).
Then find the postId with the maximum count.
✅ Solution in Plain JS
JavaScript

const comments = [
{ id: 1, postId: 242 },
{ id: 2, postId: 46 },
{ id: 3, postId: 235 },
{ id: 4, postId: 242 },
{ id: 5, postId: 46 },
{ id: 6, postId: 242 }
];

// Step 1: Count comments per postId
const counts = comments.reduce((acc, comment) => {
acc[comment.postId] = (acc[comment.postId] || 0) + 1;
return acc;
}, {});

console.log("Counts:", counts);
// { '46': 2, '235': 1, '242': 3 }

// Step 2: Find postId with maximum count
const topPostId = Object.keys(counts).reduce((a, b) =>
counts[a] > counts[b] ? a : b
);

console.log("PostId with highest comments:", topPostId); // "242"
console.log("Number of comments:", counts[topPostId]); // 3
⚡ Explanation
reduce builds an object like:
JavaScript

{ "242": 3, "46": 2, "235": 1 }
Then another reduce on keys finds the key with the largest value.
