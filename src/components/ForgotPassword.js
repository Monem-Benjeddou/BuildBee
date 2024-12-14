import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import authImg1 from '../assets/auth-img-1.png';
import authImg2 from '../assets/auth-img-2.png';
import '../styles/auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset request logic
  };

  return (
    <div className="auth-container">
      <img 
        src={authImg1}
        alt="Background Left" 
        className="auth-bg-left"
      />
      <img 
        src={authImg2}
        alt="Background Right" 
        className="auth-bg-right"
      />
      <form className="auth-form" style={{ top: '270px' }} onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="auth-title">Forgot your password?</h1>
          <p className="auth-subtitle">
            Please enter the email address associated with your account and we will email you a link to reset your password
          </p>
        </div>

        <div className="auth-form-content">
          <input
            type="email"
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="auth-button">
            Send me reset link
          </button>
        </div>

        <Link to="/login" className="back-to-login">
          <ArrowBackIcon />
          Return to sign in
        </Link>
      </form>
    </div>
  );
}

export default ForgotPassword;
