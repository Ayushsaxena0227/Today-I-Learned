rt 1: Frontend (React / Next.js)
“Before I write a single component, I focus on these 4 pillars:”

1. Component Reusability (Atomic Design)
   Concept: Don't build a "Page"; build "Blocks".
   My Approach: "I look for repeating patterns. Instead of hardcoding a button styling 10 times, I create a <Button variant='primary' /> component using libraries like clsx or cva (Class Variance Authority) to manage variants cleanly."
   Hinglish: "Main page banane se pehle patterns dhoondta hoon. Agar button 10 jagah same hai, toh main uska ek reusable component bana leta hoon taaki kal ko color change karna ho toh ek hi jagah karna pade."
2. State Management Strategy (Where does data live?)
   Concept: Lift state up only when necessary.
   My Approach: "I decide the scope of the state:
   Local UI? Use useState (e.g., Toggle Menu).
   Server Data? Use React Query or SWR (for caching & deduping).
   Global App State? Use Zustand or Redux (only if prop drilling exceeds 2-3 levels).
   URL State? For search/filters, I use URL Search Params so the page is shareable."
3. Performance & Rendering (Client vs Server)
   Concept: Ship less JavaScript.
   My Approach: "In Next.js, I keep components as Server Components by default to reduce bundle size. I only use 'use client' when I need interactivity (onClick, useEffect). I also use next/image for automatic optimization."
4. Error Boundaries & Loading States
   Concept: Don't let the app crash or freeze.
   My Approach: "I always wrap my component trees or API calls in Suspense (for loading skeletons) and Error Boundaries (so if one widget crashes, the whole page doesn't go white)."
   Part 2: Backend (Node.js / Express)
   “On the backend, my focus shifts to Security, Scalability, and Clean Architecture:”

5. Folder Structure (Service Layer Pattern)
   Concept: Separation of Concerns.
   My Approach: "I never write business logic inside the Controller.
   Routes: Only define URLs (router.get()).
   Controllers: Handle Request/Response (req, res).
   Services: Contain the actual logic (Calculations, Database calls).
   Models: Define Database Schema.
   This makes testing easy."
   Hinglish: "Main logic ko Controller mein nahi likhta. Controller sirf traffic police hai. Main logic 'Service' file mein likhta hoon. Isse code clean rehta hai aur test karna aasaan hota hai."
6. Input Validation (Never Trust the Client)
   Concept: Garbage In, Garbage Out.
   My Approach: "I assume every request is malicious. I use Zod or Joi middleware to validate req.body before it even reaches my controller. If the email format is wrong, the request gets rejected immediately."
7. Error Handling (Centralized)
   Concept: Don't use try-catch everywhere randomly.
   My Approach: "I create a global AppError class and an Error Handling Middleware. If anything fails, I pass it to next(error), and the middleware sends a consistent JSON response ({ success: false, message: '...' }) to the frontend."
8. Security Best Practices
   Concept: Protect the fort.
   My Approach:
   Helmet: Secure HTTP headers.
   Rate Limiting: Prevent DDoS/Spam using express-rate-limit.
   Cors: Configure strictly (only allow my frontend domain).
   Sanitization: Prevent NoSQL Injection/XSS.
