import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';

function ReturnsReports() {
  const [returnedQuantity, setReturnedQuantity] = useState('');
  const [scrapQuantity, setScrapQuantity] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  const handleSubmit = () => {
    // Basic validation
    if (!returnedQuantity || !scrapQuantity) {
      setError('Please fill in all fields.');
      setSuccess('');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Returns Data Submitted:', { returnedQuantity, scrapQuantity });

    // Clear form and show success message
    setReturnedQuantity('');
    setScrapQuantity('');
    setError('');
    setSuccess('Returns data submitted successfully!');
  };

  return (
    <Container maxWidth="lg" sx={enhancedStyles.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        Returns Reports
      </Typography>
      
      <Paper sx={enhancedStyles.paperSection}>
        <Typography variant="h6" gutterBottom>
          Input Returns Data and Report Scrap
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Returned Quantity"
              type="number"
              value={returnedQuantity}
              onChange={(e) => setReturnedQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Scrap Quantity (from Returns)"
              type="number"
              value={scrapQuantity}
              onChange={(e) => setScrapQuantity(e.target.value)}
            />
          </Grid>
          
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          {success && (
            <Grid item xs={12}>
              <Alert severity="success">{success}</Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Returns Data
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ReturnsReports; 