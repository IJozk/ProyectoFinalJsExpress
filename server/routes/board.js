const express = require('express');
const router = express.Router();
const { createBoard } = require("../controllers/boardController")

// Creacion board
router.post("/create-board", async(req, res) => {
    console.log("Creando Board")
    await createBoard(req, res)
})

module.exports = router;