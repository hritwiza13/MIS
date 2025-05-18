import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button, Grid, Paper, Typography, ButtonGroup } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Reports() {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const handleDateChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
  };

  const generateProductionReport = (format) => {
    // TODO: Replace with actual API call to get production data
    const productionData = [
      {
        'Shift': 'A',
        'Product Type': 'Hot Rolled Steel',
        'Quantity (tons)': 150,
        'Quality Grade': 'A',
        'Date': '2024-03-18'
      },
      // Add more sample data
    ];

    if (format === 'excel') {
      const ws = XLSX.utils.json_to_sheet(productionData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Production Report');
      XLSX.writeFile(wb, 'production_report.xlsx');
    } else if (format === 'pdf') {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text('Production Report', 14, 15);
      
      // Add date range if selected
      if (dateRange.startDate && dateRange.endDate) {
        doc.setFontSize(10);
        doc.text(`Period: ${dateRange.startDate} to ${dateRange.endDate}`, 14, 25);
      }

      // Add table
      doc.autoTable({
        head: [['Shift', 'Product Type', 'Quantity (tons)', 'Quality Grade', 'Date']],
        body: productionData.map(item => [
          item['Shift'],
          item['Product Type'],
          item['Quantity (tons)'],
          item['Quality Grade'],
          item['Date']
        ]),
        startY: 30,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [26, 35, 126] }
      });

      doc.save('production_report.pdf');
    }
  };

  const generateQualityReport = (format) => {
    // TODO: Replace with actual API call to get quality data
    const qualityData = [
      {
        'Batch Number': 'B001',
        'Product Type': 'Hot Rolled Steel',
        'Test Type': 'Tensile Strength',
        'Result': 'Pass',
        'Inspector': 'John Doe',
        'Date': '2024-03-18'
      },
      // Add more sample data
    ];

    if (format === 'excel') {
      const ws = XLSX.utils.json_to_sheet(qualityData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Quality Report');
      XLSX.writeFile(wb, 'quality_report.xlsx');
    } else if (format === 'pdf') {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text('Quality Control Report', 14, 15);
      
      // Add date range if selected
      if (dateRange.startDate && dateRange.endDate) {
        doc.setFontSize(10);
        doc.text(`Period: ${dateRange.startDate} to ${dateRange.endDate}`, 14, 25);
      }

      // Add table
      doc.autoTable({
        head: [['Batch Number', 'Product Type', 'Test Type', 'Result', 'Inspector', 'Date']],
        body: qualityData.map(item => [
          item['Batch Number'],
          item['Product Type'],
          item['Test Type'],
          item['Result'],
          item['Inspector'],
          item['Date']
        ]),
        startY: 30,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [26, 35, 126] }
      });

      doc.save('quality_report.pdf');
    }
  };

  const generateMaintenanceReport = (format) => {
    // TODO: Replace with actual API call to get maintenance data
    const maintenanceData = [
      {
        'Equipment ID': 'EQ001',
        'Equipment Name': 'Rolling Mill',
        'Maintenance Type': 'Preventive',
        'Priority': 'High',
        'Status': 'Completed',
        'Assigned To': 'Mike Smith',
        'Scheduled Date': '2024-03-18',
        'Completion Date': '2024-03-18'
      },
      // Add more sample data
    ];

    if (format === 'excel') {
      const ws = XLSX.utils.json_to_sheet(maintenanceData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Maintenance Report');
      XLSX.writeFile(wb, 'maintenance_report.xlsx');
    } else if (format === 'pdf') {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text('Maintenance Report', 14, 15);
      
      // Add date range if selected
      if (dateRange.startDate && dateRange.endDate) {
        doc.setFontSize(10);
        doc.text(`Period: ${dateRange.startDate} to ${dateRange.endDate}`, 14, 25);
      }

      // Add table
      doc.autoTable({
        head: [['Equipment ID', 'Equipment Name', 'Maintenance Type', 'Priority', 'Status', 'Assigned To', 'Scheduled Date', 'Completion Date']],
        body: maintenanceData.map(item => [
          item['Equipment ID'],
          item['Equipment Name'],
          item['Maintenance Type'],
          item['Priority'],
          item['Status'],
          item['Assigned To'],
          item['Scheduled Date'],
          item['Completion Date']
        ]),
        startY: 30,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [26, 35, 126] }
      });

      doc.save('maintenance_report.pdf');
    }
  };

  return (
    <div className="reports-section">
      <Typography variant="h4" gutterBottom>
        Download Reports
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Select Date Range
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
              className="date-input"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateChange}
              className="date-input"
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Production Report
            </Typography>
            <ButtonGroup variant="contained" fullWidth>
              <Button
                startIcon={<DownloadIcon />}
                onClick={() => generateProductionReport('excel')}
              >
                Excel
              </Button>
              <Button
                startIcon={<PictureAsPdfIcon />}
                onClick={() => generateProductionReport('pdf')}
              >
                PDF
              </Button>
            </ButtonGroup>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Quality Report
            </Typography>
            <ButtonGroup variant="contained" fullWidth>
              <Button
                startIcon={<DownloadIcon />}
                onClick={() => generateQualityReport('excel')}
              >
                Excel
              </Button>
              <Button
                startIcon={<PictureAsPdfIcon />}
                onClick={() => generateQualityReport('pdf')}
              >
                PDF
              </Button>
            </ButtonGroup>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Maintenance Report
            </Typography>
            <ButtonGroup variant="contained" fullWidth>
              <Button
                startIcon={<DownloadIcon />}
                onClick={() => generateMaintenanceReport('excel')}
              >
                Excel
              </Button>
              <Button
                startIcon={<PictureAsPdfIcon />}
                onClick={() => generateMaintenanceReport('pdf')}
              >
                PDF
              </Button>
            </ButtonGroup>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Reports; 