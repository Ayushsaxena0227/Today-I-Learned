Design Systems & Component Libraries
Concept: Creating a single source of truth for your UI.

What It Is: Imagine your company has 10 different products. You don't want the button on Product A to look different from the button on Product B. A Design System is the solution.

It's a collection of reusable components (Button, Card, Modal), guidelines (color palette, typography, spacing), and rules. It's like your company's private LEGO set. Every developer uses the same blocks to build UIs, ensuring everything is consistent and on-brand.

Storybook is a crucial tool here. It's an isolated development environment for building and documenting your UI components.

What Interviewers Expect:

Why Build One? "Why would a company invest time in building a custom component library instead of just using an open-source one like Material-UI or Chakra UI?" Answer: For complete control over branding, accessibility, and functionality. It ensures a unique and consistent user experience across all of a company's products.
What is Storybook? "What's the purpose of Storybook?" Answer: It allows you to develop and test UI components in isolation, outside of your main application. This makes it easier to handle all possible states (e.g., a button in its loading, disabled, and default states) and automatically generates documentation for other developers.
The Process: "You're tasked with creating a new Avatar component for your company's design system. What are the steps?" You should talk about:
Defining the requirements (props like src, size, shape).
Building the component in isolation using Storybook.
Adding tests for it using React Testing Library.
Documenting its usage and props.
Publishing it as a package to a private NPM registry (like GitHub Packages or Verdaccio).
Why it matters: This is the difference between building pages and engineering systems. It shows you think about scalability, consistency, and team collaboration.

20. Monorepo Architecture
    Concept: Managing multiple projects in a single code repository.

What It Is: Normally, you have one Git repository for your frontend app and another for your backend. But what if you have a frontend app, a marketing website, a mobile app (React Native), and a shared component library?

A Monorepo (mono-repository) puts them all in one giant repository.

text

my-company-monorepo/
├── packages/
│ ├── web-app/ (Your main React app)
│ ├── mobile-app/ (Your React Native app)
│ ├── design-system/ (Your shared components)
│ └── shared-utils/ (Shared helper functions)
└── package.json
Tools like Turborepo or Nx are used to manage this. They are smart and only rebuild/re-test the parts of the monorepo that have actually changed, making it very efficient.

What Interviewers Expect:

Benefits of a Monorepo: "Why would you choose a monorepo structure?"
Easy Code Sharing: The web-app and mobile-app can directly import components from the design-system without needing to publish/install packages.
Simplified Dependency Management: You can manage dependencies for all projects in one place.
Atomic Changes: A single commit can update both the backend API and the frontend that consumes it, ensuring they are always in sync.
Monorepo vs. Polyrepo: "What are the challenges of a monorepo compared to having multiple repositories (polyrepo)?" Answer: The initial setup is more complex, and the repository can become very large. You need smart tooling (like Turborepo) to manage build times effectively.
Why it matters: Understanding monorepos shows you can think about the architecture of a company's entire software ecosystem, not just a single app. This is a very senior-level concern.

21. Advanced Web Security (Beyond Auth)
    Concept: Protecting your users from common web attacks.

What It Is: Authentication is about who the user is. Security is about protecting them from bad actors.

XSS (Cross-Site Scripting): This is the most common attack. It happens when a bad actor manages to inject a malicious script into your website that then runs in another user's browser. For example, if you render a user's comment directly into the DOM without cleaning it first (<p>{userComment}</p>), they could write their comment as <script>steal_cookie();</script>. React is safe by default because it automatically "escapes" content rendered inside JSX. But you can still be vulnerable if you use dangerouslySetInnerHTML.
CSRF (Cross-Site Request Forgery): This is a "trick" attack. A user is logged into your site (mybank.com). They then visit a malicious site (evil.com). A button on evil.com secretly makes a POST request to mybank.com/transfer?to=hacker&amount=1000. Since the user is already logged in, the browser automatically sends their session cookie, and the transfer happens without their knowledge. How to prevent it: Use CSRF tokens or the SameSite cookie attribute.
What Interviewers Expect:

Explain XSS: "What is XSS and how does React help prevent it?" You should explain the script injection concept and state that React's JSX rendering automatically escapes string content, turning <script> into plain text &lt;script&gt;. You should also mention the danger of dangerouslySetInnerHTML.
Explain CSRF: "How does a CSRF attack work?" You should explain the scenario of a logged-in user being tricked by another site into performing an action.
localStorage vs. httpOnly Cookies (Revisited): This is the perfect place to tie it all together. "Why are httpOnly cookies more secure for storing JWTs than localStorage?" Answer: localStorage is accessible via JavaScript, so if an XSS attack is successful, the attacker's script can steal the token. An httpOnly cookie cannot be accessed by JavaScript, making it immune to theft via XSS.
Why it matters: Security is non-negotiable. Demonstrating a deep understanding of these threats proves you are a responsible engineer who can be trusted to build safe products.

22. Complex State Management with State Machines
    Concept: Making impossible states impossible.

What It Is: Consider fetching data. You have many states: idle, loading, success, error. Using useState, you might have const [isLoading, setIsLoading] = useState(false);, const [isError, setIsError] = useState(false);, etc. What stops you from accidentally setting isLoading and isError to true at the same time? Nothing. This is an impossible state.

A State Machine solves this. You define a finite number of states and the explicit transitions between them. For example: from idle, you can only go to loading. From loading, you can only go to success or error.

XState is the most popular library for this in JavaScript. It allows you to visually represent your UI's logic, making it predictable and bug-free.

What Interviewers Expect:

The "Boolean Hell" Problem: "When does simple useState or useReducer become difficult to manage?" Answer: When you have complex, interdependent states. Managing multiple booleans (isLoading, isSuccess, isError, isCancelled) can lead to "impossible states" and messy logic.
What is a State Machine? "Can you explain the concept of a finite state machine?" Answer: It's a model where a system can only be in one of a finite number of states at any given time. It can only transition from one state to another based on a specific event or condition. This eliminates ambiguity.
When to use it? "Give an example of a UI where you would consider using a library like XState." The best examples are UIs with a clear, sequential flow: a multi-step form, a video player (playing, paused, buffering, ended), or a complex drag-and-drop interface.
Why it matters: This demonstrates an extremely high level of architectural maturity. You're not just fixing bugs; you're writing code in a way that prevents entire classes of bugs from ever occurring.
