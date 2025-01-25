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
    "mongodb+srv://nikhil77gautam:QH3FSsvbAbOdDvBL@cluster0.u4nfv2p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
