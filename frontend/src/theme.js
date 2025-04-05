import { createTheme } from '@mui/material/styles';
// ... existing code ...
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E3B55', // More sophisticated blue
      light: '#4C5C7A',
      dark: '#1A2438',
    },
    secondary: {
      main: '#E85A4F', // Warm accent color
      light: '#FF786B',
      dark: '#C83A35',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    // ... existing code ...
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});
// ... existing code ...


export default theme; 