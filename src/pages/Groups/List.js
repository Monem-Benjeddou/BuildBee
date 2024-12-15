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
import { getAllGroups, deleteGroup } from '../../services/groupService';
import { format } from 'date-fns';

const GroupList = () => {
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const groups = getAllGroups();
    const groupsWithSessions = groups.map(group => {
      const upcomingSessions = getUpcomingSessions(group.sessions || []);
      const nextSession = upcomingSessions[0];
      
      const upcomingSessionsText = upcomingSessions
        .slice(0, 3)
        .map(session => formatSessionDateTime(session.date, session.startTime))
        .join('\n');

      return {
        ...group,
        nextSession: nextSession ? 
          formatSessionDateTime(nextSession.date, nextSession.startTime) : 
          'No upcoming sessions',
        upcomingSessions: upcomingSessionsText || 'No upcoming sessions',
        sessionCount: (group.sessions || []).length
      };
    });
    setRows(groupsWithSessions);
  };

  const getUpcomingSessions = (sessions) => {
    if (!sessions || sessions.length === 0) return [];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return sessions
      .filter(session => {
        const sessionDate = new Date(session.date);
        sessionDate.setHours(0, 0, 0, 0);
        return sessionDate >= today && session.status !== 'completed';
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const formatSessionDateTime = (date, time) => {
    return `${format(new Date(date), 'dd/MM/yyyy')} at ${time}`;
  };

  const handleEdit = (group) => {
    setEditingGroup(group);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      deleteGroup(id);
      loadData();
    }
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'program',
      headerName: 'Program',
      flex: 1,
    },
    {
      field: 'nextSession',
      headerName: 'Next Session',
      flex: 1.5,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventIcon color="action" sx={{ fontSize: 20 }} />
          <Typography variant="body2">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'upcomingSessions',
      headerName: 'Upcoming Sessions',
      flex: 2,
      renderCell: (params) => (
        <Box>
          {params.value.split('\n').map((session, index) => (
            <Typography key={index} variant="body2">
              {session}
            </Typography>
          ))}
        </Box>
      ),
    },
    {
      field: 'sessionCount',
      headerName: 'Total Sessions',
      flex: 0.7,
      align: 'center',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton onClick={(e) => {
              e.stopPropagation();
              handleEdit(params.row);
            }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton 
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(params.row.id);
              }}
              sx={{ color: theme.palette.error.main }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Groups
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingGroup(null);
            setOpenDialog(true);
          }}
        >
          Add Group
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        autoHeight
      />

      {openDialog && (
        <GroupDialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setEditingGroup(null);
          }}
          group={editingGroup}
          onSubmit={(formData) => {
            setOpenDialog(false);
            setEditingGroup(null);
            loadData();
          }}
        />
      )}
    </Box>
  );
};

export default GroupList;
