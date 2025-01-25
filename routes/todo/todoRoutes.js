import express from "express";

const router = express.Router();

import {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../../controller/todo/todoController.js";
import { authenticateUser, isAdmin } from "../../middleware/authMiddleware.js";


router.get("/get-all-todos", authenticateUser, getAllTodos);
router.post("/add-todo", authenticateUser, addTodo);
router.put("/update-todo/:id", authenticateUser, updateTodo);
router.delete("/delete-todo/:id", authenticateUser, deleteTodo);

export default router;
