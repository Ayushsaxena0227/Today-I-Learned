PI Versioning Code (V1 vs V2)
Scenario:

Version 1 (Old Mobile App): Needs { name: "John Doe" }
Version 2 (New Website): Needs { firstName: "John", lastName: "Doe" }
We create separate routers or controller functions for each version.

File: routes.js

JavaScript

const express = require('express');
const app = express();

// --- Version 1 Controller (For Old Apps) ---
// Returns merged name
const getUserV1 = (req, res) => {
// Assume fetched from DB: { firstName: 'John', lastName: 'Doe' }
res.json({
id: 1,
name: "John Doe", // <--- Old Format
email: "john@example.com"
});
};

// --- Version 2 Controller (For New Web/App) ---
// Returns split names
const getUserV2 = (req, res) => {
res.json({
id: 1,
firstName: "John", // <--- New Format
lastName: "Doe", // <--- New Format
email: "john@example.com"
});
};

// --- The Routing Magic ---
const v1Router = express.Router();
const v2Router = express.Router();

v1Router.get('/user', getUserV1);
v2Router.get('/user', getUserV2);

// Mount them at different paths
app.use('/api/v1', v1Router); // Mobile calls: /api/v1/user
app.use('/api/v2', v2Router); // Web calls: /api/v2/user

app.listen(3000, () => console.log("Server running"));
Hinglish:
Humne do alag routers banaye.
Agar purana mobile app /api/v1/user call karega, toh usse name: "John Doe" milega.
Agar naya website /api/v2/user call karega, toh usse firstName aur lastName alag-alag milenge. Isse purane users ka app crash nahi hoga.

2. Redis Caching Code (The 2ms Response)
   Prerequisite: You need Redis installed or a cloud Redis url. We use the redis npm package.

Steps:

User asks for Product List.
Check Redis. Found? Return it.
Not Found? Fetch from MongoDB.
Save to Redis (with expiry of 1 hour).
Return to user.
JavaScript

const express = require('express');
const mongoose = require('mongoose');
const { createClient } = require('redis');

const app = express();
const client = createClient(); // Connects to localhost:6379 by default
client.connect(); // Important!

// Mongoose Model
const Product = mongoose.model('Product', new mongoose.Schema({ name: String }));

app.get('/products', async (req, res) => {
const cacheKey = 'all_products';

// STEP 1: Check Redis
const cachedData = await client.get(cacheKey);

if (cachedData) {
// FOUND IN CACHE (Hit)
console.log("Serving from Redis Cache ⚡");
return res.json(JSON.parse(cachedData)); // Redis stores strings, so parse it back to JSON
}

// STEP 2: Not in Cache? Fetch from MongoDB (Miss)
console.log("Fetching from MongoDB 🐢");
const products = await Product.find();

// STEP 3: Save to Redis for next time
// 'EX': Expiry time in seconds (3600s = 1 Hour)
await client.set(cacheKey, JSON.stringify(products), {
EX: 3600
});

// STEP 4: Return to User
res.json(products);
});
Hinglish:
Pehle hum client.get('key') karte hain. Agar data mila, toh wahi se res.json bhej diya (Fast).
Agar nahi mila, toh Product.find() (MongoDB) chalao.
Jo result aaya, usse client.set karke Redis mein save kar lo agle ghante ke liye, aur phir user ko bhejo. Agli baar user aayega toh MongoDB query nahi chalegi.

3. Secure JWT with HttpOnly Cookie
   The Goal:

Don't put sensitive data (like password) in payload.
Don't send as JSON response (because frontend might store it in LocalStorage, which is unsafe).
Send as HttpOnly Cookie (JavaScript cannot read this cookie, blocking XSS attacks).
JavaScript

const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
// 1. Verify User credentials (mock code)
const user = { \_id: "u_123", email: "john@test.com", role: "admin" };

// 2. Create Payload (ONLY Safe Data)
// NEVER put password or credit card here!
const payload = {
userId: user.\_id,
role: user.role
};

const secret = process.env.JWT_SECRET; // e.g. "mySuperSecretKey"

// 3. Sign the Token
const token = jwt.sign(payload, secret, { expiresIn: '1h' });

// 4. Send as HttpOnly Cookie
res.cookie('auth_token', token, {
httpOnly: true, // Important: JS on frontend CANNOT read this
secure: true, // Send only over HTTPS (use false for localhost)
maxAge: 3600000, // 1 hour in milliseconds
sameSite: 'strict' // CSRF protection
});

