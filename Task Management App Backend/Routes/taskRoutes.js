import express, { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import { createdTask, deleteTask, getAllTask, getTaskByID, updatedTask } from "../Controller/taskController.js";


const router=express.Router();

router.post("/",authMiddleware,createdTask);
router.get("/",authMiddleware,getAllTask)
router.get("/:id",authMiddleware,getTaskByID)
router.put("/:id",authMiddleware,updatedTask)
router.delete("/:id",authMiddleware,deleteTask)

export default router;