import bcrypt from "bcrypt";
import pool from "../../db/db.js";
import { generateAccessToken } from "../../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and Password are required." });
    }

    const [users] = await pool.query("SELECT id, name, email, address, role, password FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const user = users[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid Credentials." });
    }

    const accessToken = generateAccessToken(user); // 7 Days


    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
       maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful.",
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};