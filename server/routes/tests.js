const express = require('express');
const router = express.Router();


// Creación List
router.post("/pruebaAPI", async(req, res) => { res.json({ msj: "Se conecto a la API" }) })


module.exports = router;