import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
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
  Alert
} from '@mui/material';
import {
  Download as DownloadIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon
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

// Mock data for demonstration
const mockReports = [
  {
    id: 1,
    name: 'Production Report - January 2024',
    type: 'Production Report',
    department: 'Production',
    date: '2024-01-15',
    size: '2.5 MB',
    format: 'PDF'
  },
  {
    id: 2,
    name: 'Quality Control Report - Q1 2024',
    type: 'Quality Report',
    department: 'Quality Control',
    date: '2024-01-20',
    size: '1.8 MB',
    format: 'XLSX'
  },
  {
    id: 3,
    name: 'Maintenance Schedule 2024',
    type: 'Maintenance Report',
    department: 'Maintenance',
    date: '2024-01-25',
    size: '3.2 MB',
    format: 'PDF'
  }
];

function ReportDownload() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const handleDownload = (report) => {
    // Simulate file download
    console.log(`Downloading ${report.name}`);
    // In a real application, this would trigger the actual file download
  };

  const filteredReports = mockReports.filter(report => {
    const matchesType = !selectedType || report.type === selectedType;
    const matchesDepartment = !selectedDepartment || report.department === selectedDepartment;
    const matchesSearch = !searchQuery || 
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesDepartment && matchesSearch;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Download Reports
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
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
            <TextField
              fullWidth
              label="Search Reports"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Format</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>
                    <Chip label={report.type} size="small" />
                  </TableCell>
                  <TableCell>{report.department}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell>{report.format}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleDownload(report)}
                      title="Download Report"
                    >
                      <DownloadIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredReports.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography color="text.secondary">
              No reports found matching your criteria
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default ReportDownload; 