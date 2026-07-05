import jwt from "jsonwebtoken";
import pool from "../db/db.js";

export const authenticate = async (req, res, next) => {
    try {

        const accessToken = req.cookies.accessToken;
        console.log(accessToken);


        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Access token not found."
            });
        }

        const decoded = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET
        );

        const [users] = await pool.query(
            `SELECT id,name,email,address,role
             FROM users
             WHERE id = ?`,
            [decoded.id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        req.user = users[0];

        next();

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Access token expired."
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid access token."
        });

    }
};