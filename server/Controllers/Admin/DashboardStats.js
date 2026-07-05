import pool from "../../db/db.js";

export const adminDashboard = async (req, res) => {
    try {

        // Run all queries simultaneously
        const [
            [users],
            [stores],
            [ratings]
        ] = await Promise.all([

            pool.query(
                "SELECT COUNT(*) AS totalUsers FROM users"
            ),

            pool.query(
                "SELECT COUNT(*) AS totalStores FROM stores"
            ),

            pool.query(
                "SELECT COUNT(*) AS totalRatings FROM ratings"
            )

        ]);

        return res.status(200).json({
            success: true,
            dashboard: {
                totalUsers: users[0].totalUsers,
                totalStores: stores[0].totalStores,
                totalRatings: ratings[0].totalRatings
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