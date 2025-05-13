import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import calendarRoutes from './routes/calendarRoutes.js';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // frontend Vite dev server
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// DB connection
connectDB();

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/calendar', calendarRoutes);

// Root route
// app.get('/', (req, res) => {
//   res.send('Smart Study Scheduler API');
// });

const clientBuildPath = path.join(__dirname, '../dist');
app.use(express.static(clientBuildPath));

// Catch-all to serve React app for non-API routes
app.get('/:anything', (req, res, next) => {
  if (req.path.startsWith('/api')) return next(); // Skip if API route
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };