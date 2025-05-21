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

function WIP() {
  const [buttEndInputQuantity, setButtEndInputQuantity] = useState('');
  const [finishCutInputQuantity, setFinishCutInputQuantity] = useState('');
  const [directInputQuantity, setDirectInputQuantity] = useState('');
  const [outputQuantity, setOutputQuantity] = useState('');
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
    if (buttEndInputQuantity && finishCutInputQuantity && directInputQuantity && outputQuantity) {
      const totalInput = Number(buttEndInputQuantity) + Number(finishCutInputQuantity) + Number(directInputQuantity);
      const calculatedScrap = totalInput - Number(outputQuantity);
      setScrapQuantity(calculatedScrap >= 0 ? calculatedScrap.toString() : '0');
    }
  }, [buttEndInputQuantity, finishCutInputQuantity, directInputQuantity, outputQuantity]);

  const handleSubmit = () => {
    // Basic validation
    if (!outputQuantity) {
      setError('Please fill in all required fields.');
      setSuccess('');
      return;
    }

    const totalInput = Number(buttEndInputQuantity || 0) + Number(finishCutInputQuantity || 0) + Number(directInputQuantity || 0);
    const calculatedScrap = totalInput - Number(outputQuantity);

    // Here you would typically send the data to your backend
    console.log('WIP Data Submitted:', {
      buttEndInputQuantity,
      finishCutInputQuantity,
      directInputQuantity,
      outputQuantity,
      scrapQuantity: calculatedScrap >= 0 ? calculatedScrap : 0,
    });

    // Clear form and show success message
    setButtEndInputQuantity('');
    setFinishCutInputQuantity('');
    setDirectInputQuantity('');
    setOutputQuantity('');
    setScrapQuantity('');
    setError('');
    setSuccess('WIP data submitted successfully!');
  };

  return (
    <Container maxWidth="lg" sx={enhancedStyles.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        Work in Progress (WIP) Management
      </Typography>
      
      <Paper sx={enhancedStyles.paperSection}>
        <Typography variant="h6" gutterBottom>
          Input WIP Data
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Input Quantity (from Butt End)"
              type="number"
              value={buttEndInputQuantity}
              onChange={(e) => setButtEndInputQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Input Quantity (from Finish Cut)"
              type="number"
              value={finishCutInputQuantity}
              onChange={(e) => setFinishCutInputQuantity(e.target.value)}
            />
          </Grid>
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
              label="Output Quantity (from WIP)"
              type="number"
              value={outputQuantity}
              onChange={(e) => setOutputQuantity(e.target.value)}
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
              Submit WIP Data
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default WIP; 