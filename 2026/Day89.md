1. Interface vs Type (TypeScript)
   English:
   Both define the shape of an object.

Interface: Best for objects. It supports Merging (Declaration Merging). If you define the same interface twice, TS merges them. It is slightly faster to compile.
Type: More powerful. It can define objects BUT also Unions (string | number), Primitives, and Tuples. It cannot be merged automatically.
Hinglish:
Zyada tar same hote hain. Par Interface sirf objects ke liye hota hai aur ye merge ho sakta hai (do baar same naam se banao toh jud jate hain). Type zyada powerful hai, ye Unions (A | B) aur simple data types ke liye bhi use ho sakta hai. React props ke liye hum usually type use karte hain, aur library authors interface use karte hain.

TypeScript

// Interface (Extendable)
interface User { name: string; }
interface User { age: number; }
// Result: User has both name and age

// Type (Union - Only Type can do this)
type Status = "Success" | "Failed"; 2. Why Tailwind CSS?
English:

No Context Switching: You write CSS directly in your JSX (className="p-4 bg-red-500"). No jumping between .js and .css files.
Bundle Size: Tailwind scans your code and only includes the classes you actually used. Bootstrap includes everything even if you don't use it.
Consistency: It uses a Design System (spacing scale, color palette) so you don't have magic numbers like margin: 13px.
Hinglish:
Tailwind isliye best hai kyunki hamein alag CSS file nahi banani padti. Hum seedha HTML mein likh dete hain. Doosra, ye final file size bohot chota kar deta hai (Tree Shaking) kyunki jo class use nahi hui wo hata di jati hai. Bootstrap sab kuch load karta hai, chahe use karo ya na karo.

3. Testing in React
   English:

Unit Testing: Testing individual functions/components in isolation (e.g., "Does the button click call the function?"). Tools: Jest + React Testing Library (RTL).
Integration Testing: Testing how components work together.
Philosophy: RTL encourages testing behavior (what user sees), not implementation details (state variable names).
Hinglish:
Hum Jest aur React Testing Library use karte hain. Hum user ke nazar se test karte hain: "Agar maine button dabaya, toh kya text change hua?" Hum internal state check nahi karte.
Example: expect(screen.getByText('Submit')).toBeInTheDocument();

4. Cancelling an API Request
   English:
   If a user goes to a page and quickly leaves, the API call should be cancelled to save resources.
   We use the AbortController API (native JS) or Axios CancelToken.

Hinglish:
Agar user page load hone se pehle hi chala gaya, toh API call chalti rehti hai. Hamein usse rokna chahiye. Hum AbortController use karte hain useEffect ke cleanup function mein.

JavaScript

useEffect(() => {
const controller = new AbortController();

fetch('/api/data', { signal: controller.signal })
.then(data => console.log(data))
.catch(err => {
if (err.name === 'AbortError') console.log('Fetch cancelled');
});

return () => controller.abort(); // Cleanup on Unmount
}, []); 5. Detecting Memory Leaks
English:
A memory leak happens when you try to update the state of a component that has already unmounted.

Detection: Chrome DevTools > Performance Tab (look for climbing memory graph) or Memory Tab (Take Heap Snapshots).
Warning: React used to show: "Can't perform a React state update on an unmounted component."
Hinglish:
Memory leak tab hota hai jab component mar chuka hai (unmount ho gaya) par hum uspe setState call kar rahe hain (kisi purani API request se). Isse pakadne ke liye hum Chrome DevTools ka Memory Tab use karte hain. Agar memory graph upar hi ja raha hai aur neeche nahi aa raha, matlab leak hai.

6. Fixing Hydration Errors (Next.js)
   English:
   This happens when the HTML generated on the Server (SSR) does not match the HTML generated on the Client (Browser).

Common Cause: Using window object (e.g., window.innerWidth) or Date.now() (random numbers) during the initial render. The server has no window, so it renders differently than the browser.
Hinglish:
Server ne HTML banaya "A", Browser ne banaya "B". React confuse ho jata hai, isse Hydration Error kehte hain. Ye tab hota hai jab hum render mein window ya localStorage use karte hain, jo server pe exist nahi karte. Solution: useEffect ke andar use karo.

7. localStorage & Cross-Domain Access
   English:
   NO. localStorage follows the Same-Origin Policy.

google.com cannot access localStorage of facebook.com.
Subdomains CAN share via complex iframe hacks or setting domain cookies, but localStorage is strictly isolated by domain/port/protocol.
Hinglish:
Bilkul nahi. domainA.com ka data domainB.com nahi padh sakta. Ye browser ki security policy hai. Agar aisa hota toh koi bhi site bank ki details chura leti.

8. Why Code Splitting?
   English:
   By default, React bundles the entire app into one huge bundle.js. Even if the user is on the Home Page, they download the Admin Dashboard code too.
   Code Splitting breaks this file into smaller pieces. The user only downloads what they need right now.
   Result: Faster initial load time (FCP).

Hinglish:
Agar hum code splitting na karein, toh user ko poora app download karna padega pehli baar mein hi. Code splitting se hum user ko tukdon mein code bhejte hain. Home page ke liye sirf home ka code, Admin ke liye admin ka code. Site fast khulti hai.

9. Dynamic Imports
   English:
   This is HOW we do Code Splitting. Instead of import Header from './Header', we import it asynchronously when needed.
   In React: React.lazy(() => import('./Header')).

Hinglish:
Ye code splitting karne ka tareeka hai. Normal import page load pe hi sab le aata hai. Dynamic import (import()) tabhi code lata hai jab JS wahan pahunchti hai.

JavaScript

const AdminPanel = React.lazy(() => import('./AdminPanel')); 10. Code Splitting vs Chunking
English:

Code Splitting: The Strategy/Goal (Splitting code based on routes/components).
Chunking: The Result/Implementation (Webpack/Vite creating physical files like chunk-1.js, chunk-2.js).
Basically, Code Splitting leads to multiple Chunks.
Hinglish:
"Code Splitting" ek concept hai (ki humein code todna hai). "Chunking" wo process hai jo Webpack karta hai—wo alag-alag files (chunks) banata hai. Splitting strategy hai, Chunking output hai.

11. Git Rebase
    English:

Merge: Creates a "Merge Commit" joining two branches. History looks messy (diverged).
Rebase: Moves your entire branch to the tip of the master branch. It rewrites history to make it look like a straight line.
Warning: Never rebase a public shared branch!
Hinglish:
Merge karne par ek naya commit banta hai "Merged branch X". History gandi lagti hai. Rebase tumhare commits ko utha ke master ke sabse aage laga deta hai. Aisa lagta hai tumne abhi code likha hai. History saaf (linear) rehti hai.

12. Bundle Size Awareness
    English:
    The recruiter wants to know if you care about performance.

Good Answer: "I check bundle size using webpack-bundle-analyzer. My last production build was around 150KB (Gzipped) for the main chunk. I reduced it by lazy loading heavy libraries like Chart.js."
Hinglish:
Wo dekhna chahte hain ki kya tumhe pata hai tumhara code kitna bhari hai. Bolo ki "Main webpack-bundle-analyzer use karta hoon. Mera last bundle 150-200KB ka tha. Maine heavy libraries (jaise Moment.js) hata di thin size kam karne ke liye."
