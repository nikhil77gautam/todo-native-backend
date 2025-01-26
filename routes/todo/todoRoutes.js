import express from "express";

const router = express.Router();

// Multer file upload routes
import { uploadFile } from "../../multer/multerConfig.js";

import { getAllTodos, addTodo, updateTodo, deleteTodo, } from "../../controller/todo/todoController.js";
import { authenticateUser, isAdmin } from "../../middleware/authMiddleware.js";


router.get("/get-all-todos", authenticateUser, getAllTodos);
router.post("/add-todo/:todoThumbnail", authenticateUser, uploadFile, addTodo);
router.put("/update-todo/:todoThumbnail/:id", authenticateUser, uploadFile, updateTodo);
router.delete("/delete-todo/:id", authenticateUser, deleteTodo);

export default router;
