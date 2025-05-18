import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme
} from '@mui/material';
import {
  Factory as FactoryIcon,
  Assessment as AssessmentIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';

function Home() {
  const theme = useTheme();

  const features = [
    {
      icon: <FactoryIcon sx={{ fontSize: 40 }} />,
      title: 'Production Management',
      description: 'Streamline your production processes with real-time monitoring and analytics.'
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
      title: 'Quality Control',
      description: 'Maintain high standards with comprehensive quality control systems.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Safety First',
      description: 'Ensure workplace safety with our integrated safety management system.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Efficiency Tracking',
      description: 'Monitor and improve operational efficiency with detailed analytics.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Welcome to Hindalco
              </Typography>
              <Typography variant="h5" paragraph>
                Empowering Excellence in Manufacturing
              </Typography>
              <Typography variant="body1" paragraph>
                Your comprehensive Management Information System for streamlined operations,
                enhanced productivity, and data-driven decision making.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mt: 2 }}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: '100%',
                  height: 400,
                  borderRadius: 2,
                  boxShadow: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <FactoryIcon
                  sx={{
                    fontSize: 200,
                    color: 'white',
                    opacity: 0.8,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.2) 100%)'
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    color: 'white',
                    position: 'absolute',
                    bottom: 32,
                    left: 32,
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  Hindalco Industries
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Key Features
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Discover how our system can transform your operations
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h3" color="primary" gutterBottom>
                  99.9%
                </Typography>
                <Typography variant="h6">
                  System Uptime
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h3" color="primary" gutterBottom>
                  24/7
                </Typography>
                <Typography variant="h6">
                  Support Available
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h3" color="primary" gutterBottom>
                  1000+
                </Typography>
                <Typography variant="h6">
                  Active Users
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 