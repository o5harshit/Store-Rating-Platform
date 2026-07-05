import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import databaseConnection from "./db/connection.js";
import authRoutes from "./Routes/Auth/routes.js";
import cors from "cors";
import adminRoutes from "./Routes/Admin/routes.js";
import userRoutes from "./Routes/User/routes.js";
import ownerRoutes from "./Routes/Owner/routes.js";
import commonRoutes from "./Routes/Common/route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8747;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL], // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If using cookies/auth headers
}))

app.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`);
})

app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/user",userRoutes);
app.use("/api/owner",ownerRoutes);
app.use("/api/common",commonRoutes); // routes common for user owner and admin

databaseConnection(); 

