import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURL = process.env.MONGO_URL || process.env.MONGO_URL_LOCAL;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURL);

// Get the default connection
// Mongoose maintains a default connection object representing the mongoDB connection
const db = mongoose.connection;

// Listen for the 'error' event on the connection
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.warn("MongoDB connection disconnected");
});

// Listen for the 'open' event on the connection
db.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

// Export the connection object for use in other modules
export default db;
