import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import theme from './styles/theme';
import Layout from './components/Layout';
import StudentList from './pages/Students/List';
import SessionList from './pages/Sessions/List';
import PresenceList from './pages/Presence/List';
import Login from './components/Login';
import Register from './components/Register';
import AccountDetails from './pages/Account/AccountDetails';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import GroupList from './pages/Groups/List';
import { saveCurrentRoute } from './utils/routeUtils';

// Placeholder components for other routes
const StudentProfile = () => <div>Student Profile Page</div>;
const AttendanceTracker = () => <div>Attendance Tracker Page</div>;
const PaymentHistory = () => <div>Payment History Page</div>;
const ModelStickers = () => <div>Model Stickers Page</div>;

// RouteTracker component to save current route
const RouteTracker = () => {
  const location = useLocation();

  React.useEffect(() => {
    saveCurrentRoute(location);
  }, [location]);

  return null;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
        <AuthProvider>
          <Router>
            <RouteTracker />
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
              <Route path="/forgot-password" element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              } />
              <Route path="/reset-password" element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              } />
              
              {/* Protected routes */}
              <Route path="/" element={
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
              <Route path="/sessions" element={
                <ProtectedRoute>
                  <Layout>
                    <SessionList />
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
              <Route path="/groups" element={
                <ProtectedRoute>
                  <Layout>
                    <GroupList />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/presence" element={
                <ProtectedRoute>
                  <Layout>
                    <PresenceList />
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
              
              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
