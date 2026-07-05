import pool from "../../db/db.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;


    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // Check whether user exists
    const [users] = await pool.query(
      `
      SELECT id
      FROM users
      WHERE id = ?
      `,
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Dynamic query fields
    const fields = [];
    const values = [];

    // Name is optional
    if (name !== undefined) {
      fields.push("name = ?");
      values.push(name.trim());
    }

    // Email is optional
    if (email !== undefined) {
      // Check whether another user already has this email
      const [existingUsers] = await pool.query(
        `
        SELECT id
        FROM users
        WHERE email = ?
        AND id != ?
        `,
        [email.trim(), id]
      );

      if (existingUsers.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Email already exists.",
        });
      }

      fields.push("email = ?");
      values.push(email.trim());
    }

    // Password is optional
    if (password !== undefined) {
      const hashedPassword = await bcrypt.hash(
        password,
        10
      );

      fields.push("password = ?");
      values.push(hashedPassword);
    }

    // Role is optional
    if (role !== undefined) {
      const allowedRoles = [
        "ADMIN",
        "USER",
        "OWNER",
      ];

      if (!allowedRoles.includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Invalid role.",
        });
      }

      fields.push("role = ?");
      values.push(role);
    }

    // Nothing was sent for update
    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update.",
      });
    }

    // User ID for WHERE id = ?
    values.push(id);

    const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = ?
    `;

    await pool.query(query, values);

    // Get updated user
    const [updatedUsers] = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        address,
        role
      FROM users
      WHERE id = ?
      `,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: updatedUsers[0],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};