HLD & LLD - Complete Guide 🏗️
Bhai, ye bahut important topic hai - interviews mein bhi puchte hain aur real work mein bhi use hota hai!

🏠 Simple Analogy Se Samajh
Ghar banane jaisa soch:

text

┌─────────────────────────────────────────────────────────────┐
│ GHAR BANANA = SOFTWARE BANANA │
├─────────────────────────────────────────────────────────────┤
│ │
│ 🏠 GHAR BANATE WAQT: 💻 SOFTWARE BANATE WAQT:│
│ │
│ 1. Pehle socho: 1. HLD (High Level): │
│ • Kitne rooms? • Kitne services? │
│ • Kitchen kahan? • Database kaunsa? │
│ • Bathroom kahan? • APIs kaise? │
│ • Garden chahiye? • Cloud kaunsa? │
│ (YE HAI BLUEPRINT) (YE HAI OVERVIEW) │
│ │
│ 2. Phir detail mein: 2. LLD (Low Level): │
│ • Tiles kaunsi? • Classes kaunsi? │
│ • Wire kaise jayegi? • Functions kya? │
│ • Switch kahan lagega? • Database schema? │
│ • Pipe ka size? • API contracts? │
│ (YE HAI DETAILED PLAN) (YE HAI CODE LEVEL) │
│ │
└─────────────────────────────────────────────────────────────┘
🎯 HLD vs LLD - Quick Difference
text

┌──────────────────────┬──────────────────────────────────────┐
│ HLD │ LLD │
├──────────────────────┼──────────────────────────────────────┤
│ Bird's eye view 🦅 │ Ant's eye view 🐜 │
│ WHAT to build │ HOW to build │
│ Components/Services │ Classes/Functions │
│ System Architects │ Developers │
│ Client ko dikhate │ Team internally use karti │
│ Less Technical │ Very Technical │
│ Boxes & Arrows │ Code level diagrams │
└──────────────────────┴──────────────────────────────────────┘
📐 HLD - High Level Design
Kya Hota Hai HLD?
HLD = System ka 10,000 feet view

Isme hum decide karte hain:

System ke major components kya honge
Ye components kaise baat karenge (communication)
Kaunsi technologies use hongi
Data kaise flow karega
HLD Mein Kya Kya Hota Hai?
text

┌─────────────────────────────────────────────────────────────┐
│ HLD COMPONENTS │
├─────────────────────────────────────────────────────────────┤
│ │
│ 1️⃣ SYSTEM ARCHITECTURE DIAGRAM │
│ → Saare components ka diagram │
│ → Kaise connected hain │
│ │
│ 2️⃣ TECHNOLOGY STACK │
│ → Frontend: React/Angular │
│ → Backend: Node.js/Java │
│ → Database: MongoDB/PostgreSQL │
│ → Cloud: AWS/GCP/Azure │
│ │
│ 3️⃣ DATABASE DESIGN (High Level) │
│ → Kaunsi tables/collections │
│ → Relationships │
│ │
│ 4️⃣ API DESIGN (High Level) │
│ → Major endpoints │
│ → Authentication method │
│ │
│ 5️⃣ THIRD PARTY INTEGRATIONS │
│ → Payment gateway │
│ → SMS/Email service │
│ → Maps API │
│ │
│ 6️⃣ SCALABILITY & SECURITY │
│ → Load balancer │
│ → Caching strategy │
│ → Security measures │
│ │
└─────────────────────────────────────────────────────────────┘
🍕 HLD Example: Zomato Jaisa Food Delivery App
text

