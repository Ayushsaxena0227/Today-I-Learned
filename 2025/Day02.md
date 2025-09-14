TIL for the “Filter + Map” interview question
const arr = [
{ id: 1, age: 18 },
{ id: 2, age: 25 },
{ id: 3, age: 16 },
];

const filtered = arr.filter((item) => item.age >= 18);
console.log(filtered);
// [ { id: 1, age: 18 }, { id: 2, age: 25 } ]
This gets all eligible adults. Valid

Follow Ups (Interview Drill)

1. Get only the ID
   const ids = arr.filter(u => u.age >= 18).map(u => u.id);
   console.log(ids); // [1,2]
   O(n) twice (filter pass + map pass).
   More readable → good for production.
2. Optimize to one pass with reduce
   JavaScript

const ids = arr.reduce((acc,u)=> {
if((u.age ?? 0) >= 18) acc.push(u.id);
return acc;
}, []);
console.log(ids); // [1,2]
Still O(n) but in one pass.
Trade‑off: less readable vs. micro performance. 3. Handle Edge Cases
What if age is missing? → use u.age ?? 0.
Empty array? Returns [].
All underage? Returns []. 4. Different Outputs
👉 Split into buckets:

JavaScript

const result = arr.reduce(
(acc,u)=>{
(u.age >= 18? acc.eligible : acc.underage).push(u.id);
return acc;
},
{eligible:[], underage:[]}
);
console.log(result);
// { eligible:[1,2], underage:[3] }
Count only:

JavaScript

const count = arr.filter(u=>u.age>=18).length;
Average age of adults:

JavaScript

const adults = arr.filter(u=>u.age>=18);
const avg = adults.reduce((a,u)=>a+u.age,0)/adults.length; 5. Time Complexity
.filter() = O(n).
.map() = O(n). Together → 2 \* O(n), still O(n).
.reduce() version = O(n) in single pass.
So same Big O, different style.

6. Mutation vs Immutability
   Interviewer trap: Does filter mutate?

.filter() does not mutate → returns new array.
.splice() does mutate.
.slice() does not mutate.
Example:

JavaScript

const arr=[1,2,3];
const spliced=arr.splice(0,2);
console.log(arr); // [3]
console.log(spliced);// [1,2]

const arr2=[1,2,3];
const sliced=arr2.slice(0,2);
console.log(arr2); // [1,2,3]
console.log(sliced); // [1,2] 7. Polyfill Show Skill
JavaScript

Array.prototype.myFilter = function(callback){
const result=[];
for(let i=0;i<this.length;i++){
if(callback(this[i],i,this)) result.push(this[i]);
}
return result;
};

console.log([1,2,3].myFilter(x=>x>1)); // [2,3]
