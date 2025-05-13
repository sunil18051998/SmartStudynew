// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Update if deployed

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Revise Algorithms', status: 'pending' },
    { id: '2', title: 'Finish React Project', status: 'in progress' },
    { id: '3', title: 'Review Notes (Spaced Repetition)', status: 'pending' },
  ]);

  const [analytics, setAnalytics] = useState({
    focusTime: '3h 15m',
    tasksCompleted: 5,
    productivityScore: '82%',
  });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket server');
    });

    socket.on('taskUpdated', (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">📚 Smart Study Scheduler</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Today's Tasks</h2>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border-b py-2 flex justify-between items-center"
            >
              <span>{task.title}</span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  task.status === 'completed'
                    ? 'bg-green-200 text-green-800'
                    : task.status === 'in progress'
                    ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>

        {/* Productivity Analytics */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Productivity Analytics</h2>
          <ul className="space-y-2">
            <li>🕒 Focus Time: <strong>{analytics.focusTime}</strong></li>
            <li>✅ Tasks Completed: <strong>{analytics.tasksCompleted}</strong></li>
            <li>📈 Productivity Score: <strong>{analytics.productivityScore}</strong></li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <a href="/connect-google" className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          📅 Connect Google Calendar
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
