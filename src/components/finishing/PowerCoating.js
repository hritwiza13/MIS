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

function PowerCoating() {
  const [inputQuantity, setInputQuantity] = useState('');
  const [outputQuantity, setOutputQuantity] = useState('');
  const [scrapQuantity, setScrapQuantity] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Calculate scrap whenever input or output changes
  useEffect(() => {
    if (inputQuantity && outputQuantity) {
      const calculatedScrap = Number(inputQuantity) - Number(outputQuantity);
      setScrapQuantity(calculatedScrap >= 0 ? calculatedScrap.toString() : '0');
    }
  }, [inputQuantity, outputQuantity]);

  const handleSubmit = () => {
    // Basic validation
    if (!inputQuantity || !outputQuantity) {
      setError('Please fill in all required fields.');
      setSuccess('');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Power Coating Data Submitted:', { 
      inputQuantity, 
      outputQuantity, 
      scrapQuantity: Number(inputQuantity) - Number(outputQuantity) 
    });

    // Clear form and show success message
    setInputQuantity('');
    setOutputQuantity('');
    setScrapQuantity('');
    setError('');
    setSuccess('Power Coating data submitted successfully!');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Power Coating Management
      </Typography>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Input Power Coating Data
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Input Quantity (to Power Coating)"
              type="number"
              value={inputQuantity}
              onChange={(e) => setInputQuantity(e.target.value)}
            />
          </Grid>
           <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Output Quantity (from Power Coating)"
              type="number"
              value={outputQuantity}
              onChange={(e) => setOutputQuantity(e.target.value)}
            />
          </Grid>
           <Grid item xs={12} md={4}>
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
              Submit Power Coating Data
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PowerCoating; 