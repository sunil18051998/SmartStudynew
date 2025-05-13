import Task from '../models/Task.js';

import { io } from '../server.js';

export const completeTask = async (req, res) => {
  // Assume task update logic is here
  const updatedTask = { id: req.params.id, status: 'done', updatedAt: new Date() };
  
  // Emit to all clients
  io.emit('taskUpdated', updatedTask);

  res.json({ success: true, task: updatedTask });
};

// GET all tasks
export const getTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
};

// POST create task
export const createTask = async (req, res) => {
  const task = new Task(req.body);
  const saved = await task.save();
  res.status(201).json(saved);
};
