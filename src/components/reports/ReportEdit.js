import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';

const reportTypes = [
  'Production Report',
  'Quality Report',
  'Maintenance Report',
  'Inventory Report',
  'Scrap Report',
  'Efficiency Report'
];

const departments = [
  'Production',
  'Quality Control',
  'Maintenance',
  'Packaging',
  'Coloring'
];

const statuses = ['Draft', 'Pending', 'Approved'];

function ReportEdit({ open, onClose, report, onSave }) {
  const [editedReport, setEditedReport] = useState(report);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();
  const enhancedStyles = {
    dialogContent: {
      backgroundColor: alpha(theme.palette.background.default, 0.6),
      backdropFilter: 'blur(5px)',
    },
    textField: {
      // Add styling for text fields if needed
    },
    button: {
      // Add styling for buttons if needed
    },
  };

  const handleChange = (field) => (event) => {
    setEditedReport({
      ...editedReport,
      [field]: event.target.value
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(editedReport);
      onClose();
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        onSave({ ...editedReport, deleted: true });
        onClose();
      } catch (err) {
        setError('Failed to delete report. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Edit Report</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={enhancedStyles.dialogContent}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Report Name"
              value={editedReport.name}
              onChange={handleChange('name')}
              margin="normal"
              sx={enhancedStyles.textField}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Report Type"
              value={editedReport.type}
              onChange={handleChange('type')}
              margin="normal"
              sx={enhancedStyles.textField}
            >
              {reportTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Department"
              value={editedReport.department}
              onChange={handleChange('department')}
              margin="normal"
              sx={enhancedStyles.textField}
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={editedReport.date}
              onChange={handleChange('date')}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              sx={enhancedStyles.textField}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Status"
              value={editedReport.status}
              onChange={handleChange('status')}
              margin="normal"
              sx={enhancedStyles.textField}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={editedReport.description || ''}
              onChange={handleChange('description')}
              margin="normal"
              placeholder="Add a description for this report..."
              sx={enhancedStyles.textField}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleDelete}
          disabled={loading}
          sx={enhancedStyles.button}
        >
          Delete
        </Button>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={enhancedStyles.button}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
          onClick={handleSave}
          disabled={loading}
          sx={enhancedStyles.button}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReportEdit; 