// src/components/Dashboard.jsx
import React from 'react';
import styles from '../components/RegistrationForm.module.css';

const Dashboard = ({ username, onLogout }) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <h2>Dashboard</h2>
        <p className={styles.formMessage}>Welcome, {username}!</p>
        <button onClick={onLogout} className={styles.formButton}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;