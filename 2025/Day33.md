tep 1: What callbacks really are (in one line)
A callback is a function you give to another function so it can call it later.

Okay, again —
→ You don’t run it yourself right away; you hand it over to be run later, maybe after something finishes, like a delay, a server call, or a button click.

🧠 Let’s start easy – Synchronous (runs right away)
Example:

JavaScript

function welcomeUser(username, callback) {
console.log("Welcome, " + username);
// now run your provided function
callback();
}

function showDashboard() {
console.log("Opening dashboard...");
}

welcomeUser("Ava", showDashboard);
🧾 Output:

text

Welcome, Ava
Opening dashboard...
You passed showDashboard as data to another function, and it got called inside.
That’s all a callback really is.

🕐 Now let’s go real-world: Asynchronous
Imagine making an online order.

You: “I want a burger.” 🍔
Shop: “Cool—we’ll call you when it’s ready.” ☎️

→ That “call me when it’s ready” part = callback

Code:

JavaScript

console.log("Placing order...");

setTimeout(() => {
console.log("✅ Burger is ready!");
}, 2000); // pretend 2 seconds to cook

console.log("🤙 Doing something else while waiting...");
Output:

text

Placing order...
🤙 Doing something else while waiting...
✅ Burger is ready!
Here, the arrow function () => console.log("✅ Burger is ready!")
is our callback — passed into setTimeout, so JS can “call back” when 2 seconds pass.

🎬 Another realistic example — downloading data
Think about apps fetching your profile data from a server (takes time).
We’ll fake it using setTimeout.

JavaScript

function getUserData(callback) {
console.log("Fetching user data from server...");

setTimeout(() => {
const user = { name: "Ava", age: 25 };
console.log("✅ Data received!");
callback(user);
}, 2000);
}

function showUserProfile(user) {
console.log(`User Profile:\nName: ${user.name}\nAge: ${user.age}`);
}

getUserData(showUserProfile);
Output:

text

Fetching user data from server...
✅ Data received!
User Profile:
Name: Ava
Age: 25
Here:

getUserData starts an async operation.
We pass showUserProfile as a callback.
When the “data” arrives (2 sec later), it calls our callback and gives it the data.
That’s real‑world callback behavior — things like fetch, readFile, and setTimeout do this under the hood.

🌈 What’s happening behind the scenes
JS does not sit idle waiting 2 seconds (it’s single‑threaded).
It tells the browser: “Run this later after 2 seconds.”
Browser finishes its timer and drops your callback back into the event loop.
When your turn comes, JS runs it.
