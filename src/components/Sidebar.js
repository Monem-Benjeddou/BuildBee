import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: <DashboardIcon />, text: 'Dashboard' },
    { path: '/programs', icon: <SchoolIcon />, text: 'Gestion des programmes' },
    { path: '/users', icon: <GroupIcon />, text: 'Gestion des utilisateurs' },
    { path: '/settings', icon: <SettingsIcon />, text: 'Paramètres' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <div className="logo-dots">
            <div className="logo-dot"></div>
            <div className="logo-dot"></div>
          </div>
          <div className="logo-bar"></div>
        </div>
        <div className="logo-text">
          <span className="logo-title">LOGO</span>
          <span className="logo-slogan">YOUR SLOGAN HERE</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span className="menu-text">{item.text}</span>
          </Link>

        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/profile" className="menu-item">
          <AccountCircleIcon />
          <span className="menu-text">
            {currentUser?.email || 'Mon compte'}
          </span>
        </Link>
        <button onClick={handleLogout} className="menu-item logout-btn">
          <LogoutIcon />
          <span className="menu-text">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
