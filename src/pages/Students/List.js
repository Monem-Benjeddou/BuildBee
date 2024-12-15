import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Tooltip,
  Checkbox,
  TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DeleteSweep as DeleteSweepIcon,
} from '@mui/icons-material';
import { students as initialRows } from '../../data/students';
import StudentFormDialog from '../../components/StudentFormDialog';
import StudentProfileDialog from '../../components/StudentProfileDialog';
import '../../styles/layout.css';

const StudentList = () => {
  const [rows, setRows] = useState(initialRows);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    group: '',
    birthDate: '',
  });

  const handleOpenDialog = () => {
    setFormData({
      firstName: '',
      lastName: '',
      group: '',
      birthDate: '',
    });
    setEditingStudent(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStudent(null);
  };

  const handleEdit = (student) => {
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      group: student.group,
      birthDate: student.birthDate,
    });
    setEditingStudent(student);
    setOpenDialog(true);
  };

  const handleSubmit = () => {
    if (editingStudent) {
      setRows(rows.map(row =>
        row.id === editingStudent.id
          ? { ...row, ...formData }
          : row
      ));
    } else {
      const newStudent = {
        id: Math.max(...rows.map(r => r.id)) + 1,
        ...formData,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        createdAt: new Date().toISOString(),
      };
      setRows([...rows, newStudent]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleDeleteSelected = () => {
    setRows(rows.filter(row => !selectionModel.includes(row.id)));
    setSelectionModel([]);
  };

  const handleRowClick = (params) => {
    setSelectedStudent(params.row);
    setOpenProfile(true);
  };

  const columns = [
    {
      field: 'avatar',
      headerName: '',
      width: 80,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Avatar src={params.value} />
        </Box>
      ),
      sortable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'firstName',
      headerName: 'Prénom',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Typography>
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
        <Box sx={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Typography>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'group',
      headerName: 'Groupe',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Box
            sx={{
              backgroundColor: '#f0f0f0',
              color: '#2c3e50',
              py: 1,
              px: 2,
              borderRadius: '20px',
              fontWeight: 500,
            }}
          >
            {params.value}
          </Box>
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
        <Box sx={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Typography>
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
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}>
          <Tooltip title="Modifier">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(params.row);
              }}
              size="small"
              sx={{ color: '#0083cb' }}
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
    <div className="main-layout">
      <div className="main-content">
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
                color: '#0083cb', 
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
                    backgroundColor: '#ed174c',
                    borderRadius: '25px',
                    padding: '10px 24px',
                    '&:hover': {
                      backgroundColor: '#d41543',
                    },
                  }}
                >
                  Supprimer ({selectionModel.length})
                </Button>
              )}
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                sx={{
                  backgroundColor: '#0083cb',
                  borderRadius: '25px',
                  padding: '10px 24px',
                  '&:hover': {
                    backgroundColor: '#006ba3',
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
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
              checkboxSelection
              disableRowSelectionOnClick={false}
              disableColumnMenu
              getRowHeight={() => 75}
              onRowClick={handleRowClick}
              rowSelectionModel={selectionModel}
              onRowSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              sx={{
                border: 'none',
                backgroundColor: '#fff',
                cursor: 'pointer',
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #f0f0f0',
                  py: 3,
                  px: 2,
                  fontSize: '1rem',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f8f9fa',
                  borderBottom: 'none',
                  '& .MuiDataGrid-columnHeader': {
                    py: 2,
                    px: 2,
                    '&:focus': {
                      outline: 'none',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      fontFamily: 'Signika',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: '#2c3e50',
                    },
                  },
                },
                '& .MuiDataGrid-row': {
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#0083cb15',
                    '&:hover': {
                      backgroundColor: '#0083cb22',
                    },
                  },
                },
                '& .MuiCheckbox-root': {
                  color: '#0083cb',
                  '&.Mui-checked': {
                    color: '#0083cb',
                  },
                },
                '& .MuiDataGrid-footer': {
                  borderTop: 'none',
                  borderBottom: '1px solid #f0f0f0',
                },
                '& .MuiDataGrid-virtualScroller': {
                  '& .MuiDataGrid-virtualScrollerContent': {
                    height: '100% !important',
                  },
                },
              }}
            />
          </Box>

          <StudentFormDialog
            open={openDialog}
            onClose={handleCloseDialog}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            editingStudent={editingStudent}
          />

          <StudentProfileDialog
            student={selectedStudent}
            open={openProfile}
            onClose={() => setOpenProfile(false)}
          />
        </Box>
      </div>
    </div>
  );
};

export default StudentList;