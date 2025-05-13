import express from 'express';
import { getTasks, createTask } from '../controllers/taskController.js';

const router = express.Router();

router.route('/').get(getTasks).post(createTask);

export default router;
