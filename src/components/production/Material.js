import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';

function Material() {
  const theme = useTheme();
  const enhancedStyles = {
    container: {
      py: 4,
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      minHeight: 'calc(100vh - 64px)', // Adjust for navbar height
    },
    paperSection: {
      p: 3,
      mt: 3,
      borderRadius: theme.shape.borderRadius,
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
  };

  return (
    <Container maxWidth="lg" sx={enhancedStyles.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        Material Management
      </Typography>
      
      <Paper sx={enhancedStyles.paperSection}>
        <Typography variant="h6" gutterBottom>
          Input Material Data
        </Typography>
        {/* Add specific form fields for Material here */}
        <Typography>Form fields for Material will be added here.</Typography>
        
        {/* Placeholder for WIP Total Material */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Total Material from WIP: { /* Display WIP total material here */ }
        </Typography>
      </Paper>
    </Container>
  );
}

export default Material; 