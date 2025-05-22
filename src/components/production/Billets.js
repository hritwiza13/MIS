import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import StraightenIcon from '@mui/icons-material/Straighten';

function Billets() {
  const [logQuantity, setLogQuantity] = useState('');
  const [billetQuantity, setBilletQuantity] = useState('');
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
    if (!logQuantity || !billetQuantity) {
      setError('Please fill in all fields.');
      setSuccess('');
      return;
    }

    // Calculate scrap quantity
    const calculatedScrap = Number(logQuantity) - Number(billetQuantity);
    if (calculatedScrap < 0) {
      setError('Output Billet Quantity cannot be more than Input Log Quantity.');
      setSuccess('');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Billets Data Submitted:', { logQuantity, billetQuantity, scrapQuantity: calculatedScrap });

    // Clear form and show success message
    setLogQuantity('');
    setBilletQuantity('');
    setScrapQuantity('');
    setError('');
    setSuccess('Billets data submitted successfully!');
  };

  return (
    <Container maxWidth="lg" sx={enhancedStyles.container}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <StraightenIcon sx={{ mr: 1 }} color="primary" />
        <Typography variant="h4" component="h1">
          Billets Management
        </Typography>
      </Box>
      
      <Paper sx={enhancedStyles.paperSection}>
        <Typography variant="h6" gutterBottom>
          Input Billets Production Data
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Input Log Quantity"
              type="number"
              value={logQuantity}
              onChange={(e) => setLogQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Output Billet Quantity"
              type="number"
              value={billetQuantity}
              onChange={(e) => setBilletQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Scrap Quantity (Auto-calculated)"
              type="number"
              value={scrapQuantity}
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
              Submit Billets Data
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Billets; 