import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Alert
} from '@mui/material';

function Dispatch() {
  const [itemName, setItemName] = useState('');
  const [quantityDispatched, setQuantityDispatched] = useState('');
  const [destination, setDestination] = useState('');
  const [dateOfDispatch, setDateOfDispatch] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: 'info' });

  const handleSubmit = () => {
    if (!itemName || !quantityDispatched || !destination || !dateOfDispatch) {
      setFeedback({ message: 'Please fill in all required fields.', type: 'error' });
      return;
    }

    const dispatchData = {
      itemName,
      quantityDispatched: Number(quantityDispatched),
      destination,
      dateOfDispatch,
    };

    console.log('Dispatch Data Submitted:', dispatchData);
    setItemName('');
    setQuantityDispatched('');
    setDestination('');
    setDateOfDispatch('');
    setFeedback({ message: 'Dispatch data submitted successfully!', type: 'success' });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dispatch Management
      </Typography>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Input Dispatch Data
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Item Name/ID"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Quantity Dispatched"
              type="number"
              value={quantityDispatched}
              onChange={(e) => setQuantityDispatched(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date of Dispatch"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateOfDispatch}
              onChange={(e) => setDateOfDispatch(e.target.value)}
              required
            />
          </Grid>

          {feedback.message && (
            <Grid item xs={12}>
              <Alert severity={feedback.type}>{feedback.message}</Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Dispatch Data
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Dispatch; 