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
  Box,
  Grid,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format } from 'date-fns';

const SessionDialog = ({ open, onClose, session, onSubmit, groups }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    groupId: '',
    status: 'upcoming'
  });

  useEffect(() => {
    if (session) {
      setFormData({
        ...session,
        date: new Date(session.date),
        startTime: session.startTime || '09:00',
        endTime: session.endTime || '10:00',
      });
    } else {
      setFormData({
        name: '',
        date: new Date(),
        startTime: '09:00',
        endTime: '10:00',
        location: '',
        groupId: groups[0]?.id || '',
        status: 'upcoming'
      });
    }
  }, [session, groups]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const sessionData = {
      ...formData,
      date: format(new Date(formData.date), 'yyyy-MM-dd')
    };
    onSubmit(sessionData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {session ? 'Edit Session' : 'New Session'}
      </DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Session Name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Group</InputLabel>
                <Select
                  name="groupId"
                  value={formData.groupId}
                  label="Group"
                  onChange={handleChange}
                >
                  {groups.map(group => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={(newValue) => {
                  setFormData(prev => ({
                    ...prev,
                    date: newValue
                  }));
                }}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TimePicker
                label="Start Time"
                value={new Date(`2000-01-01T${formData.startTime}`)}
                onChange={(newValue) => {
                  const timeStr = format(newValue, 'HH:mm');
                  setFormData(prev => ({
                    ...prev,
                    startTime: timeStr
                  }));
                }}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TimePicker
                label="End Time"
                value={new Date(`2000-01-01T${formData.endTime}`)}
                onChange={(newValue) => {
                  const timeStr = format(newValue, 'HH:mm');
                  setFormData(prev => ({
                    ...prev,
                    endTime: timeStr
                  }));
                }}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="location"
                label="Location"
                fullWidth
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {session ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionDialog;
