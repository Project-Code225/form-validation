// src/App.js
import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [username, setUsername] = useState('');

  const handleRegistrationSuccess = (registeredUsername) => {
    setUsername(registeredUsername);
    setCurrentScreen('dashboard');
  };

  const handleLoginSuccess = (loggedInUsername) => {
    setUsername(loggedInUsername);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUsername('');
    setCurrentScreen('login');
  };

  return (
    <div className="App">
      {currentScreen === 'register' && (
        <RegistrationForm 
          onRegistrationSuccess={handleRegistrationSuccess} 
          onSwitchToLogin={() => setCurrentScreen('login')}
        />
      )}
      {currentScreen === 'login' && (
        <LoginForm 
          onLoginSuccess={handleLoginSuccess} 
          onSwitchToRegister={() => setCurrentScreen('register')}
        />
      )}
      {currentScreen === 'dashboard' && (
        <Dashboard username={username} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;