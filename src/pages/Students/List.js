import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccountCircle as AccountCircleIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import StudentDialog from '../../components/StudentDialog';
import StudentProfileDialog from '../../components/StudentProfileDialog';
import AddButton from '../../components/AddButton';
import { getGroupColor } from '../../utils/colors';
import { 
  getAllStudents, 
  updateStudent, 
  createStudent, 
  deleteStudent,
} from '../../services/studentService';
import { getAllGroups } from '../../services/groupService';

const getInitials = (firstName = '', lastName = '') => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const StudentList = () => {
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [studentsData, groupsData] = await Promise.all([
        getAllStudents(),
        getAllGroups()
      ]);
      setRows(studentsData);
      setGroups(groupsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = () => {
    setEditingStudent(null);
    setOpenDialog(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      try {
        await deleteStudent(id);
        loadData();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleDialogClose = (saved) => {
    setOpenDialog(false);
    if (saved) {
      loadData();
    }
  };

  const handleProfileClose = () => {
    setOpenProfile(false);
    setSelectedStudent(null);
  };

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setOpenProfile(true);
  };

  const handleLoginClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLoginClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout logic here
    handleLoginClose();
  };

  const columns = [
    {
      field: 'avatar',
      headerName: '',
      width: 60,
      sortable: false,
      renderCell: (params) => (
        <Avatar
          onClick={() => handleViewProfile(params.row)}
          sx={{
            bgcolor: '#0083cb',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          {getInitials(params.row.firstName, params.row.lastName)}
        </Avatar>
      ),
    },
    {
      field: 'firstName',
      headerName: 'Prénom',
      flex: 1,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 600, fontFamily: 'Signika' }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={{ fontFamily: 'Signika' }}>{params.value}</Typography>
      ),
    },
    {
      field: 'lastName',
      headerName: 'Nom',
      flex: 1,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 600, fontFamily: 'Signika' }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={{ fontFamily: 'Signika' }}>{params.value}</Typography>
      ),
    },
    {
      field: 'birthDate',
      headerName: 'Date de naissance',
      flex: 1,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 600, fontFamily: 'Signika' }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={{ fontFamily: 'Signika' }}>
          {new Date(params.value).toLocaleDateString('fr-FR')}
        </Typography>
      ),
    },
    {
      field: 'group',
      headerName: 'Groupe',
      flex: 1,
      renderHeader: (params) => (
        <Typography sx={{ fontWeight: 600, fontFamily: 'Signika' }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => {
        const group = groups.find(g => g.id === params.value);
        return group ? (
          <Chip
            label={group.name}
            sx={{
              backgroundColor: '#0083cb20',
              color: '#0083cb',
              fontFamily: 'Signika',
              '& .MuiChip-label': {
                fontWeight: 500,
              },
            }}
          />
        ) : null;
      },
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
    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          gap: 2 
        }}>
          <Typography variant="h4" sx={{ fontFamily: 'Signika', fontWeight: 600 }}>
            Élèves
          </Typography>

          <AddButton onClick={handleAdd}>
            Nouvel Élève
          </AddButton>
        </Box>

        <Box sx={{ flex: 1, minHeight: 0 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            checkboxSelection
            disableRowSelectionOnClick
            selectionModel={selectionModel}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            sx={{
              height: '100%',
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
        </Box>

        <StudentDialog
          open={openDialog}
          onClose={handleDialogClose}
          student={editingStudent}
          groups={groups}
        />

        <StudentProfileDialog
          open={openProfile}
          onClose={handleProfileClose}
          student={selectedStudent}
        />
      </Box>
    </Box>
  );
};

export default StudentList;