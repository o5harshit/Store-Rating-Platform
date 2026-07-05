import pool from "../../db/db.js";

export const getStoreOwners = async (req, res) => {

    const [owners] = await pool.query(
        `SELECT id, name, email
         FROM users
         WHERE role = 'OWNER'`
    );

    return res.status(200).json({
        success: true,
        owners
    });

};