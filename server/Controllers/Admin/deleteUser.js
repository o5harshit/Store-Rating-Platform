import pool from "../../db/db.js";

export const deleteUser = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { id } = req.params;


    await connection.beginTransaction();

    // Check if user exists
    const [users] = await connection.query(
      `
      SELECT
        id,
        name,
        email,
        role
      FROM users
      WHERE id = ?
      `,
      [id]
    );

    if (users.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = users[0];

    // Prevent admin from deleting their own account
    if (Number(req.user.id) === Number(id)) {
      await connection.rollback();

      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account.",
      });
    }

    // Check whether user owns any stores
    const [stores] = await connection.query(
      `
      SELECT id
      FROM stores
      WHERE owner_id = ?
      `,
      [id]
    );

    if (stores.length > 0) {
      await connection.rollback();

      return res.status(409).json({
        success: false,
        message:
          "This user owns one or more stores. Remove or reassign those stores before deleting the user.",
      });
    }

    // Delete ratings submitted by this user
    await connection.query(
      `
      DELETE FROM ratings
      WHERE user_id = ?
      `,
      [id]
    );

    // Delete user
    await connection.query(
      `
      DELETE FROM users
      WHERE id = ?
      `,
      [id]
    );

    await connection.commit();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    await connection.rollback();

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  } finally {
    connection.release();
  }
};