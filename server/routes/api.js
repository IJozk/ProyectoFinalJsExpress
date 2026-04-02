const express = require('express');
const router = express.Router();

const authRoutes = require("./auth")
const cardRoutes = require("./card")
const userRoutes = require("./user")

router.use("/auth", authRoutes);
router.use("/card", cardRoutes);
router.use("/user", userRoutes);

module.exports = router;