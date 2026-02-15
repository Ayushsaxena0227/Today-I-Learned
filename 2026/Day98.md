Next.js Optimizations (Performance Beast)
Next.js is famous because it solves React's biggest problem: Slow Initial Load.

Key Optimizations:

Image Optimization:

Problem: Standard <img> tag downloads full 5MB images.
Solution: <Image /> component.
Magic: It automatically resizes, compresses (WebP/AVIF), and lazy loads images.
Font Optimization:

Problem: Google Fonts cause layout shifts (CLS).
Solution: next/font.
Magic: Downloads fonts at build time and hosts them locally. Zero layout shift.
Code Splitting (Automatic):

Problem: React bundles everything into one huge JS file.
Solution: Pages/App Router.
Magic: Only the code needed for the current page is loaded.
Server Components (RSC):

Problem: Heavy JS libraries bloat the client bundle.
Solution: Server Components.
Magic: The heavy logic runs on the server. The client receives only HTML/JSON, not the JS code.
Hinglish:
"Next.js teen cheezon mein champion hai:

Images: Wo automatic choti ho jati hain.
Fonts: Wo Google se baar-baar download nahi hote, build mein hi aa jate hain.
Server Components: Jo code user ke phone pe nahi chahiye (jaise Database logic), wo server pe hi reh jata hai. Isse site fast load hoti hai." 2. MongoDB Benefits (Why NoSQL?)
Core Concept: Flexible Schema (JSON-like documents).

Benefits:

Flexibility: You don't need to define columns upfront. Today a user has name, tomorrow you add phone. No migrations needed.
Scalability (Sharding): MongoDB scales horizontally very easily. You can split data across 100 servers.
Speed (Development): Since data is stored as JSON (BSON), it maps directly to JavaScript objects. No complex ORM mapping needed.
Hinglish:
"MongoDB ka sabse bada fayda hai Flexibility. SQL mein table alter karna mushkil hota hai. MongoDB mein aaj naya field add karna hai toh bas code mein likh do, DB apne aap adjust kar lega. Fast development ke liye ye best hai."

3. When to choose SQL vs NoSQL? (The Real Rule)
   You asked: "High reads = MongoDB, High writes = SQL?"
   Correction: NO. That is a myth.

The Real Rule: Structure vs Scale.

Choose SQL (PostgreSQL / MySQL) If:
Data is Structured & Relational: Users have Orders, Orders have Products. Strict relationships.
ACID Transactions are Critical: Banking, Inventory Management. (Money shouldn't disappear).
Consistency > Speed: You need exact data instantly everywhere.
Choose NoSQL (MongoDB / Cassandra) If:
Data is Unstructured / Changing: Product Catalog (T-shirt has Size, Phone has RAM). Logs, Social Media Feeds.
Scale is Massive (Big Data): You have millions of users and need to shard data across many servers.
Speed > Consistency: It's okay if a "Like" count updates 1 second later (Eventual Consistency).
Is MongoDB faster for Reads?

Yes, for Single Document reads (e.g., User Profile).
No, for Complex Joins (e.g., Get Users who bought Product X in 2023). SQL wins here.
Is SQL faster for Writes?

Generally No. SQL has strict schema checks and locks, making writes slightly slower at massive scale.
MongoDB/Cassandra are optimized for high write throughput (Logging, IoT data). 4. Summary Table for Interview
Feature SQL (Relational) NoSQL (MongoDB)
Schema Fixed (Columns) Flexible (JSON)
Relationships Strong (Joins) Weak (Embedded Docs)
Scaling Vertical (Bigger Server) Horizontal (More Servers)
Transactions Strong ACID Available (v4.0+) but complex
Best For Finance, ERP, Order Systems Content Mgmt, IoT, Analytics, Catalogs
Hinglish Summary:
"Agar data ka structure fix hai (jaise Bank Account) aur galti ki gunjaish nahi hai (ACID), toh SQL use karo.
Agar data badalta rehta hai (jaise E-commerce Products) aur traffic bohot zyada aane wala hai (Scaling), toh MongoDB use karo.
'High Reads/Writes' wala rule ab purana ho gaya hai. Ab decision Structure aur Complexity pe liya jata hai
