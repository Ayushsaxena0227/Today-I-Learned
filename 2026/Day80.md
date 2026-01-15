art 1: The 5 Must-Know Fundamentals of Next.js
These are the core ideas that separate Next.js from a simple React app.

1. File-Based Routing
   What it is: The URL of a page is determined by its filename and folder path inside the app/ directory.
   Why it's fundamental: It's the skeleton of your application. It controls how users navigate and how your project is structured. It's the first thing you interact with when building a new page.
   How to explain it: "In Next.js, you don't need a separate library like react-router-dom. The routing is built-in and based on the folder structure. To create a page at /about, I simply create a folder named about inside the app directory and put a page.tsx file in it. A folder like [productId] creates a dynamic route like /products/123."
2. Server vs. Client Components
   What it is: The ability to decide whether a component's code runs on the server (the default) or in the browser (by adding 'use client').
   Why it's fundamental: This is the core performance and architecture philosophy of modern Next.js. It dictates where you fetch data, where you handle user interaction, and what code gets sent to the user.
   How to explain it: "By default, every component in Next.js is a Server Component. This is great for performance and security because it can fetch data directly from the database and its code never gets sent to the browser. If a component needs interactivity, like handling a button click with onClick or using useState, I add 'use client' at the top. This turns it into a Client Component that runs in the browser, just like a standard React component."
3. Data Fetching in Server Components
   What it is: The ability to use async/await directly inside your React page components to fetch data before the page is rendered.
   Why it's fundamental: This eliminates the need for useEffect for initial data fetching and gets rid of loading spinners, leading to a much better user experience and improved SEO.
   How to explain it: "In a traditional React app, I'd use useEffect to fetch data after the component mounts, which shows a loading state. In a Next.js Server Component, I can just write const data = await fetchData(). The page will wait for the data to be ready on the server, build the complete HTML, and then send it to the browser. The user sees the final content instantly."
4. API Routes
   What it is: The ability to build your backend API directly inside your Next.js project by creating files in the app/api/ directory.
   Why it's fundamental: It unifies your frontend and backend development into a single codebase. This simplifies your workflow, eliminates CORS issues, and makes deployment easier.
   How to explain it: "Instead of running a separate Express server, Next.js lets me create backend endpoints inside the app/api folder. A file at app/api/users/route.ts automatically becomes the /api/users endpoint. I can export GET, POST, PUT functions from that file to handle different HTTP methods. It's like having a lightweight, built-in Express server."
5. The <Link> Component
   What it is: The special Next.js component for navigating between pages.
   Why it's fundamental: It's not just a simple link. It enables one of Next.js's key performance features: pre-fetching.
   How to explain it: "For navigation, I use the <Link href="..."> component from Next.js. It's better than a regular <a> tag because it provides client-side navigation without a full page reload. More importantly, when a <Link> component appears on the screen, Next.js automatically pre-fetches the code for the linked page in the background. This makes clicking the link and navigating to the next page feel instantaneous."
   Part 2: The 5 Must-Know Fundamentals of SQL (with Prisma)
   For someone coming from a NoSQL background, these are the key concepts and shifts in thinking.

6. The Relational Model & Foreign Keys
   What it is: Data is stored in structured tables with rows and columns. Tables are linked to each other using Foreign Keys. A userId column in the Orders table is a foreign key that points to the id in the Users table.
   Why it's fundamental: This is the absolute core of SQL. Unlike NoSQL where you might embed an order inside a user document, in SQL, data lives separately and is related through these keys.
   How to explain it: "My biggest shift from NoSQL was understanding the relational model. Instead of embedding data, SQL uses separate tables. For example, to connect a Post to a User, the Posts table would have a userId column. This userId is a 'foreign key' that references the primary id of a user in the Users table. This structure ensures data consistency."
7. The Schema as a Strict Contract (schema.prisma)
   What it is: Your schema.prisma file is a strict blueprint for your entire database. Every column must have a defined type (String, Int, DateTime), and data must conform to this structure.
   Why it's fundamental: This contrasts with the flexibility of NoSQL where documents in the same collection can have different shapes. SQL's strictness prevents bad data from entering the database and enables powerful type-safety in your code.
   How to explain it: "In SQL, the schema is a strict contract. Using Prisma, I define all my tables and their columns in the schema.prisma file. For instance, if I define a price column as a Float, the database will reject any attempt to save a string there. This is different from MongoDB's flexibility but provides strong data integrity and allows Prisma to generate a perfectly type-safe client."
8. Querying with JOINs (or Prisma's include)
   What it is: The process of combining data from multiple tables in a single query.
   Why it's fundamental: Since data is separated, you constantly need to bring it back together. The SQL JOIN clause is the primary tool for this. Prisma's include is the easy, high-level abstraction over JOINs.
   How to explain it: "Because users and their orders are in separate tables, I need a way to fetch them together. In raw SQL, I'd use a JOIN query. In Prisma, it's much simpler: I use include. For example, prisma.user.findUnique({ where: { id: 1 }, include: { orders: true } }). This is the Prisma equivalent of Mongoose's .populate() and it efficiently translates to a SQL JOIN under the hood."
9. Migrations (prisma migrate)
   What it is: The formal, version-controlled process of applying changes to your database schema.
   Why it's fundamental: In a team environment, you can't just go and change the database by hand. Migrations provide a safe, repeatable, and trackable way to evolve your database structure.
   How to explain it: "With Mongoose, I would just change my schema file. With Prisma and SQL, there's a more formal process called migrations. When I change my schema.prisma file—say, add a new status column to the Orders table—I run the command npx prisma migrate dev. This automatically generates a new SQL migration file and applies it to the database. It's like Git for your database structure, ensuring everyone on the team has the same database schema."
10. Transactions
    What it is: A way to group multiple database operations together so that either all of them succeed, or none of them do. If one fails, everything is rolled back.
    Why it's fundamental: This is crucial for operations that must be atomic, especially in e-commerce and finance. For example, when a user pays for an order, you need to: 1) create the payment record, AND 2) update the order status. You can't have one without the other.
    How to explain it: "A key feature of SQL databases I've learned is transactions. They are essential for data consistency. For example, in the Kontiggo project, when a payment is successful, I'd need to update the Orders table and maybe an Inventory table. Using a Prisma transaction, like prisma.$transaction([...]), I can wrap both updates together. This guarantees that if the inventory update fails for some reason, the order status update is also rolled back, preventing an inconsistent state in the database."
