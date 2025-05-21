import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Button,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText
} from '@mui/material';
import {
  Download as DownloadIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ReportPreview from './reports/ReportPreview';
import ReportEdit from './reports/ReportEdit';

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

// Mock data for demonstration
const mockReports = [
  {
    id: 1,
    name: 'Production Report - January 2024',
    type: 'Production Report',
    department: 'Production',
    date: '2024-01-15',
    size: '2.5 MB',
    format: 'PDF',
    status: 'Approved',
    file: new Blob(['Mock PDF content'], { type: 'application/pdf' })
  },
  {
    id: 2,
    name: 'Quality Control Report - Q1 2024',
    type: 'Quality Report',
    department: 'Quality Control',
    date: '2024-01-20',
    size: '1.8 MB',
    format: 'XLSX',
    status: 'Pending',
    file: new Blob(['Mock Excel content'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  },
  {
    id: 3,
    name: 'Maintenance Schedule 2024',
    type: 'Maintenance Report',
    department: 'Maintenance',
    date: '2024-01-25',
    size: '3.2 MB',
    format: 'PDF',
    status: 'Draft',
    file: new Blob(['Mock PDF content'], { type: 'application/pdf' })
  }
];

function Reports() {
  const navigate = useNavigate();
  const theme = useTheme();
  const enhancedStyles = {
    container: {
      py: 4,
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      minHeight: 'calc(100vh - 64px)', // Adjust for navbar height
    },
    paperSection: {
      p: 3,
      borderRadius: theme.shape.borderRadius,
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      mb: 3, // Add margin bottom to the paper sections
    },
    tableContainer: {
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
    tableHeader: {
      backgroundColor: alpha(theme.palette.primary.main, 0.05),
      '& .MuiTableCell-head': {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
      },
    },
    tableRow: {
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.02),
      },
    },
    actionButton: {
      transition: 'all 0.2s ease',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
    filterButton: {
      textTransform: 'none',
    }
  };

  const [selectedType, setSelectedType] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleView = (report) => {
    setSelectedReport(report);
    setPreviewOpen(true);
  };

  const handleDownload = (report) => {
    try {
      // Create a download link
      const url = URL.createObjectURL(report.file);
      const link = document.createElement('a');
      link.href = url;
      link.download = report.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSnackbar({
        open: true,
        message: 'Report downloaded successfully',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to download report',
        severity: 'error'
      });
    }
  };

  const handleEdit = (report) => {
    setSelectedReport(report);
    setEditOpen(true);
  };

  const handleSaveEdit = (updatedReport) => {
    // In a real application, this would update the report in the backend
    const updatedReports = mockReports.map(report => 
      report.id === updatedReport.id ? updatedReport : report
    );
    
    if (updatedReport.deleted) {
      // Remove the deleted report
      const index = updatedReports.findIndex(r => r.id === updatedReport.id);
      updatedReports.splice(index, 1);
    }

    setSnackbar({
      open: true,
      message: updatedReport.deleted ? 'Report deleted successfully' : 'Report updated successfully',
      severity: 'success'
    });
  };

  const handleStatusChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedStatuses(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleClearFilters = () => {
    setSelectedType('');
    setSelectedDepartment('');
    setSearchQuery('');
    setDateRange({ start: '', end: '' });
    setSelectedStatuses([]);
  };

  const filteredReports = mockReports.filter(report => {
    const matchesType = !selectedType || report.type === selectedType;
    const matchesDepartment = !selectedDepartment || report.department === selectedDepartment;
    const matchesSearch = !searchQuery || 
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(report.status);
    const matchesDateRange = (!dateRange.start || report.date >= dateRange.start) &&
      (!dateRange.end || report.date <= dateRange.end);

    return matchesType && matchesDepartment && matchesSearch && matchesStatus && matchesDateRange;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'draft':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={enhancedStyles.container}>
      {/* Report Actions and Filters */}
      <Paper sx={enhancedStyles.paperSection}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">
              Reports Dashboard
        </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/reports/upload')}
              sx={{ mr: 1 }}
            >
              Upload New Report
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/reports/download')}
              sx={{ mr: 1 }}
            >
              Download Reports
            </Button>
            <Button
              variant="outlined"
              startIcon={showFilters ? <ClearIcon /> : <FilterListIcon />}
              onClick={() => setShowFilters(!showFilters)}
              sx={enhancedStyles.filterButton}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </Grid>
        </Grid>

        {showFilters && (
          <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Report Type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                {reportTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <MenuItem value="">All Departments</MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  multiple
                  value={selectedStatuses}
                  onChange={handleStatusChange}
                  input={<OutlinedInput label="Status" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {['Draft', 'Pending', 'Approved'].map((status) => (
                    <MenuItem key={status} value={status}>
                      <Checkbox checked={selectedStatuses.indexOf(status) > -1} />
                      <ListItemText primary={status} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Search Reports"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  endAdornment: searchQuery && (
                    <IconButton
                      size="small"
                      onClick={() => setSearchQuery('')}
                    >
                      <ClearIcon />
                    </IconButton>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
              >
                Clear All Filters
              </Button>
        </Grid>
      </Grid>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Filtered Reports Table */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Filtered Reports ({filteredReports.length})
          </Typography>
          <TableContainer component={Paper} sx={enhancedStyles.tableContainer}>
            <Table>
              <TableHead sx={enhancedStyles.tableHeader}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Format</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} sx={enhancedStyles.tableRow}>
                    <TableCell>{report.name}</TableCell>
                    <TableCell>
                      <Chip label={report.type} size="small" />
                    </TableCell>
                    <TableCell>{report.department}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <Chip 
                        label={report.status} 
                        size="small" 
                        color={getStatusColor(report.status)}
                      />
                    </TableCell>
                    <TableCell>{report.format}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleView(report)}
                        title="View Report"
                        sx={enhancedStyles.actionButton}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleDownload(report)}
                        title="Download Report"
                        sx={enhancedStyles.actionButton}
                      >
                        <DownloadIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(report)}
                        title="Edit Report"
                        sx={enhancedStyles.actionButton}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredReports.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No reports found matching your criteria
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      {selectedReport && (
        <>
          <ReportPreview
            open={previewOpen}
            onClose={() => setPreviewOpen(false)}
            report={selectedReport}
            onDownload={handleDownload}
            onEdit={handleEdit}
          />
          <ReportEdit
            open={editOpen}
            onClose={() => setEditOpen(false)}
            report={selectedReport}
            onSave={handleSaveEdit}
          />
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Reports; 