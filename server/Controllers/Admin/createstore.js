import pool from "../../db/db.js";
import { isValidName, isValidAddress } from "../../utils/validation.js";

export const createStore = async (req, res) => {
  try {
    const { name, address, owner_id } = req.body;
    console.log(req.body);

    // Required Fields
    if (!name || !address || !owner_id ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Validate Input
    if (!isValidName(name) || !isValidAddress(address)) {
      return res.status(400).json({
        success: false,
        message: "Invalid store details.",
      });
    }

    //Check if Owner Exists
    const [owner] = await pool.query(
      `SELECT *
       FROM users
       WHERE id = ? AND role = 'OWNER'`,
      [owner_id]
    );

    console.log(owner);

    if (owner.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store owner not found.",
      });
    }

    // Prevent Duplicate Store Name
    const [existingStore] = await pool.query(
      "SELECT id FROM stores WHERE name = ?",
      [name]
    );

    if (existingStore.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Store already exists.",
      });
    }

   const ownerEmail = owner[0].email;



    // Create Store
    const [result] = await pool.query(
      `INSERT INTO stores
      (name, address, owner_id,owner_email)
      VALUES (?, ?, ?, ? )`,
      [name, address, owner_id,ownerEmail ]
    );

    return res.status(201).json({
      success: true,
      message: "Store created successfully.",
      store: {
        id: result.insertId,
        name,
        address,
        owner_id ,
      },
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
