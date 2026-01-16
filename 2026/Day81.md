Task 1: Defining a Data Model (e.g., a User)
React / MongoDB (using Mongoose)

Where: In your backend project (server/models/User.js).
What: A JavaScript file defining a Mongoose Schema.
JavaScript

// This file defines the 'User' model for MongoDB.
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
email: {
type: String,
required: true,
unique: true,
},
name: {
type: String,
required: false, // Optional field
},
age: {
type: Number,
},
});

module.exports = mongoose.model('User', UserSchema);
Next.js / SQL (using Prisma)

Where: In your Next.js project (prisma/schema.prisma).
What: A .prisma file defining the model in Prisma's schema language.
prisma

// This file defines your ENTIRE database schema.

// The 'User' model, which maps to a 'User' table in SQL.
model User {
id Int @id @default(autoincrement()) // Primary key
email String @unique
name String? // The '?' makes it optional
age Int? // Optional integer field
}
Task 2: Creating a New Record
React / MongoDB (using an Express API)

Where: In your backend API route (server/routes/users.js).
What: An Express route handler using a Mongoose model.
JavaScript

// POST /api/users
router.post('/', async (req, res) => {
try {
const user = new User({
email: req.body.email,
name: req.body.name,
age: req.body.age,
});
await user.save();
res.status(201).json(user);
} catch (err) {
res.status(500).json(err);
}
});
Next.js / SQL (using a Next.js API Route)

Where: In your Next.js project (app/api/users/route.ts).
What: A Next.js API route handler using Prisma Client.
TypeScript

// POST /api/users
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
try {
const body = await request.json();
const newUser = await prisma.user.create({
data: {
email: body.email,
name: body.name,
age: body.age,
},
});
return NextResponse.json(newUser, { status: 201 });
} catch (err) {
return NextResponse.json(err, { status: 500 });
}
}
Task 3: Reading a Single Record by ID
React / MongoDB (using an Express API)

Where: server/routes/users.js.
What: An Express route handler using findById.
JavaScript

// GET /api/users/:id
router.get('/:id', async (req, res) => {
try {
const user = await User.findById(req.params.id);
if (!user) return res.status(404).send('Not found');
res.json(user);
} catch (err) {
res.status(500).json(err);
}
});
Next.js / SQL (using a Next.js API Route)

Where: app/api/users/[id]/route.ts.
What: A Next.js API route handler using findUnique.
TypeScript

// GET /api/users/[id]
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }) {
try {
const id = parseInt(params.id);
const user = await prisma.user.findUnique({
where: { id: id },
});
if (!user) {
return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
return NextResponse.json(user);
} catch (err) {
return NextResponse.json(err, { status: 500 });
}
}
Task 4: Reading a List of Records with Filtering
React / MongoDB (using an Express API)

Where: server/routes/users.js.
What: An Express route handler using find with a query object.
JavaScript

// GET /api/users?age=30
router.get('/', async (req, res) => {
try {
const ageFilter = req.query.age ? { age: req.query.age } : {};
const users = await User.find(ageFilter);
res.json(users);
} catch (err) {
res.status(500).json(err);
}
});
Next.js / SQL (using a Next.js API Route)

Where: app/api/users/route.ts.
What: A Next.js API route handler using findMany with a where clause.
TypeScript

// GET /api/users?age=30
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
try {
const { searchParams } = new URL(request.url);
const age = searchParams.get('age');

    const users = await prisma.user.findMany({
      where: age ? { age: parseInt(age) } : {},
    });
    return NextResponse.json(users);

} catch (err) {
return NextResponse.json(err, { status: 500 });
}
}
Task 5: Updating a Record
React / MongoDB (using an Express API)

Where: server/routes/users.js.
What: An Express route handler using findByIdAndUpdate.
JavaScript

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
try {
const updatedUser = await User.findByIdAndUpdate(
req.params.id,
{ $set: req.body }, // Use $set to update fields
{ new: true } // Return the updated document
);
res.json(updatedUser);
} catch (err) {
res.status(500).json(err);
}
});
Next.js / SQL (using a Next.js API Route)

Where: app/api/users/[id]/route.ts.
What: A Next.js API route handler using update.
TypeScript

// PUT /api/users/[id]
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }) {
try {
const id = parseInt(params.id);
const body = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        name: body.name,
        age: body.age,
      },
    });
    return NextResponse.json(updatedUser);

} catch (err) {
return NextResponse.json(err, { status: 500 });
}
}
Task 6: Deleting a Record
React / MongoDB (using an Express API)

Where: server/routes/users.js.
What: An Express route handler using findByIdAndDelete.
JavaScript

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
try {
await User.findByIdAndDelete(req.params.id);
res.json({ message: 'User deleted' });
} catch (err) {
res.status(500).json(err);
}
});
Next.js / SQL (using a Next.js API Route)

Where: app/api/users/[id]/route.ts.
What: A Next.js API route handler using delete.
TypeScript

// DELETE /api/users/[id]
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request, { params }) {
try {
const id = parseInt(params.id);
await prisma.user.delete({
where: { id: id },
});
return NextResponse.json({ message: 'User deleted' });
} catch (err) {
return NextResponse.json(err, { status: 50
