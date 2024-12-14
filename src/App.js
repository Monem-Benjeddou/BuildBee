import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import Layout from './components/Layout';
import StudentList from './pages/Students/List';
import Login from './components/Login';
import Register from './components/Register';
import AccountDetails from './pages/Account/AccountDetails';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Placeholder components for other routes
const StudentProfile = () => <div>Student Profile Page</div>;
const AttendanceTracker = () => <div>Attendance Tracker Page</div>;
const PaymentHistory = () => <div>Payment History Page</div>;
const ModelStickers = () => <div>Model Stickers Page</div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <StudentList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/students" element={
              <ProtectedRoute>
                <Layout>
                  <StudentList />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <StudentProfile />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/attendance" element={
              <ProtectedRoute>
                <Layout>
                  <AttendanceTracker />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/payments" element={
              <ProtectedRoute>
                <Layout>
                  <PaymentHistory />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/stickers" element={
              <ProtectedRoute>
                <Layout>
                  <ModelStickers />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/account" element={
              <ProtectedRoute>
                <Layout>
                  <AccountDetails />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Redirect root and unknown routes */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
