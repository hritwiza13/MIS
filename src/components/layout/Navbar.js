import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Tooltip
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userInfo, logout } = useAuth();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MIS System
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'white',
                fontSize: '1.1rem'
              }}
            >
              {userInfo?.user?.name || 'User'}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.8rem'
              }}
            >
              ID: {userInfo?.user?.id} | {userInfo?.department ? userInfo.department.charAt(0).toUpperCase() + userInfo.department.slice(1) : ''}
            </Typography>
          </Box>
          
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
          
          <Tooltip title={`${userInfo?.user?.name || 'User'} - ${userInfo?.department || ''}`}>
            <IconButton
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: 'primary.light',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                {(userInfo?.user?.name || userInfo?.user?.id || '?').charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 