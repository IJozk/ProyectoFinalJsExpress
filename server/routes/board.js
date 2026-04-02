const express = require('express');
const router = express.Router();
const { createBoard } = require("../controllers/boardController")
const authMiddle =require("../middleware/auth");

// Creacion board
router.post("/createBoard", authMiddle, async(req, res) => {
    console.log("Creando Board")
    await createBoard(req, res)
})

module.exports = router;