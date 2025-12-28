So the migration flow is:

Firebase Firestore
↓
Fetch documents using Admin SDK
↓
Loop through each document (doc)
↓
Convert doc → Mongo format
↓
Save into MongoDB using Mongoose

🔹 Step 1: Connect to Firebase (Source of data)

You first connect to Firebase ONLY for migration.

const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-key.json");

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

This gives you access to all Firebase collections.

🔹 Step 2: Fetch Data from a Collection (e.g. banners)
const snapshot = await firestore.collection("banners").get();

Now:

snapshot.docs = array of Firebase documents

Each item = one document in Firestore

Example:

snapshot.docs.forEach(doc => {
console.log(doc.id); // Firebase document ID
console.log(doc.data()); // Actual data inside document
});

🔹 Step 3: THIS is where doc comes from
for (const doc of snapshot.docs) {
const data = doc.data(); // <-- Firebase data
}

So when you write:

doc.bannerImage

You’re actually doing:

doc.data().bannerImage

🔹 Step 4: Full Migration Code (REAL FLOW)
const Banner = require("./models/Banner");

const migrateBanners = async () => {
const snapshot = await firestore.collection("banners").get();

for (const doc of snapshot.docs) {
const data = doc.data();

    const bannerData = {
      bannerImage: data.bannerImage,
      title: data.title,
      description: data.description,
      redirectUrl: data.redirectUrl,
      position: data.position,
      status: data.status,
      isDeleted: data.isDeleted,
      firebaseId: doc.id, // original firebase doc id
      createDate: new Date(data.createDate),
      updateDate: new Date(data.updateDate),
    };

    await Banner.create(bannerData);

}

console.log("Banners migrated successfully!");
};

📌 This is where data comes from.
Firebase → doc.data() → mapped → MongoDB

🔹 Step 5: Why You Need to Do This for Every Collection

Because:

Firebase is schema-less

MongoDB is schema-based (with Mongoose)

So you must:

Inspect each Firebase collection

Understand its fields

Create a Mongoose schema

Write a small migration function for it

Example collections:
