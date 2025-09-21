<!-- solved two api response based quesstions for react  -->

import { useEffect, useState } from "react";
// https://jsonplaceholder.typicode.com/users and https://jsonplaceholder.typicode.com/posts together.

export default function Api() {
const [users, Setusers] = useState([]);
const [post, Setposts] = useState([]);
const [loading, setloading] = useState(false);
useEffect(() => {
const Fetchboth = async () => {
try {
setloading(true);
const [userRes, Postres] = await Promise.all([
fetch("https://jsonplaceholder.typicode.com/users"),
fetch("https://jsonplaceholder.typicode.com/posts"),
]);
const [userData, PostData] = await Promise.all([
userRes.json(),
Postres.json(),
]);
const slicedData = userData.slice(5, 10);
Setusers(slicedData);
console.log(userData);
Setposts(PostData);
console.log(PostData);
} catch (error) {
console.log("Error");
} finally {
setloading(false);
}
};
Fetchboth();
}, []);
if (loading) return <h1>Loading...</h1>;

return (
<>
<h1>API questions</h1>
{users.map((u) => (
<li key={u.id}>{u?.company?.name}</li>
))}
</>
);
}
