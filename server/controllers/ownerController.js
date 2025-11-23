import pool from '../config/db.js';

// @desc    Get Owner Dashboard (My Store's Ratings)
// @route   GET /api/owner/dashboard
export const getOwnerDashboard = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Find the store owned by this user
    const storeResult = await pool.query(
      "SELECT id, name, rating FROM stores WHERE owner_id = $1", 
      [userId]
    );

    if (storeResult.rows.length === 0) {
      return res.status(404).json({ message: "You do not own any store yet." });
    }

    const store = storeResult.rows[0];

    // 2. Get all ratings for this store (Join with Users table to get names)
    const ratingsResult = await pool.query(
      `SELECT r.rating, u.name as "userName" 
       FROM ratings r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.store_id = $1`,
      [store.id]
    );

    res.json({
      storeName: store.name,
      averageRating: store.rating,
      ratings: ratingsResult.rows
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};