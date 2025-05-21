import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import FileUpload from '../common/FileUpload';

function Maintenance({ userInfo }) {
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
  };

  return (
    <Container maxWidth="lg" sx={enhancedStyles.container}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Maintenance Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome, {userInfo.user.name} ({userInfo.user.id})
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Maintenance Schedule Card */}
        <Grid item xs={12} md={6}>
          <Card sx={enhancedStyles.card}>
            <CardHeader title="Maintenance Schedule" sx={enhancedStyles.cardHeader} />
            <CardContent>
              <Typography variant="body1">
                Upcoming maintenance tasks and their status will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Equipment Status Card */}
        <Grid item xs={12} md={6}>
          <Card sx={enhancedStyles.card}>
            <CardHeader title="Equipment Status" sx={enhancedStyles.cardHeader} />
            <CardContent>
              <Typography variant="body1">
                Current status of all equipment and machinery will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Maintenance Requests Card */}
        <Grid item xs={12} md={6}>
          <Card sx={enhancedStyles.card}>
            <CardHeader title="Maintenance Requests" sx={enhancedStyles.cardHeader} />
            <CardContent>
              <Typography variant="body1">
                Pending and completed maintenance requests will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Maintenance Reports Card */}
        <Grid item xs={12} md={6}>
          <Card sx={enhancedStyles.card}>
            <CardHeader title="Maintenance Reports" sx={enhancedStyles.cardHeader} />
            <CardContent>
              <Typography variant="body1">
                Recent maintenance activities and their outcomes will be shown here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* File Upload Section */}
        <Grid item xs={12}>
          <FileUpload department="Maintenance" userInfo={userInfo} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Maintenance; 