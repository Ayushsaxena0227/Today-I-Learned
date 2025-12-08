11. Advanced React Patterns
    Concept: Custom Hooks, Higher-Order Components (HOCs), and Render Props

What It Is: These are advanced patterns for sharing logic and behavior between components. Hooks have largely replaced HOCs and Render Props, but you must know what they are.

Custom Hooks: Yeh aapki secret weapon hai. Jab aapko do ya do se zyada components mein same stateful logic use karna ho (like fetching data, using localStorage, tracking window size), to aap us logic ko ek alag function mein nikaal lete hain. Agar woh function use se shuru hota hai aur doosre hooks (useState, useEffect) use karta hai, to woh ek Custom Hook hai. This is the modern, preferred way.
Higher-Order Components (HOCs): Ek HOC ek function hota hai jo ek component leta hai aur ek naya, enhanced component return karta hai. It's like wrapping your component in a gift wrapper that adds new features (props). withRouter from old React Router or connect from Redux are classic examples.
Render Props: Is pattern mein, ek component ek prop leta hai jiska value ek function hota hai, aur woh component us function ko call karke use batata hai ki kya render karna hai. It's like saying, "Main tumhein data dunga, tum mujhe batao us data se kaun sa JSX banana hai."
What Interviewers Expect:

Create a Custom Hook: The most common question here is, "Can you create a useFetch or useLocalStorage custom hook?" You should be able to write one on the spot. It demonstrates your understanding of reusability and hooks.
JavaScript

