Content Delivery Network) and Edge Caching.

Now, let's tackle your next two questions. These are pure "Engineering" questions.

Question 1: How do you design an API? (Key Principles)
Recruiter: "Design a 'Create Order' API for me. What key points will you keep in mind?"

The Answer (The 5 Golden Rules):

RESTful Naming Conventions:

Bad: /createOrder, /getOrders, /delete-order (Verbs in URL).
Good: Use Nouns + HTTP Methods.
POST /orders (Create)
GET /orders (List)
GET /orders/:id (Get One)
DELETE /orders/:id (Delete)
Input Validation (Safety First):

Never trust the frontend. I use libraries like Zod or Joi to validate the req.body.
Example: Ensure price is a positive number and email is valid format.
Standard Response Structure:

Don't return random JSON. Keep it consistent so Frontend devs don't cry.
Structure:
JSON

{
"success": true,
"data": { ... },
"message": "Order created successfully",
"error": null
}
Status Codes (Speak HTTP):

Use correct codes: 201 (Created), 200 (OK), 400 (Bad Input), 401 (Unauthorized), 403 (Forbidden), 500 (Server Error).
Don't send 200 OK with { error: "Failed" } inside.
Pagination & Filtering:

For GET /orders, never return all 1 million orders.
Always implement limit and page (e.g., /orders?page=1&limit=10).
Hinglish:
"API design karte waqt main 5 cheezon ka dhyan rakhta hoon:

Naming: URL mein verb nahi, noun hona chahiye (POST /orders).
Validation: req.body ko Zod se check karta hoon.
Response: Format same rakhta hoon { success, data, message }.
Status Code: Sahi code bhejna zaroori hai (201 create ke liye, 400 galti ke liye).
Pagination: List API mein limit lagana zaroori hai warna server crash ho jayega."
Question 2: How to improve performance in Node.js?
Node.js is single-threaded. If you block the thread, the server dies. Here is how you optimize it.

1. Asynchronous Code (Don't Block):

Concept: Always use async/await for File I/O or Database calls. Never use synchronous versions like fs.readFileSync in production APIs. 2. Caching (Redis):

Concept: The fastest query is the one you don't make.
Action: If an API (/products) is hit 100 times/sec, cache the result in Redis. Serve from RAM instead of Database. 3. Database Indexing (Crucial):

Concept: Searching without an Index is like reading a book page-by-page. Indexing is like using the Table of Contents.
Action: In MongoDB/SQL, add an Index on fields you search often (e.g., email, status). It makes queries 100x faster. 4. Compression (Gzip):

Action: Use the compression middleware in Express. It shrinks the JSON response size by 70% before sending it to the client.
JavaScript

const compression = require('compression');
app.use(compression()); 5. Clustering (Utilize all CPU cores):

Concept: Node.js runs on 1 CPU core by default. If your server has 8 cores, 7 are wasted.
Action: Use the cluster module or PM2 (Process Manager) to run multiple instances of your app, one for each core.
Command: pm2 start app.js -i max 6. Offload Heavy Tasks (Worker Threads):

Concept: If you need to resize an Image or calculate PDF, don't do it on the main thread.
Action: Use Worker Threads or a Message Queue (BullMQ) to handle CPU-heavy tasks in the background.
Hinglish Summary for Interview:

Recruiter: "Node.js performance kaise badhaoge?"

You:
"Performance badhane ke liye main ye techniques use karunga:

Caching: Redis use karunga frequent data ke liye.
Indexing: Database queries fast karne ke liye Indexing lagauga.
Compression: Express mein Gzip compression enable karunga taaki response size kam ho.
PM2 Clustering: Default Node ek core use karta hai, main PM2 se saare CPU cores use karunga.
Non-Blocking: Main kabhi bhi fs.sync functions use nahi karunga, hamesha Async/Await use karunga.
Offloading: Agar koi heavy calculation hai (jaise Image Processing), toh main use Worker Thread ya Queue mein daal dunga taaki main server block na ho."
