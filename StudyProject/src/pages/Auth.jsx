// src/pages/Auth.jsx
import React, { useState } from 'react';

const Auth = ({ type = 'login' }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = type === 'register' ? 'register' : 'login';
    const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    // Save token, redirect, etc.
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{type === 'register' ? 'Register' : 'Login'}</h2>
        {type === 'register' && (
          <input
            className="input"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}
        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn w-full mt-4">Submit</button>
      </form>
    </div>
  );
};

export default Auth;
