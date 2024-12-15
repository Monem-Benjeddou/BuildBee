import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const getInitials = (firstName = '', lastName = '') => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const GroupStudentsDialog = ({ open, onClose, group, students }) => {
  if (!group) return null;

  const groupStudents = students.filter(student => student.group === group.id);

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
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        fontFamily: 'Signika',
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #f0f0f0',
      }}>
        <Typography variant="h6" sx={{ fontFamily: 'Signika', fontWeight: 600 }}>
          {`Élèves du groupe ${group.name}`}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        {groupStudents.length > 0 ? (
          <List>
            {groupStudents.map((student, index) => (
              <React.Fragment key={student.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#0083cb' }}>
                      {getInitials(student.firstName, student.lastName)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontFamily: 'Signika', fontWeight: 500 }}>
                        {`${student.firstName} ${student.lastName}`}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ fontFamily: 'Signika Light', color: 'text.secondary' }}>
                        {new Date(student.birthDate).toLocaleDateString('fr-FR')}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < groupStudents.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography sx={{ fontFamily: 'Signika Light', color: 'text.secondary' }}>
              Aucun élève dans ce groupe
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GroupStudentsDialog;