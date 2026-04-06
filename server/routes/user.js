const express = require('express');
const router = express.Router();
const { getUserData } = require("../controllers/userController");
const authMiddle =require("../middleware/auth");


// Obtener datos de usuario, con tableros
router.post("/getUserData", authMiddle, async(req, res) => getUserData(req, res))

module.exports = router;