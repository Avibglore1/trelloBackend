import express from "express";
import { createTaskController,
    getAllTaskController,
    updateTaskController } from "../controller/task.controller.js";
import { authController } from "../controller/auth.controller.js";

const router = express.Router();
router.post("/tasks", authController);
router.get("/tasks", getAllTaskController);
router.put("/tasks", updateTaskController);

export default router