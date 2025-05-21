import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  AlertTitle,
  LinearProgress,
  FormControlLabel,
  Switch,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  alpha,
  Tabs,
  Tab,
  Tooltip,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PictureAsPdf as PdfIcon,
  TableChart as ExcelIcon,
  Description as WordIcon,
  TextFields as TextIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  Assessment as ChartIcon,
  Archive as ArchiveIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  LocalShipping as ShippingIcon,
  BatteryChargingFull as EcoIcon,
  Logout as LogoutIcon,
  Timer as TimerIcon,
  MergeType as MergeIcon,
  History as HistoryIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Upload as UploadIcon,
  FileUpload as FileUploadIcon,
  FileDownload as FileDownloadIcon,
  FileCopy as FileCopyIcon,
  Security as SafetyIcon
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';
import SessionTimeout from '../common/SessionTimeout';

function AdminDashboard() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stats, setStats] = useState({
    // Production Metrics
    productionEfficiency: 0,
    dailyProduction: 0,
    monthlyTarget: 0,
    alloyComposition: {},
    scrapRate: 0,
    
    // Quality Metrics
    qualityIndex: 0,
    defectRate: 0,
    customerComplaints: 0,
    qualityCertifications: [],
    
    // Energy & Environmental
    energyConsumption: 0,
    waterConsumption: 0,
    emissionsData: {},
    wasteManagement: {},
    environmentalCompliance: {},
    
    // Safety & Maintenance
    safetyIncidents: 0,
    maintenanceStatus: {},
    equipmentEfficiency: {},
    preventiveMaintenance: {},
    
    // Inventory & Logistics
    rawMaterialInventory: {},
    finishedGoodsInventory: {},
    shippingSchedule: [],
    orderFulfillment: {}
  });

  // Dialog states
  const [viewDialog, setViewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [editForm, setEditForm] = useState({
    department: '',
    type: '',
    status: '',
    reportType: '',
    fileFormat: 'pdf'
  });

  const [mergeDialog, setMergeDialog] = useState(false);
  const [pastReportsDialog, setPastReportsDialog] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedFileType, setSelectedFileType] = useState('pdf');
  const [reportPreview, setReportPreview] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [reportHistory, setReportHistory] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Add new state for report editing
  const [reportEditData, setReportEditData] = useState({
    title: '',
    description: '',
    department: '',
    date: '',
    fileType: 'pdf',
    content: null
  });

  // Add new state for production data
  const [productionData, setProductionData] = useState({
    rawMaterial: { input: 0, output: 0, efficiency: 0 },
    billets: { input: 0, output: 0, efficiency: 0 },
    direct: { input: 0, output: 0, efficiency: 0 },
    buttEnd: { input: 0, output: 0, efficiency: 0 },
    finishCut: { input: 0, output: 0, efficiency: 0 },
    wip: { input: 0, output: 0, efficiency: 0 },
    powerCoating: { input: 0, output: 0, efficiency: 0 },
    anodizing: { input: 0, output: 0, efficiency: 0 },
    metalFinishing: { input: 0, output: 0, efficiency: 0 }
  });

  // Add state for active legends
  const [activeEfficiencyLegends, setActiveEfficiencyLegends] = useState({});

  // Add state for raw dashboard data before processing
  const [dashboardRawData, setDashboardRawData] = useState(null);

  // Sample data for charts
  const [efficiencyData, setEfficiencyData] = useState([]);

  // Add COLORS constant for chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8884d8'];

  const departments = [
    { id: 'smelting', name: 'Smelting', reports: 25, users: 15 },
    { id: 'casting', name: 'Casting', reports: 18, users: 12 },
    { id: 'rolling', name: 'Rolling Mill', reports: 15, users: 10 },
    { id: 'extrusion', name: 'Extrusion', reports: 20, users: 14 },
    { id: 'finishing', name: 'Finishing', reports: 12, users: 8 },
    { id: 'quality', name: 'Quality Control', reports: 22, users: 16 },
    { id: 'maintenance', name: 'Maintenance', reports: 15, users: 10 },
    { id: 'warehouse', name: 'Warehouse', reports: 18, users: 12 }
  ];

  const fileFormats = [
    { id: 'pdf', name: 'PDF Document', icon: <PdfIcon />, mimeType: 'application/pdf', extension: 'pdf' },
    { id: 'excel', name: 'Excel Spreadsheet', icon: <ExcelIcon />, mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', extension: 'xlsx' },
    { id: 'csv', name: 'CSV File', icon: <TextIcon />, mimeType: 'text/csv', extension: 'csv' },
    { id: 'word', name: 'Word Document', icon: <WordIcon />, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', extension: 'docx' },
    { id: 'txt', name: 'Text File', icon: <TextIcon />, mimeType: 'text/plain', extension: 'txt' },
    { id: 'image', name: 'Image File', icon: <ImageIcon />, mimeType: 'image/png', extension: 'png' },
    { id: 'json', name: 'JSON File', icon: <CodeIcon />, mimeType: 'application/json', extension: 'json' },
    { id: 'chart', name: 'Chart File', icon: <ChartIcon />, mimeType: 'application/vnd.ms-excel', extension: 'xls' },
    { id: 'zip', name: 'ZIP Archive', icon: <ArchiveIcon />, mimeType: 'application/zip', extension: 'zip' }
  ];

  const reportTypes = {
    smelting: [
      { id: 'smelt_daily', name: 'Daily Smelting Report' },
      { id: 'smelt_temperature', name: 'Furnace Temperature Log' },
      { id: 'smelt_consumption', name: 'Raw Material Consumption' },
      { id: 'smelt_quality', name: 'Molten Metal Quality' },
      { id: 'smelt_efficiency', name: 'Smelting Efficiency Report' }
    ],
    casting: [
      { id: 'cast_daily', name: 'Daily Casting Report' },
      { id: 'cast_dimensions', name: 'Ingot Dimensions Report' },
      { id: 'cast_defects', name: 'Casting Defects Analysis' },
      { id: 'cast_temperature', name: 'Casting Temperature Log' },
      { id: 'cast_production', name: 'Production Rate Report' }
    ],
    rolling: [
      { id: 'roll_daily', name: 'Daily Rolling Report' },
      { id: 'roll_thickness', name: 'Sheet Thickness Report' },
      { id: 'roll_temperature', name: 'Rolling Temperature Log' },
      { id: 'roll_speed', name: 'Rolling Speed Report' },
      { id: 'roll_defects', name: 'Surface Defects Report' }
    ],
    extrusion: [
      { id: 'ext_daily', name: 'Daily Extrusion Report' },
      { id: 'ext_profile', name: 'Profile Dimensions Report' },
      { id: 'ext_pressure', name: 'Extrusion Pressure Log' },
      { id: 'ext_temperature', name: 'Billet Temperature Log' },
      { id: 'ext_defects', name: 'Extrusion Defects Report' }
    ],
    finishing: [
      { id: 'finish_daily', name: 'Daily Finishing Report' },
      { id: 'finish_anodizing', name: 'Anodizing Process Report' },
      { id: 'finish_painting', name: 'Painting Process Report' },
      { id: 'finish_quality', name: 'Surface Finish Quality' },
      { id: 'finish_inventory', name: 'Finishing Materials Report' }
    ],
    quality: [
      { id: 'qual_inspection', name: 'Quality Inspection Report' },
      { id: 'qual_chemical', name: 'Chemical Analysis Report' },
      { id: 'qual_mechanical', name: 'Mechanical Properties Test' },
      { id: 'qual_dimensions', name: 'Dimensional Inspection' },
      { id: 'qual_certification', name: 'Quality Certification Report' }
    ],
    maintenance: [
      { id: 'maint_schedule', name: 'Maintenance Schedule' },
      { id: 'maint_breakdown', name: 'Equipment Breakdown Report' },
      { id: 'maint_preventive', name: 'Preventive Maintenance Log' },
      { id: 'maint_repairs', name: 'Repairs History Report' },
      { id: 'maint_inventory', name: 'Spare Parts Inventory' }
    ],
    warehouse: [
      { id: 'ware_daily', name: 'Daily Inventory Report' },
      { id: 'ware_raw', name: 'Raw Material Inventory' },
      { id: 'ware_finished', name: 'Finished Goods Inventory' },
      { id: 'ware_shipment', name: 'Shipment Schedule Report' },
      { id: 'ware_quality', name: 'Storage Quality Report' }
    ]
  };

  const [recentReports, setRecentReports] = useState([
    { id: 1, department: 'Smelting', type: 'Furnace Temperature Log', date: '2024-03-14 15:30', status: 'Approved' },
    { id: 2, department: 'Casting', type: 'Ingot Dimensions Report', date: '2024-03-14 14:45', status: 'Pending' },
    { id: 3, department: 'Rolling Mill', type: 'Sheet Thickness Report', date: '2024-03-14 13:20', status: 'Approved' },
    { id: 4, department: 'Extrusion', type: 'Profile Dimensions Report', date: '2024-03-14 12:15', status: 'Pending' },
    { id: 5, department: 'Finishing', type: 'Anodizing Process Report', date: '2024-03-14 11:30', status: 'Approved' }
  ]);

  const [previewDialog, setPreviewDialog] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);

  // Initialize active legends on data load or component mount
  useEffect(() => {
    // Initialize all efficiency legends as active
    const initialEfficiencyLegends = efficiencyData.reduce((acc, entry) => {
      acc[entry.name] = true;
      return acc;
    }, {});
    setActiveEfficiencyLegends(initialEfficiencyLegends);
  }, [efficiencyData]);

  // Effect to process raw data when it's fetched
  useEffect(() => {
    if (dashboardRawData) {
      // Process raw data to derive stats, chart data, etc.
      // This is where you would transform the fetched data into the formats needed for your state variables

      // Example processing for productionData
      const processedProductionData = {
        rawMaterial: { input: dashboardRawData.production.rawMaterial.input, output: dashboardRawData.production.rawMaterial.output, efficiency: (dashboardRawData.production.rawMaterial.output / dashboardRawData.production.rawMaterial.input) * 100 || 0 },
        billets: { input: dashboardRawData.production.billets.input, output: dashboardRawData.production.billets.output, efficiency: (dashboardRawData.production.billets.output / dashboardRawData.production.billets.input) * 100 || 0 },
        direct: { input: dashboardRawData.production.direct.input, output: dashboardRawData.production.direct.output, efficiency: (dashboardRawData.production.direct.output / dashboardRawData.production.direct.input) * 100 || 0 },
        buttEnd: { input: dashboardRawData.production.buttEnd.input, output: dashboardRawData.production.buttEnd.output, efficiency: (dashboardRawData.production.buttEnd.output / dashboardRawData.production.buttEnd.input) * 100 || 0 },
        finishCut: { input: dashboardRawData.production.finishCut.input, output: dashboardRawData.production.finishCut.output, efficiency: (dashboardRawData.production.finishCut.output / dashboardRawData.production.finishCut.input) * 100 || 0 },
        wip: { input: dashboardRawData.production.wip.input, output: dashboardRawData.production.wip.output, efficiency: (dashboardRawData.production.wip.output / dashboardRawData.production.wip.input) * 100 || 0 },
        powerCoating: { input: dashboardRawData.production.powerCoating.input, output: dashboardRawData.production.powerCoating.output, efficiency: (dashboardRawData.production.powerCoating.output / dashboardRawData.production.powerCoating.input) * 100 || 0 },
        anodizing: { input: dashboardRawData.production.anodizing.input, output: dashboardRawData.production.anodizing.output, efficiency: (dashboardRawData.production.anodizing.output / dashboardRawData.production.anodizing.input) * 100 || 0 },
        metalFinishing: { input: dashboardRawData.production.metalFinishing.input, output: dashboardRawData.production.metalFinishing.output, efficiency: (dashboardRawData.production.metalFinishing.output / dashboardRawData.production.metalFinishing.input) * 100 || 0 }
      };
      setProductionData(processedProductionData);

      // Example processing for efficiencyData
      const processedEfficiencyData = Object.entries(processedProductionData).map(([stage, data]) => ({
        name: stage.replace(/([A-Z])/g, ' $1').trim(),
        value: parseFloat(data.efficiency.toFixed(2)),
      }));
      // Sort efficiency data alphabetically by name for consistent chart display
      processedEfficiencyData.sort((a, b) => a.name.localeCompare(b.name));
      setEfficiencyData(processedEfficiencyData);

      // Update other stats as needed from dashboardRawData
      // setStats(...);
      // setRecentReports(...);
    }
  }, [dashboardRawData]);

  const processParameters = {
    smelting: {
      temperature: { current: 0, min: 700, max: 800, unit: '°C' },
      powerConsumption: { current: 0, target: 0, unit: 'kWh' },
      metalPurity: { current: 0, target: 99.7, unit: '%' },
      alloyComposition: {
        Al: { current: 0, target: 99.7, unit: '%' },
        Si: { current: 0, target: 0.2, unit: '%' },
        Fe: { current: 0, target: 0.3, unit: '%' }
      }
    },
    casting: {
      temperature: { current: 0, min: 650, max: 750, unit: '°C' },
      coolingRate: { current: 0, target: 2, unit: '°C/min' },
      ingotSize: { width: 0, height: 0, length: 0, unit: 'mm' },
      castingSpeed: { current: 0, target: 0, unit: 'm/min' }
    },
    rolling: {
      temperature: { current: 0, min: 350, max: 450, unit: '°C' },
      rollingSpeed: { current: 0, target: 0, unit: 'm/min' },
      thickness: { current: 0, target: 0, unit: 'mm' },
      width: { current: 0, target: 0, unit: 'mm' }
    },
    extrusion: {
      temperature: { current: 0, min: 400, max: 500, unit: '°C' },
      pressure: { current: 0, target: 0, unit: 'bar' },
      speed: { current: 0, target: 0, unit: 'm/min' },
      profileDimensions: { width: 0, height: 0, unit: 'mm' }
    }
  };

  const environmentalMetrics = {
    emissions: {
      CO2: { current: 0, target: 0, unit: 'tons/day' },
      SO2: { current: 0, target: 0, unit: 'kg/day' },
      NOx: { current: 0, target: 0, unit: 'kg/day' }
    },
    water: {
      consumption: { current: 0, target: 0, unit: 'm³/day' },
      recycling: { current: 0, target: 0, unit: '%' },
      quality: { pH: 0, temperature: 0, unit: '°C' }
    },
    waste: {
      solid: { current: 0, target: 0, unit: 'tons/day' },
      hazardous: { current: 0, target: 0, unit: 'kg/day' },
      recycling: { current: 0, target: 0, unit: '%' }
    }
  };

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Furnace temperature approaching limit', department: 'Smelting', timestamp: '2024-03-14 15:30' },
    { id: 2, type: 'error', message: 'High energy consumption in Rolling Mill', department: 'Rolling', timestamp: '2024-03-14 14:45' },
    { id: 3, type: 'info', message: 'Preventive maintenance due for Extrusion Press', department: 'Maintenance', timestamp: '2024-03-14 13:20' }
  ]);

  // Add new state for tab selection
  const [selectedTab, setSelectedTab] = useState(0);

  // Enhanced styles
  const enhancedStyles = {
    dashboardContainer: {
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      minHeight: '100vh',
      py: 4,
    },
    headerSection: {
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
      borderRadius: theme.shape.borderRadius,
      p: 3,
      mb: 4,
      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
    metricCard: {
      height: '100%',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
      },
      background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
      backdropFilter: 'blur(10px)',
    },
    chartContainer: {
      p: 3,
      borderRadius: theme.shape.borderRadius,
      background: alpha(theme.palette.background.paper, 0.9),
      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
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
  };

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    // Set up auto-refresh every 5 minutes
    if (autoRefresh) {
      const interval = setInterval(() => {
        handleRefresh();
      }, 5 * 60 * 1000); // 5 minutes
      setRefreshInterval(interval);
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [autoRefresh]);

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isAdmin');
    // Redirect to welcome page (assuming it's at the root path)
    window.location.href = '/';
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call to fetch dashboard data
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated fetched data structure
      const simulatedData = {
        stats: {
          totalReports: 105,
          recentUploads: 8,
          pendingApprovals: 3,
          activeUsers: 65,
          productionEfficiency: 88,
          qualityIndex: 95,
          energyConsumption: 1350,
          safetyIncidents: 1,
          dailyProduction: 12,
          monthlyTarget: 320,
          alloyComposition: { Al: 99.8, Si: 0.15, Fe: 0.25 },
          scrapRate: 0.08,
          defectRate: 0.4,
          customerComplaints: 1,
          qualityCertifications: ['ISO 9001'],
          waterConsumption: 110,
          emissionsData: { CO2: 0.5, SO2: 0.1, NOx: 0.05 },
          wasteManagement: { solid: 8, hazardous: 3, recycling: 75 },
          environmentalCompliance: { status: 'Compliant' },
          maintenanceStatus: { critical: 2, scheduled: 5 },
          equipmentEfficiency: { extruder: 92, rollingMill: 90 },
          preventiveMaintenance: { overdue: 1 },
          rawMaterialInventory: { Al: 1100, Si: 220, Fe: 350 },
          finishedGoodsInventory: { Al: 950, Si: 190, Fe: 290 },
          shippingSchedule: ['Order 123 - Ready to Ship'],
          orderFulfillment: { onTime: 98 }
        },
        production: {
          rawMaterial: { input: 1200, output: 1150, scrap: 50 },
          billets: { input: 1150, output: 1080, scrap: 70 },
          direct: { input: 1080, output: 980, scrap: 100 },
          buttEnd: { input: 980, output: 900, scrap: 80 },
          finishCut: { input: 900, output: 820, scrap: 80 },
          wip: { input: 820, output: 750, scrap: 70 },
          powerCoating: { input: 750, output: 720, scrap: 30 },
          anodizing: { input: 720, output: 680, scrap: 40 },
          metalFinishing: { input: 680, output: 650, scrap: 30 },
        },
        recentReports: [
          { id: 1, department: 'Smelting', type: 'Furnace Temperature Log', date: '2024-03-15 10:00', status: 'Approved' },
          { id: 2, department: 'Production', type: 'Daily Production Summary', date: '2024-03-15 09:30', status: 'Pending' },
          { id: 3, department: 'Quality', type: 'Chemical Analysis Report', date: '2024-03-15 09:00', status: 'Approved' },
          { id: 4, department: 'Maintenance', type: 'Equipment Breakdown Report', date: '2024-03-15 08:45', status: 'Rejected' },
          { id: 5, department: 'Warehouse', type: 'Finished Goods Inventory', date: '2024-03-15 08:30', status: 'Approved' }
        ]
      };

      // Set the raw data. The useEffect will process this.
      setDashboardRawData(simulatedData);

      setLastRefresh(new Date());
      setSuccess('Data refreshed successfully');
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Dashboard data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update stats with new data
      setStats({
        // Production Metrics
        productionEfficiency: Math.random() * 100,
        dailyProduction: Math.floor(Math.random() * 20),
        monthlyTarget: 300,
        alloyComposition: { Al: 99.7, Si: 0.2, Fe: 0.3 },
        scrapRate: Math.random() * 2,
        
        // Quality Metrics
        qualityIndex: 85 + Math.random() * 15,
        defectRate: Math.random() * 2,
        customerComplaints: Math.floor(Math.random() * 5),
        qualityCertifications: [],
        
        // Energy & Environmental
        energyConsumption: 1000 + Math.random() * 500,
        waterConsumption: 80 + Math.random() * 40,
        emissionsData: {
          CO2: Math.random() * 100,
          SO2: Math.random() * 50,
          NOx: Math.random() * 30
        },
        wasteManagement: {
          solid: Math.random() * 10,
          hazardous: Math.random() * 5,
          recycling: 70 + Math.random() * 20
        },
        environmentalCompliance: {},
        
        // Safety & Maintenance
        safetyIncidents: Math.floor(Math.random() * 3),
        maintenanceStatus: {},
        equipmentEfficiency: {},
        preventiveMaintenance: {},
        
        // Inventory & Logistics
        rawMaterialInventory: {
          Al: 1000 + Math.random() * 200,
          Si: 200 + Math.random() * 50,
          Fe: 300 + Math.random() * 100
        },
        finishedGoodsInventory: {
          Al: 900 + Math.random() * 150,
          Si: 180 + Math.random() * 40,
          Fe: 270 + Math.random() * 80
        },
        shippingSchedule: [],
        orderFulfillment: {}
      });

      // Update process parameters
      Object.keys(processParameters).forEach(dept => {
        Object.keys(processParameters[dept]).forEach(param => {
          if (processParameters[dept][param].current !== undefined) {
            processParameters[dept][param].current = 
              processParameters[dept][param].target * (0.95 + Math.random() * 0.1);
          }
        });
      });

      // Update environmental metrics
      Object.keys(environmentalMetrics.emissions).forEach(type => {
        environmentalMetrics.emissions[type].current = 
          environmentalMetrics.emissions[type].target * (0.8 + Math.random() * 0.4);
      });

      setLastRefresh(new Date());
      setSuccess('Data refreshed successfully');
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  // Handle legend click for Efficiency Chart
  const handleEfficiencyLegendClick = (dataKey) => {
    setActiveEfficiencyLegends(prevState => ({
      ...prevState,
      [dataKey.payload.name]: !prevState[dataKey.payload.name],
    }));
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setViewDialog(true);
  };

  const handleEditReport = (report) => {
    setSelectedReport(report);
    setEditForm({
      department: report.department,
      type: report.type,
      status: report.status,
      reportType: report.reportType || '',
      fileFormat: report.fileFormat || 'pdf'
    });
    setEditDialog(true);
  };

  const handleDeleteReport = (report) => {
    setSelectedReport(report);
    setDeleteDialog(true);
  };

  const handleDownloadReport = async (report) => {
    try {
      setLoading(true);
      // Simulate file download
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get file extension based on format
      const getFileExtension = (format) => {
        switch (format) {
          case 'excel': return 'xlsx';
          case 'csv': return 'csv';
          case 'word': return 'docx';
          case 'txt': return 'txt';
          default: return 'pdf';
        }
      };

      // Create a mock file with appropriate extension
      const extension = getFileExtension(report.fileFormat || 'pdf');
      const fileName = `${report.department}_${report.type.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${extension}`;
      const mockFile = new Blob(['Mock file content'], { type: `application/${extension}` });
      
      // Create download link
      const url = window.URL.createObjectURL(mockFile);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSuccess('Report downloaded successfully');
    } catch (err) {
      setError('Failed to download report');
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewReport = (report) => {
    setSelectedReport(report);
    const format = fileFormats.find(f => f.id === (report.fileFormat || 'pdf'));
    
    // Generate mock preview content based on file format
    let previewData = null;
    switch (format.id) {
      case 'pdf':
        previewData = {
          type: 'pdf',
          url: 'https://example.com/sample.pdf' // Replace with actual PDF preview
        };
        break;
      case 'excel':
        previewData = {
          type: 'excel',
          data: [
            ['Department', 'Date', 'Status'],
            [report.department, report.date, report.status]
          ]
        };
        break;
      case 'csv':
        previewData = {
          type: 'csv',
          data: 'Department,Date,Status\n' + 
                `${report.department},${report.date},${report.status}`
        };
        break;
      case 'json':
        previewData = {
          type: 'json',
          data: {
            department: report.department,
            type: report.type,
            date: report.date,
            status: report.status
          }
        };
        break;
      case 'image':
        previewData = {
          type: 'image',
          url: 'https://example.com/sample.png' // Replace with actual image preview
        };
        break;
      default:
        previewData = {
          type: 'text',
          content: `Department: ${report.department}\nType: ${report.type}\nDate: ${report.date}\nStatus: ${report.status}`
        };
    }
    
    setPreviewContent(previewData);
    setPreviewDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the report in the list
      setRecentReports(prevReports => 
        prevReports.map(report => 
          report.id === selectedReport.id 
            ? { 
                ...report, 
                ...editForm,
                type: reportTypes[editForm.department.toLowerCase()]?.find(
                  rt => rt.id === editForm.reportType
                )?.name || editForm.type,
                fileFormat: editForm.fileFormat
              }
            : report
        )
      );

      setSuccess('Report updated successfully');
      setEditDialog(false);
    } catch (err) {
      setError('Failed to update report');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove the report from the list
      setRecentReports(prevReports => 
        prevReports.filter(report => report.id !== selectedReport.id)
      );

      setSuccess('Report deleted successfully');
      setDeleteDialog(false);
    } catch (err) {
      setError('Failed to delete report');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess('');
    setError('');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  // Function to handle report merging
  const handleMergeReports = async () => {
    try {
      setLoading(true);
      // Simulate API call for merging reports
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create merged report
      const mergedReport = {
        id: Date.now(),
        title: `Merged Report - ${new Date().toLocaleDateString()}`,
        departments: selectedDepartments,
        fileType: selectedFileType,
        date: new Date().toISOString(),
        status: 'Merged'
      };

      // Update reports list
      setRecentReports(prev => [mergedReport, ...prev]);
      setSuccess('Reports merged successfully');
      setMergeDialog(false);
    } catch (err) {
      setError('Failed to merge reports');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle past reports upload
  const handlePastReportsUpload = async (files) => {
    try {
      setLoading(true);
      // Simulate API call for uploading past reports
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Process uploaded files
      const newReports = Array.from(files).map(file => ({
        id: Date.now() + Math.random(),
        title: file.name,
        department: file.name.split('_')[0],
        date: new Date().toISOString(),
        fileType: file.name.split('.').pop(),
        status: 'Uploaded'
      }));

      // Update reports list and history
      setRecentReports(prev => [...newReports, ...prev]);
      setReportHistory(prev => [...newReports, ...prev]);
      setSuccess('Past reports uploaded successfully');
      setPastReportsDialog(false);
    } catch (err) {
      setError('Failed to upload past reports');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle report editing
  const handleReportEdit = (report) => {
    setReportEditData({
      title: report.title,
      description: report.description || '',
      department: report.department,
      date: report.date,
      fileType: report.fileType,
      content: report.content
    });
    setEditMode(true);
  };

  // Function to save edited report
  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      // Simulate API call for saving edited report
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update report in the list
      setRecentReports(prev => 
        prev.map(report => 
          report.id === reportEditData.id 
            ? { ...report, ...reportEditData }
            : report
        )
      );

      setSuccess('Report updated successfully');
      setEditMode(false);
    } catch (err) {
      setError('Failed to update report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={enhancedStyles.dashboardContainer}>
      <Container maxWidth="xl">
        <SessionTimeout />
        
        {/* Enhanced Header Section */}
        <Box sx={enhancedStyles.headerSection}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Aluminum Plant MIS Dashboard
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Comprehensive overview of production metrics and process efficiency
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Tooltip title="Refresh Data" TransitionComponent={Zoom}>
                  <IconButton 
                    onClick={handleRefresh}
                    sx={enhancedStyles.actionButton}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download Report" TransitionComponent={Zoom}>
                  <IconButton 
                    onClick={() => handleDownloadReport({ department: 'All', type: 'Full Report' })}
                    sx={enhancedStyles.actionButton}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Navigation Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs 
            value={selectedTab} 
            onChange={(e, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 120,
                fontWeight: 'medium',
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Production" />
            <Tab label="Quality" />
            <Tab label="Reports" />
            <Tab label="Analytics" />
          </Tabs>
        </Box>

        {/* Render content based on selectedTab */}
        {
          selectedTab === 0 && (
            <>
              {/* Process Efficiency Overview */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                  <Paper sx={enhancedStyles.chartContainer}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Process Efficiency Overview
                    </Typography>
                    <Box sx={{ height: 400 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={efficiencyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.1)} />
                          <XAxis
                            dataKey="name"
                            tick={{ fill: theme.palette.text.primary }}
                          />
                          <YAxis
                            label={{
                              value: 'Efficiency (%)',
                              angle: -90,
                              position: 'insideLeft',
                              fill: theme.palette.text.primary
                            }}
                          />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: alpha(theme.palette.background.paper, 0.9),
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                              borderRadius: theme.shape.borderRadius,
                            }}
                          />
                          <Legend onClick={handleEfficiencyLegendClick} />
                          {efficiencyData.map((entry, index) =>
                            activeEfficiencyLegends[entry.name] ? (
                              <Bar key={`bar-${index}`} dataKey="value" name={entry.name}>
                                <Cell fill={COLORS[index % COLORS.length]} />
                              </Bar>
                            ) : null
                          )}
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              {/* Scrap Analysis and Production Metrics */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                  <Paper sx={enhancedStyles.chartContainer}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Production Metrics
                    </Typography>
                    <TableContainer sx={enhancedStyles.tableContainer}>
                      <Table>
                        <TableHead sx={enhancedStyles.tableHeader}>
                          <TableRow>
                            <TableCell>Process Stage</TableCell>
                            <TableCell align="right">Input</TableCell>
                            <TableCell align="right">Output</TableCell>
                            <TableCell align="right">Efficiency</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(productionData).map(([stage, data]) => (
                            <TableRow
                              key={stage}
                              sx={enhancedStyles.tableRow}
                            >
                              <TableCell component="th" scope="row">
                                {stage.replace(/([A-Z])/g, ' $1').trim()}
                              </TableCell>
                              <TableCell align="right">{data.input}</TableCell>
                              <TableCell align="right">{data.output}</TableCell>
                              <TableCell align="right">
                                <Chip
                                  label={`${data.efficiency}%`}
                                  color={data.efficiency >= 90 ? 'success' : data.efficiency >= 80 ? 'warning' : 'error'}
                                  size="small"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>

              {/* Process Flow Visualization */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                  <Paper sx={enhancedStyles.chartContainer}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Process Flow Metrics
                    </Typography>
                    <Box sx={{ height: 400 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { name: 'Raw Material', input: productionData.rawMaterial.input, output: productionData.rawMaterial.output },
                            { name: 'Billets', input: productionData.billets.input, output: productionData.billets.output },
                            { name: 'Direct', input: productionData.direct.input, output: productionData.direct.output },
                            { name: 'Butt End', input: productionData.buttEnd.input, output: productionData.buttEnd.output },
                            { name: 'Finish Cut', input: productionData.finishCut.input, output: productionData.finishCut.output },
                            { name: 'WIP', input: productionData.wip.input, output: productionData.wip.output },
                            { name: 'Power Coating', input: productionData.powerCoating.input, output: productionData.powerCoating.output },
                            { name: 'Anodizing', input: productionData.anodizing.input, output: productionData.anodizing.output },
                            { name: 'Metal Finishing', input: productionData.metalFinishing.input, output: productionData.metalFinishing.output },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.1)} />
                          <XAxis
                            dataKey="name"
                            tick={{ fill: theme.palette.text.primary }}
                          />
                          <YAxis
                            tick={{ fill: theme.palette.text.primary }}
                          />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: alpha(theme.palette.background.paper, 0.9),
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                              borderRadius: theme.shape.borderRadius,
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="input"
                            stroke={theme.palette.primary.main}
                            name="Input Quantity"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="output"
                            stroke={theme.palette.secondary.main}
                            name="Output Quantity"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </>
          )
        }

        {/* Production Tab Content */}
        {selectedTab === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Production Overview
            </Typography>
            <Typography variant="body1">Detailed production metrics and data entry forms will go here.</Typography>
            {/* Add Production related components and charts here */}
          </Box>
        )}

        {/* Quality Tab Content */}
        {selectedTab === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Quality Control
            </Typography>
            <Typography variant="body1">Quality metrics, inspection results, and certifications will be displayed here.</Typography>
            {/* Add Quality related components and charts here */}
          </Box>
        )}

        {/* Reports Tab Content */}
        {selectedTab === 3 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Reports Management
            </Typography>
            <Typography variant="body1">View, manage, and generate reports from all departments.</Typography>
            {/* Move existing reports section here */}

            {/* Existing Reports Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Recent Reports
              </Typography>
              <TableContainer component={Paper} sx={enhancedStyles.tableContainer}>
                <Table>
                  <TableHead sx={enhancedStyles.tableHeader}>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentReports.map((report) => (
                      <TableRow key={report.id} sx={enhancedStyles.tableRow}>
                        <TableCell component="th" scope="row">
                          {report.id}
                        </TableCell>
                        <TableCell>{report.department}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <Chip label={report.status} color={getStatusColor(report.status)} size="small" />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleViewReport(report)} size="small" sx={enhancedStyles.actionButton}>
                            <ViewIcon />
                          </IconButton>
                          <IconButton onClick={() => handleEditReport(report)} size="small" sx={enhancedStyles.actionButton}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteReport(report)} size="small" sx={enhancedStyles.actionButton}>
                            <DeleteIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDownloadReport(report)} size="small" sx={enhancedStyles.actionButton}>
                            <DownloadIcon />
                          </IconButton>
                          <IconButton onClick={() => handlePreviewReport(report)} size="small" sx={enhancedStyles.actionButton}>
                            <FileCopyIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        )}

        {/* Analytics Tab Content */}
        {selectedTab === 4 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Analytics
            </Typography>
            <Typography variant="body1">Advanced data analysis, trends, and insights will be available here.</Typography>
            {/* Add Analytics related components and charts here */}
          </Box>
        )}

        {/* Loading and Error States */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Snackbar 
            open={!!error} 
            autoHideDuration={6000} 
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert 
              onClose={handleCloseSnackbar} 
              severity="error" 
              variant="filled"
              sx={{ width: '100%' }}
            >
              {error}
            </Alert>
          </Snackbar>
        )}

        {success && (
          <Snackbar 
            open={!!success} 
            autoHideDuration={6000} 
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert 
              onClose={handleCloseSnackbar} 
              severity="success" 
              variant="filled"
              sx={{ width: '100%' }}
            >
              {success}
            </Alert>
          </Snackbar>
        )}
      </Container>
    </Box>
  );
}

export default AdminDashboard; 