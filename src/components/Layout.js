import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../styles/layout.css';

const Layout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <div style={{ display: 'flex', width: '100%' }}>
        <Sidebar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
