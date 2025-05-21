import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Alert,
  Paper
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import FileUpload from '../common/FileUpload';

function Quality({ userInfo }) {
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
    card: {
      height: '100%',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
      },
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: theme.shape.borderRadius,
    },
    cardHeader: {
      backgroundColor: alpha(theme.palette.primary.main, 0.05),
      fontWeight: 'bold',
      color: theme.palette.primary.main,
    },
    paperSection: {
       p: 3,
       borderRadius: theme.shape.borderRadius,
       background: 'rgba(255, 255, 255, 0.9)',
       backdropFilter: 'blur(10px)',
       border: '1px solid rgba(255, 255, 255, 0.1)',
    },
  };

  const handleScrapSubmit = () => {
    // Basic validation
    if (!scrapQuantity) {
      setError('Please enter the scrap quantity.');
      setSuccess('');
      return;
    }

    // Here you would typically send the scrap data to your backend
    console.log('Scrap Data from Quality Submitted:', { scrapQuantity });

    // Clear form and show success message
    setScrapQuantity('');
    setError('');
    setSuccess('Scrap data from Quality submitted successfully!');
  };

  return (
    <Container maxWidth="lg" sx={enhancedStyles.container}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quality Control Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome, {userInfo.user.name} ({userInfo.user.id})
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Quality Metrics Card */}
        <Grid item xs={12} md={6}>
          <Card sx={enhancedStyles.card}>
            <CardHeader title="Quality Metrics" sx={enhancedStyles.cardHeader} />
            <CardContent>
              <Typography variant="body1">
                Quality control metrics and statistics will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Inspection Schedule Card */}
        <Grid item xs={12} md={6}>
          <Card sx={enhancedStyles.card}>
            <CardHeader title="Inspection Schedule" sx={enhancedStyles.cardHeader} />
            <CardContent>
              <Typography variant="body1">
                Upcoming quality inspections and their status will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Defect Analysis Card */}
        <Grid item xs={12} md={6}>
          <Card sx={enhancedStyles.card}>
            <CardHeader title="Defect Analysis" sx={enhancedStyles.cardHeader} />
            <CardContent>
              <Typography variant="body1">
                Analysis of defects and quality issues will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quality Reports Card */}
        <Grid item xs={12} md={6}>
          <Card sx={enhancedStyles.card}>
            <CardHeader title="Quality Reports" sx={enhancedStyles.cardHeader} />
            <CardContent>
              <Typography variant="body1">
                Recent quality reports and their findings will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Scrap Reporting Section */}
        <Grid item xs={12}>
          <Paper sx={enhancedStyles.paperSection}>
            <Typography variant="h6" gutterBottom>
              Report Scrap from Quality Control
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Scrap Quantity"
                  type="number"
                  value={scrapQuantity}
                  onChange={(e) => setScrapQuantity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Button variant="contained" color="primary" onClick={handleScrapSubmit}>
                  Submit Scrap Data
                </Button>
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
            </Grid>
          </Paper>
        </Grid>

        {/* File Upload Section */}
        <Grid item xs={12}>
          <FileUpload department="Quality Control" userInfo={userInfo} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Quality; 