What is app.use() in Express?
app.use() is a method to register middleware functions in an Express app.
Middleware functions can:

Execute code
Modify req and res objects
End a request–response cycle
Or call next() to pass control to the next middleware
Example:

JavaScript

const express = require("express");
const app = express();

app.use(express.json()); // built-in JSON body parser middleware

app.use((req, res, next) => {
console.log(`${req.method} ${req.url}`);
next(); // proceed to next middleware/route
});

app.get("/", (req, res) => res.send("Home route"));
🧩 Layman analogy:
Think of middleware as security checkpoints — each app.use() adds one; a request passes through them before reaching its final route.

2️⃣ What are middleware functions?
Middleware are functions that sit between the incoming request and the final response — they process, validate, or modify the request/response objects.

Types of middleware:

Application-level → app.use(fn)
Router-level → router.use(fn)
Built-in → express.json(), express.static()
Error-handling → (err, req, res, next)
Third-party → morgan, cors, etc.
Example:

JavaScript

function logger(req, res, next) {
console.log(`Logging: ${req.url}`);
next();
}

app.use(logger);
3️⃣ Difference between app.use() and app.get()
Feature app.use() app.get()
Purpose Mounts middleware Defines route handler
Handles Methods All (GET, POST, etc.) Only GET requests
Path Matching Partial match Exact path match
Example app.use('/api', authMiddleware) app.get('/api', controller)
4️⃣ What is the event loop in Node.js?
The event loop is the heart of Node.js — it allows handling of non-blocking I/O operations on a single thread by offloading heavy tasks to the system kernel.

Phases:

Timers — execute setTimeout, setInterval
I/O callbacks
Idle / Prepare
Poll — retrieve new I/O events
Check — execute setImmediate callbacks
Close callbacks
Layman analogy:
Think of Node as a waiter in a restaurant with one hand — he doesn’t cook (I/O), he just keeps taking new orders while the kitchen (OS) handles cooking.

5️⃣ How does require() work in Node.js?
require() is a built-in function that imports modules.
It reads the file, executes it once, and caches it for reuse.

Example:

JavaScript

const math = require("./math");
math.add(2, 3);
✅ Node caches the result of require() so importing the same file again uses the cached version — improving performance.

🚀 B. Backend Routing & Architecture
6️⃣ What is Express Router and why use it?
express.Router() is a mini Express instance that helps organize routes into separate modules.

Example:

JavaScript

const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => res.send("All users"));
router.post("/users", addUser);

module.exports = router;

// app.js
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);
✅ Result: localhost:3000/api/users

🧩 Why use it?
Cleaner modular code; easy scaling and middlewares per module.

7️⃣ What is the difference between process.nextTick() and setImmediate()?
Function Executes Priority
process.nextTick() After current operation, before any I/O events Higher
setImmediate() On next iteration of event loop (Check phase) Lower
Use nextTick >> microtasks (internal).
Use setImmediate >> schedule logically “next” operations.

8️⃣ Explain how express.json() works.
It’s a built-in middleware that parses incoming requests with JSON payloads and populates req.body.

JavaScript

app.use(express.json());

app.post("/data", (req, res) => {
console.log(req.body);
res.send("Received!");
});
Without it, req.body would be undefined.

🔒 C. JWT (JSON Web Token) Interview Questions
9️⃣ What is JWT and why is it used?
JWT (JSON Web Token) is a compact, URL-safe string used for securely transmitting information (usually authentication data) between client and server.

🧩 Why:
So users can stay logged in statelessly without the server storing sessions.

🔟 How does JWT work (step-by-step)?
User logs in with credentials.

Server verifies credentials (e.g., via database).

Server generates a JWT:

text

Header.Payload.Signature
Header → algorithm + type
Payload → user info (claims)
Signature → verifies it wasn’t tampered with
Server sends token back to client.

Client stores it (usually in localStorage or cookies).

On subsequent requests →
Client sends token in the Authorization header:

text

Authorization: Bearer <token>
Server verifies token using its secret key (jwt.verify()) and either authorizes or rejects the request.

11️⃣ What are the parts of a JWT?
text

xxxx.yyyy.zzzz
Part Description
Header { "alg": "HS256", "typ": "JWT" }
Payload (Claims) { "id": 1, "email": "user@test.com" }
Signature Encrypted hash (Header + Payload + secret)
All are Base64URL encoded.

12️⃣ Example Implementation (Express + JWT)
JavaScript

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
const secret = "supersecretkey";

// LOGIN
app.post("/login", (req, res) => {
const user = { id: 1, name: "Ava" };
const token = jwt.sign(user, secret, { expiresIn: "1h" });
res.json({ token });
});

// PROTECTED ROUTE
app.get("/profile", verifyToken, (req, res) => {
res.json({ message: "Secure data", user: req.user });
});

// MIDDLEWARE
function verifyToken(req, res, next) {
const authHeader = req.headers.authorization;
if (!authHeader) return res.sendStatus(401);

const token = authHeader.split(" ")[1];
jwt.verify(token, secret, (err, decoded) => {
if (err) return res.sendStatus(403);
req.user = decoded;
next();
});
}

app.listen(3000, () => console.log("Server started"));
13️⃣ Why use JWT over session cookies?
Aspect Session cookies JWT
Storage Server (memory/DB) Client side
Scalability ⚠️ Needs shared session store ✅ Stateless
Cross-domain Limited Easier with proper CORS
Revocation Easy Complex (requires blacklist)
14️⃣ Common JWT Mistakes
Storing JWT in localStorage (vulnerable to XSS) – prefer HTTP-only cookies.
Using weak secret keys.
Forgetting to set token expiry time.
15️⃣ What’s the difference between Authentication and Authorization?
