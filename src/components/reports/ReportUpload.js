import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  TextField,
  CircularProgress
} from '@mui/material';
import {
  Upload as UploadIcon
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';

function ReportUpload() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedReport, setSelectedReport] = useState('');
  const [reportName, setReportName] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const userDepartment = localStorage.getItem('userDepartment');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const theme = useTheme();

  const enhancedStyles = {
    container: {
      py: 4,
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      minHeight: 'calc(100vh - 64px)', // Adjust for navbar height
    },
    paperSection: {
      p: 3,
      mt: 3,
      borderRadius: theme.shape.borderRadius,
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
  };

  const departments = [
    { value: 'production', label: 'Production' },
    { value: 'quality', label: 'Quality Control' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'packaging', label: 'Packaging' },
    { value: 'coloring', label: 'Coloring' }
  ];

  const reports = {
    production: [
      { id: 'prod_daily', name: 'Daily Production Report' },
      { id: 'prod_weekly', name: 'Weekly Production Summary' },
      { id: 'prod_monthly', name: 'Monthly Production Analysis' }
    ],
    quality: [
      { id: 'qual_inspection', name: 'Quality Inspection Report' },
      { id: 'qual_metrics', name: 'Quality Metrics Report' },
      { id: 'qual_compliance', name: 'Compliance Report' }
    ],
    maintenance: [
      { id: 'maint_schedule', name: 'Maintenance Schedule' },
      { id: 'maint_breakdown', name: 'Breakdown Report' },
      { id: 'maint_preventive', name: 'Preventive Maintenance Report' }
    ],
    packaging: [
      { id: 'pack_daily', name: 'Daily Packaging Report' },
      { id: 'pack_inventory', name: 'Packaging Inventory Report' },
      { id: 'pack_quality', name: 'Packaging Quality Report' }
    ],
    coloring: [
      { id: 'color_batch', name: 'Batch Coloring Report' },
      { id: 'color_quality', name: 'Color Quality Report' },
      { id: 'color_inventory', name: 'Color Inventory Report' }
    ]
  };

  useEffect(() => {
    // Set initial department for non-admin users
    if (!isAdmin && userDepartment) {
      setSelectedDepartment(userDepartment);
    }
  }, [isAdmin, userDepartment]);

  // Update current date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date and time for display
  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setSelectedReport('');
    setError('');
  };

  const handleReportChange = (event) => {
    setSelectedReport(event.target.value);
    setError('');
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file is Excel
      if (!file.name.match(/\.(xlsx|xls)$/i)) {
        setError('Please select an Excel file (.xlsx or .xls)');
        event.target.value = null;
        setReportName('');
        return;
      }
      setReportName(file.name);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedDepartment || !selectedReport) {
      setError('Please select both department and report type');
      return;
    }

    if (!reportName) {
      setError('Please select a file to upload');
      return;
    }

    if (!reportDate) {
      setError('Please select a report date');
      return;
    }

    // Check if user has access to the selected department
    if (!isAdmin && selectedDepartment !== userDepartment) {
      setError('You do not have access to upload reports for this department');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Implement actual file upload logic
      console.log(`Uploading ${reportName} for ${selectedDepartment} - ${selectedReport} dated ${reportDate}`);
      
      // Reset form after successful upload
      setReportName('');
      setReportDate('');
      setSelectedReport('');
    } catch (err) {
      setError('Failed to upload report. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={enhancedStyles.container}>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload Reports
        </Typography>
        
        <Paper sx={enhancedStyles.paperSection}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="text.secondary" align="right">
                Current Time: {formatDateTime(currentDateTime)}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={selectedDepartment}
                  label="Department"
                  onChange={handleDepartmentChange}
                  disabled={!isAdmin || loading}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={selectedReport}
                  label="Report Type"
                  onChange={handleReportChange}
                  disabled={!selectedDepartment || loading}
                >
                  {selectedDepartment && reports[selectedDepartment]?.map((report) => (
                    <MenuItem key={report.id} value={report.id}>
                      {report.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Report Date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                disabled={loading}
                sx={{ height: '56px' }}
              >
                Select Excel File
                <input
                  type="file"
                  hidden
                  onChange={handleFileSelect}
                  accept=".xlsx,.xls"
                />
              </Button>
              {reportName && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {reportName}
                </Typography>
              )}
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <UploadIcon />}
                onClick={handleUpload}
                disabled={!selectedDepartment || !selectedReport || !reportName || !reportDate || loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Uploading...' : 'Upload Report'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default ReportUpload; 