import { createTheme } from '@mui/material/styles';

// Custom color palette
export const colors = {
  primary: '#0083cb',    // Blue
  secondary: '#ed174c',  // Red
  success: '#8dc63f',    // Green
  warning: '#fff200',    // Yellow
};

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    success: {
      main: colors.success,
    },
    warning: {
      main: colors.warning,
    },
  },
  typography: {
    fontFamily: 'Signika, sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
