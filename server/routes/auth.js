const express = require('express');
const router = express.Router();
const { login, register } = require("../controllers/authController")

// Register
router.post("/register", async(req, res) => {
    console.log("Registrando desde el BACK")
    await register(req, res)
})
// Login
router.post("/login", async(req, res) => {
    await login(req, res)
})

module.exports = router;