import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, IconButton, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import Notification from './Notification';
import { useAuth } from '../context/AuthContext';
import authImg1 from '../assets/auth-img-1.png';
import authImg2 from '../assets/auth-img-2.png';
import '../styles/auth.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const success = login(formData.email, formData.password);
      if (success) {
        setNotification({
          open: true,
          message: 'Login successful! Redirecting...',
          severity: 'success'
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setNotification({
          open: true,
          message: 'Invalid email or password',
          severity: 'error'
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'An error occurred during login',
        severity: 'error'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <div className="auth-container">
      <div className="auth-logo-container">
        <div className="auth-logo-wrapper">
          <div className="auth-logo-icon">
            <div className="auth-logo-dots">
              <div className="auth-logo-dot"></div>
              <div className="auth-logo-dot"></div>
            </div>
            <div className="auth-logo-bar"></div>
          </div>
          <div className="auth-logo-text">
            <div className="auth-logo-title">LOGO</div>
            <div className="auth-logo-slogan">YOUR SLOGAN HERE</div>
          </div>
        </div>
      </div>
      <div className="auth-content">
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
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="auth-title">Log in</h1>
        
          <div className="auth-form-content">
            <button type="button" className="google-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                <path d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00"/>
                <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.0011 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z" fill="#4CAF50"/>
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.785L18.7045 19.404C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
              </svg>
              <span className="google-button-text">
                Get started with Google
              </span>
            </button>

            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">Or</span>
              <div className="divider-line"></div>
            </div>

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

            <Link to="/forgot-password" className="auth-link" style={{ alignSelf: 'flex-end' }}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="auth-button">
            Continue
          </button>

          <div className="auth-footer">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </div>
        </form>
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </div>
    </div>
  );
}

export default Login;