// Example: A simple useToggle hook
function useToggle(initialValue = false) {
const [value, setValue] = useState(initialValue);
const toggle = () => setValue(prev => !prev);
return [value, toggle];
}
HOCs/Render Props vs. Hooks: "Why are Custom Hooks often better than HOCs or Render Props?" Answer: Hooks solve problems like "Wrapper Hell" (too many nested HOCs) and make it easier to see where logic is coming from. Logic is not hidden inside a wrapper.
Identify the Pattern: They might show you a piece of code and ask, "Yeh HOC hai ya Render Prop pattern?"
Why it matters: Custom Hooks are the backbone of modern, clean React applications. Knowing these patterns shows you can write DRY (Don't Repeat Yourself), maintainable, and scalable code.

12. Performance Optimization
    Concept: React.memo, Code Splitting (React.lazy), and Profiling

What It Is: Jaise-jaise aapka app bada hota hai, woh slow ho sakta hai. Yeh techniques aapke app ko fast aur responsive rakhti hain.

React.memo: Yeh ek HOC hai jo component ko "memoize" karta hai. Agar aapka component same props ke saath dobara render hone wala hai, to React pichle render ka result reuse karega aur re-render skip kar dega. Yeh useCallback ke saath bahut powerful ho jaata hai jab functions as props pass ho rahe hon.
Code Splitting (React.lazy & Suspense): By default, aapka saara app code ek bade "bundle" file mein pack hota hai. User ko app dekhne ke liye poori file download karni padti hai. Code Splitting se aap app ko chhote-chhote "chunks" mein tod dete hain. React.lazy se aap components ko tabhi load karte hain jab unki zaroorat ho. Suspense ek fallback UI (like a loader) dikhata hai jab tak woh component load ho raha hai.
Profiling: React DevTools mein ek "Profiler" tab hota hai. Yeh aapko record karne deta hai ki aapke kaun se components render ho rahe hain, kitni baar, aur kitna time le rahe hain. Isse aap performance bottlenecks dhoondh sakte hain.
What Interviewers Expect:

When to Optimize: "Aap React.memo kab use karenge?" Answer: Jab ek component bahut baar re-render ho raha ho with the same props, aur uska render process "expensive" ho (e.g., it renders a large chart or a complex SVG). Har jagah use karna counter-productive ho sakta hai. Premature optimization is bad.
Code Splitting Implementation: "How would you lazy-load a route using React Router?" You need to explain using React.lazy to import the component and wrapping the <Route> in a <Suspense> component.
Problem Solving: They might describe a scenario: "A list of 1000 items is re-rendering every time I type in a search box above it. How would you fix this?" The answer involves memo-izing the list items and ensuring the props passed to them are stable (using useCallback for functions if needed).
Why it matters: App fast matlab happy user. App slow matlab lost user. Performance is not a feature, it's a necessity. This knowledge proves you can build production-ready applications.

13. Build Tools & The Development Environment
    Concept: Webpack/Vite, Babel, NPM/Yarn, ESLint/Prettier

What It Is: Yeh woh tools hain jo parde ke peeche kaam karte hain taaki aapka modern JS/React code browser mein chal sake.

Module Bundlers (Webpack/Vite): Yeh aapke saare JS files, CSS files, images, etc. ko lete hain aur unhe optimize karke static assets mein convert karte hain jo browser samajh sake. Vite is modern and extremely fast in development. Webpack is the older, more established industry standard (used by Create React App).
Transpiler (Babel): Yeh aapke modern ES6+/JSX/TypeScript code ko plain old ES5 JavaScript mein convert karta hai jo purane browsers bhi samajh sakte hain.
Package Managers (NPM/Yarn): Yeh tools aapke project ki dependencies (external libraries like React, Axios) ko manage karte hain. package.json file iska heart hai.
Linters/Formatters (ESLint/Prettier): ESLint aapke code mein potential bugs aur style problems dhoondhta hai. Prettier aapke code ko automatically ek consistent format mein set kar deta hai. Yeh team projects ke liye essential hai.
What Interviewers Expect:

Vite vs. Create React App (Webpack): "Why is Vite's development server so fast?" Answer: Vite uses native ES modules in the browser during development, so it doesn't need to re-bundle the entire app on every change. Webpack, on the other hand, bundles everything up-front.
The Role of package.json: "What is the difference between dependencies and devDependencies?" Answer: dependencies production ke liye zaroori hain (e.g., React). devDependencies sirf development aur testing ke liye zaroori hain (e.g., ESLint, Jest).
Why use Linters? "Why is it important to have ESLint in a project?" Answer: It enforces a consistent coding style across the team, catches common errors before they become bugs, and improves overall code quality.
Why it matters: Sirf React likhna kaafi nahi hai. Ek professional developer ko apne tools aur environment ki samajh hoti hai. Yeh dikhata hai ki aap project setup, configuration, aur maintenance kar sakte hain.

14. Authentication Patterns in SPAs
    Concept: JWTs, Storing Tokens, Protected Routes

What It Is: User ko login karwana aur yeh ensure karna ki sirf logged-in users hi specific pages (like a dashboard) dekh paayein.

JWT (JSON Web Token): Yeh ek popular tareeka hai authentication ke liye. Jab user login karta hai, to server ek encrypted token generate karke client ko bhejta hai. Client har subsequent API request ke saath yeh token Authorization header mein bhejta hai taaki server use pehchaan sake.
Storing Tokens: Login ke baad client (browser) ko yeh JWT kahin store karna padta hai. Common options hain:
localStorage: Easy to use, but vulnerable to XSS (Cross-Site Scripting) attacks.
httpOnly Cookies: More secure because they can't be accessed by JavaScript, protecting against XSS. Yeh preferred method hai.
Protected Routes: Yeh React Router ka ek pattern hai. Aap ek wrapper component banate hain jo check karta hai ki user authenticated hai ya nahi (by checking for the token). Agar hai, to woh requested component render karta hai. Agar nahi, to woh user ko login page par redirect kar deta hai.
What Interviewers Expect:

How would you implement a protected route? You should be able to explain the concept of a wrapper component that checks an auth state (from Context or Redux) and conditionally renders the children or a <Navigate to="/login" /> component.
JWT Storage: "Where would you store a JWT and why? What are the security trade-offs?" You must discuss the pros and cons of localStorage vs. httpOnly cookies. Mentioning httpOnly shows you're security-conscious.
Authentication Flow: "Ek user login button par click karta hai. Uske baad se lekar uske dashboard dekhne tak, step-by-step poora data flow samjhao." You need to explain the API call, receiving the token, storing it, updating the app state, and redirecting to the protected route.
Why it matters: Almost every real-world application has authentication. This isn't a "nice-to-have" skill; it's a fundamental requirement for building secure and functional web apps.
