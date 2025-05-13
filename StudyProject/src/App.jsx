// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoogleAuth from './pages/GoogleAuth';
import CalendarConnected from './pages/CalendarConnected';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Auth type="login" />} />
        <Route path="/register" element={<Auth type="register" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/connect-google" element={<GoogleAuth />} />
        <Route path="/calendar-connected" element={<CalendarConnected />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
