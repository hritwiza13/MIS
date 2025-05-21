import React from 'react';
import { Box, Typography, Paper, Container, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FactoryIcon from '@mui/icons-material/Factory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';

function Home() {
  const navigate = useNavigate();

  // Construct the public URL for the logo
  const logoUrl = process.env.PUBLIC_URL + '/images/logo.jpg';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        // Optional: Add a subtle background pattern
        // backgroundImage: `url(${process.env.PUBLIC_URL}/path/to/your/pattern.png)`,
        // backgroundRepeat: 'repeat',
        // backgroundSize: 'contain',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        position: 'relative', // Needed for absolute positioning of potential overlay
        overflow: 'hidden', // Hide overflow if using background effects
      }}
    >
      {/* Optional: Add a subtle overlay */}
      {/* <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust transparency as needed
          zIndex: 1,
        }}
      /> */}

      <Container maxWidth="lg" sx={{ zIndex: 2, position: 'relative' }}> {/* Ensure content is above overlay */}
        <Paper
          elevation={10} // Increased elevation for more prominence
          sx={{
            padding: { xs: 3, md: 5 }, // Responsive padding
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.98)',
            borderRadius: 2,
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)', // Enhanced shadow
            backdropFilter: 'blur(5px)', // Subtle blur effect
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: { xs: 3, md: 5 }, // Responsive margin bottom
            }}
          >
            <Box
              component="img"
              src={logoUrl}
              alt="Hindalco Logo"
              sx={{
                height: { xs: '60px', md: '80px' }, // Responsive height
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>

          <Typography
            variant="h4" // Slightly smaller for better hierarchy
            component="h1"
            sx={{
              color: '#1a237e',
              fontWeight: 'bold',
              marginBottom: { xs: 1, md: 2 }, // Responsive margin bottom
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            Hindalco Industries
          </Typography>
          
          <Typography
            variant="h6" // Slightly smaller for better hierarchy
            sx={{
              color: '#0d47a1',
              marginBottom: { xs: 3, md: 4 }, // Responsive margin bottom
              fontWeight: 'medium',
            }}
          >
            Management Information System
          </Typography>

          <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mb: { xs: 4, md: 6 } }}> {/* Responsive spacing */}
            <Grid item xs={12} md={4}>
              <Box 
                sx={{ 
                  p: { xs: 2, md: 3 }, // Responsive padding
                  borderRadius: 2,
                  transition: 'transform 0.3s ease-in-out, boxShadow 0.3s ease-in-out', // Smoother transition
                  '&:hover': {
                    transform: 'translateY(-8px)', // More pronounced hover effect
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)', // Enhanced hover shadow
                  }
                }}
              >
                <FactoryIcon sx={{ fontSize: { xs: 50, md: 60 }, color: '#1a237e', mb: 2 }} /> {/* Responsive icon size */}
                <Typography variant="h6" sx={{ color: '#1a237e', mb: 1, fontWeight: 'bold' }}>
                  Production Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track and optimize production processes
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box 
                sx={{ 
                  p: { xs: 2, md: 3 }, // Responsive padding
                  borderRadius: 2,
                  transition: 'transform 0.3s ease-in-out, boxShadow 0.3s ease-in-out', // Smoother transition
                  '&:hover': {
                    transform: 'translateY(-8px)', // More pronounced hover effect
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)', // Enhanced hover shadow
                  }
                }}
              >
                <AssessmentIcon sx={{ fontSize: { xs: 50, md: 60 }, color: '#1a237e', mb: 2 }} /> {/* Responsive icon size */}
                <Typography variant="h6" sx={{ color: '#1a237e', mb: 1, fontWeight: 'bold' }}>
                  Quality Control
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monitor and maintain product quality standards
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box 
                sx={{ 
                  p: { xs: 2, md: 3 }, // Responsive padding
                  borderRadius: 2,
                  transition: 'transform 0.3s ease-in-out, boxShadow 0.3s ease-in-out', // Smoother transition
                  '&:hover': {
                    transform: 'translateY(-8px)', // More pronounced hover effect
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)', // Enhanced hover shadow
                  }
                }}
              >
                <SecurityIcon sx={{ fontSize: { xs: 50, md: 60 }, color: '#1a237e', mb: 2 }} /> {/* Responsive icon size */}
                <Typography variant="h6" sx={{ color: '#1a237e', mb: 1, fontWeight: 'bold' }}>
                  Secure Access
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Role-based access control for all departments
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 1, md: 2 } }}> {/* Responsive gap */}
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                padding: { xs: '10px 20px', md: '12px 30px' }, // Responsive padding
                fontSize: { xs: '1rem', md: '1.1rem' }, // Responsive font size
                background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                boxShadow: '0 5px 15px 2px rgba(26, 35, 126, .4)', // Enhanced shadow
                transition: 'transform 0.2s ease-in-out, boxShadow 0.2s ease-in-out', // Smoother transition
                '&:hover': {
                  background: 'linear-gradient(45deg, #0d47a1 30%, #1a237e 90%)',
                  boxShadow: '0 8px 20px 2px rgba(26, 35, 126, .6)', // Enhanced hover shadow
                  transform: 'translateY(-2px)', // Subtle hover lift
                },
              }}
            >
              Login to Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home; 