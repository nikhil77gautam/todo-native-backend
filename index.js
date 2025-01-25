import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth/authRoutes.js";
import todoRouter from "./routes/todo/todoRoutes.js";
import dotenv from "dotenv";

// Configure dotenv
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());

// Database Connection
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6"
  )
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Use Routers
app.use("/auth", authRouter);
app.use("/todo", todoRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
