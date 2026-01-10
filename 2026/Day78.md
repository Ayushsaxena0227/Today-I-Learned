Assumptions:

Each service will run on a different port to simulate them being on different servers.
They will communicate with each other using REST APIs and a library like axios.
Folder Structure
To keep things organized, imagine your project has this structure:

text

microservices-example/
├── user-service/
│ ├── package.json
│ └── index.js
├── product-service/
│ ├── package.json
│ └── index.js
└── order-service/
├── package.json
└── index.js
You would cd into each folder and run npm init -y && npm install express axios.

1. The User Service (user-service/index.js)
   This service is the single source of truth for all user data. It knows nothing about products or orders.

Purpose: Manages user creation, authentication (simplified), and retrieval.
Port: 3001

JavaScript

// user-service/index.js
const express = require('express');
const app = express();
app.use(express.json());

// In-memory database for users
const users = {
"1": { id: "1", name: "Alice", email: "alice@example.com" },
"2": { id: "2", name: "Bob", email: "bob@example.com" }
};

// --- API Endpoints ---

// Get all users
app.get('/users', (req, res) => {
console.log("User Service: Returning all users.");
res.json(Object.values(users));
});

// Get a specific user by ID
app.get('/users/:id', (req, res) => {
const user = users[req.params.id];
if (user) {
console.log(`User Service: Returning user with ID ${req.params.id}.`);
res.json(user);
} else {
res.status(404).send('User not found');
}
});

const PORT = 3001;
app.listen(PORT, () => {
console.log(`✅ User Service running on port ${PORT}`);
});
To run: cd user-service && node index.js

2. The Product Service (product-service/index.js)
   This service only knows about products—their names, prices, and stock levels. It has no idea who buys them.

Purpose: Manages product information.
Port: 3002

JavaScript

// product-service/index.js
const express = require('express');
const app = express();
app.use(express.json());

// In-memory database for products
const products = {
"101": { id: "101", name: "Laptop", price: 1200, stock: 50 },
"102": { id: "102", name: "Mouse", price: 25, stock: 200 }
};

// --- API Endpoints ---

// Get all products
app.get('/products', (req, res) => {
console.log("Product Service: Returning all products.");
res.json(Object.values(products));
});

// Get a specific product by ID
app.get('/products/:id', (req, res) => {
const product = products[req.params.id];
if (product) {
console.log(`Product Service: Returning product with ID ${req.params.id}.`);
res.json(product);
} else {
res.status(404).send('Product not found');
}
});

const PORT = 3002;
app.listen(PORT, () => {
console.log(`✅ Product Service running on port ${PORT}`);
});
To run: cd product-service && node index.js

3. The Order Service (order-service/index.js) - The Communicator
   This is the most interesting service. It needs to know about both users and products to create an order. It will communicate with the other two services to get the data it needs.

Purpose: Manages order creation and retrieval.
Port: 3003

JavaScript

// order-service/index.js
const express = require('express');
const axios = require('axios'); // For making HTTP requests to other services
const app = express();
app.use(express.json());

// --- Service URLs (In a real app, these would be in environment variables) ---
const USER_SERVICE_URL = 'http://localhost:3001';
const PRODUCT_SERVICE_URL = 'http://localhost:3002';

// In-memory database for orders
const orders = [];

// --- API Endpoints ---

// Create a new order
app.post('/orders', async (req, res) => {
const { userId, productId, quantity } = req.body;

console.log("Order Service: Received request to create a new order.");

try {
// 1. COMMUNICATE with User Service to get user details
console.log(`Order Service: Fetching user data for userId: ${userId}`);
const userResponse = await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
const user = userResponse.data;
if (!user) {
return res.status(404).send('User not found');
}

    // 2. COMMUNICATE with Product Service to get product details
    console.log(`Order Service: Fetching product data for productId: ${productId}`);
    const productResponse = await axios.get(`${PRODUCT_SERVICE_URL}/products/${productId}`);
    const product = productResponse.data;
    if (!product) {
      return res.status(404).send('Product not found');
    }

    // 3. Perform business logic (e.g., check stock, calculate total)
    if (product.stock < quantity) {
      return res.status(400).send('Not enough stock available');
    }
    const totalPrice = product.price * quantity;

    // 4. Create the new order
    const newOrder = {
      orderId: Date.now().toString(), // Simple unique ID
      userId,
      productId,
      quantity,
      totalPrice,
      createdAt: new Date()
    };

    orders.push(newOrder);
    console.log("Order Service: Order created successfully.", newOrder);

    // Ideally, we'd also call the Product Service to update its stock,
    // but we'll keep it simple for this example.

    res.status(201).json(newOrder);

} catch (error) {
// Handle cases where the other services are down or return an error
console.error("Order Service: Error communicating with other services.", error.message);
if (error.response) {
// The request was made and the server responded with a status code
// that falls out of the range of 2xx
return res.status(error.response.status).send(error.response.data);
}
res.status(500).send('An error occurred while creating the order.');
}
});

// Get all orders (with enriched data)
app.get('/orders', async (req, res) => {
// In a real app, you would fetch user/product data for each order
// to return a fully populated list.
console.log("Order Service: Returning all created orders.");
res.json(orders);
});

const PORT = 3003;
app.listen(PORT, () => {
console.log(`✅ Order Service running on port ${PORT}`);
});
To run: cd order-service && node index.js

