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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Notification from './Notification';
import schoolImage from '../assets/school.jpg';
import { colors } from '../styles/theme';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    usertype: '',
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleClickShowPassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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

    if (formData.password !== formData.confirmPassword) {
      setNotification({
        open: true,
        message: 'Passwords do not match',
        severity: 'error'
      });
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      register(userData);
      setNotification({
        open: true,
        message: 'Registration successful! Please login.',
        severity: 'success'
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || 'Registration failed',
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
                Join BuildBee
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: 'Signika Light, sans-serif' }}>
                Streamline Your School Management Today
              </Typography>
            </Box>
          </Grid>

          {/* Right side - Register Form */}
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
                Create Account
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="First Name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="lastname"
                  label="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
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
                  type={showPassword.password ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword('password')}
                          edge="end"
                        >
                          {showPassword.password ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword('confirmPassword')}
                          edge="end"
                        >
                          {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth margin="normal" required sx={{ mb: 3 }}>
                  <InputLabel>User Type</InputLabel>
                  <Select
                    name="usertype"
                    value={formData.usertype}
                    label="User Type"
                    onChange={handleChange}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="parent">Parent</MenuItem>
                  </Select>
                </FormControl>
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
                  Register
                </Button>
                <Typography align="center" sx={{ fontFamily: 'Signika Light, sans-serif' }}>
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    style={{ 
                      textDecoration: 'none', 
                      color: colors.secondary,
                      fontWeight: 'bold'
                    }}
                  >
                    Login here
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

export default Register;
