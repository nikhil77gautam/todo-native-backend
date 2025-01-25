import express from "express";

const router = express.Router();

import { signup, login } from "../../controller/auth/authController.js";

router.post("/todo-signup", signup);
router.post("/todo-login", login);

export default router;
