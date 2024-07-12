// src/components/LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../components/RegistrationForm.module.css';

const LoginForm = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://form-testing.onrender.com/api/users/login', {
        username,
        password,
      });
      setMessage(response.data.message);
      onLoginSuccess(response.data.username);  // Use the username from the response
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Username</label>
          <input
            className={styles.formInput}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password</label>
          <input
            className={styles.formInput}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.loginButton}`} type="submit">
            Login
          </button>
          <button 
            className={`${styles.button} ${styles.registerButton}`} 
            type="button"
            onClick={onSwitchToRegister}
          >
            Register
          </button>
        </div>
        {message && <p className={styles.formMessage}>{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
