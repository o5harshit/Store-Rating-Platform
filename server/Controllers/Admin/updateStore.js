import pool from "../../db/db.js";

export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      address,
      owner_id,
    } = req.body;

    // Check if store exists
    const [stores] = await pool.query(
      `
      SELECT id
      FROM stores
      WHERE id = ?
      `,
      [id]
    );

    if (stores.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found.",
      });
    }

    const fields = [];

    const values = [];

    // Update name only if provided
    if (name !== undefined && name.trim() !== "") {
      // Check duplicate store name
      const [existingStores] = await pool.query(
        `
        SELECT id
        FROM stores
        WHERE name = ?
        AND id != ?
        `,
        [name.trim(), id]
      );

      if (existingStores.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Store name already exists.",
        });
      }

      fields.push("name = ?");

      values.push(name.trim());
    }

    // Update address only if provided
    if (address !== undefined && address.trim() !== "") {
      fields.push("address = ?");

      values.push(address.trim());
    }

    // Update owner only if provided
    if (owner_id !== undefined && owner_id !== "") {
      // Check if owner exists
      const [owners] = await pool.query(
        `
        SELECT id
        FROM users
        WHERE id = ?
        AND role = 'OWNER'
        `,
        [owner_id]
      );

      if (owners.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Store owner not found.",
        });
      }

      fields.push("owner_id = ?");

      values.push(owner_id);
    }

    // No field provided
    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update.",
      });
    }

    values.push(id);

    const query = `
      UPDATE stores
      SET ${fields.join(", ")}
      WHERE id = ?
    `;

    await pool.query(query, values);

    // Get updated store
    const [updatedStores] = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        s.address,
        s.owner_id,
        u.name AS owner_name,
        u.email

      FROM stores s

      INNER JOIN users u
        ON s.owner_id = u.id

      WHERE s.id = ?
      `,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Store updated successfully.",
      store: updatedStores[0],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};