import React from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Divider,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  CalendarToday,
  School as SchoolIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { getGroupColor } from '../utils/colors';

const StudentProfileDialog = ({ student, open, onClose }) => {
  if (!student) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          overflow: 'visible',
          minHeight: '500px',
        },
      }}
    >
      <DialogTitle sx={{ 
        p: 0, 
        position: 'relative',
      }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: -12,
            top: -12,
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Card sx={{ boxShadow: 'none' }}>
          <Box sx={{ 
            position: 'relative',
            height: '120px',
            backgroundColor: '#0083cb',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}>
            <Avatar
              src={student.avatar}
              sx={{
                width: 120,
                height: 120,
                border: '4px solid #fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                position: 'absolute',
                bottom: '-60px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          </Box>
          <CardContent sx={{ pt: 10, pb: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ 
              fontFamily: 'Signika',
              fontWeight: 'bold',
              mb: 1,
            }}>
              {student.firstName} {student.lastName}
            </Typography>
            <Chip
              label={student.group}
              sx={{
                backgroundColor: `${getGroupColor(student.group)}15`,
                color: getGroupColor(student.group),
                fontWeight: 500,
                mb: 3,
              }}
            />
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 2,
              mt: 3,
              px: 2,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CalendarToday sx={{ color: '#0083cb' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Date de naissance
                  </Typography>
                  <Typography sx={{ fontFamily: 'Signika' }}>
                    {new Date(student.birthDate).toLocaleDateString('fr-FR')}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SchoolIcon sx={{ color: '#0083cb' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Groupe
                  </Typography>
                  <Typography sx={{ fontFamily: 'Signika' }}>
                    {student.group}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocationIcon sx={{ color: '#0083cb' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Date d'inscription
                  </Typography>
                  <Typography sx={{ fontFamily: 'Signika' }}>
                    {new Date(student.createdAt).toLocaleDateString('fr-FR')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfileDialog;
