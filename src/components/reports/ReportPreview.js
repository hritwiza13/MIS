import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
  Divider
} from '@mui/material';
import {
  Close as CloseIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Description as DescriptionIcon,
  Info as InfoIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';

function ReportPreview({ open, onClose, report, onDownload, onEdit }) {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [previewContent, setPreviewContent] = useState(null);
  const theme = useTheme();
  const enhancedStyles = {
    dialogContent: {
      backgroundColor: alpha(theme.palette.background.default, 0.6),
      backdropFilter: 'blur(5px)',
    },
    paperSection: {
      p: 2,
      mb: 2,
      borderRadius: theme.shape.borderRadius,
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    previewBox: {
      border: '1px solid #e0e0e0',
      borderRadius: 1,
      p: 2,
      minHeight: '400px',
      bgcolor: alpha(theme.palette.grey[100], 0.8),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
  };

  useEffect(() => {
    if (open) {
      setLoading(true);
      // Simulate loading the preview
      setTimeout(() => {
        setLoading(false);
        // In a real application, this would fetch the actual preview content
        setPreviewContent({
          text: 'This is a sample preview of the report content. In a real application, this would show the actual content of the file.',
          metadata: {
            createdBy: 'John Doe',
            lastModified: '2024-02-20 14:30',
            version: '1.0',
            pages: 5,
            wordCount: 1200
          },
          history: [
            { date: '2024-02-20 14:30', action: 'Updated', user: 'John Doe' },
            { date: '2024-02-19 10:15', action: 'Created', user: 'Jane Smith' }
          ]
        });
      }, 1000);
    }
  }, [open]);

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

  const renderPreviewContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      );
    }

    switch (activeTab) {
      case 0: // Preview
        return (
          <Box sx={enhancedStyles.previewBox}
          >
            {report.format === 'PDF' ? (
              <Box>
                <DescriptionIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  PDF Preview
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {previewContent?.text}
                </Typography>
              </Box>
            ) : report.format === 'XLSX' ? (
              <Box>
                <DescriptionIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Excel Preview
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {previewContent?.text}
                </Typography>
              </Box>
            ) : (
              <Box>
                <DescriptionIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Preview not available for this file type
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Please download the file to view its contents
                </Typography>
              </Box>
            )}
          </Box>
        );

      case 1: // Details
        return (
          <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">Created By</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {previewContent?.metadata.createdBy}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">Last Modified</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {previewContent?.metadata.lastModified}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">Version</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {previewContent?.metadata.version}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">Pages</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {previewContent?.metadata.pages}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">Word Count</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {previewContent?.metadata.wordCount}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">File Size</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {report.size}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );

      case 2: // History
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Version History</Typography>
            {previewContent?.history.map((item, index) => (
              <Paper key={index} sx={enhancedStyles.paperSection}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="textSecondary">Date</Typography>
                    <Typography variant="body2">{item.date}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="textSecondary">Action</Typography>
                    <Typography variant="body2">{item.action}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="textSecondary">User</Typography>
                    <Typography variant="body2">{item.user}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Report Preview</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          aria-label="report preview tabs"
        >
          <Tab icon={<DescriptionIcon />} label="Preview" />
          <Tab icon={<InfoIcon />} label="Details" />
          <Tab icon={<HistoryIcon />} label="History" />
        </Tabs>
      </Box>

      <DialogContent dividers sx={enhancedStyles.dialogContent}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="textSecondary">Report Name</Typography>
            <Typography variant="body1">{report.name}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="textSecondary">Department</Typography>
            <Typography variant="body1">{report.department}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="textSecondary">Type</Typography>
            <Chip label={report.type} size="small" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="textSecondary">Status</Typography>
            <Chip 
              label={report.status} 
              size="small" 
              color={getStatusColor(report.status)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="textSecondary">Date</Typography>
            <Typography variant="body1">{report.date}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="textSecondary">Format</Typography>
            <Typography variant="body1">{report.format}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {renderPreviewContent()}
      </DialogContent>

      <DialogActions>
        <Button
          startIcon={<EditIcon />}
          onClick={() => {
            onEdit(report);
            onClose();
          }}
        >
          Edit
        </Button>
        <Button
          startIcon={<DownloadIcon />}
          variant="contained"
          onClick={() => {
            onDownload(report);
            onClose();
          }}
        >
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReportPreview; 