res.json({ message: "Login Successful!" });
});
How Frontend (React) Works with this:

You don't need to do localStorage.setItem('token').
The browser automatically handles the cookie.
For every subsequent request (e.g., axios.get('/profile')), the browser automatically attaches this cookie.
Hinglish:
Code mein dekho:

Payload mein sirf userId aur role dala. Password nahi.
res.json({ token }) bhejne ki jagah res.cookie use kiya.
httpOnly: true ka matlab hai ki agar koi hacker tumhari site pe malicious script (JS) chala de, tab bhi wo document.cookie karke tumhara token chura nahi payega. Ye security ke liye best practice hai.
e Reality of the "Crash" (Monolith vs. Microservice)
Scenario: A bug in the "Product Review" feature causes an Infinite Loop.

Monolith:

The CPU hits 100%.
The Entire Server freezes.
Result: Login stops working. Payments stop working. The whole app is dead.
Hinglish: Ek choti si "Review" feature ki galti ne poora app band kar diya. Na koi login kar pa raha hai, na paise de pa raha hai. Sab khatam.
Microservices:

The "Review Service" CPU hits 100% and crashes.
Result: Users can't see reviews. BUT, they can still Login. They can still Buy products.
Hinglish: Sirf "Review" wala section error dikhayega. Par user abhi bhi login kar sakta hai aur payment karke saman khareed sakta hai. Business chalta rahega.
Correction to the LinkedIn Post:
The post says "If Auth is down -> nobody logs in". True. Auth is a critical service.
But if Notification Service is down?

In Monolith: The crash might kill the server -> App Dead.
In Microservices: The email won't go, but the Order is placed successfully.
Benefit 1: Blast Radius Reduction. (Ek bomb phata toh poora shehar nahi udta, sirf ek ghar udta hai).

2. The Real Reason: "Team Scaling" (Not just Code Scaling)
   This is the #1 reason companies switch.

Scenario: You have 500 developers.

Monolith:

500 people are pushing code to the SAME Github repository.
Merge conflicts everywhere.
Deploying takes 1 hour because the codebase is 50GB.
If Team A breaks something, Team B's deployment gets cancelled.
Hinglish: 500 log ek hi kitchen mein khana bana rahe hain. Bohot bhid hai. Agar ek ne namak zyada daal diya, toh poora khana kharab.
Microservices:

Team A works on "Payment Service". They have their own Git Repo, own Database.
Team B works on "User Service".
Team A can deploy "Payment V2" without asking Team B.
They can use Java for Payments and Node.js for Users.
Hinglish: Har team ka apna kitchen hai. Team A pizza bana rahi hai, Team B burger. Agar Pizza jal gaya, toh Burger wale ko koi fark nahi padta. Wo apna burger customers ko de sakta hai.
Benefit 2: Independent Deployment & Speed.

3. Scaling Resources (Money Saver)
   Scenario: It's "Big Billion Days". Everyone is Browsing products (Search Service), but only a few are Buying (Payment Service).

Monolith:

You have to clone the entire app (Search + Payment + Auth) 100 times to handle the Search traffic.
You are wasting RAM on "Payment Code" which isn't being used much.
Hinglish: Poora haathi (Elephant) clone karna pad raha hai, sirf isliye kyunki uski soond (trunk) ka kaam hai. Waste of money.
Microservices:

You spin up 100 copies of Search Service.
You keep only 5 copies of Payment Service.
Hinglish: Jahaan zaroorat hai, wahan paise lagao. Search pe load hai? Search ke servers badha do. Payment pe load nahi hai? Usko chota rakho. This saves millions of dollars.
Benefit 3: Granular Scaling.

4. The "LinkedIn Post" Truth (The Dark Side)
   The post is warning you about Complexity.

If you use Microservices for a startup with 5 developers:

You will spend 90% time managing "DevOps" (Kubernetes, Docker, Networks).
Debugging is hell (Distributed Tracing needed).
Network calls are slower than function calls.
Rule of Thumb:

Monolith: 0 - 50 Developers. (Start here. Always).
Microservices: 50+ Developers, or when the Monolith becomes impossible to deploy efficiently.
Summary for Interview
If the recruiter asks: "Microservices vs Monolith - Which is better?"

Your Answer:
