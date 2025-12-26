. Optional Chaining (?.) and Nullish Coalescing (??)
Concept: Modern JavaScript operators that make your code dramatically cleaner and safer when dealing with potentially null or undefined values.

What It Is:
This is pure JavaScript, but it's essential for writing clean React components that handle API data.

The Problem (before): The Pyramid of Checks
You get a user object from an API. It might not have a profile, which might not have an address. To safely access the street, you had to write:

JavaScript

let street;
if (user && user.profile && user.profile.address) {
street = user.profile.address.street;
}
The Solution: Optional Chaining (?.)
The ?. operator short-circuits. It stops and returns undefined as soon as it encounters a null or undefined value, preventing a "Cannot read properties of null" error.

JavaScript

const street = user?.profile?.address?.street; // If any part is null/undefined, 'street' will be undefined.
The Other Problem (before): Default Values with a Bug
You want to display a user's score, which could be 0. If the score is missing, you want to show "N/A". The old way used the || (OR) operator:

JavaScript

const score = user.score || 'N/A';
The bug: If user.score is 0, the || operator treats it as "falsy" and score will incorrectly become 'N/A'. This also happens with an empty string ''.

The Solution: Nullish Coalescing (??)
The ?? operator is much smarter. It only provides the default value if the left side is strictly null or undefined. It does not trigger for other "falsy" values like 0, '', or false.

JavaScript

const score = user.score ?? 'N/A'; // If user.score is 0, score will correctly be 0.
What Interviewers Expect:

Refactor a piece of code: They will show you nested if checks or a buggy || statement and ask you to rewrite it using modern syntax.
Explain the ?? vs || difference: This is a great question to test deep JavaScript knowledge. You must be able to explain that || reacts to all "falsy" values, while ?? only reacts to null and undefined.
Combine them: Show how you'd safely display a value or a fallback:
React

// Display the user's street, or 'Address not provided' if it's missing at any level.
return <p>{user?.profile?.address?.street ?? 'Address not provided'}</p>;
Why it matters: These operators are not just syntactic sugar; they prevent entire classes of common runtime errors and make your code significantly more concise and readable. Using them is a clear sign of a modern JavaScript developer.

74. Internationalization (i18n) in React
    Concept: The process of designing and building your application so it can be easily adapted to various languages and regions without engineering changes.

What It Is:
"i18n" is a numeronym for "internationalization" (i - 18 letters - n). It means abstracting all the text and locale-specific content out of your components.

The Wrong Way: Hardcoding text directly in your components.

React

return <button>Submit</button>;
The Right Way (The Process):

Create Translation Files: You create JSON files for each language you support.
JSON

// public/locales/en/translation.json
{ "submit_button": "Submit" }

// public/locales/es/translation.json
{ "submit_button": "Enviar" }
Use an i18n Library: You use a library like react-i18next (which is built on the powerful i18next framework) to handle the logic.
Configure the Library: You set up the library in your app's entry point, telling it where to find the translation files and what the default language is.
Use the Hook: The library provides a custom hook (e.g., useTranslation) that you use inside your components.
React

import { useTranslation } from 'react-i18next';

function MyForm() {
const { t } = useTranslation();

// 't' is a function that looks up the key in the current language's JSON file.
return <button>{t('submit_button')}</button>;
}
When the user switches their language preference, the t function automatically starts returning strings from the new language file, and your UI updates.

Beyond Text: True i18n also covers:

Number formatting: 1,234.56 (in the US) vs. 1.234,56 (in Germany).
Date formatting: MM/DD/YYYY vs. DD/MM/YYYY.
Currency formatting: Displaying prices with the correct symbol and placement.
Pluralization: Handling "1 item" vs. "2 items" correctly in different languages.
What Interviewers Expect:

"How would you approach building a multi-language application in React?" You should describe the process of abstracting strings into JSON files and using a dedicated i18n library like react-i18next.
"What are the benefits of using a library for this?" Answer: "It handles all the complex logic of loading the correct language files, provides a clean hook-based API, manages state changes when the language is switched, and has built-in support for advanced features like pluralization and interpolation."
The "t" function: They will expect you to know that the standard practice is to use a t() (for "translate") function provided by the library to wrap your string keys.
