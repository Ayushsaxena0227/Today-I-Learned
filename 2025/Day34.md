// }
// });
// console.log(Swapped.join(""));
// Count characters including spaces in "Hello there! " but ignore punctu
// const str = "Hello there! ";
// let c = 0;
// const Newstr = str.split("").forEach((ch) => {
// if ((ch.toLowerCase() >= "a" && ch.toLowerCase() <= "z") || ch == " ") {
// c++;
// }
// });
// console.log(c);

// Replace every vowel in "banana" with *.
// const str = "banana";
// const temp = str
// .split("")
// .map((ch) => ("aeiou".includes(ch) ? "*" : ch))
// .join("");
// console.log(temp);

// Given [2, 4, 6, 8, 10], return how many elements are greater than 5.
// const arr = [2, 4, 6, 8, 10];
// let Count = 0;
// arr.forEach((item) => {
// if (item > 5) {
// Count++;
// }
// });
// console.log(Count);
// Replace all " " (spaces) in "Full Stack Developer" with "_".
//   → "Full_Stack_Developer"
// const str = "Full Stack Developer";
// let Newstring = "";
// const Spaces = str.split("").forEach((item) => {
// if (item == " ") {
// Newstring += "_";
// } else {
// Newstring += item;
// }
// });
// console.log(Newstring);
// Find total number of words in "React and Node are awesome".
// const arr = "React and Node are awesome";
// const Countwords = arr.split(" ").length;
// console.log(Countwords);

// Get last element from [10,20,30,40,50] (without using .pop() or .slice()).
// const arr = [10, 20, 30, 40, 50];
// // const Ans = arr.pop();
// const ans = arr[arr.length - 1];
// // console.log(ans);/
// const Sliced = arr.slice(2, 4);
// console.log(Sliced);

const people = [
{ name: "Ayush", city: "Noida" },
{ name: "Braj", city: "Delhi" },
{ name: "Sia", city: "Noida" },
];

const Group = people.reduce((acc, item) => {
// If this city key does not exist yet, initialize it as an empty array
if (!acc[item.city]) {
acc[item.city] = [];
}

// Push the current person's name into that city's array
acc[item.city].push(item.name);

return acc; // always return the accumulator
}, {}); // Start with an empty object

console.log(Group);
