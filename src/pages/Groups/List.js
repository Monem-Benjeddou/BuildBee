import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import GroupDialog from '../../components/GroupDialog';
import { 
  getAllGroups, 
  deleteGroup, 
  getGroupSessions 
} from '../../services/groupService';
import { format } from 'date-fns';

const GroupList = () => {
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const theme = useTheme();

  const formatSessionDateTime = (date) => {
    return format(new Date(date), 'PPP p');
  };

  const loadData = async () => {
    try {
      const groups = await getAllGroups();
      const groupsWithSessions = await Promise.all(groups.map(async (group) => {
        try {
          const sessions = await getGroupSessions(group.id);
          const upcomingSessions = sessions
            .filter(session => new Date(session.date) > new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date));
          
          const nextSession = upcomingSessions[0];
          const upcomingSessionsText = upcomingSessions
            .slice(0, 3)
            .map(session => formatSessionDateTime(session.date))
            .join('\n');

          return {
            ...group,
            nextSession: nextSession ? formatSessionDateTime(nextSession.date) : 'No upcoming sessions',
            upcomingSessions: upcomingSessionsText || 'No upcoming sessions',
            sessionCount: sessions.length
          };
        } catch (error) {
          console.error(`Error fetching sessions for group ${group.id}:`, error);
          return {
            ...group,
            nextSession: 'Error loading sessions',
            upcomingSessions: 'Error loading sessions',
            sessionCount: 0
          };
        }
      }));
      setRows(groupsWithSessions);
    } catch (error) {
      console.error('Error loading groups:', error);
      setRows([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = () => {
    setEditingGroup(null);
    setOpenDialog(true);
  };

  const handleEdit = (group) => {
    setEditingGroup(group);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteGroup(id);
      loadData();
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Nom du groupe',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ pl: 1 }}>
          <Typography sx={{ fontFamily: 'Signika Light' }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'level',
      headerName: 'Niveau',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Typography>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'nextSession',
      headerName: 'Prochaine séance',
      flex: 1.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventIcon color="action" />
          <Typography>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Modifier">
            <IconButton onClick={() => handleEdit(params.row)} size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton onClick={() => handleDelete(params.row.id)} size="small" color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" sx={{ fontFamily: 'Signika' }}>
          Groupes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{ fontFamily: 'Signika Light' }}
        >
          Nouveau groupe
        </Button>
      </Box>
      
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      />
      
      {openDialog && (
        <GroupDialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setEditingGroup(null);
          }}
          onSave={() => {
            setOpenDialog(false);
            setEditingGroup(null);
            loadData();
          }}
          group={editingGroup}
        />
      )}
    </Box>
  );
};

export default GroupList;
