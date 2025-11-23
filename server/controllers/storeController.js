import pool from '../config/db.js';

// @desc    Get All Stores (with user's specific rating included)
// @route   GET /api/stores
export const getAllStores = async (req, res) => {
  try {
    const userId = req.user.id; // From the token

    // This query fetches all stores AND checks if THIS user has rated them
    const query = `
      SELECT 
        s.id, s.name, s.address, s.email, s.rating,
        r.rating as "myRating"
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id AND r.user_id = $1
      ORDER BY s.name ASC
    `;
    
    const result = await pool.query(query, [userId]);
    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const submitRating = async (req, res) => {
  const { rating } = req.body; // 1-5
  const { storeId } = req.params;
  const userId = req.user.id;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    // 1. Upsert Logic (Insert, or Update if already exists)
    const query = `
      INSERT INTO ratings (user_id, store_id, rating)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, store_id) 
      DO UPDATE SET rating = EXCLUDED.rating;
    `;
    await pool.query(query, [userId, storeId, rating]);

    // 2. Calculate New Average for the Store
    const avgQuery = `
      SELECT AVG(rating) as average 
      FROM ratings 
      WHERE store_id = $1
    `;
    const avgResult = await pool.query(avgQuery, [storeId]);
    const newAverage = avgResult.rows[0].average;

    // 3. Update Store Table with new Average
    await pool.query('UPDATE stores SET rating = $1 WHERE id = $2', [newAverage, storeId]);

    res.json({ message: "Rating submitted successfully", average: newAverage });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};