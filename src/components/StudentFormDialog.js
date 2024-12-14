import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { groups } from '../data/students';

const StudentFormDialog = ({
  open,
  onClose,
  formData,
  setFormData,
  handleSubmit,
  editingStudent,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
            name="firstName"
            label="Prénom"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="lastName"
            label="Nom"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Groupe</InputLabel>
            <Select
              name="group"
              value={formData.group}
              label="Groupe"
              onChange={handleChange}
            >
              {groups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="birthDate"
            label="Date de naissance"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2.5 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: '#0083cb',
            color: '#0083cb',
            '&:hover': {
              borderColor: '#006ba3',
              backgroundColor: 'rgba(0, 131, 203, 0.08)',
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
            '&:hover': {
              backgroundColor: '#006ba3',
            },
          }}
        >
          {editingStudent ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentFormDialog;
