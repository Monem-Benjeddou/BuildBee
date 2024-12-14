import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const AccountDetails = () => {
  const { user, users, setUsers } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.currentPassword !== user.password) {
      setError('Current password is incorrect');
      return;
    }

    // Update password in users array
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return { ...u, password: formData.newPassword };
      }
      return u;
    });

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Update current user
    const updatedUser = { ...user, password: formData.newPassword };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    setIsEditing(false);
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
    setError('');
    alert('Password updated successfully');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Account Details
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Name
            </Typography>
            <Typography variant="body1">{user.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Last Name
            </Typography>
            <Typography variant="body1">{user.lastname}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1">{user.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary">
              User Type
            </Typography>
            <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
              {user.usertype}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Change Password
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          {!isEditing ? (
            <Button
              variant="contained"
              onClick={() => setIsEditing(true)}
            >
              Change Password
            </Button>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="currentPassword"
                label="Current Password"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                value={formData.confirmNewPassword}
                onChange={handleChange}
              />
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsEditing(false);
                    setError('');
                    setFormData({
                      currentPassword: '',
                      newPassword: '',
                      confirmNewPassword: '',
                    });
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AccountDetails;
