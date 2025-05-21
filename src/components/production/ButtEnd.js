import React, { useState, useEffect } from 'react';
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

function ButtEnd() {
  const [directInputQuantity, setDirectInputQuantity] = useState('');
  const [billetsInputQuantity, setBilletsInputQuantity] = useState('');
  const [outputButtEndQuantity, setOutputButtEndQuantity] = useState('');
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

  // Calculate scrap whenever any input or output changes
  useEffect(() => {
    if (directInputQuantity && billetsInputQuantity && outputButtEndQuantity) {
      const totalInput = Number(directInputQuantity) + Number(billetsInputQuantity);
      const calculatedScrap = totalInput - Number(outputButtEndQuantity);
      setScrapQuantity(calculatedScrap >= 0 ? calculatedScrap.toString() : '0');
    }
  }, [directInputQuantity, billetsInputQuantity, outputButtEndQuantity]);

  const handleSubmit = () => {
    // Basic validation
    if (!outputButtEndQuantity) {
      setError('Please fill in all required fields.');
      setSuccess('');
      return;
    }

    const totalInput = Number(directInputQuantity || 0) + Number(billetsInputQuantity || 0);
    const calculatedScrap = totalInput - Number(outputButtEndQuantity);

    // Here you would typically send the data to your backend
    console.log('Butt End Data Submitted:', {
      directInputQuantity,
      billetsInputQuantity,
      outputButtEndQuantity,
      scrapQuantity: calculatedScrap >= 0 ? calculatedScrap : 0,
    });

    // Clear form and show success message
    setDirectInputQuantity('');
    setBilletsInputQuantity('');
    setOutputButtEndQuantity('');
    setScrapQuantity('');
    setError('');
    setSuccess('Butt End data submitted successfully!');
  };

  return (
    <Container maxWidth="lg" sx={enhancedStyles.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        Butt End Management
      </Typography>
      
      <Paper sx={enhancedStyles.paperSection}>
        <Typography variant="h6" gutterBottom>
          Input Butt End Production Data
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Input Quantity (from Direct)"
              type="number"
              value={directInputQuantity}
              onChange={(e) => setDirectInputQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Input Quantity (from Billets)"
              type="number"
              value={billetsInputQuantity}
              onChange={(e) => setBilletsInputQuantity(e.target.value)}
            />
          </Grid>
           <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Output Butt End Quantity"
              type="number"
              value={outputButtEndQuantity}
              onChange={(e) => setOutputButtEndQuantity(e.target.value)}
              required
            />
          </Grid>
           <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Scrap Quantity (Auto-calculated)"
              type="number"
              value={scrapQuantity}
              disabled
              InputProps={{
                readOnly: true,
              }}
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
              Submit Butt End Data
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ButtEnd; 