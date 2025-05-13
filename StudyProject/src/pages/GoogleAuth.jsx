// src/pages/GoogleAuth.jsx
import React, { useEffect } from 'react';

const GoogleAuth = () => {
  useEffect(() => {
    const fetchAuthUrl = async () => {
      const res = await fetch('http://localhost:5000/api/calendar/auth-url');
      const data = await res.json();
      window.location.href = data.url; // Redirect to Google OAuth
    };

    fetchAuthUrl();
  }, []);

  return <div>Redirecting to Google...</div>;
};

export default GoogleAuth;
