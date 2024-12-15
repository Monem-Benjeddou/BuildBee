import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Tooltip,
  Checkbox,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DeleteSweep as DeleteSweepIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import StudentDialog from '../../components/StudentDialog';
import StudentProfileDialog from '../../components/StudentProfileDialog';

import { getGroupColor } from '../../utils/colors';
import { 
  getAllStudents, 
  updateStudent, 
  createStudent, 
  deleteStudent,
  deleteStudents 
} from '../../services/studentService';
import { getAllGroups } from '../../services/groupService';
import { useTheme } from '@mui/material/styles';

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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    group: '',
    birthDate: '',
  });
  const theme = useTheme();

  useEffect(() => {
    const loadData = async () => {
      const allGroups = await getAllGroups();
      setGroups(allGroups);
      
      const students = await getAllStudents();
      if (Array.isArray(students)) {
        setRows(students.map(student => {
          const studentGroups = student.groupIds && student.groupIds.length > 0
            ? student.groupIds
                .map(id => allGroups.find(g => g.id === id))
                .filter(Boolean)
                .map(g => g.name)
                .join(', ')
            : 'No Groups';
          return {
            ...student,
            groups: studentGroups
          };
        }));
      } else {
        console.error('Students data is not an array:', students);
        setRows([]);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (studentData) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, studentData);
      } else {
        await createStudent(studentData);
      }
      
      // Reload data after update
      const allGroups = await getAllGroups();
      const students = await getAllStudents();
      if (Array.isArray(students)) {
        setRows(students.map(student => {
          const studentGroups = student.groupIds && student.groupIds.length > 0
            ? student.groupIds
                .map(id => allGroups.find(g => g.id === id))
                .filter(Boolean)
                .map(g => g.name)
                .join(', ')
            : 'No Groups';
          return {
            ...student,
            groups: studentGroups
          };
        }));
      }
      
      setOpenDialog(false);
      setEditingStudent(null);
    } catch (error) {
      console.error('Error submitting student:', error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      group: student.group,
      birthDate: student.birthDate,
    });
    setOpenDialog(true);
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setFormData({
      firstName: '',
      lastName: '',
      group: '',
      birthDate: '',
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      const allGroups = await getAllGroups();
      setGroups(allGroups);
      
      const students = await getAllStudents();
      if (Array.isArray(students)) {
        setRows(students.map(student => {
          const studentGroups = student.groupIds && student.groupIds.length > 0
            ? student.groupIds
                .map(id => allGroups.find(g => g.id === id))
                .filter(Boolean)
                .map(g => g.name)
                .join(', ')
            : 'No Groups';
          return {
            ...student,
            groups: studentGroups
          };
        }));
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await deleteStudents(selectionModel);
      setSelectionModel([]);
      const allGroups = await getAllGroups();
      setGroups(allGroups);
      
      const students = await getAllStudents();
      if (Array.isArray(students)) {
        setRows(students.map(student => {
          const studentGroups = student.groupIds && student.groupIds.length > 0
            ? student.groupIds
                .map(id => allGroups.find(g => g.id === id))
                .filter(Boolean)
                .map(g => g.name)
                .join(', ')
            : 'No Groups';
          return {
            ...student,
            groups: studentGroups
          };
        }));
      }
    } catch (error) {
      console.error('Error deleting students:', error);
    }
  };

  const handleRowClick = (params) => {
    setSelectedStudent(params.row);
    setOpenProfile(true);
  };

  const columns = [
    {
      field: 'avatar',
      headerName: '',
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          sx={{
            width: 32,
            height: 32,
            bgcolor: params.row.color || theme.palette.primary.main,
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
      minWidth: 130,
      renderCell: (params) => (
        <Box sx={{ pl: 1 }}>
          <Typography sx={{ fontFamily: 'Signika Light' }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'lastName',
      headerName: 'Nom',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Typography sx={{ fontFamily: 'Signika Light' }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'groups',
      headerName: 'Groupe',
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
      field: 'birthDate',
      headerName: 'Date de naissance',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString('fr-FR'),
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Typography sx={{ fontFamily: 'Signika Light' }}>
            {new Date(params.value).toLocaleDateString('fr-FR')}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 1 }}>
          <Tooltip title="Modifier">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(params.row);
              }}
              size="small"
              sx={{ color: theme.palette.primary.main }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(params.row.id);
              }}
              size="small"
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

    <Box sx={{ 
      height: '100%', 
      width: '100%', 
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        px: 3,
        py: 2,
        borderBottom: '1px solid #f0f0f0',
        backgroundColor: '#fff',
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: theme.palette.primary.main, 
            fontWeight: 600, 
            fontFamily: 'Signika',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
          }}
        >
          Gestion des Enfants
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {selectionModel.length > 0 && (
            <Button
              variant="contained"
              startIcon={<DeleteSweepIcon />}
              onClick={handleDeleteSelected}
              sx={{
                backgroundColor: theme.palette.error.main,
                borderRadius: '25px',
                padding: '10px 24px',
                '&:hover': {
                  backgroundColor: theme.palette.error.dark,
                },
              }}
            >
              Supprimer ({selectionModel.length})
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: '25px',
              padding: '10px 24px',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Ajouter un Enfant
          </Button>
        </Box>
      </Box>

      <Box sx={{ 
        flexGrow: 1,
        width: '100%',
        px: 3,
        py: 2,
      }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          onRowClick={handleRowClick}
          autoHeight
        />
      </Box>

      {openDialog && (
        <StudentDialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setEditingStudent(null);
          }}
          student={editingStudent}
          onSubmit={handleSubmit}
        />
      )}

      {openProfile && selectedStudent && (
        <StudentProfileDialog
          open={openProfile}
          onClose={() => {
            setOpenProfile(false);
            setSelectedStudent(null);
          }}
          student={selectedStudent}
        />
      )}
    </Box>
  );
};

export default StudentList;