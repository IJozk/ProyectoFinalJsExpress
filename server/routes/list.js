const express = require('express');
const router = express.Router();
const { createList, updateList, deleteList } = require("../controllers/listController")
const authMiddle = require("../middleware/auth")


// Creación List
router.post("/createList", authMiddle, async(req, res) => createList(req, res))
// Update List
router.patch("/updateList/:id", authMiddle, async(req, res) => updateList(req, res))
// Delete List
router.delete("/deleteList/:id", authMiddle, async(req, res) => deleteList(req, res))

module.exports = router;