import express from 'express';
const router = express.Router();

import authRoutes from "./auth.js"
import cardRoutes from "./card.js"
import userRoutes from "./user.js"
import boardRoutes from "./board.js"
import listRoutes from "./list.js"
import testRoutes from "./tests.js"

router.use("/auth", authRoutes);
router.use("/card", cardRoutes);
router.use("/user", userRoutes);
router.use("/board", boardRoutes);
router.use("/list", listRoutes);
router.use("/tests", testRoutes);

export default router;