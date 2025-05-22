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
import SquareFootIcon from '@mui/icons-material/SquareFoot';

function Direct() {
  const [inputQuantity, setInputQuantity] = useState('');
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
    console.log('Direct Processing Data Submitted:', { 
      inputQuantity, 
      outputQuantity, 
      scrapQuantity: Number(inputQuantity) - Number(outputQuantity) 
    });

    // Clear form and show success message
    setInputQuantity('');
    setOutputQuantity('');
    setScrapQuantity('');
    setError('');
    setSuccess('Direct Processing data submitted successfully!');
  };

  return (
    <Container maxWidth="lg" sx={enhancedStyles.container}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <SquareFootIcon sx={{ mr: 1 }} color="primary" />
        <Typography variant="h4" component="h1">
          Direct Processing Management
        </Typography>
      </Box>
      
      <Paper sx={enhancedStyles.paperSection}>
        <Typography variant="h6" gutterBottom>
          Input Direct Processing Data
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Input Quantity (from Raw Log)"
              type="number"
              value={inputQuantity}
              onChange={(e) => setInputQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Output Quantity (for Cutting)"
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
              Submit Direct Processing Data
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Direct; 