const express = require('express');
const router = express.Router();
const { createCard, deleteCard, updateCard } = require("../controllers/cardController")
const authMiddle = require("../middleware/auth")


// Creación Card
router.post("/createCard", authMiddle, async(req, res) => createCard(req, res))
// Delete card
router.delete("/deleteCard/:id",  authMiddle, async(req, res) => deleteCard(req, res))
// Update card
router.patch("/updateCard/:id",authMiddle, async(req, res) => updateCard(req, res))

module.exports = router;