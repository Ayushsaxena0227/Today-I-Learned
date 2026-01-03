Cron Jobs: The Server's Alarm Clock
🧠 Concept: "Raat ko kachra fekna"
Imagine kar tu ek office mein kaam karta hai.
Do tareeke hain safai karne ke:

Manual: Boss har ghante aake bole "Safai karo". (Innefficient)
Automated (Cron): Safai wale ko bol diya: "Roz raat ko 12 baje aana aur safai kar dena." Boss ko bolne ki zaroorat nahi.
Software mein bhi bohot saare kaam aise hote hain jo hum chahte hain Specific Time pe apne aap ho jayein.

🛑 Kahan Use Hota Hai?
Birthday Emails: Roz subah 9 baje check karo kiska birthday hai aur email bhej do.
Cleanup: Har raat 12 baje expired OTPs ya purane logs delete kar do.
Payment Subscription: Har mahine ki 1st tareekh ko user ke account se paise kato.
Reports: Har Sunday shaam ko pichle hafte ki sales report generate karo.
🛠️ Code Implementation (Node-Cron)
Node.js mein sabse famous library hai: node-cron
Install kar: npm install node-cron

File: jobs.js (Ya server.js mein bhi daal sakte hain)

JavaScript

const cron = require('node-cron');

// 1️⃣ Simple Task: Har minute run karega
// Syntax: 'Minute Hour Date Month Day'
cron.schedule('\* \* \* \* \*', () => {
console.log('⏳ Har minute check kar raha hoon...');
});

// 2️⃣ Practical Task: Roz Raat 12 baje (Midnight)
cron.schedule('0 0 \* \* \*', async () => {
console.log('🌙 Midnight Cleanup Started...');

// Real logic yahan aayega
// await User.deleteMany({ isVerified: false });

console.log('✅ Cleanup Done');
});

// 3️⃣ Email Task: Har Subah 8 baje
cron.schedule('0 8 \* \* _', () => {
console.log('☀️ Good Morning Emails bheje ja rahe hain...');
});
🔮 Ye _ \* \* \* \* Kya Jadoo Hai? (Cron Syntax)
Ye 5 sitare (stars) time set karte hain. Isko yaad rakhne ka tareeka:

text

---

| | | | |
| | | | └── Day of Week (0-7) (Sunday is 0 or 7)
| | | └────── Month (1-12)
| | └──────── Day of Month (1-31)
| └────────── Hour (0-23)
└──────────── Minute (0-59)
Examples:

- - - - - = Har minute.
          0 \* \* \* _ = Har ghante ki shuruwat mein (1:00, 2:00...).
          0 0 _ \* _ = Roz raat 12 baje (Midnight).
          0 9 _ _ 1 = Har Monday subah 9 baje.
          _/5 \* \* \* \* = Har 5 minute mein.
          🧠 Pro Tip (Galti mat karna)
          Agar tera server Heroku/Render/AWS (Free Tier) pe hai, aur wo server sleep mode mein chala gaya (band ho gaya), to Cron Job Nahi Chalega.
          Cron Job tabhi chalta hai jab server ON ho.

Bade projects mein hum Cloud Solutions use karte hain (jaise AWS Lambda + EventBridge) taaki server down hone par bhi job chale. Lekin shuruwat ke liye node-cron best hai.

🚀 Summary
Cron Jobs ka matlab hai server ko time-based kaam dena.
Syntax: 5 stars \* \* \* \* \* (Min, Hour, Day, Month, Weekday).
Library: node-cron.
Use Case: Emails, Cleanup, Reports generation.
