import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
  Collapse
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Build as BuildIcon,
  LocalShipping as LocalShippingIcon,
  Brush as BrushIcon,
  Science as ScienceIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  ExpandLess,
  ExpandMore,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

function Sidebar({ department }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [reportsOpen, setReportsOpen] = React.useState(false);

  const handleReportsClick = () => {
    setReportsOpen(!reportsOpen);
  };

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: `/${department}`,
      allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring']
    },
    {
      text: 'Reports',
      icon: <AssessmentIcon />,
      path: '/reports',
      allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring'],
      subItems: [
        {
          text: 'View Reports',
          icon: <VisibilityIcon />,
          path: '/reports',
          allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring']
        },
        {
          text: 'Upload Reports',
          icon: <UploadIcon />,
          path: '/reports/upload',
          allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring']
        },
        {
          text: 'Download Reports',
          icon: <DownloadIcon />,
          path: '/reports/download',
          allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring']
        }
      ]
    },
    {
      text: 'Production',
      icon: <BuildIcon />,
      path: '/production',
      allowedDepartments: ['production']
    },
    {
      text: 'Quality Control',
      icon: <ScienceIcon />,
      path: '/quality',
      allowedDepartments: ['quality']
    },
    {
      text: 'Maintenance',
      icon: <BuildIcon />,
      path: '/maintenance',
      allowedDepartments: ['maintenance']
    },
    {
      text: 'Packaging',
      icon: <LocalShippingIcon />,
      path: '/packaging',
      allowedDepartments: ['packaging']
    },
    {
      text: 'Coloring',
      icon: <BrushIcon />,
      path: '/coloring',
      allowedDepartments: ['coloring']
    },
    {
      text: 'Scrap Management',
      icon: <DeleteIcon />,
      path: '/scrap-management',
      allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring']
    }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: '64px', // Height of the AppBar
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            item.allowedDepartments.includes(department) && (
              <React.Fragment key={item.text}>
                {item.subItems ? (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={handleReportsClick}
                        sx={{
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                            '&:hover': {
                              backgroundColor: 'rgba(25, 118, 210, 0.12)',
                            },
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        {reportsOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </ListItem>
                    <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.subItems.map((subItem) => (
                          <ListItem key={subItem.text} disablePadding>
                            <ListItemButton
                              selected={location.pathname === subItem.path}
                              onClick={() => navigate(subItem.path)}
                              sx={{
                                pl: 4,
                                '&.Mui-selected': {
                                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                  '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                                  },
                                },
                              }}
                            >
                              <ListItemIcon sx={{ color: location.pathname === subItem.path ? 'primary.main' : 'inherit' }}>
                                {subItem.icon}
                              </ListItemIcon>
                              <ListItemText 
                                primary={subItem.text}
                                primaryTypographyProps={{
                                  color: location.pathname === subItem.path ? 'primary.main' : 'inherit',
                                  fontWeight: location.pathname === subItem.path ? 'bold' : 'normal',
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={location.pathname === item.path}
                      onClick={() => navigate(item.path)}
                      sx={{
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                          '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.12)',
                          },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text}
                        primaryTypographyProps={{
                          color: location.pathname === item.path ? 'primary.main' : 'inherit',
                          fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
              </React.Fragment>
            )
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar; 