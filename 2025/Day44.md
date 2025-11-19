rt 1 (Cont.): JavaScript ko aur Master Karein
Ye concepts thode advanced hain but modern JS development ke liye critical hain.

Concept 5: Closures - The Magical Backpack
Ye JS ka ek thoda tricky but super powerful concept hai.

Simple Explanation: Jab ek function (outer function) ek aur function (inner function) ko return karta hai, toh woh inner function apne "backpack" mein outer function ke saare variables (uska scope) leke jaata hai. Bhale hi outer function ka kaam khatam ho gaya ho, inner function ko abhi bhi un variables ka access hota hai.

JavaScript

function createGreeter(greeting) {
// 'greeting' variable outer function ke scope mein hai
return function(name) {
// Ye inner function apne backpack (closure) mein 'greeting' leke aaya hai
console.log(`${greeting}, ${name}!`);
};
}

// createGreeter function chala aur khatam ho gaya, but usne ek naya function return kiya
const sayHello = createGreeter("Hello");
const sayHola = createGreeter("Hola");

// Ab hum woh returned functions use kar rahe hain
sayHello("Deepak"); // Output: Hello, Deepak!
sayHola("Maria"); // Output: Hola, Maria!
React mein kahan use hota hai? React ke hooks (like useState, useEffect) heavily closures ke concept par based hain. Aapko ye directly likhna nahi padta, but isko samajhna debugging mein help karta hai.

Concept 6: Modules - import aur export
Aapka project jaise jaise bada hoga, aap saara code ek file mein nahi rakh sakte. Modules aapko code ko alag-alag files mein organize karne aur reuse karne mein help karte hain.

Socho aapke paas ek utils.js file hai jisme kuch helper functions hain.

JavaScript

// src/utils.js

// Named Export: Isko specific naam se import karna hoga
export const PI = 3.14;

export const add = (a, b) => a + b;

// Default Export: Ek file mein ek hi default export ho sakta hai. Isko kisi bhi naam se import kar sakte hain.
const multiply = (a, b) => a \* b;
export default multiply;
Ab inko main.js file mein use karte hain:

JavaScript

// src/main.js

// Named import: Curly braces {} zaroori hain aur naam same hona chahiye
import { PI, add } from './utils.js';

// Default import: Bina braces ke aur koi bhi naam de sakte ho
import myMultiplyFunction from './utils.js'; // 'multiply' ki jagah 'myMultiplyFunction' naam diya

console.log(PI); // 3.14
console.log(add(5, 10)); // 15
console.log(myMultiplyFunction(5, 10)); // 50
React projects mein har component ek module hota hai jise aap export karte ho aur App.js ya kisi aur component mein import karte ho.

Part 2 (Cont.): React mein Pro Banein
Chalo, ab useState se aage badhte hain.

Concept 5: The useEffect Hook - Handling Side Effects
Side Effect kya hai? Koi bhi kaam jo aapke component ke main rendering logic ke alawa ho. For example:

API se data fetch karna.
Timers set karna (setTimeout).
Directly DOM ko manipulate karna (waise ye React mein avoid karna chahiye).
Browser tab ka title change karna.
useEffect hook aapko ye side effects functional components mein perform karne deta hai.

Syntax: useEffect(callbackFunction, dependencyArray)

callbackFunction: Wo code jo aapko run karna hai.

dependencyArray: Ye ek array hai jo React ko batata hai ki callbackFunction ko kab run karna hai. This is the most important part.

[] (Empty Array): Callback sirf ek baar run hoga, jab component pehli baar screen pe render (mount) hoga. Perfect for initial API calls.
[state1, prop2] (Array with values): Callback tab run hoga jab component pehli baar render hoga, AUR har baar jab state1 ya prop2 ki value change hogi.
No Array (Not provided): Callback har render pe run hoga. Ye dangerous hai, infinite loops ho sakte hain. Almost kabhi use nahi karte.
Example: Component load hone par data fetch karna

React

import React, { useState, useEffect } from 'react';

function UserProfile() {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
// Ye function component ke pehle render ke baad chalega
const fetchUserData = async () => {
try {
const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
const data = await response.json();
setUser(data);
} catch (error) {
console.error("Failed to fetch user", error);
} finally {
setLoading(false); // Data aa gaya ya error, loading band karo
}
};

    fetchUserData();

}, []); // <-- Empty array ka matlab: "Run this only once!"

// Conditional Rendering
if (loading) {
return <p>Loading user data...</p>;
}

return (
<div>
<h1>{user.name}</h1>
<p>Email: {user.email}</p>
<p>Website: {user.website}</p>
</div>
);
}

export default UserProfile;
Concept 6: Handling User Input - Controlled Components
HTML forms mein <input>
