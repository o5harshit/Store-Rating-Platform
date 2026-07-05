import pool from "../../db/db.js";

export const submitOrUpdateRating = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { store_id, rating } = req.body;

    if (!store_id || !rating) {
      return res.status(400).json({
        success: false,
        message: "Store and rating are required.",
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    const [stores] = await pool.query(
      `
        SELECT id
        FROM stores
        WHERE id = ?
      `,
      [store_id]
    );

    if (stores.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found.",
      });
    }

    const [existingRatings] = await pool.query(
      `
        SELECT id
        FROM ratings
        WHERE user_id = ?
        AND store_id = ?
      `,
      [user_id, store_id]
    );

    if (existingRatings.length > 0) {
      await pool.query(
        `
          UPDATE ratings
          SET rating = ?
          WHERE user_id = ?
          AND store_id = ?
        `,
        [
          numericRating,
          user_id,
          store_id,
        ]
      );

      return res.status(200).json({
        success: true,
        message: "Rating updated successfully.",
      });
    }

    await pool.query(
      `
        INSERT INTO ratings
        (user_id, store_id, rating)
        VALUES (?, ?, ?)
      `,
      [
        user_id,
        store_id,
        numericRating,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Rating submitted successfully.",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};