import express from "express";
import db from "./db.js"; // Assuming db.js is in the same directory
import personRoutes from "./routes/personRoutes.js";

const app = express();

app.use(express.json());
app.use("/person", personRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
