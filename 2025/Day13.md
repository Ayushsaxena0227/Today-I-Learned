// You have an array of products in state. Build an input that lets users type, and only products whose names match should render live.

import { useState } from "react";

export default function LiveProduct() {
const [products, setProducts] = useState([
{ id: 1, name: "Apple iPhone" },
{ id: 2, name: "Samsung Galaxy" },
{ id: 3, name: "Google Pixel" },
{ id: 4, name: "OnePlus Nord" },
{ id: 5, name: "Xiaomi Redmi" },
{ id: 6, name: "Motorola Edge" },
]);
const [query, Setquery] = useState("");
const match = products.find(
(item) => item.name.toLowerCase() === query.toLowerCase()
);
// const Filtered = products?.filter((item) => item.name === products.name);
return (
<>
<h1>Live render</h1>
<input
type="text"
value={query}
placeholder="type product"
onChange={(e) => Setquery(e.target.value)}
/>
{/_ <p>{Filtered}</p> _/}
{match ? (
<p>{match.name}</p>
) : (
query && query.length > name.length && <p>No products found</p>
)}
</>
);
}
