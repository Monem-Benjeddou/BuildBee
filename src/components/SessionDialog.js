import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createSession, updateSession } from '../services/sessionService';
import { getAllGroups } from '../services/groupService';

const SessionDialog = ({ open, onClose, onSave, session }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: new Date(),
    duration: 60,
    location: '',
    description: '',
    groupId: '',
  });
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const groupsData = await getAllGroups();
        setGroups(groupsData);
      } catch (error) {
        console.error('Error loading groups:', error);
      }
    };

    loadGroups();
  }, []);

  useEffect(() => {
    if (session) {
      setFormData({
        name: session.name || '',
        date: new Date(session.date) || new Date(),
        duration: session.duration || 60,
        location: session.location || '',
        description: session.description || '',
        groupId: session.groupId || '',
      });
    }
  }, [session]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      date: newDate,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (session) {
        await updateSession(session.id, formData);
      } else {
        await createSession(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontFamily: 'Signika' }}>
          {session ? 'Modifier la séance' : 'Nouvelle séance'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Nom de la séance"
            value={formData.name}
            onChange={handleChange('name')}
            fullWidth
          />
          
          <FormControl fullWidth>
            <InputLabel>Groupe</InputLabel>
            <Select
              value={formData.groupId}
              onChange={handleChange('groupId')}
              label="Groupe"
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date et heure"
              value={formData.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>

          <TextField
            label="Durée (minutes)"
            type="number"
            value={formData.duration}
            onChange={handleChange('duration')}
            fullWidth
          />

          <TextField
            label="Lieu"
            value={formData.location}
            onChange={handleChange('location')}
            fullWidth
          />

          <TextField
            label="Description"
            value={formData.description}
            onChange={handleChange('description')}
            multiline
            rows={4}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Annuler
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || !formData.name || !formData.groupId}
        >
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionDialog;
