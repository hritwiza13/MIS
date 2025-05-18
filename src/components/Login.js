import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box
} from '@mui/material';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    department: ''
  });

  const departments = [
    { id: 'production', name: 'Production Department' },
    { id: 'quality', name: 'Quality Control Department' },
    { id: 'maintenance', name: 'Maintenance Department' },
    { id: 'inventory', name: 'Inventory Department' },
    { id: 'hr', name: 'HR Department' },
    { id: 'admin', name: 'Admin' }
  ];

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    // For demo purposes, we'll just navigate to the department page
    localStorage.setItem('userDepartment', loginData.department);
    localStorage.setItem('isAuthenticated', 'true');
    navigate(`/department/${loginData.department}`);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Hindalco Steel Plant MIS
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Department Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Department</InputLabel>
              <Select
                name="department"
                value={loginData.department}
                onChange={handleChange}
                required
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
              margin="normal"
              label="Username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login; 