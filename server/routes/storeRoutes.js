import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAllStores, submitRating } from "../controllers/storeController.js";

const router = express.Router();

router.get("/", protect, getAllStores);

router.post("/:storeId/rate", protect, submitRating);

export default router;
