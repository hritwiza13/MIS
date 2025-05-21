import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
  Collapse,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Build as BuildIcon,
  LocalShipping as LocalShippingIcon,
  Brush as BrushIcon,
  Science as ScienceIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  ExpandLess,
  ExpandMore,
  Visibility as VisibilityIcon,
  Factory as FactoryIcon,
  Engineering as EngineeringIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Timeline as TimelineIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Recycling as RecycleIcon,
  AssignmentReturn as AssignmentReturnIcon,
  ColorLens as ColorLensIcon,
  Hardware as HardwareIcon,
  Layers as LayersIcon,
  Straighten as StraightenIcon,
  SquareFoot as SquareFootIcon,
  ContentCut as CutIcon,
  Workspaces as WorkspacesIcon
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

function Sidebar({ department }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [reportsOpen, setReportsOpen] = React.useState(false);
  const [productionOpen, setProductionOpen] = React.useState(false);
  const [qualityOpen, setQualityOpen] = React.useState(false);
  const [maintenanceOpen, setMaintenanceOpen] = React.useState(false);
  const [inventoryOpen, setInventoryOpen] = React.useState(false);
  const [finishingOpen, setFinishingOpen] = React.useState(false);

  const handleReportsClick = () => setReportsOpen(!reportsOpen);
  const handleProductionClick = () => setProductionOpen(!productionOpen);
  const handleQualityClick = () => setQualityOpen(!qualityOpen);
  const handleMaintenanceClick = () => setMaintenanceOpen(!maintenanceOpen);
  const handleInventoryClick = () => setInventoryOpen(!inventoryOpen);
  const handleFinishingClick = () => setFinishingOpen(!finishingOpen);

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: `/${department}`,
      allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']
    },
    {
      text: 'Production',
      icon: <FactoryIcon />,
      path: '/production',
      allowedDepartments: ['production', 'admin'],
      subItems: [
        {
          text: 'Raw Material',
          icon: <StorageIcon />,
          path: '/production/raw-material',
          allowedDepartments: ['production', 'admin']
        },
        {
          text: 'Billets',
          icon: <StraightenIcon />,
          path: '/production/billets',
          allowedDepartments: ['production', 'admin']
        },
        {
          text: 'Direct',
          icon: <SquareFootIcon />,
          path: '/production/direct',
          allowedDepartments: ['production', 'admin']
        },
        {
          text: 'Butt End',
          icon: <CutIcon />,
          path: '/production/butt-end',
          allowedDepartments: ['production', 'admin']
        },
        {
          text: 'Material',
          icon: <LayersIcon/>,
          path: '/production/material',
          allowedDepartments: ['production', 'admin']
        },
        {
          text: 'Finish Cut',
          icon: <CutIcon />,
          path: '/production/finish-cut',
          allowedDepartments: ['production', 'admin']
        },
        {
          text: 'Work in Progress (WIP)',
          icon: <WorkspacesIcon/>,
          path: '/production/wip',
          allowedDepartments: ['production', 'admin']
        }
      ]
    },
    {
      text: 'Quality Control',
      icon: <ScienceIcon />,
      path: '/quality',
      allowedDepartments: ['quality', 'admin'],
      subItems: [
        {
          text: 'Inspection',
          icon: <VisibilityIcon />,
          path: '/quality/inspection',
          allowedDepartments: ['quality', 'admin']
        },
        {
          text: 'Testing',
          icon: <ScienceIcon />,
          path: '/quality/testing',
          allowedDepartments: ['quality', 'admin']
        },
        {
          text: 'Certification',
          icon: <AssignmentIcon />,
          path: '/quality/certification',
          allowedDepartments: ['quality', 'admin']
        }
      ]
    },
    {
      text: 'Maintenance',
      icon: <BuildIcon />,
      path: '/maintenance',
      allowedDepartments: ['maintenance', 'admin'],
      subItems: [
        {
          text: 'Equipment',
          icon: <EngineeringIcon />,
          path: '/maintenance/equipment',
          allowedDepartments: ['maintenance', 'admin']
        },
        {
          text: 'Preventive',
          icon: <TimelineIcon />,
          path: '/maintenance/preventive',
          allowedDepartments: ['maintenance', 'admin']
        },
        {
          text: 'Breakdown',
          icon: <WarningIcon />,
          path: '/maintenance/breakdown',
          allowedDepartments: ['maintenance', 'admin']
        }
      ]
    },
    {
      text: 'Finishing',
      icon: <ColorLensIcon />,
      path: '/finishing',
      allowedDepartments: ['coloring', 'admin'],
      subItems: [
        {
          text: 'Power Coating',
          icon: <ColorLensIcon />,
          path: '/finishing/power-coating',
          allowedDepartments: ['coloring', 'admin']
        },
        {
          text: 'Anodizing (AN)',
          icon: <BrushIcon />,
          path: '/finishing/anodizing',
          allowedDepartments: ['coloring', 'admin']
        },
        {
          text: 'Metal Finishing (MF)',
          icon: <HardwareIcon/>,
          path: '/finishing/metal-finishing',
          allowedDepartments: ['coloring', 'admin']
        },
      ]
    },
    {
      text: 'Inventory',
      icon: <StorageIcon />,
      path: '/inventory',
      allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin'],
      subItems: [
        {
          text: 'Raw Materials',
          icon: <StorageIcon />,
          path: '/inventory/raw-materials',
          allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']
        },
        {
          text: 'Finished Goods',
          icon: <StorageIcon />,
          path: '/inventory/finished-goods',
          allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']
        },
        {
          text: 'Spare Parts',
          icon: <StorageIcon />,
          path: '/inventory/spare-parts',
          allowedDepartments: ['maintenance', 'admin']
        },
        {
          text: 'Dispatch',
          icon: <LocalShippingIcon />,
          path: '/inventory/dispatch',
          allowedDepartments: ['packaging', 'admin']
        },
      ]
    },
    {
      text: 'Reports',
      icon: <AssessmentIcon />,
      path: '/reports',
      allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin'],
      subItems: [
        {
          text: 'View Reports',
          icon: <VisibilityIcon />,
          path: '/reports',
          allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']
        },
        {
          text: 'Upload Reports',
          icon: <UploadIcon />,
          path: '/reports/upload',
          allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']
        },
        {
          text: 'Download Reports',
          icon: <DownloadIcon />,
          path: '/reports/download',
          allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']
        },
        {
          text: 'Scrap Reports',
          icon: <RecycleIcon />,
          path: '/reports/scrap',
          allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']
        },
        {
          text: 'Returns Reports',
          icon: <AssignmentReturnIcon />,
          path: '/reports/returns',
          allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']
        },
      ]
    },
    {
      text: 'Safety & Compliance',
      icon: <SecurityIcon />,
      path: '/safety',
      allowedDepartments: ['production', 'quality', 'maintenance', 'packaging', 'coloring', 'admin']
    },
    {
      text: 'User Management',
      icon: <GroupIcon />,
      path: '/users',
      allowedDepartments: ['admin']
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings',
      allowedDepartments: ['admin']
    }
  ];

  const renderMenuItem = (item, isSubItem = false) => {
    if (item.allowedDepartments && !item.allowedDepartments.includes(department)) {
      return null;
    }

    const isSelected = location.pathname === item.path;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    
    const isParentOpen = hasSubItems && item.subItems.some(subItem => location.pathname.startsWith(subItem.path));

    const isOpen = item.text === 'Reports' ? reportsOpen :
                   item.text === 'Production' ? productionOpen :
                   item.text === 'Quality Control' ? qualityOpen :
                   item.text === 'Maintenance' ? maintenanceOpen :
                   item.text === 'Inventory' ? inventoryOpen :
                   item.text === 'Finishing' ? finishingOpen :
                   false;

    return (
      <React.Fragment key={item.text}>
        <ListItem 
          disablePadding 
          sx={{ 
            display: 'block',
            mb: isSubItem ? 0 : 0.5
          }}
        >
          <ListItemButton
            selected={isSelected || isParentOpen}
            onClick={hasSubItems ? 
              (item.text === 'Reports' ? handleReportsClick :
               item.text === 'Production' ? handleProductionClick :
               item.text === 'Quality Control' ? handleQualityClick :
               item.text === 'Maintenance' ? handleMaintenanceClick :
               item.text === 'Inventory' ? handleInventoryClick :
               handleFinishingClick) : 
              () => navigate(item.path)
            }
            sx={{
              minHeight: 48,
              justifyContent: isSubItem ? 'initial' : 'initial',
              px: 2.5,
              pl: isSubItem ? 4 : 2.5,
              '&.Mui-selected': {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSubItem ? 1.5 : 3,
                justifyContent: 'center',
                color: isSelected || isParentOpen ? 'primary.main' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontSize: isSubItem ? '0.875rem' : '1rem',
                fontWeight: isSelected || isParentOpen ? 'bold' : 'normal',
              }}
            />
            {hasSubItems && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        {hasSubItems && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((subItem) => renderMenuItem(subItem, true))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: '#0a192f',
          color: '#8892b0',
          pt: '64px',
          borderRight: 'none',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }}
    >
      <Divider />
      <List>
        {menuItems.map(item => renderMenuItem(item))}
      </List>
    </Drawer>
  );
}

export default Sidebar; 