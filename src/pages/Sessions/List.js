import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Tooltip,
  Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getAllSessions, deleteSession, createSession, updateSession } from '../../services/sessionService';
import SessionDialog from './SessionDialog';
import { format } from 'date-fns';

const SessionsList = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const data = await getAllSessions();
      setSessions(data.map(session => ({
        ...session,
        formattedDate: format(new Date(session.date), 'PPP p')
      })));
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleAdd = () => {
    setSelectedSession(null);
    setOpenDialog(true);
  };

  const handleEdit = (session) => {
    setSelectedSession(session);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        await deleteSession(id);
        await loadSessions();
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    }
  };

  const handleMarkCompleted = async (id) => {
    try {
      await updateSession(id, { status: 'completed' });
      await loadSessions();
    } catch (error) {
      console.error('Error marking session as completed:', error);
    }
  };

  const handleDialogClose = async (formData) => {
    if (formData) {
      try {
        if (selectedSession) {
          await updateSession(selectedSession.id, formData);
        } else {
          await createSession(formData);
        }
        await loadSessions();
      } catch (error) {
        console.error('Error saving session:', error);
      }
    }
    setOpenDialog(false);
    setSelectedSession(null);
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Session Name',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventIcon color="primary" />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'formattedDate',
      headerName: 'Date',
      flex: 1,
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon color="action" />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Chip 
          label={params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          color={params.value === 'completed' ? 'success' : 'primary'}
          variant="outlined"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          {params.row.status === 'upcoming' && (
            <Tooltip title="Mark as Completed">
              <IconButton onClick={() => handleMarkCompleted(params.row.id)}>
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" sx={{ fontFamily: 'Signika' }}>
          Sessions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          New Session
        </Button>
      </Box>
      <DataGrid
        rows={sessions}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        loading={loading}
        disableSelectionOnClick
      />
      <SessionDialog
        open={openDialog}
        onClose={handleDialogClose}
        session={selectedSession}
      />
    </Box>
  );
};

export default SessionsList;
