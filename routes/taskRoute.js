import { Router } from "express";
import { createTask,getTask,editTask,deleteTask, getAllTask } from "../controller/taskController.js";

const router = Router();

router.get('/tasks',getAllTask);

router.post('/task',createTask);

router.get('/task/:id',getTask);

router.put('/edit-task/:id',editTask);

router.delete('/delete/:id',deleteTask);

export default router;