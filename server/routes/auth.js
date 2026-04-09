import express from 'express';
import { login, register } from "../controllers/authController.js";
const router = express.Router();

// Register
router.post("/register", async(req, res) => register(req, res))
// Login
router.post("/login", async(req, res) => login(req, res))

export default router;