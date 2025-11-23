import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";

import ownerRoutes from "./routes/ownerRoutes.js";
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("api is running");
});

const PORT = process.env.PORT || 5000;

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Database connected!", time: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed" });
  }
});
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/admin", adminRoutes);



app.use("/api/owner", ownerRoutes);
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
