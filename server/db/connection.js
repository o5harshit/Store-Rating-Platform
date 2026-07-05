import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import pool from "./db.js";

async function databaseConnection() {
  let connection;

  try {

    // Create Database Automatically
    const rootConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    await rootConnection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );

    await rootConnection.end();

    // Connect to Database
    connection = await pool.getConnection();

    /* ==========================
          USERS TABLE
    ========================== */

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (

        id INT AUTO_INCREMENT PRIMARY KEY,

        name VARCHAR(100) NOT NULL,

        email VARCHAR(100) UNIQUE NOT NULL,

        password VARCHAR(255) NOT NULL,

        address TEXT NOT NULL,

        role ENUM('ADMIN','OWNER','USER')
        DEFAULT 'USER',

        created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP

      )
    `);

    /* ==========================
          STORES TABLE
    ========================== */

    await connection.query(`
      CREATE TABLE IF NOT EXISTS stores (

        id INT AUTO_INCREMENT PRIMARY KEY,

        name VARCHAR(100) NOT NULL,

        address TEXT NOT NULL,

        owner_id INT NOT NULL,

        created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

        CONSTRAINT fk_store_owner
        FOREIGN KEY(owner_id)
        REFERENCES users(id)
        ON DELETE CASCADE

      )
    `);

    /* ==========================
          RATINGS TABLE
    ========================== */

    await connection.query(`
      CREATE TABLE IF NOT EXISTS ratings (

        id INT AUTO_INCREMENT PRIMARY KEY,

        user_id INT NOT NULL,

        store_id INT NOT NULL,

        rating INT NOT NULL
        CHECK(rating BETWEEN 1 AND 5),

        created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_rating_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

        CONSTRAINT fk_rating_store
        FOREIGN KEY(store_id)
        REFERENCES stores(id)
        ON DELETE CASCADE,

        UNIQUE(user_id, store_id)

      )
    `);

    /* ==========================
          DEFAULT ADMIN
    ========================== */

    const adminEmail =
      process.env.DEFAULT_ADMIN_EMAIL ||
      "admin@roxiler.com";

    const adminPassword =
      process.env.DEFAULT_ADMIN_PASSWORD ||
      "Admin@1234";

    const [admins] = await connection.query(
      "SELECT id FROM users WHERE role='ADMIN' LIMIT 1"
    );

    if (admins.length === 0) {

      const hashedPassword =
        await bcrypt.hash(adminPassword, 10);

      await connection.query(
        `INSERT INTO users
        (name,email,password,address,role)
        VALUES(?,?,?,?,?)`,
        [
          "System Administrator",
          adminEmail,
          hashedPassword,
          "Head Office",
          "ADMIN",
        ]
      );

      console.log("✅ Default Admin Created");
    }

    console.log("✅ Database Initialized Successfully");

  } catch (error) {

    console.log(error);

    process.exit(1);

  } finally {

    if (connection) {
      connection.release();
    }

  }
}

export default databaseConnection;