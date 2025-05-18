import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
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
  PieChart,
  Pie,
  Cell
} from 'recharts';

function ScrapManagement() {
  const [scrapEntries, setScrapEntries] = useState([
    {
      id: 1,
      department: 'production',
      weight: 250,
      type: 'iron',
      status: 'pending',
      timestamp: '2024-03-20T10:00:00',
      beforeImage: 'url_to_image',
      afterImage: null
    },
    // Add more sample data as needed
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [formData, setFormData] = useState({
    department: '',
    weight: '',
    type: 'iron',
    status: 'pending'
  });

  const departments = [
    { id: 'production', name: 'Production Department' },
    { id: 'quality', name: 'Quality Control Department' },
    { id: 'maintenance', name: 'Maintenance Department' },
    { id: 'packaging', name: 'Packaging Department' },
    { id: 'coloring', name: 'Coloring Department' }
  ];

  const scrapTypes = [
    { id: 'iron', name: 'Iron Scrap' },
    { id: 'steel', name: 'Steel Scrap' },
    { id: 'mixed', name: 'Mixed Metal Scrap' }
  ];

  const handleAddScrap = () => {
    setSelectedEntry(null);
    setFormData({
      department: '',
      weight: '',
      type: 'iron',
      status: 'pending'
    });
    setOpenDialog(true);
  };

  const handleEditScrap = (entry) => {
    setSelectedEntry(entry);
    setFormData({
      department: entry.department,
      weight: entry.weight,
      type: entry.type,
      status: entry.status
    });
    setOpenDialog(true);
  };

  const handleSaveScrap = () => {
    if (selectedEntry) {
      // Update existing entry
      setScrapEntries(prev =>
        prev.map(entry =>
          entry.id === selectedEntry.id
            ? { ...entry, ...formData }
            : entry
        )
      );
    } else {
      // Add new entry
      setScrapEntries(prev => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
          timestamp: new Date().toISOString()
        }
      ]);
    }
    setOpenDialog(false);
  };

  const handleDeleteScrap = (id) => {
    setScrapEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const getScrapStats = () => {
    const totalWeight = scrapEntries.reduce((sum, entry) => sum + entry.weight, 0);
    const byDepartment = departments.map(dept => ({
      name: dept.name,
      value: scrapEntries
        .filter(entry => entry.department === dept.id)
        .reduce((sum, entry) => sum + entry.weight, 0)
    }));
    const byType = scrapTypes.map(type => ({
      name: type.name,
      value: scrapEntries
        .filter(entry => entry.type === type.id)
        .reduce((sum, entry) => sum + entry.weight, 0)
    }));

    return { totalWeight, byDepartment, byType };
  };

  const stats = getScrapStats();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Scrap Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddScrap}
        >
          Add Scrap Entry
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Scrap Weight
              </Typography>
              <Typography variant="h4">
                {stats.totalWeight} kg
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Scrap by Department" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.byDepartment}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Weight (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Scrap Entries Table */}
      <Card>
        <CardHeader title="Scrap Entries" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Department</TableCell>
                  <TableCell>Weight (kg)</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scrapEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      {departments.find(d => d.id === entry.department)?.name}
                    </TableCell>
                    <TableCell>{entry.weight}</TableCell>
                    <TableCell>
                      {scrapTypes.find(t => t.id === entry.type)?.name}
                    </TableCell>
                    <TableCell>{entry.status}</TableCell>
                    <TableCell>
                      {new Date(entry.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton size="small">
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleEditScrap(entry)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteScrap(entry.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEntry ? 'Edit Scrap Entry' : 'Add Scrap Entry'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                label="Department"
              >
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Weight (kg)"
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Scrap Type</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                label="Scrap Type"
              >
                {scrapTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                label="Status"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveScrap} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ScrapManagement; 