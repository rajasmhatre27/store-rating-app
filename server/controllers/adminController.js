import pool from "../config/db.js";

// @desc    Get Dashboard Stats
// @route   GET /api/admin/dashboard
export const getDashboardStats = async (req, res) => {
  try {
    // Run 3 queries in parallel for speed
    const userCount = await pool.query("SELECT COUNT(*) FROM users");
    const storeCount = await pool.query("SELECT COUNT(*) FROM stores");
    const ratingCount = await pool.query("SELECT COUNT(*) FROM ratings");

    res.json({
      totalUsers: userCount.rows[0].count,
      totalStores: storeCount.rows[0].count,
      totalRatings: ratingCount.rows[0].count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a New Store
// @route   POST /api/admin/add-store
export const addStore = async (req, res) => {
  const { name, email, address } = req.body;

  try {
    const newStore = await pool.query(
      "INSERT INTO stores (name, email, address) VALUES ($1, $2, $3) RETURNING *",
      [name, email, address]
    );

    res.status(201).json(newStore.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT id, name, email, role, address FROM users ORDER BY id ASC"
    );
    res.json(users.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
