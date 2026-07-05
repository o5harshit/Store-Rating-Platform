export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const [stores] = await pool.query(
      `SELECT s.id, s.name, s.address, s.owner_email, COALESCE(AVG(r.rating), 0) AS average_rating,
              COALESCE(ur.rating, 0) AS user_rating
       FROM stores s
       LEFT JOIN ratings r ON r.store_id = s.id
       LEFT JOIN ratings ur ON ur.store_id = s.id AND ur.user_id = ?
       WHERE s.id = ?
       GROUP BY s.id, ur.rating`,
      [userId, id]
    );

    if (stores.length === 0) {
      return res.status(404).json({ success: false, message: "Store not found." });
    }

    return res.status(200).json({ success: true, store: stores[0] });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};
