<!-- solved js qs using reduce, filter, split, join, reverse -->

// const arr = ["car", "bike", "bus", "car", "bike"];
// const VehicleCount = arr.reduce((acc, item) => {
// acc[item] = (acc[item] || 0) + 1;
// return acc;
// }, {});
// console.log(VehicleCount);

// const str = "I love JavaScript";
// const reversed = str.split(" ").reverse().join(" ");
// console.log(reversed);

// const arr = ["red", "green", "blue"];
// const Length = arr.map((item) => item.length);
// console.log(Length);

// const obj = [
// { id: 1, score: 40 },
// { id: 2, score: 75 },
// { id: 3, score: 60 },
// ];

// const Filtered = obj.filter((item) => item.score >= 60).map((item) => item.id);
// console.log(Filtered);

// From [10,20,30,40,50], return only the first 3 odd multiples of 10.
// → [10,30,50]
// const arr = [10, 20, 30, 40, 50];
// const OddMultiples = arr.filter((item) => (item / 10) % 2 !== 0);
// console.log(OddMultiples);

// Given "aaabbccccdaa", compress it.
// → "a3b2c4d1a2"
const string = "aaabbccccdaa";
const arr = string.split(" ");
const count = arr.reduce((acc, item) => {
acc[item] = (acc[item] || 0) + 1;
return acc;
}, {});
console.log(arr);
console.log(count);
