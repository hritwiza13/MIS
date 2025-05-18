import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  Divider,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  TextField
} from '@mui/material';

function DashboardPreferences({ open, onClose, preferences, onSave }) {
  const [localPreferences, setLocalPreferences] = React.useState(preferences);

  const handleChange = (key, value) => {
    setLocalPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onSave(localPreferences);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Dashboard Preferences</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Display Settings */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Display Settings
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={localPreferences.showMetrics}
                    onChange={(e) => handleChange('showMetrics', e.target.checked)}
                  />
                }
                label="Show Metrics"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={localPreferences.showActivities}
                    onChange={(e) => handleChange('showActivities', e.target.checked)}
                  />
                }
                label="Show Recent Activities"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={localPreferences.showAlerts}
                    onChange={(e) => handleChange('showAlerts', e.target.checked)}
                  />
                }
                label="Show Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={localPreferences.darkMode}
                    onChange={(e) => handleChange('darkMode', e.target.checked)}
                  />
                }
                label="Dark Mode"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Update Settings */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Update Settings
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Auto-Refresh Interval</InputLabel>
              <Select
                value={localPreferences.refreshInterval}
                onChange={(e) => handleChange('refreshInterval', e.target.value)}
                label="Auto-Refresh Interval"
              >
                <MenuItem value={0}>Manual Only</MenuItem>
                <MenuItem value={30}>30 seconds</MenuItem>
                <MenuItem value={60}>1 minute</MenuItem>
                <MenuItem value={300}>5 minutes</MenuItem>
                <MenuItem value={900}>15 minutes</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Alert Settings */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Alert Settings
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={localPreferences.showErrorAlerts}
                    onChange={(e) => handleChange('showErrorAlerts', e.target.checked)}
                  />
                }
                label="Show Error Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={localPreferences.showWarningAlerts}
                    onChange={(e) => handleChange('showWarningAlerts', e.target.checked)}
                  />
                }
                label="Show Warning Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={localPreferences.showInfoAlerts}
                    onChange={(e) => handleChange('showInfoAlerts', e.target.checked)}
                  />
                }
                label="Show Info Alerts"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Layout Settings */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Layout Settings
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Default Time Range</InputLabel>
              <Select
                value={localPreferences.defaultTimeRange}
                onChange={(e) => handleChange('defaultTimeRange', e.target.value)}
                label="Default Time Range"
              >
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Metrics Layout</InputLabel>
              <Select
                value={localPreferences.metricsLayout}
                onChange={(e) => handleChange('metricsLayout', e.target.value)}
                label="Metrics Layout"
              >
                <MenuItem value="grid">Grid</MenuItem>
                <MenuItem value="list">List</MenuItem>
                <MenuItem value="compact">Compact</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Preferences
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DashboardPreferences; 