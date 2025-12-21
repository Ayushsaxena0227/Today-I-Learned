Debouncing and Throttling
Concept: Controlling how frequently a function is allowed to run. This is a critical performance optimization technique for user interactions.

What It Is: Imagine a search bar that calls an API every time the user types a character. If they type "laptop," you'll make 6 API calls: "l", "la", "lap", "lapt", "lapto", "laptop". This is incredibly wasteful.

Debouncing: (Think: "Wait for a pause")

How it works: When an event fires, you start a timer. If the event fires again before the timer finishes, you reset the timer. The function only runs after the user has stopped firing the event for a specified period.
Use Case: The search bar example. You only want to call the API after the user has stopped typing for, say, 300ms. This turns 6 API calls into just 1.
Implementation: You typically use a custom hook (useDebounce) or a utility function from a library like Lodash.
Throttling: (Think: "Limit the rate")

How it works: The function is guaranteed to run at most once every X milliseconds. It doesn't wait for a pause; it just ensures a minimum time gap between executions.
Use Case: Tracking the user's scroll position to trigger an animation or a "back to top" button. You don't need to know the scroll position 60 times per second. Throttling it to once every 200ms is more than enough and saves a lot of processing power.
Implementation: Similar to debouncing, you'd use a custom hook (useThrottle) or a library function.
What Interviewers Expect:

Explain the Difference: This is the core question. "What is the difference between debouncing and throttling?"
Debounce: Executes the function only after a period of inactivity. Good for actions where you only care about the final state (like a search query).
Throttle: Executes the function at a regular interval. Good for continuous events where you need intermediate updates (like scrolling or resizing).
Provide Use Cases: "Give me an example of when you would use debounce and when you would use throttle." Use the search bar for debounce and window scrolling/resizing for throttle.
Conceptual Implementation: While they might not ask you to write one from scratch, you should be able to conceptually explain how you'd build a useDebounce hook: "You'd use useState to store the debounced value and a useEffect with a setTimeout. The useEffect would run every time the input value changes, clearing the previous timeout and setting a new one. This ensures only the last timeout fires."
Why it matters: This demonstrates a deep understanding of frontend performance. It shows you think about resource consumption and how to create a smooth, responsive user experience, especially on less powerful devices.

43. Web Accessibility (a11y) in Practice: ARIA Roles
    Concept: Going beyond semantic HTML to make complex, dynamic widgets accessible to screen readers.

What It Is: Semantic HTML (<button>, <nav>, <input>) is the foundation of accessibility. But what about custom components like a dropdown menu, a tab interface, or a modal dialog that you build yourself using divs? A screen reader has no idea what these are.

ARIA (Accessible Rich Internet Applications) attributes are your way of telling the screen reader what's going on.

role: Tells the screen reader the type of widget. role="tablist", role="tab", role="dialog", role="alert".
aria-label or aria-labelledby: Gives a name to an element that has no visible text. A classic example is a close button with just an "X" icon: <button aria-label="Close dialog">&times;</button>.
aria- state attributes: Describe the current state of a widget.
aria-expanded="true/false": Is the dropdown menu open or closed?
aria-selected="true/false": Is this the currently active tab?
aria-hidden="true": Hides an element from screen readers (useful for modals to hide the background content).
aria-live="polite": Tells the screen reader to announce changes to this region without interrupting the user. Perfect for status messages like "Item added to cart."
What Interviewers Expect:

"How would you make a custom tab component accessible?"
The container div gets role="tablist".
Each tab button div gets role="tab".
The selected tab button gets aria-selected="true".
Each tab panel div gets role="tabpanel".
You need to manage keyboard interactions (left/right arrow keys to switch tabs).
Aria for an Icon Button: "You have a <button> with only an SVG icon inside. How do you make it accessible?" The answer is to provide an aria-label on the button itself.
The Golden Rule: They want to hear this: "The first rule of ARIA is: don't use ARIA." This means if you can use a native semantic HTML element (<button>, <input type="checkbox">), you should always do that first. It gives you accessibility for free. Only use ARIA when you are building a custom component that has no native HTML equivalent.
Why it matters: This is a mark of a senior, empathetic engineer. It shows you can build complex UIs that are usable by everyone, not just a subset of users. Many companies now have strict accessibility requirements.

44. The id Attribute in React: A Word of Caution
    Concept: Understanding why a common HTML attribute can be problematic in a component-based world.

What It Is: In plain HTML, the id attribute must be unique throughout the entire document. If you have two elements with id="my-element", it's invalid HTML.

In React, we build reusable components. Imagine you create a FormField component that uses an id to link a <label> to an <input>:

React

const FormField = () => (

  <div>
    <label htmlFor="user-name">Username</label>
    <input id="user-name" type="text" />
  </div>
);
This works fine if you only use FormField once. But what happens if you render it twice on the same page? You now have two labels and two inputs with the same id, which is invalid and breaks accessibility (clicking the second label might focus the first input).

The Solution:
Never hardcode an id in a reusable component. Instead, generate a unique ID inside the component instance.

React 18's useId hook: This is the new, official, and best way to do it. It generates a unique ID that is stable during Server-Side Rendering (SSR) and hydration.
React

import { useId } from 'react';

const FormField = () => {
const id = useId(); // e.g., returns ":r1:"
return (
<div>
<label htmlFor={id}>Username</label>
<input id={id} type="text" />
</div>
);
};
What Interviewers Expect:

The Problem with id: "Why can hardcoding an id in a React component be a bad idea?" You should explain the problem of duplicate IDs when a component is rendered more than once.
The Solution: "How would you correctly link a label to an input in a reusable component?" The best answer is to mention the useId hook. If you're working with older React versions, you might mention creating a unique ID yourself using a counter or a library, but useId is the modern, correct answer.
Accessibility Connection: This is fundamentally an accessibility issue. Duplicate IDs break the link between labels and inputs for assistive technologies.
Why it matters: This is a subtle but important detail that separates developers who think in terms of reusable components from those who are still thinking in terms of static HTML pages. It shows a deep understanding of how React's component model impacts web fundamentals.
