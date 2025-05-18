import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  IconButton
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

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

function ReportUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [reportType, setReportType] = useState('');
  const [department, setDepartment] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!reportType || !department || selectedFiles.length === 0) {
      setError('Please fill in all fields and select at least one file');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess('Files uploaded successfully!');
      setSelectedFiles([]);
      setReportType('');
      setDepartment('');
    } catch (err) {
      setError('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Upload Reports
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Report Type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              margin="normal"
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
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              margin="normal"
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Select Files
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                />
              </Button>
            </Box>

            {selectedFiles.length > 0 && (
              <List>
                {selectedFiles.map((file, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          {success && (
            <Grid item xs={12}>
              <Alert severity="success">{success}</Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={uploading || selectedFiles.length === 0}
              startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
            >
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default ReportUpload; 