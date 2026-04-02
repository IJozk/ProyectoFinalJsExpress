const express = require('express');
const router = express.Router();
const { getUserData } = require("../controllers/userController");
const authMiddle =require("../middleware/auth");


// Obtener datos de usuario, con tableros
router.post("/getUserData", authMiddle, async(req, res) => {
    console.log("Data de usuario")
    const data = await getUserData(req, res)
    console.log(data)
    return res.status(200).json({ user:data.user, tableros:data.tableros });
})

module.exports = router;