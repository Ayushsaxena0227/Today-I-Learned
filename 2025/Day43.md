Part 1: JavaScript (The Foundation for React)
Socho JS aapki car ka engine hai aur React us car ki fancy body, steering wheel, aur dashboard hai. Bina solid engine ke, fancy car chalegi nahi.

JS pehle sirf browsers mein chalti thi (client-side), but ab Node.js ki wajah se servers par bhi chalti hai (server-side).

Concept 1: var, let, aur const - Variable ka Chakkar
Aapne dusri languages mein variables banaye honge. JS mein 3 tarike hain:

var: Ye old-school tarika hai. Iska sabse bada problem hai iska "function scope". Matlab ye apne function ke bahar bhi kabhi kabhi leak ho jata hai. Isko ab avoid karo.
JavaScript

function test() {
if (true) {
var name = "Ankit"; // 'var' is function-scoped
}
console.log(name); // "Ankit" print ho jayega, jo nahi hona chahiye tha
}
let: Ye var ka modern replacement hai. Ye "block-scoped" hai. Matlab ye {} curly braces ke bahar access nahi ho sakta. Best practice!
JavaScript

function test() {
if (true) {
let name = "Ankit"; // 'let' is block-scoped
}
// console.log(name); // Error! 'name' is not defined here. Ye sahi hai!
}
const: Ye bhi block-scoped hai, but iski value re-assign nahi kar sakte. Constant values ke liye. Ek baar assign kar diya toh final.
JavaScript

const PI = 3.14;
// PI = 3.15; // Error dega!

// Important: Agar 'const' ek object ya array hai, toh aap uske andar ki values change kar sakte ho, but poora object re-assign nahi kar sakte.
const user = { name: "Rahul" };
user.name = "Rohit"; // Ye chalega!
// user = { name: "Suresh" }; // Ye Error dega!
Rule of thumb: Hamesha const use karo. Jab value change karni ho, tab hi let use karo. var ko bhool jao.

Concept 2: Arrow Functions => - The New Cool Way
Normal function:
function add(a, b) { return a + b; }

Arrow function:
const add = (a, b) => a + b;

Fayde kya hain?

Chota Syntax: Likhne mein easy aur short.
this keyword ka jhanjhat khatam: Normal functions mein this ka context badalta rehta hai, jo confusion create karta hai. Arrow functions apne parent ka this le lete hain. React mein ye bahut useful hai.
Concept 3: ES6 Goodies (Ye Modern JS hai aur React mein bhar-bhar ke use hota hai)
Template Literals: Strings ko combine karne ka easy tareeka.

JavaScript

const name = "Priya";
// Purana Tareeka
const greetingOld = "Hello " + name + "!";
// Naya Tareeka (Backticks ``use karo)
const greetingNew =`Hello ${name}!`; // Kitna clean hai!
Destructuring: Object ya array se values nikalne ka shortcut.

JavaScript

const user = {
id: 1,
firstName: "Sameer",
email: "sameer@example.com"
};

// Purana Tareeka
// const firstName = user.firstName;
// const email = user.email;

// Naya Destructuring Tareeka
const { firstName, email } = user; // Ek line mein kaam khatam!
console.log(firstName); // "Sameer"
console.log(email); // "sameer@example.com"
Spread Operator (...): Array ya object ki values ko "failane" (spread) ke liye.

JavaScript

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // arr1 ki saari values yaha aa gayi
console.log(arr2); // [1, 2, 3, 4, 5]

const userDetails = { name: "Ravi", age: 25 };
const userWithRole = { ...userDetails, role: "Developer" };
console.log(userWithRole); // { name: "Ravi", age: 25, role: "Developer" }
.map(), .filter(), .find(): Array manipulation ke liye super important methods. Ye methods naya array return karte hain, original ko change nahi karte (Immutability ka concept, jo React mein important hai).

.map(): Har item pe operation perform karke naya array banata hai.
JavaScript

const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num \* 2); // [2, 4, 6, 8]
.filter(): Condition ke basis pe items ko filter karke naya array banata hai.
JavaScript

const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(num => num % 2 === 0); // [2, 4, 6]
Concept 4: Async JS - Promises and async/await
JS single-threaded hai, matlab ek time pe ek hi kaam. Agar API call mein 5 second lag gaye, toh poora webpage freeze ho jayega. Isse bachne ke liye Async JS hai.

Promise: Ek promise hai ki "bhai main ye kaam karunga, jab ho jayega tab bata dunga (ya toh success resolve ya failure reject)".
async/await: Ye Promises ko handle karne ka modern aur clean tareeka hai.
JavaScript

