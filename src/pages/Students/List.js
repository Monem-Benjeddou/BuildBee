import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Avatar,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday,
} from '@mui/icons-material';
import { students as initialRows, groups } from '../../data/students';

const StudentList = () => {
  const [rows, setRows] = useState(initialRows);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    group: '',
    birthDate: '',
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStudent(null);
    setFormData({
      firstName: '',
      lastName: '',
      group: '',
      birthDate: '',
    });
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

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      setRows(rows.filter(row => row.id !== id));
    }
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getGroupColor = (group) => {
    switch (group) {
      case 'Groupe A':
        return '#0083cb'; // Blue
      case 'Groupe B':
        return '#8dc63f'; // Green
      case 'Groupe C':
        return '#ed174c'; // Red
      default:
        return '#0083cb';
    }
  };

  const columns = [
    {
      field: 'avatar',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Avatar 
          src={params.value} 
          alt={`${params.row.firstName} ${params.row.lastName}`}
          sx={{ width: 45, height: 45 }}
        />
      ),
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'firstName',
      headerName: 'Prénom',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Typography sx={{ fontFamily: 'Signika', fontWeight: 'regular', fontSize: '1rem' }}>
          {params.value}
        </Typography>
      ),
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'lastName',
      headerName: 'Nom',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Typography sx={{ fontFamily: 'Signika', fontWeight: 'regular', fontSize: '1rem' }}>
          {params.value}
        </Typography>
      ),
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'group',
      headerName: 'Groupe',
      flex: 1,
      minWidth: 160,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: `${getGroupColor(params.value)}15`,
            color: getGroupColor(params.value),
            padding: '8px 16px',
            borderRadius: '20px',
            fontFamily: 'Signika',
            fontWeight: 'regular',
            fontSize: '0.95rem',
          }}
        >
          {params.value}
        </Box>
      ),
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'birthDate',
      headerName: 'Date de naissance',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarToday sx={{ fontSize: 20, color: '#0083cb' }} />
          <Typography sx={{ fontFamily: 'Signika Light', fontSize: '0.95rem' }}>
            {params.value ? new Date(params.value).toLocaleDateString('fr-FR') : ''}
          </Typography>
        </Box>
      ),
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          position: 'sticky',
          right: 0,
          backgroundColor: '#fff',
          paddingX: 1,
        }}>
          <Tooltip title="Modifier">
            <IconButton
              onClick={() => handleEdit(params.row)}
              size="small"
              sx={{ 
                color: '#0083cb',
                '&:hover': {
                  backgroundColor: '#0083cb15',
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton
              onClick={() => handleDelete(params.row.id)}
              size="small"
              sx={{ 
                color: '#ed174c',
                '&:hover': {
                  backgroundColor: '#ed174c15',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      headerAlign: 'center',
      align: 'center',
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
            color: '#0083cb', 
            fontWeight: 600, 
            fontFamily: 'Signika',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
          }}
        >
          Gestion des Enfants
        </Typography>
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
          disableRowSelectionOnClick
          disableColumnMenu
          getRowHeight={() => 100}
          sx={{
            border: 'none',
            backgroundColor: '#fff',
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
          },
        }}
      >
        <DialogTitle sx={{ fontFamily: 'Signika', color: '#0083cb' }}>
          {editingStudent ? 'Modifier un Enfant' : 'Ajouter un Enfant'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              name="lastName"
              label="Nom"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
            <TextField
              name="firstName"
              label="Prénom"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
            <FormControl fullWidth required>
              <InputLabel>Groupe</InputLabel>
              <Select
                name="group"
                value={formData.group}
                onChange={handleInputChange}
                label="Groupe"
                sx={{
                  borderRadius: '12px',
                }}
              >
                {groups.map((group) => (
                  <MenuItem key={group} value={group}>
                    <Box sx={{ 
                      color: getGroupColor(group),
                      fontFamily: 'Signika',
                    }}>
                      {group}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="birthDate"
              label="Date de naissance"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: '#666',
              borderRadius: '25px',
              padding: '8px 24px',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: '#0083cb',
              borderRadius: '25px',
              padding: '8px 24px',
              '&:hover': {
                backgroundColor: '#006ba3',
              },
            }}
          >
            {editingStudent ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentList;