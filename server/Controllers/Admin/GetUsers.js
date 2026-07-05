import pool from "../../db/db.js";

export const getAllUsers = async (req, res) => {
  try {

    const [users] = await pool.query(`
      SELECT
        u.id,
        u.name,
        u.email,
        u.address,
        u.role,
        ROUND(AVG(r.rating), 1) AS rating

      FROM users u

      LEFT JOIN stores s
        ON u.id = s.owner_id

      LEFT JOIN ratings r
        ON s.id = r.store_id

      GROUP BY
        u.id,
        u.name,
        u.email,
        u.address,
        u.role

      ORDER BY u.created_at DESC
    `);

    return res.status(200).json({
      success: true,
      users,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });

  }
};