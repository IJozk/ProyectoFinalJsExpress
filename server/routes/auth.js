const express = require('express');
const router = express.Router();
const { login, register } = require("../controllers/authController")

// Register
router.post("/register", async(req, res) => register(req, res))
// Login
router.post("/login", async(req, res) => login(req, res))

module.exports = router;