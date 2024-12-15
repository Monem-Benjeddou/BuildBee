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
import '../../styles/table.css';

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
          className="table-avatar"
          onClick={() => handleViewProfile(params.row)}
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
        <Typography className="table-header-cell">
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: 'lastName',
      headerName: 'Nom',
      flex: 1,
      renderHeader: (params) => (
        <Typography className="table-header-cell">
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: 'birthDate',
      headerName: 'Date de naissance',
      flex: 1,
      renderHeader: (params) => (
        <Typography className="table-header-cell">
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <Typography>
          {new Date(params.value).toLocaleDateString('fr-FR')}
        </Typography>
      ),
    },
    {
      field: 'group',
      headerName: 'Groupe',
      flex: 1,
      renderHeader: (params) => (
        <Typography className="table-header-cell">
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => {
        const group = groups.find(g => g.id === params.value);
        return group ? (
          <Chip
            label={group.name}
            className="table-chip"
            sx={{
              backgroundColor: '#0083cb20',
              color: '#0083cb',
            }}
          />
        ) : null;
      },
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
            Gestion des élèves
          </Typography>
          <Typography variant="body1" className="table-subtitle">
            Liste complète des élèves inscrits
          </Typography>
        </div>
        <AddButton onClick={handleAdd}>
          Nouvel élève
        </AddButton>
      </div>

      <DataGrid
        rows={rows}
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
  );
};

export default StudentList;