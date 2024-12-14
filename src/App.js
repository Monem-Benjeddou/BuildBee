import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import Layout from './components/Layout';
import StudentList from './pages/Students/List';

// Placeholder components for other routes
const StudentProfile = () => <div>Student Profile Page</div>;
const AttendanceTracker = () => <div>Attendance Tracker Page</div>;
const PaymentHistory = () => <div>Payment History Page</div>;
const ModelStickers = () => <div>Model Stickers Page</div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/attendance" element={<AttendanceTracker />} />
            <Route path="/payments" element={<PaymentHistory />} />
            <Route path="/stickers" element={<ModelStickers />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
