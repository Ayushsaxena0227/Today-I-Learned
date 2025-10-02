import { useEffect, useState } from "react";

export default function Paginations() {
const [posts, Setposts] = useState([]);
const [loading, Setloading] = useState(false);
const [currentPage, Setcurrentpage] = useState(1);
const [totalpage, Settotalpage] = useState(0);
const limit = 10;

useEffect(() => {
async function Fetchpagination() {
try {
Setloading(true);
const skip = (currentPage - 1) \* limit;
const res = await fetch(
`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
);
const data = await res.json();
Setposts(data.posts);
// console.log(data.total);
Settotalpage(Math.ceil(data.total / limit));
console.log(data.posts);
} catch (error) {
console.log("error occured", error);
} finally {
Setloading(false);
}
}
Fetchpagination();
}, [currentPage]);
if (loading) {
return <p>Loading...</p>; // ✅ must return
}
return (
<>

<h1>Paginations</h1>
{posts.map((post) => (
<li key={post.id}>{post.title}</li>
))}
<button
disabled={currentPage === 1}
onClick={() => Setcurrentpage((p) => p - 1)} >
prev
</button>
<span>page: {currentPage}</span>
<button
onClick={() => Setcurrentpage((p) => p + 1)}
disabled={currentPage === totalpage} >
next
</button>
</>
);
}

// const str = "javascript";
// const ans = str
// .split("")
// .map((ch) => ("aeiou".includes(ch) ? "\*" : ch))
// .join("");
// console.log(ans);

// Given sentence "React makes UI simple", return an array of word lengths.
// → [5,5,2,6]
// const str = "React makes UI simple";
// const Wordlengths = str.split(" ").map((item) => item.length);
// console.log(Wordlengths);
// Remove all numbers from array [1,"a",2,"b",3,"c"].
const arr = [1, "a", 2, "b", 3, "c"];
const Filteredarr = arr.filter((item) => typeof item === "string");
console.log(Filteredarr);
