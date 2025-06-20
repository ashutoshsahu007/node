// Import dependencies
import express from "express";
import dotenv from "dotenv";
import db from "./db.js"; // Assuming db.js sets up the database connection
import personRoutes from "./routes/personRoutes.js";

// Configure environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log each request
const logRequest = (req, res, next) => {
  console.log(`${req.method} request for '${req.originalUrl}'`);
  next();
};

// Use middlewares
app.use(logRequest); // Log all requests
app.use(express.json()); // Parse JSON bodies

// Mount routes
app.use("/person", personRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Kya abhishek jii");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
