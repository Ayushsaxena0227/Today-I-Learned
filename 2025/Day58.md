The Fetch API vs. Axios
Concept: Understanding the two primary ways to make HTTP requests (API calls) in modern JavaScript.

What It Is: Your frontend app needs to talk to a backend server to get or send data. fetch and axios are the tools for that job.

Fetch API:

Source: Built directly into modern browsers. No need to install anything.
API: A bit lower-level. The response body needs to be manually parsed using a method like .json(), which itself returns a promise.
Error Handling: fetch does not consider HTTP error statuses (like 404 or 500) as a rejected promise. You have to manually check the response.ok property. This is a common "gotcha."
Syntax (GET request):
JavaScript

fetch('https://api.example.com/users')
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => console.log(data))
.catch(error => console.error('Fetch error:', error));
Axios:

Source: A popular third-party library. You have to install it: npm install axios.
API: More convenient and feature-rich. It automatically transforms the response data to JSON. The data is available directly on response.data.
Error Handling: Axios does reject the promise on network errors and HTTP error statuses (4xx, 5xx), which makes the .catch() block work more intuitively.
Bonus Features: Provides easy ways to set timeouts, cancel requests, and create "instances" with default settings (like a base URL and headers).
Syntax (GET request):
JavaScript

axios.get('https://api.example.com/users')
.then(response => console.log(response.data))
.catch(error => console.error('Axios error:', error));
What Interviewers Expect:

Key Differences: This is a classic interview question. "What are the main differences between fetch and axios?" You must mention:
Axios automatically stringifies request body and parses response JSON. Fetch doesn't.
Axios rejects promises on HTTP error statuses. Fetch doesn't.
Axios is a library you install. Fetch is built-in.
Which one would you choose? "In a new project, would you use fetch or axios, and why?"
Argument for Axios: "I'd choose Axios for most projects because its convenient error handling and automatic JSON parsing reduce boilerplate code. Features like creating an API instance are great for keeping code DRY."
Argument for Fetch: "If the project has a strict 'zero-dependency' policy or the bundle size is extremely critical, I would use fetch because it's already in the browser. I'd just create a wrapper function around it to handle errors and JSON parsing consistently."
Why it matters: Making API calls is a daily task. Knowing the tools and their trade-offs shows you can make informed decisions and write more robust, cleaner data-fetching logic.

34. Promises: The Foundation of Asynchronicity
    Concept: Understanding how JavaScript handles operations that take time, without freezing the entire application.

What It Is: A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. Think of it as an "IOU" for a value you don't have yet. A promise has three states:

Pending: The initial state; the operation hasn't finished yet.
Fulfilled (or Resolved): The operation completed successfully, and the promise now has a resulting value.
Rejected: The operation failed, and the promise has a reason for the failure (an error).
You interact with promises using .then() for success, .catch() for failure, and .finally() for code that should run regardless of the outcome.

async/await is just "syntactic sugar" on top of Promises. It lets you write asynchronous code that looks synchronous, making it much easier to read.

What Interviewers Expect:

Explain what a Promise is: "What is a Promise in JavaScript?" You should be able to explain the "IOU" concept and the three states (pending, fulfilled, rejected).
Promise.all vs. Promise.race:
Promise.all([p1, p2]): Waits for all promises in an array to fulfill. If even one promise rejects, the whole thing rejects immediately. Use case: You need to fetch data from two different API endpoints before you can render a component.
Promise.race([p1, p2]): Waits for the very first promise in an array to either fulfill or reject. It doesn't care about the others. Use case: You want to request a resource from multiple servers and use the one that responds fastest.
From .then to async/await: They might give you a .then().catch() chain and ask you to rewrite it using async/await with try/catch. This tests your understanding that they are two ways of doing the same thing.
Why it matters: Nearly every non-trivial operation in modern web dev is asynchronous (API calls, file reads, timers). If you don't understand Promises deeply, you can't understand modern JavaScript.

35. Webpack/Vite - What They Actually Do
    Concept: A high-level understanding of the "magic" that turns your development code into production code.

What It Is: You write code in many files using modern syntax (JSX, ES6, TypeScript). Browsers don't understand this directly. A build tool or module bundler processes your code and turns it into something the browser can understand.

Here's what it does:

Entry Point: It starts at a single file (e.g., index.js).
Dependency Graph: It reads your import statements and builds a "graph" of all the files your project needs.
Loaders & Transformations: It uses "loaders" to process different types of files.
babel-loader turns your JSX and ES6+ into regular JavaScript.
css-loader handles your CSS imports.
file-loader handles images, fonts, etc.
Bundling: It combines all your processed JavaScript files into a single (or a few) optimized file(s) called a "bundle."
Optimization: In production mode, it minifies the code (removes whitespace, shortens variable names) and performs other optimizations (like tree-shaking) to make the final file as small as possible.
Vite does the same job but uses a different, much faster approach during development by leveraging native browser capabilities.

What Interviewers Expect:

High-Level Explanation: "What is Webpack?" You don't need to know how to write a complex config from scratch. You need to explain its role: "It's a module bundler that takes all our project's assets—JavaScript, CSS, images—and transforms and bundles them into static files that a browser can efficiently load and understand."
What is a "loader"? "What does a loader do in Webpack?" Answer: A loader tells Webpack how to process non-JavaScript files. For example, babel-loader teaches Webpack how to read JSX.
Why do we need a build step? "Why can't we just put our React code directly in the browser?" Answer: Browsers don't understand JSX syntax out of the box. We also need bundling to manage dependencies and optimizations like minification and tree-shaking to create a small, fast application for production.
Why it matters: This demystifies the development process. It shows you understand the entire pipeline from source code to production asset and can reason about build-related problems.
