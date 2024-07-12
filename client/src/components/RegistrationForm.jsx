import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../components/RegistrationForm.module.css';

const RegistrationForm = ({ onRegistrationSuccess, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  const checkPasswordStrength = (pass) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if (strongRegex.test(pass)) {
      setPasswordStrength('strong');
    } else if (mediumRegex.test(pass)) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('weak');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }
    if (!agreeTerms) {
      setMessage("Please agree to the terms and conditions");
      return;
    }
    try {
      const response = await axios.post('http://form-testing.onrender.com/api/users/register', {
        username,
        email,
        password,
      });
      setMessage(response.data.message);
      onRegistrationSuccess(username);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <h2>REGISTER</h2>
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
          <label className={styles.formLabel}>Email</label>
          <input
            className={styles.formInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <div className={`${styles.passwordStrength} ${styles[`password${passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}`]}`}></div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Confirm Password</label>
          <input
            className={styles.formInput}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formCheckbox}>
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <label htmlFor="agreeTerms">I agree to the terms and conditions</label>
        </div>
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.registerButton}`} type="submit">
            Register
          </button>
          <button 
            className={`${styles.button} ${styles.loginButton}`} 
            type="button"
            onClick={onSwitchToLogin}
          >
            Back to Login
          </button>
        </div>
        {message && <p className={styles.formMessage}>{message}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;
