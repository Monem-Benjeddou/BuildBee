import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Chip,
  OutlinedInput,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { getUpcomingSessions } from '../services/sessionService';

const GroupDialog = ({ open, onClose, group, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    program: '',
    description: '',
    sessionIds: []
  });
  const [availableSessions, setAvailableSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        setLoading(true);
        const sessions = await getUpcomingSessions();
        setAvailableSessions(sessions);
      } catch (error) {
        console.error('Error loading sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      loadSessions();
    }
  }, [open]);

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name || '',
        program: group.program || '',
        description: group.description || '',
        sessionIds: group.sessionIds || []
      });
    } else {
      setFormData({
        name: '',
        program: '',
        description: '',
        sessionIds: []
      });
    }
  }, [group]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSessionChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData(prev => ({
      ...prev,
      sessionIds: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description) {
      alert('Tous les champs sont obligatoires');
      return;
    }

    if (typeof onSubmit === 'function') {
      onSubmit(formData);
    } else {
      console.error('onSubmit is not a function in GroupDialog');
      return;
    }
    
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontFamily: 'Signika' }}>
          {group ? 'Modifier le groupe' : 'Nouveau groupe'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            name="name"
            label="Nom du groupe"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={3}
          />

          <FormControl fullWidth>
            <InputLabel>Programme</InputLabel>
            <Select
              name="program"
              value={formData.program}
              label="Programme"
              onChange={handleChange}
            >
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="Intensif">Intensif</MenuItem>
              <MenuItem value="Spécial">Spécial</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Sessions</InputLabel>
            <Select
              multiple
              name="sessionIds"
              value={formData.sessionIds}
              onChange={handleSessionChange}
              input={<OutlinedInput label="Sessions" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const session = availableSessions.find(s => s.id === value);
                    return (
                      <Chip 
                        key={value} 
                        label={session ? new Date(session.date).toLocaleString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : value}
                        icon={<EventIcon />}
                      />
                    );
                  })}
                </Box>
              )}
            >
              {availableSessions.map((session) => (
                <MenuItem key={session.id} value={session.id}>
                  {new Date(session.date).toLocaleString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || !formData.name || !formData.description}
        >
          {loading ? 'Chargement...' : group ? 'Modifier' : 'Créer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupDialog;
