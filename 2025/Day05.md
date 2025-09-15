 <!-- Security Features to Consider While Designing APIs -->

1. Authentication – Know who is calling your API
   Layman’s Analogy:
   Like checking someone’s ID before letting them into a building.

Technical Explanation:
Ensure only legitimate users or apps can access your API.

Use JWT tokens (JSON Web Tokens)
Use OAuth 2.0 (for third-party logins like Google, GitHub)
Use API keys (for machine-to-machine communication)
Example (JWT in Express):

JavaScript

const jwt = require('jsonwebtoken');
app.get('/api/data', (req, res) => {
const token = req.headers.authorization?.split(" ")[1];
if (!token) return res.status(401).json({ error: "Unauthorized" });
try {
jwt.verify(token, process.env.JWT_SECRET);
res.json({ data: "Secure data here" });
} catch {
res.status(403).json({ error: "Forbidden" });
}
});
👉 Only users with a valid token can access.

2. Authorization – Control what they can do
   Layman’s Analogy:
   Even if you’re in the building, you shouldn’t have access to every room.

Technical Explanation:
Restrict actions based on roles (admin, user, guest).

Role-Based Access Control (RBAC)
Attribute-Based Access Control (ABAC)
Example:

JavaScript

if(user.role !== 'admin') return res.status(403).json({ error: 'Admins only' }); 3. Input Validation and Sanitization
Layman’s Analogy:
Like a club bouncer checking your bag to make sure you're not bringing in anything dangerous.

Technical Explanation:

Prevent SQL Injection → Use prepared statements / ORMs
Prevent XSS (Cross-site scripting) → Escape/sanitize user input
Validate input types/sizes before storing
Example (Express + Joi validator):

JavaScript

const Joi = require('joi');
const schema = Joi.object({ email: Joi.string().email().required() });
app.post('/register', (req,res) => {
const { error } = schema.validate(req.body);
if(error) return res.status(400).json({ error: error.details[0].message });
// safe to proceed
}); 4. Rate Limiting & Throttling
Layman’s Analogy:
Like a water tap that allows only a certain flow, to prevent flooding.

Technical Explanation:
Limit how many requests a client can make in a time window to prevent abuse & DDoS attacks.

Example (Express middleware):

JavaScript

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({ windowMs: 60\*1000, max: 100 });
app.use("/api/", limiter); 5. HTTPS (TLS Encryption)
Layman’s Analogy:
Like sending a letter in a sealed envelope instead of a postcard.

Technical Explanation:
Always use HTTPS, so data between client and server is encrypted and safe from man-in-the-middle attackers.

👉 In production APIs (Firebase, AWS, etc.), HTTPS is a must.

6. CORS Protection
   Why?
   Ensure only trusted frontends can call your API.

Implementation:
Set Access-Control-Allow-Origin to your frontend’s domain, not \* (except for public APIs).

7. Error Handling and Response Control
   Layman’s Analogy:
   Don’t reveal your building’s security system in your signs to thieves.

Technical Explanation:

Don’t send stack traces or SQL query dumps in error responses.
Send generic errors (e.g., “Unauthorized”) instead of “JWT expired at…” for attackers. 8. Logging & Monitoring
Layman’s Analogy:
Like CCTV cameras — track what happened in case of a break-in.

Technical Explanation:

Log failed logins, suspicious requests
Use monitoring tools → ELK stack, Datadog, Firebase logs, CloudWatch 9. Data Encryption at Rest and in Transit
Sensitive info like passwords: Always hash and salt (e.g., bcrypt, Argon2) before storing.
Never store plain text credentials or API keys.
Example:

JavaScript

const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash(password, 10); 10. Use Secure Defaults
Disable HTTP methods you don’t need (PUT, DELETE on public endpoints).
Set strict CSP (Content Security Policy).
Apply principle of least privilege (give only necessary access rights).

<!--  Interview-Ready Summary -->

"To secure APIs, I’d enforce authentication (who you are), authorization (what you can do), and always use input validation to prevent SQL injection or XSS. I’d add rate limiting to stop abuse, serve traffic only over HTTPS, and configure CORS properly. Sensitive data would be hashed or encrypted, errors would be sanitized, and everything logged for monitoring. On the server side, I’d ensure least-privilege and disable unnecessary methods. Together these protect the API from common attacks while keeping it scalable
