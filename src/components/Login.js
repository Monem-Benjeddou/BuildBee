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
              <GoogleIcon style={{ color: '#4285F4' }} />
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
