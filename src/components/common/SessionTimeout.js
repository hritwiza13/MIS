import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  LinearProgress
} from '@mui/material';
import { Timer as TimerIcon } from '@mui/icons-material';

function SessionTimeout({ onLogout, timeoutDuration = 30 * 60 * 1000 }) { // 30 minutes default
  const [timeLeft, setTimeLeft] = useState(timeoutDuration);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [timeoutDialogOpen, setTimeoutDialogOpen] = useState(false);

  useEffect(() => {
    let timeoutId;
    let warningId;

    const resetSession = () => {
      setTimeLeft(timeoutDuration);
      setShowTimeoutWarning(false);
      setTimeoutDialogOpen(false);
    };

    const handleUserActivity = () => {
      resetSession();
    };

    // Add event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });

    // Set up timeout warning (5 minutes before session end)
    warningId = setTimeout(() => {
      setShowTimeoutWarning(true);
      setTimeoutDialogOpen(true);
    }, timeoutDuration - 5 * 60 * 1000);

    // Set up session timeout
    timeoutId = setTimeout(() => {
      onLogout();
    }, timeoutDuration);

    // Update time left every second
    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timerId);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(warningId);
      clearInterval(timerId);
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [timeoutDuration, onLogout]);

  const formatTimeLeft = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleExtendSession = () => {
    setTimeLeft(timeoutDuration);
    setShowTimeoutWarning(false);
    setTimeoutDialogOpen(false);
  };

  return (
    <>
      <Dialog
        open={timeoutDialogOpen}
        onClose={handleExtendSession}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TimerIcon color="warning" />
          Session Timeout Warning
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Your session will expire in {formatTimeLeft(timeLeft)}.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={(timeLeft / timeoutDuration) * 100} 
              color="warning"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onLogout} color="error">
            Logout Now
          </Button>
          <Button onClick={handleExtendSession} variant="contained" color="primary">
            Extend Session
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SessionTimeout; 