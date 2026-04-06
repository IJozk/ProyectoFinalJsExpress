const express = require('express');
const router = express.Router();

const authRoutes = require("./auth");
const cardRoutes = require("./card");
const userRoutes = require("./user");
const boardRoutes = require("./board");
const listRoutes = require("./list");

router.use("/auth", authRoutes);
router.use("/card", cardRoutes);
router.use("/user", userRoutes);
router.use("/board", boardRoutes);
router.use("/list", listRoutes);

module.exports = router;