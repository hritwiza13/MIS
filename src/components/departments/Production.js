import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import FileUpload from '../common/FileUpload';
import SessionTimeout from '../common/SessionTimeout';

function Production({ userInfo }) {
  const theme = useTheme();
  const enhancedStyles = {
    container: {
      py: 4,
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      minHeight: 'calc(100vh - 64px)', // Adjust for navbar height
      // backdropFilter: 'blur(5px)',
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
  };

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userInfo');
    // Redirect to welcome page
    window.location.href = '/';
  };

  return (
    <Container maxWidth="lg" sx={enhancedStyles.container}>
      <SessionTimeout onLogout={handleLogout} />
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Production Department
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome, {userInfo.user.name} ({userInfo.user.id})
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Production Overview Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Production Overview" />
            <CardContent>
              <Typography variant="body1">
                Daily production metrics and statistics will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Production Schedule Card */}
        <Grid item xs={12} md={6}>
          <Card sx={enhancedStyles.card}>
            <CardHeader title="Production Schedule" sx={enhancedStyles.cardHeader} />
            <CardContent>
              <Typography variant="body1">
                Current production schedule and upcoming tasks will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

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

        {/* Resource Utilization Card */}
        <Grid item xs={12} md={6}>
          <Card sx={enhancedStyles.card}>
            <CardHeader title="Resource Utilization" sx={enhancedStyles.cardHeader} />
            <CardContent>
              <Typography variant="body1">
                Resource utilization metrics and statistics will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* File Upload Section */}
        <Grid item xs={12}>
          <FileUpload department="Production" userInfo={userInfo} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Production; 