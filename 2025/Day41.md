// console.log(Newname); // "Front-End-Developer"
// const result = "Hi there"
// .split("")
// .map(ch => (ch === " " ? "-" : ch)) // 👈 no braces, expression is auto‑returned
// .join("");

// console.log(result); // "Hi-there"
// // con
// const result = "Hi there";
// const ans = result.split("").map((ch) => ch);
// [1,2,3,4] and [3,4,5,6] → [1,2,3,4,5,6]
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const finalarr = [...new Set([...arr1, ...arr2])];
console.log(finalarr);

Scenario you asked Underlying Topic Area What it tests
“Two admins delete same comment”  Concurrency Handling / Conflict Resolution How the UI should handle race conditions and provide clear user feedback
“Connection breaks mid‑upload”  Resumable Upload Design / Network Resilience Designing retry & resume logic; making uploads robust on unstable networks
“Browser caching affects API responses”  Caching Strategies / Performance Optimization Understanding HTTP caching, stale‑while‑revalidate, cache‑control headers
“Prevent child re‑renders from parent props”  React Performance Optimization Knowing React.memo, useCallback, useMemo, and immutability principles
“API call shows wrong or stale data” (implicit from caching)  Data Consistency & State Revalidation How frontend syncs with server state correctly
“Slow mobile performance fixes”  Frontend Performance Tuning Minimizing JS bundle size, caching, virtualization, and image optimization 
“ETags / Cache headers / HTTP rules”  Network Layer Design Real‑world understanding of how browsers and CDNs cache data
“Resumable uploads and chunking”  Scalable File Handling Reliability mechanisms in large file transfers
