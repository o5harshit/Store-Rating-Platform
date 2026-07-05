import pool from "../../db/db.js";

export const logout = async (req, res) => {
  try {

    const userId = req.user?.id;


    // Clear Access Token Cookie
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "Strict",
    });


    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });

  }
};