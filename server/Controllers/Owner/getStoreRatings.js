import pool from "../../db/db.js";

export const getStoreRatings = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const [stores] = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        s.address,

        COALESCE(
          ROUND(AVG(r.rating), 1),
          0
        ) AS averageRating,

        COUNT(r.id) AS totalRatings

      FROM stores s

      LEFT JOIN ratings r
        ON r.store_id = s.id

      WHERE s.owner_id = ?

      GROUP BY
        s.id,
        s.name,
        s.address

      ORDER BY s.created_at DESC
      `,
      [ownerId]
    );

    for (const store of stores) {
      const [ratings] = await pool.query(
        `
        SELECT
          u.id AS user_id,
          u.name,
          u.email,
          u.address,
          r.rating,
          r.created_at

        FROM ratings r

        INNER JOIN users u
          ON r.user_id = u.id

        WHERE r.store_id = ?

        ORDER BY r.created_at DESC
        `,
        [store.id]
      );

      store.ratings = ratings;
    }

    return res.status(200).json({
      success: true,
      totalStores: stores.length,
      stores,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};