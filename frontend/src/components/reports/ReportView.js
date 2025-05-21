import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon,
  AttachFile as AttachFileIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const ReportView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`/api/reports/${id}`);
        setReport(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load report. Please try again later.');
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const handleDownload = async () => {
    try {
      const response = await axios.get(`/api/reports/${id}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${report.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to download report. Please try again later.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await axios.delete(`/api/reports/${id}`);
        navigate('/reports');
      } catch (err) {
        setError('Failed to delete report. Please try again later.');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'in progress':
        return 'warning';
      case 'pending':
        return 'info';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircleIcon />;
      case 'in progress':
        return <WarningIcon />;
      case 'pending':
        return <InfoIcon />;
      case 'failed':
        return <ErrorIcon />;
      default:
        return <InfoIcon />;
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/reports')}
          sx={{ mt: 2 }}
        >
          Back to Reports
        </Button>
      </Container>
    );
  }

  if (!report) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          Report not found
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/reports')}
          sx={{ mt: 2 }}
        >
          Back to Reports
        </Button>
      </Container>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          }}
        >
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/reports')}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              Back to Reports
            </Button>
            <Box>
              <Tooltip title="Download Report">
                <IconButton
                  onClick={handleDownload}
                  sx={{
                    mr: 1,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Report">
                <IconButton
                  onClick={() => navigate(`/reports/edit/${id}`)}
                  sx={{
                    mr: 1,
                    backgroundColor: 'info.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'info.dark',
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Report">
                <IconButton
                  onClick={handleDelete}
                  sx={{
                    backgroundColor: 'error.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'error.dark',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56,
                      }}
                    >
                      <DescriptionIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                  }
                  title={
                    <Typography variant="h4" component="h1" gutterBottom>
                      {report.title}
                    </Typography>
                  }
                  subheader={
                    <Box sx={{ mt: 1 }}>
                      <Chip
                        icon={getStatusIcon(report.status)}
                        label={report.status}
                        color={getStatusColor(report.status)}
                        sx={{
                          borderRadius: 1,
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                        }}
                      />
                    </Box>
                  }
                />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <PersonIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Author"
                            secondary={report.author}
                            primaryTypographyProps={{
                              variant: 'subtitle2',
                              color: 'text.secondary',
                            }}
                            secondaryTypographyProps={{
                              variant: 'body1',
                              color: 'text.primary',
                            }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CalendarIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Created Date"
                            secondary={format(new Date(report.createdAt), 'PPP')}
                            primaryTypographyProps={{
                              variant: 'subtitle2',
                              color: 'text.secondary',
                            }}
                            secondaryTypographyProps={{
                              variant: 'body1',
                              color: 'text.primary',
                            }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CategoryIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Category"
                            secondary={report.category}
                            primaryTypographyProps={{
                              variant: 'subtitle2',
                              color: 'text.secondary',
                            }}
                            secondaryTypographyProps={{
                              variant: 'body1',
                              color: 'text.primary',
                            }}
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <AssessmentIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Type"
                            secondary={report.type}
                            primaryTypographyProps={{
                              variant: 'subtitle2',
                              color: 'text.secondary',
                            }}
                            secondaryTypographyProps={{
                              variant: 'body1',
                              color: 'text.primary',
                            }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CalendarIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Last Updated"
                            secondary={format(new Date(report.updatedAt), 'PPP')}
                            primaryTypographyProps={{
                              variant: 'subtitle2',
                              color: 'text.secondary',
                            }}
                            secondaryTypographyProps={{
                              variant: 'body1',
                              color: 'text.primary',
                            }}
                          />
                        </ListItem>
                        {report.attachments && report.attachments.length > 0 && (
                          <ListItem>
                            <ListItemIcon>
                              <AttachFileIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Attachments"
                              secondary={`${report.attachments.length} file(s)`}
                              primaryTypographyProps={{
                                variant: 'subtitle2',
                                color: 'text.secondary',
                              }}
                              secondaryTypographyProps={{
                                variant: 'body1',
                                color: 'text.primary',
                              }}
                            />
                          </ListItem>
                        )}
                      </List>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                    Description
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.8,
                      color: 'text.primary',
                    }}
                  >
                    {report.description}
                  </Typography>

                  {report.attachments && report.attachments.length > 0 && (
                    <>
                      <Divider sx={{ my: 3 }} />
                      <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                        Attachments
                      </Typography>
                      <List>
                        {report.attachments.map((attachment, index) => (
                          <ListItem
                            key={index}
                            sx={{
                              borderRadius: 1,
                              '&:hover': {
                                backgroundColor: 'action.hover',
                              },
                            }}
                          >
                            <ListItemIcon>
                              <AttachFileIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={attachment.name}
                              secondary={`${(attachment.size / 1024).toFixed(2)} KB`}
                            />
                            <ListItemSecondaryAction>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<DownloadIcon />}
                                onClick={() => window.open(attachment.url, '_blank')}
                                sx={{
                                  borderRadius: 2,
                                  textTransform: 'none',
                                }}
                              >
                                Download
                              </Button>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default ReportView; 