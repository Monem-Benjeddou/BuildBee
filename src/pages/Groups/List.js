import React, { useState, useEffect } from 'react';
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
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import { getAllGroups, deleteGroup, createGroup, updateGroup } from '../../services/groupService';
import { getSessionById } from '../../services/sessionService';
import GroupDialog from '../../components/GroupDialog';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [sessionDetails, setSessionDetails] = useState({});

  const fetchSessionDetails = async (sessionIds) => {
    const details = {};
    for (const sessionId of sessionIds) {
      try {
        const session = await getSessionById(sessionId);
        if (session) {
          details[sessionId] = {
            ...session,
            formattedDateTime: new Date(session.date).toLocaleString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          };
        }
      } catch (error) {
        console.error('Error fetching session details:', error);
      }
    }
    return details;
  };

  const loadGroups = async () => {
    try {
      setLoading(true);
      const data = await getAllGroups();
      
      // Collect all unique session IDs
      const allSessionIds = new Set();
      data.forEach(group => {
        if (group.sessionIds) {
          group.sessionIds.forEach(id => allSessionIds.add(id));
        }
      });
      
      // Fetch session details
      const details = await fetchSessionDetails(Array.from(allSessionIds));
      setSessionDetails(details);
      
      setGroups(data);
    } catch (error) {
      console.error('Error loading groups:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleAdd = () => {
    setSelectedGroup(null);
    setOpenDialog(true);
  };

  const handleEdit = (group) => {
    setSelectedGroup(group);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      try {
        await deleteGroup(id);
        await loadGroups();
      } catch (error) {
        console.error('Error deleting group:', error);
      }
    }
  };

  const handleDialogClose = async (formData) => {
    if (formData) {
      try {
        if (selectedGroup) {
          await updateGroup(selectedGroup.id, formData);
        } else {
          await createGroup(formData);
        }
        await loadGroups();
      } catch (error) {
        console.error('Error saving group:', error);
      }
    }
    setOpenDialog(false);
    setSelectedGroup(null);
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Group Name',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GroupIcon color="primary" />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'program',
      headerName: 'Program',
      flex: 1,
    },
    {
      field: 'sessionIds',
      headerName: 'Sessions',
      flex: 2,
      renderCell: (params) => {
        const sessionIds = params.value || [];
        
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {sessionIds.length > 0 ? (
              sessionIds.map((sessionId) => {
                const session = sessionDetails[sessionId];
                return (
                  <Chip
                    key={sessionId}
                    icon={<EventIcon />}
                    label={session ? session.formattedDateTime : 'Loading...'}
                    size="small"
                    variant="outlined"
                  />
                );
              })
            ) : (
              <Typography color="text.secondary" variant="body2">
                No sessions
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)} size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)} size="small" color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontFamily: 'Signika' }}>Gestion des Groupes</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Ajouter un Groupe
        </Button>
      </Box>

      <DataGrid
        rows={groups}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        autoHeight
        loading={loading}
        getRowId={(row) => row._id}
      />

      {openDialog && (
        <GroupDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          group={selectedGroup}
          onSubmit={handleDialogClose}
        />
      )}
    </Box>
  );
};

export default GroupList;