How to Test This
Open three separate terminal windows.
In each terminal, navigate to one of the service folders (user-service, product-service, order-service).
Run node index.js in each one. You should see three "running on port" messages.
Now, use a tool like Postman, Insomnia, or curl to make a POST request to the Order Service.
Example curl command:

Bash

curl -X POST http://localhost:3003/orders \
-H "Content-Type: application/json" \
-d '{
"userId": "1",
"productId": "102",
"quantity": 5
}'
What you will see in the logs:

Order Service Terminal:
text

Order Service: Received request to create a new order.
Order Service: Fetching user data for userId: 1
User Service Terminal:
text

User Service: Returning user with ID 1.
Order Service Terminal (continues):
text

Order Service: Fetching product data for productId: 102
Product Service Terminal:
text

Product Service: Returning product with ID 102.
Order Service Terminal (finishes):
text

Order Service: Order created successfully. { ...order details... }
This perfectly demonstrates the microservice architecture in action. The Order Service acted as an orchestrator, communicating with other specialized services to fulfill its task. Each service remained independent, with
art 2: Load Testing
English Explanation:
Load Testing is a type of performance testing where you simulate a high volume of users ("load") accessing your application simultaneously. The goal is not just to see if the app works, but to understand how it behaves under pressure.

Key Questions Load Testing Answers:

What is the breaking point? At what number of concurrent users does the application start to slow down dramatically or produce errors?
What is the response time under load? Does the API go from responding in 50ms to 500ms when 100 users are active?
What is the bottleneck? When the app slows down, which part is causing the problem? Is it the CPU of the web server? Is it the database running out of connections? Is it a slow third-party API?
Does it scale? If we double the number of servers, does the application handle double the traffic?
Hinglish Explanation:
Load Testing matlab aapke application ka "stress test" karna. Aap ye check karte ho ki jab ek saath bahut saare users aapki website par aa jaayenge, to wo kaisa perform karegi.

Load Testing se kya pata chalta hai:

Breaking Point: Kitne users aane par aapki website slow ho jaati hai ya crash ho jaati hai?
Response Time: Jab 100 log ek saath site use kar rahe hain, to page load hone mein kitna time lagta hai?
Bottleneck (Rukawat kahan hai?): Jab site slow hoti hai, to problem kahan hai? Kya server ka CPU 100% ho gaya hai? Ya database slow ho gaya hai?
Scalability: Agar hum server ki power double kar dein, to kya website double traffic handle kar paati hai?
How Do We Do Load Testing in Real Apps? (The Steps)
You almost never do load testing on your production environment, as it can crash the app for real users. You create a separate, identical environment specifically for this, often called a "staging" or "performance" environment.

Step 1: Define Scenarios & Goals

Scenario: What is the critical user journey you want to test? (e.g., "A user logs in, browses 3 product pages, adds an item to the cart, and then abandons.")
Goal: What are the success criteria? (e.g., "The average response time for all API calls must remain under 200ms with 500 concurrent users.")
Step 2: Choose a Tool
There are many open-source and paid tools for this. Some popular ones are:

k6 (by Grafana): Very popular, modern tool. You write your test scenarios in JavaScript.
JMeter: A Java-based, older, but very powerful and feature-rich tool with a UI.
Artillery: Another popular Node.js-based tool.
Cloud-based services: Blazemeter, LoadRunner Cloud.
Step 3: Write the Test Script
Let's use a simplified k6 example. k6 uses the concepts of VUs (Virtual Users) and duration.

JavaScript

// load-test-script.js
import http from 'k6/http';
import { sleep } from 'k6';

// --- Test Configuration ---
export const options = {
// This simulates ramping up the load
stages: [
{ duration: '1m', target: 100 }, // Ramp up to 100 virtual users over 1 minute
{ duration: '2m', target: 100 }, // Stay at 100 virtual users for 2 minutes
{ duration: '30s', target: 0 }, // Ramp down to 0 users
],
// Define success criteria (thresholds)
thresholds: {
'http_req_duration': ['p(95)<250'], // 95% of requests must complete below 250ms
'http_req_failed': ['rate<0.01'], // The failure rate should be less than 1%
},
};

// --- The Virtual User's Journey ---
export default function () {
// 1. Visit the homepage
http.get('https://my-staging-app.com/');
sleep(1); // Think for 1 second

// 2. Login
const loginPayload = JSON.stringify({ email: 'test@user.com', password: 'password' });
const loginParams = { headers: { 'Content-Type': 'application/json' } };
const loginRes = http.post('https://my-staging-app.com/api/login', loginPayload, loginParams);
sleep(1);

// 3. Browse a product
if (loginRes.status === 200) {
http.get('https://my-staging-app.com/products/123');
sleep(2);
}
}
Step 4: Run the Test
You run the test from your command line.

Bash

k6 run load-test-script.js
The tool will then start simulating the virtual users and hitting your server according to the script.

Step 5: Analyze the Results
While the test is running, k6 (and other tools) will give you a live output of key metrics:

http_req_duration: Average, min, max, p95, p99 response times.
http_req_failed: The percentage of requests that failed.
vus: The current number of active virtual users.
http_reqs: Total number of requests per second.
After the test, you look at the results. Did you meet your goals (thresholds)? If the p95 response time was 800ms instead of your 250ms goal, you know you have a performance problem.

Step 6: Identify the Bottleneck & Repeat
Now comes the hard part. You need to use monitoring tools (like Datadog, New Relic, or open-source tools like Prometheus/Grafana) on your server environment to see what happened d
