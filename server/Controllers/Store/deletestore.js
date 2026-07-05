import pool from "../../db/db.js";

export const deleteStore = async (req, res) => {
  try {

    const { id } = req.params;

    // Check Store Exists
    const [store] = await pool.query(
      "SELECT * FROM stores WHERE id = ?",
      [id]
    );

    if (store.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found.",
      });
    }

    // Delete Ratings First (Recommended)
    await pool.query(
      "DELETE FROM ratings WHERE store_id = ?",
      [id]
    );

    // Delete Store
    await pool.query(
      "DELETE FROM stores WHERE id = ?",
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Store deleted successfully.",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });

  }
};