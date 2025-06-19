import express from "express";
import db from "./db.js"; // Assuming db.js is in the same directory
import personRoutes from "./routes/personRoutes.js";
import dotenv from "dotenv";
dotenv.config(); // Ensure dotenv is configured to load environment variables
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/person", personRoutes);

app.get("/", (req, res) => {
  res.send("Kya abhishek jii ");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
