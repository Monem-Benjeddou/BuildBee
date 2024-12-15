import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import Logo from '../assets/cropped-YE-02-200-80.png';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLoginClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLoginClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout logic here
    handleLoginClose();
  };

  return (
    <Box sx={{ 
      width: '100%',
      backgroundColor: '#fff',
      borderBottom: '1px solid #e0e0e0',
      padding: '8px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1100,
      height: '56px',
      boxSizing: 'border-box'
    }}>
      <Box component="img" src={Logo} alt="Logo" sx={{ height: '40px', objectFit: 'contain' }} />
      <Button
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleLoginClick}
        sx={{
          color: '#0083cb',
          textTransform: 'none',
          fontFamily: 'Signika',
          marginRight: '16px'
        }}
      >
        Admin
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleLoginClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;
