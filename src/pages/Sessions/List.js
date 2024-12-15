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
      field: 'name',
      headerName: 'Nom',
      flex: 1,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 600, fontFamily: 'Signika' }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: 'formattedDate',
      headerName: 'Date et Heure',
      flex: 1,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 600, fontFamily: 'Signika' }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: 'duration',
      headerName: 'Durée (min)',
      width: 130,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 600, fontFamily: 'Signika' }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: 'location',
      headerName: 'Lieu',
      flex: 1,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 600, fontFamily: 'Signika' }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon sx={{ color: '#0083cb' }} />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Statut',
      width: 130,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 600, fontFamily: 'Signika' }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Chip
          label={getStatusLabel(params.value)}
          sx={{
            backgroundColor: `${getStatusColor(params.value)}20`,
            color: getStatusColor(params.value),
            fontFamily: 'Signika',
            '& .MuiChip-label': {
              fontWeight: 500,
            },
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 600, fontFamily: 'Signika' }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Box>
          <Tooltip title="Modifier">
            <IconButton
              onClick={() => handleEdit(params.row)}
              sx={{ color: '#0083cb' }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton
              onClick={() => handleDelete(params.row.id)}
              sx={{ color: '#ed174c' }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontFamily: 'Signika', fontWeight: 600 }}>
          Sessions
        </Typography>
        <AddButton onClick={handleAdd}>
          Nouvelle Session
        </AddButton>
      </Box>

      <DataGrid
        rows={sessions}
        columns={columns}
        loading={loading}
        checkboxSelection
        disableRowSelectionOnClick
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        sx={{
          border: 'none',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f0f0f0',
            fontFamily: 'Signika',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f9fafb',
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
          },
          '& .MuiCheckbox-root': {
            color: '#0083cb',
          },
          '& .MuiCheckbox-root.Mui-checked': {
            color: '#0083cb',
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
