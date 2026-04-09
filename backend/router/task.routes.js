import express from "express";
import { createTaskController,
    getAllTaskController,
    updateTaskController } from "../controller/task.controller.js";
import { authController } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/tasks", authMiddleware, createTaskController);
router.get("/tasks",authMiddleware, getAllTaskController);
router.put("/tasks/:id", authMiddleware, updateTaskController);

export default router