┌─────────────────────────────────────────────────────────────────────┐
│ FOOD DELIVERY APP - HLD │
├─────────────────────────────────────────────────────────────────────┤
│ │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │ User │ │Restaurant│ │ Delivery │ │
│ │ App │ │ App │ │ App │ │
│ └────┬─────┘ └────┬─────┘ └────┬─────┘ │
│ │ │ │ │
│ └────────────────┼────────────────┘ │
│ │ │
│ ▼ │
│ ┌─────────────────┐ │
│ │ API GATEWAY │ │
│ │ (Load Balancer)│ │
│ └────────┬────────┘ │
│ │ │
│ ┌────────────────┼────────────────┐ │
│ │ │ │ │
│ ▼ ▼ ▼ │
│ ┌─────────┐ ┌──────────┐ ┌───────────┐ │
│ │ User │ │ Order │ │ Payment │ │
│ │ Service │ │ Service │ │ Service │ │
│ └────┬────┘ └────┬─────┘ └─────┬─────┘ │
│ │ │ │ │
│ ▼ ▼ ▼ │
│ ┌─────────┐ ┌──────────┐ ┌───────────┐ │
│ │User DB │ │Order DB │ │Payment DB │ │
│ │(MongoDB)│ │(MongoDB) │ │(PostgreSQL│ │
│ └─────────┘ └──────────┘ └───────────┘ │
│ │
│ ┌────────────────────────────────────────────┐ │
│ │ EXTERNAL SERVICES │ │
│ │ • Razorpay (Payment) │ │
│ │ • Google Maps (Location) │ │
│ │ • Firebase (Push Notifications) │ │
│ │ • Twilio (SMS) │ │
│ └────────────────────────────────────────────┘ │
│ │
│ ┌────────────────────────────────────────────┐ │
│ │ INFRASTRUCTURE │ │
│ │ • AWS EC2 (Servers) │ │
│ │ • AWS S3 (Image Storage) │ │
│ │ • Redis (Caching) │ │
│ │ • Elasticsearch (Search) │ │
│ └────────────────────────────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────────────┘
🔍 LLD - Low Level Design
Kya Hota Hai LLD?
LLD = Code level ka detailed design

Isme hum decide karte hain:

Kaunsi classes banayenge
Classes mein kya functions honge
Database ka exact schema
API ka exact request/response
LLD Mein Kya Kya Hota Hai?
text

┌─────────────────────────────────────────────────────────────┐
│ LLD COMPONENTS │
├─────────────────────────────────────────────────────────────┤
│ │
│ 1️⃣ CLASS DIAGRAMS │
│ → Classes kya hongi │
│ → Properties & Methods │
│ → Inheritance/Composition │
│ │
│ 2️⃣ DATABASE SCHEMA (Detailed) │
│ → Exact columns/fields │
│ → Data types │
│ → Indexes │
│ → Constraints │
│ │
│ 3️⃣ API CONTRACTS (Detailed) │
│ → Exact request body │
│ → Exact response body │
│ → Error codes │
│ → Validation rules │
│ │
│ 4️⃣ SEQUENCE DIAGRAMS │
│ → Step by step flow │
│ → Kaunsa function kab call hoga │
│ │
│ 5️⃣ DESIGN PATTERNS │
│ → Singleton, Factory, etc. │
│ │
│ 6️⃣ FOLDER STRUCTURE │
│ → Code kaise organize hoga │
│ │
└─────────────────────────────────────────────────────────────┘
🍕 LLD Example: Order Service (Same Food App)

1. Class Diagram
   text

┌─────────────────────────────────────────────────────────────┐
│ CLASS DIAGRAM │
├─────────────────────────────────────────────────────────────┤
│ │
│ ┌─────────────────────────┐ │
│ │ User │ │
│ ├─────────────────────────┤ │
│ │ - \_id: ObjectId │ │
│ │ - name: String │ │
│ │ - email: String │ │
│ │ - phone: String │ │
│ │ - addresses: Address[] │ │
│ ├─────────────────────────┤ │
│ │ + createOrder() │ │
│ │ + getOrders() │ │
│ │ + updateProfile() │ │
│ └───────────┬─────────────┘ │
│ │ 1:N │
│ ▼ │
│ ┌─────────────────────────┐ ┌─────────────────────┐ │
│ │ Order │ │ Restaurant │ │
│ ├─────────────────────────┤ ├─────────────────────┤ │
│ │ - \_id: ObjectId │ │ - \_id: ObjectId │ │
│ │ - userId: ObjectId │◄────►│ - name: String │ │
│ │ - restaurantId: ObjectId│ │ - address: Address │ │
│ │ - items: OrderItem[] │ │ - menu: MenuItem[] │ │
│ │ - totalAmount: Number │ │ - rating: Number │ │
│ │ - status: OrderStatus │ ├─────────────────────┤ │
│ │ - paymentId: ObjectId │ │ + getMenu() │ │
│ │ - createdAt: Date │ │ + updateOrder() │ │
│ ├─────────────────────────┤ └─────────────────────┘ │
│ │ + create() │ │
│ │ + updateStatus() │ │
│ │ + cancel() │ │
│ └─────────────────────────┘ │
│ │
│ ┌─────────────────────────┐ │
│ │ OrderItem │ │
│ ├─────────────────────────┤ │
│ │ - menuItemId: ObjectId │ │
│ │ - name: String │ │
│ │ - quantity: Number │ │
│ │ - price: Number │ │
│ └─────────────────────────┘ │
│ │
│ ┌─────────────────────────┐ │
│ │ <<enum>> OrderStatus │ │
│ ├─────────────────────────┤ │
│ │ PENDING │ │
│ │ CONFIRMED │ │
│ │ PREPARING │ │
│ │ OUT_FOR_DELIVERY │ │
│ │ DELIVERED │ │
│ │ CANCELLED │ │
│ └─────────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────┘ 2. Database Schema (MongoDB)
JavaScript

// User Schema
const UserSchema = {
\_id: ObjectId,
name: { type: String, required: true },
email: { type: String, unique: true, required: true },
phone: { type: String, required: true },
password: { type: String, required: true }, // hashed
addresses: [{
label: String, // "Home", "Office"
street: String,
city: String,
pincode: String,
coordinates: {
lat: Number,
lng: Number
}
}],
createdAt: { type: Date, default: Date.now },
updatedAt: Date
}

// Order Schema
const OrderSchema = {
\_id: ObjectId,
userId: { type: ObjectId, ref: 'User', required: true },
restaurantId: { type: ObjectId, ref: 'Restaurant', required: true },
items: [{
menuItemId: ObjectId,
name: String,
quantity: { type: Number, min: 1 },
price: Number
}],
totalAmount: { type: Number, required: true },
deliveryAddress: {
street: String,
city: String,
pincode: String,
coordinates: { lat: Number, lng: Number }
},
status: {
type: String,
enum: ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'],
default: 'PENDING'
},
paymentId: { type: ObjectId, ref: 'Payment' },
deliveryPartnerId: { type: ObjectId, ref: 'DeliveryPartner' },
estimatedDeliveryTime: Date,
createdAt: { type: Date, default: Date.now },
updatedAt: Date
}

// Indexes for faster queries
OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.index({ restaurantId: 1, status: 1 });
OrderSchema.index({ deliveryPartnerId: 1, status: 1 }); 3. API Contracts (Detailed)
YAML

# Create Order API

POST /api/orders

Headers:
Authorization: Bearer <jwt_token>
Content-Type: application/json

Request Body:
{
"restaurantId": "64a1b2c3d4e5f6789",
"items": [
{
"menuItemId": "64a1b2c3d4e5f6111",
"quantity": 2
},
{
"menuItemId": "64a1b2c3d4e5f6222",
"quantity": 1
}
],
"deliveryAddressIndex": 0, // user ke addresses array ka index
"paymentMethod": "ONLINE", // ONLINE | COD
"couponCode": "FLAT50" // optional
}

Response (201 Created):
{
"success": true,
"message": "Order placed successfully",
"data": {
"orderId": "64a1b2c3d4e5f6999",
"totalAmount": 450,
"discount": 50,
"finalAmount": 400,
"estimatedDeliveryTime": "2024-01-15T14:30:00Z",
"status": "PENDING",
"paymentStatus": "PENDING",
"paymentLink": "https://razorpay.com/pay/xyz" // if online payment
}
}

Error Responses:
400 Bad Request:
{
"success": false,
"message": "Invalid request",
"errors": [
{ "field": "items", "message": "At least one item required" }
]
}

401 Unauthorized:
{
"success": false,
"message": "Token expired or invalid"
}

404 Not Found:
{
"success": false,
"message": "Restaurant not found"
} 4. Sequence Diagram: Place Order Flow
text

┌─────────────────────────────────────────────────────────────────────┐
│ PLACE ORDER - SEQUENCE DIAGRAM │
├─────────────────────────────────────────────────────────────────────┤
│ │
│ User Frontend API Gateway Order Payment │
│ │ │ │ Service Service │
│ │ │ │ │ │ │
│ │ Click │ │ │ │ │
│ │ "Place │ │ │ │ │
│ │ Order" │ │ │ │ │
│ │─────────────►│ │ │ │ │
│ │ │ │ │ │ │
│ │ │ POST │ │ │ │
│ │ │ /orders │ │ │ │
│ │ │─────────────►│ │ │ │
│ │ │ │ │ │ │
│ │ │ │ Validate │ │ │
│ │ │ │ Token │ │ │
│ │ │ │───────────►│ │ │
│ │ │ │ │ │ │
│ │ │ │ │ Validate │ │
│ │ │ │ │ Items & │ │
│ │ │ │ │ Calculate │ │
│ │ │ │ │ Total │ │
│ │ │ │ │ │ │
│ │ │ │ │ Create │ │
│ │ │ │ │ Payment │ │
│ │ │ │ │───────────►│ │
│ │ │ │ │ │ │
│ │ │ │ │◄───────────│ │
│ │ │ │ │ Payment │ │
│ │ │ │ │ Link │ │
│ │ │ │ │ │ │
│ │ │ │ │ Save Order │ │
│ │ │ │ │ to DB │ │
│ │ │ │ │ │ │
│ │ │ │◄───────────│ │ │
│ │ │ │ Order │ │ │
│ │ │ │ Created │ │ │
│ │ │◄─────────────│ │ │ │
│ │ │ Response │ │ │ │
│ │◄─────────────│ │ │ │ │
│ │ Show │ │ │ │ │
│ │ Payment │ │ │ │ │
│ │ Page │ │ │ │ │
│ │ │ │ │ │ │
└─────────────────────────────────────────────────────────────────────┘ 5. Folder Structure (LLD mein define hoti hai)
text

📁 order-service/
├── 📁 src/
│ ├── 📁 controllers/
│ │ ├── order.controller.js
│ │ └── webhook.controller.js
│ │
│ ├── 📁 services/
│ │ ├── order.service.js
│ │ ├── payment.service.js
│ │ └── notification.service.js
│ │
│ ├── 📁 models/
│ │ ├── order.model.js
│ │ └── orderItem.model.js
│ │
│ ├── 📁 repositories/
│ │ └── order.repository.js
│ │
│ ├── 📁 middlewares/
│ │ ├── auth.middleware.js
│ │ └── validation.middleware.js
│ │
│ ├── 📁 validations/
│ │ └── order.validation.js
│ │
│ ├── 📁 routes/
│ │ └── order.routes.js
│ │
│ ├── 📁 utils/
│ │ ├── constants.js
│ │ └── helpers.js
│ │
│ └── 📁 config/
│ └── database.js
│
├── 📁 tests/
│ ├── order.test.js
│ └── payment.test.js
│
├── .env
├── package.json
└── README.md
🛠️ Tools for Creating HLD & LLD
text

┌─────────────────────────────────────────────────────────────┐
│ USEFUL TOOLS │
├─────────────────────────────────────────────────────────────┤
│ │
│ 📐 DIAGRAM TOOLS: │
│ • Draw.io (Free) - https://draw.io │
│ • Lucidchart │
│ • Excalidraw (Free) - https://excalidraw.com │
│ • Miro │
│ • Figma (for UI flows) │
│ │
│ 📝 DOCUMENTATION: │
│ • Notion │
│ • Confluence │
│ • Google Docs │
│ │
│ 🔧 API DOCUMENTATION: │
│ • Swagger/OpenAPI │
│ • Postman │
│ │
│ 💻 CODE DIAGRAMS: │
│ • PlantUML │
│ • Mermaid.js │
│ │
└─────────────────────────────────────────────────────────────┘
🎓 Interview Mein Kaise Approach Kare?
text

┌─────────────────────────────────────────────────────────────┐
│ INTERVIEW APPROACH (45 min round) │
├─────────────────────────────────────────────────────────────┤
│ │
│ ⏱️ FIRST 5 MINS - Requirements Gathering │
│ • "Users kitne expected hain?" │
│ • "Read heavy hai ya write heavy?" │
│ • "Real-time features chahiye?" │
│ │
│ ⏱️ NEXT 15 MINS - HLD │
│ • Components draw karo │
│ • Tech stack batao │
│ • Data flow explain karo │
│ │
│ ⏱️ NEXT 20 MINS - LLD (Deep Dive) │
│ • Ek component pick karo │
│ • Classes/Schema design karo │
│ • APIs detail mein batao │
│ │
│ ⏱️ LAST 5 MINS - Scaling & Edge Cases │
│ • Bottlenecks discuss karo │
│ • How to scale │
│ │
└─────────────────────────────────────────────────────────────┘
📊 Complete Summary
text

┌─────────────────────────────────────────────────────────────────┐
│ SUMMARY │
├────────────────┬────────────────────┬───────────────────────────┤
│ ASPECT │ HLD │ LLD │
├────────────────┼────────────────────┼───────────────────────────┤
│ Focus │ System overview │ Implementation details │
│ Audience │ Architects, PMs │ Developers │
│ Contains │ Components, Flow │ Classes, Functions │
│ Database │ Which DB to use │ Exact schema, indexes │
│ API │ Major endpoints │ Request/Response format │
│ When created │ Before development │ During development │
│ Modification │ Rarely changes │ Frequently updated │
└────────────────┴────────────────────┴───────────────────────────┘
💡 Pro Tips for You (As SDE Intern)
text

1. 📚 Practice karo
   → YouTube pe "System Design" videos dekho
   → Gaurav Sen, Tech Dummies channels

2. 🎯 Common systems design karo
   → URL Shortener (easy)
   → Parking Lot (easy)
   → Food Delivery (medium)
   → Chat App (medium)
   → Twitter/Instagram (hard)

3. 📝 Document your current project
   → Jo project pe kaam kar rahe ho uska HLD/LLD banao
   → Portfolio mein add karo

4. 🗣️ Interview prep
   → Ek system design practice karo weekly
   → 2-3 months mein strong ho jaoge
