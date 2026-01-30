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
