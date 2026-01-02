Ab hum seekhenge wo cheez jo query ko Fast se Instant bana deti hai.
Aaj ka topic hai: Caching (with Redis) ⚡️

Software Engineering mein ek kahaawat hai:
"The fastest database query is the one you never make."
(Sabse tezi wahi hai jab database ko touch hi na karna pade).

🚀 Caching: Concept Samjho
🧠 The "Waiter & Kitchen" Analogy
Imagine kar tu ek restaurant mein waiter hai.

Scenario A (Without Cache):
Customer ne pucha: "Aaj special kya hai?"
Tu kitchen mein gaya (Database), Chef se pucha, wapas aaya, Customer ko bataya.
(Time laga: 2 minutes)

Scenario B (With Cache):
Customer ne pucha: "Aaj special kya hai?"
Tujhe subah Chef ne bata diya tha, tune apne dimag (RAM) mein rakh liya. Tu kitchen nahi gaya, seedha Customer ko bata diya.
(Time laga: 2 seconds)

Redis wahi "Dimag" (RAM) hai. Ye data ko Disk (Hard drive) pe nahi, RAM pe rakhta hai.

🛑 Problem Kya Hai?
Tere app mein /questions/all wala API hai.
Agar 10,000 log same time pe ye API hit karein, to Database 10,000 baar same data dhundega. Server crash ho sakta hai.

✅ Solution: Redis Flow
Hum ek simple logic lagayenge:

Pehle Redis se pucho: "Data hai kya?"
Agar Haan (Cache Hit): Wahin se return kar do. (DB Bach gaya 🎉)
Agar Na (Cache Miss): DB se data lao, Redis mein save karo, fir return karo.
🛠️ Code Implementation (Code Snippet)
Sabse pehle library chahiye hoti hai: npm install ioredis

Dekh code mein ye logic kaise likhte hain:

File: controllers/questionController.js

JavaScript

const Redis = require("ioredis");
const redis = new Redis(); // Default localhost:6379 pe connect karega
const Question = require("../models/Question");

const getAllQuestions = async (req, res) => {
try {
// Step 1: Check Redis Cache first 🕵️‍♂️
// Humne key ka naam rakha 'all_questions'
const cachedData = await redis.get("all_questions");

    if (cachedData) {
      console.log("⚡️ Data fetched from Redis (Cache Hit)");
      // Redis string save karta hai, isliye wapas JSON banana padega
      return res.status(200).json(JSON.parse(cachedData));
    }

    // Step 2: Agar Redis mein nahi hai, to DB se mango 🐢
    console.log("🐢 Fetching from Database (Cache Miss)");
    const questions = await Question.find();

    // Step 3: DB se jo mila, usko Redis mein save karo (Future ke liye)
    // "EX", 60 ka matlab: Data 60 seconds baad expire ho jayega (TTL)
    await redis.set("all_questions", JSON.stringify(questions), "EX", 60);

    res.status(200).json(questions);

} catch (error) {
res.status(500).json({ error: "Server Error" });
}
};
⏳ Important Concept: TTL (Time To Live)
Tune code mein dekha maine "EX", 60 likha?
Isko bolte hain TTL (Time To Live).

Kyun Zaroori Hai?
Agar tu TTL nahi lagayega, to Redis mein purana data pada rahega.

Example: Tune naya Question add kiya DB mein, lekin Redis abhi bhi purani list dikha raha hai.
Solution: Hum bolte hain "Bhai Redis, ye data sirf 60 second rakh, uske baad delete kar dena." Taaki 1 minute baad naya data DB se fetch ho.
⚠️ Cache Invalidation (The Hard Part)
Ek problem aati hai:

User ne naya question add kiya (POST /add).
Database update ho gaya.
Lekin Redis mein abhi bhi purana data hai (jab tak 60 sec khatam nahi hote).
Iska fix hota hai Cache Invalidation.
Jab bhi koi naya data add ho, purana cache delete kar do.

JavaScript

const addQuestion = async (req, res) => {
// 1. Save to DB
const newQ = await Question.create(req.body);

// 2. 🔥 Purana Cache uda do!
// Taaki agli baar koi GET kare to fresh data DB se aaye
await redis.del("all_questions");

res.status(201).json(newQ);
};
