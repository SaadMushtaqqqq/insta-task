import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import SignupForm from '../SignupForm/SignupForm';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  // Page toggle state: false = Login Form, true = Signup Form
  const [showSignup, setShowSignup] = useState(false);

  // Form Input States
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [responseMsg, setResponseMsg] = useState('');

  // Agar 'Create new account' daba ho toh direct naya SignupForm render ho
  if (showSignup) {
    return <SignupForm onBackToLogin={() => setShowSignup(false)} />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Login Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setResponseMsg(data.message || 'Login error!');
      } else {
        setResponseMsg(data.message || 'Login Successful');
      }

    } catch (error) {
      console.error('API Error:', error);
      setResponseMsg('Server connection failed!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        
        <h2 className={styles.title}>Log into Instagram</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <InputField
            type="text"
            name="username"
            placeholder="Mobile number, username or email"
            value={formData.username}
            onChange={handleChange}
          />

          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className={styles.loginBtn}>
            Log in
          </button>
        </form>

        {/* Backend Response Message */}
        {responseMsg && (
          <p style={{ 
            marginTop: '12px', 
            fontSize: '13px', 
            color: responseMsg.toLowerCase().includes('successful') ? 'green' : 'red', 
            textAlign: 'center',
            fontWeight: 'bold' 
          }}>
            {responseMsg}
          </p>
        )}

        <a href="#" className={styles.forgotLink}>Forgot password?</a>

        <button type="button" className={styles.fbBtn}>
          Log in with Facebook
        </button>

        {/* Signup Component par switch karne ke liye Button */}
        <button 
          type="button" 
          className={styles.createBtn}
          onClick={() => { setShowSignup(true); setResponseMsg(''); }}
        >
          Create new account
        </button>

        <div className={styles.metaFooter}>
          <span>∞</span>
          <span className={styles.metaText}>Meta</span>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;