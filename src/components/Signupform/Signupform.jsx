import React, { useState } from 'react';
import styles from './SignupForm.module.css';

const SignupForm = ({ onBackToLogin }) => {
  const [formData, setFormData] = useState({
    contact: '',
    password: '',
    month: '',
    day: '',
    year: '',
    fullName: '',
    username: ''
  });

  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setResponseMsg('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username || formData.contact,
          password: formData.password,
          fullName: formData.fullName,
          contact: formData.contact,
          birthday: `${formData.day}-${formData.month}-${formData.year}`
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setResponseMsg(data.message || 'Already registered');
      } else {
        setResponseMsg('Registration Successful!');
      }
    } catch (error) {
      setResponseMsg('Server connection error!');
    }
  };

  return (
    <div className={styles.container}>
      
      {/* Top Header */}
      <div className={styles.header}>
        <div className={styles.metaHeader}>
          <span>∞</span> Meta
        </div>
        <h1 className={styles.title}>
          Get started on Instagram with a Meta Account
        </h1>
        <p className={styles.description}>
          A Meta Account lets you access multiple Meta technologies, like Instagram, easily and securely.
        </p>
      </div>

      <form onSubmit={handleSignup}>
        {/* Mobile number or email */}
        <label className={styles.label}>Mobile number or email</label>
        <input
          type="text"
          name="contact"
          placeholder="Mobile number or email"
          value={formData.contact}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <p className={styles.infoText}>
          You may receive notifications from us. <a href="#" className={styles.link}>Learn why we ask for your contact information</a>
        </p>

        {/* Password */}
        <label className={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className={styles.input}
        />

        {/* Birthday */}
        <label className={styles.label}>Birthday ⓘ</label>
        <div className={styles.birthdayContainer}>
          <select name="month" value={formData.month} onChange={handleChange} className={styles.select} required>
            <option value="">Month</option>
            {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
              <option key={i} value={m}>{m}</option>
            ))}
          </select>

          <select name="day" value={formData.day} onChange={handleChange} className={styles.select} required>
            <option value="">Day</option>
            {[...Array(31)].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>

          <select name="year" value={formData.year} onChange={handleChange} className={styles.select} required>
            <option value="">Year</option>
            {[...Array(50)].map((_, i) => (
              <option key={i} value={2026 - i}>{2026 - i}</option>
            ))}
          </select>
        </div>

        {/* Full Name */}
        <label className={styles.label}>Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Full name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className={styles.input}
        />

        {/* Username */}
        <label className={styles.label}>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>

      {/* Response Message */}
      {responseMsg && (
        <p className={responseMsg.includes('Successful') ? styles.msgSuccess : styles.msgError}>
          {responseMsg}
        </p>
      )}

      <div className={styles.footer}>
        <button onClick={onBackToLogin} className={styles.backBtn}>
          Back to Login
        </button>
      </div>

    </div>
  );
};

export default SignupForm;