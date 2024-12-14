import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Signika font
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Signika:wght@300;400;500;600;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);