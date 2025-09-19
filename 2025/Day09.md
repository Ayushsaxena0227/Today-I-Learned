<!-- solvd miscllaneous js ws with api response qs -->

// → { Delhi:[1,3], Mumbai:[2] }
// const arr = [
// { id: 1, city: "Delhi" },
// { id: 2, city: "Mumbai" },
// { id: 3, city: "Delhi" },
// ];

// const Group = arr.reduce((acc, item) => {
// if (!acc[item.city]) {
// acc[item.city] = [];
// }
// acc[item.city].push(item.id);
// return acc;
// // acc[item.city] = item.id;
// // return acc;
// }, {});
// console.log(Group);

const str1 = "I love coding";
const ans = str1.replace(/ /g, "-");
console.log(ans);

<!-- built a simple react list hover compo -->
<!-- mistakes i did -->
<!-- ent handlers must be functions, not direct calls
Arrow functions with {} inside .map must return explicitly


 Problem 1: Event handler directly invoked
You wrote:

React

onMouseEnter={SethoveredId(item.id)}
This calls the function immediately while rendering (which will break), instead of waiting for the hover event.
 Correct way: wrap in an arrow function

React

onMouseEnter={() => SethoveredId(item.id)}
onMouseLeave={() => SethoveredId(null)}
Now React knows "execute this when the event happens", not right now.

Problem 2: .map with curly braces
You did:

React

{items.map((item) => {
  <li>{item.name}</li>;
})}
When using curly braces {} inside an arrow function, you must explicitly return.
Otherwise, nothing comes back → items don’t render.

 Fix 1 (explicit return):

React

{items.map((item) => {
  return <li key={item.id}>{item.name}</li>;
})}
 OR Fix 2 (short form with ()):

React

{items.map((item) => (
  <li key={item.id}>{item.name}</li>
))} -->
