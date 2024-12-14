import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import {
  People,
  Person,
  DateRange,
  AttachMoney,
  Star,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors } from '../styles/theme';

const menuItems = [
  { text: 'Student List', icon: People, path: '/students' },
  { text: 'Student Profile', icon: Person, path: '/profile' },
  { text: 'Attendance Tracker', icon: DateRange, path: '/attendance' },
  { text: 'Payment History', icon: AttachMoney, path: '/payments' },
  { text: 'Model Stickers', icon: Star, path: '/stickers' },
];

const Sidebar = ({ drawerWidth, isOpen, onDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
        },
      }}
      open={isOpen}
    >
      <Box sx={{ p: 2, mt: 8 }}>
        <Typography
          variant="h6"
          sx={{
            color: colors.primary,
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2,
          }}
        >
          Student Manager
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              backgroundColor:
                location.pathname === item.path ? 'rgba(0, 131, 203, 0.08)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0, 131, 203, 0.15)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? colors.primary : 'grey.700',
              }}
            >
              <item.icon />
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                '& .MuiTypography-root': {
                  color: location.pathname === item.path ? colors.primary : 'grey.700',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
