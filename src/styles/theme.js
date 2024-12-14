import { createTheme } from '@mui/material/styles';

// Custom color palette
export const colors = {
  primary: '#0083cb',    // Blue
  secondary: '#ed174c',  // Red
  success: '#8dc63f',    // Green
  warning: '#fff200',    // Yellow
  background: '#f5f5f5',
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
    fontFamily: 'Signika, sans-serif',
    h1: {
      fontFamily: 'Signika Regular, sans-serif',
      fontWeight: 400,
    },
    h2: {
      fontFamily: 'Signika Regular, sans-serif',
      fontWeight: 400,
    },
    h3: {
      fontFamily: 'Signika Regular, sans-serif',
      fontWeight: 400,
    },
    h4: {
      fontFamily: 'Signika Regular, sans-serif',
      fontWeight: 400,
    },
    h5: {
      fontFamily: 'Signika Regular, sans-serif',
      fontWeight: 400,
    },
    h6: {
      fontFamily: 'Signika Regular, sans-serif',
      fontWeight: 400,
    },
    body1: {
      fontFamily: 'Signika Light, sans-serif',
      fontWeight: 300,
    },
    body2: {
      fontFamily: 'Signika Light, sans-serif',
      fontWeight: 300,
    },
    button: {
      fontFamily: 'Signika Regular, sans-serif',
      fontWeight: 400,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          padding: '10px 30px',
          fontSize: '1rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 25,
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
  },
});

export default theme;
