const express = require('express');
const router = express.Router();
const { getUserData } = require("../controllers/userController")
const authMiddle = require("../middleware/auth")


// Creación Card
router.post("/getUserData", authMiddle, async(req, res) => {
    console.log("Data de usuario")
    await getUserData(req, res)
})

module.exports = router;