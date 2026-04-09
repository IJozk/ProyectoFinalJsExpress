import express from 'express';
import { connectionTest, sync } from '../controllers/testsController.js';

const router = express.Router();

// Creación List
router.get("/testAPI", async(req, res) => { res.json({ msj: "Se conecto a la API" }) })
router.get("/testDB", async(req, res) => connectionTest(req, res) )
router.get("/syncDB", async(req, res) => sync())

export default router;