import { createTheme } from '@mui/material/styles';

// Custom color palette
export const colors = {
  primary: '#0083cb',    // Blue
  secondary: '#ed174c',  // Red
  success: '#8dc63f',    // Green
  warning: '#fff200',    // Yellow
  background: '#f5f5f5',
  border: '#f0f0f0',
  text: '#333333',
};

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: '#fff',
    },
    secondary: {
      main: colors.secondary,
      contrastText: '#fff',
    },
    success: {
      main: colors.success,
      contrastText: '#fff',
    },
    warning: {
      main: colors.warning,
      contrastText: '#333',
    },
  },
  typography: {
    fontFamily: 'Signika, Arial, sans-serif',
    h1: {
      fontFamily: 'Signika Regular, Arial, sans-serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'Signika Regular, Arial, sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Signika Regular, Arial, sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Signika Regular, Arial, sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Signika Regular, Arial, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Signika Regular, Arial, sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: 'Signika Light, Arial, sans-serif',
    },
    body2: {
      fontFamily: 'Signika Light, Arial, sans-serif',
    },
    button: {
      fontFamily: 'Signika Regular, Arial, sans-serif',
      fontWeight: 400,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          textTransform: 'none',
          fontFamily: 'Signika Regular, Arial, sans-serif',
        },
        contained: {
          backgroundColor: colors.primary,
          '&:hover': {
            backgroundColor: '#006ba3',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': {
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 25,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${colors.border}`,
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.background,
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            color: '#333',
            fontFamily: 'Signika Regular, Arial, sans-serif',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: colors.background,
          },
        },
      },
    },
  },
});

export default theme;
