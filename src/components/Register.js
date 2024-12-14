import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../context/AuthContext';
import Notification from './Notification';
import authImg1 from '../assets/auth-img-1.png';
import authImg2 from '../assets/auth-img-2.png';
import '../styles/auth.css';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setNotification({
        open: true,
        message: 'Passwords do not match',
        severity: 'error',
      });
      return;
    }

    try {
      await register(formData);
      navigate('/login');
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || 'Registration failed',
        severity: 'error',
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
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
      <form className="auth-form" style={{ top: '166.50px' }} onSubmit={handleSubmit}>
        <h1 className="auth-title">Get started for free</h1>
        
        <div className="auth-form-content">
          <button type="button" className="google-button">
            <GoogleIcon style={{ color: '#4285F4' }} />
            <span style={{ color: '#525961', fontSize: '20px', fontFamily: 'Signika' }}>
              Get started with Google
            </span>
          </button>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">Or</span>
            <div className="divider-line"></div>
          </div>

          <input
            type="text"
            name="fullName"
            className="auth-input"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
          />

          <input
            type="email"
            name="email"
            className="auth-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />

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
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>

          <div className="password-input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              className="auth-input"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <IconButton
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              edge="end"
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>

        <button type="submit" className="auth-button">
          Create account
        </button>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <div className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Log in
            </Link>
          </div>

          <div className="auth-terms">
            <div>By creating your account you agree to the</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <a href="#" className="auth-terms-link">Terms of Service</a>
              <span style={{ color: '#979CA1' }}>and</span>
              <a href="#" className="auth-terms-link">Privacy Policy</a>
            </div>
          </div>
        </div>
      </form>

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </div>
  );
}

export default Register;
