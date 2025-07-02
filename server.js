// Import dependencies
import express from "express";
import dotenv from "dotenv";
import db from "./db.js"; // Assuming db.js sets up the database connection
import personRoutes from "./routes/personRoutes.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Person from "./models/Person.js";

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

const logRequestWithTime = (req, res, next) => {
  console.log(
    `${req.method} request for '${
      req.originalUrl
    }' at ${new Date().toISOString()}`
  );
  next();
};

// Use middlewares
// app.use(logRequest); // Log all requests
app.use(express.json()); // Parse JSON bodies

passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    try {
      console.log(`Recieved credientials: ${USERNAME}, ${password}`);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      } else {
        return done(null, user);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      return done(error);
    }
  })
);

// app.use(passport.initialize());

// Mount routes
app.use("/person", personRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello From Sever");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
