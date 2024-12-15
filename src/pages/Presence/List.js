import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Tooltip,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { fr } from 'date-fns/locale';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAllGroups } from '../../services/groupService';
import { getUpcomingSessions, markAttendance, getSessionById } from '../../services/sessionService';

const locales = {
  'fr': fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const PresenceList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedSessionData, setSelectedSessionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);

  useEffect(() => {
    loadGroups();
    loadSessions();
  }, []);

  useEffect(() => {
    loadSessions();
  }, [selectedGroup]);

  const loadGroups = async () => {
    try {
      const data = await getAllGroups();
      setGroups(data);
    } catch (error) {
      console.error('Error loading groups:', error);
    }
  };

  const loadSessions = async () => {
    try {
      const data = await getUpcomingSessions();
      const filteredSessions = selectedGroup 
        ? data.filter(session => session.groupId === selectedGroup)
        : data;
      
      const calendarEvents = filteredSessions.map(session => ({
        ...session,
        title: `Session ${new Date(session.date).toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}`,
        start: new Date(session.date),
        end: new Date(new Date(session.date).getTime() + session.duration * 60000)
      }));
      
      setSessions(calendarEvents);
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  const handleSessionSelect = async (session) => {
    try {
      setLoading(true);
      const sessionData = await getSessionById(session.id);
      console.log('Session Data:', sessionData); // Debug log
      setSelectedSessionData(sessionData);
      setSelectedSession(session);
      setAttendanceDialogOpen(true);
    } catch (error) {
      console.error('Error loading session data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = async (studentId) => {
    if (!selectedSessionData) return;

    try {
      setLoading(true);
      const currentAttendance = selectedSessionData.attendance || [];
      const isPresent = currentAttendance.some(student => student._id === studentId);
      
      const newAttendance = isPresent
        ? currentAttendance.filter(student => student._id !== studentId).map(student => student._id)
        : [...currentAttendance.map(student => student._id), studentId];
      
      const updatedSession = await markAttendance(selectedSessionData._id, newAttendance);
      if (updatedSession) {
        // Fetch fresh session data to ensure we have all populated fields
        const refreshedSession = await getSessionById(selectedSessionData._id);
        setSelectedSessionData(refreshedSession);
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderAttendanceDialog = () => {
    if (!selectedSessionData || !selectedSessionData.groupId) {
      console.log('No session data or group data'); // Debug log
      return null;
    }

    const students = selectedSessionData.groupId.studentIds || [];
    console.log('Students:', students); // Debug log
    const attendanceMap = new Set((selectedSessionData.attendance || []).map(student => student._id));
    console.log('Attendance Map:', attendanceMap); // Debug log

    return (
      <Dialog
        open={attendanceDialogOpen}
        onClose={() => setAttendanceDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">
            Présences - {new Date(selectedSessionData.date).toLocaleString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : students.length === 0 ? (
            <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
              Aucun élève dans ce groupe
            </Typography>
          ) : (
            <List>
              {students.map(student => {
                console.log('Rendering student:', student); // Debug log
                const isPresent = attendanceMap.has(student._id);
                const fullName = `${student.firstName} ${student.lastName}`;
                
                return (
                  <ListItem
                    key={student._id}
                    sx={{
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <Avatar
                      src={student.avatar}
                      alt={fullName}
                      sx={{ mr: 2 }}
                    />
                    <ListItemText 
                      primary={fullName}
                      primaryTypographyProps={{
                        sx: { fontFamily: 'Signika' }
                      }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => handleAttendanceChange(student._id)}
                        color={isPresent ? 'success' : 'error'}
                        disabled={loading}
                      >
                        {isPresent ? <CheckCircleIcon /> : <CancelIcon />}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setAttendanceDialogOpen(false)}
            disabled={loading}
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontFamily: 'Signika' }}>
        Gestion des Présences
      </Typography>

      <FormControl sx={{ minWidth: 200, mb: 3 }}>
        <InputLabel>Groupe</InputLabel>
        <Select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          label="Groupe"
        >
          <MenuItem value="">Tous les groupes</MenuItem>
          {groups.map(group => (
            <MenuItem key={group.id} value={group.id}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ height: 600 }}>
        <Calendar
          localizer={localizer}
          events={sessions}
          startAccessor="start"
          endAccessor="end"
          culture="fr"
          onSelectEvent={handleSessionSelect}
          views={['month', 'week', 'day']}
          messages={{
            today: "Aujourd'hui",
            previous: 'Précédent',
            next: 'Suivant',
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour',
            agenda: 'Agenda',
            date: 'Date',
            time: 'Heure',
            event: 'Événement',
            noEventsInRange: 'Aucune session dans cette période'
          }}
          style={{ height: '100%' }}
        />
      </Box>

      {renderAttendanceDialog()}
    </Box>
  );
};

export default PresenceList;
