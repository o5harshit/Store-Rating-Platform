import pool from "../../db/db.js";

export const filterStores = async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      address = "",
      page = 1,
      limit = 10,
    } = req.query;

    const currentPage = Number(page);
    const pageLimit = Number(limit);
    const offset = (currentPage - 1) * pageLimit;

    const userId = req.user.id;

    let query = `
      SELECT
        s.id,
        s.name,
        u.email,
        u.name AS owner_name,
        s.address,

        COALESCE(
          ROUND(AVG(r.rating), 1),
          0
        ) AS rating,

        COALESCE(
          MAX(userRating.rating),
          0
        ) AS userRating

      FROM stores s

      INNER JOIN users u
        ON s.owner_id = u.id

      LEFT JOIN ratings r
        ON r.store_id = s.id

      LEFT JOIN ratings userRating
        ON userRating.store_id = s.id
        AND userRating.user_id = ?

      WHERE 1 = 1
    `;

    const values = [userId];

    if (name) {
      query += ` AND s.name LIKE ?`;
      values.push(`%${name}%`);
    }

    if (email) {
      query += ` AND u.email LIKE ?`;
      values.push(`%${email}%`);
    }

    if (address) {
      query += ` AND s.address LIKE ?`;
      values.push(`%${address}%`);
    }

    query += `
      GROUP BY
        s.id,
        s.name,
        u.email,
        u.name,
        s.address

      ORDER BY s.created_at DESC

      LIMIT ?
      OFFSET ?
    `;

    values.push(pageLimit, offset);

    const [stores] = await pool.query(query, values);

    let countQuery = `
      SELECT COUNT(*) AS total
      FROM stores s

      INNER JOIN users u
        ON s.owner_id = u.id

      WHERE 1 = 1
    `;

    const countValues = [];

    if (name) {
      countQuery += ` AND s.name LIKE ?`;
      countValues.push(`%${name}%`);
    }

    if (email) {
      countQuery += ` AND u.email LIKE ?`;
      countValues.push(`%${email}%`);
    }

    if (address) {
      countQuery += ` AND s.address LIKE ?`;
      countValues.push(`%${address}%`);
    }

    const [[totalResult]] = await pool.query(
      countQuery,
      countValues
    );

    const totalRecords = totalResult.total;

    return res.status(200).json({
      success: true,
      totalRecords,
      currentPage,
      totalPages: Math.ceil(totalRecords / pageLimit),
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