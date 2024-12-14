import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Notification from './Notification';
import schoolImage from '../assets/school.jpg';
import { colors } from '../styles/theme';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: colors.background,
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Grid container component={Paper} elevation={3} sx={{ minHeight: '100vh', margin: 0 }}>
          {/* Left side - Image */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundImage: `url(${schoolImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 4,
            }}
          >
            <Box sx={{ position: 'relative', color: 'white', textAlign: 'center' }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Welcome to BuildBee
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: 'Signika Light, sans-serif' }}>
                Your Complete School Management Solution
              </Typography>
            </Box>
          </Grid>

          {/* Right side - Login Form */}
          <Grid 
            item 
            xs={12} 
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              bgcolor: 'background.paper',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '450px',
                mx: 'auto',
                p: 4,
              }}
            >
              <Typography 
                component="h1" 
                variant="h3" 
                sx={{ 
                  mb: 4, 
                  color: colors.primary,
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                Login
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mb: 3,
                    background: `linear-gradient(45deg, ${colors.primary} 30%, ${colors.secondary} 90%)`,
                    '&:hover': {
                      background: `linear-gradient(45deg, ${colors.secondary} 30%, ${colors.primary} 90%)`,
                    }
                  }}
                >
                  Sign In
                </Button>
                <Typography align="center" sx={{ fontFamily: 'Signika Light, sans-serif' }}>
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    style={{ 
                      textDecoration: 'none', 
                      color: colors.secondary,
                      fontWeight: 'bold'
                    }}
                  >
                    Register here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </Box>
  );
};

export default Login;
