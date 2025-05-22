import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ContentCutIcon from '@mui/icons-material/ContentCut';

function WIP() {
  const { userInfo } = useAuth();
  const [buttEndInputQuantity, setButtEndInputQuantity] = useState('');
  const [finishCutInputQuantity, setFinishCutInputQuantity] = useState('');
  const [directInputQuantity, setDirectInputQuantity] = useState('');
  const [outputQuantity, setOutputQuantity] = useState('');
  const [scrapQuantity, setScrapQuantity] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [wipHistory, setWipHistory] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const theme = useTheme();

  const departments = [
    { id: 'production', name: 'Production' },
    { id: 'quality', name: 'Quality' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'packaging', name: 'Packaging' },
    { id: 'coloring', name: 'Coloring' }
  ];

  const enhancedStyles = {
    container: {
      py: 4,
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      minHeight: 'calc(100vh - 64px)',
    },
    paperSection: {
      p: 3,
      mt: 3,
      borderRadius: theme.shape.borderRadius,
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
  };

  // Fetch data from previous processes
  useEffect(() => {
    const fetchPreviousProcessData = async () => {
      try {
        // Here you would typically fetch data from your backend
        // For now, we'll simulate the data
        const mockData = {
          buttEnd: '100', // This would come from Butt End process
          finishCut: '80', // This would come from Finish Cut process
          direct: '50',    // This would come from Direct process
        };

        setButtEndInputQuantity(mockData.buttEnd);
        setFinishCutInputQuantity(mockData.finishCut);
        setDirectInputQuantity(mockData.direct);
      } catch (error) {
        console.error('Error fetching previous process data:', error);
        setError('Failed to fetch data from previous processes');
      }
    };

    if (userInfo?.department) {
      fetchPreviousProcessData();
    }
  }, [userInfo?.department]);

  // Calculate scrap whenever output changes
  useEffect(() => {
    if (outputQuantity) {
      const totalInput = Number(buttEndInputQuantity || 0) + 
                        Number(finishCutInputQuantity || 0) + 
                        Number(directInputQuantity || 0);
      const calculatedScrap = totalInput - Number(outputQuantity);
      setScrapQuantity(calculatedScrap >= 0 ? calculatedScrap.toString() : '0');
    }
  }, [outputQuantity, buttEndInputQuantity, finishCutInputQuantity, directInputQuantity]);

  const handleSubmit = () => {
    // Basic validation
    if (!outputQuantity) {
      setError('Please enter output quantity.');
      setSuccess('');
      return;
    }

    const totalInput = Number(buttEndInputQuantity || 0) + 
                      Number(finishCutInputQuantity || 0) + 
                      Number(directInputQuantity || 0);
    const calculatedScrap = totalInput - Number(outputQuantity);

    // Here you would typically send the data to your backend
    const newWipEntry = {
      id: Date.now(),
      department: userInfo.department,
      timestamp: new Date().toISOString(),
      buttEndInput: buttEndInputQuantity,
      finishCutInput: finishCutInputQuantity,
      directInput: directInputQuantity,
      output: outputQuantity,
      scrap: calculatedScrap >= 0 ? calculatedScrap : 0,
      status: 'pending',
      verifiedBy: null
    };

    console.log('WIP Data Submitted:', newWipEntry);
    setWipHistory(prev => [newWipEntry, ...prev]);

    // Clear form and show success message
    setOutputQuantity('');
    setScrapQuantity('');
    setError('');
    setSuccess('WIP data submitted successfully!');
  };

  const handleVerify = (entryId) => {
    if (userInfo?.user?.isAdmin) {
      setWipHistory(prev => 
        prev.map(entry => 
          entry.id === entryId 
            ? { ...entry, status: 'verified', verifiedBy: userInfo.user.name }
            : entry
        )
      );
    }
  };

  const handleEdit = (entry) => {
    if (userInfo?.user?.isAdmin) {
      setSelectedEntry(entry);
      setEditDialogOpen(true);
    }
  };

  const handleEditSave = () => {
    if (selectedEntry) {
      // Recalculate scrap based on new values
      const totalInput = Number(selectedEntry.buttEndInput || 0) + 
                        Number(selectedEntry.finishCutInput || 0) + 
                        Number(selectedEntry.directInput || 0);
      const calculatedScrap = totalInput - Number(selectedEntry.output);

      setWipHistory(prev =>
        prev.map(entry =>
          entry.id === selectedEntry.id
            ? { 
                ...entry, 
                ...selectedEntry, 
                scrap: calculatedScrap >= 0 ? calculatedScrap : 0,
                lastEditedBy: userInfo.user.name,
                lastEditedAt: new Date().toISOString()
              }
            : entry
        )
      );
      setEditDialogOpen(false);
      setSelectedEntry(null);
    }
  };

  // Only show the input form for users who are not admins and not in the production department
  const renderInputForm = () => {
    if (userInfo?.user?.isAdmin || userInfo?.department === 'production') {
      return null; // Hide input form for admins and production department
    }

    return (
      <Paper sx={enhancedStyles.paperSection}>
        <Typography variant="h6" gutterBottom>
          Input WIP Data
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Input from Previous Processes (Auto-filled)
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Input from Butt End"
              type="number"
              value={buttEndInputQuantity}
              disabled
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Input from Finish Cut"
              type="number"
              value={finishCutInputQuantity}
              disabled
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Input from Direct"
              type="number"
              value={directInputQuantity}
              disabled
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Output and Scrap
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Output Quantity"
              type="number"
              value={outputQuantity}
              onChange={(e) => setOutputQuantity(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Scrap Quantity (Auto-calculated)"
              type="number"
              value={scrapQuantity}
              disabled
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          {success && (
            <Grid item xs={12}>
              <Alert severity="success">{success}</Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit WIP Data
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  return (
    <Container maxWidth="lg" sx={enhancedStyles.container}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <WorkspacesIcon sx={{ mr: 1 }} color="primary" />
        <Typography variant="h4" component="h1">
          Work in Progress (WIP) Management
        </Typography>
      </Box>
      
      {renderInputForm()}

      {/* WIP History Table */}
      <Paper sx={{ ...enhancedStyles.paperSection, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          WIP History
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Total Input</TableCell>
                <TableCell>Output</TableCell>
                <TableCell>Scrap</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Verified By</TableCell>
                {(userInfo?.user?.isAdmin || userInfo?.department === 'production') && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {wipHistory.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{departments.find(d => d.id === entry.department)?.name}</TableCell>
                  <TableCell>{new Date(entry.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    {Number(entry.buttEndInput) + Number(entry.finishCutInput) + Number(entry.directInput)}
                  </TableCell>
                  <TableCell>{entry.output}</TableCell>
                  <TableCell>{entry.scrap}</TableCell>
                  <TableCell>{entry.status}</TableCell>
                  <TableCell>{entry.verifiedBy || '-'}</TableCell>
                  {(userInfo?.user?.isAdmin || userInfo?.department === 'production') && (
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {entry.status === 'pending' && (
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => handleVerify(entry.id)}
                          >
                            Verify
                          </Button>
                        )}
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEdit(entry)}
                        >
                          Edit
                        </Button>
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit WIP Entry</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Department: {departments.find(d => d.id === selectedEntry?.department)?.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Original Entry Date: {selectedEntry?.timestamp ? new Date(selectedEntry.timestamp).toLocaleString() : ''}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Input Quantities
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Butt End Input"
                type="number"
                value={selectedEntry?.buttEndInput || ''}
                onChange={(e) => setSelectedEntry(prev => ({ ...prev, buttEndInput: e.target.value }))}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Finish Cut Input"
                type="number"
                value={selectedEntry?.finishCutInput || ''}
                onChange={(e) => setSelectedEntry(prev => ({ ...prev, finishCutInput: e.target.value }))}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Direct Input"
                type="number"
                value={selectedEntry?.directInput || ''}
                onChange={(e) => setSelectedEntry(prev => ({ ...prev, directInput: e.target.value }))}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Output and Status
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Output Quantity"
                type="number"
                value={selectedEntry?.output || ''}
                onChange={(e) => setSelectedEntry(prev => ({ ...prev, output: e.target.value }))}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Scrap Quantity (Auto-calculated)"
                type="number"
                value={selectedEntry ? 
                  (Number(selectedEntry.buttEndInput || 0) + 
                   Number(selectedEntry.finishCutInput || 0) + 
                   Number(selectedEntry.directInput || 0) - 
                   Number(selectedEntry.output || 0)) : ''}
                disabled
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Edit Reason"
                multiline
                rows={2}
                value={selectedEntry?.editReason || ''}
                onChange={(e) => setSelectedEntry(prev => ({ ...prev, editReason: e.target.value }))}
                placeholder="Please provide a reason for this edit"
              />
            </Grid>

            {selectedEntry?.lastEditedBy && (
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                  Last edited by {selectedEntry.lastEditedBy} on {selectedEntry.lastEditedAt ? new Date(selectedEntry.lastEditedAt).toLocaleString() : ''}
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleEditSave} 
            variant="contained" 
            color="primary"
            disabled={!selectedEntry?.editReason}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default WIP; 