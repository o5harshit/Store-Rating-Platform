import pool from "../../db/db.js";

export const getStores = async (req, res) => {
  try {
    const {
      search = "",
      sortBy = "name",
      order = "ASC",
    } = req.query;

    const userId = req.user.id;

    const searchValue = `%${search}%`;

    // Allowed sorting fields
    const allowedSortFields = {
      name: "s.name",
      address: "s.address",
      rating: "average_rating",
    };

    const sortColumn = allowedSortFields[sortBy] || "s.name";

    const sortOrder =
      order.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const [stores] = await pool.query(
      `
      SELECT
          s.id,
          s.name,
          s.address,

          u.id AS owner_id,
          u.name AS owner_name,
          u.email AS owner_email,

          COALESCE(ROUND(AVG(r.rating),1),0) AS average_rating,

          (
            SELECT rating
            FROM ratings
            WHERE user_id = ?
            AND store_id = s.id
            LIMIT 1
          ) AS user_rating

      FROM stores s

      INNER JOIN users u
      ON s.owner_id = u.id

      LEFT JOIN ratings r
      ON s.id = r.store_id

      WHERE
          s.name LIKE ?
          OR s.address LIKE ?
          OR u.name LIKE ?
          OR u.email LIKE ?

      GROUP BY
          s.id,
          u.id

      ORDER BY ${sortColumn} ${sortOrder}
      `,
      [
        userId,
        searchValue,
        searchValue,
        searchValue,
        searchValue,
      ]
    );

    return res.status(200).json({
      success: true,
      totalStores: stores.length,
      stores,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};