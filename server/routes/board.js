import express from 'express';
import { createBoard, deleteBoard, updateBoard } from '../controllers/boardController.js';
import authMiddle from '../middleware/auth.js';
const router = express.Router();

// Creación board
router.post("/createBoard", authMiddle, async(req, res) => createBoard(req, res))
// Modificación de board
router.patch("/updateBoard/:id", authMiddle, async(req, res) => updateBoard(req, res))
// Eliminación de board
router.delete("/deleteBoard/:id", authMiddle, async(req, res) => deleteBoard(req, res))

export default router;