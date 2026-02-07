2. Double Booking (Atomic Transactions) & Handling 1000 Users
   You asked: "findOneAndUpdate is MongoDB. Give a general solution for SQL too, and handle 1000 users."

The Problem:
Imagine a movie theater with 1 seat left.
1000 users click "Book Now" at the exact same millisecond.

General Solution (For SQL & NoSQL)
The concept is called Optimistic Locking or Conditional Update.

Logic:
Instead of saying "Book Seat 5", you say "Book Seat 5 ONLY IF it is currently Empty".

SQL Query (PostgreSQL / MySQL):

SQL

UPDATE seats
SET status = 'BOOKED', user_id = 'Ayush'
WHERE seat_number = 5 AND status = 'EMPTY';
MongoDB Query:

JavaScript

db.seats.findOneAndUpdate(
{ seat_number: 5, status: 'EMPTY' },
{ $set: { status: 'BOOKED', user_id: 'Ayush' } }
);
How this handles 1000 users (Dry Run)
Database State: Seat 5 is EMPTY.
1000 requests hit the database at once.
Request 1 (User A):

Query: Update Seat 5 IF status is EMPTY.
DB Check: Is Seat 5 empty? YES.
Action: Changes status to BOOKED.
Result: Success (1 Row Updated).
Request 2 (User B):

Query: Update Seat 5 IF status is EMPTY.
DB Check: Is Seat 5 empty? NO. (It is now BOOKED).
Action: Does nothing.
Result: Failure (0 Rows Updated).
Requests 3 to 1000:

All check: Is Seat 5 empty? NO.
Result: Failure.
Conclusion: Only ONE request will successfully update the row (because the database locks that row for a microsecond). Everyone else gets "0 rows updated", and your backend sends them "Sorry, seat full".

3. "Handling 1000 Users at Once" (System Design Aspect)
   If 1000 users hit "Book" exactly at once, your Database might slow down or crash if you just let them all hit the DB directly.

How to handle the traffic (The Queue Approach):

If you expect huge traffic (like IRCTC or BookMyShow), you don't let everyone touch the Database directly.

The Waiting Room (Queue):

Put a Redis Queue (or RabbitMQ) in front.
When 1000 users click "Book", their requests go into the Queue first.
The Processor (Worker):

A worker script picks requests from the Queue one by one.
Request 1 -> Check DB -> Book -> Success email.
Request 2 -> Check DB -> Full -> Failure email.
Why?
The Database handles requests sequentially (one by one) comfortably without freezing. The 1000 users might see a "Processing..." spinner for 2 seconds, but the server won't crash.

Summary for Interview:
"To handle race conditions (double booking), I use Atomic/Conditional Updates (checking status='OPEN' in the query itself). For high concurrency (1000 users), I would introduce a Message Queue to process bookings sequentially so the database isn't overwhelmed."
t 1: Handling 10,000 Users Visiting (Browsing)
Scenario: 10,000 people open your website homepage. They are just scrolling, looking at images, products, prices. They are NOT buying yet.

Do you need a Queue here? NO.
Queues are for "Writes" (Booking, Payment). For "Reads" (Visiting), we use Caching & CDNs.

Strategy to handle 10k/100k visitors:

CDN (Content Delivery Network):

Logic: Your images (logo.png, product.jpg) and CSS/JS files should NOT come from your Node.js server. They should come from Cloudflare/AWS CloudFront.
Why: If 10,000 users download a 1MB image from your server, your server bandwidth will choke. A CDN serves it from a server near the user (e.g., Mumbai/Delhi).
Caching (Redis for Data):

Logic: Don't hit the Database for the "Product List".
Flow: User -> Node.js -> Redis (Get Product List) -> User.
Why: Reading from RAM (Redis) takes 2ms. Reading from Disk (MongoDB/SQL) takes 100ms. Redis can handle 100,000 requests/second easily.
Horizontal Scaling (Load Balancer):

Logic: Don't use 1 big server. Use 10 small servers behind a Load Balancer (Nginx/AWS ELB).
Flow: 10k users come -> Load Balancer sends 1k users to Server 1, 1k to Server 2...
Result: No single server dies.
Part 2: IRCTC / BookMyShow Logic (The Queue)
Q: Do they really use Redis Queues?
A: Yes. Or something similar like RabbitMQ/Kafka.
When you see "You are in queue... Position: 543" on BookMyShow during a Coldplay concert booking, that is literally a Queue system.

Why?
Because a Database (Postgres/Oracle) cannot handle 1 million people trying to update the same seat row at the same millisecond. It will "Lock" and time out.

How to implement this in Node.js (The Setup):

We use a library called BullMQ (which uses Redis under the hood).

The Architecture:
Producer (API): User clicks "Book". We add a job to Redis. We return "Booking in Progress".
Redis: Holds the list of jobs.
Consumer (Worker): A separate Node process that pulls jobs one by one and updates the Database.
The Code Setup
Step 1: Install
npm install bullmq ioredis

Step 2: The Producer (Express API)

JavaScript

const { Queue } = require('bullmq');
const bookingQueue = new Queue('booking-queue', { connection: redisConnection });

app.post('/book-ticket', async (req, res) => {
const { userId, seatId } = req.body;

// Don't touch DB here. Just add to Queue.
await bookingQueue.add('booking-job', { userId, seatId });

res.json({ message: "Request Received. We will notify you shortly." });
});
Result: API responds in 10ms. Server doesn't crash.

Step 3: The Consumer (Worker File - runs separately)

JavaScript

const { Worker } = require('bullmq');

const worker = new Worker('booking-queue', async (job) => {
const { userId, seatId } = job.data;

// NOW check Database (One by One)
const seat = await Seat.findOne({ \_id: seatId });

if (seat.status === 'OPEN') {
seat.status = 'BOOKED';
seat.user = userId;
await seat.save();
console.log(`Seat ${seatId} booked for ${userId}`);
// Send Email: Success
} else {
console.log(`Seat ${seatId} already taken.`);
// Send Email: Failed
}
}, { connection: redisConnection });
Hinglish Summary:

Browsing (10k users): Load Balancer + CDN + Redis Cache use karo. Database ko touch mat karo read operations ke liye.
Booking (Write operations): BullMQ (Redis Queue) use karo.
Jab user "Book" dabaye, request ko Queue mein daal do aur bolo "Wait karo".
Ek alag worker script queue se ek-ek karke request uthayega aur DB update karega.
Isse DB par load nahi padega aur booking safe rahegi.
