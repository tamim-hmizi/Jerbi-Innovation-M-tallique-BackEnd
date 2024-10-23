// config/db.js
const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDatabase() {
  try {
    // Connect to the MongoDB database using Mongoose without deprecated options
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err; // Rethrow the error to be handled in the app
  }
}

module.exports = { connectToDatabase };
