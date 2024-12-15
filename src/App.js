import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import theme from './styles/theme';
import Layout from './components/Layout';
import StudentList from './pages/Students/List';
import SessionList from './pages/Sessions/List';
import PresenceList from './pages/Presence/List';
import PaymentList from './pages/Payments/List';
import Login from './components/Login';
import Register from './components/Register';
import AccountDetails from './pages/Account/AccountDetails';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import GroupList from './pages/Groups/List';
import ProgramList from './pages/Programs/List';

// Placeholder components for other routes
const StudentProfile = () => <div>Student Profile Page</div>;
const ModelStickers = () => <div>Model Stickers Page</div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
              <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/" element={<Navigate to="/students" replace />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/students/:id" element={<StudentProfile />} />
                <Route path="/sessions" element={<SessionList />} />
                <Route path="/presence" element={<PresenceList />} />
                <Route path="/groups" element={<GroupList />} />
                <Route path="/programs" element={<ProgramList />} />
                <Route path="/payments" element={<PaymentList />} />
                <Route path="/stickers" element={<ModelStickers />} />
                <Route path="/account" element={<AccountDetails />} />
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
