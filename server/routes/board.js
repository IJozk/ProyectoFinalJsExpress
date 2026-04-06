const express = require('express');
const router = express.Router();
const { createBoard, deleteBoard, updateBoard } = require("../controllers/boardController")
const authMiddle =require("../middleware/auth");

// Creación board
router.post("/createBoard", authMiddle, async(req, res) => createBoard(req, res))
// Modificación de board
router.patch("/updateBoard/:id", authMiddle, async(req, res) => updateBoard(req, res))
// Eliminación de board
router.delete("/deleteBoard/:id", authMiddle, async(req, res) => deleteBoard(req, res))

module.exports = router;