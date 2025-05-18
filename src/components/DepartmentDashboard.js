import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Tooltip,
  Chip,
  Menu,
  Fade
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import {
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Notifications as NotificationsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Settings as SettingsIcon,
  FileDownload as FileDownloadIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import DashboardPreferences from './DashboardPreferences';
import { exportDashboardData } from '../utils/exportUtils';

// Helper functions moved to the top
const generateHistoryData = (baseValue, variance) => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: baseValue + (Math.random() - 0.5) * variance
  }));
};

const generateEfficiencyTrends = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    efficiency: 85 + Math.random() * 10,
    target: 90
  }));
};

const getActivityColor = (type) => {
  switch (type) {
    case 'production':
      return 'primary';
    case 'maintenance':
      return 'warning';
    case 'quality':
      return 'success';
    default:
      return 'default';
  }
};

function DepartmentDashboard() {
  const { department } = useParams();
  const [timeRange, setTimeRange] = useState('today');
  const [filteredData, setFilteredData] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [preferences, setPreferences] = useState({
    showMetrics: true,
    showActivities: true,
    showAlerts: true,
    darkMode: false,
    refreshInterval: 30,
    showErrorAlerts: true,
    showWarningAlerts: true,
    showInfoAlerts: true,
    defaultTimeRange: 'today',
    metricsLayout: 'grid'
  });
  const [openPreferences, setOpenPreferences] = useState(false);
  const [exportMenuAnchor, setExportMenuAnchor] = useState(null);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    activityTypes: [],
    alertSeverities: [],
    metricTypes: []
  });

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
    setOpenDialog(true);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
    // Apply time range filter to data
    const filtered = { ...departmentData[department] };
    filtered.metrics = filtered.metrics.map(metric => ({
      ...metric,
      history: filterHistoryByTimeRange(metric.history, event.target.value)
    }));
    setFilteredData(filtered);
  };

  const filterHistoryByTimeRange = (history, range) => {
    switch (range) {
      case 'today':
        return history.slice(-8);
      case 'week':
        return history.slice(-24);
      case 'month':
        return history;
      default:
        return history;
    }
  };

  // Load preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('dashboardPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  // Save preferences to localStorage
  const handleSavePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem('dashboardPreferences', JSON.stringify(newPreferences));
  };

  // Simulated real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (preferences.refreshInterval > 0) {
        updateMetrics();
        setLastUpdated(new Date());
      }
    }, preferences.refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [department, preferences.refreshInterval]);

  const updateMetrics = () => {
    const updatedData = { ...departmentData[department] };
    updatedData.metrics = updatedData.metrics.map(metric => ({
      ...metric,
      value: simulateMetricUpdate(metric.value),
      trend: simulateTrendUpdate(metric.trend)
    }));
    setFilteredData(updatedData);
  };

  const simulateMetricUpdate = (value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const change = (Math.random() - 0.5) * 2;
      return (numValue + change).toFixed(1) + (value.includes('%') ? '%' : '');
    }
    return value;
  };

  const simulateTrendUpdate = (trend) => {
    if (trend === 'stable') return Math.random() > 0.5 ? '+1%' : '-1%';
    const numTrend = parseFloat(trend);
    if (!isNaN(numTrend)) {
      const change = (Math.random() - 0.5) * 0.5;
      return (numTrend + change).toFixed(1) + '%';
    }
    return trend;
  };

  const handleExport = (format) => {
    const filename = `${department}_dashboard_${new Date().toISOString().split('T')[0]}`;
    exportDashboardData(data, format, filename);
    setExportMenuAnchor(null);
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    applyFilters();
  };

  const applyFilters = () => {
    const filtered = { ...departmentData[department] };
    
    if (activeFilters.activityTypes.length > 0) {
      filtered.recentActivities = filtered.recentActivities.filter(
        activity => activeFilters.activityTypes.includes(activity.type)
      );
    }

    if (activeFilters.alertSeverities.length > 0) {
      filtered.alerts = filtered.alerts.filter(
        alert => activeFilters.alertSeverities.includes(alert.severity)
      );
    }

    if (activeFilters.metricTypes.length > 0) {
      filtered.metrics = filtered.metrics.filter(
        metric => activeFilters.metricTypes.includes(metric.type)
      );
    }

    setFilteredData(filtered);
  };

  const renderDepartmentSpecificCharts = () => {
    switch (department) {
      case 'production':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Production by Line" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.detailedMetrics?.productionByLine}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Efficiency Trends" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data.detailedMetrics?.efficiencyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Area type="monotone" dataKey="efficiency" stroke="#8884d8" fill="#8884d8" />
                      <Line type="monotone" dataKey="target" stroke="#ff7300" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 'quality':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Quality Distribution" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data.detailedMetrics?.qualityDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                      >
                        {data.detailedMetrics?.qualityDistribution?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Quality Metrics" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={data.detailedMetrics?.qualityMetrics}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar
                        name="Quality"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      // Add more department-specific visualizations here
      default:
        return null;
    }
  };

  // Department-specific metrics and data
  const departmentData = {
    production: {
      title: 'Production Dashboard',
      metrics: [
        { title: 'Daily Production', value: '850 tons', trend: '+5%', history: generateHistoryData(850, 5) },
        { title: 'Efficiency Rate', value: '92%', trend: '+2%', history: generateHistoryData(92, 2) },
        { title: 'Active Lines', value: '3/4', trend: 'stable', history: generateHistoryData(3, 0.5) },
        { title: 'Quality Score', value: '95%', trend: '+1%', history: generateHistoryData(95, 1) }
      ],
      recentActivities: [
        { time: '10:00 AM', activity: 'Line 1 maintenance completed', type: 'maintenance' },
        { time: '11:30 AM', activity: 'New batch started', type: 'production' },
        { time: '02:15 PM', activity: 'Quality check passed', type: 'quality' }
      ],
      alerts: [
        { severity: 'warning', message: 'Line 2 temperature above normal', timestamp: '2024-03-20T10:00:00' },
        { severity: 'info', message: 'Scheduled maintenance in 2 hours', timestamp: '2024-03-20T11:00:00' }
      ],
      detailedMetrics: {
        productionByLine: [
          { name: 'Line 1', value: 300 },
          { name: 'Line 2', value: 250 },
          { name: 'Line 3', value: 200 },
          { name: 'Line 4', value: 100 }
        ],
        efficiencyTrends: generateEfficiencyTrends(),
        qualityDistribution: [
          { name: 'Excellent', value: 60 },
          { name: 'Good', value: 30 },
          { name: 'Average', value: 10 }
        ]
      }
    },
    quality: {
      title: 'Quality Control Dashboard',
      metrics: [
        { title: 'Pass Rate', value: '98%', trend: '+1%' },
        { title: 'Defect Rate', value: '0.5%', trend: '-0.2%' },
        { title: 'Tests Today', value: '45', trend: '+5' },
        { title: 'Compliance Score', value: '99%', trend: 'stable' }
      ],
      recentActivities: [
        { time: '09:00 AM', activity: 'Daily quality audit completed', type: 'quality' },
        { time: '01:00 PM', activity: 'New testing protocol implemented', type: 'quality' },
        { time: '03:30 PM', activity: 'Quality report generated', type: 'quality' }
      ],
      alerts: [
        { severity: 'error', message: 'High defect rate in batch #1234' },
        { severity: 'info', message: 'New quality standards received' }
      ]
    },
    maintenance: {
      title: 'Maintenance Dashboard',
      metrics: [
        { title: 'Equipment Uptime', value: '96%', trend: '+2%' },
        { title: 'Pending Tasks', value: '3', trend: '-2' },
        { title: 'Preventive Maintenance', value: '85%', trend: '+5%' },
        { title: 'Response Time', value: '15 min', trend: '-5 min' }
      ],
      recentActivities: [
        { time: '08:30 AM', activity: 'Daily equipment inspection', type: 'maintenance' },
        { time: '12:00 PM', activity: 'Motor replacement completed', type: 'maintenance' },
        { time: '04:00 PM', activity: 'Maintenance schedule updated', type: 'maintenance' }
      ],
      alerts: [
        { severity: 'warning', message: 'Generator maintenance due' },
        { severity: 'info', message: 'New maintenance tools received' }
      ]
    },
    inventory: {
      title: 'Inventory Dashboard',
      metrics: [
        { title: 'Stock Level', value: '85%', trend: '+3%' },
        { title: 'Reorder Items', value: '5', trend: '-2' },
        { title: 'Inventory Value', value: '₹2.5M', trend: '+5%' },
        { title: 'Turnover Rate', value: '4.2', trend: '+0.3' }
      ],
      recentActivities: [
        { time: '09:30 AM', activity: 'Stock count completed', type: 'production' },
        { time: '01:30 PM', activity: 'New shipment received', type: 'production' },
        { time: '03:00 PM', activity: 'Inventory report generated', type: 'production' }
      ],
      alerts: [
        { severity: 'warning', message: 'Low stock alert: Raw material X' },
        { severity: 'info', message: 'New inventory system update available' }
      ]
    },
    hr: {
      title: 'HR Dashboard',
      metrics: [
        { title: 'Employee Count', value: '250', trend: '+5' },
        { title: 'Attendance Rate', value: '97%', trend: '+1%' },
        { title: 'Training Hours', value: '120', trend: '+20' },
        { title: 'Open Positions', value: '3', trend: '-2' }
      ],
      recentActivities: [
        { time: '09:00 AM', activity: 'New employee orientation', type: 'production' },
        { time: '11:00 AM', activity: 'Performance reviews completed', type: 'production' },
        { time: '02:00 PM', activity: 'Training session conducted', type: 'production' }
      ],
      alerts: [
        { severity: 'info', message: 'New training program available' },
        { severity: 'warning', message: '3 employees contracts expiring soon' }
      ]
    }
  };

  const data = filteredData || departmentData[department] || {
    title: 'Department Dashboard',
    metrics: [],
    recentActivities: [],
    alerts: []
  };

  const renderMetricChart = (metric) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={metric.history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <RechartsTooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderDetailedView = () => {
    if (!selectedMetric) return null;

    return (
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">{selectedMetric.title} Details</Typography>
        </DialogTitle>
        <DialogContent>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Trend" />
            <Tab label="Analysis" />
            <Tab label="Distribution" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {activeTab === 0 && renderMetricChart(selectedMetric)}
            {activeTab === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>Performance Analysis</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1">Current Value</Typography>
                        <Typography variant="h4">{selectedMetric.value}</Typography>
                        <Typography
                          variant="body2"
                          color={selectedMetric.trend.startsWith('+') ? 'success.main' : 'error.main'}
                        >
                          {selectedMetric.trend}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1">Target</Typography>
                        <Typography variant="h4">
                          {selectedMetric.title.includes('Rate') ? '95%' : '1000'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
            {activeTab === 2 && (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.detailedMetrics?.qualityDistribution || []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {data.detailedMetrics?.qualityDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {data.title}
        </Typography>
        <Box>
          <FormControl sx={{ minWidth: 120, mr: 2 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={handleTimeRangeChange}
              label="Time Range"
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Refresh Data">
            <IconButton onClick={updateMetrics}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export">
            <IconButton onClick={(e) => setExportMenuAnchor(e.currentTarget)}>
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter">
            <IconButton onClick={(e) => setFilterMenuAnchor(e.currentTarget)}>
              <FilterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton onClick={() => setOpenPreferences(true)}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Menu
        anchorEl={exportMenuAnchor}
        open={Boolean(exportMenuAnchor)}
        onClose={() => setExportMenuAnchor(null)}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleExport('excel')}>Export to Excel</MenuItem>
        <MenuItem onClick={() => handleExport('csv')}>Export to CSV</MenuItem>
        <MenuItem onClick={() => handleExport('pdf')}>Export to PDF</MenuItem>
      </Menu>

      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={() => setFilterMenuAnchor(null)}
        TransitionComponent={Fade}
      >
        <MenuItem>
          <FormControl fullWidth>
            <InputLabel>Activity Types</InputLabel>
            <Select
              multiple
              value={activeFilters.activityTypes}
              onChange={(e) => handleFilterChange('activityTypes', e.target.value)}
              label="Activity Types"
            >
              <MenuItem value="production">Production</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="quality">Quality</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <FormControl fullWidth>
            <InputLabel>Alert Severities</InputLabel>
            <Select
              multiple
              value={activeFilters.alertSeverities}
              onChange={(e) => handleFilterChange('alertSeverities', e.target.value)}
              label="Alert Severities"
            >
              <MenuItem value="error">Error</MenuItem>
              <MenuItem value="warning">Warning</MenuItem>
              <MenuItem value="info">Info</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
      </Menu>

      <Typography variant="caption" color="textSecondary" sx={{ mb: 2, display: 'block' }}>
        Last updated: {lastUpdated.toLocaleTimeString()}
      </Typography>

      {preferences.showMetrics && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {data.metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  cursor: 'pointer',
                  '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' }
                }}
                onClick={() => handleMetricClick(metric)}
              >
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {metric.title}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {metric.value}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    {metric.trend.startsWith('+') ? (
                      <TrendingUpIcon color="success" fontSize="small" />
                    ) : (
                      <TrendingDownIcon color="error" fontSize="small" />
                    )}
                    <Typography
                      variant="body2"
                      color={metric.trend.startsWith('+') ? 'success.main' : 'error.main'}
                      sx={{ ml: 0.5 }}
                    >
                      {metric.trend}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {renderDepartmentSpecificCharts()}

      <Grid container spacing={3}>
        {preferences.showActivities && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Recent Activities"
                action={
                  <IconButton>
                    <FilterIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Timeline>
                  {data.recentActivities.map((activity, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color={getActivityColor(activity.type)} />
                        {index < data.recentActivities.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="subtitle2">{activity.time}</Typography>
                        <Typography>{activity.activity}</Typography>
                        <Chip
                          label={activity.type}
                          size="small"
                          sx={{ mt: 1 }}
                          color={getActivityColor(activity.type)}
                        />
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </CardContent>
            </Card>
          </Grid>
        )}

        {preferences.showAlerts && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Alerts"
                avatar={<NotificationsIcon />}
              />
              <CardContent>
                <List>
                  {data.alerts
                    .filter(alert => {
                      if (alert.severity === 'error' && !preferences.showErrorAlerts) return false;
                      if (alert.severity === 'warning' && !preferences.showWarningAlerts) return false;
                      if (alert.severity === 'info' && !preferences.showInfoAlerts) return false;
                      return true;
                    })
                    .map((alert, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemText
                            primary={alert.message}
                            secondary={
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <Typography
                                  variant="body2"
                                  color={
                                    alert.severity === 'error'
                                      ? 'error.main'
                                      : alert.severity === 'warning'
                                      ? 'warning.main'
                                      : 'info.main'
                                  }
                                >
                                  {alert.severity.toUpperCase()}
                                </Typography>
                                <Typography variant="caption" color="textSecondary" sx={{ ml: 2 }}>
                                  {new Date(alert.timestamp).toLocaleString()}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < data.alerts.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {renderDetailedView()}

      <DashboardPreferences
        open={openPreferences}
        onClose={() => setOpenPreferences(false)}
        preferences={preferences}
        onSave={handleSavePreferences}
      />
    </Container>
  );
}

export default DepartmentDashboard; 