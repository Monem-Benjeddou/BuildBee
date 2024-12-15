import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getAllGroups } from '../../services/groupService';

const SessionDialog = ({ open, onClose, session }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: new Date(),
    duration: '',
    location: '',
    description: '',
    groupId: '',
  });
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    loadGroups();
    if (session) {
      setFormData({
        name: session.name || '',
        date: new Date(session.date) || new Date(),
        duration: session.duration || '',
        location: session.location || '',
        description: session.description || '',
        groupId: session.groupId || '',
      });
    }
  }, [session]);

  const loadGroups = async () => {
    try {
      const groupsData = await getAllGroups();
      setGroups(groupsData);
    } catch (error) {
      console.error('Error loading groups:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (newDate) => {
    setFormData(prev => ({
      ...prev,
      date: newDate
    }));
  };

  const handleSubmit = () => {
    onClose(formData);
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>
        {session ? 'Edit Session' : 'Add New Session'}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <TextField
            name="name"
            label="Session Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Group</InputLabel>
          <Select
            name="groupId"
            value={formData.groupId}
            onChange={handleChange}
            label="Group"
            required
          >
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date & Time"
              value={formData.date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <TextField
            name="duration"
            label="Duration (minutes)"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <TextField
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {session ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionDialog;
