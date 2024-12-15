import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Tooltip,
  Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddButton from '../../components/AddButton';
import { getAllSessions, deleteSession, createSession, updateSession } from '../../services/sessionService';
import SessionDialog from './SessionDialog';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import '../../styles/table.css';

const SessionsList = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const data = await getAllSessions();
      setSessions(data.map(session => ({
        ...session,
        formattedDate: format(new Date(session.date), 'PPP p', { locale: fr })
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
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette session ?')) {
      try {
        await deleteSession(id);
        loadSessions();
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    }
  };

  const handleDialogClose = (saved) => {
    setOpenDialog(false);
    if (saved) {
      loadSessions();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#8dc63f';
      case 'upcoming':
        return '#0083cb';
      case 'cancelled':
        return '#ed174c';
      default:
        return '#fff200';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Terminée';
      case 'upcoming':
        return 'À venir';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const columns = [
    {
      field: 'formattedDate',
      headerName: 'Date et heure',
      flex: 1,
      renderHeader: (params) => (
        <Typography className="table-header-cell">
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventIcon sx={{ color: '#64748B' }} />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'location',
      headerName: 'Lieu',
      flex: 1,
      renderHeader: (params) => (
        <Typography className="table-header-cell">
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon sx={{ color: '#64748B' }} />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Statut',
      flex: 1,
      renderHeader: (params) => (
        <Typography className="table-header-cell">
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Chip
          label={getStatusLabel(params.value)}
          className={`status-chip ${params.value}`}
          sx={{
            backgroundColor: `${getStatusColor(params.value)}20`,
            color: getStatusColor(params.value),
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: '',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <div className="table-actions">
          <Tooltip title="Modifier">
            <IconButton
              onClick={() => handleEdit(params.row)}
              size="small"
              sx={{ color: '#64748B' }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton
              onClick={() => handleDelete(params.row.id)}
              size="small"
              sx={{ color: '#64748B' }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%', p: 3 }}>
      <div className="table-header">
        <div>
          <Typography variant="h4" className="table-title">
            Gestion des sessions
          </Typography>
          <Typography variant="body1" className="table-subtitle">
            Planification et suivi des sessions
          </Typography>
        </div>
        <AddButton onClick={handleAdd}>
          Nouvelle session
        </AddButton>
      </div>

      <DataGrid
        rows={sessions}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        loading={loading}
        autoHeight
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
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
