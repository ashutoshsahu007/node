// 1. Import dependencies
import express from "express";
import dotenv from "dotenv";
import passport from "./auth.js";

// 2. Configure environment variables
dotenv.config();

// 3. Database connection
import db from "./db.js"; // Assuming db.js connects to MongoDB

// 4. Import models and routes
import Person from "./models/Person.js";
import personRoutes from "./routes/personRoutes.js";

// 6. Custom middleware functions (if needed)
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

// 7. Create Express app
const app = express();
const PORT = process.env.PORT || 3000;
const localAuthMiddleWare = passport.authenticate("local", { session: false });

// 8. Use middleware
// app.use(logRequest);
app.use(express.json());
app.use(passport.initialize());
app.use(localAuthMiddleWare);

// 9. Mount routes
app.use("/person", personRoutes);

// 10. Default route with auth
app.get("/", (req, res) => {
  res.send("Hello From Server");
});

// 11. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
