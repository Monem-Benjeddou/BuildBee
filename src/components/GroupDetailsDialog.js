import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Autocomplete,
  TextField,
  IconButton,
  Tab,
  Tabs,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { getAllStudents, getStudentsByGroup } from '../services/studentService';

// Custom TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const GroupDetailsDialog = ({ open, onClose, group, onStudentsChange }) => {
  const theme = useTheme();
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [value, setValue] = useState(0);

  const loadData = useCallback(() => {
    if (group) {
      const groupStudents = getStudentsByGroup(group.id);
      setStudents(groupStudents);
      
      const allAvailableStudents = getAllStudents()
        .filter(student => !group.studentIds.includes(student.id));
      setAllStudents(allAvailableStudents);
    }
  }, [group]);

  useEffect(() => {
    if (open && group) {
      loadData();
    }
  }, [open, group, loadData]);

  const handleAddStudent = async () => {
    if (selectedStudent && group) {
      // await db.groups.addStudent(group.id, selectedStudent.id);
      // Replace the above line with a service function call
      // For example:
      // await addStudentToGroup(group.id, selectedStudent.id);
      setSelectedStudent(null);
      await loadData();
      if (onStudentsChange) onStudentsChange();
    }
  };

  const handleRemoveStudent = async (studentId) => {
    if (group) {
      // await db.groups.removeStudent(group.id, studentId);
      // Replace the above line with a service function call
      // For example:
      // await removeStudentFromGroup(group.id, studentId);
      await loadData();
      if (onStudentsChange) onStudentsChange();
    }
  };

  const formatSchedule = (schedule) => {
    if (!Array.isArray(schedule)) return '';
    return schedule.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(', ');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!group) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: group.color,
            }}
          />
          <Typography variant="h6">{group.name}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Students" />
          <Tab label="Sessions" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ScheduleIcon sx={{ fontSize: 20 }} />
              {formatSchedule(group.schedule)}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Ajouter un élève
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Autocomplete
                value={selectedStudent}
                onChange={(event, newValue) => setSelectedStudent(newValue)}
                options={allStudents}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                renderOption={(props, option) => (
                  <Box component="li" {...props} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar src={option.avatar} sx={{ width: 32, height: 32 }} />
                    {option.firstName} {option.lastName}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    placeholder="Sélectionner un élève"
                  />
                )}
                sx={{ flexGrow: 1 }}
              />
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                onClick={handleAddStudent}
                disabled={!selectedStudent}
              >
                Ajouter
              </Button>
            </Box>
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Élèves du groupe ({students.length})
          </Typography>
          <List>
            {students.map((student) => (
              <ListItem
                key={student.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="remove"
                    onClick={() => handleRemoveStudent(student.id)}
                    sx={{ color: theme.palette.error.main }}
                  >
                    <PersonRemoveIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar src={student.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${student.firstName} ${student.lastName}`}
                  secondary={student.email}
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sessions
            </Typography>
            {group.sessions && group.sessions.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {group.sessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>{session.name}</TableCell>
                        <TableCell>{session.date}</TableCell>
                        <TableCell>{`${session.startTime} - ${session.endTime}`}</TableCell>
                        <TableCell>
                          <Chip
                            label={session.status}
                            color={session.status === 'completed' ? 'success' : 'primary'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography color="textSecondary">
                No sessions scheduled for this group
              </Typography>
            )}
          </Box>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupDetailsDialog;
