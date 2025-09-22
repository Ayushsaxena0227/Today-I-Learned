<!-- solved api based qs of react -->

React

import { useEffect, useState } from "react";

export default function ApiTopPost() {
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
const fetchTopPosts = async () => {
try {
setLoading(true);
const response = await fetch("https://dummyjson.com/posts");
const data = await response.json();

        // Step 1: Sort by likes (highest → lowest)
        const sorted = data.posts.sort((a, b) => b.likes - a.likes);

        // Step 2: Take top 5
        const top5 = sorted.slice(0, 5);

        console.log("🔥 Top 5 most liked posts:", top5);

        setPosts(top5); // store in state if you want to show on UI
      } catch (error) {
        console.log("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPosts();

}, []);

if (loading) return <h1>Loading...</h1>;

return (
<div>
<h1>Top 5 Most Liked Posts</h1>
<ul>
{posts.map((p) => (
<li key={p.id}>
<strong>{p.title}</strong> — 👍 {p.likes}
</li>
))}
</ul>
</div>
);
}
🧮 Example output on console
From dummyjson data, something like:

text

🔥 Top 5 most liked posts:
[
{ id: 1, title: "His mother had always taught him", likes: 192 },
{ id: 5, title: "Hopes and dreams were dashed that day.", likes: 170 },
{ id: 10, title: "They rushed out the door.", likes: 163 },
{ id: 15, title: "The trees, therefore, must be such old", likes: 162 },
{ id: 20, title: "He couldn't remember exactly where he had read it", likes: 150 }
]
⚡ TL;DR
Fetch → Extract → Sort → Slice → Log/Render.
Use data.posts.sort((a, b) => b.likes - a.likes).slice(0, 5). -->
