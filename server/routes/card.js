const express = require('express');
const router = express.Router();
const { createCard } = require("../controllers/cardController")
const authMiddle = require("../middleware/auth")


// Creación Card
router.post("/create-card", authMiddle, async(req, res) => {
    console.log("Creando tarjeta")
    await createCard(req, res)
})

module.exports = router;