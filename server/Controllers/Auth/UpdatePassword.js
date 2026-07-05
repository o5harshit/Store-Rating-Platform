import bcrypt from "bcrypt";
import pool from "../../db/db.js";

export const UpdatePassword = async (req, res) => {
    try {

        const { currentPassword, newPassword, confirmPassword } = req.body;

        const userId = req.user.id;

        // Check Required Fields
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // New Password & Confirm Password Match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match."
            });
        }

        // Password Length Validation
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters."
            });
        }

        // Fetch User
        const [users] = await pool.query(
            "SELECT password FROM users WHERE id = ?",
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Verify Current Password
        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            users[0].password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect."
            });
        }

        // Prevent Same Password
        const isSamePassword = await bcrypt.compare(
            newPassword,
            users[0].password
        );

        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as the current password."
            });
        }

        // Hash New Password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update Password
        await pool.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [hashedPassword, userId]
        );

        return res.status(200).json({
            success: true,
            message: "Password updated successfully."
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });

    }
};