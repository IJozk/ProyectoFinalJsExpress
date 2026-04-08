const express = require('express');
const router = express.Router();
const { connectionTest } = require("../controllers/testsController");


// Creación List
router.get("/testAPI", async(req, res) => { res.json({ msj: "Se conecto a la API" }) })
router.get("/testDB", async(req, res) => connectionTest(req, res) )

module.exports = router;