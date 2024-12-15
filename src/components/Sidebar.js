import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  CalendarMonth as CalendarIcon,
  Payments as PaymentsIcon,
  EmojiEvents as StickersIcon,
  People as PeopleIcon,
  Event as EventIcon,
  AssignmentTurnedIn as PresenceIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { colors } from '../styles/theme';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard'
  },
  {
    text: 'Élèves',
    icon: <SchoolIcon />,
    path: '/students'
  },
  {
    text: 'Students',
    icon: <PeopleIcon />,
    path: '/students'
  },
  {
    text: 'Sessions',
    icon: <EventIcon />,
    path: '/sessions'
  },
  {
    text: 'Groupes',
    icon: <GroupIcon />,
    path: '/groups'
  },
  {
    text: 'Présence',
    icon: <CalendarIcon />,
    path: '/attendance'
  },
  {
    text: 'Présences',
    icon: <PresenceIcon />,
    path: '/presence'
  },
  {
    text: 'Paiements',
    icon: <PaymentsIcon />,
    path: '/payments'
  },
  {
    text: 'Gommettes',
    icon: <StickersIcon />,
    path: '/stickers'
  }
];

const Sidebar = ({ drawerWidth, isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          borderRight: '1px solid #f0f0f0',
          transition: 'transform 0.3s ease-in-out',
          transform: isOpen ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
        },
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 2,
        borderBottom: '1px solid #f0f0f0',
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: colors.primary,
            fontWeight: 600,
            fontFamily: 'Signika',
          }}
        >
          BuildBee
        </Typography>
      </Box>
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                borderRadius: '10px',
                mb: 0.5,
                backgroundColor: location.pathname === item.path ? `${colors.primary}15` : 'transparent',
                color: location.pathname === item.path ? colors.primary : 'grey.700',
                '&:hover': {
                  backgroundColor: location.pathname === item.path ? `${colors.primary}22` : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? colors.primary : 'grey.700',
                minWidth: '40px',
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontFamily: 'Signika',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
