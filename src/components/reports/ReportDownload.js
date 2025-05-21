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
  CircularProgress
} from '@mui/material';
import {
  Download as DownloadIcon,
  TableChart as ExcelIcon
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';

function ReportDownload() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedReport, setSelectedReport] = useState('');
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

  const fileType = {
    value: 'xlsx',
    label: 'Excel Spreadsheet',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    icon: <ExcelIcon />
  };

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

  // Format date and time for filename
  const formatDateTimeForFilename = (date) => {
    return date.toISOString()
      .replace(/[:.]/g, '-')
      .replace('T', '_')
      .slice(0, 19);
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

  const handleDownload = async () => {
    if (!selectedDepartment || !selectedReport) {
      setError('Please select both department and report');
      return;
    }

    // Check if user has access to the selected department
    if (!isAdmin && selectedDepartment !== userDepartment) {
      setError('You do not have access to this department\'s reports');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get the report name from the reports object
      const reportInfo = reports[selectedDepartment].find(r => r.id === selectedReport);
      if (!reportInfo) {
        throw new Error('Report not found');
      }

      // Create a file name with current date and time
      const timestamp = formatDateTimeForFilename(currentDateTime);
      const fileName = `${selectedDepartment}_${selectedReport}_${timestamp}.${fileType.value}`;
      
      // Create a mock file (in a real application, this would be fetched from a server)
      const mockFile = new Blob(['Mock file content'], { type: fileType.mimeType });
      
      // Create a download link
      const url = window.URL.createObjectURL(mockFile);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download report. Please try again.');
      console.error('Download error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={enhancedStyles.container}>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Download Reports
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
                <InputLabel>Report</InputLabel>
                <Select
                  value={selectedReport}
                  label="Report"
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

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ExcelIcon color="primary" />
                <Typography variant="body1" color="text.secondary">
                  Reports will be downloaded in Excel format
                </Typography>
              </Box>
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
                onClick={handleDownload}
                disabled={!selectedDepartment || !selectedReport || loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Downloading...' : 'Download Report'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default ReportDownload; 