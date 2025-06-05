import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import ChartComponent from './ChartComponent';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data) {
      setUserData(data);
      setIsDark(data.theme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev ? 'dark' : 'light';
      if (userData) {
        const updatedData = { ...userData, theme: newTheme };
        setUserData(updatedData);
        localStorage.setItem('userData', JSON.stringify(updatedData));
      }
      return !prev;
    });
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className={`dashboard ${isDark ? 'dark-theme' : 'light-theme'}`}>
      {/* Theme toggle button */}
      <button 
        className="theme-toggle-btn" 
        onClick={toggleTheme}
        aria-label="Toggle dark/light theme"
      >
        {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1>Welcome, {userData.name}!</h1>
      <p>Email: {userData.email}</p>
      <p>Company: {userData.company}</p>
      <p>Industry: {userData.industry}</p>
      <p>Size: {userData.size}</p>

      <div className="cards">
        <div className="card">Team Members: 5</div>
        <div className="card">Active Projects: 2</div>
        <div className="card">Notifications: 7</div>
      </div>

      <div className="chart-container">
        <ChartComponent />
      </div>
    </div>
  );
}

export default Dashboard;