// Socho ye function ek API se data la raha hai
const fetchUserData = async () => {
try {
// 'await' JS ko kehta hai, "wait karo jab tak ye promise resolve na ho jaye"
const response = await fetch('https://api.github.com/users/reactjs');
const data = await response.json(); // .json() bhi ek promise return karta hai
console.log(data);
} catch (error) {
console.error("Error aa gaya:", error);
}
};

fetchUserData();
console.log("Ye line pehle print ho jayegi, kyunki JS fetch ka wait nahi karega.");
Part 2: React (The UI Library)
Ab engine ready hai, chalo car ki body banate hain.

React ek library hai UI banane ke liye. Iska main funda hai Components.

Component kya hai?
Socho ek webpage LEGO blocks se bana hai. Har block ek component hai. Jaise: Navbar component, Button component, UserProfileCard component. Inko reuse kar sakte hain.

Setup Kaise Karein?
Sabse easy tareeka hai create-react-app. Terminal mein run karo:
npx create-react-app my-first-react-app
Ye aapke liye saara setup (Babel, Webpack etc.) automatically kar dega. Tension nahi.

Concept 1: JSX - JavaScript XML
Ye React ka sabse pehla "ajeeb" concept lagega. Ye HTML jaisa dikhta hai, but actually JS hai.

React

// Ye HTML nahi, JSX hai!
const element = <h1>Hello, Developer!</h1>;

// Browser isko aise JS mein convert kar deta hai (behind the scenes)
// const element = React.createElement('h1', null, 'Hello, Developer!');
Important JSX rules:

Har component ek hi parent element return kar sakta hai. Agar multiple elements hain, unhe <div> ya <> (Fragment) mein wrap karo.
React

// Correct
return (
<>
<h1>Title</h1>
<p>Paragraph</p> geo
</>
);
HTML mein class hota hai, JSX mein className hota hai.
JS expressions likhne ke liye {} use karo.

<h1>Hello, {user.name}</h1>
Concept 2: Functional Components & Hooks
Pehle React mein Class components use hote the, but ab sab Functional Components with Hooks use karte hain. Yehi modern standard hai.

Ek simple component:

React

// src/components/Greeting.js
import React from 'react';

function Greeting(props) {
// 'props' ek object hai jisme parent se data aata hai
return <h1>Hello, {props.name}!</h1>;
}

export default Greeting;

// App.js me isko use kaise karein
import Greeting from './components/Greeting';

function App() {
return (
<div>
<Greeting name="Aisha" />
<Greeting name="Vikram" />
</div>
);
}
Props (Properties): Parent component se child component ko data pass karne ka tareeka. Ye read-only hote hain. Upar name="Aisha" ek prop hai.
Concept 3: State & useState Hook
State kya hai? Ek component ki apni personal memory. Jab state change hota hai, React automatically us component ko re-render (update) karta hai UI pe.

useState Hook: Ye state ko functional components mein use karne ka tareeka hai.

Chalo ek simple counter banate hain:

React

// src/components/Counter.js
import React, "useState" from 'react'; // useState import karna zaroori hai

function Counter() {
// useState hook
// count: current state ki value (shuru mein 0)
// setCount: is function se 'count' ko update karenge
const [count, setCount] = useState(0);

return (
<div>
<p>Aapne {count} baar click kiya</p>
<button onClick={() => setCount(count + 1)}>
Click me
</button>
<button onClick={() => setCount(0)}>
Reset
</button>
</div>
);
}

export default Counter;
Explanation:

const [count, setCount] = useState(0); ye array destructuring hai. useState(0) 0 se start hone wala state banata hai aur 2 cheezein return karta hai: current value (count) aur usko update karne wala function (setCount).
onClick={() => setCount(count + 1)} jab button click hoga, setCount function call hoga, jo count ki value ko update karega. Jaise hi count update hoga, React poore Counter component ko nayi value ke saath screen par redraw kar dega. That's the magic of React!
Concept 4: Lists and Keys
Jab aap array se list render karte ho (.map() use karke), React ko har item ko uniquely identify karne ke liye ek key prop chahiye hota hai.

React

function TodoList() {
const todos = [
{ id: 1, text: 'Learn React' },
{ id: 2, text: 'Build a project' },
{ id: 3, text: 'Get a job' }
];

return (
<ul>
{todos.map(todo => (
<li key={todo.id}>
{todo.text}
</li>
))}
</ul>
);
}
key={todo.id} bahut zaroori hai. Ye React ki performance ke liye hota hai. Bina key ke error aayega console mein. Key string ya number ho sakti hai, but unique honi chahiye list mein.
