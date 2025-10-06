Goal
We want to call three APIs one after another (not in parallel), and merge their results — for example, from https://jsonplaceholder.typicode.com.

We’ll fetch:

/users
/posts
/comments
Then accumulate all data into one combined array or object.

✅ Sequential fetch using async/await
JavaScript

async function fetchAllSequentially() {
try {
console.log("Fetching users...");
const resUsers = await fetch("https://jsonplaceholder.typicode.com/users");
const users = await resUsers.json();
console.log("Users fetched:", users.length);

    console.log("Fetching posts...");
    const resPosts = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await resPosts.json();
    console.log("Posts fetched:", posts.length);

    console.log("Fetching comments...");
    const resComments = await fetch("https://jsonplaceholder.typicode.com/comments");
    const comments = await resComments.json();
    console.log("Comments fetched:", comments.length);

    // Combine or structure the results
    const combined = {
      users,
      posts,
      comments,
    };

    console.log("✅ Combined result:", combined);
    return combined;

} catch (error) {
console.error("❌ Error fetching data:", error);
}
}

fetchAllSequentially();
📋 Explanation
Each await fetch(...) waits for the previous one to finish.
That’s sequential execution: users → posts → comments.
We’re using await twice per endpoint:
once to wait for the HTTP response,
once to wait for the JSON parsing.
The final object combined holds all the collected data in one structure.
🚀 If you wanted them in parallel (just to contrast)
Sequencing is helpful when order or dependency matters.
But if the APIs are independent, a faster pattern is Promise.all():

JavaScript

async function fetchAllInParallel() {
const [users, posts, comments] = await Promise.all([
fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()),
fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
fetch("https://jsonplaceholder.typicode.com/comments").then(r => r.json()),
]);
console.log({ users, posts, comments });
}
Parallel version takes roughly the time of the slowest call, while sequential waits for each in turn.

💡 When to use each
Mode Use when
Sequential (await chain) The next request depends on data from the previous one (e.g., fetch user, then fetch their posts).
Parallel (Promise.all) All requests are independent — you just need all results eventually.
Example output (sequential)
text

Fetching users...
Users fetched: 10
Fetching posts...
Posts fetched: 100
Fetching comments...
Comments fetched: 500
✅ Combined result: { users: [...], posts: [...], comments: [...] }
