import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // A professional, slightly muted blue
    },
    secondary: {
      main: '#607d8b', // A cool, soft greyish-blue for contrast
    },
    error: {
      main: '#f44336', // Standard red for errors
    },
    warning: {
      main: '#ff9800', // Standard orange for warnings
    },
    info: {
      main: '#2196f3', // Standard blue for info
    },
    success: {
      main: '#4caf50', // Standard green for success
    },
    background: {
      default: '#f8f9fa', // Very light grey background
      paper: '#ffffff', // White background for cards and papers
    },
    text: {
      primary: '#212529', // Dark grey for main text
      secondary: '#6c757d', // Muted grey for secondary text
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 300,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      fontWeight: 500,
    },
  },
  spacing: 8, // Define a standard spacing unit (e.g., 8px)
  components: {
    // You can add default component styles here
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Use standard capitalization
          boxShadow: 'none', // Remove default button shadow
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)', // Add subtle shadow to papers/cards
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // Add potential focused border color or other styles
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)', // Ensure cards also have subtle shadow
          borderRadius: '8px', // Rounded corners for cards
        },
      },
    },
  },
});

export default theme; 