import pool from "../../db/db.js";

export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    if (!storeId || !rating) {
      return res.status(400).json({ success: false, message: "Store and rating are required." });
    }

    if (Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5." });
    }

    const [storeRows] = await pool.query("SELECT id FROM stores WHERE id = ?", [storeId]);
    if (storeRows.length === 0) {
      return res.status(404).json({ success: false, message: "Store not found." });
    }

    const [existing] = await pool.query("SELECT id FROM ratings WHERE user_id = ? AND store_id = ?", [userId, storeId]);
    if (existing.length > 0) {
      await pool.query("UPDATE ratings SET rating = ? WHERE id = ?", [rating, existing[0].id]);
      return res.status(200).json({ success: true, message: "Rating updated successfully." });
    }

    await pool.query("INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)", [userId, storeId, rating]);
    return res.status(201).json({ success: true, message: "Rating submitted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

export const getUserRatings = async (req, res) => {
  try {
    const [ratings] = await pool.query(
      `SELECT r.id, r.rating, s.name AS store_name, s.address, s.id AS store_id
       FROM ratings r
       JOIN stores s ON s.id = r.store_id
       WHERE r.user_id = ?
       ORDER BY r.id DESC`,
      [req.user.id]
    );

    return res.status(200).json({ success: true, ratings });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

export const getStoreRatings = async (req, res) => {
  try {
    const { storeId } = req.params;
    const [ratings] = await pool.query(
      `SELECT r.rating, u.name, u.email
       FROM ratings r
       JOIN users u ON u.id = r.user_id
       WHERE r.store_id = ?
       ORDER BY r.id DESC`,
      [storeId]
    );

    return res.status(200).json({ success: true, ratings });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};
