import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Production from './components/Production';
import QualityControl from './components/QualityControl';
import Maintenance from './components/Maintenance';
import Reports from './components/Reports';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import DepartmentDashboard from './components/DepartmentDashboard';
import PackagingDepartment from './components/PackagingDepartment';
import ColoringDepartment from './components/ColoringDepartment';
import ScrapManagement from './components/ScrapManagement';
import './App.css';

function App() {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userDepartment');
    window.location.href = '/login';
  };

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userDepartment = localStorage.getItem('userDepartment');

  const departments = [
    { id: 'production', name: 'Production Department' },
    { id: 'quality', name: 'Quality Control Department' },
    { id: 'maintenance', name: 'Maintenance Department' },
    { id: 'packaging', name: 'Packaging Department' },
    { id: 'coloring', name: 'Coloring Department' }
  ];

  return (
    <Router>
      <div className="App">
        {isAuthenticated && (
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hindalco Steel Plant MIS
              </Typography>
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                {userDepartment.charAt(0).toUpperCase() + userDepartment.slice(1)} Department
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        )}

        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to={`/department/${userDepartment}`} replace />
                </ProtectedRoute>
              }
            />

            <Route
              path="/department/:department"
              element={
                <ProtectedRoute>
                  <DepartmentDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/department/production"
              element={
                <ProtectedRoute allowedDepartments={['production', 'admin']}>
                  <Production />
                </ProtectedRoute>
              }
            />

            <Route
              path="/department/quality"
              element={
                <ProtectedRoute allowedDepartments={['quality', 'admin']}>
                  <QualityControl />
                </ProtectedRoute>
              }
            />

            <Route
              path="/department/maintenance"
              element={
                <ProtectedRoute allowedDepartments={['maintenance', 'admin']}>
                  <Maintenance />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute allowedDepartments={['admin']}>
                  <Reports />
                </ProtectedRoute>
              }
            />

            <Route
              path="/department/packaging"
              element={
                <ProtectedRoute allowedDepartments={['packaging']}>
                  <PackagingDepartment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/department/coloring"
              element={
                <ProtectedRoute allowedDepartments={['coloring']}>
                  <ColoringDepartment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/scrap-management"
              element={
                <ProtectedRoute allowedDepartments={['production', 'quality', 'maintenance', 'packaging', 'coloring']}>
                  <ScrapManagement />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
