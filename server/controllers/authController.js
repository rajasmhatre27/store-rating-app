import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password, address } = req.body;

  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, address) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, address]
    );

    const user = newUser.rows[0];

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedPassword,
      userId,
    ]);

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error updating password" });
  }
};
