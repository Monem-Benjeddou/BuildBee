import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { getSessionAttendance } from '../../services/sessionService';

const AttendanceHistory = ({ studentId }) => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [view, setView] = useState(0); // 0 for table, 1 for graph
  const [stats, setStats] = useState({ present: 0, absent: 0, rate: 0 });

  useEffect(() => {
    loadHistory();
  }, [studentId]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      // In a real app, you would have an API endpoint to get attendance history
      // This is a placeholder implementation
      const data = await getSessionAttendance(studentId);
      setHistory(data);
      
      // Calculate statistics
      const present = data.filter(record => record.present).length;
      const total = data.length;
      setStats({
        present,
        absent: total - present,
        rate: total > 0 ? (present / total) * 100 : 0
      });
    } catch (error) {
      console.error('Error loading attendance history:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Groupe</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                {new Date(record.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </TableCell>
              <TableCell>{record.groupName}</TableCell>
              <TableCell>
                {record.present ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CancelIcon color="error" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderGraph = () => {
    const data = [
      { name: 'Présent', value: stats.present, fill: '#4caf50' },
      { name: 'Absent', value: stats.absent, fill: '#f44336' }
    ];

    return (
      <Box sx={{ height: 300, width: '100%' }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={view} onChange={(e, newValue) => setView(newValue)}>
          <Tab label="Tableau" />
          <Tab label="Graphique" />
        </Tabs>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Statistiques de présence
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography>
            Présences: {stats.present} ({stats.rate.toFixed(1)}%)
          </Typography>
          <Typography>
            Absences: {stats.absent}
          </Typography>
        </Box>
      </Box>

      {view === 0 ? renderTable() : renderGraph()}
    </Box>
  );
};

export default AttendanceHistory;
