import express from 'express';
import { createCard, deleteCard, updateCard } from '../controllers/cardController.js';
import authMiddle from '../middleware/auth.js';

const router = express.Router();

// Creación Card
router.post("/createCard", authMiddle, async(req, res) => createCard(req, res))
// Delete card
router.delete("/deleteCard/:id",  authMiddle, async(req, res) => deleteCard(req, res))
// Update card
router.patch("/updateCard/:id",authMiddle, async(req, res) => updateCard(req, res))

export default router;