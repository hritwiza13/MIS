import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Slide
} from '@mui/material';
import {
  Factory as FactoryIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Storage as StorageIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Engineering as EngineeringIcon,
  LocalShipping as ShippingIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

function Welcome() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <FactoryIcon sx={{ fontSize: 40 }} />,
      title: 'Smart Production',
      description: 'Real-time monitoring and control of aluminum production lines with AI-powered optimization.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Quality Assurance',
      description: 'Advanced quality control systems with automated inspection and compliance tracking.'
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      title: 'Process Analytics',
      description: 'Deep insights into production metrics, efficiency, and resource utilization.'
    },
    {
      icon: <EngineeringIcon sx={{ fontSize: 40 }} />,
      title: 'Maintenance Management',
      description: 'Predictive maintenance scheduling and equipment health monitoring.'
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
      title: 'Performance Tracking',
      description: 'Comprehensive KPI monitoring and performance benchmarking across departments.'
    },
    {
      icon: <ShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Supply Chain Integration',
      description: 'Seamless coordination of raw materials, production, and distribution.'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'System Uptime' },
    { value: '50%', label: 'Efficiency Boost' },
    { value: '24/7', label: 'Support' },
    { value: '100+', label: 'Active Users' }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(25, 118, 210, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          opacity: 0.1,
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle at center, #1976d2 0%, transparent 50%)',
            animation: 'pulse 15s infinite',
          },
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.2)' },
            '100%': { transform: 'scale(1)' }
          }
        }}
      />

      {/* Header */}
      <Fade in timeout={1000}>
        <Box
          sx={{
            py: 3,
            px: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            <FactoryIcon sx={{ fontSize: 32, color: '#64ffda' }} />
            Aluminum Plant MIS
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/login')}
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              borderColor: '#64ffda',
              color: '#64ffda',
              '&:hover': {
                borderColor: '#64ffda',
                backgroundColor: 'rgba(100, 255, 218, 0.1)'
              }
            }}
          >
            Login
          </Button>
        </Box>
      </Fade>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flex: 1, py: 8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left side - Welcome text */}
          <Grid item xs={12} md={6}>
            <Slide direction="right" in timeout={1000}>
              <Box sx={{ color: 'white', mb: 4 }}>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    fontSize: isMobile ? '2.5rem' : '3.5rem',
                    background: 'linear-gradient(45deg, #64ffda 30%, #1976d2 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Next-Gen Plant Management
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    lineHeight: 1.6,
                    color: '#8892b0'
                  }}
                >
                  Transform your aluminum manufacturing operations with our cutting-edge Management Information System. Experience unprecedented efficiency and control.
                </Typography>
              </Box>
            </Slide>
          </Grid>

          {/* Right side - Features */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Zoom in timeout={1000} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        height: '100%',
                        borderRadius: 2,
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                          background: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      <Box sx={{ color: '#64ffda', mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{ mb: 1, fontWeight: 'bold', color: 'white' }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ lineHeight: 1.6, color: '#8892b0' }}
                      >
                        {feature.description}
                      </Typography>
                    </Paper>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Stats Section */}
        <Fade in timeout={1500}>
          <Box sx={{ mt: 8 }}>
            <Grid container spacing={4} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 2,
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        color: '#64ffda',
                        fontWeight: 'bold',
                        mb: 1
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#8892b0' }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Container>

      {/* Footer */}
      <Fade in timeout={2000}>
        <Box
          sx={{
            py: 3,
            px: 4,
            textAlign: 'center',
            color: '#8892b0',
            position: 'relative',
            zIndex: 1
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Aluminum Plant MIS. All rights reserved.
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
}

export default Welcome; 