}
// });
// const Final = { lower, upper };
// console.log(Final);
// Count total characters (excluding spaces) in "learning javascript is fun".
// → 24
// const str = "learning javascript is fun";
// let c = 0;
// const Splitarr = str.split(" ").forEach((ch) => {
// if (ch) {
// c += ch.length;
// }
// });
// console.log(c);
// Multiply all even numbers inside [1,2,3,4,5,6].
// → 2 × 4 × 6 = 48
const arr = [1, 2, 3, 4, 5, 6];
let Prod = 1;
arr.forEach((num) => {
if (num % 2 == 0) {
Prod = Prod \* num;
}
});
console.log(Prod);
