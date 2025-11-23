import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

import {
  getDashboardStats,
  addStore,
  getAllUsers,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", protect, adminOnly, getDashboardStats);
router.post("/add-store", protect, adminOnly, addStore);

router.get("/users", protect, adminOnly, getAllUsers);

export default router;
