import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';

const GroupDialog = ({ open, onClose, group, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    program: '',
    sessions: []
  });

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name || '',
        program: group.program || '',
        sessions: group.sessions || []
      });
    } else {
      setFormData({
        name: '',
        program: '',
        sessions: []
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

  const handleAddSession = () => {
    setFormData(prev => ({
      ...prev,
      sessions: [
        ...prev.sessions,
        {
          date: new Date(),
          time: '14:00',
          location: '',
          status: 'upcoming'
        }
      ]
    }));
  };

  const handleRemoveSession = (index) => {
    setFormData(prev => ({
      ...prev,
      sessions: prev.sessions.filter((_, i) => i !== index)
    }));
  };

  const handleSessionChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      sessions: prev.sessions.map((session, i) => {
        if (i === index) {
          return {
            ...session,
            [field]: value
          };
        }
        return session;
      })
    }));
  };

  const handleSubmit = () => {
    // Format sessions before submitting
    const formattedData = {
      ...formData,
      sessions: formData.sessions.map(session => ({
        ...session,
        date: format(new Date(session.date), 'yyyy-MM-dd'),
        time: typeof session.time === 'object' 
          ? format(session.time, 'HH:mm')
          : session.time
      }))
    };
    onSubmit(formattedData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {group ? 'Edit Group' : 'New Group'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="Group Name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Program</InputLabel>
              <Select
                name="program"
                value={formData.program}
                label="Program"
                onChange={handleChange}
                required
              >
                <MenuItem value="Robotics">Robotics</MenuItem>
                <MenuItem value="Programming">Programming</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="3D Printing">3D Printing</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Sessions</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddSession}
                variant="outlined"
              >
                Add Session
              </Button>
            </Box>

            {formData.sessions.map((session, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  position: 'relative'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date"
                        value={new Date(session.date)}
                        onChange={(newValue) => {
                          handleSessionChange(index, 'date', newValue);
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Time"
                        value={typeof session.time === 'string' 
                          ? new Date(`2000-01-01T${session.time}`) 
                          : session.time}
                        onChange={(newValue) => {
                          handleSessionChange(index, 'time', newValue);
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Location"
                      fullWidth
                      value={session.location}
                      onChange={(e) => handleSessionChange(index, 'location', e.target.value)}
                    />
                  </Grid>
                </Grid>
                <IconButton
                  onClick={() => handleRemoveSession(index)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'error.main'
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {group ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupDialog;
