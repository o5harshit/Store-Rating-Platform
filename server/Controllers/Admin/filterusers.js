import pool from "../../db/db.js";

export const filterUsers = async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      address = "",
      role = "",
      page = 1,
      limit = 10,
    } = req.query;

    console.log(req.query);

    const currentPage = Number(page);
    const pageLimit = Number(limit);
    const offset = (currentPage - 1) * pageLimit;

    let query = `
      SELECT
        id,
        name,
        email,
        address,
        role
      FROM users
      WHERE role IN ('ADMIN', 'USER', 'OWNER')
    `;

    const values = [];

    if (name) {
      query += ` AND name LIKE ?`;
      values.push(`%${name}%`);
    }

    if (email) {
      query += ` AND email LIKE ?`;
      values.push(`%${email}%`);
    }

    if (address) {
      query += ` AND address LIKE ?`;
      values.push(`%${address}%`);
    }

    if (role) {
      query += ` AND role = ?`;
      values.push(role);
    }

    query += `
      ORDER BY created_at DESC
      LIMIT ?
      OFFSET ?
    `;

    values.push(pageLimit, offset);

    const [users] = await pool.query(query, values);

    // Total records for pagination

    let countQuery = `
      SELECT COUNT(*) AS total
      FROM users
      WHERE role IN ('ADMIN', 'USER', 'OWNER')
    `;

    const countValues = [];

    if (name) {
      countQuery += ` AND name LIKE ?`;
      countValues.push(`%${name}%`);
    }

    if (email) {
      countQuery += ` AND email LIKE ?`;
      countValues.push(`%${email}%`);
    }

    if (address) {
      countQuery += ` AND address LIKE ?`;
      countValues.push(`%${address}%`);
    }

    if (role) {
      countQuery += ` AND role = ?`;
      countValues.push(role);
    }

    const [[total]] = await pool.query(
      countQuery,
      countValues
    );

    return res.status(200).json({
      success: true,
      totalRecords: total.total,
      currentPage,
      totalPages: Math.ceil(total.total / pageLimit),
      users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};