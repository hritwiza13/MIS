import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    department: '',
    employeeName: '',
    employeeId: ''
  });

  const departments = [
    { value: 'production', label: 'Production' },
    { value: 'quality', label: 'Quality Control' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'packaging', label: 'Packaging' },
    { value: 'coloring', label: 'Coloring' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      department: formData.department,
      user: {
        name: formData.employeeName,
        id: formData.employeeId,
        username: formData.username
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <LockIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
          <Typography component="h1" variant="h5">
            Hindalco Steel Plant MIS
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Employee Name"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Employee ID"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={formData.department}
                    label="Department"
                    onChange={handleChange}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login; 