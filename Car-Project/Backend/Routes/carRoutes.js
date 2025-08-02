import express from "express";
import { getCars } from "../Controllers/carController.js";
const router =express.Router();
router.get("/",getCars);
export default router;