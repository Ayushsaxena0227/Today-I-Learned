The Meta-Framework: Next.js (and its Rendering Patterns)
Concept: Server-Side Rendering (SSR), Static Site Generation (SSG), and Client-Side Rendering (CSR)

What It Is: Next.js is a powerful framework built on top of React. It gives you superpowers by letting you choose how and where your React components are rendered into HTML.

Client-Side Rendering (CSR) - The create-react-app way:

Browser gets a nearly empty HTML file.
It then downloads a large JavaScript bundle.
JavaScript runs and builds the page inside the user's browser.
Problem: Slow initial load and bad for SEO (search engines see an empty page at first).
Server-Side Rendering (SSR) - The Next.js superpower:

User requests a page (e.g., /profile).
The server runs React, fetches data, and builds the full HTML for that specific page.
It sends the complete, ready-to-view HTML to the browser.
Result: Very fast initial load and excellent for SEO. Great for pages with dynamic, user-specific data.
Static Site Generation (SSG) - The other Next.js superpower:

At build time (when you deploy your code), Next.js pre-builds every page as a static HTML file.
When a user requests a page, the server just sends the already-made HTML file instantly.
Result: Blazing fast. Perfect for blogs, marketing pages, and documentation—content that doesn't change often.
What Interviewers Expect:

SSR vs. SSG vs. CSR: This is the single most important concept. "When would you use SSR over SSG?" Answer: Use SSR for pages that need live, user-specific data on every request (like a social media feed or a user dashboard). Use SSG for pages where the content is the same for all users (like a blog post or an 'About Us' page).
Next.js Data Fetching: "What's the difference between getServerSideProps and getStaticProps?" Answer: They are special Next.js functions. getServerSideProps runs on the server for every request (SSR). getStaticProps runs only once at build time to generate the page (SSG).
Why Next.js? "Why would a company choose Next.js over Create React App?" Answer: For better performance (faster initial load), built-in SEO benefits, and the flexibility of choosing the best rendering strategy for each page.
Why it matters: Knowing Next.js shows you can build high-performance, production-grade, SEO-friendly applications, not just client-side widgets. This is what most modern tech companies are using or moving towards.

16. Modern Data Fetching: React Query (TanStack Query) & SWR
    Concept: Managing "Server State" declaratively.

What It Is: We used useState and useEffect to fetch data. This involves manually handling loading, error, and data states. It's a lot of repeated code.

Libraries like React Query and SWR completely change the game. They treat your backend data as another type of state ("server state") and manage it for you.

You just tell React Query: "I need the data from this API endpoint (/api/users)."
React Query then gives you:

The actual data.
An isLoading boolean.
An isError boolean.
Plus amazing features: automatic caching, re-fetching data when the user re-focuses the window, and much more, all out of the box.
What Interviewers Expect:

The Problem It Solves: "Why use React Query instead of just useEffect and useState?" Answer: It eliminates boilerplate code for managing loading/error states. More importantly, it handles complex scenarios like caching, request retries, and keeping data fresh automatically, leading to a much better UX and simpler code.
Client State vs. Server State: "What's the difference between client state and server state?" Answer: Client state is state that lives only in the UI (e.g., isModalOpen, a form's input value). Server state is data that lives on your backend and you just have a copy of it on the client (e.g., a user's profile, a list of products). Redux/Context are for client state; React Query is for server state.
"Stale-While-Revalidate": This is a key concept. "What does stale-while-revalidate mean?" Answer: It's a caching strategy. The library immediately shows the user the cached ("stale") data for a fast UI, while it quietly fetches fresh data in the background ("revalidate"). Once the fresh data arrives, it updates the UI.
Why it matters: Using these libraries is a sign of a modern, efficient developer. It proves you know the best tools for the job and can write cleaner, more resilient data-fetching code.

17. DevOps for Frontend: CI/CD & Hosting
    Concept: Automating the process of testing and deploying your code.

What It Is: The journey of your code from your laptop to a live website that users can visit.

Git: You already know this is for version control. But in a team, you use it with a specific workflow: create a branch for a new feature, commit your changes, push the branch, and open a Pull Request (PR).
CI/CD (Continuous Integration/Continuous Deployment): This is an automated pipeline.
CI: When you open a PR, a service like GitHub Actions automatically runs all your tests (npm test) and linting checks. If anything fails, it blocks the PR from being merged.
CD: Once the PR is approved and merged into the main branch, the pipeline automatically builds your application (npm run build) and deploys it to the hosting server.
Hosting Platforms (Vercel, Netlify): These platforms are built for modern JavaScript apps. You simply connect your GitHub repository, and they handle the entire CI/CD process for you. Push to main, and your site is live in minutes.
What Interviewers Expect:

Your Workflow: A very common senior-level question: "Describe your workflow from getting a task to seeing it in production." The answer should involve: creating a branch, writing code and tests, opening a PR, getting a code review, seeing the CI pipeline pass, merging, and watching the CD pipeline deploy it.
What is a Pull Request? "Why do we use Pull Requests?" Answer: It's a formal way to propose changes. It allows for code review by teammates to catch bugs and improve quality before the code enters the main codebase.
Environment Variables: "How do you manage secret API keys in your deployed application?" Answer: You never hardcode them. You use environment variables, which are configured directly on the hosting platform (like Vercel or Netlify).
Why it matters: This shows you're not just a coder; you're an engineer who understands the full software development lifecycle. You can work effectively in a professional team and ship features reliably.

18. Web Accessibility (a11y)
    Concept: Building websites that are usable by everyone, including people with disabilities.

What It Is: "a11y" is a numeronym (a-eleven-y). It's about empathy and professionalism. An accessible website can be used by people who are blind (using screen readers), have motor impairments (using only a keyboard), and more.

Semantic HTML: This is the foundation. Using the correct HTML tags for the job. Use <button> for buttons, <nav> for navigation, <main> for the main content. A screen reader understands that a <button> is clickable, but a <div> is just a generic box.
Keyboard Navigation: Can you use your entire website using only the Tab, Shift+Tab, Enter, and Space keys? Interactive elements must be focusable.
ARIA Attributes: When semantic HTML isn't enough, you use ARIA (Accessible Rich Internet Applications) attributes like aria-label to give extra information to screen readers.
Color Contrast: Text must have sufficient contrast with its background to be readable for people with low vision.
What Interviewers Expect:

Semantic HTML: "Why should I use <button> instead of <div onClick={...}>?" Answer: A <button> is accessible by default. It's focusable by keyboard, screen readers announce it as a button, and it can be activated with Enter/Space. A div has none of this by default.
Making a div Accessible: A follow-up might be, "Okay, but if you had to use a div as a button, how would you make it accessible?" Answer: You'd need to add role="button", tabIndex="0" (to make it focusable), and add a keyboard event handler for the Enter/Space keys. (This shows you understand why the <button> element is better).
What is alt text? "Why is the alt attribute on an <img> tag important?" Answer: It provides a text description of the image for screen reader users. If the image is purely decorative, you should provide an empty alt="" so the screen reader can skip it.
Why it matters: It's the law in many countries. It expands your potential user base. Most importantly, it's the mark of a thoughtful, empathetic, and truly professional developer who builds for all users.
