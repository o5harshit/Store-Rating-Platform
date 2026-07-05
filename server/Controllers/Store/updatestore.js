import pool from "../../db/db.js";
import { isValidName, isValidAddress } from "../../utils/validation.js";

export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, address, ownerId } = req.body;

    // Required Fields
    if (!name || !address || !ownerId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Validate
    if (!isValidName(name) || !isValidAddress(address)) {
      return res.status(400).json({
        success: false,
        message: "Invalid store details.",
      });
    }

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

    // Check Owner Exists
    const [owner] = await pool.query(
      `SELECT id
       FROM users
       WHERE id = ?
       AND role = 'OWNER'`,
      [ownerId]
    );

    if (owner.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store owner not found.",
      });
    }

    // Duplicate Store Name Check
    const [existingStore] = await pool.query(
      `SELECT id
       FROM stores
       WHERE name = ?
       AND id != ?`,
      [name, id]
    );

    if (existingStore.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Store name already exists.",
      });
    }

    // Update Store
    await pool.query(
      `UPDATE stores
       SET
       name = ?,
       address = ?,
       owner_id = ?
       WHERE id = ?`,
      [name, address, ownerId, id]
    );

    return res.status(200).json({
      success: true,
      message: "Store updated successfully.",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });

  }
};