import express from 'express';
import  getUserData from '../controllers/userController.js';
import authMiddle from '../middleware/auth.js';

const router = express.Router();

// Obtener datos de usuario, con tableros
router.post("/getUserData", authMiddle, async(req, res) => getUserData(req, res))

export default router;