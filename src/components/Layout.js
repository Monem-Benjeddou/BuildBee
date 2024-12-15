import React from 'react';
import Sidebar from './Sidebar';
import '../styles/layout.css';

const Layout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
