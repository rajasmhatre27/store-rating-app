import express from "express";
import { check, validationResult } from "express-validator";
import {
  registerUser,
  loginUser,
  updatePassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const signupRules = [
  check("name", "Name must be 20+ chars").isLength({ min: 20, max: 60 }),
  check("email", "Valid email required").isEmail(),
  check(
    "password",
    "Password must have Uppercase, Number, Special Char"
  ).matches(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,16}$/),
  check("address", "Address too long").isLength({ max: 400 }),
];

const checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post("/signup", signupRules, checkRules, registerUser);
router.post("/login", loginUser);

router.put("/password", protect, updatePassword);

export default router;
