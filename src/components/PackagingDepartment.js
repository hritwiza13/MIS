import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
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
  Line
} from 'recharts';

function PackagingDepartment() {
  const [metrics, setMetrics] = useState({
    packagesCompleted: 1250,
    efficiencyRate: 92,
    activeLines: 3,
    qualityScore: 95
  });

  const [packagingData, setPackagingData] = useState([
    {
      id: 1,
      product: 'Product A',
      quantity: 500,
      status: 'completed',
      timestamp: '2024-03-20T10:00:00'
    },
    {
      id: 2,
      product: 'Product B',
      quantity: 300,
      status: 'in_progress',
      timestamp: '2024-03-20T11:00:00'
    }
  ]);

  const [scrapData, setScrapData] = useState([
    {
      id: 1,
      type: 'Packaging Material',
      weight: 50,
      status: 'pending',
      timestamp: '2024-03-20T09:00:00'
    }
  ]);

  const handleAddScrap = () => {
    // Implement scrap addition logic
  };

  const handleEditScrap = (id) => {
    // Implement scrap editing logic
  };

  const handleDeleteScrap = (id) => {
    setScrapData(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Packaging Department
        </Typography>
        <Box>
          <Tooltip title="Refresh Data">
            <IconButton>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddScrap}
            sx={{ ml: 2 }}
          >
            Add Scrap
          </Button>
        </Box>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Packages Completed
              </Typography>
              <Typography variant="h4">
                {metrics.packagesCompleted}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Efficiency Rate
              </Typography>
              <Typography variant="h4">
                {metrics.efficiencyRate}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Lines
              </Typography>
              <Typography variant="h4">
                {metrics.activeLines}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Quality Score
              </Typography>
              <Typography variant="h4">
                {metrics.qualityScore}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Packaging Progress Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Packaging Progress" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={packagingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Scrap Management Table */}
      <Card>
        <CardHeader title="Scrap Management" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Weight (kg)</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scrapData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      {new Date(item.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleEditScrap(item.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteScrap(item.id)}
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
    </Container>
  );
}

export default PackagingDepartment; 