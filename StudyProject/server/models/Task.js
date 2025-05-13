import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  importance: { type: Number, default: 1 },
  effort: { type: Number, default: 1 },
  dueDate: { type: Date },
  repetitions: { type: Number, default: 0 },
  easiness: { type: Number, default: 2.5 },
  interval: { type: Number, default: 1 },
  lastReviewed: { type: Date }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
