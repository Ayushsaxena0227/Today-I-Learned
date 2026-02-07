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
