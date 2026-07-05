import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../../utils/jwt.js";
import pool from "../../db/db.js";
import { isValidName, isValidAddress, isValidPassword, isValidEmail } from "../../utils/validation.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password || !address) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!isValidName(name) || !isValidAddress(address) || !isValidPassword(password) || !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid registration details." });
    }

    const [existingUser] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, 'USER')",
      [name, email, hashedPassword, address]
    );

    const user = {
      id: result.insertId,
      email,
      role: "USER",
    };

    const accessToken = generateAccessToken(user); // 7 days 

   
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
       maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      accessToken,
      user: {
        id: result.insertId,
        name,
        email,
        address,
        role: "USER",
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

