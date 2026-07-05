import bcrypt from "bcrypt";
import pool from "../../db/db.js";
import { isValidEmail, isValidName, isValidAddress } from "../../utils/validation.js";

export const createUser = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            address,
            role
        } = req.body;

        // Required Fields
        if (!name || !email || !password || !address || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Validation
        if (
            !isValidName(name) ||
            !isValidEmail(email) ||
            !isValidAddress(address)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid input."
            });
        }

        // Allowed Roles
        const allowedRoles = ["ADMIN", "OWNER", "USER"];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role."
            });
        }

        // Check Existing User
        const [existingUser] = await pool.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const [result] = await pool.query(
            `INSERT INTO users
            (name,email,password,address,role)
            VALUES(?,?,?,?,?)`,
            [
                name,
                email,
                hashedPassword,
                address,
                role
            ]
        );

        return res.status(201).json({
            success: true,
            message: `${role} created successfully.`,
            user: {
                id: result.insertId,
                name,
                email,
                address,
                role
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });

    }
};