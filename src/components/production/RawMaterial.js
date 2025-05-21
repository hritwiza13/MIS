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

function RawMaterial() {
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
        Raw Material Management
      </Typography>
      
      <Paper sx={enhancedStyles.paperSection}>
        <Typography variant="h6" gutterBottom>
          Input Raw Material Data
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Material Type" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Quantity" type="number" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Supplier" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Date Received" type="date" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Submit Raw Material Data
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default RawMaterial; 