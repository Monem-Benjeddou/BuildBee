import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Autocomplete,
  Chip
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { createProgram, updateProgram } from '../services/programService';
import { getAllGroups } from '../services/groupService';
import { useSnackbar } from 'notistack';
import fr from 'date-fns/locale/fr';

const ProgramDialog = ({ open, onClose, program }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'regular',
    duration: {
      weeks: '',
      days: ''
    },
    activities: [],
    groups: [],
    status: 'active',
    startDate: null
  });
  const [newActivity, setNewActivity] = useState({ name: '', description: '' });
  const [availableGroups, setAvailableGroups] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (program) {
      setFormData({
        ...program,
        startDate: new Date(program.startDate)
      });
    } else {
      resetForm();
    }
  }, [program]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groups = await getAllGroups();
        setAvailableGroups(groups);
      } catch (error) {
        enqueueSnackbar('Erreur lors du chargement des groupes', { variant: 'error' });
      }
    };
    fetchGroups();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: 'regular',
      duration: {
        weeks: '',
        days: ''
      },
      activities: [],
      groups: [],
      status: 'active',
      startDate: null
    });
    setNewActivity({ name: '', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('duration.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        duration: {
          ...prev.duration,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddActivity = () => {
    if (newActivity.name.trim()) {
      setFormData(prev => ({
        ...prev,
        activities: [
          ...prev.activities,
          {
            ...newActivity,
            order: prev.activities.length + 1,
            completed: false
          }
        ]
      }));
      setNewActivity({ name: '', description: '' });
    }
  };

  const handleRemoveActivity = (index) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index).map((activity, i) => ({
        ...activity,
        order: i + 1
      }))
    }));
  };

  const handleMoveActivity = (index, direction) => {
    const newActivities = [...formData.activities];
    if (direction === 'up' && index > 0) {
      [newActivities[index], newActivities[index - 1]] = [newActivities[index - 1], newActivities[index]];
    } else if (direction === 'down' && index < newActivities.length - 1) {
      [newActivities[index], newActivities[index + 1]] = [newActivities[index + 1], newActivities[index]];
    }
    
    setFormData(prev => ({
      ...prev,
      activities: newActivities.map((activity, i) => ({
        ...activity,
        order: i + 1
      }))
    }));
  };

  const handleSubmit = async () => {
    try {
      if (program) {
        await updateProgram(program._id, formData);
        enqueueSnackbar('Programme mis à jour avec succès', { variant: 'success' });
      } else {
        await createProgram(formData);
        enqueueSnackbar('Programme créé avec succès', { variant: 'success' });
      }
      onClose(true);
    } catch (error) {
      enqueueSnackbar(
        'Erreur lors de l\'enregistrement du programme',
        { variant: 'error' }
      );
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="md" fullWidth>
      <DialogTitle>
        {program ? 'Modifier le programme' : 'Nouveau programme'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Nom du programme"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            required
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Type de programme</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                label="Type de programme"
              >
                <MenuItem value="regular">Régulier</MenuItem>
                <MenuItem value="camp">Camp</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Statut</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                label="Statut"
              >
                <MenuItem value="active">Actif</MenuItem>
                <MenuItem value="inactive">Inactif</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {formData.type === 'regular' ? (
              <TextField
                label="Durée (semaines)"
                name="duration.weeks"
                type="number"
                value={formData.duration.weeks}
                onChange={handleInputChange}
                fullWidth
                required
              />
            ) : (
              <TextField
                label="Durée (jours)"
                name="duration.days"
                type="number"
                value={formData.duration.days}
                onChange={handleInputChange}
                fullWidth
                required
              />
            )}

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
              <DatePicker
                label="Date de début"
                value={formData.startDate}
                onChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>
          </Box>

          <Autocomplete
            multiple
            options={availableGroups}
            getOptionLabel={(option) => option.name}
            value={availableGroups.filter(group => 
              formData.groups.includes(group._id)
            )}
            onChange={(_, newValue) => {
              setFormData(prev => ({
                ...prev,
                groups: newValue.map(group => group._id)
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Groupes"
                placeholder="Sélectionner les groupes"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                  key={option._id}
                />
              ))
            }
          />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Activités
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label="Nom de l'activité"
              value={newActivity.name}
              onChange={(e) => setNewActivity(prev => ({
                ...prev,
                name: e.target.value
              }))}
              fullWidth
            />
            <TextField
              label="Description"
              value={newActivity.description}
              onChange={(e) => setNewActivity(prev => ({
                ...prev,
                description: e.target.value
              }))}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleAddActivity}
              disabled={!newActivity.name.trim()}
            >
              <AddIcon />
            </Button>
          </Box>

          <List>
            {formData.activities.map((activity, index) => (
              <ListItem
                key={index}
                sx={{
                  bgcolor: 'background.paper',
                  mb: 1,
                  borderRadius: 1,
                  boxShadow: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleMoveActivity(index, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleMoveActivity(index, 'down')}
                    disabled={index === formData.activities.length - 1}
                  >
                    <ArrowDownwardIcon />
                  </IconButton>
                </Box>
                <ListItemText
                  primary={activity.name}
                  secondary={activity.description}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleRemoveActivity(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Annuler</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.name || !formData.description || !formData.startDate}
        >
          {program ? 'Mettre à jour' : 'Créer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProgramDialog;
