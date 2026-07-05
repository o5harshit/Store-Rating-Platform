import pool from "../../db/db.js";

export const deleteStore = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { id } = req.params;

    await connection.beginTransaction();

    // Check if store exists
    const [stores] = await connection.query(
      `
      SELECT
        id,
        name
      FROM stores
      WHERE id = ?
      `,
      [id]
    );

    if (stores.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        success: false,
        message: "Store not found.",
      });
    }

    // Delete all ratings of this store
    await connection.query(
      `
      DELETE FROM ratings
      WHERE store_id = ?
      `,
      [id]
    );

    // Delete the store
    await connection.query(
      `
      DELETE FROM stores
      WHERE id = ?
      `,
      [id]
    );

    await connection.commit();

    return res.status(200).json({
      success: true,
      message: "Store deleted successfully.",
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