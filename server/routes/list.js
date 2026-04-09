import express from 'express';
import { createList, updateList, deleteList } from '../controllers/listController.js';
import authMiddle from '../middleware/auth.js';

const router = express.Router();

// Creación List
router.post("/createList", authMiddle, async(req, res) => createList(req, res))
// Update List
router.patch("/updateList/:id", authMiddle, async(req, res) => updateList(req, res))
// Delete List
router.delete("/deleteList/:id", authMiddle, async(req, res) => deleteList(req, res))

export default router;