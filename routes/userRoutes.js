import express from "express";
import { register, login, logout, getConversations } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/conversations", isAuthenticated, getConversations);

export default router; 