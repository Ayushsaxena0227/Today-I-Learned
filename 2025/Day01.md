 <!-- Practice Problems I solved today: -->

1.  isAnagram(str1, str2)
    **Question:** Return true if the words are anagrams.

```javascript
function isAnagram(str1, str2){
  return str1.split("").sort().join("") === str2.split("").sort().join("");
}

console.log(isAnagram("listen","silent")); // true
2. Flatten array of objects
Input:
[{id:1, items:["a","b"]}, {id:2, items:["b","c"]}]

o/p:
["a","b","b","c"]

const arr = [{id:1, items:["a","b"]}, {id:2, items:["b","c"]}];
const flat = arr.flatMap(x => x.items);
console.log(flat);
3. Last action per user from logs
Input:

JavaScript

[
  { user:"A", action:"login" },
  { user:"B", action:"login" },
  { user:"A", action:"logout" }
]
Output:

{ A: "logout", B: "login" }
Solution:


const logs = [
  { user:"A", action:"login" },
  { user:"B", action:"login" },
  { user:"A", action:"logout" }
];

const result = {};
logs.forEach(log => { result[log.user] = log.action; });
console.log(result);
4. Running total in an array
Input: [10, 20, 30, 40, 50]
Output: [10, 30, 60, 100, 150]

JavaScript

function runningTotal(arr){
  let total = 0;
  return arr.map(x => total += x);
}
console.log(runningTotal([10,20,30,40,50]));
```
