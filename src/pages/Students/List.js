import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { colors } from '../../styles/theme';

// Dummy student data
const students = [
  { id: 1, name: 'John Doe', grade: '10th', attendance: '95%', status: 'Active' },
  { id: 2, name: 'Jane Smith', grade: '11th', attendance: '88%', status: 'Active' },
  { id: 3, name: 'Mike Johnson', grade: '9th', attendance: '92%', status: 'Active' },
];

const StudentList = () => {
  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: 'grey.800', fontWeight: 600 }}>
          Students
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ backgroundColor: colors.primary }}
        >
          Add New Student
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search students..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'grey.500' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student.id}>
            <Card
              sx={{
                '&:hover': {
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: colors.primary, mb: 2 }}>
                  {student.name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Grade
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {student.grade}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Attendance
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {student.attendance}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: colors.success }}
                  >
                    {student.status}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StudentList;
