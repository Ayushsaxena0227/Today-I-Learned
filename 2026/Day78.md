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
