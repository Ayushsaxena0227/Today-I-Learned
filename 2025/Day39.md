// // console.log("The dynamic average is:", average);
// const marks = Object.values(student.marks); //store as array
// console.log(marks);
// const sum = marks.reduce((acc, currentMark) => acc + currentMark, 0);
// console.log(sum);
// // return acc;
// // console.log(sum);
// Double every value in [10, 20, 30, 40] and store the result in a new array.
// const arr = [10, 20, 30, 40];
// const ResultArr = arr.map((item) => item \* 2);
// console.log(ResultArr);
// [1, 2, 3] and [4, 5, 6]
// const arr2 = [1, 2, 3];
// const arr1 = [4, 5, 6];
// console.log([...arr1, ...arr2]);
// console.log(arr1.push(arr2));
const products = [
{ id: 1, title: "Pen", price: 10 },
{ id: 2, title: "Pencil", price: 5 },
{ id: 3, title: "Book", price: 25 },
];

// Access the first product's title
console.log(products[0].title); // "Pen"

// Loop through all
// products.forEach((item) => console.log(item.title));
products.forEach((item) => {
console.log(item.price);
});
// Find the max price
const highest = products.reduce((max, current) =>
current.price > max.price ? current : max
);
console.log(highest.title); // "Book"
