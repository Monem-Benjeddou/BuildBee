import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import authImg1 from '../assets/auth-img-1.png';
import authImg2 from '../assets/auth-img-2.png';
import '../styles/auth.css';

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic
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
        <h1 className="auth-title">Reset password</h1>

        <div className="auth-form-content">
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="auth-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <IconButton
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>

          <div className="password-input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              className="auth-input"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <IconButton
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>

          <button type="submit" className="auth-button">
            Submit
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

export default ResetPassword;
